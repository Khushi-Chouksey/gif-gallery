"use client";
import { SearchInputBox } from "@/components/searchBar";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import {auth} from '@/app/firebase/config'
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";


const page = () => {
  const router = useRouter();
  const[user , loading] =useAuthState(auth);
  const [trendingGif, setTrendingGif] = useState([]);

 
  const fetchTrendingGifs = async () => {
    const result = await axios.get(
      `https://api.giphy.com/v1/gifs/trending?api_key=GlVGYHkr3WSBnllca54iNt0yFbjz7L65`
    );
    const data = result.data.data;
   
    setTrendingGif(data);
  };

  useEffect(() => {
    fetchTrendingGifs();
  }, []);

  if(loading) return <p>Loading....</p>

  if(!user) return router.push('/login')
  
  return (
    <>
    <div className="w-full pe-5 my-3 flex items-center justify-end gap-3">
      <p className="text-2xl font-semibold">{user?.displayName}</p>
      <div className="w-12 h-12 bg-[#00000019] rounded-full">
        <img src={user?.photoURL} alt=""  className=" rounded-full"/>
      </div>
      <button onClick={() => auth.signOut()}><LogOut /></button>
    </div>
      <SearchInputBox />
      <h1 className="w-full text-center py-5 text-5xl">Trending GIF</h1>
      <br />
      <br />
      <div className="flex flex-wrap gap-2">
        {trendingGif.map((gif) => (
          <div key={gif?.id}>
            <Link href={`/gifdetails/${gif?.id}`}>
            <img src={gif?.images?.preview_gif?.url} className=" w-60" />
            </Link>
          </div>
        ))}
      </div>
    </>
  );
};

export default page;
