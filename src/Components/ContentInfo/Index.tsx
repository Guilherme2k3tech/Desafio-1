import React,{useEffect, useState } from 'react';
import {Button, Table} from "antd"
import { Container } from './styles';
import axios from 'axios';
import { type } from 'os';

const ContentInfo: React.FC = () => {

const [data, setData] = useState([
])

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
    render: (id:772) => (
      <>
        <Button type="primary" danger onClick={() => (id)}> Deletar </Button>
      </>    
    )},
];

  useEffect(()=>{}, [

    fetch("http://localhost:3001/vaults").then(resp=>resp.json())
    .then(resp=>setData(resp)),
    console.log(data)

  ])

  const deleteMethod = {
    method: 'DELETE',
    headers: {
     'Content-type': 'application/json; charset=UTF-8'
    },
   }

   fetch(("http://localhost:3001/vaults"), deleteMethod) 
   .then(response => response.json())
   .then(data => console.log(data)) 
   .catch(err => console.log(err))



   
  
  return (

    <Container>
    <Table columns={Colunas} dataSource={data}>
    </Table>
    <Button onClick={() => deleteMethod}></Button>

    </Container>

  );

    
  }


export default ContentInfo;