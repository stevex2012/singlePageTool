
//按照get参数数据格式化json
export const setQueryString = obj => {
    if (!obj) {
        return ''
    }
    var str = JSON.stringify(obj)
    str = str.replace(/,/g, '&')
    str = str.replace(/:/g, '=')
    str = str.replace(/}|{|null|undefined|"/g, '')

    return `?${str}`
}