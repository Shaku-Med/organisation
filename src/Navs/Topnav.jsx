import React from 'react'

function Topnav() {
  return (
    <div className="nav_top shadow">
        <div className="nav_cont">
            <div className="nav_f">
                <div className="logos">
                    <img src="../mainlogo.png" alt="" />
                    <div className="logon">ORG</div>
                </div>
            </div>
            <div className="nav_mid">
                <div className="tools1">
                    <i className="fa fa-home"></i>
                    <span id='outspan'>Home</span>
                </div>
                <div className="tools1">
                    <i className="fa fa-commenting"></i>
                    <span id='outspan'>Chats</span>
                </div>
                <div className="tools1">
                    <i className="fa fa-plane"></i>
                    <span id='outspan'>Post</span>
                </div>
                <div className="tools1">
                    <i className="fa fa-user"></i>
                    <span id='outspan'>Profile</span>
                </div>

                <div className="user_profile tools1">
                    <img src="https://wallpapers.com/images/hd/cool-neon-blue-profile-picture-u9y9ydo971k9mdcf.jpg" alt="" />
                </div>
            </div>
        </div>
    </div>
  )
}

export default Topnav
