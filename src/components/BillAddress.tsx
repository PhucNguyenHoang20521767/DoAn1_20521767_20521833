import React from "react";
import {
  getAllOrder,
  getOrderItemByOrder,
  getAddressById,
  getProductById,
} from "@/api/api_function";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store/store";

interface Props {
  addressId: string;
}

const BillAddress = ({ addressId }: any) => {
  const currentUser = useSelector((state: RootState) => state.auth.currentUser);
  const [address, setAddress] = React.useState<any | null>(null);

  React.useEffect(() => {
    getAddressById(addressId, currentUser).then((res) => {
      const addressRes = res.data.data;
      setAddress(addressRes);
    });
  }, [addressId]);

  return (
    <>
      {address && (
        <div key={address._id} className="mt-3 w-full border-2 pb-2">
          <div className="flex justify-between">
            <div className="flex flex-col">
              <div className="flex flex-row">
                <div className="p-2 text-primary-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="h-6 w-6"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <p className="py-2 font-bold">
                  {address.receiverFirstName} {address.receiverLastName}
                </p>
              </div>
              <div className="flex flex-row">
                <div className="p-2 text-primary-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="h-6 w-6"
                  >
                    <path
                      fillRule="evenodd"
                      d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <p className="py-2">{address.receiverPhone}</p>
              </div>
              <div className="flex flex-row">
                <div className="p-2 text-primary-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="h-6 w-6"
                  >
                    <path
                      fillRule="evenodd"
                      d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <p className="py-2 text-gray-500">
                  {address.receiverAddress}, {address.receiverWard},{" "}
                  {address.receiverDistrict}, {address.receiverCity}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BillAddress;
