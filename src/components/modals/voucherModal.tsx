import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { style } from "@/utils/ui";
import { createAddress } from "@/api/api_function";
import { SubmitHandler, useForm } from "react-hook-form";
import { RootState } from "@/redux/store/store";
import { useSelector, useDispatch } from "react-redux";
import { notify } from "@/redux/reducers/notify_reducers";
import { VoucherInter } from "@/pages/Order/cartOrder";

interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleReload: () => void;
  vouchers: VoucherInter[];
  currentVoucher: VoucherInter | null;
  setCurrentVoucher: React.Dispatch<React.SetStateAction<VoucherInter | null>>;
}

interface IAddressInput {
  firstname: string;
  lastname: string;
  phone: string;
  address: string;
  ward: string;
  district: string;
  city: string;
  isDefault: boolean;
}

function VoucherModal({
  open,
  setOpen,
  handleReload,
  vouchers,
  currentVoucher,
  setCurrentVoucher,
}: Props) {
  //   const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [loading, setLoading] = React.useState(false);
  const currentUser = useSelector((state: RootState) => state.auth.currentUser);
  const _id = useSelector((state: RootState) => state.auth.id);
  const [tempVoucher, setTempVoucher] = React.useState<VoucherInter | null>(
    null
  );

  function handleChooseVoucher(voucher: VoucherInter): void {
    setTempVoucher(voucher);
  }

  function handleSubmit(): void {
    setCurrentVoucher(tempVoucher);
    setOpen(false);
  }

  return (
    <div>
      {/* <Button onClick={handleOpen}>Open modal</Button> */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Chọn voucher
          </Typography>
          <div className="my-8 grid h-[20rem] grid-cols-1 gap-4 overflow-y-scroll">
            {vouchers.map((voucher) => (
              <div
                className={`rounded-lg border-2 p-4 hover:cursor-pointer ${
                  tempVoucher?._id === voucher._id
                    ? "border-black bg-gray-700 text-white"
                    : "border-gray-700"
                }`}
                onClick={() => handleChooseVoucher(voucher)}
              >
                <p>
                  {voucher.voucherType === "PERCENT" ? (
                    <>
                      <span className="font-bold">
                        Giảm: {voucher.voucherValue} %{" "}
                      </span>
                      <span className="italic">
                        (Tối đa: {voucher.maxDiscountPrice.toLocaleString()})
                      </span>
                    </>
                  ) : (
                    <p className="font-bold">
                      Giảm: {voucher.voucherValue.toLocaleString()} đ
                    </p>
                  )}
                </p>
                <p>Đơn tối thiểu: {voucher.minOrderPrice} </p>
                <p>
                  Hạn dùng: {new Date(voucher.voucherEndDate).getDate()}-
                  {new Date(voucher.voucherEndDate).getMonth() + 1}-
                  {new Date(voucher.voucherEndDate).getFullYear()}
                </p>
              </div>
            ))}
          </div>
          <div className="my-4 flex justify-between gap-4">
            <button
              className={`w-full rounded-sm border border-gray-700 bg-white px-3 py-1 uppercase text-gray-700
                  hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-black focus:ring-opacity-50
                  `}
              onClick={() => setOpen(false)}
            >
              Thoát
            </button>
            <button
              type="submit"
              className={`w-full rounded-sm border border-secondary-1 bg-secondary-1 px-3 py-1 uppercase text-white
                  hover:bg-black focus:outline-none focus:ring-2 focus:ring-black focus:ring-opacity-50
                  `}
              onClick={handleSubmit}
            >
              Xong
            </button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}

export default VoucherModal;
