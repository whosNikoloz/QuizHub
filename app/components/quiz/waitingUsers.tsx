import React from "react";

interface User {
  id: number;
  name: string;
}

interface WaitingUsersProps {
  users: User[];
}

const WaitingUsers: React.FC<WaitingUsersProps> = ({ users }) => {
  return (
    <div>
      <h2>Waiting Users</h2>
      {users.map((user) => (
        <div key={user.id}>{user.name}</div>
      ))}
    </div>
  );
};

export default WaitingUsers;
