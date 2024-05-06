import { useState, createContext } from "react";

export const BookmarkContext = createContext();

export const BookmarkProvider = ({ children }) => {
    const [bookmark, setBookmark] = useState([]);

    const addBook = (book) => {
        setBookmark((prev) => [...prev, book]);
    };

    const removeBook = (id) => {
        setBookmark((prev) => prev.filter((book) => book.book.ISBN !== id));
    };

    const totalBookmarks = () => {
        return bookmark.length;
    };

    return (
        <BookmarkContext.Provider value={{ bookmark, addBook, removeBook, totalBookmarks }}>
            {children}
        </BookmarkContext.Provider>
    );
};
