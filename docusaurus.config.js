/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
  title: 'Dormcon',
  tagline: 'MIT\'s Dormitory Council',
  url: 'https://dormcon.camk.co',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  themeConfig: {
    navbar: {
      title: 'MIT Dormcon',
      items: [
        {
          to: 'about',
          activeBasePath: 'about',
          label: 'About',
          position: 'left',
        },
        {to: 'blog', label: 'Blog', position: 'left'},
        {
          href: 'https://github.com/camtheman256/dormcon-website',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      links: [
        {
          title: 'About',
          items: [
            {
              label: 'About Dormcon',
              to: 'about',
            },
          ],
        },
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
          title: 'More',
          items: [
            {
              label: 'Blog',
              to: 'blog',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/camtheman256/dormcon-website',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} MIT Dormcon. Built with Docusaurus.`,
    },
    announcementBar: {
      id: "hello_bar",
      content: "Hello! This site is currently under development."
    }
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          editUrl:
            'https://github.com/camtheman256/dormcon-website/edit/master/',
          routeBasePath: '/about'
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          editUrl:
            'https://github.com/camtheman256/dormcon-website/edit/master/website/blog/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};
