import Cookies from 'js-cookie';
import React, { useContext, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Connection } from '../Connection';
import CryptoJS from "crypto-js";
import {v4 as uuid} from 'uuid';
import axios from 'axios';
import ReactLinkify from 'react-linkify';
import {CopyToClipboard} from 'react-copy-to-clipboard';


function Chatscreen({socket}) {

    const {auth, setauth, owner, setowner, resetstate, setresetstate, allusr, setallusr} = useContext(Connection);

    const {id} = useParams()

    const [allmess, setallmessages] = useState('')

    const [message, setmessage] = useState('')


    const messagesEndRef = useRef(null);

    let nav = useNavigate()




    // Scroll in view...


    useEffect(() => { 
        if(Cookies.get("c_usr") && Cookies.get("xs")){ 
            if(Cookies.get("c_usr") !== null && Cookies.get("xs") !== null){ 
                axios.post("https://apsbackend.vercel.app/get/messages", { 
                    c_usr: CryptoJS.AES.encrypt(Cookies.get("c_usr"), "La:?balumo#ham$ed01234:#?").toString(),
                    xs: CryptoJS.AES.encrypt(Cookies.get("xs"), "La:?balumo#ham$ed01234:#?").toString(),
                }).then(res => { 
                    setallmessages(res.data)
                }).catch(er => { 
                    console.log("Error")
                })
            }
        }
    }, [id])


    useEffect(() => { 
        socket.on("message", data => { 
            setallmessages(data)
        })
       }, [])

  return (
    <>
      { 
        allusr.length < 1 ? "" : 
        allusr.map((val, key) => { 
            if(val.c_usr === id){ 
               return ( 
                <div key={key} className='chat_up_ui1'>
                <div className="chat_up_ui">
                   
                    <div ref={messagesEndRef} className="chat_messages" style={{
                        backgroundImage: `url('${CryptoJS.AES.decrypt(val.coverpic, "La:?balumo#ham$ed01234:#?").toString(CryptoJS.enc.Utf8)}')`
                    }}>

                    <div className="chat_heads" style={{
                        zIndex: 400000020,
                    }}>
                        <div style={{
                            cursor: 'pointer'
                        }} onClick={e => { 
                            nav("../Chat")
                        }} className="go_bak">
                            <i className="fa fa-arrow-left"></i>
                        </div>
                        <div className="name_mid">
                            {CryptoJS.AES.decrypt(val.names, "La:?balumo#ham$ed01234:#?").toString(CryptoJS.enc.Utf8)}
                        </div>
                        <div className="prof_pic">
                            <img src={CryptoJS.AES.decrypt(val.profilepic, "La:?balumo#ham$ed01234:#?").toString(CryptoJS.enc.Utf8) === 'nothing' ? "https://t3.ftcdn.net/jpg/01/91/95/30/360_F_191953033_gehQATeDoh5z6PyRDbeKyBZuS83CjMEF.jpg" : CryptoJS.AES.decrypt(val.profilepic, "La:?balumo#ham$ed01234:#?").toString(CryptoJS.enc.Utf8)} alt="" />
                        </div>
                    </div>

                        {/*  */}
                        { 
                          allmess.length < 1 ? '' : 
                          allmess.map((m, n) => { 
                            if(Cookies.get('c_usr') && Cookies.get('xs')){ 
                                if(Cookies.get("c_usr") !== null && Cookies.get("xs") !== null){ 
                                    let senderid = CryptoJS.AES.decrypt(m.sendersid, "La:?balumo#ham$ed01234:#?").toString(CryptoJS.enc.Utf8)
                                    let receiversid = CryptoJS.AES.decrypt(m.receiversid, "La:?balumo#ham$ed01234:#?").toString(CryptoJS.enc.Utf8)
                                    let sendemail = CryptoJS.AES.decrypt(m.sendemail, "La:?balumo#ham$ed01234:#?").toString(CryptoJS.enc.Utf8)
                                    let recemail = CryptoJS.AES.decrypt(m.recemail, "La:?balumo#ham$ed01234:#?").toString(CryptoJS.enc.Utf8)
                                    let domb = CryptoJS.AES.decrypt(val.dob, "La:?balumo#ham$ed01234:#?").toString(CryptoJS.enc.Utf8)

                                    if(senderid === Cookies.get('c_usr') || receiversid === Cookies.get('c_usr')){ 
                                        if(sendemail === domb || recemail === domb){ 

                                           setTimeout(() => {
                                            function bottom_draw(){ 
                                                const chat_messages = document.querySelector('.chat_messages');
                                                chat_messages.scrollTo(0, chat_messages.scrollHeight)
                                            }
                                            bottom_draw()
                                           }, 2000);

                                            if(senderid === Cookies.get('c_usr')){ 
                                                return ( 
                                                    <div  key={n} className="me_chat">
                                                    <div className="me_nam h4">
                                                        (Me)
                                                    </div>
                                                    <hr />
                                                    <div className="memes">
                                                        <ReactLinkify>
                                                            {CryptoJS.AES.decrypt(m.message_sent, "La:?balumo#ham$ed01234:#?").toString(CryptoJS.enc.Utf8)}
                                                        </ReactLinkify>
                                                    </div>
                                                    <hr />
                                                    <div className="bt">
                                                        <button onClick={e => { 
                                                            if(window.confirm("This message can't be backedup. Do you wish to delete from everyone?") === true){ 
                                                                socket.emit("delete", { 
                                                                    sendersid: CryptoJS.AES.encrypt(Cookies.get('c_usr'), "La:?balumo#ham$ed01234:#?").toString(),
                                                                    sendmain: CryptoJS.AES.encrypt(Cookies.get("xs"), "La:?balumo#ham$ed01234:#?").toString(),
                                                                    receiversid: CryptoJS.AES.encrypt(val.c_usr, "La:?balumo#ham$ed01234:#?").toString(),
                                                                    message_id:m.message_id,
                                                                })
                                                            }
                                                        }} className="btn btn-outline-danger">Delete</button>
                                                        <CopyToClipboard onCopy={e => { 
                                                            alert("Message copied...")
                                                        }} text={CryptoJS.AES.decrypt(m.message_sent, "La:?balumo#ham$ed01234:#?").toString(CryptoJS.enc.Utf8)}>
                                                           <button className="btn btn-outline-primary">Copy</button>
                                                        </CopyToClipboard>
                                                    </div>
                                                </div>
                                                )
                                            }
                                            else { 
                                                return ( 
                                                    <div key={n} className="me_chat rounded shadow" style={{
                                                        border: '1px solid var(--borders)'
                                                    }}>
                                                    <div className="me_nam h4">
                                                      ({senderid === val.c_usr ? CryptoJS.AES.decrypt(val.names, "La:?balumo#ham$ed01234:#?").toString(CryptoJS.enc.Utf8) : 'anonymous'})
                                                    </div>
                                                    <hr />
                                                    <div className="memes">
                                                       <ReactLinkify>
                                                         {CryptoJS.AES.decrypt(m.message_sent, "La:?balumo#ham$ed01234:#?").toString(CryptoJS.enc.Utf8)}
                                                       </ReactLinkify>
                                                    </div>
                                                </div>
                                                )
                                            }
                                        }
                                    }
                                }
                            }
                          })
                        }
                    </div>
                    <div className="chat_bottoms_main">
                        <form onSubmit={e => { 
                            e.preventDefault()
                            if(message !== ''){ 
                                let messagesend = document.querySelector("#messagesend")
                                socket.emit("data", { 
                                    sendersid: CryptoJS.AES.encrypt(Cookies.get("c_usr"), "La:?balumo#ham$ed01234:#?").toString(),
                                    sendmain: CryptoJS.AES.encrypt(Cookies.get('xs'), "La:?balumo#ham$ed01234:#?").toString(),
                                    receiversid: CryptoJS.AES.encrypt(val.c_usr, "La:?balumo#ham$ed01234:#?").toString(),
                                    message_sent: CryptoJS.AES.encrypt(message, "La:?balumo#ham$ed01234:#?").toString(),
                                    message_id: CryptoJS.AES.encrypt(uuid(), "La:?balumo#ham$ed01234:#?").toString(),
                                    message_type: CryptoJS.AES.encrypt('text', "La:?balumo#ham$ed01234:#?").toString(),
                                })
                                setmessage("")
                                messagesend.value = ""
                            }
                        }} action="">
                            <input onChange={e => { 
                                setmessage(e.target.value)
                            }} placeholder='Send A Message' type="text" name="" id="messagesend" />
                            <button className='btn btn-outline-primary'>
                              <ion-icon name="send"></ion-icon>
                            </button>
                        </form>
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

export default Chatscreen