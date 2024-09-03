/* /action.js */

const getHandlerCompanySave = ({ handleCompanySave, createResponse }) => {
  return async (req, res) => {
    const { accessToken } = req.session.auth
    const { company } = req.body

    const handleResult = await handleCompanySave({ accessToken, company })

    createResponse({ req, res, handleResult })
  }
}

const getHandlerCompanyContent = ({ handleCompanyContent, createResponse }) => {
  return async (req, res) => {
    const { accessToken } = req.session.auth

    const handleResult = await handleCompanyContent({ accessToken })

    createResponse({ req, res, handleResult })
  }
}

const getHandlerCompanyDelete = ({ handleCompanyDelete, createResponse }) => {
  return async (req, res) => {
    const { accessToken } = req.session.auth

    const handleResult = await handleCompanyDelete({ accessToken })

    createResponse({ req, res, handleResult })
  }
}

const getHandlerSplitPermissionList = ({ handleInvalidSession, handleSplitPermissionList, createResponse }) => {
  return async (req, res) => {
    if (handleInvalidSession({ req, res })) {
      return
    }

    const { splitPermissionList } = req.session.auth

    const handleResult = await handleSplitPermissionList({ splitPermissionList })

    createResponse({ req, res, handleResult })
  }
}

export default {
  getHandlerCompanySave,
  getHandlerCompanyContent,
  getHandlerCompanyDelete,

  getHandlerSplitPermissionList,
}

