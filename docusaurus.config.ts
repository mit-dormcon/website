import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";
import type * as Plugin from "@docusaurus/types/src/plugin";
import type * as OpenApiPlugin from "docusaurus-plugin-openapi-docs";
import { Temporal } from "@js-temporal/polyfill";

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
    markdown: {
        mdx1Compat: {
            comments: false,
            admonitions: false,
            headingIds: false,
        },
    },
    themeConfig: {
        announcementBar: {
            id: "rex_2025",
            backgroundColor: "var(--ifm-color-primary-contrast-background)",
            textColor: "var(--ifm-color-primary-contrast-foreground)",
            content: `<strong>🥳 <a href='/rex'>REX 2025</a> is happening soon! 🎉</strong>`,
        },
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
                                label: "Budget and Event Funding",
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
                    href: "https://join-dormspam.mit.edu",
                    label: "Join Dormspam!",
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
                    title: "Resources",
                    items: [
                        {
                            label: "MIT Living Communities",
                            href: "https://studentlife.mit.edu/living-communities/",
                        },
                        {
                            label: "MIT Guide to Residences",
                            href: "https://mitguidetoresidences.mit.edu/",
                        },
                        {
                            label: "Housing Portal (Starrez)",
                            href: "https://mit.starrezhousing.com/StarRezPortalX/",
                        },
                        {
                            label: "Housing Policies",
                            href: "https://studentlife.mit.edu/policies-and-resources/housing-policies/",
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
                            href: "https://www.mitpanhel.com/",
                        },
                        {
                            label: "LGC",
                            href: "https://lgc.mit.edu/",
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
            copyright: `Copyright © ${Temporal.Now.plainDateISO().year} MIT DormCon. Built with Docusaurus.`,
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
                    sidebarCollapsible: true,
                    sidebarPath: "./sidebars.ts",
                    docItemComponent: "@theme/ApiItem",
                    routeBasePath: "/",
                },
                blog: false,
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
    future: {
        experimental_faster: true,
        v4: true,
    },
};

export default config;
