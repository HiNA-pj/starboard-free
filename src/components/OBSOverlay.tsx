import React from 'react';

type Layout = 'standard' | 'compact';

interface Settings {
  layout: Layout;
}

interface OBSOverlayProps {
  title: string;
  win: number;
  lose: number;
  winRate: string;
  settings: Settings;
}

export const OBSOverlay: React.FC<OBSOverlayProps> = ({
  title,
  win,
  lose,
  winRate,
  settings,
}) => {
  const isCompact = settings.layout === 'compact';

  if (isCompact) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-transparent p-2 select-none">
        <div className="bg-slate-950/90 border border-slate-800/80 rounded-xl px-4 py-2 flex items-center gap-3 shadow-[0_0_20px_rgba(0,0,0,0.8)] backdrop-blur-md w-[calc(480px-16px)] h-[calc(120px-16px)]">
          {/* 左: タイトルと勝率 */}
          <div className="flex-1 min-w-0">
            <h2 className="text-sm font-bold text-slate-100 truncate tracking-wide drop-shadow-sm">
              {title || '勝敗カウンター'}
            </h2>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="text-[10px] font-semibold text-slate-500 tracking-wider">WIN RATE</span>
              <span className="text-base font-black text-indigo-400 font-mono tracking-tighter">
                {winRate}
              </span>
            </div>
          </div>

          {/* 仕切り線 */}
          <div className="w-px h-6 bg-slate-800/80" />

          {/* 右: スコア */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="text-center">
              <div className="text-[10px] font-bold text-emerald-400 tracking-wider">WIN</div>
              <div className="text-2xl font-black text-white font-mono min-w-[1.5rem] text-center drop-shadow-[0_1px_4px_rgba(16,185,129,0.3)]">
                {win}
              </div>
            </div>
            <div className="text-lg font-bold text-slate-600 font-mono">-</div>
            <div className="text-center">
              <div className="text-[10px] font-bold text-rose-400 tracking-wider">LOSE</div>
              <div className="text-2xl font-black text-white font-mono min-w-[1.5rem] text-center drop-shadow-[0_1px_4px_rgba(244,63,94,0.3)]">
                {lose}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Standard: 既存の見た目を完全維持
  return (
    <div className="w-full h-full flex items-center justify-center bg-transparent p-4 select-none">
      <div className="bg-slate-950/90 border-2 border-slate-800/80 rounded-2xl px-8 py-6 flex items-center gap-8 shadow-[0_0_30px_rgba(0,0,0,0.8)] backdrop-blur-md w-[calc(800px-32px)] h-[calc(200px-32px)]">
        {/* タイトルと勝率 */}
        <div className="flex-1 min-w-0">
          <h2 className="text-2xl font-bold text-slate-100 truncate tracking-wide drop-shadow-sm mb-1">
            {title || '勝敗カウンター'}
          </h2>
          <div className="flex items-center gap-3">
            <span className="text-sm font-semibold text-slate-400 tracking-wider">WIN RATE</span>
            <span className="text-3xl font-black text-indigo-400 font-mono tracking-tighter">
              {winRate}
            </span>
          </div>
        </div>

        {/* 仕切り線 */}
        <div className="w-0.5 h-10 bg-slate-800/80" />

        {/* スコア表示部分 */}
        <div className="flex items-center gap-6 shrink-0">
          {/* WINスコア */}
          <div className="text-center">
            <div className="text-xs font-bold text-emerald-400 tracking-wider mb-0.5">WIN</div>
          <div className="text-4xl font-black text-white font-mono min-w-[3rem] text-center drop-shadow-[0_2px_8px_rgba(16,185,129,0.3)]">
              {win}
            </div>
          </div>

          {/* ハイフン/VS */}
          <div className="text-2xl font-bold text-slate-600 font-mono">-</div>

          {/* LOSEスコア */}
          <div className="text-center">
            <div className="text-xs font-bold text-rose-400 tracking-wider mb-0.5">LOSE</div>
            <div className="text-4xl font-black text-white font-mono min-w-[3rem] text-center drop-shadow-[0_2px_8px_rgba(244,63,94,0.3)]">
              {lose}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};