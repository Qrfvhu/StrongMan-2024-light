import React, {useEffect, useState} from 'react';
import {
    CarryOutOutlined,
    DesktopOutlined,
    FileTextOutlined,
    HomeOutlined,
    UserOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
} from '@ant-design/icons';
import {Breadcrumb, Button, Layout, Menu, message} from 'antd';
import {Outlet, useNavigate, useSearchParams} from 'react-router-dom';
import axios from "axios";

//转换成对应的标识符
const icons = {
    HomeOutlined: <HomeOutlined />,
    CarryOutOutlined: <CarryOutOutlined />,
    FileTextOutlined: <FileTextOutlined />,
    DesktopOutlined: <DesktopOutlined />,
    UserOutlined: <UserOutlined />
};

const getIconComponent = (iconName) => {
    const IconComponent = icons[iconName];
    return IconComponent || null;
};

//menu动态展示以及对于icon转换以及对于登录用户权限开放菜单
const processMenuItems = (menuData, tags = []) => {
    const filteredMenu = menuData
        .filter(item => item.is)
        .map(item => {
            const IconComponent = getIconComponent(item.icon);
            const menuItem = {
                key: item.key || item.id,
                label: item.label,
                icon: IconComponent,
            };
            if (item.children) {
                menuItem.children = item.children
                    .filter(child => !child.tag || (typeof child.tag === 'string' && tags.includes(child.tag)))
                    .map(child => {
                        const ChildIconComponent = getIconComponent(child.icon);
                        return {
                            key: child.key || child.id,
                            label: child.label,
                            icon: ChildIconComponent,
                        };
                    });
                // If no children are left after filtering, we remove the parent item
                if (menuItem.children.length === 0) {
                    return null;
                }
            }
            return menuItem;
        })
        // Filter out any null items which represent parents with no valid children
        .filter(item => item !== null);

    return filteredMenu;
};

const { Header, Sider, Content } = Layout;

const MenuList = () => {

    //获取对应id
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [params] = useSearchParams();
    const id = params.get('id');
    const userId = localStorage.getItem('userId');

    const [tags, setTags] = useState([]);

    //通过登录数据进行查询对应的数据
    const tagData = async () => {
        try {
            const response = await axios.get(`/user/get?id=${userId}`);
            if(response.data.code === 0) {
                const tag = response.data.data.tag;
                const result = await axios.get(`/menu/usertag?part=${tag}`);
                setTags(result.data);
            }else {
                console.log(response.data.code);
            }

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const [collapsed, setCollapsed] = useState(false);
    const navigateTo = useNavigate();

    const menuClick = (e) => {
        navigateTo(e.key);
    };

    // 初始化 data 状态为一个空数组
    let [data, setData] = useState([]);

    useEffect(() => {
        tagData();
        fetchData(); // 在组件加载后调用 fetchData 函数
    }, []); // 依赖项为空数组，表示只在组件加载时触发一次

    //初始请求数据
    const fetchData = async () => {
        try {
            const response = await axios.get('/menu/list');
            setData(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    //menu动态展示+图标转换
    const menu = processMenuItems(data,tags);

    // 退出登录
    const handleLogout = () => {
        // 提示用户已经退出登录
        message.success('您已成功退出登录');
        // 重定向到登录页或者首页
        navigateTo('/'); // 假设你的登录页路径是 /login
    };


    return (
        <Layout
            style={{
                minHeight: '100vh',
            }}
        >
            <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
                <div className="demo-logo-vertical" />
                <Menu
                    theme="dark"
                    defaultSelectedKeys={['1']}
                    mode="inline"
                    items={menu}
                    onClick={menuClick}
                >
                </Menu>
            </Sider>
            <Layout>
                <Header
                    style={{
                        padding: 0,
                        background: '#fff',
                    }}
                >
                    <div
                        style={{
                            float:"left",
                        }}
                    >
                        <Button
                            type="text"
                            icon={collapsed ? <MenuUnfoldOutlined/> : <MenuFoldOutlined/>}
                            onClick={() => setCollapsed(!collapsed)}
                            style={{
                                fontSize: '16px',
                                width: 64,
                                height: 64,
                            }}
                        />
                    </div>
                    <div
                        style={{
                            float:"right",
                            marginRight: '20px',
                            alignItems: 'center',
                            height: "100%"
                        }}
                    >
                        <Button type="primary" onClick={handleLogout}>
                            退出登录
                        </Button>
                    </div>
                </Header>
                <Content
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 280,
                        background: '#fff',
                    }}
                >
                    <Outlet context={{updateData: setData}}/>
                </Content>
            </Layout>
        </Layout>
    );
};

export default MenuList;
