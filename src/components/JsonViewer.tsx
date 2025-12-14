// src/components/JsonViewer.tsx
import React from 'react';

interface JsonViewerProps {
  data: object;
}

const JsonViewer: React.FC<JsonViewerProps> = ({ data }) => {
  return (
    <pre
      style={{
        backgroundColor: '#f8f8f8',
        padding: '1rem',
        borderRadius: '4px',
        maxHeight: '400px',
        overflow: 'auto',
        whiteSpace: 'pre-wrap',
        wordBreak: 'break-all',
      }}
    >
      <code>{JSON.stringify(data, null, 2)}</code>
    </pre>
  );
};

export default JsonViewer;
