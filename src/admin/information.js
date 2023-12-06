import { useEffect, useState } from "react";
import * as client from "../login/client.js";
import Nav from "../Nav";
function Information() {
  const [users, setUsers] = useState([]);

  const [user, setUser] = useState({ username: "", password: "", role: "USER" });

  const createUser = async () => {
      try {
          const newUser = await client.createUser(user);
          setUsers([newUser, ...users]);
      } catch (err) {
          console.log(err);
      }
  };

  const fetchUsers = async () => {
      const users = await client.findAllUsers();
      setUsers(users);
  };
  
  const selectUser = async (user) => {
      try {
          const u = await client.findUserById(user._id);
          setUser(u);
      } catch (err) {
          console.log(err);
      }
  };

  const updateUser = async () => {
      try {
          await client.updateUser(user);
          setUsers(users.map((u) => (u._id === user._id ? user : u)));
      } catch (err) {
          console.log(err);
      }
  };
  
  const deleteUser = async (user) => {
      try {
          await client.deleteUser(user);
          setUsers(users.filter((u) => u._id !== user._id));
      } catch (err) {
          console.log(err);
      }
  };

  useEffect(() =>{
    fetchUsers();
  }, []);
  return(
    <div class="px-2 bg-main">
      <Nav />
      <div>
        <h1>List of users</h1>
            <input value={user.username} onChange={(e) => setUser({ ...user, username: e.target.value })} />
              <input value={user.password} onChange={(e) => setUser({ ...user, password: e.target.value })} />
              <input value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })} />
              <select value={user.role} onChange={(e) => setUser({ ...user, role: e.target.value })}>
                <option value="REVIEWER">User</option>
                <option value="DIRECTOR">Admin</option>
                <option value="ADMIN">Faculty</option>  
              </select>
          <div className="table-responsive">
            <table className="table table-border admintable">
            <thead>
              <tr className="admin-col">
                <th>ID</th>
                <th>Username</th>
                <th>Password</th>
                <th>Email</th>
                <th>Role</th>
                <th>Edit User</th>
                <th>Delete User</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) =>(
                <>
                  <tr key={user._id}>
                    <td>
                      {user._id}
                    </td>
                    <td>
                      {user.username}
                    </td>
                    <td>
                      {user.password}
                    </td>
                    <td>
                      {user.email}
                    </td>
                    <td>
                      {user.role}
                    </td>
                    <td>
                      <button className="btn btn-warning" onClick={() => selectUser(user)}>Edit User</button>
                    </td>
                    <td>
                      <button className="btn btn-danger" onClick={() => deleteUser(user)}>Delete User</button>
                    </td>
                  </tr>
                </>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Information;