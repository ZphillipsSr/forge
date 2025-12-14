// src/pages/PackageDetails.tsx
import { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { getPackageManifest } from '../bridge/client';
import { PackageManifest, Blueprint } from '../bridge/types';
import { computeSha256 } from '../bridge/hash';
import JsonViewer from '../components/JsonViewer';
import BlueprintViewer from '../components/BlueprintViewer';
import { Link } from 'react-router-dom';

function PackageDetails() {
  const { packageId } = useParams<{ packageId: string }>();
  const [searchParams] = useSearchParams();
  const bridgeBaseUrl = searchParams.get('baseUrl') || import.meta.env.VITE_BRIDGE_BASE_URL || '';

  const [rawManifestText, setRawManifestText] = useState<string | null>(null);
  const [parsedManifest, setParsedManifest] = useState<PackageManifest | null>(null);
  const [computedHash, setComputedHash] = useState<string | null>(null);
  const [integrityStatus, setIntegrityStatus] = useState<string | null>(null); // PENDING, PASS, FAIL
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchManifestAndHash = async () => {
      setLoading(true);
      setError(null);
      setIntegrityStatus(null);
      if (!packageId) {
        setError('No package ID provided.');
        setLoading(false);
        return;
      }
      if (!bridgeBaseUrl) {
        setError('Bridge Base URL is not set. Cannot fetch manifest.');
        setLoading(false);
        return;
      }

      try {
        // Dummy manifestUrl for now, in a real scenario, this would come from the package summary.
        // For demonstration, let's assume a pattern or pass it via state/query param if needed.
        // For now, let's assume the manifestUrl can be constructed from packageId, or we will need
        // to retrieve the full PackageSummary again.
        // For the sake of moving forward, let's assume a direct manifest fetch route or derive URL.
        // IMPORTANT: In a real app, `manifestUrl` should ideally be passed from `Packages` page.
        // For this exercise, let's assume a direct path like `/packages/{packageId}/manifest`
        const manifestUrl = `/packages/${packageId}/manifest`;

        const { rawText, parsedManifest: fetchedParsedManifest } = await getPackageManifest(
          bridgeBaseUrl,
          manifestUrl,
        );

        setRawManifestText(rawText);
        setParsedManifest(fetchedParsedManifest);

        if (rawText) {
          const hash = await computeSha256(rawText);
          setComputedHash(hash);

          if (fetchedParsedManifest?.integrity?.manifestHash) {
            if (hash === fetchedParsedManifest.integrity.manifestHash) {
              setIntegrityStatus('PASS');
            } else {
              setIntegrityStatus('FAIL');
            }
          } else {
            setIntegrityStatus('N/A (No manifestHash in integrity)');
          }
        }
      } catch (err: any) {
        setError(`Failed to load package details: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchManifestAndHash();
  }, [packageId, bridgeBaseUrl]);

  if (loading) {
    return <div className="container">Loading package details...</div>;
  }

  if (error) {
    return (
      <div className="container">
        <p className="error">{error}</p>
        <Link to="/packages">Back to Packages</Link>
      </div>
    );
  }

  return (
    <div className="container">
      <h1>Package Details: {packageId}</h1>
      <Link to="/packages">Back to Packages</Link>

      {rawManifestText ? (
        <>
          <div style={{ marginTop: '1rem' }}>
            <h3>SHA256 Hash:</h3>
            <p>Computed: {computedHash}</p>
            {parsedManifest?.integrity?.manifestHash && <p>Expected: {parsedManifest.integrity.manifestHash}</p>}
            {integrityStatus && (
              <p>
                Integrity Check:{' '}
                <span className={integrityStatus === 'PASS' ? 'success' : 'error'}>{integrityStatus}</span>
              </p>
            )}
          </div>

          <h3>Raw Manifest:</h3>
          <pre style={{ backgroundColor: '#f0f0f0', padding: '1rem', borderRadius: '4px', overflowX: 'auto' }}>
            {rawManifestText}
          </pre>

          {parsedManifest && (
            <>
              <h3>Parsed Manifest:</h3>
              <JsonViewer data={parsedManifest} />

              <h3>Blueprint Viewer:</h3>
              {parsedManifest.blueprint ? (
                <BlueprintViewer blueprint={parsedManifest.blueprint as Blueprint} />
              ) : (
                <p>No blueprint found in manifest.</p>
              )}
            </>
          )}
        </>
      ) : (
        <p>No manifest data available.</p>
      )}
    </div>
  );
}

export default PackageDetails;
