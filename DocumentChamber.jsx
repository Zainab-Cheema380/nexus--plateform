import { useState } from 'react';

export default function DocumentChamber() {
  const [signed, setSigned] = useState(false);
  const [status, setStatus] = useState('Pending');

  const handleSign = () => {
    setSigned(true);
    setStatus('Signed');
    alert('✓ Document Signed Successfully!');
  };

  return (
    <div style={{
      maxWidth: '800px',
      margin: '0 auto',
      padding: '30px',
      fontFamily: 'Arial, sans-serif'
    }}>
      {/* Header */}
      <h1 style={{
        color: '#4f46e5',
        fontSize: '32px',
        textAlign: 'center',
        marginBottom: '30px'
      }}>
        📄 Document Chamber
      </h1>

      {/* Document Card */}
      <div style={{
        background: 'white',
        borderRadius: '16px',
        padding: '30px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
        border: '1px solid #e5e7eb'
      }}>
        {/* Document Title */}
        <h2 style={{
          fontSize: '24px',
          color: '#1f2937',
          borderBottom: '2px solid #4f46e5',
          paddingBottom: '10px',
          marginBottom: '20px'
        }}>
          📜 Investment Agreement
        </h2>

        {/* Document Content */}
        <div style={{
          background: '#f9fafb',
          padding: '20px',
          borderRadius: '12px',
          marginBottom: '20px'
        }}>
          <p style={{ lineHeight: '1.8', color: '#374151' }}>
            <strong>Parties:</strong> Investor (John Doe) & Entrepreneur (Jane Smith)
            <br /><br />
            <strong>Investment Amount:</strong> $50,000 USD
            <br /><br />
            <strong>Equity:</strong> 25% of the company
            <br /><br />
            <strong>Term:</strong> 24 months
            <br /><br />
            <strong>Terms:</strong> The investor agrees to provide funding for the development of Nexus Platform. 
            The entrepreneur agrees to provide quarterly reports and allocate board seat to investor.
            <br /><br />
            This agreement is legally binding and governed by the laws of the State of Delaware.
          </p>
        </div>

        {/* Signature Section */}
        <div style={{
          marginTop: '30px',
          padding: '20px',
          background: '#f3f4f6',
          borderRadius: '12px'
        }}>
          <h3 style={{ marginBottom: '15px' }}>✍️ Signature Panel</h3>
          
          {/* Status Badge */}
          <div style={{
            display: 'inline-block',
            padding: '6px 16px',
            borderRadius: '20px',
            background: status === 'Signed' ? '#dcfce7' : '#fef08a',
            color: status === 'Signed' ? '#166534' : '#854d0e',
            fontWeight: 'bold',
            marginBottom: '20px'
          }}>
            {status === 'Signed' ? '✅ SIGNED' : '⏳ PENDING'}
          </div>

          {/* Sign Button */}
          {!signed ? (
            <div>
              <p style={{ color: '#6b7280', marginBottom: '15px' }}>
                By clicking "Sign Document", you agree to the terms and conditions.
              </p>
              <button
                onClick={handleSign}
                style={{
                  background: '#4f46e5',
                  color: 'white',
                  padding: '12px 32px',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  transition: 'all 0.3s'
                }}
                onMouseEnter={(e) => e.target.style.background = '#4338ca'}
                onMouseLeave={(e) => e.target.style.background = '#4f46e5'}
              >
                ✍️ SIGN DOCUMENT
              </button>
            </div>
          ) : (
            <div style={{
              background: '#dcfce7',
              padding: '20px',
              borderRadius: '8px',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '48px', marginBottom: '10px' }}>✅</div>
              <h3 style={{ color: '#166534' }}>Document Signed Successfully!</h3>
              <p style={{ color: '#166534', marginTop: '10px' }}>
                Signed on: {new Date().toLocaleString()}
              </p>
              <p style={{ color: '#166534', marginTop: '5px' }}>
                IP Address: Secured • Digital Signature Verified
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div style={{
          marginTop: '30px',
          paddingTop: '20px',
          borderTop: '1px solid #e5e7eb',
          fontSize: '12px',
          color: '#9ca3af',
          textAlign: 'center'
        }}>
          This is a legally binding electronic signature. 
          All rights reserved. Nexus Platform © 2025
        </div>
      </div>
    </div>
  );
}
