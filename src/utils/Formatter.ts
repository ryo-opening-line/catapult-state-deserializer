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
import { Address, Convert, UInt64 } from 'symbol-sdk';

export class Formatter {
    public static formatAccountState(dto: AccountStateBuilder): any {
        return {
            version: dto.version,
            address: Address.createFromEncoded(Convert.uint8ToHex(dto.address.address)).plain(),
            addressHeight: new UInt64(dto.addressHeight.height).toString(),
            publicKey: Convert.uint8ToHex(dto.publicKey.key),
            publicKeyHeight: new UInt64(dto.publicKeyHeight.height).toString(),
            accountType: dto.accountType,
            format: dto.format,
            supplementalPublicKeysMask: dto.supplementalPublicKeysMask.map((key) => key),
            linkedPublicKey: dto.linkedPublicKey ? Convert.uint8ToHex(dto.linkedPublicKey.key) : '',
            nodePublicKey: dto.nodePublicKey ? Convert.uint8ToHex(dto.nodePublicKey.key) : '',
            vrfPublicKey: dto.vrfPublicKey ? Convert.uint8ToHex(dto.vrfPublicKey.key) : '',
            votingPublicKeys: dto.votingPublicKeys
                ? dto.votingPublicKeys.map((key) => {
                      return {
                          votingKey: Convert.uint8ToHex(key.votingKey.votingKey),
                          votingKey_Reserved1: Convert.uint8ToHex(key.votingKey_Reserved1.votingKeyPadding),
                          startEpoch: key.startEpoch.finalizationEpoch,
                          endEpoch: key.endEpoch.finalizationEpoch,
                      };
                  })
                : [],
            importanceSnapshots: dto.importanceSnapshots
                ? {
                      importance: new UInt64(dto.importanceSnapshots.importance.importance).toString(),
                      height: new UInt64(dto.importanceSnapshots.height.importanceHeight).toString(),
                  }
                : {},
            activityBuckets: dto.activityBuckets
                ? dto.activityBuckets.buckets.map((bucket) => {
                      return {
                          startHeight: new UInt64(bucket.startHeight.importanceHeight).toString(),
                          totalFeesPaid: new UInt64(bucket.totalFeesPaid.amount).toString(),
                          beneficiaryCount: bucket.beneficiaryCount,
                          rawScore: new UInt64(bucket.rawScore).toString(),
                      };
                  })
                : [],
            balances: dto.balances.map((balance) => {
                return {
                    mosaicId: new UInt64(balance.mosaicId.mosaicId).toHex(),
                    amount: new UInt64(balance.amount.amount).toString(),
                };
            }),
        };
    }

    public static formatMetadata(dto: MetadataEntryBuilder): any {
        return {
            version: dto.version,
            sourceAddress: Address.createFromEncoded(Convert.uint8ToHex(dto.sourceAddress.address)).plain(),
            targetAddress: Address.createFromEncoded(Convert.uint8ToHex(dto.targetAddress.address)).plain(),
            scopedMetadataKey: new UInt64(dto.scopedMetadataKey.scopedMetadataKey).toHex(),
            targetId: new UInt64(dto.targetId).toHex(),
            metadataType: dto.metadataType,
            value: Convert.uint8ToHex(dto.value.data),
        };
    }

    public static formatMosaicRestriction(dto: MosaicRestrictionEntryBuilder): any {
        return {
            version: dto.version,
            entryType: dto.entryType,
            addressEntry: dto.addressEntry
                ? {
                      mosaicId: new UInt64(dto.addressEntry.mosaicId.mosaicId).toHex(),
                      address: Address.createFromEncoded(Convert.uint8ToHex(dto.addressEntry.address)).plain(),
                      keyPairs: dto.addressEntry.keyPairs.keys.map((key) => {
                          return {
                              key: new UInt64(key.key.mosaicRestrictionKey).toHex(),
                              value: new UInt64(key.value).toHex(),
                          };
                      }),
                  }
                : {},
            globalEntry: dto.globalEntry
                ? {
                      mosaicId: new UInt64(dto.globalEntry.mosaicId.mosaicId).toHex(),
                      keyPairs: dto.globalEntry.keyPairs.keys.map((key) => {
                          return {
                              key: new UInt64(key.key.mosaicRestrictionKey).toHex(),
                              restrictionRule: {
                                  referenceMosaicId: new UInt64(key.restrictionRule.referenceMosaicId.mosaicId).toHex(),
                                  restrictionValue: new UInt64(key.restrictionRule.restrictionValue).toHex(),
                                  restrictionType: key.restrictionRule.restrictionType,
                              },
                          };
                      }),
                  }
                : {},
        };
    }

