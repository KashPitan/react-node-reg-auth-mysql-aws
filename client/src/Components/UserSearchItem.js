import React from "react";

const UserSearchItem = ({ user: { username, email } }) => {
  return (
    <>
      <div className="collection-item">
        <p>{username}</p>
        <p>{email}</p>
      </div>
    </>
  );
};

export default UserSearchItem;
