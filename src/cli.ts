#!/usr/bin/env node

import { intro, note, outro } from '@clack/prompts';
import { Command } from 'commander';
import color from 'picocolors';

import { createProject } from './commands/create';
import { packageInfo } from './utils/config';
import { showDockerLogs } from './utils/dependencies';

const PROJECT_NAME = 'Expressure CLI';
const program = new Command();

program
  .name(packageInfo.name as string)
  .description('A CLI to bootstrap an Expressure-based API')
  .version(packageInfo.version as string)
  .addHelpText(
    'after',
    `${color.yellow('\nUsage: pnpm dlx expressure@latest create <project-name> [project-path]')}`,
  );

program
  .command('create')
  .description('Create a new Expressure-based API')
  .argument('[project-name]', 'Name of the project')
  .argument('[project-path]', 'Path to create the project in (optional)')
  .action(async (projectName, projectPath) => {
    console.clear();

    intro(`${color.bgCyan(color.black(` ${PROJECT_NAME} `))}`);

    const { name, path } = await createProject(projectName, projectPath);

    note(`Project ${color.bold(name)} created at ${color.dim(path)}`);

    outro(`You're all set!`);

    await showDockerLogs(name);
  });

if (!process.argv.slice(2).length) {
  console.clear();
  intro(`${color.bgCyan(color.black(` ${PROJECT_NAME} `))}`);
  program.outputHelp();
  process.exit(0);
}

program.parse(process.argv);
