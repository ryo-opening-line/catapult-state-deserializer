import {
    AccountRestrictionsInfoBuilder,
    AccountStateBuilder,
    HashLockInfoBuilder,
    MetadataEntryBuilder,
    MosaicEntryBuilder,
    MosaicRestrictionEntryBuilder,
    MultisigEntryBuilder,
    RootNamespaceHistoryBuilder,
    SecretLockInfoBuilder,
} from 'catbuffer-typescript';
import { StateType } from './model/StateType';
import { Convert } from 'symbol-sdk';
import { Formatter } from './utils/Formatter';

export class Deserializer {
    constructor(public payload: string, public readonly type: StateType) {
        // a bit of hack here to play with the version.
        this.payload = !['0100', '0200'].includes(this.payload.substring(0, 4)) ? `0100${payload}` : payload;
    }

    public async run(): Promise<void> {
        switch (this.type) {
            case StateType.account:
                const account = AccountStateBuilder.loadFromBinary(Convert.hexToUint8(this.payload));
                console.log(Formatter.formatAccountState(account));
                break;
            case StateType.namespace:
                const namespace = RootNamespaceHistoryBuilder.loadFromBinary(Convert.hexToUint8(this.payload));
                console.log(Formatter.formatNamespace(namespace));
                break;
            case StateType.mosaic:
                const mosaic = MosaicEntryBuilder.loadFromBinary(Convert.hexToUint8(this.payload));
                console.log(Formatter.formatMosaic(mosaic));
                break;
            case StateType.multisig:
                const multisig = MultisigEntryBuilder.loadFromBinary(Convert.hexToUint8(this.payload));
                console.log(Formatter.formatMultisig(multisig));
                break;
            case StateType.hashLock:
                const hashLock = HashLockInfoBuilder.loadFromBinary(Convert.hexToUint8(this.payload));
                console.log(Formatter.formatHashLock(hashLock));
                break;
            case StateType.secretLock:
                const secretLock = SecretLockInfoBuilder.loadFromBinary(Convert.hexToUint8(this.payload));
                console.log(Formatter.formatSecretLock(secretLock));
                break;
            case StateType.accountRestriction:
                const accountRestriction = AccountRestrictionsInfoBuilder.loadFromBinary(Convert.hexToUint8(this.payload));
                console.log(Formatter.formatAccountRestriction(accountRestriction));
                break;
            case StateType.mosaicRestriction:
                const mosaicRestriction = MosaicRestrictionEntryBuilder.loadFromBinary(Convert.hexToUint8(this.payload));
                console.log(Formatter.formatMosaicRestriction(mosaicRestriction));
                break;
            case StateType.metadata:
                const metadata = MetadataEntryBuilder.loadFromBinary(Convert.hexToUint8(this.payload));
                console.log(Formatter.formatMetadata(metadata));
                break;
            default:
                throw new Error(`State type: ${this.type} invalid`);
        }
    }
}
