import React, { useState, useEffect } from 'react';
import { collection, query, where, orderBy, onSnapshot, serverTimestamp, addDoc, Timestamp } from 'firebase/firestore';
import { db, handleFirestoreError } from '../firebase';

interface Comment {
  id: string;
  name: string;
  text: string;
  isSecretMode: boolean;
  createdAt: Timestamp;
}

export default function Guestbook({ isSecretMode }: { isSecretMode: boolean }) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newName, setNewName] = useState('');
  const [newComment, setNewComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const q = query(
      collection(db, 'comments'),
      where('isSecretMode', '==', isSecretMode),
      orderBy('createdAt', 'desc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedComments = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Comment[];
      setComments(fetchedComments);
    }, (error) => {
      console.error("Error fetching comments:", error);
    });

    return () => unsubscribe();
  }, [isSecretMode]);

  const handleAddComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim() === '' || isSubmitting) return;
    
    setIsSubmitting(true);
    try {
      await addDoc(collection(db, 'comments'), {
        name: newName.trim() || 'Anonymous',
        text: newComment.trim(),
        isSecretMode: isSecretMode,
        createdAt: serverTimestamp()
      });
      setNewComment('');
      // Nombre remains to make it easier for sequential posting
    } catch (error) {
      handleFirestoreError(error, 'create', '/comments');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full flex justify-center py-2 bg-[#dbd0c4]">
      <div className="w-full max-w-xl border-2 border-[#8c735d] bg-[#f0e6d2] p-4 flex flex-col shadow-[inset_0_0_10px_rgba(0,0,0,0.1)]">
        <div className="flex-1 flex flex-col w-full min-w-[280px]">
          <div className="bg-[#5c3a21] text-[#f0e6d2] p-1 border-2 border-[#3b2a1a] mb-2 font-serif text-center font-bold tracking-widest text-sm">
            {isSecretMode ? "*** HIDDEN GUESTBOOK ***" : "--- PUBLIC GUESTBOOK ---"}
          </div>

          <div className="flex-1 bg-[#e6d5c3] border-2 border-[#8c735d] p-3 overflow-y-auto max-h-[400px] mb-4 shadow-inner space-y-3">
            {comments.map((c) => (
              <div key={c.id} className="border-b border-[#a89380] pb-2 text-sm font-sans text-[#3b2a1a] last:border-0 break-words">
                <div className="flex justify-between items-baseline mb-1">
                  <strong className={isSecretMode ? "text-red-800" : "text-[#5c3a21]"}>{c.name}</strong>
                  <span className="text-xs text-[#8c735d]">
                    {c.createdAt ? new Date(c.createdAt.toMillis()).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '...'}
                  </span>
                </div>
                <div className="whitespace-pre-wrap">{c.text}</div>
              </div>
            ))}
            {comments.length === 0 && (
              <p className="text-center text-sm font-serif italic text-[#8c735d] mt-4">
                El libro está en blanco... Sé el primero en dejar tu marca.
              </p>
            )}
          </div>

          <form onSubmit={handleAddComment} className="flex flex-col gap-2">
            <input 
               type="text" 
               placeholder="Nombre / Apodo" 
               value={newName}
               onChange={(e) => setNewName(e.target.value)}
               className="w-full border-2 border-[#8c735d] bg-[#fdfbf7] p-2 text-sm text-[#3b2a1a] outline-none focus:border-[#5c3a21]"
               maxLength={30}
            />
            <textarea 
               placeholder="Deja un comentario o enlace..." 
               value={newComment}
               onChange={(e) => setNewComment(e.target.value)}
               className="w-full border-2 border-[#8c735d] bg-[#fdfbf7] p-2 text-sm text-[#3b2a1a] outline-none focus:border-[#5c3a21] resize-none h-[60px]"
               maxLength={250}
               required
            />
            <button 
              type="submit"
              disabled={isSubmitting}
              className="w-full py-2 bg-[#3b2a1a] text-[#f0e6d2] rounded font-bold uppercase tracking-wider text-xs shadow-[2px_2px_0px_#1a1008] active:translate-y-1 active:shadow-none transition-all disabled:opacity-50 disabled:active:translate-y-0 disabled:active:shadow-[2px_2px_0px_#1a1008]"
            >
              {isSubmitting ? 'Cargando...' : 'Publicar'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
