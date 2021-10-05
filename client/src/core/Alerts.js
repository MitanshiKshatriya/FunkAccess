import React from "react";
// import { Link } from "react-router-dom";

export const Failure = ({msg,bool}) => {
    return (
        <div className="flex flex-col justify-center items-center">
        <div style={{display: bool ? "" : "none"}} 
        className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
  <strong className="font-bold">Holy smokes! </strong>
  <span className="block sm:inline">{msg}</span>
  
</div>
</div>
    )
}

export const Success = ({msg,bool}) => {
    return (
        <div className="flex flex-col justify-center">
        <div style={{display: bool ? "" : "none"}}
        className="mb-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
  <strong className="font-bold">Congratulations! </strong>
  <span className="block sm:inline">{msg}</span>
</div>
</div>
    )
}


