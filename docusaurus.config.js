/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
  title: 'DormCon',
  tagline: 'MIT\'s Dormitory Council',
  url: 'https://dormcon.mit.edu',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  themeConfig: {
    navbar: {
      title: 'MIT DormCon',
      hideOnScroll: true,
      items: [
        {
          to: 'about',
          activeBasePath: 'about',
          label: 'About',
          position: 'left',
        },
        {
          to: 'piazza',
          label: 'Piazza',
          position: 'left'
        },
        // {to: 'blog', label: 'Blog', position: 'left'},
        {
          href: 'http://web.mit.edu/dormcon/index.old.shtml',
          label: 'Old Site',
          position: 'right',
        },
      ],
    },
    footer: {
      links: [
        {
          title: 'Community',
          items: [
            {
              label: 'MIT Housing',
              href: 'https://studentlife.mit.edu/housing'
            },
            {
              label: 'MIT Guide to Residences',
              href: 'https://mitguidetoresidences.mit.edu/'
            }
          ],
        },
        {
          title: 'Friends',
          items: [
            {
              label: 'UA',
              href: 'https://ua.mit.edu/',
            },
            {
              label: 'IFC',
              href: 'https://www.mitifc.com/',
            },
            {
              label: 'Panhel',
              href: 'https://www.panhel.mit.edu/',
            },
            {
              label: 'LGC',
              href: 'http://lgc.mit.edu/',
            },
            {
              label: 'GSC',
              href: 'https://gsc.mit.edu/'
            }
          ],
        },
        {
          title: "Social",
          items: [
            {
              label: 'Twitter',
              href: 'https://twitter.com/MITDormCon'
            },
            {
              label: 'Instagram',
              href: 'https://www.instagram.com/mit_dormcon/'
            }
          ]
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} MIT DormCon. Built with Docusaurus.`,
    },
    colorMode: {
      respectPrefersColorScheme: true
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          routeBasePath: '/about'
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          editUrl:
            'https://github.com/mit-dormcon/website/edit/master/blog/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
        gtag: {
          trackingID: 'G-XBL1BVV0JB',
        },
      },
    ],
  ],
};
