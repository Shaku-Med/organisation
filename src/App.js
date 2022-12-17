import { useEffect, useState } from 'react';
import './App.css';
import { Connection } from './Connection';
import {HashRouter} from 'react-router-dom'
import Leftnav from './Navs/Leftnav';
import Topnav from './Navs/Topnav';
import Routing from './Routing';
import Cookie from 'js-cookie'
import Auth from './Auth/Auth';
import helmet from 'helmet'
import Cos from './Screen/Cos';



function App() {

  const [navtool, setnavtool] = useState('')


  const [statuss, setstates] = useState('')


  const [friends, setfriends] = useState([]);

  const [rand, setrand] = useState('')

  const [maint, setmaint] = useState([])


  const [exptime, setexptime] = useState([])


  useEffect(() => { 

    const timer = Math.floor(Math.random() * 10000) - 10

     setTimeout(() => {
      if(window.top !== window.self){ 
        setstates({ 
          login: false,
          frame: true,
        })
      }
      else { 
        if(Cookie.get("c_usr") && Cookie.get("xs") && localStorage.getItem("c_usr")){ 
          if(Cookie.get("c_usr") !== null && Cookie.get("xs") !== null && localStorage.getItem("c_usr") !== null){ 
            if(Cookie.get('c_usr') === localStorage.getItem("c_usr")){ 
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
        }
        else { 
          setstates({ 
            login: true,
            frame: false,
          })
        }
      }
     }, timer);

    }, []);

  return (
    <>
      { 
        statuss === '' ?
        <div className="payload">
          <div className="spinner">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        </div>
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
                <HashRouter key={key}>
                  <Auth/>
                </HashRouter>
              )
            }
            else { 
             return ( 
              <Connection.Provider key={key} value={{navtool, setnavtool, friends, setfriends, rand, setrand, maint, setmaint, exptime, setexptime}}>
                <HashRouter>
                  <Cos/>
                  <Topnav/>
                  <Leftnav/>
                  <Routing/>
                </HashRouter>
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
