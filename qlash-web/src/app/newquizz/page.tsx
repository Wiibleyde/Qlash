"use client";
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Button from '@/components/Button';
import QuestionSelector from '@/components/QuestionSelector';
import QuestionFormWrapper from '@/components/QuestionFormWrapper';
import type { IQuiz, IQuestion, IOption } from '../../../../qlash-shared/types/quiz';
import { toast } from 'sonner';

const createQuizApiUrl = `http://${process.env.NEXT_PUBLIC_HOST}:8000/quiz`;
const createIaQuizApiUrl = `http://${process.env.NEXT_PUBLIC_HOST}:8000/ia/quiz`;

const allQuestionTypes = [
  'Question à choix multiple',
  'Vrai/Faux',
  'Puzzle',
  'Buzzer'
];

const LobbyCreate = () => {
  const searchParams = useSearchParams();
  const quizId = searchParams.get('quizId');

  const [players] = useState(['Alice', 'Bob', 'Charlie']);
  const [quiz, setQuiz] = useState<Partial<IQuiz>>({
    name: '',
    description: '',
    questions: []
  });
  const [step, setStep] = useState<'list' | 'choose' | 'form'>('list');
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [iaPrompt, setIaPrompt] = useState('');
  const [showIaPromptInput, setShowIaPromptInput] = useState(false);

  useEffect(() => {
    if (quizId) {
      loadQuiz(quizId);
    }
  }, [quizId]);

  const loadQuiz = async (id: string) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${createQuizApiUrl}/${id}`);
      if (response.ok) {
        const loadedQuiz = await response.json();
        setQuiz(loadedQuiz);
      } else {
        toast.error('Échec du chargement du quiz');
      }
    } catch (error) {
      toast.error('Erreur lors du chargement du quiz');
    } finally {
      setIsLoading(false);
    }
  };

  const availableTypes = allQuestionTypes;

  const handleSelectType = (type: string) => {
    setSelectedType(type);
    setStep('form');
  };

  const handleConfirmAdd = (formData: {
    type: string;
    question: string;
    options?: string[];
    correctAnswer?: string;
  }) => {
    const newQuestion: IQuestion = {
      id: '',
      quizId: '',
      content: formData.question,
      type: {
        id: '',
        name: formData.type,
        description: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      options: formData.type === 'Buzzer' 
        ? [{
            id: '',
            questionId: '',
            content: formData.correctAnswer || '',
            isCorrect: true,
            order: 0,
            createdAt: new Date(),
            updatedAt: new Date()
          }]
        : formData.options?.map((opt, index) => ({
            id: '',
            questionId: '',
            content: opt,
            isCorrect: opt === formData.correctAnswer,
            order: index,
            createdAt: new Date(),
            updatedAt: new Date()
          })) || [],
      createdAt: new Date(),
      updatedAt: new Date()
    };

    setQuiz(prev => ({
      ...prev,
      questions: [...(prev.questions || []), newQuestion]
    }));

    setStep('list');
    setSelectedType(null);
  };

  const handleCancel = () => {
    setStep('list');
    setSelectedType(null);
    setShowIaPromptInput(false);
    setIaPrompt('');
  };

  const handleSaveQuiz = async () => {
    if (!quiz.name || !quiz.questions?.length) {
      toast.error('Veuillez ajouter un nom et au moins une question au quiz');
      return;
    }

    setIsLoading(true);
    try {
      const token = localStorage.getItem('token');
      const method = quiz.id ? 'PUT' : 'POST';
      const url = quiz.id ? `${createQuizApiUrl}/${quiz.id}` : createQuizApiUrl;
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(quiz)
      });

      if (response.ok) {
        const result = await response.json();
        if (!quiz.id && result.quiz) {
          setQuiz(result.quiz);
        }
        toast.success(quiz.id ? 'Quiz mis à jour avec succès!' : 'Quiz créé avec succès!');
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erreur lors de la sauvegarde');
      }
    } catch (error) {
      toast.error('Erreur lors de la sauvegarde du quiz');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateIaQuiz = async (prompt: string) => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${createIaQuizApiUrl}/${encodeURIComponent(prompt)}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const result = await response.json();
        if (result.quiz) {
          setQuiz(result.quiz);
        } else if (result.questions) {
          setQuiz(prev => ({
            ...prev,
            name: prev.name || `Quiz IA - ${prompt}`,
            description: prev.description || `Quiz généré par IA sur le thème: ${prompt}`,
            questions: result.questions
          }));
        } else if (result.name || result.questions) {
          setQuiz(prev => ({
            ...prev,
            ...result,
            name: result.name || prev.name || `Quiz IA - ${prompt}`,
            description: result.description || prev.description || `Quiz généré par IA sur le thème: ${prompt}`
          }));
        }

        alert('Quiz IA créé avec succès!');
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erreur lors de la création du quiz IA');
      }
    } catch (error) {
      console.error('Erreur:', error);
      alert('Erreur lors de la création du quiz IA');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-white flex flex-col">
      <Navbar />
      <div className="flex flex-1 p-6 md:p-10 gap-8 mt-20">
        <div className="flex-1 bg-white text-black rounded-3xl p-6 shadow-2xl flex flex-col justify-between relative">
          {step === 'list' && (
            <>
              <div>
                <h2 className="text-2xl font-extrabold mb-4 text-purple-700">
                  {quiz.id ? 'Modifier le Quiz' : 'Créer un Quiz'}
                </h2>
                <div className="mb-6 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nom du quiz *
                    </label>
                    <input
                      type="text"
                      value={quiz.name || ''}
                      onChange={(e) => setQuiz(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="Entrez le nom du quiz"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description
                    </label>
                    <textarea
                      value={quiz.description || ''}
                      onChange={(e) => setQuiz(prev => ({ ...prev, description: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="Description du quiz (optionnel)"
                      rows={3}
                    />
                  </div>
                </div>
                {!showIaPromptInput ? (
                  <h3 className="text-xl font-bold mb-4 text-purple-700">Questions</h3>
                ) : null}
                {quiz.questions?.length === 0 && !showIaPromptInput ? (
                  <p className="text-gray-400 italic">Aucune question ajoutée</p>
                ) : (
                  <ul className="space-y-2 mb-6">
                    {quiz.questions?.map((q: IQuestion, idx: number) => (
                      <li key={idx} className="bg-purple-100 text-purple-800 px-4 py-2 rounded-xl shadow space-y-1">
                        <div><strong>Type:</strong> {q.type?.name}</div>
                        <div><strong>Question:</strong> {q.content}</div>
                        {q.type?.name === 'Buzzer' && (
                          <div><strong>Réponse correcte:</strong> {q.options?.[0]?.content || 'Non renseignée'}</div>
                        )}
                        {q.type?.name !== 'Buzzer' && q.options && q.options.length > 0 && (
                          <ul className="pl-4 list-disc">
                            {q.options.map((opt: IOption, i: number) => (
                              <li key={i} className={opt.isCorrect ? 'font-bold underline' : ''}>
                                {opt.content}
                              </li>
                            ))}
                          </ul>
                        )}
                      </li>
                    ))}
                  </ul>
                )}
                {showIaPromptInput && (
                  <div className="mt-4 p-4 border border-purple-400 rounded-md bg-purple-50 text-black">
                    <label className="block mb-2 font-semibold" htmlFor="iaPrompt">Entrez le prompt pour le quiz IA :</label>
                    <input
                      id="iaPrompt"
                      type="text"
                      value={iaPrompt}
                      onChange={(e) => setIaPrompt(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="Ex: La formule 1"
                    />
                    <div className="flex justify-end gap-2 mt-3">
                      <Button
                        onClick={() => {
                          if (!iaPrompt.trim()) {
                            alert('Veuillez entrer un prompt');
                            return;
                          }
                          handleCreateIaQuiz(iaPrompt);
                          setShowIaPromptInput(false);
                          setIaPrompt('');
                        }}
                        disabled={isLoading}
                      >
                        {isLoading ? 'Chargement...' : 'Créer le quiz IA'}
                      </Button>
                      <Button onClick={() => {
                        setShowIaPromptInput(false);
                        setIaPrompt('');
                      }}>
                        Annuler
                      </Button>
                    </div>
                  </div>
                )}
              </div>
              <div className="flex justify-between gap-4">
                <div className="w-1/2">
                  <Button
                    onClick={handleSaveQuiz}
                    disabled={isLoading || !quiz.name || quiz.questions?.length === 0}
                  >
                    {isLoading ? '💾 Sauvegarde...' : quiz.id ? '💾 Mettre à jour le quiz' : '💾 Sauvegarder le quiz'}
                  </Button>
                </div>
                <div className="w-1/2 flex justify-end gap-2">
                  <Button onClick={() => setStep('choose')}>➕ Ajouter une question</Button>
                  <Button onClick={() => setShowIaPromptInput(true)}>🧠 Créer un quiz IA</Button>
                </div>
              </div>
            </>
          )}
          {step === 'choose' && (
            <>
              <div>
                <h2 className="text-2xl font-extrabold mb-4 text-purple-700">Choisissez un type de question</h2>
                <QuestionSelector types={availableTypes} onSelect={handleSelectType} />
              </div>
              <div className="flex justify-end">
                <div className="w-1/3">
                  <Button onClick={handleCancel}>❌ Annuler</Button>
                </div>
              </div>
            </>
          )}
          {step === 'form' && selectedType && (
            <>
              <div>
                <h2 className="text-2xl font-extrabold mb-4 text-purple-700">Créer une question : {selectedType}</h2>
                <QuestionFormWrapper
                  type={selectedType}
                  onBack={() => setStep('choose')}
                  onConfirm={handleConfirmAdd}
                />
              </div>
              <div className="flex justify-end">
                <div className="w-1/3">
                  <Button onClick={handleCancel}>❌ Annuler</Button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default LobbyCreate;
