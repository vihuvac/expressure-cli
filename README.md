# Expressure CLI

A robust CLI tool to seamlessly bootstrap new projects based on the
[Expressure](https://github.com/vihuvac/expressure) boilerplate.

## 📖 Overview

The Expressure CLI simplifies the setup process for new Express.js APIs. It
handles cloning the boilerplate, checking environment configuration, setting up
the project structure, and even starting your Docker containers—all with a
single command.

## 🚀 Quick Start

You don't need to install anything globally. Just run:

```bash
pnpm dlx expressure@latest create <project-name>
```

Follow the interactive prompts, and you'll be up and running in seconds.

## ✨ Features

- **Interactive Setup**: Simple prompts guide you through the creation process.
- **Smart Defaults**: Automatically configures paths and settings based on your
  project name.
- **Automated Configuration**:
  - Sets up `.env` from templates.
  - Updates `package.json`, `docker-compose.yaml`, and documentation configs
    with your project name.
- **Dependency Management**: Automatically installs dependencies using `pnpm`.
- **Docker Integration**: Starts your development environment using Docker
  Compose immediately after setup.

## 📦 Installation (Optional)

If you prefer to have the CLI installed globally:

```bash
pnpm add -g expressure
```

Then you can run:

```bash
expressure create my-new-api
```

## 🛠️ Usage

### Create a new project

```bash
expressure create [project-name] [path]
```

- **project-name**: The name of your new project (e.g., `my-api`).
- **path**: (Optional) The directory where the project should be created.
  Defaults to `./<project-name>`.

### Helper flags

```bash
expressure --help
expressure --version
```

## 🤝 Contributing

Contributions are welcome! If you find a bug or have a feature request, please
open an issue or submit a pull request.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file
for details.

---

Built with ❤️ using [@clack/prompts](https://github.com/bombshell-dev/clack)
