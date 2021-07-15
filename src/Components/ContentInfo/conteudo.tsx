import React, { useState, useEffect } from 'react';
import { Table, Button, Form, Input, Modal, Space, Switch, Select, Divider, Radio } from 'antd';
import 'antd/dist/antd.css';
import axios from 'axios';
import { Container } from './styles';
import SelectDropdownJson from "../SelectDropdownJson/SelectDropdownJson"

const { Item } = Form;
const baseUrl = "http://localhost:3001/vaults";


function VaultContent() {

  const [search, setSearch] = useState<string | undefined>();
 
  const [form] = Form.useForm();

  const [data, setData] = useState<any[]>([]);

  const [ModalFunction, setModalFuncion] = useState('');

  const [Cofre, setCofre] = useState({
    id: "",
    name: "",
    folders: "",
    Cofre: "",
    
  })


  const onFinish = (values: any) => {
    console.log(values);
  };

  const abrirFecharModal = (type: any) => {
    setModalFuncion(type)
  }

  const selectVault = (id: any, caso: any) => {
    console.log(id, caso)
    const CofreFilter = (data.filter(a => a.id === id)[0]);
    form.setFieldsValue({
      id: CofreFilter.id,
      name: CofreFilter.name,
      folders: CofreFilter.folders,
    });
    (caso === "Editar") ? abrirFecharModal('edit') : abrirFecharModal('delete')
  }

  const Get = async () => {
    try {
      const { data } = await axios.get(baseUrl)
      setData(data);
    } catch (error) {
      console.log(error)
    }
  }

   const PostAPI = async (values:any) => {
    try {
      const { data: novoCofre } = await axios.post(baseUrl, values)
      console.log(novoCofre, "Cofre")
      setData([...data, novoCofre])
      abrirFecharModal('')
    } catch (error) {
      console.log(error);
    }
  }

  const PutAPI = async (Cofre:any) => {
    try {
      const { data: ValorAtualizado } = await axios.put(`${baseUrl}/${Cofre.id}`, Cofre)
      console.log(ValorAtualizado, 'ValorAtualizado')
      const index = data.findIndex(item => item.id === Cofre.id)
      console.log(index, 'INDEX')
      const dataAuxiliar = [...data];
      dataAuxiliar[index] = Cofre
      setData(dataAuxiliar)
      abrirFecharModal('')
    } catch (error) {
      console.log(error);
    }
  } 

  const DeleteAPI = async () => {
    const CofreId = form.getFieldValue("id")
    try {
      await axios.delete(baseUrl + "/" + CofreId)
      setData(data.filter(a => a.id !== CofreId))
      abrirFecharModal('')
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
   
    Get();
  }, [])


  const { Option, OptGroup } = Select;

  const Modalform = () => {


    return (
      <>
        <Modal
          visible={ModalFunction === 'insert' || ModalFunction === 'edit'}
          title={ModalFunction === "insert" ? "Adicionar Cofre" : "Editar"}
          onCancel={() => abrirFecharModal('')}
          centered
          okText={ModalFunction === "insert" ? "Salvar" : "Editar"}
          cancelText="Cancelar"
          onOk={() => {
            form
              .validateFields()
              .then((values) => {
                form.resetFields();
                   if (ModalFunction === "insert") {
                    PostAPI(values)
                  }
                  else {
                    PutAPI(values)
                  } 
              })
              .catch((info) => {
                console.log('Validate Failed:', info);
              });
          } }
        >
          <Form form={form} onFinish={onFinish}>
            <Item label="Nome" name="name">
              <Input name="name" />
            </Item>
            <Item label="id" name="id" hidden>
              <Input name="id" />
            </Item>
            <Item label="Pastas" name="folders">
              <Input name="folders" />
            </Item>
            <Item>
              <Divider type="vertical" />
              <Radio /> Somente Leitura
              <Divider type="vertical" />
              <Radio /> Editar
            </Item>
            <Item>
              <SelectDropdownJson></SelectDropdownJson>
            </Item>
          </Form>
        </Modal>
        <Modal
          visible={ModalFunction === 'delete'}
          onCancel={() => abrirFecharModal('')}
          centered
          onOk={() => DeleteAPI()}
        >
          Tem certeza de que quer deletar o cofre?<b>{Cofre && Cofre.Cofre}</b>?
        </Modal>
      </>
    );
  }
  const colunas = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Nome",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Pastas",
      dataIndex: "folders",
      key: "folders"
    },
    {
      title: 'Ações',
      key: "Ações",
      dataIndex: "id",
      render: (id: any) => (
        <>
           <Button type="primary" onClick={() => selectVault(id, "Editar")}> Editar </Button>
          <Button type="primary" danger onClick={() => selectVault(id, "Deletar")}> Deletar </Button>
        </>
      )
    },
  ]

  const MainApp = () => {

    return (  
      <>
        <br />
        <Button type="primary" className="botaoADD" onClick={() => abrirFecharModal('insert')}>Adicionar Cofre</Button>
        <br />
        <br />


        {/* input-search*/}
         {/*  <Search type="text" value={search} onChange={(e) => setSearch(e.target.value)}/>
          {data.map((data) => {
             if (search == "" || data.name.toLowerCase().includes(search || "".toLowerCase())) {
                 return (
                     <table key={data.id}>
                         <h3>ID: {data.id}</h3>
                         <p>Nome : {data.name}</p>                         
                     </table>
                 );
             }
             return null;
            })} */}

      <br></br>
      <br></br>
      <br></br>

        <Table columns={colunas} dataSource={data} rowKey={"id"}>
        </Table>
        <Modalform />
      </>
    )
  }
  return (
    <div className="App">
      <Container>
        <MainApp />
      </Container>
    </div>

  )
}

export default VaultContent;
