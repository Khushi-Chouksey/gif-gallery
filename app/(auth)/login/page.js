'use client'
import { auth } from '@/app/firebase/config';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';

const Login = () => {
    const router = useRouter();
    const provider = new GoogleAuthProvider();
    const [user , loading] =useAuthState(auth)
    if(loading)  return <p>Loading...</p>
    if(user) return router.push('/')

    const signUpHandler = async ()=>{
        await signInWithPopup(auth , provider)
        router.push('/')
    }
 return (
    <div className='w-full  h-screen flex flex-col items-center justify-center gap-20'>
      <h1 className='text-4xl'>Hey...Register Yourself here 😃 </h1>
    <button onClick={signUpHandler} className='py-3 px-6 bg-blue-500 text-white rounded-md border-none'>Sign Up with Google</button>
    </div>
 );
};

export default Login;