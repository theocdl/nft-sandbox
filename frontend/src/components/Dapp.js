import React from "react";
import {ethers} from "ethers";
import {BigNumber} from "@ethersproject/bignumber";

import characterAddress from "../contracts/characterAddress.json";
import CharacterArtifact from "../contracts/Character.json";
import weaponAddress from "../contracts/weaponAddress.json";
import WeaponArtifact from "../contracts/Weapon.json";
import daiAddress from "../contracts/daiAddress.json";
import DAIArtifact from "../contracts/DAI.json";
import {NoWalletDetected} from "./NoWalletDetected";
import {ConnectWallet} from "./ConnectWallet";
import {Loading} from "./Loading";

const ERROR_CODE_TX_REJECTED_BY_USER = 4001;

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

            emperor: {
                addr: undefined,
                name: undefined,
                image: undefined,
                supply: undefined,
                price: undefined
            },

            pharaoh: {
                addr: undefined,
                name: undefined,
                image: undefined,
                supply: undefined,
                price: undefined
            },

            shogun: {
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
                        <hr/>
                        <h3>
                            DAI faucet
                        </h3>
                        <p>
                            If you don't have any Goerli ETH on your wallet, please use <a
                            href="https://goerli-faucet.slock.it/">this faucet</a>.
                        </p>

                        <div>
                            <p>Click on this button to receive some DAI.</p>
                            <button onClick={() => this._getDAI()} className="btn-sn btn-success mr-md-3">
                                GET DAI
                            </button>
                        </div>

                        {!this.state.emperor.name && (
                            <div className="row">
                                <div className="col-12">
                                    <p>No NFT found on this wallet.</p>
                                </div>
                            </div>
                        )}
                        <hr/>
                        {this.state.emperor.name && (
                            <div className="row">
                                <div className="col-12">
                                    <p>You own:</p>
                                    <ul>
                                        <li><b>1</b> Emperor</li>
                                        <li><b>1</b> Soul Edge sword</li>
                                    </ul>
                                </div>
                            </div>
                        )}


                        <hr/>

                        {/*  */}
                        <h3>Create items</h3>
                        <br/>



                        <hr/>

                        <h3>Buy items</h3>
                        <br/>

                        {this.state.emperor.name && (

                            <div className="row">

                                <div className="col-3">
                                    <img alt="character" src={this.state.emperor.image}
                                         className="img-thumbnail rounded float-left"></img>
                                </div>
                                <div className="col-9">
                                    <p>Name: <b>{this.state.emperor.name}</b></p>
                                    <p>Supply: <b>{this.state.emperor.supply}</b></p>
                                    <p>Price: <b>{this.state.emperor.price}</b></p>
                                </div>
                            </div>
                        )}
                        <p></p>
                        <div className="row">
                            <div className="col-4">
                            </div>
                            <div className="col-8">

                                <button onClick={() => this._BuyEmperor()} className="btn-lg btn-success mr-md-3">
                                    Buy Emperor
                                </button>

                            </div>
                        </div>
                        <br/>

                        <p></p>


                        {this.state.pharaoh.name && (

                            <div className="row">

                                <div className="col-3">
                                    <img alt="character" src={this.state.pharaoh.image}
                                         className="img-thumbnail rounded float-left"></img>
                                </div>
                                <div className="col-9">
                                    <p>Name: <b>{this.state.pharaoh.name}</b></p>
                                    <p>Supply: <b>{this.state.pharaoh.supply}</b></p>
                                    <p>Price: <b>{this.state.pharaoh.price}</b></p>
                                </div>
                            </div>
                        )}
                        <p></p>
                        <div className="row">
                            <div className="col-4">
                            </div>
                            <div className="col-8">

                                <button onClick={() => this._BuyPharaoh()} className="btn-lg btn-success mr-md-3">
                                    Buy Pharaoh
                                </button>

                            </div>
                        </div>
                        <br/>

                        <p></p>

                        {this.state.shogun.name && (

                            <div className="row">

                                <div className="col-3">
                                    <img alt="character" src={this.state.shogun.image}
                                         className="img-thumbnail rounded float-left"></img>
                                </div>
                                <div className="col-9">
                                    <p>Name: <b>{this.state.shogun.name}</b></p>
                                    <p>Supply: <b>{this.state.shogun.supply}</b></p>
                                    <p>Price: <b>{this.state.shogun.price}</b></p>
                                </div>
                            </div>
                        )}
                        <p></p>
                        <div className="row">
                            <div className="col-4">
                            </div>
                            <div className="col-8">

                                <button onClick={() => this._BuyShogun()} className="btn-lg btn-success mr-md-3">
                                    Buy Shogun
                                </button>

                            </div>
                        </div>
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

        var supplyEmperor = await this._character.emperorSupply() ;
        supplyEmperor = supplyEmperor.toString();

        var getMetadata = await this._character.uri(1);

        var replaced = getMetadata.replace("{id}", "0000000000000000000000000000000000000000000000000000000000000001");
        var metadataRaw = await fetch(replaced);
        var metadata = await metadataRaw.json();

        this.setState({
            emperor: {
                image: metadata.image,
                address: characterAddress.Character,
                name: metadata.name,
                supply: supplyEmperor, // placeholder value
                price: "50 DAI" // placeholder value
            }
        });

        var supplyPharaoh = await this._character.pharaohSupply() ;
        supplyPharaoh = supplyPharaoh.toString();

        var replaced2 = getMetadata.replace("{id}", "0000000000000000000000000000000000000000000000000000000000000002");
        var metadataRaw2 = await fetch(replaced2);
        var metadata2 = await metadataRaw2.json();

        this.setState({
            pharaoh: {
                image: metadata2.image,
                address: characterAddress.Character,
                name: metadata2.name,
                supply: supplyPharaoh, // placeholder value
                price: "50 DAI" // placeholder value
            }
        });

        var supplyShogun = await this._character.shogunSupply() ;
        supplyShogun = supplyShogun.toString();

        var replaced3 = getMetadata.replace("{id}", "0000000000000000000000000000000000000000000000000000000000000003");
        var metadataRaw3 = await fetch(replaced3);
        var metadata3 = await metadataRaw3.json();

        this.setState({
            shogun: {
                image: metadata3.image,
                address: characterAddress.Character,
                name: metadata3.name,
                supply: supplyShogun, // placeholder value
                price: "50 DAI" // placeholder value
            }
        });
    }

    async _BuyEmperor() {
        try {

            this._dismissTransactionError();

            this._character = new ethers.Contract(
                characterAddress.Character,
                CharacterArtifact.abi,
                this._provider.getSigner(0)
            );

            // Approve
            this._dai = new ethers.Contract(
                daiAddress.DAI,
                DAIArtifact.abi,
                this._provider.getSigner(0)
            );
            const volume = 1;
            const volume2 = volume *50 * 1000000000000000000;
            const volumeToString = volume2.toString();


            const approveMyDAI = await this._dai.approve(characterAddress.Character, BigNumber.from(volumeToString));
            await approveMyDAI.wait();

            const buy = await this._character.buyEmperor(volume);

            const receipt = await buy.wait();

            if (receipt.status === 0) {
                throw new Error("Transaction failed");
            }

            await this._updateState();

        } catch (error) {
            if (error.code === ERROR_CODE_TX_REJECTED_BY_USER) {
                return;
            }
            console.error(error);
            this.setState({transactionError: error});

        } finally {

            this.setState({txBeingSent: undefined});

        }
    }

    async _BuyPharaoh() {
        try {

            this._dismissTransactionError();

            this._character = new ethers.Contract(
                characterAddress.Character,
                CharacterArtifact.abi,
                this._provider.getSigner(0)
            );

            // Approve
            this._dai = new ethers.Contract(
                daiAddress.DAI,
                DAIArtifact.abi,
                this._provider.getSigner(0)
            );
            const volume = 1;
            const volume2 = volume *50 * 1000000000000000000;
            const volumeToString = volume2.toString();


            const approveMyDAI = await this._dai.approve(characterAddress.Character, BigNumber.from(volumeToString));
            await approveMyDAI.wait();

            const buy = await this._character.buyPharaoh(volume);

            const receipt = await buy.wait();

            if (receipt.status === 0) {
                throw new Error("Transaction failed");
            }

            await this._updateState();

        } catch (error) {
            if (error.code === ERROR_CODE_TX_REJECTED_BY_USER) {
                return;
            }
            console.error(error);
            this.setState({transactionError: error});

        } finally {

            this.setState({txBeingSent: undefined});

        }
    }


    async _BuyShogun() {
        try {

            this._dismissTransactionError();

            this._character = new ethers.Contract(
                characterAddress.Character,
                CharacterArtifact.abi,
                this._provider.getSigner(0)
            );

            // Approve
            this._dai = new ethers.Contract(
                daiAddress.DAI,
                DAIArtifact.abi,
                this._provider.getSigner(0)
            );
            const volume = 1;
            const volume2 = volume *50 * 1000000000000000000;
            const volumeToString = volume2.toString();


            const approveMyDAI = await this._dai.approve(characterAddress.Character, BigNumber.from(volumeToString));
            await approveMyDAI.wait();

            const buy = await this._character.buyShogun(volume);

            const receipt = await buy.wait();

            if (receipt.status === 0) {
                throw new Error("Transaction failed");
            }

            await this._updateState();

        } catch (error) {
            if (error.code === ERROR_CODE_TX_REJECTED_BY_USER) {
                return;
            }
            console.error(error);
            this.setState({transactionError: error});

        } finally {

            this.setState({txBeingSent: undefined});

        }
    }


    async _whitelistWinner() {

        this._weapon = new ethers.Contract(
            weaponAddress.Weapon,
            WeaponArtifact.abi,
            this._provider.getSigner(0)
        );

        a = 1 + Math.floor(Math.random() * 2);
        if (a === 2) {
            await this._weapon.whitelistWinner("0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266");
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

    async _getDAI() {

        this._dai = new ethers.Contract(
            daiAddress.DAI,
            DAIArtifact.abi,
            this._provider.getSigner(0)
        );

        await this._dai.withdraw();
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
