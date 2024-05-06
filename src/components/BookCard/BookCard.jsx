import { useContext } from "react";
import { BookmarkContext } from "../../context/BookmarkContext";

const BookCard = ({
    title,
    genre,
    cover,
    year,
    author,
    ISBN: id,
    setFilteredBooks,
    setBooks,
    filteredBooks,
    books,
    toast,
    type,
    book,
}) => {
    const { addBook, removeBook } = useContext(BookmarkContext);

    const handleBookmark = () => {
        addBook(book);
        setFilteredBooks(
            filteredBooks.filter((book) => {
                return book.book.ISBN !== id;
            })
        );
        setBooks(
            books.filter((book) => {
                return book.book.ISBN !== id;
            })
        );
        toast("Libro agregado correctamente!");
    };

    const handleRemove = () => {
        setBooks((prev) => [...prev, book]);
        setFilteredBooks((prev) => [...prev, book]);
        removeBook(id);
        toast("Libro eliminado correctamente!");
    };

    return (
        <>
            <div className="flex flex-col items-center justify-center group relative border-2 w-max h-max">
                <img
                    src={cover}
                    alt={title}
                    className="object-cover group-hover:opacity-100 h-56 md:h-80"
                    loading="lazy"
                />
                <div className="absolute hidden z-10 bottom-0 left-0 w-full h-full group-hover:flex group-hover:flex-col items-center justify-center backdrop-blur-sm bg-white/30 text-white p-4 text-center text-balance cursor-default">
                    <h2 className="text-lg md:text-2xl pb-4 text-black font-bold">{title}</h2>
                    <p className="text-lg pb-1 text-black font-bold hidden md:flex">{author.name}</p>
                    <p className="text-lg pb-4 text-black font-medium hidden md:flex">{year}</p>
                    <p className="text-md px-1 border-2 rounded-xl bg-gray-800/70 hidden md:flex">{genre}</p>
                    {type === "add" ? (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            id={id}
                            viewBox="0 0 24 24"
                            width="30"
                            height="30"
                            className="mt-8 cursor-pointer"
                            onClick={handleBookmark}
                        >
                            <path
                                className="pointer-events-none"
                                d="M2.849,23.55a2.954,2.954,0,0,0,3.266-.644L12,17.053l5.885,5.853a2.956,2.956,0,0,0,2.1.881,3.05,3.05,0,0,0,1.17-.237A2.953,2.953,0,0,0,23,20.779V5a5.006,5.006,0,0,0-5-5H6A5.006,5.006,0,0,0,1,5V20.779A2.953,2.953,0,0,0,2.849,23.55Z"
                            />
                        </svg>
                    ) : (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            id={id}
                            viewBox="0 0 24 24"
                            width="30"
                            height="30"
                            className="mt-8 cursor-pointer"
                            onClick={handleRemove}
                        >
                            <path d="M16,8a1,1,0,0,0-1.414,0L12,10.586,9.414,8A1,1,0,0,0,8,9.414L10.586,12,8,14.586A1,1,0,0,0,9.414,16L12,13.414,14.586,16A1,1,0,0,0,16,14.586L13.414,12,16,9.414A1,1,0,0,0,16,8Z" />
                            <path d="M12,0A12,12,0,1,0,24,12,12.013,12.013,0,0,0,12,0Zm0,22A10,10,0,1,1,22,12,10.011,10.011,0,0,1,12,22Z" />
                        </svg>
                    )}
                </div>
            </div>
        </>
    );
};

export default BookCard;
