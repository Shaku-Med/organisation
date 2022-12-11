import React from 'react'
import { useEffect } from 'react'
import Linkify from 'react-linkify'

function Home() {

  return (
    <div className="home_page">
        <div className="hero_img">
            <div className="hero_text">
                <div className="h1">
                    Top Organization Member
                </div>
                <div className="card-text mt-2 mb-4">
                    This persong you see has been in the orgainzation for quite a long time. We wish he get's his best time on this orgainzation. 
                </div>
                <div className="buttons">
                    <button className="btn btn-outline-danger">View profile</button>
                    <button className="btn btn-outline-primary">Message</button>
                </div>
            </div>
        </div>

        <div className="groups_mem">
            <div className="alert_mess shadow">
                <div className="h4">
                    <img src="https://wallpapers.com/images/hd/cool-neon-blue-profile-picture-u9y9ydo971k9mdcf.jpg" alt="" />
                    <div className="ts">
                    From Admin
                    </div>
                </div>
                <div className="video_play_con">
                    <video controls playsInline controlsList='nodownload' src="https://cdn.trendybeatz.com/audio/Lil-Kesh-Love-Like-This-ft-Fireboy-DML-(TrendyBeatz.com).mp3#t=1"></video>
                </div>
                <div className="impo_txt">
                    <Linkify>
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Maiores, cum adipisci voluptatibus est doloremque neque et soluta quibusdam, molestiae tenetur architecto eum amet provident odit optio. http://localhost:3000 Odio exercitationem eligendi libero!
                    </Linkify>
                </div>
            </div>
        </div>


        <div className="groups_mem">
            <div className="alert_mess shadow">
                <div className="h4">
                    <div className="ts">
                     User Datas
                    </div>
                </div>
                <hr />
                <div className="impo_txt itm1">
                    <div className="u_1">
                        <div className="col">
                            <h5>Name</h5>
                            <div className="names text-danger">
                                Mohamed Brima Amara
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div className="h1 text-center mb-4">Organization Members</div>
        <div className="users_available">
            <div className="availe_con">
                <div className="cardd_1 shadow">
                    <div className="bgimg">
                        <div className="profile_co">
                            <img src="https://wallpapers.com/images/hd/cool-neon-blue-profile-picture-u9y9ydo971k9mdcf.jpg" alt="" />
                        </div>
                        <div className="big_name">
                          Mohamed Brima Amara
                        </div>
                    </div>
                    <div className="namve_s text-center">
                        <div className="buttons">
                            <button className="btn btn-outline-danger">View profile</button>
                            <button className="btn btn-outline-primary">Message</button>
                        </div>
                    </div>
                </div>
                <div className="cardd_1 shadow">
                    <div className="bgimg">
                        <div className="profile_co">
                            <img src="https://wallpapers.com/images/hd/cool-neon-blue-profile-picture-u9y9ydo971k9mdcf.jpg" alt="" />
                        </div>
                        <div className="big_name">
                          Mohamed Brima Amara
                        </div>
                    </div>
                    <div className="namve_s text-center">
                        <div className="buttons">
                            <button className="btn btn-outline-danger">View profile</button>
                            <button className="btn btn-outline-primary">Message</button>
                        </div>
                    </div>
                </div>
                <div className="cardd_1 shadow">
                    <div className="bgimg">
                        <div className="profile_co">
                            <img src="https://wallpapers.com/images/hd/cool-neon-blue-profile-picture-u9y9ydo971k9mdcf.jpg" alt="" />
                        </div>
                        <div className="big_name">
                          Mohamed Brima Amara
                        </div>
                    </div>
                    <div className="namve_s text-center">
                        <div className="buttons">
                            <button className="btn btn-outline-danger">View profile</button>
                            <button className="btn btn-outline-primary">Message</button>
                        </div>
                    </div>
                </div>
                <div className="cardd_1 shadow">
                    <div className="bgimg">
                        <div className="profile_co">
                            <img src="https://wallpapers.com/images/hd/cool-neon-blue-profile-picture-u9y9ydo971k9mdcf.jpg" alt="" />
                        </div>
                        <div className="big_name">
                          Mohamed Brima Amara
                        </div>
                    </div>
                    <div className="namve_s text-center">
                        <div className="buttons">
                            <button className="btn btn-outline-danger">View profile</button>
                            <button className="btn btn-outline-primary">Message</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

         
       

        <div className="h1" style={{height: '20vh'}}></div>
    </div>
  )
}

export default Home
