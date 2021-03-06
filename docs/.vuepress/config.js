module.exports = {
    title: 'TechTalk.',
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
        ['link', { rel: 'icon', type: 'image/png', href: '/favicon.png' }],
        ['link', { rel: 'manifest', href: '/manifest.json' }],
    ],
    port: 9999,
    ga: 'UA-113488529-3',
    base: '/',
    serviceWorker: true,
    themeConfig: {
        repo: 'nakanakamu0828/techtalk',
        nav: [
            { text: 'Home', link: '/' },
            { text: 'Blog', link: '/blog/' },
            { text: 'Tech Diary', link: '/diary/' },
            { text: 'Tags', link: '/tags/' },
            { text: 'About', link: 'https://nakamu.life/' },
        ],
        sidebar: {
            '/blog/': [
                '',
                ['2018-05-02-vupress_customize_layout', 'VuePressのレイアウトをカスタマイズ'],
                ['2018-04-28-start_vupress', 'VuePressを始める']
              ],
            '/diary/': [
                '',
                ['2018-08-02', '2018/08/02'],
                ['2018-08-01', '2018/08/01'],
                ['2018-07-31', '2018/07/31'],
                ['2018-07-29', '2018/07/29'],
                ['2018-07-28', '2018/07/28'],
                ['2018-07-26', '2018/07/26'],
                ['2018-07-25', '2018/07/25'],
                ['2018-07-08', '2018/07/08'],
                ['2018-07-06', '2018/07/06'],
                ['2018-07-05', '2018/07/05'],
                ['2018-07-04', '2018/07/04'],
            ],
            '/tags/': [
                ['android', 'Android'],
                ['git', 'Git'],
                ['infra', 'Infra'],
                ['javascript', 'javascript'],
                ['php', 'PHP'],
                ['ruby', 'Ruby'],
            ]
          }
    },
    markdown: {
        config: md => {
          md.use(require('markdown-it-hashtag'))
          md.renderer.rules.hashtag_open  = (tokens, idx) => {
            const tagName = tokens[idx].content.toLowerCase();
            return '<router-link to="/tags/' + tagName + '.html"class="tag is-outline is-rounded">';
          }
          md.renderer.rules.hashtag_close = () => {
            return '</router-link>';
          }
        }
    }
}