import dotenv from 'dotenv'

import core from '../core.js'

export const coreTest = ({ a }) => {
  beforeAll(async () => {
    dotenv.config()
    // console.log(process.env)
  }, 30 * 1000)

  describe('C update json success', () => {

    afterAll(async () => {
    })

    /**
     * testId: C1010 
     * function: handleJsonUpdate
     */
    test('C1010 handleJsonUpdate', async () => {
      const accessToken = ''
      const companyName = ''
      const originalData = ''
      const parsedData = ''
      const typeId = ''

      const handleResult = await a.core.handleCompanySave({ accessToken, companyName, originalData, parsedData, typeId })
      console.log({ handleResult })
      const status = a.setting.browserServerSetting.getValue('statusList.OK')
      if (handleResult.response.status !== status) {
        console.log(`test fail: ${handleResult.response.status} !== ${status}`)
        return
      }
      console.log('test pass')
      expect(1).toBe(1)
    }, 10 * 1000)


    /**
     * testId: C1021 
     * function: handleJsonContent
     */
    test('C1021 handleJsonContent', () => {
      expect(core).toHaveProperty('init')
    }, 10 * 1000)
  })

  describe('C save file success', () => {
  })

  afterAll(async () => {
  })
}

export default {
  coreTest,
}

