import React from 'react';

const bannerFiles = [
  "01.gif", "02.gif", "04.gif", "05.jpg", "22.png", "blink-0.gif", 
  "button-devils.gif", "ddg.gif", "e32.gif", "e71.gif", "f38.gif", 
  "fckingwww.gif", "h37.gif", "hikikomorigrave.gif", "volta.gif", 
  "vscbutton.gif", "x20.gif", "y1.gif", "youcantoo!.gif"
];

export default function BannerSlider() {
  return (
    <div className="fixed bottom-0 left-0 w-full z-[4000] p-2 pointer-events-none">
      <div className="max-w-[1400px] mx-auto bg-[#1a1a1a]/90 backdrop-blur-md border-2 border-[#4b3d8b] rounded-2xl h-14 flex items-center overflow-hidden shadow-[0_0_20px_rgba(75,61,139,0.5)] pointer-events-auto">
        
        {/* Label */}
        <div className="px-4 h-full flex items-center bg-[#2d1b4d] border-r-2 border-[#4b3d8b] shrink-0">
          <span className="text-white font-mono font-bold text-xs tracking-tighter uppercase">[Banners]</span>
        </div>

        {/* Marquee Track */}
        <div className="flex-1 overflow-hidden relative h-full flex items-center">
          <div className="flex animate-marquee hover:pause whitespace-nowrap items-center gap-4 px-4 h-full">
            {/* Render two sets for seamless loop */}
            {[...bannerFiles, ...bannerFiles, ...bannerFiles].map((file, idx) => (
              <img 
                key={idx}
                src={`/Banners/${file}`} 
                alt="banner"
                className="h-8 w-auto object-contain hover:scale-110 transition-transform cursor-crosshair pixelated"
                referrerPolicy="no-referrer"
                onError={(e) => (e.currentTarget.style.display = 'none')}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
