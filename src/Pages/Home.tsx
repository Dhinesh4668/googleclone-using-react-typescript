import {
  MicrophoneIcon,
  SearchIcon,
  ViewGridIcon,
} from "@heroicons/react/solid";
import React, { FC, FormEvent, useRef } from "react";
import Avatar from "../components/Avatar";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import { useResultContext } from "../context/ResultContextProvider";

const Home: FC = () => {
  const searchInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const { setSearchTerm } = useResultContext();

  const search = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const term = searchInputRef!.current!.value;

    setSearchTerm(term);
    navigate("/search");
  };
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <header className="flex w-full p-5 justify-between text-sm text-gray-700">
        <div className="flex space-x-4 items-center">
          <p className="link">About</p>
          <p className="link">Store</p>
        </div>

        <div className="flex space-x-4 items-center">
          <p className="link">Gmail</p>
          <p className="link">Images</p>

          <ViewGridIcon className="h-10 w-10 p-2 rounded-full hover:bg-gray-100 cursor-pointer" />

          <Avatar url="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSOSTflwoPd8PjRq13uX3yAeYwcGhGZ4koLW2JBUaCuQ&s" />
        </div>
      </header>

      <form
        className="flex flex-col items-center mt-44 flex-grow w-4/5"
        onSubmit={search}
      >
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/368px-Google_2015_logo.svg.png"
          width={300}
          height={100}
        />
        <div className="flex w-full mt-5 hover:shadow-lg focus-within:shadow-lg max-w-md rounded-full border border-gray-200 px-5 py-3 items-center sm:max-w-xl lg:max-w-2xl">
          <SearchIcon className="h-5 mr-3 text-gray-500" />
          <input
            type="text"
            className="focus:outline-none flex-grow"
            ref={searchInputRef}
          />
          <MicrophoneIcon className="h-5" />
        </div>

        <div className="flex flex-col w-1/2 space-y-2 justify-center mt-8 sm:space-y-0 sm:flex-row sm:space-x-4">
          <button className="btn">Google Search</button>

          <button className="btn">I&apos;m Feeling Lucky</button>
        </div>
      </form>

      <Footer />
    </div>
  );
};

export default Home;
