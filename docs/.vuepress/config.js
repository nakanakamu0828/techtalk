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
            { text: 'About', link: '/about/' },
        ],
        sidebar: {
            '/blog/': [
                '',
                ['2018-05-02-vupress_customize_layout', 'VuePressのレイアウトをカスタマイズ'],
                ['2018-04-28-start_vupress', 'VuePressを始める']
              ],
            '/diary/': [
                '',
                ['2018-07-06', '2018/07/06'],
                ['2018-07-05', '2018/07/05'],
                ['2018-07-04', '2018/07/04'],
            ],
            '/about/': [
              '',
              ['profile', 'Profile']
            ],
            '/tags/': [
                ['adb', 'adb'],
                ['android', 'Android'],
                ['aws', 'AWS'],
                ['docker', 'Docker'],
                ['ec2', 'EC2'],
                ['git', 'Git'],
                ['infra', 'Infra'],
                ['javascript', 'javascript'],
                ['jquery', 'jquery'],
                ['kaminari', 'Kaminari'],
                ['laravel', 'Laravel'],
                ['nginx', 'nginx'],
                ['nodejs', 'Node.js'],
                ['npm', 'NPM'],
                ['nuxtjs', 'Nuxt.js'],
                ['php', 'PHP'],
                ['ruby', 'Ruby'],
                ['rubyonrails', 'RubyOnRails'],
                ['sakura', 'Sakura'],
                ['shell', 'Sell'],
                ['sorcery', 'Sorcery'],
                ['vue', 'Vue'],
                ['vuepress', 'VuePress'],
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