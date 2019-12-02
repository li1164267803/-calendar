<template>
  <div class="allServiceMarket" id="tab1">
    <!-- tab栏切换 -->

    <div class="main">
      <div class="tab-content">
        <!-- 活动日历 -->

        <div class="hpMain">
          <div id="whyDate">
            <div class="data-tab">
              <ul class="whyDataList clearfix"></ul>
            </div>
          </div>
        </div>

        <div class="recommend">为您推荐</div>

        <!-- 轮播图 -->

        <div class="wrapper">
          <swiper :options="swiperOption">
            <swiper-slide v-for="item of recommend" :key="item.id">
              <img
                class="swiper-img"
                v-lazy="item.img"
                :key="item.id"
                @click="countryBannerDetail(item.id)"
                style="width:100% !important;height: 4rem;"
              />
            </swiper-slide>
          </swiper>
        </div>

        <!-- tab1 -->

        <div class="container">
          <div class="swiper-container swiper1">
            <div class="swiper-wrapper content">
              <div class="swiper-slide selected">全部</div>

              <div class="swiper-slide">亲子</div>

              <div class="swiper-slide">公益电影</div>

              <div class="swiper-slide">培训</div>

              <div class="swiper-slide">展览</div>

              <div class="swiper-slide">拼手气</div>

              <div class="swiper-slide">演出</div>

              <div class="swiper-slide">福利</div>

              <div class="swiper-slide">秒杀</div>

              <div class="swiper-slide">聚会</div>

              <div class="swiper-slide">讲座</div>

              <div class="swiper-slide">赛事</div>
            </div>
          </div>

          <div class="cl"></div>

          <!-- swiper2 -->

          <div class="swiper-container swiper2">
            <div class="swiper-wrapper">
              <div class="swiper-slide swiper-no-swiping">
                <div style="height: 100%;width: 102%;">
                  <!-- tab详情 -->

                  <div class="tab-panel">
                    <div class="tab-panel-item tab-active">
                      <div class="aui-city-list" v-for="item in queryLists" :key="item.id">
                        <div
                          class="aui-city-item"
                          v-if="queryLists.length >0"
                          @click="venueDetail(item.id,item.isSecondkill)"
                        >
                          <img :src="item.img" />
                        </div>

                        <div class="tagWrap">
                          <span class="tag" v-for="site in item.tags" :key="site.index">{{site}}</span>
                        </div>

                        <div class="aui-city-text">
                          <h2>{{item.title}}</h2>

                          <p>{{item.startDate}}|{{item.venueName}}</p>

                          <span class="payTag" v-if="item.isPay == false">免&nbsp;费</span>

                          <span class="payTag" v-else>秒&nbsp;杀</span>
                        </div>
                      </div>

                      <div v-show="queryLists.length == ''">没有找到合适结果，换个试试看吧~</div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="swiper-slide swiper-no-swiping">
                <div class="aui-city-list" v-for="item in queryLists" :key="item.id">
                  <div
                    class="aui-city-item"
                    v-if="queryLists.length >0"
                    @click="venueDetail(item.id,item.isSecondkill)"
                  >
                    <img :src="item.img" />
                  </div>

                  <div class="tagWrap">
                    <span class="tag" v-for="site in item.tags" :key="site.index">{{site}}</span>
                  </div>

                  <div class="aui-city-text">
                    <h2>{{item.title}}</h2>

                    <p>{{item.startDate}}|{{item.venueName}}</p>

                    <span class="payTag" v-if="item.isPay == false">免&nbsp;费</span>

                    <span class="payTag" v-else>秒&nbsp;杀</span>
                  </div>
                </div>

                <div v-show="queryLists.length == ''">没有找到合适结果，换个试试看吧~</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      swiperOption: {
        pagination: ".swiper-pagination",

        slidesPerView: 2,

        spaceBetween: 10,

        loop: false
      },

      items: {},

      queryLists: [],

      recommend: []
    };
  },

  mounted() {
    this.lastDay();

    this.week();

    this.numOfDigits();

    this.mydate();

    this.queryActivitieCalendar();

    this.getSwiper();

    this.date();

    this.selected();

    this.recommendData();
  },

  components: {},

  methods: {
    lastDay(num) {
      var nowMon = new Date();

      //num为月份数：0为上个月，1为当前月，2为下个月，3为下下月，以此类推;如为负数则往前推

      //d.getMonth()+1代表下个月，月份索引从0开始，即当前月为6月时，getMonth()返回值为5，创建日期时同理

      //此处构造的日期为下个月的第0天，天数索引从1开始，第0天即代表上个月的最后一天

      var curMonthDays = new Date(
        nowMon.getFullYear(),

        nowMon.getMonth() + num,

        0
      ).getDate();

      return curMonthDays;
    },

    week(num) {
      if (num == 1) return "一";
      else if (num == 2) return "二";
      else if (num == 3) return "三";
      else if (num == 4) return "四";
      else if (num == 5) return "五";
      else if (num == 6) return "六";
      else if (num == 7 || num == 0) return "日";
    },

    numOfDigits(num) {
      if (num < 10) {
        return "0" + num;
      } else {
        return num;
      }
    },

    mydate() {
      $(function() {
        var number = "&nbsp;";

        var dayWeek = 0;

        var num_week = 0;

        var now_data = new Date();

        var now_mon = now_data.getMonth() + 1;

        var mon_id = 1;

        var now_year = now_data.getFullYear();

        for (var i = 1; i <= 1; i++) {
          //暂时改成一个月，会报错error,i<=2,就不会报错

          if (i == 1) {
            var overplus = now_data.getDate();

            //上一个星期天是几号

            var lastMonOverplus = overplus - now_data.getDay();

            if (num_week == 0) {
              //今天不是星期天时

              if (now_data.getDay() != 0) {
                //上个星期天为上个月

                if (lastMonOverplus <= 0) {
                  //上个月最后一个星期天是几号

                  var lastMonLastDay = lastDay(0) + lastMonOverplus;

                  for (; lastMonLastDay <= lastDay(0); lastMonLastDay++) {
                    $(".data-tab .whyDataList ").append(
                      "<li class='dateOut'>" +
                        "<div class='whyDataWeek'>" +
                        week(dayWeek) +
                        "</div>" +
                        "<div class='whyDataDay whyDataOutDay'>" +
                        lastMonLastDay +
                        "</div>" +
                        "<div class='dataNum'>" +
                        number +
                        "</div>" +
                        "</li>"
                    );

                    dayWeek++;

                    if (dayWeek > 7) dayWeek = 1;
                  }

                  //今天不为星期天，昨天为本月

                  if (overplus - 1 > 0) {
                    for (var b = 1; b <= overplus - 1; b++) {
                      $(".data-tab .whyDataList ").append(
                        "<li class='dateOut'>" +
                          "<div class='whyDataWeek'>" +
                          week(dayWeek) +
                          "</div>" +
                          "<div class='whyDataDay whyDataOutDay'>" +
                          b +
                          "</div>" +
                          "<div class='dataNum'>" +
                          number +
                          "</div>" +
                          "</li>"
                      );

                      dayWeek++;

                      if (dayWeek > 7) dayWeek = 1;
                    }
                  }

                  //今天开始往后的剩余天

                  for (; overplus <= lastDay(1); overplus++) {
                    $(".data-tab .whyDataList ").append(
                      "<li date='" +
                        now_year +
                        "-" +
                        numOfDigits(now_mon) +
                        "-" +
                        numOfDigits(overplus) +
                        "'>" +
                        "<div class='whyDataWeek'>" +
                        week(dayWeek) +
                        "</div>" +
                        "<div class='whyDataDay'>" +
                        overplus +
                        "</div>" +
                        "<div class='dataNum'>" +
                        number +
                        "</div>" +
                        "</li>"
                    );

                    dayWeek++;

                    if (dayWeek > 7) dayWeek = 1;
                  }

                  num_week++;
                } else {
                  //今天为星期天

                  for (
                    var Dvalue = now_data.getDate() - now_data.getDay();
                    Dvalue <= now_data.getDate();
                    Dvalue++
                  ) {
                    //把昨天之前的天数置灰

                    if (Dvalue < now_data.getDate()) {
                      $(".data-tab .whyDataList ").append(
                        "<li class='dateOut'>" +
                          "<div class='whyDataWeek'>" +
                          week(dayWeek) +
                          "</div>" +
                          "<div class='whyDataDay whyDataOutDay'>" +
                          Dvalue +
                          "</div>" +
                          "<div class='dataNum'>" +
                          number +
                          "</div>" +
                          "</li>"
                      );
                    } else {
                      $(".data-tab .whyDataList ").append(
                        "<li date='" +
                          now_year +
                          "-" +
                          numOfDigits(now_mon) +
                          "-" +
                          numOfDigits(Dvalue) +
                          "'>" +
                          "<div class='whyDataWeek'>" +
                          week(dayWeek) +
                          "</div>" +
                          "<div class='whyDataDay'>" +
                          Dvalue +
                          "</div>" +
                          "<div class='dataNum'>" +
                          number +
                          "</div>" +
                          "</li>"
                      );
                    }

                    dayWeek++;

                    if (dayWeek > 7) dayWeek = 1;
                  }

                  //今天开始往后的剩余天

                  if (overplus - 1 > 0) {
                    for (var a = overplus + 1; a <= lastDay(1); a++) {
                      $(".data-tab .whyDataList ").append(
                        "<li date='" +
                          now_year +
                          "-" +
                          numOfDigits(now_mon) +
                          "-" +
                          numOfDigits(a) +
                          "'>" +
                          "<div class='whyDataWeek'>" +
                          week(dayWeek) +
                          "</div>" +
                          "<div class='whyDataDay'>" +
                          a +
                          "</div>" +
                          "<div class='dataNum'>" +
                          number +
                          "</div>" +
                          "</li>"
                      );

                      dayWeek++;

                      if (dayWeek > 7) dayWeek = 1;
                    }
                  }
                }
              } else {
                //今天是星期天

                for (var sun = now_data.getDate(); sun <= lastDay(i); sun++) {
                  $(".data-tab .whyDataList ").append(
                    "<li date='" +
                      now_year +
                      "-" +
                      numOfDigits(now_mon) +
                      "-" +
                      numOfDigits(sun) +
                      "'>" +
                      "<div class='whyDataWeek'>" +
                      week(dayWeek) +
                      "</div>" +
                      "<div class='whyDataDay'>" +
                      sun +
                      "</div>" +
                      "<div class='dataNum'>" +
                      number +
                      "</div>" +
                      "</li>"
                  );

                  dayWeek++;

                  if (dayWeek > 7) dayWeek = 1;
                }
              }
            }

            //给今天加上标记圆圈

            $(".whyDataDay").each(function() {
              if ($(this).text() == now_data.getDate()) {
                $(this).addClass("whyToday");
              }
            });
          } else {
            //下两个月的日期

            for (var day = 1; day <= lastDay(i); day++) {
              $(".data-tab .whyDataList ").append(
                "<li date='" +
                  now_year +
                  "-" +
                  numOfDigits(now_mon) +
                  "-" +
                  numOfDigits(day) +
                  "'>" +
                  "<div class='whyDataWeek'>" +
                  week(dayWeek) +
                  "</div>" +
                  "<div class='whyDataDay'>" +
                  day +
                  "</div>" +
                  "<div class='dataNum'>" +
                  number +
                  "</div>" +
                  "</li>"
              );

              dayWeek++;

              if (dayWeek > 7) dayWeek = 1;
            }
          }

          $(".data-tab .whyDataList").append(
            "<input type='hidden' value='" +
              now_mon +
              "' id = 'mon" +
              mon_id +
              "'/>"
          );

          mon_id++;

          now_mon++;

          if (now_mon > 12) {
            now_mon = 1;

            now_year += 1;
          }
        }

        var li_num = $(".data-tab .whyDataList li").length;

        $(".whyDataList").css("width", li_num * 100);

        //初始化

        $(".whyDataList li")
          .not(".dateOut")

          .click(function() {
            $(".whyDataList li")
              .find(".whyDataDay")

              .removeClass("nowClick");

            $(this)
              .find(".whyDataDay")

              .addClass("nowClick");
          });

        var nowDate = new Date();

        $("#nowYear").text(nowDate.getFullYear());

        $("#nowMon").text(nowDate.getMonth() + 1);

        $(".data-tab").scroll(function() {
          if (
            $("#mon1")
              .next("li")

              .offset().left >= 0
          ) {
            $("#nowMon").text(nowDate.getMonth() + 1);

            $("#nowYear").text(nowDate.getFullYear());
          } else if (
            $("#mon1")
              .next("li")

              .offset().left < 0 &&
            $("#mon2")
              .next("li")

              .offset().left >= 0
          ) {
            if (nowDate.getMonth() + 1 == 11) {
              $("#nowMon").text(12);

              $("#nowYear").text(nowDate.getFullYear());
            } else if (nowDate.getMonth() + 1 == 12) {
              $("#nowMon").text(1);

              $("#nowYear").text(nowDate.getFullYear() + 1);
            } else {
              $("#nowMon").text(nowDate.getMonth() + 2);
            }
          } else {
            if (nowDate.getMonth() + 1 == 11) {
              $("#nowMon").text(1);

              $("#nowYear").text(nowDate.getFullYear() + 1);
            } else if (nowDate.getMonth() + 1 == 12) {
              $("#nowMon").text(2);

              $("#nowYear").text(nowDate.getFullYear() + 1);
            } else {
              $("#nowMon").text(nowDate.getMonth() + 3);
            }
          }
        });
      });
    },

    getSwiper() {
      let that = this;

      $(function() {
        function setCurrentSlide(ele, index) {
          $(".swiper1 .swiper-slide").removeClass("selected");

          ele.addClass("selected");

          let queryList = "";

          let queryList1 = $(".whyToday")
            .next()

            .attr("id");

          let tag = $(".selected").html();

          let queryList2 = $(".nowClick")
            .next()

            .attr("id");

          if (!queryList2) {
            queryList = queryList1;
          } else {
            queryList = queryList2;
          }

          function queryActivitieList(queryList, tag) {
            var startDate = "";

            var date = new Date();

            //年

            var year = date.getFullYear();

            //月

            var month = date.getMonth() + 1;

            //日

            var day = date.getDate();

            if (!queryList) {
              startDate = year + "-" + month + "-" + day;
            } else {
              startDate = queryList;
            }

            $.ajax({
              headers: { "Content-Type": "application/json;charset=utf8" },

              url: "http://api/cultural/open/query-activitie-list", //json文件位置，文件名

              type: "post", //请求方式为get

              data: JSON.stringify({
                activitiesType: tag,

                pageNum: 1,

                pageSize: 100,

                startDate: startDate,

                theme: 0
              }),

              success: function(response) {
                if (response.code == "200") {
                  //请求成功完成后要执行的方法

                  that.queryLists = response.result.rows;
                }
              }
            });
          }

          queryActivitieList(queryList, tag);
        }

        var swiper1 = new Swiper(".swiper1", {
          //设置slider容器能够同时显示的slides数量(carousel模式)。

          //可以设置为number或者 'auto'则自动根据slides的宽度来设定数量。

          //loop模式下如果设置为'auto'还需要设置另外一个参数loopedSlides。

          slidesPerView: 5.5,

          paginationClickable: true, //此参数设置为true时，点击分页器的指示点分页器会控制Swiper切换。

          spaceBetween: 10, //slide之间的距离（单位px）。

          freeMode: true, //默认为false，普通模式：slide滑动时只滑动一格，并自动贴合wrapper，设置为true则变为free模式，slide会根据惯性滑动且不会贴合。

          loop: false, //是否可循环

          onTab: function(swiper) {
            var n = swiper1.clickedIndex;
          }
        });

        swiper1.slides.each(function(index, val) {
          var ele = $(this);

          ele.on("click", function() {
            setCurrentSlide(ele, index);

            swiper2.slideTo(index, 500, false);
          });
        });

        var swiper2 = new Swiper(".swiper2", {
          //freeModeSticky 设置为true 滑动会自动贴合

          direction: "horizontal", //Slides的滑动方向，可设置水平(horizontal)或垂直(vertical)。

          loop: false,

          autoHeight: true, //自动高度。设置为true时，wrapper和container会随着当前slide的高度而发生变化。

          onSlideChangeEnd: function(swiper) {
            //回调函数，swiper从一个slide过渡到另一个slide结束时执行。

            var n = swiper.activeIndex;

            setCurrentSlide($(".swiper1 .swiper-slide").eq(n), n);

            swiper1.slideTo(n, 500, false);
          }
        });
      });
    },

    queryActivitieCalendar() {
      let that = this;

      this.$HttpUtil

        .post("/cultural/open/query-activitie-calendar", {
          pageNum: 1,

          pageSize: 100
        })

        .then(function(response) {
          that.items = response.data.result;

          if (response.data.code == "200") {
            for (var key in that.items) {
              $("#" + key).html(that.items[key] + "场");
            }
          }
        })

        .catch(function(error) {});
    },

    date() {
      var that = this;

      $(function() {
        //给数值位添加id

        $(".whyDataList li").each(function() {
          $(this)
            .find("div.dataNum")

            .attr("id", $(this).attr("date"));
        });

        function queryActivitieList() {
          var startDate = "";

          var date = new Date();

          //年

          var year = date.getFullYear();

          //月

          var month = date.getMonth() + 1;

          //日

          var day = date.getDate();

          startDate = year + "-" + month + "-" + day;

          $.ajax({
            headers: { "Content-Type": "application/json;charset=utf8" },

            url: "http://api/cultural/open/query-activitie-list", //json文件位置，文件名

            type: "post", //请求方式为get

            data: JSON.stringify({
              pageNum: 1,

              pageSize: 100,

              startDate: startDate,

              theme: 0
            }),

            success: function(response) {
              //请求成功完成后要执行的方法

              if (response.code == "200") {
                that.queryLists = response.result.rows;
              }
            }
          });
        }

        queryActivitieList();
      });
    },

    selected() {
      var that = this;

      var tag = "";

      $(function() {
        function queryActivitieList(startDate, tag) {
          $.ajax({
            headers: { "Content-Type": "application/json;charset=utf8" },

            url: "http://api/cultural/open/query-activitie-list", //json文件位置，文件名

            type: "post", //请求方式为get

            data: JSON.stringify({
              activitiesType: tag,

              pageNum: 1,

              pageSize: 100,

              startDate: startDate,

              theme: 0
            }),

            success: function(response) {
              //请求成功完成后要执行的方法

              if (response.code == "200") {
                that.queryLists = response.result.rows;
              }
            }
          });
        }

        //添加时间点击事件

        $(".whyDataList li")
          .not(".dateOut")

          .on("click", function() {
            var startDate = $(this).attr("date");

            tag = $(".selected").html();

            queryActivitieList(startDate, tag);
          });
      });
    },

    recommendData() {
      let that = this;

      $.ajax({
        headers: { "Content-Type": "application/json;charset=utf8" },

        url: "http://api/cultural/open/query-activitie-list", //json文件位置，文件名

        type: "post", //请求方式为get

        data: JSON.stringify({
          isRecommend: true,

          pageNum: 1,

          pageSize: 100,

          theme: 0
        }),

        success: function(response) {
          //请求成功完成后要执行的方法

          if (response.code == "200") {
            that.recommend = response.result.rows;
          }
        }
      });
    },

    venueDetail(id, isSecondkill) {
      if (isSecondkill == false) {
        this.$router.push({
          name: "culturalDetail",

          query: {
            id: id
          }
        });
      } else {
        this.$router.push({
          name: "seckill",

          query: {
            id: id
          }
        });
      }
    },

    countryBannerDetail(id) {
      this.$router.push({
        name: "culturalDetail",

        query: {
          id: id
        }
      });
    }
  }
};
</script>

 

