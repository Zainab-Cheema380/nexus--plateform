import { useState } from 'react';

export default function Security() {
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [is2FAEnabled, setIs2FAEnabled] = useState(false);
  const [showOTP, setShowOTP] = useState(false);

  const getPasswordStrength = (pass) => {
    let strength = 0;
    if (pass.length >= 8) strength++;
    if (pass.match(/[a-z]/) && pass.match(/[A-Z]/)) strength++;
    if (pass.match(/[0-9]/)) strength++;
    if (pass.match(/[^a-zA-Z0-9]/)) strength++;
    return strength;
  };

  const strength = getPasswordStrength(password);
  const strengthText = ['Very Weak', 'Weak', 'Fair', 'Good', 'Strong'][strength];
  const strengthColor = ['#ef4444', '#f97316', '#f59e0b', '#84cc16', '#22c55e'][strength];

  const handleEnable2FA = () => {
    setShowOTP(true);
  };

  const handleVerifyOTP = () => {
    if (otp === '123456') {
      setIs2FAEnabled(true);
      setShowOTP(false);
      alert('2FA Enabled Successfully!');
    } else {
      alert('Invalid OTP. Use 123456');
    }
    setOtp('');
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
      <h1 style={{ color: '#4f46e5' }}>🔐 Security Settings</h1>
      
      <div style={{ background: 'white', padding: '20px', borderRadius: '10px', marginTop: '20px' }}>
        <h3>Password Strength Meter</h3>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
          style={{ width: '100%', padding: '12px', marginTop: '10px', border: '1px solid #ccc', borderRadius: '5px' }}
        />
        
        {password && (
          <div style={{ marginTop: '15px' }}>
            <div style={{ height: '8px', background: '#e5e7eb', borderRadius: '4px', overflow: 'hidden' }}>
              <div style={{ width: `${(strength + 1) * 20}%`, height: '100%', background: strengthColor }}></div>
            </div>
            <p style={{ marginTop: '10px', color: strengthColor }}>Strength: {strengthText}</p>
          </div>
        )}
      </div>
      
      <div style={{ background: 'white', padding: '20px', borderRadius: '10px', marginTop: '20px' }}>
        <h3>Two-Factor Authentication (2FA)</h3>
        
        {!is2FAEnabled ? (
          <div>
            <p>Add an extra layer of security to your account</p>
            <button onClick={handleEnable2FA} style={{ background: '#4f46e5', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
              Enable 2FA
            </button>
          </div>
        ) : (
          <p style={{ color: '#22c55e' }}>✅ 2FA is enabled</p>
        )}
        
        {showOTP && (
          <div style={{ marginTop: '20px', padding: '15px', background: '#f9fafb', borderRadius: '5px' }}>
            <p>Enter OTP <strong>(Demo: 123456)</strong></p>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter 6-digit OTP"
              maxLength="6"
              style={{ width: '100%', padding: '10px', marginTop: '10px', border: '1px solid #ccc', borderRadius: '5px' }}
            />
            <button onClick={handleVerifyOTP} style={{ background: '#22c55e', color: 'white', padding: '10px', border: 'none', borderRadius: '5px', cursor: 'pointer', marginTop: '10px', width: '100%' }}>
              Verify OTP
            </button>
          </div>
        )}
      </div>
    </div>
  );
}