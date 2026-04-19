import React, { useState } from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db, handleFirestoreError } from '../firebase';

interface Props {
  question: string;
  onClose: () => void;
}

export default function KawaiiDialog({ question, onClose }: Props) {
  const [answer, setAnswer] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDone, setIsDone] = useState(false);

  const handleSubmit = async () => {
    if (!answer.trim() || isSubmitting) return;
    setIsSubmitting(true);
    try {
      await addDoc(collection(db, 'questionnaire_responses'), {
        question,
        answer: answer.trim(),
        createdAt: serverTimestamp()
      });
      setIsDone(true);
      setTimeout(onClose, 2000);
    } catch (e) {
      handleFirestoreError(e, 'create', '/questionnaire_responses');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fadeIn">
      <div className="w-[350px] bg-[#f8e1f4] border-4 border-white shadow-[8px_8px_0_rgba(255,182,193,0.5)] flex flex-col overflow-hidden animate-winAppear">
        {/* Title Bar - Kawaii Gradient */}
        <div className="bg-gradient-to-r from-[#ffafbd] to-[#ffc3a0] p-1 flex justify-between items-center border-b-2 border-white">
          <div className="flex items-center gap-1 ml-1">
            <span className="text-[10px] drop-shadow-sm">💖</span>
            <span className="text-white font-bold text-xs tracking-tight drop-shadow-sm">Kawaii.exe</span>
          </div>
          <button 
            onClick={onClose}
            className="bg-[#c0c0c0] text-black border-2 border-t-white border-l-white border-b-black border-r-black w-5 h-5 flex items-center justify-center text-xs font-bold leading-none hover:bg-red-400 transition-colors"
          >
            ×
          </button>
        </div>

        {/* Content */}
        <div className="p-4 flex flex-col gap-3">
          <div className="bg-white/80 p-3 border-2 border-[#ffb6c1] rounded-lg shadow-inner">
            <p className="text-[#d63384] font-bold text-sm leading-snug">
              {question}
            </p>
          </div>

          {isDone ? (
            <div className="text-center py-4 space-y-2 animate-bounce">
              <span className="text-3xl block">🌈✨</span>
              <p className="text-[#d63384] font-black text-xs uppercase tracking-tighter">¡Guardado con éxito!</p>
            </div>
          ) : (
            <>
              <textarea
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                placeholder="Escribe aquí tu respuesta mágica..."
                className="w-full h-24 p-2 text-xs border-2 border-[#ffb6c1] bg-white/60 outline-none text-[#d63384] font-sans resize-none placeholder:text-pink-300 focus:bg-white transition-colors"
              />
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="w-full py-2 bg-gradient-to-r from-[#ffafbd] to-[#ffc3a0] text-white font-black text-xs uppercase tracking-widest border-2 border-white shadow-[4px_4px_0_rgba(255,255,255,0.4)] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all disabled:opacity-50"
              >
                {isSubmitting ? 'Enviando...' : 'Responder 💖'}
              </button>
            </>
          )}
        </div>
        
        {/* Footer */}
        <div className="bg-[#ffafbd]/20 p-1 flex justify-center">
            <span className="text-[8px] text-pink-400 font-mono tracking-tighter">Powered by Neconet 🐾</span>
        </div>
      </div>
    </div>
  );
}
