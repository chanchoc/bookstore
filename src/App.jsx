import BooksList from "./components/BooksList/BooksList";
import { BookmarkProvider } from "./context/BookmarkContext";

function App() {
    return (
        <div className="bg-black font-montserrat min-h-screen py-1">
            <BookmarkProvider>
                <BooksList />
            </BookmarkProvider>
        </div>
    );
}

export default App;
