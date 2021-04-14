/**
 * 生产环境
 */
;(function() {
  window.SITE_CONFIG = {};
  window.SITE_CONFIG['baseUrl'] = 'http://172.16.2.36:8888/auth';
  window.SITE_CONFIG['loginUrlLocal'] = 'http://172.16.2.30:8001';
  // cdn地址 = 域名 + 版本号
  window.SITE_CONFIG['domain'] = './'; // 域名
  window.SITE_CONFIG['version'] = ''; // 版本号(年月日时分)
  window.SITE_CONFIG['cdnUrl'] = window.SITE_CONFIG.domain + window.SITE_CONFIG.version;
})();
