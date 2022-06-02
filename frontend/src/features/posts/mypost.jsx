import React from 'react';
import {useSelector,useDispatch} from 'react-redux'
import { getposts ,deleteposts,updateposts} from "./postsSlice";
import {Link} from 'react-router-dom'


export default function MyPosts()
{
    const dispatch=useDispatch()
    const posts=useSelector(state=>state.postsReducer.posts[0])
    console.log("posts",posts)
    var confirmAction;
    React.useEffect(()=>{
        dispatch(getposts())
    },[])

   var myuser=window.localStorage.getItem('user')
   function dele(id)
   {
      confirmAction = window.confirm("Are you sure to execute this action?");
      if (confirmAction) {
      dispatch(deleteposts(id))
     
    }
   }

   return(
       <div>
           <ul>
  <li><Link to='/home'><i class="bi bi-house-fill"></i>Home</Link></li>
  <li> <Link to='/addpost'>CreatePost</Link></li>
  <li><Link to="/myposts">MyPosts</Link></li>
  <li style={{float:"right"}}><Link to='/logout' onClick={()=>{
     localStorage.removeItem('user')
       }} style={{color:"white"}}>	<i class="glyphicon glyphicon-log-out"></i>Logout</Link></li>
  <li style={{float:"right"}}><a style={{color:"white"}}><i class="bi bi-person-circle"></i>&nbsp;{localStorage.getItem('user')}</a></li>
 </ul>

    { posts.map((post)=>{
        if(myuser===post.user){
        return(
            
      <div className="card mt-5 p-4 show" style={{width:"800px"}}>
       <div className='d-flex  justify-content-between'>
          <h2 style={{ marginRight: '300px' }}>{post.tittle}</h2>{' '}
        
          <button
            className="btn btn-danger " 
            style={{borderRadius:"50%"}}
            onClick={() => {
             dele(post._id)
            }}
          >
            X
          </button>
        </div>
    <br />
    <p>{post.postdisc}</p>
    <img src={post.postpic} style={{width:"100%",height:"200px"}}></img>
   <div className='d-flex'>
   <i
      className="bi bi-hand-thumbs-up-fill ucolor"
   
    ></i>
    <span style={{ marginRight: '30px' }}>{post.likes}</span>

    <i
      className="bi bi-hand-thumbs-down-fill dcolor"

    ></i>
    <span>{post.dislikes}</span>
       </div>
    <br />
    <div>
       <h5>comments</h5>
          {post.Comments.map((c, inn) => {
            return <div>{c}</div>;
          })}
    </div>
  </div>
  )}
  })
}
</div>
   )
}