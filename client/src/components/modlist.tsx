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
    index: number;
}

class Modlist extends Component<Props> {
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
                this.props.handleOnBlur();
                let states = [...this.props.state.showModList];
                states[this.props.index] = false;
                this.props.setState({ showModList: states });
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
            getData,
            index
        } = this.props;
        return (
            <Col style={{ margin: '8px', width: '60%' }} ref={node => this.node = node}>
                <Input
                    placeholder={''}
                    onChange={({ target: { value } }) => setState({ inputValue: value })}
                    value={getInputValue(index)}
                    onFocus={() => {
                        console.log(index);
                        handleOnFocus(index);
                        let states = [...state.showModList];
                        states[index] = true;
                        setState({ showModList: states });
                    }}
                    onBlur={() => {
                        // handleOnBlur();
                        // let states = [...state.showModList];
                        // states[index] = false;
                        // setState({ showModList: states });
                    }}
                    style={{ outlineColor: '#555', border: '1px solid #302E2E', background: 'linear-gradient(#181818,#1a1b1b 10%,#1a1b1b 80%,#181818)', color: 'white', }}
                />
                <div
                    style={{
                        display: state.showModList[index] ? 'flex' : 'none',
                        position: 'absolute',
                        width: '100%',
                        backgroundColor: '#1A1B1B',
                        border: '2px solid #555',
                        outlineColor: '#555',
                        flexDirection: 'column',
                        zIndex: 10
                    }}
                    onMouseLeave={() => switchDropDowns()}
                >
                    {
                        state.modList.filter(mod => mod.toLowerCase().includes(getInputValue(index).toLowerCase())).slice(0, 10).map(mod => (
                            <button
                                onClick={() => {
                                    let mods = state.mods;
                                    mods[index] = mod;
                                    let states = [...state.showModList];
                                    states[index] = false;
                                    setState({ inputValue: mod, mods, showModList: states });
                                }}
                                style={{ color: '#c1b294', backgroundColor: '#1c1c18', border: '1px solid #302e2e', margin: '8px' }}
                            >
                                {mod}
                            </button>
                        ))
                    }
                </div>
            </Col>
        );
    }
}

export default Modlist;
