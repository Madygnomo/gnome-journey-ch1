import { useState, useRef, useEffect } from 'react';

import DiaryEntry from './components/DiaryEntry';
import DraggableCollider from './components/DraggableCollider';
import CollectionsViewer from './components/CollectionsViewer';
import Guestbook from './components/Guestbook';
import Box6Video from './components/Box6Video';

const initialBoxColliders = [
  { id: 1, left: 677, top: 476, width: 88, height: 103 },
  { id: 2, left: 702, top: 590, width: 69, height: 58 },
  { id: 3, left: 666, top: 651, width: 71, height: 73 },
  { id: 4, left: 487, top: 821, width: 83, height: 71 },
  { id: 5, left: 614, top: 876, width: 51, height: 73 },
  { id: 6, left: 519, top: 900, width: 89, height: 76 }
];

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
  const [viewingContent, setViewingContent] = useState<{title: string, content: React.ReactNode, theme?: 'default' | 'win98-brown'} | null>(null);

  // Collider Edit Mode States
  const [isEditMode, setIsEditMode] = useState(false);
  const [boxColliders, setBoxColliders] = useState(initialBoxColliders);

  const handleBoxColliderChange = (id: number, data: {left: number, top: number, width: number, height: number}) => {
    setBoxColliders(prev => prev.map(b => b.id === id ? { ...b, ...data } : b));
  };

  const copyColliderData = () => {
    const dataStr = boxColliders.map(b => `  { id: ${b.id}, left: ${Math.round(b.left)}, top: ${Math.round(b.top)}, width: ${Math.round(b.width)}, height: ${Math.round(b.height)} }`).join(',\n');
    const finalCode = `const initialBoxColliders = [\n${dataStr}\n];`;
    navigator.clipboard.writeText(finalCode);
    alert("¡Código de cajas copiado!\nVe al inicio del archivo App.tsx y pega esto para reemplazar initialBoxColliders.");
  };

  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio('/assets/bunnybunnybunny.mp3');
      audioRef.current.loop = true;
    }
    
    // Cambiar la canción dependiendo de si el modo secreto está activado
    const desiredTrack = isMainCharacterUnlocked ? '/assets/Secret.mp3' : '/assets/bunnybunnybunny.mp3';
    
    // Si la fuente actual no termina en el track deseado, lo cambiamos
    if (!audioRef.current.src.endsWith(desiredTrack)) {
      audioRef.current.src = desiredTrack;
      // Reiniciar desde cero y cargar
      audioRef.current.currentTime = 0;
      audioRef.current.load();
    }

    if (isMusicPlaying) {
      // Usar setTimeout para evadir restricciones de interacción estricta de algunos navegadores si viene de React State
      setTimeout(() => {
        if (audioRef.current) {
          audioRef.current.play().catch(e => console.log("Audio play prevented:", e));
        }
      }, 50);
    } else {
      audioRef.current.pause();
    }
  }, [isMusicPlaying, isMainCharacterUnlocked]);

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
          setIsMusicPlaying(true); // Activar la música automáticamente
          
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
  const routeContents: Record<string, { locked: { title: string, content: React.ReactNode, theme?: 'default' | 'win98-brown' }, unlocked: { title: string, content: React.ReactNode, theme?: 'default' | 'win98-brown' } }> = {
    Signpost: {
      locked: { 
        title: "Guestbook Público",
        theme: 'win98-brown',
        content: <Guestbook isSecretMode={false} />
      },
      unlocked: { 
        title: "??? ENCRYPTED_GUESTBOOK ???",
        theme: 'win98-brown',
        content: <Guestbook isSecretMode={true} />
      }
    },
    Boxes: {
      locked: { 
        title: "El Vacío - Rutina Destructiva", 
        theme: 'win98-brown',
        content: <DiaryEntry />
      },
      unlocked: { 
        title: "El Vacío - Rutina Destructiva", 
        theme: 'win98-brown',
        content: <DiaryEntry />
      }
    },
    Box2: {
      locked: {
        title: "Gnome Favourite album of the month",
        theme: 'win98-brown',
        content: (
          <div className="w-full flex justify-center py-4 bg-black">
            <iframe 
              width="560" 
              height="315" 
              src="https://www.youtube.com/embed/bKtRD-gKyuE?list=PLxA687tYuMWiDkzJRBFFf8Vyf5kwpBc9R" 
              title="YouTube video player" 
              frameBorder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
              referrerPolicy="strict-origin-when-cross-origin" 
              allowFullScreen
              className="max-w-full rounded border-2 border-[#8c735d]"
            ></iframe>
          </div>
        )
      },
      unlocked: {
        title: "Gnome Favourite album of the month",
        theme: 'win98-brown',
        content: (
          <div className="w-full flex justify-center py-4 bg-black">
            <iframe 
              width="560" 
              height="315" 
              src="https://www.youtube.com/embed/bKtRD-gKyuE?list=PLxA687tYuMWiDkzJRBFFf8Vyf5kwpBc9R" 
              title="YouTube video player" 
              frameBorder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
              referrerPolicy="strict-origin-when-cross-origin" 
              allowFullScreen
              className="max-w-full rounded border-2 border-[#8c735d]"
            ></iframe>
          </div>
        )
      }
    },
    Box5: {
      locked: {
        title: "Gnome is playing this and he loved it",
        theme: 'win98-brown',
        content: (
          <div className="w-full flex justify-center py-4 bg-black">
            <iframe 
              width="560" 
              height="315" 
              src="https://www.youtube.com/embed/urizNCw6VD0" 
              title="YouTube video player" 
              frameBorder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
              referrerPolicy="strict-origin-when-cross-origin" 
              allowFullScreen
              className="max-w-full rounded border-2 border-[#8c735d]"
            ></iframe>
          </div>
        )
      },
      unlocked: {
        title: "Gnome is playing this and he loved it",
        theme: 'win98-brown',
        content: (
          <div className="w-full flex justify-center py-4 bg-black">
            <iframe 
              width="560" 
              height="315" 
              src="https://www.youtube.com/embed/urizNCw6VD0" 
              title="YouTube video player" 
              frameBorder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
              referrerPolicy="strict-origin-when-cross-origin" 
              allowFullScreen
              className="max-w-full rounded border-2 border-[#8c735d]"
            ></iframe>
          </div>
        )
      }
    },
    Box4: {
      locked: {
        title: "Colecciones",
        theme: 'win98-brown',
        content: <CollectionsViewer />
      },
      unlocked: {
        title: "Colecciones",
        theme: 'win98-brown',
        content: <CollectionsViewer />
      }
    },
    Box6: {
      locked: {
        title: "Archivo Olvidado",
        theme: 'win98-brown',
        content: <Box6Video />
      },
      unlocked: {
        title: "Archivo Olvidado",
        theme: 'win98-brown',
        content: <Box6Video />
      }
    },
    Box3: {
      locked: {
        title: "The Alchemist by H.P. Lovecraft",
        theme: 'win98-brown',
        content: (
          <div className="w-full h-[60vh] bg-[#e6d5c3] border-2 border-[#8c735d] p-1 font-serif text-black relative">
            <div className="absolute top-0 left-0 bg-[#8c735d] text-white text-xs px-2 py-1 font-sans">
              🔗 Conexión a hplovecraft.com establecida
            </div>
            <iframe 
              src="https://www.hplovecraft.com/writings/texts/fiction/a.aspx" 
              className="w-full h-full pt-6 bg-white"
            ></iframe>
          </div>
        )
      },
      unlocked: {
        title: "The Alchemist by H.P. Lovecraft",
        theme: 'win98-brown',
        content: (
          <div className="w-full h-[60vh] bg-[#e6d5c3] border-2 border-[#8c735d] p-1 font-serif text-black relative">
            <div className="absolute top-0 left-0 bg-[#8c735d] text-white text-xs px-2 py-1 font-sans">
              🔗 Conexión a hplovecraft.com establecida
            </div>
            <iframe 
              src="https://www.hplovecraft.com/writings/texts/fiction/a.aspx" 
              className="w-full h-full pt-6 bg-white"
            ></iframe>
          </div>
        )
      }
    },
    Scroll: {
      locked: { 
        title: "Pergamino Sellado", 
        theme: 'win98-brown',
        content: <p className="font-serif">Tiene un sello mágico que te impide leerlo. Crees que necesitas demostrar tu identidad primero.</p> 
      },
      unlocked: { 
        title: "El Mapa Estelar", 
        theme: 'win98-brown',
        content: (
          <div className="flex flex-col items-center space-y-4">
            <div className="text-center font-serif text-lg bg-yellow-100 p-4 border border-yellow-600 shadow-inner w-full font-bold">
               "Para quien logre leer esto: La llave maestra abre la puerta de la mente."
            </div>
            <p className="font-serif text-sm">Este es tu contrato temporal en el vacío.</p>
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
        <div className="absolute" style={{ left: 1530, top: 520 }}>
           <img 
             src="/assets/Kitty.png" 
             alt="Kitty" 
             className="cursor-pointer hover:scale-110 transition-transform pixelated w-[100px] h-auto relative z-10" 
             onClick={() => handleObjectClick('Kitty')}
             onError={(e) => (e.currentTarget.style.display = 'none')}
           />
           {showGreetingsPopup && (
             <div 
               className="absolute z-[200] p-4 shadow-[0_10px_30px_rgba(0,0,0,0.5)] animate-popupAppear"
               style={{ 
                 left: -400, 
                 bottom: 90, // Encima de Kitty
                 width: 320,
                 background: 'linear-gradient(90deg, rgba(200,255,225,1) 0%, rgba(255,215,225,1) 20%, rgba(230,200,255,1) 45%, rgba(190,240,255,1) 70%, rgba(230,255,200,1) 100%)',
               }}
             >
               {/* Pikito / Tail apuntando a Kitty */}
               <svg className="absolute -bottom-5 left-[140px] w-6 h-6" viewBox="0 0 100 100">
                 <path d="M0,0 L100,0 L50,100 Z" fill="rgba(215,220,255,1)" />
               </svg>
               
               <ul className="columns-2 gap-x-2 space-y-1 text-left list-none m-0 p-0 font-serif text-[14px] leading-tight">
                 {greetingsList.map((greeting, index) => (
                   <li key={index} className="break-inside-avoid">
                     <span className="bg-[#e4fcce] text-[#6b31c4] px-1 rounded-[1px] inline-block max-w-[130px] overflow-hidden text-ellipsis whitespace-nowrap" title={greeting}>
                       {greeting}
                     </span>
                   </li>
                 ))}
               </ul>
             </div>
           )}
        </div>

        {/* Pergamino con Llave (Oculto hasta desbloquear el chat del gato) */}
        {isMainCharacterUnlocked && (
          <img 
            src="/assets/contract.png" 
             alt="Scroll/Contract" 
             className="absolute cursor-pointer hover:scale-110 transition-transform pixelated w-[150px] animate-pulse" 
             style={{ left: 1220, top: 720 }} 
             onClick={() => handleObjectClick('Scroll')}
             onError={(e) => (e.currentTarget.style.display = 'none')}
          />
        )}

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

        {/* --- CAJAS DE MUDANZA (Draggables en Edit Mode) --- */}
        {boxColliders.map(box => (
          <DraggableCollider 
            key={box.id}
            id={box.id}
            initialLeft={box.left}
            initialTop={box.top}
            initialWidth={box.width}
            initialHeight={box.height}
            isEditMode={isEditMode}
            onChange={handleBoxColliderChange}
            onClick={() => handleObjectClick(box.id === 2 ? 'Box2' : box.id === 3 ? 'Box3' : box.id === 4 ? 'Box4' : box.id === 5 ? 'Box5' : box.id === 6 ? 'Box6' : 'Boxes')}
          />
        ))}
        {/* --------------------------------------------------------------- */}

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

      {/* Generic Content Modal (Para mostrar Pantallas de la Ruta Narrativa) */}
      {viewingContent && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[3000] p-4">
          <div className={`rounded-xl shadow-[0_0_40px_rgba(0,0,0,0.5)] max-w-2xl w-full flex flex-col transform transition-all scale-100 max-h-[90vh] ${
            viewingContent.theme === 'win98-brown' 
              ? 'bg-[#cdae93] border-4 border-t-[#ebd8c5] border-l-[#ebd8c5] border-b-[#7d5130] border-r-[#7d5130]' 
              : 'bg-[#f0f0f0] border-4 border-[#3f51b5] overflow-hidden'
          }`}>
            
            {/* Cabecera del Panel */}
            <div className={`px-4 py-2 flex justify-between items-center shadow-md ${
              viewingContent.theme === 'win98-brown' 
                ? 'bg-[#5c3a21] text-white font-sans border-b-2 border-[#3b1f0d]' 
                : 'bg-[#3f51b5] text-white px-6 py-4'
            }`}>
              <h3 className={`font-black tracking-wide ${viewingContent.theme === 'win98-brown' ? 'text-lg' : 'text-2xl font-sans'}`}>{viewingContent.title}</h3>
              <button 
                className={`hover:scale-125 transition-transform font-black leading-none ${
                   viewingContent.theme === 'win98-brown'
                   ? 'bg-[#cdae93] text-black border-2 border-t-white border-l-white border-b-black border-r-black px-2 py-0 hover:active:border-t-black hover:active:border-l-black hover:active:border-b-white hover:active:border-r-white text-xl'
                   : 'text-white hover:text-[#ff9800] text-3xl'
                }`}
                onClick={() => setViewingContent(null)}
              >
                ×
              </button>
            </div>
            
            {/* Contenido (Textos, Galerías, GIFs) */}
            <div className={`flex-1 overflow-y-auto ${
              viewingContent.theme === 'win98-brown'
                ? 'p-4 bg-white border-4 border-t-[#7d5130] border-l-[#7d5130] border-b-white border-r-white m-2 text-black'
                : "p-8 text-black bg-[url('/assets/paper-texture.png')] bg-cover relative min-h-[150px]"
            }`}>
              <div className={`${viewingContent.theme === 'win98-brown' ? 'font-sans' : 'text-lg leading-relaxed font-serif text-gray-800'}`}>
                {viewingContent.content}
              </div>
            </div>
            
          </div>
        </div>
      )}

      {/* --- DEV TOOLS (Solo para ti) --- */}
      <div className="fixed bottom-4 right-4 z-[5000] bg-black/80 text-white p-4 rounded-xl border border-gray-600 flex flex-col gap-2 shadow-lg">
        <h3 className="font-bold text-sm text-blue-300">🛠️ Mapeador de Cajas</h3>
        <label className="flex items-center gap-2 cursor-pointer font-sans text-xs">
          <input 
            type="checkbox" 
            checked={isEditMode} 
            onChange={(e) => setIsEditMode(e.target.checked)} 
            className="w-4 h-4 cursor-pointer" 
          />
          Activar Modo Edición
        </label>
        {isEditMode && (
          <button 
            onClick={copyColliderData} 
            className="bg-blue-600 hover:bg-blue-500 px-3 py-2 rounded text-xs font-bold transition-colors mt-2"
          >
            📋 Copiar Código Generado
          </button>
        )}
      </div>

    </div>
  );
}


