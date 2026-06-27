import React, { useState } from "react";
import {
  Plus,
  Minus,
  RotateCcw,
  Copy,
  Check,
  Trophy,
  Monitor,
  Wifi,
  WifiOff,
  PanelTop,
  Palette,
  History,
} from "lucide-react";

type Layout = "standard" | "compact";
type ColorPreset = "default" | "blue" | "red" | "mono" | "sky" | "pink";

interface Settings {
  layout: Layout;
  colorPreset: ColorPreset;
}

interface ControlPanelProps {
  title: string;
  win: number;
  lose: number;
  winRate: string;
  currentStreak: number;
  serverConnected: boolean;
  settings: Settings;
  canUndo: boolean;
  setTitle: (t: string) => void;
  setWin: (updater: number | ((prev: number) => number)) => void;
  setLose: (updater: number | ((prev: number) => number)) => void;
  resetScores: () => void;
  setLayout: (layout: Layout) => void;
  setColorPreset: (colorPreset: ColorPreset) => void;
  undo: () => void;
}

const COLOR_PRESETS: { key: ColorPreset; label: string }[] = [
  { key: "default", label: "Default" },
  { key: "blue", label: "Blue" },
  { key: "red", label: "Red" },
  { key: "mono", label: "Mono" },
  { key: "sky", label: "Sky" },
  { key: "pink", label: "Pink" },
];

function getStreakText(currentStreak: number): string | null {
  if (currentStreak > 0) return `${currentStreak}連勝中`;
  if (currentStreak < 0) return `${Math.abs(currentStreak)}連敗中`;
  return null;
}

