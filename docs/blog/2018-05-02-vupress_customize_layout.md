---
meta:
  - name: description
    content: VuePressのレイアウトを独自のものにカスタマイズしたい場合の手順を簡単にまとめます
  - name: keywords
    content: vue vuepress
date: '2018/05/02 13:00'
image: '/uploads/screen_vuepress_site.png'
footer: Copyright © 2018 nakanakamu0828
---
# VuePressのレイアウトをカスタマイズ
#vue #vuepress
![VuePress](/uploads/screen_vuepress_site.png)

## はじめに
おさらいとして、新しいVuePressのPJを作成しましょう。

```sh
$ mkdir -p custom-layout-vuepress
$ cd custom-layout-vuepress
$ npm install -D vuepress
$ mkdir -p docs
$ echo '# Hello VuePress' > docs/README.md
```

ここまでは公式ドキュメントと同じですね。

[VuePress > Inside an Existing Project](https://vuepress.vuejs.org/guide/getting-started.html#inside-an-existing-project)


package.jsonは以下のような形で作成します。  
`Inside an Existing Project`にも記載がありますが、`scripts`に`docs:dev`、`docs:build`を用意します。
```
{
  "name": "custom-layout-vuepress",
  "version": "1.0.0",
  "description": "customize layout for vuepress",
  "author": "yuuki.nakamura.0828@gmail.com",
  "scripts": {
    "docs:dev": "vuepress dev docs",
    "docs:build": "vuepress build docs"
  },
  "devDependencies": {
    "vuepress": "^0.8.4"
  }
}

```

それでは起動
```sh
$ npm run docs:dev
```

[http://localhost:8080/](http://localhost:8080/) 開くと以下のような画面が表示されます。

![VuePress](/uploads/screen_vuepress_default.png)

開発モードでの起動は、ファイルを修正した際に自動でロードし直してくれるので、ブラウザどエディタを行き来しながらサクサクドキュメントを書けるのが嬉しいですね。  
ここまでの一覧の流れは、VuePress公式サイトの[Getting Started](https://vuepress.vuejs.org/guide/getting-started.html)と同様です。

続いて、`.vuepress/config.js`による設定です。  
今回は最終的には以下のような設定ファイルにしました。

```sh
$ mkdir -p docs/.vuepress/
$ touch docs/.vuepress/config.js
```

```javascript
module.exports = {
    title: 'VLC',
    description: 'VuePressのレイアウトをカスタマイズしてみる',
    locales: {
        '/': {
          lang: 'ja'
        }
    },
    meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'theme-color', content: '#3eaf7c' }
    ],
    head: [
        ['link', { rel: 'icon', type: 'image/png', href: '/favicon.png' }]
    ],
    port: 8080,
    base: '/',
    serviceWorker: false,
    themeConfig: {
        repo: 'nakanakamu0828/custom-layout-vuepress',
        nav: [
            { text: 'Home', link: '/' },
            { text: 'Blog', link: '/blog/' }
        ],
        sidebar: {
            '/blog/': [
                ''
              ],
        }
    }
}
```

VuePress公式サイトの[Configuration](https://vuepress.vuejs.org/guide/basic-config.html#configuration)をご確認ください。


## レイアウト変更

VuePress公式サイトの[Custom Themes](https://vuepress.vuejs.org/guide/custom-themes.html#custom-themes)を参考に進めていきます。

### デフォルトThemeをファイル出力
以下のディレクトリ構成でデフォルトのThemeを出力し、カスタマイズしていきます。
```
.
└─ .vuepress
   └─ theme
      └─ Layout.vue
```

出力するためのコマンドは以下のようになります。  
今回は`docs`配下がVuePressのドキュメント構成になります。
```sh
$ vuepress eject docs
```

以下のように`docs/.vuepress/theme`フォルダ内にファイルが生成されます。

![VuePress](/uploads/scree_vuepress_default_theme_dirs.png)


基本となるディレクトリ・ファイル達

* Layout.vue : ベースになるレイアウトファイル
* Home.vue : `layout: home`画面のレイアウト
* Page.vue : `layout: page`画面のレイアウト
* stylesディレクトリ : デフォルトThemeのスタイル（書式は`Stylus`で記載）


`theme`ディレクトリ内のファイルを変更することで、カスタマイズできます。  
今後はWebデザイナーの方々がカスタマイズした`theme`をnpm化して提供してくれそうですね！

今回は修正したファイル・修正箇所の紹介はしませんが、気になる方はgithubにソースをアップしていますのでご確認ください。
以下のような画面に変更しています。  

![VuePress](/uploads/screen_vuepress_custom_1.png)
![VuePress](/uploads/screen_vuepress_custom_2.png)


### デモ
今回の修正は以下のリンクからデモ画面が見れます。

[デモページ](https://compassionate-hopper-f8ede8.netlify.com/)

※ Netlifyを活用しています。

Githubにソースをアップしています。  
ファイルを確認したい方はこちらをご覧ください。

[nakanakamu0828/custom-layout-vuepress](https://github.com/nakanakamu0828/custom-layout-vuepress)

## 最後に
前回に続いてVuePressについての記事になりました。  
ブログベースのUIにカスタマイズしましたが、VuePressのブログ機能が楽しみです。
