'use client'
import { useState } from 'react';
import Cookies from 'js-cookie';

const API_URL = 'http://localhost:5000/api/user/login';
const CONTENT_TYPE_JSON = 'application/json';

interface HttpResponse<T> {
    ok: boolean;
    status: number;
    statusText: string;
    headers: Headers;
    data?: T;
    error?: string;
}

interface UserResponse {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    mobile: string;
    token: string;
}


const setBearerTokenInCookie = (token: string, expirationDays: number = 3) => {
    Cookies.set('token', token, { expires: expirationDays });
    console.log('Cookie set:', document.cookie);
};


const Login: React.FC = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
    
        try {
            const response = await loginUser();
            if (response.ok) {
                console.log('Logged in successfully');
                const responseData = await response.json();

                if (responseData.token)
                    setBearerTokenInCookie(responseData.token);
            } else {
                console.error('Login failed');
            }
        } catch (error) {
            console.error('Error during login:', error);
        }
    };
    
    const loginUser = async () => {
        return await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': CONTENT_TYPE_JSON,
            },
            body: JSON.stringify(formData),
        });
    };

    return (
        <div>
            <h1>Login Page</h1>
            <form onSubmit={handleLogin}>
                <label>
                    Email:
                    <input
                        type="text"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                </label>
                <br />
                <label>
                    Password:
                    <input
                        type="password"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    />
                </label>
                <br />
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;