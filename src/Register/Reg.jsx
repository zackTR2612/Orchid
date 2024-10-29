import React, { useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import GoogleButton from 'react-google-button'; 
import { UserAuth } from '../Context/AuthContext'; 
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { createUserWithEmailAndPassword } from 'firebase/auth'; // Import hàm tạo người dùng
import { auth } from '../Firebase/firebase'; // Import auth từ firebase
import './Reg.css';

const Reg = () => {
  const { googleSignIn, user } = UserAuth(); 
  const navigate = useNavigate(); // Khởi tạo navigate

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email format').required('Required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Required'),
    reEnterPassword: Yup.string()
      .oneOf([Yup.ref('password')], 'Passwords must match')
      .required('Required'),
  });

  useEffect(() => {
    if (user != null) {
      navigate('/'); // Điều hướng về trang chính nếu đã đăng ký
    }
  }, [user, navigate]);

  return (
    <div className="container-fluid">
      <div className="custom-container-1 custom-container shadow p-3 bg-body-teritiary rounded">
        <h1 className="form-name">Register</h1>
        <Formik
          initialValues={{
            email: '',
            password: '',
            reEnterPassword: '',
          }}
          validationSchema={validationSchema}
          onSubmit={async (values, { setSubmitting }) => {
            try {
              await createUserWithEmailAndPassword(auth, values.email, values.password);
              // Optionally, you can navigate or show a success message here
              navigate('/'); // Điều hướng về trang chính sau khi đăng ký thành công
            } catch (error) {
              console.error('Error during registration:', error); // Xử lý lỗi nếu có
            } finally {
              setSubmitting(false); // Đặt trạng thái submitting về false
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="form-group">
                <Field
                  type="email"
                  name="email"
                  className="form-control form-control-lg"
                  placeholder="Email"
                />
                <ErrorMessage name="email" component="div" className="text-danger" />
              </div>

              <div className="form-group">
                <Field
                  type="password"
                  name="password"
                  className="form-control form-control-lg"
                  placeholder="Password"
                />
                <ErrorMessage name="password" component="div" className="text-danger" />
              </div>

              <div className="form-group">
                <Field
                  type="password"
                  name="reEnterPassword"
                  className="form-control form-control-lg"
                  placeholder="Re-enter Password"
                />
                <ErrorMessage name="reEnterPassword" component="div" className="text-danger" />
              </div>

              <div className="button-1">
                <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                  Register
                </button>
              </div>
            </Form>
          )}
        </Formik>
        <div className="gg-button mt-3">
          <GoogleButton onClick={googleSignIn} /> 
        </div>
      </div>
    </div>
  );
};

export default Reg;