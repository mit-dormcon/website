import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";
import rexItems from "./docs/rex/sidebar";

const sidebars: SidebarsConfig = {
    docs: [
        "about",
        "funding",
        "meetings",
        "officers",
        "voting-members",
        // "about/elections",
        "archive",
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
                slug: "/rex",
            },
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            items: rexItems,
        },
    ],
};

export default sidebars;
