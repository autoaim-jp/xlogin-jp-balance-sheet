import axios from 'axios'
import http from 'http'
import https from 'https'
import crypto from 'crypto'
import winston from 'winston'
import { ulid } from 'ulid'

import core from '../core.js'
import lib from '../lib.js'
import input from '../input.js'
import outppt from '../outppt.js'
import xdevkit from '../xdevkit-auth-router/src/app.js'

import setting from './setting/index.js'
import testLib from './xdevkit-api-test/index.js'

const asocial = {
  setting, output, core, input, lib,
}

const a = asocial

const testHandleCompanySave = () => {
  const accessToken = ''
  const companyName = ''
  const originalData = ''
  const parsedData = ''
  const typeId = ''

  const handleResult = a.core.handleCompanySave({ accessToken, companyName, originalData, parsedData, typeId })
  console.log({ handleResult })
}

const test = () => {
  a.lib.getRequest = testLib.getRequest
  a.lib.postRequest = testLib.postRequest

  testHandleCompanySave()
}

const main = () => {
  dotenv.config()
  lib.init(axios, http, https, crypto, winston, ulid)
  setting.init(process.env)
  core.init(setting, output, input, lib)
  a.lib.monkeyPatch({ SERVICE_NAME: a.setting.getValue('env.SERVICE_NAME') })

  a.app.test()
}

const app = {
  main,
  test,
}
a.app = app

a.app.main()

