// 深拷贝
export function deepClone(obj) {
  return JSON.parse(JSON.stringify(obj))
}

/**
 * 文件预览
 * @param id 文件id
 */
 export function previewFile(id) {
  window.open(window._CONFIG['serverURL'] + '/service1/srm-portal/srmAttach/preview?id=' + id)
}

/**
 * 表单效验正整数
 */
export function needPositiveInteger(rule, value, callback) {
  const reg = new RegExp('^[0-9]*[1-9][0-9]*$').test(value)
  if (!reg) {
    const { locale, messages } = lang._vm
    return callback(new Error(messages[locale].message_positiveInteger))
  }
  return callback()
}

/**
 * 表单效验0-99整数
 */
export function needZero2NineNine(rule, value, callback) {
  const reg = new RegExp('^[1-9]?[0-9]?$').test(value)
  if (!reg) {
    const { locale, messages } = lang._vm
    return callback(new Error(messages[locale].message_ninetyNineIntegers))
  }
  return callback()
}

/**
 * 表单效验正数
 */
export function needPositiveNumber(rule, value, callback) {
  const reg = new RegExp('^(([0-9]+\\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\\.[0-9]+)|([0-9]*[1-9][0-9]*))$').test(value)
  if (!reg) {
    const { locale, messages } = lang._vm
    return callback(new Error(messages[locale].message_positiveInteger))
  }
  return callback()
}

/**
 * 表单效验正数,整数或两位小数
 */
export function needPositiveTwoNumber(rule, value, callback) {
  const reg = new RegExp('^(?!0+(?:\\.0+)?$)(?:[1-9]\\d*|0)(?:\\.\\d{1,2})?$').test(value)
  if (!reg) {
    const { locale, messages } = lang._vm
    return callback(new Error(messages[locale].message_twoDigitDecimal))
  }
  return callback()
}

/**
 * 表单效验非负数
 */
export function needPositiveNumberOrZero(rule, value, callback) {
  const reg = new RegExp('^\\d+(\\.\\d+)?$').test(value)
  if (!reg) {
    const { locale, messages } = lang._vm
    return callback(new Error(messages[locale].message_zeroOrInteger))
  }
  return callback()
}

/**
 * 表单效验邮箱
 */
export function needEmail(rule, value, callback) {
  const reg = new RegExp('^[\\w-]+(\\.[\\w-]+)*@[\\w-]+(\\.[\\w-]+)+$').test(value)
  if (!reg) {
    const { locale, messages } = lang._vm
    return callback(new Error(messages[locale].message_emailFormat))
  }
  return callback()
}

/**
 * 表单效验总机，传真
 */
export function needFax(rule, value, callback, regExp = '(^([0-9]+[-][0-9]+)$)', required) {
  const reg = new RegExp(regExp).test(value)
  const reqFlag = required || (value && !required)
  if (!reg && reqFlag) {
    const { locale, messages } = lang._vm
    return callback(new Error(messages[locale].message_ittegularFormat))
  }
  return callback()
}
/**
 * 表单效验--不能是未来时间
 */
export function needNoFuture(rule, value, callback) {
  if (value > new Date().getTime()) {
    const { locale, messages } = lang._vm
    return callback(new Error(messages[locale].message_notFutureTime))
  }
  return callback()
}

/**
 * 表单效验网址：匹配www,http开头的一切网址
 */
export function needWebSite(rule, value, callback) {
  const reg = new RegExp('[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+\\.?').test(value)
  if (value) {
    if (!reg) {
      const { locale, messages } = lang._vm
      return callback(new Error(messages[locale].message_webFromat))
    }
    return callback()
  } else {
    return callback()
  }
}

/**
 * 把文件按照二进制进行读取
 */
export function readFile(file) {
  return new Promise(resolve => {
    const reader = new FileReader()
    // readAsBinaryString以二进制读取，是个异步操作
    reader.readAsBinaryString(file)
    // 因为上面是异步，所以这里用onload
    reader.onload = ev => {
      resolve(ev.target.result)
    }
  })
}

/**
 * 获取文件名的后缀
 */
export function getFileSuffix(name) {
  const nameArr = name.split('.')
  return nameArr[nameArr.length - 1].toLowerCase()
}

/**
 * 判断字段是否为空
 */
