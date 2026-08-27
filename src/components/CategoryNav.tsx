import React from 'react'
import {
  FileText,
  Gift,
  PlaySquare,
  Layers,
  Gamepad2,
  CreditCard,
  Tv,
  ArrowRight,
} from 'lucide-react'
import { CATEGORIES_DATA } from '../data/products'

interface CategoryNavProps {
  selectedCategory: string
  onSelectCategory: (cat: string) => void
  onViewAll?: () => void
}

export const CategoryNav: React.FC<CategoryNavProps> = ({
  selectedCategory,
  onSelectCategory,
  onViewAll,
}) => {
  // Only display the 7 primary top categories shown in screenshot 1
  const displayCategories = [
    { name: 'Digital Products', icon: FileText, slug: 'Digital Products' },
    { name: 'Gift Cards', icon: Gift, slug: 'Gift Cards' },
    { name: 'Streaming', icon: PlaySquare, slug: 'Streaming' },
    { name: 'Subscriptions', icon: Layers, slug: 'Subscriptions' },
    { name: 'Gaming', icon: Gamepad2, slug: 'Gaming' },
    { name: 'Software', icon: CreditCard, slug: 'Software' },
    { name: 'IPTV & Services', icon: Tv, slug: 'IPTV & Services' },
  ]

  return (
    <section className="w-full py-8 bg-[#050814] relative">
      {/* Dynamic Water Glow Ambient Base */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-[radial-gradient(ellipse_at_bottom,_rgba(255,193,7,0.1)_0%,_rgba(56,189,248,0.08)_50%,_transparent_75%)] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header (Matching Screenshot 1) */}
        <div className="flex items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-5 rounded-full bg-[#FFC107] inline-block"></span>
            <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight font-sans">
              Browse Top Categories
            </h2>
          </div>

          <button
            onClick={onViewAll}
            className="flex items-center gap-1.5 text-xs sm:text-sm font-medium text-slate-300 hover:text-yellow-400 transition group"
          >
            <span>View All</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

        {/* 7 Category Cards Row with Water-Glow (Exact from Screenshot 1) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-3 sm:gap-4">
          {displayCategories.map((cat) => {
            const Icon = cat.icon
            const isSelected = selectedCategory === cat.slug

            return (
              <div key={cat.slug} className="relative group">
                {/* Water Glow Reflection Beneath Card on Hover / Active */}
                <div
                  className={`absolute -bottom-2 inset-x-2 h-4 rounded-full blur-md transition duration-300 ${
                    isSelected
                      ? 'bg-yellow-400/40 opacity-100'
                      : 'bg-yellow-400/0 group-hover:bg-yellow-400/30 group-hover:opacity-100'
                  }`}
                ></div>

                <button
                  id={`cat-card-${cat.slug.replace(/\s+/g, '-').toLowerCase()}`}
                  onClick={() => onSelectCategory(isSelected ? 'all' : cat.slug)}
                  className={`w-full flex flex-col items-center justify-center p-4 rounded-2xl transition-all duration-300 relative z-10 text-center ${
                    isSelected
                      ? 'bg-gradient-to-b from-[#142352] to-[#0A122E] border-2 border-yellow-400 shadow-[0_0_20px_rgba(255,193,7,0.35)] -translate-y-1'
                      : 'bg-[#0B1220]/90 hover:bg-[#0E1A3D] border border-slate-400/15 hover:border-yellow-400/40 hover:-translate-y-1'
                  }`}
                >
                  {/* Glowing Icon Frame */}
                  <div
                    className={`w-11 h-11 rounded-xl flex items-center justify-center mb-3 transition-colors ${
                      isSelected
                        ? 'bg-yellow-400/20 text-yellow-300 border border-yellow-400/40'
                        : 'bg-[#060B1E] text-slate-300 group-hover:text-yellow-400 border border-slate-400/20'
                    }`}
                  >
                    <Icon className="w-5 h-5 stroke-[1.8]" />
                  </div>

                  <span
                    className={`text-xs font-medium tracking-tight line-clamp-1 ${
                      isSelected ? 'text-yellow-300 font-semibold' : 'text-slate-200 group-hover:text-white'
                    }`}
                  >
                    {cat.name}
                  </span>
                </button>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
