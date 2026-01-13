
export interface WallpaperState {
  imageUrl: string | null;
  videoUrl: string | null;
  status: 'idle' | 'generating-image' | 'generating-video' | 'error';
  errorMessage: string | null;
}

export interface PromptConfig {
  character: string;
  pose: string;
  suit: string;
  environment: string;
  lighting: string;
  animationKeywords: string;
}

// Fixed: Moved the interface definition into the global scope. This ensures it merges with 
// the platform's existing global type namespace, resolving the "subsequent property declarations" 
// error on the Window interface where local and global 'AIStudio' types were conflicting.
declare global {
  interface AIStudio {
    hasSelectedApiKey: () => Promise<boolean>;
    openSelectKey: () => Promise<void>;
  }

  interface Window {
    // Fixed: References the global AIStudio type. The optional modifier is maintained for 
    // runtime safety as the object is injected externally.
    aistudio?: AIStudio;
    webkitAudioContext: typeof AudioContext;
  }
}
