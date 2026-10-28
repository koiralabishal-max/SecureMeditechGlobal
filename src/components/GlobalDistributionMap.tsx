import React, { useState, useEffect, useRef, useMemo } from 'react';
import * as d3 from 'd3';
import { 
  WORLD_GEO_DATA, 
  SHIPPING_HUBS, 
  SHIPPING_ROUTES, 
  GLOBAL_COVERAGE_STATS,
  ShippingHub,
  ShippingRoute 
} from '../data/worldGeoData';
import { 
  Globe2, 
  Plane, 
  Anchor, 
  ThermometerSnowflake, 
  ShieldCheck, 
  Clock, 
  ZoomIn, 
  ZoomOut, 
  RotateCcw, 
  Layers, 
  ArrowUpRight,
  Warehouse,
  CheckCircle2,
  ChevronRight
} from 'lucide-react';

interface GlobalDistributionMapProps {
  onSelectHubForInquiry?: (hubName: string) => void;
}

type FilterMode = 'ALL' | 'Air Priority' | 'Cold-Chain Air' | 'Ocean Container';

export const GlobalDistributionMap: React.FC<GlobalDistributionMapProps> = ({
  onSelectHubForInquiry
}) => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const zoomGroupRef = useRef<SVGGElement | null>(null);
  const zoomBehaviorRef = useRef<d3.ZoomBehavior<SVGSVGElement, unknown> | null>(null);

  const [activeFilter, setActiveFilter] = useState<FilterMode>('ALL');
  const [selectedHubId, setSelectedHubId] = useState<string>('usa-hq');
  const [hoveredHub, setHoveredHub] = useState<ShippingHub | null>(null);
  const [hoveredRoute, setHoveredRoute] = useState<ShippingRoute | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');

  // Fixed SVG coordinate system for projection
  const width = 1000;
  const height = 500;

  // D3 Natural Earth projection
  const projection = useMemo(() => {
    return d3.geoNaturalEarth1()
      .scale(165)
      .translate([width / 2, height / 2 + 10]);
  }, []);

  const pathGenerator = useMemo(() => {
    return d3.geoPath().projection(projection);
  }, [projection]);

  const graticuleGenerator = useMemo(() => {
    return d3.geoGraticule();
  }, []);

  // Filter routes based on active filter and selected hub or search
  const filteredRoutes = useMemo(() => {
    let routes = SHIPPING_ROUTES;

    if (activeFilter === 'Air Priority') {
      routes = routes.filter(r => r.mode === 'Air Priority' || r.mode === 'Inter-Hub Corridor');
    } else if (activeFilter === 'Cold-Chain Air') {
      routes = routes.filter(r => r.mode === 'Cold-Chain Air');
    } else if (activeFilter === 'Ocean Container') {
      routes = routes.filter(r => r.mode === 'Ocean Container' || r.mode === 'Inter-Hub Corridor');
    }

    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      routes = routes.filter(r => 
        r.targetCity.toLowerCase().includes(q) || 
        r.targetCountry.toLowerCase().includes(q)
      );
    }

    return routes;
  }, [activeFilter, searchTerm]);

  // Selected Hub Details
  const selectedHub = useMemo(() => {
    return SHIPPING_HUBS.find(h => h.id === selectedHubId) || SHIPPING_HUBS[0];
  }, [selectedHubId]);

  // Outbound routes from the selected hub
  const selectedHubRoutes = useMemo(() => {
    return SHIPPING_ROUTES.filter(r => r.sourceHubId === selectedHub.id);
  }, [selectedHub.id]);

  // D3 Zoom Setup
  useEffect(() => {
    if (!svgRef.current || !zoomGroupRef.current) return;

    const svg = d3.select(svgRef.current);
    const zoomGroup = d3.select(zoomGroupRef.current);

    const zoom = d3.zoom<SVGSVGElement, unknown>()
      .scaleExtent([1, 4])
      .translateExtent([[0, 0], [width, height]])
      .on('zoom', (event) => {
        zoomGroup.attr('transform', event.transform.toString());
      });

    svg.call(zoom);
    zoomBehaviorRef.current = zoom;

    return () => {
      svg.on('.zoom', null);
    };
  }, []);

  const handleZoomIn = () => {
    if (!svgRef.current || !zoomBehaviorRef.current) return;
    d3.select(svgRef.current)
      .transition()
      .duration(350)
      .call(zoomBehaviorRef.current.scaleBy, 1.4);
  };

  const handleZoomOut = () => {
    if (!svgRef.current || !zoomBehaviorRef.current) return;
    d3.select(svgRef.current)
      .transition()
      .duration(350)
      .call(zoomBehaviorRef.current.scaleBy, 0.7);
  };

  const handleResetZoom = () => {
    if (!svgRef.current || !zoomBehaviorRef.current) return;
    d3.select(svgRef.current)
      .transition()
      .duration(450)
      .call(zoomBehaviorRef.current.transform, d3.zoomIdentity);
  };

  // Helper to project lat/lon to svg coordinate
  const projectCoords = (coords: [number, number]): [number, number] | null => {
    const projected = projection(coords);
    return projected ? [projected[0], projected[1]] : null;
  };

  // Generate curved quadratic SVG path string between two points
  const generateCurvedPath = (sourceCoords: [number, number], targetCoords: [number, number], curvature = 0.25) => {
    const p1 = projectCoords(sourceCoords);
    const p2 = projectCoords(targetCoords);
    if (!p1 || !p2) return '';

    const dx = p2[0] - p1[0];
    const dy = p2[1] - p1[1];
    const dist = Math.sqrt(dx * dx + dy * dy);

    // Calculate perpendicular offset for curved arc
    const midX = (p1[0] + p2[0]) / 2;
    const midY = (p1[1] + p2[1]) / 2;
    
    // Bowing factor based on distance
    const offset = Math.min(dist * curvature, 70);
    const angle = Math.atan2(dy, dx) - Math.PI / 2;

    const cx = midX + Math.cos(angle) * offset;
    const cy = midY + Math.sin(angle) * offset;

    return `M ${p1[0]} ${p1[1]} Q ${cx} ${cy} ${p2[0]} ${p2[1]}`;
  };

  const getRouteColor = (mode: ShippingRoute['mode'], isHighlighted: boolean) => {
    if (isHighlighted) return '#38B6FF';
    switch (mode) {
      case 'Cold-Chain Air':
        return '#10B981'; // Emerald
      case 'Ocean Container':
        return '#2DD4BF'; // Teal
      case 'Inter-Hub Corridor':
        return '#38B6FF'; // Bright Cyan
      case 'Air Priority':
      default:
        return '#60A5FA'; // Sky Blue
    }
  };

  const handleHubInquiryClick = () => {
    if (onSelectHubForInquiry) {
      onSelectHubForInquiry(`${selectedHub.name} (${selectedHub.city})`);
    } else {
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="bg-[#071E40] text-white rounded-3xl p-5 sm:p-8 lg:p-10 border border-slate-700/60 shadow-2xl relative overflow-hidden">
      
      {/* Background Decorative Glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#38B6FF]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-[#10B981]/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header and Controls */}
      <div className="relative z-10 flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8 border-b border-slate-700/60 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-bold text-[#38B6FF] tracking-wider uppercase mb-2">
            <Globe2 className="w-4 h-4" />
            <span>Interactive Logistics Footprint (D3.js Visualization)</span>
          </div>
          <h3 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-white tracking-tight">
            Global Distribution Coverage & Hub Network
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-2xl leading-relaxed">
            Real-time visualization of our 6 global hubs, cold-chain corridors, and direct priority air & maritime supply lanes reaching hospitals in 65+ countries.
          </p>
        </div>

        {/* Corridor Mode Switcher */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-900/80 rounded-xl border border-slate-700/80 self-start lg:self-end">
          <button
            onClick={() => setActiveFilter('ALL')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              activeFilter === 'ALL'
                ? 'bg-[#38B6FF] text-[#071E40] font-bold shadow-xs'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            All Corridors
          </button>
          <button
            onClick={() => setActiveFilter('Air Priority')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all ${
              activeFilter === 'Air Priority'
                ? 'bg-[#60A5FA] text-[#071E40] font-bold shadow-xs'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Plane className="w-3.5 h-3.5" />
            Air Priority
          </button>
          <button
            onClick={() => setActiveFilter('Cold-Chain Air')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all ${
              activeFilter === 'Cold-Chain Air'
                ? 'bg-[#10B981] text-[#071E40] font-bold shadow-xs'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <ThermometerSnowflake className="w-3.5 h-3.5" />
            Cold-Chain (2°C–8°C)
          </button>
          <button
            onClick={() => setActiveFilter('Ocean Container')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all ${
              activeFilter === 'Ocean Container'
                ? 'bg-[#2DD4BF] text-[#071E40] font-bold shadow-xs'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Anchor className="w-3.5 h-3.5" />
            Ocean (FCL/LCL)
          </button>
        </div>
      </div>

      {/* Main Map Canvas Area */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column: Interactive D3 SVG Map */}
        <div className="lg:col-span-8 bg-[#05152E]/90 rounded-2xl border border-slate-700/80 p-2 sm:p-4 shadow-inner relative overflow-hidden">
          
          {/* Top Bar inside Map: Search & Zoom Controls */}
          <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between gap-3 pointer-events-none">
            {/* Quick Destination Search */}
            <div className="pointer-events-auto w-48 sm:w-64">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Filter destination city/country..."
                className="w-full px-3 py-1.5 text-xs bg-slate-900/90 text-white placeholder-slate-400 border border-slate-700 rounded-lg focus:outline-none focus:border-[#38B6FF] backdrop-blur-xs"
              />
            </div>

            {/* Zoom & Pan Controls */}
            <div className="pointer-events-auto flex items-center gap-1 bg-slate-900/90 border border-slate-700 rounded-lg p-1 shadow-md backdrop-blur-xs">
              <button
                onClick={handleZoomIn}
                title="Zoom In"
                className="p-1.5 text-slate-300 hover:text-white hover:bg-slate-800 rounded transition"
              >
                <ZoomIn className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={handleZoomOut}
                title="Zoom Out"
                className="p-1.5 text-slate-300 hover:text-white hover:bg-slate-800 rounded transition"
              >
                <ZoomOut className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={handleResetZoom}
                title="Reset View"
                className="p-1.5 text-slate-300 hover:text-white hover:bg-slate-800 rounded transition"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* SVG Container */}
          <div className="w-full aspect-[2/1] relative">
            <svg
              ref={svgRef}
              viewBox={`0 0 ${width} ${height}`}
              className="w-full h-full cursor-grab active:cursor-grabbing select-none"
            >
              <defs>
                {/* SVG Glow Filter */}
                <filter id="hub-glow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="3.5" result="coloredBlur"/>
                  <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
                <filter id="route-glow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="1.5" result="blur"/>
                  <feMerge>
                    <feMergeNode in="blur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
                
                {/* Radial gradient for oceanic depth */}
                <radialGradient id="oceanGrad" cx="50%" cy="50%" r="75%">
                  <stop offset="0%" stopColor="#0B2347" />
                  <stop offset="100%" stopColor="#041226" />
                </radialGradient>
              </defs>

              {/* Ocean Base Background */}
              <rect width={width} height={height} fill="url(#oceanGrad)" rx="16" />

              {/* Zoomable Container */}
              <g ref={zoomGroupRef} className="zoomable-layer">
                
                {/* D3 Graticule Grid Lines */}
                <path
                  d={pathGenerator(graticuleGenerator()) || ''}
                  fill="none"
                  stroke="#1B3A68"
                  strokeWidth="0.5"
                  strokeOpacity="0.4"
                  strokeDasharray="2,4"
                />

                {/* World Continents Polygons */}
                <g className="world-continents">
                  {WORLD_GEO_DATA.features.map((feature, i) => {
                    const d = pathGenerator(feature as any);
                    if (!d) return null;
                    return (
                      <path
                        key={`land-${i}`}
                        d={d}
                        fill="#102E5C"
                        stroke="#1F4D8F"
                        strokeWidth="0.8"
                        className="transition-colors hover:fill-[#153B73]"
                      />
                    );
                  })}
                </g>

                {/* Flight & Maritime Arcs */}
                <g className="routes-layer">
                  {filteredRoutes.map((route) => {
                    const sourceHub = SHIPPING_HUBS.find(h => h.id === route.sourceHubId);
                    if (!sourceHub) return null;

                    const isConnectedToSelected = 
                      route.sourceHubId === selectedHubId || route.targetHubId === selectedHubId;
                    const isHovered = hoveredRoute?.id === route.id;
                    const pathD = generateCurvedPath(sourceHub.coordinates, route.targetCoordinates);

                    const color = getRouteColor(route.mode, isConnectedToSelected || isHovered);
                    const strokeWidth = isHovered ? 2.5 : isConnectedToSelected ? 2.0 : 1.2;
                    const opacity = isHovered ? 1.0 : isConnectedToSelected ? 0.9 : 0.45;

                    return (
                      <g key={route.id} className="route-group cursor-pointer">
                        <path
                          d={pathD}
                          fill="none"
                          stroke={color}
                          strokeWidth={strokeWidth}
                          strokeOpacity={opacity}
                          strokeDasharray={route.mode === 'Cold-Chain Air' ? '4,3' : '5,4'}
                          filter={isConnectedToSelected ? 'url(#route-glow)' : undefined}
                          className="transition-all duration-300"
                          onMouseEnter={() => setHoveredRoute(route)}
                          onMouseLeave={() => setHoveredRoute(null)}
                        />
                      </g>
                    );
                  })}
                </g>

                {/* Regional Destination Nodes */}
                <g className="destination-nodes">
                  {filteredRoutes.map((route) => {
                    const pos = projectCoords(route.targetCoordinates);
                    if (!pos) return null;
                    const isConnected = route.sourceHubId === selectedHubId;

                    return (
                      <g
                        key={`dest-${route.id}`}
                        transform={`translate(${pos[0]}, ${pos[1]})`}
                        className="pointer-events-none"
                      >
                        <circle
                          r={isConnected ? 3 : 2}
                          fill={isConnected ? '#38B6FF' : '#94A3B8'}
                          fillOpacity={isConnected ? 0.9 : 0.6}
                        />
                      </g>
                    );
                  })}
                </g>

                {/* Primary Shipping Hubs Markers */}
                <g className="hubs-layer">
                  {SHIPPING_HUBS.map((hub) => {
                    const pos = projectCoords(hub.coordinates);
                    if (!pos) return null;

                    const isSelected = hub.id === selectedHubId;
                    const isHovered = hoveredHub?.id === hub.id;

                    return (
                      <g
                        key={hub.id}
                        transform={`translate(${pos[0]}, ${pos[1]})`}
                        onClick={() => setSelectedHubId(hub.id)}
                        onMouseEnter={() => setHoveredHub(hub)}
                        onMouseLeave={() => setHoveredHub(null)}
                        className="cursor-pointer group"
                      >
                        {/* Animated Pulsing Halo */}
                        {isSelected && (
                          <circle
                            r="14"
                            fill="none"
                            stroke={hub.isHQ ? '#F59E0B' : '#38B6FF'}
                            strokeWidth="1.5"
                            strokeOpacity="0.6"
                            className="animate-ping"
                          />
                        )}

                        {/* Outer Glow Ring */}
                        <circle
                          r={isSelected ? 9 : isHovered ? 8 : 6}
                          fill={hub.isHQ ? '#F59E0B' : '#38B6FF'}
                          fillOpacity={0.25}
                          stroke={hub.isHQ ? '#F59E0B' : '#38B6FF'}
                          strokeWidth={isSelected ? 2 : 1.2}
                          filter="url(#hub-glow)"
                          className="transition-all duration-200"
                        />

                        {/* Center Pin Node */}
                        <circle
                          r={isSelected ? 5 : 3.5}
                          fill={hub.isHQ ? '#FDE68A' : '#FFFFFF'}
                          stroke={hub.isHQ ? '#D97706' : '#0B2F63'}
                          strokeWidth="1.5"
                        />

                        {/* Text Label on Hub */}
                        <text
                          y={isSelected ? -12 : -9}
                          textAnchor="middle"
                          className="text-[9px] sm:text-[10px] font-bold select-none pointer-events-none"
                          fill={isSelected ? '#FFFFFF' : '#CBD5E1'}
                          style={{
                            textShadow: '0 1px 3px rgba(0,0,0,0.9), 0 0 6px #071E40',
                            letterSpacing: '0.02em'
                          }}
                        >
                          {hub.city}
                        </text>
                      </g>
                    );
                  })}
                </g>

              </g>
            </svg>

            {/* Hover Tooltip Overlay */}
            {(hoveredHub || hoveredRoute) && (
              <div className="absolute bottom-4 left-4 bg-slate-900/95 border border-slate-700/90 rounded-xl p-3 shadow-xl backdrop-blur-md pointer-events-none max-w-xs transition-opacity">
                {hoveredHub ? (
                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-wider text-[#38B6FF]">
                      {hoveredHub.type}
                    </div>
                    <div className="text-xs font-bold text-white mt-0.5">
                      {hoveredHub.name} ({hoveredHub.city})
                    </div>
                    <div className="text-[11px] text-slate-300 mt-1 flex items-center gap-1">
                      <Clock className="w-3 h-3 text-emerald-400" />
                      <span>Air: {hoveredHub.transitAir}</span>
                    </div>
                  </div>
                ) : hoveredRoute ? (
                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-wider text-[#10B981]">
                      {hoveredRoute.mode} Corridor
                    </div>
                    <div className="text-xs font-bold text-white mt-0.5">
                      To {hoveredRoute.targetCity}, {hoveredRoute.targetCountry}
                    </div>
                    <div className="text-[11px] text-slate-300 mt-1">
                      Lead Time: <span className="text-white font-medium">{hoveredRoute.transitDays}</span>
                    </div>
                    <div className="text-[11px] text-slate-400">
                      Frequency: {hoveredRoute.frequency}
                    </div>
                  </div>
                ) : null}
              </div>
            )}
          </div>

          {/* Map Legend */}
          <div className="mt-3 pt-3 border-t border-slate-800/80 flex flex-wrap items-center justify-between text-[11px] text-slate-400 gap-2">
            <div className="flex flex-wrap items-center gap-4">
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-amber-400 border border-white inline-block"></span>
                <span>US Corporate HQ</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#38B6FF] border border-white inline-block"></span>
                <span>Logistics Hub</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-4 h-0.5 bg-[#38B6FF] inline-block"></span>
                <span>Inter-Hub Trunk</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-4 h-0.5 bg-[#10B981] inline-block"></span>
                <span>Cold-Chain Lane</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-4 h-0.5 bg-[#2DD4BF] inline-block"></span>
                <span>Ocean Freight Lane</span>
              </span>
            </div>
            <span className="text-slate-400 hidden sm:inline">
              Click any hub node to inspect dispatch parameters
            </span>
          </div>

        </div>

        {/* Right Column: Selected Hub Dossier & Specifications */}
        <div className="lg:col-span-4 bg-slate-900/90 rounded-2xl border border-slate-700/80 p-5 sm:p-6 shadow-xl flex flex-col justify-between">
          <div>
            
            {/* Hub Selector Pills */}
            <div className="mb-4">
              <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
                Select Strategic Logistics Hub:
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
                {SHIPPING_HUBS.map((hub) => (
                  <button
                    key={hub.id}
                    onClick={() => setSelectedHubId(hub.id)}
                    className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold text-left transition-all ${
                      hub.id === selectedHubId
                        ? 'bg-[#38B6FF] text-[#071E40] shadow-sm font-bold'
                        : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white'
                    }`}
                  >
                    <div className="truncate">{hub.city}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Selected Hub Profile Card */}
            <div className="border-t border-slate-800 pt-4">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-blue-900/60 text-[#38B6FF] border border-blue-700/60">
                  {selectedHub.type}
                </span>
                {selectedHub.isHQ && (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40">
                    Global HQ
                  </span>
                )}
              </div>

              <h4 className="text-base sm:text-lg font-bold text-white leading-snug">
                {selectedHub.name}
              </h4>
              <p className="text-xs text-slate-400 mt-0.5">
                {selectedHub.city}, {selectedHub.country}
              </p>

              {/* Transit & Warehouse Specs */}
              <div className="mt-4 space-y-3">
                <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700/60">
                  <div className="text-[11px] text-slate-400 flex items-center gap-1.5 mb-1 font-semibold">
                    <Plane className="w-3.5 h-3.5 text-[#38B6FF]" />
                    <span>Priority Air Lead Time</span>
                  </div>
                  <div className="text-xs font-bold text-white">
                    {selectedHub.transitAir}
                  </div>
                </div>

                <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700/60">
                  <div className="text-[11px] text-slate-400 flex items-center gap-1.5 mb-1 font-semibold">
                    <Warehouse className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Customs & Storage Infrastructure</span>
                  </div>
                  <div className="text-xs text-slate-200 leading-relaxed font-medium">
                    {selectedHub.customsFacility}
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1 flex items-center gap-1">
                    <ThermometerSnowflake className="w-3 h-3 text-[#38B6FF]" />
                    <span>{selectedHub.tempStorage}</span>
                  </div>
                </div>
              </div>

              {/* Certifications & Incoterms */}
              <div className="mt-4 pt-3 border-t border-slate-800">
                <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                  Compliance & Trade Terms:
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {selectedHub.certifications.map((cert, idx) => (
                    <span 
                      key={idx}
                      className="text-[10px] font-mono font-medium px-2 py-0.5 rounded bg-emerald-950/60 text-emerald-300 border border-emerald-800/50 flex items-center gap-1"
                    >
                      <CheckCircle2 className="w-2.5 h-2.5" />
                      {cert}
                    </span>
                  ))}
                  {selectedHub.keyIncoterms.map((term, idx) => (
                    <span 
                      key={idx}
                      className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-slate-800 text-slate-200 border border-slate-700"
                    >
                      {term}
                    </span>
                  ))}
                </div>
              </div>

              {/* Outbound Corridors from this Hub */}
              <div className="mt-4 pt-3 border-t border-slate-800">
                <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center justify-between">
                  <span>Direct Outbound Hospital Lanes:</span>
                  <span className="text-[#38B6FF] font-mono">{selectedHubRoutes.length} Lanes</span>
                </div>
                <div className="space-y-1.5 max-h-32 overflow-y-auto pr-1">
                  {selectedHubRoutes.map((route) => (
                    <div 
                      key={route.id}
                      className="flex items-center justify-between text-[11px] p-1.5 rounded bg-slate-800/50 hover:bg-slate-800 border border-slate-700/40"
                    >
                      <span className="text-white font-medium truncate max-w-[140px]">
                        {route.targetCity}
                      </span>
                      <span className="text-[10px] font-mono text-emerald-400">
                        {route.transitDays}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>

          {/* Action button */}
          <div className="mt-5 pt-4 border-t border-slate-800">
            <button
              onClick={handleHubInquiryClick}
              className="w-full py-2.5 px-4 bg-[#38B6FF] hover:bg-[#209ee8] text-[#071E40] text-xs font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-1.5"
            >
              <span>Inquire for {selectedHub.city} Dispatch</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>

      {/* 4 Key Performance Metrics Bar */}
      <div className="relative z-10 mt-8 pt-6 border-t border-slate-700/60 grid grid-cols-2 sm:grid-cols-4 gap-4">
        {GLOBAL_COVERAGE_STATS.map((stat, idx) => (
          <div key={idx} className="bg-slate-900/60 p-4 rounded-xl border border-slate-800 text-center sm:text-left">
            <div className="text-xl sm:text-2xl font-extrabold text-[#38B6FF] tracking-tight">
              {stat.value}
            </div>
            <div className="text-xs font-bold text-white mt-0.5">
              {stat.label}
            </div>
            <div className="text-[11px] text-slate-400 mt-1 leading-snug">
              {stat.sub}
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
