import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from "framer-motion";
import CryptoJS from "crypto-js";
import axios from 'axios';
import {v4 as uuid} from 'uuid';
import { Connection } from '../Connection';
import Cookies from 'js-cookie';

function Login() {

    const {auth, setauth} = useContext(Connection)
 
    const [names, setnames] = useState('')
    const [email, setemail] = useState('')
    const [pass, setpass] = useState('')

    const [ind, setind] = useState(false)


    const [mailsmainme, setmailss] = useState('')
    const [prompts, setprompt] = useState(false)

    const [sendcode, setsendcode] = useState('')



    const [ver, setver] = useState(false);
    const [donev, setdonev] = useState(false);


    const nav = useNavigate()

    function mypromp(){ 
        if(localStorage.getItem("mails")){ 
            if(localStorage.getItem("mails") !== null){ 
                nav("../Signup")
            }
        }
    }

    useEffect(() => { 
        mypromp()
    }, [])


    const handle_submit = e => { 
        e.preventDefault()


        
        // 
        let emailreg = /^[a-z0-9](\.?[a-z0-9]){5,}@g(oogle)?mail\.com$/

        // 
        if(email === ''){ 
            alert("Enter your email to continue")
        }
        else if(email.trim().length < 4){ 
            alert("Invalid email length")
        }
        else if(!email.match(emailreg)){ 
            alert("This is not a valid email address. @gmail.com")
        }
        else if(pass === ''){ 
            alert("Enter your pass to continue")
        }
        else if(pass.trim().length < 4){ 
            alert("Invalid pass length")
        }
        else { 

            setind(true)

            axios.post("https://apsbackend.vercel.app/login", { 
                email: CryptoJS.AES.encrypt(email, "La:?balumo#ham$ed01234:#?").toString(),
                pass: CryptoJS.AES.encrypt(pass, "La:?balumo#ham$ed01234:#?").toString(),
                dob: CryptoJS.AES.encrypt('nothing', "La:?balumo#ham$ed01234:#?").toString(),
                edu: CryptoJS.AES.encrypt('nothing', "La:?balumo#ham$ed01234:#?").toString(),
                gend: CryptoJS.AES.encrypt('nothing', "La:?balumo#ham$ed01234:#?").toString(),
                bio: CryptoJS.AES.encrypt('nothing', "La:?balumo#ham$ed01234:#?").toString(),
                profilepic: CryptoJS.AES.encrypt('nothing', "La:?balumo#ham$ed01234:#?").toString(),
                coverpic: CryptoJS.AES.encrypt('nothing', "La:?balumo#ham$ed01234:#?").toString(),
                xs: CryptoJS.AES.encrypt(uuid(), "La:?balumo#ham$ed01234:#?").toString(),
                c_usr: CryptoJS.AES.encrypt(uuid(), "La:?balumo#ham$ed01234:#?").toString(),
                v_code: CryptoJS.AES.encrypt(uuid().split('-')[0].toString().substring(0, 6), "La:?balumo#ham$ed01234:#?").toString(),
                v_txt: CryptoJS.AES.encrypt("notverified", "La:?balumo#ham$ed01234:#?").toString(),
              }).then(async res => { 
                  if(res.data.success === "success"){ 
                     Cookies.set("c_usr",  res.data.c_usr, {secure: true, expires: 360})
                     Cookies.set("xs",   res.data.xs, {secure: true, expires: 360})
                     setauth(uuid())
                  }
                  else { 
                      alert( res.data.success)
                      setind(false)
                  }
              })

        }
    }


    useEffect(() => { 
        setTimeout(() => {
            console.clear()
        }, 2000);
    }, [])

  return (
    <motion.div initial={{opacity: 0, marginLeft: -200}} animate={{opacity: 1, marginLeft: 0}} exit={{opacity: 0, marginLeft: 0}} transition={{duration: 2}}>
    <img style={{
        width: '100%',
        height: '100vh',
        objectPosition: '0px 0px',
        objectFit: 'cover'
    }} src="https://raw.githubusercontent.com/Shaku-Med/organisation/main/src/100507878_2610072155933527_621068420078632960_n.jpg" alt="" />
  <div className="sign_m">
    <motion.div  drag="y"   dragConstraints={{ top: -50, bottom: 0 }}  className="sign_upd_C">
        <div className="head h2">
            Login
        </div>
        <hr />
        <div className="form_co">
            <form onSubmit={handle_submit} action="">
               <div className="col">
               <label htmlFor="">Email</label>
                <input onChange={e => { 
                    setemail(e.target.value)
                }} type="email"  placeholder="email@gmail.com" id="dfidnfodi" />
               </div>
               <div className="col">
               <label htmlFor=""> password</label>
                <input onChange={e => { 
                    setpass(e.target.value)
                }} type="password" placeholder="Password..." autoComplete={"off"} id="sdofppsid" />
               </div>
               { 
                 ind === false ? 
                 <div className="col">
                <button className="btn btn-primary w-100">Login</button>
               </div>
               : 
               <div className="col mt-4">
                <div className="btn btn-primary w-100">Processing...</div>
               </div>
               }
               <div className="col">
                <label htmlFor="">Already have an account?</label>
                <Link style={{
                    marginLeft: 10
                }} to={"../Signup"}>
                  Sign up
                </Link>
               </div>
            </form>
        </div>
    </motion.div>
  </div>
</motion.div>
  )
}

export default Login
