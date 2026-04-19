import React, { useState } from 'react';

export default function DiaryEntry() {
  const [lang, setLang] = useState<'es' | 'en'>('es');

  return (
    <div className="flex flex-col gap-6 text-[#3b2a1a] font-serif leading-relaxed text-sm sm:text-base">
      
      {/* Botón de Cambio de Idioma */}
      <div className="flex justify-end pt-2 pb-2 border-b-2 border-[#8c735d]">
        <button 
          onClick={() => setLang(lang === 'es' ? 'en' : 'es')}
          className="px-3 py-1 bg-[#8c735d] text-white font-sans text-xs font-bold rounded shadow-[2px_2px_0px_#5c3a21] active:translate-y-1 active:shadow-none transition-all"
        >
          {lang === 'es' ? 'Read in English 🇬🇧' : 'Leer en Español 🇪🇸'}
        </button>
      </div>

      {lang === 'es' && (
        <div className="space-y-4 pt-2">
          <h2 className="font-bold text-xl mb-4 font-sans text-center">Rutina que me destruye - Abril 17 - 2026</h2>
          
          <p>Amanece &rarr; Rutina estiramientos &rarr; scrolleas el cel &rarr; preparas el desayuno &rarr; juegas un rato pokemon en el cel (pierdes) vuelves a scrollear &rarr; te pones a buscar algo, no lo encuentras &rarr; miras la hora &rarr; te apresuras a entrenar un poco &rarr; te bañas &rarr; enciendes pc &rarr; pones pc &rarr; empiezas con tus tareas - haces un café vuelves a scrollear &rarr; llega hora de almuerzo mientras se calienta todo &rarr; mas scroll mandas memes y mensajes a modo disculpa de entablar conver, no se extiende, comes almuerzo &rarr; ves un capitulo de tu anima (empece ver bleach voy en el cap 43) &rarr; retomas tus tareas &rarr; molestas a Laura le recuerdas de una forma que estas feliz de tener alguien en tu trabajo que puedas charlar como colega &rarr; buscas canciones para acabar la noche te quedas en las mismas playlist de siempre &rarr; abres las convers que iniciaste respuestas autoconclusivas, estan más ocupados que yo, se acaba el trabajo y te acuestas a scrollear, no sabes lo que buscas &rarr; el silencio de la casa te mata &rarr; a veces me pone feliz trabajar asi sea co working &rarr; tener contacto social me pone feliz pero salgo y veo a todo el mundo viendo esos espejos</p>

          <p>el camino hacia el futuro es en reversa algo asi decia Mc Luhan antes eso no tenia sentido para mi era de esos optimistas… Vaya que ahora tienes razón</p>

          <p>Llega la noche &rarr; usas las pantallas para entretenerte sea con tus adicciones o con juegos, pero sabes que no te da la mente para leer, practicar bajo, no necesitas o sentirte que eres productivo o que avanzas en tu ocio, llega la noche, no tengo sueño vuelvo doom scrollear lo mismo de siempre provocaciones politicas, desastres, guerra, dramas pendejos, memes que ridiculizan la rutina y datos inutiles, creo que debo salir de aqui…</p>

          <p>miro mi alcoba cajas, cosas apiladas, promesas incumplidas desde que llegue, ni he limpiado las ventanas, y bueno mañana, mañana, mañana, lo hare…</p>

          <p>pero que hice una mañana, irme a la cinemateca, simplemente no tenia optimismo, iba escuchar las mismas reflexiones de todo el mundo sobre los medios y el cine, cada uno con sus batallas, pero esta vez fue distinto, vaya que si, me di cuenta que mi void es facil de romperse, Ana en serio te agradezco por cada oportunidad que gestionas, siempre pones en bandeja esos lugares donde invento y no invento para mi, invento para la gente, adoro darles segundos o minutos de alternativas, esta vez. me anime cambiar algo y es mudarme digitalmente, porque fisicamente estoy y pareciera que no</p>

          <p>ya empezo la cuenta regresiva adios meta, me destruiste mis trabajos de realidad aumentada, asi tenga un backup, no tengo donde alojarlos o como mostrarlos sino por medios complejos y en los cuales nadie desde la distancia pueda vivirlos, adios tiktok, te use de herramienta, pero tu algoritmo me alejaba mucho a lo que te abri, crear mas filtros y aun asi tambien me los deshabilitas por “normas tecnicas”, adios facebook solo veia propaganda y publicidades mentirosas, y ver amigos siendo hinchas de los mentirosos de la derecha e izquierda, de ver un algoritmo buscando indignarme para interactuar, ya ni comento, no peleo, solo me limite a observar pero aun asi es perder el tiempo.</p>

          <p>Oficialmente mis ojos estan recuperandose de esos monocromas de cada maldita interfaz, lentamente empiezo a ver los colores de mi Bogotá que antes no veía, cada dia mas motivado para estar mas afuera y si estoy adentro es buscar gente que quiera compartir sus real thoughs ya aprendi que no hace falta esas interacciones forzosas, simplemente escribe, llama, sal, camina, participa, etc.</p>

          <p className="italic font-bold">P.S. Los quiero muchos visitantes y siempre estare aca armando una experiencia registrando cada cosita que descubro, no quiero dejar morir las cosas buenas que se cruzan con uno :)</p>
        </div>
      )}

      {lang === 'en' && (
        <div className="space-y-4 pt-2">
          <h2 className="font-bold text-xl mb-4 font-sans text-center">Routine that destroys me - April 17 - 2026</h2>
          
          <p>Sunrise &rarr; Stretching routine &rarr; you scroll on your phone &rarr; you prepare breakfast &rarr; you play Pokemon on your phone for a while (you lose) you scroll again &rarr; you start looking for something, you don't find it &rarr; you look at the time &rarr; you hurry to train a bit &rarr; you shower &rarr; you turn on the PC &rarr; you turn on the PC &rarr; you start your tasks - you make a coffee you scroll again &rarr; lunchtime arrives while everything is heating up &rarr; more scrolling you send memes and messages as an apology to start a conversation, it doesn't extend, you eat lunch &rarr; you watch an episode of your anime (I started watching Bleach, I'm on chapter 43) &rarr; you resume your tasks &rarr; you bother Laura you remind her in a way that you are happy to have someone at your work you can chat with as a colleague &rarr; you look for songs to end the night you stay on the same playlists as always &rarr; you open the conversations you started self-concluding answers, they are busier than I am, work ends and you go to bed to scroll, you don't know what you are looking for &rarr; the silence of the house kills you &rarr; sometimes working, even co-working, makes me happy &rarr; having social contact makes me happy but I go out and see everyone looking at those mirrors</p>

          <p>The road to the future is in reverse, something like that Mc Luhan used to say, before that didn't make sense to me, I was one of those optimists… Wow, you are right now</p>

          <p>Night arrives &rarr; you use screens to entertain yourself, either with your addictions or with games, but you know you don't have the mind to read, practice bass, you don't need or feel that you are productive or that you are advancing in your leisure, night arrives, I'm not sleepy I go back to doom scrolling the same as always political provocations, disasters, war, stupid dramas, memes that ridicule the routine and useless data, I think I should get out of here…</p>
          
          <p>I look at my bedroom boxes, piled up things, broken promises since I arrived, I haven't even cleaned the windows, and well tomorrow, tomorrow, tomorrow, I will do it…</p>

          <p>But what did I do one morning, go to the Cinemateca, I simply had no optimism, I was going to hear the same reflections from everyone about media and cinema, each one with their battles, but this time it was different, wow it was, I realized that my void is easy to break, Ana I seriously thank you for every opportunity you manage, you always put those places on a silver platter where I invent and I don't invent for me, I invent for people, I love giving them seconds or minutes of alternatives, this time. I was encouraged to change something and that is to move digitally, because physically I am here and it seems like I'm not</p>

          <p>The countdown has already started, goodbye Meta, you destroyed my augmented reality works, even if I have a backup, I have nowhere to host them or how to show them except through complex means in which no one from a distance can experience them, goodbye TikTok, I used you as a tool, but your algorithm greatly moved me away from what I opened you up for, creating more filters and even so you also disable them for "technical standards", goodbye Facebook, I only saw propaganda and lying advertisements, and seeing friends being fans of the liars on the right and left, of seeing an algorithm trying to outrage me to interact, I don't even comment anymore, I don't fight, I just limited myself to observing but even so it is a waste of time.</p>

          <p>Officially my eyes are recovering from those monochromes of every damn interface, slowly I am starting to see the colors of my Bogotá that I didn't see before, every day more motivated to be more outside and if I am inside it is to look for people who want to share their real thoughts, I already learned that those forced interactions are not necessary, simply write, call, go out, walk, participate, etc.</p>

          <p className="italic font-bold">P.S. I love you a lot visitors and I will always be here creating an experience registering every little thing I discover, I don't want to let the good things that cross paths with one die :)</p>
        </div>
      )}

      <div className="mt-8 mb-4 border-4 border-[#8c735d] p-1 bg-black">
         <img src="/assets/glitchtext.jpg" alt="Glitch text" className="w-full h-auto" />
      </div>
    </div>
  );
}
