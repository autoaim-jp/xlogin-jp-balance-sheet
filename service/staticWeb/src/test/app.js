import axios from 'axios'
import http from 'http'
import https from 'https'
import crypto from 'crypto'
import winston from 'winston'
import { ulid } from 'ulid'

import core from '../core.js'
import lib from '../lib.js'
import xdevkit from '../xdevkit-auth-router/src/app.js'

import setting from './setting/index.js'
import testLib from './xdevkit-api-test/index.js'
lib.testLib = testLib

const asocial = {
  setting, core, lib,
}

const a = asocial

const main = () => {
  dotenv.config()
  lib.init(axios, http, https, crypto, winston, ulid)
  setting.init(process.env)
  core.init(setting, testLib.output, testLib.input, lib)
  a.lib.monkeyPatch({ SERVICE_NAME: a.setting.getValue('env.SERVICE_NAME') })


}

const app = {
  main,
}
a.app.main = main

a.app.main()

