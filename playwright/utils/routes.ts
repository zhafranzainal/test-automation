export const webRoutes = {
    LOGIN_PAGE_URL: '/auth/login',
    MY_ACCOUNT_PAGE_URL: '/account',
} as const;

export const apiRoutes = {
    PRODUCTS_LIST: '/api/productsList',
    BRANDS_LIST: '/api/brandsList',
    SEARCH_PRODUCT: '/api/searchProduct',
    VERIFY_LOGIN: '/api/verifyLogin',
    CREATE_ACCOUNT: '/api/createAccount',
    DELETE_ACCOUNT: '/api/deleteAccount',
    UPDATE_ACCOUNT: '/api/updateAccount',
    GET_USER_DETAIL_BY_EMAIL: '/api/getUserDetailByEmail',
} as const;
