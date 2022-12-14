import React, { useEffect, useState } from 'react'
import { Peer } from "peerjs";
import { useParams } from 'react-router-dom';
import {v4 as uuid} from 'uuid'

import io from 'socket.io-client'
import Cookies from 'js-cookie';

const socket = new io("https://testbackend.mohamedbrima.repl.co")



function Call() {

    const [timers, settimers] = useState('')
    const [alerts, setalerts] = useState('')

    const {id} = useParams()
    const peer = new Peer(id);


    useEffect(() => { 
        setInterval(() => {
            let daat = new Date()
            let hours = daat.getHours()
            let min = daat.getMinutes()
            let sec = daat.getSeconds()
            
            if(hours < 12){ 
                if(min < 10){ 
                    if(sec < 10) { 
                        settimers(hours + ":" +  "0" +min + ":" + "0" + sec + " AM" + " " + "Good Morning")
                    }
                    else { 
                        settimers(hours + ":" +  "0" +min + ":" + sec + " AM" + " " + "Good Morning")
                    }
                }
                else { 
                    if(sec < 10) { 
                        settimers(hours + ":" + min + "-" + "0" + sec + " AM" + " " + "Good Morning")
                    }
                    else { 
                        settimers(hours + ":" + min + "-" + sec + " AM" + " " + "Good Morning")
                    }
                }
            }
            else if(hours > 12){ 
                if(min < 10){ 
                    if(sec < 10) { 
                        settimers(hours + ":" +  "0" +min + "-" + "0" + sec + " PM" + " " + "Good Afternoon")
                    }
                    else { 
                        settimers(hours + ":" +  "0" +min + "-" + sec + " PM" + " " + "Good Afternoon")
                    }
                }
                else { 
                    if(sec < 10) { 
                        settimers(hours + ":" + min + "-" + "0" + sec + " PM" + " " + "Good Afternoon")
                    }
                    else { 
                        settimers(hours + ":" + min + "-" + sec + " PM" + " " + "Good Afternoon")
                    }
                }
            }
            else if(hours > 16){ 
                if(min < 10){ 
                    if(sec < 10) { 
                        settimers(hours + ":" +  "0" +min + "-" + "0" + sec + " PM" + " " + "Good Evening")
                    }
                    else { 
                        settimers(hours + ":" +  "0" +min + "-" + sec + " PM" + " " + "Good Evening")
                    }
                }
                else { 
                    if(sec < 10) { 
                        settimers(hours + ":" + min + "-" + "0" + sec + " PM" + " " + "Good Evening")
                    }
                    else { 
                        settimers(hours + ":" + min + "-" + sec + " PM" + " " + "Good Evening")
                    }
                }
            }
        });

        let video = document.querySelectorAll("video")

        video.forEach(val => { 
            if(val.play()){ 
                if ('mediaSession' in navigator) {
                    navigator.mediaSession.metadata = new MediaMetadata({
                      title: 'Video call In progress',
                      artist: 'Call is on ORG',
                      album: 'Video is in progress',
                      artwork: [
                        { src: 'https://cdn.fstoppers.com/styles/large-16-9/s3/lead/2019/11/cfcc60dc724e91b45f744ace4ae832e7.jpg',   sizes: '96x96',   type: 'image/png' },
                        { src: 'https://cdn.fstoppers.com/styles/large-16-9/s3/lead/2019/11/cfcc60dc724e91b45f744ace4ae832e7.jpg', sizes: '128x128', type: 'image/png' },
                        { src: 'https://cdn.fstoppers.com/styles/large-16-9/s3/lead/2019/11/cfcc60dc724e91b45f744ace4ae832e7.jpg', sizes: '192x192', type: 'image/png' },
                        { src: 'https://cdn.fstoppers.com/styles/large-16-9/s3/lead/2019/11/cfcc60dc724e91b45f744ace4ae832e7.jpg', sizes: '256x256', type: 'image/png' },
                        { src: 'https://cdn.fstoppers.com/styles/large-16-9/s3/lead/2019/11/cfcc60dc724e91b45f744ace4ae832e7.jpg', sizes: '384x384', type: 'image/png' },
                        { src: 'https://cdn.fstoppers.com/styles/large-16-9/s3/lead/2019/11/cfcc60dc724e91b45f744ace4ae832e7.jpg', sizes: '512x512', type: 'image/png' },
                      ]
                    })
                }; 
            }
            else { 
                    if ('mediaSession' in navigator) {
                        navigator.mediaSession.metadata = new MediaMetadata({
                          title: 'Video call In progress',
                          artist: 'Call is on ORG',
                          album: 'Video is in progress',
                          artwork: [
                            { src: 'https://cdn.fstoppers.com/styles/large-16-9/s3/lead/2019/11/cfcc60dc724e91b45f744ace4ae832e7.jpg',   sizes: '96x96',   type: 'image/png' },
                            { src: 'https://cdn.fstoppers.com/styles/large-16-9/s3/lead/2019/11/cfcc60dc724e91b45f744ace4ae832e7.jpg', sizes: '128x128', type: 'image/png' },
                            { src: 'https://cdn.fstoppers.com/styles/large-16-9/s3/lead/2019/11/cfcc60dc724e91b45f744ace4ae832e7.jpg', sizes: '192x192', type: 'image/png' },
                            { src: 'https://cdn.fstoppers.com/styles/large-16-9/s3/lead/2019/11/cfcc60dc724e91b45f744ace4ae832e7.jpg', sizes: '256x256', type: 'image/png' },
                            { src: 'https://cdn.fstoppers.com/styles/large-16-9/s3/lead/2019/11/cfcc60dc724e91b45f744ace4ae832e7.jpg', sizes: '384x384', type: 'image/png' },
                            { src: 'https://cdn.fstoppers.com/styles/large-16-9/s3/lead/2019/11/cfcc60dc724e91b45f744ace4ae832e7.jpg', sizes: '512x512', type: 'image/png' },
                          ]
                        })
                    }; 
            }
        })

    }, [id])

    useEffect(() => { 

        let alert_mes = document.querySelector(".alert_mes")
        let call_videos = document.querySelector(".call_videos")

        let video = document.createElement("video")

        const peer = new Peer()

        peer.on("open", () => { 
            socket.emit("newUsr", { 
                dii: id,
                c_usr: Cookies.get("c_usr")
            })
        })

        socket.on("alert_us", e => { 
            if(e.c_usr === Cookies.get("c_usr")){ 
                setalerts("Your join to the video chat was successful " + e.names)
                alert_mes.classList.add("show_p")
                setTimeout(() => {
                    alert_mes.classList.remove("show_p")
                }, 2000);
            }
            else { 
                setalerts(e.states === 'Admin' ? "Admin " + " Joined The video chat" : e.names + " Joined The video chat")
                alert_mes.classList.add("show_p")
                setTimeout(() => {
                    alert_mes.classList.remove("show_p")
                }, 2000);
            }

            navigator.mediaDevices.getUserMedia({ 
                video: true,
                audio: true
            }).then(stream => { 
                addstream(video, stream)
            })
        })

        function addstream(video, stream) { 
           video.srcObject = stream
           video.addEventListener("loadedmetadata", () => { 
            video.play()
           })
           call_videos.append(video)
        }

    }, [id])

  return (
    <div className="call_ready">
        <div className="warn_btns shadow p-2 mb-2 rounded" style={{textAlign: 'center', width: '100%'}}>
            <h4>{timers}</h4>
        </div>
        <div className="alert_mes text-center">
            <div className="alt_co shadow border">
            <h1>Alert</h1>
            <hr />
            <div className="card-text text-success">{alerts}</div>
            </div>
        </div>
        <div className="call_container">
            <div className="call_videos">
            </div>
        </div>
        <div className="vid_plays shadow">
            <div className="buttons">
                <button className="btn btn-outline-warning">Mute</button>
                <button className="btn btn-outline-success">Video</button>
                <button className="btn btn-outline-danger">End Call</button>
            </div>
        </div>
    </div>
  )
}

export default Call