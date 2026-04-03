# 株式会社サンエイ — AI集客システム

リフォーム会社向けのAIファースト集客パッケージ。  
Webサイト・LINE自動応答Bot・リード管理を一気通貫で構築した実装例。

🔗 **Live**: https://sanei-reform.vercel.app

---

## Overview

中小リフォーム会社が抱える「集客・問い合わせ対応・リード管理」の課題をAIとWebで自動化。  
お問い合わせが入った瞬間から、Claude APIが自動応答 → Googleスプレッドシートにリード保存まで、人手なしで完結します。

---

## Features

- **SEO / GEO最適化** — Schema.org構造化データ・llms.txt・サイトマップ自動生成
- **LINE自動応答Bot** — Claude APIによる自然言語での自動返信
- **リード自動管理** — 問い合わせをGoogleスプレッドシートに自動記録
- **Formspree連携** — コンタクトフォームからのリード取得
- **レスポンシブ対応** — モバイルファーストのUI設計

---

## Tech Stack

| Category | Technology |
|----------|-----------|
| Frontend | Next.js 15 / React 19 / TypeScript / Tailwind CSS v4 |
| AI | Claude API (Anthropic) |
| Automation | n8n (self-hosted on Railway) |
| Messaging | LINE Messaging API |
| Form | Formspree |
| Deploy | Vercel |
| Analytics | Google Analytics / Google Search Console |

---

## System Architecture
```
[ユーザー]
    │
    ├── Webサイト (Next.js / Vercel)
    │       └── Formspree → リード取得
    │
    └── LINE公式アカウント
            │
            ▼
        n8n Webhook (Railway)
            │
            ├── Claude API → 自動返信生成
            │
            └── Google Sheets → リード自動保存
```

---

## Project Structure
```
sanei-reform/
├── クライアント/          # Next.js フロントエンド
│   ├── src/
│   │   ├── app/           # App Router
│   │   ├── components/    # UIコンポーネント
│   │   └── lib/           # ユーティリティ
│   └── public/
├── サーバ/                # API / バックエンド処理
├── 共有/                  # 共通型定義
└── バッチ/                # 定期処理スクリプト
```

---

## Business Context

**AltShift** が提供する「AIファースト集客パッケージ」の実証案件として開発。  
リフォーム・建設・飲食など地場の中小企業をターゲットに、月額定額でSEO/GEO対策からAI自動化まで提供するSaaSモデルの先行事例。

---

## Developer

**Daiki Sakaguchi / AltShift**  
GitHub: [@daikisakaguchi1994-lab](https://github.com/daikisakaguchi1994-lab)
