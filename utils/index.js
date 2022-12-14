// 选择照片
const chooseImage = (number,type) => {
	return new Promise((resolve, reject) => {
		if(type != undefined){
			uni.chooseImage({
				count: number ? number : 1, //默认1
				sourceType : ['camera'],
				success: function(res) {
					resolve(res.tempFilePaths)
				}
			})
		}else{
			uni.chooseImage({
				count: number ? number : 1, //默认1
				success: function(res) {
					resolve(res.tempFilePaths)
				}
			})
		}
	})
}


// 上传文件
const uploadImg = function(imgSrc) {
	return new Promise((resolve, reject) => {
		uni.uploadFile({
			url: api.api.fileUploadUrl,
			name: 'file',
			filePath: imgSrc,
			header: { 'Auth': globalData.token },
			success: res => {
				uni.hideLoading()
				resolve(JSON.parse(res.data).result.id)
			},
			fail: res => {
				uni.hideLoading()
				uni.showToast({
					title: '上传失败，请重新上传',
					icon: 'none'
				})
			}
		})
	})
}

// 时间戳转换
const format = time => {
  let day = Math.floor(time / (1000 * 60 * 60 * 24))
  let hours = Math.floor((time / (1000 * 60 * 60)) % 24)
  let minutes = Math.floor((time / (1000 * 60)) % 60)
  let seconds = Math.floor((time / 1000) % 60)
  return day + '天' + hours + '小时' + minutes + '分钟' + seconds + '秒'
}

// 时间格式转换 Format("yyyy-MM-dd")/Format("MM月dd日")
const Format = function (fmt) {
  var o = {
      'M+': this.getMonth() + 1, //月份 
      'd+': this.getDate(), //日 
      'H+': this.getHours(), //小时 
      'm+': this.getMinutes(), //分 
      's+': this.getSeconds(), //秒 
      'q+': Math.floor((this.getMonth() + 3) / 3), //季度 
      'S': this.getMilliseconds() //毫秒 
  }
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length))
  for (var k in o)
  if (new RegExp('(' + k + ')').test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
  return fmt
}

// 获取富文本中的标签元素的src
const getAudio = data => {
  let List = []
  if (data) {
    data.replace(/<audio [^>]*src=['"]([^'"]+)[^>]*>/g, (match, capture) => {
      List.push(capture)
    })
  }
  return List
}

// 获取富文本中的纯文本
const getSimpleText = html => {
  let re1 = new RegExp('<.+?>', 'g')//匹配html标签的正则表达式，"g"是搜索匹配多个符合的内容
  let msg = html.replace(re1, '')//执行替换成空字符
  return msg
}

// 身份证验证
const isIDcard = value => {
  const idcardReg = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/
  if(idcardReg.test(value)) {
    return true
  } else {
    return false
  }
}

// 身份证验证
const isPhone = value => {
  const pattern = new RegExp('^1[34578][0-9]{9}$', 'i')
  if(pattern.test(value)) {
    return true
  } else {
    return false
  }
}

// 验证文本是否为空
const isNull = str => {
  if ( str == '' ) return true
  var regu = '^[ ]+$'
  var re = new RegExp(regu)
  return re.test(str)
}

// arr数组 个数数  将数组拆分为2维数组
const spliceIntoChunks = (arr, chunkSize) => {
  const res = []
  while (arr.length > 0) {
    const chunk = arr.splice(0, chunkSize)
    res.push(chunk)
  }
  return res
}

// 日期加天数的方法
// dataStr日期字符串(可以包含时分秒)
// dayCount 要增加的天数
// return 增加n天后的日期字符串
const dateAddDays = (dataStr, dayCount) => {
  var isdate = new Date(dataStr.replace(/-/g, '/')) //把日期字符串转换成日期格式
  isdate = new Date((isdate / 1000 + 86400 * dayCount) * 1000) //日期加1天
  if (isdate.getMonth() < 10 && isdate.getDate() < 10) {
    var pdate = isdate.getFullYear() + '-' + '0' + (isdate.getMonth() + 1) + '-' + '0' + isdate.getDate() //把日期格式转换成字符串 带时分秒
  } else if (isdate.getDate() < 10) {
    var pdate = isdate.getFullYear() + '-' + (isdate.getMonth() + 1) + '-' + '0' + isdate.getDate()
  } else if (isdate.getMonth() < 10) {
    var pdate = isdate.getFullYear() + '-' + '0' + (isdate.getMonth() + 1) + '-' + isdate.getDate()
  } else {
    var pdate = isdate.getFullYear() + '-' + (isdate.getMonth() + 1) + '-' + isdate.getDate() //把日期格式转换成字符串 带时分秒
  }
  //var pdate = isdate.getFullYear() + "-" + (isdate.getMonth() + 1) + "-" + (isdate.getDate()) + " " + isdate.getHours() + ":" + isdate.getMinutes() + ":" + isdate.getSeconds();;   //把日期格式转换成字符串 带时分秒
  return pdate
}

// 获取当前时间
const getTime = () => {
  var date = new Date(),
    year = date.getFullYear(),
    month = date.getMonth() + 1,
    day = date.getDate(),
    hour = date.getHours() < 10 ? '0' + date.getHours() : date.getHours(),
    minute = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes(),
    second = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
  month >= 1 && month <= 9 ? (month = '0' + month) : ''
  day >= 0 && day <= 9 ? (day = '0' + day) : ''
  // var timer = year + '-' + month + '-' + day
  var timer = year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second
  return timer
}