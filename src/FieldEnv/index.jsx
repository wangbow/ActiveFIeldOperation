import React, { Component } from 'react';
import { Input, Button, Field, Icon, Select, Form, Grid } from '@b-design/ui';



function EnvItem(props) {
    const { Col, Row } = Grid;
    return (
        <div className='env-item-container'>
            <Row>
                <Col span={6} style={{ padding: '0 8px' }}>
                    <Form.Item required label='name'>
                        <Input
                            width={'100%'}
                            {
                            ...props.init(`${props.id}-name`,
                                {
                                    initValue: props.value?.name,
                                    rules: [{
                                        required: true,
                                        message: 'Enter Env name'
                                    }]
                                }
                            )
                            }
                        />
                    </Form.Item>
                </Col>


                <Col span={10} style={{ padding: '0 8px' }}>
                    <Form.Item required label='cluster'>
                        <Select
                            width={'100%'}
                            {
                            ...props.init(`${props.id}-cluster`,
                                {
                                    initValue: props.value?.cluster,
                                    rules: [{
                                        required: true,
                                        message: 'Please select'
                                    }]
                                }
                            )
                            }

                            dataSource={props.cluster}
                        />
                    </Form.Item>
                </Col>

                <Col span={6} style={{ padding: '0 8px' }}>
                    <Form.Item required label='description'>
                        <Input
                            width={'100%'}
                            {
                            ...props.init(`${props.id}-description`,
                                {
                                    initValue: props.value?.description,
                                    rules: [{
                                        required: true,
                                        message: 'Enter description'
                                    }]
                                }
                            )
                            }
                        />
                    </Form.Item>
                </Col>

                <Col span={2} style={{ padding: '0 8px', display: 'flex', alignItems: 'center' }} >

                    {
                        props.itemLength != 1 && <Icon
                            type='ashbin'
                            onClick={() => {
                                if (props.delete) {
                                    props.delete(props.id);
                                }
                            }}
                        />
                    }


                </Col>
            </Row>
        </div>
    )
}

const ENVPLAN_KEY_LIST = ['name', 'cluster', 'description']
class EnvPlan extends Component {
    constructor(props) {
        super(props);
        this.field = new Field(this);
        const initValue = [];
        if (props.value && props.value.length > 0) {
            props.value.map(item => {
                initValue.push({
                    key: Date.now().toString(),
                    value: item
                })
            })
        } else {
            initValue.push({
                key: Date.now().toString(),
                value: { name: '', cluster: '', description: '' }
            })
        };

        this.state = {
            envList: initValue
        }
    }

    removeEnvPlanItem = (key) => {
        const { envList } = this.state;
        envList.forEach((item, i) => {
            if (item.key === key) {
                envList.splice(i, 1);
            }
        });
        ENVPLAN_KEY_LIST.forEach((_key) => {
            this.field.remove(`${key}-${_key}`);
        });
        this.setState({
            envList,
        });
    };


    addEnvPlanItem = () => {
        this.getValues2();
        this.field.validate((error) => {
            if (error) {
                console.log(error);
                return;
            }
            const { envList } = this.state;
            const key = Date.now().toString();
            envList.push({
                key,
            });
            this.setState({
                envList,
            });
        });
    }

    getValues() {
        let hasError = false;
        this.field.validate();
        const errors = this.field.getErrors();
        console.log('erros', errors);
        Object.keys(errors).forEach((key) => {
            if (errors[key]) {
                hasError = true;
            }
        });
        if (hasError) {
            return null;
        } else {
            let allValues = [];
            const values = this.field.getValues();
            const { envList } = this.state;
            const keyMap = envList.reduce((preObj, item) => {
                preObj[item.key] = {};
                return preObj;
            }, {});

            debugger;

            Object.keys(values).forEach((key) => {
                const [keyId, keyName] = key.split('-');
                if (!keyMap[keyId]) {
                    keyMap[keyId] = {};
                }
                keyMap[keyId][keyName] = values[key];
            });
            allValues = Object.keys(keyMap).map((key) => keyMap[key]);
            return allValues;
        }
    };

    getValues2() {
        let hasError = false;
        const erros = this.field.getErrors();
        Object.keys(erros).forEach(key => {
            if (erros[key]) {
                hasError = true;
            }
        });

        if (hasError) {
            return;
        } else {
            const values = this.field.getValues();
            const { envList } = this.state;
            const keyMap = envList.reduce((preObj, item) => {
                preObj[item.key] = {};
                return preObj;
            }, {});

            Object.keys(values).forEach(key => {
                const [keyId, keyName] = key.split('-');
                if (!keyMap[keyId]) {
                    keyMap[keyId] = {};
                }
                keyMap[keyId][keyName] = values[key];
            });

            let allValues = [];
            allValues = Object.keys(keyMap).map(key => keyMap[key]);
            console.log('allValuesallValues', allValues)
            return allValues;
        }
    }

    render() {
        const { init } = this.field;
        const { envList } = this.state;
        const clusterProps = [{ lable: 'cluster1', value: 'cluster1' }, { lable: 'cluster2', value: 'cluster2' }, { lable: 'cluster3', value: 'cluster3' }];

        console.log('envList', envList)
        return (
            <div className='env-plan-container'>
                <div className='env-plan-group'>
                    <Form field={this.field}>
                        {envList.map(env => (
                            <EnvItem
                                delete={this.removeEnvPlanItem}
                                id={env.key}
                                key={env.key}
                                init={init}
                                value={env.value}
                                itemLength={envList.length}
                                cluster={clusterProps}
                            />
                        ))}
                    </Form>
                </div>

                <div className="env-plan-option">
                    <Button onClick={this.addEnvPlanItem} type="secondary">
                        Add Environment Plan
                    </Button>
                </div>
            </div>
        )
    }
}


export default EnvPlan;