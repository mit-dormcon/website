import React from "react";

export function BookmarkDropdownItem(props) {
    const bookmarkText = "⭐️ Bookmark";
    const removeBookmarkText = "❌ Unbookmark";

    function handleClick(e) {
        e.preventDefault();
        if(props.isSaved)
            props.unsave();
        else props.save();
    }

    return <a href="#" className="dropdown__link" onClick={handleClick}>{props.isSaved ? removeBookmarkText : bookmarkText}</a>;
}