import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { style } from '@/utils/ui';
import {
    createAddress
} from '@/api/api_function';
import { SubmitHandler, useForm } from 'react-hook-form';
import { RootState } from '@/redux/store/store';
import { useSelector, useDispatch } from 'react-redux';

interface Props {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
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

function AddressModal({ open, setOpen }: Props) {
//   const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [loading, setLoading] = React.useState(false);
  const currentUser = useSelector((state: RootState) => state.auth.currentUser);
  const _id = useSelector((state: RootState) => state.auth.id);

  const { register, formState: { errors }, setError, handleSubmit } = useForm<IAddressInput>();

  const onSubmit: SubmitHandler<IAddressInput> = async (data) => {
    setLoading(true);
    console.log('_id', _id, 'currentUser', currentUser);
    console.log('data', data);
    const res = await createAddress(_id, currentUser, data.firstname, data.lastname, data.phone, data.address, data.ward, data.district, data.city, data.isDefault);
    if (res.data.data) {
        setOpen(false);
    }
    setLoading(false);
  };

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
            Thêm địa chỉ
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-1 p-1 pl-2">
                <label htmlFor="text" className="font-semibold text-base text-dark-1">Họ:</label>
                <input type='text' {...register("firstname", { required: true, maxLength: 20 })}
                name="firstname"
                className="w-full px-3 py-1 placeholder-gray-400 border border-secondary-1 rounded-sm shadow-sm appearance-none focus:outline-none focus:ring-1 focus:ring-black focus:border-black" required />
                {errors.firstname && <span className="text-red-500">This field is required</span>}
            </div>
            <div className="mb-1 p-1 pl-2">
                <label htmlFor="lastname" className="font-semibold text-base text-dark-1">Tên:</label>
                <input type='text' {...register("lastname", { required: true, maxLength: 20 })}
                    name="lastname"
                    className="w-full px-3 py-1 placeholder-gray-400 border border-secondary-1 rounded-sm shadow-sm appearance-none focus:outline-none focus:ring-1 focus:ring-black focus:border-black" required />
                {errors.lastname && <span className="text-red-500">This field is required</span>}
            </div>
            {/* <input {...register("phone", { required: true })} />
            {errors.phone && <span>This field is required</span>} */}
            <div className="mb-1 p-1 pl-2">
                <label htmlFor="phone" className="font-semibold text-base text-dark-1">Số điện thoại:</label>
                <input type='number' {...register("phone", { required: true, maxLength: 20 })}
                    name="phone"
                    className="w-full px-3 py-1 placeholder-gray-400 border border-secondary-1 rounded-sm shadow-sm appearance-none focus:outline-none focus:ring-1 focus:ring-black focus:border-black" required />
                {errors.phone && <span className="text-red-500">This field is required</span>}
            </div>
            {/* <input {...register("address", { required: true })} />
            {errors.address && <span>This field is required</span>} */}
            <div className="mb-1 p-1 pl-2">
                <label htmlFor="address" className="font-semibold text-base text-dark-1">Địa chỉ:</label>
                <input type='text' {...register("address", { required: true, maxLength: 20 })}
                    name="address"
                    className="w-full px-3 py-1 placeholder-gray-400 border border-secondary-1 rounded-sm shadow-sm appearance-none focus:outline-none focus:ring-1 focus:ring-black focus:border-black" required />
                {errors.address && <span className="text-red-500">This field is required</span>}
            </div>
            {/* <input {...register("ward", { required: true })} />
            {errors.ward && <span>This field is required</span>} */}
            <div className="mb-1 p-1 pl-2">
                <label htmlFor="ward" className="font-semibold text-base text-dark-1">Phường:</label>
                <input type='text' {...register("ward", { required: true, maxLength: 20 })}
                    name="ward"
                    className="w-full px-3 py-1 placeholder-gray-400 border border-secondary-1 rounded-sm shadow-sm appearance-none focus:outline-none focus:ring-1 focus:ring-black focus:border-black" required />
                {errors.ward && <span className="text-red-500">This field is required</span>}
            </div>
            {/* <input {...register("district", { required: true })} />
            {errors.district && <span>This field is required</span>} */}
            <div className="mb-1 p-1 pl-2">
                <label htmlFor="district" className="font-semibold text-base text-dark-1">Huyện:</label>
                <input type='text' {...register("district", { required: true, maxLength: 20 })}
                    name="district"
                    className="w-full px-3 py-1 placeholder-gray-400 border border-secondary-1 rounded-sm shadow-sm appearance-none focus:outline-none focus:ring-1 focus:ring-black focus:border-black" required />
                {errors.district && <span className="text-red-500">This field is required</span>}
            </div>
            {/* <input {...register("city", { required: true })} />
            {errors.city && <span>This field is required</span>} */}
            <div className="mb-1 p-1 pl-2">
                <label htmlFor="city" className="font-semibold text-base text-dark-1">Thành phố:</label>
                <input type='text' {...register("city", { required: true, maxLength: 20 })}
                    name="city"
                    className="w-full px-3 py-1 placeholder-gray-400 border border-secondary-1 rounded-sm shadow-sm appearance-none focus:outline-none focus:ring-1 focus:ring-black focus:border-black" required />
                {errors.city && <span className="text-red-500">This field is required</span>}
            </div>
            <div className="flex items-center mb-3 p-1 pl-2">
                <input type="checkbox" {...register("isDefault")} id="isDefault" className="w-4 h-4 text-primary-1 border-gray-300 rounded-sm focus:ring-primary-1" />
                <label htmlFor="isDefault" className="ml-2 block text-sm font-medium text-dark-1">Đặt làm địa chỉ mặc định</label>
            </div>
            <button type="submit"
                className={`w-full uppercase px-3 py-1 text-white bg-secondary-1 border rounded-sm border-secondary-1
                hover:bg-black focus:outline-none focus:ring-2 focus:ring-black focus:ring-opacity-50
                `}>
                Xác nhận
            </button>
          </form>
        </Box>
      </Modal>
    </div>
  );
}

export default AddressModal;