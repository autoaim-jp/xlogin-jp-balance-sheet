import dotenv from 'dotenv'

import core from '../core.js'

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
  test('C1010 handleJsonUpdate', () => {}, 10 * 1000)


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

