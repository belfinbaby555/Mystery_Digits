import bg from "./images/BG.png"
import logo from "./images/Tantra White.png"
import Leader from "./component/Leader";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import iedc from "./images/iedc.png"
import iic from "./images/iic.png"


function Landing() {
  const [board,setboard]=useState(false)

  
const [raindrops, setRaindrops] = useState([]);
const [fade,setfade]=useState(false)
const [mute,setmute]=useState(false)

const paly=()=>{
  document.getElementById("aud").play();
  setfade(true)
}

const mut=()=>{
  mute?document.getElementById("aud").play():
  document.getElementById("aud").pause();
  setmute(!mute)
}

      
    useEffect(() => {
      const intervalId = setInterval(() => {
        const left = Math.random() * 90 + 5; 
        const time = Math.random() * 4 + 3; 
        const rotation = Math.random() * 180 - 30;
        
        const newRaindrop = (
          <p 
            key={Date.now()} 
            className="text-2xl font-bold text-gray-500 z-0 absolute -top-[10vh] " 
            style={{
              left: `${left}vw`,
              animation: `fall ${time}s linear`,
              transform: `rotate(${rotation}deg)`,
              fontFamily:"'Raleway', serif"
            }}
          >
            {Math.round(Math.random()*9)}
          </p>
        );
        
        setRaindrops((prevRaindrops) => [...prevRaindrops, newRaindrop]);
      }, 400);
  
      return () => clearInterval(intervalId);
    }, []);
  

  return (
    <div className="w-screen overflow-hidden relative h-svh bg-cover bg-no-repeat box-border px-5 py-2 flex flex-col" style={{backgroundImage:`url(${bg})`}}>
    <div className={"absolute w-screen h-svh top-0 flex left-0 duration-[2s] bg-gray-200" + (fade? " opacity-0 z-0":" opacity-100 z-20")}>
      <div className="w-fit text-center h-fit m-auto flex flex-col" style={{animation:"revele 3s"}}>
       <div className=" bg-black w-20 h-20 flex rounded-full mx-auto"> <img src={logo} className="w-10 m-auto"/></div>
      <h2 className="text-black text-3xl my-3 font-bold text-center tracking-wider leading-[50px]">Mystery Digits</h2>
      <p className="text-xs">in collaboration with</p>
      <div className="flex items-center my-3 justify-between">
      <img src={iedc} alt="iedc" className="h-8"/>
      <img src={iic} alt="iic" className="h-8"/>
      </div>
      <button onClick={paly} className="bg-gray-300 my-3 mx-auto w-14 h-14 rounded-full"><i className="fa fa-angle-left rotate-180 text-2xl text-gray-600"/></button>
      </div>
    
    </div>
    {raindrops}
    
    
    <nav className="box-border pt-2 flex justify-between z-10">
      <img src={logo} className="w-8"/>
      <div className="w-5 h-5" onClick={mut}>
      {mute?<i className="fa-solid fa-volume-xmark text-white"></i>:<i className="fa-solid fa-volume-high text-white"></i>}
      </div>
    </nav>
    <div className="flex flex-col items-center mt-7 z-10">
      <h1 className="text-black font-extrabold text-xl tracking-wide text-center my-3" style={{textShadow:'0 0 3px white,0 0 3px white'}}>Welcome back to</h1>
      <h2 className="text-white text-[45px] text-center tracking-wider leading-[50px]">Mystery <br/> Digits</h2>
      <p className="text-gray-400 my-6 text-center text-sm">Uncover the Numbers Hidden <br/>
      Within!</p>
    </div>
    <div className="w-full text-gray-200 z-10 box-border text-base px-5 py-2 my-2 border-2 border-white rounded-lg">
      <h4 className="my-2">Registration fee: Rs.20</h4>
      <h4 className="my-2">Price pool: Rs.2.5k</h4>
    </div>
    <div className="z-10">
      <Link to="/login"><button className="w-full h-fit py-2 text-[17px] rounded font-bold border-0 outline-0 mt-5 bg-white text-black ">Play Now</button></Link>
      <button onClick={()=>{setboard(!board)}} className="w-full h-fit py-1 text-[17px] rounded font-bold border-0 outline-0 mt-4 bg-transparent text-white"> View Leaderboard</button>
    </div>
    <div className="flex flex-col-reverse gap-2 mb-4 items-center z-10 mt-auto">
    <div className="w-fit h-fit flex items-center gap-6">
      <a href="mailto:ashishjosephnew@gmail.com"><i className="fa fa-envelope-o text-white text-xl" aria-hidden="true"/></a>
      <a href="https://wa.me/918547413213?text="><i className="fa fa-whatsapp text-white text-xl" aria-hidden="true"/></a>
    </div>
    <a href="tel:918547413213" className="w-36 z-10 text-center h-fit py-1 bg-white text-black rounded text-base font-bold">Contact Us</a>
    </div>
    <div className={"absolute z-10 duration-200 left-0 bg-gray-200 w-screen" + (board?" top-0":" top-full")}>
      <button onClick={()=>{setboard(!board)}} className="w-fit h-fit px-3 py-2 pb-0"><i className="fa fa-angle-left text-[40px] font-bold text-black block"/></button>
      <h1 className="text-3xl font-bold w-full text-center my-2 mb-5">Top 10 Rank</h1>
      <Leader/>
    </div>
   </div>
  );
}

export default Landing;
