import { useState, useEffect, useCallback, useRef } from 'react';

// localStorageのキー定義
const KEY_TITLE = 'starboard_title';
const KEY_WIN = 'starboard_win';
const KEY_LOSE = 'starboard_lose';
const KEY_SETTINGS = 'starboard_settings';

// APIエンドポイント
const API_STATE = '/api/state';
const API_RESET = '/api/reset';

// ポーリング間隔 (ms)
const POLL_INTERVAL = 3000;

// ローカル変更後の上書きガード期間 (ms) - この間はポーリング結果を無視
const LOCAL_CHANGE_GUARD_MS = 1000;

// Settings型定義
type Layout = 'standard' | 'compact';

interface Settings {
  layout: Layout;
}

const DEFAULT_SETTINGS: Settings = { layout: 'standard' };

function parseSettings(raw: unknown): Settings {
  if (
    raw &&
    typeof raw === 'object' &&
    'layout' in raw
  ) {
    const layout = (raw as { layout?: unknown }).layout;
    if (layout === 'standard' || layout === 'compact') {
      return { layout };
    }
  }
  return DEFAULT_SETTINGS;
}

export interface StarboardState {
  title: string;
  win: number;
  lose: number;
  winRate: string;
}

export function useStarboard() {
  // localStorage から初期値を取得、なければデフォルト値
  const [title, setTitleState] = useState<string>(() => {
    return localStorage.getItem(KEY_TITLE) ?? '勝敗カウンター';
  });

  const [win, setWinState] = useState<number>(() => {
    const saved = localStorage.getItem(KEY_WIN);
    return saved ? Math.max(0, parseInt(saved, 10)) : 0;
  });

  const [lose, setLoseState] = useState<number>(() => {
    const saved = localStorage.getItem(KEY_LOSE);
    return saved ? Math.max(0, parseInt(saved, 10)) : 0;
  });

  // settings state (localStorageから読み込み、パース)
  const [settings, setSettingsState] = useState<Settings>(() => {
    try {
      const saved = localStorage.getItem(KEY_SETTINGS);
      return saved ? parseSettings(JSON.parse(saved)) : DEFAULT_SETTINGS;
    } catch {
      return DEFAULT_SETTINGS;
    }
  });

  // サーバー接続状態
  const [serverConnected, setServerConnected] = useState(false);

  // --- Refs (クロージャの古い値問題を回避するため) ---

  // 常に最新の値を保持する ref
  const titleRef = useRef(title);
  const winRef = useRef(win);
  const loseRef = useRef(lose);
  const settingsRef = useRef(settings);

  // コンポーネントの updatedAt (ローカルで最後に変更した時刻)
  const localUpdatedAtRef = useRef(Date.now());

  // 初回同期済みフラグ
  const initialSyncDone = useRef(false);

  // ローカル値を ref に同期
  titleRef.current = title;
  winRef.current = win;
  loseRef.current = lose;
  settingsRef.current = settings;

  // --- サーバー同期関数 ---

  // サーバーへ状態を送信する (ref の最新値を使う)
  const postState = useCallback(async () => {
    try {
      const res = await fetch(API_STATE, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: titleRef.current,
          win: winRef.current,
          lose: loseRef.current,
          settings: settingsRef.current,
        }),
      });
      if (res.ok) {
        const data = await res.json();
        // サーバーからのレスポンスの updatedAt を記録
        if (typeof data.updatedAt === 'number') {
          // サーバーの updatedAt より新しいローカル更新があれば上書きしない
          if (data.updatedAt > localUpdatedAtRef.current) {
            localUpdatedAtRef.current = data.updatedAt;
          }
        }
        setServerConnected(true);
      }
    } catch {
      // サーバー未起動時は静かに無視
      setServerConnected(false);
    }
  }, []);

  // サーバーから状態を取得 (updatedAt で古い値を無視)
  const syncFromServer = useCallback(async () => {
    try {
      const res = await fetch(API_STATE);
      if (!res.ok) return;
      const data = await res.json();

      setServerConnected(true);

      // サーバーの updatedAt がローカルの最終更新時刻より新しい場合のみ反映
      if (typeof data.updatedAt === 'number') {
        // ローカル変更から LOCAL_CHANGE_GUARD_MS 以内なら上書きしない
        const now = Date.now();
        const localAge = now - localUpdatedAtRef.current;
        if (localAge < LOCAL_CHANGE_GUARD_MS) {
          return; // ローカル変更直後はガード
        }

        // サーバーの updatedAt がローカルより古ければ無視
        if (data.updatedAt <= localUpdatedAtRef.current) {
          return;
        }

        // 新しい値でのみ上書き
        if (typeof data.title === 'string' && data.title !== titleRef.current) {
          titleRef.current = data.title;
          setTitleState(data.title);
          localStorage.setItem(KEY_TITLE, data.title);
        }
        if (typeof data.win === 'number' && data.win !== winRef.current) {
          const validated = Math.max(0, Math.round(data.win));
          winRef.current = validated;
          setWinState(validated);
          localStorage.setItem(KEY_WIN, String(validated));
        }
        if (typeof data.lose === 'number' && data.lose !== loseRef.current) {
          const validated = Math.max(0, Math.round(data.lose));
          loseRef.current = validated;
          setLoseState(validated);
          localStorage.setItem(KEY_LOSE, String(validated));
        }
        if (data.settings !== undefined) {
          const parsed = parseSettings(data.settings);
          if (JSON.stringify(parsed) !== JSON.stringify(settingsRef.current)) {
            settingsRef.current = parsed;
            setSettingsState(parsed);
            localStorage.setItem(KEY_SETTINGS, JSON.stringify(parsed));
          }
        }

        localUpdatedAtRef.current = data.updatedAt;
      }
    } catch {
      // サーバー未起動時は静かに無視
      setServerConnected(false);
    }
  }, []);

  // 初回ロード時にサーバーから最新状態を取得
  useEffect(() => {
    if (initialSyncDone.current) return;
    initialSyncDone.current = true;

    (async () => {
      try {
        const res = await fetch(API_STATE);
        if (res.ok) {
          const data = await res.json();
          setServerConnected(true);
          if (typeof data.title === 'string') {
            titleRef.current = data.title;
            setTitleState(data.title);
            localStorage.setItem(KEY_TITLE, data.title);
          }
          if (typeof data.win === 'number') {
            const validated = Math.max(0, Math.round(data.win));
            winRef.current = validated;
            setWinState(validated);
            localStorage.setItem(KEY_WIN, String(validated));
          }
          if (typeof data.lose === 'number') {
            const validated = Math.max(0, Math.round(data.lose));
            loseRef.current = validated;
            setLoseState(validated);
            localStorage.setItem(KEY_LOSE, String(validated));
          }
          if (data.settings !== undefined) {
            const parsed = parseSettings(data.settings);
            settingsRef.current = parsed;
            setSettingsState(parsed);
            localStorage.setItem(KEY_SETTINGS, JSON.stringify(parsed));
          }
          if (typeof data.updatedAt === 'number') {
            localUpdatedAtRef.current = data.updatedAt;
          }
        }
      } catch {
        // サーバー未起動時はローカルの値を使う
        setServerConnected(false);
      }
    })();
  }, []);

  // 定期的なポーリング (OBSや別タブからの変更検知)
  useEffect(() => {
    const intervalId = setInterval(() => {
      syncFromServer();
    }, POLL_INTERVAL);
    return () => clearInterval(intervalId);
  }, [syncFromServer]);

  // --- 値更新関数 (すべて関数型更新で安全) ---

  const updateTitle = useCallback((newTitle: string) => {
    localUpdatedAtRef.current = Date.now();
    titleRef.current = newTitle;
    setTitleState(newTitle);
    localStorage.setItem(KEY_TITLE, newTitle);
    queueMicrotask(() => postState());
  }, [postState]);

  const updateWin = useCallback((updater: number | ((prev: number) => number)) => {
    localUpdatedAtRef.current = Date.now();
    setWinState((prev) => {
      const next = typeof updater === 'function' ? updater(prev) : updater;
      const validated = Math.max(0, Math.round(next));
      winRef.current = validated;
      localStorage.setItem(KEY_WIN, String(validated));
      return validated;
    });
    queueMicrotask(() => postState());
  }, [postState]);

  const updateLose = useCallback((updater: number | ((prev: number) => number)) => {
    localUpdatedAtRef.current = Date.now();
    setLoseState((prev) => {
      const next = typeof updater === 'function' ? updater(prev) : updater;
      const validated = Math.max(0, Math.round(next));
      loseRef.current = validated;
      localStorage.setItem(KEY_LOSE, String(validated));
      return validated;
    });
    queueMicrotask(() => postState());
  }, [postState]);

  const resetScores = useCallback(() => {
    localUpdatedAtRef.current = Date.now();
    winRef.current = 0;
    loseRef.current = 0;
    setWinState(0);
    setLoseState(0);
    localStorage.setItem(KEY_WIN, '0');
    localStorage.setItem(KEY_LOSE, '0');
    // サーバーにもリセットを通知
    (async () => {
      try {
        const res = await fetch(API_RESET, { method: 'POST' });
        if (res.ok) {
          const data = await res.json();
          if (typeof data.updatedAt === 'number') {
            localUpdatedAtRef.current = data.updatedAt;
          }
          // サーバー側の settings を反映（リセット後も維持されているはず）
          if (data.settings !== undefined) {
            const parsed = parseSettings(data.settings);
            settingsRef.current = parsed;
            setSettingsState(parsed);
            localStorage.setItem(KEY_SETTINGS, JSON.stringify(parsed));
          }
          setServerConnected(true);
        }
      } catch {
        // サーバー未起動時は静かに無視
        setServerConnected(false);
      }
    })();
  }, []);

  // setLayout: settings.layout を変更する
  const setLayout = useCallback((layout: Layout) => {
    localUpdatedAtRef.current = Date.now();
    const newSettings: Settings = { layout };
    settingsRef.current = newSettings;
    setSettingsState(newSettings);
    localStorage.setItem(KEY_SETTINGS, JSON.stringify(newSettings));
    queueMicrotask(() => postState());
  }, [postState]);

  // 別タブや別ウィンドウでの localStorage 変更を検知して同期する
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === KEY_TITLE && e.newValue !== null) {
        titleRef.current = e.newValue;
        setTitleState(e.newValue);
      } else if (e.key === KEY_WIN && e.newValue !== null) {
        const validated = Math.max(0, parseInt(e.newValue, 10) || 0);
        winRef.current = validated;
        setWinState(validated);
      } else if (e.key === KEY_LOSE && e.newValue !== null) {
        const validated = Math.max(0, parseInt(e.newValue, 10) || 0);
        loseRef.current = validated;
        setLoseState(validated);
      } else if (e.key === KEY_SETTINGS && e.newValue !== null) {
        try {
          const parsed = parseSettings(JSON.parse(e.newValue));
          settingsRef.current = parsed;
          setSettingsState(parsed);
        } catch {
          // パースに失敗したら無視
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  // 勝率の計算 (WIN / (WIN + LOSE))
  const total = win + lose;
  const winRate = total > 0 ? `${Math.round((win / total) * 100)}%` : '0%';

  return {
    title,
    win,
    lose,
    winRate,
    serverConnected,
    settings,
    setTitle: updateTitle,
    setWin: updateWin,
    setLose: updateLose,
    resetScores,
    setLayout,
  };
}