import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

interface ContractModalProps {
  onClose: () => void;
}

export default function ContractModal({ onClose }: ContractModalProps) {
  const [isAccepted, setIsAccepted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAccept = async () => {
    setIsSubmitting(true);
    try {
      await addDoc(collection(db, "contract_acceptances"), {
        accepted: true,
        timestamp: serverTimestamp(),
      });
      setIsAccepted(true);
    } catch (error) {
      console.error("Error accepting contract:", error);
      alert("Hubo un error al procesar tu aceptación. Inténtalo de nuevo.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-[6000] p-4">
      <AnimatePresence mode="wait">
        {!isAccepted ? (
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            className="w-full max-w-2xl min-h-[500px] border-4 border-[#ff7eb6] shadow-[0_0_50px_rgba(255,126,182,0.6)] relative overflow-hidden flex flex-col"
            style={{ 
              backgroundImage: 'url("/assets/star-background2.gif"), radial-gradient(circle, rgba(20,7,35,0.8) 0%, rgba(0,0,0,1) 100%)',
              backgroundSize: 'cover, auto',
              backgroundPosition: 'center',
              fontFamily: "'Courier New', Courier, monospace"
            }}
          >
            {/* Header with glow */}
            <div className="pt-10 pb-6 px-10 relative">
              <h2 className="text-4xl font-black text-[#ffbde6] drop-shadow-[0_0_10px_#ff0080] tracking-tighter uppercase italic">
                Secret Contract
              </h2>
              <div className="h-0.5 w-full bg-gradient-to-r from-[#ff0080] via-[#ffbde6] to-transparent mt-2 shadow-[0_0_10px_#ff0080]" />
            </div>

            {/* Content List style like the image */}
            <div className="flex-1 px-10 space-y-4 mb-10 overflow-y-auto custom-scrollbar">
              {[
                { emoji: "✨", text: "Si me gustó esta experiencia, acepto recibir más experiencias así e interactuaré." },
                { emoji: "🌸", text: "Gnomito solo te podrá contactar para hablarte del progreso o cosas relacionadas a la producción de estos espacios secretos." },
                { emoji: "👻", text: "Tienes toda la libertad de contactar a gnomito para hacer salidas divertidas, ejemplo patinar, alimentar palomas, o buscar un criptido." }
              ].map((item, idx) => (
                <div 
                  key={idx}
                  className="group relative bg-[#0a0a0a]/60 border border-[#ff7eb6]/30 rounded-full px-6 py-4 flex items-center gap-4 hover:border-[#ff7eb6] hover:bg-[#ff7eb6]/10 transition-all duration-300 shadow-[0_0_15px_rgba(0,0,0,0.5)]"
                >
                  <span className="text-2xl drop-shadow-[0_0_5px_rgba(255,255,255,0.8)]">{item.emoji}</span>
                  <p className="text-[#ffbde6] text-sm md:text-base font-bold tracking-tight">
                    {idx + 1}. {item.text}
                  </p>
                  {/* Neon border effect like the image */}
                  <div className="absolute inset-0 rounded-full border border-[#ff0080]/0 group-hover:border-[#ff0080] group-hover:shadow-[0_0_10px_#ff0080] pointer-events-none transition-all duration-300" />
                </div>
              ))}
            </div>

            {/* Accept Button area */}
            <div className="pb-12 flex flex-col items-center gap-4 relative z-10">
              <button
                disabled={isSubmitting}
                onClick={handleAccept}
                className="group relative px-16 py-4 bg-transparent border-2 border-[#ff0080] text-[#ffbde6] text-2xl font-black italic uppercase tracking-widest hover:bg-[#ff0080] hover:text-white transition-all duration-300 shadow-[0_0_20px_#ff0080] active:scale-95 disabled:opacity-50"
              >
                <span className="relative z-10">Aceptar</span>
                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
              
              <button 
                onClick={onClose}
                className="text-[#ff7eb6] text-xs font-bold uppercase tracking-widest hover:text-white transition-colors opacity-70 hover:opacity-100"
                disabled={isSubmitting}
              >
                Back to void
              </button>
            </div>

            {/* Side Star Elements */}
            <div className="absolute top-1/2 -right-4 text-6xl text-[#ff0080] blur-sm animate-pulse">✦</div>
            <div className="absolute bottom-10 -left-4 text-4xl text-[#ffbde6] blur-[2px] animate-bounce">✦</div>
          </motion.div>
        ) : (
          <motion.div 
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            className="flex flex-col items-center justify-center gap-6"
          >
            <div className="relative group cursor-pointer" onClick={onClose}>
              <img 
                src="https://i.pinimg.com/originals/b9/6e/18/b96e183ff799ffc78a503a60fe9727ff.gif" 
                alt="Accepted!" 
                className="w-80 h-auto rounded-3xl shadow-[0_0_60px_rgba(255,105,180,0.6)] border-4 border-white"
              />
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="absolute -top-10 left-1/2 -translate-x-1/2 bg-white text-pink-500 px-4 py-2 rounded-full font-bold shadow-lg"
              >
                ¡GRACIAS! ✨
              </motion.div>
            </div>
            <button 
              onClick={onClose}
              className="px-8 py-2 bg-white text-black rounded-full font-bold hover:bg-gray-200 transition-colors shadow-lg"
            >
              Cerrar contrato
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
