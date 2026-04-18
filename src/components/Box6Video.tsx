import React from 'react';

export default function Box6Video() {
  return (
    <div className="w-full flex justify-center py-4 bg-black">
      <video 
        src="https://static.bumpworthy.com/bumps/3784.d.mp4" 
        controls 
        className="max-w-full h-auto rounded border-2 border-[#8c735d] shadow-[0_0_15px_rgba(0,0,0,0.8)]"
        autoPlay
        loop
      >
        Tu navegador no soporta el formato de video.
      </video>
    </div>
  );
}
