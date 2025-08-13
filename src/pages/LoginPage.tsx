import React from 'react';
import Login from '../components/Login';

interface LoginPageProps {
  onLogin: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
    return (
        <div className="login-container">
            <div className="login-card">
                <h1 className="login-title">Welcome to CodeLeap network!</h1>
                <Login onLogin={onLogin} />
            </div>
        </div>
    );
};

export default LoginPage;