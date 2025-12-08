import { updateProjectConfig } from '../utils/config';
import { installDependencies, startDocker } from '../utils/dependencies';
import { configureEnvironment } from '../utils/filesystem';
import { cloneBoilerplate } from '../utils/git';
import { checkOverwrite, getProjectName, getProjectPath } from '../utils/prompts';

/**
 * @func createProject
 * @description Creates a new Expressure-based API.
 *
 * @param {string} projectName The name of the new API.
 * @param {string} projectPath The path to the API directory.
 *
 * @returns {Promise<{ name: string, path: string }>} The name and path of the created API.
 */
export const createProject = async (projectName?: string, projectPath?: string) => {
  // 1. Prompt for project name and determine path
  const name = await getProjectName(projectName);
  const path = getProjectPath(name, projectPath);

  // 2. Check if directory exists and handle overwrite
  await checkOverwrite(path, name);

  // 3. Clone boilerplate
  await cloneBoilerplate(path);

  // 4. Configure environment
  await configureEnvironment(path);

  // 5. Update project configuration
  await updateProjectConfig(path, name);

  // 6. Install dependencies
  await installDependencies(path);

  // 7. Start Docker
  await startDocker(path);

  return Object.freeze({
    name,
    path,
  });
};
