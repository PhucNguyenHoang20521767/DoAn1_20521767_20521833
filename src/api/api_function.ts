import { mainApi } from './main_api'
import * as apiEndpoints from './api_endpoints';
import { useDispatch, useSelector } from 'react-redux';
import { loadcart } from '@/redux/reducers/cart_reducers';
import { RootState } from '@/redux/store/store';

//change passwords
export const changePassword = async (idToken: string, oldPassword: string, newPassword: string) => {
    return await mainApi.post(apiEndpoints.CHANGE_PASSWORD, apiEndpoints.getChangePasswordBody(idToken, oldPassword, newPassword));
}

//get user info
interface UserInfo {
    customerFirstName: string;
    customerLastName: string;
    customerBirthday: Date;
    customerGender: string;
    customerEmail: string;
    customerAvatar: string;
  }  
export const getUserInfo = async (id: string): Promise<UserInfo> => {
    return await mainApi.get(apiEndpoints.GET_USER_INFO(id));
}

//get all products
export const getAllProducts = async () => {
    return await mainApi.get(apiEndpoints.GET_ALL_PRODUCTS);
}

export const getProductById = async (id: string) => {
    return await mainApi.get(apiEndpoints.GET_PRODUCT_BY_ID(id));
}

//get all subcategories
export const getAllSubcategories = async () => {
    return await mainApi.get(apiEndpoints.GET_SUBCATEGORIES);
}

//get subcategories by id
export const getSubcategoriesById = async (id: string) => {
    return await mainApi.get(apiEndpoints.GET_SUBCATEGORIES_BY_ID(id));
}

//get all products color
export const getProductColor = async (id: string) => {
    return await mainApi.get(apiEndpoints.GET_ALL_PRODUCT_COLORS(id));
}

//get all product images
export const getProductImages = async (id: string) => {
    return await mainApi.get(apiEndpoints.GET_ALL_PRODUCT_IMAGES(id));
}
//get all product images url
export const getProductImagesUrl = async (id: string) => {
    return await mainApi.get(apiEndpoints.GET_PRODUCT_IMAGES_URL(id));
}

export const getProductImageByColor = async (pid:string, cid:string) => {
    return await mainApi.get(apiEndpoints.GET_PRODUCT_IMAGES_BY_COLOR(pid, cid));
}

export const getAllProductImageUrlByColor = async (pid:string, cid:string) => {
    return await mainApi.get(apiEndpoints.GET_PRODUCT_IMAGES_URL_BY_COLOR(pid, cid));
}

//get product color by id
export const getProductColorById = async (id: string) => {
    return await mainApi.get(apiEndpoints.GET_PRODUCT_COLOR_BY_ID(id));
}

//get product dimension by id
export const getProductDimensionById = async (id: string) => {
    return await mainApi.get(apiEndpoints.GET_PRODUCT_DIMENSION_BY_ID(id));
}

//get product rating
export const getProductRating = async (id: string) => {
    return await mainApi.get(apiEndpoints.GET_PRODUCT_RATING_BY_ID(id));
}

//get discount by id
export const getDiscountById = async (id: string) => {
    return await mainApi.get(apiEndpoints.GET_DISCOUNT_BY_ID(id));
}

//create cart
export const createCart = async (token: string) => {
    return await mainApi.post(
        apiEndpoints.CREATE_CART, 
        apiEndpoints.getAccessToken(token)
        );
}
//get customer cart
export const getCustomerCart = async (token: string) => {
    return await mainApi.get(
        apiEndpoints.GET_CUSTOMER_CART,
        apiEndpoints.getAccessToken(token)
        );
}
//get all cart item
export const getAllCartItem = async (id: string, token: string) => {
    return await mainApi.get(
        apiEndpoints.GET_ALL_CART_ITEMS(id),
        apiEndpoints.getAccessToken(token)
        );
}
//add item to cart
export const addItemToCart = async (id:string, token: string, productId: string, colorId: string, quantity: number) => {
    return await mainApi.post(
        apiEndpoints.ADD_ITEM_TO_CART(id),
        apiEndpoints.getAddItemToCartBody(productId, colorId, quantity),
        apiEndpoints.getAccessToken(token)
        );
}

export const fetchCart = async () => {
    const currentUser = useSelector((state: RootState) => state.auth.currentUser)
    const dispatch = useDispatch()
    try {
      const res1 = await getCustomerCart(currentUser)
      const cartInfores = res1.data.data
      console.log('ci', cartInfores)
      dispatch(loadcart(cartInfores))

      if (cartInfores.length > 0) {
        const res2 = await getAllCartItem(cartInfores[0]._id, currentUser)
        const cartItems = res2.data.data
        console.log('aci', cartItems)
      }
    } catch (error) {
      console.log(error)
    }
  }
//update item in cart
export const updateItemInCart = async (id: string, token: string, productId: string, colorId: string, quantity: number) => {
    return await mainApi.put(
        apiEndpoints.UPDATE_ITEM_IN_CART(id),
        apiEndpoints.getAddItemToCartBody(productId, colorId, quantity),
        apiEndpoints.getAccessToken(token)
        );
}
//remove item from cart
export const removeItemFromCart = async (id: string, token: string, pid: string, cid: string) => {
    return await mainApi.put(
        apiEndpoints.REMOVE_ITEM_FROM_CART(id),
        apiEndpoints.getRemoveItemFromCartBody(pid, cid),
        apiEndpoints.getAccessToken(token)
        );
}
//remove all items from cart
export const removeAllItemFromCart = async (id: string, token: string) => {
    return await mainApi.delete(
        apiEndpoints.REMOVE_ALL_ITEMS_FROM_CART(id),
        apiEndpoints.getAccessToken(token)
        );
}