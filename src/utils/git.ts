import { spinner } from '@clack/prompts';
import degit from 'degit';
import { execa } from 'execa';

/**
 * @func cloneBoilerplate
 * @description Clones the boilerplate repository to the specified path using degit.
 *
 * @param {string} projectPath The absolute path where the boilerplate should be cloned.
 *
 * @returns {Promise<void>}
 */
export const cloneBoilerplate = async (projectPath: string): Promise<void> => {
  const s = spinner();
  s.start('Cloning boilerplate...');

  try {
    const emitter = degit('vihuvac/expressure', {
      cache: false,
      force: true,
      verbose: true,
    });

    await emitter.clone(projectPath);

    s.stop('Boilerplate successfully cloned!');
  } catch (error) {
    s.stop(`Failed to clone boilerplate: ${error}`);
    process.exit(1);
  }
};

/**
 * @func initializeGitProject
 * @description Initializes a git project with the specified path.
 *
 * @param {string} projectPath The absolute path where the git project should be initialized.
 *
 * @returns {Promise<void>}
 */
export const initializeGitProject = async (projectPath: string): Promise<void> => {
  const s = spinner();
  s.start('Initializing project with git...');

  try {
    await execa('git', ['init', '--initial-branch=main'], {
      cwd: projectPath,
    });

    s.stop('Project successfully initialized!');
  } catch (error) {
    s.stop(`Failed to initialize project with git: ${error}`);
  }
};

/**
 * @func createInitialCommit
 * @description Stages the project files and creates an initial commit for the specified project path, and given message.
 *
 * @param {string} projectPath The absolute path where the initial commit should be created.
 * @param {string} message     The message for the initial commit.
 *
 * @returns {Promise<void>}
 */
export const createInitialCommit = async (projectPath: string, message: string): Promise<void> => {
  const s = spinner();
  s.start('Creating initial commit...');

  try {
    // Stage all project files.
    await execa('git', ['add', '-A'], {
      cwd: projectPath,
    });

    // Create initial commit.
    await execa('git', ['commit', '-m', message], {
      cwd: projectPath,
    });

    s.stop('Initial commit successfully created!');
  } catch (_error) {
    s.stop(`Failed to create initial commit: ${_error}`);
  }
};

/**
 * @func prepareHusky
 * @description Prepares husky for the specified project path.
 *
 * @param {string} projectPath The absolute path where husky should be prepared.
 *
 * @returns {Promise<void>}
 */
export const prepareHusky = async (projectPath: string): Promise<void> => {
  const s = spinner();
  s.start('Preparing husky...');

  try {
    await execa('pnpm', ['prepare'], {
      cwd: projectPath,
    });

    s.stop('Husky successfully initialized!');
  } catch (_error) {
    s.stop(`Failed to prepare husky: ${_error}`);
  }
};
