import {useQuery} from "@apollo/client";
import {BOOKS_BY_GENRE} from "../services/queries";
import BookList from "./BookList";

const Recommended = ({show}) => {
    const genre = window.localStorage.getItem("favouriteGenre");
    const result = useQuery(BOOKS_BY_GENRE, {variables: {genre}});

    if (!show) return null;

    if (result.loading) {
        return <div>loading...</div>;
    }

    return (
        <div>
            <h2>Recommendations</h2>
            <div>
                Books in your favorite genre <b>{genre}</b>
            </div>
            <BookList result={result}/>
        </div>
    );
};

export default Recommended