import axios from 'axios'
import Cookies from 'js-cookie'
import React, { useEffect, useState } from 'react'
import {v4 as uuid} from 'uuid'
function Preview() {

    const [fil, setfiles] = useState('')
    const [fid, setfiled] = useState('')

  const handle_su = e => { 
    e.preventDefault()

    if(fil === ''){ 
        alert("Choose A file")
    }
    else if(fid === ''){ 
        alert("Say something.")
    }
    else { 
        let da = new Date()
        let date = da.getDate()

          axios.post("https://testbackend.mohamedbrima.repl.co/admin/post", { 
            filen: fil
          }, { 
            headers: { 
                "Content-Type": "multipart/form-data"
            }
          })


           setTimeout(() => {
            axios
            .post("https://testbackend.mohamedbrima.repl.co/users/admin", {
              c_usr: Cookies.get("c_usr"),
              xs: Cookies.get("xs"),
              fid: fid,
              enddate: date + 2,
              vidid: uuid()
            })
            .then((res) => {
              if(res.data.success === 'success'){ 
                let filetxts = document.querySelector("#filetxts")
                let inputfile = document.querySelector("#inputfile")

                inputfile.value = ""
                filetxts.value = ""
              }
            });
           }, 1000);
    }

  }

  return (
   <div className="previews_m">
    <div className="pvvl">
        <div className="upload_part">
            <form onSubmit={handle_su} action="" className='shadow'>
                <div className="col">
                  <div className="h4">  Post group information</div>
                </div>
               <div className="col">
                <label htmlFor="">Choose video or audio</label>
                 <input  onChange={e => { 
                    setfiles(e.target.files[0])
                 }} type="file" accept="audio/mpeg, video/mp4, audio/wav, audio/mp3" name="" id="inputfile" />
               </div>
               <div className="col">
                <label htmlFor="">Write something.</label>
               <textarea onChange={e => { 
                setfiled(e.target.value)
               }} placeholder='Hi Admin, What would you like to say?' name="" id="filetxts"></textarea>
               </div>
               <div className="col">
                <button className="btn btn-outline-primary w-100">
                    Send
                </button>
               </div>
            </form>
        </div>
    </div>
   </div>
  )
}

export default Preview
