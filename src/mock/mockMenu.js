import Mock from 'mockjs';
import menuData from '../components/menuData';

//list
Mock.mock('/menu/list', 'get', (options) => {
    return menuData;
});

//delete
Mock.mock('/menu/delete', 'delete', (options) => {
    const { id } = JSON.parse(options.body);

    const menu = menuData.findIndex(user => user.id === id);
    if (menu!== -1) {
        // 如果找到了对应的用户数据，则更新其标签属性为新的标签
        menuData.splice(id-1, 1);
        // userData[user].is = is;
        return {
            code: 0,
            message: 'Tag updated successfully',
            data: menuData  // 返回更新后的用户数据
        };
    } else {
        // 如果未找到对应的用户数据，则返回错误信息
        return {
            code: 1,
            message: 'User not found'
        };
    }
});

//是否启用
Mock.mock('/menu/updateIs', 'post', (options) => {

    const { id } = JSON.parse(options.body);
    const menu = menuData.findIndex(menu => menu.id === id);
    if (menu !== -1) {
        // menuData.splice(id-1, 1, JSON.parse(options.body));
        menuData[menu] = JSON.parse(options.body);
        return {
            code: 0,
            message: 'Tag updated successfully',
            data: menuData  // 返回更新后的用户数据
        }
    }else{
        return {
            code: 1,
            message: '修改失败',
        }
    }
});
