import React from 'react';
import { Row, Col, Input } from 'antd';
import { State } from '../Bedrock';
import { stat } from 'fs';
import Modlist from './modlist';
import ItemSearch from './itemsearch';

interface Props {
    state: State;
    switchDropDowns: (dropdown?: {}) => void;
    getInputValue: (modIndex: any) => string;
    handleOnBlur: () => void;
    handleOnFocus: (modIndex?: number) => void;
    setState: (values?: {}, callback?: () => void) => void;
    getData: () => void;
}

function Search(props: Props) {
    const {
        state,
        switchDropDowns,
        getInputValue,
        handleOnBlur,
        handleOnFocus,
        setState,
        getData
    } = props;
    return (
        <div style={{ height: 'auto', width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignContent: 'center' }}>
            <div style={{ backgroundColor: '#1A1B1B', height: 'auto', width: '80%x', margin: '16px', border: '2px solid #555', outlineColor: '#555' }}>
                <Row justify='center'>
                    <h1 className='diablo-font' style={{ color: '#c1b294' }}>Median XL Trade Center</h1>
                </Row>
                <Row justify='center' style={{ margin: '8px', width: '100%' }}>
                    <ItemSearch
                        state={{ ...state }}
                        switchDropDowns={switchDropDowns}
                        getInputValue={getInputValue}
                        handleOnBlur={handleOnBlur}
                        handleOnFocus={handleOnFocus}
                        setState={setState}
                        getData={getData}
                    />
                </Row>
                <Row justify='center'>
                    <div style={{ border: '1px solid #555', width: '80%', margin: '16px' }} />
                </Row>
                <Row justify="center">
                    <Col>
                        <button
                            onClick={() => switchDropDowns({ itemTierDrop: !state.itemTierDrop })}
                            style={{
                                color: '#c1b294', backgroundColor: '#1c1c18', border: '1px solid #302e2e', margin: '8px'
                            }}
                        >
                            {state.itemTier !== '' ? `Tier: ${state.itemTier}` : 'Select Tier'}
                        </button>
                        <div
                            style={{
                                display: state.itemTierDrop ? 'flex' : 'none',
                                position: 'absolute',
                                minWidth: '160px',
                                backgroundColor: '#1A1B1B',
                                border: '2px solid #555',
                                outlineColor: '#555',
                                flexDirection: 'column',
                                zIndex: 10
                            }}
                            onMouseLeave={() => switchDropDowns()}
                        >
                            {
                                state.itemTiers.map((tier, index) => {
                                    return (
                                        <button
                                            onClick={() => setState({ itemTier: tier.toString(), itemTierDrop: false })}
                                            style={{
                                                color: '#c1b294',
                                                backgroundColor: '#1c1c18',
                                                border: '1px solid #302e2e',
                                                margin: '8px'
                                            }}
                                            key={`itemtier#${index}`}
                                        >
                                            {tier.toString()}
                                        </button>
                                    );
                                })
                            }
                        </div>
                    </Col>
                    <Col>
                        <button
                            onClick={() => switchDropDowns({ baseItemDrop: !state.baseItemDrop })}
                            style={{
                                color: '#c1b294', backgroundColor: '#1c1c18', border: '1px solid #302e2e', margin: '8px'
                            }}
                        >
                            {state.baseItem !== '' ? state.baseItem : 'Select Base Type'}
                        </button>
                        <div
                            style={{
                                display: state.baseItemDrop ? 'flex' : 'none',
                                position: 'absolute',
                                minWidth: '160px',
                                backgroundColor: '#1A1B1B',
                                border: '2px solid #555',
                                outlineColor: '#555',
                                flexDirection: 'column',
                                zIndex: 10
                            }}
                            onMouseLeave={() => switchDropDowns()}
                        >
                            <Input
                                onChange={({ target: { value } }) => setState({ baseItemFilter: value })}
                                style={{ outlineColor: '#555', border: '1px solid #302E2E', background: 'linear-gradient(#181818,#1a1b1b 10%,#1a1b1b 80%,#181818)', color: 'white', width: 'calc(100% - 8px)', margin: '4px' }}
                            />
                            <button
                                style={{
                                    color: '#c1b294',
                                    backgroundColor: '#1c1c18',
                                    border: '1px solid #302e2e',
                                    margin: '8px'
                                }}
                                onClick={() => setState({ baseItem: '', baseItemDrop: false })}
                                key={`baseitem#-1`}
                            >
                                Any
                            </button>
                            {
                                state.baseItems.filter(item => item.toLowerCase().includes(state.baseItemFilter.toLowerCase())).slice(0, 10).map((item, index) => {
                                    return (
                                        <button
                                            style={{
                                                color: '#c1b294',
                                                backgroundColor: '#1c1c18',
                                                border: '1px solid #302e2e',
                                                margin: '8px'
                                            }}
                                            onClick={() => setState({ baseItem: item, baseItemDrop: false })}
                                            key={`baseitem#${index}`}
                                        >
                                            {item}
                                        </button>
                                    );
                                })
                            }
                        </div>
                    </Col>
                </Row>
                <Row justify="center">
                    <Col>
                        <button
                            onClick={() => {
                                let mods = [...state.mods];
                                mods.push('');
                                let states = [...state.showModList];
                                states.push(false);
                                setState({ mods, showModList: states }, () => {
                                });
                            }}
                            style={{ color: '#c1b294', backgroundColor: '#1c1c18', border: '1px solid #302e2e', margin: '8px' }}
                        >Add Search Term</button>
                    </Col>
                    <Col>
                        <button
                            onClick={() => {
                                getData();
                            }}
                            style={{ color: '#c1b294', backgroundColor: '#1c1c18', border: '1px solid #302e2e', margin: '8px' }}
                        >Search</button>
                    </Col>
                </Row>
                {
                    state.mods.map((mod, index) => {
                        return (
                            <Row justify='center'>
                                <Col style={{ margin: '8px' }}>
                                    <h2 style={{ color: '#c1b294', textAlign: 'center' }}>Item Matches: </h2>
                                </Col>
                                <Modlist
                                    state={{ ...state }}
                                    switchDropDowns={switchDropDowns}
                                    getInputValue={getInputValue}
                                    handleOnBlur={handleOnBlur}
                                    handleOnFocus={handleOnFocus}
                                    setState={setState}
                                    getData={getData}
                                    index={index}
                                />
                                <Col style={{ margin: '8px' }}>
                                    <button
                                        onClick={() => {
                                            let newMods = [...state.mods];
                                            newMods.splice(index, 1);
                                            setState({ mods: newMods });
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
        </div >
    );
}

export default Search;
