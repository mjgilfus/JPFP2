import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllUsers, deleteUser } from './usersSlice';
import { Link } from 'react-router-dom';
import axios from 'axios';
import UserForm from './forms/UserForm';

const UserList = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.all);

  const handleDeleteUser = async (userId) => {
    try {
      await axios.delete(`/api/users/${userId}`);
      await dispatch(deleteUser(userId));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch]);

  if (!users.length) {
    return <div>Getting users now...</div>;
  }

  if (!users || !Array.isArray(users)) {
    return <div>No users to display.</div>;
  }

  return (
    <div>
      <h1>All Users</h1>
      <UserForm />
      {users.map((user) => (
        <div key={user.id}>
          <Link to={`/users/${user.id}`}>
            <h2>
              {user.firstName} {user.lastName}
            </h2>
          </Link>
          <img src={user.imageUrl} alt={`${user.firstName} ${user.lastName}`} />
          <button onClick={() => handleDeleteUser(user.id)}>X</button>
        </div>
      ))}
    </div>
  );
};

export default UserList;

