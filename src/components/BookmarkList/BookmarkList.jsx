import { useContext } from "react";
import { BookmarkContext } from "../../context/BookmarkContext";
import BookCard from "../BookCard/BookCard";
import { toast } from "sonner";

const Bookmark = ({ setBooks, setFilteredBooks }) => {
    const { bookmark } = useContext(BookmarkContext);

    return (
        <div className="border-l-2">
            <h2 className="text-center text-2xl font-bold text-white mb-4">Bookmarks</h2>
            {bookmark.length === 0 ? (
                <p className="max-w-7xl mx-auto text-white font-bold text-center mt-10">No tiene bookmarks aún!</p>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 justify-items-center">
                    {bookmark.map((book) => {
                        return (
                            <BookCard
                                key={book.book.ISBN}
                                book={book}
                                {...book.book}
                                toast={toast}
                                type="remove"
                                setBooks={setBooks}
                                setFilteredBooks={setFilteredBooks}
                            />
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default Bookmark;
