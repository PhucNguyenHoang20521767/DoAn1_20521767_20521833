import * as React from 'react';
import {
  Box,
  Button,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  SwipeableDrawer,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { openCart, openFavourite, closeDrawer } from '@/redux/reducers/drawer_reducers';
import { RootState } from '@/redux/store/store';
import { Link } from 'react-router-dom';

import { Cart } from '@/components/Cart';
import { Favourite } from '@/components/Favourite';

const CustomDrawer = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state: RootState) => state.auth.currentUser);
  const isDrawerOpen = useSelector((state: RootState) => state.drawer.isDrawerOpen);
  const pageDrawer = useSelector((state: RootState) => state.drawer.pageDrawer);
  const widthDrawer = useSelector((state: RootState) => state.drawer.widthDrawer);
  // const [isOpen, setIsOpen] = React.useState(false);

  const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event &&
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' ||
        (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }
    // setIsOpen(open);
  };

  const renderList = (items: string[]) => (
    <Box
      sx={{ width: widthDrawer }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      {pageDrawer ? <Cart/> : <Favourite/>}
    </Box>
  );

  return (
    <div className="bg-light-5">
      {/* <Button onClick={() => setIsOpen(true)}>Open Drawer</Button> */}
      <SwipeableDrawer
        anchor="right"
        open={isDrawerOpen}
        onClose={() => dispatch(closeDrawer())}
        onOpen={toggleDrawer(true)}
      >
        <div className='flex justify-center items-center'>
          <h3 className='text-bold text-xl text-secondary-0 mt-3'>{pageDrawer ? "Giỏ hàng" : "Sản phẩm đã thích" }</h3>
        </div>
        <div className='mx-2 my-4 border-y-2 border-secondary-4'>
          {renderList(['Inbox', 'Starred', 'Send email', 'Drafts'])}
        </div>
        <div className='flex justify-center items-center'>   
          <Link to='product'>
            <button className={pageDrawer ? 
            'uppercase rounded-sm bg-secondary-1 text-white p-2 px-16 hover:bg-black hover:shadow-lg'
              : 'hidden'
          }>
                {currentUser? "Tiếp tục mua hàng" : "Đăng nhập"}
            </button>
          </Link>
        </div>
      </SwipeableDrawer>
    </div>
  );
};

export default CustomDrawer;

{/* <List>
{items.map((text, index) => (
  <ListItem key={text} disablePadding>
    <ListItemButton>
      <ListItemIcon>
        {index % 2 === 0 ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 6.878V6a2.25 2.25 0 012.25-2.25h7.5A2.25 2.25 0 0118 6v.878m-12 0c.235-.083.487-.128.75-.128h10.5c.263 0 .515.045.75.128m-12 0A2.25 2.25 0 004.5 9v.878m13.5-3A2.25 2.25 0 0119.5 9v.878m0 0a2.246 2.246 0 00-.75-.128H5.25c-.263 0-.515.045-.75.128m15 0A2.25 2.25 0 0121 12v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6c0-.98.626-1.813 1.5-2.122"
            />
          </svg>
        )}
      </ListItemIcon>
      <ListItemText primary={text} />
    </ListItemButton>
  </ListItem>
))}
</List> */}