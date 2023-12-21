"use client";
import { auth } from "@/app/firebase/config";
import axios from "axios";
import { LogOut } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

const page = (props) => {
  const router = useRouter();
  const[user , loading] =useAuthState(auth);
  const gifId = props.params.gifId;
  const [gifDetail, setGifDetail] = useState([]);
  const GetDetails = async (gifId) => {
    try {
      const result = await axios.get(
        `https://api.giphy.com/v1/gifs/${gifId}?api_key=GlVGYHkr3WSBnllca54iNt0yFbjz7L65`
      );
      const data = result.data.data;

      setGifDetail(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    GetDetails(gifId);
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
    
      <Link href={`/`} className="absolute top-5 left-5 border border-black py-2 px-5 rounded-md">Homepage</Link>
      <h1 className="w-full text-center py-5 text-5xl">GIF Details</h1>
      <br />
      <br />
      <div className=" flex flex-col items-center justify-center gap-5">
        <p className="text-3xl">Title : {gifDetail?.title}</p>
        <img src={gifDetail?.images?.original?.url} className=" w-96" />
      </div>
    </>
  );
};

export default page;
