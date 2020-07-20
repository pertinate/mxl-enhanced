import React, { Component, ReactNode } from 'react';
import './Bedrock.css';
import { Layout, Table, Row, Col, Button, Input } from 'antd';
const { Content, Header } = Layout;

interface ForumUser {
    baseItem?: string,
    forumLink?: string,
    forumName?: string,
    forumPosting?: string,
    imgSrc?: string,
    itemSpans: string[],
    location: string,
    tswCharName: string;
}

interface Props {

}
interface State {
    results: ForumUser[];
    mods: string[];
    inputValue: string;
    currentIndex: number;
    baseItem: string;
}

class Bedrock extends Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            results: [],
            mods: [],
            inputValue: '',
            currentIndex: -1,
            baseItem: ''
        };
    }

    getData = () => {
        console.log('getting data');
        if (this.state.mods.length > 0 || this.state.baseItem !== '') {
            fetch(`http://mxl.trade.pertinate.info/test?${this.state.mods.filter(val => val !== '').map(mod => `searchParam=${mod}`).join('&')}${this.state.baseItem !== '' ? `&searchParam=${this.state.baseItem}` : ''}`, {
                method: 'get'
            })
                .then(result => {
                    console.log('test');
                    return result.json();
                })
                .then(result => {
                    this.setState({ results: result });
                    console.log(result);
                })
                .catch(error => console.log(error));
        }
    };

    handleTextChange = ({ target: { value } }) => {
        this.setState({ inputValue: value });
    };

    handleOnFocus = (modIndex = -1) => {
        this.setState({ currentIndex: modIndex, inputValue: this.state.mods[modIndex] });
    };

    handleOnBlur = () => {
        let mods = this.state.mods;
        mods[this.state.currentIndex] = this.state.inputValue;
        this.setState({ mods, inputValue: '', currentIndex: -1 });
    };

    getInputValue = (modIndex) => {
        if (modIndex === this.state.currentIndex) {
            return this.state.inputValue;
        } else {
            return this.state.mods[modIndex];
        }
    };

    reset = () => {

    };

    render(): ReactNode {
        return (
            <div style={{ height: '100%', width: '100%' }}>
                <div style={{ height: 'auto', width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignContent: 'center' }}>
                    <div style={{ backgroundColor: '#1A1B1B', height: 'auto', width: '80%x', margin: '16px', border: '2px solid #555', outlineColor: '#555' }}>
                        <Row justify='center' align='middle' style={{ margin: '8px' }}>
                            <Col>
                                <Row>
                                    <Col style={{ marginRight: '8px' }}>
                                        <h2 style={{ color: '#c1b294', textAlign: 'center' }}>Base Type: </h2>
                                    </Col>
                                    <Col>
                                        <Input
                                            onChange={e => this.setState({ baseItem: e.target.value })}
                                            style={{ outlineColor: '#555', border: '1px solid #302E2E', background: 'linear-gradient(#181818,#1a1b1b 10%,#1a1b1b 80%,#181818)', color: 'white' }}
                                        />
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                        <Row justify="center">
                            <Col>
                                <button
                                    onClick={() => {
                                        let mods = [...this.state.mods];
                                        mods.push('');
                                        this.setState({ mods }, () => {
                                            this.reset();
                                        });
                                    }}
                                    style={{ color: '#c1b294', backgroundColor: '#1c1c18', border: '1px solid #302e2e', margin: '8px' }}
                                >Add Search Term</button>
                            </Col>
                            <Col>
                                <button
                                    onClick={() => {
                                        this.getData();
                                    }}
                                    style={{ color: '#c1b294', backgroundColor: '#1c1c18', border: '1px solid #302e2e', margin: '8px' }}
                                >Search</button>
                            </Col>
                        </Row>
                        {
                            this.state.mods.map((mod, index) => {
                                return (
                                    <Row justify='center'>
                                        <Col style={{ margin: '8px' }}>
                                            <h2 style={{ color: '#c1b294', textAlign: 'center' }}>Item Matches: </h2>
                                        </Col>
                                        <Col style={{ margin: '8px' }}>
                                            <Input
                                                placeholder={''}
                                                onChange={e => this.handleTextChange(e)}
                                                value={this.getInputValue(index)}
                                                onFocus={() => this.handleOnFocus(index)}
                                                onBlur={this.handleOnBlur}
                                                style={{ outlineColor: '#555', border: '1px solid #302E2E', background: 'linear-gradient(#181818,#1a1b1b 10%,#1a1b1b 80%,#181818)', color: 'white' }}
                                            />
                                        </Col>
                                        <Col style={{ margin: '8px' }}>
                                            <button
                                                onClick={() => {
                                                    let newMods = [...this.state.mods];
                                                    newMods.splice(index, 1);
                                                    this.setState({ mods: newMods });
                                                }}
                                                style={{ color: '#c1b294', backgroundColor: '#1c1c18', border: '1px solid #302e2e', margin: '8px' }}
                                            >
                                                Remove
                                            </button>
                                        </Col>
                                    </Row>
                                );
                            })
                        }
                    </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', alignContent: 'center' }}>
                    <table style={{ outlineColor: '#555', border: '1px solid #302E2E', background: 'linear-gradient(#181818,#1a1b1b 10%,#1a1b1b 80%,#181818)', color: 'white' }}>
                        <thead>
                            <tr style={{ outlineColor: '#555', border: '1px solid #302E2E', background: 'linear-gradient(#181818,#1a1b1b 10%,#1a1b1b 80%,#181818)', color: 'white' }}>
                                <th style={{ color: '#c1b294', outlineColor: '#555', border: '1px solid #302E2E', background: 'linear-gradient(#181818,#1a1b1b 10%,#1a1b1b 80%,#181818)', padding: '8px' }}>Image</th>
                                <th style={{ color: '#c1b294', outlineColor: '#555', border: '1px solid #302E2E', background: 'linear-gradient(#181818,#1a1b1b 10%,#1a1b1b 80%,#181818)', padding: '8px' }}>Item</th>
                                <th style={{ color: '#c1b294', outlineColor: '#555', border: '1px solid #302E2E', background: 'linear-gradient(#181818,#1a1b1b 10%,#1a1b1b 80%,#181818)', padding: '8px' }}>Controls</th>
                            </tr>
                        </thead>
                        <tbody style={{ outlineColor: '#555', border: '1px solid #302E2E', background: 'linear-gradient(#181818,#1a1b1b 10%,#1a1b1b 80%,#181818)', color: 'white', marginBottom: '8px' }}>
                            {
                                this.state.results.map(item => {
                                    return (
                                        <tr>
                                            <td style={{ outlineColor: '#555', border: '1px solid #302E2E', background: 'linear-gradient(#181818,#1a1b1b 10%,#1a1b1b 80%,#181818)', color: 'white' }}>
                                                <img src={item.imgSrc} style={{ padding: '16px' }} />
                                            </td>
                                            <td style={{ outlineColor: '#555', border: '1px solid #302E2E', background: 'linear-gradient(#181818,#1a1b1b 10%,#1a1b1b 80%,#181818)', color: 'white', padding: '8px' }}>
                                                {
                                                    item.itemSpans.filter(span => span !== '').map(span => {
                                                        return (
                                                            <p style={{ color: '#c1b294', margin: '2px' }}>{span}</p>
                                                        );
                                                    })
                                                }
                                            </td>
                                            <td style={{ outlineColor: '#555', border: '1px solid #302E2E', background: 'linear-gradient(#181818,#1a1b1b 10%,#1a1b1b 80%,#181818)', color: 'white' }}>
                                                <a
                                                    href={item.forumPosting}
                                                    target='_blank'
                                                    style={{ color: '#c1b294', backgroundColor: '#1c1c18', border: '1px solid #302e2e', margin: '8px', padding: '8px' }}
                                                >Forum Post</a>
                                                <a
                                                    href={item.forumLink}
                                                    target='_blank'
                                                    style={{ color: '#c1b294', backgroundColor: '#1c1c18', border: '1px solid #302e2e', margin: '8px', padding: '8px' }}
                                                >{item.forumName}</a>
                                            </td>
                                        </tr>
                                    );
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
            // <Layout>
            //     <Content>
            //         <Row
            //             justify={'center'}
            //         >
            //             <Col>
            //                 <Col>
            //                     <Input
            //                         prefix={'Base: '}

            //                     />
            //                 </Col>
            //                 {
            //                     this.state.mods.map((mod, index) => {
            //                         return (

            //                         );
            //                     })
            //                 }
            //             </Col>
            //             <Col>
            //                 <Button
            //                     type='primary'

            //                 >Add Mod</Button>
            //             </Col>
            //             <Col>

            //             </Col>
            //         </Row>
            //         <Table
            //             dataSource={this.state.results}
            //             columns={[
            //                 {
            //                     title: 'Image',
            //                     dataIndex: 'imgSrc',
            //                     key: 'imgSrc',
            //                     width: '10%',
            //                     render: (text, record, index) => {
            //                         return (<img src={text} />);
            //                     }
            //                 },
            //                 {
            //                     title: 'Item',
            //                     width: '30%',
            //                     render: (text, record, index) => {
            //                         return (
            //                             <span>
            //                                 {
            //                                     record.itemSpans.filter(val => val !== "").map(span => {
            //                                         return (<p>{span}</p>);
            //                                     })
            //                                 }
            //                             </span>
            //                         );
            //                     }
            //                 },
            //                 {
            //                     title: 'Controls',
            //                     children: [
            //                         {
            //                             title: 'Forum Post',
            //                             dataIndex: 'forumPosting',
            //                             key: 'forumPost',
            //                             width: '10%',
            //                             render: (text, record, index) => {
            //                                 return (<a href={text}>Forum Post</a>);
            //                             }
            //                         },
            //                         {
            //                             title: 'Profile',
            //                             dataIndex: 'profile',
            //                             key: 'profile',
            //                             width: '10%',
            //                             render: (text, record, index) => {
            //                                 return (<a href={text}>{record.forumName}</a>);
            //                             }
            //                         }
            //                     ]
            //                 }
            //             ]}
            //         />
            //     </Content>
            // </Layout>
        );
    }
}

export default Bedrock;
