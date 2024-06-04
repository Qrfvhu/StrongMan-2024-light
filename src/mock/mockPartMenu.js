import Mock from 'mockjs';
import partData from '../components/partMenuData';
import partMenuData from "../components/partMenuData";

//角色列表的分配列表

//获取具体角色的属性
Mock.mock(/\/part\/list\/menu\?id=\d+/, 'get', (options) => {
    const url = options.url;
    const id = url.match(/\?id=(\d+)/)[1];
    const part = partData.find(part => part.id === id);
    if (part) {
        return {
            code: 0,
            message: '查询成功',
            data : part,
        };
    }else {
        return {
            code: 1,
            message: '查询失败',
        };
    }

});

//修改对应角色的tag属性
Mock.mock(/\/part\/list\/updateMenu\?id=\d+&currentValue=.*/, 'post', (options) => {
    // 从 URL 中获取 id
    const id = options.url.match(/\?id=(\d+)/)[1];
    // 从 URL 中获取 currentValue
    const currentValue = options.url.match(/currentValue=(.*)/)[1];
    const part = partData.find(part => part.id === id);
    if (part) {
        const currentValueArray = currentValue.split(',');
        part.tag = currentValueArray;
        return {
            code: 0,
            message: '查询成功',
        };
    }else {
        return {
            code: 1,
            message: '查询失败',
        };
    }
})

//修改对应具体角色的list属性
Mock.mock(/\/part\/list\/updateResource\?id=\d+&currentValue=.*/, 'post', (options) => {
    // 从 URL 中获取 id
    const id = options.url.match(/\?id=(\d+)/)[1];
    // 从 URL 中获取 currentValue
    const currentValue = options.url.match(/currentValue=(.*)/)[1];
    const part = partData.find(part => part.id === id);
    if (part) {
        const currentValueArray = currentValue.split(',');
        part.resource = currentValueArray;
        return {
            code: 0,
            message: '查询成功',
        };
    }else {
        return {
            code: 1,
            message: '查询失败',
        };
    }
})

//通过属性名获取到对应的菜单tag
Mock.mock(/\/menu\/usertag\?part=.*/,'get',(options) =>{
    const url = options.url;
    const part = url.match(/part=(.*)/)[1];
    const currentValueArray = part.split(',');
    //根据用户tag查询对应角色分配的菜单
    const matchedData = partMenuData.filter(item => currentValueArray.includes(item.value));

    // 从 matchedData 中提取所有子对象的 tag 属性，并合并成一个新的列表
    const combinedTags = [...new Set(matchedData.flatMap(item => item.tag))];

    return combinedTags;
})
