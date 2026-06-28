import express from 'express';
import cors from 'cors';
import path from 'path';

const distPath = path.join(process.cwd(), '..', 'dist');
const app = express();
const PORT = process.env.PORT || 3001;

type Layout = 'standard' | 'compact';
type ColorPreset = 'default' | 'blue' | 'red' | 'mono' | 'sky' | 'pink';

interface Settings {
layout: Layout;
colorPreset: ColorPreset;
}

const DEFAULT_SETTINGS: Settings = {
layout: 'standard',
colorPreset: 'default',
};

function parseSettings(raw: unknown): Settings {
const result: Settings = {
layout: DEFAULT_SETTINGS.layout,
colorPreset: DEFAULT_SETTINGS.colorPreset,
};

if (!raw || typeof raw !== 'object') {
return result;
}

const obj = raw as Record<string, unknown>;

switch (obj.layout) {
case 'standard':
case 'compact':
result.layout = obj.layout;
break;
default:
break;
}

switch (obj.colorPreset) {
case 'default':
case 'blue':
case 'red':
case 'mono':
case 'sky':
case 'pink':
result.colorPreset = obj.colorPreset;
break;
default:
break;
}

return result;
}

// 初期状態
interface StarboardState {
title: string;
win: number;
lose: number;
currentStreak: number;
settings: Settings;
updatedAt: number; // ミリ秒のタイムスタンプ
}

let state: StarboardState = {
title: '勝敗カウンター',
win: 0,
lose: 0,
currentStreak: 0,
settings: DEFAULT_SETTINGS,
updatedAt: Date.now(),
};

// ミドルウェア
app.use(cors());
app.use(express.json()); // JSONボディをパースするため

// `/api/state` エンドポイント
// 現在の状態を返す
app.get('/api/state', (req, res) => {
res.json(state);
});

// 状態を更新する
app.post('/api/state', (req, res) => {
const { title, win, lose, currentStreak, settings } = req.body;

if (title !== undefined) {
state.title = title;
}

if (win !== undefined) {
state.win = Math.max(0, Math.round(win)); // 整数化＆0未満にならないように
}

if (lose !== undefined) {
state.lose = Math.max(0, Math.round(lose)); // 整数化＆0未満にならないように
}

if (currentStreak !== undefined && typeof currentStreak === 'number' && Number.isFinite(currentStreak)) {
state.currentStreak = Math.round(currentStreak);
}

if (settings !== undefined) {
state.settings = parseSettings(settings);
}

state.updatedAt = Date.now();
res.json(state);
});

// スコアをリセットする
app.post('/api/reset', (req, res) => {
state.win = 0;
state.lose = 0;
state.currentStreak = 0;

// titleは維持、settingsも維持（欠落していればフォールバック）
if (!state.settings || typeof state.settings !== 'object') {
state.settings = DEFAULT_SETTINGS;
}

state.updatedAt = Date.now();
res.json(state);
});

// Viteのビルド成果物を静的に配信 (本番環境向け)
// 開発環境ではVite dev serverがこれを担当します
app.use(express.static(path.join(distPath, '..', 'dist')));

// その他のすべてのリクエストに対して index.html を返す (SPAルーティング)
app.get('*', (req, res) => {
res.sendFile(path.join(distPath, '..', 'dist', 'index.html'));
});

app.listen(PORT, () => {
console.log(`Server running on http://localhost:${PORT}`);
console.log('API Endpoints:');
console.log(`  GET  http://localhost:${PORT}/api/state`);
console.log(`  POST http://localhost:${PORT}/api/state`);
console.log(`  POST http://localhost:${PORT}/api/reset`);
console.log('\nInitial State:', state);
});