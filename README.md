# New Dormcon Website

[Cameron Kleiman](https://github.com/camtheman256), Dormcon Tech Chair Spring 2021

This website is built using [Docusaurus 2](https://docusaurus.io/), a modern static website generator based on React using [Infima](https://infima.dev) for UI. Visit docusaurus.io for complete documentation of how the site works.

## Folder structure

- `.github/workflows` - Automated build and deploy scripts the site. Pushing to master automatically deploys the site (and changes go live!) to GitHub Pages.
- `components` - React components for displaying dynamic data, like the list of officers or list of meetings
- `data` - JS files containing data such as a list of meetings, voting members, and officers.
- `docs` - Markdown files that are automatically rendered into pages under `/about/<page-id>`. These pages are rendered by the Docs plugin and can have a sidebar if you want. The About section is an example of this. See the docs on [Docs](https://docusaurus.io/docs/docs-introduction).
- `src/pages` - Markdown, MDX, or React components (JS) put in this directory will get rendered into pages automatically. See the docs on [Pages](https://docusaurus.io/docs/creating-pages).
- `src/css` - Where global CSS files live.
- `static` - Where static files (images, pdfs, anything that's not CSS) lives. See the docs on [Static Assets](https://docusaurus.io/docs/static-assets)
- `docusaurus.config.js` - Big configuration object that controls many aspects of the site, like the navbar, footer, and plugins. See the docs on [Configuration](https://docusaurus.io/docs/configuration).
- `sidebars.js` - Sidebars for pages in the `docs` folder. There's lots of ways to configure sidebars, so see the docs on [Sidebars](https://docusaurus.io/docs/sidebar).

## Installation

```console
yarn install
```

## Local Development

```console
yarn start
```

This command starts a local development server and open up a browser window. Most changes are reflected live without having to restart the server.

## Build

```console
yarn build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.