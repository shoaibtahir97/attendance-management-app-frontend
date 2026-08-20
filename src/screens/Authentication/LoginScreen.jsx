import { yupResolver } from '@hookform/resolvers/yup';

import {
  Box,
  Checkbox,
  FormControlLabel,
  IconButton,
  InputAdornment,
  Link as MuiLink,
  Typography,
} from '@mui/material';
import { Alert, Button } from 'antd';
import React, { useEffect, useState } from 'react';
import { Eye, EyeOff } from 'react-feather/dist';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { FormProvider, RHFTextField } from '../../components/HookForm';
import { logo } from '../../components/imagepath';
import loginLeftImage from '../../assets/img/login-left1.png';
import { useAuthUserMutation } from '../../redux/slices/apiSlices/usersApiSlice';
import { setCredentials } from '../../redux/slices/authSlice';
import { PATH_AUTH, PATH_DASHBOARD } from '../../routes/paths';
import './LoginScreen.css';

const LoginScreen = () => {

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.auth);

  const [authUser, { isLoading, error }] = useAuthUserMutation();

  const [passwordVisible, setPasswordVisible] = useState(false);

  const [rememberMe, setRememberMe] = useState(false);


  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };


  const LoginSchema = Yup.object().shape({

    email: Yup.string()
      .email('Please enter a valid email address')
      .required('Email address is required'),

    password: Yup.string()
      .required('Password is required'),

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

        dispatch(
          setCredentials({
            ...res?.data,
          })
        );


        if (res?.data?.role === 'admin') {

          navigate(
            PATH_DASHBOARD.adminDashboard,
            { replace: true }
          );

        } else if (res?.data?.role === 'teacher') {

          navigate(
            PATH_DASHBOARD.teacherDashboard,
            { replace: true }
          );

        }

      })

      .catch((err) => {

        setError('afterSubmit', {

          type: 'validate',

          message:
            err?.data?.message ||
            err?.error ||
            'Login failed',

        });

      });

  };


  useEffect(() => {

    if (userInfo) {

      if (userInfo?.role === 'admin') {

        navigate(
          PATH_DASHBOARD.adminDashboard,
          { replace: true }
        );

      } else if (userInfo?.role === 'teacher') {

        navigate(
          PATH_DASHBOARD.teacherDashboard,
          { replace: true }
        );

      }

    }

  }, [userInfo, navigate]);


  return (

    <Box className="stratford-login-page">


      {/* ================= LEFT SIDE ================= */}

      <Box className="stratford-left-panel">

        <Box className="stratford-image-card">

          <img
            src={loginLeftImage}
            alt="Stratford College London"
            className="stratford-login-image"
          />

        </Box>

      </Box>



      {/* ================= RIGHT SIDE ================= */}

      <Box className="stratford-right-panel">

        <Box className="stratford-login-content">


          {/* TITLE */}

          <Typography className="stratford-welcome-title">

            Welcome Back

          </Typography>


          <Typography className="stratford-welcome-subtitle">

            Hey, welcome back to your special place

          </Typography>



          {/* ================= FORM ================= */}

          <FormProvider
            methods={methods}
            onSubmit={handleSubmit(handleLogin)}
          >


            {/* ERROR */}

            {error && (

              <Alert
                message="Login Error"
                description={
                  error?.data?.message ||
                  error?.error ||
                  'Unable to login'
                }
                type="error"
                showIcon
                className="stratford-error"
              />

            )}



            {/* EMAIL */}

            <Box className="stratford-field">

              <RHFTextField
                name="email"
                placeholder="Email Address"
                fullWidth
              />

            </Box>



            {/* PASSWORD */}

            <Box className="stratford-field">

              <RHFTextField
                name="password"
                placeholder="Password"
                type={
                  passwordVisible
                    ? 'text'
                    : 'password'
                }
                fullWidth

                InputProps={{

                  endAdornment: (

                    <InputAdornment position="end">

                      <IconButton
                        onClick={togglePasswordVisibility}
                        edge="end"
                      >

                        {passwordVisible ? (

                          <EyeOff size={20} />

                        ) : (

                          <Eye size={20} />

                        )}

                      </IconButton>

                    </InputAdornment>

                  ),

                }}

              />

            </Box>



            {/* REMEMBER ME */}

            <Box className="stratford-options">

              <FormControlLabel

                control={
                  <Checkbox
                    checked={rememberMe}
                    onChange={(e) =>
                      setRememberMe(e.target.checked)
                    }
                  />
                }

                label="Remember me"

              />

            </Box>



            {/* FORGOT PASSWORD */}

            <Box className="stratford-forgot">

              <Link
                to={PATH_AUTH.forgotPassword}
                className="stratford-forgot-link"
              >

                Forgot Password?

              </Link>

            </Box>



            {/* SIGN IN */}

            <Button

              className="stratford-signin-button"

              htmlType="submit"

              loading={
                isSubmitting || isLoading
              }

              size="large"

              block

            >

              Sign In

            </Button>


          </FormProvider>



          {/* SIGN UP */}

          <Typography className="stratford-signup-text">

            Don't have an account?{" "}

            <MuiLink
              component={Link}
              to="/register"
              underline="none"
              className="stratford-signup-link"
            >

              Sign Up

            </MuiLink>

          </Typography>


        </Box>

      </Box>


    </Box>

  );

};


export default LoginScreen;