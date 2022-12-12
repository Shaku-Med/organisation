import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import {v4 as uuid} from 'uuid'
function Verify() {

    const [tsl, sett] = useState('')

    let {id} = useParams()

    useEffect(() => { 

        axios.post("https://orgbackend.vercel.app/token/set", { 
            tokens: uuid()
        }).then(res => { 
            axios.post("https://orgbackend.vercel.app/signup/usr/token", { 
                tokens: res.data
            })
    
            setTimeout(() => {
                axios.post("https://orgbackend.vercel.app/verify/url", { 
                    authid: res.data,
                    vurl: uuid(),
                    vtxt: 'verified',
                    mainurl: id
                }).then(res => { 
                    sett(res.data)
                })
            }, 1000);
        })

     
    }, [id])

  return (
   <>
   
     { 
      tsl == ''
      ? 

      <div className='main_alt'>
      <div className="account_v_msg shadow rounded">
        <i className="spinner-border spin text-warning"></i>
        <div className="text-center mt-3">
          Loading Result..
        </div>
      </div>
    </div>
        
       :
      [tsl].map((val, key) => { 
        if(val.success === 'success'){ 
           return ( 
               <div key={key} className='main_alt'>
               <div className="account_v_msg shadow rounded">
                 <i className="fa fa-check text-success"></i>
                 <div className="text-center">
                     Your account has been activated. 
                     <br />
                     <Link to={"../"} className='text-center text-primary'>
                        Login
                     </Link>
                 </div>
               </div>
             </div>
           )
        }
        else { 
           return ( 
               <div key={key} className='main_alt p-4'>
           <div className="account_v_msg shadow rounded">
             <i className="fa fa-times text-danger"></i>
             <div className="text-center">
                {val.success}
                 <br />
                 <Link to={"../"} className='text-center text-danger'>
                    Try with another account.
                 </Link>
             </div>
           </div>
         </div>
           )
        }
      }
      )
     }
   </>
  )
}

export default Verify
