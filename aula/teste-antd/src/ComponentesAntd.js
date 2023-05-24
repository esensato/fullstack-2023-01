import { Button, Input } from "antd";
import React from "react";
import { useState } from "react"

export const ComponentesAntd = (props) => {

    const [username, setUsername] = useState("");

    const atualizaUsername = (event) => {
        setUsername(event.target.value);
    }
    const exibirUsername = () => {
        alert(username)
    }
    return <div style={{marginTop: 10, marginRight: 10}}>

        <div style={{display: "flex", flexDirection: "row"}}>
            <Input addonBefore="Username:" 
                placeholder="Digite o nome de usuario"
                value={username} 
                onChange={atualizaUsername}/>
            <Button onClick={exibirUsername}>Username</Button>
        </div>

    </div>
}