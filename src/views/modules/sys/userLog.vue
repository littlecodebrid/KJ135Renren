<template>
  <div class="mod-log">
    <el-form :inline="true" :model="dataForm" @keyup.enter.native="getDataList()">
      <el-form-item>
        <el-input v-model="dataForm.key" placeholder="用户名" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-date-picker v-model="beginTime" type="date" placeholder="开始时间" @change="dataSearch" value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
        <el-date-picker v-model="endTime" type="date" placeholder="结束时间" @change="dataSearch" value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button @click="getDataList()">查询</el-button>
      </el-form-item>
    </el-form>
    <el-table
      :data="dataList"
      border
      v-loading="dataListLoading"
      style="width: 100%">
      <el-table-column
        prop="id"
        header-align="center"
        align="center"
        width="80"
        label="ID">
      </el-table-column>
      <el-table-column
        prop="userName"
        header-align="center"
        align="center"
        width="150"
        label="用户名">
      </el-table-column>
      <el-table-column
        prop="systemSign"
        header-align="center"
        align="center"
        width="300"
        label="分系统名称">
      </el-table-column>
      <el-table-column
        prop="userBrower"
        header-align="center"
        align="center"
        width="200"
        :show-overflow-tooltip="true"
        label="所属菜单">
      </el-table-column>
      <el-table-column
        prop="userAction"
        header-align="center"
        align="center"
        :show-overflow-tooltip="true"
        label="用户操作">
      </el-table-column>
      <el-table-column
        prop="runTime"
        header-align="center"
        align="center"
        width="260"
        label="操作时间">
      </el-table-column>
      <el-table-column
        prop="userIp"
        header-align="center"
        align="center"
        width="150"
        label="IP地址">
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="sizeChangeHandle"
      @current-change="currentChangeHandle"
      :current-page="pageIndex"
      :page-sizes="[10, 20, 50, 100]"
      :page-size="pageSize"
      :total="totalPage"
      layout="total, sizes, prev, pager, next, jumper">
    </el-pagination>
  </div>
</template>

<script>
  //import layDate from '../../demo/layDate.vue'
  export default {
   /* components:{
      layDate
    },*/
    data () {
      return {
        beginTime:'',// 存储选择的日期
        endTime: '',// 存储选择的日期
        isFiltersOpen:false,
        dataForm: {
          key: '',
        },
        dataList: [],
        pageIndex: 1,
        pageSize: 10,
        totalPage: 0,
        dataListLoading: false,
        selectionDataList: []
      }
    },
    created () {
      this.getDataList()
    },

    methods: {
      dataSearch() {
        this.getListByDay();
        this.initData({});
      },
      async initData(data) {
        //获取当前时间
        var now   = new Date();
        var monthn = now.getMonth()+1;
        var yearn  = now.getFullYear();
        var dayn = now.getDate();
        var h = now.getHours();
        var m =now.getMinutes();
        var s = now.getSeconds();
        this.selectDatetime = yearn+"-"+monthn+"-"+dayn+" "+h+":"+m+":"+s;
        this.getListByDay();
      },
      async getListByDay(data) {

      },
      // 获取数据列表
      getDataList () {
        this.dataListLoading = true
        this.$http({
          url: this.$http.adornUrl('/sys/userLog/list'),
          method: 'get',
          params: this.$http.adornParams({
            'page': this.pageIndex,
            'limit': this.pageSize,
            'userName': this.dataForm.key,
            'beginTime':this.beginTime,
            'endTime':this.endTime
          })
        }).then(({data}) => {
          if (data && data.code === 0) {
            this.dataList = data.page.list
            this.totalPage = data.page.totalCount
          } else {
            this.dataList = []
            this.totalPage = 0
          }
          this.dataListLoading = false
        })
      },
      // 每页数
      sizeChangeHandle (val) {
        this.pageSize = val
        this.pageIndex = 1
        this.getDataList()
      },
      // 当前页
      currentChangeHandle (val) {
        this.pageIndex = val
        this.getDataList()
      }
    }
  }
</script>
<style scoped>
  .datePlugin {
    display: inline-block;
  }
  .datePlugin input {
    margin-left: -4px;
    width: 150px;
    height: 40px;
    border-radius: 4px;
    border: 1px solid #DCDFE6;
  }
  .layui-laydate .layui-this {
    background-color: #358ee7 !important;
  }
</style>
