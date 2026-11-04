import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Building2, 
  MapPin, 
  Calendar, 
  CheckCircle2, 
  Layers, 
  ArrowRight, 
  FileText,
  TrendingUp,
  Activity
} from 'lucide-react';
import { PROJECTS, HospitalProject } from '../data/projects';

interface ProjectsPageProps {
  onOpenRfq: () => void;
}

export const ProjectsPage: React.FC<ProjectsPageProps> = ({ onOpenRfq }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = [
    'All',
    'Critical Care & ICU',
    'Operating Theater',
    'Renal & Dialysis',
    'Diagnostic Laboratory',
    'Emergency & Disaster Relief'
  ];

  const filteredProjects = selectedCategory === 'All'
    ? PROJECTS
    : PROJECTS.filter((p) => p.category === selectedCategory);

  return (
    <div className="space-y-16 pb-16">
      
      {/* 1. Page Header */}
      <div className="bg-[#0B2F63] text-white py-14 sm:py-18 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#38B6FF]">
              <Building2 className="w-4 h-4" />
              <span>Institutional Deployments & Hospital Rollouts</span>
            </div>
            <h1 className="text-3xl sm:text-4.5xl font-extrabold tracking-tight text-white">
              Completed Healthcare Projects
            </h1>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Discover how Secure MediTech Global partners with cardiac centers, teaching referral hospitals, and health ministries across Africa, South Asia, and beyond to resolve critical clinical supply bottlenecks.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* 2. Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 text-xs font-semibold rounded-xl whitespace-nowrap transition-colors cursor-pointer shrink-0 ${
                selectedCategory === cat
                  ? 'bg-[#0B2F63] text-white shadow-xs'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* 3. Detailed Project Cards List */}
        <div className="space-y-12">
          {filteredProjects.map((project, idx) => (
            <div 
              key={project.id}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-shadow"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-6 sm:p-10">
                
                {/* Left/Main Column: Project Case Details */}
                <div className="lg:col-span-7 space-y-5">
                  <div className="flex flex-wrap items-center gap-2 text-xs">
                    <span className="font-bold text-[#38B6FF] uppercase tracking-wider">
                      {project.category}
                    </span>
                    <span className="text-slate-300">·</span>
                    <span className="flex items-center gap-1 text-slate-500 font-medium">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      <span>{project.location}, {project.country}</span>
                    </span>
                    <span className="text-slate-300">·</span>
                    <span className="flex items-center gap-1 text-slate-500 font-mono">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      <span>{project.completionDate}</span>
                    </span>
                  </div>

                  <div>
                    <div className="text-xs font-semibold text-slate-500">
                      Client Institution: <strong className="text-slate-800">{project.clientInstitution}</strong>
                    </div>
                    <h2 className="text-xl sm:text-2xl font-extrabold text-[#0B2F63] tracking-tight mt-1">
                      {project.title}
                    </h2>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {project.fullCaseStudy}
                  </p>

                  {/* Quantified Outcomes */}
                  <div className="p-4 bg-emerald-50/60 rounded-xl border border-emerald-100 space-y-2">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-800 flex items-center gap-1.5">
                      <TrendingUp className="w-4 h-4 text-emerald-600" />
                      <span>Measured Clinical & Operational Impact:</span>
                    </h4>
                    <div className="space-y-1.5 text-xs text-slate-700">
                      {project.quantifiedImpact.map((impact, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{impact}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Equipment Supplied */}
                  <div className="space-y-1.5 text-xs text-slate-600 pt-1">
                    <span className="font-bold text-slate-700 block">Consumables & Equipment Deployed:</span>
                    <div className="flex flex-wrap gap-2">
                      {project.equipmentSupplied.map((eq, i) => (
                        <span key={i} className="px-2.5 py-1 bg-slate-100 rounded-lg text-[11px] font-mono text-slate-700 border border-slate-200">
                          {eq}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Inquiry CTA */}
                  <div className="pt-2">
                    <button
                      onClick={onOpenRfq}
                      className="px-5 py-2.5 bg-[#0B2F63] hover:bg-[#124185] text-white text-xs font-bold rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
                    >
                      <FileText className="w-4 h-4 text-[#38B6FF]" />
                      <span>Request Turnkey Hospital Proposal</span>
                    </button>
                  </div>
                </div>

                {/* Right Column: Visual Showcase */}
                <div className="lg:col-span-5">
                  <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-sm aspect-4/3 relative group bg-slate-50 p-4 flex items-center justify-center">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="max-h-full max-w-full object-contain transition-transform duration-500 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute bottom-3 left-3 right-3 bg-white/95 backdrop-blur-xs p-2.5 rounded-xl border border-slate-200 text-[11px] text-slate-700 font-medium shadow-xs">
                      {project.scopeSummary}
                    </div>
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>

    </div>
  );
};
