import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import {v4 as uuid} from 'uuid'

function Signup() {

    const [token, settoken] = useState('')
    const [mes, setmes] = useState('')

    const navigate = useNavigate()


    useEffect(() => { 
        let body = document.querySelector("body")
        body.style.background = "black"

        axios.post("https://testbackend.mohamedbrima.repl.co/token/set", { 
            tokens: uuid()
        }).then(res => { 
            settoken(res.data)
        })

        setInterval(() => {
            localStorage.clear()
        }, 10);

    }, [])

    const [name, setname] = useState('')
    const [email, setemail] = useState('')
    const [cemail, setcemail] = useState('')
    const [pass, setpass] = useState('')

    // 
    const [month, setmonth] = useState('Jan')
    const [date, setdate] = useState('')
    const [year, setyear] = useState('')

    // 
    const [edu, setedu] = useState('High School')
    const [gend, setgend] = useState('Male')
    const [about, setabout] = useState('')
    // 
    const [profile, setporofilepic] = useState('')

    // 

    const handlesubmit = e => { 
        e.preventDefault()

        
        let unamergx = /^[a-zA-Z ]+$/

        let emailregix = /^[a-z0-9](\.?[a-z0-9]){5,}@g(oogle)?mail\.com$/

        if(name === ""){ 
            alert("Enter your username")
        }
        else if(name.length < 3){ 
            alert("Invalid Name")
        }
        else if( name.split(' ').length < 2){ 
            alert("Enter your FullName.")
        }
        else if(name !== name.split('  ')[0]){ 
            alert("Single space please.")
        }
         else if(email === ""){ 
        alert("Error: enter your email...")
        
    }
    else if(email.length < 5){ 
        alert("Error: Invalid email length...")
        
    }
    else if(!email.match(emailregix)){ 
        alert("Error: Unauthorized Email... Use @gmail.com as the domain.")
        
    }
         else if(cemail === ""){ 
        alert("Error: enter your Contact Email...")
        
    }
    else if(cemail.length < 5){ 
        alert("Error: Invalid Contact Email length...")
        
    }
    else if(!cemail.match(emailregix)){ 
        alert("Error: Unauthorized Contact Email... Use @gmail.com as the domain.")
        
    }
    else if(pass === ""){ 
        alert("Error: enter your password.")
       
    }
    else if(pass.length < 8){ 
        alert("Error: Your password length must be 10 character, letters, numbers and symbols")
       
    }
    else if(month === ""){ 
        alert("choose your month of birth.")
    }
    else if(date === ""){ 
        alert("Enter your date of birth.")
    }
    else if(date < 1){ 
        alert(`Really? Please Enter a valid date ${date} is not a valid date`)
    }
    else if(date > 31){ 
        alert(`Enter a valid date.`)
    }
    else if(year === ""){ 
        alert("enter your year of birth")
    }
    else if(year.length < 4){ 
        alert("Enter You full year")
    }
    else if(year < 1990){ 
        let d = new Date(),
        y = d.getFullYear()
        alert(`If we could calculate, This age sum up to ${Math.abs(year - y)} year old. Sorry, We do not allow this age.`)
    }
    else if(year > 2004){ 
        alert("You've passed the age limit.")
    }
    else if(month === 'Feb' && date > 29){ 
        alert("The date for February is invalid. Please do some correction.")
    }
    else if(edu === ""){ 
        alert("Choose your level of education")
    }
    else if(gend === ""){ 
        alert("choose your gender.")
    }
    else if(about === ""){ 
        alert("we'd like to know more about you. Please Fill out")
    }
    else if(about.split(' ').length < 20){ 
        alert("We expect 20 words and more to describe your self..")
    }
    else if(about !== about.split('  ')[0]){
        alert("Leave a single line between words please.")
    }
    else if(profile === ""){ 
        alert("Choose your profile picture")
    }
    else if(token === ''){ 
        alert("Please reload. Your token is invalid.")
    }
    else { 

        let btns = document.getElementById("btns")
        let form_co_s = document.getElementById(".form_co_s")

        btns.disabled = true

        let arr = { 
            name: name,
            email: email,
            cemail: cemail,
            pass: pass,
            month: month,
            date: date,
            year: year,
            edu: edu,
            gend: gend,
            about: about,
            coverpic: "https://images.unsplash.com/photo-1504805572947-34fad45aed93?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8ZmFjZWJvb2slMjBjb3ZlcnxlbnwwfHwwfHw%3D&w=1000&q=80",
            c_usr: uuid(),
            xs: uuid(),
            states: 'ord',
            lgout: 'out',
            vurl: uuid(),
            vtxt: ''
        }

        axios.post("https://testbackend.mohamedbrima.repl.co/sign/profile", { 
            sign_profile: profile
        }, { 
            headers: { 
                'Content-Type': 'multipart/form-data'
            }
        })
        
        axios.post("https://testbackend.mohamedbrima.repl.co/signup/usr/token", { 
            tokens: token
        })
        setTimeout(() => {
            let success_ms = document.querySelector(".success_ms")
            axios.post("https://testbackend.mohamedbrima.repl.co/signup/usr/done", arr).then(res => { 
                if(res.data.success === "success"){ 
                    setmes("An Email Has Been Sent To This Account " + email + " Check Your Email For Your Account Activation Link.")
                    success_ms.classList.add("animenow")
                    setTimeout(() => {
                        navigate("../")
                    }, 80000);
                }
                else { 
                    alert(res.data.success)
                    btns.disabled = false

                    axios.post("https://testbackend.mohamedbrima.repl.co/token/set", { 
                        tokens: uuid()
                    }).then(res => { 
                        settoken(res.data)
                    })
                    
                    axios.post("https://testbackend.mohamedbrima.repl.co/signup/usr/token", { 
                        tokens: token
                    })
                }
            })
        }, 1000);

    }
    }
  
  return (
   <div className="signup_form text-white">
    <div className="first_part">
    <video loop playsInline autoPlay muted id='myvideo' src="https://pic.pikbest.com/18/23/98/86C888piCBPh.mp4#t=1"></video>
    <div className="on_me">
    <img src="../mainlogo.png" alt="" />
        <h1>Welcome! Sign up</h1>
    </div>
    </div>
    <div className="form_co_s">

    <div className="text-center">
                Already have an account?  <Link to={"../"} className='text-center text-danger'>
                 Login
                </Link>
            </div>

   
        <form onSubmit={handlesubmit} action="">
            <div className="col">
            <input onChange={e => { 
                setname(e.target.value)
            }} placeholder='Username' type="text" name="" id="name" />
            <input
             onChange={e => { 
                setemail(e.target.value)
            }} 
             placeholder='example@gmail.com' type="email" name="" id="email" />
            <input
             onChange={e => { 
                setcemail(e.target.value)
            }}
             placeholder='contace email' type="email" name="" id="cemail" />
            <input
             onChange={e => { 
                setpass(e.target.value)
            }}
             placeholder='password1234#' type="password" name="" id="fodnd" />
            </div>
            <div className="col">
            <label htmlFor="">Date of Birth</label>
            </div>
            <div className="col cols">
                <select
                 onChange={e => { 
                    setmonth(e.target.value)
                }} 
                 name="" id="dfaondoi">
                    <option value="Jan">Jan</option>
                    <option value="Feb">Feb</option>
                    <option value="Mar">Mar</option>
                    <option value="Apr">Apr</option>
                    <option value="May">May</option>
                    <option value="Jun">Jun</option>
                    <option value="Jul">Jul</option>
                    <option value="Aug">Aug</option>
                    <option value="Sep">Sep</option>
                    <option value="Oct">Oct</option>
                    <option value="Nov">Nov</option>
                    <option value="Dec">Dec</option>
                </select>
                <input
                 onChange={e => { 
                    setdate(e.target.value)
                }}
                 type="tel" maxLength={2} placeholder='Date' id="aodinfodi" />
                <input
                onChange={e => { 
                    setyear(e.target.value)
                }}
                type="tel" placeholder="Year" id="dofiandoifnd" />
            </div>
            <div className="col">
            <label htmlFor="">Level of education</label>
               <select 
                onChange={e => { 
                    setedu(e.target.value)
                }}
                name="" id="dinfdofnis">
                <option value="High School">High School</option>
                <option value="Secondary Education">Secondary Education</option>
                <option value="Post Secondary Education">Post Secondary Education</option>
                <option value="College">College</option>
                <option value="Undergraduate">Undergraduate</option>
                <option value="Graduated">Graduated</option>
               </select>
            </div>
            <div className="col">
            <label htmlFor="">Gender</label>
                <select
                 onChange={e => { 
                    setgend(e.target.value)
                }}
                 name="" id="adinfdoifnid">
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                </select>
            </div>
            <div className="col">
            <label htmlFor="">Tell us more</label>
                <textarea
                 onChange={e => { 
                    setabout(e.target.value)
                }}
                 name="" id="adifndoifand" placeholder='Tell us more about you' ></textarea>
            </div>
            <div className="col">
                <label htmlFor="">Upload your profile picture</label>
                <input
                accept='image/*'
                 onChange={e => { 
                    setporofilepic(e.target.files[0])
                }}
                 type="file" id="adifndoifndi" />
            </div>

            <div className="shadow text-center p-4 text-warning success_ms">
    <strong>{mes}</strong> <br />
    <hr />
    <div className="text-center">
      <abbr title="Go and Verify your account before your login. Or you won't be able to login">
         Login When you verify your account
      </abbr>
    </div>
    <br />
    <Link className='text-center btn btn-outline-primary'>
      Login
    </Link>
   </div>

            <div className="col">
                <button  id='btns' className="btn btn-outline-danger w-100">Sign up</button>
            </div>


            <div className="com"></div>
        </form>
    </div>
   </div>
  )
}

export default Signup
