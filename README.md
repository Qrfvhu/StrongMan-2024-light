# 项目简介

本项目是一个基于react开发的信息管理系统，可以实现登录注册，对于当前的登录的用户可以按照他的角色进行动态菜单展示。
同时对于用户列表，角色菜单和菜单列表可以进行修改。

使用mock接口进行实现对于数据处理。

## 命令

项目安装依赖包

### `npm install`

运行项目

### `npm start`

## 结构介绍

├── README.md \
├── package.json\
├── public\
├── src  // 源代码\
│   ├── App.js   // 根组件\
│   ├── components   // 数据存储\
│   │   ├── menuData.js //菜单数据 \
│   │   ├── partData.js //角色列表数据 \
│   │   ├── partMenuData.js //角色对应菜单和资源 \
│   │   ├── partMenuList.js //分配菜单列表 \
│   │   ├── partResourceList.js //分配资源列表\
│   │   └── userData.js //用户数据列表\
│   ├── index.css  // 全局样式\
│   ├── index.js   // 入口文件\
│   ├── mock       // 接口模拟数据\
│   │   ├── mockManage.js // 分配角色tag mock \
│   │   ├── mockMenu.js // 菜单修改和获取 \
│   │   ├── mockPart.js //角色增删改查 \
│   │   ├── mockPartMenu.js //角色的菜单和资源修改和查询 \
│   │   ├── mockUser.js // 用户增删改查 \
│   │   └── index.js\
│   └──  views      // 项目页面目录\
│       ├── Home //主页\
│       ├── Login\
│       ├── register\
│       ├── menu  //导航栏\
│       ├── manage    // 菜单管理相关页面\
│       ├── Order   // 订单管理相关页面\
│       └── goods // 商品管理相关页面\



