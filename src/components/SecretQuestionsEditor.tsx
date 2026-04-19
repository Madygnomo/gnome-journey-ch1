import React, { useState } from 'react';

interface SecretQuestionsEditorProps {
  questions: string[];
  setQuestions: (questions: string[]) => void;
  onCopyCode: () => void;
}

export default function SecretQuestionsEditor({ questions, setQuestions, onCopyCode }: SecretQuestionsEditorProps) {
  const [newQuestion, setNewQuestion] = useState("");

  const addQuestion = () => {
    if (newQuestion.trim()) {
      setQuestions([...questions, newQuestion.trim()]);
      setNewQuestion("");
    }
  };

  const removeQuestion = (index: number) => {
    setQuestions(questions.filter((_, i) => i !== index));
  };

  const updateQuestion = (index: number, newValue: string) => {
    const updated = [...questions];
    updated[index] = newValue;
    setQuestions(updated);
  };

  return (
    <div className="flex flex-col gap-2 mt-2 border-t border-gray-600 pt-2">
      <h4 className="text-xs font-bold text-pink-300">❓ Secret Questions</h4>
      
      <div className="max-h-[150px] overflow-y-auto flex flex-col gap-1 pr-1">
        {questions.map((q, idx) => (
          <div key={idx} className="flex gap-1 items-start">
            <textarea
              value={q}
              onChange={(e) => updateQuestion(idx, e.target.value)}
              className="text-black text-[10px] px-1 py-0.5 rounded w-full resize-none h-8 border border-gray-400"
            />
            <button
              onClick={() => removeQuestion(idx)}
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
        />
        <button
          onClick={addQuestion}
          className="bg-green-700 hover:bg-green-600 px-2 py-1 rounded text-[10px] font-bold"
        >
          +
        </button>
      </div>

      <button
        onClick={onCopyCode}
        className="bg-pink-600 hover:bg-pink-500 px-3 py-1 rounded text-[10px] font-bold transition-colors mt-1"
      >
        📋 Copiar Lista de Preguntas
      </button>
    </div>
  );
}
