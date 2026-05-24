import { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

export default function CalendarView() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [slots, setSlots] = useState([]);
  const [startTime, setStartTime] = useState('09:00');
  const [endTime, setEndTime] = useState('17:00');
  const [showForm, setShowForm] = useState(false);

  // Load saved slots
  useEffect(() => {
  const loadSlots = () => {
    const saved = localStorage.getItem('meetingSlots');
    if (saved) {
      setSlots(JSON.parse(saved));
    }
  };
  loadSlots();
}, []);

  // Add new slot
  const addSlot = () => {
    const newSlot = {
      id: Date.now(),
      date: selectedDate,
      start: startTime,
      end: endTime
    };
    const updated = [...slots, newSlot];
    setSlots(updated);
    localStorage.setItem('meetingSlots', JSON.stringify(updated));
    setShowForm(false);
    alert('Slot added!');
  };

  // Delete slot
  const deleteSlot = (id) => {
    const updated = slots.filter(slot => slot.id !== id);
    setSlots(updated);
    localStorage.setItem('meetingSlots', JSON.stringify(updated));
  };

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        
        {/* Calendar Section */}
        <div style={{ background: 'white', padding: '20px', borderRadius: '10px' }}>
          <h2>Select Date</h2>
          <Calendar onChange={setSelectedDate} value={selectedDate} />
          
          <button 
            onClick={() => setShowForm(!showForm)}
            style={{
              background: '#4f46e5',
              color: 'white',
              padding: '10px 20px',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              marginTop: '20px'
            }}
          >
            + Add Slot
          </button>
          
          {showForm && (
            <div style={{ marginTop: '20px' }}>
              <input 
                type="time" 
                value={startTime} 
                onChange={(e) => setStartTime(e.target.value)}
                style={{ padding: '8px', marginRight: '10px' }}
              />
              <input 
                type="time" 
                value={endTime} 
                onChange={(e) => setEndTime(e.target.value)}
                style={{ padding: '8px' }}
              />
              <button 
                onClick={addSlot}
                style={{
                  background: '#22c55e',
                  color: 'white',
                  padding: '8px 15px',
                  marginLeft: '10px',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer'
                }}
              >
                Save
              </button>
            </div>
          )}
        </div>
        
        {/* Slots List Section */}
        <div style={{ background: 'white', padding: '20px', borderRadius: '10px' }}>
          <h2>Available Slots</h2>
          {slots.length === 0 ? (
            <p>No slots available. Add your first slot!</p>
          ) : (
            slots.map(slot => (
              <div key={slot.id} style={{
                padding: '10px',
                borderBottom: '1px solid #ddd',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <div>
                  <strong>{new Date(slot.date).toDateString()}</strong>
                  <br />
                  {slot.start} - {slot.end}
                </div>
                <button 
                  onClick={() => deleteSlot(slot.id)}
                  style={{
                    background: '#ef4444',
                    color: 'white',
                    border: 'none',
                    padding: '5px 12px',
                    borderRadius: '5px',
                    cursor: 'pointer'
                  }}
                >
                  Delete
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}