import { useQuery } from "@apollo/client";
import { ALL_GENRES, BOOKS_BY_GENRE } from "../services/queries";
import _ from "lodash";
import { useState } from "react";
import BookList from "./BookList";

const Books = (props) => {
  const [genre, setGenre] = useState(null);
  const curGenre = genre ? genre : "all genres";
  const genresResult = useQuery(ALL_GENRES);
  const result = useQuery(BOOKS_BY_GENRE, { variables: { genre } });
  if (!props.show) {
    return null;
  }

  if (genresResult.loading) {
    return <div>loading...</div>;
  }

  const genres = _.uniq(
    _.flattenDeep(genresResult.data.allBooks.map((g) => g.genres))
  );

  const onGenreButtonClick = async (event) => {
    event.preventDefault();
    const g = event.target.value ? event.target.value : null;
    setGenre(g);
    await result.refetch({ genre: g });
  };

  return (
    <div>
      <h2>books</h2>

      <div>
        in genre <b>{curGenre}</b>
      </div>

      <BookList result={result} />
      <div>
        {genres.map((g) => {
          return (
            <button
              key={genres.indexOf(g)}
              value={g}
              onClick={onGenreButtonClick}
            >
              {g}
            </button>
          );
        })}
        <button onClick={onGenreButtonClick} value={null}>
          all genres
        </button>
      </div>
    </div>
  );
};

export default Books;
