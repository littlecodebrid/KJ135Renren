<template>
  <div class="datePlugin">
    <input type="text" readonly="readonly" placeholder="开始时间" id="beginTime" v-model="date1">
    &nbsp;&nbsp;&nbsp;&nbsp;
    <input type="text" readonly="readonly" placeholder="结束时间" id="endTime" v-model="date2">
  </div>
</template>

<script>
  export default {
    name: "layDate",
    data() {
      return {
        date1: "",// 存储选择的日期
        date2: ""// 存储选择的日期
      };
    },
    created:function(){
      setTimeout( function(){
        let that = this
        laydate.render({
          elem: "#beginTime", //指定元素
          type: 'datetime',
          format:'yyyy-MM-dd HH:mm:ss',
          trigger: 'click',
          done:function(value, date, endDate){
            that.date1 = value;
            date1 = value;
          }
        });
        laydate.render({
          elem: "#endTime", //指定元素
          type: 'datetime',
          format:'yyyy-MM-dd HH:mm:ss',
          trigger: 'click',
          done:function(value, date, endDate){
            that.date2 = value;
            date2=value;
          }
        });
      }, 0 );
    },
  };
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
