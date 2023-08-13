import { useEffect, useState } from 'react';
import './App.css';
import { Connection } from './Connection';
import {BrowserRouter, HashRouter} from 'react-router-dom'
import Topnav from './Navs/Topnav';
import Routing from './Routing';
import Cookie from 'js-cookie'
import Auth from './Auth/Auth';
import * as helmet from 'helmet'



function App() {

  const [navtool, setnavtool] = useState('')


  const [statuss, setstates] = useState('')

  const [auth, setauth] = useState(0)


  // 


  const [owner, setowner] = useState([])
  const [allusr, setallusr] = useState([])

  const [resetstate, setresetstate] = useState(0)
// 
  useEffect(() => { 

    const timer = Math.floor(Math.random() * 8000) - 10


    if(Cookie.get("c_usr") && Cookie.get("xs")){ 
          if(Cookie.get("c_usr") !== null && Cookie.get("xs") !== null){ 
            setstates({ 
              login: false,
              frame: false,
            })
          }
          else { 
            setstates({ 
              login: true,
              frame: false,
            })
          }
        }
        else { 
          setstates({ 
            login: true,
            frame: false,
          })
        }
    
    }, [auth]);

    

  return (
    <>
      { 
        statuss === '' ?
        <div style={{
          backgroundImage: `url(${'https://media0.giphy.com/media/OK5LK5zLFfdm/giphy.gif?cid=ecf05e47cytw6uzgc99k7vdjg9zud5rskw3266kmad9jtcld&rid=giphy.gif&ct=g'})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          flexDirection: 'column',
          gap: 20
        }} className="payload">
         <img style={{
          width: 80
         }} src="https://orgainze.vercel.app/mainlogo.png" alt="" />
          <h3>Loading...</h3>
        </div>
        :
        [statuss].map((val, key) => { 
          if(val.frame === true){ 
            return ( 
              <div key={key} className='main_alt p-5'>
              <div className="account_v_msg shadow">
                <i className="fa fa-times text-danger"></i>
                <div className="text-center">
                   Iframing is not allowed on this website. Your Device informations are...
                   <br />
                   {window.navigator.userAgent}
                </div>
              </div>
            </div>
            )
          }
          else { 
            if(val.login === true){ 
              return ( 
                <Connection.Provider value={{auth, setauth}}>
                  <BrowserRouter key={key}>
                  <Auth/>
                </BrowserRouter>
                </Connection.Provider>
              )
            }
            else { 
             return ( 
              <Connection.Provider key={key} value={{auth, setauth, owner, setowner, resetstate, setresetstate, allusr, setallusr}}>
                <BrowserRouter>
                  <Topnav/>
                  <Routing/>
                </BrowserRouter>
            </Connection.Provider>
             )
            }
          }
        })
      }
    </>
  );
}

export default App;
