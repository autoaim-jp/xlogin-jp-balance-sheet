const _checkGetRequest = (isPost, origin, path, param, header) => {
  if (isPost) {
    return false
  }
  // :TODO check

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

const _testCase = {
  '/api/v0.1.0/json/content': _getJsonContent,
}


const hasTest = (path) => {
  return _testCase[path] != null
}

const test = (path) => {
  return _testCase[path]
}

export const {
  hasTest,
  test,
}

