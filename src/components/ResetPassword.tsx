import React, { useState, useEffect } from "react";
import { changePassword } from "@/api/api_function";
// import { mainApi } from '@/api/main_api';
// import * as apiEndpoint from '@/api/api_endpoints';

import { RootState } from "@/redux/store/store";
import { useSelector, useDispatch } from "react-redux";
import { notify } from "@/redux/reducers/notify_reducers";

import { CircularProgress } from "@mui/material";
import { InputPassword } from "@/components/customs/nhPassword";

const ResetPassword = () => {
  const dispatch = useDispatch();
  const uid = useSelector((state: RootState) => state.auth.customerIdToken);
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword1, setShowPassword1] = useState(false);
  const [password1, setPassword1] = useState("");
  const [error1, setError1] = useState("");
  const [showPassword2, setShowPassword2] = useState(false);
  const [password2, setPassword2] = useState("");
  const [error2, setError2] = useState("");

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (loading) {
      document.body.style.cursor = "wait";
      const timer = setTimeout(() => {
        document.body.style.cursor = "default";
      }, 1000);

      return () => clearTimeout(timer);
    } else {
      document.body.style.cursor = "default";
    }
  }, [loading]);

  useEffect(() => {
    if (password1 !== password2) {
      setError2("Mật khẩu không khớp");
    } else if (password1 === password2) {
      setError2("");
    }
  }, [password1, password2]);

  useEffect(() => {
    if (password1.length < 8) {
      setError1("Mật khẩu phải có ít nhất 8 ký tự");
    } else {
      setError1("");
    }
  }, [password1]);

  const handleCancel = () => {
    setPassword("");
    setPassword1("");
    setPassword2("");
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    const res = await changePassword(uid, password, password2);
    if (res.data.success === true) {
      dispatch(
        notify({
          message: "Đổi mật khẩu thành công",
          isError: false,
          isSuccess: true,
          isInfo: false,
        })
      );
      setPassword("");
      setPassword1("");
      setPassword2("");
    } else {
      dispatch(
        notify({
          message: "Đổi mật khẩu thất bại",
          isError: true,
          isSuccess: false,
          isInfo: false,
        })
      );
    }
    setLoading(false);
  };

  return (
    <div className="mb-8 mt-10 flex justify-start border-l-2 pl-[5rem] lg:justify-center">
      <div className="w-[32rem] max-[512px]:w-full">
        <h1 className="mb-6 flex justify-center text-2xl font-bold text-gray-700">
          Đặt lại mật khẩu
        </h1>
        <InputPassword
          showPassword={showPassword}
          password={password}
          setPassword={setPassword}
          setShowPassword={setShowPassword}
          label="Mật khẩu cũ"
          error={error}
        />
        <InputPassword
          showPassword={showPassword1}
          password={password1}
          setPassword={setPassword1}
          setShowPassword={setShowPassword1}
          label="Mật khẩu mới"
          error={error1}
        />
        <InputPassword
          showPassword={showPassword2}
          password={password2}
          setPassword={setPassword2}
          setShowPassword={setShowPassword2}
          label="Nhập lại mật khẩu"
          error={error2}
        />
        <div className="mt-6 flex justify-end">
          <div className="mt-3 p-1">
            <button
              onClick={handleCancel}
              className="w-full rounded-sm border border-secondary-1 bg-dark-3 px-3 py-1 text-white hover:bg-black focus:outline-none focus:ring-2 focus:ring-black focus:ring-opacity-50"
            >
              HUỶ
            </button>
          </div>
          <div className="mt-3 p-1">
            <button
              type="submit"
              onClick={handleSubmit}
              className="w-full rounded-sm border border-secondary-1 bg-primary-1 px-3 py-1 text-white hover:bg-black focus:outline-none focus:ring-2 focus:ring-black focus:ring-opacity-50"
            >
              {loading && <CircularProgress size={20} className="mr-2" />}
              ĐỔI MẬT KHẨU
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
