import React, { useEffect, useState } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import shareVideo from "./../assets/share.mp4";
import logo from "./../assets/logo.png";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { client } from "../client";
const Login = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState([]);
  const [profile, setProfile] = useState([]);
  const login = useGoogleLogin({
    onSuccess: (codeResponse) => setUser(codeResponse),
    onError: (error) => console.log("Login Failed:", error),
  });
  useEffect(() => {
    if (user) {
      axios
        .get(
          `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`,
          {
            headers: {
              Authorization: `Bearer ${user.access_token}`,
              Accept: "application/json",
            },
          }
        )
        .then((res) => {
          setProfile(res.data);
        })
        .catch((err) => console.log(err));
    }
  }, [user]);
  useEffect(() => {
    if (profile) {
      //   console.log(profile);
      const { name, id, picture } = profile;
      if (id !== undefined && name !== undefined && picture !== undefined) {
        localStorage.setItem("user", JSON.stringify(profile));
        const doc = {
          _id: id,
          _type: "user",
          userName: name,
          image: picture,
        };
        //////save data of user to sanity database(post)
        client.createIfNotExists(doc).then(() => {
          navigate("/", { replace: true });
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profile]);

  return (
    <div className="flex justify-start items-center flex-col h-screen">
      <div className="relative h-full w-full ">
        <video
          src={shareVideo}
          controls={false}
          loop
          autoPlay
          muted
          className="w-full h-full object-cover"
        ></video>
        <div className="absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0 bg-blackOverlay">
          <div className="">
            <img src={logo} alt="logo" width="180px" className="img-logo" />
          </div>
          <div className="shadow-2xl">
            <button
              onClick={login}
              type="button"
              className="bg-mainColor flex justify-center items-center p-3 rounded-lg cursor-pointer outline-none"
            >
              <FcGoogle className="mr-4" />
              Sign in with Google
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
