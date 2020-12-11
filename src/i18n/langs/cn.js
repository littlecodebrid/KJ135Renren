import zhLocale from 'element-ui/lib/locale/lang/zh-CN' //引入element语言包
const cn = {
  login: {
   'title':'数据管理分系统',
    'about':'用户登录界面',
    'username':'用户名',
    'password':'密码',
    'code':'验证码',
    'register':'还没有账号？去注册',
    'forget':'忘记密码？',
  },
  register: {
    'about':'用户注册',
    'confirm':'密码确认',
    'email':'邮箱',
    'mobile':'手机号',
    'toLogin':'已有账号？去登录',
  },
  config:{
    'query':'查询',
    'add':'新增',
    'batchDeletion':'批量删除',
    'paramKey':'权限项目',
    'paramValue':'权限内容',
    'remark':'备注',
    'operation':'操作',
    'modify':'修改',
    'delete':'删除',
  },
  configAddOrUpdate:{
    'paramKey':'权限项目',
    'paramValue':'权限内容',
    'remark':'备注',
    'cancel':'取消',
    'determine':'确定',
  },
  dataRole:{
    'query':'查询',
    'add':'新增',
    'batchDeletion':'批量删除',
    'roleName':'角色名称',
    'remark':'备注',
    'createTime':'创建时间',
    'updateTime':'修改时间',
    'operation':'操作',
    'dataAuthorityModification':'数据权限修改',
    'delete':'删除',
  },
  dataRoleAddOrUpdate:{
    'roleName':'角色名称',
    'remark':'备注',
    'toGrantAuthorization':'授权',
    'cancel':'取消',
    'determine':'确定',
  },
  dictionaries:{
    'add':'新增',
    'return':'返回',
    'name':'名字',
    'nameEn':'英文',
    'bianma':'编码',
    'orderBy':'序列',
    'operation':'操作',
    'modify':'修改',
    'delete':'删除',
  },
  dictionariesAddOrUpdate:{
    'name':'名字',
    'nameEn':'英文',
    'bianma':'编码',
    'paixu':'排序',
    'cancel':'取消',
    'determine':'确定',
  },
  log:{
    'query':'查询',
    'username':'用户名',
    'operation':'用户操作',
    'method':'请求方法',
    'params':'请求参数',
    'time':'执行时长(毫秒)',
    'ip':'IP地址',
    'createTime':'创建时间',
  },
  menu:{
    'add':'新增',
    'name':'名称',
    'parentName':'上级菜单',
    'icon':'图标',
    'type':'类型',
    'catalog':'目录',
    'menu':'菜单',
    'operation':'操作',
    'orderNum':'排序号',
    'url':'菜单URL',
    'perms':'授权标识',
    'systemName':'子系统名称',
    'modify':'修改',
    'delete':'删除',
  },
  menuAddOrUpdate:{
    'type':'类型',
    'parentName':'上级菜单',
    'url':'菜单路由',
    'perms':'授权标识',
    'orderNum':'排序号',
    'icon':'菜单图标',
    'content':'全站推荐使用SVG Sprite, 详细请参考:',
    'describe':'描述',
    'cancel':'取消',
    'determine':'确定',
  },
  role:{
    'query':'查询',
    'add':'新增',
    'roleName':'角色名称',
    'remark':'备注',
    'createTime':'创建时间',
    'operation':'操作',
    'modificationOfOperationAuthority':'操作权限修改',
    'dataAuthorityModification':'数据权限修改',
    'delete':'删除',
    'Todo: giving data permissions to roles':'TODO:为角色赋予数据权限',
  },
  roleAddOrUpdate:{
    'roleName':'角色名称',
    'remark':'备注',
    'toGrantAuthorization':'授权',
    'cancel':'取消',
    'determine':'确定',
  },
  tusubsystem:{
    'query':'查询',
    'add':'新增',
    'batchDeletion':'批量删除',
    'systemName':'子系统名称',
    'systemSign':'子系统标识',
    'available':'是否可用',
    'remarkEn':'英文备注',
    'remarkCn':'中文备注',
    'systemPrefix':'子系统前缀',
    'operation':'操作',
    'modify':'修改',
    'delete':'删除',
  },
  tusubsystemAddOrUpdate:{
    'systemName':'子系统名称',
    'systemSign':'子系统标识',
    'available':'是否可用',
    'remarkEn':'英文备注',
    'remarkCn':'中文备注',
    'systemPrefix':'子系统前缀',
    'cancel':'取消',
    'determine':'确定',
  },
  user:{
    'query':'查询',
    'add':'新增',
    'batchDeletion':'批量删除',
    'username':'用户名',
    'email':'邮箱',
    'mobile':'手机号',
    'status':'状态',
    'disable':'禁用',
    'normal':'正常',
    'createTime':'创建时间',
    'operation':'操作',
    'modify':'修改',
    'delete':'删除',
  },
  userAddOrUpdate:{
    'username':'用户名',
    'password':'密码',
    'comfirmPassword':'确认密码',
    'email':'邮箱',
    'mobile':'手机号',
    'roleList':'角色',
    'dataRoleList':'数据角色',
    'status':'状态',
    'disable':'禁用',
    'normal':'正常',
    'cancel':'取消',
    'determine':'确定',
  },

  ...zhLocale
}

export default cn;