import request from 'request'

export const fetchData = query => {
  return request({
    url: '.',
    method: 'get',
    params: query
  })
}

export const statioid = query => {
  return request({
    url: '.',
    method: 'get',
    params: query
  })
}
