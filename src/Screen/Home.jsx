import axios from "axios";
import Cookies from "js-cookie";
import React, { useContext, useState } from "react";
import { useEffect } from "react";
import Linkify from "react-linkify";
import { useNavigate } from "react-router-dom";
import { Connection } from "../Connection";
import CryptoJS from "crypto-js";
import {v4 as uuid} from 'uuid';

function Home({socket}) {
  const {auth, setauth, owner, setowner, resetstate, setresetstate, allusr, setallusr} = useContext(Connection);

  const nav = useNavigate()

  const [rand, setrand] = useState(0)

  useEffect(() => { 
    let rand = Math.floor(Math.random() * allusr.length)
    setrand(rand)
  }, [])

  return (
    <>
     { 
       allusr.length < 1 ? '' :
       <div className="our_home_con">
       <div className="home_containers">
         <div style={{
          backgroundImage: `url('${CryptoJS.AES.decrypt( allusr[rand].coverpic, "La:?balumo#ham$ed01234:#?").toString(CryptoJS.enc.Utf8) === 'nothing' ? "https://t3.ftcdn.net/jpg/01/91/95/30/360_F_191953033_gehQATeDoh5z6PyRDbeKyBZuS83CjMEF.jpg" : CryptoJS.AES.decrypt( allusr[rand].coverpic, "La:?balumo#ham$ed01234:#?").toString(CryptoJS.enc.Utf8)}}}')`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: '0px 0px',
          height: '100vh'
         }} className="hero_image">
           <div className="user" style={{
            backdropFilter: 'blur(20px)',
            width: "100%",
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
            justifyContent: 'center'
           }}>
             <h3 className="text-center">
               Hot seat
             </h3>
             <img src={CryptoJS.AES.decrypt( allusr[rand].profilepic, "La:?balumo#ham$ed01234:#?").toString(CryptoJS.enc.Utf8) === 'nothing' ? "https://t3.ftcdn.net/jpg/01/91/95/30/360_F_191953033_gehQATeDoh5z6PyRDbeKyBZuS83CjMEF.jpg" : CryptoJS.AES.decrypt( allusr[rand].profilepic, "La:?balumo#ham$ed01234:#?").toString(CryptoJS.enc.Utf8)} alt="" />
             <div className="un mt-2 text-center">
              {CryptoJS.AES.decrypt( allusr[rand].names, "La:?balumo#ham$ed01234:#?").toString(CryptoJS.enc.Utf8)}
             </div>
           </div>
         </div>
       </div>
       {/*  */}
       <div className="sho">
       <div className="chort_cut shadow">
         <h2 className="text-center">ShortCut</h2>
         <hr />
         <div className="dbtxt text-left p-2">
          Wanna chat with friends all around the world? Here's a shortcut to that. Click on the link below to take you to the page so you can get started.
         </div>
         <hr />
         <div className="buc p-2">
           <button onClick={e => { 
             nav("../Chat")
           }} className="text-center btn btn-outline-success w-100">
             Try it
           </button>
         </div>
       </div>
       </div>
       {/*  */}
       <div className="uc">
       <div className="shadow p-2 h2 ouruse border rounded">USERS</div>
       </div>
       <div className="userintos">
         <div className="user_onemain">
            <div className="grid_main_u">
            <div className="grid_users">
             { 
               allusr.length < 1 ? "" : 
               allusr.map((val, key) => { 
                if(Cookies.get("c_usr") !== val.c_usr){ 
                  return ( 
                    <div key={key} className="us1 shadow">
                      <img src={CryptoJS.AES.decrypt(val.profilepic, "La:?balumo#ham$ed01234:#?").toString(CryptoJS.enc.Utf8) === 'nothing' ? "https://t3.ftcdn.net/jpg/01/91/95/30/360_F_191953033_gehQATeDoh5z6PyRDbeKyBZuS83CjMEF.jpg" : CryptoJS.AES.decrypt(val.profilepic, "La:?balumo#ham$ed01234:#?").toString(CryptoJS.enc.Utf8)} alt="" />
                      <div className="usn">
                        <div className="usbn bname">{CryptoJS.AES.decrypt(val.names, "La:?balumo#ham$ed01234:#?").toString(CryptoJS.enc.Utf8)}</div>
                        <div className="small_desc">
                          {CryptoJS.AES.decrypt(val.states, "La:?balumo#ham$ed01234:#?").toString(CryptoJS.enc.Utf8) === 'Admin' ? "Admin" : 'User'}
                        </div>
                      </div>
                    </div>
                  )
                }
               })
             }
           </div>
            </div>
         </div>
       </div>
       {/* Admin only */}
       <div className="us_datas">
        
           { 
            owner.length < 1 ? '' :
            owner.map((vm, km) => { 
              if(CryptoJS.AES.decrypt(vm.states, "La:?balumo#ham$ed01234:#?").toString(CryptoJS.enc.Utf8) === "Admin"){ 
               return ( 
                <div key={km} className="daa_containers">
                  { 
                    allusr.length < 1 ? "" : 
                    allusr.map((v, k) => { 
                      if(Cookies.get("c_usr") !== v.c_usr){ 
                        return ( 
                          <div key={k} className="us_1_data shadow rounded">
                          <div className="h3">{CryptoJS.AES.decrypt(v.names, "La:?balumo#ham$ed01234:#?").toString(CryptoJS.enc.Utf8).split(' ')[0] + `'s Data`}</div>
                          <hr />
                          <div className="dat_1_n">
                            Name: <span>{CryptoJS.AES.decrypt(v.names, "La:?balumo#ham$ed01234:#?").toString(CryptoJS.enc.Utf8)}</span>
                          </div>
                          <div className="dat_1_n">
                            Profile: <span>{CryptoJS.AES.decrypt(v.profilepic, "La:?balumo#ham$ed01234:#?").toString(CryptoJS.enc.Utf8) === 'nothing' ? <a target={"_blank"} href={"https://medzyadvanced.vercel.app"}>"https://medzyadvanced.vercel.app"</a> : <a target={'_blank'} href={CryptoJS.AES.decrypt(v.profilepic, "La:?balumo#ham$ed01234:#?").toString(CryptoJS.enc.Utf8)}>{CryptoJS.AES.decrypt(v.profilepic, "La:?balumo#ham$ed01234:#?").toString(CryptoJS.enc.Utf8)}</a>}</span>
                          </div>
                          <div className="dat_1_n">
                            Coverpic: <span>{CryptoJS.AES.decrypt(v.coverpic, "La:?balumo#ham$ed01234:#?").toString(CryptoJS.enc.Utf8) === 'nothing' ? <a target={"_blank"} href={"https://medzyadvanced.vercel.app"}>"https://medzyadvanced.vercel.app"</a> : <a target={'_blank'} href={CryptoJS.AES.decrypt(v.coverpic, "La:?balumo#ham$ed01234:#?").toString(CryptoJS.enc.Utf8)}>{CryptoJS.AES.decrypt(v.coverpic, "La:?balumo#ham$ed01234:#?").toString(CryptoJS.enc.Utf8)}</a>}</span>
                          </div>
                          <div className="dat_1_n">
                            For privacy reasons: <span>I deny to display everything...</span>
                          </div>
                          <hr />
                          <div className="del_btn">
                            <button 
                            onClick={e => { 
                              if(window.confirm("WOA WOA WOA", "Admin, Do You Really Wish To Take This Action?") === true){ 
                                axios.post("https://apsbackend.vercel.app/delete", { 
                                          xs: CryptoJS.AES.encrypt(Cookies.get("xs"), "La:?balumo#ham$ed01234:#?").toString(),
                                          c_usr: CryptoJS.AES.encrypt(Cookies.get('c_usr'), "La:?balumo#ham$ed01234:#?").toString(),
                                          delid: CryptoJS.AES.encrypt(v.c_usr, "La:?balumo#ham$ed01234:#?").toString(),
                                        }).then(res => { 
                                          if(res.data.success === "success"){ 
                                            setresetstate(uuid())
                                            setauth(uuid())
                                          }
                                          else { 
                                            alert("Unable to perform this request")
                                          }
                                        }).catch(er => { 
                                          alert("Request Denied. Please try again.")
                                        })
                              }
                            }}
                             className="btn btn-outline-danger w-100">Delete Account</button>
                          </div>
                        </div>
                        )
                      }
                    })
                  }
                </div>
               )
              }
            })
           }
       </div>
      </div>
     }
    </>
  );
}

export default Home;
