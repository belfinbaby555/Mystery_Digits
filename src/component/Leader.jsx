import axios from "axios";
import React, { useEffect, useState } from "react";

function Leader() {
    const [rankings, setRankings] = useState([]);

    const fetchRankings = async () => {
        try {
            const { data } = await axios.get("/getL");
            const sortedData = [...data].sort((a, b) => Number(a[0]) - Number(b[0]));
            setRankings(sortedData);
        } catch (error) {
            
        }
    };

    useEffect(() => {
        fetchRankings();
        const intervalId = setInterval(fetchRankings, 3000);
        
        return () => clearInterval(intervalId); // Clear interval on component unmount
    }, []);

    return (
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
                    {rankings.length > 0 ? (
                        rankings.map((item, index) => (
                            <tr
                                key={index}
                                className={`text-center ${Number(item[4]) ? "text-red-700 line-through" : ""}`}
                            >
                                <td className="py-2">{item[0]}</td>
                                <td>{item[1]}</td>
                                <td>{item[2]}</td>
                                <td>{item[3]}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4" className="text-center py-4">
                                No rankings available
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default Leader;
