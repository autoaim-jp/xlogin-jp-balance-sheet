const _checkRequest = (origin, path, param, header) => {
  expect(origin).not.toBeNull()
  expect(origin).toBeDefined()
  expect(path).not.toBeNull()
  expect(path).toBeDefined()
  expect(param).not.toBeNull()
  expect(param).toBeDefined()
  expect(header).not.toBeNull()
  expect(header).toBeDefined()
}
const _checkPostRequest = (isPost, origin, path, param, header) => {
  expect(isPost).toBe(true)
  _checkRequest(origin, path, param, header)
}

const _checkGetRequest = (isPost, origin, path, param, header) => {
  expect(isPost).toBe(false)
  _checkRequest(origin, path, param, header)
}

const _getJsonContent = (isPost, origin, path, param, header) => {
  _checkGetRequest(isPost, origin, path, param, header)
  expect(param.owner).toBe(process.env.CLIENT_ID)
  expect(param.jsonPath).toBeDefined()

  return { data: { result: { jsonContent: {} } } }
}

const _getJsonList = (isPost, origin, path, param, header) => {
  _checkGetRequest(isPost, origin, path, param, header)
  expect(param.owner).toBe(process.env.CLIENT_ID)
  expect(param.jsonPath).toBeDefined()

  return { data: { result: { jsonContent: {} } } }
}

const _saveJsonContent = (isPost, origin, path, param, header) => {
  _checkPostRequest(isPost, origin, path, param, header)
  expect(param.owner).toBe(process.env.CLIENT_ID)
  expect(param.jsonPath).toBeDefined()
  expect(param.content).toBeDefined()

  return { data: { result: {} } }
}

const _deleteJsonContent = (isPost, origin, path, param, header) => {
  _checkPostRequest(isPost, origin, path, param, header)
  expect(param.owner).toBe(process.env.CLIENT_ID)
  expect(param.jsonPath).toBeDefined()

  return { data: { result: {} } }
}
const API_VERSION = 'v0.1.0'
/* input, output */
const _testCase = {
  [`/api/${API_VERSION}/json/content`]: _getJsonContent,
  [`/api/${API_VERSION}/json/update`]: _saveJsonContent,
  [`/api/${API_VERSION}/json/list`]: _getJsonList,
  [`/api/${API_VERSION}/json/delete`]: _deleteJsonContent,
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

