import { spinner } from '@clack/prompts';
import degit from 'degit';

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
  } catch (err) {
    s.stop(`Failed to clone boilerplate: ${err}`);
    process.exit(1);
  }
};
