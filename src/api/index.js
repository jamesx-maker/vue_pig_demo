import request from 'request'

export const fetchData = query => {
  return request({
    url: '.',
    method: 'get',
    params: query
  })
}

export const StationList = query => {
  return request({
    url: '.',
    method: 'get',
    params: query
  })
}
