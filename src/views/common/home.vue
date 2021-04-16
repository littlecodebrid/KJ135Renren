<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="8">
        <el-card shadow="hover" class="mgb20" style="height:252px;">
          <div class="user-info">

<!--            <img  src="~@/assets/img/avatar.png" class="user-avator" alt />-->
            <div class="user-info-cont">
              <div class="user-info-name">当前登录用户：admin</div>
              <div class="user-info-name">{{ name }}</div>
              <!--<div>{{ role }}</div>-->
            </div>
          </div>
          <div class="user-info-list">
            上次登录时间：<span>{{new Date().toString('yyyy-MM-dd') }}</span>
          </div>
          <div class="user-info-list">
            上次登录地点：
            <span>北京</span>
          </div>
        </el-card>
        <el-card shadow="hover" style="height:252px;">
          <template #header>
            <div class="clearfix">
              <span>任务统计（月）</span>
            </div>
          </template>
          <el-input v-model="monthTotalNum" hidden></el-input>
          <el-input v-model="monthSuccNum" hidden></el-input>
          <el-input v-model="monthRejecNum" hidden></el-input>
          <el-input v-model="monthFailNum" hidden></el-input>
          本月成功任务
          <el-progress :percentage="setProgress(monthSuccNum,monthTotalNum)" color="#42b983"></el-progress>
          本月拒绝任务
          <el-progress :percentage="setProgress(monthRejecNum,monthTotalNum)" color="#f1e05a"></el-progress>
          <!--执行中任务
          <el-progress :percentage="13.7"></el-progress>-->
          失败任务
          <el-progress :percentage="setProgress(monthFailNum,monthTotalNum)" color="#f56c6c"></el-progress>
        </el-card>
      </el-col>
      <el-col :span="16">
        <el-row :gutter="20" class="mgb20">
          <el-col :span="8">
            <el-card shadow="hover" :body-style="{ padding: '0px' }">
              <div class="grid-content grid-con-1">
                <i class="el-icon-user-solid grid-con-icon"></i>
                <div class="grid-cont-right">
                  <div class="grid-num">{{succNum}}</div>
                  <div>成功任务量</div>
                </div>
              </div>

            </el-card>
          </el-col>
          <el-col :span="8">
            <el-card shadow="hover" :body-style="{ padding: '0px' }">
              <div class="grid-content grid-con-2">
                <i class="el-icon-message-solid grid-con-icon"></i>
                <div class="grid-cont-right">
                  <div class="grid-num">{{rejectNum}}</div>
                  <div>拒绝任务</div>
                </div>
              </div>
            </el-card>
          </el-col>
          <el-col :span="8">
            <el-card shadow="hover" :body-style="{ padding: '0px' }">
              <div class="grid-content grid-con-3">
                <i class="el-icon-s-goods grid-con-icon"></i>
                <div class="grid-cont-right">
                  <div class="grid-num">{{errorNum}}</div>
                  <div>失败任务量</div>
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row>
        <el-card shadow="hover" style="height:403px;">
          <template #header>
            <div class="clearfix">
              <span>任务详细信息</span>
         <!--     <el-button style="float: right; padding: 3px 0" type="text">添加</el-button>-->
            </div>
          </template>
          <el-table
            :data="dataList"
            border
            v-loading="dataListLoading"
            style="width: 100%;">
            <el-table-column
              prop="taskSerialNumber"
              header-align="center"
              align="center"
              width="300"
              label="任务单号">
            </el-table-column>
            <el-table-column
              prop="satelliteName"
              header-align="center"
              align="center"
              label="卫星名">
            </el-table-column>
            <el-table-column
              prop="createdTime"
              header-align="center"
              align="center"
              label="创建时间">
            </el-table-column>
            <el-table-column
              prop="constatus"
              header-align="center"
              align="center"
              label="任务状态" >
            </el-table-column>
            <el-table-column
              prop="constatusMessage"
              header-align="center"
              align="center"
              label="描述">
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="12">
        <el-card shadow="hover">
          <schart ref="bar" class="schart" canvasId="bar" :options="options"></schart>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card shadow="hover">
          <schart ref="line" class="schart" canvasId="line" :options="options2"></schart>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import Schart from "vue-schart";
  export default {
    name: "home",
    data() {
      return {
        name: localStorage.getItem("ms_username"),
        dataList: [],
        dataListLoading: false,
        succNum:0,
        rejectNum:0,
        errorNum:0,
        monthTotalNum:0,
        monthSuccNum:0,
        monthRejecNum:0,
        monthFailNum:0,
        options: {
          type: "bar",
          title: {
            text: "最近七天数据量统计图(TB)"
          },
          xRorate: 25,
          labels: [],
          datasets: [
            {
              label: "原始",
              data: []
            },
            {
              label: "归档",
              data: []
            },
            {
              label: "快视",
              data: []
            }
          ]
        },
        options2: {
          type: "line",
          title: {
            text: "最近几个月任务状态趋势图"
          },
          labels: [],
          datasets: [
            {
              label: "成功",
              data: []
            },
            {
              label: "拒绝",
              data: []
            },
            {
              label: "失败",
              data: []
            }
          ]
        }
      };
    },
    components: {
      Schart
    },
    activated () {
      this.getTaskList("Rejected")
      this.getMonthTask()
      this.getDataNumber()
      this.getSomeMonthAnalysis()
    },
  /*  computed: {
      role() {
        return this.name === "admin" ? "超级管理员" : "超级管理员";
      }
    },*/

    methods: {
      changeDate() {
        const now = new Date().getTime();
        this.data.forEach((item, index) => {
          const date = new Date(now - (6 - index) * 86400000);
          item.name = `${date.getFullYear()}/${date.getMonth() +
          1}/${date.getDate()}`;
        });
      },
      //todo 计算百分比
      setProgress(littleNumber,totalNumer){
        if (littleNumber>totalNumer){
          return 100;
        }else if(littleNumber==0){
          return 0;
        } else {
          return parseInt((littleNumber/totalNumer).toFixed(1)*100)
        }
      },

      //todo 获取任务详细信息
      getTaskList(constatus){
        this.dataListLoading = true
        this.$http({
          url: this.$http.adornUrl('/sys/getTaskList'),
          method: 'get',
          params: this.$http.adornParams({
              'constatus': constatus
          })
        }).then(({data}) => {
          if (data && data.code === 0) {
            this.dataList = data.basicInfoList
          } else {
            this.dataList = []
          }
          this.dataListLoading = false
        })
      },
      //todo 任务统计（月）
      getMonthTask(){
        this.$http({
          url: this.$http.adornUrl('/sys/getTaskNumber'),
          method: 'get',
          params: this.$http.adornParams()
        }).then(({data}) => {
          if (data && data.code === 0) {
            this.succNum = data.TaskNumberMap.succ;
            this.errorNum = data.TaskNumberMap.failed;
            this.rejectNum = data.TaskNumberMap.reject;
            this.monthTotalNum = data.TaskNumberMap.monthTotal;
            this.monthSuccNum =  data.TaskNumberMap.monthSucc;
            this.monthRejecNum = data.TaskNumberMap.monthReject;
            this.monthFailNum = data.TaskNumberMap.monthFail;
          }
        })
      },
      //todo 数据量统计
      getDataNumber(){
        this.$http({
          url: this.$http.adornUrl('/sys/getDataSize'),
          method: 'get',
          params: this.$http.adornParams()
        }).then(({data}) => {
          if (data && data.code === 0) {
            this.options.labels= data.dateList;
            //this.options.datasets.data = data.rawDataSize;
            this.options.datasets[0].data=data.rawDataSize;
          } else {
            this.dateList = [];
            this.rawDataSize = []
          }
          this.dataListLoading = false
        })
      },
      //todo 趋势分析
      getSomeMonthAnalysis(){
        this.$http({
          url: this.$http.adornUrl('/sys/getSomeMonthStatus'),
          method: 'get',
          params: this.$http.adornParams()
        }).then(({data}) => {
          if (data && data.code === 0) {
            this.options2.labels= data.monthList;
            this.options2.datasets[0].data=data.succList;
            this.options2.datasets[1].data=data.rejectList;
            this.options2.datasets[2].data=data.failList;
          } else {
            this.dateList = [];
            this.rawDataSize = []
          }
          this.dataListLoading = false
        })
      }
    }
  };
