# Claude Code への移行手順(Windows版)

このファイルの通りに上から順に進めれば移行できます。
所要時間は30分〜1時間ほどです。

---

## 事前の確認

### 必要なもの
- Windows 10 (1809以降) または Windows 11
- **Claude の有料プラン**(Pro / Max / Team / Enterprise のいずれか)
  → 無料プランでは Claude Code は使えません
- インターネット接続

Node.js は**不要**です。

---

## 手順1 — PowerShell を開く

1. キーボードの **Windowsキー** を押す
2. `powershell` と入力
3. 「Windows PowerShell」を選んで Enter

黒い(または青い)画面が開き、`PS C:\Users\あなたの名前>` と表示されます。

> **PowerShell と CMD の見分け方**
> 行の先頭に `PS` が付いていれば PowerShell です。
> 付いていなければ CMD なので、手順1をやり直してください。

---

## 手順2 — Claude Code をインストール

PowerShell に、次の1行をコピーして貼り付け、Enter を押します。

```powershell
irm https://claude.ai/install.ps1 | iex
```

> **貼り付け方**: PowerShell の画面上で**右クリック**すると貼り付けられます。
> Ctrl+V でも大丈夫です。

インストールが終わるまで1〜3分ほど待ちます。

### 確認

```powershell
claude --version
```

`2.1.211 (Claude Code)` のようにバージョン番号が表示されれば成功です。

> **`command not found` と出た場合**
> PowerShell を一度閉じて、開き直してから再度試してください。
> それでも駄目なら、手順6のトラブル対応をご覧ください。

---

## 手順3 — Git for Windows を入れる(推奨)

必須ではありませんが、入れておくと Claude Code ができることが増えます。
また、後述する「変更履歴を残す」機能にも必要です。

1. https://git-scm.com/downloads/win を開く
2. 「64-bit Git for Windows Setup」をダウンロード
3. インストーラーを実行する
   → 設定はすべて**初期値のまま「Next」を押し続けて構いません**

---

## 手順4 — サイトのファイルを置く

1. これまでお渡ししている **switch-it-site.zip を解凍**します
2. 解凍してできた `switch-it-site` フォルダを、分かりやすい場所に移動します

おすすめの置き場所:
```
C:\Users\あなたの名前\Documents\switch-it-site
```

> **注意**: OneDrive の同期フォルダ内に置くと、動作が不安定になることがあります。
> Documents フォルダが OneDrive 配下になっている場合は、
> `C:\projects\switch-it-site` のような別の場所に置くと安心です。

---

## 手順5 — Claude Code を起動する

### フォルダに移動する

PowerShell で、次のように打ちます(パスはご自身の置き場所に合わせてください)。

```powershell
cd C:\Users\あなたの名前\Documents\switch-it-site
```

> **楽な方法**: エクスプローラーで `switch-it-site` フォルダを開き、
> アドレスバーに `powershell` と打って Enter すると、
> そのフォルダの場所で PowerShell が開きます。

### 起動する

```powershell
claude
```

初回は、ブラウザが開いてログインを求められます。
普段 Claude を使っているアカウントでログインしてください。

ログインが終わると、ターミナル上で対話が始まります。
ここからは、**今までと同じように日本語で話しかけるだけ**です。

---

## 手順6 — 最初にやること

Claude Code が起動したら、次のように打ってみてください。

```
PROJECT.md を読んで、このサイトの現状を教えてください
```

引き継ぎメモを読み込んで、これまでの経緯を把握してくれます。
ここまでできれば移行は完了です。

---

## 変更履歴を残す(推奨・任意)

Git を使うと「昨日の状態に戻す」ができるようになります。
デザインを試行錯誤するときの安心材料になるので、設定しておくことをおすすめします。

Claude Code の中で、こう頼めば設定してくれます。

```
このフォルダで Git を使えるようにして、今の状態を記録してください
```

以降は、作業の区切りごとに

```
ここまでの変更を記録してください
```

と頼めば、その時点の状態が保存されます。
戻したくなったら「昨日の状態に戻して」と頼めば戻せます。

---

## よく使う操作

| やりたいこと | 打つこと |
|---|---|
| Claude Code を終了する | `/exit` または Ctrl+C を2回 |
| 会話をリセットする | `/clear` |
| 今の設定を確認する | `/status` |
| 使えるコマンドを見る | `/help` |
| 表示を確認する(ローカル) | `python3 -m http.server 8000` と頼む |

---

## トラブル対応

### `claude` が見つからないと言われる
1. PowerShell を閉じて開き直す
2. それでも駄目なら、次を実行して診断する
   ```powershell
   claude doctor
   ```

### インストールで `The token '&&' is not a valid statement separator` と出た
CMD 用のコマンドを PowerShell で実行しています。
手順2の `irm https://claude.ai/install.ps1 | iex` を使ってください。

### ログインできない
無料プランではないか確認してください。
Claude Code には Pro 以上のプランが必要です。

### その他
公式のトラブル対応ページ:
https://code.claude.com/docs/en/troubleshoot-install

---

## 移行後の作業予定

1. 残り8作品の追加(Creemaに全23作品、現在15点掲載)
2. minne・iichi のリンクを実際のURLに
3. Instagram・メールアドレスの確認
4. about.html に工房・道具の写真を追加
5. ドメイン取得(switch-it-leather.com)
6. Cloudflare Pages で公開

詳しくは `PROJECT.md` の8章をご覧ください。
