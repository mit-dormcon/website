import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebar: SidebarsConfig = {
    apisidebar: [
        {
            type: "doc",
            id: "rex/api/t-rex",
        },
        {
            type: "category",
            label: "Raw Data",
            link: {
                type: "generated-index",
                title: "Raw Data",
                slug: "/category/rex/api/raw-data",
            },
            items: [
                {
                    type: "doc",
                    id: "rex/api/all-rex-event-data",
                    label: "All REX event data",
                    className: "api-method get",
                },
            ],
        },
        {
            type: "category",
            label: "Schemas",
            items: [
                {
                    type: "doc",
                    id: "rex/api/schemas/apiresponse",
                    label: "APIResponse",
                    className: "schema",
                },
                {
                    type: "doc",
                    id: "rex/api/schemas/colorsapiresponse",
                    label: "ColorsAPIResponse",
                    className: "schema",
                },
                {
                    type: "doc",
                    id: "rex/api/schemas/event",
                    label: "Event",
                    className: "schema",
                },
            ],
        },
    ],
};

export default sidebar.apisidebar;
