import axios from 'axios'
import Cookies from 'js-cookie'
import React, { useContext, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import {v4 as uuid} from 'uuid'
import { Connection } from '../Connection'
import CryptoJS from "crypto-js";

import io from 'socket.io-client'

const socket = new io("https://orgbsocket.onrender.com", { 
  reconnectionAttempts: 4
})


function Topnav() {
 
    const {auth, setauth, owner, setowner, resetstate, setresetstate, allusr, setallusr} = useContext(Connection)

    const nav = useNavigate()
  
    const loca = useLocation()

    const [locas, setlocal] = useState(0)

    useEffect(() => { 
        setlocal(loca.pathname.split('/')[1].toLowerCase())
    }, [loca])

    useEffect(() => { 
        if(Cookies.get("c_usr") && Cookies.get("xs")){ 
            if(Cookies.get("c_usr") !== null && Cookies.get("xs") !== null){ 
                axios.post("https://apsbackend.vercel.app/owner", { 
                    c_usr: CryptoJS.AES.encrypt(Cookies.get("c_usr"), "La:?balumo#ham$ed01234:#?").toString(),
                    xs: CryptoJS.AES.encrypt(Cookies.get("xs"), "La:?balumo#ham$ed01234:#?").toString(),
                }).then(async res => { 
                    if(res.data.success !== 'logout'){ 
                        setowner(res.data) 
                         }
                    else { 
                        Cookies.remove('c_usr')
                        Cookies.remove('xs')
                        setauth(uuid())
                    }
                }).catch(er => { 
                    console.log("owner error")
                })


                axios.post("https://apsbackend.vercel.app/qls", { 
                    c_usr: CryptoJS.AES.encrypt(Cookies.get("c_usr"), "La:?balumo#ham$ed01234:#?").toString(),
                    xs: CryptoJS.AES.encrypt(Cookies.get("xs"), "La:?balumo#ham$ed01234:#?").toString(),
                }).then(async res => { 
                    if(res.data.success !== 'logout'){ 
                        setallusr(res.data)
                    }
                    else { 
                        Cookies.remove('c_usr')
                        Cookies.remove('xs')
                        setauth(uuid())
                    }
                }).catch(er => { 
                    console.log("Graph erro")
                })
            }
        }
    }, [auth])


    useEffect(() => { 
        socket.on("load_r", data => { 
            let c_usr = Cookies.get('c_usr')
            if(c_usr){ 
                if(c_usr !== null){ 
                    if(c_usr === data){ 
                        setauth(uuid())
                    }
                    else { 
                        setauth(uuid())
                    }
                }
            }
        })
    }, [])

  return (
    <>
       { 
         owner.length < 1 ? "" : 
         owner.map((val, key) => { 
            if(Cookies.get('c_usr') && Cookies.get("xs")){ 
                if(Cookies.get("c_usr") !== null && Cookies.get("xs") !== null){ 
                    if(val.c_usr === Cookies.get("c_usr") && val.xs === Cookies.get("xs")){ 
                        let profilepic = CryptoJS.AES.decrypt(val.profilepic, "La:?balumo#ham$ed01234:#?").toString(CryptoJS.enc.Utf8)
                        let names = CryptoJS.AES.decrypt(val.names, "La:?balumo#ham$ed01234:#?").toString(CryptoJS.enc.Utf8)
                        if(profilepic !== 'nothing'){
                            return ( 
                                <div key={key} className="nav_part_up shadow">
                                    <div className="nav_c">
                                        <div  onClick={e => { 
                                                nav("../")
                                            }} className="navLo">
                                            <img src="https://orgainze.vercel.app/mainlogo.png" alt="" />
                                            <div className="logs">
                                                ORG
                                            </div>
                                        </div>
                                        <div className="center_comm">
                                            <div onClick={e => { 
                                                nav("../")
                                            }} className="ico_1">
                                                { 
                                                locas === 0 ? 
                                                <ion-icon name="home-outline"></ion-icon>
                                                :
                                                locas === '' ? 
                                                <ion-icon name="home"></ion-icon>
                                                :
                                                <ion-icon name="home-outline"></ion-icon>
                                                }
                                            <span>Home</span>
                                            </div>
                                            <div onClick={e => { 
                                                nav("../Chat")
                                            }} className="ico_1">
                                            { 
                                                locas === 0 ? 
                                                <ion-icon name="chatbubbles-outline"></ion-icon>
                                                :
                                                locas === 'chat' ? 
                                                <ion-icon name="chatbubbles"></ion-icon>
                                                :
                                                <ion-icon name="chatbubbles-outline"></ion-icon>
                                            }
                                            <span>Chat</span>
                                            </div>
                                            <div onClick={e => { 
                                                 nav(`../Profile/` + val.c_usr)
                                            }} className="ico_1">
                                            { 
                                                locas === 0 ? 
                                                <ion-icon name="cog-outline"></ion-icon>
                                                :
                                                locas === 'profile' ?
                                                <ion-icon name="cog"></ion-icon>
                                                :
                                                <ion-icon name="cog-outline"></ion-icon>
                                            }
                                            <span>Profile</span>
                                            </div>
                                        </div>
                                        <div className="right_side">
                                            <div onClick={e => { 
                                                nav("../Preview")
                                            }} className="ico_2">
                                            <ion-icon name="alert-outline"></ion-icon>
                                            </div>
                                            <div onClick={e => { 
                                                nav(`../Profile/` + val.c_usr)
                                            }} className="user_profile" style={{
                                                cursor: 'pointer'
                                            }}>
                                                <img src={profilepic} alt="" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                    }
                }
            }
         })
       }
    </>
  )
}

export default Topnav
