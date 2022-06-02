import {createSlice}  from '@reduxjs/toolkit';
export const advsSlice=createSlice({
  name:"advs",
  initialState:{
    advs:[]
  },
  reducers:{
    loadadvs:(state,action)=>{
   
      state.advs=[];
      state.advs.push(action.payload)
      console.log("state users",state.advs)
    }
  }
})

export function getadvs()
{ console.log("getadvs called")
  return(dispatch)=>{
    fetch(" https://paddu-socialblog-backend.herokuapp.com/advsdata")
    .then((res)=>res.json())
    .then((data)=>{
      console.log("advsdata",data)
       dispatch(loadadvs(data))
    })
  }
}
export function addadvs(obj)
{   
    return(dispatch)=>{
        fetch(' https://paddu-socialblog-backend.herokuapp.com/addadvs', {
                method: "POST",
                body: JSON.stringify(obj),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(()=>{ dispatch(getadvs())})
          
       }
}
export const { loadadvs}=advsSlice.actions
export default advsSlice.reducer