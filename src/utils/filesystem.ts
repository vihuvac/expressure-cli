import path from 'node:path';
import { note, spinner } from '@clack/prompts';
import fs from 'fs-extra';

/**
 * @func configureEnvironment
 * @description Configures the environment file by copying .env.template to `.env`.
 *
 * @param {string} projectPath The absolute path to the project directory.
 *
 * @returns {Promise<void>}
 */
export const configureEnvironment = async (projectPath: string): Promise<void> => {
  const s = spinner();
  s.start('Configuring environment...');
  try {
    const envTemplate = path.join(projectPath, '.env.template');
    const envTarget = path.join(projectPath, '.env');

    if (await fs.pathExists(envTemplate)) {
      await fs.copy(envTemplate, envTarget);
      s.stop('Environment configured successfully!');
    } else {
      s.stop('Environment configuration failed: .env.template not found.');
      note('Could not find .env.template. Please configure .env manually.');
    }
  } catch (_error) {
    s.stop('Failed to configure environment vars (non-critical)');
  }
};
