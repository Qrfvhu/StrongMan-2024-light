import React, {useEffect, useState} from 'react';
import {Button, Tree} from 'antd'
import {useSearchParams} from "react-router-dom";
import treeData from '../../../../components/partResourceList';
import axios from "axios";
import './index.css'

const menuListStyle  = () => {

    //获取对应id
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [params] = useSearchParams();
    const id = params.get('id');

    // 初始化根据id获取到的角色对象
    // eslint-disable-next-line react-hooks/rules-of-hooks

    //eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
        fetchData(); // 在组件加载后调用 fetchData 函数
    }, []);
    // 依赖项为空数组，表示只在组件加载时触发一次

    //初始请求数据
    const fetchData = async () => {
        try {
            const response = await axios.get(`/part/list/menu?id=${id}`);
            if (response.data.code === 0) {
                setCheckedKeys(response.data.data.resource);
            }else {
                console.log(response.data.message);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [expandedKeys, setExpandedKeys] = useState(['GM', 'OM','PM']);

// eslint-disable-next-line react-hooks/rules-of-hooks
    const [checkedKeys, setCheckedKeys] = useState(['GM']);

// eslint-disable-next-line react-hooks/rules-of-hooks
    const [selectedKeys, setSelectedKeys] = useState([]);

// eslint-disable-next-line react-hooks/rules-of-hooks
    const [autoExpandParent, setAutoExpandParent] = useState(true);
    const onExpand = (expandedKeysValue) => {
        console.log('onExpand', expandedKeysValue);
        // if not set autoExpandParent to false, if children expanded, parent can not collapse.
        // or, you can remove all expanded children keys.
        setExpandedKeys(expandedKeysValue);
        setAutoExpandParent(false);
    };
    const onCheck = (checkedKeysValue) => {
        console.log('onCheck', checkedKeysValue);
        setCheckedKeys(checkedKeysValue);
    };
    const onSelect = (selectedKeysValue, info) => {
        console.log('onSelect', info);
        setSelectedKeys(selectedKeysValue);
    };

    //保存按键
    const handleSave =  async () => {
        const currentValue = checkedKeys;
        try {
            const response = await axios.post(`/part/list/updateResource?id=${id}&currentValue=${currentValue}`);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    //清空按键
    const handleClear = () => {
        setCheckedKeys([]);
    };


    return (
        <div className="app-container">
            <Tree
                checkable
                onExpand={onExpand}
                expandedKeys={expandedKeys}
                autoExpandParent={autoExpandParent}
                onCheck={onCheck}
                checkedKeys={checkedKeys}
                onSelect={onSelect}
                selectedKeys={selectedKeys}
                treeData={treeData}
            />
            <div className="button-container">
                <Button type="primary" onClick={handleSave}>保存</Button>
                <div style={{width: '20px'}}></div>
                <Button onClick={handleClear}>清空</Button>
            </div>
        </div>
    );
};
export default menuListStyle;
