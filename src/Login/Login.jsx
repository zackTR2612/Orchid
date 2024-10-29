import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import GoogleButton from 'react-google-button';
import { UserAuth } from '../Context/AuthContext';
import { useNavigate } from 'react-router-dom'; 
import './Login.css';

const Login = () => {
  const { googleSignIn, user, signIn } = UserAuth(); 
  const navigate = useNavigate(); 

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Invalid email address')
        .required('Required'),
      password: Yup.string()
        .min(6, 'Password must be at least 6 characters')
        .required('Required'),
    }),
    onSubmit: async (values) => {
      try {
        await signIn(values.email, values.password); 
        navigate('/'); 
      } catch (error) {
        console.error('Login failed:', error);
        
      }
    },
  });

  useEffect(() => {
    if (user != null) {
      navigate('/'); 
    }
  }, [user, navigate]);

  return (
    <div className="container-fluid">
      <div className="custom-container shadow p-3 bg-body-teritiary rounded">
        <h1 className="form-name">Login</h1>
        <form onSubmit={formik.handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.email && formik.errors.email ? (
              <div className="text-danger">{formik.errors.email}</div>
            ) : null}
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control form-control-lg"
              placeholder="Password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.password && formik.errors.password ? (
              <div className="text-danger">{formik.errors.password}</div>
            ) : null}
          </div>
          <div className="button">
            <button type="submit" className="btn btn-primary">
              Sign in
            </button>
          </div>
        </form>
        <div className="gg-button mt-3 ">
          <GoogleButton onClick={googleSignIn} /> 
        </div>
      </div>
    </div>
  );
};

export default Login;