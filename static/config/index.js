/**
 * 开发环境
 */
;
(function() {
    window.SITE_CONFIG = {};

    // api接口请求地址
    //window.SITE_CONFIG['baseUrl'] = 'http://172.19.4.221:8080/auth';
    window.SITE_CONFIG['baseUrl'] = 'http://172.16.2.39:8080/auth';

    //登录页面接口
    window.SITE_CONFIG['loginUrlLocal'] = 'http://localhost:9527'
    // cdn地址 = 域名 + 版本号
    window.SITE_CONFIG['domain'] = './'; // 域名
    window.SITE_CONFIG['version'] = ''; // 版本号(年月日时分)
    window.SITE_CONFIG['cdnUrl'] = window.SITE_CONFIG.domain + window.SITE_CONFIG.version;
})();
