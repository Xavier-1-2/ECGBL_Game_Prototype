import { motion } from 'framer-motion';

export default function PauseMenu({ onResume }) {
  return (
    <div className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex items-center justify-center animate-fadeIn">
      <div className="border-2 border-terminal-green p-10 bg-black min-w-[320px] shadow-[0_0_50px_rgba(0,255,65,0.3)]">
        <h2 className="text-3xl mb-8 text-terminal-green tracking-widest text-center animate-pulse">
          :: PAUSED ::
        </h2>
        
        <div className="flex flex-col gap-4">
          <button 
            onClick={onResume}
            className="w-full py-3 border border-terminal-green hover:bg-terminal-green hover:text-black transition-all"
          >
            [ RESUME OPERATION ]
          </button>
          
          <button 
            onClick={() => window.location.reload()}
            className="w-full py-3 border border-red-900 text-red-500 hover:bg-red-500 hover:text-black transition-all"
          >
            [ ABORT MISSION ]
          </button>
        </div>

        <div className="mt-8 pt-4 border-t border-terminal-green/20 text-[10px] opacity-50 text-center">
          CORE_TEMP: OPTIMAL | SIGNAL: 100%
        </div>
      </div>
    </div>
  );
}