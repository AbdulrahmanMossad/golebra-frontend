/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import { IoMdAdd, IoMdSearch } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";

const Navbar = ({ searchTerm, setSearchTerm, user }) => {
  const navigate = useNavigate();
  return (
    <div className="flex gap-2 md:gap-5 w-full pb-7 mt-5 home">
      <div
        id="exp"
        className="px-2 flex justify-start items-center w-full rounded-md bg-white border-none outline-none focus-within:shadow-sm "
      >
        <IoMdSearch className="ml-1 inp" fontSize={21} />
        <input
          autocomplete="off"
          type="text"
          id="inp"
          className="w-full p-2 outline-none bg-white"
          placeholder="search"
          onChange={(e) => setSearchTerm(e.target.value)}
          value={searchTerm}
          onFocus={() => navigate("/search")}
        />
      </div>
      {user ? (
        <div className="flex gap-3">
          <Link to={`user-profile/${user?._id}`} className="hidden md:block ">
            <img src={user?.image} className="rounded-full w-14 h-12" />
          </Link>
          <Link
            to="/create-pin"
            className=" text-white  w-12 h-12 md:w-14 md:h-12 flex justify-center items-center addIcon"
          >
            <IoMdAdd className="" />
          </Link>
        </div>
      ) : (
        <Link
          to="/login"
          className=" text-white  w-12 h-12 md:w-14 md:h-12 flex justify-center items-center addIcon"
        >
          Join
        </Link>
      )}
    </div>
  );
};

export default Navbar;
