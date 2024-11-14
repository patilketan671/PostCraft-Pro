import React from 'react';
import { Hero } from './components/Hero';
import { PostGenerator } from './components/PostGenerator';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <Hero />
      <PostGenerator />
    </div>
  );
}

export default App;