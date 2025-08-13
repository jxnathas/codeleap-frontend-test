import React, { useState } from 'react';
import PostForm from '../components/PostForm';
import PostList from '../components/PostList';
import type { Post } from '../types';

const PostsPage: React.FC = () => {
    const [posts, setPosts] = useState<Post[]>([]);

    const addPost = (title: string, text: string) => {
        const newPost: Post = {
            title, text,
            id: 0,
        };
        setPosts([...posts, newPost]);
    };

    return (
        <div>
            <h1>Posts</h1>
            <PostForm onSubmit={addPost} />
            <PostList posts={posts} />
        </div>
    );
};

export default PostsPage;