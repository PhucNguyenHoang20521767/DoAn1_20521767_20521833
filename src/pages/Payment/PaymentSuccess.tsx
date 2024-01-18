import { useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";

const PaymentSuccess = () => {
  const currentUser = useSelector((state: any) => state.auth.currentUser);

  if (!currentUser) {
    return <Navigate to="/signin" replace={true} state={{ from: "/" }} />;
  } else
    return (
      <div>
        <div className="h-full bg-gray-100">
          <div className="bg-white p-6  md:mx-auto">
            <svg
              viewBox="0 0 24 24"
              className="mx-auto my-6 h-16 w-16 text-green-600"
            >
              <path
                fill="currentColor"
                d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z"
              ></path>
            </svg>
            <div className="text-center">
              <h3 className="text-center text-base font-semibold text-gray-900 md:text-2xl">
                Thanh toán thành công!
              </h3>
              <p className="my-2 text-gray-600">
                Xin chúc mừng bạn đã thanh toán thành công!
              </p>
              <p> Chúc bạn một ngày vui vẻ! </p>
              <div className="py-10 text-center">
                <Link
                  to={"/"}
                  className="min-w-max rounded-sm border border-dark-1 bg-dark-1 px-9 py-2 text-base uppercase 
                text-white hover:bg-black focus:outline-none focus:ring-2 focus:ring-black focus:ring-opacity-50"
                >
                  Về trang chủ
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
};

export default PaymentSuccess;
