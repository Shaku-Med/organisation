import axios from 'axios'
import Cookies from 'js-cookie'
import React, { useContext, useEffect } from 'react'
import {v4 as uuid} from 'uuid'
import { Connection } from '../Connection'

function Topnav() {
 
    const {navtool, setnavtool, friends, setfriends} = useContext(Connection)

    useEffect(() => { 

        setTimeout(() => {
            axios.post("https://orgbackend.vercel.app/owner/user", { 
                c_usr: Cookies.get("c_usr"),
                xs: Cookies.get("xs")
            }).then(res => { 
               if(res.data === "Erros"){ 
                Cookies.remove("c_usr")
                Cookies.remove("xs")
                localStorage.clear()
               }
               else { 
                   res.data.map(val => { 
                     setnavtool(val)
                 })
               }
            })
        }, 1000);


    }, [])

  return (
    <>
       { 
        navtool === '' ?
        <div className="loading_ani">
        <div className="h4 text-center">Loading...</div>
    </div> 
         :
        [navtool].map((val, key) => { 
            if(val.c_usr === Cookies.get('c_usr')){ 
                return ( 
                    <div key={key} className="nav_top shadow">
                    <div className="nav_cont">
                        <div className="nav_f">
                            <div className="logos">
                                <img style={{pointerEvents: 'none'}} src="../mainlogo.png" alt="" />
                                <div className="logon">ORG</div>
                            </div>
                        </div>
                        <div className="nav_mid">
                            <div onClick={e => { 
                                window.open("../", "_self")
                            }} className="tools1">
                                <i className="fa fa-home"></i>
                                <span id='outspan'>Home</span>
                            </div>
                            { 
                             val.states === 'Admin' ? 
                             <div onClick={e => { 
                                window.open("../Preview", "_self")
                             }} className="tools1">
                                <i className="fa fa-plane"></i>
                                <span id='outspan'>Post</span>
                            </div>
                            :
                            ''
                            }
                            <div onClick={e => { 
                                window.open("../Profile/" + val.c_usr, "_self")
                            }} className="tools1">
                                <i className="fa fa-user"></i>
                                <span id='outspan'>Profile</span>
                            </div>
            
                            <div className="user_profile tools1" style={{pointerEvents: 'none'}}>
                                <img onError={e => { 
                                    e.target.src = "https://media.istockphoto.com/id/1011988208/vector/404-error-like-laptop-with-dead-emoji-cartoon-flat-minimal-trend-modern-simple-logo-graphic.jpg?s=612x612&w=0&k=20&c=u_DL0ZH5LkX57_25Qa8hQVIl41F9D0zXlTgkWNnHRkQ="
                                }} src={val.profilepic} alt="" />
                            </div>
                        </div>
                    </div>
                </div>
                )
            }
         })
       }
    </>
  )
}

export default Topnav
