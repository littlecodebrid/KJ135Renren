<template>
  <el-dialog
    :title="!dataForm.id ? $t('tusubsystem.add') : $t('tusubsystem.modify')"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="180px">
      <el-form-item :label="$t('tusubsystemAddOrUpdate.systemName')" prop="systemName">
        <el-input v-model="dataForm.systemName" :placeholder="$t('tusubsystemAddOrUpdate.systemName')"></el-input>
      </el-form-item>
       <el-form-item :label="$t('tusubsystemAddOrUpdate.systemSign')" prop="systemSign">
        <el-input v-model="dataForm.systemSign" :placeholder="$t('tusubsystemAddOrUpdate.systemSign')"></el-input>
      </el-form-item>
      <el-form-item :label="$t('tusubsystemAddOrUpdate.available')"  prop="available">
      <el-input v-model="dataForm.available" :placeholder="$t('tusubsystemAddOrUpdate.available')"></el-input>
    </el-form-item>
    <el-form-item :label="$t('tusubsystemAddOrUpdate.remarkEn')" prop="remark">
      <el-input v-model="dataForm.remark" :placeholder="$t('tusubsystemAddOrUpdate.remarkEn')"></el-input>
    </el-form-item>
    <el-form-item :label="$t('tusubsystemAddOrUpdate.remarkCn')" prop="remarkCn">
      <el-input v-model="dataForm.remarkCn" :placeholder="$t('tusubsystemAddOrUpdate.remarkCn')"></el-input>
    </el-form-item>
    <el-form-item :label="$t('tusubsystemAddOrUpdate.systemPrefix')" prop="systemPrefix">
      <el-input v-model="dataForm.systemPrefix" :placeholder="$t('tusubsystemAddOrUpdate.systemPrefix')"></el-input>
    </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">{{$t('tusubsystemAddOrUpdate.cancel')}}</el-button>
      <el-button type="primary" @click="dataFormSubmit()">{{$t('tusubsystemAddOrUpdate.determine')}}</el-button>
    </span>
  </el-dialog>
</template>

<script>
  export default {
    data () {
      return {
        visible: false,
        dataForm: {
          systemId: 0,
          systemName: '',
          available: '',
          remark: '',
          remarkCn: '',
          systemPrefix: '',
          systemSign:''
        },
        dataRule: {
          systemSign:[
            { required: true, message: this.$t('tusubsystemAddOrUpdate.isSign'), trigger: 'blur' }
          ],
          systemName:[
            { required: true, message: this.$t('tusubsystemAddOrUpdate.isName'), trigger: 'blur' }
          ],
          available: [
            { required: true, message:this.$t('tusubsystemAddOrUpdate.isAvai'), trigger: 'blur' }
          ],
          remark: [
            { required: true, message: this.$t('tusubsystemAddOrUpdate.isEn'), trigger: 'blur' }
          ],
          remarkCn: [
            { required: true, message: this.$t('tusubsystemAddOrUpdate.isCn'), trigger: 'blur' }
          ],
          systemPrefix: [
            { required: true, message:  this.$t('tusubsystemAddOrUpdate.isPre'), trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      init (id) {
        this.dataForm.systemId = id || 0
        this.dataForm.id = id||0
        this.visible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].resetFields()
          if (this.dataForm.systemId) {
            this.$http({
              url: this.$http.adornUrl(`/sys/tusubsystem/info/${this.dataForm.systemId}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.systemName = data.tuSubSystem.systemName
                this.dataForm.available = data.tuSubSystem.available
                this.dataForm.remark = data.tuSubSystem.remark
                this.dataForm.remarkCn = data.tuSubSystem.remarkCn
                this.dataForm.systemPrefix = data.tuSubSystem.systemPrefix
                this.dataForm.systemSign = data.tuSubSystem.systemSign
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
              url: this.$http.adornUrl(`/sys/tusubsystem/${!this.dataForm.systemId ? 'save' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'systemId': this.dataForm.systemId || undefined,
                'systemName': this.dataForm.systemName,
                'available': this.dataForm.available,
                'remark': this.dataForm.remark,
                'remarkCn': this.dataForm.remarkCn,
                'systemPrefix': this.dataForm.systemPrefix,
                'systemSign':this.dataForm.systemSign
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
                this.$message.error(this.$t(data.msg))
              }
            })
          }
        })
      }
    }
  }
</script>
