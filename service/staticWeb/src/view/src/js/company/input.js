/* mypage/input.js */
export const getMessageValue = () => {
  const message = document.querySelector('#messageContent').value

  return { message }
}

export const fetchUserProfile = ({ apiEndpoint, getRequest }) => {
  const url = `${apiEndpoint}/user/profile`
  return getRequest(url)
}

export const fetchMessage = ({ apiEndpoint, getRequest, companyName }) => {
  const url = `${apiEndpoint}/company/content`
  const param = { companyName }
  return getRequest(url, param)
}

export const fetchJsonList = ({ apiEndpoint, getRequest, companyName }) => {
  const url = `${apiEndpoint}/company/list`
  const param = { companyName }
  return getRequest(url, param)
}


export default {}

