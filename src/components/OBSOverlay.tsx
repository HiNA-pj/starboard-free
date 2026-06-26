import React from 'react';

type Layout = 'standard' | 'compact';
type ColorPreset = 'default' | 'blue' | 'red' | 'mono' | 'sky' | 'pink';

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
    backgroundClass: 'bg-[#b91c1c]/95',
    border: 'border-red-200/50',
    winLabel: 'text-red-50',
    winNumber: 'text-white',
    winNumberShadow: 'drop-shadow-[0_2px_8px_rgba(0,0,0,0.55)]',
    loseLabel: 'text-red-100/80',
    loseNumber: 'text-white',
    loseNumberShadow: 'drop-shadow-[0_1px_4px_rgba(0,0,0,0.60)]',
    divider: 'bg-red-100/25',
    winRateValue: 'text-orange-100',
    winRateLabel: 'text-red-100/75',
    vs: 'text-red-100/50',
    title: 'text-white',
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
  sky: {
    backgroundClass: 'bg-[#2f9ec8]/90',
    border: 'border-cyan-50/35',
    winLabel: 'text-cyan-950',
    winNumber: 'text-white',
    winNumberShadow: 'drop-shadow-[0_2px_7px_rgba(0,0,0,0.45)]',
    loseLabel: 'text-sky-950/75',
    loseNumber: 'text-white',
    loseNumberShadow: 'drop-shadow-[0_1px_4px_rgba(0,0,0,0.50)]',
    divider: 'bg-cyan-950/20',
    winRateValue: 'text-yellow-100',
    winRateLabel: 'text-sky-950/65',
    vs: 'text-cyan-950/45',
    title: 'text-white',
  },
  pink: {
    backgroundClass: 'bg-[#c05299]/90',
    border: 'border-pink-100/40',
    winLabel: 'text-pink-50',
    winNumber: 'text-white',
    winNumberShadow: 'drop-shadow-[0_2px_8px_rgba(0,0,0,0.45)]',
    loseLabel: 'text-pink-100/80',
    loseNumber: 'text-white',
    loseNumberShadow: 'drop-shadow-[0_1px_4px_rgba(0,0,0,0.50)]',
    divider: 'bg-pink-50/25',
    winRateValue: 'text-pink-100',
    winRateLabel: 'text-pink-50/75',
    vs: 'text-pink-50/50',
    title: 'text-white',
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
    backgroundClass: 'bg-[#b91c1c]/95',
    border: 'border-red-200/50',
    winLabel: 'text-red-50',
    winNumber: 'text-white',
    winNumberShadow: 'drop-shadow-[0_1px_5px_rgba(0,0,0,0.55)]',
    loseLabel: 'text-red-100/80',
    loseNumber: 'text-white',
    loseNumberShadow: 'drop-shadow-[0_1px_5px_rgba(0,0,0,0.60)]',
    divider: 'bg-red-100/25',
    winRateValue: 'text-orange-100',
    winRateLabel: 'text-red-100/75',
    vs: 'text-red-100/50',
    title: 'text-white',
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
  sky: {
    backgroundClass: 'bg-[#2f9ec8]/90',
    border: 'border-cyan-50/35',
    winLabel: 'text-cyan-950',
    winNumber: 'text-white',
    winNumberShadow: 'drop-shadow-[0_1px_5px_rgba(0,0,0,0.45)]',
    loseLabel: 'text-sky-950/75',
    loseNumber: 'text-white',
    loseNumberShadow: 'drop-shadow-[0_1px_5px_rgba(0,0,0,0.50)]',
    divider: 'bg-cyan-950/20',
    winRateValue: 'text-yellow-100',
    winRateLabel: 'text-sky-950/65',
    vs: 'text-cyan-950/45',
    title: 'text-white',
  },
  pink: {
    backgroundClass: 'bg-[#c05299]/90',
    border: 'border-pink-100/40',
    winLabel: 'text-pink-50',
    winNumber: 'text-white',
    winNumberShadow: 'drop-shadow-[0_1px_5px_rgba(0,0,0,0.45)]',
    loseLabel: 'text-pink-100/80',
    loseNumber: 'text-white',
    loseNumberShadow: 'drop-shadow-[0_1px_5px_rgba(0,0,0,0.50)]',
    divider: 'bg-pink-50/25',
    winRateValue: 'text-pink-100',
    winRateLabel: 'text-pink-50/75',
    vs: 'text-pink-50/50',
    title: 'text-white',
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