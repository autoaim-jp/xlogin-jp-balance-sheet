/* /output.js */

const timerAddRequest = ({
  accessToken, CLIENT_ID, API_VERSION, API_SERVER_ORIGIN, postRequest,
}) => {
  const path = `/api/${API_VERSION}/notification/append`
  const param = {
    notificationRange: CLIENT_ID,
    subject: 'timer',
    detail: {
      title: 'time notification',
      content: 'TIME\'S UP!',
      action: { title: 'Go to xlogin!', href: 'https://xlogin.jp' },
    },
  }

  return postRequest(CLIENT_ID, accessToken, API_SERVER_ORIGIN, path, param)
}

const notificationOpenRequest = ({
  accessToken, notificationIdList, CLIENT_ID, API_VERSION, API_SERVER_ORIGIN, postRequest,
}) => {
  const path = `/api/${API_VERSION}/notification/open`
  const param = {
    notificationRange: CLIENT_ID,
    notificationIdList,
  }

  return postRequest(CLIENT_ID, accessToken, API_SERVER_ORIGIN, path, param)
}

const fileSaveRequest = ({
  accessToken, companyName, companyData, CLIENT_ID, API_VERSION, API_SERVER_ORIGIN, postRequest,
}) => {
  const path = `/api/${API_VERSION}/json/update`
  const param = {
    owner: CLIENT_ID,
    jsonPath: companyName,
    content: companyData,
  }

  return postRequest(CLIENT_ID, accessToken, API_SERVER_ORIGIN, path, param)
}

const fileDeleteRequest = ({
  accessToken, companyName, CLIENT_ID, API_VERSION, API_SERVER_ORIGIN, postRequest,
}) => {
  const path = `/api/${API_VERSION}/json/delete`
  const param = {
    owner: CLIENT_ID,
    jsonPath: companyName,
  }

  return postRequest(CLIENT_ID, accessToken, API_SERVER_ORIGIN, path, param)
}

const updateBackupEmailAddressRequest = ({
  accessToken, backupEmailAddress, CLIENT_ID, API_VERSION, API_SERVER_ORIGIN, postRequest,
}) => {
  const path = `/api/${API_VERSION}/user/update`
  const param = {
    backupEmailAddress,
  }

  return postRequest(CLIENT_ID, accessToken, API_SERVER_ORIGIN, path, param)
}

const fileAddRequest = ({
  accessToken, CLIENT_ID, API_VERSION, API_SERVER_ORIGIN, postFormRequest, formData,
}) => {
  const path = `/api/${API_VERSION}/file/create`

  return postFormRequest(CLIENT_ID, accessToken, API_SERVER_ORIGIN, path, formData)
}

/* to http client */
const endResponse = ({
  res, json, redirect, ERROR_PAGE,
}) => {
  if (redirect) {
    return res.redirect(redirect)
  } if (json) {
    return res.json(json)
  }
  return res.redirect(ERROR_PAGE)
}

export default {
  timerAddRequest,
  notificationOpenRequest,
  fileSaveRequest,
  fileDeleteRequest,
  updateBackupEmailAddressRequest,
  fileAddRequest,

  endResponse,
}

