import path from 'node:path';
import { cancel, confirm, isCancel, text } from '@clack/prompts';
import fs from 'fs-extra';
import color from 'picocolors';

/**
 * @func getProjectName
 * @description Prompts the user for the project name if it wasn't provided as an argument.
 *
 * @param {string | undefined} projectName The project name passed from CLI args.
 *
 * @returns {Promise<string>} The project name.
 */
export const getProjectName = async (projectName?: string): Promise<string> => {
  if (projectName) {
    return projectName;
  }

  const name = await text({
    message: 'What is the name of your project?',
    placeholder: 'my-expressure-api',
    validate: (value) => {
      if (!value) return 'Please enter a name.';
      if (value.includes(' ')) return 'Spaces are not allowed.';
    },
  });

  if (isCancel(name)) {
    cancel('Operation cancelled.');
    process.exit(0);
  }

  return name as string;
};

/**
 * @func getProjectPath
 * @description Determines the project path based on arguments or defaults to cwd/projectName.
 *
 * @param {string} projectName             The name of the project.
 * @param {string | undefined} projectPath The optional path passed from CLI args.
 *
 * @returns {string} The absolute path where the project should be created.
 */
export const getProjectPath = (projectName: string, projectPath?: string): string => {
  if (projectPath) {
    return path.resolve(process.cwd(), projectPath);
  }
  return path.resolve(process.cwd(), projectName);
};

/**
 * @func checkOverwrite
 * @description Checks if the target directory exists and asks the user if they want to overwrite it.
 * If yes, it ensures the directory is empty.
 *
 * @param {string} projectPath The absolute path to the project directory.
 * @param {string} projectName The name of the project (for display).
 *
 * @returns {Promise<void>}
 */
export const checkOverwrite = async (projectPath: string, projectName: string): Promise<void> => {
  if (fs.existsSync(projectPath)) {
    const shouldOverwrite = await confirm({
      message: `Directory ${color.bold(projectName)} already exists. Would you like to overwrite it?`,
    });

    if (isCancel(shouldOverwrite) || !shouldOverwrite) {
      cancel('Operation cancelled.');
      process.exit(0);
    }

    await fs.emptyDir(projectPath);
  }
};