    public static formatAccountRestriction(dto: AccountRestrictionsInfoBuilder): any {
        return {
            restrictionFlags: dto.restrictionFlags.map((flag) => flag),
            addressRestrictions: dto.addressRestrictions
                ? {
                      restrictionValues: dto.addressRestrictions.restrictionValues.map((value) =>
                          Address.createFromEncoded(Convert.uint8ToHex(value.address)).plain(),
                      ),
                  }
                : {},
            mosaicIdRestrictions: dto.mosaicIdRestrictions
                ? {
                      restrictionValues: dto.mosaicIdRestrictions.restrictionValues.map((value) => new UInt64(value.mosaicId).toHex()),
                  }
                : {},
            transactionTypeRestrictions: dto.transactionTypeRestrictions
                ? {
                      restrictionValues: dto.transactionTypeRestrictions.restrictionValues.map((value) => value),
                  }
                : {},
        };
    }

    public static formatSecretLock(dto: SecretLockInfoBuilder): any {
        return {
            version: dto.version,
            ownerAddress: Address.createFromEncoded(Convert.uint8ToHex(dto.ownerAddress.address)).plain(),
            mosaic: {
                mosaicId: new UInt64(dto.mosaic.mosaicId.mosaicId).toHex(),
                amount: new UInt64(dto.mosaic.amount.amount).toString(),
            },
            endHeight: new UInt64(dto.endHeight.height).toString(),
            status: dto.status,
            hashAlgorithm: dto.hashAlgorithm,
            secret: Convert.uint8ToHex(dto.secret.hash256),
            recipient: Address.createFromEncoded(Convert.uint8ToHex(dto.recipient.address)).plain(),
        };
    }

    public static formatHashLock(dto: HashLockInfoBuilder): any {
        return {
            version: dto.version,
            ownerAddress: Address.createFromEncoded(Convert.uint8ToHex(dto.ownerAddress.address)).plain(),
            mosaic: {
                mosaicId: new UInt64(dto.mosaic.mosaicId.mosaicId).toHex(),
                amount: new UInt64(dto.mosaic.amount.amount).toString(),
            },
            endHeight: new UInt64(dto.endHeight.height).toString(),
            status: dto.status,
            hash: Convert.uint8ToHex(dto.hash.hash256),
        };
    }

    public static formatMultisig(dto: MultisigEntryBuilder): any {
        return {
            version: dto.version,
            minApproval: dto.minApproval,
            minRemoval: dto.minRemoval,
            accountAddress: Address.createFromEncoded(Convert.uint8ToHex(dto.accountAddress.address)).plain(),
            cosignatoryAddresses: dto.cosignatoryAddresses.map((address) => Address.createFromEncoded(Convert.uint8ToHex(address.address))),
            multisigAddresses: dto.multisigAddresses.map((address) => Address.createFromEncoded(Convert.uint8ToHex(address.address))),
        };
    }

    public static formatMosaic(dto: MosaicEntryBuilder): any {
        return {
            version: dto.version,
            mosaicId: new UInt64(dto.mosaicId.mosaicId).toHex(),
            supply: new UInt64(dto.supply.amount).toString(),
            definition: {
                startHeight: new UInt64(dto.definition.startHeight.height).toString(),
                ownerAddress: Address.createFromEncoded(Convert.uint8ToHex(dto.definition.ownerAddress.address)).plain(),
                revision: dto.definition.revision,
                properties: {
                    flags: dto.definition.properties.flags.map((flag) => flag),
                    divisibility: dto.definition.properties.divisibility,
                    duration: new UInt64(dto.definition.properties.duration.blockDuration).toHex(),
                },
            },
        };
    }

    public static formatNamespace(dto: RootNamespaceHistoryBuilder): any {
        return {
            version: dto.version,
            id: new UInt64(dto.id.namespaceId).toHex(),
            ownerAddress: Address.createFromEncoded(Convert.uint8ToHex(dto.ownerAddress.address)).plain(),
            lifetime: {
                lifetimeStart: new UInt64(dto.lifetime.lifetimeStart.height).toString(),
                lifetimeEnd: new UInt64(dto.lifetime.lifetimeEnd.height).toString(),
            },
            rootAlias: {
                namespaceAliasType: dto.rootAlias.namespaceAliasType,
                mosaicAlias: dto.rootAlias.mosaicAlias
                    ? {
                          mosaicId: new UInt64(dto.rootAlias.mosaicAlias.mosaicId).toHex(),
                      }
                    : {},
                addressAlias: dto.rootAlias.addressAlias
                    ? {
                          address: Address.createFromEncoded(Convert.uint8ToHex(dto.rootAlias.addressAlias.address)).plain(),
                      }
                    : {},
            },
            paths: dto.paths.map((path) => {
                return {
                    path: path.path.map((p) => new UInt64(p.namespaceId).toHex()),
                    alias: {
                        namespaceAliasType: path.alias.namespaceAliasType,
                        mosaicAlias: path.alias.mosaicAlias
                            ? {
                                  mosaicId: new UInt64(path.alias.mosaicAlias.mosaicId).toHex(),
                              }
                            : {},
                        addressAlias: path.alias.addressAlias
                            ? {
                                  address: Address.createFromEncoded(Convert.uint8ToHex(path.alias.addressAlias.address)).plain(),
                              }
                            : {},
                    },
                };
            }),
        };
    }
}
