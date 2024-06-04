import React, {useEffect, useState} from "react";
import "./index.css"
import {
    SearchOutlined,
    BarsOutlined,
} from '@ant-design/icons';
import {Button, Form, Input, Modal, Space, Switch, Table} from "antd";
// import data from '../../../components/partData'
import axios from "axios";
import {useNavigate} from "react-router-dom";

const MangePart =()=>{
    //表格数据
    const columns = [
        {
            title: '编号',
            dataIndex: 'id',
            key: 'id',
            width: 100,
        },
        {
            title: '角色名称',
            dataIndex: 'label',
            key: 'label',
            width: 300,
        },
        {
            title: '描述',
            dataIndex: 'describe',
            key: 'describe',
            width: 300,
        },
        {
            title: '用户数',
            dataIndex: 'userNumber',
            key: 'userNumber',
            width: 100,
        },
        {
            title: '添加时间',
            dataIndex: 'addTime',
            key: 'addTime',
            width: 200,
        },
        {
            title: '是否启用',
            key: 'switch',
            width: 100,
            render: (text, record) => (
                <Switch
                    defaultChecked={record.is === 'true'}
                    onChange={checked => onSwitch(checked, record)}
                />
            )
        },
        {
            title: '操作',
            key: 'action',
            width: 300,
            render: (text, record) => (
                <Space size="middle">
                    <a onClick={() => handleMenu(record)}>分配菜单</a>
                    <a onClick={() => handleResource(record)}>分配资源</a>
                    <a onClick={() => handleEdit(record)}>编辑</a>
                    <a onClick={() => handleDelete(record)}>删除</a>
                </Space>
            ),
        },
    ];

    const navigateTo = useNavigate();

    const [showHiddenDiv, setShowHiddenDiv] = useState(false);

    //创建表单实例
    const [form] = Form.useForm();

    // 点击按钮时切换显示状态
    const toggleHiddenDiv = () => {
        setShowHiddenDiv(!showHiddenDiv);
    };

    // 初始化 data 状态为一个空数组
    let [data, setData] = useState([]);

    useEffect(() => {
        fetchData(); // 在组件加载后调用 fetchData 函数
    }, []); // 依赖项为空数组，表示只在组件加载时触发一次

    //初始请求数据
    const fetchData = async () => {
        try {
            const response = await axios.get('/part/list?values=');
            setData(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [modalTitle, setModalTitle] = useState('');
    const [addOrUpdate] = Form.useForm();
    const [currentRecordadd, setCurrentRecordadd] = useState(null);

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

    //分配菜单
    const handleMenu = (record) => {
        navigateTo('/menu/user/part/menu?id=' + record.id);
    }

    //分配资源
    const handleResource = (record) => {
        navigateTo('/menu/user/part/resource?id=' + record.id);
    }

    //是否启用
    const onSwitch = async (checked,record) => {
        console.log(`switch to ${checked}`);
        record.is = checked;
        const response = await axios.post('/part/updateIs', record);
        setData(response.data.data)
    };

    //查询搜索
    const onSearch = async () => {
        const values = form.getFieldValue('search');
        const response = await axios.get(`/part/list?values=${values}`);
        setData(response.data);
    };

    //重置表单的值
    const onReset = async () => {
        form.resetFields();// 重置表单字段的值
    };

    //编辑
    const handleEdit = (record) => {
        setCurrentRecordadd(record);
        setModalTitle('编辑角色');
        setIsModalVisible(true);
        addOrUpdate.setFieldsValue(record);
    };

    //新增
    const handleAdd =  () =>{
        setCurrentRecordadd(null);
        setModalTitle('新增角色');
        setIsModalVisible(true);
        addOrUpdate.resetFields();
    };

    const handleCancelAdd = () => {
        setIsModalVisible(false);
    };

    //进行新增或修改
    const handleOkAdd = () =>{
        addOrUpdate.validateFields()
            .then(async values => {
                const label = values.label;
                const describe = values.describe;
                if (currentRecordadd === null) {
                    //新增
                    const response = await axios.get(`/part/add?label=${label}&describe=${describe}`);
                    setData(response.data);
                } else {
                    //修改
                    const id = currentRecordadd.id
                    const response = await axios.get(`/part/update?id=${id}&label=${label}&describe=${describe}`);
                    setData(response.data);
                }
                setIsModalVisible(false);
            })
            .catch(info => {
                console.log('Validate Failed:', info);
            });
    };

    return (
        <div>
            <div className="header">
                <div className="header-left">
                    <SearchOutlined
                        style={{
                            marginRight:"10px",
                        }}
                    /><span>筛选搜索</span>
                    <Form form={form}>
                        <Form.Item
                            label="输入搜索"
                            name="search"
                            className="search-input"
                        >
                            <Input placeholder="账号/姓名"/>
                        </Form.Item>
                    </Form>
                </div>
                <div className="header-right">
                    <Button className="button" onClick={onReset}>重置</Button>
                    <Button className="button" type="primary" onClick={onSearch}>查询搜索</Button>
                </div>
            </div>
            <div className="label">
                <div>
                    <BarsOutlined
                        style={{
                            marginRight: "10px",
                        }}
                    />
                    <span>数据列表</span>
                </div>
                <div
                    style={{
                        float: "right",
                    }}
                >
                    <Button onClick={handleAdd}>新增</Button>
                </div>
            </div>
            <div className="list">
                <Table columns={columns} dataSource={data} gination={{pageSize: 5}}/>
            </div>
            <Modal
                title={modalTitle}
                visible={isModalVisible}
                onOk={handleOkAdd}
                onCancel={handleCancelAdd}
            >
                <Form
                    form={addOrUpdate} layout="horizontal" labelCol={{ span: 6 }} wrapperCol={{ span: 18 }}
                    className="centered-form"
                >
                    <Form.Item
                        name="label"
                        label="角色名称"
                        rules={[{ required: true, message: '请输入名称!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="describe"
                        label="描述"
                        rules={[{ required: true, message: '请输入描述!' }]}
                    >
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}

export default MangePart;
