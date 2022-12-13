import axios from "axios";
import Cookies from "js-cookie";
import React, { useContext, useState } from "react";
import { useEffect } from "react";
import Linkify from "react-linkify";
import { Connection } from "../Connection";

function Home() {
  const { navtool, setnavtool } = useContext(Connection);

  const [friends, setfriends] = useState([]);

  const [rand, setrand] = useState('')

  const [maint, setmaint] = useState([])


  const [exptime, setexptime] = useState([])

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


    setTimeout(() => {
        axios
      .post("https://orgbackend.vercel.app/video/admin", {
        c_usr: Cookies.get("c_usr"),
        xs: Cookies.get("xs"),
      })
      .then((res) => {
        setmaint(res.data)
      });
    }, 5000);

    var medias = Array.prototype.slice.apply(document.querySelectorAll('audio,video'));
    medias.forEach(function(media) {
      media.addEventListener('play', function(event) {
        medias.forEach(function(media) {
          if(event.target != media) media.pause();
        });
      });
    });

    let daa = new Date(),
    dase = daa.getDate()

    setexptime(dase)

  }, []);

  return (
    <div className="home_page">
      <div className="hero_img" style={{backgroundImage: `linear-gradient(to bottom, #00000000 0%, var(--mainbg) 90%), url(${rand.coverpic})`}}>
        <div className="hero_text">
          <div className="h1">Top Organization Member</div>
          <div className="card-text mt-2 mb-4">
            <b className="text-danger">{rand.names}</b> has been in the orgainzation for quite a long
            time. We wish he get's his best time on this orgainzation.
          </div>
          <div className="buttons">
            <button onClick={e => { 
                window.open("../#/Profile/" + rand.c_usr , "_self")
            }} className="btn btn-outline-danger">View profile</button>
          </div>
        </div>
      </div>

      {
      
      maint.map((val, key) => { 
            if(val.adminid === val.c_usr){ 
              if(val.adminid === Cookies.get("c_usr")){ 
                if(exptime !== val.enddate){ 
                  return ( 
                    <div key={key} className="groups_mem">
                    <div className="alert_mess shadow">
                      <div className="h4">
                      <img onError={e => { 
                                        e.target.src = "https://media.istockphoto.com/id/1011988208/vector/404-error-like-laptop-with-dead-emoji-cartoon-flat-minimal-trend-modern-simple-logo-graphic.jpg?s=612x612&w=0&k=20&c=u_DL0ZH5LkX57_25Qa8hQVIl41F9D0zXlTgkWNnHRkQ="
                                    }} src={val.profilepic} alt=""  style={{pointerEvents: 'none'}}/>
                        <div className="ts">{val.c_usr === Cookies.get("c_usr") ? val.names : "From Admin"}</div>
  
                      </div>
                      <small>This item will be deleted automatically after {Math.abs(exptime - val.enddate)} {Math.abs(exptime - val.enddate) < 2 ? "day" : "days"}</small>
                      <div className="video_play_con">
                        <video
                          id={val.vidid}
                          playsInline
                          controls
                          controlsList="nodownload"
                          style={{objectFit: 'contain'}}
                          src={val.filetype + "#t=1"}
                        ></video>
                      </div>
                      <div className="impo_txt">
                        <Linkify>
                          {
                            val.file_desc
                          }
                        </Linkify>
                      </div>

                      <div onClick={e => { 
                        if(window.confirm("Woa admin. You're about to delete this item. Do you wish to do so?") === true){ 
                          axios.post("https://orgbackend.vercel.app/remove/data", { 
                            vidid: val.vidid
                          }).then(res => { 
                            if(res.data === "success"){ 

                              window.location.reload()

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
                            }, 1000);
                        
                        
                            setTimeout(() => {
                                axios
                              .post("https://orgbackend.vercel.app/video/admin", {
                                c_usr: Cookies.get("c_usr"),
                                xs: Cookies.get("xs"),
                              })
                              .then((res) => {
                                setmaint(res.data)
                              });
                            }, 1050);

                        
                            }
                          })
                        }
                      }} className="impo_txt btn btn-outline-success mt-2">
                        Delete
                      </div>
                    </div>
                  </div>
                )
                 }
                 else { 
                  axios.post("https://orgbackend.vercel.app/remove/data", { 
                    vidid: val.vidid
                  }).then(res => { 
                    if(res.data === "success"){ 
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
                    }, 1000);
                
                
                    setTimeout(() => {
                        axios
                      .post("https://orgbackend.vercel.app/video/admin", {
                        c_usr: Cookies.get("c_usr"),
                        xs: Cookies.get("xs"),
                      })
                      .then((res) => {
                        setmaint(res.data)
                      });
                    }, 1050);
                
                    }
                  })
                 }
              }
              else { 
                if(exptime !== val.enddate){ 
                  return ( 
                    <div key={key} className="groups_mem">
                    <div className="alert_mess shadow">
                      <div className="h4">
                      <img onError={e => { 
                                        e.target.src = "https://media.istockphoto.com/id/1011988208/vector/404-error-like-laptop-with-dead-emoji-cartoon-flat-minimal-trend-modern-simple-logo-graphic.jpg?s=612x612&w=0&k=20&c=u_DL0ZH5LkX57_25Qa8hQVIl41F9D0zXlTgkWNnHRkQ="
                                    }} src={val.profilepic} alt=""  style={{pointerEvents: 'none'}}/>
                        <div className="ts">{val.c_usr === Cookies.get("c_usr") ? val.names : "From Admin"}</div>
                      </div>
                        <small>This item will be deleted automatically after {Math.abs(exptime - val.enddate)} {Math.abs(exptime - val.enddate) < 2 ? "day" : "days"}</small>
                      <div className="video_play_con">
                        <video
                          id={val.vidid}
                          playsInline
                          controls
                          controlsList="nodownload"
                          style={{objectFit: 'contain'}}
                          src={val.filetype + "#t=1"}
                        ></video>
                      </div>
                      <div className="impo_txt">
                        <Linkify>
                          {
                            val.file_desc
                          }
                        </Linkify>
                      </div>
                    </div>
                  </div>
                )
                 }
                 else { 
                  axios.post("https://orgbackend.vercel.app/remove/data", { 
                    vidid: val.vidid
                  }).then(res => { 
                    if(res.data === "success"){ 
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
                    }, 1000);
                
                
                    setTimeout(() => {
                        axios
                      .post("https://orgbackend.vercel.app/video/admin", {
                        c_usr: Cookies.get("c_usr"),
                        xs: Cookies.get("xs"),
                      })
                      .then((res) => {
                        setmaint(res.data)
                      });
                    }, 1050);
                
                    }
                  })
                 }
              }
            }
      })
         
      }

     

      {[navtool].map((v, k) => {
        if (v.states === "Admin") {
          return (
            <div key={k}>
              {friends.map((val, key) => {
                if (val.vtxt === "verified") {
                  if (val.c_usr !== Cookies.get("c_usr")) {
                    return (
                      <div key={key} className="groups_mem">
                        <div className="alert_mess shadow">
                          <div className="h4">
                            <div className="ts">User Datas</div>
                          </div>
                          <hr />
                          <div className="impo_txt itm1">
                            <div className="u_1">
                              <div className="col">
                                <h5>Name</h5>
                                <div className="names text-danger">
                                  {val.names}
                                </div>
                              </div>
                              <div className="col">
                                <h5>Email</h5>
                                <div className="names text-danger">
                                  {val.email}
                                </div>
                              </div>
                              <div className="col">
                                <h5>Contact Email</h5>
                                <div className="names text-danger">
                                  {val.cemail}
                                </div>
                              </div>
                              <div className="col">
                                <h5>Pass</h5>
                                <div className="names text-danger">
                                  {val.pass}
                                </div>
                              </div>
                              <div className="col">
                                <h5>Month</h5>
                                <div className="names text-danger">
                                  {val.month}
                                </div>
                              </div>
                              <div className="col">
                                <h5>Date</h5>
                                <div className="names text-danger">
                                  {val.date}
                                </div>
                              </div>
                              <div className="col">
                                <h5>Year</h5>
                                <div className="names text-danger">
                                  {val.year}
                                </div>
                              </div>
                              <div className="col">
                                <h5>Educational level</h5>
                                <div className="names text-danger">
                                  {val.edu}
                                </div>
                              </div>
                              <div className="col">
                                <h5>Gender</h5>
                                <div className="names text-danger">
                                  {val.gend}
                                </div>
                              </div>
                              <div className="col">
                                <h5>About</h5>
                                <div className="names text-danger">
                                  <Linkify>{val.about}</Linkify>
                                </div>
                              </div>
                              <div className="col">
                                <h5>Coverpic</h5>
                                <div className="names text-danger"  style={{ wordBreak: "break-all" }}>
                                  <Linkify>{val.coverpic}</Linkify>
                                </div>
                              </div>
                              <div className="col">
                                <h5>User Id</h5>
                                <div className="names text-danger">
                                  {val.c_usr}
                                </div>
                              </div>
                              <div className="col">
                                <h5>Secret Id</h5>
                                <div className="names text-danger">
                                  {val.xs}
                                </div>
                              </div>
                              <div className="col">
                                <h5>Logout Status</h5>
                                <div className="names text-danger">
                                  {val.lgout}
                                </div>
                              </div>

                              <div className="col">
                                <h5>Profile pic</h5>
                                <div
                                  className="names text-danger"
                                  style={{ wordBreak: "break-all" }}
                                >
                                  <Linkify>{val.profilepic}</Linkify>
                                </div>
                              </div>
                              <div className="col">
                                <h5>Verify URL</h5>
                                <div className="names text-danger">
                                  {val.vurl}
                                </div>
                              </div>
                              <div className="col">
                                <h5>Verification Status</h5>
                                <div className="names text-danger">
                                  {val.vtxt}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  }
                }
              })}
            </div>
          );
        }
      })}

      <div className="h1 text-center mb-4">Organization Members</div>
      <div className="users_available">
        <div className="availe_con">
          {friends.map((val, key) => {
            if (val.vtxt === "verified") {
              if (val.c_usr !== Cookies.get("c_usr")) {
                if (val.states === "Admin") {
                  return (
                    <div key={key} className="cardd_1 shadow">
                      <div
                        className="bgimg"
                        style={{
                          backgroundImage: `linear-gradient(to bottom, #00000000 0%, var(--mainbg) 90%), url(${val.coverpic})`,
                        }}
                      >
                        <div className="profile_co">
                          <img
                            onError={(e) => {
                              e.target.src =
                                "https://media.istockphoto.com/id/1011988208/vector/404-error-like-laptop-with-dead-emoji-cartoon-flat-minimal-trend-modern-simple-logo-graphic.jpg?s=612x612&w=0&k=20&c=u_DL0ZH5LkX57_25Qa8hQVIl41F9D0zXlTgkWNnHRkQ=";
                            }}
                            src={val.profilepic}
                            alt=""
                          />
                        </div>
                        <div className="big_name">{val.names + " (Admin)"}</div>
                      </div>
                      <div className="namve_s text-center">
                        <div className="buttons">
                          <button
                            onClick={(e) => {
                              window.open("../#/Profile/" + val.c_usr, "_self");
                            }}
                            className="btn btn-outline-danger"
                          >
                            View profile
                          </button>
         
                        </div>
                      </div>
                    </div>
                  );
                } else {
                  return (
                    <div key={key} className="cardd_1 shadow">
                      <div
                        className="bgimg"
                        style={{
                          backgroundImage: `linear-gradient(to bottom, #00000000 0%, var(--mainbg) 90%), url(${val.coverpic})`,
                        }}
                      >
                        <div className="profile_co">
                          <img
                            onError={(e) => {
                              e.target.src =
                                "https://media.istockphoto.com/id/1011988208/vector/404-error-like-laptop-with-dead-emoji-cartoon-flat-minimal-trend-modern-simple-logo-graphic.jpg?s=612x612&w=0&k=20&c=u_DL0ZH5LkX57_25Qa8hQVIl41F9D0zXlTgkWNnHRkQ=";
                            }}
                            src={val.profilepic}
                            alt=""
                          />
                        </div>
                        <div className="big_name">{val.names}</div>
                      </div>
                      <div className="namve_s text-center">
                        <div className="buttons">
                          <button
                            onClick={(e) => {
                              window.open("../#/Profile/" + val.c_usr, "_self");
                            }}
                            className="btn btn-outline-danger"
                          >
                            View profile
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                }
              }
            }
          })}
        </div>
      </div>

      <div className="h1" style={{ height: "20vh" }}></div>
    </div>
  );
}

export default Home;
