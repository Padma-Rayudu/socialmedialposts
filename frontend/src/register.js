import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import{Link } from 'react-router-dom'
import {useSelector,useDispatch} from 'react-redux'
import { addusers } from './features/users/userslice';
export default function Register () {
  var [details, setdetails] = React.useState([]);
  const dispatch=useDispatch()
  const users=useSelector(state=>state.userReducer.users[0])
  Yup.addMethod(Yup.string, 'checkusername', function (errmsg) {
    return this.test('test-user-check', errmsg, function (value) {
      const { path, createError } = this;
      var flag = 0;
      details.forEach((each) => {
        if (each.email == value) {
          flag = 1;
        }
      });
      return (
        (flag != 1 )|| createError({ path, message: errmsg })

      );
    });
  });

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password:'',
      
    },

    validationSchema: Yup.object({
      firstName: Yup.string()
        .min(2, '*too short')
        .max(15, '*Must be 15 characters or less')
        .required('*firstname Required'),
      lastName: Yup.string()
        .max(20, '*Must be 20 characters or less')
        .min(2, '*too short')
        .required('*lastname Required'),
      email: Yup.string()
        .email('*invalied email address')
        .required('*email Required')
        .checkusername('*user name already taken'),
       password:Yup.string()
       .min(2,'*too short')
       .max(8,"*must be 8 characters")
       .required('*password required')
    }),
    onSubmit: submitdata,
  });

  function submitdata(values) {
    console.log(details);
    setdetails([...details, values]);
    dispatch(addusers(values))
    window.location='/'
  }
  return (
    <div className="card m-5 p-5 mx-auto sh" style={{ width: '600px' }}>
        <h3>Registration</h3><br/>
      <form className="form" onSubmit={formik.handleSubmit}>
        <label className="form-label" htmlFor="firstName">
          First Name
        </label>
        <input
          className="form-control"
          id="firstName"
          type="text"
          {...formik.getFieldProps('firstName')}
        />
        <br />
        {formik.touched.firstName && formik.errors.firstName ? (
          <div style={{ color: 'red' }}>{formik.errors.firstName}</div>
        ) : null}

        <label className="form-label" htmlFor="lastName">
          Last Name
        </label>
        <input
          className="form-control"
          id="lastName"
          type="text"
          {...formik.getFieldProps('lastName')}
        />
        <br />
        {formik.touched.lastName && formik.errors.lastName ? (
          <div style={{ color: 'red' }}>{formik.errors.lastName}</div>
        ) : null}

        <label className="form-label" htmlFor="email">
          Email Address
        </label>
        <input
          className="form-control"
          id="email"
          type="email"
          {...formik.getFieldProps('email')}
        /><br/>
        {formik.touched.email && formik.errors.email ? (
          <div style={{ color: 'red' }}>{formik.errors.email}</div>
        ) : null}

       <label className="form-label" htmlFor="password">
          Password
        </label>
        <input
          className="form-control"
          id="password"
          type="text"
          {...formik.getFieldProps('password')}
        />
        <br />
        {formik.touched.password && formik.errors.password ? (
          <div style={{ color: 'red' }}>{formik.errors.password}</div>
        ) : null}

        <button className="btn btn-primary mt-3" type="submit">
          Submit
        </button><br/>
        <div className='d-flex'>
        Already have account?<Link to='/'>Login</Link>
        </div>
      </form>
    </div>
  );
}
