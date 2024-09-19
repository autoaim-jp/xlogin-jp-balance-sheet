/* mypage/core.js */

const _transpose = (a) => { return a[0].map((_val, c) => { return a.map((r) => { return r[c] }) }) }

const _parseQuarterlyFinancialResults = ({ message }) => {
  let filteredMessage = message.replace(/売上営業\n損益率/, '売上営業損益率')
  filteredMessage = filteredMessage.replace(/△.*\n/, '')
  filteredMessage = filteredMessage.replace(/前年同期比.*\n/, '')
  filteredMessage = filteredMessage.replace(/▽.*/, '')

  console.log({ filteredMessage })

  const parsedJson = filteredMessage.split('\n').map((row) => {
    return row.split('\t').map((val) => { return val.trim().replace(/,/g, '') })
  })

  const datasetLabelList = parsedJson.splice(0, 1)[0]
  const dataListList = _transpose(parsedJson.slice())
  const labelList = dataListList.splice(0, 1)[0]

  // 発表日を削除
  datasetLabelList.splice(datasetLabelList.length - 1)
  dataListList.splice(dataListList.length - 1)

  // 修正一株利益を削除
  datasetLabelList.splice(datasetLabelList.length - 2, 1)
  dataListList.splice(dataListList.length - 2, 1)

  // 決算期を削除
  datasetLabelList.splice(0, 1)

  return { parsedMessage: { datasetLabelList, dataListList, labelList } }
}

export const parseMessage = ({ message }) => {
  const messageList = message.split('\n')

  if (messageList[0] === '決算期\t売上高\t営業益\t経常益\t最終益\t修正1株益\t売上営業') {
    return { typeId: 1, ..._parseQuarterlyFinancialResults({ message }) }
  }
  return { typeId: -1, parsedMessage: 'error at parseMessage' }
}

export default {}

