import React from 'react';

type Layout = 'standard' | 'compact';
type ColorPreset = 'default' | 'blue' | 'red' | 'mono';

interface Settings {
  layout: Layout;
  colorPreset: ColorPreset;
}

interface OBSOverlayProps {
  title: string;
  win: number;
  lose: number;
  winRate: string;
  settings: Settings;
}

// ------------------------------------------------
// Standard用 Preset Style (800x200)
// ------------------------------------------------
const STANDARD_PRESETS = {
  default: {
    backgroundClass: 'bg-slate-950/90',
    border: 'border-slate-800/80',
    winLabel: 'text-emerald-400',
    winNumber: 'text-white',
    winNumberShadow: 'drop-shadow-[0_2px_8px_rgba(16,185,129,0.3)]',
    loseLabel: 'text-rose-400',
    loseNumber: 'text-white',
    loseNumberShadow: 'drop-shadow-[0_2px_8px_rgba(244,63,94,0.3)]',
    divider: 'bg-slate-800/80',
    winRateValue: 'text-indigo-400',
    winRateLabel: 'text-slate-400',
    vs: 'text-slate-600',
    title: 'text-slate-100',
  },
  blue: {
    backgroundClass: 'bg-blue-950/90',
    border: 'border-cyan-800/80',
    winLabel: 'text-cyan-400',
    winNumber: 'text-white',
    winNumberShadow: 'drop-shadow-[0_2px_8px_rgba(34,211,238,0.3)]',
    loseLabel: 'text-blue-400',
    loseNumber: 'text-white',
    loseNumberShadow: 'drop-shadow-[0_2px_8px_rgba(96,165,250,0.3)]',
    divider: 'bg-slate-800/80',
    winRateValue: 'text-cyan-400',
    winRateLabel: 'text-slate-400',
    vs: 'text-slate-600',
    title: 'text-slate-100',
  },
  red: {
    backgroundClass: 'bg-[#5a0f1a]/95',
    border: 'border-red-500/70',
    winLabel: 'text-amber-300',
    winNumber: 'text-white',
    winNumberShadow: 'drop-shadow-[0_2px_10px_rgba(251,191,36,0.45)]',
    loseLabel: 'text-red-200',
    loseNumber: 'text-white',
    loseNumberShadow: 'drop-shadow-[0_2px_10px_rgba(248,113,113,0.5)]',
    divider: 'bg-slate-800/80',
    winRateValue: 'text-amber-300',
    winRateLabel: 'text-slate-400',
    vs: 'text-slate-600',
    title: 'text-slate-100',
  },
  mono: {
    backgroundClass: 'bg-zinc-950/90',
    border: 'border-slate-700/80',
    winLabel: 'text-slate-300',
    winNumber: 'text-white',
    winNumberShadow: 'drop-shadow-[0_2px_8px_rgba(148,163,184,0.3)]',
    loseLabel: 'text-slate-400',
    loseNumber: 'text-white',
    loseNumberShadow: 'drop-shadow-[0_2px_8px_rgba(148,163,184,0.3)]',
    divider: 'bg-slate-800/80',
    winRateValue: 'text-slate-300',
    winRateLabel: 'text-slate-400',
    vs: 'text-slate-600',
    title: 'text-slate-100',
  },
} as const;

// ------------------------------------------------
// Compact用 Preset Style (480x120)
// ------------------------------------------------
const COMPACT_PRESETS = {
  default: {
    backgroundClass: 'bg-slate-950/90',
    border: 'border-slate-800/80',
    winLabel: 'text-emerald-400',
    winNumber: 'text-white',
    winNumberShadow: 'drop-shadow-[0_1px_4px_rgba(16,185,129,0.3)]',
    loseLabel: 'text-rose-400',
    loseNumber: 'text-white',
    loseNumberShadow: 'drop-shadow-[0_1px_4px_rgba(244,63,94,0.3)]',
    divider: 'bg-slate-800/80',
    winRateValue: 'text-indigo-400',
    winRateLabel: 'text-slate-500',
    vs: 'text-slate-600',
    title: 'text-slate-100',
  },
  blue: {
    backgroundClass: 'bg-blue-950/90',
    border: 'border-cyan-800/80',
    winLabel: 'text-cyan-400',
    winNumber: 'text-white',
    winNumberShadow: 'drop-shadow-[0_1px_4px_rgba(34,211,238,0.3)]',
    loseLabel: 'text-blue-400',
    loseNumber: 'text-white',
    loseNumberShadow: 'drop-shadow-[0_1px_4px_rgba(96,165,250,0.3)]',
    divider: 'bg-slate-800/80',
    winRateValue: 'text-cyan-400',
    winRateLabel: 'text-slate-500',
    vs: 'text-slate-600',
    title: 'text-slate-100',
  },
  red: {
    backgroundClass: 'bg-[#5a0f1a]/95',
    border: 'border-red-500/70',
    winLabel: 'text-amber-300',
    winNumber: 'text-white',
    winNumberShadow: 'drop-shadow-[0_1px_6px_rgba(251,191,36,0.45)]',
    loseLabel: 'text-red-200',
    loseNumber: 'text-white',
    loseNumberShadow: 'drop-shadow-[0_1px_6px_rgba(248,113,113,0.5)]',
    divider: 'bg-slate-800/80',
    winRateValue: 'text-amber-300',
    winRateLabel: 'text-slate-500',
    vs: 'text-slate-600',
    title: 'text-slate-100',
  },
  mono: {
    backgroundClass: 'bg-zinc-950/90',
    border: 'border-slate-700/80',
    winLabel: 'text-slate-300',
    winNumber: 'text-white',
    winNumberShadow: 'drop-shadow-[0_1px_4px_rgba(148,163,184,0.3)]',
    loseLabel: 'text-slate-400',
    loseNumber: 'text-white',
    loseNumberShadow: 'drop-shadow-[0_1px_4px_rgba(148,163,184,0.3)]',
    divider: 'bg-slate-800/80',
    winRateValue: 'text-slate-300',
    winRateLabel: 'text-slate-500',
    vs: 'text-slate-600',
    title: 'text-slate-100',
  },
} as const;

