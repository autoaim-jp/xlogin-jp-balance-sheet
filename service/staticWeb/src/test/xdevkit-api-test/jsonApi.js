const _checkPostRequest = (isPost, origin, path, param, header) => {
  if (isPost !== true) {
    return false
  }
  if (origin == null) {
    return false
  }
  if (path == null) {
    return false
  }
  if (param == null) {
    return false
  }
  if (header == null) {
    return false
  }
}

const _checkGetRequest = (isPost, origin, path, param, header) => {
  if (isPost !== false) {
    return false
  }
  if (origin == null) {
    return false
  }
  if (path == null) {
    return false
  }
  if (param == null) {
    return false
  }
  if (header == null) {
    return false
  }
}

const _getJsonContent = (isPost, origin, path, param, header) => {
  if (_checkGetRequest(isPost, origin, path, param, header)) {
    return null
  }
  if (param.owner == null) {
    return null
  }
  if (param.jsonPath == null) {
    return null
  }

  return { data: { result: { jsonContent: {} } } }
}

const _saveJsonContent = (isPost, origin, path, param, header) => {
  if (_checkPostRequest(isPost, origin, path, param, header)) {
    return null
  }

  if(param.owner == null) {
    return null
  }
  if(param.jsonPath == null) {
    return null
  }
  if(param.content == null) {
    return null
  }

  return { data: { result: {} } }
}

const API_VERSION = 'v0.1.0'
const _testCase = {
  [`/api/${API_VERSION}/json/content`]: _getJsonContent,
  [`/api/${API_VERSION}/json/update`]: _saveJsonContent,
}

const hasTest = (path) => {
  return _testCase[path] != null
}

const test = (path) => {
  return _testCase[path]
}

export default {
  hasTest,
  test,
}

