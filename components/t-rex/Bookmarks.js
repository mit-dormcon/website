import React, { useState } from "react";

export function BookmarkDropdownItem(props) {
    const bookmarkText = "⭐️ Bookmark";
    const removeBookmarkText = "❌ Unbookmark";

    function handleClick(e) {
        e.preventDefault();
        if(props.isSaved)
            props.unsave(props.name);
        else props.save(props.name);
    }

    return <a href="#" className="dropdown__link" onClick={handleClick}>{props.isSaved ? removeBookmarkText : bookmarkText}</a>;
}

export function BookmarksTool() {
    const [saved, setSaved] = useState(localStorage.getItem("savedEvents"));

    const importBookmarks = () => {
        const bookmarks = prompt("Paste your exported bookmarks here:");
        if(bookmarks !== null) {
            try {
                const bookmarksList = JSON.parse(bookmarks);
                if(!(bookmarksList instanceof Array))
                    throw new Error("Bookmarks list needs to be an Array!");
                const stringBookmarks = JSON.stringify(bookmarksList);
                localStorage.setItem("savedEvents", stringBookmarks);
                setSaved(stringBookmarks);
                alert(bookmarksList.length + " bookmarks imported successfully.")
            } catch (error) {
                alert("Couldn't import your bookmarks! See console for details.");
                console.error(error);
            }
        }
    };

    return <div>
        <div className="margin-bottom--md">
            <button className="button button--primary" onClick={importBookmarks}>Import Bookmarks</button>
        </div>
        <h4>Currently saved bookmarks:</h4>
        <pre style={{userSelect: 'all'}}>{saved}</pre>
    </div>;
}