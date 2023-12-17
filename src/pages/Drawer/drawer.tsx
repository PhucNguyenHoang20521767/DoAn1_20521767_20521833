import * as React from "react";
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
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  openCart,
  openFavourite,
  closeDrawer,
} from "@/redux/reducers/drawer_reducers";
import { RootState } from "@/redux/store/store";
import { Link } from "react-router-dom";

import { Cart } from "@/components/Cart";
import { Favourite } from "@/components/Favourite";
import zIndex from "@mui/material/styles/zIndex";
import ChatPage from "../Chat/ChatPage";

const CustomDrawer = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state: RootState) => state.auth.currentUser);
  const isDrawerOpen = useSelector(
    (state: RootState) => state.drawer.isDrawerOpen
  );
  const pageDrawer = useSelector((state: RootState) => state.drawer.pageDrawer);
  const widthDrawer = useSelector(
    (state: RootState) => state.drawer.widthDrawer
  );
  // const [isOpen, setIsOpen] = React.useState(false);

  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event &&
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
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
      {(() => {
        switch (pageDrawer) {
          case "cart":
            return <Cart isCart={true} />;
          case "favourite":
            return <Favourite />;
          case "chat":
            return <ChatPage />;
          default:
            return null;
        }
      })()}
    </Box>
  );

  return (
    <div className=" bg-light-5">
      {/* <Button onClick={() => setIsOpen(true)}>Open Drawer</Button> */}
      <SwipeableDrawer
        anchor="right"
        open={isDrawerOpen}
        onClose={() => dispatch(closeDrawer())}
        onOpen={toggleDrawer(true)}
        style={{ zIndex: 9000 }}
      >
        <div className="flex items-center justify-center">
          <h3 className="text-bold mt-3 text-xl text-secondary-0">
            {
              {
                cart: "Giỏ hàng",
                favourite: "Yêu thích",
                chat: "Tin nhắn",
              }[pageDrawer]
            }
          </h3>
        </div>
        <div className="mx-2 my-4 border-y-2 border-secondary-4">
          {currentUser ? (
            renderList(["Inbox", "Starred", "Send email", "Drafts"])
          ) : (
            <div className="flex h-[500px] items-center justify-center">
              <p className="text-bold mt-3 w-full break-words text-xl text-secondary-0 md:max-w-sm">
                Vui lòng đăng nhập để sử dụng chức năng này!
              </p>
            </div>
          )}
        </div>
        {
          <div className="flex items-center justify-center">
            <Link to={currentUser ? `product` : "signin"}>
              <button
                className={
                  pageDrawer !== "chat" && !currentUser
                    ? "rounded-sm bg-secondary-1 p-2 px-16 uppercase text-white hover:bg-black hover:shadow-lg"
                    : "hidden"
                }
              >
                {currentUser ? "Tiếp tục mua hàng" : "Đăng nhập"}
              </button>
            </Link>
          </div>
        }
      </SwipeableDrawer>
    </div>
  );
};

export default CustomDrawer;
