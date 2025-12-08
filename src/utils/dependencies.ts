import { note, spinner } from '@clack/prompts';
import { execa } from 'execa';
import color from 'picocolors';

/**
 * @func installDependencies
 * @description Installs project dependencies using pnpm.
 *
 * @param {string} projectPath The absolute path to the project directory.
 *
 * @returns {Promise<void>}
 */
export const installDependencies = async (projectPath: string): Promise<void> => {
  const s = spinner();
  s.start('Installing dependencies...');
  try {
    await execa('pnpm', ['install', '--frozen-lockfile'], { cwd: projectPath });
    s.stop('Dependencies successfully installed!');
  } catch (_error) {
    s.stop('Failed to install dependencies.');
    note(`Please run ${color.bold('pnpm install --frozen-lockfile')} manually.`);
  }
};

/**
 * @func startDocker
 * @description Starts Docker containers using docker compose up -d.
 *
 * @param {string} projectPath The absolute path to the project directory.
 *
 * @returns {Promise<void>}
 */
export const startDocker = async (projectPath: string): Promise<void> => {
  const s = spinner();
  s.start('Starting Docker containers...');
  try {
    await execa('docker', ['compose', 'up', '-d'], { cwd: projectPath });
    s.stop('Docker containers successfully started!');
  } catch (_error) {
    s.stop('Failed to start Docker containers.');
    note(`Please run ${color.bold('pnpm docker:up')} manually. Make sure Docker is running.`);
  }
};

/**
 * @func showDockerLogs
 * @description Tails the Docker logs for the project.
 *
 * @param {string} projectName The name of the project/container.
 *
 * @returns {Promise<void>}
 */
export const showDockerLogs = async (projectName: string): Promise<void> => {
  try {
    await execa('docker', ['logs', '-f', projectName], {
      stdio: 'inherit',
    });
  } catch (_error) {
    note(`Failed to show Docker logs for ${projectName}.`);
  }
};
