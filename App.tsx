
import React, { useState, useEffect, useCallback } from 'react';
import { WallpaperState, PromptConfig } from './types';
import { generateWallpaperImage, generateWallpaperVideo } from './services/gemini';
import Header from './components/Header';
import WallpaperDisplay from './components/WallpaperDisplay';
import SettingsPanel from './components/SettingsPanel';
import KeySelector from './components/KeySelector';
import Logo from './components/Logo';

const DEFAULT_PROMPT_CONFIG: PromptConfig = {
  character: "futuristic Spider-Man style character",
  pose: "dynamic low-angle crouching pose",
  suit: "sleek black and red high-tech suit with glowing red eyes and fiery energy flowing from one arm",
  environment: "Dark moody environment with wet reflective ground",
  lighting: "dramatic red and orange lighting, glowing energy particles, sparks and light trails",
  animationKeywords: "subtle motion blur, flowing energy animation, glowing particles moving, light flicker, slow cinematic motion, parallax depth effect, live wallpaper style"
};

const App: React.FC = () => {
  const [config, setConfig] = useState<PromptConfig>(DEFAULT_PROMPT_CONFIG);
  const [state, setState] = useState<WallpaperState>({
    imageUrl: null,
    videoUrl: null,
    status: 'idle',
    errorMessage: null
  });
  const [hasKey, setHasKey] = useState<boolean>(false);

  useEffect(() => {
    const checkKey = async () => {
      if (window.aistudio) {
        const selected = await window.aistudio.hasSelectedApiKey();
        setHasKey(selected);
      }
    };
    checkKey();
  }, []);

  const handleGenerateImage = async () => {
    setState(prev => ({ ...prev, status: 'generating-image', errorMessage: null, videoUrl: null }));
    const prompt = `Ultra-detailed cinematic superhero wallpaper, ${config.character} in a ${config.pose}, wearing a ${config.suit}. ${config.environment}, ${config.lighting}. Hyper-realistic textures, sharp focus, realistic fabric details, glossy reflections, cinematic depth of field, volumetric lighting, rim light, ultra sharp details. 4K vertical orientation, futuristic, epic, powerful, cinematic look.`;
    
    try {
      const url = await generateWallpaperImage(prompt);
      setState(prev => ({ ...prev, imageUrl: url, status: 'idle' }));
    } catch (err: any) {
      setState(prev => ({ ...prev, status: 'error', errorMessage: err.message || "Failed to generate image." }));
    }
  };

  const handleGenerateVideo = async () => {
    if (!state.imageUrl) return;
    
    setState(prev => ({ ...prev, status: 'generating-video', errorMessage: null }));
    const animationPrompt = `${config.animationKeywords}. Bring the character to life with cinematic motion.`;
    
    try {
      const url = await generateWallpaperVideo(state.imageUrl, animationPrompt);
      setState(prev => ({ ...prev, videoUrl: url, status: 'idle' }));
    } catch (err: any) {
      if (err.message?.includes("Requested entity was not found")) {
        setHasKey(false);
      }
      setState(prev => ({ ...prev, status: 'error', errorMessage: err.message || "Failed to animate wallpaper." }));
    }
  };

  const onKeySelected = () => {
    setHasKey(true);
  };

  return (
    <div className="min-h-screen flex flex-col items-center p-4 md:p-8 relative">
      <div className="absolute top-0 left-0 w-full h-full -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-red-900/10 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-orange-900/10 blur-[120px] rounded-full"></div>
      </div>

      <Header />

      <main className="w-full max-w-6xl flex flex-col lg:flex-row gap-8 mt-12 flex-grow">
        <div className="flex-1 flex flex-col gap-6">
          <div className="glass rounded-3xl p-6 border border-white/5 shadow-xl">
            <h2 className="text-xl font-orbitron mb-6 text-red-500 tracking-wider flex items-center gap-3">
              <span className="w-2 h-2 bg-red-600 rounded-full animate-pulse"></span>
              CORE CONFIGURATION
            </h2>
            <SettingsPanel config={config} setConfig={setConfig} disabled={state.status !== 'idle' && state.status !== 'error'} />
            
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <button
                onClick={handleGenerateImage}
                disabled={state.status !== 'idle' && state.status !== 'error'}
                className="flex-1 py-4 px-6 bg-gradient-to-br from-red-600 to-red-900 rounded-xl font-bold uppercase tracking-widest text-sm hover:from-red-500 hover:to-red-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed red-glow border border-red-400/30 flex items-center justify-center gap-3 group"
              >
                {state.status === 'generating-image' ? (
                  <i className="fas fa-spinner animate-spin"></i>
                ) : (
                  <i className="fas fa-bolt group-hover:scale-125 transition-transform"></i>
                )}
                <span>{state.status === 'generating-image' ? "Generating Base..." : "Generate 4K Base"}</span>
              </button>

              <button
                onClick={handleGenerateVideo}
                disabled={!state.imageUrl || (state.status !== 'idle' && state.status !== 'error')}
                className="flex-1 py-4 px-6 bg-gradient-to-br from-orange-600 to-orange-900 rounded-xl font-bold uppercase tracking-widest text-sm hover:from-orange-500 hover:to-orange-800 transition-all disabled:opacity-30 disabled:cursor-not-allowed orange-glow border border-orange-400/30 flex items-center justify-center gap-3 group"
              >
                {!hasKey ? (
                  <i className="fas fa-lock"></i>
                ) : state.status === 'generating-video' ? (
                  <i className="fas fa-spinner animate-spin"></i>
                ) : (
                  <i className="fas fa-film group-hover:rotate-12 transition-transform"></i>
                )}
                <span>{!hasKey ? "Key Required" : state.status === 'generating-video' ? "Animating..." : "Animate Frame"}</span>
              </button>
            </div>

            {!hasKey && (
              <div className="mt-4">
                <KeySelector onKeySelected={onKeySelected} />
              </div>
            )}
          </div>

          {state.errorMessage && (
            <div className="bg-red-500/10 border border-red-500/50 p-4 rounded-xl text-red-400 text-sm flex items-start gap-3 animate-bounce-short">
              <i className="fas fa-circle-exclamation mt-1"></i>
              <p>{state.errorMessage}</p>
            </div>
          )}

          <div className="glass rounded-2xl p-6 text-sm text-slate-400 border border-white/5">
             <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
               <i className="fas fa-info-circle text-red-500"></i> Protocol:
             </h3>
             <ul className="space-y-2">
               <li className="flex items-center gap-2">
                 <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                 Draft your hero's unique visual signature.
               </li>
               <li className="flex items-center gap-2">
                 <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                 Manifest the 4K static frame using Nox-Image.
               </li>
               <li className="flex items-center gap-2">
                 <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                 Infuse temporal motion with the Veo protocol.
               </li>
             </ul>
          </div>
        </div>

        <div className="w-full lg:w-[450px] flex flex-col gap-6">
          <div className="glass rounded-3xl p-4 overflow-hidden border border-white/10 shadow-2xl relative h-[700px] bg-slate-950">
            <WallpaperDisplay state={state} />
          </div>
        </div>
      </main>

      <footer className="mt-12 text-slate-500 text-xs text-center py-8 border-t border-white/5 w-full flex flex-col items-center gap-4">
        <Logo size={32} className="opacity-40 grayscale hover:grayscale-0 transition-all cursor-pointer" />
        <p className="font-orbitron tracking-widest">NOX MALIYA • SYSTEM v2.5.1</p>
        <p className="opacity-60 uppercase text-[9px] tracking-[0.2em]">Crafted for the next generation of heroes</p>
      </footer>
    </div>
  );
};

export default App;
