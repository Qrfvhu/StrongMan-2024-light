import Mock from 'mockjs';
import userData from "../components/userData";

//修改分配角色权限 tag
Mock.mock('/user/updateTag', 'post', (options) => {
    const { id, tag } = JSON.parse(options.body);
    const user = userData.findIndex(user => user.id === id);
    if (user!== -1) {
        // 如果找到了对应的用户数据，则更新其标签属性为新的标签
        // userData.splice(id-1, 1, JSON.parse(options.body));
        userData[user] = JSON.parse(options.body);
        return {
            code: 0,
            message: 'Tag updated successfully',
            data: userData  // 返回更新后的用户数据
        };
    } else {
        // 如果未找到对应的用户数据，则返回错误信息
        return {
            code: 1,
            message: 'User not found'
        };
    }
});

//修改是否启用
Mock.mock('/user/updateIs', 'post', (options) => {
    const { id } = JSON.parse(options.body);

    const user = userData.findIndex(user => user.id === id);
    if (user!== -1) {
        // 如果找到了对应的用户数据，则更新其标签属性为新的标签
        userData.splice(id-1, 1, JSON.parse(options.body));
        // userData[user].is = is;
        return {
            code: 0,
            message: 'Tag updated successfully',
            data: userData  // 返回更新后的用户数据
        };
    } else {
        // 如果未找到对应的用户数据，则返回错误信息
        return {
            code: 1,
            message: 'User not found'
        };
    }
})


