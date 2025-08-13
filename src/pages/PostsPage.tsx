import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PostForm from '../components/PostForm';
import PostList from '../components/PostList';
import EditPostModal from '../components/EditPostModal';
import DeletePostModal from '../components/DeletePostModal';
import type { Post } from '../types';
import { postsApi } from '../services/api';

interface PostsPageProps {
    isLoggedIn: boolean;
    onLogout: () => void;
}

const PostsPage: React.FC<PostsPageProps> = ({ isLoggedIn, onLogout }) => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [selectedPost, setSelectedPost] = useState<Post | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const loadPosts = async () => {
            try {
                setLoading(true);
                const apiPosts = await postsApi.getAll();
                const sortedPosts = apiPosts.sort((a, b) => 
                    new Date(b.created_datetime || '').getTime() - new Date(a.created_datetime || '').getTime()
                );
                setPosts(sortedPosts);
                setError(null);
            } catch (err) {
                setError('Failed to load posts');
                console.error('Error loading posts:', err);
            } finally {
                setLoading(false);
            }
        };

        loadPosts();
    }, []);

    const addPost = async (title: string, text: string) => {
        if (!isLoggedIn) {
            navigate('/login');
            return;
        }

        try {
            const username = localStorage.getItem('username') || 'Anonymous';
            const newPost = await postsApi.create({
                title,
                text,
                author: username,
            });
            setPosts(prevPosts => [newPost, ...prevPosts]);
        } catch (err) {
            setError('Failed to create post');
            console.error('Error creating post:', err);
        }
    };

    const handleEditPost = (id: number, title: string, text: string) => {
        const post = posts.find(p => p.id === id);
        if (post) {
            setSelectedPost(post);
            setEditModalOpen(true);
        }
    };

    const handleDeletePost = (id: number) => {
        setSelectedPost(posts.find(p => p.id === id) || null);
        setDeleteModalOpen(true);
    };

    const saveEditPost = async (id: number, title: string, text: string) => {
        try {
            await postsApi.update(id, { title, text });
            setPosts(prevPosts => 
                prevPosts.map(post => 
                    post.id === id ? { ...post, title, text } : post
                )
            );
            setEditModalOpen(false);
            setSelectedPost(null);
            setError(null);
        } catch (err) {
            setError('Failed to update post');
            console.error('Error updating post:', err);
        }
    };

    const confirmDeletePost = async () => {
        if (!selectedPost) return;
        
        try {
            await postsApi.delete(selectedPost.id);
            setPosts(prevPosts => prevPosts.filter(post => post.id !== selectedPost.id));
            setDeleteModalOpen(false);
            setSelectedPost(null);
            setError(null);
        } catch (err) {
            setError('Failed to delete post');
            console.error('Error deleting post:', err);
        }
    };

    if (loading) {
        return (
            <div className='main-container'>
                <div className="header-box">
                    <h1 className="network-title">CodeLeap Network</h1>
                </div>
                <div className="container">
                    <div className="card">
                        <p>Loading...</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className='main-container'>
           <div className="header-box">
                <h1 className="network-title">CodeLeap Network</h1>
            </div>

            <div className="container">
                {error && (
                    <div className="error-message">
                        {error}
                    </div>
                )}
                
                <div className="card">
                    <h1>What's on your mind?</h1>
                    <PostForm onSubmit={addPost} />
                </div>
                
                <PostList 
                    posts={posts} 
                    onDelete={isLoggedIn ? handleDeletePost : undefined}
                    onEdit={isLoggedIn ? handleEditPost : undefined}
                />
            </div>

            <EditPostModal
                isOpen={editModalOpen}
                post={selectedPost}
                onClose={() => {
                    setEditModalOpen(false);
                    setSelectedPost(null);
                }}
                onSave={saveEditPost}
            />

            <DeletePostModal
                isOpen={deleteModalOpen}
                onClose={() => {
                    setDeleteModalOpen(false);
                    setSelectedPost(null);
                }}
                onConfirm={confirmDeletePost}
            />
        </div>
    );
};

export default PostsPage;