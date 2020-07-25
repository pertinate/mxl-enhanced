import React, { Component, ReactNode } from 'react';
import { Col, Input } from 'antd';
import { State } from '../Bedrock';

interface Props {
    state: State;
    switchDropDowns: (dropdown?: {}) => void;
    getInputValue: (modIndex: any) => string;
    handleOnBlur: () => void;
    handleOnFocus: (modIndex?: number) => void;
    setState: (values?: {}, callback?: () => void) => void;
    getData: () => void;
}

class ItemSearch extends Component<Props> {
    node: HTMLDivElement = null;
    constructor(props: Props) {
        super(props);
    }

    componentWillMount() {
        document.addEventListener('mousedown', this.handleClick, false);
    }

    componentWillUnmount() {
        document.addEventListener('mousedown', this.handleClick, false);
    }

    handleClick = ({ target }) => {
        if (!this.node || this.node.contains(target)) {
            return;
        }
        Promise.all(
            Array.from(this.node.children).map(child => {
                return new Promise((resolve, reject) => this.node.contains(child) ? reject() : resolve());
            })
        )
            .catch(() => {
                this.props.setState({ searchItemDrop: false });
            });

    };

    render(): ReactNode {
        const {
            state,
            switchDropDowns,
            getInputValue,
            handleOnBlur,
            handleOnFocus,
            setState,
            getData
        } = this.props;
        return (
            <Col style={{ width: '60%' }} ref={node => this.node = node}>
                <Input
                    placeholder={'Search...'}
                    onChange={e => setState({ searchItem: e.target.value, searchItemDrop: true })}
                    value={state.searchItem}
                    style={{ outlineColor: '#555', border: '1px solid #302E2E', background: 'linear-gradient(#181818,#1a1b1b 10%,#1a1b1b 80%,#181818)', color: 'white', width: '100%' }}
                    onClick={() => setState({ searchItemDrop: true })}
                />
                <div
                    style={{
                        display: state.searchItemDrop ? 'flex' : 'none',
                        position: 'absolute',
                        width: '100%',
                        backgroundColor: '#1A1B1B',
                        border: '2px solid #555',
                        outlineColor: '#555',
                        flexDirection: 'column',
                        zIndex: 10
                    }}
                >
                    {
                        state.itemNames.filter(item => item.toLowerCase().includes(state.searchItem.toLowerCase())).slice(0, 10).map((item, index) => {
                            return (
                                <button
                                    style={{
                                        color: '#c1b294',
                                        backgroundColor: '#1c1c18',
                                        border: '1px solid #302e2e',
                                        margin: '8px'
                                    }}
                                    onClick={() => setState({ searchItem: item, searchItemDrop: false })}
                                    key={`itemname#${index}`}
                                >
                                    {item}
                                </button>
                            );
                        })
                    }
                </div>
            </Col>
        );
    }
}

export default ItemSearch;
