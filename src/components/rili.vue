<style lang="less" scoped>
  .date-list {
    position: relative;
    z-index: 99;
    top: -.08rem;
    list-style: none;
    width: 6.74rem;
    height: .54rem;
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
    background: #F8FAFF;
    border-radius:0.27rem;
    li {
      color: #7F89A1;
      font-size:0.24rem;
      font-family:PingFangSC-Medium,PingFang SC;
      font-weight:500;
      width: .8rem;
      text-align: center;
    }
  }
  li {
    position: relative;
  }
  .dian {
      width: .1rem;
      height: .1rem;
      border-radius: 50%;
      background:rgba(216,216,216,1);
      display: inline-block;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      bottom: .05rem;
      z-index: 10;
    }
</style>
<template>
  <div>
    <div class="swiper-container">
      <div class="swiper-wrapper">
        <ul class="swiper-slide" v-for="(item,i) in currentList" :key="i" ref="ul">
          <li v-for="(k,j) in item" :key="j" @click="setCurrent(item,j, k.sendDate)">
            <span class="dian" v-show="k.today"></span>
            <span v-if="k.now" :class="{active:k.now}" class="span">{{k.showDate}}</span>
            <span v-else :class="{active:k.active}" class="span">{{k.showDate}}</span>
          </li>
        </ul>
      </div>
      <ol class="date-list">
        <li>一</li>
        <li>二</li>
        <li>三</li>
        <li>四</li>
        <li>五</li>
        <li>六</li>
        <li>日</li>
      </ol>
    </div>
    <!-- <div class="date">
      <span class="now">{{nowDate}}</span>
      <span @click="getNow">回到今天</span>
    </div> -->
  </div>
