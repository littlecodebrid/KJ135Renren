<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
      <el-form-item :label="$t('dataRoleAddOrUpdate.roleName')" prop="dataRoleName">
        <el-input v-model="dataForm.dataRoleName" placeholder="角色名称"></el-input>
      </el-form-item>
      <el-form-item :label="$t('dataRoleAddOrUpdate.remark')" prop="remark">
        <el-input v-model="dataForm.remark" placeholder="备注"></el-input>
      </el-form-item>
      <el-form-item size="mini" :label="$t('dataRoleAddOrUpdate.toGrantAuthorization')">
        <el-tree
          :data="satelliteList"
          :props="satelliteListTreeProps"
          node-key="nameEn"
          ref="satelliteListTree"
          :default-expand-all="true"
          show-checkbox>
        </el-tree>
        <el-tree
          :data="stationList"
          :props="stationListTreeProps"
          node-key="nameEn"
          ref="stationListTree"
          :default-expand-all="true"
          show-checkbox>
        </el-tree>
        <el-tree
          :data="polygonList"
          :props="polygonListTreeProps"
          node-key="nameEn"
          ref="polygonListTree"
          :default-expand-all="true"
          show-checkbox>
        </el-tree>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">{{$t('dataRoleAddOrUpdate.cancel')}}</el-button>
      <el-button type="primary" @click="dataFormSubmit()">{{$t('dataRoleAddOrUpdate.determine')}}</el-button>
    </span>
  </el-dialog>
</template>

<script>
  import { treeDataTranslate } from '@/utils'
  export default {
    data () {
      return {
        visible: false,
        satelliteList: [],
        stationList: [],
        polygonList: [],
        satelliteListTreeProps: {
          label: 'nameEn',
          children: 'children'
        },
        stationListTreeProps: {
          label: 'nameEn',
          children: 'children'
        },
        polygonListTreeProps: {
          label: 'nameEn',
          children: 'children'
        },
        dataForm: {
          id: 0,
          dataRoleName: '',
          remark: ''
        },
        dataRule: {
          dataRoleName: [
            { required: true, message: '角色名称不能为空', trigger: 'blur' }
          ]
        },
        tempKey: -666666 // 临时key, 用于解决tree半选中状态项不能传给后台接口问题. # 待优化
      }
    },
    methods: {
      init (id) {
        this.dataForm.id = id || 0
        this.$http({
          url: this.$http.adornUrl('/sys/dataRole/getDictionaries'),
          method: 'get',
          params: this.$http.adornParams()
        }).then(({data}) => {
          this.satelliteList = treeDataTranslate(data.satelliteList, 'dictionariesId')
          this.stationList = treeDataTranslate(data.stationList, 'dictionariesId')
          this.polygonList = treeDataTranslate(data.polygonList, 'dictionariesId')
        }).then(() => {
          this.visible = true
          this.$nextTick(() => {
            this.$refs['dataForm'].resetFields()
            this.$refs.satelliteListTree.setCheckedKeys([])
            this.$refs.stationListTree.setCheckedKeys([])
            this.$refs.polygonListTree.setCheckedKeys([])
          })
        }).then(() => {
          if (this.dataForm.id) {
            this.$http({
              url: this.$http.adornUrl(`/sys/dataRole/info/${this.dataForm.id}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.dataRoleName = data.dataRole.dataRoleName
                this.dataForm.remark = data.dataRole.remark
                var idx = data.dataRole.satelliteList.indexOf(this.tempKey)
                if (idx !== -1) {
                  data.dataRole.satelliteList.splice(idx, data.dataRole.satelliteList.length - idx)
                  data.dataRole.stationList.splice(idx, data.dataRole.stationList.length - idx)
                  data.dataRole.polygonList.splice(idx, data.dataRole.polygonList.length - idx)
                }
                this.$refs.satelliteListTree.setCheckedKeys(data.dataRole.satelliteList)
                this.$refs.stationListTree.setCheckedKeys(data.dataRole.stationList)
                this.$refs.polygonListTree.setCheckedKeys(data.dataRole.polygonList)
              }
            })
          }
        })
      },
      // 表单提交
      dataFormSubmit () {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            this.$http({
              url: this.$http.adornUrl(`/sys/dataRole/${!this.dataForm.id ? 'save' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'dataRoleId': this.dataForm.id || undefined,
                'dataRoleName': this.dataForm.dataRoleName,
                'remark': this.dataForm.remark,
                'satelliteList': this.$refs.satelliteListTree.getCheckedKeys()/*[].concat()*/,
                'stationList': this.$refs.stationListTree.getCheckedKeys()/*[].concat()*/,
                'polygonList': this.$refs.polygonListTree.getCheckedKeys()/*[].concat()*/,
              })
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.$message({
                  message: '操作成功',
                  type: 'success',
                  duration: 1500,
                  onClose: () => {
                    this.visible = false
                    this.$emit('refreshDataList')
                  }
                })
              } else {
                this.$message.error(data.msg)
              }
            })
          }
        })
      }
    }
  }
</script>