<style lang="less" scoped>
.allServiceMarket {
  .todayNewsContent {
    padding: 10px 0;
  }

  .recommend {
    font-size: 0.65rem;

    margin: 0.8rem;

    text-align: center;
  }

   

//九宫格

.sudoName {
    font-size: 0.75rem;
  }

  .sudoAddress {
    font-size: 0.5rem;
  }

  .sudoku_row {
    display: flex;

    align-items: center;

    width: 100%;

    flex-wrap: wrap;
  }

  .sudoku_item {
    display: flex;

    justify-content: center;

    align-items: center;

    flex-direction: column;

    width: 50%;

    padding-top: 10px;

    padding-bottom: 10px;
  }

  .sudoku_item img {
    width: 8.5rem;

    height: 5rem;

    margin-bottom: 3px;

    display: block;
  }

   

//swiper切换效果

body {
    min-width: 320px;

    max-width: 640px;

    margin: 0 auto;

    color: #333;

    padding: 0;

    font-family: "Microsoft Yahei";

    text-align: center;
  }

  .container {
  }

  .swiper1 {
    width: 100%;
  }

  .swiper1 .selected {
    color: rgb(126, 211, 33);
  }

  .swiper1 .swiper-slide {
    text-align: center;

    font-size: 0.65rem;

    height: 1.5rem;

    /* Center slide text vertically */

    display: -webkit-box;

    display: -ms-flexbox;

    display: -webkit-flex;

    display: flex;

    -webkit-box-pack: center;

    -ms-flex-pack: center;

    -webkit-justify-content: center;

    justify-content: center;

    -webkit-box-align: center;

    -ms-flex-align: center;

    -webkit-align-items: center;

    align-items: center;

    cursor: pointer;
  }

  .swiper2 {
    width: 100%;
  }

  .swiper2 .swiper-slide {
    height: calc(100vh - 50px);

    text-align: center;

    box-sizing: border-box !important;

    overflow-x: hidden !important;
  }

  .swiper2 {
    background: #fcfafa;
  }
}
</style>
————————————————
版权声明：本文为CSDN博主「gaolei_eit」的原创文章，遵循 CC 4.0 BY-SA 版权协议，转载请附上原文出处链接及本声明。
原文链接：https://blog.csdn.net/weixin_39428080/article/details/99976802