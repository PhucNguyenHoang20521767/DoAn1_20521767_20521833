// Login
export const LOGIN = "/customers/loginCustomer";
export const getLoginBody = (email: string, password: string) => ({
    customerEmail: email,
    customerPassword: password
});
// Signup
export const SIGNUP = "/customers/registerCustomer";
export const getSignupBody = (password: string, firstname: string, lastname: string, 
    birthday: string, email: string,  gender: string) => ({
    customerPassword: password,
    customerFirstName: firstname,
    customerLastName: lastname,
    customerBirthday: birthday,
    customerEmail: email,
    customerGender: gender
});
//Forgot passwords
export const FORGOT_PASSWORD = "/customers/forgetPasswordCustomer";
export const getForgotPasswordBody = (email: string) => ({
    customerEmail: email
});
//Reset passwords
export const RESET_PASSWORD = "/customers/resetPasswordCustomer";
export const getResetPasswordBody = (email: string, OTP: string, newPassword: string) => ({
    customerIdToken: email,
    customerOTP: OTP,
    customerPassword: newPassword
});
//Change passwords
export const CHANGE_PASSWORD = "/customers/changePasswordCustomer";
export const getChangePasswordBody = (idToken: string, oldPassword: string, newPassword: string) => ({
    customerIdToken: idToken,
    customerOldPassword: oldPassword,
    customerNewPassword: newPassword
});
//Get OTP from email
export const GET_OTP = "/customers/verifyCustomerAfterSendOTP";
export const getOTPBody = (idToken: string, OTP: string) => ({
    customerIdToken: idToken,
    customerOTP: OTP
});
//Verify OTP
export const VERIFY_OTP = "/customers/sendOTPCustomer";
export const sendOTPCustomer = (email: string) => ({
    customerEmail: email
});

//Logout
export const LOGOUT = (id:string) => `/customers/logoutCustomer/${id}`;
export const logoutCustomer = (id: string) => ({
    params: {
        customerId: id
    }
});

//Get user info
export const GET_USER_INFO = (id:string) => `/customers/getCustomerById/${id}`;
//Get avatar
export const GET_AVATAR = `/customers/getCustomerAvatar`;
export const getAccessToken = (token: string) => ({
    headers: {
        Authorization: "Bearer " + token
    }
});
//Get avatar URL
export const GET_AVATAR_URL = `/customers/getCustomerAvatarURL`;

//get subcategories
export const GET_SUBCATEGORIES = "/subcategories/getAllSubcategories";
//get categories
export const GET_CATEGORIES = "/categories/getAllCategories";
//get categories by id
export const GET_CATEGORIES_BY_ID = (id:string) => `/categories/getCategoryById/${id}`;
//get all products
export const GET_ALL_PRODUCTS = "/products/getAllProducts";
//get product images url
export const GET_PRODUCT_IMAGES_URL = (id:string) => `/products/getAllProductImageURLs/${id}`;
//get product by id
export const GET_PRODUCT_BY_ID = (id:string) => `/products/getProductById/${id}`;
//get all product color
export const GET_ALL_PRODUCT_COLORS = (id:string) => `/products/getAllProductColors/${id}`;
//get product images by color id
export const GET_PRODUCT_IMAGES_BY_COLOR 
= (pid:string, cid:string) => `/products/getAllProductImagesByColor/${pid}/${cid}`;
// get product images url by color id
export const GET_PRODUCT_IMAGES_URL_BY_COLOR 
= (pid:string, cid:string) => `/products/getAllProductImageURLsByColor/${pid}/${cid}`;
// get product color by id
export const GET_PRODUCT_COLOR_BY_ID = (id:string) => `/products/getProductColorById/${id}`;

//get all colors
export const GET_ALL_COLORS = "/colors/getAllColors";
//get color by id
export const GET_COLOR_BY_ID = (id:string) => `/colors/getColorById/${id}`;

//get product dimension by id
export const GET_PRODUCT_DIMENSION_BY_ID = (id:string) => `/products/getProductDimension/${id}`;

//get product rating by id
export const GET_PRODUCT_RATING_BY_ID = (id:string) => `/feedbacks/getProductRating/${id}`;

//get discount by id
export const GET_DISCOUNT_BY_ID = (id:string) => `/discounts/getDiscountById/${id}`;