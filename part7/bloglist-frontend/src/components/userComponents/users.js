import {useSelector} from "react-redux";
import {Link} from "react-router-dom";
import {Table} from "react-bootstrap";

const Users = () => {
    const users = useSelector((state) => state.users);
    const sortedUsers = [...users].sort(
        (a, b) => b.blogs.length - a.blogs.length
    );

    return (
      <div>
        <h2>Users</h2>
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>user</th>
              <th>blogs created</th>
            </tr>
          </thead>
          <tbody>
            {sortedUsers.map((user) => (
              <tr key={user.id}>
                  <td>
                      <Link to={`/users/${user.id}`}>{user.name}</Link>
                  </td>
                <td>{user.blogs.length}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    );
};

export default Users
