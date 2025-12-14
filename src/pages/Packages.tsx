// src/pages/Packages.tsx
import { useState, useEffect } from 'react';
import { listPackages } from '../bridge/client';
import { PackageSummary } from '../bridge/types';
import { Link } from 'react-router-dom';

function Packages() {
  const [packages, setPackages] = useState<PackageSummary[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [bridgeBaseUrl, setBridgeBaseUrl] = useState(import.meta.env.VITE_BRIDGE_BASE_URL || '');

  useEffect(() => {
    // Initial check for base URL
    if (!bridgeBaseUrl) {
      setError('Bridge Base URL is not set. Please go back to Home and set it, or define VITE_BRIDGE_BASE_URL.');
    }
  }, [bridgeBaseUrl]);

  const handleLoadPackages = async () => {
    setError(null);
    setLoading(true);
    setPackages([]);

    if (!bridgeBaseUrl) {
      setError('Bridge Base URL is not set. Cannot load packages.');
      setLoading(false);
      return;
    }

    try {
      const fetchedPackages = await listPackages(bridgeBaseUrl, true);
      setPackages(fetchedPackages);
    } catch (err: any) {
      setError(`Failed to load packages: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1>Packages</h1>
      <Link to="/">Back to Home</Link>
      <div style={{ marginBlock: '1rem' }}>
        <input
          type="text"
          value={bridgeBaseUrl}
          onChange={(e) => setBridgeBaseUrl(e.target.value)}
          placeholder="Bridge Base URL (e.g., http://localhost:3000)"
          style={{ width: '400px', marginRight: '0.5rem' }}
          disabled // Should be set from Home or env, not directly editable here for consistency
        />
        <button onClick={handleLoadPackages} disabled={loading || !bridgeBaseUrl}>
          {loading ? 'Loading...' : 'Load Latest Packages'}
        </button>
      </div>

      {error && <p className="error">{error}</p>}

      {packages.length > 0 && (
        <div className="package-list">
          <h3>Available Packages:</h3>
          <ul>
            {packages.map((pkg) => (
              <li key={pkg.packageId}>
                <span>
                  <strong>{pkg.profileId}</strong> (ID: {pkg.packageId}) - Created:{' '}
                  {new Date(pkg.createdAt).toLocaleString()}
                </span>
                <Link to={`/packages/${pkg.packageId}?baseUrl=${encodeURIComponent(bridgeBaseUrl)}`}>
                  View Details
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
      {packages.length === 0 && !loading && !error && bridgeBaseUrl && (
        <p>No packages found or loaded. Click "Load Latest Packages".</p>
      )}
    </div>
  );
}

export default Packages;
