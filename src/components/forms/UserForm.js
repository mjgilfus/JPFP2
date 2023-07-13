import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createUser, fetchAllUsers } from '../usersSlice';

const UserForm = () => {
  const dispatch = useDispatch();

  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    email: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (
      userData.firstName.trim() === '' ||
      userData.lastName.trim() === '' ||
      userData.email.trim() === ''
    ) {
      alert('Please fill in all fields');
      return;
    }
  
    if (!userData.email.includes('@')) {
      alert('Please enter a valid email');
      return;
    }
  
    const newUser = {
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
    };
  
    await dispatch(createUser(newUser));
  
    setUserData((prevState) => ({
      ...prevState,
      firstName: '',
      lastName: '',
      email: '',
    }));
  
    try {
      await dispatch(fetchAllUsers());
    } catch (error) {
      console.error('Error fetching all users:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        First Name:
        <input
          type="text"
          value={userData.firstName}
          onChange={(e) =>
            setUserData((prevState) => ({
              ...prevState,
              firstName: e.target.value,
            }))
          }
        />
      </label>
      <label>
        Last Name:
        <input
          type="text"
          value={userData.lastName}
          onChange={(e) =>
            setUserData((prevState) => ({
              ...prevState,
              lastName: e.target.value,
            }))
          }
        />
      </label>
      <label>
        Email:
        <input
          type="text"
          value={userData.email}
          onChange={(e) =>
            setUserData((prevState) => ({
              ...prevState,
              email: e.target.value,
            }))
          }
        />
      </label>
      <input type="submit" value="Submit" />
    </form>
  );
};

export default UserForm;
