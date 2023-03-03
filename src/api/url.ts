const apiUrls = {
  baseUrl: process.env.REACT_APP_API_BASE_PATH,
  auth: {
    staffLogin: '/Staff/loginStaff',
    logout: 'logout',
    tokenLogin: 'verify',
  },

};

export default apiUrls;
