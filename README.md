# KeiHiroshima.github.io

廣島 圭（Kei Hiroshima）の研究者ポートフォリオサイトのソースです。

- 公開URL: <https://KeiHiroshima.github.io>（英語）/ <https://KeiHiroshima.github.io/ja/>（日本語）
- 構成: [Jekyll](https://jekyllrb.com/) + [multi-language-al-folio](https://github.com/george-gca/multi-language-al-folio) テーマ（[al-folio](https://github.com/alshedivat/al-folio) の多言語版）
- 多言語化: `jekyll-polyglot`（`en` がデフォルト、`ja` は `/ja/` 以下に出力）
- ホスティング: GitHub Pages（`main` への push → GitHub Actions でビルド → `gh-pages` ブランチへデプロイ）
- テーマ本来の README は [README.al-folio.md](README.al-folio.md) に残しています（テーマの機能・カスタマイズ方法の詳細はそちらを参照）。

---

## 目次

1. [クイックスタート（Docker）](#1-クイックスタートdocker)
2. [デプロイの仕組み](#2-デプロイの仕組み)
3. [ページ ↔ データ対応表](#3-ページ--データ対応表)
4. [全ページ共通の要素](#4-全ページ共通の要素)
5. [よくある更新作業](#5-よくある更新作業)
6. [既知の注意点・未整備事項](#6-既知の注意点未整備事項)
7. [ディレクトリ構成](#7-ディレクトリ構成)
8. [トラブルシューティング](#8-トラブルシューティング)

---

## 1. クイックスタート（Docker）

前提: Docker Desktop（または Docker Engine + Compose v2）が起動していること。
イメージはリポジトリ内の [Dockerfile](Dockerfile) からローカルビルドされます（タグ: `keihiroshima-site:local`）。初回は数分かかります。

### 1-1. 開発用サーバ（編集しながら確認）

```bash
docker compose up            # 初回・Dockerfile/Gemfile 変更後は --build を付ける
# → http://localhost:8080      （英語）
# → http://localhost:8080/ja/  （日本語）
docker compose down          # 停止
```

- ファイルを保存すると自動で再ビルドされ、ブラウザも LiveReload されます。
- `_config.yml` を変更した場合は [bin/entry_point.sh](bin/entry_point.sh) がそれを検知して Jekyll を自動再起動します。
- `JEKYLL_ENV=development` で動くため、本番と一部挙動（minify 等）が異なります。

### 1-2. 本番同等ビルド（公開前の最終確認）

GitHub Actions（[.github/workflows/deploy.yml](.github/workflows/deploy.yml)）と同じ手順でビルドし、nginx で配信します。

```bash
docker compose -f docker-compose.prod.yml up --build
# 1. site     : JEKYLL_ENV=production で jekyll build → ./_site
# 2. purgecss : 未使用 CSS を削除
# 3. web      : nginx で ./_site を配信 → http://localhost:8081
docker compose -f docker-compose.prod.yml down
```

> [!NOTE]
> 開発用と本番同等ビルドはどちらも `./_site` に出力するため、**同時に起動しないでください**。

### 1-3. Docker を使わない場合（参考）

Ruby 3.3 系・Bundler・ImageMagick・Python3（`nbconvert`）が必要です。

```bash
bundle install
bundle exec jekyll serve --livereload   # → http://localhost:4000
```

---

## 2. デプロイの仕組み

| 何が起きるか                              | 仕組み                                                                                                                                | 設定ファイル                                                                     |
| :---------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------ | :------------------------------------------------------------------------------- |
| `main` に push するとサイトが更新される   | GitHub Actions で `jekyll build` → `purgecss` → `gh-pages` ブランチへ push。GitHub Pages は `gh-pages` ブランチを配信                 | [.github/workflows/deploy.yml](.github/workflows/deploy.yml)                     |
| Google Scholar の被引用数が自動更新される | 月・水・金 0:00 UTC に `bin/update_scholar_citations.py` を実行し、`_data/citations.yml` を自動コミット（→ そのコミットで再デプロイ） | [.github/workflows/update-citations.yml](.github/workflows/update-citations.yml) |
| PR 時のチェック                           | Prettier 整形チェック、CodeQL など                                                                                                    | `.github/workflows/prettier.yml` ほか                                            |

- **デプロイ対象外の変更**: `README.md` / `README.al-folio.md` の変更だけではデプロイは走りません。
- GitHub リポジトリの Settings → Pages で「Deploy from a branch: `gh-pages`」になっている必要があります。
- 本番ビルドの Ruby バージョンは Actions では `3.3.5` 固定、Docker では `ruby:slim`（最新）です。差異が問題になった場合は [Dockerfile](Dockerfile) の `FROM` を `ruby:3.3-slim` に固定してください。
- `docker-image` / `docker-slim` / `broken-links` / `deploy-docker-tag` などはテーマ作者用のワークフローで、このリポジトリでは実質動作しません（リポジトリ所有者条件で skip されるか、タグ push 時のみ）。

---

## 3. ページ ↔ データ対応表

凡例: **ページ定義** = URL・タイトル・ナビ表示を決めるファイル / **表示内容の出どころ** = 実際に画面に出る情報を書き換えるときに編集するファイル。
英語版と日本語版はファイルが**別々**です（`en/` と `ja/`）。片方だけ更新すると言語間で内容がずれるので注意してください。

### 3-1. ナビゲーションに表示されているページ

ナビの並び順は各ページの `nav_order`（小さいほど左）、表示の有無は `nav: true/false` で決まります。ナビ上のラベルは各ページの `title` です。

#### about（トップページ）— `/` , `/ja/`

| 画面上の要素                              | 表示内容の出どころ                                                                                                                  |
| :---------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------- |
| 氏名（見出し）                            | [\_config.yml](_config.yml) の `first_name` / `middle_name` / `last_name`（`title: blank` のとき氏名を表示）                        |
| 所属（サブタイトル）                      | [\_pages/en/about.md](_pages/en/about.md) / [\_pages/ja/about.md](_pages/ja/about.md) の `subtitle`                                 |
| プロフィール写真                          | 同ファイルの `profile.image`（現在 `prof_pic.png`）→ 実体は [assets/img/](assets/img/)。※[6章の注意](#6-既知の注意点未整備事項)あり |
| 自己紹介文                                | 同ファイルの本文（front matter の `---` より下）                                                                                    |
| news 欄（最新5件）                        | [\_news/en/](_news/en/) / [\_news/ja/](_news/ja/) の各 `.md`（件数は about.md の `announcements.limit`）                            |
| latest posts 欄（最新3件）                | [\_posts/en/](_posts/en/) / [\_posts/ja/](_posts/ja/) の各 `.md`（件数は `latest_posts.limit`）                                     |
| selected publications 欄                  | [\_bibliography/papers.bib](_bibliography/papers.bib) のうち `selected={true}` のエントリ                                           |
| ページ下部のアイコン（メール・GitHub 等） | [\_data/socials.yml](_data/socials.yml)                                                                                             |
| 欄見出し（news / 最新の投稿 / 主要論文）  | [\_data/en/strings.yml](_data/en/strings.yml) / [\_data/ja/strings.yml](_data/ja/strings.yml)                                       |

#### publications — `/publications/` , `/ja/publications/`（nav_order: 2）

| 画面上の要素                               | 表示内容の出どころ                                                                                                                            |
| :----------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------- |
| 論文リスト全体（年ごとにグループ化、降順） | [\_bibliography/papers.bib](_bibliography/papers.bib)（英日共通の 1 ファイル）                                                                |
| タイトル・会議名の言語切替                 | `.bib` の `title` / `booktitle` が日本語版、`title_en` / `booktitle_en` があれば英語版で優先表示                                              |
| 受賞表示                                   | `award`（日本語版）/ `award_en`（英語版）                                                                                                     |
| 左側の略称バッジ（ICPR 等）                | `abbr`。色・リンクは [\_data/venues.yml](_data/venues.yml) で指定可能（現在はテーマのサンプルのみ）                                           |
| 自分の名前の強調                           | [\_config.yml](_config.yml) の `scholar.last_name` / `scholar.first_name`                                                                     |
| 共著者名のリンク                           | [\_data/coauthors.yml](_data/coauthors.yml)（現在はテーマのサンプルのみ）                                                                     |
| 被引用数バッジ                             | `.bib` の `google_scholar_id` ＋ [\_data/citations.yml](_data/citations.yml)（自動更新）。※現状は未設定、[6章](#6-既知の注意点未整備事項)参照 |
| 注記（Equal contribution 等）              | `annotation`                                                                                                                                  |
| 検索ボックス                               | [\_config.yml](_config.yml) の `bib_search: true`                                                                                             |
| ページ定義                                 | [\_pages/en/publications.md](_pages/en/publications.md) / [\_pages/ja/publications.md](_pages/ja/publications.md)                             |
| 表示テンプレート                           | [\_layouts/bib.liquid](_layouts/bib.liquid)、並び・グループは `_config.yml` の `scholar:` セクション                                          |

#### cv — `/cv/` , `/ja/cv/`（nav_order: 5）

| 画面上の要素                                        | 表示内容の出どころ                                                                                                                                                        |
| :-------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| CV 本体（基本情報・職歴・学歴・受賞・スキル・言語） | [assets/json/resume_en.json](assets/json/resume_en.json) / [assets/json/resume_ja.json](assets/json/resume_ja.json)（[JSON Resume](https://jsonresume.org/schema/) 形式） |
| 表示するセクションと順序                            | [\_config.yml](_config.yml) の `jsonresume:` リスト（空配列 `[]` のセクションは非表示）                                                                                   |
| セクション見出しの翻訳                              | [\_data/en/strings.yml](_data/en/strings.yml) / [\_data/ja/strings.yml](_data/ja/strings.yml) の `cv:`                                                                    |
| 右上の PDF アイコン                                 | [assets/pdf/en/CV_en.pdf](assets/pdf/en/CV_en.pdf) / [assets/pdf/ja/CV_ja.pdf](assets/pdf/ja/CV_ja.pdf)（ファイル名は `_pages/*/cv.md` の `cv_pdf`）                      |
| ページ定義                                          | [\_pages/en/cv.md](_pages/en/cv.md) / [\_pages/ja/cv.md](_pages/ja/cv.md)、表示は [\_layouts/cv.liquid](_layouts/cv.liquid)                                               |

> [!IMPORTANT]
> CV のデータ源は `resume_*.json` に一本化しています。テーマには YAML 形式（`_data/LANG/cv.yml`）の仕組みもありますが、[\_layouts/cv.liquid](_layouts/cv.liquid) は **JSON が存在すると JSON を優先**するため、以前あった `cv.yml` は表示に使われておらず、内容の食い違いを避けるため削除しました。
> PDF 版 CV は手動で差し替えが必要です（JSON を更新しても PDF は変わりません）。

#### activities — `/activities/` , `/ja/activities/`（nav_order: 6）

| 画面上の要素                   | 表示内容の出どころ                                                                                                                      |
| :----------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------- |
| Teaching（授業担当）の表・説明 | [\_pages/en/activities.md](_pages/en/activities.md) / [\_pages/ja/activities.md](_pages/ja/activities.md) の本文（Markdown を直接記述） |
| Internship / Activities 欄     | 同ファイル内で `<!-- ... -->` によりコメントアウト中（未記入のため非表示）。記入後にコメントを外すと表示されます                        |

### 3-2. ナビには出ていないが公開されているページ

`nav: false` のページもビルドされ、URL を直接開けば閲覧できます。現在の内容の多くはテーマのサンプルのままです（[6章](#6-既知の注意点未整備事項)）。

| ページ       | URL                   | ページ定義                 | 表示内容の出どころ                                                                                             | 現状                                                                               |
| :----------- | :-------------------- | :------------------------- | :------------------------------------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------- |
| news 一覧    | `/news/`              | `_pages/*/news.md`         | `_news/en/`, `_news/ja/`                                                                                       | 自分の内容                                                                         |
| ニュース個別 | `/news/<ファイル名>/` | —                          | `_news/*/*.md`（`inline: true` のものは一覧に本文を直接表示）                                                  | 自分の内容                                                                         |
| blog 一覧    | `/blog/`              | `_pages/*/blog.md`         | `_posts/en/`, `_posts/ja/`（ファイル名 `YYYY-MM-DD-title.md`）                                                 | 投稿は自分の内容。英語版の見出し `blog_name: al-folio in english` はサンプルのまま |
| blog 記事    | `/blog/<年>/<title>/` | —                          | `_posts/*/*.md`                                                                                                | 自分の内容                                                                         |
| projects     | `/projects/`          | `_pages/*/projects.md`     | `_projects/en/`, `_projects/ja/`（`category`: work / fun、`importance` 順）                                    | **テーマのサンプル**（project 1〜9）                                               |
| repositories | `/repositories/`      | `_pages/*/repositories.md` | [\_data/repositories.yml](_data/repositories.yml)（GitHub ユーザ・リポジトリ一覧。カードは外部サービスで生成） | 自分の内容。英語版の説明文はサンプルのまま                                         |
| bookshelf    | `/books/`             | `_pages/*/books.md`        | `_books/en/`, `_books/ja/`                                                                                     | **テーマのサンプル**（The Godfather）                                              |
| 404          | `/404.html`           | `_pages/*/404.md`          | 同ファイル                                                                                                     | 3秒後にトップへリダイレクト                                                        |
| submenus     | —                     | `_pages/*/dropdown.md`     | ナビのドロップダウン定義（`nav: false` で非表示）                                                              | 未使用                                                                             |

---

## 4. 全ページ共通の要素

| 要素                                            | 表示内容の出どころ                                                                                                                   |
| :---------------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------- |
| ナビ左上の名前・ナビ項目                        | `_config.yml` の氏名、各ページの `title` / `nav` / `nav_order`（[\_includes/header.liquid](_includes/header.liquid)）                |
| 言語切替（English / 日本語）                    | `_config.yml` の `languages` / `default_lang`、表示名は `_data/*/strings.yml` の `language_name`                                     |
| フッター                                        | `© <年> Kei Hiroshima.` ＋ `_data/*/strings.yml` の `footer_text`（現在は空）。`_config.yml` の `footer_text` は**使われていません** |
| ブラウザタブのタイトル                          | 氏名 ＋ 各ページの `title`                                                                                                           |
| `<meta name="description">`（検索結果の説明文） | 各ページの `description`、無ければ `_data/*/strings.yml` の `site_description`（現在はテーマ既定文）                                 |
| ファビコン                                      | `_config.yml` の `icon`（[assets/img/favicon.svg](assets/img/favicon.svg)）                                                          |
| サイト内検索（ctrl+k）                          | `_config.yml` の `search_enabled` など                                                                                               |
| ダークモード切替                                | `_config.yml` の `enable_darkmode`                                                                                                   |
| 画像のレスポンシブ化                            | `_config.yml` の `imagemagick:`（`assets/img/` の jpg/png 等から 480/800/1400px の `.webp` を自動生成）                              |

---

## 5. よくある更新作業

編集後は `docker compose up` で表示を確認してから `main` に push してください。**英語版・日本語版の両方を更新する**のを忘れないようにしてください。

| やりたいこと                 | 編集するファイル                                                                                                                                                                                |
| :--------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 論文を追加する               | [\_bibliography/papers.bib](_bibliography/papers.bib) にエントリ追加。トップにも出すなら `selected={true}`、日本語論文は `title_en` / `booktitle_en` を併記                                     |
| 論文に被引用数を出す         | Google Scholar の論文 URL の `citation_for_view=<USERID>:<ID>` の `<ID>` を `.bib` の `google_scholar_id={...}` に記入（[\_data/citations.yml](_data/citations.yml) のキーの `:` 以降と同じ値） |
| ニュースを追加する           | `_news/en/xxx.md` と `_news/ja/xxx.md` を作成（既存の [\_news/en/icpr2026_accepted.md](_news/en/icpr2026_accepted.md) をコピー）                                                                |
| ブログ記事を書く             | `_posts/en/YYYY-MM-DD-title.md` と `_posts/ja/...` を作成                                                                                                                                       |
| 自己紹介・所属を変える       | `_pages/en/about.md` / `_pages/ja/about.md`（`subtitle` と本文）                                                                                                                                |
| CV を更新する                | `assets/json/resume_en.json` / `resume_ja.json`、PDF は `assets/pdf/en/CV_en.pdf` / `assets/pdf/ja/CV_ja.pdf` を差し替え                                                                        |
| 授業・インターン等を追記する | `_pages/en/activities.md` / `_pages/ja/activities.md`                                                                                                                                           |
| SNS・連絡先リンクを変える    | [\_data/socials.yml](_data/socials.yml)                                                                                                                                                         |
| プロフィール写真を変える     | `assets/img/` に置き、`about.md` の `profile.image` を変更（[6章の注意](#6-既知の注意点未整備事項)参照）                                                                                        |
| ナビに項目を出す／隠す       | 各 `_pages/*/*.md` の `nav: true/false` と `nav_order`                                                                                                                                          |
| サイト全体の設定             | [\_config.yml](_config.yml)（変更後は開発サーバが自動再起動）                                                                                                                                   |

---

## 6. 既知の注意点・未整備事項

調査時点（2026-09）で見つかったもの。対応済みのものは ✅。

| #   | 内容                                                                                                                                                                                                                                                             | 状態・対応方法                                                                                   |
| :-- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :----------------------------------------------------------------------------------------------- |
| 1   | CV の修了予定年が about（2028）と CV（2029）で食い違っていた                                                                                                                                                                                                     | ✅ `resume_*.json` を 2028 年春（3月）に修正                                                     |
| 2   | 表示に使われていない `_data/{en,ja}/cv.yml` が存在し、CV の編集先が紛らわしかった                                                                                                                                                                                | ✅ 削除し、データ源を `resume_*.json` に一本化                                                   |
| 3   | activities の Internship / Activities 欄が `[Role]` などのプレースホルダのまま公開されていた                                                                                                                                                                     | ✅ コメントアウトで非表示（記入後に `<!--` `-->` を外す）                                        |
| 4   | **プロフィール写真の衝突**: `assets/img/prof_pic.jpg` と `prof_pic.png` が同じ `prof_pic-{480,800,1400}.webp` を生成するため、ビルド時に `Conflict` 警告が出る。about では png を指定しているが、ブラウザが実際に読み込む webp は jpg 側（カラー版）になっている | 未対応。使わない方をリネーム／削除すれば解消（例: カラー版を使わないなら `prof_pic.jpg` を削除） |
| 5   | 論文に `google_scholar_id` が無いため、`_data/citations.yml` は自動更新されているが**画面には被引用数が出ていない**                                                                                                                                              | 未対応。[5章](#5-よくある更新作業)の手順で `.bib` に ID を追記                                   |
| 6   | projects / bookshelf / blog 見出し（英語版）/ repositories 説明文（英語版）がテーマのサンプルのまま。ナビには出ないが URL 直打ちで閲覧可能                                                                                                                       | 未対応。使わないなら該当 `_pages`・コレクションを削除、または内容を差し替え                      |
| 7   | `_data/coauthors.yml` / `_data/venues.yml` がテーマのサンプル（物理学者など）                                                                                                                                                                                    | 未対応（表示上の実害はほぼ無し）。共著者リンクや会議バッジ色を付けたい場合に置き換え             |
| 8   | `<meta description>` がテーマ既定文、`_config.yml` の `description` も `description will be updated soon`                                                                                                                                                        | 未対応。`_data/*/strings.yml` の `site_description` を自分の説明に変更                           |
| 9   | `_config.yml` の `footer_text` は使われていない（フッターは `strings.yml` の `footer_text` を参照）                                                                                                                                                              | 情報のみ                                                                                         |
| 10  | activities（英語版）の本文に typo（`leanrning`, `lenear`）                                                                                                                                                                                                       | 未対応                                                                                           |
| 11  | `assets/img/` に未使用と思われるサンプル画像（`1.jpg`〜`12.jpg`、`prof_pic_color.png`（14MB）など）がある                                                                                                                                                        | 未対応。ビルド時間とリポジトリサイズに影響                                                       |

---

## 7. ディレクトリ構成

主に編集するものに ★ を付けています。

```text
.
├── _config.yml               ★ サイト全体の設定（氏名・URL・機能 ON/OFF・論文表示設定・CV セクション）
├── _pages/{en,ja}/           ★ 各ページの定義（URL・タイトル・ナビ・本文）
├── _bibliography/papers.bib  ★ 論文リスト（英日共通）
├── _news/{en,ja}/            ★ ニュース
├── _posts/{en,ja}/           ★ ブログ記事
├── _projects/{en,ja}/          プロジェクト（現在はサンプル）
├── _books/{en,ja}/             本棚（現在はサンプル）
├── _data/
│   ├── socials.yml           ★ SNS・連絡先・Scholar ID
│   ├── citations.yml           被引用数（GitHub Actions が自動更新、手で編集しない）
│   ├── repositories.yml        repositories ページの対象
│   ├── coauthors.yml / venues.yml  論文表示の補助（現在はサンプル）
│   └── {en,ja}/strings.yml     UI 文言の翻訳・サイト説明文
├── assets/
│   ├── json/resume_{en,ja}.json ★ CV の内容
│   ├── pdf/{en,ja}/          ★ CV の PDF
│   └── img/                  ★ プロフィール写真などの画像
├── _layouts/ _includes/ _sass/ _plugins/ _scripts/   テーマ本体（通常は編集不要）
├── bin/
│   ├── entry_point.sh          Docker 開発サーバの起動スクリプト
│   └── update_scholar_citations.py  被引用数取得スクリプト
├── Dockerfile                  ビルド環境イメージ
├── docker-compose.yml          開発サーバ（:8080）
├── docker-compose.prod.yml     本番同等ビルド＋nginx（:8081）
├── .github/workflows/          CI/CD（deploy.yml, update-citations.yml が主）
└── README.al-folio.md          テーマ本来の README
```

---

## 8. トラブルシューティング

| 症状                                                                           | 対処                                                                                                                                          |
| :----------------------------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------- |
| `Cannot connect to the Docker daemon`                                          | Docker Desktop を起動する（macOS: `open -a Docker`）                                                                                          |
| `port is already allocated`（8080/8081/35729）                                 | 既存のコンテナを `docker compose down` / `docker compose -f docker-compose.prod.yml down` で停止、または compose ファイルの `ports` を変更    |
| `Permission denied ... .jekyll-cache`                                          | [Dockerfile](Dockerfile) と [docker-compose.yml](docker-compose.yml) のコメントに従い、非 root ユーザを有効化                                 |
| Gemfile / Dockerfile を変えたのに反映されない                                  | `docker compose up --build`（本番同等は `-f docker-compose.prod.yml up --build`）                                                             |
| 変更がブラウザに反映されない                                                   | 強制リロード（Cmd+Shift+R）。`_config.yml` の変更は自動再起動を待つ                                                                           |
| ビルドログの `Conflict: The following destination is shared by multiple files` | 同名で拡張子違いの画像が `assets/img/` にある（[6章 #4](#6-既知の注意点未整備事項)）                                                          |
| GitHub 上でデプロイが失敗した                                                  | Actions タブで `Deploy site` のログを確認。ローカルで `docker compose -f docker-compose.prod.yml up --build` を実行すると同じ手順で再現できる |
