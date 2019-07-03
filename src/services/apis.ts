import Request, { domain } from './../utils/'
const apiList = {
  // 创建割接单
  platformQuery: {
    method: 'get',
    url: '/platform/query'
  },
  platformCreate: {
    method: 'post',
    url: '/platform/create'
  },
  platformUpdate: {
    method: 'post',
    url: '/platform/update'
  }
}

const graphqlFiles = {
  platformQuery: `
      query ($name: String, $owner: String) {
  platforms {
    list(name: $name, owner: $owner) {
      name
      id: _id
      createdTime
      description
      icon {
        url
      }
      owner
      owner_qq
      owner_phone
      url
    }
  }
}

  `,
  createPlatform: `
  mutation ($owner: String, $owner_qq: String, $owner_phone: String, $name: String!, $description: String, $icon: String, $url: String) {
    Platform {
      create(owner: $owner, owner_qq: $owner_qq, owner_phone: $owner_phone, name: $name, description: $description, icon: $icon, url: $url) {
        code
        msg
        data
      }
    }
}
  `,
  updatePlatform: `
mutation ($id: ID!, $owner: String, $owner_qq: String, $owner_phone: String, $name: String!, $description: String, $icon: String, $url: String) {
  Platform {
    update(id: $id, owner: $owner, owner_qq: $owner_qq, owner_phone: $owner_phone, name: $name, description: $description, icon: $icon, url: $url) {
      code
      msg
      data
    }
  }
}
  `,
  removePlatform: `
    mutation ($id: ID!) {
      Platform {
        remove(id: $id) {
          msg
          data
          code
        }
      }
  }
  `,

  queryMeetingRoom: `
    query ($roomName: String, $area: String, $create: Int) {
      meetingRooms {
        list(area: $area, roomName: $roomName, create: $create) {
          id: _id
          roomName
          area
          createdAt
          longBook
          records
          create {
            dept
            id:_id
            cname
          }
          updater {
            dept
            id:_id
            cname
          }
        }
      }
    }
  `,
  queryStaff: `
      {
      staffs {
        list {
          cname
          id:_id
          name
        }
      }
      }
  `,
  createMeetingRoom: `
   mutation ($roomName: String!, $area: String, $create: ID!) {
      MeetingRoom {
        create(roomName: $roomName, area: $area, create: $create) {
          data
          codeF
          msg
        }
      }
    }
  `,
  updateMeetingRoom: `
    mutation ($id: ID!, $roomName: String!, $area: String, $updater: ID!) {
      MeetingRoom {
        update(id: $id, roomName: $roomName, area: $area, updater: $updater) {
          data
          code
          msg
        }
      }
    }
  `,
  removeMeetingRoom: `
  mutation ($id: ID!) {
    MeetingRoom {
      remove(id: $id) {
        msg
        code
        data
      }
    }
  }
  `,
  sendMeetingInvitation: `
  mutation ($id: ID!, $content: String!) {
  MeetingRecord {
    sendMeetingInvitation(id: $id, content: $content) {
      code
      msg
      data
    }
  }
  }
  `,
  queryMeetingRecords: `
 query ($isOwn: Boolean $isCalendar: Boolean $room: ID, $create: ID, $pagination: pagination, $status: Int, $bookStartTime: Date, $bookEndTime: Date, $title: String) {
  meetingRecords {
    list(isOwn:$isOwn isCalendar:$isCalendar room: $room, create: $create, pagination: $pagination, status: $status, bookStartTime: $bookStartTime, bookEndTime: $bookEndTime, title: $title) {
      id: _id
      room {
        _id
        roomName
      }
      bookEndTime
      bookStartTime
      title
      description
      attendee {
        id: _id
        cname
      }
      create {
        id: _id
        cname
      }
      status {
        label
        value
      }
      type {
        label
        value
      }
      target
      background
      createdAt
      realStartTime
      realEndTime
      actions
      summary
      isDelay
    }
  }
  }
  `,
  detailMeetingRecord: `
  query ($id: ID!) {
   meetingRecords {
    detail(id: $id) {
        id: _id
        room {
          _id
          roomName
        }
        invitationTimes
        bookEndTime
        bookStartTime
        title
        description
        attendee {
          id:_id
          cname
        }
        create {
          id:_id
          cname
        }
        status {
          label
          value
        }
        type {
          label
          value
        }
        target
        background
        createdAt
        realStartTime
        realEndTime
        actions
        summary
        isDelay
      }
    }
  }
  `,
  createMeetingRecords: `
    mutation ($room: ID!, $bookStartTime: Date, $bookEndTime: Date, $title: String, $description: String, $attendee: [Int], $create: Int, $status: Int, $type: Int, $target: JSON, $background: JSON, $realStartTime: Date, $realEndTime: Date, $actions: String) {
      MeetingRecord {
        create(room: $room, bookStartTime: $bookStartTime, bookEndTime: $bookEndTime, title: $title, description: $description, attendee: $attendee, create: $create, status: $status, type: $type, target: $target, background: $background, realStartTime: $realStartTime, realEndTime: $realEndTime, actions: $actions) {
          code
          data
          msg
        }
      }
  }
  `,
  updateMeetingRecord: `
  mutation ($summary:String $updater: ID!, $id: ID!, $title: String, $description: String, $attendee: [Int], $create: Int, $type: Int, $target: JSON, $background: JSON, $realStartTime: Date, $realEndTime: Date, $actions: String) {
      MeetingRecord {
        update(summary:$summary updater: $updater, id: $id, title: $title, description: $description, attendee: $attendee, create: $create, type: $type, target: $target, background: $background, realStartTime: $realStartTime, realEndTime: $realEndTime, actions: $actions) {
          code
          data
          msg
        }
      }
  }
  `,
  kickOutMeeting: `
  mutation ($id: ID!) {
    MeetingRecord {
      kickOutMeeting(id: $id) {
        msg
        code
        data
      }
    }
  }

  `,
  isCanChangeBookTime: `
  mutation ($id: ID!, $room: ID!, $bookStartTime: Date!, $bookEndTime: Date!) {
    MeetingRecord {
      isCanChangeBookTime(id: $id, room: $room, bookStartTime: $bookStartTime, bookEndTime: $bookEndTime) {
        msg
        data
        code
      }
    }
  }
  `,
  startMeeting: `
  mutation ($id: ID!) {
    MeetingRecord {
      startMeeting(id: $id) {
        code
        msg
        data
      }
    }
  }
  `,
  endMeeting: `
  mutation ($id: ID!) {
    MeetingRecord {
      endMeeting(id: $id) {
        code
        msg
        data
      }
    }
  }
  `,
  cancelMeeting: `
  mutation ($id: ID!) {
    MeetingRecord {
      cancelMeeting(id: $id) {
        code
        msg
        data
      }
    }
  }
  `,
  delayMeeting: `
  mutation ($id: ID! $min:Int) {
    MeetingRecord {
      delayMeeting(id: $id min:$min) {
        code
        msg
        data
      }
    }
  }
  `,
  queryUsers: `
  query ($name: String, $cname: String, $type: Int) {
    userQuerySchema {
      users {
        list(name: $name, cname: $cname, type: $type) {
          type {
            id: _id
            level
            name
          }
          id: _id
          name
          cname
          dept
        }
      }
    }
  }
  `,
  changeUserType: `
    mutation ($id: ID!, $type: Int!) {
      UserMutationSchema {
        User {
          changeUserType(id: $id, type: $type) {
            data
            msg
            code
          }
        }
      }
    }
  `,
  queryUserType: `
    {
      userQuerySchema {
        userTypes {
          list {
            name
            id: _id
            level
          }
        }
      }
    }
  `,
  queryUserGroup: `
  query ($name: String) {
    userQuerySchema {
      userGroups {
        list(name: $name) {
          id: _id
          name
          users {
            id: _id
            cname
            name
          }
        }
      }
    }
  }
  `,
  createUserGroup: `
    mutation ($name: String!, $users: [Int]!) {
      UserMutationSchema {
        UserGroup {
          create(name: $name, users: $users) {
            msg
            data
            code
          }
        }
      }
    }
  `,
  updateUserGroup: `
    mutation ($id: ID!, $name: String!, $users: [Int]!) {
      UserMutationSchema {
        UserGroup {
          update(id: $id, name: $name, users: $users) {
            msg
            data
            code
          }
        }
      }
    }
  `,
  removeUserGroup: `
    mutation ($id: ID!) {
  UserMutationSchema {
    UserGroup {
      remove(id: $id) {
        data
        code
        msg
      }
    }
  }
}
  `
}
const request = new Request({
  baseURL: domain,
  requestSuffix: '',
  graphqlSuffix: 'graphql'
})

request.addApis(apiList)
request.addGraphql(graphqlFiles)

export default request
