module.exports = {
    title: 'TechTalk.',
    description: '世界を旅して暮らしたい放浪エンジニア日誌',
    meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' }
    ],
    head: [
        ['link', { rel: 'icon', type: 'image/png', href: '/favicon.png' }],
    ],
    port: 9999,
    base: '/',
    serviceWorker: true,
    themeConfig: {
        nav: [
            { text: 'Home', link: '/' },
            { text: 'Blog', link: '/blog/' },
            { text: 'Tech Diary', link: '/diary/' },
            { text: 'About', link: '/about/' },
        ],
        sidebar: {
            '/blog/': [
                '',
              ],
            '/diary/': [
                '',
                ['2018-04-26', '2018/04/26'],
                ['2018-04-25', '2018/04/25'],
                ['2018-04-24', '2018/04/24'],
                ['2018-04-23', '2018/04/23'],
                ['2018-04-20', '2018/04/20'],
                ['2018-04-19', '2018/04/19'],
                ['2018-04-18', '2018/04/18'],
                ['2018-04-17', '2018/04/17'],
            ],
            '/about/': [
              '',
              ['profile', 'Profile']
            ],
            '/tags/': [
                ['aws', 'AWS'],
                ['docker', 'Docker'],
                ['ec2', 'EC2'],
                ['kaminari', 'Kaminari'],
                ['nodejs', 'Node.js'],
                ['ruby', 'Ruby'],
                ['rubyonrails', 'RubyOnRails'],
                ['vue', 'Vue'],
                ['vuepress', 'VuePress'],
                ['sorcery', 'Sorcery'],
            ]
          }
    },
    markdown: {
        config: md => {
          md.use(require('markdown-it-hashtag'))
          md.renderer.rules.hashtag_open  = (tokens, idx) => {
            const tagName = tokens[idx].content.toLowerCase();
            return '<router-link to="/tags/' + tagName + '.html"class="tag">';
          }
          md.renderer.rules.hashtag_close = () => {
            return '</router-link>';
          }
        }
    }
}