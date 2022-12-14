// 正式环境
const url = 'https://xhayg.qdlimap.cn:3030/xhayg/rest'
let api = {}
// 上传
api.fileUploadUrl = url + '/sysFile/upload' // 文件上传
api.getImgSrc = url + '/sysFile/load/?fileId=' // 图片路径
api.uploadVideo = url+ '/sysFile/uploadVideo' // 视频文件上传
api.videoSrc = url

export default{ api }
