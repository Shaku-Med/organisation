import axios from "axios";
import Cookies from "js-cookie";
import React, { useContext, useState } from "react";
import { useEffect } from "react";
import Linkify from "react-linkify";
import { Connection } from "../Connection";
import { Link } from 'react-router-dom'
import {v4 as uuid} from 'uuid'
import io from 'socket.io-client'

const socket = new io("https://testbackend.mohamedbrima.repl.co")


function Chat() {

    const [rand, setrand] = useState('')

    const [friends, setfriends] = useState([]);
    const [mainme, setmainm] = useState([]);

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

        axios.post("https://orgbackend.vercel.app/chat/messages/get", { 
            sendersid: Cookies.get("c_usr")
        }).then(res => { 
            setmainm(res.data)
            let chat_body = document.querySelector(".chat_body")
            chat_body.scrollTo(0, chat_body.scrollHeight)
        })

        let chat_body = document.querySelector(".chat_body")

        socket.on("chat_meses", data => { 
            chat_body.scrollTo(0, chat_body.scrollHeight)
            setmainm(data)
        })

    }, [])

    const [chat, setchat] = useState("")

    const handlechat = e => { 
        e.preventDefault()
        let snd_tadk = document.querySelector("#snd_tadk")
        if(chat !== ""){ 
            socket.emit("chat_datas", {
                sendersid: Cookies.get("c_usr"),
                message_sent: chat,
                messageid: uuid()
            })
            snd_tadk.value = ""
            setchat('')
        }
    }

  return (
    <div className='homie'>
        <div className="chat_containers">
            <div className="chat_head">
                <div className="g_one">
                    Group Chat
                </div>
                <div className="chat_mem_o">
                    { 
                      friends.length < 1 ? "Processing..." :
                      friends.map((val, key) => { 
                        if(val.c_usr !== Cookies.get("c_usr")){ 
                            return ( 
                                <img key={key} onError={e => { 
                                    e.target.src = "https://media.istockphoto.com/id/1011988208/vector/404-error-like-laptop-with-dead-emoji-cartoon-flat-minimal-trend-modern-simple-logo-graphic.jpg?s=612x612&w=0&k=20&c=u_DL0ZH5LkX57_25Qa8hQVIl41F9D0zXlTgkWNnHRkQ="
                                }} src={val.profilepic} alt="" />
                            )
                        }
                      })
                    }
                </div>
            </div>
            <div className="chat_body" style={{backgroundImage: `url(${rand.coverpic})`}}>
                    { 
                       mainme.length < 1 ? <div className="h1 text-center mt-3">Be the first to send</div> :
                       mainme.map((val, key) => { 
                        if(val.sendersid === val.c_usr){ 
                            if(val.sendersid === Cookies.get("c_usr")){ 
                                return ( 
                                    <div key={key} className="chat_r">
                                    <div className="c_1">
                                      <div className="na">
                                      <div className="nam">
                                          Me
                                      </div>
                                      <img onError={e => { 
                                            e.target.src = "https://media.istockphoto.com/id/1011988208/vector/404-error-like-laptop-with-dead-emoji-cartoon-flat-minimal-trend-modern-simple-logo-graphic.jpg?s=612x612&w=0&k=20&c=u_DL0ZH5LkX57_25Qa8hQVIl41F9D0zXlTgkWNnHRkQ="
                                        }} src={val.profilepic} alt="" />
                                      </div>
                                      <div className="cMes">
                                         <Linkify>
                                         {val.message_sent}
                                         </Linkify>
                                      </div>
                                    </div>
                                  </div>
                                )
                            }
                            else { 
                                return ( 
                                    <div key={key} className="chat_e">
                                        <div className="c_1">
                                            <div className="nas">
                                            <img onError={e => { 
                                            e.target.src = "https://media.istockphoto.com/id/1011988208/vector/404-error-like-laptop-with-dead-emoji-cartoon-flat-minimal-trend-modern-simple-logo-graphic.jpg?s=612x612&w=0&k=20&c=u_DL0ZH5LkX57_25Qa8hQVIl41F9D0zXlTgkWNnHRkQ="
                                        }} src={val.profilepic} alt="" />
                                            <div className="nam">
                                                <Link to={"../Profile/" + val.c_usr}>
                                                {val.states === 'Admin' ? val.names + ' (Admin) ' : val.names}
                                                </Link>
                                            </div>
                                            </div>
                                            <div className="cMes">
                                            <Linkify>
                                            {val.message_sent}
                                            </Linkify>
                                            </div>
                                        </div>
                                        </div>
                                )
                            }
                        }
                       })
                    }
            <h1 style={{height: '5vh'}}></h1>
            </div>
        </div>
        <div className="Hellow_text">
            <div className="mes_cent">
                <form onSubmit={handlechat} action="">
                    <input onChange={e => { 
                        setchat(e.target.value)
                    }} type="text" name="" id="snd_tadk" />
                    <button className="btn btn-outline-success">
                        <i className="fa fa-paper-plane"></i>
                        <span>Send</span>
                    </button>
                </form>
            </div>
        </div>
    </div>
  )
}

export default Chat