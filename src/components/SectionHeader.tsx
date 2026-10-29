import React from 'react';

interface SectionHeaderProps {
  eyebrow: string;
  icon?: React.ReactNode;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: 'left' | 'center';
  tone?: 'light' | 'dark';
  className?: string;
}

// Shared heading block so every section uses the same type scale and rhythm.
export const SectionHeader: React.FC<SectionHeaderProps> = ({
  eyebrow,
  icon,
  title,
  description,
  align = 'left',
  tone = 'light',
  className = '',
}) => {
  const isCenter = align === 'center';
  const isDark = tone === 'dark';

  return (
    <div className={`max-w-3xl ${isCenter ? 'mx-auto text-center' : ''} ${className}`}>
      <p
        className={`inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.12em] ${
          isDark ? 'text-[#38B6FF]' : 'text-sky-600'
        } [&_svg]:w-4 [&_svg]:h-4`}
      >
        {icon}
        <span>{eyebrow}</span>
      </p>
      <h2
        className={`mt-3 text-3xl sm:text-4xl font-extrabold tracking-tight leading-[1.15] ${
          isDark ? 'text-white' : 'text-[#0B2F63]'
        }`}
      >
        {title}
      </h2>
      {description && (
        <p className={`mt-4 text-base sm:text-lg leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
          {description}
        </p>
      )}
    </div>
  );
};
