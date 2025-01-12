import React, { useState } from "react";
import earth from "./images/wallpaper.jpg"
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";


export default function Login(){

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
      email: "",
      password: "",
    });
  
    const [error, setError] = useState({
      email: "",
      password: "",
    });
  
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      try {
        const response = await axios.post(
          "/login",
          { ...formData },
          {
            headers: {
              "Content-Type": "application/json",
              "X-CSRFToken": "wdjnwidj", // Replace with a dynamic token
            },
          }
        );
  
        const { message } = response.data;
  
        if (message === "success") {
          navigate("/");
        } else if (message === "User does not exist") {
          setError({ email: "User Does not Exist", password: "" });
        } else {
          setError({ email: "", password: message });
        }
      } catch (err) {
        setError({ email: "", password: "An error occurred. Please try again." });
      }
    };

    return(
        <div className="w-screen h-screen flex font-open box-border p-5 bg-no-repeat bg-cover bg-center" style={{backgroundImage:`url('${earth}')`}}>
           
            <div className="w-full h-full backdrop-blur bg-black/20 box-border p-10 rounded-lg  m-auto text-center flex flex-col">
                <h1 className="uppercase text-white font-bold mt-auto text-2xl my-6">login</h1>
                <form className="flex flex-col text-left mx-auto my-2" onSubmit={handleSubmit}>
                <input type="email" name="email" value={formData.email} onChange={handleInputChange} className="px-2 w-80 py-3 outline-none bg-white/40  mb-2 placeholder:text-gray-800 rounded-r border-l-4 border-green-600 text-sm" required placeholder="example@gmail.com"/>
                <p className="text-red-700 font-semibold text-sm mb-4 w-80">{error.email}</p>
                <input  type="password" name="password" value={formData.password} onChange={handleInputChange} className="px-2 w-80 py-3 mb-2 outline-none bg-white/40 rounded-r placeholder:text-gray-800 border-l-4 border-green-600 text-sm" required placeholder="pass****"/>
                <p className="text-red-400 font-semibold text-sm mb-4 w-80 h-fit break-words">{error.password}</p>
                <button type="submit" className=" w-80 rounded-full mt-5 text-lg bg-green-600 text-white py-2 uppercase tracking-wider font-bold">Sign In</button>
                </form>
                <p className="text-xs mb-auto text-white font-semibold">Don't have an account? <Link to="/signup" className="text-green-600 font-bold">Sign Up</Link></p>
            </div>

        </div>
    )
}