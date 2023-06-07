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