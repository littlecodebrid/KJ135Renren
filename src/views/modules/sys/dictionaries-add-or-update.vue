<template>
  <el-dialog
    :title="!dataForm.id ? $t('dictionaries.add') : $t('dictionaries.modify')"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
      <el-form-item :label="$t('dictionariesAddOrUpdate.name')" prop="name">
        <el-input v-model="dataForm.name" placeholder="请输入名称"></el-input>
      </el-form-item>
      <el-form-item :label="$t('dictionariesAddOrUpdate.nameEn')" prop="nameEn" >
        <el-input v-model="dataForm.nameEn"  placeholder="请输入英文"></el-input>
      </el-form-item>
      <el-form-item :label="$t('dictionariesAddOrUpdate.bianma')" prop="bianma" >
        <el-input v-model="dataForm.bianma"  placeholder="请输入编码"></el-input>
      </el-form-item>
      <el-form-item :label="$t('dictionariesAddOrUpdate.paixu')" prop="paixu" >
        <el-input v-model="dataForm.orderBy" placeholder="请输入数字"></el-input>
      </el-form-item>
      <el-form-item  prop="dictionariesId" >
        <el-input v-model="dataForm.dictionariesId" hidden></el-input>
      </el-form-item>
      <el-form-item  prop="parentId" >
        <el-input v-model="dataForm.parentId" hidden></el-input>
      </el-form-item>
<!--      <el-form-item label="备注" prop="bz">
        <el-input v-model="dataForm.bz" placeholder="请输入备注"></el-input>
      </el-form-item>-->
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">{{$t('dictionariesAddOrUpdate.cancel')}}</el-button>
      <el-button type="primary" @click="dataFormSubmit()">{{$t('dictionariesAddOrUpdate.determine')}}</el-button>
    </span>
  </el-dialog>
</template>

<script>
  export default {
    data () {
      return {
        visible: false,
        dataForm: {
          id: 0,
          name: '',
          nameEn: '',
          bianma: '',
          orderBy:''
        },
        dataRule: {
          name: [
            { required: true, message: '名称不能为空', trigger: 'blur' }
          ],
          nameEn: [
            { required: true, message: '英文名称不能为空', trigger: 'blur' }
          ],
          bianma: [
            { required: true, message: '请注意编码格式', trigger: 'blur' }
          ],
          orderBy: [
            { required: true, message: '排序不能为空', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      init (parentId,dictionariesId) {
        this.dataForm.id = dictionariesId || 0
        this.dataForm.parentId= parentId
        this.visible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].resetFields()
          if (this.dataForm.id) {
            this.$http({
              url: this.$http.adornUrl(`/sys/dictionaries/info/${this.dataForm.id}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.name = data.dictionaries.name
                this.dataForm.nameEn = data.dictionaries.nameEn
                this.dataForm.bianma = data.dictionaries.bianma
                this.dataForm.dictionariesId = data.dictionaries.dictionariesId
                this.dataForm.parentId = data.dictionaries.parentId
                this.dataForm.orderBy = data.dictionaries.orderBy
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
              url: this.$http.adornUrl(`/sys/dictionaries/${!this.dataForm.id ? 'save' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'id': this.dataForm.id || undefined,
                'name': this.dataForm.name,
                'nameEn': this.dataForm.nameEn,
                'bianma': this.dataForm.bianma,
                'dictionariesId': this.dataForm.dictionariesId,
                'parentId': this.dataForm.parentId,
                'orderBy': this.dataForm.orderBy
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
