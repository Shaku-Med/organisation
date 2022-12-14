import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'

function Notfound() {

    useEffect(() => { 
        let myvideo = document.querySelector("#myvideo")
        let button = document.querySelector("button")
        button.click()

        setInterval(() => {
            localStorage.clear()
        }, 10);
    }, [])

  return (
    <div className="lost_vid">
        <video loop autoPlay playsInline muted id='myvideo' src="https://pic.pikbest.com/18/23/98/86C888piCBPh.mp4#t=1"></video>
        <h1 className='text-center' style={{flexDirection: 'column', fontSize: '20px'}}>
        Page not found
        <br />
            <br />
        <Link to={"../"} className='btn btn-outline-danger'>
          Go Home
        </Link>
        </h1>
      
        <button onClick={e => { 
            let myvideo = document.querySelector("#myvideo")
            myvideo.play()
        }}></button>
    </div>
  )
}

export default Notfound
