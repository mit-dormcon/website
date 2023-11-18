import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";

const config: Config = {
    title: "DormCon",
    tagline: "MIT's Dormitory Council",
    url: "https://dormcon.mit.edu",
    baseUrl: "/",
    onBrokenLinks: "throw",
    onBrokenMarkdownLinks: "warn",
    favicon: "img/favicon.ico",
    markdown: {
        mdx1Compat: {
            comments: false,
            admonitions: false,
            headingIds: false,
        },
    },
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
                // {
                //     type: "custom-dropdown",
                //     dropdownProps: {
                //         type: "dropdown",
                //         label: "About",
                //         items: [
                //             {
                //                 type: "doc",
                //                 label: "About DormCon",
                //                 docId: "about",
                //             },
                //             {
                //                 type: "doc",
                //                 label: "Event Funding",
                //                 docId: "funding",
                //             },
                //             {
                //                 type: "doc",
                //                 label: "Meetings",
                //                 docId: "meetings",
                //             },
                //             {
                //                 type: "doc",
                //                 label: "Officers",
                //                 docId: "officers",
                //             },
                //             {
                //                 type: "doc",
                //                 label: "Voting Members",
                //                 docId: "voting-members",
                //             },
                //             {
                //                 type: "doc",
                //                 label: "Elections",
                //                 docId: "elections",
                //             },
                //             {
                //                 type: "doc",
                //                 label: "Archive",
                //                 docId: "archive",
                //             },
                //         ],
                //         to: "about",
                //         position: "left",
                //     },
                //     linkProps: {
                //         to: "about",
                //         label: "About",
                //         position: "left",
                //     },
                //     specialPage: "about",
                // },
                // {
                //     to: "about",
                //     label: "About",
                //     position: "left",
                // },
                {
                    type: "dropdown",
                    label: "About",
                    items: [
                        {
                            type: "doc",
                            label: "About DormCon",
                            docId: "about",
                        },
                        {
                            type: "doc",
                            label: "Event Funding",
                            docId: "funding",
                        },
                        {
                            type: "doc",
                            label: "Meetings",
                            docId: "meetings",
                        },
                        {
                            type: "doc",
                            label: "Officers",
                            docId: "officers",
                        },
                        {
                            type: "doc",
                            label: "Voting Members",
                            docId: "voting-members",
                        },
                        {
                            type: "doc",
                            label: "Elections",
                            docId: "elections",
                        },
                        {
                            type: "doc",
                            label: "Archive",
                            docId: "archive",
                        },
                    ],
                    to: "about",
                    position: "left",
                },
                {
                    to: "piazza",
                    label: "Piazza",
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
            copyright: `Copyright © ${new Date().getFullYear()} MIT DormCon. Built with Docusaurus.`,
        },
        colorMode: {
            respectPrefersColorScheme: true,
        },
    } satisfies Preset.ThemeConfig,
    presets: [
        [
            "classic",
            {
                docs: {
                    sidebarPath: require.resolve("./sidebars.js"),
                    routeBasePath: "/about",
                },
                blog: {
                    showReadingTime: true,
                    // Please change this to your repo.
                    editUrl:
                        "https://github.com/mit-dormcon/website/edit/master/blog/",
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
};

export default config;
