import request from 'request'

export const fetchData = query => {
  return request({
    url: './table.json',
    method: 'get',
    params: query
  })
}

export const statioid = query => {
  return request({
    url: './getstationid',
    method: 'get',
    params: query
  })
}
