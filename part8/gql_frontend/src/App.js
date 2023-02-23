import { useEffect, useState } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import { useApolloClient, useSubscription } from "@apollo/client";
import LoginForm from "./components/LoginForm";
import Recommended from "./components/recommended";
import { ALL_GENRES, BOOK_ADDED, BOOKS_BY_GENRE } from "./services/queries";
import { updateCache } from "./services/utils";

const App = () => {
  const defaultPage = "authors";

  const [page, setPage] = useState(defaultPage);
  const [token, setToken] = useState(null);
  const client = useApolloClient();

  useEffect(() => {
    const t = window.localStorage.getItem("userToken");
    setToken(t);
  }, []);

  useEffect(() => {
    setPage(defaultPage);
  }, [token]);

  useSubscription(BOOK_ADDED, {
    onData: ({ data }) => {
      const addedBook = data.data.bookAdded;
      window.alert("new book was added");

      addedBook.genres.forEach((genre) => {
        updateCache(
          client.cache,
          { query: BOOKS_BY_GENRE, variables: { genre } },
          addedBook
        );
      });

      updateCache(
        client.cache,
        { query: BOOKS_BY_GENRE, variables: { genre: null } },
        addedBook
      );
      updateCache(client.cache, { query: ALL_GENRES }, addedBook);
    },
  });

  const logout = () => {
    setToken(null);
    localStorage.clear();
    client.resetStore();
  };

  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        {token ? (
          <span>
            <button onClick={() => setPage("recommended")}>recommended</button>
            <button onClick={() => setPage("add")}>add book</button>
            <button onClick={logout}>logout</button>
          </span>
        ) : (
          <button onClick={() => setPage("login")}>login</button>
        )}
      </div>

      <Authors show={page === "authors"} />

      <Books show={page === "books"} />

      <Recommended show={page === "recommended"} />

      <NewBook show={page === "add"} />

      <LoginForm setToken={setToken} show={page === "login"} />
    </div>
  );
};

export default App;
