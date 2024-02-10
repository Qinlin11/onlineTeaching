import http from "@/utils/http";

//获取指定教研组所有文章
export const getDocumentsAPI = (page) => {
    return http({
        method: 'get',
        url: 'richText/all',
        params: {
            seminar_id: '1',
            page: page,
            pageSize: '8'
        }
    })
}

//删除某篇文章
export const deleteDocumentAPI = (id) => {
    return http({
        method: 'get',
        url: `richText/delete/${id}`
    })
}

//获取某篇文章
export const getOneDocumentAPI = (id) => {
    return http({
        method: 'get',
        url: `richText/one/${id}`
    })
}

//修改某篇文章
export const updateDocumentAPI = (data) => {
  return http({
      method: 'post',
      url: 'richText/update',
      data: {
          id: data.id,
          title: data.editTitle,
          content: data.editContent
      }
  })
}

//新增文章
export const createRichTextAPI = (data) => {
    return http({
        method: 'post',
        url: 'richText/upload',
        data: {
            title: data.title,
            content: data.content,
            seminar_id: '1'
        }
    })
}



//获取用户加入教研组
export const getUserSeminarAPI = () => {
    return http({
        url: 'seminar/user',
        method: 'get',
    })
}

//获取教研组成员
export const getSeminarAllAPI = (id) => {
    return http({
        url: 'seminar/all',
        method: 'get',
        params: {
            seminar_id: id
        }
    })
}

//新增教研组
export const createSeminarAPI = (data) => {
    return http({
        method: 'post',
        url: 'seminar/create',
        data: {
            title: data.groupTitle,
            seminar_name: data.groupName,
            end_time: '2023-12-28 05:43:05',
            ids: data.members,
        }
    })
}

//删除教研组
export const deleteSeminarAPI = (id) => {
    return http({
        method: 'get',
        url: `seminar/delete/${id}`
    })
}
//修改教研组的主题和名称
export const editSeminarAPI = (data) => {
    return http({
        method: 'post',
        url: 'seminar/edit',
        data: {
            seminar_id: data.id,
            seminar_name: data.seminar_name,
            seminar_title: data.title
        }
    })
}

//通过Phone添加添加成员
export const addMemberForPhoneAPI = (data) => {
    return http({
        method: 'post',
        url: 'seminar/phone',
        data: {
            seminar_id: data.id,
            phone: data.phone,
        }
    })
}

//删除教研组成员
export const deleteMemberAPI = (data) => {
    return http({
        method: 'post',
        url: 'seminar/delete',
        data: {
            seminar_id: data.seminarId,
            particpant_ids: data.ids
        }
    })
}


//获取组内资源文件
export const getFileALLAPI = (resourceType = null) => {
    return http({
        method: 'get',
        url: 'file/all',
        params: {
            resource_type: resourceType,
        }
    })
}

//删除组内资源文件
export const deleteGroupFileAPI = (id) => {
    return http({
        method: 'get',
        url: `file/delete/${id}`
    })
}
