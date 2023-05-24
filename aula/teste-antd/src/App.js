import { Avatar, Layout, Menu } from 'antd';
import { Html5Outlined, 
         UserOutlined, 
         QuestionCircleOutlined,
         DeleteOutlined  } from '@ant-design/icons';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ComponentesAntd } from './ComponentesAntd';
import './App.css';

function App() {

  const rotas = createBrowserRouter([{
    path: "/",
    element: <ComponentesAntd />
  },
  {
    path: "/usuario",
    element: <h1>Usuario</h1>
  },
  {
    path: "/duvida",
    element: <h1>Duvida</h1>
  },
  {
    path: "/excluir",
    element: <h1>Excluir</h1>
  }]);

  const Conteudo = (props) => {

    return <RouterProvider router={rotas} />
 
   }

  const itemMenuSelecionado = (item) => {
    rotas.navigate(item.key);
  }

  return (
    <Layout style={{height: "100vh"}}>
      <Layout.Header style={{color: "white"}}>

      <div style={{display:"flex", height: 50,
      flexDirection:"row", 
      alignContent: "center", 
      alignItems: "center"
      }}>
      <Avatar icon={ <Html5Outlined /> } />
      <h1>Cabecalho</h1>

      </div>
      </Layout.Header>

      <Layout>
        <Layout.Sider>
          <Menu theme='dark' onClick={itemMenuSelecionado}>
            <Menu.Item key="/usuario" icon={<UserOutlined />}>Usuarios</Menu.Item>
            <Menu.Item key="/duvida" icon={<QuestionCircleOutlined />}>Duvidas</Menu.Item>
            <Menu.Item key="/excluir" icon={<DeleteOutlined />}>Excluir</Menu.Item>
          </Menu>
        </Layout.Sider>

        <Layout.Content>
          <div style={{marginLeft: 10}}>
            <Conteudo />
          </div>
        </Layout.Content>
        
      </Layout>

      <Layout.Footer><h1>Rodape</h1></Layout.Footer>
    </Layout>
  );



}

export default App;
