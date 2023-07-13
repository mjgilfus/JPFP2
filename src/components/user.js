import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser, updateUser } from './usersSlice';
import { useParams } from 'react-router-dom';
import UserUpdate from './forms/UserUpdate';
import { unassignTaskThunk } from './taskActions';

const User = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.users.current);
  const { userId } = useParams();

  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    dispatch(fetchUser(userId));
  }, [dispatch, userId]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleUpdate = (updatedUser) => {
    dispatch(updateUser(updatedUser));
    setIsEditing(false);
  };

  if (!user) {
    return <div>Loading user info...</div>;
  }

  const { firstName, lastName, imageUrl, email, bio, tasks } = user;

  return (
    <div>
      <h1>
        {firstName} {lastName}
      </h1>
      <img src={imageUrl} alt={`${firstName} ${lastName}`} />
      <p>Email: {email}</p>
      <p>Bio: {bio}</p>
      {isEditing ? (
        <UserUpdate user={user} onUpdate={handleUpdate} />
      ) : (
        <button onClick={handleEdit}>Edit User</button>
      )}
      <h2>Tasks:</h2>
      {tasks && tasks.length ? (
        tasks.map((task) => (
          <div key={task.id}>
        <p>{task.description}</p>
      <button onClick={() => dispatch(unassignTaskThunk(task.id))}>Unassign</button>
        </div>
      ))
    ) : (
      <p>This user has no tasks.</p>
  )}

    </div>
  );
};

export default User;
