import React, { Component } from 'react';
import { Input, Select, Icon, Grid, Message } from '@b-design/ui';
import _ from 'lodash';

class Env extends Component {
    constructor(props) {
        super(props);
        this.state = {
            envs: {
                [new Date().getTime()]: [{ name: '', cluster: '', description: '' }]
            },
            clusterProps: [{ lable: 'cluster1', value: 'cluster1' }, { lable: 'cluster2', value: 'cluster2' }, { lable: 'cluster3', value: 'cluster3' }]
        }
    }

    handleChangeName(item, index, val) {
        item.name = val;
        this.setState({})
    }

    handleSelectCluster(item, index, val) {
        item.cluster = val;
        this.setState({});
    }

    handleChangeDescription(item, index, val) {
        item.description = val;
        this.setState({});
    }

    renderEnv() {
        const { Row, Col } = Grid;
        const result = [];
        const { envs, clusterProps } = this.state;
        Object.keys(envs).forEach(key => {
            if (!envs[key]) {
                return
            }
            envs[key].forEach((item, index) => {
                result.push(
                    <Row>
                        <Col span='8'>
                            <Input
                                required
                                className='env-input-name'
                                value={item.name}
                                onChange={val => this.handleChangeName(item, index, val)}

                            />
                        </Col>

                        <Col span='8'>
                            <Select
                                className='env-cluster-name'
                                value={item.cluster}
                                dataSource={clusterProps}
                                onChange={val => this.handleSelectCluster(item, index, val)}
                            />
                        </Col>

                        <Col span='8'>
                            <Input
                                className='env-description'
                                value={item.description}
                                onChange={val => this.handleChangeDescription(item, index, val)}
                            />
                            <span
                                className='margin-left-4'
                                onClick={() => {
                                    this.hanldeDeleteItem(key, index)
                                }}
                            >
                                <Icon type="minus-circle" size="medium" />
                            </span>
                        </Col>
                    </Row>
                )
            })

        });



        return <div>
            {result}
        </div>
    }

    handleClickAddItem = () => {
        const { envs } = this.state;
        const obj = {};
        Object.keys(envs).map(key => {
            if (envs[key]) {
                envs[key].forEach(item => {
                    if (!item.name || !(item.name && item.name.trim) ||
                        !item.cluster || !(item.cluster && item.cluster.trim)
                    ) {
                        obj.item = {
                            name: item.name,
                            cluster: item.cluster
                        }
                    }
                })
                return key;
            }
        });

        for (const param in obj) {
            if (!obj[param].name || !obj[param].cluster) {
                return Message.show({
                    type: 'warning',
                    title: 'Warning',
                    content: 'name and cluster  is must enter',
                })
            }
        }

        this.setState({
            envs: {
                ...this.state.envs,
                [Date.now()]: [{ name: '', cluster: '', description: '' }]
            }
        })
    }


    hanldeDeleteItem = (key, filterIndex) => {
        const { envs } = this.state;
        const queryKeys = Object.keys(envs);
        if (queryKeys.length === 1) {
            return Message.show({
                type: 'warning',
                title: 'Warning',
                content: ' Keep at least one',
            });
        }
        const fields = _.get(envs, key, []);
        if (!fields || fields.length === 0) {
            return;
        }

        fields.splice(filterIndex, 1);
        delete envs[key];

        this.setState({
            envs: {
                ...envs,
            },
        });
    };

    render() {
        const { Row, Col } = Grid;
        return (
            <div className='env-bind-wraper'>
                <Row>
                    <Col span='8'>
                        name
                    </Col>
                    <Col span='8'>
                        cluster
                    </Col>
                    <Col span='8'>
                        <div>
                            <span className='env-description'> description</span>
                            <span className='env-add-btn' onClick={this.handleClickAddItem}>
                                <Icon type='plus-circle' size='medium' />
                            </span>
                        </div>
                    </Col>
                </Row>
                {
                    this.renderEnv()
                }
            </div>
        )
    }
}

export default Env;