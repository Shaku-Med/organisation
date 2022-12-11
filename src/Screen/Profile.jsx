import React from 'react'

function Profile() {
  return (
   <div className="profie_ai">
    <div className="top_img_main">
        <div className="proi_names">
            <label htmlFor="backg">
            <i className="fa fa-camera"></i>
            </label>
            <input type="file" accept='image/*' className='d-none' name="" id="backg" />
            <input type="file" accept='image/*' name="" id="img_part" className="d-none" />
            <label htmlFor="img_part">
            <img src="https://wallpapers.com/images/hd/cool-neon-blue-profile-picture-u9y9ydo971k9mdcf.jpg" alt="" />
            </label>
            <div className="h1">
              <div className="name_main">
                Mohamed Brima Amara
              </div>
              <div className="buttons">
                <button className="btn btn-outline-primary">Message</button>
              </div>
            </div>
        </div>
    </div>
    <div className="details">
        <div className="name_part">
            <div className="col">
                <h4>Name</h4>
                <input type="text" name="" id="" />
                <button className="btn btn-primary">Edit</button>
            </div>
            <div className="col">
                <h4>Email</h4>
                <input type="text" name="" id="" />
                <button className="btn btn-primary">Edit</button>
            </div>
            <div className="col">
                <h4>Date of Birth</h4>
                <input disabled type="text" name="" id="" />
            </div>
            <div className="col">
                <h4>Age</h4>
                <input type="text" disabled name="" id="" />
            </div>
            <div className="col">
                <h4>Education</h4>
                <input type="text" name="" id="" />
                <button className="btn btn-primary">Edit</button>
            </div>
            <div className="col">
                <h4>Sex</h4>
                <input type="text" disabled name="" id="" />
            </div>
            <div className="col">
                <h4>About You</h4>
                 <textarea name="" id=""></textarea>
                <button className="btn btn-primary">Edit</button>
            </div>
        </div>
        <div className="h1" style={{height: '20vh'}}></div>
    </div>
   </div>
  )
}

export default Profile
