import React, { useEffect, useState } from "react";
import axios from "axios";
import Confetti from "react-confetti";
import over from "../images/game_over.png"
import text from "../images/text_over.png"
import { useNavigate } from "react-router-dom";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

function GamePlay({select}){

    const [left,setleft]=useState()
    const [user,getuser]=useState({})
    const [mute,setmute]=useState(false)
    const [file,setfile]=useState();
    const [error,seterror]=useState(false)
    const [approved,setapproved]=useState(false)
    const [load,setload]=useState(false)

    const navi=useNavigate()

    const mut=()=>{
        mute?document.getElementById("aud").play():
        document.getElementById("aud").pause();
        setmute(!mute)
      }

    useEffect(()=>{
        axios.get("/dashboard")
        .then(res=>{
            getuser(res.data)
            setleft(res.data.level)
            setfile(res.data.filepath)
        })
        .catch(e=>{
            navi("/login")
        })
    },[])
    const remain=(e)=>{
        setleft(user.level)

        const val = Number(user.level)

        
        if(val-(e.target.value.length) <= 0){
            setleft(0)
        }
        else{
            setleft(val-(e.target.value.length))
        }
    }

    const resume=()=>{
        axios.get("/resumeTime")
        .then(res=>{})
        .catch(e=>{})
    }

    const game=(event)=>{
        setload(true)
        event.preventDefault()

        const val=event.target.elements[0].value;

        axios.get("/get_csrf_token")
        .then(res=>{
            axios.post("/game",{val:val},{
                headers:{
                    "Content-Type":"application/json",
                    "X-CSRFToken":res.data.message
                }
            }).then(res=>{
                getuser(res.data)
                setfile(res.data.filepath)
                setleft(res.data.level)
                setapproved(true)
                event.target.elements[0].value=""
                setload(false)
            })
            .catch(e=>{
                getuser(prevState => ({
                    ...prevState,     
                    tries: e.response.data.tries ,
                    continue: e.response.data.continue 
                  }));
                  setleft(e.response.data.level)
                  seterror(true)
                  setTimeout(()=>{seterror(false)},2000)
                  event.target.elements[0].value=""
                  setload(false)
            })
        })
    }
    return(
        <div className={"w-full h-svh bg-gray-300 text-center rounded-xl relative overflow-hidden box-border px-2 py-3" + (select?" block":" hidden")}>
            {user.continue?
            <div className="flex flex-col h-full">
                {approved?<div className="absolute top-0 left-0 flex h-full w-full backdrop-blur-sm bg-[#00000025] z-30">
                <div className="w-11/12 rounded box-border flex flex-col gap-3 h-fit bg-white m-auto px-3 py-5">
                    <h1 className="font-bold text-2xl">Congratulations</h1>
                    <p className="text-sm text-gray-700">Level {Number(user.level)-1} completed</p>
                    <button onClick={()=>{setapproved(false);resume()}} className="px-3 py-2 text-white bg-black rounded"> Next</button>
                    </div>
                <Confetti numberOfPieces={500} recycle={false} />
            </div>:""}
                    <h1 className="pb-3 text-lg w-full relative font-semibold">Mystery Quest 
                    <div className="w-5 h-5 absolute right-0 top-0" onClick={mut}>
      {mute?<i className="fa-solid fa-volume-xmark text-sm text-black"></i>:<i className="fa-solid fa-volume-high text-sm text-black"></i>}
                    </div>
                    </h1>
                    
                <div className="w-full flex justify-between ">
                    <span className="flex items-center text-gray-600 text-sm">
                        <i className="fa-solid fa-arrow-up-right-dots mr-2"/>
                        <p >Level:<b className="text-black text-base">{user.level}</b></p>
                    </span>
                    <span className="flex items-center text-sm text-gray-600">
                        <i className="fa-solid fa-users-line mr-2"/>
                        <p>Players:<b className="text-black text-base">300+</b></p>
                    </span>
                </div>
                <h4 className="text-gray-600 text-center my-2">No. of tries left:<b className="text-black">{user.tries}</b></h4>
                <div className="relative w-fit h-fit overflow-y-hidden">
                <TransformWrapper
      initialScale={1}
      minScale={1}
      maxScale={3}
      wheel={{ disabled: false }} // Disable mouse wheel zoom for mobile compatibility
      doubleClick={{ disabled: false }} // Disable double-tap zoom on mobile
    >
         <TransformComponent >
                <img src={file} className="w-full h-fit rounded-lg" />
                </TransformComponent>
                </TransformWrapper>
                </div>
                <p className="text-xs pb-1 text-gray-600 text-left">**double tap on img to zoom</p>
                
                <div className="w-full px-3 py-1 bg-black text-white text-center rounded">Digit Left: {left}</div>
                <form onSubmit={game} className="mt-auto">
                <input required type="number" onChange={remain} placeholder="Enter the numbers found" className="w-full border-2 border-black px-3 py-2 mt-6 rounded"/>
                {error?<p className="text-sm text-red-600 ">Wrong Digits {user.tries} chances left</p>:null}
                <button className="w-full mt-3 py-2 bg-black text-white rounded text-lg" style={error?{animation:"shake 0.4s"}:{animation:"none"}} type="submit">{load?<div className="w-5 mx-auto rounded-full  h-5 border-4 animate-spin border-gray-500 border-t-white "></div>:"Submit"}</button>                   
                </form>  
                
            </div>:
            <div className="box-border my-auto w-full px-3 py-4 flex flex-col">
                <img src={over} className="w-1/2 mt-10 mx-auto"/>
                <img src={text} className="h-10 w-fit mx-auto invert"/>
                <p className="mt-5 text-gray-600">Thanks for passing by...</p>
                </div>
                }         
            </div>
    )
}export default GamePlay;