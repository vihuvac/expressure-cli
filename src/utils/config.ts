import { readFileSync } from 'node:fs';
import path from 'node:path';
import { note } from '@clack/prompts';
import fs from 'fs-extra';

/**
 * @constant
 * @description Retrieve package version and metadata, useful for API logging.
 *
 * Example:
 * {
 *   "name": "expressure",
 *   "version": "1.0.0",
 *   ...
 * }
 */
export const packageInfo: Record<string, unknown> = JSON.parse(
  readFileSync(path.join(__dirname, '../package.json'), 'utf8'),
);

/**
 * @func updateProjectConfig
 * @description Updates the project configuration files (`package.json`, `docker-compose.yaml`, `.jsdoc.json`) with the new project name.
 *
 * @param {string} projectPath The absolute path to the project directory.
 * @param {string} projectName The name of the project.
 *
 * @returns {Promise<void>}
 */
export const updateProjectConfig = async (
  projectPath: string,
  projectName: string,
): Promise<void> => {
  // Update package.json
  try {
    const pkgPath = path.join(projectPath, 'package.json');
    const pkg = await fs.readJSON(pkgPath);

    pkg.name = projectName;

    if (pkg.scripts) {
      Object.keys(pkg.scripts).forEach((key) => {
        if (typeof pkg.scripts[key] === 'string') {
          pkg.scripts[key] = pkg.scripts[key].replace(/expressure/g, projectName);
        }
      });
    }

    await fs.writeJSON(pkgPath, pkg, { spaces: 2 });
  } catch (_error) {
    note('Failed to update package.json. Please check it manually.');
  }

  // Update docker-compose.yaml
  try {
    let dockerComposePath = path.join(projectPath, 'docker-compose.yaml');
    if (!(await fs.pathExists(dockerComposePath))) {
      dockerComposePath = path.join(projectPath, 'docker-compose.yml');
    }

    if (await fs.pathExists(dockerComposePath)) {
      let dockerComposeContent = await fs.readFile(dockerComposePath, 'utf-8');

      dockerComposeContent = dockerComposeContent.replace(
        /container_name:\s*expressure/g,
        `container_name: ${projectName}`,
      );

      dockerComposeContent = dockerComposeContent.replace(
        /image:\s*expressure-api/g,
        `image: ${projectName}-api`,
      );

      await fs.writeFile(dockerComposePath, dockerComposeContent);
    }
  } catch (_error) {
    note('Failed to update docker-compose.yaml. Please check it manually.');
  }

  // Update .jsdoc.json
  try {
    const jsdocPath = path.join(projectPath, '.jsdoc.json');
    if (await fs.pathExists(jsdocPath)) {
      const jsdoc = await fs.readJSON(jsdocPath);
      if (jsdoc.templates?.['better-docs']) {
        jsdoc.templates['better-docs'].name = projectName;
      }
      await fs.writeJSON(jsdocPath, jsdoc, { spaces: 2 });
    }
  } catch (_error) {
    note('Failed to update .jsdoc.json. Please check it manually.');
  }
};
