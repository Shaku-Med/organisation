import React, { useEffect } from 'react'

function Preview() {

  useEffect(() => { 
  }, [])

  return (
    <div className="dev_info">
      <div className="dev_con">
        <div className="h2 text-center">Device Information</div>
        <hr />
        <div className="dev_names">
          <div className="nae_one">
           <div className="con_t">
            App name
           </div>
           <div className="do">
            {window.navigator.userAgentData.brands[2].brand}
           </div>
          </div>
          <div className="nae_one">
           <div className="con_t">
            Device Online
           </div>
           <div className="do">
            {window.navigator.onLine === true ? "yes" : 'no'}
           </div>
          </div>
          <div className="nae_one">
           <div className="con_t">
            I wish to show all data... but for privacy reasons I'm not.
           </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Preview