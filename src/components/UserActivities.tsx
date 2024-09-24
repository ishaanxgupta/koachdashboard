import React from 'react';

interface Post {
  id: number;
  title: string;
  body: string;
}

interface UserActivitiesProps {
  posts: Post[];
}

const UserActivities: React.FC<UserActivitiesProps> = ({ posts }) => {
  return (
    <div className="user-activities">
      <ul>
        {posts.map(post => (
          <li key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserActivities;
