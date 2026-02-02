'use client';

import { useCompletion } from '@ai-sdk/react';
import { useState } from 'react';

export default function Home() {
  const [hasJoke, setHasJoke] = useState(false);
  
  const { completion, isLoading, complete } = useCompletion({
    api: '/api/joke',
  });

  const getJoke = async () => {
    setHasJoke(true);
    await complete('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-8 text-center">
          {/* Header */}
          <div className="mb-8">
            <span className="text-6xl mb-4 block">🎭</span>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Joke Generator
            </h1>
            <p className="text-gray-500">
              Powered by AI • Click for instant laughs
            </p>
          </div>

          {/* Joke Display */}
          {hasJoke && (
            <div className="mb-8 p-6 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl border border-purple-100">
              {isLoading && !completion ? (
                <div className="flex items-center justify-center gap-2 text-purple-600">
                  <div className="w-2 h-2 bg-purple-600 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                  <div className="w-2 h-2 bg-purple-600 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                  <div className="w-2 h-2 bg-purple-600 rounded-full animate-bounce"></div>
                </div>
              ) : (
                <p className="text-lg text-gray-700 leading-relaxed whitespace-pre-wrap">
                  {completion}
                  {isLoading && (
                    <span className="inline-block w-1 h-5 bg-purple-500 ml-1 animate-pulse"></span>
                  )}
                </p>
              )}
            </div>
          )}

          {/* Button */}
          <button
            onClick={getJoke}
            disabled={isLoading}
            className="w-full py-4 px-8 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold text-lg rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            {isLoading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Thinking...
              </span>
            ) : hasJoke ? (
              '🎲 Another one!'
            ) : (
              '😂 Tell me a joke!'
            )}
          </button>

          {/* Footer */}
          <p className="mt-6 text-xs text-gray-400">
            Built with Next.js + Vercel AI SDK
          </p>
        </div>
      </div>
    </div>
  );
}
