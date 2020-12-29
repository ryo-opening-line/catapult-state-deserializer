catapult-state-deserializer
================

This tools deserialize catapult state buffer into readable JSON object.

### Installation

```sh-session
npm install
npm pack
npm install -g (optional)
```

### Usage
<!-- usage -->
```sh-session
$ npm install -g catapult-state-deserializer
$ catapult-state-deserializer COMMAND
running command...
$ catapult-state-deserializer (-v|--version|version)
catapult-state-deserializer/0.0.1 darwin-x64 node-v12.1.0
$ catapult-state-deserializer --help [COMMAND]
USAGE
  $ catapult-state-deserializer COMMAND
...
```
<!-- usagestop -->

Alternative, if you don't have the tool globally installed, you can run
```
./bin/run COMMAND
```
Example:
```
./bin/run deserialize -p 98000FDC6432D0FF27C7........
```

# Commands
<!-- commands -->
* [`catapult-state-deserializer deserialize`](#catapult-state-deserializer-deserialize)
* [`catapult-state-deserializer help [COMMAND]`](#catapult-state-deserializer-help-command)

## `catapult-state-deserializer deserialize`

Deserialize catapult state buffer

```
USAGE
  $ catapult-state-deserializer deserialize

OPTIONS
  -h, --help
      show CLI help

  -p, --payload=payload
      (required) State payload in hexadecimal

  -t, --type=account|namespace|mosaic|multisig|hashLock|secretLock|accountRestriction|mosaicRestriction|metadata
      [default: account] State type
```

## `catapult-state-deserializer help [COMMAND]`

display help for catapult-state-deserializer

```
USAGE
  $ catapult-state-deserializer help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v3.2.0/src/commands/help.ts)_
<!-- commandsstop -->