function getPreset(colorPreset: ColorPreset, isCompact: boolean) {
  return isCompact ? COMPACT_PRESETS[colorPreset] : STANDARD_PRESETS[colorPreset];
}

export const OBSOverlay: React.FC<OBSOverlayProps> = ({
  title,
  win,
  lose,
  winRate,
  settings,
}) => {
  const isCompact = settings.layout === 'compact';
  const theme = getPreset(settings.colorPreset, isCompact);

  if (isCompact) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-transparent p-2 select-none">
        <div className={`${theme.backgroundClass} ${theme.border} rounded-xl px-4 py-2 flex items-center gap-3 shadow-[0_0_20px_rgba(0,0,0,0.8)] backdrop-blur-md w-[calc(480px-16px)] h-[calc(120px-16px)]`}>
          {/* 左: タイトルと勝率 */}
          <div className="flex-1 min-w-0">
            <h2 className={`text-sm font-bold ${theme.title} truncate tracking-wide drop-shadow-sm`}>
              {title || '勝敗カウンター'}
            </h2>
            <div className="flex items-center gap-2 mt-0.5">
              <span className={`text-[10px] font-semibold ${theme.winRateLabel} tracking-wider`}>WIN RATE</span>
              <span className={`text-base font-black ${theme.winRateValue} font-mono tracking-tighter`}>
                {winRate}
              </span>
            </div>
          </div>

          {/* 仕切り線 */}
          <div className={`w-px h-6 ${theme.divider}`} />

          {/* 右: スコア */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="text-center">
              <div className={`text-[10px] font-bold ${theme.winLabel} tracking-wider`}>WIN</div>
              <div className={`text-2xl font-black ${theme.winNumber} font-mono min-w-[1.5rem] text-center ${theme.winNumberShadow}`}>
                {win}
              </div>
            </div>
            <div className={`text-lg font-bold ${theme.vs} font-mono`}>-</div>
            <div className="text-center">
              <div className={`text-[10px] font-bold ${theme.loseLabel} tracking-wider`}>LOSE</div>
              <div className={`text-2xl font-black ${theme.loseNumber} font-mono min-w-[1.5rem] text-center ${theme.loseNumberShadow}`}>
                {lose}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Standard: レイアウト維持、色だけ preset で切り替え
  return (
    <div className="w-full h-full flex items-center justify-center bg-transparent p-4 select-none">
      <div className={`${theme.backgroundClass} ${theme.border} rounded-2xl px-8 py-6 flex items-center gap-8 shadow-[0_0_30px_rgba(0,0,0,0.8)] backdrop-blur-md w-[calc(800px-32px)] h-[calc(200px-32px)]`}>
        {/* タイトルと勝率 */}
        <div className="flex-1 min-w-0">
          <h2 className={`text-2xl font-bold ${theme.title} truncate tracking-wide drop-shadow-sm mb-1`}>
            {title || '勝敗カウンター'}
          </h2>
          <div className="flex items-center gap-3">
            <span className={`text-sm font-semibold ${theme.winRateLabel} tracking-wider`}>WIN RATE</span>
            <span className={`text-3xl font-black ${theme.winRateValue} font-mono tracking-tighter`}>
              {winRate}
            </span>
          </div>
        </div>

        {/* 仕切り線 */}
        <div className={`w-0.5 h-10 ${theme.divider}`} />

        {/* スコア表示部分 */}
        <div className="flex items-center gap-6 shrink-0">
          {/* WINスコア */}
          <div className="text-center">
            <div className={`text-xs font-bold ${theme.winLabel} tracking-wider mb-0.5`}>WIN</div>
            <div className={`text-4xl font-black ${theme.winNumber} font-mono min-w-[3rem] text-center ${theme.winNumberShadow}`}>
              {win}
            </div>
          </div>

          {/* ハイフン/VS */}
          <div className={`text-2xl font-bold ${theme.vs} font-mono`}>-</div>

          {/* LOSEスコア */}
          <div className="text-center">
            <div className={`text-xs font-bold ${theme.loseLabel} tracking-wider mb-0.5`}>LOSE</div>
            <div className={`text-4xl font-black ${theme.loseNumber} font-mono min-w-[3rem] text-center ${theme.loseNumberShadow}`}>
              {lose}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};