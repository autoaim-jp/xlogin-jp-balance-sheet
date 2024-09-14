/* mypage/input.js */
export const getMessageValue = () => {
  const message = document.querySelector('#messageContent').value

  return { message }
}

export const fetchUserProfile = ({ apiEndpoint, getRequest }) => {
  const url = `${apiEndpoint}/user/profile`
  return getRequest(url)
}

export const fetchMessage = ({ apiEndpoint, getRequest }) => {
  const url = `${apiEndpoint}/company/content`
  return getRequest(url)
}

export default {}

