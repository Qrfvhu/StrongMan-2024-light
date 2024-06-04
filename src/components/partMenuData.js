//菜单分配
let partMenuData = [
    {
        id:"1",
        label:'商品管理员',
        value: 'shop',
        //具有的属性
        tag:[
            'goodsList','goodsAdd','goodsCate','goodsType','goodsBrand',
        ],
        resource: ['GBM','GACM','GAM','GCM','GMM','GISM',
            'GUILUM','LOM',
            'GSM','TSM',
        ],
    },
    {
        id:"2",
        label:'订单管理员',
        value: 'list',
        //具有的属性
        tag:[
            'orderList','orderSetting','orderRequest','orderReason',
        ],
        resource: ['OLM','ORRM','RRM','OSM','ASM',
            'GUILUM','LOM',
        ],
    },
    {
        id:"3",
        label:'超级管理员',
        value: 'super',
        //具有的属性
        tag:[
            'goodsList','goodsAdd','goodsCate','goodsType','goodsBrand',
            'orderList','orderSetting','orderRequest','orderReason',
            'userList','partList','menuList','resourceList',
        ],
        resource: ['GBM','GACM','GAM','GCM','GMM','GISM',
            'OLM','ORRM','RRM','OSM','ASM',
            'BUM','BRM','MM','RCM','RM','GUILUM','LOM',
            'GSM','TSM',
            'MLM',
        ],
    }
];

export default partMenuData;
