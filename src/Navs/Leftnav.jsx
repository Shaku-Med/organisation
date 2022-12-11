import React from 'react'
import { useEffect } from 'react'

function Leftnav() {

  useEffect(() => { 
    let lc = document.querySelector(".lc")
    let ouimg = document.querySelector(".ouimg")
    lc.addEventListener("pointermove", e => { 
        let x = - .3 * e.pageX
        let y = - .3 *  e.pageY
        ouimg.style.transform = `rotate(${x + 'deg'})`
    })
  }, [])

  return (
    <div className="left_mt shadow">
        <div className="l_con">
            <div className="lc">
                <img className='shadow ouimg' src="https://wallpaperaccess.com/full/2213426.jpg" alt="" />
                <div className="text_c">
                    <div style={{cursor: 'pointer'}} className="detail1 text-center text-danger">
                        Edit Profile pic.
                    </div>
                    <hr />
                    <div className="name_mauin text-center">
                        Mohamed Brima Amara
                    </div>
                    <hr />
                    <div className="small_info">
                        <div className="acco_info text-center text-danger">
                            Your application is pending... 
                            We'll notify you when the admin accept's your application.
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Leftnav
