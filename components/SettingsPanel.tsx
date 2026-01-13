
import React from 'react';
import { PromptConfig } from '../types';

interface SettingsPanelProps {
  config: PromptConfig;
  setConfig: React.Dispatch<React.SetStateAction<PromptConfig>>;
  disabled: boolean;
}

const SettingsPanel: React.FC<SettingsPanelProps> = ({ config, setConfig, disabled }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setConfig(prev => ({ ...prev, [name]: value }));
  };

  const fields = [
    { label: "Character Style", name: "character", placeholder: "e.g. Cyberpunk Spiderman" },
    { label: "Dynamic Pose", name: "pose", placeholder: "e.g. Crouching, Jumping" },
    { label: "Suit Details", name: "suit", placeholder: "e.g. Sleek carbon fiber with glowing eyes" },
    { label: "Environment", name: "environment", placeholder: "e.g. Rainy neon city street" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {fields.map((f) => (
        <div key={f.name} className="flex flex-col gap-1.5">
          <label className="text-[10px] uppercase font-bold text-slate-500 tracking-widest">{f.label}</label>
          <input
            type="text"
            name={f.name}
            value={(config as any)[f.name]}
            onChange={handleChange}
            disabled={disabled}
            placeholder={f.placeholder}
            className="bg-slate-900/50 border border-white/10 rounded-lg py-2.5 px-3 text-sm focus:outline-none focus:border-red-500/50 focus:ring-1 focus:ring-red-500/20 transition-all disabled:opacity-50"
          />
        </div>
      ))}
      <div className="md:col-span-2 flex flex-col gap-1.5">
        <label className="text-[10px] uppercase font-bold text-slate-500 tracking-widest">Animation Effects</label>
        <textarea
          name="animationKeywords"
          value={config.animationKeywords}
          onChange={handleChange}
          disabled={disabled}
          rows={3}
          className="bg-slate-900/50 border border-white/10 rounded-lg py-2.5 px-3 text-sm focus:outline-none focus:border-orange-500/50 focus:ring-1 focus:ring-orange-500/20 transition-all disabled:opacity-50 resize-none"
        />
      </div>
    </div>
  );
};

export default SettingsPanel;
