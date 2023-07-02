import { RootState } from '@/redux/store/store'
import { useDispatch, useSelector } from 'react-redux'

export const Favourite = () => {
  const dispatch = useDispatch()
  const currentUser = useSelector((state: RootState) => state.auth.currentUser)

  if (!currentUser) {
    return (
      <div className='p-5 my-[10rem] text-xl'>Vui lòng đăng nhập để xem sản phẩm!</div>
    )
  }

  return (
    <div>Favourite</div>
  )
}

export default Favourite