import React, { useState, useEffect } from 'react';
import { collection, addDoc, deleteDoc, doc, updateDoc, query, orderBy, onSnapshot, writeBatch, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

interface SecretQuestionsEditorProps {
  onCopyCode: () => void;
}

export default function SecretQuestionsEditor({ onCopyCode }: SecretQuestionsEditorProps) {
  const [questions, setQuestions] = useState<{id: string, text: string, order: number}[]>([]);
  const [newQuestion, setNewQuestion] = useState("");
  const [bulkInput, setBulkInput] = useState("");
  const [showBulk, setShowBulk] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const q = query(collection(db, 'secret_questions'), orderBy('order', 'asc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setQuestions(snapshot.docs.map(doc => ({ 
        id: doc.id, 
        text: doc.data().text, 
        order: doc.data().order 
      })));
    });
    return () => unsubscribe();
  }, []);

  const addQuestion = async () => {
    if (newQuestion.trim()) {
      setIsSubmitting(true);
      try {
        await addDoc(collection(db, 'secret_questions'), {
          text: newQuestion.trim(),
          order: questions.length
        });
        setNewQuestion("");
      } catch (e) {
        console.error("Error adding question:", e);
      } finally {
        setIsSubmitting(false);
      }
    }
  };
  
  const addBulkQuestions = async () => {
    const lines = bulkInput.split('\n').map(l => l.trim()).filter(l => l.length > 0);
    if (lines.length === 0) return;
    
    setIsSubmitting(true);
    try {
      const batch = writeBatch(db);
      lines.forEach((text, idx) => {
        const newRef = doc(collection(db, 'secret_questions'));
        batch.set(newRef, { text, order: questions.length + idx });
      });
      await batch.commit();
      setBulkInput("");
      setShowBulk(false);
    } catch (e) {
      console.error(e);
    } finally {
      setIsSubmitting(false);
    }
  };

  const removeQuestion = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'secret_questions', id));
    } catch (e) {
      console.error("Error deleting question:", e);
    }
  };

  const updateQuestionText = async (id: string, text: string) => {
    try {
      await updateDoc(doc(db, 'secret_questions', id), { text });
    } catch (e) {
      console.error("Error updating question:", e);
    }
  };

  const pushDefaults = async () => {
    const defaultQuestions = [
      "¿Qué es lo que más te hace sonreír hoy?",
      "¿Si pudieras viajar a cualquier lugar en un segundo, a dónde irías?",
      "¿Cuál es tu canción favorita del momento?",
      "¿Qué secreto le dirías a un gato que sepa guardar secretos?",
      "¿Cómo te describirías en tres palabras mágicas?",
    ];
    
    setIsSubmitting(true);
    try {
      // Clear existing first
      const snapshot = await getDocs(collection(db, 'secret_questions'));
      const batch = writeBatch(db);
      snapshot.docs.forEach(d => batch.delete(d.ref));
      
      defaultQuestions.forEach((q, idx) => {
        const newRef = doc(collection(db, 'secret_questions'));
        batch.set(newRef, { text: q, order: idx });
      });
      
      await batch.commit();
      alert("¡Preguntas por defecto restauradas en Firebase!");
    } catch (e) {
      console.error(e);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col gap-2 mt-2 border-t border-gray-600 pt-2">
      <div className="flex justify-between items-center">
        <h4 className="text-xs font-bold text-pink-300">❓ Secret Questions (Sync)</h4>
        <button onClick={pushDefaults} className="text-[8px] bg-red-900 px-1 rounded text-red-200 uppercase">Reset DB</button>
      </div>
      
      <div className="max-h-[150px] overflow-y-auto flex flex-col gap-1 pr-1">
        {questions.map((q) => (
          <div key={q.id} className="flex gap-1 items-start">
            <textarea
              value={q.text}
              onChange={(e) => updateQuestionText(q.id, e.target.value)}
              className="text-black text-[10px] px-1 py-0.5 rounded w-full resize-none h-8 border border-gray-400"
            />
            <button
              onClick={() => removeQuestion(q.id)}
              className="bg-red-700 hover:bg-red-600 text-white text-[10px] px-1 rounded h-5"
            >
              ×
            </button>
          </div>
        ))}
      </div>

      <div className="flex gap-1 mt-1">
        <input
          type="text"
          placeholder="Nueva pregunta..."
          value={newQuestion}
          onChange={(e) => setNewQuestion(e.target.value)}
          className="text-black text-[10px] px-2 py-1 rounded border-2 border-gray-400 outline-none flex-1"
          disabled={isSubmitting}
        />
        <button
          onClick={addQuestion}
          disabled={isSubmitting}
          className="bg-green-700 hover:bg-green-600 px-2 py-1 rounded text-[10px] font-bold"
        >
          {isSubmitting ? '...' : '+'}
        </button>
      </div>

      <button
        onClick={onCopyCode}
        className="bg-pink-600 hover:bg-pink-500 px-3 py-1 rounded text-[10px] font-bold transition-colors mt-1"
      >
        📋 Copiar Lista de Preguntas
      </button>

      <button
        onClick={() => setShowBulk(!showBulk)}
        className="text-[8px] text-pink-400 underline mt-1"
      >
        {showBulk ? 'Ocultar Carga Masiva' : 'Carga Masiva (Varias líneas)'}
      </button>

      {showBulk && (
        <div className="flex flex-col gap-1 mt-1 border border-pink-500/30 p-1 rounded">
          <textarea
            placeholder="Pega aquí tus 28 preguntas (una por línea)..."
            value={bulkInput}
            onChange={(e) => setBulkInput(e.target.value)}
            className="text-black text-[10px] px-1 py-0.5 rounded w-full h-20 border border-gray-400"
          />
          <button
            onClick={addBulkQuestions}
            disabled={isSubmitting}
            className="bg-pink-700 hover:bg-pink-600 px-2 py-1 rounded text-[10px] font-bold text-white"
          >
            {isSubmitting ? 'Añadiendo...' : 'Añadir todas'}
          </button>
        </div>
      )}

      <p className="text-[8px] text-gray-500 italic">Los cambios se guardan automáticamente en Firebase.</p>
    </div>
  );
}
