import { useEffect, useState, useContext } from "react";
import { BookmarkContext } from "../../context/BookmarkContext";
import { getBooks } from "../../services/booksApi";

const BookFilters = ({ books, setFilteredBooks }) => {
    const [genres, setGenres] = useState([]);
    const { totalBookmarks } = useContext(BookmarkContext);

    useEffect(() => {
        getBooks()
            .then((data) => {
                const booksData = data.library;
                setGenres(["Todos", ...new Set(booksData.map((book) => book.book.genre))]);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const handleFilters = () => {
        const filterGenre = document.getElementById("genres").value;
        const inputFilter = document.getElementById("filter").value;
        const modifiedBooks = books.map((book) => {
            return { ...book.book, author: book.book.author.name };
        });
        let newFilteredBooks = books;

        if (!inputFilter && filterGenre === "Todos") {
            newFilteredBooks = books;
        } else if (!inputFilter) {
            newFilteredBooks = books.filter((book) => book.book.genre === filterGenre);
        } else {
            const filterBooks = modifiedBooks.filter((book) => {
                const input = Object.values(book).some((value) =>
                    String(value).toLowerCase().includes(inputFilter.toLowerCase())
                );
                const genre = filterGenre === "Todos" ? true : book.genre === filterGenre;
                return input && genre;
            });
            const filterIds = filterBooks.map((book) => {
                return book.ISBN;
            });
            newFilteredBooks = books.filter((book) => filterIds.includes(book.book.ISBN));
        }

        setFilteredBooks(newFilteredBooks);
    };

    return (
        <div className="max-w-7xl mx-auto sticky top-0 bg-black/90 z-50 py-8">
            <div className="flex flex-row flex-wrap items-center justify-center gap-10">
                <input
                    type="text"
                    id="filter"
                    placeholder="Filtrar..."
                    className="rounded-md min-w-64 p-2"
                    onChange={handleFilters}
                />
                <select id="genres" className="rounded-md p-2 min-w-64" onChange={handleFilters}>
                    {genres.length === 0 ? (
                        <option>Cargando...</option>
                    ) : (
                        genres.map((genre) => {
                            return (
                                <option key={genre} value={genre}>
                                    {genre}
                                </option>
                            );
                        })
                    )}
                </select>
                <div>
                    <p className="text-white font-medium">Disponibles: {books.length}</p>
                    <p className="text-white font-medium">Bookmarks: {totalBookmarks()}</p>
                </div>
            </div>
        </div>
    );
};

export default BookFilters;
