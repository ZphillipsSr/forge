// src/pages/Home.tsx
import { useState } from 'react';
import { getBridgeStatus } from '../bridge/client';

function Home() {
  const [bridgeBaseUrl, setBridgeBaseUrl] = useState(import.meta.env.VITE_BRIDGE_BASE_URL || '');
  const [status, setStatus] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCheckStatus = async () => {
    setError(null);
    setStatus(null);
    if (!bridgeBaseUrl) {
      setError('Please enter a Bridge Base URL.');
      return;
    }
    try {
      const bridgeStatus = await getBridgeStatus(bridgeBaseUrl);
      setStatus(JSON.stringify(bridgeStatus, null, 2));
    } catch (err: any) {
      setError(`Failed to fetch bridge status: ${err.message}`);
    }
  };

  return (
    <div className="container">
      <h1>Forge</h1>
      <h2>Home</h2>
      <p>Connects to an existing Producer via the Distro Bridge API.</p>

      <div style={{ marginBottom: '1rem' }}>
        <label htmlFor="baseUrlInput">Bridge Base URL:</label>
        <input
          id="baseUrlInput"
          type="text"
          value={bridgeBaseUrl}
          onChange={(e) => setBridgeBaseUrl(e.target.value)}
          placeholder="e.g., http://localhost:4000"
          style={{ width: '300px', marginRight: '0.5rem' }}
        />
        <button onClick={handleCheckStatus}>Check Status</button>
      </div>

      {status && (
        <div>
          <h3>Bridge Status:</h3>
          <pre style={{ backgroundColor: '#f0f0f0', padding: '1rem', borderRadius: '4px' }}>{status}</pre>
        </div>
      )}

      {error && <p className="error">{error}</p>}
    </div>
  );
}

export default Home;
