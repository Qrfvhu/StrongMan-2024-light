const partResourceList = [
    {
        title: '全选',
        key: 'all',
        children: [
            {
                title: '商品模块',
                key: 'GM',
                children: [
                    {
                        title: '商品品牌管理',
                        key: 'GBM',
                    },
                    {
                        title: '商品属性分类管理',
                        key: 'GACM',
                    },
                    {
                        title: '商品属性管理',
                        key: 'GAM',
                    },
                    {
                        title: '商品分类管理',
                        key: 'GCM',
                    },
                    {
                        title: '商品管理',
                        key: 'GMM',
                    },
                    {
                        title: '商品库存管理',
                        key: 'GISM',
                    },
                ],
            },
            {
                title: '订单模块',
                key: 'OM',
                children: [
                    {
                        title: '订单管理',
                        key: 'OLM',
                    },
                    {
                        title: '订单订单退货申请管理',
                        key: 'ORRM',
                    },
                    {
                        title: '退货原因管理',
                        key: 'RRM',
                    },
                    {
                        title: '订单设置管理',
                        key: 'OSM',
                    },
                    {
                        title: '收货地址管理',
                        key: 'ASM',
                    },
                ],
            },
            {
                title: '权限模块',
                key: 'PM',
                children: [
                    {
                        title: '后台用户管理',
                        key: 'BUM',
                    },
                    {
                        title: '后台用户角色管理',
                        key: 'BRM',
                    },
                    {
                        title: '后台菜单管理',
                        key: 'MM',
                    },
                    {
                        title: '后台资源分类管理',
                        key: 'RCM',
                    },
                    {
                        title: '后台资源管理',
                        key: 'RM',
                    },
                    {
                        title: '获取登录用户信息',
                        key: 'GUILUM',
                    },
                    {
                        title: '用户登出',
                        key: 'LOM',
                    },
                ],
            },
            {
                title: '内容模块',
                key: 'CM',
                children: [
                    {
                        title: '商品优选模块',
                        key: 'GSM',
                    },
                    {
                        title: '商品专题管理',
                        key: 'TSM',
                    },
                ],
            },
            {
                title: '其他模块',
                key: 'TM',
                children: [
                    {
                        title: '会员等级管理',
                        key: 'MLM',
                    },
                ],
            },
        ],
    },
];

export default partResourceList;
