import React, { useState } from 'react';

// Aquí configuras tus URLs de Tumblr y de Instagram
const collectionUrls = [
  { 
    id: 1,
    type: 'gdrive', 
    url: 'https://drive.google.com/file/d/1iJAMtdRmEUtHm2C314DuF_Mm81WdSGRS/preview' // Video de Google Drive iframe
  },
  { 
    id: 2,
    type: 'image', 
    url: 'https://64.media.tumblr.com/8df4ae266b187da36dec1252cb861642/tumblr_okz4wkUtpM1w3bamko1_400.gifv' // Ejemplo GIF de Tumblr
  },
  { 
    id: 3,
    type: 'image', 
    url: 'https://64.media.tumblr.com/06db0148cc2a8bcebe1a3c67afb1e74a/753d40bd63568b6e-f6/s540x810/a2d068066113cbf9785367e3d5f3eea5b3950ff2.jpg' // Ejemplo GIF de Tumblr
  },
  { 
    id: 4,
    type: 'image', 
    url: 'https://64.media.tumblr.com/97c25d7efb54c3d97144ff2c56f9c24b/tumblr_ni2vl6Vt3Z1r5nwzoo1_640.jpg' // Ejemplo GIF de Tumblr
  },
  { 
    id: 5,
    type: 'image', 
    url: 'https://64.media.tumblr.com/3a858a334cf5844c89239bf703309845/tumblr_nhg9mtZnfD1sq9yswo1_500.gifv' // Ejemplo GIF de Tumblr
  },
  { 
    id: 6,
    type: 'image', 
    url: 'https://64.media.tumblr.com/27be73ba19a3bc203d076325309b24d1/tumblr_ned2vdH9j01rvb8cmo1_400.gifv' // Ejemplo GIF de Tumblr
  },
  { 
    id: 7,
    type: 'image', 
    url: 'https://64.media.tumblr.com/938d3adc98e425b833a6a87a961a9812/tumblr_nhfa7yiTV51r8zaxto5_r1_500.gifv' // Ejemplo GIF de Tumblr
  },
];

export default function CollectionsViewer() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    if (currentIndex < collectionUrls.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const currentItem = collectionUrls[currentIndex];

  return (
    <div className="w-full flex justify-center py-4 bg-[#dbd0c4]">
      <div className="w-full max-w-xl border-2 border-[#8c735d] bg-[#f0e6d2] p-4 flex flex-col items-center shadow-[inset_0_0_10px_rgba(0,0,0,0.1)]">
        
        <div className="text-sm font-serif text-[#5c3a21] font-bold mb-4 border-b-2 border-[#8c735d] w-full text-center pb-2">
          Asset {currentIndex + 1} de {collectionUrls.length}
        </div>
        
        <div className="w-full max-w-[400px] aspect-square bg-[#e6d5c3] flex items-center justify-center overflow-hidden mb-6 border-[3px] border-[#5c3a21] shadow-[4px_4px_0_#5c3a21] relative">
          
          {currentItem.type === 'video' && (
            <video 
                src={currentItem.url} 
                controls 
                className="w-full h-full object-contain bg-black"
            />
          )}

          {currentItem.type === 'image' && (
            <img 
                src={currentItem.url} 
                alt={`Collect ${currentIndex}`} 
                className="w-full h-full object-contain bg-black"
            />
          )}

          {currentItem.type === 'gdrive' && (
            <iframe 
              src={currentItem.url} 
              className="w-full h-full bg-black border-none"
              allow="autoplay; encrypted-media" 
              allowFullScreen
            ></iframe>
          )}

          {currentItem.type === 'ig-embed' && (
            <iframe 
              src={currentItem.url} 
              className="w-full h-full bg-white"
              frameBorder="0" 
              scrolling="no" 
              allowTransparency
            ></iframe>
          )}

        </div>
        
        <div className="flex gap-4">
          <button 
            onClick={handlePrev} 
            disabled={currentIndex === 0}
            className="px-6 py-2 bg-[#8c735d] text-white disabled:bg-[#b0a092] rounded shadow-[2px_2px_0px_#5c3a21] active:translate-y-1 active:shadow-none transition-all font-bold text-sm disabled:active:translate-y-0 disabled:active:shadow-[2px_2px_0px_#5c3a21]"
          >
            ◀ Anterior
          </button>
          <button 
            onClick={handleNext}
            disabled={currentIndex === collectionUrls.length - 1}
            className="px-6 py-2 bg-[#8c735d] text-white disabled:bg-[#b0a092] rounded shadow-[2px_2px_0px_#5c3a21] active:translate-y-1 active:shadow-none transition-all font-bold text-sm disabled:active:translate-y-0 disabled:active:shadow-[2px_2px_0px_#5c3a21]"
          >
            Siguiente ▶
          </button>
        </div>

      </div>
    </div>
  );
}
