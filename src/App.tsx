import React from 'react';
import { useStarboard } from './hooks/useStarboard';
import { ControlPanel } from './components/ControlPanel';
import { OBSOverlay } from './components/OBSOverlay';

const App: React.FC = () => {
  const { title, win, lose, winRate, serverConnected, setTitle, setWin, setLose, resetScores } = useStarboard();

  const path = window.location.pathname;

  // OBS overlay 画面
  if (path === '/overlay') {
    return (
      <div className="w-screen h-screen">
        <OBSOverlay
          title={title}
          win={win}
          lose={lose}
          winRate={winRate}
        />
      </div>
    );
  }

  // 操作画面
  return (
    <div className="min-h-screen bg-slate-950 text-white flex items-start justify-center">
      <ControlPanel
        title={title}
        win={win}
        lose={lose}
        winRate={winRate}
        serverConnected={serverConnected}
        setTitle={setTitle}
        setWin={setWin}
        setLose={setLose}
        resetScores={resetScores}
      />
    </div>
  );
};

export default App;