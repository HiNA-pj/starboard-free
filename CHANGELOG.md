# Changelog

## v0.6.3 (2026-06-26)

Release Readiness / Onboarding UX — 初回ユーザー向け導線改善。

### 追加

- **ZIP解凍の説明**: README冒頭にZIPファイルを解凍してから使うよう追記。
- **黒い画面を閉じない説明**: 起動中はターミナル画面を閉じずにそのままにするよう追記。
- **OBSなしでも確認可能なことを明記**: ブラウザで Overlay 表示を事前確認できることを追記。
- **URLの役割を明確化**: 操作画面とOBS Overlay画面の違いをより分かりやすく記載。
- **APIポートの注意事項**: `localhost:3001` の内部APIサーバーについて軽く追記。
- **ControlPanelのバージョン表示を `v0.6.3` に更新**。
- **Reset確認ダイアログの文言改善**: 保持される設定をより具体的に表示。

### 変更したファイル

- `README.md` — 初回セットアップ・URL説明・注意点を拡充。
- `package.json` — version を `0.6.3` に更新。
- `package-lock.json` — version を `0.6.3` に更新。
- `src/components/ControlPanel.tsx` — バージョン表示を修正、Reset確認文言を改善。

---

## v0.6.2 (2026-06-26)

Color Preset に Sky / Pink を追加し、全6色の配色テーマを提供。

### 追加

- **Sky / Pink プリセット**: カラープリセットに Sky（明るい水色系）と Pink（ピンク系）を追加。合計6色から選択可能。
- **OBSOverlay の Standard / Compact 両対応**: 両レイアウトで Sky / Pink を含む全プリセットが反映。
- **ControlPanel の6色対応**: Color Preset 選択UIを6色（Default / Blue / Red / Mono / Sky / Pink）に拡張。
- **server / frontend の validation 対応**: `parseSettings` の許可値に `sky` / `pink` を追加。

### 変更

- **Red / Sky / Pink の色調整**: 配信画面での視認性とプリセットとしての識別性を両立するよう各色を最適化。

### 変更したファイル

- `src/components/OBSOverlay.tsx` — Standard / Compact の全プリセット定義を拡張。
- `src/components/ControlPanel.tsx` — カラープリセットボタンを6色に拡張。
- `src/hooks/useStarboard.ts` — `parseSettings` に `sky`/`pink` を追加。
- `server/index.ts` — `parseSettings` に `sky`/`pink` を追加。

---

## v0.6.0 (2026-06-24)

配信中の誤操作対策として、Undo機能を追加。

### 追加

- **Undo機能**: WIN / LOSE の直前操作を1回だけ戻せる。
  - Undo可能な時だけUndoボタンが有効になる
  - Undo後は履歴をクリア（連打防止）
  - Reset後はUndo不可
  - Title / Layout / Color Preset変更はUndo対象外
  - Undo後もローカルAPI / OBSOverlayに正しく同期
  - countがマイナスにならないように保護

### 変更したファイル

- `src/hooks/useStarboard.ts` — undoInfo / undo関数を追加
- `src/App.tsx` — canUndo / undoをControlPanelに渡す
- `src/components/ControlPanel.tsx` — Undoボタンを追加

---

## v0.5.2 (2026-06-23)

OBSOverlay に Color Preset 配色を反映。

### 追加

- **カラープリセットの実テーマ反映**: OBSOverlay に各プリセットの色・枠線・影・文字色・背景色を反映。
  - **Default**: 従来のネオン紫/ピンク。
  - **Blue**: 爽やかで落ち着いた青・シアン。
  - **Red**: 茶色や紫に沈まない、明瞭なクリムゾン・ダークレッド系背景（`#5a0f1a`）と、赤・アンバー系の文字・枠・グロウ。
  - **Mono**: シンプルでスタイリッシュな白・グレー。
- **Standard / Compact 両対応**: 両方の表示モード（レイアウト）にプリセット配色を完全に適用。

### 変更したファイル

- `src/components/OBSOverlay.tsx` — 4カラーテーマのスタイルを静的に定義し、Standard / Compact 双方のJSXに適用。

---

## v0.5.1 (2026-06-23)

