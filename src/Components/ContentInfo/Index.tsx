import React,{useEffect, useState } from 'react';
import {Button, Table} from "antd"
import { Container } from './styles';
import axios from 'axios';

const ContentInfo: React.FC = () => {

const [data, setData] = useState([
])

const [vault, setVault] = useState({

  name: String,
  id: Number,
  folders: Number,
})

const baseUrl = "http://localhost:3001/vaults"; 


const Colunas = [
  {
    key:  "id",
    title: 'id',
    dataIndex: 'id',
  },
  {
    key:  "name",
    title: 'name',
    dataIndex: 'name',
  },
  {
    key:  "folders",
    title: 'folders', 
    dataIndex: 'folders',
  },
  {
    key:  "ações",
    title: 'ações',
    dataIndex:"id",
    render: (id:1) => (
      <>
        <Button type="primary" danger > Deletar </Button>
      </>    
    )},
];

    const Get = async () => {
      try {
        const { data } = await axios.get(baseUrl)
        setData(data);
        console.log(data)
      } catch (error) {
        console.log(error)

        
      }
    }

     useEffect(() => {
      axios.delete(baseUrl + data)
          .then();
  }, []);
 


  useEffect(() => {
    Get();
  }, [])
  
  return (

    <Container>
    <Table columns={Colunas} dataSource={data} rowKey={"id"}>
    </Table>
    

    </Container>

  );

    
  }


export default ContentInfo;