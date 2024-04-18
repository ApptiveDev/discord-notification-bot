import { Command } from '../types/command';

import * as standup from "./standup";

const commands: Record<string, any> = {
  "standup": standup,
}

export default commands;