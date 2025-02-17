//菜单列表数据
let menuData = [
    {
        id: 1,
        label: '首页',
        describe: '一级',
        frontName: 'home',
        key: '/menu',
        sort: '0',
        tag:'home',
        icon: 'HomeOutlined',
        children: null,
        is: true,
    },
    {
        id: 2,
        label: '商品',
        describe: '一级',
        frontName: 'goods',
        sort: '0',
        tag:'goods',
        icon: 'CarryOutOutlined',
        is: true,
        children: [
            {
                id: 3,
                label: '商品列表',
                describe: '二级',
                frontName: 'goodslist',
                sort: '0',
                tag:'goodsList',
                icon: null,
                children: null,
                key: '/menu/goods/list',
                is: true,
            },
            {
                id: 4,
                label: '添加商品',
                describe: '二级',
                frontName: 'goodsadd',
                sort: '0',
                tag:'goodsAdd',
                icon: null,
                children: null,
                key: '/menu/goods/add',
                is: true
            },
            {
                id: 5,
                label: '商品分类',
                describe: '二级',
                frontName: 'goodscate',
                sort: '0',
                tag:'goodsCate',
                icon: null,
                children: null,
                key: '/menu/goods/category',
                is: true,
            },
            {
                id: 6,
                label: '商品类型',
                describe: '二级',
                frontName: 'goodstype',
                sort: '0',
                tag:'goodsType',
                icon: null,
                children: null,
                key: '/menu/goods/type',
                is: true,
            },
            {
                id: 7,
                label: '品牌类型',
                describe: '二级',
                frontName: 'goodsbrand',
                sort: '0',
                tag:'goodsBrand',
                icon: null,
                children: null,
                key: '/menu/goods/brand',
                is: true,
            }
        ]
    },
    {
        id: 8,
        label: '订单',
        describe: '一级',
        frontName: 'order',
        sort: '0',
        tag:'order',
        icon: 'FileTextOutlined',
        is: true,
        children: [
            {
                id: 9,
                label: '订单列表',
                describe: '二级',
                frontName: 'orderlist',
                sort: '0',
                tag:'orderList',
                icon: null,
                children: null,
                key: '/menu/order/list',
                is: true,
            },
            {
                id: 10,
                label: '订单设置',
                describe: '二级',
                frontName: 'ordersetting',
                sort: '0',
                tag:'orderSetting',
                icon: null,
                children: null,
                key: '/menu/order/setting',
                is: true,
            },
            {
                id: 11,
                label: '退货申请处理',
                describe: '二级',
                frontName: 'orderrequest',
                sort: '0',
                tag:'orderRequest',
                icon: null,
                children: null,
                key: '/menu/order/request',
                is: true,
            },
            {
                id: 12,
                label: '退货原因设置',
                describe: '二级',
                frontName: 'orderreason',
                sort: '0',
                tag:'orderReason',
                icon: null,
                children: null,
                key: '/menu/order/reason',
                is: true,
            }
        ]
    },
    {
        id: 14,
        label: '权限',
        describe: '一级',
        frontName: 'manage',
        sort: '0',
        tag:'manage',
        icon: 'UserOutlined',
        is: true,
        children: [
            {
                id: 15,
                label: '用户列表',
                describe: '二级',
                frontName: 'userlist',
                sort: '0',
                tag:'userList',
                icon: null,
                children: null,
                key: '/menu/user/list',
                is: true,
            },
            {
                id: 16,
                label: '角色列表',
                describe: '二级',
                frontName: 'userpart',
                sort: '0',
                tag:'partList',
                icon: null,
                children: null,
                key: '/menu/user/part',
                is: true,
            },
            {
                id: 17,
                label: '菜单列表',
                describe: '二级',
                frontName: 'menulist',
                sort: '0',
                tag:'menuList',
                icon: null,
                children: null,
                key: '/menu/menu/list',
                is: true,
            },
            {
                id: 18,
                label: '资源管理',
                describe: '二级',
                frontName: 'resource',
                sort: '0',
                tag:'resourceList',
                icon: null,
                children: null,
                key: '/menu/resource/list',
                is: true,
            }
        ]
    }
];

export default menuData;
