"use client";
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import Logo from '@public/images/logo.svg';

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    async function checkLoginStatus() {
      const token = localStorage.getItem('token');
      // If you don't need the fetch, you can remove it or handle it as needed
      const response = await fetch(`http://${process.env.NEXT_PUBLIC_HOST}:8000/auth/isAuthenticated`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        method: 'GET',
      });
      if (response.ok) {
        const data = await response.json();
        if (data.status === 'authenticated') {
          const user = localStorage.getItem('user');
          if (user) {
            const parsedUser = JSON.parse(user);
            setIsLoggedIn(!!parsedUser);
          }
        } else {
          setIsLoggedIn(false);
        }
      } else {
        setIsLoggedIn(false);
      }
      // If you want to handle the case where the user is not logged in
      if (!token) {
        setIsLoggedIn(false);
      }
    }
    checkLoginStatus();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    window.location.href = '/';
  };

  return (
    <div className="fixed top-0 z-50 w-full bg-white">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Qlash</span>
            <Image width={64} height={64} className="h-8 w-auto" src={Logo} alt="Qlash logo" />
          </Link>
        </div>

        <div className="flex lg:hidden">
          <button
            onClick={() => setIsMenuOpen(true)}
            className="inline-flex items-center justify-center p-2 text-gray-700 hover:text-gray-900 hover:cursor-pointer transition duration-200 ease-in-out"
          >
            <svg className="size-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        <div className="hidden lg:flex lg:gap-x-6 flex items-center justify-between">
          <div className='lg:flex lg:gap-x-6 flex items-center'>
            <Link href="/create" className="text-sm font-semibold text-gray-900 hover:text-indigo-600 transition duration-200 ease-in-out">Héberger</Link>
            <Link href="/join" className="text-sm font-semibold text-gray-900 hover:text-indigo-600 transition duration-200 ease-in-out">Rejoindre</Link>
          </div>
          <div className='lg:flex lg:gap-x-6 flex items-center'>
            {isLoggedIn ? (
              <>
                <Link href="/newquizz" className="text-sm font-semibold text-gray-900 hover:text-indigo-600 transition duration-200 ease-in-out">Nouveau Quizz</Link>
                <Link href="/profile" className="text-sm font-semibold text-gray-900 hover:text-indigo-600 transition duration-200 ease-in-out">Profil</Link>
                <button onClick={handleLogout} className="text-sm font-semibold text-gray-900 hover:text-indigo-600 hover:cursor-pointer transition duration-200 ease-in-out">Déconnexion</button>
              </>
            ) : (
              <>
                <Link href="/signup" className="text-sm font-semibold text-gray-900 hover:text-indigo-600 transition duration-200 ease-in-out">Se connecter</Link>
                <Link href="/signup" className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white hover:bg-indigo-500 transition duration-200 ease-in-out">S&apos;inscrire</Link>
              </>
            )}
          </div>
        </div>
      </nav>

      {isMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-white p-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10 overflow-y-auto">
          <div className="flex items-center justify-between">
            <Link href="/" className="-m-1.5 p-1.5">
              <Image width={64} height={64} className="h-8 w-auto" src={Logo} alt="Qlash logo" />
            </Link>
            <button
              onClick={() => setIsMenuOpen(false)}
              className="-m-2.5 rounded-md p-2.5 text-gray-700 hover:cursor-pointer transition duration-200 ease-in-out"
            >
              <svg className="size-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="mt-6 space-y-4">
            <Link href="/create" onClick={() => setIsMenuOpen(false)} className="block text-base font-semibold text-gray-900 hover:bg-gray-100 p-2 rounded transition duration-200 ease-in-out">Host</Link>
            <Link href="/join" onClick={() => setIsMenuOpen(false)} className="block text-base font-semibold text-gray-900 hover:bg-gray-100 p-2 rounded transition duration-200 ease-in-out">Join</Link>
            {isLoggedIn ? (
              <>
                <Link href="/newquizz" onClick={() => setIsMenuOpen(false)} className="block text-base font-semibold text-gray-900 hover:bg-gray-100 p-2 rounded transition duration-200 ease-in-out">New Quizz</Link>
                <Link href="/profile" onClick={() => setIsMenuOpen(false)} className="block text-base font-semibold text-gray-900 hover:bg-gray-100 p-2 rounded transition duration-200 ease-in-out">Profile</Link>
                <button
                  onClick={() => { setIsMenuOpen(false); handleLogout(); }}
                  className="block w-full text-left text-base font-semibold text-gray-900 hover:bg-gray-100 hover:cursor-pointer p-2 rounded transition duration-200 ease-in-out"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/signup" onClick={() => setIsMenuOpen(false)} className="block text-base font-semibold text-gray-900 hover:bg-gray-100 p-2 rounded transition duration-200 ease-in-out">Log in</Link>
                <Link href="/signup" onClick={() => setIsMenuOpen(false)} className="block text-base font-semibold text-gray-900 hover:bg-gray-100 p-2 rounded transition duration-200 ease-in-out">Sign up</Link>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
