import { useState } from 'react';
import { levels } from './data/levels';
import ManagerFeed from './components/ManagerFeed';
import LevelDisplay from './components/LevelDisplay';
import StartMenu from './components/StartMenu';
import PauseMenu from './components/PauseMenu';

export default function App() {
  const [gameState, setGameState] = useState('START'); 
  const [currentLevelIdx, setCurrentLevelIdx] = useState(0);

  const currentLevel = levels[currentLevelIdx];

  const handleLevelComplete = () => {
    if (currentLevelIdx < levels.length - 1) {
      setCurrentLevelIdx(prev => prev + 1);
    } else {
      setGameState('WON');
    }
  };

 return (
  <div style={{ 
    backgroundColor: '#0a0a0a', 
    color: '#00ff41', 
    height: '100vh', 
    width: '100vw', 
    display: 'flex', 
    flexDirection: 'column',
    margin: 0,
    padding: 0,
    overflow: 'hidden',
    fontFamily: 'monospace'
  }}>
    
    <div className="scanline-overlay" />

    {gameState === 'START' && <StartMenu onStart={() => setGameState('PLAYING')} />}
    
    {gameState === 'PAUSED' && <PauseMenu onResume={() => setGameState('PLAYING')} />}

   {gameState === 'PLAYING' && (
  <main style={{ 
    height: '100vh', 
    width: '100vw', 
    display: 'flex', 
    flexDirection: 'column',
    backgroundColor: 'black',
    
    padding: '1.5rem', 
    boxSizing: 'border-box'
  }}>
    
   
    <div style={{ 
      width: '100%', 
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center',
      borderBottom: '1px solid rgba(0, 255, 65, 0.5)', 
      paddingBottom: '0.5rem',
      flexShrink: 0 
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
        <span style={{ fontSize: '0.7rem', opacity: 0.5, letterSpacing: '2px' }}>OP_ID:</span>
        <h1 style={{ fontSize: '1.2rem', margin: 0, letterSpacing: '3px', fontWeight: 'bold' }}>
          COLD BOOT
        </h1>
      </div>
      
      <button 
        onClick={() => setGameState('PAUSED')} 
        style={{ 
          fontSize: '0.7rem', 
          padding: '4px 12px', 
          border: '1px solid #00ff41',
          background: 'transparent' 
        }}
      >
        [ ESC ] PAUSE_SYSTEM
      </button>
    </div>

   
<div style={{ 
  flexGrow: 1, 
  display: 'flex', 
  flexDirection: 'column',
  alignItems: 'center', 
  justifyContent: 'flex-start', 
  paddingTop: '2vh', 
  width: '100%',
}}>
  <div style={{ 
    width: '50%', 
    maxWidth: '800px',
    
    height: 'auto',
    maxHeight: '20vh', 
    display: 'flex',
    flexDirection: 'column'
  }}>
    <LevelDisplay level={currentLevel} onComplete={handleLevelComplete} />
  </div>
</div>

    
    <div style={{ flexShrink: 0, width: '100%' }}>
      
      <div style={{ borderTop: '1px solid rgba(0, 255, 65, 0.3)', pt: '10px' }}>
        <ManagerFeed intel={currentLevel.intel} />
      </div>
    </div>

  </main>
)}
  </div>
);
}