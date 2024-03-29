<template>
  <div class="mod-config">
    <el-form :inline="true" :model="dataForm" @keyup.enter.native="getDataList()">
      <el-form-item>
        <el-input v-model="dataForm.key" placeholder="参数名" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="getDataList()">{{$t('tusubsystem.query')}}</el-button>
        <el-button v-if="isAuth('sys:tusubsystem:save')" type="primary" @click="addOrUpdateHandle()">{{$t('tusubsystem.add')}}</el-button>
        <el-button v-if="isAuth('sys:tusubsystem:delete')" type="danger" @click="deleteHandle()" :disabled="dataListSelections.length <= 0">{{$t('tusubsystem.batchDeletion')}}</el-button>
      </el-form-item>
    </el-form>
    <el-table
      :data="dataList"
      border
      v-loading="dataListLoading"
      @selection-change="selectionChangeHandle"
      style="width: 100%;">
      <el-table-column
        type="selection"
        header-align="center"
        align="center"
        width="50">
      </el-table-column>
      <el-table-column
        prop="systemName"
        header-align="center"
        align="center"
        :label="$t('tusubsystem.systemName')">
      </el-table-column>
      <el-table-column
      prop="systemSign"
        header-align="center"
        align="center"
        :label="$t('tusubsystem.systemSign')">
      </el-table-column>
      <el-table-column
        prop="available"
        header-align="center"
        align="center"
        width="100"
        :label="$t('tusubsystem.available')">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.available === 0" size="small">不可用</el-tag>
          <el-tag v-else-if="scope.row.available === 1" size="small" type="success">可用</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="remark"
        header-align="center"
        align="center"
        :label="$t('tusubsystem.remarkEn')">
      </el-table-column>
      <el-table-column
        prop="remarkCn"
        header-align="center"
        align="center"
        :label="$t('tusubsystem.remarkCn')">
      </el-table-column>
      <el-table-column
        prop="systemPrefix"
        header-align="center"
        align="center"
        width="100"
        :label="$t('tusubsystem.systemPrefix')">
      </el-table-column>
      <el-table-column
        prop="sysUrl"
        header-align="center"
        align="center"
        :label="$t('tusubsystem.sysUrl')">
      </el-table-column>
      <el-table-column
        prop="sysPort"
        header-align="center"
        align="center"
        :label="$t('tusubsystem.sysPort')">
      </el-table-column>
      <el-table-column
        fixed="right"
        header-align="center"
        align="center"
        width="200"
        :label="$t('tusubsystem.operation')">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="addOrUpdateHandle(scope.row.systemId)">{{$t('tusubsystem.modify')}}</el-button>
          <el-button type="text" size="small" @click="deleteHandle(scope.row.systemId)">{{$t('tusubsystem.delete')}}</el-button>
          <el-button type="text" size="small" @click="goNewWeb(scope.row.sysUrl,scope.row.sysPort,scope.row.systemPrefix)">{{$t('tusubsystem.href')}}</el-button>
        </template>
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
    <!-- 弹窗, 新增 / 修改 -->
    <add-or-update v-if="addOrUpdateVisible" ref="addOrUpdate" @refreshDataList="getDataList"></add-or-update>
  </div>
</template>

<script>
  import AddOrUpdate from './tusubsystem-add-or-update'
  export default {
    data () {
      return {
        dataForm: {
          key: ''
        },
        dataList: [],
        pageIndex: 1,
        pageSize: 10,
        totalPage: 0,
        dataListLoading: false,
        dataListSelections: [],
        addOrUpdateVisible: false
      }
    },
    components: {
      AddOrUpdate
    },
    activated () {
      this.getDataList()
    },
    methods: {
      // 获取数据列表
      getDataList () {
        this.dataListLoading = true
        this.$http({
          url: this.$http.adornUrl('/sys/tusubsystem/list'),
          method: 'get',
          params: this.$http.adornParams({
            'page': this.pageIndex,
            'limit': this.pageSize,
            'key': this.dataForm.key
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
      },
      // 多选
      selectionChangeHandle (val) {
        this.dataListSelections = val
      },
      // 新增 / 修改
      addOrUpdateHandle (id) {
        this.addOrUpdateVisible = true
        this.$nextTick(() => {
          this.$refs.addOrUpdate.init(id)
        })
      },
      //方法
      goNewWeb (url,port,perifex) {
        if(port!=0){
          let newurl = 'http://'+url+':'+port+'/'+perifex;
          window.open(newurl, '_blank')
         // window.opener.location.href ='http://'+url+':'+port+'/'+perifex; //  跳转链接
        }else{
          this.$router.push({path: '/login'})
        }
      },
      // 删除
      deleteHandle (id) {
        var ids = id ? [id] : this.dataListSelections.map(item => {
          return item.systemId
        })
        this.$confirm(`确定对[id=${ids.join(',')}]进行[${id ? '删除' : '批量删除'}]操作?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http({
            url: this.$http.adornUrl('/sys/tusubsystem/delete'),
            method: 'post',
            data: this.$http.adornData(ids, false)
          }).then(({data}) => {
            if (data && data.code === 0) {
              this.$message({
                message: '操作成功',
                type: 'success',
                duration: 1500,
                onClose: () => {
                  this.getDataList()
                }
              })
            } else {
              this.$message.error(this.$t(data.msg))
            }
          })
        })
      }
    }
  }
</script>