export function isBlank(fieldName) {
  return !fieldName || fieldName === '' || fieldName === ' '
}

/**
 * 最全手机格式效验,根据区号(包括国外)---待与后台数据库匹配区号
 */
export function getValidCellphone(countryId, phone) {
  const phones = {
    // 未匹配到，统一处理
    'common': /^([0-9]+[-]{0,1}[ ]{0,1}[0-9]+)$/,
    'DZ': /^(\+?213|0)(5|6|7)\d{8}$/,
    'SY': /^(!?(\+?963)|0)?9\d{8}$/,
    'SA': /^(!?(\+?966)|0)?5\d{8}$/,
    'US': /^(\+?1)?[2-9]\d{2}[2-9](?!11)\d{6}$/,
    'CZ': /^(\+?420)? ?[1-9][0-9]{2} ?[0-9]{3} ?[0-9]{3}$/,
    'DE': /^(\+?49[ \.\-])?([\(]{1}[0-9]{1,6}[\)])?([0-9 \.\-\/]{3,20})((x|ext|extension)[ ]?[0-9]{1,4})?$/,
    'DK': /^(\+?45)?(\d{8})$/,
    'GR': /^(\+?30)?(69\d{8})$/,
    'AU': /^(\+?61|0)4\d{8}$/,
    'GB': /^(\+?44|0)7\d{9}$/,
    'HK': /^(\+?852\-?)?[569]\d{3}\-?\d{4}$/,
    'IN': /^(\+?91|0)?[789]\d{9}$/,
    'NZ': /^(\+?64|0)2\d{7,9}$/,
    'ZA': /^(\+?27|0)\d{9}$/,
    'ZM': /^(\+?26)?09[567]\d{7}$/,
    'ES': /^(\+?34)?(6\d{1}|7[1234])\d{7}$/,
    'FI': /^(\+?358|0)\s?(4(0|1|2|4|5)?|50)\s?(\d\s?){4,8}\d$/,
    'FR': /^(\+?33|0)[67]\d{8}$/,
    'IL': /^(\+972|0)([23489]|5[0248]|77)[1-9]\d{6}/,
    'HU': /^(\+?36)(20|30|70)\d{7}$/,
    'IT': /^(\+?39)?\s?3\d{2} ?\d{6,7}$/,
    'JP': /^(\+?81|0)\d{1,4}[ \-]?\d{1,4}[ \-]?\d{4}$/,
    'MY': /^(\+?6?01){1}(([145]{1}(\-|\s)?\d{7,8})|([236789]{1}(\s|\-)?\d{7}))$/,
    'NO': /^(\+?47)?[49]\d{7}$/,
    'BE': /^(\+?32|0)4?\d{8}$/,
    'PL': /^(\+?48)? ?[5-8]\d ?\d{3} ?\d{2} ?\d{2}$/,
    'BR': /^(\+?55|0)\-?[1-9]{2}\-?[2-9]{1}\d{3,4}\-?\d{4}$/,
    'PT': /^(\+?351)?9[1236]\d{7}$/,
    'RU': /^(\+?7|8)?9\d{9}$/,
    // 'sr-RS': /^(\+3816|06)[- \d]{5,9}$/,
    'TR': /^(\+?90|0)?5\d{9}$/,
    'VN': /^(\+?84|0)?((1(2([0-9])|6([2-9])|88|99))|(9((?!5)[0-9])))([0-9]{7})$/,
    'CN': /^(\+?0?86\-?)?1[345789]\d{9}$/,
    'TW': /^(\+?886\-?|0)?9\d{8}$/
  }
  let reg = phones[countryId]
  if (!reg) reg = phones.common
  if (!(reg.test(phone))) return false
  return true

  // const reg = phones[countryCode];
  // if(!reg || !(reg.test(phone)))return false
  // return true
}

/**
 * js运算结果不一定准确，会丢失精度,封装浮点加减乘除
 */
