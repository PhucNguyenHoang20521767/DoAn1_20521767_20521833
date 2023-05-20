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


