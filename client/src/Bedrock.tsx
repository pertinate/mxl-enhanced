import React, { Component, ReactNode } from 'react';
import './Bedrock.css';
import { Layout, Table, Row, Col, Button, Input } from 'antd';
import Search from './components/search';
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
export interface State {
    results: ForumUser[];
    mods: string[];
    inputValue: string;
    currentIndex: number;
    baseItem: string;
    baseItemDrop: boolean;
    baseItems: string[];
    baseItemFilter: string;
    itemTiers: string[];
    itemTier: string;
    itemTierDrop: boolean;
    searchItem: string;
    modList: string[];
    showModList: boolean[];
    itemNames: string[];
    searchItemDrop: boolean;
}

class Bedrock extends Component<Props, State> {
    host = 'mxl.trade.pertinate.info';
    constructor(props: Props) {
        super(props);

        this.state = {
            results: [],
            mods: [],
            inputValue: '',
            currentIndex: -1,
            baseItems: [],
            baseItem: '',
            baseItemDrop: false,
            baseItemFilter: '',
            itemTiers: [],
            itemTier: '',
            itemTierDrop: false,
            searchItem: '',
            modList: [],
            showModList: [],
            itemNames: [],
            searchItemDrop: false
        };

        this.getBaseItems();
        this.getItemTiers();
        this.getAffixes();
        this.getNames();
    }

