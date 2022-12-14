import axios from "axios";
import Cookies from "js-cookie";
import React, { useContext, useState } from "react";
import { useEffect } from "react";
import Linkify from "react-linkify";
import { Connection } from "../Connection";

function Cos() {

    const { navtool, setnavtool, friends, setfriends, rand, setrand, maint, setmaint, exptime, setexptime } = useContext(Connection);

    useEffect(() => { 
        setTimeout(() => {
            axios
          .post("https://orgbackend.vercel.app/users/all", {
            c_usr: Cookies.get("c_usr"),
            xs: Cookies.get("xs"),
          })
          .then((res) => {
            setfriends(res.data);
            let ars_no = Math.floor(Math.random() * res.data.length)
            setrand(res.data[ars_no])
          });
        }, 3000);
    
    
        setTimeout(() => {
            axios
          .post("https://orgbackend.vercel.app/video/admin", {
            c_usr: Cookies.get("c_usr"),
            xs: Cookies.get("xs"),
          })
          .then((res) => {
            setmaint(res.data)
          });
        }, 5000);

        let daa = new Date(),
        dase = daa.getDate()
    
        setexptime(dase)
    

    }, [])

  return (
    <div style={{display: 'none'}}></div>
  )
}

export default Cos