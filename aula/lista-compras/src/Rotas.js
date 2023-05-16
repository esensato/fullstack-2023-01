import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Login } from "./telas/Login";
import { Cadastro } from "./telas/Cadastro";

export const    Rotas = () => {

    const rotas = createBrowserRouter([
        {path: "/", element: <Login/>},
        {path: "/cadastro/:userid", element: <Cadastro />}
    ]);

    return <RouterProvider router={rotas}/>

}