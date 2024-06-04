import Mock from 'mockjs';
import partData from '../components/partData';


//list
Mock.mock(/\/part\/list\?values=.*/, 'get', (options) => {
    const url = options.url;
    const values = url.match(/values=(.*)/)[1];
    if (values && values !== 'undefined') {
        const similarUsers = partData.filter(part => part.label.includes(values));
        return similarUsers;
    } else {
        return partData;
    }
});

//删除
Mock.mock('/part/delete', 'delete', (options) => {
    return {
        code: 0,
        message: '删除'
    }
});

//修改是否启用
Mock.mock('/part/updateIs', 'post', (options) => {
    const { id } = JSON.parse(options.body);

    const user = partData.findIndex(user => user.id === id);
    if (user!== -1) {
        // 如果找到了对应的用户数据，则更新其标签属性为新的标签
        partData.splice(id-1, 1, JSON.parse(options.body));
        // userData[user].is = is;
        return {
            code: 0,
            message: 'Tag updated successfully',
            data: partData  // 返回更新后的用户数据
        };
    } else {
        // 如果未找到对应的用户数据，则返回错误信息
        return {
            code: 1,
            message: 'User not found'
        };
    }
});

//新增
Mock.mock(/\/part\/add\?label=.+&describe=.*/, 'get', (options) => {
    const url = options.url;
    const label = url.match(/label=([^&]+)/)[1];
    const describe = url.match(/describe=([^&]+)/)[1];
    const id = `${Math.floor(Math.random() * 1000)}`;
    const userNumber = '1';
    const addTime = '2021-01-01';
    const is = 'true'
    partData.push({id,label,describe,userNumber,addTime,is})
    return partData;
})

//修改
Mock.mock(/\/part\/update\?id=.+label=.+&describe=.*/, 'get', (options) =>{
    const url = options.url;
    const id = url.match(/id=(\d+)/)[1];
    const label = url.match(/label=([^&]+)/)[1];
    const describe = url.match(/describe=([^&]+)/)[1];
    console.log(id);
    const updatedUserData = partData.map(part => {
        // 如果当前对象的 id 与要更新的 id 匹配，则更新属性
        if (part.id == id) {
            // 使用对象的属性赋值语法更新属性
            return {
                ...part,
                label: label,
                describe: describe,
            };
        }
        // 如果当前对象的 id 与要更新的 id 不匹配，则返回原始对象
        return part;
    });

    console.log(updatedUserData)
    return updatedUserData;
});
