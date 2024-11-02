import axios from "axios";
import React, { useEffect, useState } from "react";

function Leader(){

    const [rank,getrank]=useState();

    useEffect(()=>{
        axios.get("/getL")
        .then((res)=>{
            const sorted= [...res.data].sort((a,b)=>Number(a[0]) - Number(b[0]))
    
        getrank(sorted)
        })
        
    
       },[])

    useEffect(()=>{
   setInterval(()=>{
   
        axios.get("/getL")
        .then((res)=>{
            const sorted= [...res.data].sort((a,b)=>Number(a[0]) - Number(b[0]))
    
        getrank(sorted)
        })
        
   },5000) },[])

    return(
        <div className="w-full h-svh box-border p-2">
            <table className="w-full">
                <thead className="border-2 border-black">
                <tr className="text-center">
                    <th>Rank</th>
                    <th>Name</th>
                    <th>Level</th>
                    <th>Time</th>
                </tr>
                </thead>
                <tbody className="border-2 border-black">
                {
                rank && rank.map((item,index)=>{
                   return(
                    <tr className={"text-center" + (Number(item[4])?" text-red-700 line-through":" ")} key={index}>
                    <td className="py-2">{item[0]}</td>
                    <td>{item[1]}</td>
                    <td>{item[2]}</td>
                    <td>{item[3]}</td>
                </tr>
                   )
                })}
                </tbody>
            </table>
        </div>
    )
}export default Leader;