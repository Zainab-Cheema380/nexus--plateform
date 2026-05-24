import { useState, useEffect } from 'react';

export default function Payment() {
  const [balance, setBalance] = useState(5000);
  const [amount, setAmount] = useState('');
  const [transactions, setTransactions] = useState([]);

 useEffect(() => {
  const loadData = () => {
    const savedBalance = localStorage.getItem('walletBalance');
    const savedTransactions = localStorage.getItem('transactions');
    if (savedBalance) {
      setBalance(JSON.parse(savedBalance));
    }
    if (savedTransactions) {
      setTransactions(JSON.parse(savedTransactions));
    }
  };
  loadData();
}, []);
  const addTransaction = (type, amount, status) => {
    const newTransaction = {
      id: Date.now(),
      type,
      amount,
      status,
      date: new Date().toLocaleString()
    };
    const updated = [newTransaction, ...transactions];
    setTransactions(updated);
    localStorage.setItem('transactions', JSON.stringify(updated));
  };

  const handleDeposit = () => {
    const amt = Number(amount);
    if (!amt || amt <= 0) {
      alert('Enter valid amount');
      return;
    }
    const newBalance = balance + amt;
    setBalance(newBalance);
    localStorage.setItem('walletBalance', JSON.stringify(newBalance));
    addTransaction('Deposit', amt, 'Completed');
    setAmount('');
    alert(`$${amt} deposited successfully!`);
  };

  const handleWithdraw = () => {
    const amt = Number(amount);
    if (!amt || amt <= 0) {
      alert('Enter valid amount');
      return;
    }
    if (amt > balance) {
      alert('Insufficient balance!');
      return;
    }
    const newBalance = balance - amt;
    setBalance(newBalance);
    localStorage.setItem('walletBalance', JSON.stringify(newBalance));
    addTransaction('Withdraw', amt, 'Completed');
    setAmount('');
    alert(`$${amt} withdrawn successfully!`);
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <h1 style={{ color: '#4f46e5' }}>💳 Payment Wallet</h1>
      
      <div style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        padding: '30px',
        borderRadius: '15px',
        color: 'white',
        textAlign: 'center',
        marginTop: '20px'
      }}>
        <h2>Wallet Balance</h2>
        <h1 style={{ fontSize: '48px', margin: '10px 0' }}>${balance}</h1>
        <p>Available Balance</p>
      </div>
      
      <div style={{
        background: 'white',
        padding: '20px',
        borderRadius: '10px',
        marginTop: '20px'
      }}>
        <h3>Transaction Amount</h3>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter amount"
          style={{
            width: '100%',
            padding: '12px',
            marginTop: '10px',
            border: '1px solid #ccc',
            borderRadius: '5px',
            fontSize: '16px'
          }}
        />
        
        <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
          <button onClick={handleDeposit} style={{ background: '#22c55e', color: 'white', padding: '12px', border: 'none', borderRadius: '5px', flex: 1, cursor: 'pointer' }}>
            💰 Deposit
          </button>
          <button onClick={handleWithdraw} style={{ background: '#ef4444', color: 'white', padding: '12px', border: 'none', borderRadius: '5px', flex: 1, cursor: 'pointer' }}>
            💸 Withdraw
          </button>
        </div>
      </div>
      
      <div style={{
        background: 'white',
        padding: '20px',
        borderRadius: '10px',
        marginTop: '20px'
      }}>
        <h3>📜 Transaction History</h3>
        {transactions.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#666', padding: '20px' }}>No transactions yet</p>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #ddd', textAlign: 'left' }}>
                <th style={{ padding: '10px' }}>Type</th>
                <th style={{ padding: '10px' }}>Amount</th>
                <th style={{ padding: '10px' }}>Status</th>
                <th style={{ padding: '10px' }}>Date</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((tx) => (
                <tr key={tx.id} style={{ borderBottom: '1px solid #eee' }}>
                  <td style={{ padding: '10px' }}>{tx.type}</td>
                  <td style={{ padding: '10px' }}>${tx.amount}</td>
                  <td style={{ padding: '10px' }}>
                    <span style={{
                      padding: '3px 10px',
                      borderRadius: '12px',
                      fontSize: '12px',
                      background: tx.status === 'Completed' ? '#dcfce7' : '#fef08a',
                      color: tx.status === 'Completed' ? '#166534' : '#854d0e'
                    }}>
                      {tx.status}
                    </span>
                  </td>
                  <td style={{ padding: '10px', fontSize: '12px' }}>{tx.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}