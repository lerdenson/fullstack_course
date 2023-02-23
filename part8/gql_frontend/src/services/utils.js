export const updateCache = (cache, query, addedPerson) => {
  cache.updateQuery(query, (data) => {
    if (data) {
      return {
        allBooks: data.allBooks.concat(addedPerson),
      };
    }
    return null;
  });
};
