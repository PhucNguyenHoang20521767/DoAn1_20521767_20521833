import React from 'react';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

//ui components

//className
export const nhButton = "w-full px-3 py-1 text-white bg-primary-1 border rounded-sm border-secondary-1 hover:bg-black focus:outline-none focus:ring-2 focus:ring-black focus:ring-opacity-50";

//mui alert
export const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
  ) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

//mui modal
export const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export const styleButtonAddCart = {
    backgroundColor: '#A67F78',
    '&:hover': {
      background: "#000000",
      borderColor: "#000000",
    },
    border: 1,
    borderRadius: 0,
    borderColor: '#A67F78',
    fontFamily: 'EB Garamond',
    fontSize: '0.8rem',
};

export const styleButtonView = {
  '&:hover': {
    borderColor: "#A67F78",
  },
  border: 1,
  borderRadius: 0,
  borderColor: '#A67F78',
  fontFamily: 'EB Garamond',
  fontSize: '0.8rem',
};
  