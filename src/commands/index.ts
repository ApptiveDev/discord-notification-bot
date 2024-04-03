import { Command } from '../types/command';
import * as standupAdd from './standup-add';
import * as standupDelete from './standup-delete';
import * as standupManager from './standup-manager';

const commands = {
  'standup-add': standupAdd,
  'standup-delete': standupDelete,
  'standup-manager': standupManager
} as { [key: string]: Command
};

export default commands;