ControlPanelに Color Preset 切り替えUIを追加。

### 追加

- **カラープリセット選択UI**: OBS設定パネル内に「カラープリセット」セクションを追加。
  - Default / Blue / Red / Mono から選択可能な4カラムボタングループ。
  - 選択中のアクティブプリセットを青色（indigo）で強調。
  - 表示設定（layout）を消去・上書きせずに `colorPreset` のみを安全に更新。

### 変更したファイル

- `src/App.tsx` — `setColorPreset` の受け渡し
- `src/components/ControlPanel.tsx` — カラープリセットボタングループUIの追加

---

## v0.5.0 (2026-06-23)

Color Preset (`settings.colorPreset`) の土台追加。

### 追加

- **settings 構造の拡張**: settings に `colorPreset: "default" | "blue" | "red" | "mono"` を追加。初期値は `default`。
- **後方互換性とフォールバック**:
  - 古い `settings` に `colorPreset` がない場合は自動的に `default` を補完。
  - 不正な `colorPreset` が送られてきた場合は `default` に安全にフォールバック。
- **スコアリセット時の維持**: 勝敗数をリセットしても、`layout` と同様に `colorPreset` の設定値をクリアせずにそのまま維持。

### 変更したファイル

- `server/index.ts` — サーバー側の `parseSettings()` 拡張
- `src/hooks/useStarboard.ts` — フロント側の `parseSettings()` 拡張、`setColorPreset` 関数及び `storage` 同期ロジックの追加

---

## v0.4.3 (2026-06-20)

ControlPanel の推奨サイズ表示を `layout` に連動して切り替えるよう修正。

### 修正

- **推奨サイズ表示の自動切り替え**: 
  - `standard` 選択時は「推奨サイズ: 幅 800 / 高さ 200」
  - `compact` 選択時は「推奨サイズ: 幅 480 / 高さ 120」

### 変更したファイル

- `src/components/ControlPanel.tsx` — 推奨サイズ表示部の条件分岐。

---

## v0.4.2 (2026-06-20)

OBSOverlay に Compact 表示（小さめ表示）を反映。

### 追加

- **Compactレイアウト実装**: OBSOverlay に Compact モード用の軽量かつ高可読性なレイアウト（480x120想定）を実装。余白を詰めてフォントサイズを縮小しつつ、WIN / LOSE の数値や勝率は明確に読めるデザイン。
- **Standardレイアウト維持**: `standard` 選択時は従来の 800x200 向けの見た目を完全維持。

### 変更したファイル

- `src/components/OBSOverlay.tsx` — Compact表示の条件分岐JSXを追加

---

## v0.4.1 (2026-06-20)

ControlPanelに Standard / Compact 表示モードの切り替えUIを追加。

### 追加

- **表示モード切り替えUI**: OBS設定パネル内に「表示モード」セクション（Standard / Compact のトグルボタン）を追加。
- **Props経由の受け渡し**: フロント側から `settings` および `setLayout` を ControlPanel へ安全に受け渡し。

### 変更したファイル

- `src/App.tsx` — props経由の受け渡しを追加
- `src/components/ControlPanel.tsx` — トグルボタンUIを追加

---

## v0.4.0 (2026-06-19)

表示モードレイアウト設定 (`settings.layout`) の土台追加。

### 追加

- **settings 構造の追加**: `settings: { layout: "standard" | "compact" }` の設定構造をクライアント・サーバー両方に追加。
- **後方互換性とフォールバック**: 設定データが壊れていたり欠落している場合は `"standard"` にフォールバックする仕組みを構築。
- **スコアリセット時の設定維持**: 勝敗数をリセットしても `layout` 設定はクリアされず維持。

### 変更したファイル

- `server/index.ts` — Settings定義、parseSettings、API（reset時維持）
- `src/hooks/useStarboard.ts` — state定義、localStorage同期、setLayout関数追加

---

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

- `src/App.tsx` — ルーティングを追加（`/` 和 `/overlay`）
- `src/components/OBSOverlay.tsx` — 新規作成
- `src/components/ControlPanel.tsx` — OBS overlay URL コピーボタンを追加

---

## v0.0.0 (2026-06-14)

初期版。最初のリリース。