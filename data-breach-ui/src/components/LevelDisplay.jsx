import { useState, useEffect, useCallback } from 'react';

export default function LevelDisplay({ level, onComplete }) {
  const [error, setError] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const [currentStep, setCurrentStep] = useState(0);
  const [terminalHistory, setTerminalHistory] = useState(['SYSTEM_READY...']);

  const [score, setScore] = useState(0);
  const [currentPacket, setCurrentPacket] = useState('');

  const [gateType, setGateType] = useState('AND');
  const [inputA, setInputA] = useState(true);
  const [inputB, setInputB] = useState(false);

  const generatePacket = useCallback(() => {
    const isAgent = Math.random() > 0.5;
    if (isAgent) {
      setCurrentPacket(`192.168.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`);
    } else {
      const prefix = Math.random() > 0.5 ? '10' : '172';
      setCurrentPacket(`${prefix}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`);
    }
  }, []);

  useEffect(() => {
    setInputValue('');
    setError(false);
    setCurrentStep(0);
    setTerminalHistory(['SYSTEM_READY...']);
    setScore(0);
    setGateType('AND');
    setInputA(true);
    setInputB(false);

    if (level.taskType === "FIREWALL_FILTER") {
      generatePacket();
    }
  }, [level.id, level.taskType, generatePacket]);

  const handleTerminalSubmit = (e) => {
    e.preventDefault();
    const input = inputValue.trim().toLowerCase();
    if (!level.steps) return;

    
    const targetStep = level.steps[currentStep];
    const normalize = (str) => str.replace(/\s+/g, '').replace(/['"]/g, '');

    if (input === targetStep.cmd.toLowerCase()) {
      setTerminalHistory(prev => [...prev, `$ ${input}`, targetStep.response]);
      setInputValue('');
      setError(false);
      if (currentStep === level.steps.length - 1) setTimeout(onComplete, 1000);
      else setCurrentStep(prev => prev + 1);
    } else {
      setError(true);
      setTerminalHistory(prev => [...prev, `$ ${input}`, 'ERROR: ACCESS_DENIED']);
      setInputValue('');
      setTimeout(() => setError(false), 500);
    }
  };

  const handleFirewallChoice = (allowed) => {
    const isAgent = currentPacket.startsWith('192.168');
    if ((allowed && isAgent) || (!allowed && !isAgent)) {
      const newScore = score + 1;
      if (newScore >= (level.targetScore || 5)) onComplete();
      else { setScore(newScore); generatePacket(); }
    } else {
      setError(true);
      setTimeout(() => { setError(false); generatePacket(); }, 500);
    }
  };

  const handleLogicBypass = () => {
    const result = gateType === 'AND' ? (inputA && inputB) : (inputA || inputB);
    if (result) onComplete();
    else { setError(true); setTimeout(() => setError(false), 500); }
  };

  const hardwareBaseStyle = {
    border: `1px solid ${error ? '#ff0000' : '#00ff41'}`,
    background: 'rgba(0, 255, 65, 0.05)',
    color: '#00ff41',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '0.7rem',
    position: 'absolute',
    transition: 'all 0.2s',
  };

  return (
    <div style={{ 
      width: '100%', padding: '1.5rem 2rem', border: '2px solid #00ff41', 
      background: 'rgba(0, 10, 0, 0.95)', boxSizing: 'border-box',
      transform: error ? 'translateX(5px)' : 'none', transition: 'transform 0.1s ease-in-out',
      borderColor: error ? '#ff0000' : '#00ff41'
    }}>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', fontFamily: 'monospace' }}>
        <h2 style={{ fontSize: '0.8rem', color: '#00ff41', margin: 0 }}>&gt; {level.objective}</h2>
        <span style={{ fontSize: '0.7rem', color: '#00ff41', opacity: 0.6 }}>
          {level.taskType === "TERMINAL_SEQUENCE" && `STEP: ${currentStep + 1}/${level.steps.length}`}
          {level.taskType === "FIREWALL_FILTER" && `UPLINK: ${score}/${level.targetScore || 5}`}
          {level.taskType === "BOOLEAN_GATE" && `STATUS: AWAITING_LOGIC`}
        </span>
      </div>

      {level.taskType === "HARDWARE_IDENTIFY" && (
        <div style={{ width: '100%', height: '220px', background: '#050505', position: 'relative', border: '1px solid #1a1a1a' }}>
          <div onClick={() => (level.answer === "CPU" && onComplete()) || (setError(true), setTimeout(() => setError(false), 500))} style={{ ...hardwareBaseStyle, width: '70px', height: '70px', top: '40px', left: '40px' }}>[ CPU ]</div>
          <div onClick={() => (level.answer === "RAM" && onComplete()) || (setError(true), setTimeout(() => setError(false), 500))} style={{ ...hardwareBaseStyle, width: '20px', height: '100px', top: '20px', left: '140px' }}><span style={{ transform: 'rotate(-90deg)' }}>RAM_A</span></div>
          <div onClick={() => (level.answer === "GPU" && onComplete()) || (setError(true), setTimeout(() => setError(false), 500))} style={{ ...hardwareBaseStyle, width: '120px', height: '50px', bottom: '30px', right: '30px' }}>GPU_CORE</div>
          <div onClick={() => (level.answer === "SSD" && onComplete()) || (setError(true), setTimeout(() => setError(false), 500))} style={{ ...hardwareBaseStyle, width: '80px', height: '25px', top: '30px', right: '40px' }}>M.2_SSD</div>
        </div>
      )}

      {level.taskType === "TERMINAL_SEQUENCE" && (
        <div style={{ background: '#000', padding: '15px', height: '220px', overflowY: 'auto', border: '1px solid #1a1a1a' }}>
          <div style={{ marginBottom: '10px', fontFamily: 'monospace', fontSize: '0.85rem' }}>
            {terminalHistory.map((line, i) => <div key={i} style={{ color: line.startsWith('$') ? '#fff' : '#00ff41', marginBottom: '4px' }}>{line}</div>)}
          </div>
          <form onSubmit={handleTerminalSubmit} style={{ display: 'flex', gap: '8px' }}>
            <span style={{ color: '#00ff41', fontFamily: 'monospace' }}>$</span>
            <input autoFocus type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)} style={{ background: 'transparent', border: 'none', outline: 'none', color: '#00ff41', width: '100%', fontFamily: 'monospace', fontSize: '0.85rem', textTransform: 'uppercase' }} placeholder="..." />
          </form>
        </div>
      )}

      {level.taskType === "FIREWALL_FILTER" && (
        <div style={{ textAlign: 'center', padding: '1rem' }}>
          <div style={{ fontSize: '1.5rem', fontFamily: 'monospace', color: '#fff', padding: '1.5rem', border: '1px dashed #333', marginBottom: '1rem' }}>{currentPacket}</div>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <button onClick={() => handleFirewallChoice(true)} style={{ padding: '10px 25px', background: 'transparent', color: '#00ff41', border: '1px solid #00ff41', cursor: 'pointer', fontFamily: 'monospace' }}>[ ALLOW ]</button>
            <button onClick={() => handleFirewallChoice(false)} style={{ padding: '10px 25px', background: 'transparent', color: '#ff0000', border: '1px solid #ff0000', cursor: 'pointer', fontFamily: 'monospace' }}>[ DENY ]</button>
          </div>
        </div>
      )}

      {level.taskType === "BOOLEAN_GATE" && (
        <div style={{ textAlign: 'center', padding: '1rem' }}>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '30px', marginBottom: '20px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <button onClick={() => setInputA(!inputA)} style={{ padding: '8px', background: inputA ? '#00ff41' : '#222', color: inputA ? '#000' : '#00ff41', border: '1px solid #00ff41', cursor: 'pointer', fontSize: '0.7rem' }}>IN_A: {inputA ? 'ON' : 'OFF'}</button>
              <button onClick={() => setInputB(!inputB)} style={{ padding: '8px', background: inputB ? '#00ff41' : '#222', color: inputB ? '#000' : '#00ff41', border: '1px solid #00ff41', cursor: 'pointer', fontSize: '0.7rem' }}>IN_B: {inputB ? 'ON' : 'OFF'}</button>
            </div>
            <div onClick={() => setGateType(gateType === 'AND' ? 'OR' : 'AND')} style={{ width: '70px', height: '70px', border: '2px solid #00ff41', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontSize: '1rem', color: '#00ff41', fontWeight: 'bold', background: 'rgba(0,255,65,0.1)' }}>{gateType}</div>
            <div style={{ width: '25px', height: '25px', borderRadius: '50%', background: (gateType === 'AND' ? (inputA && inputB) : (inputA || inputB)) ? '#00ff41' : '#111', border: '1px solid #00ff41', boxShadow: (gateType === 'AND' ? (inputA && inputB) : (inputA || inputB)) ? '0 0 15px #00ff41' : 'none' }}></div>
          </div>
          <button onClick={handleLogicBypass} style={{ padding: '10px 30px', background: 'transparent', color: '#00ff41', border: '1px solid #00ff41', cursor: 'pointer', fontFamily: 'monospace' }}>[ INITIATE_BYPASS ]</button>
        </div>
      )}
    </div>
  );
}