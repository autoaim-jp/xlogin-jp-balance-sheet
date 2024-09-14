/* mypage/core.js */

export const _ = {}

const _parseQuarterlyFinancialResults = ({ message }) => {
  let parsedMessage = message.replace(/売上営業\n損益率/, '売上営業損益率')
  parsedMessage = parsedMessage.replace(/△.*\n/, '')
  parsedMessage = parsedMessage.replace(/前年同期比.*\n/, '')
  parsedMessage = parsedMessage.replace(/▽.*/, '')

  console.log({ parsedMessage })

  return { parsedMessage }
}

export const parseMessage = ({ message }) => {
  const messageList = message.split('\n')

  if (messageList[0] === '決算期	売上高	営業益	経常益	最終益	修正1株益	売上営業') {
    return _parseQuarterlyFinancialResults({ message })
  } else {
    return { parsedMessage: 'error at parseMessage' }
  }

}

export default {}

