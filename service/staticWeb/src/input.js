/* /input.js */

const notificationListRequest = async ({
  accessToken, notificationId, CLIENT_ID, API_VERSION, API_SERVER_ORIGIN, getRequest,
}) => {
  const origin = API_SERVER_ORIGIN
  const path = `/api/${API_VERSION}/notification/select`
  const param = { notificationRange: CLIENT_ID, notificationId }
  return getRequest(CLIENT_ID, accessToken, origin, path, param)
}

const jsonGetRequest = async ({
  accessToken, COMPANY_FILE_PATH, CLIENT_ID, API_VERSION, API_SERVER_ORIGIN, getRequest,
}) => {
  const origin = API_SERVER_ORIGIN
  const path = `/api/${API_VERSION}/json/content`
  const param = {
    owner: CLIENT_ID,
    jsonPath: COMPANY_FILE_PATH,
  }
  return getRequest(CLIENT_ID, accessToken, origin, path, param)
}

const jsonListRequest = async ({
  accessToken, companyName, CLIENT_ID, API_VERSION, API_SERVER_ORIGIN, getRequest,
}) => {
  const origin = API_SERVER_ORIGIN
  const path = `/api/${API_VERSION}/json/list`
  const param = {
    owner: CLIENT_ID,
    jsonPath: companyName,
  }
  return getRequest(CLIENT_ID, accessToken, origin, path, param)
}


const fileListRequest = async ({
  accessToken, fileDir, CLIENT_ID, API_VERSION, API_SERVER_ORIGIN, getRequest,
}) => {
  const origin = API_SERVER_ORIGIN
  const path = `/api/${API_VERSION}/file/list`
  const param = {
    owner: CLIENT_ID,
    fileDir,
  }
  return getRequest(CLIENT_ID, accessToken, origin, path, param)
}

const fileContentRequest = async ({
  accessToken, fileDir, fileLabel, CLIENT_ID, API_VERSION, API_SERVER_ORIGIN, getFileRequest,
}) => {
  const origin = API_SERVER_ORIGIN
  const path = `/api/${API_VERSION}/file/content`
  const param = {
    owner: CLIENT_ID,
    fileDir,
    fileLabel,
  }
  return getFileRequest(CLIENT_ID, accessToken, origin, path, param)
}


export default {
  notificationListRequest,
  jsonGetRequest,
  jsonListRequest,
  fileListRequest,
  fileContentRequest,
}

