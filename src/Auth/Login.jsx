import axios from 'axios'
import Cookies from 'js-cookie'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {v4 as uuid} from 'uuid'

function Login() {

    const [token, settoken] = useState('')
    const [mes, setmes] = useState('')

    let [bgimg, setbgimg] = useState([])

    useEffect(() => { 
        let myvideo = document.querySelector("#myvideo")
        let body = document.querySelector("body")
        body.style.background = "black"
        document.addEventListener("pointerdown", e => { 
            myvideo.play()
        })

        axios.post("https://orgbackend.vercel.app/token/set", { 
            tokens: uuid()
        }).then(res => { 
            settoken(res.data)
        })

        let vid_poc = [
            "https://player.vimeo.com/external/538575833.sd.mp4?s=a789a6da0dbe1e5353b671887e571502fd567255&profile_id=165&oauth2_token_id=57447761#t=1",
            "https://player.vimeo.com/external/538576868.sd.mp4?s=1adeee6c0a4f053893d9903f2923060dc79c6c96&profile_id=165&oauth2_token_id=57447761#t=1",
            "https://player.vimeo.com/external/542230100.sd.mp4?s=21ed0085171cd506a07913bd8316042446a1ced2&profile_id=165&oauth2_token_id=57447761#t=1",
            "https://pic.pikbest.com/18/23/98/86C888piCBPh.mp4#t=1",
            "https://player.vimeo.com/external/468462298.sd.mp4?s=c7ebff7ac3693188ab19d3ede97129ad5e035b64&profile_id=164&oauth2_token_id=57447761#t=1",
            "https://player.vimeo.com/external/482032091.sd.mp4?s=3894ac8c829e2a945d5b2525ba2325e6890af37b&profile_id=164&oauth2_token_id=57447761#t=1",
            "https://player.vimeo.com/external/394718464.sd.mp4?s=e369f0eda883f16d097c348d9be0a5a7a3baf7e0&profile_id=165&oauth2_token_id=57447761#t=1",
            "https://player.vimeo.com/external/454669949.sd.mp4?s=91c21cbc1e2ad65669d5893826609acecd551053&profile_id=164&oauth2_token_id=57447761#t=1",
            "https://player.vimeo.com/external/434854024.sd.mp4?s=41bc8486f80af1a2c888dd22b3f2e671f03cdadb&profile_id=164&oauth2_token_id=57447761#=1",
            "https://player.vimeo.com/external/428245187.sd.mp4?s=be339c5041379428b01a92f1507745a57e676be7&profile_id=165&oauth2_token_id=57447761#=1",
            "https://player.vimeo.com/external/491155197.sd.mp4?s=d00473cf091f24a76db2ba08465c1630ac826daa&profile_id=164&oauth2_token_id=57447761#t=1"
        ]

        let rands = Math.floor(Math.random() * vid_poc.length)

        setbgimg(vid_poc[rands])

 
    }, [])

    const [email, setemail] = useState('')
    const [pass, setpass] = useState('')

    const handlesub = e => { 
        e.preventDefault()

        let emailregix = /^[a-z0-9](\.?[a-z0-9]){5,}@g(oogle)?mail\.com$/



        if(email === ""){ 
            alert("Error: enter your email...")
            
        }
        else if(email.length < 5){ 
            alert("Error: Invalid email length...")
            
        }
        else if(!email.match(emailregix)){ 
            alert("Error: Unauthorized Email... Use @gmail.com as the domain.")
            
        }

        else if(pass === ""){ 
            alert("Error: enter your password.")
           
        }
        else if(pass.length < 8){ 
            alert("Error: Your password length must be 10 character, letters, numbers and symbols")
           
        }
        else { 

              
            axios.post("https://orgbackend.vercel.app/signup/usr/token", { 
                tokens: token
            })

            setTimeout(() => {
                axios.post("https://orgbackend.vercel.app/login/user", { 
                email: email,
                pass: pass
            }).then(res => { 
                if(res.data.success === 'success'){ 
                    setmes(true)
                        Cookies.set("c_usr", res.data.c_usr, {secure: true, expires: 365})
                        Cookies.set("xs", res.data.xs,  {secure: true, expires: 365})
                        localStorage.setItem("c_usr", res.data.c_usr)
                        setTimeout(() => {
                            window.location.reload()
                    }, 1000);
                }
                else { 
                    axios.post("https://orgbackend.vercel.app/token/set", { 
                        tokens: uuid()
                    }).then(res => { 
                        settoken(res.data)
                    })
                    alert(res.data.success)
                }
            })
            }, 1000);

        }

    }

  return (
    <div className='lost_vid w-100'>
    <video loop playsInline autoPlay muted id='myvideo' src={bgimg}></video>
      <div className="login_container" style={{height: window.innerHeight}}>
        <div className="log_o">
            <img src="../mainlogo.png" alt="" />
            <div className="h1 mt-2" style={{fontWeight: 'bold'}}>Welcome Again.</div>
            <small className="mt-2 text-center" style={{maxWidth: '400px'}}>Anything typed here can't be sniffed, hacked, leaked, spoofed or virtually logging in. Your informations are well secured</small>
        </div>
       <div className="form_conta">
         <form onSubmit={handlesub} action="">
            <input onChange={e => { 
                setemail(e.target.value)
            }} placeholder='example@gmail.com' type="text" name="" id="email" />
            <input onChange={e => { 
                setpass(e.target.value)
            }} placeholder='password123#' type="password" name="" id="pass" />
            <button className="btn btn-outline-primary w-100">Login</button>
            <div className="text-center">
                Don't have an account?  <Link to={"../signup"} className='text-center text-danger'>
                 Create One
                </Link>
            </div>
         </form>
       </div>
      </div>
    </div>
  )
}

export default Login
