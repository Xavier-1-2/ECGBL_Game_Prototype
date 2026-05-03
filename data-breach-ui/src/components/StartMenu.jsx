export default function StartMenu({ onStart }) {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center', 
      alignItems: 'center',     
      height: '100vh',
      width: '100vw',
      backgroundColor: 'black',
      padding: '40px',
      position: 'relative',
      overflow: 'hidden'
    }} className="animate-fadeIn">
      
     
      <div style={{ position: 'absolute', top: '40px', left: '40px', fontSize: '12px', opacity: 0.3 }}>
        SYSTEM_ID: B-774<br />KERNEL: CL-64.2
      </div>
      <div style={{ position: 'absolute', top: '40px', right: '40px', fontSize: '12px', opacity: 0.3, textAlign: 'right' }}>
        Uptime: 00:04:12:09<br />LOC: [17.9714° N, 76.7936° W]
      </div>

    
      <div style={{
        width: '90%',
        maxWidth: '1200px',
        border: '3px solid #00ff41',
        padding: '80px 40px',
        backgroundColor: 'rgba(0, 255, 65, 0.02)',
        boxShadow: '0 0 50px rgba(0, 255, 65, 0.1)',
        textAlign: 'center',
        position: 'relative'
      }}>
        
        <div style={{ position: 'absolute', top: '-2px', left: '-2px', width: '20px', height: '20px', borderTop: '4px solid #00ff41', borderLeft: '4px solid #00ff41' }}></div>
        <div style={{ position: 'absolute', bottom: '-2px', right: '-2px', width: '20px', height: '20px', borderBottom: '4px solid #00ff41', borderRight: '4px solid #00ff41' }}></div>

        <h1 style={{ 
          fontSize: '6rem', 
          margin: '0 0 20px 0', 
          letterSpacing: '0.4em', 
          fontWeight: '900',
          color: '#00ff41'
        }}>
          PROJECT: BREACH
        </h1>
        
        <p style={{ 
          marginBottom: '60px', 
          opacity: 0.6, 
          letterSpacing: '0.8em', 
          fontSize: '14px', 
          textTransform: 'uppercase' 
        }}>
          Educational Infiltration Protocol // Ver 1.0.4
        </p>
        
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '40px' }}>
          <button 
            onClick={onStart}
            style={{ 
              fontSize: '2.5rem', 
              padding: '30px 80px', 
              border: '3px solid #00ff41', 
              background: 'transparent',
              color: '#00ff41',
              cursor: 'pointer',
              fontWeight: 'bold',
              transition: '0.3s'
            }}
            onMouseOver={(e) => {
              e.target.style.backgroundColor = '#00ff41';
              e.target.style.color = 'black';
            }}
            onMouseOut={(e) => {
              e.target.style.backgroundColor = 'transparent';
              e.target.style.color = '#00ff41';
            }}
          >
            [ INITIALIZE MISSION ]
          </button>
          
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(3, 1fr)', 
            width: '100%', 
            marginTop: '40px', 
            paddingTop: '30px', 
            borderTop: '1px solid rgba(0, 255, 65, 0.2)',
            fontSize: '12px',
            opacity: 0.4,
            letterSpacing: '2px'
          }}>
            <div style={{ textAlign: 'left' }}>&gt; CONNECTION: SECURE</div>
            <div style={{ textAlign: 'center' }}>&gt; ENCRYPTION: AES-256</div>
            <div style={{ textAlign: 'right' }}>&gt; STATUS: DEPLOY_READY</div>
          </div>
        </div>
      </div>

      
      <div style={{ 
        position: 'absolute', 
        bottom: '40px', 
        width: '100%', 
        padding: '0 40px', 
        display: 'flex', 
        justifyContent: 'space-between', 
        fontSize: '10px', 
        opacity: 0.2, 
        letterSpacing: '4px' 
      }}>
        <span>AUTHORISED_PERSONNEL_ONLY</span>
        <span>© 2026 MINISTRY_OF_DATA</span>
      </div>
    </div>
  );
}