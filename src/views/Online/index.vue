<template>
        <room ref="TUIRoomRef"
              @on-room-destory="handleRoomDestory"
              @on-room-exit="handleRoomExit"
              @on-room-enter="handleRoomEnter"
              @on-exit-room="handleExitRoom"
        ></room>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
// 引入 TUIRoom 组件，注意确认引入路径是否正确
import Room from "../../TUIRoom/index.vue";
// 获取 TUIRoom 组件元素，用于调用 TUIRoom 组件的方法
const TUIRoomRef = ref();
import { useUserStore } from "../../stores/userStore.js";
import { useRoute, useRouter } from "vue-router";
const userStore = useUserStore()
const route = useRoute()
const router = useRouter()
onMounted(async () => {
    // 初始化 TUIRoom 组件
    // 主持人在创建房间前需要先初始化 TUIRoom 组件
    // 普通成员在进入房间前需要先初始化 TUIRoom 组件
    await TUIRoomRef.value.init({
        // 获取 sdkAppId 请您参考 步骤一
        sdkAppId: 1600018943,
        // 用户在您业务中的唯一标示 Id
        userId: 'zhou',
        // 本地开发调试可在 https://console.cloud.tencent.com/trtc/usersigtool 页面快速生成 userSig, 注意 userSig 与 userId 为一一对应关系
        userSig: 'eJyrVgrxCdYrSy1SslIy0jNQ0gHzM1NS80oy0zLBwlUZ*aVQ8eKU7MSCgswUJStDMwMDA0MLSxNjiExqRUFmUSpQ3NTU1AgoBREtycwFiZkbmBiYmJsYQUWLM9OBxro7e6QaJWsHhPt7m5ekmKamecToZ2RmWxgauUa4FodVOXmEpfgZpcXo50YVutoq1QIAP00xBA__',
        // 用户在您业务中使用的昵称
        userName: userStore.userInfo.username,
        // 用户在您业务中使用的头像链接
        avatarUrl: userStore.userInfo.avatar,
    })

    // 默认执行创建房间，实际接入可按需求择机执行 handleCreateRoom 方法
    if(route.query.isCreate) {
        await handleCreateRoom(route.query.roomId)
    }

    if(route.query.isJoin) {
        await handleEnterRoom(route.query.joinId)
    }
})

// 主持人创建房间，该方法只在创建房间时调用
async function handleCreateRoom(createId) {
    // roomId 为用户进入的房间号, 要求 roomId 类型为 string
    // roomMode 包含'FreeToSpeak'(自由发言模式) 和'SpeakAfterTakingSeat'(上台发言模式) 两种模式，默认为'FreeToSpeak'，注意目前仅支持自由发言模式
    // roomParam 指定了用户进入房间的默认行为（是否默认开启麦克风，是否默认开启摄像头，默认媒体设备Id)

    const roomId = createId;
    const roomMode = '';
    const roomParam = {
        isOpenCamera: true,
        isOpenMicrophone: true,
    }
    try {
        await TUIRoomRef.value.createRoom({ roomId, roomName: roomId, roomMode, roomParam });
    } catch (error) {
        alert('TUIRoomKit.createRoom error: ' + error.message);
    }
}

// 普通成员进入房间，该方法在普通成员进入已创建好的房间时调用
async function handleEnterRoom(id) {
    // roomId 为用户进入的房间号, 要求 roomId 类型为 string
    // roomParam 指定了用户进入房间的默认行为（是否默认开启麦克风，是否默认开启摄像头，默认媒体设备Id)
    const roomId = id;
    const roomParam = {
        isOpenCamera: true,
        isOpenMicrophone: true,
    }
    try {
        await TUIRoomRef.value.enterRoom({ roomId, roomParam });
    } catch (error) {
        alert('TUIRoomKit.enterRoom error: ' + error.message);
    }
}

function handleRoomDestory(info) {
        console.log(1111)
        router.push('/seminarcentre/onlinemeeting')
        if (info.code === 0) {
                alert('主持人销毁成功')
        }
}


function handleRoomExit(info) {
        console.log(1111)
        router.push('/seminarcentre/onlinemeeting')
        if (info.code === 0) {
        console.log('普通成员退出房间成功')
        }
}

function handleRoomEnter(info) {
        if (info.code === 0) {
                console.log('进入房间成功')
        }
}

const handleExitRoom = (info) => {
        alert(111)
        if (info.code === 0) {
                console.log('进入房间成功')
        }
}

//离开房间

</script>

<style lang="scss">
html, body {
  width: 100%;
  height: 100%;
  margin: 0;
}

#app {
  width: 184%;
  height: 100%;
  * {
    box-sizing: border-box;
  }
}
.tui-room  {
    width: 246% !important;
}
</style>
