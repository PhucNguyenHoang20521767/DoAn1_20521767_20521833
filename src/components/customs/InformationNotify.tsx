import * as React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Snackbar, { SnackbarOrigin } from '@mui/material/Snackbar';
import { Alert, AlertColor, Fade, Slide, SlideProps } from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import { useDispatch, useSelector } from 'react-redux';
import { notify, clear } from '@/redux/reducers/notify_reducers';

function TransitionUp(props: SlideProps) {
  return <Slide {...props} direction="up" />;
}

const InformationNotify = () => {
//   const [open, setOpen] = React.useState(false)
const dispatch = useDispatch()
const open = useSelector((state: any) => state.notify.isInfo)
const message = useSelector((state: any) => state.notify.message)

  const handleClose = () => {
    dispatch(clear())
  };

  // const handleOpen = () => {
  //   dispatch(success())
  // }

  return (
    <>
        <Box sx={{ width: 500 }}>
        {/* <Button onClick={handleOpen}>Slide Transition</Button> */}
            <Snackbar
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                TransitionComponent={TransitionUp}
                autoHideDuration={6000}
                open={open}
                onClose={handleClose}
            >
              <Alert severity="info">{message}</Alert>
            </Snackbar>
        </Box>
    </>
  )
}

export default InformationNotify