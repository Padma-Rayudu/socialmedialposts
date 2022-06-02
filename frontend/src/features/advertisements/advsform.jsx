import React from 'react';
import {addadvs} from './adSlice'
import {useSelector,useDispatch} from 'react-redux'
import{Link} from 'react-router-dom'
export default function Advs()
{
     var [details,setdetails]=React.useState({productname:'',productdisc:'',price:null})
     const dispatch=useDispatch()
     function submitpost(event)
     {    event.preventDefault();
           console.log("details",details)
            dispatch(addadvs(details))
           // alert("Successfully Posted")
          //  setdetails({...details,productname:'',productdisc:"",price:null})
           window.location="/home";
     }
    return(
        <div>
     <ul>
     <li><Link to="/home"><i class="bi bi-house-fill"></i>Home</Link></li>
     <li><Link to="/myposts">MyPosts</Link></li>
     <li style={{float:"right"}}><Link to='/logout' onClick={()=>{
     localStorage.removeItem('user')
  }} style={{color:"white"}}>	<i class="glyphicon glyphicon-log-out"></i>Logout</Link></li>
    <li  style={{float:"right"}}><a style={{color:"white"}}><i class="bi bi-person-circle"></i>&nbsp;{localStorage.getItem('user')}</a></li>

</ul>
        <div className="card m-5 p-5 mx-auto" style={{ width: '600px' }}>
            <h3>CreateAdvertisement</h3>
        
          <label className="form-label">Product name</label>
          <input
            className="form-control" value={details.productname}
            onChange={(e)=>{setdetails({...details,productname:e.target.value})}}
            placeholder="Enter tittle of the post" required
          ></input>
          <br />
          <label className="form-label">Content</label>
          <textarea
            className="form-control" 
            value={details.productdisc}
            onChange={(e)=>{setdetails({...details,productdisc:e.target.value})}}
            rows="5"
            cols="30" required
          ></textarea>
          <br />
          
          {/* <label className="form-label">Upload Image</label>
          <input
            className="form-control"
            type="file"
            name="postpic" 
            onChange={(e)=>{setdetails({...details,imgurl:URL.createObjectURL(e.target.files[0].name)})}}
            placeholder="Select a picture"
          ></input>
          <br /> */}

{/* 

          UploadImage: <input type="file" name="foodpic"  class="form-control"placeholder="select food pictre" accept="images/*" multiple/> */}

<label className="form-label">Product Price</label>
          <input
            className="form-control"
            value={details.price}
            onChange={(e)=>{setdetails({...details,price:e.target.value})}}
            placeholder="Enter tittle of the post" required
          ></input>
         <br/>

          <button className="btn btn-success" type='submit' onClick={submitpost}>
            AddAdvertisement
          </button>
        
          </div>
        </div>
    )
}