    getData = () => {
        if (this.state.mods.length > 0 || this.state.baseItem !== '' || this.state.searchItem) {
            fetch(`${this.host}/query`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    include: this.state.mods.filter(mod => mod !== ''),
                    exclude: [],
                    baseItem: this.state.baseItem,
                    itemName: this.state.searchItem
                })
            })
                .then(result => {
                    return result.json();
                })
                .then(result => {
                    console.log(result);
                    this.setState({ results: result });
                })
                .catch(error => console.log(error));
        }
    };

    getBaseItems = () => {
        if (this.state.baseItems.length === 0) {
            fetch(`${this.host}/baseitems`, {
                method: 'GET'
            })
                .then(result => result.json())
                .then(result => {
                    this.setState({ baseItems: result });
                })
                .catch(error => {
                    console.error('Failed to get baseitems', error);
                });
        }
    };

    getItemTiers = () => {
        if (this.state.itemTiers.length === 0) {
            fetch(`${this.host}/itemtiers`, {
                method: 'GET'
            })
                .then(result => result.json())
                .then(result => {
                    this.setState({ itemTiers: result });
                })
                .catch(error => {
                    console.error('Failed to get baseitems', error);
                });
        }
    };

    getAffixes = () => {
        if (this.state.itemTiers.length === 0) {
            fetch(`${this.host}/affixes`, {
                method: 'GET'
            })
                .then(result => result.json())
                .then(result => {
                    this.setState({ modList: result.filter((val, index) => result.indexOf(val) === index) });
                })
                .catch(error => {
                    console.error('Failed to get baseitems', error);
                });
        }
    };

    getNames = () => {
        if (this.state.itemTiers.length === 0) {
            fetch(`${this.host}/names`, {
                method: 'GET'
            })
                .then(result => result.json())
                .then(result => {
                    this.setState({ itemNames: result.filter((val, index) => result.indexOf(val) === index) });
                })
                .catch(error => {
                    console.error('Failed to get baseitems', error);
                });
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

    switchDropDowns = (dropdown = {}) => {
        this.setState({
            itemTierDrop: false,
            baseItemDrop: false,
            ...dropdown
        });
    };

    render(): ReactNode {
        return (
            <div
                style={{ height: '100%', width: '100%' }}
            >
                <Search
                    state={{ ...this.state }}
                    switchDropDowns={this.switchDropDowns}
                    getInputValue={this.getInputValue}
                    handleOnBlur={this.handleOnBlur}
                    handleOnFocus={this.handleOnFocus}
                    setState={(values = {}) => this.setState({ ...values })}
                    getData={this.getData}
                />
                <div style={{ display: 'flex', justifyContent: 'center', alignContent: 'center' }}>
                    <ul
                        style={{
                            width: '100%',
                            listStyle: 'none',
                            display: 'flex',
                            flexDirection: 'column',
                            alignContent: 'center'
                        }}
                    >
                        {
                            this.state.results.map(result => {
                                return (
                                    <li style={{ color: 'white', backgroundColor: '#1A1B1B', height: 'auto', minWidth: '20%', maxWidth: '60%', margin: 'auto', border: '2px solid #555', outlineColor: '#555', marginBottom: '8px' }}>
                                        <Row
                                            style={{
                                                margin: '8px'
                                            }}
                                        >
                                            <Col style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', borderRight: '2px solid #555' }}>
                                                <img src={result.imgSrc} style={{ margin: '32px' }} />
                                            </Col>
                                            <Col style={{ marginLeft: '32px', marginRight: '32px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                                {
                                                    result.itemSpans.map(line => (<p style={{ margin: '0px', textAlign: 'center' }}>{line}</p>))
                                                }
                                            </Col>
                                            <Col style={{ borderLeft: '2px solid #555', paddingLeft: '16px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                                <Row>
                                                    <a
                                                        href={result.forumPosting}
                                                        target='_blank'
                                                        style={{ color: '#c1b294', backgroundColor: '#1c1c18', border: '1px solid #302e2e', margin: '8px', padding: '8px' }}
                                                    >
                                                        Forum Post
                                                    </a>
                                                </Row>
                                                <Row>
                                                    <a
                                                        href={result.forumLink}
                                                        target='_blank'
                                                        style={{ color: '#c1b294', backgroundColor: '#1c1c18', border: '1px solid #302e2e', margin: '8px', padding: '8px' }}
                                                    >
                                                        {result.forumName}
                                                    </a>
                                                </Row>
                                            </Col>
                                        </Row>
                                    </li>
                                );
                            })
                        }
                        {/* <li style={{ color: 'white', backgroundColor: '#1A1B1B', height: 'auto', minWidth: '20%', maxWidth: '60%', margin: 'auto', border: '2px solid #555', outlineColor: '#555' }}>
                            <Row
                                style={{
                                    margin: '8px'
                                }}
                            >
                                <Col style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', borderRight: '2px solid #555' }}>
                                    <img src={'https://tsw.vn.cz/acc/items/invssd.png'} style={{ margin: '32px' }} />
                                </Col>
                                <Col style={{ marginLeft: '32px', marginRight: '32px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                    {
                                        [
                                            'The Xiphos',
                                            'Short Sword (Sacred)',
                                            'Item Level: 99',
                                            'Strength Damage Bonus',
                                            'Orb Effects Applied to this Item are Doubled',
                                            '2% Chance to cast level 5 Shatterblade on Striking',
                                            '40% Attack Speed',
                                            '+56% Enhanced Damage',
                                            '+78 to Maximum Damage',
                                            '3% Chance of Crushing Blow (Based on Character Level)',
                                            'Physical Resist 5%',
                                            'Socketed: (3), Inserted: (0)',
                                            'Orb Effects Applied to this Item are Doubled'
                                        ].map(line => (<p style={{ margin: '0px', textAlign: 'center' }}>{line}</p>))
                                    }
                                </Col>
                                <Col style={{ borderLeft: '2px solid #555', paddingLeft: '16px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                    <Row>
                                        <button
                                            style={{ color: '#c1b294', backgroundColor: '#1c1c18', border: '1px solid #302e2e', margin: '8px' }}
                                        >
                                            Forum Post
                                        </button>
                                    </Row>
                                    <Row>
                                        <button
                                            style={{ color: '#c1b294', backgroundColor: '#1c1c18', border: '1px solid #302e2e', margin: '8px' }}
                                        >
                                            Username
                                        </button>
                                    </Row>
                                </Col>
                            </Row>
                        </li> */}
                    </ul>
                    {/* <table style={{ outlineColor: '#555', border: '1px solid #302E2E', background: 'linear-gradient(#181818,#1a1b1b 10%,#1a1b1b 80%,#181818)', color: 'white' }}>
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
                    </table> */}
                </div>
            </div>
        );
    }
}

export default Bedrock;
