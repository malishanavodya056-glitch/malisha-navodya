
import React from 'react';
import { WallpaperState } from '../types';
import Logo from './Logo';

interface WallpaperDisplayProps {
  state: WallpaperState;
}

const WallpaperDisplay: React.FC<WallpaperDisplayProps> = ({ state }) => {
  const { imageUrl, videoUrl, status } = state;

  return (
    <div className="relative w-full h-full bg-slate-950 flex items-center justify-center rounded-2xl overflow-hidden group">
      {/* Background patterns when idle/empty */}
      {!imageUrl && status === 'idle' && (
        <div className="absolute inset-0 opacity-10 flex items-center justify-center">
          <div className="w-[150%] h-[150%] border-[0.5px] border-white/20 rounded-full animate-[spin_60s_linear_infinite]"></div>
          <div className="absolute w-[120%] h-[120%] border-[0.5px] border-white/10 rounded-full animate-[spin_40s_linear_infinite_reverse]"></div>
        </div>
      )}

      {!imageUrl && status === 'idle' && (
        <div className="flex flex-col items-center gap-6 text-slate-600 animate-pulse-slow z-10">
          <Logo size={100} className="opacity-20" />
          <div className="flex flex-col items-center gap-1">
            <p className="font-orbitron text-[10px] tracking-[0.4em] uppercase text-slate-500">Awaiting Signal</p>
            <div className="h-0.5 w-12 bg-red-600/30 rounded-full mt-2"></div>
          </div>
        </div>
      )}

      {imageUrl && !videoUrl && (
        <img 
          src={imageUrl} 
          alt="Generated Base" 
          className={`w-full h-full object-cover transition-all duration-1000 ${status === 'generating-video' ? 'brightness-50 blur-md scale-110' : 'scale-100'}`} 
        />
      )}

      {videoUrl && (
        <video 
          src={videoUrl} 
          autoPlay 
          loop 
          muted 
          playsInline
          className="w-full h-full object-cover animate-fade-in"
        />
      )}

      {(status === 'generating-image' || status === 'generating-video') && (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/80 backdrop-blur-md transition-all animate-in fade-in duration-500">
          <div className="relative">
            {/* Spinning ring */}
            <div className="w-32 h-32 rounded-full border-b-2 border-l-2 border-red-600 animate-spin duration-700"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <Logo size={48} className="animate-pulse" />
            </div>
            
            {/* Scanning line effect */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-red-500 to-transparent animate-scan"></div>
          </div>
          <div className="mt-8 flex flex-col items-center gap-2">
            <p className="font-orbitron text-sm tracking-[0.3em] text-white animate-pulse">
              {status === 'generating-image' ? 'MATERIALIZING' : 'SYNCHRONIZING'}
            </p>
            <div className="flex gap-1 mt-1">
              <div className="w-1 h-1 bg-red-600 rounded-full animate-bounce delay-75"></div>
              <div className="w-1 h-1 bg-red-600 rounded-full animate-bounce delay-150"></div>
              <div className="w-1 h-1 bg-red-600 rounded-full animate-bounce delay-300"></div>
            </div>
          </div>
        </div>
      )}

      {(imageUrl || videoUrl) && status === 'idle' && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-4 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0 z-30">
          <a 
            href={videoUrl || imageUrl || '#'} 
            download={videoUrl ? "nox-maliya-live.mp4" : "nox-maliya-base.png"}
            className="bg-red-600/20 hover:bg-red-600/40 backdrop-blur-xl p-4 rounded-2xl text-white transition-all border border-red-500/30 flex items-center gap-2 shadow-2xl"
            title="Download Result"
          >
            <i className="fas fa-download"></i>
            <span className="text-[10px] font-bold uppercase tracking-widest">Export</span>
          </a>
          <button 
             onClick={() => window.open(videoUrl || imageUrl || '#', '_blank')}
             className="bg-white/5 hover:bg-white/10 backdrop-blur-xl p-4 rounded-2xl text-white transition-all border border-white/10 flex items-center gap-2"
             title="Full Screen Preview"
          >
            <i className="fas fa-expand"></i>
            <span className="text-[10px] font-bold uppercase tracking-widest">Expand</span>
          </button>
        </div>
      )}

      {/* Aesthetic Overlay Elements */}
      <div className="absolute inset-0 pointer-events-none border-[1px] border-white/10 rounded-2xl z-10"></div>
      
      {/* HUD Elements */}
      <div className="absolute top-6 left-6 pointer-events-none z-10 flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${imageUrl ? 'bg-green-500 animate-pulse' : 'bg-red-600'}`}></div>
          <span className="bg-black/40 backdrop-blur-sm px-2 py-1 rounded text-[9px] font-orbitron text-slate-300 uppercase tracking-widest">
            {videoUrl ? "LIVE FEED" : imageUrl ? "STATIC FRAME" : "STANDBY"}
          </span>
        </div>
      </div>
      
      <div className="absolute top-6 right-6 pointer-events-none z-10 opacity-30">
        <div className="w-8 h-8 border-t-2 border-r-2 border-white/20"></div>
      </div>
      <div className="absolute bottom-6 right-6 pointer-events-none z-10 opacity-30">
        <div className="w-8 h-8 border-b-2 border-r-2 border-white/20"></div>
      </div>
      <div className="absolute bottom-6 left-6 pointer-events-none z-10 opacity-30">
        <div className="w-8 h-8 border-b-2 border-l-2 border-white/20"></div>
      </div>

      <style>{`
        @keyframes scan {
          0% { top: 0%; opacity: 0; }
          50% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
        .animate-scan {
          animation: scan 2s linear infinite;
        }
        .animate-fade-in {
          animation: fadeIn 1.5s ease-out;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(1.05); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
};

export default WallpaperDisplay;
