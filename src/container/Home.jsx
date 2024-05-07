import React, { useState, useRef, useEffect } from "react";
import { userQuery } from "../utils/data";
import { HiMenu } from "react-icons/hi";
import { Link, Route, Routes } from "react-router-dom";
import Sidebar from "./../components/Sidebar";
import logo from "./../assets/logo.png";
import UserProfile from "./../components/UserProfile";
import Pins from "./Pins";
import { AiFillCloseCircle } from "react-icons/ai";
import { client } from "../client";
const Home = () => {
  const [toggleSidebar, setToggleSidebar] = useState(false);
  const [user, setUser] = useState();
  const scrollRef = useRef(null);

  const userInfo =
    localStorage.getItem("user") !== "undefined"
      ? JSON.parse(localStorage.getItem("user"))
      : localStorage.clear();

  useEffect(() => {
    if (userInfo) {
      const query = userQuery(userInfo?.id);
      client.fetch(query).then((data) => {
        setUser(data[0]);
      });
    }
  }, [userInfo]);

  useEffect(() => {
    scrollRef.current.scrollTo(0, 0);
  });

  return (
    <div className="flex bg-gray-50 md:flex-row flex-col transition-height duration-75 ease-out home">
      <div className="hidden md:flex  flex-initial secondary">
        <Sidebar user={user && user} />
      </div>

      <div className="flex md:hidden flex-row ">
        <div className="p-2 w-full flex flex-row justify-between items-center shadow-md ">
          <HiMenu
            fontSize={40}
            className="cursor-pointer icon"
            onClick={() => setToggleSidebar(true)}
          />
          <Link to="/">
            <img src={logo} alt="logo" className="w-28" />
          </Link>
          <Link to={`user-profile/${user?._id}`}>
            <img
              src={user?.image}
              alt="user-pic"
              className="w-9 h-9 rounded-full "
            />
          </Link>
        </div>
        {toggleSidebar && (
          <div className="fixed w-full sm:w-3/5 z-10 h-screen overflow-y-auto animate-slide-ins">
            <div className="absolute w-full flex justify-end items-center p-2">
              <AiFillCloseCircle
                fontSize={30}
                className="icon"
                onClick={() => setToggleSidebar(false)}
              />
            </div>
            <Sidebar closeToggle={setToggleSidebar} user={user && user} />
          </div>
        )}
      </div>
      <div className="pb-2 flex-1 h-screen" ref={scrollRef}>
        <Routes>
          <Route path="/user-profile/:userId" element={<UserProfile />} />
          <Route path="/*" element={<Pins user={user && user} />} />
        </Routes>
      </div>
    </div>
  );
};

export default Home;
