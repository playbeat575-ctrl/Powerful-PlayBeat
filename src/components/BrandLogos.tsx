import React from 'react'

export const NetflixArtwork: React.FC<{ className?: string }> = ({ className = 'w-full h-full' }) => (
  <div className={`relative flex items-center justify-center bg-[#070D22] overflow-hidden ${className}`}>
    {/* Blue/Cyan Electric Wave Matrix */}
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(56,189,248,0.18)_0%,_transparent_70%)] pointer-events-none"></div>
    <svg className="absolute inset-0 w-full h-full opacity-35" viewBox="0 0 200 120" preserveAspectRatio="none">
      <path d="M0,60 Q50,20 100,60 T200,60" fill="none" stroke="#38BDF8" strokeWidth="0.8" strokeDasharray="3 3" />
      <path d="M0,75 Q60,35 120,75 T200,75" fill="none" stroke="#60A5FA" strokeWidth="0.6" />
      <path d="M0,45 Q40,80 110,45 T200,45" fill="none" stroke="#0284C7" strokeWidth="0.5" strokeDasharray="4 2" />
    </svg>
    {/* Netflix Red N */}
    <div className="relative z-10 drop-shadow-[0_0_20px_rgba(229,9,20,0.6)]">
      <svg className="w-16 h-20" viewBox="0 0 64 90" fill="none">
        <path d="M12 0H24V90H12V0Z" fill="#B81D24" />
        <path d="M40 0H52V90H40V0Z" fill="#B81D24" />
        <path d="M12 0H25.5L52 90H38.5L12 0Z" fill="#E50914" />
      </svg>
    </div>
  </div>
)

export const PlayStationArtwork: React.FC<{ className?: string }> = ({ className = 'w-full h-full' }) => (
  <div className={`relative flex items-center justify-center bg-[#060D26] overflow-hidden ${className}`}>
    {/* Electric Blue Water Net */}
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(37,99,235,0.25)_0%,_transparent_70%)] pointer-events-none"></div>
    <svg className="absolute inset-0 w-full h-full opacity-40" viewBox="0 0 200 120" preserveAspectRatio="none">
      <path d="M-20,40 Q40,90 100,30 T220,70" fill="none" stroke="#38BDF8" strokeWidth="0.9" />
      <path d="M0,80 Q70,20 140,80 T200,40" fill="none" stroke="#0070D1" strokeWidth="0.7" strokeDasharray="4 3" />
      <path d="M20,20 Q80,100 160,30" fill="none" stroke="#93C5FD" strokeWidth="0.5" />
    </svg>
    {/* White PS Logo with 3D shadow */}
    <div className="relative z-10 drop-shadow-[0_0_25px_rgba(0,112,209,0.7)]">
      <svg className="w-20 h-16" viewBox="0 0 100 80" fill="none">
        {/* P */}
        <path
          d="M38 12C38 12 37.8 28.5 37.8 45.2C41.2 46.5 45.2 47.1 49.3 47.1C58.8 47.1 66.5 43.1 66.5 33.5C66.5 24.3 60.1 19.8 49.6 19.8C46.2 19.8 41.5 20.8 38 22.3V12ZM48.6 28.8C54 28.8 57.5 30.5 57.5 34.3C57.5 38.2 53.6 40.2 48.6 40.2C45.2 40.2 40.8 39.5 38 38.2V29.8C41 29.1 45.1 28.8 48.6 28.8Z"
          fill="#F0F2F5"
        />
        {/* S */}
        <path
          d="M28 58.5C31.5 59.8 36.8 60.5 42.5 60.5C53.2 60.5 61.2 57.2 61.2 50.8C61.2 47.2 58.1 44.8 52.8 44C47.2 43.2 43.5 42.1 43.5 39.8C43.5 38.2 45.5 37.1 49 37.1C52.2 37.1 56 37.9 58.8 39.2L62.2 32.5C58.5 31 53.5 30.2 48.5 30.2C38.2 30.2 31.8 34.2 31.8 40.5C31.8 44.2 35.2 46.8 40.8 47.5C46.5 48.2 50 49.5 50 51.8C50 53.5 47.5 54.5 43.2 54.5C38.8 54.5 33.8 53.5 30.5 51.8L28 58.5Z"
          fill="#C0C6D4"
          fillOpacity="0.85"
        />
      </svg>
    </div>
  </div>
)

