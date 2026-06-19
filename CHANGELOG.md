# Changelog

## v0.3.0 (2026-06-18)

操作画面のユーザビリティ改善版。

### 追加

- **OBS設定パネル**: 操作画面下部にOBS設定パネルを追加。URL表示・URLコピーボタン・推奨サイズ表示を一体化。
- **URLコピー機能**: `navigator.clipboard.writeText` で OBS 用 URL をワンクリックコピー。成功時に「コピーしました」と表示、失敗時もアプリは壊れない。
- **サーバー接続ステータス**: ヘッダー右側に接続状態を表示。
  - サーバー接続時：「サーバー同期中」（緑色、`Wifi` アイコン）
  - サーバー未接続時：「ローカル動作中」（黄色、`WifiOff` アイコン）
  - overlay画面には表示しない。

### 修正

- **既存のカウント処理・API同期処理は維持**: `useRef` / `updatedAt` / ガード期間 / 関数型更新は一切変更なし。
- **`src/main.tsx` のインポート修正**: `import { App }` → `import App`（デフォルトエクスポートに統一）。

### 変更したファイル

- `src/components/ControlPanel.tsx` — OBS設定パネル追加、`serverConnected` props 追加
- `src/hooks/useStarboard.ts` — `serverConnected` state を追加、戻り値に追加
- `src/App.tsx` — `serverConnected` prop を ControlPanel に渡す
- `src/main.tsx` — インポート形式を修正

---

## v0.2.1 (2026-06-17)

同期競合バグの修正版。

### 修正

- **カウントが勝手に戻る問題を修正**: `useRef` による最新値追跡を導入。`queueMicrotask(() => postState())` でクロージャの古い値が送信される問題を解消。
- **ポーリングによる上書きガード**: ローカル変更直後 1 秒間は polling 結果を無視。さらにサーバー側 `updatedAt` とローカル `updatedAt` を比較し、古い状態で新しい状態が上書きされることを防止。
- **WIN / LOSE の関数型更新**: `setWin((prev) => prev + 1)` 形式に統一し、競合のない安全なカウントを実現。
- **`resetScores` のサーバー同期**: リセット時も `POST /api/reset` 経由でサーバー状態が正しく更新されるよう修正。

### 追加

- **`npm run dev:all` で 1 コマンド起動**: `concurrently` を使って API サーバーと Vite を同時起動。開発時の手間を削減。
- **README.md を作成**: 配信者が迷わず使えるよう、起動方法・OBS設定手順を日本語で整理。

### 変更したファイル

- `src/hooks/useStarboard.ts` — ref 追跡・updatedAt 比較・ガード期間を追加
- `server/index.ts` — `updatedAt` プロパティを追加
- `package.json` — `start:server` / `dev:all` スクリプトを追加
- `README.md` — 新規作成

---

## v0.2.0 (2026-06-17)

OBS 同期対応版。

### 追加

- **ローカル API サーバーを新設**（Express / TypeScript）
  - `GET /api/state` — 現在の状態を取得
  - `POST /api/state` — 状態を更新（`title`, `win`, `lose`）
  - `POST /api/reset` — スコアをリセット
- **Vite プロキシ設定**: Vite 開発サーバーの `/api` を API サーバー（`localhost:3001`）に転送。
- **フロント側の API 同期**:
  - 初回マウント時にサーバーから状態を取得して反映
  - 操作のたびに `POST /api/state` でサーバーへ送信（200ms デバウンス付き）
  - 3 秒間隔の polling で他タブ・OBS からの変更を検知
  - サーバー未起動時もローカル動作を継続

### 変更したファイル

- `server/` — 新規ディレクトリ（`package.json`, `index.ts`）
- `vite.config.ts` — プロキシ設定を追加
- `package.json` — `concurrently` を依存関係に追加
- `src/hooks/useStarboard.ts` — API 同期ロジックを追加

---

## v0.1.0 (2026-06-15)

OBS 表示改善版。

### 追加

- **OBS overlay 画面の分離**: 操作画面（`/`）と OBS 表示画面（`/overlay`）を別ルートに分離。
- **背景透過対応**: OBS ブラウザソースに適した透過スタイルを適用。
- **OBS 推奨サイズ調整**: 幅 800 / 高さ 200 で見やすく調整。
- **レイアウト調整**: OBS overlay は `bg-transparent` + `backdrop-blur-md` で透過感を演出。

### 変更したファイル

- `src/App.tsx` — ルーティングを追加（`/` と `/overlay`）
- `src/components/OBSOverlay.tsx` — 新規作成
- `src/components/ControlPanel.tsx` — OBS overlay URL コピーボタンを追加

---

## v0.0.0 (2026-06-14)

初期版。最初のリリース。

### 追加

- **WIN / LOSE カウント**: ボタン一つでカウントを増減可能。0 未満にはならない安全設計。
- **勝率表示**: WIN / (WIN + LOSE) を自動計算しパーセント表示。
- **タイトル変更**: 任意のタイトルを入力可能。
- **リセット機能**: 確認ダイアログ付きでスコアを一括リセット。
- **localStorage 保存**: ブラウザを閉じてもカウントを保持。
- **Chrome タブ間同期**: `storage` イベントを監視し、同一ブラウザの別タブと自動同期。
- **UI フレームワーク**: Tailwind CSS + lucide-react で構築。
- **TypeScript**: フル TypeScript 対応。
- **Vite**: 高速な開発サーバーとビルド。