export const ControlPanel: React.FC<ControlPanelProps> = ({
  title,
  win,
  lose,
  winRate,
  currentStreak,
  serverConnected,
  settings,
  canUndo,
  setTitle,
  setWin,
  setLose,
  resetScores,
  setLayout,
  setColorPreset,
  undo,
}) => {
  const [copied, setCopied] = useState(false);
  const [resultCopied, setResultCopied] = useState(false);
  const streakText = getStreakText(currentStreak);

  const handleCopyUrl = async () => {
    try {
      const overlayUrl = `${window.location.origin}/overlay`;
      await navigator.clipboard.writeText(overlayUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("URLのコピーに失敗しました: ", err);
    }
  };

  const handleCopyResult = async () => {
    try {
      const isDefaultTitle = !title || title.trim() === "" || title.trim() === "勝敗カウンター";
      const titleLine = isDefaultTitle ? "今日の対戦結果：" : `今日の対戦結果：${title.trim()}`;
      const resultText = `${titleLine}\n${win}勝${lose}敗 / 勝率${winRate}`;
      await navigator.clipboard.writeText(resultText);
      setResultCopied(true);
      setTimeout(() => setResultCopied(false), 2000);
    } catch (err) {
      console.error("結果のコピーに失敗しました: ", err);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {" "}
      <div className="bg-slate-800 border border-slate-700 rounded-2xl shadow-xl overflow-hidden">
        {/* ヘッダー */}{" "}
        <div className="px-6 py-4 bg-gradient-to-r from-indigo-600 to-violet-600 border-b border-slate-700">
          {" "}
          <div className="flex items-center justify-between gap-4">
            {" "}
            <h1 className="text-xl font-bold tracking-wider flex items-center gap-2">
              {" "}
              <Trophy className="w-5 h-5 text-amber-300" />{" "}
              <span>
                Starboard Free{" "}
                <span className="text-xs bg-indigo-800 text-indigo-200 px-1.5 py-0.5 rounded ml-1 font-mono">
                  v0.7.1{" "}
                </span>{" "}
              </span>{" "}
            </h1>
            {/* サーバー接続ステータス */}
            <div
              className={`shrink-0 flex items-center gap-1.5 text-xs font-semibold px-2 py-1 rounded-full ${
                serverConnected
                  ? "bg-emerald-500/15 text-emerald-400"
                  : "bg-amber-500/15 text-amber-400"
              }`}
              title={
                serverConnected
                  ? "APIサーバーと通信中"
                  : "サーバー未接続・ローカル動作中"
              }
            >
              {serverConnected ? (
                <>
                  <Wifi className="w-3 h-3" />
                  <span>サーバー同期中</span>
                </>
              ) : (
                <>
                  <WifiOff className="w-3 h-3" />
                  <span>ローカル動作中</span>
                </>
              )}
            </div>
          </div>
        </div>
        {/* コンテンツ */}
        <div className="p-6 grid grid-cols-1 lg:grid-cols-[1.4fr_0.9fr] gap-6">
          {/* Live Control */}
          <section className="space-y-6">
            <div className="flex items-center gap-2">
              <Trophy className="w-4 h-4 text-amber-300" />
              <h2 className="text-sm font-bold text-slate-200 tracking-wide">
                Live Control
              </h2>
            </div>

            {/* タイトル設定 */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-slate-400 tracking-wide">
                タイトル設定
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-lg text-white font-medium placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                placeholder="配信タイトルやコーナー名"
              />
            </div>

            {/* カウンター表示エリア */}
            <div className="grid grid-cols-2 gap-4">
              {/* WIN カウンター */}
              <div className="p-4 bg-slate-900 border border-emerald-500/20 rounded-xl flex flex-col items-center justify-between space-y-4">
                <span className="text-emerald-400 font-bold tracking-wide">
                  WIN
                </span>
                <div className="text-5xl font-extrabold text-white font-mono">
                  {win}
                </div>
                <div className="flex gap-2 w-full">
                  <button
                    onClick={() => setWin((prev) => prev - 1)}
                    disabled={win <= 0}
                    className="flex-1 py-2 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 disabled:hover:bg-slate-800 text-slate-300 rounded-lg flex justify-center items-center transition"
                    title="WINを1減らす"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setWin((prev) => prev + 1)}
                    className="flex-1 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg flex justify-center items-center transition shadow-lg shadow-emerald-600/20"
                    title="WINを1増やす"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* LOSE カウンター */}
              <div className="p-4 bg-slate-900 border border-rose-500/20 rounded-xl flex flex-col items-center justify-between space-y-4">
                <span className="text-rose-400 font-bold tracking-wide">
                  LOSE
                </span>
                <div className="text-5xl font-extrabold text-white font-mono">
                  {lose}
                </div>
                <div className="flex gap-2 w-full">
                  <button
                    onClick={() => setLose((prev) => prev - 1)}
                    disabled={lose <= 0}
                    className="flex-1 py-2 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 disabled:hover:bg-slate-800 text-slate-300 rounded-lg flex justify-center items-center transition"
                    title="LOSEを1減らす"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setLose((prev) => prev + 1)}
                    className="flex-1 py-2 bg-rose-600 hover:bg-rose-500 text-white rounded-lg flex justify-center items-center transition shadow-lg shadow-rose-600/20"
                    title="LOSEを1増やす"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* 勝率表示 */}
            <div className="p-4 bg-slate-900/50 border border-slate-700/50 rounded-xl flex items-center justify-between">
              <span className="text-sm font-semibold text-slate-400 tracking-wide">
                勝率
              </span>
              <div className="flex items-center gap-3">
                {streakText && (
                  <span className="text-xs text-slate-500 tracking-wider">
                    {streakText}
                  </span>
                )}
                <span className="text-2xl font-extrabold text-indigo-400 font-mono">
                  {winRate}
                </span>
              </div>
            </div>

            {/* Copy Result ボタン */}
            <button
              onClick={handleCopyResult}
              className={`w-full py-2.5 px-4 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl flex items-center justify-center gap-2 transition shadow-lg shadow-indigo-600/20`}
            >
              {resultCopied ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>コピーしました</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>結果をコピー</span>
                </>
              )}
            </button>

            {/* 操作ボタン群 */}
            <div className="flex flex-col gap-3 pt-2">
              {/* Undoボタン */}
              <button
                onClick={undo}
                disabled={!canUndo}
                className={`w-full py-2.5 px-4 bg-slate-800 ${
                  canUndo ? "hover:bg-slate-700" : "opacity-40"
                } border border-slate-700 text-slate-300 font-semibold rounded-xl flex items-center justify-center gap-2 transition`}
              >
                <History className="w-4 h-4" />
                <span>1つ戻す</span>
              </button>

              {/* リセットボタン */}
              <button
                onClick={() => {
                  if (
                    window.confirm(
                      "勝敗カウントをゼロに戻しますか？ タイトル・表示モード・カラープリセットはそのまま残ります。",
                    )
                  ) {
                    resetScores();
                  }
                }}
                className="w-full py-2.5 px-4 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 font-semibold rounded-xl flex items-center justify-center gap-2 transition"
              >
                <RotateCcw className="w-4 h-4" />
                <span>スコアをリセット</span>
              </button>
            </div>
          </section>

          {/* Setup */}
          <section className="bg-slate-900/40 border border-slate-700/60 rounded-xl p-4 space-y-4">
            <div className="flex items-center gap-2">
              <Monitor className="w-4 h-4 text-indigo-400" />
              <h2 className="text-sm font-semibold text-slate-300">Setup</h2>
            </div>

            <div className="space-y-2.5">
              {/* URL表示とコピーボタン */}
              <div className="space-y-2">
                <span className="text-xs font-semibold text-slate-400">
                  OBS URL
                </span>
                <div className="flex items-center gap-2">
                  <code className="flex-1 min-w-0 text-xs text-slate-400 bg-slate-900/80 px-2.5 py-1.5 rounded border border-slate-700/50 truncate font-mono select-all">
                    {window.location.origin}/overlay
                  </code>
                  <button
                    onClick={handleCopyUrl}
                    className={`shrink-0 px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition duration-200 ${
                      copied
                        ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30"
                        : "bg-indigo-600 hover:bg-indigo-500 text-white border border-indigo-600"
                    }`}
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>コピーしました</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>URLをコピー</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* 推奨サイズ表示 */}
              <div className="text-xs text-slate-500 flex items-center gap-4">
                <span>
                  推奨サイズ:{" "}
                  <span className="text-slate-400 font-mono">
                    幅 {settings.layout === "compact" ? "480" : "800"}
                  </span>{" "}
                  /{" "}
                  <span className="text-slate-400 font-mono">
                    高さ {settings.layout === "compact" ? "120" : "200"}
                  </span>
                </span>
              </div>

              {/* 表示モード切り替え */}
              <div className="pt-3 border-t border-slate-700/40">
                <div className="flex items-center gap-2 mb-2">
                  <PanelTop className="w-3.5 h-3.5 text-indigo-400" />
                  <span className="text-xs font-semibold text-slate-400">
                    表示モード
                  </span>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setLayout("standard")}
                    className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-semibold transition ${
                      settings.layout === "standard"
                        ? "bg-indigo-600 text-white shadow-sm shadow-indigo-600/30"
                        : "bg-slate-800 text-slate-400 hover:text-slate-300 border border-slate-700/50"
                    }`}
                  >
                    Standard
                  </button>
                  <button
                    onClick={() => setLayout("compact")}
                    className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-semibold transition ${
                      settings.layout === "compact"
                        ? "bg-indigo-600 text-white shadow-sm shadow-indigo-600/30"
                        : "bg-slate-800 text-slate-400 hover:text-slate-300 border border-slate-700/50"
                    }`}
                  >
                    Compact
                  </button>
                </div>
              </div>

              {/* カラープリセット切り替え */}
              <div className="pt-3 border-t border-slate-700/40">
                <div className="flex items-center gap-2 mb-2">
                  <Palette className="w-3.5 h-3.5 text-indigo-400" />
                  <span className="text-xs font-semibold text-slate-400">
                    カラープリセット
                  </span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {COLOR_PRESETS.map((preset) => (
                    <button
                      key={preset.key}
                      onClick={() => setColorPreset(preset.key)}
                      className={`py-1.5 px-2 rounded-lg text-xs font-semibold transition ${
                        settings.colorPreset === preset.key
                          ? "bg-indigo-600 text-white shadow-sm shadow-indigo-600/30"
                          : "bg-slate-800 text-slate-400 hover:text-slate-300 border border-slate-700/50"
                      }`}
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* 説明文 */}
              <p className="text-xs text-slate-500 leading-relaxed pt-1">
                OBSのブラウザソースに設定してください。
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
