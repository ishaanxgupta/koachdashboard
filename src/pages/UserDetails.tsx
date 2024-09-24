import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import UserProfile from '../components/UserProfile';
import UserActivities from '../components/UserActivities';

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
}

interface Post {
  id: number;
  title: string;
  body: string;
}

const UserDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [user, setUser] = useState<User | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userResponse = await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`);
        const postsResponse = await axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${id}`);

        setUser(userResponse.data);
        setPosts(postsResponse.data);
      } catch (error) {
        setError('Failed to fetch user data');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [id]);

  if (loading) return <p>Loading user details...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      {user && <UserProfile user={user} />}
      <h2>Activities</h2>
      <UserActivities posts={posts} />
    </div>
  );
};

export default UserDetails;
