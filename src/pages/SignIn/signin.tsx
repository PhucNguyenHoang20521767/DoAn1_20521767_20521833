import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  BrowserRouter,
  Link,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import { Box, Button, LinearProgress, Modal, Typography } from "@mui/material";
import { MuiOtpInput } from "mui-one-time-password-input";
import Input from "@/components/customs/nhTextField";
import Login from "@/components/signinLogin";
import Signup from "@/components/signinSignup";
import { createCart, getCustomerCart } from "@/api/api_function";
import { mainApi } from "@/api/main_api";
import * as apiEndpoints from "@/api/api_endpoints";
import { login } from "@/redux/reducers/auth_reducers";
import { notify } from "@/redux/reducers/notify_reducers";
import { RootState } from "@/redux/store/store";
import { matchIsNumeric } from "@/utils/function";
import { style, nhButton } from "@/utils/ui";
import { useMediaQuery } from "react-responsive";

const SignIn = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentUser = useSelector((state: RootState) => state.auth.currentUser);
  const [isLogin, setIsLogin] = useState(false);
  const [isSignUp, setIsSignUp] = useState(true);
  const [showOTPInput, setShowOTPInput] = useState(false);
  const [open, setOpen] = useState(false);
  const [otp, setOTP] = useState("");
  const [idToken, setIdToken] = useState("");
  const [done, setDone] = useState(false);
  const [loginEmail, setLoginEmail] = useState("");
  const [forgotEmail, setForgotEmail] = useState("");
  const [isforgotPassword, setIsForgotPassword] = useState(false);
  const [otpFP, setOtpFP] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isChangePassword, setIsChangePassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [fpLoading, setFpLoading] = useState(false);

  const handleLogin = () => {
    setIsLogin(true);
    setIsSignUp(false);
    // dispatch(
    //     notify({
    //       message: 'Đăng nhập thành công',
    //       isError: false,
    //       isSuccess: true,
    //       isInfo: false,
    //     })
    //   );
  };

  const handleSignUp = () => {
    setIsLogin(false);
    setIsSignUp(true);
  };

  const validateChar = (value: string, index: number): boolean => {
    return matchIsNumeric(value);
  };

  const handleChange = (newValue: string) => {
    setOTP(newValue);
  };

  const handleChangeFP = (newValue: string) => {
    setOtpFP(newValue);
  };

  const handleComplete = async (finalValue: string) => {
    const theOtp = finalValue;
    try {
      console.log("n1", idToken, theOtp);
      const result = await mainApi.post(
        apiEndpoints.GET_OTP,
        apiEndpoints.getOTPBody(idToken, theOtp)
      );
      console.log("n2", result);

      setDone(true);
      dispatch(
        notify({
          isSuccess: true,
          isError: false,
          isInfo: false,
          message: "Xác nhận thành công!",
        })
      );

      handleDone(result.data.token, result.data.data._id, idToken);
    } catch (error: any) {
      dispatch(
        notify({
          isSuccess: false,
          isError: true,
          isInfo: false,
          message: "OTP sai!",
        })
      );
    }
    setOpen(false);
  };

  const handleCompleteFP = async (finalValue: string) => {
    const theOtp = finalValue;
    try {
      console.log("fp1", idToken, theOtp, newPassword);
      const result = await mainApi.post(
        apiEndpoints.RESET_PASSWORD,
        apiEndpoints.getResetPasswordBody(idToken, theOtp, newPassword)
      );
      console.log("fp2", result);
      dispatch(
        notify({
          isSuccess: true,
          isError: false,
          isInfo: false,
          message: "Đổi mật khẩu thành công. Hãy đăng nhập lại!",
        })
      );
      setIsForgotPassword(false);
      setNewPassword("");
      setOpen(false);
      setIsChangePassword(false);
    } catch (error: any) {
      dispatch(
        notify({
          isSuccess: false,
          isError: true,
          isInfo: false,
          message: "OTP sai!",
        })
      );
    }
  };

  const handleDone = async (
    currentUser: string,
    id: string,
    customerIdToken: string
  ) => {
    try {
      const userLogin = {
        currentUser: currentUser,
        id: id,
        customerIdToken: customerIdToken,
        isLogin: true,
        loginType: "email",
        avatar: "",
      };
      dispatch(login(userLogin));
      handleOpen();
      const cart = await createCart(currentUser);
      navigate("/");
      // localStorage.setItem("currentUser", token);
    } catch (error) {
      console.log(error);
    }
  };

  const handleResendOTP = async () => {
    try {
      const result = await mainApi.post(
        apiEndpoints.VERIFY_OTP,
        apiEndpoints.sendOTPCustomer(loginEmail)
      );
      dispatch(
        notify({
          isSuccess: false,
          isError: false,
          isInfo: true,
          message: "Đã gửi lại mã OTP!",
        })
      );
    } catch (error: any) {
      console.log(error);
    }
  };

  const handleSendOTP = async (e: React.MouseEvent<HTMLButtonElement>) => {
    setFpLoading(true);
    console.log("1", forgotEmail);
    try {
      const result = await mainApi.post(
        apiEndpoints.FORGOT_PASSWORD,
        apiEndpoints.getForgotPasswordBody(forgotEmail)
      );
      console.log("2", result);
      setIdToken(result.data.customerIdToken);
      dispatch(
        notify({
          isSuccess: false,
          isError: false,
          isInfo: true,
          message: "Hãy nhập mật khẩu mới!",
        })
      );
      handleCloseForgotPassword(e);
      handleOpenCP(e);
      setFpLoading(false);
    } catch (error: any) {
      dispatch(
        notify({
          isSuccess: false,
          isError: true,
          isInfo: false,
          message: "Email không tồn tại!",
        })
      );
      console.log(error);
      setFpLoading(false);
    }
  };

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = (
    event: React.SyntheticEvent | MouseEvent,
    reason?: string
  ) => {
    if (reason && reason === "backdropClick") {
      return;
    }
    setOpen(false);
  };
  const handleForgotPassword = () => {
    setIsForgotPassword(true);
    setForgotEmail(loginEmail);
  };
  const handleCloseForgotPassword = (
    event: React.SyntheticEvent | MouseEvent,
    reason?: string
  ) => {
    if (reason && reason === "backdropClick") {
      return;
    }
    setIsForgotPassword(false);
  };
  const handleOpenCP = (
    event: React.SyntheticEvent | MouseEvent,
    reason?: string
  ) => {
    if (reason && reason === "backdropClick") {
      return;
    }
    setIsChangePassword(true);
  };
  const handleCloseCP = (
    event: React.SyntheticEvent | MouseEvent,
    reason?: string
  ) => {
    if (reason && reason === "backdropClick") {
      return;
    }
    setIsChangePassword(false);
    navigate("/");
  };

  return (
    <div className="flex flex-col justify-center py-5 lg:flex-row">
      <div className="mb-6">
        <div className="flex flex-col">
          <div
            className={`p-3 text-2xl font-medium lg:text-primary-1 ${
              isLogin ? "text-dark-1" : "text-primary-1"
            }`}
            onClick={() => handleLogin()}
          >
            Đăng nhập
          </div>
          <div
            className={`p-3 text-2xl font-medium lg:hidden ${
              isLogin ? "text-primary-1" : "text-dark-1"
            }`}
            onClick={() => handleSignUp()}
          >
            Đăng ký
          </div>
          <div className={`lg:block ${isLogin ? "block" : "hidden"}`}>
            <Login
              idToken={idToken}
              setIdToken={setIdToken}
              handleOpen={handleOpen}
              setLoginEmail={setLoginEmail}
              loginEmail={loginEmail}
              handleForgotPassword={handleForgotPassword}
            />
          </div>
        </div>
      </div>
      <div className="mb-6 lg:pl-28">
        <div className="flex flex-col">
          <div
            className="hidden p-3 text-2xl font-medium text-primary-1 lg:block"
            onClick={() => handleSignUp()}
          >
            Đăng ký
          </div>
          <div className={`lg:block ${isLogin ? "hidden" : "block"}`}>
            <Signup
              idToken={idToken}
              setIdToken={setIdToken}
              handleOpen={handleOpen}
              setLoginEmail={setLoginEmail}
              loginEmail={loginEmail}
            />
          </div>
        </div>
      </div>
      {/* <Button onClick={handleOpen}>Open modal</Button> */}

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            className="text-center"
            sx={{ fontFamily: "EB Garamond", mb: 2 }}
          >
            Nhập OTP được gửi đến email của bạn
          </Typography>
          {newPassword ? (
            <MuiOtpInput
              value={otpFP}
              onChange={handleChangeFP}
              onComplete={handleCompleteFP}
              length={6}
              validateChar={validateChar}
            />
          ) : (
            <MuiOtpInput
              value={otp}
              onChange={handleChange}
              onComplete={handleComplete}
              length={6}
              validateChar={validateChar}
            />
          )}
          <Typography
            id="modal-modal-description"
            sx={{ mt: 2, fontFamily: "EB Garamond" }}
          >
            Không nhận được OTP?
            <Button
              sx={{ fontFamily: "EB Garamond" }}
              onClick={handleResendOTP}
            >
              Gửi lại
            </Button>
          </Typography>
        </Box>
      </Modal>

      <Modal
        open={isforgotPassword}
        onClose={handleCloseForgotPassword}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            className="text-center"
            sx={{ fontFamily: "EB Garamond", mb: 2 }}
          >
            Quên mật khẩu
          </Typography>
          <Input
            label="Nhập Email bạn đã đăng ký"
            value={forgotEmail}
            onChange={(e) => setForgotEmail(e.target.value)}
          />
          <div className="mt-3 p-1">
            <button
              type="submit"
              className={nhButton}
              onClick={(e) => {
                handleSendOTP(e);
              }}
            >
              GỬI
            </button>
          </div>
          <Button
            variant="text"
            sx={{ fontFamily: "EB Garamond" }}
            onClick={handleCloseForgotPassword}
          >
            THOÁT
          </Button>

          {fpLoading && <LinearProgress />}
        </Box>
      </Modal>

      <Modal
        open={isChangePassword}
        onClose={handleCloseCP}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            className="text-center"
            sx={{ fontFamily: "EB Garamond", mb: 2 }}
          >
            Quên mật khẩu
          </Typography>
          <div className="relative mb-1 p-1">
            <label
              htmlFor="password"
              className="block font-semibold text-gray-700"
            >
              Mật khẩu mới:
            </label>
            <div className="flex items-center">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full appearance-none rounded-sm border border-secondary-1 px-3 py-1 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
                autoComplete="current-password"
              />
              <button
                type="button"
                className="absolute right-0 rounded-md px-3 py-2 focus:outline-none"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="h-5 w-5 text-secondary-0"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="h-5 w-5 text-secondary-0"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>

          <div className="mt-3 p-1">
            <button
              type="submit"
              className={nhButton}
              onClick={() => {
                handleOpen();
              }}
            >
              GỬI
            </button>
          </div>

          {fpLoading && <LinearProgress />}
        </Box>
      </Modal>
    </div>
  );
};

export default SignIn;
