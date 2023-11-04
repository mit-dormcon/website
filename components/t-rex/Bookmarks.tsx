/// <reference types="gtag.js" />
import { useState } from "react";

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

    function handleClick(e) {
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
        <a href="#" className="dropdown__link" onClick={handleClick}>
            {props.isSaved ? removeBookmarkText : bookmarkText}
        </a>
    );
}

/**
 * A tool that displays the current set of bookmarks and offers an option to
 * import a new set of bookmarks.
 */
export function BookmarksTool() {
    const [saved, setSaved] = useState<string>(
        localStorage.getItem("savedEvents"),
    );

    const importBookmarks = () => {
        const bookmarks = prompt("Paste your exported bookmarks here:");
        if (bookmarks !== null) {
            try {
                const bookmarksList: string[] = JSON.parse(bookmarks);
                if (!(bookmarksList instanceof Array))
                    throw new Error("Bookmarks list needs to be an Array!");
                const stringBookmarks = JSON.stringify(bookmarksList);
                localStorage.setItem("savedEvents", stringBookmarks);
                setSaved(stringBookmarks);
                alert(
                    bookmarksList.length + " bookmarks imported successfully.",
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
                    onClick={() => navigator.clipboard.writeText(saved)}
                >
                    📋 Copy To Clipboard
                </button>
            </div>
            <h4>Currently saved bookmarks:</h4>
            <pre style={{ userSelect: "all" }}>{saved}</pre>
        </div>
    );
}
