import React, { useState, useEffect, useRef, useMemo } from 'react';
import * as d3 from 'd3';
import { 
  WORLD_GEO_DATA, 
  SHIPPING_HUBS, 
  SHIPPING_ROUTES, 
  GLOBAL_COVERAGE_STATS,
  FEATURED_DISTRIBUTION_TARGETS,
  ShippingHub,
  ShippingRoute,
  FeaturedDestination
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
  ChevronRight,
  MapPin,
  Building2,
  Sparkles,
  HelpCircle
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
  const [selectedHubId, setSelectedHubId] = useState<string>('mena-hub');
  const [selectedDestinationId, setSelectedDestinationId] = useState<string | null>('nepal');
  const [sidebarTab, setSidebarTab] = useState<'destination' | 'hub'>('destination');
  const [hoveredHub, setHoveredHub] = useState<ShippingHub | null>(null);
  const [hoveredRoute, setHoveredRoute] = useState<ShippingRoute | null>(null);
  const [hoveredDest, setHoveredDest] = useState<FeaturedDestination | null>(null);
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

  // Filter routes based on active filter and selected hub/destination or search
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

  // Selected Destination Details
  const selectedDestination = useMemo(() => {
    if (!selectedDestinationId) return null;
    return FEATURED_DISTRIBUTION_TARGETS.find(d => d.id === selectedDestinationId) || null;
  }, [selectedDestinationId]);

  // Outbound routes from the selected hub
  const selectedHubRoutes = useMemo(() => {
    return SHIPPING_ROUTES.filter(r => r.sourceHubId === selectedHub.id);
  }, [selectedHub.id]);

  // Outbound routes serving the selected destination
  const selectedDestinationRoutes = useMemo(() => {
    if (!selectedDestination) return [];
    return SHIPPING_ROUTES.filter(r => 
      r.targetCountry.toLowerCase().includes(selectedDestination.name.toLowerCase()) ||
      r.targetCity.toLowerCase().includes(selectedDestination.name.toLowerCase())
    );
  }, [selectedDestination]);

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

  const handleSelectDestination = (dest: FeaturedDestination) => {
    setSelectedDestinationId(dest.id);
    setSelectedHubId(dest.hubId);
    setSidebarTab('destination');
  };

  const handleSelectHub = (hubId: string) => {
    setSelectedHubId(hubId);
    setSidebarTab('hub');
  };

  const handleInquiryClick = (label: string) => {
    if (onSelectHubForInquiry) {
      onSelectHubForInquiry(label);
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
      <div className="relative z-10 flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-6 border-b border-slate-700/60 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-bold text-[#38B6FF] tracking-wider uppercase mb-2">
            <Globe2 className="w-4 h-4" />
            <span>Interactive Logistics Footprint & Hub Network</span>
          </div>
          <h3 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-white tracking-tight">
            Global Distribution Coverage & Hub Network
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-2xl leading-relaxed">
            Direct priority supply lines, cold-chain corridors, and bonded customs facilities delivering hospital consumables and equipment to <strong className="text-white font-semibold">Nepal, Kenya, Rwanda, South Africa, Nigeria, India</strong>, and over 65 nations worldwide.
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

      {/* Prominent Quick-Select Bar for Requested Destinations */}
      <div className="relative z-10 mb-6 bg-slate-900/90 rounded-2xl border border-slate-700/80 p-3 sm:p-4 shadow-lg">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-2.5">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse"></span>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
              Focus Distribution Corridors & Priority Healthcare Markets:
            </span>
          </div>
          <span className="text-[11px] text-[#38B6FF] font-medium hidden sm:inline">
            Click any country to inspect air/sea transit times & hospital networks
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {FEATURED_DISTRIBUTION_TARGETS.map((dest) => {
            const isSelected = selectedDestinationId === dest.id && sidebarTab === 'destination';
            return (
              <button
                key={dest.id}
                onClick={() => handleSelectDestination(dest)}
                className={`px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 border ${
                  isSelected
                    ? 'bg-[#38B6FF] text-[#071E40] border-[#38B6FF] shadow-md scale-102 font-extrabold'
                    : 'bg-slate-800/90 text-slate-200 border-slate-700 hover:bg-slate-700 hover:border-slate-500'
                }`}
              >
                <span className="text-sm">{dest.flag}</span>
                <span>{dest.name}</span>
                <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded ${
                  isSelected ? 'bg-[#071E40]/20 text-[#071E40]' : 'bg-slate-900 text-[#38B6FF]'
                }`}>
                  {dest.leadTimeAir.split(' ')[0]}
                </span>
              </button>
            );
          })}

          <button
            onClick={() => {
              setSelectedDestinationId(null);
              setSidebarTab('hub');
            }}
            className={`px-3 py-2 rounded-xl text-xs font-medium transition-all border ml-auto ${
              sidebarTab === 'hub'
                ? 'bg-amber-400 text-[#071E40] border-amber-400 font-bold'
                : 'bg-slate-800/80 text-slate-400 border-slate-700 hover:text-white'
            }`}
          >
            Strategic Gateways ({SHIPPING_HUBS.length} Hubs)
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
                placeholder="Search Nepal, Kenya, Rwanda, India..."
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
                  <feGaussianBlur stdDeviation="2" result="blur"/>
                  <feMerge>
                    <feMergeNode in="blur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
                <filter id="dest-glow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="2.5" result="glowBlur"/>
                  <feMerge>
                    <feMergeNode in="glowBlur"/>
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
                      (sidebarTab === 'hub' && (route.sourceHubId === selectedHubId || route.targetHubId === selectedHubId)) ||
                      (sidebarTab === 'destination' && selectedDestination && (
                        route.targetCountry.toLowerCase().includes(selectedDestination.name.toLowerCase()) ||
                        route.targetCity.toLowerCase().includes(selectedDestination.name.toLowerCase())
                      ));

                    const isHovered = hoveredRoute?.id === route.id;
                    const pathD = generateCurvedPath(sourceHub.coordinates, route.targetCoordinates);

                    const color = getRouteColor(route.mode, isConnectedToSelected || isHovered);
                    const strokeWidth = isHovered ? 2.5 : isConnectedToSelected ? 2.2 : 1.1;
                    const opacity = isHovered ? 1.0 : isConnectedToSelected ? 0.95 : 0.4;

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

                {/* General Destination Nodes */}
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

                {/* Prominently Highlighted Priority Destination Markers (Nepal, Kenya, Rwanda, South Africa, Nigeria, India) */}
                <g className="featured-targets-layer">
                  {FEATURED_DISTRIBUTION_TARGETS.map((target) => {
                    const pos = projectCoords(target.coordinates);
                    if (!pos) return null;

                    const isSelected = selectedDestinationId === target.id;
                    const isHovered = hoveredDest?.id === target.id;

                    return (
                      <g
                        key={`featured-${target.id}`}
                        transform={`translate(${pos[0]}, ${pos[1]})`}
                        onClick={() => handleSelectDestination(target)}
                        onMouseEnter={() => setHoveredDest(target)}
                        onMouseLeave={() => setHoveredDest(null)}
                        className="cursor-pointer group"
                      >
                        {/* Animated Radar Pulse for Priority Countries */}
                        <circle
                          r={isSelected ? "16" : "11"}
                          fill="none"
                          stroke="#10B981"
                          strokeWidth="1.5"
                          strokeOpacity={isSelected ? "0.8" : "0.4"}
                          className="animate-ping"
                        />

                        {/* Outer Marker Ring */}
                        <circle
                          r={isSelected ? 8 : isHovered ? 7 : 5.5}
                          fill="#10B981"
                          fillOpacity={0.3}
                          stroke="#10B981"
                          strokeWidth={isSelected ? 2 : 1.5}
                          filter="url(#dest-glow)"
                          className="transition-all duration-200"
                        />

                        {/* Inner Pin */}
                        <circle
                          r={isSelected ? 4 : 3}
                          fill="#FFFFFF"
                          stroke="#065F46"
                          strokeWidth="1.5"
                        />

                        {/* Text Label with Country Name and Flag */}
                        <g transform="translate(0, 14)">
                          <rect
                            x={-(target.name.length * 3.5 + 10)}
                            y={-4}
                            width={target.name.length * 7 + 20}
                            height={15}
                            rx={4}
                            fill={isSelected ? '#10B981' : '#0B2347'}
                            fillOpacity={isSelected ? 0.95 : 0.85}
                            stroke={isSelected ? '#FFFFFF' : '#38B6FF'}
                            strokeWidth={isSelected ? 1.2 : 0.8}
                          />
                          <text
                            textAnchor="middle"
                            y={7}
                            className="text-[9px] font-extrabold select-none pointer-events-none"
                            fill={isSelected ? '#071E40' : '#FFFFFF'}
                          >
                            {target.flag} {target.name}
                          </text>
                        </g>
                      </g>
                    );
                  })}
                </g>

                {/* Primary Shipping Hubs Markers */}
                <g className="hubs-layer">
                  {SHIPPING_HUBS.map((hub) => {
                    const pos = projectCoords(hub.coordinates);
                    if (!pos) return null;

                    const isSelected = hub.id === selectedHubId && sidebarTab === 'hub';
                    const isHovered = hoveredHub?.id === hub.id;

                    return (
                      <g
                        key={hub.id}
                        transform={`translate(${pos[0]}, ${pos[1]})`}
                        onClick={() => handleSelectHub(hub.id)}
                        onMouseEnter={() => setHoveredHub(hub)}
                        onMouseLeave={() => setHoveredHub(null)}
                        className="cursor-pointer group"
                      >
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
                          {hub.city.split('/')[0]}
                        </text>
                      </g>
                    );
                  })}
                </g>

              </g>
            </svg>

            {/* Hover Tooltip Overlay */}
            {(hoveredHub || hoveredRoute || hoveredDest) && (
              <div className="absolute bottom-4 left-4 bg-slate-900/95 border border-slate-700/90 rounded-xl p-3 shadow-xl backdrop-blur-md pointer-events-none max-w-xs transition-opacity z-30">
                {hoveredDest ? (
                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1">
                      <span>{hoveredDest.flag}</span>
                      <span>Priority Healthcare Corridor</span>
                    </div>
                    <div className="text-xs font-bold text-white mt-0.5">
                      {hoveredDest.name} ({hoveredDest.cities})
                    </div>
                    <div className="text-[11px] text-slate-300 mt-1 flex items-center gap-1">
                      <Plane className="w-3 h-3 text-[#38B6FF]" />
                      <span>Air: {hoveredDest.leadTimeAir}</span>
                    </div>
                    <div className="text-[10px] text-slate-400 mt-0.5">
                      {hoveredDest.regulatoryBody}
                    </div>
                  </div>
                ) : hoveredHub ? (
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
                <span className="w-2.5 h-2.5 rounded-full bg-[#10B981] border border-white inline-block"></span>
                <span className="text-white font-semibold">Priority Healthcare Corridor</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#38B6FF] border border-white inline-block"></span>
                <span>Logistics Gateway</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-4 h-0.5 bg-[#10B981] inline-block"></span>
                <span>Cold-Chain Lane (2°C–8°C)</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-4 h-0.5 bg-[#60A5FA] inline-block"></span>
                <span>Air Priority Lane</span>
              </span>
            </div>
            <span className="text-slate-400 hidden sm:inline">
              Click any country badge or hub node to inspect dispatch parameters
            </span>
          </div>

        </div>

        {/* Right Column: Selected Destination or Hub Dossier */}
        <div className="lg:col-span-4 bg-slate-900/90 rounded-2xl border border-slate-700/80 p-5 sm:p-6 shadow-xl flex flex-col justify-between">
          <div>
            
            {/* View Mode Toggle: Priority Destinations vs Strategic Hubs */}
            <div className="flex items-center justify-between mb-4 border-b border-slate-800 pb-3">
              <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Logistics Dossier:
              </div>
              <div className="flex items-center gap-1 bg-slate-800/90 p-0.5 rounded-lg border border-slate-700">
                <button
                  onClick={() => setSidebarTab('destination')}
                  className={`px-2.5 py-1 rounded text-xs font-semibold transition ${
                    sidebarTab === 'destination'
                      ? 'bg-[#10B981] text-[#071E40] font-bold'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Destination
                </button>
                <button
                  onClick={() => setSidebarTab('hub')}
                  className={`px-2.5 py-1 rounded text-xs font-semibold transition ${
                    sidebarTab === 'hub'
                      ? 'bg-[#38B6FF] text-[#071E40] font-bold'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Hub Gateways
                </button>
              </div>
            </div>

            {/* TAB 1: Featured Destination Dossier (Nepal, Kenya, Rwanda, South Africa, Nigeria, India) */}
            {sidebarTab === 'destination' && selectedDestination && (
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800 flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    <span>{selectedDestination.region} Medical Network</span>
                  </span>
                  <span className="text-xs font-mono font-bold text-slate-300">
                    Via {selectedDestination.hubName.split('&')[0]}
                  </span>
                </div>

                <div className="flex items-center gap-2 mt-2">
                  <span className="text-2xl">{selectedDestination.flag}</span>
                  <h4 className="text-lg sm:text-xl font-extrabold text-white leading-snug">
                    {selectedDestination.name} Healthcare Corridor
                  </h4>
                </div>

                <p className="text-xs text-slate-400 mt-1 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#38B6FF] shrink-0" />
                  <span>Key Hubs: {selectedDestination.cities}</span>
                </p>

                {/* Transit Metrics */}
                <div className="mt-4 space-y-2.5">
                  <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700/60">
                    <div className="text-[11px] text-slate-400 flex items-center justify-between mb-1 font-semibold">
                      <span className="flex items-center gap-1.5">
                        <Plane className="w-3.5 h-3.5 text-[#38B6FF]" />
                        <span>Priority Air Freight Dispatch</span>
                      </span>
                      <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950/60 px-1.5 py-0.2 rounded border border-emerald-800/40">
                        Active
                      </span>
                    </div>
                    <div className="text-xs font-bold text-white">
                      {selectedDestination.leadTimeAir}
                    </div>
                    <div className="text-[11px] text-slate-400 mt-0.5">
                      Entry Gateway: {selectedDestination.airportsPorts}
                    </div>
                  </div>

                  {selectedDestination.leadTimeOcean && (
                    <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700/60">
                      <div className="text-[11px] text-slate-400 flex items-center gap-1.5 mb-1 font-semibold">
                        <Anchor className="w-3.5 h-3.5 text-teal-400" />
                        <span>Ocean Maritime Container Freight</span>
                      </div>
                      <div className="text-xs font-bold text-white">
                        {selectedDestination.leadTimeOcean}
                      </div>
                    </div>
                  )}

                  <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700/60">
                    <div className="text-[11px] text-slate-400 flex items-center gap-1.5 mb-1 font-semibold">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Customs Clearance & Regulatory Authority</span>
                    </div>
                    <div className="text-xs text-slate-200 leading-relaxed font-medium">
                      {selectedDestination.regulatoryBody}
                    </div>
                    <div className="text-[11px] text-emerald-400 mt-1 flex items-center gap-1">
                      <ThermometerSnowflake className="w-3 h-3 text-[#38B6FF]" />
                      <span>Cold-Chain 2°C–8°C dataloggers installed on all shipments</span>
                    </div>
                  </div>

                  <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700/60">
                    <div className="text-[11px] text-slate-400 flex items-center gap-1.5 mb-1 font-semibold">
                      <Building2 className="w-3.5 h-3.5 text-[#38B6FF]" />
                      <span>Supplied Hospital Networks & Institutional End-Users</span>
                    </div>
                    <div className="text-xs text-slate-300 leading-relaxed">
                      {selectedDestination.keyInstitutions}
                    </div>
                  </div>
                </div>

                {/* Country Quick Switcher Icons */}
                <div className="mt-4 pt-3 border-t border-slate-800">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                    Switch Healthcare Market:
                  </div>
                  <div className="grid grid-cols-3 gap-1.5">
                    {FEATURED_DISTRIBUTION_TARGETS.map((dest) => (
                      <button
                        key={dest.id}
                        onClick={() => handleSelectDestination(dest)}
                        className={`p-1.5 rounded-lg text-[11px] font-semibold flex items-center gap-1 transition ${
                          dest.id === selectedDestination.id
                            ? 'bg-[#10B981] text-[#071E40] font-bold'
                            : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                        }`}
                      >
                        <span>{dest.flag}</span>
                        <span className="truncate">{dest.name}</span>
                      </button>
                    ))}
                  </div>
                </div>

              </div>
            )}

            {/* TAB 2: Strategic Hub Profile (When user clicks Hub Gateways) */}
            {sidebarTab === 'hub' && (
              <div>
                {/* Hub Selector Pills */}
                <div className="mb-4">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
                    Select Strategic Hub Gateway:
                  </label>
                  <div className="grid grid-cols-2 gap-1.5">
                    {SHIPPING_HUBS.map((hub) => (
                      <button
                        key={hub.id}
                        onClick={() => handleSelectHub(hub.id)}
                        className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold text-left transition-all ${
                          hub.id === selectedHubId
                            ? 'bg-[#38B6FF] text-[#071E40] shadow-sm font-bold'
                            : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white'
                        }`}
                      >
                        <div className="truncate">{hub.city.split('/')[0]}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Selected Hub Profile Card */}
                <div className="border-t border-slate-800 pt-3">
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
                    </div>

                    <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700/60">
                      <div className="text-[11px] text-slate-400 mb-1 font-semibold">
                        Served Regional Hospital Markets:
                      </div>
                      <ul className="text-xs text-slate-300 space-y-1">
                        {selectedHub.servedMarkets.map((mkt, idx) => (
                          <li key={idx} className="flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#38B6FF]"></span>
                            <span>{mkt}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                </div>
              </div>
            )}

          </div>

          {/* Action button */}
          <div className="mt-5 pt-4 border-t border-slate-800">
            {sidebarTab === 'destination' && selectedDestination ? (
              <button
                onClick={() => handleInquiryClick(`${selectedDestination.name} Medical Corridor (${selectedDestination.cities})`)}
                className="w-full py-2.5 px-4 bg-[#10B981] hover:bg-[#059669] text-[#071E40] text-xs font-extrabold rounded-xl shadow-md transition-all flex items-center justify-center gap-1.5"
              >
                <span>Request {selectedDestination.name} Hospital Supply Quote</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={() => handleInquiryClick(`${selectedHub.name} (${selectedHub.city})`)}
                className="w-full py-2.5 px-4 bg-[#38B6FF] hover:bg-[#209ee8] text-[#071E40] text-xs font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-1.5"
              >
                <span>Inquire for {selectedHub.city.split('/')[0]} Dispatch</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            )}
          </div>

        </div>

      </div>

      {/* Featured Distribution Grid for Nepal, Kenya, Rwanda, South Africa, Nigeria & India */}
      <div className="relative z-10 mt-10 pt-8 border-t border-slate-700/60">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#10B981] uppercase tracking-wider mb-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Direct Hospital Supply Network</span>
            </div>
            <h4 className="text-lg sm:text-xl font-bold text-white">
              Dedicated Medical Supply Corridors: Nepal, Kenya, Rwanda, South Africa, Nigeria & India
            </h4>
          </div>
          <span className="text-xs text-slate-400">
            Verified cold-chain & compliant regulatory registration across all 6 regions
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {FEATURED_DISTRIBUTION_TARGETS.map((dest) => (
            <div 
              key={dest.id}
              className={`p-4 rounded-2xl border transition-all flex flex-col justify-between ${
                selectedDestinationId === dest.id
                  ? 'bg-slate-800/90 border-[#10B981] shadow-lg ring-1 ring-[#10B981]/50'
                  : 'bg-slate-900/70 border-slate-800 hover:border-slate-700 hover:bg-slate-800/50'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{dest.flag}</span>
                    <span className="text-sm font-bold text-white">{dest.name}</span>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950/80 text-emerald-300 border border-emerald-800/50">
                    {dest.leadTimeAir.split(' ')[0]} Air
                  </span>
                </div>

                <p className="text-[11px] text-slate-400 mb-2">
                  <strong className="text-slate-300">Hubs:</strong> {dest.cities}
                </p>

                <div className="space-y-1.5 text-[11px] text-slate-300 bg-slate-950/40 p-2.5 rounded-lg border border-slate-800/80">
                  <div className="flex items-start gap-1.5">
                    <ShieldCheck className="w-3 h-3 text-emerald-400 shrink-0 mt-0.5" />
                    <span className="leading-snug">{dest.regulatoryBody}</span>
                  </div>
                  <div className="flex items-start gap-1.5">
                    <Building2 className="w-3 h-3 text-[#38B6FF] shrink-0 mt-0.5" />
                    <span className="leading-snug text-slate-400 line-clamp-2">{dest.keyInstitutions}</span>
                  </div>
                </div>
              </div>

              <div className="mt-3 pt-3 border-t border-slate-800/80 flex items-center justify-between">
                <button
                  onClick={() => handleSelectDestination(dest)}
                  className="text-xs font-semibold text-[#38B6FF] hover:text-white flex items-center gap-1 transition"
                >
                  <span>View on Map</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => handleInquiryClick(`${dest.name} Medical Corridor (${dest.cities})`)}
                  className="px-2.5 py-1 bg-[#10B981] hover:bg-[#059669] text-[#071E40] text-[11px] font-bold rounded-lg transition"
                >
                  Inquire
                </button>
              </div>
            </div>
          ))}
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
