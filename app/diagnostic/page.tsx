'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { questions } from '@/lib/questions';

export default function DiagnosticPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const questionsPerPage = 4;
  const totalPages = Math.ceil(questions.length / questionsPerPage);
  const currentQuestions = questions.slice(
    currentStep * questionsPerPage,
    (currentStep + 1) * questionsPerPage
  );

  const handleAnswer = (questionId: string, value: any) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
  };

  const canProceed = () => {
    return currentQuestions.every(q => answers[q.id] !== undefined);
  };

  const handleNext = () => {
    if (currentStep < totalPages - 1) {
      setCurrentStep(prev => prev + 1);
      window.scrollTo(0, 0);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
      window.scrollTo(0, 0);
    }
  };

  const handleSubmit = async () => {
    if (!email || isSubmitting) return;

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, answers })
      });

      const data = await response.json();

      if (response.ok) {
        router.push(`/result/${data.id}`);
      } else {
        alert('Failed to submit. Please try again.');
        setIsSubmitting(false);
      }
    } catch (error) {
      alert('Error submitting. Please try again.');
      setIsSubmitting(false);
    }
  };

  const isLastPage = currentStep === totalPages - 1;
  const progress = ((currentStep + 1) / totalPages) * 100;

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Progress bar */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Step {currentStep + 1} of {totalPages}</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-black transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Questions */}
        <div className="bg-white p-8 rounded-lg shadow-sm space-y-8">
          {currentQuestions.map((question, idx) => (
            <div key={question.id} className="space-y-4">
              <h3 className="text-lg font-light text-black">
                {currentStep * questionsPerPage + idx + 1}. {question.text}
              </h3>

              {question.type === 'single' && question.options && (
                <div className="space-y-2">
                  {question.options.map((option, optionIdx) => (
                    <label
                      key={optionIdx}
                      className="flex items-start p-4 border border-gray-200 rounded cursor-pointer hover:border-black transition-colors"
                    >
                      <input
                        type="radio"
                        name={question.id}
                        checked={answers[question.id] === optionIdx}
                        onChange={() => handleAnswer(question.id, optionIdx)}
                        className="mt-1 mr-3"
                      />
                      <span className="text-gray-700 font-light">{option}</span>
                    </label>
                  ))}
                </div>
              )}

              {question.type === 'scale' && (
                <div className="space-y-3">
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>{question.scaleLabels?.min}</span>
                    <span>{question.scaleLabels?.max}</span>
                  </div>
                  <div className="flex justify-between gap-2">
                    {Array.from({ length: (question.scaleMax || 5) - (question.scaleMin || 1) + 1 }, (_, i) => {
                      const value = (question.scaleMin || 1) + i;
                      return (
                        <button
                          key={value}
                          onClick={() => handleAnswer(question.id, value)}
                          className={`flex-1 py-3 border rounded font-light transition-colors ${
                            answers[question.id] === value
                              ? 'bg-black text-white border-black'
                              : 'bg-white text-gray-700 border-gray-300 hover:border-black'
                          }`}
                        >
                          {value}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          ))}

          {/* Email input on last page */}
          {isLastPage && (
            <div className="pt-4 border-t border-gray-200 space-y-3">
              <label htmlFor="email" className="block text-sm font-light text-gray-700">
                Email (to receive your result)
              </label>
              <input
                type="email"
                id="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="w-full px-4 py-3 border border-gray-300 rounded focus:border-black focus:outline-none"
              />
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="mt-8 flex justify-between">
          <button
            onClick={handleBack}
            disabled={currentStep === 0}
            className="px-6 py-3 text-gray-600 font-light disabled:opacity-30 disabled:cursor-not-allowed"
          >
            ← Back
          </button>

          {!isLastPage ? (
            <button
              onClick={handleNext}
              disabled={!canProceed()}
              className="px-8 py-3 bg-black text-white font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-800 transition-colors"
            >
              Next →
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={!canProceed() || !email || isSubmitting}
              className="px-8 py-3 bg-black text-white font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-800 transition-colors"
            >
              {isSubmitting ? 'Submitting...' : 'Get my result'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
