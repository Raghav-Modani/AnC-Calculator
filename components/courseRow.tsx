import React from 'react'
import { Row, Col, Input, InputNumber, Menu, Dropdown } from 'antd';
import { useState, useEffect } from 'react';
import { DownOutlined } from '@ant-design/icons';

// component used for rendering the different rows 
function CourseRow({ courseCode, creditValue, credits, grades, id }: any) {
    const [grade, setgrade] = useState(undefined)
    const [credit, setCredit] = useState(Number(creditValue))
    // Set the grade value
    const onClick = ({ key }: any) => {
        setgrade(key)
    };

    const menu = (
        <Menu onClick={onClick}>
            <Menu.Item key="A*/A">A*/A</Menu.Item>
            <Menu.Item key="B"> B </Menu.Item>
            <Menu.Item key="C"> C </Menu.Item>
            <Menu.Item key="D"> D </Menu.Item>
            <Menu.Item key="E"> E </Menu.Item>
            <Menu.Item key="F"> F </Menu.Item>
            <Menu.Item key="Drop">Drop</Menu.Item>
        </Menu>
    )
    useEffect(() => {
        credits(credit, id)
    }, [credit])
    useEffect(() => {
        grades(grade, id)
    }, [grade])
    return (
        <>
            <Row style={{ fontSize: '0.8rem', rowGap: '1rem', margin: '0.2rem', display: 'flex', alignItems: 'center' }}>
                <Col xs={8} sm={12} md={12} lg={8} xl={8}>
                    <Input placeholder="Course Code" style={{ textAlign: 'center' }} defaultValue={courseCode} />
                </Col>
                <Col xs={8} sm={6} md={6} lg={8} xl={8}>
                    <InputNumber min={0} defaultValue={Number(creditValue)} onChange={(value) => setCredit(value)} />
                </Col>
                <Col xs={8} sm={6} md={6} lg={8} xl={8}>
                    <Dropdown overlay={menu} trigger={['click']}>
                        <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                            {grade ? grade : 'Grade'} <DownOutlined />
                        </a>
                    </Dropdown>
                </Col>
            </Row>
        </>
    )
}

export default CourseRow
