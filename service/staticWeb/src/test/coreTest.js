export const handleCompanySave = ({ a }) => {
  describe('handleCompanySave', () => {
    const accessToken = ''
    const companyName = ''
    const originalData = ''
    const parsedData = ''
    const typeId = ''

    test('pub-20-d-ut-1: success handleCompanySave', async () => {
      const handleResult = await a.core.handleCompanySave({
        accessToken, companyName, originalData, parsedData, typeId,
      })
      expect(handleResult.response.status).toBe(a.setting.browserServerSetting.getValue('statusList.OK'))
    }, 10 * 1000)
  })
}

export const handleCompanyList = ({ a }) => {
  describe('handleCompanyList', () => {
    const accessToken = ''
    const companyName = ''

    test('pub-20-d-ut-2: success handleCompanyList', async () => {
      const handleResult = await a.core.handleCompanyList({ accessToken, companyName })
      expect(handleResult.response.status).toBe(a.setting.browserServerSetting.getValue('statusList.OK'))
    }, 10 * 1000)
  })
}

export const handleCompanyContent = ({ a }) => {
  describe('handleCompanyContent', () => {
    const accessToken = ''
    const companyName = ''

    test('pub-20-d-ut-3: success handleCompanyContent', async () => {
      const handleResult = await a.core.handleCompanyContent({ accessToken, companyName })
      expect(handleResult.response.status).toBe(a.setting.browserServerSetting.getValue('statusList.OK'))
    }, 10 * 1000)
  })
}

export const handleCompanyDelete = ({ a }) => {
  describe('handleCompanyDelete', () => {
    const accessToken = ''
    const companyName = ''

    test('pub-20-d-ut-4: success handleCompanyDelete', async () => {
      const handleResult = await a.core.handleCompanyDelete({ accessToken, companyName })
      expect(handleResult.response.status).toBe(a.setting.browserServerSetting.getValue('statusList.OK'))
    }, 10 * 1000)
  })
}

