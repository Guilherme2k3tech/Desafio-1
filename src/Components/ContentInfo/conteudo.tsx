import React, { useState, useEffect } from 'react';
import { Table, Button, Form, Input, Modal, Space, Switch, Select, Divider } from 'antd';
import 'antd/dist/antd.css';
import axios from 'axios';
import { Container } from './styles';
import Search from 'antd/lib/input/Search';

const { Item } = Form;
const baseUrl = "http://localhost:3001/vaults";

const contentStyle = {
  height: '160px',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#364d79',
};

function VaultContent() {

  const [search, setSearch] = useState<string | undefined>();
/*   const [searchOutput, setSearchOutput] = useState<any[1]>();
 */
  const [form] = Form.useForm();


  const [data, setData] = useState<any[]>([]);


  const [modalX, setModalX] = useState('');


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
    setModalX(type)
  }

  const handleChange = (e: { target: { value: string; }; }) => {
    setSearch(e.target.value);
  };

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


  const colunas = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id"
    },
    {
      title: "Nome",
      dataIndex: "name",
      key: "name"
    },
    {
      title: "Pastas",
      dataIndex: "folders",
      key: "folder"
    },
    {
      title: 'Ações',
      key: "Ações",
      dataIndex: "id",
      render: (id: any) => (
        <>
          {/* <Button type="primary" onClick={() => selectVault(id, "Editar")}> Editar </Button> */}
          <Button type="primary" danger onClick={() => selectVault(id, "Deletar")}> Deletar </Button>
        </>
      )
    },
  ]


  const Get = async () => {
    try {
      const { data } = await axios.get(baseUrl)
      setData(data);
    } catch (error) {
      console.log(error)
    }
  }

  /* const PostAPI = async (values:any) => {
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
  } */

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


  const Modalform = () => {
    return (
      <>
        <Modal
          visible={modalX === 'insert' || modalX === 'edit'}
          title={modalX === "insert" ? "Adicionar Cofre" : "Editar"}
          onCancel={() => abrirFecharModal('')}
          centered
          okText={modalX === "insert" ? "Salvar" : "Editar"}
          cancelText="Cancelar"
          onOk={() => {
            form
              .validateFields()
              .then((values) => {
                form.resetFields();
                /*   if (modalX === "insert") {
                    PostAPI(values)
                  }
                  else {
                    PutAPI(values)
                  } */
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
            <Item label="Pastas" name="folders">
              <Input name="folders" />
            </Item>
            <Item label="id" name="id" hidden>
              <Input name="id" />
            </Item>
            <Item>
              <Select defaultValue="Usuários" style={{ width: 120 }}>
              </Select>
              <Divider type="vertical" />
              <Switch /> Somente Leitura
              <Divider type="vertical" />
              <Switch /> Editar
            </Item>
          </Form>
        </Modal>
        <Modal
          visible={modalX === 'delete'}
          onCancel={() => abrirFecharModal('')}
          centered
          onOk={() => DeleteAPI()}
        >
          Tem certeza de que quer deletar o cofre?<b>{Cofre && Cofre.Cofre}</b>?
        </Modal>
      </>
    );
  }

  const MainApp = () => {

    return (  
      <>
        <br />
        
        {/* button */}
        <Button type="primary" className="botaoADD" onClick={() => abrirFecharModal('insert')}>Adicionar Cofre</Button>
        <br />
        <br />

        {/* input-search*/}

          <Search type="text" value={search} onChange={(e) => setSearch(e.target.value)}/>
          {data.map((data) => {
             if (search == "" || data.name.toLowerCase().includes(search || "".toLowerCase())) {
                 return (
                     <li key={data.name}>
                         <h3>ID: {data.id}</h3>
                         <p>Nome : {data.name}</p>
                     </li>
                 );
             }
             return null;
            })}
             
      <br></br>
      <br></br>
      <br></br>
        {/* table */}

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
