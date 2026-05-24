import { useState, useRef } from 'react';

export default function VideoCall() {
  const [isCallActive, setIsCallActive] = useState(false);
  const [videoEnabled, setVideoEnabled] = useState(true);
  const [audioEnabled, setAudioEnabled] = useState(true);
  const videoRef = useRef(null);

  const startCall = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setIsCallActive(true);
    } catch {
      alert('Camera or Microphone access denied! Please allow permissions.');
    }
  };

  const endCall = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject;
      const tracks = stream.getTracks();
      tracks.forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
    setIsCallActive(false);
    setVideoEnabled(true);
    setAudioEnabled(true);
  };

  const toggleVideo = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const videoTrack = videoRef.current.srcObject.getVideoTracks()[0];
      if (videoTrack) {
        videoTrack.enabled = !videoEnabled;
        setVideoEnabled(!videoEnabled);
      }
    }
  };

  const toggleAudio = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const audioTrack = videoRef.current.srcObject.getAudioTracks()[0];
      if (audioTrack) {
        audioTrack.enabled = !audioEnabled;
        setAudioEnabled(!audioEnabled);
      }
    }
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px', textAlign: 'center' }}>
      <h1 style={{ color: '#4f46e5' }}>🎥 Video Call</h1>
      
      {!isCallActive ? (
        <button
          onClick={startCall}
          style={{
            background: '#22c55e',
            color: 'white',
            padding: '15px 40px',
            border: 'none',
            borderRadius: '10px',
            cursor: 'pointer',
            fontSize: '18px',
            marginTop: '50px'
          }}
        >
          📞 Start Call
        </button>
      ) : (
        <div>
          <div style={{
            background: '#1e1e2f',
            borderRadius: '10px',
            padding: '20px',
            marginTop: '20px'
          }}>
            <video
              ref={videoRef}
              autoPlay
              muted
              style={{
                width: '100%',
                maxWidth: '600px',
                borderRadius: '10px',
                background: '#000'
              }}
            />
          </div>
          
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginTop: '20px' }}>
            <button
              onClick={toggleVideo}
              style={{
                background: videoEnabled ? '#4f46e5' : '#ef4444',
                color: 'white',
                padding: '10px 20px',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer'
              }}
            >
              {videoEnabled ? '📷 Turn Off Video' : '📷 Turn On Video'}
            </button>
            
            <button
              onClick={toggleAudio}
              style={{
                background: audioEnabled ? '#4f46e5' : '#ef4444',
                color: 'white',
                padding: '10px 20px',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer'
              }}
            >
              {audioEnabled ? '🎤 Mute' : '🔇 Unmute'}
            </button>
            
            <button
              onClick={endCall}
              style={{
                background: '#ef4444',
                color: 'white',
                padding: '10px 20px',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer'
              }}
            >
              ❌ End Call
            </button>
          </div>
        </div>
      )}
    </div>
  );
}