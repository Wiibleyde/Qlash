"use client";
import React, { useState } from 'react';
import Button from '@/components/Button';
import Input from '@/components/Input';
import Navbar from '@/components/Navbar';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { errorTranslations } from '@/constants/error';

const loginUrl = `http://${process.env.NEXT_PUBLIC_HOST}:8000/auth/login`;
const registerUrl = `http://${process.env.NEXT_PUBLIC_HOST}:8000/auth/register`;

function translateError(msg: string) {
    return errorTranslations[msg] || msg;
}

const SignUp = () => {

    const router = useRouter();

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
                router.push('/'); // Redirection vers la page d'accueil ou une autre page
                toast.success('Inscription réussie !');
            } else {
                toast.error(translateError(data.message) || 'Echec de l\'inscription');
            }
        } catch (err) {
            toast.error('Erreur réseau. Veuillez réessayer.');
        } finally {
            setLoading(false);
        }
    };

    const handleSignIn = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

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
                router.push('/'); // Redirection vers la page d'accueil ou une autre page
                // Redirection ou autre action après connexion réussie
                console.log('Login successful:', data);
            } else {
                toast.error(translateError(data.message) || 'Echec de la connexion');
            }
        } catch (err) {
            toast.error('Erreur réseau. Veuillez réessayer.');
        } finally {
            setLoading(false);
        }
    };
    return (
        <div className='bg-white h-screen text-black flex flex-row items-center justify-evenly'>
            <Navbar />

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
                            placeholder='Nom d’utilisateur'
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
                            placeholder='Mot de passe'
                        />
                    </div>
                    <Button type='submit' disabled={loading}>
                        {loading ? 'Signing Up...' : 'S\'inscrire'}
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
                            placeholder='Mot de passe'
                        />
                    </div>
                    <Button type='submit' disabled={loading}>
                        {loading ? 'En connexion...' : 'Se connecter'}
                    </Button>
                </form>
            </div>
        </div>
    )
}

export default SignUp