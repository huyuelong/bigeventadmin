import request from '@/utils/request'

// 注册接口
export const userRegisterService = ({ username, password, repassword }) => {
  return request.post('/api/reg', { username, password, repassword })
}

// 登录借口
export const userLoginService = ({ username, password }) => {
  return request.post('/api/login', { username, password })
}
