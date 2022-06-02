import './App.css';
import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {Link,useNavigate} from 'react-router-dom'
import {useSelector,useDispatch} from 'react-redux'
import {getusers} from './features/users/userslice'


function App() {
  var [details, setdetails] = React.useState([]);
  var flag=0;
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const users=useSelector(state=>state.userReducer.users[0])
  console.log("users",users)
  const formik = useFormik({
    initialValues: {
      Name: '',
      password:'',
      
    },

    validationSchema: Yup.object({
      Name: Yup.string()
        .required('*firstname Required'),
       password:Yup.string()
       .required('*password required')
    }),
    onSubmit: submitdata,
  });

  function submitdata(values) {
  
      users.map((user)=>{
        console.log("hiii")
        if(user.firstname===values.Name&&user.password==values.password)
        {
          flag=1;
        }
      })
      if(flag===1)
      { window.localStorage.setItem("user",values.Name)
        navigate('/home')
      }
      else{
        alert("login failed")
      }
  }

  React.useEffect(()=>{
    console.log("useeffetct called")
    dispatch(getusers())     
 },[])



  return (

    <div >
     <div className='m-5 card p-5  mx-auto sh' style={{ width: '600px' }}>
       <h3>LOGIN</h3><br/>
     <form className="form" onSubmit={formik.handleSubmit}>
            <input class="form-control" id="Name" type='text'  placeholder='User Name' 
               {...formik.getFieldProps('Name')}
                ></input>
                 <br />
        {formik.touched.Name && formik.errors.Name ? (
          <div style={{ color: 'red' }}>{formik.errors.Name}</div>
        ) : null}
          <br/>
            <input class="form-control" type='text' id="password" {...formik.getFieldProps('password')} placeholder='Password'></input>
            <br />
        {formik.touched.password && formik.errors.password ? (
          <div style={{ color: 'red' }}>{formik.errors.password}</div>
        ) : null}
       <br/>
            <button type='submit' class="btn btn-primary"onClick={()=>{}}>Login</button>
           <div className='d-flex'> Don't have Account? <Link to={'/register'}>Register here!!</Link></div>
           </form>
        </div>
      
    </div>
  
  );
}

export default App;
