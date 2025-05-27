import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";
import type * as Plugin from "@docusaurus/types/src/plugin";
import type * as OpenApiPlugin from "docusaurus-plugin-openapi-docs";

const config: Config = {
    title: "DormCon",
    tagline: "Welcome to MIT's Dormitory Council!",
    url: "https://dormcon.mit.edu",
    baseUrl: "/",
    onBrokenLinks: "throw",
    onBrokenMarkdownLinks: "warn",
    favicon: "img/favicon.ico",
    organizationName: "mit-dormcon",
    projectName: "website",
    trailingSlash: false,
    themeConfig: {
        navbar: {
            title: "MIT DormCon",
            hideOnScroll: true,
            logo: {
                alt: "Site Logo",
                src: "img/dormcon-logo.png",
                width: 32,
                height: 32,
            },
            items: [
                {
                    type: "custom-dropdown",
                    dropdownProps: {
                        type: "dropdown",
                        label: "About",
                        items: [
                            {
                                type: "doc",
                                label: "About DormCon",
                                docId: "about/index",
                            },
                            {
                                type: "doc",
                                label: "Event Funding",
                                docId: "about/funding",
                            },
                            {
                                type: "doc",
                                label: "Meetings",
                                docId: "about/meetings",
                            },
                            {
                                type: "doc",
                                label: "Officers",
                                docId: "about/officers",
                            },
                            {
                                type: "doc",
                                label: "Voting Members",
                                docId: "about/voting-members",
                            },
                            // {
                            //     type: "doc",
                            //     label: "Elections",
                            //     docId: "about/elections",
                            // },
                            {
                                type: "doc",
                                label: "Archive",
                                docId: "about/archive",
                            },
                        ],
                        to: "about",
                        position: "left",
                    },
                    linkProps: {
                        to: "about",
                        label: "About",
                        position: "left",
                    },
                    specialPage: "about",
                },
                {
                    to: "resources",
                    label: "Resources",
                    position: "left",
                },
                {
                    to: "rex",
                    label: "REX",
                    position: "left",
                },
                {
                    href: "http://web.mit.edu/dormcon/index.old.shtml",
                    label: "Old Site",
                    position: "right",
                },
            ],
        },
        footer: {
            links: [
                {
                    title: "Community",
                    items: [
                        {
                            label: "MIT Housing",
                            href: "https://studentlife.mit.edu/housing",
                        },
                        {
                            label: "MIT Guide to Residences",
                            href: "https://mitguidetoresidences.mit.edu/",
                        },
                    ],
                },
                {
                    title: "Friends",
                    items: [
                        {
                            label: "UA",
                            href: "https://ua.mit.edu/",
                        },
                        {
                            label: "IFC",
                            href: "https://www.mitifc.com/",
                        },
                        {
                            label: "Panhel",
                            href: "https://www.panhel.mit.edu/",
                        },
                        {
                            label: "LGC",
                            href: "http://lgc.mit.edu/",
                        },
                        {
                            label: "GSC",
                            href: "https://gsc.mit.edu/",
                        },
                    ],
                },
                {
                    title: "Social",
                    items: [
                        {
                            label: "Twitter",
                            href: "https://twitter.com/MITDormCon",
                        },
                        {
                            label: "Instagram",
                            href: "https://www.instagram.com/mit_dormcon/",
                        },
                    ],
                },
            ],
            copyright: `Copyright © ${new Date().getFullYear().toString()} MIT DormCon. Built with Docusaurus.`,
        },
        colorMode: {
            respectPrefersColorScheme: true,
        },
        blog: {
            sidebar: {
                groupByYear: false,
            },
        },
    } satisfies Preset.ThemeConfig,
    presets: [
        [
            "classic",
            {
                docs: {
                    sidebarCollapsible: true,
                    sidebarPath: "./sidebars.ts",
                    docItemComponent: "@theme/ApiItem",
                    routeBasePath: "/",
                },
                blog: {
                    path: "resources",
                    editUrl: ({ blogDirPath, blogPath }) =>
                        `https://github.com/mit-dormcon/website/edit/main/${blogDirPath}/${blogPath}`,
                    blogTitle: "DormCon Resources",
                    blogDescription:
                        "Resources for dorm execs and dormitory life at MIT",
                    blogSidebarTitle: "Resources",
                    routeBasePath: "resources",
                    include: ["**/*.{md,mdx}"],
                    exclude: [
                        "**/_*.{js,jsx,ts,tsx,md,mdx}",
                        "**/_*/**",
                        "**/*.test.{js,jsx,ts,tsx}",
                        "**/__tests__/**",
                    ],
                    truncateMarker: /<!--\s*(truncate)\s*-->/,
                },
                theme: {
                    customCss: require.resolve("./src/css/custom.css"),
                },
                gtag: {
                    trackingID: "G-XBL1BVV0JB",
                },
            } satisfies Preset.Options,
        ],
    ],
    plugins: [
        [
            "docusaurus-plugin-openapi-docs",
            {
                id: "api", // plugin id
                docsPluginId: "classic", // configured for preset-classic
                config: {
                    rex: {
                        specPath: "http://rex.mit.edu/openapi.yaml",
                        outputDir: "docs/rex/api",
                        sidebarOptions: {
                            groupPathsBy: "tag",
                            categoryLinkSource: "auto",
                        },
                        showSchemas: true,
                    } satisfies OpenApiPlugin.Options,
                },
            } satisfies Plugin.PluginOptions,
        ],
    ],
    themes: ["docusaurus-theme-openapi-docs"],
};

export default config;
