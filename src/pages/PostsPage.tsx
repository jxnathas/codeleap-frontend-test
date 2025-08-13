import React, { useState } from 'react';
import PostForm from '../components/PostForm';
import PostList from '../components/PostList';
import type { Post } from '../types';

const PostsPage: React.FC = () => {
    const [posts, setPosts] = useState<Post[]>([]);

    const addPost = (title: string, text: string) => {
        const newPost: Post = {
            title, 
            text,
            id: Date.now(),
        };
        setPosts([newPost, ...posts]); 
    };

    return (
        <div className='main-container'>
           <div className="header-box">
                <h1 className="network-title">CodeLeap Network</h1>
            </div>

            <div className="container">
                <div className="card">
                    <h1>What’s on your mind?</h1>
                    <PostForm onSubmit={addPost} />
                </div>
                <div className="card">
                    <PostList posts={posts} />
                </div>
            </div>
        </div>
    );
};

export default PostsPage;