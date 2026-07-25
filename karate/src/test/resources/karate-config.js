function fn() {

    var env = karate.env; // pulled from -Dkarate.env, defaults to 'qa'
    if (!env) {
        env = 'qa';
    }

    karate.log('karate.env =', env);

    var config = {
        env: env,
        baseUrl: 'https://automationexercise.com/api'
    };

    if (env === 'qa') {
        // same host as default, kept separate so a real qa/staging
        // host can be swapped in later without touching feature files
        config.baseUrl = 'https://automationexercise.com/api';
    } else if (env === 'prod') {
        config.baseUrl = 'https://automationexercise.com/api';
    }

    config.messages = {
        USER_CREATED: 'User created!',
        USER_EXISTS: 'User exists!',
        USER_UPDATED: 'User updated!',
        USER_NOT_FOUND: 'User not found!',
        ACCOUNT_DELETED: 'Account deleted!',
        METHOD_NOT_SUPPORTED: 'This request method is not supported.',
        LOGIN_MISSING_PARAM: 'Bad request, email or password parameter is missing in POST request.',
        SEARCH_MISSING_PARAM: 'Bad request, search_product parameter is missing in POST request.'
    };

    // applies to every scenario in every feature
    karate.configure('connectTimeout', 10000);
    karate.configure('readTimeout', 10000);

    return config;

}
