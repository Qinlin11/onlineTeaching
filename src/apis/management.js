import http from '@/utils/http'

export function upLoad(data){
    return http({
        method:'post',
        url:'resource_pool/create',
        data
    })
}
