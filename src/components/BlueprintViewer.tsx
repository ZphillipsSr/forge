// src/components/BlueprintViewer.tsx
import React from 'react';
import { Blueprint } from '../bridge/types';
import JsonViewer from './JsonViewer'; // Re-use JsonViewer for fallback

interface BlueprintViewerProps {
  blueprint: Blueprint;
}

const BlueprintViewer: React.FC<BlueprintViewerProps> = ({ blueprint }) => {
  // Basic rendering of known blueprint properties
  const renderKnownBlueprint = (bp: Blueprint) => (
    <div>
      {bp.profileName && <p><strong>Profile Name:</strong> {bp.profileName}</p>}
      {bp.domain && <p><strong>Domain:</strong> {bp.domain}</p>}
      {bp.tools && (
        <div>
          <strong>Tools:</strong>
          <JsonViewer data={bp.tools} />
        </div>
      )}
      {bp.layout && (
        <div>
          <strong>Layout:</strong>
          <JsonViewer data={bp.layout} />
        </div>
      )}
    </div>
  );

  // Check if it's a known blueprint shape or just a generic JSON
  const isKnownBlueprintShape =
    blueprint &&
    (blueprint.profileName || blueprint.domain || blueprint.tools || blueprint.layout);

  return (
    <div
      style={{
        border: '1px solid #ccc',
        padding: '1rem',
        borderRadius: '4px',
        backgroundColor: '#fdfdfd',
      }}
    >
      {isKnownBlueprintShape ? (
        renderKnownBlueprint(blueprint)
      ) : (
        <div>
          <p>
            <em>Unknown blueprint shape. Displaying as generic JSON.</em>
          </p>
          <JsonViewer data={blueprint} />
        </div>
      )}
    </div>
  );
};

export default BlueprintViewer;
