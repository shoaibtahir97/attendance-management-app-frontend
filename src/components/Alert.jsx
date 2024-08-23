import React from 'react';

const Alert = (props) => {
  const { message, type, description } = props;
  return (
    <Alert message={message} type={type} description={description ?? ''} />
  );
};

export default Alert;
