import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/authContext';

const EditProfile = () => {
  const { id } = useParams();
  const { currentUser, setCurrentUser } = useContext(AuthContext); // Access setCurrentUser
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [img, setImg] = useState(null);
  const navigate = useNavigate();

  // FETCHING A USER
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`/api/users/${id}`);
        setUsername(res.data.username);
        setEmail(res.data.email);
        setImg(res.data.img);
      } catch (err) {
        console.log(err);
      }
    };

    fetchUser();
  }, [id]);

  // UPDATING A USER PROFILE
  const handleProfileUpdate = async (updatedData) => {
    try {
      const res = await axios.put(`/api/users/${id}`, updatedData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      const updatedUser = res.data;
      setCurrentUser(updatedUser);
      navigate(`/profile/${id}`);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('username', username);
    formData.append('email', email);
    if (img instanceof File) {
      formData.append('img', img);
    }

    handleProfileUpdate(formData);
  };

  return (
    <div className='edit-profile'>
      <div className="container">
        <h1>Edit Profile</h1>
        <form onSubmit={handleSubmit}>
          <input 
            type="text" 
            placeholder="Username" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
          />
          <input 
            type="email" 
            placeholder="Email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
          />
          <input 
            type="file" 
            placeholder="Profile Image" 
            onChange={(e) => setImg(e.target.files[0])} 
          />
          <button type="submit">Update Profile</button>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
