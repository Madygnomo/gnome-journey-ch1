import { useState, useRef, useEffect } from 'react';

const prompt2Keywords = [
  "ajustado", "bajo", "breve", "chaparro", "chico", "claro", "corto", "delgado", "diminuto",
  "enano", "esbelto", "escaso", "estrecho", "fino", "flojo", "humilde", "infantil", "inferior",
  "juvenil", "jóven", "leve", "ligero", "limitado", "liviano", "menor", "menudo", "mezquino",
  "mínimo", "minusculo", "moderado", "modesto", "pequeño", "pobre", "poco", "raquítico",
  "reducido", "suave", "tenue", "ajustadito", "bajito", "chaparrito", "chiquito", "bebé",
  "niñito", "cachorro", "nene", "matachiito"
];

const greetingsList = ["hola", "holi", "holiii", "haii", "haiiiiiiiiiiiiiiiiiiiiiiiiiiii", "hi", "meow", "hoña", "hewwooo", "oñi", "oña", "agu", "holaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", "hihihih", "alo", "moshimoshii", "holiwiw", "buenos días", "hol", "holis", "hello", "bye", "adios", "chao", "hasta luego", "vuelve pronto", "bebé", "miau miau miau miau"];

export default function App() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [kittyStep, setKittyStep] = useState(1);
  const [chatText, setChatText] = useState("¿Cómo saludas?");
  const [chatInput, setChatInput] = useState("");
  
  const [isMainCharacterUnlocked, setIsMainCharacterUnlocked] = useState(false);
  const [showGreetingsPopup, setShowGreetingsPopup] = useState(false);
  
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Path content viewer state
  const [viewingContent, setViewingContent] = useState<{title: string, content: React.ReactNode} | null>(null);

  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio('/assets/bunnybunnybunny.mp3');
      audioRef.current.loop = true;
    }
    
    if (isMusicPlaying) {
      audioRef.current.play().catch(e => console.log("Audio play prevented:", e));
    } else {
      audioRef.current.pause();
    }
  }, [isMusicPlaying]);

  const handleKittyChat = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const input = chatInput.toLowerCase().trim();
      
      if (kittyStep === 1) {
        const triggers = ["hola", "holi", "hi", "meow", "alo", "hello", "holis", "holii", "haii", "haiiiiiiiiiiiiiiiiiiiiiiiiiiii", "hoña", "oñi", "oña", "agu"];
        if (triggers.some(g => input.includes(g))) {
          setKittyStep(2);
          setChatText("Yo soy...");
        }
      } 
      else if (kittyStep === 2) {
        if (prompt2Keywords.some(k => input.includes(k))) {
          setKittyStep(3);
          setChatText("www._______.nekoweb.org");
        }
      } 
      else if (kittyStep === 3) {
        if (input.includes("matachiito")) {
          // 🎉 ¡Ruta Secreta Desbloqueada!
          setIsMainCharacterUnlocked(true);
          setShowGreetingsPopup(true);
          
          setTimeout(() => {
            setIsChatOpen(false);
          }, 1000);
        }
      }
      setChatInput("");
    }
  };

  const resetGame = () => {
    setKittyStep(1);
    setChatText("¿Cómo saludas?");
    setIsMainCharacterUnlocked(false);
    setShowGreetingsPopup(false);
    setIsMusicPlaying(false);
  };

  // --- BASE DE DATOS DE RUTAS NARRATIVAS ---
  // Modifica estos contenidos para agregar las galerías, entradas de diario o GIFs.
  const routeContents: Record<string, { locked: { title: string, content: React.ReactNode }, unlocked: { title: string, content: React.ReactNode } }> = {
    Signpost: {
      locked: { 
        title: "Letrero", 
        content: <p>Un simple letrero de madera apuntando hacia la cabaña. El viento desgastó las letras.</p> 
      },
      unlocked: { 
        title: "Caminos Ocultos", 
        content: (
          <div className="space-y-4">
            <p className="italic text-purple-700 font-bold">El letrero ahora revela runas brillantes...</p>
            <p>"El verdadero camino está debajo de las raíces. No confíes en los peluches."</p>
          </div>
        )
      }
    },
    Boxes: {
      locked: { 
        title: "Cajas de Mudanza", 
        content: <p>Están repletas de libros pesados y trastos viejos. Es mejor no abrirlas aún.</p> 
      },
      unlocked: { 
        title: "Diario de Mudanza", 
        content: (
          <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
            <p className="italic font-comic text-sm">Entrada 1: Al fin llegamos. Este lugar se siente extraño pero acogedor.</p>
            <div className="w-full bg-slate-200 border-2 border-slate-400 p-2 text-center text-xs text-slate-500 rounded">
               <img src="/assets/under-construction.gif" alt="Gallery" className="w-full h-40 object-cover bg-slate-100" />
            </div>
            <p className="italic font-comic text-sm">Entrada 2: Juraría que vi al oso de peluche moverse hacia los arbustos de la derecha.</p>
          </div>
        )
      }
    },
    Scroll: {
      locked: { 
        title: "Pergamino Sellado", 
        content: <p>Tiene un sello mágico que te impide leerlo. Crees que necesitas demostrar tu identidad primero.</p> 
      },
      unlocked: { 
        title: "El Mapa Estelar", 
        content: (
          <div className="flex flex-col items-center space-y-4">
            <div className="text-center font-serif text-lg bg-yellow-100 p-4 border border-yellow-600 shadow-inner w-full">
               "Para quien logre leer esto: La llave maestra abre la puerta de la mente."
            </div>
          </div>
        )
      }
    },
    Bear: {
      locked: {
        title: "Osito de Peluche",
        content: <p>Un tierno oso de peluche con un gorrito de fiesta. Alguien lo debió olvidar durante la mudanza.</p>
      },
      unlocked: {
        title: "Guardián de la Puerta",
        content: <p className="text-red-600 font-bold">"Tuviste que haber traído la miel...", susurra el oso parpadeando lentamente.</p>
      }
    },
    Tomato: {
      locked: {
        title: "Tomate Extraño",
        content: <p>Parece un vegetal podrido... Espera, ¿tiene cara? Qué espeluznante.</p>
      },
      unlocked: {
        title: "Señor Tomate",
        content: <p className="font-comic text-green-700">"¡Felicidades por encontrarme jefe! Toma este código para la caja fuerte: 0451"</p>
      }
    }
  };

  const handleObjectClick = (objectName: string) => {
    if (objectName === 'Kitty') {
      setIsChatOpen(true);
      if(kittyStep === 1) setChatText("¿Cómo saludas?");
    } else if (objectName === 'Music') {
      setIsMusicPlaying(!isMusicPlaying);
    } else {
      // Sistema de Rutas Narrativas
      const routeData = routeContents[objectName];
      if (routeData) {
        setViewingContent(isMainCharacterUnlocked ? routeData.unlocked : routeData.locked);
      }
    }
  };

  return (
    <div className="w-full h-screen overflow-hidden bg-[#1a1a1a] flex items-center justify-center touch-none">
      
      {/* 
        Game World Container
        Se escalará automáticamente dependiendo del tamaño de la pantalla
      */}
      <div 
         className="relative w-[1920px] h-[1080px] shrink-0 origin-center transform scale-[0.35] sm:scale-[0.5] md:scale-[0.7] lg:scale-[0.8] xl:scale-100 select-none" 
         style={{ backgroundImage: 'url(/assets/BG.png)', backgroundSize: 'cover' }}
      >
        
        {/* === ELEMENTOS INTERACTIVOS BASADOS EN IMAGE.PNG === */}

        {/* Music Player (Izquierda de la casa, sobre la mesa cian) */}
        <div className="absolute" style={{ left: 810, top: 320 }}>
          <img 
            src="/assets/music.png" 
            alt="Music Player" 
            className="cursor-pointer hover:scale-110 transition-transform pixelated w-[120px] h-auto" 
            onClick={() => handleObjectClick('Music')}
            onError={(e) => (e.currentTarget.style.display = 'none')}
          />
          {isMusicPlaying && (
            <img 
               src="/assets/music.gif" 
               alt="playing" 
               className="absolute left-[-20px] -top-[60px] w-[140px] pointer-events-none z-10" 
            />
          )}
        </div>

        {/* Gnome / Main Character (Abajo del pozo / Frente a las escaleras) */}
        <div 
          className="absolute cursor-pointer hover:scale-110 transition-transform pixelated"
          style={{ left: 1250, top: 580 }}
          onClick={() => handleObjectClick('Gnome')}
        >
          {isMainCharacterUnlocked ? (
            <img src="/assets/Character main.png" alt="Main Character" className="w-[100px] h-auto" onError={(e) => (e.currentTarget.style.display = 'none')} />
          ) : (
            <img src="/assets/Gnome.png" alt="Gnome" className="w-[120px] h-auto" onError={(e) => (e.currentTarget.style.display = 'none')} />
          )}
        </div>

        {/* Kitty (Lado derecho de la casa) */}
        {!isMainCharacterUnlocked && (
           <img 
             src="/assets/Kitty.png" 
             alt="Kitty" 
             className="absolute cursor-pointer hover:scale-110 transition-transform pixelated w-[100px] h-auto" 
             style={{ left: 1530, top: 520 }} 
             onClick={() => handleObjectClick('Kitty')}
             onError={(e) => (e.currentTarget.style.display = 'none')}
           />
        )}

        {/* Pergamino con Llave (Flotando a la derecha) */}
        <img 
          src="/assets/contract.png" 
           alt="Scroll/Contract" 
           className="absolute cursor-pointer hover:scale-110 transition-transform pixelated w-[150px] animate-pulse" 
           style={{ left: 1720, top: 520 }} 
           onClick={() => handleObjectClick('Scroll')}
           onError={(e) => (e.currentTarget.style.display = 'none')}
        />

        {/* Signpost (Agrupado en la base central) */}
        <img 
          src="/assets/signpost.png" 
          alt="Signpost" 
          className="absolute cursor-pointer hover:scale-110 hover:-rotate-3 transition-transform pixelated w-[140px] h-auto" 
          style={{ left: 880, top: 760 }} 
          onClick={() => handleObjectClick('Signpost')}
          onError={(e) => (e.currentTarget.style.display = 'none')}
        />


        {/* === ZONAS INVISIBLES CLICKEABLES (Mapeando el BG) === */}

        {/* Cajas cerca al camión */}
        <div 
          className="absolute cursor-pointer hover:bg-white/20 transition-colors z-10 rounded-xl"
          style={{ left: 630, top: 430, width: 200, height: 180 }}
          onClick={() => handleObjectClick('Boxes')}
          title="Cajas"
        />

        {/* Cajas inferiores izquierdas */}
        <div 
          className="absolute cursor-pointer hover:bg-white/20 transition-colors z-10 rounded-xl"
          style={{ left: 450, top: 780, width: 280, height: 180 }}
          onClick={() => handleObjectClick('Boxes')}
          title="Cajas"
        />

        {/* Osito de Peluche (Abajo a la derecha) */}
        <div 
          className="absolute cursor-pointer hover:bg-white/20 transition-colors z-10 rounded-full"
          style={{ left: 1400, top: 820, width: 100, height: 120 }}
          onClick={() => handleObjectClick('Bear')}
          title="Osito"
        />

        {/* Tomate de la esquina inferior derecha */}
        <div 
          className="absolute cursor-pointer hover:bg-white/20 transition-colors z-10 rounded-full"
          style={{ left: 1800, top: 920, width: 100, height: 120 }}
          onClick={() => handleObjectClick('Tomato')}
          title="???"
        />

      </div>

      {/* --- UI Overlays --- */}

      {/* Win98 Chat Window */}
      {isChatOpen && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[300px] bg-[#c0c0c0] border-2 border-white border-b-[#808080] border-r-[#808080] p-1 font-sans z-50 shadow-xl">
          <div className="bg-[#000080] text-white px-2 py-1 font-bold flex justify-between items-center text-sm">
            <span>Kitty.exe</span>
            <button onClick={() => setIsChatOpen(false)} className="bg-[#c0c0c0] text-black border border-white border-b-black border-r-black px-2 hover:active:border-t-black hover:active:border-l-black hover:active:border-b-white hover:active:border-r-white font-bold leading-none">X</button>
          </div>
          <div className="p-2 border inset-border bg-white my-1 min-h-[50px] text-sm text-black">
            <p>{chatText}</p>
          </div>
          <input 
            type="text" 
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
            onKeyDown={handleKittyChat}
            className="w-full border inset-border px-1 py-1 outline-none text-sm text-black" 
            placeholder="Escribe aquí..."
            autoFocus
          />
          <div className="text-center mt-2 flex justify-center gap-2">
            <button onClick={resetGame} className="px-3 py-1 text-xs border border-white border-b-[#808080] border-r-[#808080] bg-[#c0c0c0] text-black active:border-[#808080] active:border-b-white active:border-r-white">Reset</button>
          </div>
        </div>
      )}

      {/* Greetings Popup Bubble */}
      {showGreetingsPopup && (
        <div className="fixed top-10 right-10 z-[2000] p-6 max-w-[380px] rounded-[2em_5em_3em_4em/5em_2em_4em_3em] bg-rainbow shadow-[0_0_20px_rgba(255,255,255,0.7)] border-4 border-white text-white font-comic text-xs animate-popupAppear">
          <h2 className="text-xl font-bold text-center mb-4 text-shadow-md">Saludos válidos:</h2>
          <ul className="columns-2 gap-2 list-none p-0 m-0">
            {greetingsList.map((greeting, index) => (
              <li 
                key={index} 
                className="py-1 px-2 mb-1 text-[11px] transition-transform hover:scale-125 hover:rotate-0 hover:text-yellow-300 hover:bg-black/20 rounded text-shadow-sm cursor-default"
                style={{ transform: `rotate(${(index - 14) * 2.5}deg)` }}
              >
                {greeting}
              </li>
            ))}
          </ul>
          <button 
            onClick={() => setShowGreetingsPopup(false)}
            className="block mx-auto mt-5 px-5 py-2 text-base font-comic font-bold bg-[#FFD700] text-black border-2 border-black rounded-full shadow-[3px_3px_5px_rgba(0,0,0,0.3)] hover:bg-white hover:scale-110 hover:rotate-6 transition-all"
          >
            Cerrar
          </button>
        </div>
      )}

      {/* Generic Content Modal (Para mostrar Pantallas de la Ruta Narrativa) */}
      {viewingContent && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[3000] p-4">
          <div className="bg-[#f0f0f0] rounded-xl shadow-[0_0_40px_rgba(0,0,0,0.5)] max-w-2xl w-full overflow-hidden border-4 border-[#3f51b5] transform transition-all scale-100">
            
            {/* Cabecera del Panel */}
            <div className="bg-[#3f51b5] text-white px-6 py-4 flex justify-between items-center shadow-md">
              <h3 className="font-black text-2xl tracking-wide font-sans">{viewingContent.title}</h3>
              <button 
                className="text-white hover:text-[#ff9800] hover:scale-125 transition-transform font-black text-3xl leading-none"
                onClick={() => setViewingContent(null)}
              >
                ×
              </button>
            </div>
            
            {/* Contenido (Textos, Galerías, GIFs) */}
            <div className="p-8 text-black bg-[url('/assets/paper-texture.png')] bg-cover relative min-h-[150px]">
              <div className="text-lg leading-relaxed font-serif text-gray-800">
                {viewingContent.content}
              </div>
            </div>
            
          </div>
        </div>
      )}

    </div>
  );
}


