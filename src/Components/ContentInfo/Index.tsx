import React,{useEffect, useState } from 'react';
import {Button, Table} from "antd"
import { Container } from './styles';
import axios from 'axios';
import { type } from 'os';

const ContentInfo: React.FC = () => {

const [data, setData] = useState([
])

const [vault, setVault] = useState({

  name: String,
  id: Number,
  folders: Number,
})


const Colunas = [
  {
    id: "id",
    title: 'id',
    dataIndex: 'id',
  },
  {
    id: "name",
    title: 'name',
    dataIndex: 'name',
  },
  {
    id: "folders",
    title: 'folders', 
    dataIndex: 'folders',
  },
  {
    id: "ações",
    title: 'ações',
    dataIndex:"id",
    render: (id:1) => (
      <>
        <Button type="primary" danger> Deletar </Button>
      </>    
    )},
];

  useEffect(()=>{}, [

    fetch("http://localhost:3001/vaults").then(resp=>resp.json())
    .then(resp=>setData(resp)),
    console.log(data)

  ])


  
  return (

    <Container>
    <Table columns={Colunas} dataSource={data}>
    </Table>

    </Container>

  );

    
  }


export default ContentInfo;