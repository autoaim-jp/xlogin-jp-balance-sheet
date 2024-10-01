import jsonApi from './jsonApi.js'

const apiRequest = (isPost, origin, path, param, header) => {
  if (jsonApi.hasTest(path)) {
    return jsonApi.test(path)(isPost, origin, path, param, header)
  }

  return 'no error specified'
}

const postRequest = (clientId, accessToken, origin, path, param) => {
  const header = {
    authorization: `Bearer ${accessToken}`,
    'x-xlogin-client-id': clientId,
  }
  return apiRequest(true, origin, path, param, header)
}

const getRequest = (clientId, accessToken, origin, path, param) => {
  const header = {
    authorization: `Bearer ${accessToken}`,
    'x-xlogin-client-id': clientId,
  }
  return apiRequest(false, origin, path, param, header)
}


export default {
  postRequest,
  getRequest,
}

