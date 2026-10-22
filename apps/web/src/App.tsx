import React from 'react';
import { products } from './data/services';
import { team } from './data/team';
import { timeline } from './data/timeline';
import { processItems } from './data/process';

export const App: React.FC = () => {
  return (
    <div
      style={{
        padding: '40px',
        fontFamily: 'sans-serif',
        maxWidth: '640px',
        margin: '0 auto',
      }}
    >
      <img
        src="/brand/halfwave-logo.png"
        alt="Halfwave Platforms Logo"
        style={{
          width: '64px',
          height: '64px',
          objectFit: 'contain',
          marginBottom: '16px',
        }}
      />
      <h1>Halfwave rebuild: Step 1 scaffold OK</h1>
      <ul>
        <li>Services loaded: {products.length}</li>
        <li>Team members loaded: {team.length}</li>
        <li>Timeline entries loaded: {timeline.length}</li>
        <li>Process steps loaded: {processItems.length}</li>
      </ul>
    </div>
  );
};

export default App;
