import { Menu, Dropdown } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import React from 'react'
import { useState } from 'react';

const GradeDropdown = ( {Grade}:any ) => {
  const [grade, setgrade] = useState(undefined)
  const onClick = ({ key }: any) => {
    setgrade(key)
    Grade(grade)
  };

  const menu = (
    <Menu onClick={onClick}>
      <Menu.Item key="A*">A*</Menu.Item>
      <Menu.Item key="A"> A </Menu.Item>
      <Menu.Item key="B"> B </Menu.Item>
      <Menu.Item key="C"> C </Menu.Item>
      <Menu.Item key="D"> D </Menu.Item>
      <Menu.Item key="E"> E </Menu.Item>
      <Menu.Item key="F"> F </Menu.Item>
      <Menu.Item key="drop">Drop</Menu.Item>
    </Menu>
  );
  return (
    <Dropdown overlay={menu} trigger={['click']}>
      <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
        {grade ? grade : 'Select Grade'} <DownOutlined />
      </a>
    </Dropdown>
  )
}

export default GradeDropdown
