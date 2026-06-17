import React, { useState, useEffect } from 'react';
import { useStarboard } from './hooks/useStarboard';
import { ControlPanel } from './components/ControlPanel';
import { OBSOverlay } from './components/OBSOverlay';

export const App: React.FC = () => {
  const { title, win, lose, winRate, setTitle, setWin, setLose, resetScores } = useStarboard();
  
  // パス（URL）をステートで管理し、動的な変更に対応できるようにする
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    const handleLocationChange = () => {
      setCurrentPath(window.location.pathname);
    };

    // ブラウザの履歴ナビゲーション（戻る/進む）時のイベントを監視
    window.addEventListener('popstate', handleLocationChange);
    return () => {
      window.removeEventListener('popstate', handleLocationChange);
    };
  }, []);

  // /overlay パスであれば OBS表示用オーバーレイを描画
  if (currentPath === '/overlay') {
    return (
      <div className="w-full h-full bg-transparent overflow-hidden">
        <OBSOverlay
          title={title}
          win={win}
          lose={lose}
          winRate={winRate}
        />
      </div>
    );
  }

  // それ以外（デフォルト）は操作画面を描画
  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex items-center justify-center">
      <ControlPanel
        title={title}
        win={win}
        lose={lose}
        winRate={winRate}
        setTitle={setTitle}
        setWin={setWin}
        setLose={setLose}
        resetScores={resetScores}
      />
    </div>
  );
};
