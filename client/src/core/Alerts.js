import React from "react";
// import { Link } from "react-router-dom";

export const Failure = ({msg,bool,setBool}) => {
    return (
        <div className="flex flex-col justify-center">
        <div style={{display: bool ? "" : "none"}} 
        className="mb-4 bg-red border border-red text-white px-4 py-3 rounded relative" role="alert">
  <strong className="font-bold">Holy smokes! </strong>
  <span className="block sm:inline">{msg}</span>
  <button onClick={()=>{setBool(false)}} className="block float-right">X</button>
</div>
</div>
    )
}

export const Success = ({msg,bool,setBool}) => {
    return (
        <div className="flex flex-col justify-center">
        <div style={{display: bool ? "" : "none"}}
        className="mb-4 bg-green border border-green text-white px-4 py-3 rounded relative" role="alert">
  <strong className="font-bold">Congratulations! </strong>
  <span className="block sm:inline">{msg}</span>
  <button onClick={()=>{setBool(false)}} className="block float-right">X</button>
</div>
</div>
    )
}


