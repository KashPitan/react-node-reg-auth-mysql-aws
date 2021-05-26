import React, { useEffect } from "react";
import UserSearchItem from "./UserSearchItem";
import { v4 as uuidv4 } from "uuid";

const UserList = ({ users }) => {
  useEffect(() => {
    console.log(users);
  }, [users]);

  useEffect(() => {
    console.log(users);
  }, []);
  return (
    <>
      {users && (
        <>
          <h1>Users</h1>
          <ol className="collection">
            {users.map((user) => (
              <UserSearchItem user={user} key={uuidv4()} />
            ))}
          </ol>
        </>
      )}
    </>
  );
};

export default UserList;
