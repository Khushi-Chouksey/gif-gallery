'use client'
import { useState } from "react";
import { useRouter } from "next/navigation";
import { SearchIcon } from "lucide-react";

export const SearchInputBox = ({from}) => {

  // state for saving searched photo by user
  const [slug, setSlug] = useState("");

  const router = useRouter()

  const searchHandler = async (e) => {
    e.preventDefault();
    const searchedPhoto = e.target.searchPhotoId.value ;
    if(from === "searchPhoto"){
      router.push(`./${searchedPhoto}`)
    }
    else{
        router.push(`./searchPhoto/${searchedPhoto}`)
    }
  };


  return (
    <div className="w-1/2 mx-auto my-5">
      <div className="space-y-3">
        <h1 className={`font-bold  text-3xl`}>Search Gif</h1>
        
        <form onSubmit={searchHandler} className="w-full border bg-[#f2f2f2] text-black flex items-center px-4 rounded-lg gap-2">
          <SearchIcon />
          <input
            type="text"
            className=" bg-transparent  text-black  py-3 fs-4 w-full focus:outline-none"
            placeholder="Search gif like 'Cat', 'Friends', 'Nature'..."
            onChange={(e) => setSlug(e.target.value)}
            name="searchPhotoId"
          />
        </form>
      </div>
    </div>
  );
};

