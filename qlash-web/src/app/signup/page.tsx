"use client";
import React, { useState } from 'react';
import Button from '@/components/Button';
import Input from '@/components/Input';
import Navbar from '@/components/Navbar';

const loginUrl = "http://localhost:8000/auth/login";
const registerUrl = "http://localhost:8000/auth/register";

const SignUp = () => {
    const [signUpData, setSignUpData] = useState({
        username: '',
        email: '',
        password: ''
    });
    
    const [signInData, setSignInData] = useState({
        email: '',
        password: ''
    });
    
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSignUpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSignUpData({
            ...signUpData,
            [e.target.id]: e.target.value
        });
    };

    const handleSignInChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSignInData({
            ...signInData,
            [e.target.id.replace('signin-', '')]: e.target.value
        });
    };

    const handleSignUp = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        
        try {
            const response = await fetch(registerUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: signUpData.email,
                    password: signUpData.password,
                    name: signUpData.username
                }),
            });
            
            const data = await response.json();
            
            if (response.ok) {
                localStorage.setItem('token', data.token);
                localStorage.setItem('user', JSON.stringify(data.user));
                // Redirection ou autre action après inscription réussie
                console.log('Registration successful:', data);
            } else {
                setError(data.message || 'Registration failed');
            }
        } catch (err) {
            setError('Network error. Please try again.');
            console.error('Registration error:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleSignIn = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        
        try {
            const response = await fetch(loginUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(signInData),
            });
            
            const data = await response.json();
            
            if (response.ok) {
                localStorage.setItem('token', data.token);
                localStorage.setItem('user', JSON.stringify(data.user));
                // Redirection ou autre action après connexion réussie
                console.log('Login successful:', data);
            } else {
                setError(data.message || 'Login failed');
            }
        } catch (err) {
            setError('Network error. Please try again.');
            console.error('Login error:', err);
        } finally {
            setLoading(false);
        }
    };
    return (
        <div className='bg-white h-screen text-black flex flex-row items-center justify-evenly'>
            <Navbar />
            {error && (
                <div className='fixed top-4 left-1/2 transform -translate-x-1/2 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded'>
                    {error}
                </div>
            )}
            
            <div className='flex flex-col items-center justify-center h-full'>
                <h2 className='text-2xl font-bold mb-6 text-center'>Sign Up</h2>
                <form className='w-96' onSubmit={handleSignUp}>
                    <div className='mb-4'>
                        <Input 
                            type='text' 
                            id='username' 
                            value={signUpData.username}
                            onChange={handleSignUpChange}
                            className='w-full p-2 border-b border-black placeholder:text-black' 
                            required 
                            placeholder='Username' 
                        />
                    </div>
                    <div className='mb-4'>
                        <Input 
                            type='email' 
                            id='email' 
                            value={signUpData.email}
                            onChange={handleSignUpChange}
                            className='w-full p-2 border-b border-black placeholder:text-black' 
                            required 
                            placeholder='Email' 
                        />
                    </div>
                    <div className='mb-4'>
                        <Input 
                            type='password' 
                            id='password' 
                            value={signUpData.password}
                            onChange={handleSignUpChange}
                            className='w-full p-2 border-b border-black placeholder:text-black' 
                            required 
                            placeholder='Password' 
                        />
                    </div>
                    <Button type='submit' disabled={loading}>
                        {loading ? 'Signing Up...' : 'Sign Up'}
                    </Button>
                </form>
            </div>
            <div className='border-l border-gray-400 h-96' />
            <div className='flex flex-col items-center justify-center h-full'>
                <h2 className='text-2xl font-bold mb-6 text-center'>Sign In</h2>
                <form className='w-96' onSubmit={handleSignIn}>
                    <div className='mb-4'>
                        <Input 
                            type='email' 
                            id='signin-email' 
                            value={signInData.email}
                            onChange={handleSignInChange}
                            className='w-full p-2 border-b border-black placeholder:text-black' 
                            required 
                            placeholder='Email' 
                        />
                    </div>
                    <div className='mb-4'>
                        <Input 
                            type='password' 
                            id='signin-password' 
                            value={signInData.password}
                            onChange={handleSignInChange}
                            className='w-full p-2 border-b border-black placeholder:text-black' 
                            required 
                            placeholder='Password' 
                        />
                    </div>
                    <Button type='submit' disabled={loading}>
                        {loading ? 'Signing In...' : 'Sign In'}
                    </Button>
                </form>
            </div>
        </div>
    )
}

export default SignUp