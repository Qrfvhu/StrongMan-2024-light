import Mock from 'mockjs';
import userData from "../components/userData";

// login接口
Mock.mock('/login', 'post', (options) => {
    const { username, password } = JSON.parse(options.body);

    // 验证用户名和密码
    const user = userData.find(user => user.username === username && user.password === password);
    if (user) {
        return {
            code: 0,
            message: '登录成功',
            data: user,
            token: 'token'+username.toString()+password.toString(),
        };
    } else {
        return {
            code: 1,
            message: '用户名或密码错误'
        };
    }
});

// register
Mock.mock('/register', 'post', (options) => {
    const { username, password, email } = JSON.parse(options.body);
    const {tag} =([]);
    const id = Math.floor(Math.random() * 1000);
    const account = Math.floor(10000000 + Math.random() * 90000000);
    const is = 'true';
    const addTime = Date.now();
    const lastLogin = Date.now();
    const user = userData.find(user => user.username === username && user.password === password);
    if (user) {
        return {
            code: 1,
            message: '用户名已存在',
        };
    } else {
        userData.push({id,account, username,password,email,addTime,lastLogin ,tag,is})
        return {
            code: 0,
            message: '注册成功'
        }
    }
})

//list+搜索
Mock.mock(/\/user\/list\?values=.*/, 'get', (options) => {
    const url = options.url;
    const values = url.match(/values=(.*)/)[1];
    console.log(values)
    if (values && values !== 'undefined') {
        const similarUsers = userData.filter(user => user.username.includes(values));

        return similarUsers;
    } else {
        return userData;
    }

});

//删除用户
Mock.mock('/user/delete', 'delete', (options) => {
    return {
        code: 0,
        message: '删除成功'
    }
});

//根据id查找用户
Mock.mock(/\/user\/get\?id=\d+/, 'get', (options) => {
    const url = options.url;
    const id = url.match(/id=(.*)/)[1];
    const user = userData.find(user => user.id === id);
    if (user) {
        return {
            code: 0,
            data: user,
        };
    } else {
        return {
            code: 1,
        }
    }
});

//新增
Mock.mock(/\/user\/add\?account=.+&username=.+&email=.+&password=.*/, 'get', (options) => {
    const url = options.url;
    const account = url.match(/account=([^&]+)/)[1];
    const username = url.match(/username=([^&]+)/)[1];
    const email = url.match(/email=([^&]+)/)[1];
    const password = url.match(/password=([^&]+)/)[1];
    const {tag} =([]);
    const id = `${Math.floor(Math.random() * 1000)}`;
    const is = 'true';
    const addTime = '2021-01-01';
    const lastLogin = '2021-01-01';
    userData.push({id,account, username,password,email,addTime,lastLogin ,tag,is})
    return userData;
});

//修改
Mock.mock(/\/user\/update\?id=.+&account=.+&username=.+&email=.+&password=.*/, 'get', (options) => {
    const url = options.url;
    const id = url.match(/id=(\d+)/)[1];
    const account = url.match(/account=([^&]+)/)[1];
    const username = url.match(/username=([^&]+)/)[1];
    const email = url.match(/email=([^&]+)/)[1];
    const password = url.match(/password=([^&]+)/)[1];
    console.log(username, password, email);

    const updatedUserData = userData.map(user => {
        // 如果当前对象的 id 与要更新的 id 匹配，则更新属性
        if (user.id == id) {
            // 使用对象的属性赋值语法更新属性
            return {
                ...user,
                account: account,
                username: username,
                password: password,
                email: email
            };
        }
        // 如果当前对象的 id 与要更新的 id 不匹配，则返回原始对象
        return user;
    });

    return updatedUserData;
});
