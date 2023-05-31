import { Button, Input, List, Checkbox, Radio, DatePicker, Progress, Slider, Card } from "antd";
import React from "react";
import { useState } from "react"

export const ComponentesAntd = (props) => {

    const [username, setUsername] = useState("");
    const [radioValue, setRadioValue] = useState(2);

    const atualizaUsername = (event) => {
        setUsername(event.target.value);
    }
    const exibirUsername = () => {
        alert(username)
    }

    const selecionaItem = (item) => {
        alert(item.target.id)
    }

    return <div style={{marginTop: 10, marginRight: 10}}>

        <div style={{display: "flex", flexDirection: "row"}}>
            <Input addonBefore="Username:" 
                placeholder="Digite o nome de usuario"
                value={username} 
                onChange={atualizaUsername}/>
            <Button onClick={exibirUsername}>Username</Button>
        </div>

        <div style={{marginTop: 20}}>
            <List header="Lista de Compras" 
                  footer="Selecione os itens acima"
                  bordered
                  dataSource={["Cafe", "Acucar", "Sabao"]}
                  renderItem={(item, idx) => (<List.Item onClick={selecionaItem} 
                                                    id={idx}>{item}</List.Item>)}/>
        </div>

        <div style={{margintop: 10}}>
            <div><Checkbox onChange={(val) => alert(val.target.checked)} />Selecionar opcao</div>
        </div>

        <div style={{margintop: 10}}>
            <Radio.Group value={radioValue} onChange={(item) => setRadioValue(item.target.value)}>
                <Radio value={1}>Item 1</Radio>
                <Radio value={2}>Item 2</Radio>
                <Radio value={3}>Item 3</Radio>
            </Radio.Group>
        </div>
        <div style={{margintop: 10}}>
            <DatePicker onChange={(data, dataString) => alert(dataString)}/>
        </div>
        <div style={{margintop: 10}}>
           <Progress  percent={30} />
        </div>

        <div style={{margintop: 10}}>
           <Slider min={0} max={100} />
        </div>

        <div style={{margintop: 10}}>
           <Card title="Atividades do Dia" bordered style={{ width: 300 }}>
            <ul>
                <li>Lavar a louca</li>
                <li>Cozinhar Feijao</li>
            </ul>
           </Card>
        </div>

    </div>
}
