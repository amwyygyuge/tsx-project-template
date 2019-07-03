/**
 * 用于环境配置，根据 host 情况来配置对应的后端服务器接口
 * @host 待匹配的 host 地址
 * @domain 待匹配的后端服务地址
 */
export default [
  {
    host: /localhost/,
    domain: 'https://i.bs58i.baishancloud.com/'
  },
  {
    host: /^/,
    domain: window.location.origin
  }
]
