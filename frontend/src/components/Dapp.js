import React from "react";
import { ethers } from "ethers";
// import { BigNumber } from "@ethersproject/bignumber";
// import { ContractFactory } from 'ethers';
import nftAddress from "../contracts/nftAddress.json";
import { NoWalletDetected } from "./NoWalletDetected";
import { ConnectWallet } from "./ConnectWallet";
import { Loading } from "./Loading";
import NFTArtifact from "../contracts/NFT.json";

// const ERROR_CODE_TX_REJECTED_BY_USER = 4001;

// const HARDHAT_NETWORK_ID = '5';
const HARDHAT_NETWORK_ID = '31337';

export class Dapp extends React.Component {
  constructor(props) {
    super(props);

    this.initialState = {

      selectedAddress: undefined,
      txBeingSent: undefined,
      transactionError: undefined,
      networkError: undefined,

      nft : {
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
      return <NoWalletDetected />;
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
    return <Loading />;
    }

    return (

      <div className="container p-4">
        <div className="row">
          <div className="col-12">
            <h1>
              NFT Sandbox v0.1.0
            </h1>
            <br />
            <p>
              Welcome! Your wallet address is <b>{this.state.selectedAddress}</b>
            </p>
            <br />

            {!this.state.nft.name && (
                <div className="row">
                    <div className="col-12">
                        <p>No NFT found on this wallet.</p>
                    </div>
                </div>
            )}

            {this.state.nft.name && (

                <div className="row">

                    <div className="col-3">
                        <img alt="nft" src={this.state.nft.image} className="img-thumbnail rounded float-left"></img>
                    </div>
                    <div className="col-9">
                        <p>Name: <b>{this.state.nft.name}</b></p>
                        <p>Address: <b>{this.state.nft.address}</b></p>
                        <p>Supply: <b>{this.state.nft.supply}</b></p>
                        <p>Price: <b>{this.state.nft.price}</b></p>
                    </div>
                </div>
            )}
            <hr />

            {/* We'll implement the requested features here */}
            <h3>Create items</h3>
            <br />
            <hr />

            <h3>Buy items</h3>
            <br />
            <hr />

            <h3>Earn items</h3>
            <br />
            <hr />
          </div>
        </div>

        <div className="row">
          <div className="col-12">

            <p><a target="_blank" rel="noreferrer" className="text-success" href="https://github.com/julienbrg/nft-sandbox">NFT Sandbox on Github</a></p>
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

    this.setState({ selectedAddress: userAddress});
    this._intializeEthers();
    this._startPollingData();
  }

  async _intializeEthers() {

    this._provider = new ethers.providers.Web3Provider(window.ethereum);

    this._nft = new ethers.Contract(

      nftAddress.NFT,
      NFTArtifact.abi,
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

    var getMetadata = await this._nft.uri(0);
    var metadataRaw = await fetch(getMetadata);
    var metadata = await metadataRaw.json();

    this.setState({
        nft: {
            image: metadata.image,
            address: nftAddress.NFT,
            name: metadata.name,
            supply: 10, // placeholder value
            price: "88 EUR" // placeholder value
        }
    });
  }

  _dismissTransactionError() {
    this.setState({ transactionError: undefined });
  }

  _dismissNetworkError() {
    this.setState({ networkError: undefined });
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
