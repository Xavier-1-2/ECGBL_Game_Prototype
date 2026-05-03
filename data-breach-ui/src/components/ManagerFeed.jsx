import { useState, useEffect } from 'react';

export default function ManagerFeed({ intel }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    setIndex(0);
  }, [intel]);

  const handleNext = () => {
    if (index < intel.length - 1) {
      setIndex(index + 1);
    }
  };

  const agentBlue = "#00e5ff";

  return (
    <div className="h-32 border-t-2 border-terminal-green bg-black/90 p-4 relative w-full flex flex-col justify-start">
      <div className="text-[10px] mb-2 opacity-70 tracking-[0.3em] text-left text-terminal-green border-b border-terminal-green/30 pb-1 w-fit">
        ENCRYPTED_SIGNAL // ORIGIN: HANDLER
      </div>
      
      <div className="flex-grow">
        <p className="text-lg text-left leading-tight animate-flicker" style={{ color: agentBlue }}>
          <span className="mr-2 font-bold opacity-70">&gt;</span>
          {intel[index]}
        </p>
      </div>

      {index < intel.length - 1 && (
        <button 
          onClick={handleNext}
          className="absolute right-6 bottom-4 text-[10px] px-3 py-1 animate-pulse uppercase tracking-widest transition-all hover:bg-[#00e5ff22]"
          style={{ 
            color: agentBlue, 
            background: 'transparent', 
            border: `1px solid ${agentBlue}`,
            cursor: 'pointer'
          }}
        >
          [ CLICK_TO_DECRYPT ]
        </button>
      )}
    </div>
  );
}