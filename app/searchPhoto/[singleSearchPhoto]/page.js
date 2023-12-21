"use client";
import { auth } from "@/app/firebase/config";
import { SearchInputBox } from "@/components/searchBar";
import axios from "axios";
import { LogOut } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

const page = (props) => {
  const router = useRouter();
  const[user , loading] =useAuthState(auth);
  const encodedText = props.params.singleSearchPhoto;
  const SearchPhoto = decodeURIComponent(encodedText);

  const [searchPhotoList, setSearchPhotoList] = useState([]);

  const GetSearchPhotoList = async () => {
    const result = await axios.get(
      `https://api.giphy.com/v1/gifs/search?q=${SearchPhoto}&api_key=GlVGYHkr3WSBnllca54iNt0yFbjz7L65`
    );
    const data = result.data.data;
    setSearchPhotoList(data);
  };

  useEffect(() => {
    GetSearchPhotoList();
  }, []);

  if(loading) return <p>Loading....</p>

  if(!user) return router.push('/login')



  return (
    <div>
      <div className="w-full pe-5 my-3 flex items-center justify-end gap-3">
        <p className="text-2xl font-semibold">{user?.displayName}</p>
        <div className="w-12 h-12 bg-[#00000019] rounded-full">
          <img src={user?.photoURL} alt=""  className=" rounded-full"/>
        </div>
        <button onClick={() => auth.signOut()}><LogOut /></button>
      </div>
      <Link href={`/`} className="absolute top-5 left-5 border border-black py-2 px-5 rounded-md">Homepage</Link>
      <SearchInputBox from="searchPhoto" />
      <br /><br />
      <h1 className="w-full text-center py-5 text-5xl ">Search Result for <span className="text-blue-500">{SearchPhoto}</span></h1>
      <div className="flex flex-wrap gap-2">
        {searchPhotoList.map((gif) => (
          <div key={gif?.id}>
            <Link href={`/gifdetails/${gif?.id}`}>
              <img src={gif?.images?.preview_gif?.url} className=" w-60" />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default page;
