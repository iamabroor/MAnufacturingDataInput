import React, { useState, useEffect } from 'react';
import { Clock, AlertCircle } from 'lucide-react';
import DataInputForm from './components/DataInputForm';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleFormSubmit = (data: any) => {
    console.log('Form submitted:', data);
    toast.success('Data submitted successfully!');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-3xl">
        <header className="mb-6 text-center">
          <h1 className="text-2xl font-bold text-gray-800">
            Production Data Input
          </h1>
          <div className="flex items-center justify-center mt-2 text-gray-600">
            <Clock className="mr-2" size={20} />
            <span>{currentDateTime.toLocaleString()}</span>
          </div>
        </header>
        <DataInputForm onSubmit={handleFormSubmit} />
      </div>
      <footer className="mt-8 text-center text-gray-500 text-sm">
        <p>© 2024 Dowson. All rights reserved.</p>
      </footer>
      <ToastContainer position="bottom-right" />
    </div>
  );
}

export default App;
