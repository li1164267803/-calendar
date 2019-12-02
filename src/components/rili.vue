<template v-for="(item, index) in dates">
  <!-- <div class="slider">
    <div class="day" v-for="(day, dayIndex) in getDays(item.date)" :key="dayIndex">
      <p :class="{ today: day.date === defaultDate }">{{ day.date.split("-")[2] }}</p>
    </div>
  </div> -->
  <div></div>
</template>

<script>
export default {
  data() {
    return {
      dates: []
    };
  },
  computed: {
    
  },
  mounted() {
    var moment = require('moment');
    let obj = {};
    let today = moment().format('YYYY-MM-DD') // 当前日期："2018-09-14"
    let x = moment(today).subtract(7, 'd').format('YYYY-MM-DD') // 上一周的今天："2018-09-07"
    let ss = moment(today).add(7, 'd').format('YYYY-MM-DD') // 下一周的今天："2018-09-21"
    console.log(today, x, ss);
    // arr.push()
  },
  methods: {
    getDays: function(day) {
      let arr = [];
      /* 计算传进来的日期为星期几 */
      let weekOfDate = Number(moment(day).format("E"));
      // 提前定义好的： this.week = ['一', '二', '三', '四', '五', '六', '日']
      for (let i = 0; i < this.week.length; i++) {
        arr.push({
          date: moment(day)
            .subtract(weekOfDate - i - 1, "d")
            .format("YYYY-MM-DD"),
          week: this.week[i]
        });
      }
      return arr;
    }
  }
};
</script>
