import React from 'react';
import {Button, Input, Space } from "antd"
import { AudioOutlined } from '@ant-design/icons';
 import { ButtonStyle, Container } from './styles';

 const { Search } = Input;

    const suffix = (
    <AudioOutlined
        style={{
        fontSize: 16,
        color: '#1890ff',
        }}
    />
    );

const InputButton: React.FC = () => {

  return(


    <div>
    <Container>
    <Space direction="vertical">
    <Search placeholder="input search text" enterButton />
  </Space>
  </Container>

  <ButtonStyle>
    <Button type="primary" shape="round"> Novo Cofre</Button>
  </ButtonStyle>

</div>


  );
}

export default InputButton;