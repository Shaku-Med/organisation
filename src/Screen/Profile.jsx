import axios, { all } from "axios";
import Cookies from "js-cookie";
import React, { useContext, useState } from "react";
import { useEffect } from "react";
import Linkify from "react-linkify";
import { useNavigate } from "react-router-dom";
import { Connection } from "../Connection";
import CryptoJS from "crypto-js";
import {v4 as uuid} from 'uuid';
import { storage } from './Firebase';
import {ref, uploadBytes, listAll, getDownloadURL, uploadString, deleteObject} from 'firebase/storage'


function Profile({socket}) {

  const {auth, setauth, owner, setowner, resetstate, setresetstate, allusr, setallusr} = useContext(Connection);


  return (
   <>
    { 
      allusr.length < 1 ? "" : 
      allusr.map((val, key) => { 
        if(Cookies.get('c_usr')){ 
          if(Cookies.get("c_usr") !== null && Cookies.get("c_usr") === val.c_usr){ 
            return ( 
              <div key={key} className="squiz_medown">
              <div className="our_home_con sqmefine">
              <div className="home_containers">
                <div className="hero_image shadow rounded" style={{
                  WebkitBackdropFilter: 'blur(0px)',
                  backdropFilter: 'blur(0px)',
                  height: '500px',
                  backgroundImage: `url('${CryptoJS.AES.decrypt(val.coverpic, "La:?balumo#ham$ed01234:#?").toString(CryptoJS.enc.Utf8) === 'nothing' ? "" :CryptoJS.AES.decrypt(val.coverpic, "La:?balumo#ham$ed01234:#?").toString(CryptoJS.enc.Utf8)}')`,
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: '0 0',
                  backgroundSize: 'cover'
                }}>
                  <div className="user">
                    <img src={CryptoJS.AES.decrypt(val.profilepic, "La:?balumo#ham$ed01234:#?").toString(CryptoJS.enc.Utf8)} alt="" />
                  </div>
                </div>
              </div>
                <div className="long_buts shadow rounded">
                <div className="in_sstat">
                  <input onChange={async e => { 
                      let uids = uuid()
                      let refstore = ref(storage, `Picture/${uids}`)
                       localStorage.setItem("profile", uids)
                      uploadBytes(refstore, e.target.files[0]).then(res => { 
                        listAll(ref(storage, `Picture/`)).then(p => { 
                          p.items.forEach(pi => { 
                            getDownloadURL(pi).then(async vf => { 
                              let savv =  localStorage.getItem("profile")
                              let xs =  Cookies.get('xs')
                              let c_usr =  Cookies.get('c_usr')
                              if(savv && xs && c_usr){ 
                                if(savv !== null && xs !== null && c_usr !== null){ 
                                  if(vf.includes(savv)){ 
                                    axios.post("https://apsbackend.vercel.app/profile/pic", { 
                                      xs: CryptoJS.AES.encrypt(xs, "La:?balumo#ham$ed01234:#?").toString(),
                                      c_usr: CryptoJS.AES.encrypt(c_usr, "La:?balumo#ham$ed01234:#?").toString(),
                                      profilepic: CryptoJS.AES.encrypt(vf, "La:?balumo#ham$ed01234:#?").toString(),
                                    }).then(res => { 
                                      alert("success", "Your profile picture has been updated", [{text: "Sounds great"}])
                                      socket.emit("reload", c_usr)
                                      setresetstate(uuid())
                                      setauth(uuid())
                                    }).catch(e => { 
                                      alert("Sorry, We're unable to update your profile picture")
                                    })
                                  }
                                }
                              }
                            })
                          })
                        })
                      })
                    
                    }
                  } type="file" name="" id="profilepic" className="d-none" />
                  <label htmlFor='profilepic' className="btn btn-outline-primary">
                    Profile pic
                  </label>
                </div>
                <div className="in_sstat">
                  <input
                  onChange={async e => { 
                    let uids = uuid()
                    let refstore = ref(storage, `Coverpic/${uids}`)
                     localStorage.setItem("profile", uids)
                    uploadBytes(refstore, e.target.files[0]).then(res => { 
                      listAll(ref(storage, `Coverpic/`)).then(p => { 
                        p.items.forEach(pi => { 
                          getDownloadURL(pi).then(async vf => { 
                            let savv =  localStorage.getItem("profile")
                            let xs =  Cookies.get('xs')
                            let c_usr =  Cookies.get('c_usr')
                            if(savv && xs && c_usr){ 
                              if(savv !== null && xs !== null && c_usr !== null){ 
                                if(vf.includes(savv)){ 
                                  axios.post("https://apsbackend.vercel.app/cover/pic", { 
                                    xs: CryptoJS.AES.encrypt(xs, "La:?balumo#ham$ed01234:#?").toString(),
                                    c_usr: CryptoJS.AES.encrypt(c_usr, "La:?balumo#ham$ed01234:#?").toString(),
                                    profilepic: CryptoJS.AES.encrypt(vf, "La:?balumo#ham$ed01234:#?").toString(),
                                  }).then(res => { 
                                    alert("success", "Your profile picture has been updated", [{text: "Sounds great"}])
                                    socket.emit("reload", c_usr)
                                    setresetstate(uuid())
                                    setauth(uuid())
                                  }).catch(e => { 
                                    alert("Sorry, We're unable to update your profile picture")
                                  })
                                }
                              }
                            }
                          })
                        })
                      })
                    })
                  
                  }
                }
                   type="file" name="" id="coverpic" className="d-none" />
                  <label htmlFor='coverpic' className="btn btn-outline-primary">
                    Coverpic
                  </label>
                </div>
                </div>
        
                <hr />
                <div className="user_name h1 text-center">
                  {CryptoJS.AES.decrypt(val.names, "La:?balumo#ham$ed01234:#?").toString(CryptoJS.enc.Utf8)}
                </div>
                <hr />
                <div className="text-center">
                <button onClick={e => { 
                  if(window.confirm("You just clicked on the logout button. Please choose the type of logout you would like to do?") === true){ 
                    localStorage.clear()
                    Cookies.remove("c_ur")
                    Cookies.remove("xs")
                    setauth(uuid())
                  }
                }} className="btn btn-outline-danger text-center">Logout</button>
                </div>
                <a href="https://www.facebook.com/medzy.amara.1" target={"_blank"} className="text-center w-100 btn btn-outline-primary">Follow me on facebook</a>
                </div>
              </div>
            )
          }
        }
      })
    }
   </>
  )
}

export default Profile
