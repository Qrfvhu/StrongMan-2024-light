import Login from "../views/login";
import Menu from "../views/menu";

import {createBrowserRouter} from "react-router-dom";
import Home from "../views/home";
import Add from "../views/goods/add";
import Register from "../views/register";
//商品
import GoodsList from "../views/goods/list";
import GoodsCate from "../views/goods/category";
import GoodsType from "../views/goods/type";
import GoodsBrand from "../views/goods/brand";

//订单
import OrderList from "../views/order/orderList";
import OrderReason from "../views/order/orderReason";
import OrderRequest from "../views/order/orderRequest";
import OrderSetting from "../views/order/orderSetting";

//权限
import UserList from "../views/manage/user"
import UserPart from "../views/manage/part";
import UserPartMenu from "../views/manage/part/menuList";
import UserPartResource from "../views/manage/part/resourceList";

import MenuList from "../views/manage/menu";
import ResourceList from "../views/manage/resource";


const router = createBrowserRouter([
    {
        path:'/',
        element:<Login />
    },
    {
        path:'/register',
        element:<Register />
    },
    {
        path:'/menu',
        element:<Menu />,
        children:[
            {
                index:true,
                element:<Home />,
            },
            {
                path:'goods/list',
                element:<GoodsList />,
            },
            {
                path:'goods/add',
                element:<Add />,
            },
            {
                path:'goods/category',
                element:<GoodsCate />,
            },
            {
                path:'goods/type',
                element:<GoodsType />,
            },
            {
                path:'goods/brand',
                element:<GoodsBrand />,
            },
            {
                path:'/menu/order/list',
                element:<OrderList />,
            },
            {
                path:'/menu/order/setting',
                element:<OrderSetting />,
            },
            {
                path:'/menu/order/request',
                element:<OrderRequest />,
            },
            {
                path:'/menu/order/reason',
                element:<OrderReason />,
            },
            {
                path:'user/list',
                element:<UserList />,
            },
            {
                path:'user/part',
                element:<UserPart />,
            },
            {
                path:'user/part/menu',
                element:<UserPartMenu />,
            },
            {
                path:'user/part/resource',
                element:<UserPartResource />,
            },
            {
                path:'menu/list',
                element:<MenuList />,
            },
            {
                path:'resource/list',
                element:<ResourceList />,
            },
        ]
    },
])

export default router;