</script>

<style scoped>
  .el-row {
    margin-bottom: 20px;
  }

  .grid-content {
    display: flex;
    align-items: center;
    height: 100px;
  }

  .grid-cont-right {
    flex: 1;
    text-align: center;
    font-size: 14px;
    color: #999;
  }

  .grid-num {
    font-size: 30px;
    font-weight: bold;
  }

  .grid-con-icon {
    font-size: 50px;
    width: 100px;
    height: 100px;
    text-align: center;
    line-height: 100px;
    color: #fff;
  }

  .grid-con-1 .grid-con-icon {
    background: rgb(45, 140, 240);
  }

  .grid-con-1 .grid-num {
    color: rgb(45, 140, 240);
  }

  .grid-con-2 .grid-con-icon {
    background: rgb(100, 213, 114);
  }

  .grid-con-2 .grid-num {
    color: rgb(45, 140, 240);
  }

  .grid-con-3 .grid-con-icon {
    background: rgb(242, 94, 67);
  }

  .grid-con-3 .grid-num {
    color: rgb(242, 94, 67);
  }

  .user-info {
    display: flex;
    align-items: center;
    padding-bottom: 20px;
    border-bottom: 2px solid #ccc;
    margin-bottom: 20px;
  }

  .user-avator {
    width: 120px;
    height: 120px;
    border-radius: 50%;
  }

  .user-info-cont {
    padding-left: 50px;
    flex: 1;
    font-size: 14px;
    color: #999;
  }

  .user-info-cont div:first-child {
    font-size: 30px;
    color: #222;
  }

  .user-info-list {
    font-size: 14px;
    color: #999;
    line-height: 25px;
  }

  .user-info-list span {
    margin-left: 70px;
  }

  .mgb20 {
    margin-bottom: 20px;
  }

  .todo-item {
    font-size: 14px;
  }

  .todo-item-del {
    text-decoration: line-through;
    color: #999;
  }

  .schart {
    width: 100%;
    height: 300px;
  }
</style>
