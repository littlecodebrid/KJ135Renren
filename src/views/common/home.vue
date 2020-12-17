<!--
<template>
  <div class="mod-home">
    <div class="z-body animated fadeIn">
        <blockquote class="layui-elem-quote">您好，
            <span><shiro:principal property="username"/></span>！当前时间: {{new Date().toString('yyyy-MM-dd HH:mm:ss') }}</blockquote>
        <fieldset class="layui-elem-field">
            <legend>数据统计</legend>
            <div class="layui-field-box">
                <div class="layui-col-md12">
                    <div class="layui-card">
                        <div class="layui-card-body">
                            <div class="layui-carousel z-admin-carousel z-admin-backlog" lay-anim="" lay-indicator="inside" lay-arrow="none" style="width: 100%; height: 90px;">
                                <div carousel-item="">
                                    <ul class="layui-row layui-col-space10 layui-this">
                                        <li class="layui-col-xs2">
                                            <a href="#" onclick="openTab('用户管理', '/user/index')" class="z-admin-backlog-body">
                                                <h3>用户数</h3>
                                                <p>
                                                    <cite th:text="${userCount}"></cite>
                                                </p>
                                            </a>
                                        </li>
                                        <li class="layui-col-xs2">
                                            <a href="#" onclick="openTab('角色管理', '/role/index')" class="z-admin-backlog-body">
                                                <h3>角色数</h3>
                                                <p>
                                                    <cite th:text="${roleCount}"></cite>
                                                </p>
                                            </a>
                                        </li>
                                        <li class="layui-col-xs2">
                                            <a href="#" onclick="openTab('菜单管理', '/menu/index')" class="z-admin-backlog-body">
                                                <h3>菜单数</h3>
                                                <p>
                                                    <cite th:text="${menuCount}"></cite>
                                                </p>
                                            </a>
                                        </li>
                                        <li class="layui-col-xs2">
                                            <a href="#" onclick="openTab('登录日志', '/log/login/index')" class="z-admin-backlog-body">
                                                <h3>登录日志</h3>
                                                <p>
                                                    <cite th:text="${loginLogCount}"></cite>
                                                </p>
                                            </a>
                                        </li>
                                        <li class="layui-col-xs2">
                                            <a href="#" onclick="openTab('操作日志', '/log/sys/index')" class="z-admin-backlog-body">
                                                <h3>操作日志</h3>
                                                <p>
                                                    <cite th:text="${sysLogCount}"></cite>
                                                </p>
                                            </a>
                                        </li>
                                        <li class="layui-col-xs2">
                                            <a href="#" onclick="openTab('在线人数', '/online/index')" class="z-admin-backlog-body">
                                                <h3>在线人数</h3>
                                                <p>
                                                    <cite th:text="${userOnlineCount}"></cite>
                                                </p>
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </fieldset>
        <fieldset class="layui-elem-field">
            <legend>最近登录</legend>
            <div class="layui-field-box">
                <div id="main" style="width: 100%;height:400px;"></div>
            </div>
        </fieldset>
    </div>

  </div>
</template>

<script>
  export default {
    methods:{
      dateFormat(fmt, date) {
      var o = {
          "M+": date.getMonth() + 1,                      //月份
          "d+": date.getDate(),                           //日
          "h+": date.getHours(),                          //小时
          "m+": date.getMinutes(),                        //分
          "s+": date.getSeconds(),                        //秒
          "q+": Math.floor((date.getMonth() + 3) / 3),    //季度
          "S": date.getMilliseconds()                     //毫秒
      };
      if (/(y+)/.test(fmt))
          fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
      for (var k in o)
          if (new RegExp("(" + k + ")").test(fmt))
              fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
      return fmt;
  },

    /**
     * 公共打开父页面 tab 方法.
     * @param title
     * @param url
     */
    openTab(title, url) {
        
    }
    }
  }
</script>

<style>
  .mod-home {
    line-height: 1.5;
  }
</style>

-->
<template>
  <div>
    <el-row>
      <el-col :span="24" class="grid-content">
        <div>
          <h2 class="head">我是标题</h2>
        </div>
      </el-col>
    </el-row>
    <el-row style="background: #4682B4">
      <el-col align="center" :span="12"><div calss="grid-content bg-purple" id="main1" style="width: 300px;height: 300px;"></div></el-col>
      <el-col align="center" :span="12"><div calss="grid-content bg-purple" id="main2" style="width: 300px;height: 300px;"></div></el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="6" class="grid-content">
        <div>
          <h3>我是1</h3>
        </div>
      </el-col>
      <el-col :span="6" class="grid-content">
        <div>
          <h3>我是2</h3>
        </div>
      </el-col>
      <el-col :span="6" class="grid-content">
        <div>
          <h3>我是3</h3>
        </div>
      </el-col>
      <el-col :span="6" class="grid-content">
        <div>
          <h3>我是4</h3>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24" class="grid-content">
        <div>
          <h2 class="end">我是底部</h2>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  methods:{
    drawChart1(){
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById('main1'))
      // 绘制图表
      let option = {
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          data: [120, 200, 150, 80, 70, 110, 130],
          type: 'bar',
          showBackground: true,
          backgroundStyle: {
            color: 'rgba(220, 220, 220, 0.8)'
          }
        }]
      };
      //使用指定的配置项和数据显示图表
      myChart.setOption(option);
    },
    drawChart2(){
      let myChart = this.$echarts.init(document.getElementById('main2'))
      let option={
        //backgroundColor: '#2c343c',

        title: {
          text: 'Customized Pie',
          left: 'center',
          top: 20,
          textStyle: {
            color: '#ccc'
          }
        },

        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },

        visualMap: {
          show: false,
          min: 80,
          max: 600,
          inRange: {
            colorLightness: [0, 1]
          }
        },
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: '55%',
            center: ['50%', '50%'],
            data: [
              {value: 335, name: '直接访问'},
              {value: 310, name: '邮件营销'},
              {value: 274, name: '联盟广告'},
              {value: 235, name: '视频广告'},
              {value: 400, name: '搜索引擎'}
            ].sort(function (a, b) { return a.value - b.value; }),
            roseType: 'radius',
            label: {
              color: 'rgba(255, 255, 255, 0.3)'
            },
            labelLine: {
              lineStyle: {
                color: 'rgba(255, 255, 255, 0.3)'
              },
              smooth: 0.2,
              length: 10,
              length2: 20
            },
            itemStyle: {
              color: '#c23531',
              shadowBlur: 200,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            },

            animationType: 'scale',
            animationEasing: 'elasticOut',
            animationDelay: function (idx) {
              return Math.random() * 200;
            }
          }
        ]
      };
      myChart.setOption(option);
    }
  },
  mounted(){
    this.drawChart1();
    this.drawChart2();
  },
}
</script>

<style>
.head{
  text-align: center;
  background-color:	#5F9EA0 ;
  height: 40px;
}
h3{
  text-align: center;
  background-color: #3CB371 ;
  height: 160px;
}
.end{
  text-align: center;
  background-color:	#2F4F4F;
  height: 30px;
}
</style>
