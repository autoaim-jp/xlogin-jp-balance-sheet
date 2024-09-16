/* /core.js */
/**
 * @name コア機能を集約したファイル
 * @memberof file
 */

/* local setting */
const mod = {}

const init = (setting, output, input, lib) => {
  mod.setting = setting
  mod.output = output
  mod.input = input
  mod.lib = lib
}

const handleCompanySave = async ({ accessToken, companyName, originalData, parsedData, typeId }) => {
  const graphId = mod.lib.getUlid()
  const companyData = {
    [graphId]: { originalData, parsedData, typeId }
  }
  const fileSaveResponse = await mod.output.fileSaveRequest(argNamed({
    param: { accessToken, companyData, companyName },
    xdevkitSetting: mod.setting.xdevkitSetting.getList('api.API_VERSION', 'env.API_SERVER_ORIGIN', 'env.CLIENT_ID'),
    lib: [mod.lib.postRequest],
  }))

  logger.debug('handleCompanySave', { fileSaveResponse })

  const status = mod.setting.browserServerSetting.getValue('statusList.OK')

  const handleResult = { response: { status } }
  return handleResult
}

const handleCompanyList = async ({ accessToken, companyName }) => {
  const encodedCompanyName = encodeURIComponent(companyName)
  const jsonListResponse = await mod.input.jsonListRequest(argNamed({
    param: { accessToken, companyName: encodedCompanyName },
    xdevkitSetting: mod.setting.xdevkitSetting.getList('api.API_VERSION', 'env.API_SERVER_ORIGIN', 'env.CLIENT_ID'),
    lib: [mod.lib.getRequest],
  }))

  logger.debug('handleCompanyList', { data: jsonListResponse.data })

  if (!jsonListResponse || !jsonListResponse.data) {
    const status = mod.setting.browserServerSetting.getValue('statusList.INVALID_SESSION')
    const result = {}
    const handleResult = { response: { status, result } }
    return handleResult
  }

  const { result } = jsonListResponse.data
  const status = mod.setting.browserServerSetting.getValue('statusList.OK')
  const handleResult = { response: { status, result } }
  return handleResult
}


const handleCompanyContent = async ({ accessToken, companyName }) => {
  const encodedCompanyName = encodeURIComponent(companyName)
  const jsonGetResponse = await mod.input.jsonGetRequest(argNamed({
    param: { accessToken, companyName: encodedCompanyName },
    xdevkitSetting: mod.setting.xdevkitSetting.getList('api.API_VERSION', 'env.API_SERVER_ORIGIN', 'env.CLIENT_ID'),
    lib: [mod.lib.getRequest],
  }))

  logger.debug('handleCompanyContent', { data: jsonGetResponse.data })

  if (!jsonGetResponse || !jsonGetResponse.data) {
    const status = mod.setting.browserServerSetting.getValue('statusList.INVALID_SESSION')
    const result = {}
    const handleResult = { response: { status, result } }
    return handleResult
  }

  const { result } = jsonGetResponse.data
  const status = mod.setting.browserServerSetting.getValue('statusList.OK')
  const handleResult = { response: { status, result } }
  return handleResult
}

const handleCompanyDelete = async ({ accessToken }) => {
  const fileDeleteResponse = await mod.output.fileDeleteRequest(argNamed({
    param: { accessToken, companyName },
    xdevkitSetting: mod.setting.xdevkitSetting.getList('api.API_VERSION', 'env.API_SERVER_ORIGIN', 'env.CLIENT_ID'),
    lib: [mod.lib.postRequest],
  }))

  logger.debug('handleCompanyDelete', { fileDeleteResponse })

  const status = mod.setting.browserServerSetting.getValue('statusList.OK')

  const handleResult = { response: { status } }
  return handleResult
}

const handleSplitPermissionList = async ({ splitPermissionList }) => {
  const clientId = mod.setting.xdevkitSetting.getValue('env.CLIENT_ID')
  const result = { splitPermissionList, clientId }

  const status = mod.setting.browserServerSetting.getValue('statusList.OK')

  const handleResult = { response: { status, result } }
  return handleResult
}

const createResponse = ({ req, res, handleResult }) => {
  logger.debug('createResponse', { 'req.url': req.url, handleResult })
  // req.session.auth = handleResult.session

  const ERROR_PAGE = mod.setting.xdevkitSetting.getValue('url.ERROR_PAGE')
  const { redirect } = handleResult

  if (handleResult.response) {
    const json = handleResult.response
    return mod.output.endResponse({ res, json, ERROR_PAGE })
  }

  if (req.method === 'GET') {
    if (handleResult.redirect) {
      return mod.output.endResponse({ res, redirect: handleResult.redirect, ERROR_PAGE })
    }

    return mod.output.endResponse({ res, redirect: ERROR_PAGE, ERROR_PAGE })
  }

  if (redirect) {
    const json = { redirect }
    return mod.output.endResponse({ res, json, ERROR_PAGE })
  }

  const json = { redirect: ERROR_PAGE }
  return mod.output.endResponse({ res, json, ERROR_PAGE })
}

const handleInvalidSession = ({ req, res }) => {
  if (!req.session || !req.session.auth) {
    const status = mod.setting.browserServerSetting.getValue('statusList.INVALID_SESSION')
    return res.json({ status })
  }

  return null
}

export default {
  init,

  handleCompanySave,
  handleCompanyContent,
  handleCompanyList,
  handleCompanyDelete,
  handleSplitPermissionList,

  createResponse,
  handleInvalidSession,
}

