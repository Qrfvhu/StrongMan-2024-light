import React from 'react';
import { Button, Checkbox, Form, Input } from 'antd';
import { useNavigate } from "react-router-dom";
import { Modal } from 'antd';
// import {request} from '../../utils'

import axios from 'axios';

const Login = () => {
    const navigateTo = useNavigate();

    const onFinish = async (values) => {
        console.log('Success:', values);

        try {
            // 发送登录请求到后端
            const response = await axios.post('/login', values);

            // 假设后端返回的数据code 0是正确 1是错误
            if (response.data.code === 0) {
                console.log('Login Successful');
                if(response.data.data.is == 'true'){
                    const id = response.data.data.id;
                    localStorage.setItem('userId', id);
                    navigateTo(`/menu?id=${id}`);
                }else{
                    Modal.error({
                        title: '登录失败',
                        content: '该账号已经未启用，请换其他账号登录',
                    });
                }
            } else {
                console.log('Login Failed');
                Modal.error({
                    title: '登录失败',
                    content: '输入密码或用户名错误，请重新输入',
                });
            }
        } catch (error) {
            console.error('An error occurred during login:', error);
            // 处理请求错误，例如显示错误消息
            Modal.error({
                title: '登录失败',
                content: '登录过程中发生了错误，请稍后再试',
            });
        }
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    // 点击注册按钮时导航到 "/register"
    const handleRegister = () => {
        navigateTo('/register');
    };

    return (
        <div
            style={{
                display: 'flex',
                alignItems: 'center',
                height: '100vh',
                width: '100%',
            }}
        >
            <div
                style={{
                    float:"left",
                    width:"70%",
                    height:"80vh",
                    borderRight: "1px solid #000",
                }}
            ></div>
            <div
                style={{
                    float:"left",
                    width: '30%',
                    marginLeft: 'auto',
                    marginRight: '15%',
                }}
            >
                <Form
                    name="basic"
                    labelCol={{
                        span: 8,
                    }}
                    wrapperCol={{
                        span: 16,
                    }}
                    style={{
                        maxWidth: 600,
                    }}
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item
                        label="用户名"
                        name="username"
                        rules={[
                            {
                                required: true,
                                message: '请输入你的用户名!',
                            },
                        ]}
                    >
                        <Input/>
                    </Form.Item>

                    <Form.Item
                        label="密码"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: '请输入你的密码!',
                            },
                            {
                                pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,16}$/,
                                message: '密码必须包含至少一个大写字母、一个小写字母和一个数字，长度在8到16个字符之间',
                            },
                        ]}
                    >
                        <Input.Password/>
                    </Form.Item>

                    <Form.Item
                        name="remember"
                        valuePropName="checked"
                        wrapperCol={{
                            offset: 8,
                            span: 16,
                        }}
                    >
                        <Checkbox>记住我</Checkbox>
                    </Form.Item>

                    <Form.Item
                        wrapperCol={{
                            offset: 8,
                            span: 16,
                        }}
                    >
                        <Button  htmlType="submit" style={{marginRight: '20px'}}>
                            登录
                        </Button>

                        <Button  onClick={handleRegister}>
                            注册
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
};
export default Login;
