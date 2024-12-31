import React from "react";
import earth from "./images/wallpaper.jpg"
import axios from "axios";


export default function Login(){

document.addEventListener("submit",(e)=>{
    e.preventDefault();
    const data={
    'email':e.target[0].value,
    'password':e.target[1].value
    }
    axios.post("/login",data,{
        headers:{
            "Content-Type":"application/json",
            "X-CSRFToken":'wdjnwidj'
        }
    })
    .then(res=>{
        console.log(res.data)
    })
})

    return(
        <div className="w-screen h-screen flex font-open bg-no-repeat bg-cover bg-center" style={{backgroundImage:`url('${earth}')`}}>
            <div className="w-fit box-border py-5 px-3 h-fit m-auto mr-0 flex flex-col">
                
            </div>
            <div className="w-fit h-fit backdrop-blur bg-black/30 box-border p-10 rounded-lg  m-auto ml-0 text-center flex flex-col">
                <h1 className="uppercase text-white font-bold text-2xl my-6">login</h1>
                <form className="flex flex-col text-left my-2">
                <input type="email" className="px-2 w-80 py-3 outline-none bg-white/40  mb-6 placeholder:text-gray-800 rounded-r border-l-4 border-green-600 text-sm" required placeholder="example@gmail.com"/>
                <input type="password" className="px-2 py-3 mb-4 outline-none bg-white/40 rounded-r placeholder:text-gray-800 border-l-4 border-green-600 text-sm" required placeholder="pass****"/>
                <button type="submit" className="w-full rounded-full mt-5 text-lg bg-green-600 text-white py-2 uppercase tracking-wider font-bold">Sign In</button>
                </form>
                {/* <p className="text-xs font-semibold">Don't have an account? <a className="text-blue-800 font-bold">Sign Up</a></p> */}
            </div>

        </div>
    )
}