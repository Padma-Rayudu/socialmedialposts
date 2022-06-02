import {createSlice}  from '@reduxjs/toolkit';
import { date } from 'yup';
export const postsSlice=createSlice({
  name:"posts",
  initialState:{
    posts:[],
    key:'',
    backupdata:[]

  },
  reducers:{
    loadposts:(state,action)=>{
   
      state.posts=[];
      state.backupdata=[];
      state.posts.push(action.payload)
      state.backupdata.push(action.payload)
      console.log("state users",state.posts)
      //console.log("filter posts",state.filterposts)
    },
    searchposts:(state,action)=>{
       console.log("kruthika called.....")
       console.log("kruthiii",action.payload)
       if(action.payload.key==='')
      {   state.posts=[];
        state.posts.push(action.payload.data)
        console.log("search postss",state.posts[0])
      }
      else
      { 
     
      //  console.log("filterdata...",state.filterposts)   
       var filter_data=action.payload.data.filter((post)=>
       {return post.user.includes(action.payload.key)})
        state.posts=[];    
       state.posts.push(filter_data)
       console.log("search postss",state.posts)
       }
   
    }
  }
})

export function getposts()
{ console.log("getposts called")
  return(dispatch)=>{
    fetch(" https://paddu-socialblog-backend.herokuapp.com/postdata")
    .then((res)=>res.json())
    .then((data)=>{
      console.log("postdata",data)
       dispatch(loadposts(data))
    })
  }
}
export function addposts(obj)
{    var myuser=window.localStorage.getItem("user")
     console.log(obj)
     var date= new Date().toLocaleString()
    var ob={...obj,myuser:myuser,date:date}
        
 

    return(dispatch)=>{
        fetch('https://paddu-socialblog-backend.herokuapp.com/addposts', {
                method: "POST",
                body: JSON.stringify(ob),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(()=>{ dispatch(getposts())})
          
       }
}
export function deleteposts(index)
{
  return(dispatch)=>{
    fetch('https://paddu-socialblog-backend.herokuapp.com/postdelete/'+index,{
            method:"DELETE",})
            .then(()=>{console.log("delteme called")
              dispatch(getposts())})
              
            // console.log("kruthika good girl")
            // dispatch(getEmployees())
  }
}

export function updateposts(id,obj)
{
    console.log("update iiiiiii")
    return(dispatch)=>{
        fetch(' https://paddu-socialblog-backend.herokuapp.com/postupdate/'+id,{
            method:"PUT",
            body:JSON.stringify(obj),
            headers:{
                'Content-Type':'application/json'
            }
        }).then(()=>{
          dispatch(getposts())})

    }
}


export const { loadposts,searchposts}=postsSlice.actions
export default postsSlice.reducer