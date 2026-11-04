import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  Calendar, 
  Clock, 
  User, 
  Share2, 
  Tag, 
  ChevronRight,
  ShieldCheck,
  FileText
} from 'lucide-react';
import { BLOG_POSTS } from '../data/blog';

interface BlogDetailPageProps {
  onOpenRfq: () => void;
}

export const BlogDetailPage: React.FC<BlogDetailPageProps> = ({ onOpenRfq }) => {
  const { slug } = useParams<{ slug: string }>();

  const post = BLOG_POSTS.find((p) => p.slug === slug);

  if (!post) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-xl font-bold text-slate-800">Article Not Found</h2>
        <p className="text-xs text-slate-500">The clinical article you are searching for may have been archived.</p>
        <Link
          to="/blog"
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#0B2F63] text-white text-xs font-bold rounded-xl"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Blog & News</span>
        </Link>
      </div>
    );
  }

  const relatedPosts = BLOG_POSTS.filter((p) => p.id !== post.id).slice(0, 2);

  return (
    <div className="space-y-12 pb-16">
      
      {/* Breadcrumb Navigation */}
      <div className="bg-slate-100/80 border-b border-slate-200 py-3 text-xs text-slate-500">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-1.5 flex-wrap">
          <Link to="/" className="hover:text-[#0B2F63] transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <Link to="/blog" className="hover:text-[#0B2F63] transition-colors">Blog</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-800 font-medium truncate max-w-sm">{post.title}</span>
        </div>
      </div>

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Article Header */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-xs">
            <span className="font-bold text-[#38B6FF] uppercase tracking-wide">
              {post.category}
            </span>
            <span className="text-slate-300">·</span>
            <span className="text-slate-400 font-mono">{post.publishedDate}</span>
            <span className="text-slate-300">·</span>
            <span className="text-slate-500">{post.readTime}</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-[#0B2F63] tracking-tight leading-tight">
            {post.title}
          </h1>

          {/* Author Badge */}
          <div className="flex items-center gap-3 pt-2 border-y border-slate-100 py-3 text-xs text-slate-600">
            <div className="w-9 h-9 rounded-full bg-blue-100 text-[#0B2F63] font-bold flex items-center justify-center shrink-0">
              {post.author.charAt(0)}
            </div>
            <div>
              <div className="font-bold text-slate-900">{post.author}</div>
              <div className="text-[11px] text-slate-400">{post.authorRole}</div>
            </div>
          </div>
        </div>

        {/* Featured Image */}
        <div className="rounded-2xl overflow-hidden border border-slate-200 bg-slate-50 p-6 flex items-center justify-center max-h-[380px]">
          <img
            src={post.featuredImage}
            alt={post.title}
            className="max-h-[320px] max-w-full object-contain"
          />
        </div>

        {/* Body Paragraphs */}
        <div className="space-y-5 text-sm sm:text-base text-slate-700 leading-relaxed font-serif">
          {post.content.map((paragraph, idx) => (
            <p key={idx} className="leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>

        {/* Tags */}
        <div className="pt-6 border-t border-slate-200 flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold text-slate-500 mr-2 flex items-center gap-1">
            <Tag className="w-3.5 h-3.5" />
            <span>Tags:</span>
          </span>
          {post.tags.map((tag) => (
            <span key={tag} className="px-2.5 py-1 bg-slate-100 rounded-lg text-xs font-mono text-slate-700">
              #{tag}
            </span>
          ))}
        </div>

        {/* Institutional Consultation Box */}
        <div className="bg-slate-900 text-white p-6 sm:p-8 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-5">
          <div>
            <h3 className="text-base sm:text-lg font-bold text-white">Require Clinical Evidence or Regulatory Samples?</h3>
            <p className="text-xs text-slate-300 mt-1">
              Secure MediTech Global provides sample catheter evaluation packs for hospital clinical trials and tender technical files.
            </p>
          </div>
          <button
            onClick={onOpenRfq}
            className="px-5 py-2.5 bg-[#38B6FF] hover:bg-[#209ee8] text-white text-xs font-bold rounded-xl shrink-0 cursor-pointer"
          >
            Request Evaluation Samples
          </button>
        </div>

      </article>

    </div>
  );
};
