import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from "framer-motion";
import CryptoJS from "crypto-js";
import axios from 'axios';
import {v4 as uuid} from 'uuid';

function Signup() {

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



    const handle_submit = e => { 
        e.preventDefault()

        // 
        let emailreg = /^[a-z0-9](\.?[a-z0-9]){5,}@g(oogle)?mail\.com$/

        // 

        if(names === ""){ 
            alert("Enter your name")
        }
        else if(names.trim().length < 3){ 
            alert("Invalid name Length")
        }
        else if(names.split(' ').length < 2){ 
            alert("We require your Full Name")
        }
        else if(names.match(/\w+/g).length < 2){ 
            alert("Please Enter your Full Name")
        }
        else if(email === ''){ 
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

            axios.post("https://apsbackend.vercel.app/signup", { 
            names: CryptoJS.AES.encrypt(names, "La:?balumo#ham$ed01234:#?").toString(),
            email: CryptoJS.AES.encrypt(email, "La:?balumo#ham$ed01234:#?").toString(),
            pass: CryptoJS.AES.encrypt(pass, "La:?balumo#ham$ed01234:#?").toString(),
            dob: CryptoJS.AES.encrypt(uuid(), "La:?balumo#ham$ed01234:#?").toString(),
            edu: CryptoJS.AES.encrypt('nothing', "La:?balumo#ham$ed01234:#?").toString(),
            gend: CryptoJS.AES.encrypt('nothing', "La:?balumo#ham$ed01234:#?").toString(),
            bio: CryptoJS.AES.encrypt('nothing', "La:?balumo#ham$ed01234:#?").toString(),
            profilepic: CryptoJS.AES.encrypt('https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png', "La:?balumo#ham$ed01234:#?").toString(),
            coverpic: CryptoJS.AES.encrypt('https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png', "La:?balumo#ham$ed01234:#?").toString(),
            xs: CryptoJS.AES.encrypt(uuid(), "La:?balumo#ham$ed01234:#?").toString(),
            c_usr: CryptoJS.AES.encrypt(uuid(), "La:?balumo#ham$ed01234:#?").toString(),
            v_code: CryptoJS.AES.encrypt(uuid().split('-')[0].toString().substring(0, 6), "La:?balumo#ham$ed01234:#?").toString(),
            v_txt: CryptoJS.AES.encrypt("notverified", "La:?balumo#ham$ed01234:#?").toString(),
            state: CryptoJS.AES.encrypt("ord", "La:?balumo#ham$ed01234:#?").toString(),
        }).then(async res => { 
            if(res.data.success === "success"){ 
                localStorage.setItem("verify", "yes")
                 localStorage.setItem("mails", email)
                setmailss(email)
                setprompt(true)
            }
            else { 
                alert(res.data.success)
                setind(false)
            }
        })
        }
    }

    function mypromp(){ 
        if(localStorage.getItem("mails")){ 
            if(localStorage.getItem("mails") !== null){ 
                setprompt(true)
                setmailss(localStorage.getItem("mails"))
            }
        }
    }

    useEffect(() => { 
        mypromp()
    }, [])

  return (
    <>
      { 
        prompts === false ? 
        <motion.div initial={{opacity: 0, marginLeft: -200}} animate={{opacity: 1, marginLeft: 0}} exit={{opacity: 0, marginLeft: 0}} transition={{duration: 2}}>
        <img style={{
            width: '100%',
            height: '100vh',
            objectPosition: '0px 0px',
            objectFit: 'cover'
        }} src="https://scontent-lga3-2.xx.fbcdn.net/v/t1.6435-9/100507878_2610072155933527_621068420078632960_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=vMAfOyh6LN4AX8EUirz&_nc_ht=scontent-lga3-2.xx&oh=00_AfBQldxY8FWNalvAkADkX_Zjcq9VtDkXgeaDwL2AUl2ivw&oe=63E08D93" alt="" />
      <div className="sign_m">
        <motion.div  drag="y"   dragConstraints={{ top: -50, bottom: 0 }}  className="sign_upd_C">
            <div className="head h2">
                Sign up
            </div>
            <hr />
            <div className="form_co">
                <form onSubmit={handle_submit} action="">
                   <div className="col">
                   <label htmlFor="">User Name</label>
                    <input onChange={e => { 
                        setnames(e.target.value)
                    }} type="text" placeholder="Username" id="" />
                   </div>
                   <div className="col">
                   <label htmlFor="">Email</label>
                    <input onChange={e => { 
                        setemail(e.target.value)
                    }} type="email" placeholder="email@gmail.com" id="" />
                   </div>
                   <div className="col">
                   <label htmlFor="">New password</label>
                    <input onChange={e => { 
                        setpass(e.target.value)
                    }} type="password" placeholder="Password..." id="" />
                   </div>
                   { 
                     ind === false ? 
                     <div className="col">
                    <button className="btn btn-primary w-100">Sign up</button>
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
                    }} to={"../"}>
                      Login
                    </Link>
                   </div>
                </form>
            </div>
        </motion.div>
      </div>
    </motion.div>
    :
    <div className='acmenow'>
       <div className="input_promp">
        <div className="text-center h2">
            Activate your account
        </div>
        <div className="small text-gray" style={{
            color: 'gray',
            textAlign: 'center'
        }}>
        We've sent a code to your email {mailsmainme !== '' ? mailsmainme : ''}. Copy the code and paste here to verify your account.
        </div>
        <div className="ino_c">
            <input  onChange={e => { 
                        setsendcode(e.target.value)
                    }}  placeholder='Enter your code' type="text" name="" id="" />
        </div>
        <div className="bu d-flex">
            { 
              donev === false ? 
              <button
               onClick={e => { 
                if(sendcode.length === 6 && mailsmainme !== ''){ 
                    setdonev(true)
                    axios.post("https://apsbackend.vercel.app/verify", { 
                    email: CryptoJS.AES.encrypt(email === '' ? mailsmainme : email, "La:?balumo#ham$ed01234:#?").toString(),
                    v_code: CryptoJS.AES.encrypt(sendcode, "La:?balumo#ham$ed01234:#?").toString(),
                    v_txt: CryptoJS.AES.encrypt('verified', "La:?balumo#ham$ed01234:#?").toString(),
                    new_code: CryptoJS.AES.encrypt(uuid().split('-')[0].toString().substring(0, 6), "La:?balumo#ham$ed01234:#?").toString(),
                  }).then(async res => { 
                    if(res.data.success !== 'success'){ 
                      alert(res.data.success)
                      setdonev(false)
                    }
                    else { 
                       localStorage.removeItem('mails')
                       localStorage.removeItem('verify')
                      setdonev(false)
                      nav("../")
                    }
                  }).catch(er => { 
                   
                  })
                  }
                  else { 
                    alert("Invalid code...")
                  }
               }}
               className="btn btn-success w-100">Verify</button>
              :
              <button onClick={e => { 
                alert("Your request is being proccessed..")
              }} className="btn btn-success w-100">Processing...</button>
            }
            { 
              ver === false ? 
              <button onClick={e => { 
                if(mailsmainme !== ''){ 
                    setver(true)
                    axios.post("https://apsbackend.vercel.app/resend", { 
                      email: CryptoJS.AES.encrypt(email === '' ? mailsmainme : email, "La:?balumo#ham$ed01234:#?").toString(),
                      v_code: CryptoJS.AES.encrypt(uuid().split('-')[0].toString().substring(0, 6), "La:?balumo#ham$ed01234:#?").toString(),
                    }).then(rs => { 
                      if(rs.data.success = "success"){ 
                        alert("We've sent another code. check your email")
                        setver(false)
                      }
                      else { 
                        alert("Unable to resend")
                        setver(false)
                      }
                    }).catch(er => { 
                    })
                  }
                  else { 
                     localStorage.clear()
                  }
            }} className="btn btn-primary w-100">Resend</button>
            :
            <button onClick={e => { 
                alert("We're sending you another code. please wait..")
            }} className="btn btn-primary w-100"> Sending...</button>
            }
        </div>
       </div>
    </div>
      }
    </>
  )
}

export default Signup
