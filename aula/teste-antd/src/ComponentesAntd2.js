import React from "react";

import { Row, Col, Button, Card, Timeline, Form, Input } from 'antd';
import { ClockCircleOutlined } from '@ant-design/icons';

export const ComponentesAntd2 =(props) => {


    return <div style={{margin: 20}}>

            <Row gutter={[10, 10]} >
                <Col span={10}><Button style={{width: "100%"}}>Botao 1</Button></Col>
                <Col span={7}><Button style={{width: "100%"}}>Botao 2</Button></Col>
                <Col span={7}><Button style={{width: "100%"}}>Botao 3</Button></Col>
            </Row>
            <Row gutter={[10, 10] }>
                <Col span={12}><Card title="Atividade 1">Descricao Atividade 1</Card></Col>
                <Col span={12}><Card title="Atividade 2">Descricao Atividade 2</Card></Col>
            </Row>

            <Row style={{marginTop: 20}}>
                <Col span={5}>
                    <Timeline>
                        <Timeline.Item>Atividade 1</Timeline.Item>
                        <Timeline.Item dot={<ClockCircleOutlined />}>Atividade 2</Timeline.Item>
                        <Timeline.Item>Atividade 3</Timeline.Item>
                    </Timeline>
                </Col>
            </Row>

            <Row style={{marginTop: 20}}>
                <Col span={12}>
                    <Form name="login"  onFinish={(dados) => alert(dados.username)} 
                                        onFinishFailed={(erros) => console.log(erros)}>
                        <Form.Item label="Username:" name="username"
                        rules={[ { required: true, message: 'Informe seu nome de usuário' } ]}>
                            <Input />
                        </Form.Item>
                        <Form.Item label="Password:" name="password"
                        rules={[ { required: true, min: 6, message: 'Minimo de 6 digitos' } ]}>
                            <Input type="password"/>
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit"> Login </Button>
                        </Form.Item>
                    </Form>
                </Col>
            </Row>

        </div>
}