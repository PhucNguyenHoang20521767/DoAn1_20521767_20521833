import Box from "@mui/material/Box";
import Snackbar from "@mui/material/Snackbar";
import { Alert, AlertColor, Fade, Slide, SlideProps } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { notify, clear } from "@/redux/reducers/notify_reducers";

function TransitionUp(props: SlideProps) {
  return <Slide {...props} direction="up" />;
}

const SuccessNotify = () => {
  //   const [open, setOpen] = React.useState(false)
  const dispatch = useDispatch();
  const open = useSelector((state: any) => state.notify.isSuccess);
  const message = useSelector((state: any) => state.notify.message);

  const handleClose = () => {
    dispatch(clear());
  };

  // const handleOpen = () => {
  //   dispatch(success())
  // }

  return (
    <>
      <Box sx={{ width: 500 }}>
        {/* <Button onClick={handleOpen}>Slide Transition</Button> */}
        <Snackbar
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          TransitionComponent={TransitionUp}
          autoHideDuration={6000}
          open={open}
          onClose={handleClose}
        >
          <Alert severity="success">{message}</Alert>
        </Snackbar>
      </Box>
    </>
  );
};

export default SuccessNotify;
