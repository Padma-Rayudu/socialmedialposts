import {createSlice}  from '@reduxjs/toolkit';
export const usersSlice=createSlice({
  name:"users",
  initialState:{
    users:[]
  },
  reducers:{
    loadusers:(state,action)=>{
   
      state.users=[];
      state.users.push(action.payload)
      console.log("state users",state.users)
    }
  }
})

export function getusers()
{ console.log("getusers called")
  return(dispatch)=>{
    fetch(" https://paddu-socialblog-backend.herokuapp.com/data")
    .then((res)=>res.json())
    .then((data)=>{
      console.log("paddduuu",data)
       dispatch(loadusers(data))
    })
  }
}
export function addusers(obj)
{
    return(dispatch)=>{
        fetch(' https://paddu-socialblog-backend.herokuapp.com/register', {
                method: "POST",
                body: JSON.stringify(obj),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(()=>{ dispatch(getusers())})
          
       }
}

export const { loadusers}=usersSlice.actions
export default usersSlice.reducer