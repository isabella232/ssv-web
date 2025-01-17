import { Contract } from 'web3-eth-contract';
import { action, observable, computed } from 'mobx';
import EthereumKeyStore from 'eth2-keystore-js';
import config from '~app/common/config';
import SsvStore from '~app/common/stores/SSV.store';
import BaseStore from '~app/common/stores/BaseStore';
import { roundCryptoValueString } from '~lib/utils/numbers';
import WalletStore from '~app/common/stores/Wallet/Wallet.store';
import PriceEstimation from '~lib/utils/contract/PriceEstimation';
import ApplicationStore from '~app/common/stores/Application.store';
import NotificationsStore from '~app/common/stores/Notifications.store';
import Threshold, { IShares, ISharesKeyPairs } from '~lib/crypto/Threshold';
import Encryption, { EncryptShare } from '~lib/crypto/Encryption/Encryption';
import OperatorStore, { IOperator } from '~app/common/stores/Operator.store';
// import { roundNumber } from '~lib/utils/numbers';

class ValidatorStore extends BaseStore {
  public static OPERATORS_SELECTION_GAP = 66.66;
  private keyStore: EthereumKeyStore | undefined;

  @observable validatorPrivateKey: string = '';
  @observable validatorPrivateKeyFile: File | null = null;
  @observable validatorKeyStorePassword: Buffer = Buffer.alloc(0);

  @observable addingNewValidator: boolean = false;
  @observable newValidatorReceipt: any = null;

  @observable estimationGas: number = 0;
  @observable dollarEstimationGas: number = 0;

  @observable createValidatorPayLoad: (string | string[])[] | undefined = undefined;

  @action.bound
  cleanPrivateData() {
    for (let i = 0; i < this.validatorKeyStorePassword.length; i += 1) {
      this.validatorKeyStorePassword[i] = parseInt(String(Math.ceil(Math.random() * 50)), 16);
    }
    this.validatorKeyStorePassword = Buffer.from('');
  }

  @action.bound
  isJsonFile(): boolean {
    return this.validatorPrivateKeyFile?.type === 'application/json';
  }

  @computed
  get password() {
    return this.validatorKeyStorePassword.toString().trim();
  }

  @action.bound
  setPassword(value: string) {
    this.validatorKeyStorePassword = Buffer.from(value);
  }

  @action.bound
  clearValidatorData() {
    this.validatorPrivateKey = '';
    this.validatorPrivateKeyFile = null;
    this.createValidatorPayLoad = undefined;
    this.cleanPrivateData();
  }

  /**
   * Return validator public key
   */
  @computed
  get validatorPublicKey() {
    if (!this.keyStore) {
      return false;
    }
    return this.keyStore.getPublicKey();
  }

  /**
   * Extract validator private key from keystore file
   */
  @action.bound
  async extractPrivateKey(): Promise<string> {
    return new Promise((resolve, reject) => {
      const applicationStore: ApplicationStore = this.getStore('Application');
      applicationStore.setIsLoading(true);
      this.validatorPrivateKeyFile?.text().then(async (string) => {
        try {
          this.keyStore = new EthereumKeyStore(string);
          const privateKey = await this.keyStore.getPrivateKey(this.password);
          this.setValidatorPrivateKey(privateKey);
          resolve(privateKey);
        } catch (error) {
          this.setValidatorPrivateKey('');
          reject(error.message);
        }
      });
    });
  }

