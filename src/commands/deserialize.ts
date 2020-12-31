import { Command, flags } from '@oclif/command';
import CommandHelper from '../CommandHelper';
import { Deserializer } from '../Deserializer';
import { StateType } from '../model/StateType';

export default class Deserialize extends Command {
    static description = 'Deserialize catapult state buffer';

    static flags = {
        ...CommandHelper.defaultFlags,
        payload: flags.string({
            char: 'p',
            description: 'State payload in hexadecimal',
            required: true,
        }),
        type: flags.string({
            char: 't',
            description: 'State type',
            default: StateType.account,
            options: Object.keys(StateType),
        }),
    };

    async run(): Promise<void> {
        const { flags } = this.parse(Deserialize);
        const deserializer = new Deserializer(flags.payload, StateType[flags.type]);
        deserializer.run();
    }
}
