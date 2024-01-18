import Box from "@mui/material/Box";
import Snackbar from "@mui/material/Snackbar";
import { Alert, Slide, SlideProps } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { clear } from "@/redux/reducers/notify_reducers";

function TransitionUp(props: SlideProps) {
  return <Slide {...props} direction="up" />;
}

const InformationNotify = () => {
  const dispatch = useDispatch();
  const open = useSelector((state: any) => state.notify.isInfo);
  const message = useSelector((state: any) => state.notify.message);

  const handleClose = () => {
    dispatch(clear());
  };

  return (
    <>
      <Box sx={{ width: 500 }}>
        <Snackbar
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          TransitionComponent={TransitionUp}
          autoHideDuration={6000}
          open={open}
          onClose={handleClose}
        >
          <Alert severity="info">{message}</Alert>
        </Snackbar>
      </Box>
    </>
  );
};

export default InformationNotify;
