<template>
  <view class="index">
    <view class="index-tips">
      <u-count-down
        ref="countDown"
        :time="data.time"
        format="HH:mm:ss"
        :autoStart="true"
        @finish="changeTips"
      >
      </u-count-down>
      <view class="index-tips-content">
        {{data.tipContent}}
      </view>
    </view>
    <view class="index-sign">
      万事开头难，中间和最后更难！
    </view>
    <view class="index-classify">
      <view class="">
        我的喜欢
      </view>
      <view class="">
        <u-swiper
          :list="dict.swiperList"
          :autoplay="true"
          previousMargin="80"
          nextMargin="80"
          circular
          radius="15"
          bgColor="#ffffff"
          imgMode="aspectFit"
        ></u-swiper>
      </view>
    </view>
<!--    <view class="index-main-warp" @click="clickMenu">
      <view class="index-main rotate">
        <image
          src="../../static/images/index/icon-wrap.png"
          mode="aspectFill">
        </image>
       <image
          class="index-img-warp"
          src="../../static/images/index/icon-wraps.png"
          mode="aspectFill">
        </image>
      </view>
      <view class="index-main-content">
        {{data.dishes ? data.dishes : '今晚吃啥?'}}
      </view>
    </view> -->
  </view>
  
</template>

<script>
  import { menus } from './config.js'
	export default {
		data() {
			return {
        data: {
          value1: 0,
          time: 0,
          dishes: '',
          tipContent: '划完下班辣!'
        },
        dict: {
          menus: menus,
          swiperList: [
          ]
        },
        status: { isHide: false }
      }
		},
		onLoad() {
      this.getTime()
      this.dict.swiperList = []
      let imgSrc = this.$http.api.getImgSrc
      let arr = ['1602860539791384577', '1602866018034753537', '1602866076868255746']
      arr.forEach(item => {
        this.dict.swiperList.push(imgSrc + item)
      })
      console.log(this.dict.swiperList)
		},
		methods: {
      changeTips () {
        this.data.tipContent = '芜湖！下班辣下班辣！'
      },
      getTime () {
        let [hours, minutes] = [18 - new Date().getHours(), 60 - new Date().getMinutes()]
        if (hours > 1 ) {
          this.data.time = hours * 60 * 60 * 1000 + minutes * 60 * 1000
        } else if (hours === 1) {
          this.data.time = minutes * 60 * 1000
        } else {
          this.data.time = 0
          this.data.tipContent = '芜湖！下班辣下班辣！'
        }
      },
      clickMenu () {
        this.data.dishes = this.dict.menus[Math.floor((Math.random() * this.dict.menus.length))]
      }
    }
	}
</script>

<style lang="scss" scoped>
  .index {
    width: 100%;
    min-height: 100%;
    box-sizing: border-box;
    overflow: hidden;
    background: linear-gradient(45deg, rgba(254,172,94,0.5), rgba(199,121,208,0.5), rgba(75,192,200,0.5));
    .index-tips {
      width: 100%;
      height: 85rpx;
      font-weight: 600;
      font-size: 16px;
      display: flex;
      justify-content: flex-start;
      align-items: flex-end;
      line-height: 32rpx;
      padding: 0 26rpx;
      .index-tips-content {
        margin-left: 30rpx;
      }
    }
    .index-sign {
      color: #afa38e;
      font-size: 12px;
      margin-top: 20rpx;
      padding: 0 26rpx;
    }
    .index-classify {
      width: 100%;
      height: 800rpx;
      padding: 80rpx 60rpx;
      box-sizing: border-box;
      border-radius: 80rpx 80rpx 0 0 ;
      background-color: #fff;
      font-size: 28px;
      font-weight: 700;
      color: #282B4F;
    }
    .index-main-warp {
      width: 600rpx;
      height: 600rpx;
      padding: 0 26rpx;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      .index-main {
        width: 100%;
        height: 100%;
        .index-img-warp {
          position: absolute;
          top: 0;
          left: 0;
        }
      }
      .index-main-content {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 3;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 25px;
        
      }
      .rotate {
        animation: rotate 20s linear infinite;
      }
    }
  }
  /* 旋转 */
  @keyframes rotate {
    0% {
      transform-origin: center;
      transform: rotate(0deg);
    }
    100% {
      transform-origin: center;
      transform: rotate(360deg);
    }
  }
</style>
<style>
  ::v-deep.u-count-down__text {
    font-size: 28px !important;
  }
</style>
