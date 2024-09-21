/* /_lib/index.js */
import * as xdevkitMod from './_xdevkit/index.js'
import * as commonMod from './_common/index.js'

export const xdevkit = xdevkitMod
export const common = commonMod

/* debug */
export const getCaller = () => {
  const callerInfo = new Error().stack.replace(/^Error\n.*\n.*\n/, '')
  return callerInfo
}

/* asocial */
export const monkeyPatch = () => {
  if (typeof Element.prototype.clearChildren === 'undefined') {
    Object.defineProperty(Element.prototype, 'clearChildren', {
      configurable: true,
      enumerable: false,
      value() {
        while (this.firstChild) {
          this.removeChild(this.lastChild)
        }
      },
    })
  }

  if (typeof window.argNamed === 'undefined') {
    /*
     * asocialの考え方ではどうしても引数が多くなる。
     * そのため、action, core, modなどのパーツのオブジェクトに分けて引数を渡す。
     * argNamedはその入れ子のArray, Objectをflatにする。
     * Arrayの中に含められるのは関数だけ。関数以外はObjで渡す。
     * { a: { param, obj, string, }, b: [ func, ], c: {}, } => { param, obj, string, func, }
     */
    window.argNamed = (obj) => {
      const flattened = {}

      Object.keys(obj).forEach((key) => {
        if (Array.isArray(obj[key])) {
          Object.assign(flattened, obj[key].reduce((prev, curr) => {
            if (typeof curr === 'undefined') {
              throw new Error(`[error] flat argument by list can only contain function but: ${typeof curr} @${key}\n===== maybe you need make func exported like  module.exports = { func, } =====`)
            } else if (typeof curr === 'function') {
              prev[curr.name] = curr
            } else {
              throw new Error(`[error] flat argument by list can only contain function but: ${typeof curr} @${key}`)
            }
            return prev
          }, {}))
        } else if (typeof obj[key] === 'object' && obj[key] !== null) {
          Object.assign(flattened, obj[key])
        } else {
          flattened[key] = obj[key]
        }
      })

      return flattened
    }
  }
}

export const redirect = (response) => {
  if (response && response.redirect) {
    window.location.href = response.redirect
  }
}

/* filter */
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

  // 最後の行の長さが異なるならば不要
  if (parsedJson[parsedJson.length - 2].length !== parsedJson[parsedJson.length -1].length) {
    parsedJson.splice(parsedJson.length - 1)
  }

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

  console.log({ parsedMessage: { datasetLabelList, dataListList, labelList } })
  return { parsedMessage: { datasetLabelList, dataListList, labelList } }
}

export const parseMessage = ({ message }) => {
  const messageList = message.split('\n')

  if (messageList[0] === '決算期\t売上高\t営業益\t経常益\t最終益\t修正1株益\t売上営業') {
    return { typeId: 1, ..._parseQuarterlyFinancialResults({ message }) }
  }
  return { typeId: -1, parsedMessage: 'error at parseMessage' }
}


