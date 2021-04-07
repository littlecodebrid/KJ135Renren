<template>
  <div class="mod-user">
    <el-form :inline="true" :model="dataForm" @keyup.enter.native="getDataList()">
 <!--     <el-form-item>
        <el-input v-model="dataForm.parentId" placeholder="数据名" clearable></el-input>
      </el-form-item>-->
      <el-input v-model="dataForm.parentId" hidden placeholder="数据名" clearable></el-input>
      <el-form-item>
    <!--    <el-button @click="getDataList()">查询</el-button>-->
        <el-button v-if="isAuth('sys:dictionaries:save')" type="primary"   @click="addOrUpdateHandle(dataForm.parentId.valueOf(),'')">{{$t('dictionaries.add')}}</el-button>
        <el-button v-if="dataForm.parentId!=0" type="primary"   @click="getDataList()">{{$t('dictionaries.return')}}</el-button>
       <!-- <el-button v-if="isAuth('sys:dictionaries:delete')" type="danger" @click="deleteHandle()" :disabled="dataListSelections.length <= 0">批量删除</el-button>
      --></el-form-item>
    </el-form>
    <el-table
      :data="dataList"
      border
      v-loading="dataListLoading"
      @selection-change="selectionChangeHandle"
      style="width: 100%;">
    <!--  <el-table-column
        type="selection"
        header-align="center"
        align="center"
        width="50">
      </el-table-column>-->
      <el-table-column
        prop="name"
        header-align="center"
        align="center"
        width="300"
        :label="$t('dictionaries.name')">
             <template slot-scope="scope">
               <el-button type="text" size="small" @click="findChild(scope.row.dictionariesId)">{{scope.row.name}}</el-button>
               <!--  <router-link :to="{name:'Item',query:{name:scope.row.name}}">
                   <a href="findChild(scope.row.dictionariesId)" target="_blank" class="buttonText">{{scope.row.name}}</a>
                 </router-link>-->
           <!--  <a :href=deleteHandle(scope.row.dictionariesId,scope.row.name) target="_blank" class="buttonText">{{scope.row.name}}</a>-->
           </template>
      </el-table-column>
      <el-table-column
        prop="nameEn"
        header-align="center"
        align="center"
        :label="$t('dictionaries.nameEn')">
      </el-table-column>
      <el-table-column
        prop="bianma"
        header-align="center"
        align="center"
        :label="$t('dictionaries.bianma')">
      </el-table-column>
      <el-table-column
        prop="orderBy"
        header-align="center"
        align="center"
        :label="$t('dictionaries.orderBy')">
      </el-table-column>
      <el-table-column
        fixed="right"
        header-align="center"
        align="center"
        width="150"
        :label="$t('dictionaries.operation')">
        <template slot-scope="scope">
          <el-button v-if="isAuth('sys:dictionaries:update')" type="text" size="small" @click="addOrUpdateHandle(dataForm.parentId.valueOf(),scope.row.dictionariesId)">{{$t('dictionaries.modify')}}</el-button>
          <el-button v-if="isAuth('sys:dictionaries:delete')" type="text" size="small" @click="deleteHandle(scope.row.dictionariesId,scope.row.name)">{{$t('dictionaries.delete')}}</el-button>
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
  import AddOrUpdate from './dictionaries-add-or-update'
  export default {
    data () {
      return {
        dataForm: {
          dictionariesId: ''
        },
        dataList: [],
        pageIndex: 1,
        pageSize: 10,
        totalPage: 0,
        dataListLoading: false,
        dataListSelections: [],
        addOrUpdateVisible: false,
      }
    },
    components: {
      AddOrUpdate,
    },
    activated () {
      this.getDataList()
    },
    methods: {
      // 获取数据列表
      getDataList () {
        this.dataListLoading = true
        this.$http({
          url: this.$http.adornUrl('/sys/dictionaries/list'),
          method: 'get',
          params: this.$http.adornParams({
            'page': this.pageIndex,
            'limit': this.pageSize,
            'parentId': this.dataForm.userName
          })
        }).then(({data}) => {
          if (data && data.code === 0) {
            this.dataList = data.page.list
            this.totalPage = data.page.totalCount
            this.dataForm.parentId=data.parentId
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
      //页面跳转
      findChild(parentId){
        this.$http({
          url: this.$http.adornUrl('/sys/dictionaries/list'),
          method: 'get',
          params: this.$http.adornParams({
            'parentId': parentId
          })
        }).then(({data}) => {
          if (data && data.code === 0) {
            this.dataList = data.page.list
            this.totalPage = data.page.totalCount
            this.dataForm.parentId=data.parentId
          } else {
            this.dataList = []
            this.totalPage = 0
          }
        })
      },
      // 新增 / 修改
      addOrUpdateHandle (parentId,dictionariesId) {
        this.addOrUpdateVisible = true
        this.$nextTick(() => {
          this.$refs.addOrUpdate.init(parentId,dictionariesId)
        })
      },
      // 删除
      deleteHandle (id,name) {
        this.$confirm(`确定对[${name}]进行删除操作?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http({
            url: this.$http.adornUrl('/sys/dictionaries/delete'),
            method: 'post',
            data: this.$http.adornData(id, false)
          }).then(({data}) => {
            if (data && data.code === 0) {
              this.$message({
                message: this.$t(data.msg),
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
        }).catch(() => {})
      }
    }
  }
</script>
