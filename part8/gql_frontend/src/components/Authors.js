import { useMutation, useQuery } from "@apollo/client";
import { ALL_AUTHORS, CHANGE_BIRTHYEAR } from "../services/queries";
import { useState } from "react";
import Select from "react-select";

const Authors = (props) => {
  const [born, setBorn] = useState("");
  const [selectedOption, setSelectedOption] = useState(null);

  const result = useQuery(ALL_AUTHORS);

  const [changeAuthor] = useMutation(CHANGE_BIRTHYEAR);

  if (!props.show) {
    return null;
  }

  if (result.loading) {
    return <div>loading...</div>;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(names);

    await changeAuthor({
      variables: { name: selectedOption.value, born: Number(born) },
    });
    setSelectedOption(null);
    setBorn("");
  };

  const authors = result.data.allAuthors;

  const names = authors.map((a) => {
    return { value: a.name, label: a.name };
  });

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <form onSubmit={handleSubmit}>
        <h3>Set birth year</h3>
        <Select
          defaultValue={selectedOption}
          onChange={setSelectedOption}
          options={names}
          placeholder="select author..."
        />
        <div>
          born{" "}
          <input
            value={born}
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>
        <button type="submit">update author</button>
      </form>
    </div>
  );
};

export default Authors;
