import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from 'antd';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import useNotification from '../../../hooks/useNotification';
import { useResetPasswordRequestMutation } from '../../../redux/slices/apiSlices/usersApiSlice';
import { FormProvider, RHFTextField } from '../../HookForm';
import { logo } from '../../imagepath';

const ForgotPassword = () => {
  const { openNotification } = useNotification();
  const resetPasswordSchema = Yup.object().shape({
    email: Yup.string().email().required('Email is required'),
  });

  const [resetPasswordRequest] = useResetPasswordRequestMutation();

  const methods = useForm({
    defaultValues: {
      email: '',
    },
    resolver: yupResolver(resetPasswordSchema),
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const handleResetPasswordRequest = async (data) => {
    await resetPasswordRequest(data)
      .unwrap()
      .then((res) => {
        openNotification('success', res?.message);
      })
      .catch((err) => {
        openNotification('error', err?.data?.message || err?.error);
      });
  };

  return (
    <>
      {/* Main Wrapper */}
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
                  <h1>Reset Password</h1>
                  {/* <p className="account-subtitle">Let Us Help You</p> */}
                  {/* Form */}
                  <FormProvider
                    methods={methods}
                    onSubmit={handleSubmit(handleResetPasswordRequest)}>
                    <RHFTextField
                      name="email"
                      type="email"
                      placeholder="Email"
                    />
                    <Button
                      htmlType="submit"
                      type="primary"
                      loading={isSubmitting}
                      size="large"
                      style={{ marginTop: '10px', width: '100%' }}>
                      Reset My Password
                    </Button>

                    {/* <div className="form-group">
                      <button
                        className="btn btn-primary btn-block"
                        type="submit">
                        Reset My Password
                      </button>
                    </div> */}
                  </FormProvider>

                  {/* /Form */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
