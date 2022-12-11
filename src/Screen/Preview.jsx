import React from 'react'

function Preview() {
  return (
   <div className="previews_m">
    <div className="pvvl">
        <div className="upload_part">
            <form action="" className='shadow'>
                <div className="col">
                  <div className="h4">  Post group information</div>
                </div>
               <div className="col">
                <label htmlFor="">Choose video or audio</label>
                 <input type="file" accept="audio/mpeg, video/mp4, audio/wav, audio/mp3" name="" id="" />
               </div>
               <div className="col">
                <label htmlFor="">Write something.</label>
               <textarea placeholder='Hi Admin, What would you like to say?' name="" id=""></textarea>
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
