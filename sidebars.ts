import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";
import rexItems from "./docs/rex/api/sidebar";

const sidebars: SidebarsConfig = {
    about: [
        "about/index",
        "about/funding",
        "about/meetings",
        "about/officers",
        "about/voting-members",
        // "about/elections",
        "about/archive",
    ],
    rex: [
        {
            type: "category",
            label: "REX API",
            link: {
                type: "generated-index",
                title: "REX API",
                description:
                    "Automatically generated documentation for the REX API. Click below to see various aspects of the API.",
                slug: "/rex/api",
            },
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            items: rexItems,
        },
    ],
};

export default sidebars;
