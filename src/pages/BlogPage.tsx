import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  BookOpen, 
  Calendar, 
  Clock, 
  User, 
  ArrowRight, 
  ChevronRight,
  Tag
} from 'lucide-react';
import { BLOG_POSTS, BlogPost } from '../data/blog';

export const BlogPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = [
    'All',
    'Regulatory & Compliance',
    'Clinical Practice',
    'Supply Chain Logistics',
    'Technology Insights'
  ];

  const filteredPosts = selectedCategory === 'All'
    ? BLOG_POSTS
    : BLOG_POSTS.filter((post) => post.category === selectedCategory);

  return (
    <div className="space-y-12 pb-16">
      
      {/* 1. Page Header */}
      <div className="bg-[#0B2F63] text-white py-14 sm:py-18 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#38B6FF]">
              <BookOpen className="w-4 h-4" />
              <span>Clinical Insights & Regulatory News</span>
            </div>
            <h1 className="text-3xl sm:text-4.5xl font-extrabold tracking-tight text-white">
              Medical Technology & Procurement Blog
            </h1>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Expert articles on CE MDR compliance, ventilator-associated pneumonia prevention, armored airway physics, hemodialysis recirculation mechanics, and global hospital supply resilience.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* 2. Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
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

        {/* 3. Featured Article (Top Post) */}
        {filteredPosts.length > 0 && (
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-shadow">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-6 sm:p-8">
              <div className="lg:col-span-5 h-64 sm:h-72 rounded-xl bg-slate-50 overflow-hidden p-4 flex items-center justify-center">
                <img
                  src={filteredPosts[0].featuredImage}
                  alt={filteredPosts[0].title}
                  className="max-h-full max-w-full object-contain"
                />
              </div>

              <div className="lg:col-span-7 space-y-3">
                <div className="flex items-center gap-2 text-xs">
                  <span className="font-bold text-[#38B6FF] uppercase">
                    {filteredPosts[0].category}
                  </span>
                  <span className="text-slate-300">·</span>
                  <span className="text-slate-400 font-mono">{filteredPosts[0].publishedDate}</span>
                  <span className="text-slate-300">·</span>
                  <span className="text-slate-500">{filteredPosts[0].readTime}</span>
                </div>

                <Link to={`/blog/${filteredPosts[0].slug}`} className="block group">
                  <h2 className="text-xl sm:text-2xl font-extrabold text-[#0B2F63] group-hover:text-[#38B6FF] transition-colors leading-snug">
                    {filteredPosts[0].title}
                  </h2>
                </Link>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {filteredPosts[0].summary}
                </p>

                <div className="pt-2 flex items-center justify-between">
                  <div className="text-xs text-slate-500">
                    By <strong className="text-slate-800">{filteredPosts[0].author}</strong> ({filteredPosts[0].authorRole})
                  </div>

                  <Link
                    to={`/blog/${filteredPosts[0].slug}`}
                    className="text-xs font-bold text-[#0B2F63] hover:text-[#38B6FF] flex items-center gap-1"
                  >
                    <span>Read Full Article</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 4. Article Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.slice(1).map((post) => (
            <div 
              key={post.id}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs hover:shadow-md transition-shadow flex flex-col justify-between group"
            >
              <div>
                <Link to={`/blog/${post.slug}`} className="block h-48 bg-slate-50 p-4 border-b border-slate-100 flex items-center justify-center overflow-hidden">
                  <img
                    src={post.featuredImage}
                    alt={post.title}
                    className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform"
                  />
                </Link>

                <div className="p-5 space-y-2">
                  <div className="flex items-center justify-between text-[11px] text-slate-400">
                    <span className="font-bold text-[#38B6FF] uppercase">{post.category}</span>
                    <span>{post.readTime}</span>
                  </div>

                  <Link to={`/blog/${post.slug}`} className="block group-hover:text-[#0B2F63] transition-colors">
                    <h3 className="text-sm sm:text-base font-bold text-slate-900 leading-snug line-clamp-2">
                      {post.title}
                    </h3>
                  </Link>

                  <p className="text-xs text-slate-500 line-clamp-3 leading-relaxed">
                    {post.summary}
                  </p>
                </div>
              </div>

              <div className="p-5 pt-0 border-t border-slate-100 flex items-center justify-between text-xs pt-3">
                <span className="text-slate-400 text-[11px] font-mono">{post.publishedDate}</span>
                <Link
                  to={`/blog/${post.slug}`}
                  className="font-bold text-[#0B2F63] hover:text-[#38B6FF] flex items-center gap-1"
                >
                  <span>Read Article</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>

            </div>
          ))}
        </div>

      </div>

    </div>
  );
};
