/* create elm */

/* request */
export const saveNewCompany = ({ apiEndpoint, postRequest, companyName, graphData, graphType }) => {
  const url = `${apiEndpoint}/company/save`
  const param = { companyName, graphData, graphType }
  return postRequest(url, param)
}

/* onClick */
export const setOnClickAddTimerButton = ({ onClickAddTimerButton }) => {
  const addTimerBtn = document.querySelector('#addTimerBtn')
  addTimerBtn.onclick = (e) => {
    e.preventDefault()
    onClickAddTimerButton()
  }
}

export const setOnClickSaveMessageButton = ({ onClickSaveMessageButton }) => {
  const saveMessageBtn = document.querySelector('#saveMessageBtn')
  saveMessageBtn.onclick = (e) => {
    e.preventDefault()
    onClickSaveMessageButton()
  }
}

/* onSubmit */
export const setOnSubmitBackupEmailAddress = ({ onSubmitBackupEmailAddress }) => {
  const backupEmailAddressFormElm = document.querySelector('#backupEmailAddressForm')
  backupEmailAddressFormElm.onsubmit = (e) => {
    e.preventDefault()
    onSubmitBackupEmailAddress()
  }
}

export const setOnSubmitUploadForm = ({ onSubmitUploadForm }) => {
  const uploadProfileFormElm = document.querySelector('#uploadProfileForm')
  uploadProfileFormElm.onsubmit = (e) => {
    e.preventDefault()
    onSubmitUploadForm()
  }
}

/* show data */
export const showBackupEmailAddress = ({ backupEmailAddress }) => {
  const backupEmailAddressInputElm = document.querySelector('#backupEmailAddressInput')
  backupEmailAddressInputElm.value = backupEmailAddress
}

export const getLoadUploadedImg = ({ apiEndpoint }) => {
  return ({ fileLabel }) => {
    const imgElm = document.querySelector('#uploadedImg')
    if (!imgElm) {
      return
    }

    let filePath = '/img/profile.png'
    if (fileLabel) {
      filePath = `${apiEndpoint}/file/content?fileLabel=${fileLabel}`
    }

    imgElm.setAttribute('src', filePath)
  }
}

/* show elm */
export const showCompanyModal = ({ showModal, formatDate, jsonListResult }) => {
  const modalTemplateElm = document.querySelector('#modalTemplate')
  const modalElm = modalTemplateElm.cloneNode(true)

  const modalTitleElm = modalElm.querySelector('[data-id="modalTitle"]')
  modalTitleElm.innerText = '検索結果'

  if (!jsonListResult.result.jsonList || jsonListResult.result.jsonList.length === 0) {
    const textElm = document.createElement('p')
    textElm.innerText = '該当する企業が見つかりません。'
    modalElm.querySelector('[data-id="modalContent"]').appendChild(textElm)
  } else {
    jsonListResult.result.jsonList.forEach((row) => {
      const cardElm = document.querySelector('[data-template-id="cardTemplate"]').cloneNode(true)
      const dateFormatted = formatDate({ date: new Date(row.dateUpdated) })
      cardElm.classList.remove('hidden')
      cardElm.querySelector('[data-template-id="cardTemplateTitle"]').innerText = row.jsonPath
      cardElm.querySelector('[data-template-id="cardTemplateText"]').innerText = `更新日時: ${dateFormatted}`
      cardElm.href = `company?companyName=${row.jsonPath}`
      modalElm.querySelector('[data-id="modalContent"]').appendChild(cardElm)
    })
  }

  showModal(modalElm)
}

export const showMessage = ({ messageResult }) => {
  if (!messageResult || !messageResult.result) {
    return
  }
  document.querySelector('#messageContent').value = messageResult.result.jsonContent
}

export const showEditor = ({ splitPermissionListResult }) => {
  const { splitPermissionList, clientId } = splitPermissionListResult.result
  if (splitPermissionList.optional[`rw:${clientId}:json_v1`]) {
    document.querySelector('#editorContainer').classList.remove('hidden')
  } else {
    document.querySelector('#filePermissionRequestContainer').classList.remove('hidden')
  }
}

export const showSearchForm = ({ splitPermissionListResult }) => {
  const { splitPermissionList, clientId } = splitPermissionListResult.result
  if (splitPermissionList.optional[`rw:${clientId}:json_v1`]) {
    document.querySelector('#searchGraphContainer').classList.remove('hidden')
  } else {
    document.querySelector('#searchGraphJsonPermissionRequestContainer').classList.remove('hidden')
  }
}

export const showBackupEmailAddressForm = ({ splitPermissionListResult }) => {
  const { splitPermissionList } = splitPermissionListResult.result
  if (splitPermissionList.optional['rw:auth:backupEmailAddress']) {
    document.querySelector('#backupEmailAddressForm').classList.remove('hidden')
  } else {
    document.querySelector('#backupEmailAddressPermissionRequestContainer').classList.remove('hidden')
  }
}

export const showUploadForm = ({ splitPermissionListResult }) => {
  const { splitPermissionList, clientId } = splitPermissionListResult.result
  if (splitPermissionList.optional[`rw:${clientId}:file_v1`]) {
    document.querySelector('#uploadContainer').classList.remove('hidden')
    document.querySelector('#uploadedImgContainer').classList.remove('hidden')
  } else {
    document.querySelector('#uploadFilePermissionRequestContainer').classList.remove('hidden')
  }
}


export const addTabMenuContainer = ({
  createTabMenuContainer, showTabButton, tabList, activeTabContainerId,
}) => {
  const tabMenuContainerElm = createTabMenuContainer()
  const tabMenuContainerWrapElm = document.querySelector('#tabMenuContainerWrap')
  tabMenuContainerWrapElm.appendChild(tabMenuContainerElm)

  showTabButton({ tabMenuContainerElm, tabList, activeTabContainerId })
}

