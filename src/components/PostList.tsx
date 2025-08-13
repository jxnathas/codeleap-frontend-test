import React from 'react';
import type { Post } from '../types';

interface PostListProps {
  posts: Post[];
}

const PostList: React.FC<PostListProps> = ({ posts }) => {
  return (
    <div>
      <h2>Recent Posts</h2>
      {posts.length === 0 ? (
        <div className="empty-state">
          <p>No posts yet. Create your first post above!</p>
        </div>
      ) : (
        <div>
          {posts.map((post) => (
            <div key={post.id} className="post">
              <div className="post-title">{post.title}</div>
              <div className="post-text">{post.text}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PostList;