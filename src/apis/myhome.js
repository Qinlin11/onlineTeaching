import http from "@/utils/http";

export function getPool() {
    return http({
        url: '/resource_pool/all',
        method: 'get',
    })
}


export function getSpace() {
    return http({
        url: '/personal_space/index',
        method: 'get',
    })
}
export const getResource = (directory_id,resource_type) =>{
    return http({
        url: `personal_space/resource/type/${directory_id}/${resource_type}`,
        method: 'get'
    })
}

//我的空间单个资源信息
export function getResourceInfo(resource_id) {
    return http({
        url: '/personal_space/resource/info/:resource_id',
        method: 'get',
        params:{
            resource_id:resource_id,
        }
    })
}
//删除我的空间资源
export function getResourceDelete(resource_id) {
    return http({
        url: '/personal_space/resource/delete/:resource_id',
        method: 'get',
        params:{
            resource_id:resource_id,
        }
    })
}
//创建讨论
export function postActivitiesDisussCreate(discuss_name,content) {
    return http({
        url: '/personal_space/activity/discuss/create/31',
        method: 'post',
        params:{
            discuss_name: discuss_name,
            content: content,

        }
    })
}
//单个目录所有讨论
export const getActivitiesDisussAll = (directory_id) =>{
    return http({
        url: `/personal_space/activity/discuss/all/${directory_id}`,
        method: 'get'
    })
}
//显示单个讨论信息
export function getActivitiesDisussInfo() {
    return http({
        url: '/personal_space/activity/discuss/info/31',
        method: 'get',
    })
}
//删除讨论
export function getActivitiesDisussDelete(id) {
    return http({
        url: `/personal_space/activity/discuss/delete/${id}`,
        method: 'get',
    })
}
//创建作业
export function postActivitiesAssignmentCreate(assignment_name,start_time,end_time,content) {
    return http({
        url: '/personal_space/activity/assignment/create/31',
        method: 'post',
        data: {
            assignment_name: assignment_name,
            start_time:start_time,
            end_time: end_time,
            content:content,
        }
    })
}
//显示单个目录作业
export const getActivitiesAssignmentAll = (directory_id) =>{
    return http({
        url: `/personal_space/activity/assignment/all/${directory_id}`,
        method: 'get'
    })
}


//显示单个作业信息
export function getActivitiesAssignmentInfo() {
    return http({
        url: '/personal_space/activity/assignment/info/:assignment_id',
        method: 'get',
    })
}
//删除作业
export function getActivitiesAssignmentDelete(id) {
    return http({
        url: `/personal_space/activity/assignment/delete/${id}`,
        method: 'get',
    })
}
//创建写作
export function postActivitiesWritingCreate(writing_name,writing_type,start_time,end_time,content) {
    return http({
        url: '/personal_space/activity/writing/create/31',
        method: 'post',
        data: {
            writing_name: writing_name,
            writing_type: writing_type,
            start_time:start_time,
            end_time: end_time,
            content:content,
        }
    })
}
//创建单个目录所有写作

export const getActivitiesWritingAll = (directory_id) =>{
    return http({
        url: `/personal_space/activity/writing/all/${directory_id}`,
        method: 'get'
    })
}

//显示单个协作信息
export function getActivitiesWritingInfo() {
    return http({
        url: '/personal_space/activity/writing/info/:writing_id',
        method: 'get',
    })
}

//创建投票
export function postActivitiesVoteCreate(vote_name,start_time,end_time,content) {
    return http({
        url: '/personal_space/activity/vote/create/31',
        method: 'post',
        data: {
            vote_name: vote_name,
            start_time: start_time,
            end_time: end_time,
            content:content,
        }
    })
}
//显示单个目录所有投票
export const getActivitiesVoteAll = (directory_id) =>{
    return http({
        url: `/personal_space/activity/vote/all/${directory_id}`,
        method: 'get'
    })
}
//显示单个投票信息
export function getActivitiesVoteInfo(id) {
    return http({
        url: `/personal_space/activity/vote/info/${id}`,
        method: 'get',
    })
}
//删除投票
export function getActivitiesVoteDelete(id) {
    return http({
        url: `/personal_space/activity/Vote/delete/${id}`,
        method: 'get',
    })
}

export const writingDeleteAPi= (id) => {
    return http({
        method: 'get',
        url: `personal_space/activity/writing/delete/${id}`
    })
}
