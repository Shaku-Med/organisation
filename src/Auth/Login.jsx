import axios from 'axios'
import Cookies from 'js-cookie'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {v4 as uuid} from 'uuid'

function Login() {

    const [token, settoken] = useState('')
    const [mes, setmes] = useState('')

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
 
    }, [])

    const [email, setemail] = useState('')
    const [pass, setpass] = useState('')

    const handlesub = e => { 
        e.preventDefault()

        let emailregix = /^[a-z0-9](\.?[a-z0-9]){5,}@g(oogle)?mail\.com$/

        let passregix = /^(?=.*[0-9])(?=.*[!@?#$%^&*])[a-zA-Z0-9!@?#$%^&*]{6,16}$/;


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
        else if(pass.length < 10){ 
            alert("Error: Your password length must be 10 character, letters, numbers and symbols")
           
        }
        else if(!pass.match(passregix)){ 
            alert("Error: your password doesn't go with our requirement.")
           
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
                        Cookies.set("c_usr", res.data.c_usr)
                        Cookies.set("xs", res.data.xs)
                        localStorage.setItem("c_usr", res.data.c_usr)
                        setTimeout(() => {
                            window.location.reload()
                    }, 10);
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
    <video loop playsInline autoPlay muted id='myvideo' src="https://pic.pikbest.com/18/23/98/86C888piCBPh.mp4#t=1"></video>
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