export const SpotifyArtwork: React.FC<{ className?: string }> = ({ className = 'w-full h-full' }) => (
  <div className={`relative flex items-center justify-center bg-[#05111B] overflow-hidden ${className}`}>
    {/* Emerald Green Energy Waves */}
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(29,185,84,0.22)_0%,_transparent_70%)] pointer-events-none"></div>
    <svg className="absolute inset-0 w-full h-full opacity-35" viewBox="0 0 200 120" preserveAspectRatio="none">
      <path d="M0,50 Q60,90 130,40 T200,60" fill="none" stroke="#1DB954" strokeWidth="0.8" />
      <path d="M-10,70 Q50,20 120,70 T210,50" fill="none" stroke="#10B981" strokeWidth="0.6" strokeDasharray="3 3" />
    </svg>
    {/* Spotify Green Icon */}
    <div className="relative z-10 drop-shadow-[0_0_25px_rgba(29,185,84,0.65)]">
      <svg className="w-18 h-18 text-[#1DB954]" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4.586 14.424c-.18.295-.563.387-.857.207-2.35-1.434-5.308-1.758-8.793-.963-.335.077-.67-.133-.746-.468-.077-.334.132-.67.467-.746 3.809-.87 7.076-.503 9.722 1.113.294.18.386.563.207.857zm1.226-2.723c-.226.367-.71.482-1.077.256-2.69-1.654-6.79-2.134-9.97-1.168-.413.125-.85-.11-975-.523s.11-.85.523-.975c3.633-1.103 8.16-.57 11.243 1.332.367.227.482.711.256 1.078zm.105-2.835C14.692 8.95 9.375 8.775 6.297 9.71c-.494.15-1.02-.132-1.17-.626-.15-.493.132-1.02.626-1.17 3.54-1.074 9.426-.867 13.155 1.347.444.263.59.84.327 1.284-.264.444-.84.59-1.284.327z" />
      </svg>
    </div>
  </div>
)

export const DisneyArtwork: React.FC<{ className?: string }> = ({ className = 'w-full h-full' }) => (
  <div className={`relative flex items-center justify-center bg-[#050C22] overflow-hidden ${className}`}>
    {/* Blue Magic Energy Arc */}
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(56,189,248,0.22)_0%,_transparent_70%)] pointer-events-none"></div>
    <svg className="absolute inset-0 w-full h-full opacity-40" viewBox="0 0 200 120" preserveAspectRatio="none">
      <path d="M20,95 Q100,5 180,95" fill="none" stroke="#38BDF8" strokeWidth="1.2" />
      <path d="M10,85 Q100,15 190,85" fill="none" stroke="#60A5FA" strokeWidth="0.6" strokeDasharray="3 3" />
    </svg>
    {/* Disney+ Typography & Plus */}
    <div className="relative z-10 flex items-center gap-1 drop-shadow-[0_0_25px_rgba(56,189,248,0.7)]">
      <span className="font-serif italic font-extrabold text-2xl sm:text-3xl text-white tracking-wider">
        Disney<span className="text-sky-400 font-sans font-black text-3xl not-italic ml-0.5">+</span>
      </span>
    </div>
  </div>
)

export const XboxArtwork: React.FC<{ className?: string }> = ({ className = 'w-full h-full' }) => (
  <div className={`relative flex items-center justify-center bg-[#05140C] overflow-hidden ${className}`}>
    {/* Green Xbox Glow Aura */}
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(16,185,129,0.25)_0%,_transparent_70%)] pointer-events-none"></div>
    <svg className="absolute inset-0 w-full h-full opacity-35" viewBox="0 0 200 120" preserveAspectRatio="none">
      <path d="M0,60 Q70,10 140,60 T200,60" fill="none" stroke="#10B981" strokeWidth="0.8" />
      <path d="M-10,40 Q60,90 130,40 T210,40" fill="none" stroke="#34D399" strokeWidth="0.6" strokeDasharray="3 3" />
    </svg>
    {/* Xbox Sphere Green Logo */}
    <div className="relative z-10 drop-shadow-[0_0_25px_rgba(16,185,129,0.7)]">
      <svg className="w-18 h-18" viewBox="0 0 64 64" fill="none">
        <circle cx="32" cy="32" r="30" fill="#107C10" />
        <path
          d="M17 18.5C21.5 24.5 27.5 32 32 37.5C36.5 32 42.5 24.5 47 18.5C40 13 24 13 17 18.5Z"
          fill="#060B1E"
        />
        <path
          d="M11 25.5C12.5 32 17 41.5 24 49C16.5 45.5 12 36.5 11 25.5ZM53 25.5C52 36.5 47.5 45.5 40 49C47 41.5 51.5 32 53 25.5Z"
          fill="#060B1E"
        />
      </svg>
    </div>
  </div>
)

