import { observable, action, runInAction, autorun } from 'mobx'
import request from './../services/apis'
const queryDict = () =>
  Promise.all([
    request.graphqls.queryStaff(),
    request.graphqls.queryMeetingRoom(),
    request.graphqls.queryUserType(),
    request.graphqls.queryUserGroup()
  ]).then(res => {
    return {
      staffs: res[0].staffs.list,
      meetingRooms: res[1].meetingRooms.list,
      userTypes: res[2].userQuerySchema.userTypes.list,
      userGroups: res[3].userQuerySchema.userGroups.list,
      recordStatus: [
        {
          value: 0,
          label: '已取消'
        },
        {
          value: 1,
          label: '未开始'
        },
        {
          value: 2,
          label: '进行中'
        },
        {
          value: 3,
          label: '已结束，待填写'
        },
        {
          value: 4,
          label: '已结束'
        },
        {
          value: 6,
          label: '未开始，被踢出。'
        }
      ]
    }
  })
class Dict {
  constructor () {
    this.getData()
    autorun(() => {
      console.log(this.dicts.staffs)
    })
  }

  @observable.shallow
  dicts = {
    staffs: []
  }
  @action
  async getData () {
    const dicts = await queryDict()
    runInAction(() => {
      this.dicts = dicts
    })
  }
}

export interface IDict {
  dicts: {
    staffs: any[]
    meetingRooms: any[]
    userTypes: any[]
    recordStatus: any[]
    userGroups: any[]
  }
}

export { Dict }
