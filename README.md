# FastAPI + React Native カウンターアプリ

FastAPIバックエンドとReact Native（Expo）フロントエンドで構築されたシンプルなカウンターアプリケーションです。Vercelへのデプロイ例です。

## ライブデモ

https://hello-vercel-eosin.vercel.app/

## 機能

- 全ユーザーが共有するカウンター
- スレッドセーフなFastAPIバックエンド
- REST API経由でのカウンター更新
- Vercelサーバーレス関数でのデプロイ

## 技術スタック

### バックエンド
- FastAPI
- Vercel

### フロントエンド
- React Native（Expo）
- TypeScript
- Expo Router

## APIエンドポイント

- `GET /api/counter` - 現在のカウンター値を取得
- `POST /api/counter/increment` - カウンターを1増加
- `POST /api/counter/decrement` - カウンターを1減少