export function floatAdd(arg1, arg2) { // 加
  let r1, r2, m
  try {
    r1 = arg1.toString().split('.')[1].length
  } catch (e) {
    r1 = 0
  }
  try {
    r2 = arg2.toString().split('.')[1].length
  } catch (e) {
    r2 = 0
  }
  m = Math.pow(10, Math.max(r1, r2))
  return (arg1 * m + arg2 * m) / m
}
export function floatSub(arg1, arg2) { // 减
  let r1, r2, m, n
  try {
    r1 = arg1.toString().split('.')[1].length
  } catch (e) {
    r1 = 0
  }
  try {
    r2 = arg2.toString().split('.')[1].length
  } catch (e) {
    r2 = 0
  }
  m = Math.pow(10, Math.max(r1, r2))
  // 动态控制精度长度
  n = (r1 >= r2) ? r1 : r2
  return ((arg1 * m - arg2 * m) / m).toFixed(n)
}
export function floatMul(arg1, arg2) { // 乘
  let m = 0
  const s1 = arg1.toString()
  const s2 = arg2.toString()
  try {
    m += s1.split('.')[1].length
  } catch (e) { }
  try {
    m += s2.split('.')[1].length
  } catch (e) { }
  return Number(s1.replace('.', '')) * Number(s2.replace('.', '')) / Math.pow(10, m)
}
export function floatDiv(arg1, arg2) { // 除
  let t1 = 0
  let t2 = 0
  let r1; let r2
  try {
    t1 = arg1.toString().split('.')[1].length
  } catch (e) { }
  try {
    t2 = arg2.toString().split('.')[1].length
  } catch (e) { }
  r1 = Number(arg1.toString().replace('.', ''))
  r2 = Number(arg2.toString().replace('.', ''))
  return (r1 / r2) * Math.pow(10, t2 - t1)
}
/**
 * 添加千分位
 */
export function comdify(num) {
  if (!num) return num
  let str
  if (String(num).indexOf('.') < 0) {
    str = [String(num)]
  } else {
    str = String(num).split('.')
  }
  const re = /\d{1,3}(?=(\d{3})+$)/g
  const num1 = str[0].replace(re, '$&,')
  return str.length > 1 && str[1] ? `${num1}.${str[1]}` : `${num1}`
}

/**
 * 去除千分位
 */
export function delcommafy(num) {
  if (!num) return num
  num = num.toString()
  num = num.replace(/,/gi, '')
  return num
}

/**
 * 校验带有千分位和未有千分位的小数或整数
 * @param {Number} value
 * @param {Function} callback
 * @param {Number} integerParamLen 整数部分的位数
 * @param {Number} floatParamLen 小数部分的位数
 */
export function validateThousandFloat(value, callback, integerParamLen, floatParamLen) {
  const initLen = Number(integerParamLen)
  const floatLen = Number(floatParamLen)
  const val = String(value)
  // 整数部分千分位的个数
  const micNum = initLen % 3 == 0 ? initLen / 3 - 1 : parseInt(initLen / 3)
  // 国际化
  const { locale = '', messages } = lang._vm
  const { message_maxEnter = '', message_bits = '', message_bitDecimalPlaces = '' } = messages[locale] || {}

  if (val.indexOf(',') > 0) {
    // 存在千分位
    if (val.indexOf('.') > 0) {
      // 有小数
      const strArr = String(val).split('.')
      if (strArr[0].length > initLen + micNum) {
        return callback(new Error(`${message_maxEnter}${initLen}${message_bits}`))
      }
      if (strArr[1].length > floatLen) {
        return callback(new Error(`${message_maxEnter}${floatLen}${message_bitDecimalPlaces}`))
      }
      return callback()
    } else {
      // 没小数
      if (val.length > initLen + micNum) {
        return callback(new Error(`${message_maxEnter}${initLen}${message_bits}`))
      }
      return callback()
    }
  } else {
    // 不存在千分位
    const filter = new RegExp(`^[0-9]*([.][0-9]{1,${floatLen}})?$`)
    const filter1 = new RegExp(`^[0-9]{1,${initLen}}([.][0-9]{1,${floatLen}})?$`)
    // console.log(333, filter, filter.test(val))
    if (filter.test(val)) {
      if (filter1.test(val)) {
        return callback()
      } else {
        return callback(new Error(`${message_maxEnter}${initLen}${message_bits}`))
      }
    } else {
      return callback(new Error(`${message_maxEnter}${floatLen}${message_bitDecimalPlaces}`))
    }
  }
}

/**
 * 删除字符串中所有空格（包括前中后）
 * @param {*} str
 */
export function trim(str) {
  if (typeof str !== 'string') return
  return str.replace(/\s/g, '')
}
