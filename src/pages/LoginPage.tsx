import React from 'react';
import Login from '../components/Login';

const LoginPage: React.FC = () => {
    return (
        <div className="login-container">
            <div className="login-card">
                <h1 className="login-title">Welcome to CodeLeap network!</h1>
                <Login />
            </div>
        </div>
    );
};

export default LoginPage;