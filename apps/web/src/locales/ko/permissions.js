import { ServerPermission } from '@/graphql/hooks'

export const permissions = {
  name: '역할명',
  default: '기본',
  addRole: '역할 추가',
  editRole: '역할 수정',
  color: '색상',
  permissions: '권한',
  server: {
    // General
    [ServerPermission.ManageChannels]: {
      title: '채널 관리',
      description: '멤버에게 채널을 만들고 수정하고 삭제할 수 있는 권한을 부여해요.',
    },
    [ServerPermission.ManageServer]: {
      title: '역할 관리',
      description:
        '멤버에게 새 역할을 만들고 자신의 최고 역할보다 낮은 역할을 수정하고 삭제할 수 있는 권한을 부여해요. 또한 멤버에게 자신이 접근할 수 있는 개별 채널의 권한을 변경할 수 있는 권한을 부여해요.',
    },
    [ServerPermission.ManageServer]: {
      title: '행성 관리',
      description:
        "멤버에게 행성의 이름, 설명, 아이콘, 배너 이미지를 변경할 수 있는 권한을 부여해요.",
    },

    // Channels
    [ServerPermission.SendMessages]: {
      title: '메시지 보내기',
      description: '멤버에게 텍스트 채널에서 메시지를 보낼 수 있는 권한을 부여해요.',
    },
    [ServerPermission.RestrictedChannels]: {
      title: '제한된 채널에서 메시지 보내기',
      description:
        '멤버에게 제한된 텍스트 채널에서 메시지를 보낼 수 있는 권한을 부여해요.',
    },
    [ServerPermission.PrivateChannels]: {
      title: '비공개 채널 이용',
      description:
        '멤버에게 비공개 텍스트 채널에서 메시지를 조회/전송할 수 있는 권한을 부여해요.',
    },
    [ServerPermission.ManageMessages]: {
      title: '메시지 관리',
      description:
        '멤버에게 다른 멤버의 메시지를 고정/삭제할 수 있는 권한을 부여해요.',
    },

    // Posts
    [ServerPermission.ManagePosts]: {
      title: '포스트 관리',
      description: '멤버에게 포스트를 고정/삭제할 수 있는 권한을 부여해요.',
    },

    // Comments
    [ServerPermission.ManageComments]: {
      title: '댓글 관리',
      description: '멤버에게 댓글을 고정/삭제할 수 있는 권한을 부여해요.',
    },

    // Folders
    [ServerPermission.ManageFolders]: {
      title: '폴더 관리',
      description: '멤버에게 폴더를 생성/수정/삭제할 수 있는 권한을 부여해요.',
    },
    [ServerPermission.AddPostToFolder]: {
      title: '폴더에 포스트 추가',
      description: '멤버에게 포스트를 폴더에 추가/삭제할 수 있는 권한을 부여해요.',
    },

    // Other
    [ServerPermission.DisplayRoleSeparately]: {
      title: '역할 개별 표시',
      description:
        '이 역할을 가진 멤버는 사용자 목록에서 별도로 표시됩니다.',
    },
    [ServerPermission.Admin]: {
      title: '관리자',
      description: `이 역할을 가진 멤버는 모든 권한을 가집니다.`,
    },

    [ServerPermission.ManageUsers]: {
      title: '유저 관리',
      description: `유저를 차단/추방할 수 있는 권한을 부여해요.`,
    }
  }
}
