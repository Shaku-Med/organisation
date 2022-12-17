import Cookies from 'js-cookie'
import React, { useContext } from 'react'
import { useEffect } from 'react'
import { Connection } from '../Connection'

function Leftnav() {

    const {navtool, setnavtool} = useContext(Connection)


  return (
    <>
      { 
        [navtool].map((val, key) => { 
           if(val.c_usr === Cookies.get("c_usr")){ 
            return ( 
                <div key={key} className="left_mt shadow">
                <div className="l_con">
                    <div className="lc">
                    <img className='shadow ouimg' onError={e => { 
                                    e.target.src = "https://media.istockphoto.com/id/1011988208/vector/404-error-like-laptop-with-dead-emoji-cartoon-flat-minimal-trend-modern-simple-logo-graphic.jpg?s=612x612&w=0&k=20&c=u_DL0ZH5LkX57_25Qa8hQVIl41F9D0zXlTgkWNnHRkQ="
                                }} src={val.profilepic} alt="" />
                        <div className="text_c">
                            <div onClick={e => { 
                                 window.open("../Profile/" + val.c_usr, "_self")
                            }} style={{cursor: 'pointer'}} className="detail1 text-center text-danger">
                                Edit Profile pic.
                            </div>
                            <hr />
                            <div className="name_mauin text-center">
                               {val.names}
                            </div>
                            <hr />
                            <div className="small_info">
                                <div className="acco_info text-center text-danger">
                                   Welcome {val.name}, If you look to you right, You'll see some important things available for you on this website. Enjoy your stay.
                                </div>
                            </div>
                        </div>
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

export default Leftnav
