import { mainApi } from './main_api'
import * as apiEndpoints from './api_endpoints';

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

export const getProductById = async (id: string) => {
    return await mainApi.get(apiEndpoints.GET_PRODUCT_BY_ID(id));
}

//get all products color
export const getProductColor = async (id: string) => {
    return await mainApi.get(apiEndpoints.GET_ALL_PRODUCT_COLORS(id));
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