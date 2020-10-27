# 事前課題：Bacefook

以前の課題で、HTML と CSS を使ってモックアップを再作成し、JavaScript を使用してアルゴリズムの問題を解きました。

今回の課題では、今まで学習したすべてのスキルを組み合わせて、**Bacefook** というソーシャルメディアアプリを作成します。👨‍📚

> 注意: この課題では Node を使ってはいけません! 次の課題で Node について学びますが、そこでなぜ Node を使っても Bacefook が動作しないのかを説明します。

## Objectives - 目的

- クエリセレクタを使用して DOM 要素の参照（reference）を取得する。
- コールバックをイベントハンドラとして登録する。
- ローカルストレージにアイテムを保存 💾 したり、アイテムをロードする。
- DOM に対して、要素を作成し、属性を設定し、それらを DOM に追加する。
- moment.js を使用して、タイムスタンプをフォーマットする ⏱。
- 初期化後に window.onload() を使用してコードを実行する。

## Background - バックグラウンド

すでにいくつかのコードが書かれています：

- `data_generator.js` - 投稿データの作成をシミュレートします。
- `app.js` - フィード内のデータを表示します。

みなさんは、`app.js` ファイルにコードを書くことになります。`data_generator.js` ファイルには、私たちが書いたコードが含まれていますが、以下にその機能の概要を示します。

`bacefook` と `friends` という 2 つのグローバル変数が (`window` オブジェクト内に) あります。（これらはグローバルなので、`app.js` ファイルからアクセスできます。）
* `friends` は、Bacefook にいる友人の名前（文字列）からなる配列です。
* `bacefook` 変数は `friends` と `newsfeed` の 2 つのプロパティを持つオブジェクトです。 
    * `newsfeed` は Bacefook の投稿（post）に関するオブジェクトからなる配列です。それぞれの投稿（post）オブジェクトは、`friend`、`text`、`feeling`、`link`、`image`、および `timestamp` を持つオブジェクトです。
    * `friends` 👭👫 は、キーとしてすべての友達の名前と、その友達に属するさまざまな投稿を含むオブジェクトです。

投稿（post）オブジェクトが作成されると、投稿の内容（オブジェクト）が `bacefook.newsfeed` の配列と friend の配列にそれぞれ追加されます。したがって、Kani が '作成' した投稿（post）オブジェクトは、あなたの Bacefook と `bacefook.friends.kani` の配列にそれぞれ追加されます。

また、`data_generator.js` の `scheduler` 関数は、ページが表示されたタイミングでプロセスを開始し、ニュースフィードにデータを定期的に追加します。

## Basic Requirements - 基礎レベル

**注意** 🐱 このリポジトリは mia によるテストはありません。プルリクエストを行っても自動でマージされません。 🐱

**この演習では jQuery を使用しないでください。**

まず、Chrome で `index.html` を開いて、投稿（post）が表示 👀 できていることを確認しましょう。

- [ ] これらのメソッドについて読んでください。全てのメソッドを使用しないかもしれませんが、知っておくと役に立つでしょう。

    - [myButton.addEventListener(“click”, myFunction);](https://developer.mozilla.org/ja/docs/Web/API/EventTarget/addEventListener)

    - [document.createElement(“div”)](
    https://developer.mozilla.org/ja/docs/Web/API/Document/createElement)

    - [document.getElementById(id)](https://developer.mozilla.org/ja/docs/Web/API/Document/getElementById)

    - [document.querySelector(selector)](https://developer.mozilla.org/ja/docs/Web/API/Document/querySelector)

    - [parent.append(child);](https://developer.mozilla.org/ja/docs/Web/API/ParentNode/append)

    - [myDiv.innerHTML = “Hi!”](https://developer.mozilla.org/ja/docs/Web/API/Element/innerHTML)

    - [setTimeout(functionName, number of milliseconds to wait before calling it)](https://developer.mozilla.org/ja/docs/Web/API/WindowOrWorkerGlobalScope/setTimeout)

    - [setInterval(functionName, number of milliseconds to wait between calling it)](https://developer.mozilla.org/ja/docs/Web/API/Window/setInterval)

- [ ] `app.js` と `data_generator.js` に書いてあるコードを読んでください。 
    - [ ] これらのファイルのコードが何をしているかを確認してください。
    - [ ] 分からないことがあれば調べましょう！
- [ ] `scheduler` によって生成された新しい Bacefook への投稿を表示しましょう。以下のどちらかの方法で実装しましょう：
    - [ ] 投稿作成時に新しい投稿を自動的に表示する
    - [ ] もしくは、新しい投稿を表示するための更新ボタンを追加する
- [ ] 投稿が作成されたときのタイムスタンプを表示しましょう。
- [ ] 投稿に対する '気持ち（feeling）' を表示しましょう。
- [ ] 作成された投稿に画像を追加して表示しましょう。
    - 画像を格納するフォルダと、`images` という空の配列の変数は作成済です。
- [ ] `css` ファイルを追加してページのスタイルを整え、見た目を改善しましょう。 
    - ただし、スタイルをインライン HTML に含めないでください。
- [ ] あなたのスクリプトに `moment.js` [code](https://momentjs.com/) を含めてください。
    - 'Install' の指示は無視してください。
    - 'download' の指示に沿って使用してください。
    - Locales は使用しませんので、moment.js をダウンロードしてください。
- [ ] `moment.js` を使って、投稿がいつ作成されたのか、ユーザフレンドリーな時刻表示を試してみましょう。（例："posted 5 minutes ago" など）
- [ ] フォームを追加して、ユーザーが自分の投稿を追加できるようにしましょう。
    - ユーザーが自分の画像をアップロードできるようにする必要はありません。
- [ ] `app.js` のトップに、`localStorage` に保存されているユーザー名があるかどうかを確認する処理があります。ページのどこかにユーザー名を表示しましょう。

## Advanced Requirements - 応用レベル

- [ ] これを実際の Facebook のニュースフィードにできるだけ近づけてみましょう。
