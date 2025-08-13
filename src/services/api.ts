const API_BASE_URL = 'http://localhost:3001';

export interface ApiPost {
  id: number;
  title: string;
  text: string;
  author?: string;
  created_datetime?: string;
}

export interface ApiUser {
  id: number;
  username: string;
}

export const postsApi = {
  async getAll(): Promise<ApiPost[]> {
    const response = await fetch(`${API_BASE_URL}/posts`);
    if (!response.ok) throw new Error('Failed to fetch posts');
    return response.json();
  },

  async create(post: Omit<ApiPost, 'id'>): Promise<ApiPost> {
    const response = await fetch(`${API_BASE_URL}/posts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...post,
        created_datetime: new Date().toISOString(),
      }),
    });
    if (!response.ok) throw new Error('Failed to create post');
    return response.json();
  },

  async update(id: number, post: Partial<ApiPost>): Promise<ApiPost> {
    const response = await fetch(`${API_BASE_URL}/posts/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(post),
    });
    if (!response.ok) throw new Error('Failed to update post');
    return response.json();
  },

  async delete(id: number): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/posts/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete post');
  },
};

export const usersApi = {
  async getAll(): Promise<ApiUser[]> {
    const response = await fetch(`${API_BASE_URL}/users`);
    if (!response.ok) throw new Error('Failed to fetch users');
    return response.json();
  },

  async create(user: Omit<ApiUser, 'id'>): Promise<ApiUser> {
    const response = await fetch(`${API_BASE_URL}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });
    if (!response.ok) throw new Error('Failed to create user');
    return response.json();
  },
};