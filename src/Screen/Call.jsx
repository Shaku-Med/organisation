import React, { useEffect } from 'react'

function Call() {

    useEffect(() => { 
        let userprof = document.querySelector("#userprof")
        let vid_cont = document.querySelector(".vid_cont")

        vid_cont.addEventListener("pointerdown", mousedown, false)
        vid_cont.addEventListener("pointerup", mouseup, false)

        function mouseup(){ 
            vid_cont.removeEventListener("pointermove", dragdiv, true)
        }

        function mousedown(){ 
            vid_cont.addEventListener("pointermove", dragdiv, true)
        }

        function dragdiv (e) { 
            let bound = userprof.getBoundingClientRect()
            userprof.style.top = bound.offsetTop - e.clientY + 'px'
            userprof.style.left = bound.offsetLeft - e.clientX + 'px'
        }

    }, [])

  return (
   <div className="callings">
    <div className="calling_container">
        <div className="call_controls">
            <div className="control_1_C btn btn-warning">
                <i className="fa fa-video"></i>
                <span>Pause Video</span>
            </div>
            <div className="control_1_C btn btn-primary">
                <i className="fa fa-microphone"></i>
                <span>mute</span>
            </div>
            <div className="control_1_C btn btn-danger">
                <i className="fa fa-times"></i>
                <span>End</span>
            </div>
        </div>
        <div className="vid_cont">
            <video src="https://player.vimeo.com/external/387242961.sd.mp4?s=8316fe6d35747ab5a051a762b050b6a1f039f3b9&profile_id=164&oauth2_token_id=57447761#t=1"  playsInline></video>
            <video id='userprof' src="https://player.vimeo.com/external/484024469.sd.mp4?s=560d44a0d8436d110b1a40b62c55600b0476468a&profile_id=165&oauth2_token_id=57447761#t=1"  playsInline></video>
        </div>
    </div>
   </div>
  )
}

export default Call
