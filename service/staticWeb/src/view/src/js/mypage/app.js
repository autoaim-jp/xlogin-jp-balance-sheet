/* mypage/app.js */
import setting from '../_setting/index.js'
import * as lib from '../_lib/index.js'

import * as core from './core.js'
import * as input from './input.js'
import * as action from './action.js'
import * as output from './output.js'

const asocial = {}
asocial.setting = setting
asocial.output = output
asocial.core = core
asocial.input = input
asocial.action = action
asocial.lib = lib

/* a is an alias of asocial */
const a = asocial

const loadMessageContent = async () => {
  const messageResult = await a.input.fetchMessage(argNamed({
    browserServerSetting: a.setting.browserServerSetting.getList('apiEndpoint'),
    lib: [a.lib.common.input.getRequest],
  }))

  a.output.showMessage(argNamed({
    param: { messageResult },
  }))
}

const loadMessageBtn = () => {
  const saveMessage = a.output.getSaveMessage(argNamed({
    browserServerSetting: a.setting.browserServerSetting.getList('apiEndpoint'),
    lib: [a.lib.common.output.postRequest],
  }))
  const onClickSaveMessageButton = a.action.getOnClickSaveMessageButton(argNamed({
    output: { saveMessage },
  }))
  a.output.setOnClickSaveMessageButton(argNamed({
    onClick: { onClickSaveMessageButton },
  }))

  const deleteMessage = a.output.getDeleteMessage(argNamed({
    browserServerSetting: a.setting.browserServerSetting.getList('apiEndpoint'),
    lib: [a.lib.common.output.postRequest],
  }))
  const onClickDeleteMessageButton = a.action.getOnClickDeleteMessageButton(argNamed({
    output: { deleteMessage },
  }))
  a.output.setOnClickDeleteMessageButton(argNamed({
    onClick: { onClickDeleteMessageButton },
  }))
}

const loadPermission = async () => {
  const splitPermissionListResult = await a.lib.common.input.fetchSplitPermissionList(a.setting.browserServerSetting.getValue('apiEndpoint'))
  a.output.showEditor(argNamed({
    param: { splitPermissionListResult },
  }))

  a.lib.xdevkit.output.reloadXloginLoginBtn(splitPermissionListResult?.result?.clientId)
}

const loadTabBtn = async () => {
  const tabList = {
    editorTabContainer: 'エディタ',
  }
  const activeTabContainerId = Object.keys(tabList)[0]

  a.output.addTabMenuContainer(argNamed({
    lib: [a.lib.xdevkit.output.createTabMenuContainer, a.lib.xdevkit.output.showTabButton],
    param: { tabList, activeTabContainerId },
  }))
}

const main = async () => {
  a.lib.xdevkit.output.switchLoading(true)
  a.lib.monkeyPatch()

  a.app.loadMessageContent()
  a.app.loadMessageBtn()
  a.app.loadTabBtn()

  a.app.loadPermission()

  setTimeout(() => {
    a.lib.xdevkit.output.switchLoading(false)
  }, 300)
}

a.app = {
  main,
  loadMessageContent,
  loadMessageBtn,
  loadPermission,
  loadTabBtn,
}

a.app.main()
window.a = a
