import { flags } from '@oclif/command';
import { textSync } from 'figlet';

export default class CommandHelper {
    public static defaultFlags = {
        help: flags.help({ char: 'h' }),
    };

    public static initCommand(): void {
        console.log(textSync('catapult-state-deserializer', { horizontalLayout: 'full' }));
    }
}
