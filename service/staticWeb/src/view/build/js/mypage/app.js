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

const loadPermission = async () => {
  const splitPermissionListResult = await a.lib.common.input.fetchSplitPermissionList(a.setting.browserServerSetting.getValue('apiEndpoint'))
  a.output.showEditor(argNamed({
    param: { splitPermissionListResult },
  }))
  a.output.showSearchForm(argNamed({
    param: { splitPermissionListResult },
  }))
  a.lib.xdevkit.output.reloadXloginLoginBtn(splitPermissionListResult?.result?.clientId)
}

const loadTabBtn = async () => {
  const tabList = {
    editorTabContainer: 'グラフの追加',
    searchGraphTabContainer: '検索',
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

  a.app.loadTabBtn()

  a.app.loadPermission()

  setTimeout(() => {
    a.lib.xdevkit.output.switchLoading(false)
  }, 300)
}

a.app = {
  main,
  loadPermission,
  loadTabBtn,
}

a.app.main()
window.a = a
