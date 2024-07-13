import React, { useContext, useState } from 'react';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import { login } from '../../imagepath';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'react-feather/dist';
import { FormProvider } from '../../HookForm';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { AuthContext } from '../../../contexts/AuthContext';
import useAuth from '../../../hooks/useAuth';
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from '@mui/material';

const Login = () => {
  const navigate = useNavigate();
  const { Login } = useAuth();
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  /*
  Role Based Authentication

  const [(activeStep, setActiveStep)] = useState(0);
  const createLoginSchema = [
    Yup.object().shape({
      role: Yup.string().required(),
    }),
    Yup.object().shape({
      email: Yup.email().required(),
    }),
  ];

  const currentLoginSchema = createLoginSchema[activeStep];
  */

  const LoginSchema = Yup.object().shape({
    username: Yup.string().required('Username is required'),
    password: Yup.string().required('Password is required'),
    role: Yup.string().required('Role is required'),
  });

  const methods = useForm({
    resolver: yupResolver(LoginSchema),
  });

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = methods;

  const handleLogin = async (data) => {
    await Login(data);
    data?.role === 'admin'
      ? navigate('/dashboard/admindashboard', { replace: true })
      : navigate('/dashboard/teacherdashboard', { replace: true });
  };

  return (
    <>
      <div className='main-wrapper login-body'>
        <div className='login-wrapper'>
          <div className='container'>
            <div className='loginbox'>
              <div className='login-left'>
                <img className='img-fluid' src={login} alt='Logo' />
              </div>
              <div className='login-right'>
                <div className='login-right-wrap'>
                  <h1>Welcome to Stratford College London</h1>
                  {/* <p className='account-subtitle'>
                    Need an account? <Link to='/register'>Sign Up</Link>
                  </p> */}
                  <h2>Sign in</h2>
                  {/* Form */}
                  <FormProvider
                    methods={methods}
                    onSubmit={handleSubmit(handleLogin)}
                  >
                    <div className='form-group'>
                      <label>
                        Username <span className='login-danger'>*</span>
                      </label>
                      <input
                        className='form-control'
                        type='text'
                        {...register('username')}
                      />
                      <span className='profile-views'>
                        <i className='fas fa-user-circle' />
                      </span>
                      {errors.username && (
                        <div className='text-danger'>
                          {errors.username.message}
                        </div>
                      )}
                    </div>
                    <div className='form-group'>
                      <label>
                        Password <span className='login-danger'>*</span>
                      </label>

                      <input
                        type={passwordVisible ? '' : 'password'}
                        className='form-control pass-input'
                        {...register('password')}
                      />
                      <span
                        className='toggle-password'
                        onClick={togglePasswordVisibility}
                      >
                        {passwordVisible ? (
                          <EyeOff className='react-feather-custom' size={16} />
                        ) : (
                          <Eye className='react-feather-custom' size={16} />
                        )}
                      </span>
                      {errors.password && (
                        <div className='text-danger'>
                          {errors.password.message}
                        </div>
                      )}
                    </div>
                    <div>
                      <FormControl component='fieldset' sx={{ mb: 1 }}>
                        <FormLabel component='legend' sx={{ fontSize: '14px' }}>
                          Role
                        </FormLabel>
                        <Controller
                          rules={{ required: true }}
                          control={control}
                          name='role'
                          render={({ field }) => (
                            <RadioGroup {...field} row>
                              <FormControlLabel
                                value='admin'
                                sx={{ fontSize: '12px' }}
                                control={<Radio />}
                                label='Admin'
                              />
                              <FormControlLabel
                                value='teacher'
                                sx={{ fontSize: '12px' }}
                                control={<Radio />}
                                label='Teacher'
                              />
                            </RadioGroup>
                          )}
                        />
                        {errors.role && (
                          <div className='text-danger'>
                            {errors.role.message}
                          </div>
                        )}
                      </FormControl>
                    </div>
                    <div className='forgotpass'>
                      <div className='remember-me'>
                        <label className='custom_check mr-2 mb-0 d-inline-flex remember-me'>
                          {' '}
                          Remember me
                          <input type='checkbox' name='radio' />
                          <span className='checkmark' />
                        </label>
                      </div>
                      <Link to='/forgotpassword'>Forgot Password?</Link>
                    </div>
                    <div className='form-group'>
                      <button
                        className='btn btn-primary btn-block'
                        type='submit'
                      >
                        Login
                      </button>
                    </div>
                  </FormProvider>
                  {/* /Form */}
                  <div className='login-or'>
                    <span className='or-line' />
                    <span className='span-or'>or</span>
                  </div>
                  {/* Social Login */}
                  <div className='social-login'>
                    <Link to='#'>
                      <i className='fab fa-google-plus-g' />
                    </Link>
                    <Link to='#'>
                      <i className='fab fa-facebook-f' />
                    </Link>
                    <Link to='#'>
                      <i className='fab fa-twitter' />
                    </Link>
                    <Link to='#'>
                      <i className='fab fa-linkedin-in' />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
