export const getBooks = () => {
    const BOOKS_URL =
        "https://raw.githubusercontent.com/midudev/pruebas-tecnicas/main/pruebas/01-reading-list/books.json";

    return fetch(BOOKS_URL)
        .then((response) => response.json())
        .then((data) => {
            return data;
        })
        .catch((error) => {
            throw error;
        });
};
