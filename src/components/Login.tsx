import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface LoginProps {
    onLogin: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (username.trim()) {
            localStorage.setItem('username', username.trim());
            onLogin();
            navigate('/');
        }
    };

    const isButtonDisabled = username.trim() === '';

    return (
        <form onSubmit={handleSubmit} className="login-form">
            <div>
                <label htmlFor="username">Please enter your username</label>
                <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter your username"
                />
            </div>
            <div className="button-container">
                <button 
                    type="submit" 
                    disabled={isButtonDisabled}
                >
                    ENTER
                </button>
            </div>
        </form>
    );
};

export default Login;