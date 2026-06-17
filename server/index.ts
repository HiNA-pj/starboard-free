import express from 'express';
import cors from 'cors';
import path from 'path';

const app = express();
const PORT = process.env.PORT || 3001;

// 初期状態
interface StarboardState {
  title: string;
  win: number;
  lose: number;
  updatedAt: number; // ミリ秒のタイムスタンプ
}

let state: StarboardState = {
  title: '勝敗カウンター',
  win: 0,
  lose: 0,
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
  const { title, win, lose } = req.body;

  if (title !== undefined) {
    state.title = title;
  }
  if (win !== undefined) {
    state.win = Math.max(0, Math.round(win)); // 整数化＆0未満にならないように
  }
  if (lose !== undefined) {
    state.lose = Math.max(0, Math.round(lose)); // 整数化＆0未満にならないように
  }
  state.updatedAt = Date.now();
  res.json(state);
});

// スコアをリセットする
app.post('/api/reset', (req, res) => {
  state.win = 0;
  state.lose = 0;
  state.updatedAt = Date.now();
  res.json(state);
});

// Viteのビルド成果物を静的に配信 (本番環境向け)
// 開発環境ではVite dev serverがこれを担当します
app.use(express.static(path.join(__dirname, '..', 'dist')));

// その他のすべてのリクエストに対して index.html を返す (SPAルーティング)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log('API Endpoints:');
  console.log(`  GET  http://localhost:${PORT}/api/state`);
  console.log(`  POST http://localhost:${PORT}/api/state`);
  console.log(`  POST http://localhost:${PORT}/api/reset`);
  console.log('\nInitial State:', state);
});