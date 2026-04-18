import React, { useState, useRef, useEffect } from 'react';

interface Props {
  id: number;
  initialLeft: number;
  initialTop: number;
  initialWidth: number;
  initialHeight: number;
  isEditMode: boolean;
  onClick: () => void;
  onChange: (id: number, data: {left: number, top: number, width: number, height: number}) => void;
}

export default function DraggableCollider({ id, initialLeft, initialTop, initialWidth, initialHeight, isEditMode, onClick, onChange }: Props) {
  const elementRef = useRef<HTMLDivElement>(null);
  
  // Usamos ref para evitar conflictos de renderizado durante el arrastre a 60fps
  const isDraggingRef = useRef(false);
  const isResizingRef = useRef(false);
  const dragAnchor = useRef({ startX: 0, startY: 0, startLeft: 0, startTop: 0, startWidth: 0, startHeight: 0 });

  const [pos, setPos] = useState({ left: initialLeft, top: initialTop, width: initialWidth, height: initialHeight });

  // Sincronizar perezosamente
  useEffect(() => {
    if (!isDraggingRef.current && !isResizingRef.current) {
      setPos({ left: initialLeft, top: initialTop, width: initialWidth, height: initialHeight });
    }
  }, [initialLeft, initialTop, initialWidth, initialHeight]);

  const getScale = () => {
    const parentContainer = elementRef.current?.parentElement;
    if (parentContainer) {
      const rect = parentContainer.getBoundingClientRect();
      const parentOffsetWidth = parentContainer.offsetWidth || 1920;
      return rect.width / parentOffsetWidth;
    }
    return 1;
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isEditMode) return;
    e.stopPropagation();
    e.preventDefault(); // Evita bugs de arrastre nativo del browser
    
    // Identificar si está arrastrando el control de tamaño o el cuerpo de la caja
    if ((e.target as HTMLElement).dataset.resizeHandle) {
      isResizingRef.current = true;
    } else {
      isDraggingRef.current = true;
    }

    dragAnchor.current = {
      startX: e.clientX,
      startY: e.clientY,
      startLeft: pos.left,
      startTop: pos.top,
      startWidth: pos.width,
      startHeight: pos.height
    };
    
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current && !isResizingRef.current) return;
    e.stopPropagation();

    const scale = getScale();
    const dx = (e.clientX - dragAnchor.current.startX) / scale;
    const dy = (e.clientY - dragAnchor.current.startY) / scale;

    setPos(p => {
      const newPos = { ...p };
      if (isDraggingRef.current) {
        newPos.left = dragAnchor.current.startLeft + dx;
        newPos.top = dragAnchor.current.startTop + dy;
      } else if (isResizingRef.current) {
        newPos.width = Math.max(10, dragAnchor.current.startWidth + dx);
        newPos.height = Math.max(10, dragAnchor.current.startHeight + dy);
      }
      
      onChange(id, newPos);
      return newPos;
    });
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isEditMode) return;
    e.stopPropagation();
    isDraggingRef.current = false;
    isResizingRef.current = false;
    e.currentTarget.releasePointerCapture(e.pointerId);
  };

  return (
    <div
      ref={elementRef}
      className={`absolute z-10 select-none ${
        isEditMode 
          ? 'bg-blue-500/40 border-2 border-blue-600 border-dashed hover:bg-blue-500/60 cursor-move' 
          : 'cursor-pointer hover:bg-white/20 rounded-lg transition-colors'
      }`}
      style={{ left: pos.left, top: pos.top, width: pos.width, height: pos.height }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      onClick={!isEditMode ? onClick : undefined}
      title={isEditMode ? `Caja ${id}` : undefined}
    >
      {/* Etiqueta de Debug */}
      {isEditMode && (
        <div className="absolute -top-[22px] left-0 bg-black/80 text-white text-[10px] px-1 font-mono pointer-events-none whitespace-nowrap shadow rounded">
          {Math.round(pos.left)},{Math.round(pos.top)} [{Math.round(pos.width)}x{Math.round(pos.height)}]
        </div>
      )}

      {/* Grip cuadrito para cambiar de tamaño manualmente */}
      {isEditMode && (
        <div 
          data-resize-handle="true"
          className="absolute bottom-0 right-0 w-4 h-4 bg-white border border-black cursor-se-resize shadow flex items-center justify-center"
        >
          <div className="w-1 h-1 bg-black rounded-full pointer-events-none" />
        </div>
      )}
    </div>
  );
}
