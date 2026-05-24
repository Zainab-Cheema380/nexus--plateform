import { useState } from 'react';
import CalendarView from './components/CalendarView';

function App() {
  const [tab, setTab] = useState('calendar');

  return (
    <div>
      {/* Tabs */}
      <div style={{ display: 'flex', gap: '10px', padding: '20px', background: '#4f46e5' }}>
        <button 
          onClick={() => setTab('calendar')} 
          style={{ 
            padding: '10px 20px', 
            background: tab === 'calendar' ? 'white' : '#6366f1', 
            color: tab === 'calendar' ? '#4f46e5' : 'white', 
            border: 'none', 
            borderRadius: '5px', 
            cursor: 'pointer' 
          }}
        >
          📅 Calendar
        </button>
        <button 
          onClick={() => setTab('documents')} 
          style={{ 
            padding: '10px 20px', 
            background: tab === 'documents' ? 'white' : '#6366f1', 
            color: tab === 'documents' ? '#4f46e5' : 'white', 
            border: 'none', 
            borderRadius: '5px', 
            cursor: 'pointer' 
          }}
        >
          📄 Documents
        </button>
        <button 
          onClick={() => setTab('video')} 
          style={{ 
            padding: '10px 20px', 
            background: tab === 'video' ? 'white' : '#6366f1', 
            color: tab === 'video' ? '#4f46e5' : 'white', 
            border: 'none', 
            borderRadius: '5px', 
            cursor: 'pointer' 
          }}
        >
          🎥 Video Call
        </button>
      </div>

      {/* Content */}
      {tab === 'calendar' && <CalendarView />}
      
      {tab === 'documents' && (
        <div style={{ padding: '20px', textAlign: 'center' }}>
          <h1>📄 Documents Page</h1>
          <div style={{ background: 'white', padding: '30px', borderRadius: '10px', maxWidth: '500px', margin: '20px auto' }}>
            <h3>Investment Agreement</h3>
            <p>I agree to invest $10,000 in Nexus Platform.</p>
            <button onClick={() => alert('Document Signed!')} style={{ background: '#4f46e5', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
              ✍️ Sign Document
            </button>
          </div>
        </div>
      )}
      
      {tab === 'video' && (
        <div style={{ padding: '20px', textAlign: 'center' }}>
          <h1>🎥 Video Call Page</h1>
          <button onClick={() => alert('Call Started!')} style={{ background: '#22c55e', color: 'white', padding: '15px 30px', border: 'none', borderRadius: '10px', cursor: 'pointer' }}>
            📞 Start Call
          </button>
        </div>
      )}
    </div>
  );
}

export default App;