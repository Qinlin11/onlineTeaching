import { ref } from 'vue'
import { defineStore } from 'pinia'
import { Baseinfor, loginAPI } from "@/apis/user";

export const useUserStore = defineStore('user', () => {
        const userInfo = ref({})
        const getUserInfo = async ({ phone, password }) => {
            const res = await loginAPI({ phone, password })
            userInfo.value = res.data
            console.log(res.data)
        }
        const getUserBase = async (form) => {
            const  res2 = await Baseinfor(form);
            userInfo.value.avatar = res2.data.avatar
            userInfo.value.phone = res2.data.phone
            userInfo.value.username = res2.data.username
            userInfo.value.organization = res2.data.organization
            userInfo.value.gender = res2.data.gender
        }
        const clearInfo = () => {
            userInfo.value = ''
        }
        return {
            userInfo,
            getUserInfo,
            getUserBase,
            clearInfo
        }

    },
    {
        persist: true,
    })
