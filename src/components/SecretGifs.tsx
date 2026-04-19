import React from 'react';

interface Gif {
  id: number;
  url: string;
  left: number;
  top: number;
  scale: number;
}

interface SecretGifsProps {
  gifs: Gif[];
  isEditMode: boolean;
  onGifChange: (id: number, data: { left: number, top: number }) => void;
  onDeleteGif: (id: number) => void;
}

export default function SecretGifs({ gifs, isEditMode, onGifChange, onDeleteGif }: SecretGifsProps) {
  return (
    <>
      {gifs.map(gif => (
        <div 
          key={gif.id}
          className={`absolute ${isEditMode ? 'cursor-move ring-2 ring-yellow-400' : ''}`}
          style={{ 
            left: gif.left, 
            top: gif.top,
            transform: `scale(${gif.scale || 1})`,
            transformOrigin: 'top left',
            zIndex: 40
          }}
          onPointerDown={isEditMode ? (e) => {
            // Lógica de arrastre
            const rect = e.currentTarget.parentElement?.getBoundingClientRect();
            const worldScale = rect ? rect.width / 1920 : 1;
            const startX = e.clientX;
            const startY = e.clientY;
            const startL = gif.left;
            const startT = gif.top;
            
            const moveHandler = (moveEvent: PointerEvent) => {
              const dx = (moveEvent.clientX - startX) / worldScale;
              const dy = (moveEvent.clientY - startY) / worldScale;
              onGifChange(gif.id, { left: startL + dx, top: startT + dy });
            };
            
            const upHandler = () => {
              window.removeEventListener('pointermove', moveHandler);
              window.removeEventListener('pointerup', upHandler);
            };
            
            window.addEventListener('pointermove', moveHandler);
            window.addEventListener('pointerup', upHandler);
          } : undefined}
        >
          <img 
            src={gif.url} 
            alt="custom-gif" 
            className="max-w-[300px] pointer-events-none select-none"
            referrerPolicy="no-referrer"
          />
          {isEditMode && (
            <button 
              onClick={(e) => { e.stopPropagation(); onDeleteGif(gif.id); }}
              className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-[10px] pointer-events-auto"
            >
              ×
            </button>
          )}
        </div>
      ))}
    </>
  );
}
