import { useEffect, useState } from "react";
import { getBooks } from "../../services/booksApi";
import { Toaster, toast } from "sonner";
import BookCard from "../BookCard/BookCard";
import BookFilters from "../BookFilters/BookFilters";
import BookmarkList from "../BookmarkList/BookmarkList";

const BooksList = () => {
    const [books, setBooks] = useState([]);
    const [filteredBooks, setFilteredBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const MESSAGES = {
        loading: "Cargando el listado de libros...",
        empty: "No tenemos libros disponibles!",
        error: "Error cargando el listado de libros!",
    };
    let message = "";

    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            getBooks()
                .then((data) => {
                    setBooks(data.library);
                    setFilteredBooks(data.library);
                })
                .catch((error) => {
                    setError(error);
                })
                .finally(() => {
                    setLoading(false);
                });
        }, 2000);
    }, []);

    if (loading || error || filteredBooks.length === 0) {
        if (loading) {
            message = "loading";
        } else if (error) {
            message = "error";
        } else {
            message = "empty";
        }
    }

    return (
        <div>
            <Toaster />
            <BookFilters books={books} setFilteredBooks={setFilteredBooks} />
            <div className="max-w-7xl mx-auto mb-10 grid grid-cols-2 gap-10 min-h-screen">
                <div>
                    <h2 className="text-center text-2xl font-bold text-white mb-4">Disponibles</h2>
                    {loading || error || filteredBooks.length === 0 ? (
                        <p className="max-w-7xl mx-auto text-white font-bold text-center mt-10">{MESSAGES[message]}</p>
                    ) : (
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 justify-items-center">
                            {filteredBooks.map((book) => {
                                return (
                                    <BookCard
                                        key={book.book.ISBN}
                                        book={book}
                                        {...book.book}
                                        setFilteredBooks={setFilteredBooks}
                                        setBooks={setBooks}
                                        filteredBooks={filteredBooks}
                                        books={books}
                                        toast={toast}
                                        type="add"
                                    />
                                );
                            })}
                        </div>
                    )}
                </div>
                <BookmarkList setBooks={setBooks} setFilteredBooks={setFilteredBooks} />
            </div>
        </div>
    );
};

export default BooksList;
