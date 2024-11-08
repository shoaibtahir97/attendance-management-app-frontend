import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import React, { useEffect, useState } from 'react';
import { logo } from '../components/imagepath';
// import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'react-feather/dist';

import { yupResolver } from '@hookform/resolvers/yup';
import { IconButton, InputAdornment, Stack, Typography } from '@mui/material';
import { Alert, Button } from 'antd';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { FormProvider, RHFTextField } from '../components/HookForm';
import { useAuthUserMutation } from '../redux/slices/apiSlices/usersApiSlice';
import { setCredentials } from '../redux/slices/authSlice';
import { PATH_AUTH, PATH_DASHBOARD } from '../routes/paths';

const LoginScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  //   const { search } = useLocation();
  const { userInfo } = useSelector((state) => state.auth);
  const [authUser, { isLoading, error }] = useAuthUserMutation();

  //   const searchParams = new URLSearchParams(search);
  //   const redirect = searchParams.get('redirect');
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const LoginSchema = Yup.object().shape({
    email: Yup.string().email().required('Email address is required'),
    password: Yup.string().required('Password is required'),
    afterSubmit: Yup.string(),
  });

  const methods = useForm({
    resolver: yupResolver(LoginSchema),
  });

  const {
    handleSubmit,
    setError,
    formState: { isSubmitting },
  } = methods;

  const handleLogin = async (data) => {
    await authUser(data)
      .unwrap()
      .then((res) => {
        // const { userInfo } = { };

        dispatch(setCredentials({ ...res?.data }));
        if (res.data.role === 'admin') {
          navigate(PATH_DASHBOARD.adminDashboard, { replace: true });
        } else if (res.data.role === 'teacher') {
          navigate(PATH_DASHBOARD.teacherDashboard, { replace: true });
        }
      })
      .catch((err) => {
        setError('afterSubmit', {
          type: 'validate',
          message: err?.data?.message || err?.error,
        });
      });
  };

  useEffect(() => {
    if (userInfo) {
      if (userInfo.role === 'admin') {
        navigate(PATH_DASHBOARD.adminDashboard, { replace: true });
      } else if (userInfo.role === 'teacher') {
        navigate(PATH_DASHBOARD.teacherDashboard, { replace: true });
      }
    }
  }, [userInfo, navigate]);

  return (
    <>
      <div className="main-wrapper login-body">
        <div className="login-wrapper">
          <div className="container">
            <div className="loginbox">
              <div
                style={{
                  alignItems: 'center',
                  marginTop: '2em',
                  padding: '1em',
                }}>
                <img className="img-fluid" src={logo} alt="Logo" />
              </div>
              <div className="login-right">
                <div className="login-right-wrap">
                  <h1>Welcome to Stratford College London</h1>
                  {/* <p className='account-subtitle'>
                    Need an account? <Link to='/register'>Sign Up</Link>
                </p> */}

                  {/* Form */}
                  <FormProvider
                    methods={methods}
                    onSubmit={handleSubmit(handleLogin)}>
                    <Stack
                      direction="column"
                      spacing={1}
                      sx={{
                        justifyContent: 'center',
                        alignItems: 'left',
                      }}>
                      <Typography variant="h5" fontWeight="bold">
                        Sign in
                      </Typography>
                      {error && (
                        <Alert
                          message="Error"
                          description={error?.data?.message}
                          type="error"
                          showIcon
                        />
                        // <Alert
                        //   severity="error"
                        //   sx={{
                        //     border: '1px solid #CE0D09',
                        //     color: '#CE0D09',
                        //     backgroundColor: '#ffefef',
                        //     mb: 3,
                        //   }}>
                        //   <AlertTitle>Error</AlertTitle>

                        //   {errors.afterSubmit.message}
                        // </Alert>
                      )}

                      <RHFTextField name="email" label="Email Address" />
                      <RHFTextField
                        name="password"
                        size="small"
                        label="Password"
                        type={passwordVisible ? 'text' : 'password'}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment
                              position="end"
                              sx={{
                                marginLeft: -5,
                              }}>
                              {passwordVisible ? (
                                <IconButton
                                  sx={{ zIndex: 1000 }}
                                  onClick={togglePasswordVisibility}>
                                  <Eye
                                    className="react-feather-custom"
                                    size={16}
                                  />
                                </IconButton>
                              ) : (
                                <IconButton
                                  sx={{ zIndex: 1000 }}
                                  onClick={togglePasswordVisibility}>
                                  <EyeOff
                                    className="react-feather-custom"
                                    size={16}
                                  />
                                </IconButton>
                              )}
                            </InputAdornment>
                          ),
                        }}
                      />

                      <Button
                        className="btn btn-primary btn-block"
                        type="primary"
                        htmlType="submit"
                        loading={isSubmitting}
                        size="large">
                        Login
                      </Button>
                    </Stack>
                  </FormProvider>
                  <Link to={PATH_AUTH.forgotPassword}>Forgot Password?</Link>
                  {/* /Form */}
                  {/* <div className="login-or">
                    <span className="or-line" />
                    <span className="span-or">or</span>
                  </div> */}
                  {/* Social Login */}
                  {/* <div className="social-login">
                    <Link to="#">
                      <i className="fab fa-google-plus-g" />
                    </Link>
                    <Link to="#">
                      <i className="fab fa-facebook-f" />
                    </Link>
                    <Link to="#">
                      <i className="fab fa-twitter" />
                    </Link>
                    <Link to="#">
                      <i className="fab fa-linkedin-in" />
                    </Link>
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginScreen;
