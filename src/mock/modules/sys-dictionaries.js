import Mock from 'mockjs'

// 生成数据列表
var dataList = []
for (let i = 0; i < Math.floor(Math.random() * 10 + 1); i++) {
  dataList.push(Mock.mock({
    'name': '@name',
    'nameEn': '@nameEn',
    'bianma':'@bianma',
    'orderBy':'@orderBy'
  }))
}

// 获取数据字典列表
export function list () {
  return {
    // isOpen: false,
    url: '/sys/dictionaries/list',
    type: 'get',
    data: {
      'msg': 'success',
      'code': 0,
      'page': {
        'totalCount': dataList.length,
        'pageSize': 10,
        'totalPage': 1,
        'currPage': 1,
        'list': dataList
      }
    }
  }
}

// 获取数据字典信息
export function info () {
  return {
    // isOpen: false,
    url: '/sys/dictionaries/info',
    type: 'get',
    data: {
      'msg': 'success',
      'code': 0,
      'dictionaries': dataList[0]
    }
  }
}



// 添加数据字典
export function add () {
  return {
    // isOpen: false,
    url: '/sys/dictionaries/save',
    type: 'post',
    data: {
      'msg': 'success',
      'code': 0
    }
  }
}

// 修改数据字典
export function update () {
  return {
    // isOpen: false,
    url: '/sys/dictionaries/update',
    type: 'post',
    data: {
      'msg': 'success',
      'code': 0
    }
  }
}

// 删除数据字典
export function del () {
  return {
    // isOpen: false,
    url: '/sys/dictionaries/delete',
    type: 'post',
    data: {
      'msg': 'success',
      'code': 0
    }
  }
}