  /**
   * Add new validator
   * @param getGasEstimation
   * @param callBack
   */
  @action.bound
  // eslint-disable-next-line no-unused-vars
  async addNewValidator(getGasEstimation?: boolean, callBack?: (txHash: string) => void) {
    const walletStore: WalletStore = this.getStore('Wallet');
    const notificationsStore: NotificationsStore = this.getStore('Notifications');
    const gasEstimation: PriceEstimation = new PriceEstimation();
    const contract: Contract = walletStore.getContract();
    const ownerAddress: string = walletStore.accountAddress;

    this.newValidatorReceipt = null;
    this.addingNewValidator = true;

    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (resolve, reject) => {
        const payload: (string | string[])[] = await this.createPayLoad();

        console.debug('Add Validator Payload: ', payload);

        if (getGasEstimation) {
          // Send add operator transaction
          this.conditionalContractFunction(contract, payload)
              .estimateGas({ from: ownerAddress })
              .then((gasAmount: any) => {
                this.addingNewValidator = true;
                this.estimationGas = gasAmount * 0.000000001;
                if (config.FEATURE.DOLLAR_CALCULATION) {
                  gasEstimation
                      .estimateGasInUSD(this.estimationGas)
                      .then((rate: number) => {
                        this.dollarEstimationGas = this.estimationGas * rate * 0;
                        resolve(true);
                      })
                      .catch(() => {
                        resolve(true);
                      });
                } else {
                  this.dollarEstimationGas = 0;
                  resolve(true);
                }
              })
              .catch((error: any) => {
                reject(error);
              });
        } else {
          // Send add operator transaction
          this.conditionalContractFunction(contract, payload)
              .send({ from: ownerAddress })
          .on('receipt', (receipt: any) => {
                // eslint-disable-next-line no-prototype-builtins
                const event: boolean = receipt.hasOwnProperty('events');
                if (event) {
                  console.debug('Contract Receipt', receipt);
                  this.newValidatorReceipt = payload[1];
                  this.clearValidatorData();
                  resolve(event);
                }
              })
              .on('transactionHash', (txHash: string) => {
                callBack && callBack(txHash);
              })
              .on('error', (error: any) => {
                this.addingNewValidator = false;
                console.debug('Contract Error', error);
                reject(error);
              })
              .catch((error: any) => {
                this.addingNewValidator = false;
                if (error) {
                  notificationsStore.showMessage(error.message, 'error');
                  reject(error);
                }
                console.debug('Contract Error', error);
                resolve(true);
              });
        }
    });
  }

  @action.bound
  async createPayLoad(): Promise<(string | string[])[]> {
    if (this.createValidatorPayLoad) return this.createValidatorPayLoad;
    const ssvStore: SsvStore = this.getStore('SSV');
    const walletStore: WalletStore = this.getStore('Wallet');
    const operatorStore: OperatorStore = this.getStore('Operator');
    const threshold: Threshold = new Threshold();
    const thresholdResult: ISharesKeyPairs = await threshold.create(this.validatorPrivateKey);
    let totalAmountOfSsv = 0;
    if (process.env.REACT_APP_NEW_STAGE) {
      const operatorsFees = ssvStore.getFeeForYear(operatorStore.getSelectedOperatorsFee);
      const liquidationCollateral = (ssvStore.networkFee + operatorStore.getSelectedOperatorsFee) * ssvStore.liquidationCollateral;
       totalAmountOfSsv = liquidationCollateral + ssvStore.getFeeForYear(ssvStore.networkFee) + operatorsFees;
    }

    return new Promise((resolve) => {
      // Get list of selected operator's public keys
      const operatorPublicKeys: string[] = Object.values(operatorStore.selectedOperators).map((operator: IOperator) => {
        return operator.pubkey;
      });

      // Collect all public keys from shares
      const sharePublicKeys: string[] = thresholdResult.shares.map((share: IShares) => {
        return share.publicKey;
      });
      const decodeOperatorsKey: string[] = operatorPublicKeys.map((operatorKey: string) => {
        return atob(walletStore.decodeKey(operatorKey));
      });
      const encryptedShares: EncryptShare[] = new Encryption(decodeOperatorsKey, thresholdResult.shares).encrypt();
      // Collect all private keys from shares
      const encryptedKeys: string[] = encryptedShares.map((share: IShares) => {
        return walletStore.encodeKey(share.privateKey);
      });
      const payLoad = [
        thresholdResult.validatorPublicKey,
        operatorPublicKeys,
        sharePublicKeys,
        encryptedKeys,
      ];
      if (process.env.REACT_APP_NEW_STAGE) {
        payLoad.push(walletStore.web3.utils.toWei(roundCryptoValueString(totalAmountOfSsv)));
      } else {
        payLoad.unshift(walletStore.accountAddress);
      }
      this.createValidatorPayLoad = payLoad;
      resolve(payLoad);
    });
  }

  /**
   * Set validator private key
   * @param validatorPrivateKey
   */
  @action.bound
  setValidatorPrivateKey(validatorPrivateKey: string) {
    this.validatorPrivateKey = validatorPrivateKey;
  }

  /**
   * Set keystore file
   * @param validatorPrivateKeyFile
   */
  @action.bound
  setValidatorPrivateKeyFile(validatorPrivateKeyFile: any) {
    this.validatorPrivateKeyFile = validatorPrivateKeyFile;
    this.validatorPrivateKey = '';
  }

  conditionalContractFunction(contract: any, payload: any[]) {
    if (process.env.REACT_APP_NEW_STAGE) return contract.methods.registerValidator(...payload);
    return contract.methods.addValidator(...payload);
  }
}

export default ValidatorStore;