</template>
<script>
  import Swiper from 'swiper'
  import 'swiper/dist/css/swiper.min.css'
  // import tools from "@/utils/tools"

  const cathWidth = +2;
  export default {
    mounted() {
      this.init();
      // this.getSchedule();
    },
    data() {
      return {
        currentList: [],
        currentFirstDate: null,
        currentIndex: new Date().getDay(),
        nowDate:this.setNowDate(new Date()),
        timeObj: {},
        activeIndex: '0'
      }
    },
    created() {
      this.now();
    },
    methods: {
      getSchedule() { // 获取那一天有课
        let _this = this;
        let index = this.mySwiper.activeIndex;
        let params = {
          begin: this.currentList[index][0].sendDate + ' 00:00:00',
          end: this.currentList[index][6].sendDate + ' 00:00:00',
        }
        tools.get({
            url: `/subscribe/schedule?begin=${params.begin}&end=${params.end}`,
            success: res =>{
                let list = res.data.list;
                this.currentList[index].forEach(item => {
                  list.forEach(v => {
                    let day = v.day.substring(0,10).replace(/\//g, '-');
                    if(item.sendDate == day && v.status == '1') {
                      item.today = true;
                    }
                  });
                })
            },
            fail(){}
        });
      },
      formatDate(nowDate) {
        let year = nowDate.getFullYear();
        let month = (nowDate.getMonth() + 1) >= 10 ? (nowDate.getMonth() + 1) : ('0' + (nowDate.getMonth() + 1));
        let date = nowDate.getDate() >= 10 ? nowDate.getDate() : ('0' + nowDate.getDate());
        let date2 = nowDate.getDate();
        let week = ['日', '一', '二', '三', '四', '五', '六'][nowDate.getDay()];
        let obj = {
          week,
          showDate: date2,
          listDate: `${month}月${date}日 ${week}`,
          sendDate: `${year}-${month}-${date}`,
          today: false,
          now: false,
          active: false
        }
        if(obj.showDate == '01') obj.showDate = `${month}月`;
        if(nowDate.toLocaleDateString() === new Date().toLocaleDateString()) obj.now = true;
        return obj;
      },
      addDate(date, n) {
        date.setDate(date.getDate() + n);
        return date;
      },
      setDate(date) {
        let week = date.getDay();
        date = this.addDate(date, week * -1);

        this.currentFirstDate = new Date(date);
        let list = []
        for (let i = 0; i < 7; i++) {
          list.push(this.formatDate(i === 0 ? this.addDate(date, 1) : this.addDate(date, 1)));
        }
        
        return list
      },
      currentClassStatus(i, j) {
        return i === 1 && j === this.currentIndex
      },
      setCurrent(item, j, sendDate) {
        this.currentList.forEach(current => {
          current.forEach(v => {
            v.active = false;
            v.now = false;
          });
        })
        item[j].active = true;
        this.timeObj.nowDate = sendDate;
        this.$emit('dayLessons')
      },
      setNowDate(nowDate){
        let year = nowDate.getFullYear();
        let month = (nowDate.getMonth() + 1);
        let date = nowDate.getDate();
        return `${year}-${month}-${date}`;
      },
      init(){
        this.mySwiper = new Swiper('.swiper-container', {
          on: {
            slidePrevTransitionStart: () => {
              
            },
            slidePrevTransitionEnd: (e) => {
              this.activeIndex = this.mySwiper.activeIndex;
              // this.getSchedule();
            },
            slideNextTransitionStart: () => {

            },
            slideNextTransitionEnd: () => {
              // this.getSchedule();
            },
          },
        })
        this.mySwiper.slideTo(5, 0, false);
      },
      getNow(){
        if(this.mySwiper) this.mySwiper.destroy();
        this.now()
        this.nowDate=this.setNowDate(new Date())
        this.currentIndex=new Date().getDay();
        this.init();
        // this.getSchedule()
      },
      now(){
        let now = this.setDate(new Date());
        let pre = this.setDate(this.addDate(this.currentFirstDate, -7))
        let pre1 = this.setDate(this.addDate(this.currentFirstDate, -7))
        let pre2 = this.setDate(this.addDate(this.currentFirstDate, -7))
        let pre3 = this.setDate(this.addDate(this.currentFirstDate, -7))
        let pre4 = this.setDate(this.addDate(this.currentFirstDate, -7))
        let next = this.setDate(this.addDate(this.currentFirstDate, 42))  // currentFirstDate 为当前改变后的时间
        let next1 = this.setDate(this.addDate(this.currentFirstDate, 7))
        let next2 = this.setDate(this.addDate(this.currentFirstDate, 7))
        let next3 = this.setDate(this.addDate(this.currentFirstDate, 7))
        this.currentList = [pre4, pre3, pre2, pre1, pre, now, next, next1, next2, next3];
        let data = {
          begin: this.currentList[5][0].sendDate + ' 00:00:00',
          end: this.currentList[5][6].sendDate + ' 00:00:00',
        }
        
        this.currentList[5].forEach(v => {
          if(v.now) data.nowDate = v.sendDate
        });
        this.timeObj = data;
        // this.$emit('getTimeObj', data);
      }
    },
  }
</script>
<style lang="less" scoped>
  .swiper-wrapper {
    height: 1rem;
  }

  .swiper-container {
    position: relative;
    overflow: hidden;
    width: 6.74rem;
    .cateory {
      width: 20px;
      height: 16px;
      position: absolute;
      left: 0;
      bottom: -2px;
      z-index: 10;
      text-align: center;
      transition: all 0.2s ease-in;

      i {
        font-size: 12px;
        color: #ffffff;
        display: inline-block;
        vertical-align: bottom;
      }
    }
  }

  .swiper-slide {
    width: 6.74rem;
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;

    li {
      color: black;
      text-align: center;
      font-size: .36rem;
      font-family:DINAlternate-Bold,DINAlternate;
      font-weight:bold;
      width: .8rem;
      height: .78rem;
      line-height: 0.78rem;

      .span {
        // margin-top: 5px;
        display: inline-block;
      }

      .active {
        color: #ffffff;
        width:0.78rem;
        height:0.8rem;
        background:rgba(105,129,255,1);
        box-shadow:0rem 0.04rem 0.08rem 0rem rgba(105,129,255,1);
        border-radius:0.18rem 0.18rem 0rem 0rem;
      }
      
    }
  }
  .date{
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: start;
    padding: 20px 10px;
    span{
      font-size: 18px;
      &:last-of-type{
        display: inline-block;
        padding: 5px 10px;
        color: #ffffff;
        background: #4d7eff;
        border-radius: 5px;
      }
    }
  }

</style>
