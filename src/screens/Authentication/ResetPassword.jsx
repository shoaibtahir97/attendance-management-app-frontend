import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from 'antd';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useSearchParams } from 'react-router-dom';
import * as Yup from 'yup';
import { FormProvider, RHFTextField } from '../../components/HookForm';
import { logo } from '../../components/imagepath';
import useNotification from '../../hooks/useNotification';
import { useResetPasswordMutation } from '../../redux/slices/apiSlices/usersApiSlice';
import { PATH_AUTH } from '../../routes/paths';

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [resetPassword] = useResetPasswordMutation();
  const { openNotification } = useNotification();

  const resetPasswordSchema = Yup.object().shape({
    email: Yup.string().required('Email is required'),
    password: Yup.string()
      .required()
      .matches(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
        'Password must contain at least 8 characters, and contain an upper case letter, lower case letter, number, and symbol'
      ),
    confirmPassword: Yup.string().oneOf(
      [Yup.ref('password'), null],
      'Passwords must match'
    ),
    resetToken: Yup.string().required(),
  });

  const methods = useForm({
    defaultValues: {
      email: searchParams.get('email'),
      password: '',
      confirmPassword: '',
      resetToken: searchParams.get('resetToken'),
    },
    resolver: yupResolver(resetPasswordSchema),
  });

  const {
    handleSubmit,
    getValues,
    formState: { errors, isSubmitting },
  } = methods;

  console.log('values', getValues(), 'errors', errors);

  const handleResetPassword = async (data) => {
    const { confirmPassword, ...resetPasswordData } = data;

    await resetPassword({ ...resetPasswordData })
      .unwrap()
      .then((res) => {
        openNotification('success', res?.message);
        navigate(PATH_AUTH.login);
      })
      .catch((err) => {
        openNotification('error', err?.data?.message ?? err?.error);
      });
  };

  return (
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

                <FormProvider
                  methods={methods}
                  onSubmit={handleSubmit(handleResetPassword)}>
                  <RHFTextField
                    name="email"
                    label="Email"
                    disabled
                    type="email"
                  />
                  <RHFTextField name="password" label="Password" />
                  <RHFTextField
                    name="confirmPassword"
                    label="Confirm Password"
                  />

                  <Button
                    htmlType="submit"
                    type="primary"
                    loading={isSubmitting}
                    size="large"
                    style={{ marginTop: '10px', width: '100%' }}>
                    Reset my password
                  </Button>
                </FormProvider>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
