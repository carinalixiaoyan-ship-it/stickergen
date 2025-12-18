import React, { useState } from 'react';
import { Camera, Wand2 } from 'lucide-react';
import ImageUploader from './components/ImageUploader';
import PromptPanel from './components/PromptPanel';
import ResultDisplay from './components/ResultDisplay';
import { generateImageEdit } from './services/geminiService';
import { ProcessingState } from './types';

function App() {
  const [selectedImage, setSelectedImage] = useState<{data: string, mimeType: string} | null>(null);
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [processingState, setProcessingState] = useState<ProcessingState>({ status: 'idle' });

  const handleImageSelect = (base64: string, mimeType: string) => {
    setSelectedImage({ data: base64, mimeType });
    setResultImage(null);
    setProcessingState({ status: 'idle' });
  };

  const handleClearImage = () => {
    setSelectedImage(null);
    setResultImage(null);
    setProcessingState({ status: 'idle' });
  };

  const handleGenerate = async (prompt: string) => {
    if (!selectedImage) return;

    setProcessingState({ status: 'processing' });
    try {
      const result = await generateImageEdit(selectedImage.data, prompt, selectedImage.mimeType);
      setResultImage(result);
      setProcessingState({ status: 'success' });
    } catch (error) {
      console.error(error);
      setProcessingState({ 
        status: 'error', 
        message: 'Failed to generate image. Please try again with a different prompt or image.' 
      });
    }
  };

  const fullImageDataUri = selectedImage ? `data:${selectedImage.mimeType};base64,${selectedImage.data}` : null;

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-100 selection:bg-rose-500/30">
      {/* Header */}
      <header className="border-b border-slate-800 bg-[#0f172a]/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-tr from-rose-500 to-orange-500 p-2 rounded-lg">
              <Camera size={24} className="text-white" />
            </div>
            <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-rose-200 to-orange-200">
              StickerGen AI
            </h1>
          </div>
          <div className="flex items-center space-x-2 text-sm text-slate-400">
            <Wand2 size={16} className="text-rose-400" />
            <span className="hidden sm:inline">Powered by Gemini 2.5 Flash</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Left Column: Input */}
          <div className="space-y-6">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-white">Source Image</h2>
              <p className="text-slate-400">Upload a photo to start transforming.</p>
            </div>
            
            <ImageUploader 
              onImageSelect={handleImageSelect}
              selectedImage={selectedImage ? selectedImage.data : null}
              onClear={handleClearImage}
            />

            <PromptPanel 
              onGenerate={handleGenerate}
              isProcessing={processingState.status === 'processing'}
              disabled={!selectedImage}
            />

            {processingState.status === 'error' && (
              <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm animate-fade-in">
                {processingState.message}
              </div>
            )}
          </div>

          {/* Right Column: Result */}
          <div className="space-y-6">
             <div className="space-y-2">
              <h2 className="text-2xl font-bold text-white">Generation</h2>
              <p className="text-slate-400">Your AI generated stickers will appear here.</p>
            </div>
            
            {resultImage ? (
              <ResultDisplay 
                resultImage={resultImage} 
                onReset={() => setResultImage(null)} 
              />
            ) : (
              <div className="h-full min-h-[400px] flex items-center justify-center bg-slate-800/30 rounded-xl border border-dashed border-slate-700">
                <div className="text-center text-slate-500 max-w-xs mx-auto p-6">
                  <div className="mb-4 flex justify-center">
                    <Wand2 size={48} className="opacity-20" />
                  </div>
                  <p className="text-lg font-medium mb-2">Ready to create</p>
                  <p className="text-sm">Upload an image and describe your idea to see the magic happen.</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800 mt-12 py-8 bg-[#0f172a]">
        <div className="max-w-7xl mx-auto px-4 text-center text-slate-500 text-sm">
          <p>© {new Date().getFullYear()} StickerGen AI. Built with Google Gemini API.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
