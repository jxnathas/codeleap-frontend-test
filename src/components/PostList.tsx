import React from 'react';
import { FaRegEdit, FaRegTrashAlt } from "react-icons/fa";
import type { Post } from '../types';

interface PostListProps {
  posts: Post[];
  onDelete?: (id: number) => void;
  onEdit?: (id: number, title: string, text: string) => void;
}

const PostList: React.FC<PostListProps> = ({ posts, onDelete, onEdit }) => {
  const currentUser = localStorage.getItem('username');

  const formatDate = (dateString?: string) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div> 
      {posts.length === 0 ? (
        <div className="empty-state">
          <p>No posts yet. Create your first post above!</p>
        </div>
      ) : (
        <div>
          {posts.map((post) => (
            <div key={post.id} className="post">
              <div className="post-header">
                <div className="post-title-bar">
                  <span className="post-title">{post.title}</span>
                  {currentUser === post.author && (onEdit || onDelete) && (
                    <div className="post-actions">
                      {onEdit && (
                        <button 
                          className="edit-btn"
                          onClick={() => onEdit(post.id, post.title, post.text)}
                          type="button"
                        >
                          <FaRegEdit />
                        </button>
                      )}
                      {onDelete && (
                        <button 
                          className="delete-btn"
                          onClick={() => onDelete(post.id)}
                          type="button"
                        >
                          <FaRegTrashAlt />
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>
              <div className="post-content">
                {post.author && (
                  <div className="post-author">@{post.author}</div>
                )}
                <div className="post-text">{post.text}</div>
                {post.created_datetime && (
                  <div className="post-date">{formatDate(post.created_datetime)}</div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PostList;