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
            ],
            '/about/': [
              '',
              ['profile', 'Profile']
            ]
          }
    }
}