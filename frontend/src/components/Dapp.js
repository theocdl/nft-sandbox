import React from "react";
import {ethers} from "ethers";
// import { BigNumber } from "@ethersproject/bignumber";
// import { ContractFactory } from 'ethers';

import characterAddress from "../contracts/characterAddress.json";
import CharacterArtifact from "../contracts/Character.json";

import weaponAddress from "../contracts/weaponAddress.json";
import WeaponArtifact from "../contracts/Weapon.json";

import {NoWalletDetected} from "./NoWalletDetected";
import {ConnectWallet} from "./ConnectWallet";
import {Loading} from "./Loading";

// const ERROR_CODE_TX_REJECTED_BY_USER = 4001;

const HARDHAT_NETWORK_ID = '5';

// const HARDHAT_NETWORK_ID = '31337';

let a;

export class Dapp extends React.Component {

    constructor(props) {
        super(props);

        this.initialState = {

            selectedAddress: undefined,
            txBeingSent: undefined,
            transactionError: undefined,
            networkError: undefined,

            character: {
                addr: undefined,
                name: undefined,
                image: undefined,
                supply: undefined,
                price: undefined
            }

        };


        this.state = this.initialState;
    }

    render() {
        if (window.ethereum === undefined) {
            return <NoWalletDetected/>;
        }

        if (!this.state.selectedAddress) {
            return (
                <ConnectWallet
                    connectWallet={() => this._connectWallet()}
                    networkError={this.state.networkError}
                    dismiss={() => this._dismissNetworkError()}
                />
            );
        }

        if (!this.state.selectedAddress) {
            return <Loading/>;
        }

        return (

            <div className="container p-4">
                <div className="row">
                    <div className="col-12">
                        <h1>
                            NFT Sandbox v0.1.0
                        </h1>
                        <br/>
                        <p>
                            Welcome! Your wallet address is <b>{this.state.selectedAddress}</b>
                        </p>
                        <br/>

                        {!this.state.character.name && (
                            <div className="row">
                                <div className="col-12">
                                    <p>No NFT found on this wallet.</p>
                                </div>
                            </div>
                        )}

                        {this.state.character.name && (

                            <div className="row">

                                <div className="col-3">
                                    <img alt="character" src={this.state.character.image}
                                         className="img-thumbnail rounded float-left"></img>
                                </div>
                                <div className="col-9">
                                    <p>Name: <b>{this.state.character.name}</b></p>
                                    <p>Address: <b>{this.state.character.address}</b></p>
                                    <p>Supply: <b>{this.state.character.supply}</b></p>
                                    <p>Price: <b>{this.state.character.price}</b></p>
                                </div>
                            </div>
                        )}
                        <hr/>

                        {/* We'll implement the requested features here */}
                        <h3>Create items</h3>
                        <br/>
                        <hr/>

                        <h3>Buy items</h3>
                        <br/>
                        <hr/>

                        <h3>Earn items</h3>
                        <br/>
                        <button onClick={() => this._whitelistWinner()} className="btn-lg btn-primary">
                            PLAY
                        </button>
                        <br/>
                        <br/>

                        <div>
                            {a === 2
                                ? <button onClick={() => this._claimReward()} className="btn-sn btn-success mr-md-3">
                                    CLAIM
                                </button>

                                : <p></p>
                            }
                        </div>
                        <div>
                            {a === 1
                                ? <p>Sorry, you didn't win!</p>

                                : <p></p>
                            }
                        </div>

                        <hr/>
                    </div>
                </div>

                <div className="row">
                    <div className="col-12">

                        <p><a target="_blank" rel="noreferrer" className="text-success"
                              href="https://github.com/julienbrg/nft-sandbox">NFT Sandbox on Github</a></p>
                    </div>
                </div>
            </div>
        );
    }

    componentWillUnmount() {
        this._stopPollingData();
    }

    async _connectWallet() {
        const [selectedAddress] = await window.ethereum.enable();
        if (!this._checkNetwork()) {
            return;
        }

        this._initialize(selectedAddress);

        window.ethereum.on("accountsChanged", ([newAddress]) => {
            this._stopPollingData();
            if (newAddress === undefined) {
                return this._resetState();
            }

            this._initialize(newAddress);
        });

        window.ethereum.on("chainChanged", ([networkId]) => {
            this._stopPollingData();
            this._resetState();
        });
    }

    _initialize(userAddress) {

        this.setState({selectedAddress: userAddress});
        this._intializeEthers();
        this._startPollingData();
    }

    async _intializeEthers() {

        this._provider = new ethers.providers.Web3Provider(window.ethereum);

        this._character = new ethers.Contract(
            characterAddress.Character,
            CharacterArtifact.abi,
            this._provider.getSigner(0)
        );
    }

    _startPollingData() {
        this._pollDataInterval = setInterval(() => this._updateState(), 1000);
    }

    _stopPollingData() {
        clearInterval(this._pollDataInterval);
        this._pollDataInterval = undefined;
    }

    async _updateState() {

        var getMetadata = await this._character.uri(0);
        // var metadataRaw = await fetch(getMetadata);
        // var metadata = await metadataRaw.json();
        console.log("uri = ", getMetadata);

        // this.setState({
        //     character: {
        //         image: metadata.image,
        //         address: characterAddress.Character,
        //         name: metadata.name,
        //         supply: 1, // placeholder value
        //         price: "0 EUR" // placeholder value
        //     }
        // });
    }

    async _whitelistWinner() {

        this._weapon = new ethers.Contract(
            weaponAddress.Weapon,
            WeaponArtifact.abi,
            this._provider.getSigner(0)
        );

        a = 1 + Math.floor(Math.random() * 2);
        if (a === 2) {
            await this._weapon.whitelistWinner("0xeAD9C93b79Ae7C1591b1FB5323BD777E86e150d4");
        }
    }

    async _claimReward() {
        this._weapon = new ethers.Contract(
            weaponAddress.Weapon,
            WeaponArtifact.abi,
            this._provider.getSigner(0)
        );

        await this._weapon.claimReward();
    }

    _dismissTransactionError() {
        this.setState({transactionError: undefined});
    }

    _dismissNetworkError() {
        this.setState({networkError: undefined});
    }

    _getRpcErrorMessage(error) {
        if (error.data) {
            return error.data.message;
        }

        return error.message;
    }

    _resetState() {
        this.setState(this.initialState);
    }

    _checkNetwork() {
        if (window.ethereum.networkVersion === HARDHAT_NETWORK_ID) {
            return true;
        }

        this.setState({
            networkError: 'Please switch network in Metamask'
        });

        return false;
    }
}
