import React from 'react';

const LoginGoogle = () => {
  const handleGoogleLogin = () => {
    // const redirectUri = encodeURIComponent('http%3A%2F%2Fnguyenshomefurniture-be.onrender.com%2Fapi%2Fauth%2Fgoogle%2Fcallback');
    // const clientId = encodeURIComponent('984597708696-an7j2dtntchg83f342rk2hg4so4j7vtj.apps.googleusercontent.com');
    // const scope = encodeURIComponent('email profile openid');
    // const responseType = encodeURIComponent('code');
    const state = encodeURIComponent(JSON.stringify({ redirectTo: '/', data: { foo: 'bar' } }));
    // const url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}&response_type=${responseType}&state=${state}`;

    const url = `https://accounts.google.com/o/oauth2/v2/auth/oauthchooseaccount?response_type=code&redirect_uri=http%3A%2F%2Fnguyenshomefurniture-be.onrender.com%2Fapi%2Fauth%2Fgoogle%2Fcallback&scope=profile%20email&client_id=984597708696-an7j2dtntchg83f342rk2hg4so4j7vtj.apps.googleusercontent.com&service=lso&o2v=2&flowName=GeneralOAuthFlow${state}`
    // const url = 'https://accounts.google.com/o/oauth2/v2/auth/oauthchooseaccount?response_type=code&redirect_uri=http%3A%2F%2Fnguyenshomefurniture-be.onrender.com%2Fapi%2Fauth%2Fgoogle%2Fcallback&scope=profile%20email&client_id=984597708696-an7j2dtntchg83f342rk2hg4so4j7vtj.apps.googleusercontent.com&service=lso&o2v=2&flowName=GeneralOAuthFlow'

    window.location.href = url;
  };

  return (
    // <div className=''>
    //     <svg className = "w-5 h-5 shrink-0 max-[410px]:hidden" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512"><path d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"/></svg>
    //     {/* <div className='text-lg pl-3'>Google</div> */}
    //     <button  className='text-lg pl-3' onClick={handleGoogleLogin}>Google</button>
    // </div>
    <button 
    onClick={handleGoogleLogin} 
    className='px-2 py-1 w-5/12 flex justify-center items-center border border-secondary-2 rounded-sm shadow-sm hover:font-bold focus:ring focus:ring-secondary-4'>
        <svg className = "w-5 h-5 shrink-0 max-[410px]:hidden" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512"><path d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"/></svg>
        <div className='text-lg pl-3'>Google</div>
    </button>
  );
};

export default LoginGoogle;