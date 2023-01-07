import Cookies from 'js-cookie';
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Connection } from '../Connection';
import Chatscreen from './Chatscreen'
import CryptoJS from "crypto-js";
import {v4 as uuid} from 'uuid';

function Chat({socket}) {

    const {auth, setauth, owner, setowner, resetstate, setresetstate, allusr, setallusr} = useContext(Connection);


    const {id} = useParams()
    useEffect(() => { 
    }, [])

    const nav = useNavigate()

    const [socksta, setsocsta] = useState('')


    useEffect(() => { 
        socket.on("status", data => { 
            if(data !== Cookies.get("c_usr")){ 
              setsocsta(data)
            }
        })

        if(Cookies.get("c_usr") && Cookies.get("xs")){ 
            if(Cookies.get("xs") !== null && Cookies.get("c_usr") !== null){ 
                socket.emit("owner_status", Cookies.get("c_usr"))
            }
        }
    }, [])

  return (
   <div className="main_countains">
    { 
      id === undefined ? 
       allusr.length < 1 ? "" :
       allusr.map((val, key) => { 
        if(Cookies.get("c_usr")){ 
            if(Cookies.get("c_usr") !== null && Cookies.get("c_usr") !== val.c_usr){ 
                return ( 
                    <div key={key} className="chat_ui_cont">
                        <div onClick={e => { 
                            nav(`../Chat/` + val.c_usr)
                        }} className="us1" style={{
                            border: 'none',
                            borderBottom: '1px solid var(--borders)',
                            borderRadius: 0,
                            cursor: 'pointer'
                        }}>
                            <img src={CryptoJS.AES.decrypt(val.profilepic, "La:?balumo#ham$ed01234:#?").toString(CryptoJS.enc.Utf8) === 'nothing' ? "https://t3.ftcdn.net/jpg/01/91/95/30/360_F_191953033_gehQATeDoh5z6PyRDbeKyBZuS83CjMEF.jpg" : CryptoJS.AES.decrypt(val.profilepic, "La:?balumo#ham$ed01234:#?").toString(CryptoJS.enc.Utf8)} alt="" />
                            <div className="usn">
                                <div className="usbn bname ourmainas">{CryptoJS.AES.decrypt(val.names, "La:?balumo#ham$ed01234:#?").toString(CryptoJS.enc.Utf8)}</div>
                                <div className="small_desc">
                               {socksta !== '' ? socksta === val.c_usr ? "Online" : "offline" : 'offline'}
                                </div>
                            </div>
                            </div>
                    </div>
                )
            }
        }
       })
      :
      <Chatscreen socket={socket}/>
    }
   </div>
  )
}

export default Chat
