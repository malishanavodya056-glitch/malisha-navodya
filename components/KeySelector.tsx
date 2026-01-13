
import React from 'react';

interface KeySelectorProps {
  onKeySelected: () => void;
}

const KeySelector: React.FC<KeySelectorProps> = ({ onKeySelected }) => {
  const handleOpenKeySelector = async () => {
    if (window.aistudio) {
      await window.aistudio.openSelectKey();
      onKeySelected();
    }
  };

  return (
    <div className="bg-orange-500/10 border border-orange-500/30 p-4 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-orange-500/20 flex items-center justify-center text-orange-500">
          <i className="fas fa-circle-info"></i>
        </div>
        <div>
          <p className="text-sm font-semibold text-orange-200">Payment & API Key Required</p>
          <p className="text-xs text-orange-400/80">Animation via Veo requires a billing-enabled API key.</p>
        </div>
      </div>
      <div className="flex gap-3">
        <a 
          href="https://ai.google.dev/gemini-api/docs/billing" 
          target="_blank" 
          rel="noopener noreferrer"
          className="px-4 py-2 text-xs text-orange-400 hover:text-orange-300 transition-colors flex items-center gap-1"
        >
          <i className="fas fa-external-link-alt"></i> Billing Info
        </a>
        <button
          onClick={handleOpenKeySelector}
          className="bg-orange-600 hover:bg-orange-500 text-white text-xs font-bold py-2 px-4 rounded-lg transition-all"
        >
          SELECT API KEY
        </button>
      </div>
    </div>
  );
};

export default KeySelector;
