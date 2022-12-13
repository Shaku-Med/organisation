import axios from 'axios';
import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react'
import ReactLinkify from 'react-linkify';
import { Link, useParams } from 'react-router-dom';
import {v4 as uuid} from 'uuid'
function Profile() {

    const {id} = useParams()

    const [datas, setdata] = useState([])
    const [newmes, setnewmes] = useState([])

    useEffect(() => { 
        setTimeout(() => {
            axios
          .post("https://testbackend.mohamedbrima.repl.co/profile/users", {
            ids: id
          })
          .then((res) => {
            setdata(res.data)
          });
        }, 1000);

        axios.post("https://orgbackend.vercel.app/profile/chats", { 
          ownerid: id
        }).then(res => { 
          setnewmes(res.data)
        })

    }, [id])

    const [mess, setmess] = useState('')

  return (
   <> 
   { 
      datas.map((val, key) => { 
        if(val.c_usr === Cookies.get('c_usr')){ 
            return ( 
                <div key={key} className="profie_ai">
                <div className="top_img_main" style={{backgroundImage: `linear-gradient(to bottom, #00000000 0%, var(--mainbg) 90%), url(${val.coverpic})`}}>
                    <div className="proi_names">
                        <label htmlFor="backg">
                        <i className="fa fa-camera"></i>
                        </label>
                        <input onChange={e => { 
                            let top_img_main = document.querySelector(".top_img_main")
                            let file = e.target.files[0]
                            if(file){ 
                                let reader = new FileReader()
                                reader.onload = e => { 
                                    let result = reader.result
                                    top_img_main.style.backgroundImage = `linear-gradient(to bottom, #00000000 0%, var(--mainbg) 90%), url(${result})`
                                }

                                reader.readAsDataURL(file)

                                axios.post("https://testbackend.mohamedbrima.repl.co/user/coverpic", { 
                                    filen: e.target.files[0]
                                  }, { 
                                    headers: { 
                                        "Content-Type": "multipart/form-data"
                                    }
                                  })
                        
                        
                                   setTimeout(() => {
                                    axios
                                    .post("https://testbackend.mohamedbrima.repl.co/users/cov_don", {
                                      c_usr: Cookies.get("c_usr"),
                                      xs: Cookies.get("xs"),
                                    })
                                    .then((res) => {
                                      if(res.data.success === "success"){ 
                                        window.location.reload()
                                      }
                                    });
                                   }, 1000);
                            }
                        }} type="file" accept='image/*' className='d-none' name="" id="backg" />
                        <input onChange={e => { 
                            let file_main = document.getElementById("file_main")
                            let file = e.target.files[0]
                            if(file){ 
                                let reader = new FileReader()
                                reader.onload = e => { 
                                    let result = reader.result
                                    file_main.src = result
                                }

                                reader.readAsDataURL(file)

                                axios.post("https://testbackend.mohamedbrima.repl.co/user/profilepic", { 
                                    filen: e.target.files[0]
                                  }, { 
                                    headers: { 
                                        "Content-Type": "multipart/form-data"
                                    }
                                  })
                        
                        
                                   setTimeout(() => {
                                    axios
                                    .post("https://testbackend.mohamedbrima.repl.co/users/pic_done", {
                                      c_usr: Cookies.get("c_usr"),
                                      xs: Cookies.get("xs"),
                                    })
                                    .then((res) => {
                                      if(res.data.success === "success"){ 
                                        window.location.reload()
                                      }
                                    });
                                   }, 1000);
                            }
                        }} type="file" accept='image/*' name="" id="img_part" className="d-none" />
                        <label htmlFor="img_part">
                        <img onError={e => { 
                                    e.target.src = "https://media.istockphoto.com/id/1011988208/vector/404-error-like-laptop-with-dead-emoji-cartoon-flat-minimal-trend-modern-simple-logo-graphic.jpg?s=612x612&w=0&k=20&c=u_DL0ZH5LkX57_25Qa8hQVIl41F9D0zXlTgkWNnHRkQ="
                                }} src={val.profilepic} alt="" id='file_main' style={{cursor: 'pointer', PointerEvent: 'none'}}/>
                        </label>
                        <div className="h1">
                          <div className="name_main mb-3">
                            {val.names}
                          </div>
                          <div className="buttons">
                            <button onClick={e => { 
                               if(window.confirm("Your are logging out. Do you wish to do so?") === true){ 
                                Cookies.remove('c_usr')
                                Cookies.remove('xs')
                                localStorage.clear()
                                window.location.reload()
                               }
                            }} className="btn btn-outline-primary">Logout</button>
                          </div>
                        </div>
                    </div>
                </div>
                <div className="details">
                    <div className="name_part">
                        <div className="col">
                            <h4>Name</h4>
                            <div className="names_main border p-2 bg-dark rounded text-white">
                              {val.names}
                            </div>
                        </div>
                        <div className="col">
                            <h4>Email</h4>
                            <div className="names_main border p-2 bg-dark rounded text-white">
                              {val.cemail}
                            </div>
                        </div>
                        <div className="col">
                            <h4>Education</h4>
                            <div className="names_main border p-2 bg-dark rounded text-white">
                              {val.edu}
                            </div>
                        </div>
                        <div className="col">
                            <h4>Sex</h4>
                            <div className="names_main border p-2 bg-dark rounded text-white">
                              {val.gend}
                            </div>
                        </div>
                        <div className="col">
                            <h4>About You</h4>
                            <div className="names_main border p-2 bg-dark rounded text-white">
                            <ReactLinkify> 
                              {val.about}
                              </ReactLinkify>
                            </div>
                        </div>
                    </div>
                </div>

<hr />

                <div className="leave_a_mes">
                  <div className="message_texts">
                    { 
                      newmes.map((v, k) => { 
                        if(v.ownerid === id){ 
                          if(v.sendersid === v.c_usr){ 
                            if(v.c_usr === Cookies.get("c_usr")){ 
                              return ( 
                                <div key={k} className="chat_one">
                                <div className="user_one">
                                <img onError={e => { 
                                      e.target.src = "https://media.istockphoto.com/id/1011988208/vector/404-error-like-laptop-with-dead-emoji-cartoon-flat-minimal-trend-modern-simple-logo-graphic.jpg?s=612x612&w=0&k=20&c=u_DL0ZH5LkX57_25Qa8hQVIl41F9D0zXlTgkWNnHRkQ="
                                  }} src={v.profilepic} alt="" />
                                  <div className="nams">
                                  {v.names}
                                  </div>
                                </div>
                                <div className="gbox">
                                  <ReactLinkify>
                                   {v.message_sent}
                                  </ReactLinkify>
                                </div>
                              </div>
                              )
                            }
                            else { 
                              return ( 
                                <div key={k} className="chat_one">
                                <div className="user_one">
                                <img onError={e => { 
                                      e.target.src = "https://media.istockphoto.com/id/1011988208/vector/404-error-like-laptop-with-dead-emoji-cartoon-flat-minimal-trend-modern-simple-logo-graphic.jpg?s=612x612&w=0&k=20&c=u_DL0ZH5LkX57_25Qa8hQVIl41F9D0zXlTgkWNnHRkQ="
                                  }} src={v.profilepic} alt="" />
                                  <div className="nams">
                                    <Link to={"../Profile/" + v.c_usr}>
                                      {v.names}
                                    </Link>
                                  </div>
                                </div>
                                <div className="gbox">
                                  <ReactLinkify>
                                   {v.message_sent}
                                  </ReactLinkify>
                                </div>
                              </div>
                              )
                            }
                          }
                        }
                      })
                    }
                  </div>

                  <div className="leave_a_mes">
                    <form onSubmit={e => { 
                      let outtext = document.getElementById("outtext")
                      e.preventDefault()
                     if(mess !== ''){ 
                      axios.post("https://orgbackend.vercel.app/chat/message", { 
                        sendersid: Cookies.get("c_usr"),
                        ownerid: id,
                        message_sent: mess,
                        messid: uuid()
                      }).then(res => { 
                        if(res.data.success === 'success'){ 
                        setmess("")
                        axios.post("https://orgbackend.vercel.app/profile/chats", { 
                          ownerid: id
                        }).then(res => { 
                          setnewmes(res.data)
                        })
                
                        }
                      })
                     }
                    }} action="">
                      <label htmlFor="" className='mb-2'>Leave a message: </label>
                      <input onChange={e => { 
                        setmess(e.target.value)
                      }} type="text" name="" id="" />
                       <button className="btn btn-outline-danger mt-2">Send</button>
                    </form>
                   </div>

                </div>
                
               </div>
            )
        }
        else { 
            return ( 
                <div key={key} className="profie_ai">
                <div className="top_img_main" style={{backgroundImage: `linear-gradient(to bottom, #00000000 0%, var(--mainbg) 90%), url(${val.coverpic})`}}>
                    <div className="proi_names">
                        <img onError={e => { 
                                    e.target.src = "https://media.istockphoto.com/id/1011988208/vector/404-error-like-laptop-with-dead-emoji-cartoon-flat-minimal-trend-modern-simple-logo-graphic.jpg?s=612x612&w=0&k=20&c=u_DL0ZH5LkX57_25Qa8hQVIl41F9D0zXlTgkWNnHRkQ="
                                }} src={val.profilepic} alt="" />
                        <div className="h1">
                          <div className="name_main mb-3">
                            {val.names}
                          </div>
                        </div>
                    </div>
                </div>
                <div className="details">
                    <div className="name_part">
                    <div className="col">
                            <h4>Name</h4>
                            <div className="names_main border p-2 bg-dark rounded text-white">
                              {val.names}
                            </div>
                        </div>
                        <div className="col">
                            <h4>Contact Email</h4>
                            <div className="names_main border p-2 bg-dark rounded text-white">
                              {val.cemail}
                            </div>
                        </div>
                        <div className="col">
                            <h4>Education</h4>
                            <div className="names_main border p-2 bg-dark rounded text-white">
                              {val.edu}
                            </div>
                        </div>
                        <div className="col">
                            <h4>Sex</h4>
                            <div className="names_main border p-2 bg-dark rounded text-white">
                              {val.gend}
                            </div>
                        </div>
                        <div className="col">
                            <h4>About You</h4>
                            <div className="names_main border p-2 bg-dark rounded text-white">
                              <ReactLinkify> 
                              {val.about}
                              </ReactLinkify>
                            </div>
                        </div>
                    </div>
                </div>
<hr />
                <div className="leave_a_mes">
                  <div className="message_texts">
                  { 
                      newmes.map((v, k) => { 
                        if(v.ownerid === id){ 
                          if(v.sendersid === v.c_usr){ 
                            if(v.c_usr === Cookies.get("c_usr")){ 
                              return ( 
                                <div key={k} className="chat_one">
                                <div className="user_one">
                                <img onError={e => { 
                                      e.target.src = "https://media.istockphoto.com/id/1011988208/vector/404-error-like-laptop-with-dead-emoji-cartoon-flat-minimal-trend-modern-simple-logo-graphic.jpg?s=612x612&w=0&k=20&c=u_DL0ZH5LkX57_25Qa8hQVIl41F9D0zXlTgkWNnHRkQ="
                                  }} src={v.profilepic} alt="" />
                                  <div className="nams">
                                  {v.names}
                                  </div>
                                </div>
                                <div className="gbox">
                                  <ReactLinkify>
                                   {v.message_sent}
                                  </ReactLinkify>
                                </div>
                              </div>
                              )
                            }
                            else { 
                              return ( 
                                <div key={k} className="chat_one">
                                <div className="user_one">
                                <img onError={e => { 
                                      e.target.src = "https://media.istockphoto.com/id/1011988208/vector/404-error-like-laptop-with-dead-emoji-cartoon-flat-minimal-trend-modern-simple-logo-graphic.jpg?s=612x612&w=0&k=20&c=u_DL0ZH5LkX57_25Qa8hQVIl41F9D0zXlTgkWNnHRkQ="
                                  }} src={v.profilepic} alt="" />
                                  <div className="nams">
                                    <Link to={"../Profile/" + v.c_usr}>
                                      {v.names}
                                    </Link>
                                  </div>
                                </div>
                                <div className="gbox">
                                  <ReactLinkify>
                                   {v.message_sent}
                                  </ReactLinkify>
                                </div>
                              </div>
                              )
                            }
                          }
                        }
                      })
                    }
                  </div>

                   <div className="leave_a_mes">
                    <form onSubmit={e => { 
                      let outtext = document.getElementById("outtext")
                      e.preventDefault()
                     if(mess !== ''){ 
                      axios.post("https://orgbackend.vercel.app/chat/message", { 
                        sendersid: Cookies.get("c_usr"),
                        ownerid: id,
                        message_sent: mess,
                        messid: uuid()
                      }).then(res => { 
                        if(res.data.success === 'success'){ 
                          outtext.value = ""
                        
                        axios.post("https://orgbackend.vercel.app/profile/chats", { 
                          ownerid: id
                        }).then(res => { 
                          setnewmes(res.data)
                        })
                
                        }
                      })
                     }
                    }}
                     action="">
                      <label htmlFor="" className='mb-2'>Leave a message: </label>
                       <input onChange={e => { 
                        setmess(e.target.value)
                       }} type="text" name="" id="outtext" />
                       <button className="btn btn-outline-danger mt-2">Send</button>
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

export default Profile
