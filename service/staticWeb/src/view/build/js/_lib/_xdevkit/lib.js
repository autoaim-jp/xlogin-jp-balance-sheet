/* /_lib/_xdevkit/_lib/index.js */

/* crypto */
export const getRandomStr = (len) => {
  return btoa(crypto.getRandomValues(new Uint8Array(len))).slice(0, len)
}

/* url */
export const getSearchQuery = () => {
  const searchQuery = {}
  window.location.search.replace(/^\?/, '').split('&').forEach((row) => {
    const kv = row.split('=')
    const [key, value] = kv
    searchQuery[key] = value
  })
  return searchQuery
}

/* format */
export const formatDate = ({ date, format }) => {
  return (format || 'YYYY-MM-DD hh:mm:ss').replace(/YYYY/g, date.getFullYear())
    .replace(/MM/g, ('0' + (date.getMonth() + 1)).slice(-2))
    .replace(/DD/g, ('0' + date.getDate()).slice(-2))
    .replace(/hh/g, ('0' + date.getHours()).slice(-2))
    .replace(/mm/g, ('0' + date.getMinutes()).slice(-2))
    .replace(/ss/g, ('0' + date.getSeconds()).slice(-2))
}

