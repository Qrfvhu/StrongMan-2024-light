//角色列表分配菜单列表的数据
const treeData = [
    {
        title: '全选',
        key: 'all',
        children: [
            {
                title: '商品',
                key: 'goods',
                children: [
                    {
                        title: '商品列表',
                        key: 'goodsList',
                    },
                    {
                        title: '添加商品',
                        key: 'goodsAdd',
                    },
                    {
                        title: '商品分类',
                        key: 'goodsCate',
                    },
                    {
                        title: '商品类型',
                        key: 'goodsType',
                    },
                    {
                        title: '品牌管理',
                        key: 'goodsBrand',
                    },
                ],
            },
            {
                title: '订单',
                key: 'order',
                children: [
                    {
                        title: '订单列表',
                        key: 'orderList',
                    },
                    {
                        title: '订单设置',
                        key: 'orderSetting',
                    },
                    {
                        title: '退货申请处理',
                        key: 'orderRequest',
                    },
                    {
                        title: '退货原因设置',
                        key: 'orderReason',
                    },
                ],
            },
            {
                title: '权限',
                key: 'manage',
                children: [
                    {
                        title: '用户列表',
                        key: 'userList',
                    },
                    {
                        title: '角色列表',
                        key: 'partList',
                    },
                    {
                        title: '菜单列表',
                        key: 'menuList',
                    },
                    {
                        title: '资源列表',
                        key: 'resourceList',
                    },
                ],
            },
        ],
    },
];

export default treeData;
