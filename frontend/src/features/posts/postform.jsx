import React from 'react';
import {addposts} from './postsSlice'
import {useSelector,useDispatch} from 'react-redux'
import{Link} from 'react-router-dom'
export default function Post()
{
     var [details,setdetails]=React.useState({title:'',postdisc:'',likes:0,dislikes:0,Comments:[],imgurl:''})
     var [myimg,setmyimg]=React.useState({})
     const dispatch=useDispatch()
     function submitpost(event)
     {    event.preventDefault();
      
           const formData = new FormData()
           formData.append('file', myimg);
           formData.append('upload_preset', 'docs_upload_example_us_preset');
           
            fetch('https://api.cloudinary.com/v1_1/demo/image/upload', {
            method: 'POST',
            body: formData,
             })
            .then((response) => response.json())
             .then((data) => {
               console.log("myrfsdfgsdfg",data)
                   dispatch(addposts({...details,imgurl:data.url}))
              
             });
     }
   const hadleimage=(e)=>{

    setmyimg(e.target.files[0])

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
            <h3>CreatePost</h3>
            <form onSubmit={submitpost}  encType="multipart/form-data">
          <label className="form-label">Tittle</label>
          <input
            className="form-control" value={details.title}
            onChange={(e)=>{setdetails({...details,title:e.target.value})}}
            placeholder="Enter tittle of the post" required
          ></input>
          <br />
          <label className="form-label">Content</label>
          <textarea
            className="form-control" 
            value={details.postdisc}
            onChange={(e)=>{setdetails({...details,postdisc:e.target.value})}}
            rows="5"
            cols="30" required
          ></textarea>
          <br />
          
          <label className="form-label">Upload Image</label>
          <input
            className="form-control"
            type="file"
            name="postpic" 
            onChange={hadleimage}
            placeholder="Select a picture"
          ></input>
          <br />
          <button className="btn btn-success" type='submit' >
            AddPost
          </button>
          </form>
          </div>
        
        </div>
    )
}