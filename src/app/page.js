"use client"; // Указываем, что это клиентский компонент
import { useEffect, useState } from 'react';

export default function Home() {
  const [validationResult, setValidationResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (window.Telegram && window.Telegram.WebApp) {
      console.log('Telegram WebApp is available');
      const webApp = window.Telegram.WebApp;
      webApp.ready();
      console.log('WebApp is ready');

      const initData = webApp.initData;
      console.log('Init Data:', initData);

      if (!initData) {
        console.error('Init Data is empty');
        return;
      }

      setIsLoading(true); 

      fetch('https://shop.chasman.engineer/api/v1/auth/validate-init', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ initData }),
      })
        .then((response) => {
          console.log('Raw Response:', response);
          return response.json();
        })
        .then((data) => {
          console.log('Validation Response:', data);
          setValidationResult(data);
        })
        .catch((error) => {
          console.error('Validation Error:', error);
          setValidationResult({ valid: false, error: error.message });
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      console.error('Telegram WebApp is not available');
    }
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold text-gray-800">Welcome to Telegram Mini App</h1>
      <p className="mt-4 text-gray-600">This is a mini app built with React, Next.js, and Tailwind CSS.</p>

      {isLoading && <p className="mt-4 text-blue-600">Loading...</p>}

      {validationResult && (
        <div className="mt-6 p-4 bg-white shadow-md rounded-lg">
          {validationResult.valid ? (
            <p className="text-green-600">✅ Validation successful!</p>
          ) : (
            <p className="text-red-600">❌ Validation failed: {validationResult.error}</p>
          )}
        </div>
      )}
    </div>
  );
}