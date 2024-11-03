import React, { useEffect, useState } from "react";
import bg from "./images/BGLogin.png"
import logo from "./images/Tantra White.png"
import Term from "./component/Terms";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login(){
    const [move,setmove]=useState(false)
    const [csrf,setcsrf]=useState("");
    const [load,setload]=useState(false)
    const [error,seterror]=useState('')
    const navigate=useNavigate();
    const [mute,setmute]=useState(false)
    

    useEffect(()=>{
        axios.get("/get_csrf_token",{
            withCredentials:true
            }
        )
            .then((res)=>{
                setcsrf(res.data.message)
            })
    },[])
    const mut=()=>{
        mute?document.getElementById("aud").play():
        document.getElementById("aud").pause();
        setmute(!mute)
      }
    function login(event){
        setload(true)
        seterror("")
        event.preventDefault();

        axios.post("/getDetails",{phone:event.target.elements[0].value},{
            headers:{
                "Content-Type":"application/json",
                "X-CSRFToken":csrf
            }
        }).then(res=>{
            if(res.data.message==="Data received successfully"){
                navigate("/game")
                setload(false)
            }
            else{
                seterror(res.data.message)
                setload(false)
            }
        })
        
    }

    return(
        <div className="w-screen h-svh flex overflow-hidden flex-col bg-cover relative bg-no-repeat box-border px-5 py-3" style={{backgroundImage:`url(${bg})`}}>

            <nav className="box-border pt-2 flex justify-between">
                <img src={logo} className="w-8"/>
                <div className="w-5 h-5" onClick={mut}>
      {mute?<i class="fa-solid fa-volume-xmark text-white"></i>:<i class="fa-solid fa-volume-high text-white"></i>}
      </div>
            </nav>
            <p className="text-3xl w-full text-center mix-blend-difference my-12 text-white">Mystery <br/> Digits</p>
            <h4 className="text-3xl py-10 font-bold text-gray-700 text-center">Login</h4>
            <form onSubmit={login}>
            <input type="number" required placeholder="Enter Registered number" className="w-full outline-0 px-4 text-sm py-2 border-b-[1px] border-gray-500 bg-transparent"/>
            <p className="text-red-600 text-sm">{error}</p>
            <button className="w-full text-lg py-2 bg-black text-white rounded mt-10" type="submit">{load?<div className="w-5 mx-auto rounded-full  h-5 border-4 animate-spin border-gray-500 border-t-white "></div>:"Next"}</button>
            </form>
            <div className={"absolute top-0 duration-500" + (move?" left-full":" left-0")}>
                <Term move={move} setmove={setmove}/>
            </div>
        </div>
    )
}export default Login;