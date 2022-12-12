import axios from 'axios';
import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

function Profile() {

    const {id} = useParams()

    const [datas, setdata] = useState([])

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
    }, [])

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
                                }} src={val.profilepic} alt="" id='file_main'/>
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
                            <input disabled placeholder={val.names} type="text" name="" id="" />
                        </div>
                        <div className="col">
                            <h4>Email</h4>
                            <input disabled placeholder={val.cemail} type="text" name="" id="" />
                        </div>
                        <div className="col">
                            <h4>Education</h4>
                            <input disabled  placeholder={val.edu} type="text" name="" id="" />
                        </div>
                        <div className="col">
                            <h4>Sex</h4>
                            <input disabled placeholder={val.gend} type="text" name="" id="" />
                        </div>
                        <div className="col">
                            <h4>About You</h4>
                             <textarea disabled placeholder={val.about} name="" id=""></textarea>
                        </div>
                    </div>
                    <div className="h1" style={{height: '20vh'}}></div>
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
                            <input disabled placeholder={val.names} type="text" name="" id="" />
                        </div>
                        <div className="col">
                            <h4>Email</h4>
                            <input disabled placeholder={val.cemail} type="text" name="" id="" />
                        </div>
                        <div className="col">
                            <h4>Education</h4>
                            <input disabled  placeholder={val.edu} type="text" name="" id="" />
                        </div>
                        <div className="col">
                            <h4>Sex</h4>
                            <input disabled placeholder={val.gend} type="text" name="" id="" />
                        </div>
                        <div className="col">
                            <h4>About You</h4>
                             <textarea disabled placeholder={val.about} name="" id=""></textarea>
                        </div>
                    </div>
                    <div className="h1" style={{height: '20vh'}}></div>
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
