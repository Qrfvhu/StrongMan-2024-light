import React, {useEffect, useState} from "react";
import "./index.css"
import {
    SearchOutlined,
    BarsOutlined,
} from '@ant-design/icons';
import {Button, Form, Input, Modal, Select, Space, Switch, Table} from "antd";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import options from '../../../components/partData';

const UserPart =()=>{
    //跳转请求实现
    const navigateTo = useNavigate();

    //列表属性展示
    const columns = [
        {
            title: '编号',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: '账号',
            dataIndex: 'account',
            key: 'account',
        },
        {
            title: '姓名',
            dataIndex: 'username',
            key: 'username',
        },
        {
            title: '邮箱',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: '添加时间',
            dataIndex: 'addTime',
            key: 'addTime',
        },
        {
            title: '最后登录',
            dataIndex: 'lastLogin',
            key: 'lastLogin',
        },
        {
            title: '是否启用',
            key: 'switch',
            width: '200',
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
            render: (text, record) => (
                <Space size="middle">
                    <a onClick={() => handleAssignRole(record)}>分配角色</a>
                    <a onClick={() => handleEdit(record)}>编辑</a>
                    <a onClick={() => handleDelete(record)}>删除</a>
                </Space>
            ),
        },
    ];

    //删除用户
    const handleDelete = async (record) => {
        try {
            const response = await axios.delete('/menu/delete', record);
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

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [modalTitle, setModalTitle] = useState('');
    const [addOrUpdate] = Form.useForm();
    const [currentRecordadd, setCurrentRecordadd] = useState(null);

    //初始化请求数据
    let [data, setData] = useState([]); // 初始化 data 状态为一个空数组

    useEffect(() => {
        fetchData(); // 在组件加载后调用 fetchData 函数
    }, []); // 依赖项为空数组，表示只在组件加载时触发一次

    //初始请求数据
    const fetchData = async () => {
        try {
            // 发送网络请求获取数据
            const response = await axios.get('/user/list?values=');
            setData(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
            // 如果获取数据失败，使用预设的初始数据
            setData([
                {
                    id: '1',
                    account: '123456',
                    username: 'John Brown',
                    email: 'john.brown@gmail.com',
                    addTime: '2021-01-01',
                    lastLogin: '2021-01-01',
                    tag: ['super','list']
                }
            ]);
        }
    };

    //编辑用户
    const handleEdit = (record) => {
        setCurrentRecordadd(record);
        setModalTitle('编辑用户');
        setIsModalVisible(true);
        addOrUpdate.setFieldsValue(record);
    };

    //新增
    const handleAdd =  () =>{
        setCurrentRecordadd(null);
        setModalTitle('新增用户');
        setIsModalVisible(true);
        addOrUpdate.resetFields();
    };

    const handleCancelAdd = () => {
        setIsModalVisible(false);
    };

    //修改后获取修改后的tag
    const handleTagChange = (value) => {
        setSelectedTags(value); // Update selectedTags when Select value changes
        setCurrentRecord((prevRecord) => ({
            ...prevRecord,
            tag: value,
        }));
    };

    //是否启用按键
    const onSwitch = async (checked, record) => {
        record.is = checked;
        const response = await axios.post('/user/updateIs', record);
        setData(response.data.data)
    };

    //分配角色
    const [currentRecord, setCurrentRecord] = useState(null);
    const [selectedTags, setSelectedTags] = useState([]);

    //给分配角色模态窗传递当前列的数据
    const handleAssignRole = (record) => {
        setIsModalOpen(true);
        setCurrentRecord(record);
        setSelectedTags(record.tag);
    };

    const [isModalOpen, setIsModalOpen] = useState(false);

    //分配角色数据确认
    const handleOk = async () => {
        console.log(currentRecord)
        const response = await axios.post('/user/updateTag',currentRecord);
        setData(response.data.data);
        // fetchData();
        setIsModalOpen(false);
        setCurrentRecord(null);
        setSelectedTags([]);
    };
    //关闭分配角色模态窗
    const handleCancel = () => {
        setIsModalOpen(false);
        setCurrentRecord(null);
        setSelectedTags([]);
    };

    //创建表单实例
    const [form] = Form.useForm();

    //查询搜索
    const onSearch = async () => {
        const values = form.getFieldValue('search')
        const response = await axios.get(`/user/list?values=${values}`);
        setData(response.data)
    };

    //重置表单的值
    const onReset = async () => {
        form.resetFields();// 重置表单字段的值
    };

    //进行新增或修改
    const handleOkAdd = () =>{
        addOrUpdate.validateFields()
            .then(async values => {
                const account = values.account;
                const username = values.username;
                const email = values.email;
                const password = values.password;
                if (currentRecordadd === null) {
                    //新增
                    const response = await axios.get(`/user/add?account=${account}&username=${username}&email=${email}&password=${password}`);
                    setData(response.data);
                } else {
                    //修改
                    const id = currentRecordadd.id
                    const response = await axios.get(`/user/update?id=${id}&account=${account}&username=${username}&email=${email}&password=${password}`);
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
                            marginRight:"10px",
                        }}
                    />
                    <span>数据列表</span>
                </div>
                <div
                    style={{
                        float:"right",
                    }}
                >
                    <Button onClick={handleAdd}>新增</Button>
                </div>
            </div>
            <div className="list">
                <Table columns={columns} dataSource={data} pagination={{ pageSize: 5 }}/>
            </div>
            <Modal title="分配角色" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <Select
                    mode="multiple"
                    style={{
                        width: '100%',
                    }}
                    // value={currentRecord ? currentRecord.tag : []}
                    value={selectedTags}
                    placeholder="select one country"
                    options={options}
                    onChange={handleTagChange} // Handle value change
                    optionRender={(option) => (
                        <Space>
                            <span role="img" aria-label={option.data.label}>
                              {option.data.emoji}
                            </span>
                            {option.data.desc}
                        </Space>
                    )}
                />
            </Modal>
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
                        name="account"
                        label="账号"
                        rules={[{ required: true, message: '请输入账号!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="username"
                        label="姓名"
                        rules={[{ required: true, message: '请输入姓名!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="email"
                        label="邮箱"
                        rules={[{ required: true, message: '请输入邮箱!' }]}
                    >
                        <Input  />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        label="密码"
                        rules={[{ required: true, message: '请输入密码!' }]}
                    >
                        <Input.Password/>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}

export default UserPart;
