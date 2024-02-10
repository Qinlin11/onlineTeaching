import http from "@/utils/http";

/**
 * 登录
 * @param phone
 * @param password
 * */
export const loginAPI = ({ phone, password }) => {
    return http({
        url: '/user/login',
        method: 'post',
        data: {
            phone: phone,
            password: password
        }
    })
}

/**
 * 注册
 * @param phone
 * @param password
 * */
export const registerAPI = ({ phone, password }) => {
    return http({
        url: '/user/register',
        method: 'post',
        data: {
            phone: phone,
            password: password
        }
    })
}


//获取除了自己以外所有用户
export const getUserALLAPI = () => {
    return http({
        method: 'get',
        url: 'user/all'
    })
}


/**
 * 获取文件名称
 * */
export const getAllDataAPI = () => {
    return http({
        url: 'resource_pool/all',
        method: 'get',
    })
}

//删除资源
export const resource_poolDeleteAPI = (id) => {
  return http({
      method: 'get',
      url: `resource_pool/delete/${id}`
  })
}

export const getResource_poolInfo = (id) => {
  return http({
      method: 'get',
      url: `resource_pool/info/${id}`
  })
}

export const getResource_poolTypeAPI = (id = 1) => {
    return http({
        method: 'get',
        url: `resource_pool/type/${id}`
    })
}

/**
 * 修改手机号
 * */
export const PhoneAPI = ({ phone, password }) => {
    return http({
        url: '/account/phone',
        method: 'post',
        data:{
            phone:phone,
            password:password
        }
    })
}

/**
 * 修改基本信息
 * */
export const Baseinfor = ({ username, gender, organization }) => {
    return http({
        url: '/account/basic_info',
        method: 'post',
        data:{
            username:username,
            gender:gender,
            organization:organization
        }
    })
}

/**
 * 修改密码
 * */
export const PasswordAPI = ({ oldPassword, newPassword }) => {
    return http({
        url: '/account/password?oldPassword=123456',
        method: 'post',
        data:{
            ldPassword:oldPassword,
            newPassword:newPassword
        }
    })
}

/**
 * 退出登录
 * */
export const LogoutAPI = () => {
    return http({
        url: '/user/logout',
        method: 'post',
    })
}
