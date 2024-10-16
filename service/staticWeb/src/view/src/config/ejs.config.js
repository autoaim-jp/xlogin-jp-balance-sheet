import path from 'path'
import { fileURLToPath } from 'url'

const breadcrumbAllList = {
  '/': 'ホーム',
  '/mypage': 'マイページ',
  '/error': 'エラー',
}

const getBreadcrumbList = (pathList) => {
  /* eslint-disable-next-line no-shadow */
  return pathList.map((path) => { return { path, label: breadcrumbAllList[path] } })
}

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const ejsConfig = {
  _common: {
    componentPath: `${__dirname}/../ejs/component/`,
    xdevkitComponentPath: `${__dirname}/../ejs/_xdevkit/component/`,
  },
  index: {
    title: 'sample.xlogin.jp',
    description: 'simple login client sample',
    author: 'autoaim_jp',
    breadcrumbList: getBreadcrumbList(['/']),

    inlineCssList: [],
    externalCssList: ['/css/tailwind.css'],
    inlineScriptList: [],
    externalScriptList: ['/js/index/app.js'],
  },
  company: {
    title: 'company | sample.xlogin.jp',
    description: 'mypage',
    author: 'autoaim_jp',
    breadcrumbList: getBreadcrumbList(['/', '/company']),

    inlineCssList: [],
    externalCssList: ['/css/tailwind.css'],
    inlineScriptList: ['/js/company/app.js', '/js/_lib/_chartjs/chart.js', '/js/_lib/_alpinejs/dist/cdn.min.js'],
    externalScriptList: [],
  },

  mypage: {
    title: 'mypage | sample.xlogin.jp',
    description: 'mypage',
    author: 'autoaim_jp',
    breadcrumbList: getBreadcrumbList(['/', '/mypage']),

    inlineCssList: [],
    externalCssList: ['/css/tailwind.css'],
    inlineScriptList: ['/js/mypage/app.js', '/js/_lib/_alpinejs/dist/cdn.min.js'],
    externalScriptList: [],
  },
  error: {
    title: 'error | sample.xlogin.jp',
    description: 'error',
    author: 'autoaim_jp',
    breadcrumbList: getBreadcrumbList(['/', '/error']),

    inlineCssList: [],
    externalCssList: ['/css/tailwind.css'],
    inlineScriptList: [],
    externalScriptList: ['/js/error/app.js'],
  },
}

export default {
  ejsConfig,
}

