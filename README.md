# Todo App

シンプルで使いやすいTodoアプリです。React + TypeScript + Viteで構築されています。

## 機能

- ✅ Todoの追加・編集・削除
- ✅ チェックボックスで完了/未完了の切り替え
- ✅ All / Active / Completed でフィルタリング
- ✅ 完了したタスクの一括削除
- ✅ ダブルクリックでインライン編集
- ✅ localStorageで自動保存（リロードしてもデータが残ります）

## セットアップ

```bash
# 依存パッケージをインストール
npm install

# 開発サーバーを起動
npm run dev

# ブラウザで http://localhost:5173 にアクセス
```

## ビルド

```bash
# 本番用ビルド
npm run build

# ビルドしたアプリをプレビュー
npm run preview
```

## プロジェクト構成

```
src/
├── components/
│   ├── AddTodo.tsx       # Todo追加フォーム
│   ├── TodoItem.tsx      # Todoアイテム（編集・削除機能付き）
│   └── Filter.tsx        # フィルターバー
├── hooks/
│   └── useTodos.ts       # Todoの状態管理とlocalStorage連携
├── types.ts              # 型定義
├── App.tsx               # メインコンポーネント
├── App.css               # アプリケーションスタイル
├── index.css             # グローバルスタイル
└── main.tsx              # エントリーポイント
```

## 技術スタック

- **React 18** - UIライブラリ
- **TypeScript** - 型安全性
- **Vite** - 高速ビルドツール
- **useSyncExternalStore** - localStorageとの同期
