import React, {useEffect, useState} from "react";
import {
    SearchOutlined,
    BarsOutlined,
} from '@ant-design/icons';
import {Button, Form, Input, Modal, Space, Switch, Table} from "antd";
import axios from "axios";
import {useOutletContext} from "react-router-dom";
// import data from "../../../components/menuData"

const MangeMenu =()=>{

    //调用父组件中的setMenuData函数
    const { updateData } = useOutletContext();

    //表格数据
    const columns = [
        {
            title: '编号',
            dataIndex: 'id',
            key: 'id',
            width: 200,
        },
        {
            title: '菜单名称',
            dataIndex: 'label',
            key: 'label',
            width: 200,
        },
        {
            title: '菜单级数',
            dataIndex: 'describe',
            key: 'describe',
            width: 200,
        },
        {
            title: '前端名称',
            dataIndex: 'frontName',
            key: 'frontName',
            width: 200,
        },
        {
            title: '排序',
            dataIndex: 'sort',
            key: 'sort',
            width: 200,
        },
        {
            title: '是否启用',
            key: 'switch',
            render: (text, record) => (
                <Switch
                    defaultChecked={record.is === true}
                    onChange={checked => onSwitch(checked, record)}
                />
            )
        },
        {
            title: '操作',
            key: 'action',
            width: 200,
            render: (text, record) => (
                <Space size="middle">
                    <a>编辑</a>
                    <a onClick={() => handleDelete(record)}>删除</a>
                </Space>
            ),
        },
    ];

    //初始化 data 状态为一个空数组
    let [data, setData] = useState([]);

    useEffect(() => {
        fetchData(); // 在组件加载后调用 fetchData 函数
    }, []); // 依赖项为空数组，表示只在组件加载时触发一次

    //初始请求数据
    const fetchData = async () => {
        try {
            const response = await axios.get('/menu/list');
            console.log(response.data);
            setData(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    //删除
    const handleDelete = async (record) => {
        try {
            const response = await axios.delete('/part/delete', record);
            if (response.data.code === 0) {
                // // 过滤掉被删除的用户数据，更新状态
                setData(data.filter(item => item.id !== record.id));
            }else {
                Modal.error({
                    title: '删除失败',
                    content: response.data.message,
                });
            }
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    //是否启用
    const onSwitch = async (checked,record) => {
        record.is = checked;
        const response = await axios.post('/menu/updateIs', record);
        if (response.data.code === 0) {
            setData(response.data.data)
            updateData(response.data.data);
        }
    };

    return (
        <div>
            <div className="label">
                <div>
                    <BarsOutlined
                        style={{
                            marginRight:"10px",
                        }}
                    />
                    <span>数据列表</span>
                </div>
            </div>
            <div className="list">
                <Table columns={columns} dataSource={data} gination={{ pageSize: 5 }}/>
            </div>
        </div>
    )
}

export default MangeMenu;
