<template>
    <div>
        <!-- 搜索栏 -->
        <div class="search-bar">
            <el-input v-model="searchAccount" placeholder="请输入用户账号" class="search-input"></el-input>
            <el-input v-model="searchType" placeholder="请输入发布类型" class="search-input"></el-input>
            <el-button @click="searchUsers" :disabled="!isSearchEnabled">搜索</el-button>
        </div>

        <!-- 用户信息表格 -->
        <el-table :data="filteredUsers" style="width: 100%">
            <el-table-column prop="account" label="用户账号"></el-table-column>
            <el-table-column prop="name" label="用户名"></el-table-column>
            <el-table-column prop="avatar" label="头像">
                <template v-slot="{ row }">
                    <img :src="row.avatar" alt="avatar" style="width: 40px; height: 40px; border-radius: 50%;">
                </template>
            </el-table-column>
            <el-table-column prop="phone" label="手机号"></el-table-column>
            <el-table-column prop="type" label="发布类型"></el-table-column>
            <el-table-column prop="timestamp" label="发布时间"></el-table-column>
            <el-table-column label="操作">
                <template v-slot="{ row }">
                    <el-button-group>
                        <el-button type="primary" @click="editUser(row)">修改</el-button>
                        <el-button type="danger" @click="deleteUser(row)">删除</el-button>
                        <el-dropdown v-if="isDropdownVisible">
                            <el-button type="text" icon="el-icon-more">
                                <!-- 省略号 -->
                            </el-button>
                            <template #dropdown>
                                <el-dropdown-menu >
                                    <el-dropdown-item @click="editUser(row)">修改</el-dropdown-item>
                                    <el-dropdown-item @click="deleteUser(row)">删除</el-dropdown-item>
                                </el-dropdown-menu>
                            </template>
                        </el-dropdown>
                    </el-button-group>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
import { ElMessageBox } from 'element-plus';
export default {
    data() {
        return {
            users: [
                { account: 'john_doe', name: 'John Doe', avatar: 'https://8.130.174.199/storage/uploads/20240103/0d338ae1c99bc382831300db7d275cae.png', phone: '1234567890', type: '1', timestamp: '2023-01-01' },
                { account: 'alice_smith', name: 'Alice Smith', avatar: 'https://8.130.174.199/storage/uploads/20240103/0d338ae1c99bc382831300db7d275cae.png', phone: '9876543210', type: '2', timestamp: '2023-01-02' },
                { account: 'bob_jones', name: 'Bob Jones', avatar: 'https://8.130.174.199/storage/uploads/20240103/0d338ae1c99bc382831300db7d275cae.png', phone: '5556667777', type: '1', timestamp: '2023-01-03' },
                { account: 'john_do', name: 'John Doe', avatar: 'https://8.130.174.199/storage/uploads/20240103/0d338ae1c99bc382831300db7d275cae.png', phone: '1234567890', type: '3', timestamp: '2023-01-01' },
                { account: 'alice_smit', name: 'Alice Smith', avatar: 'https://8.130.174.199/storage/uploads/20240103/0d338ae1c99bc382831300db7d275cae.png', phone: '9876543210', type: '4', timestamp: '2023-01-02' },
                { account: 'bob_jone', name: 'Bob Jones', avatar: 'https://8.130.174.199/storage/uploads/20240103/0d338ae1c99bc382831300db7d275cae.png', phone: '5556667777', type: '2', timestamp: '2023-01-03' },
                // Add more user data as needed
            ],
            searchAccount: '',
            searchType: '',
            minScreenWidthToShowDropdown: 768,
        };
    },
    computed: {
        filteredUsers() {
            if (this.searchAccount === '' && this.searchType === '') {
                return this.users;
            }

            const searchAccount = this.searchAccount.toLowerCase();
            const searchType = this.searchType.toLowerCase();

            return this.users.filter(user =>
                (this.searchAccount === '' || user.account.toLowerCase().includes(searchAccount)) &&
                (this.searchType === '' || user.type.toLowerCase().includes(searchType))
            );
        },
        isDropdownVisible() {
            const screenWidth = window.innerWidth;
            const buttonContainerWidth = 240; // 假设按钮容器的宽度
            const buttonWidth = 40; // 假设按钮的宽度
            return screenWidth < this.minScreenWidthToShowDropdown || screenWidth - buttonContainerWidth < buttonWidth;
        },
        isSearchEnabled() {
            return this.searchAccount !== '' || this.searchType !== '';
        },
    },
    methods: {
        searchUsers() {
            // 执行搜索
            // 可以在这里发起后端请求获取匹配的用户数据
        },
        editUser(user) {
            return new Promise((resolve, reject) => {
                this.openEditModal(user)
                    .then(updatedUser => {
                        const index = this.users.findIndex(u => u.account === user.account);
                        if (index !== -1) {
                            this.users[index] = updatedUser;
                            resolve(); // 用户点击确定，成功修改
                        } else {
                            reject("用户数据索引未找到"); // 处理找不到用户数据的情况
                        }
                    })
                    .catch(error => {
                        console.error('编辑操作失败：', error);
                        reject(error); // 用户点击取消，或编辑出错，reject 传递错误信息
                    });
            });
        },
        deleteUser(user) {
            this.users = this.users.filter(u => u.account !== user.account);
            console.log('用户已删除:', user);
        },
        handleResize() {
            this.$forceUpdate();
        },
        openEditModal(user) {
            // 返回一个 Promise，用于处理编辑模态框的结果
            return new Promise((resolve, reject) => {
                ElMessageBox({
                    title: '选择要编辑的字段',
                    message: '请输入name或者phone',
                    showCancelButton: true,
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    showInput: true,
                    inputValue: 'name', // 默认选择用户名
                })
                    .then(({ value }) => {
                        // 验证输入是否为有效字段
                        if (value !== 'name' && value !== 'phone') {
                            this.$message.error('无效字段'); // 输入不是 "name" 或 "phone" 时报错
                            return;
                        }
                        ElMessageBox.prompt(`请输入修改后的${value}`, '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            inputValue: user[value], // 设置输入框的初始值为用户选择的字段值
                        })
                            .then(({ value: newValue }) => {
                                // 用户点击确定后，将修改后的用户数据传递给 resolve
                                const editedUser = { ...user, [value]: newValue };
                                resolve(editedUser);
                            })
                            .catch(() => {
                                // 用户点击取消时，调用 reject
                                reject();
                            });
                    })
                    .catch(() => {
                        // 用户点击取消时，调用 reject
                        reject();
                    });
            });
        },

    },
    mounted() {
        window.addEventListener('resize', this.handleResize);
    },
    beforeUnmount() {
        window.removeEventListener('resize', this.handleResize);
    },
};
</script>

<style scoped>
.search-bar {
    margin-bottom: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.search-input {
    width: 200px;
    /* 设置搜索框宽度 */
}
</style>
