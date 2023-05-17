import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Login } from "./telas/Login";
import { Cadastro } from "./telas/Cadastro";
import { Mapa } from "./telas/Mapa";

export const Rotas = () => {

    const rotas = createBrowserRouter([
        {path: "/", element: <Login/>},
        {path: "/cadastro/:userid", element: <Cadastro />},
        {path: "/mapa", element: <Mapa />}
    ]);

    return <RouterProvider router={rotas}/>

}