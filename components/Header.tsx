
import React from 'react';
import Logo from './Logo';

const Header: React.FC = () => {
  return (
    <header className="w-full flex flex-col items-center text-center gap-4">
      <Logo size={80} className="mb-2" />
      <div className="flex flex-col items-center">
        <h1 className="text-4xl md:text-6xl font-orbitron font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-white to-slate-500">
          NOX <span className="text-red-600">MALIYA</span>
        </h1>
        <p className="text-slate-400 uppercase tracking-[0.4em] text-[10px] md:text-xs mt-2 font-medium opacity-80">
          Dynamic Live Wallpaper Forge
        </p>
      </div>
      <div className="h-px w-24 bg-gradient-to-r from-transparent via-red-600/50 to-transparent mt-2"></div>
    </header>
  );
};

export default Header;