export const PlayBeatHeroVisual: React.FC = () => {
  return (
    <div className="relative w-full aspect-square max-w-[440px] mx-auto flex items-center justify-center">
      {/* Outer Water/Liquid Golden Energy Aura */}
      <div className="absolute inset-0 bg-[radial-gradient(circle,_rgba(255,193,7,0.22)_0%,_rgba(56,189,248,0.18)_45%,_transparent_72%)] blur-2xl animate-pulse"></div>

      {/* Orbiting Gold Wave Net */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 400 400">
        <defs>
          <linearGradient id="goldGradientRing" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFBEB" />
            <stop offset="40%" stopColor="#FFC107" />
            <stop offset="80%" stopColor="#FF9800" />
            <stop offset="100%" stopColor="#C0C6D4" />
          </linearGradient>
          <linearGradient id="blueGlowWave" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#2563EB" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#FFC107" stopOpacity="0.6" />
          </linearGradient>
        </defs>

        {/* Orbit Rings (3D Ellipses) */}
        <ellipse
          cx="200"
          cy="200"
          rx="180"
          ry="65"
          fill="none"
          stroke="url(#goldGradientRing)"
          strokeWidth="3"
          transform="rotate(-25 200 200)"
          className="drop-shadow-[0_0_15px_rgba(255,193,7,0.5)]"
        />
        <ellipse
          cx="200"
          cy="200"
          rx="170"
          ry="55"
          fill="none"
          stroke="#C0C6D4"
          strokeWidth="1.2"
          strokeDasharray="6 4"
          transform="rotate(35 200 200)"
          opacity="0.6"
        />

        {/* Dynamic Water-Flow Energy Wave Lines at the base */}
        <path
          d="M30,300 Q100,240 200,290 T370,300"
          fill="none"
          stroke="url(#blueGlowWave)"
          strokeWidth="2.5"
          className="animate-pulse"
        />
        <path
          d="M50,320 Q150,270 250,330 T360,310"
          fill="none"
          stroke="#FFC107"
          strokeWidth="1.5"
          strokeDasharray="4 2"
          opacity="0.8"
        />
        <path
          d="M70,340 Q180,300 280,350 T340,330"
          fill="none"
          stroke="#38BDF8"
          strokeWidth="1"
          opacity="0.5"
        />

        {/* Orbiting Golden Floating Spheres */}
        <circle cx="340" cy="165" r="9" fill="url(#goldGradientRing)" className="drop-shadow-[0_0_12px_#FFC107]" />
        <circle cx="260" cy="270" r="7" fill="url(#goldGradientRing)" className="drop-shadow-[0_0_10px_#FFC107]" />
        <circle cx="65" cy="220" r="5" fill="#FFFBEB" className="drop-shadow-[0_0_8px_#FFF]" />
      </svg>

      {/* Main 3D Metallic Ring with PlayBeat Gold Triangle */}
      <div className="relative z-10 w-44 h-44 sm:w-52 sm:h-52 rounded-full p-[5px] bg-gradient-to-tr from-[#94A3B8] via-[#F8FAFC] to-[#FFC107] shadow-[0_0_50px_rgba(255,193,7,0.45),inset_0_0_20px_rgba(255,255,255,0.4)] flex items-center justify-center group cursor-pointer hover:scale-105 transition-all duration-500">
        {/* Dark Metallic Inner Ring */}
        <div className="w-full h-full rounded-full bg-gradient-to-br from-[#0B1220] via-[#0F1A2E] to-[#040816] border-2 border-yellow-400/40 flex items-center justify-center relative overflow-hidden shadow-inner">
          {/* Inner Light Sheen */}
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-yellow-400/15 to-transparent"></div>

          {/* Golden 3D Triangular Play Icon */}
          <div className="relative z-10 w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center drop-shadow-[0_0_25px_rgba(255,193,7,0.9)]">
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <defs>
                <linearGradient id="playGoldFace" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FFFBEB" />
                  <stop offset="35%" stopColor="#FFD54F" />
                  <stop offset="70%" stopColor="#FFC107" />
                  <stop offset="100%" stopColor="#FF8F00" />
                </linearGradient>
                <linearGradient id="playGoldEdge" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#FFE082" />
                  <stop offset="100%" stopColor="#E65100" />
                </linearGradient>
              </defs>
              {/* Rounded 3D Play Triangle */}
              <polygon
                points="28,15 85,50 28,85"
                fill="url(#playGoldFace)"
                stroke="url(#playGoldEdge)"
                strokeWidth="3.5"
                strokeLinejoin="round"
              />
              <polygon
                points="33,26 73,50 33,74"
                fill="none"
                stroke="#FFFFFF"
                strokeWidth="1.5"
                opacity="0.6"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  )
}
