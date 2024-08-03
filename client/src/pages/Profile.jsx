import React, { useContext, useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/authContext';

const Profile = () => {
  const [user, setUser] = useState({});
  const { id } = useParams();
  const { currentUser, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  // FETCHING A USER
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`/api/users/${id}`);
        setUser(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchUser();
  }, [id]);

  // DELETING A USER
  const handleDelete = async () => {
    try {
      await axios.delete(`/api/users/${id}`);
      logout();
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="profile">
      <div className="profile-content">
        {user.img && <img src={user.img} alt="User Avatar" className='profile-img' />}
        <h1>{user.username}</h1>
        <p>{user.email}</p>
        {currentUser?.id === user.id && (
          <div className="profile-actions">
            <button onClick={() => navigate(`/edit-profile/${user.id}`)}>Edit Profile</button>
            <button onClick={handleDelete}>Delete Account</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Profile;
