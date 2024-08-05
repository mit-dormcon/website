import { useState } from "react";
import Link from "@docusaurus/Link";
import Heading from "@theme/Heading";

declare const gtag: Gtag.Gtag;

/**
 * This component displays a dropdown link for saving an event to Bookmarks
 */
export function BookmarkDropdownItem(props: {
    /** the name of the event */
    name: string;
    isSaved: boolean;
    /** A function that removes the event from the list of saved events */
    unsave: (name: string) => void;
    /** A function that adds the event from the list of saved events */
    save: (name: string) => void;
}) {
    const bookmarkText = "⭐️ Bookmark";
    const removeBookmarkText = "❌ Unbookmark";

    function handleClick(e: React.MouseEvent<HTMLAnchorElement>) {
        e.preventDefault();
        if (props.isSaved) props.unsave(props.name);
        else {
            props.save(props.name);
            if (typeof gtag !== "undefined") {
                gtag("event", "bookmark", {
                    event_label: props.name,
                });
            }
        }
    }

    return (
        <Link to="#" className="dropdown__link" onClick={handleClick}>
            {props.isSaved ? removeBookmarkText : bookmarkText}
        </Link>
    );
}

/**
 * A tool that displays the current set of bookmarks and offers an option to
 * import a new set of bookmarks.
 */
export function BookmarksTool() {
    const [saved, setSaved] = useState<string | null>(
        localStorage.getItem("savedEvents"),
    );

    const importBookmarks = () => {
        const bookmarks = prompt("Paste your exported bookmarks here:");
        if (bookmarks !== null) {
            try {
                const bookmarksList = JSON.parse(bookmarks) as string[];
                if (!(bookmarksList instanceof Array))
                    throw new Error("Bookmarks list needs to be an Array!");
                const stringBookmarks = JSON.stringify(bookmarksList);
                localStorage.setItem("savedEvents", stringBookmarks);
                setSaved(stringBookmarks);
                alert(
                    bookmarksList.length.toString() +
                        " bookmarks imported successfully.",
                );
            } catch (error) {
                alert(
                    "Couldn't import your bookmarks! See console for details.",
                );
                console.error(error);
            }
        }
    };

    return (
        <div>
            <div className="margin-bottom--md">
                <button
                    className="button button--primary margin-right--sm"
                    onClick={importBookmarks}
                >
                    Import Bookmarks
                </button>
                <button
                    className="button button--outline button--primary"
                    onClick={() => {
                        const handler = async () => {
                            await navigator.clipboard.writeText(saved ?? "");
                        };

                        handler().catch((error: unknown) => {
                            console.log(error);
                        });
                    }}
                >
                    📋 Copy To Clipboard
                </button>
            </div>
            <Heading as="h4">Currently saved bookmarks:</Heading>
            <pre style={{ userSelect: "all" }}>{saved}</pre>
        </div>
    );
}
