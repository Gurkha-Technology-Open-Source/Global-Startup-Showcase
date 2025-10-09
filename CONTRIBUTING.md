# Contributing to Global Startup Showcase

First off, thank you for considering contributing to the Global Startup Showcase! It's people like you that make the open-source community such a great place. We welcome contributions of all kinds, from bug reports to feature requests, and code contributions.

This project is participating in Hacktoberfest 2025. We're excited to welcome new contributors and help you get started with open source.

## Table of Contents

- [Contributing to Global Startup Showcase](#contributing-to-global-startup-showcase)
  - [Table of Contents](#table-of-contents)
  - [Hacktoberfest 2025](#hacktoberfest-2025)
  - [Code of Conduct](#code-of-conduct)
  - [How to Contribute](#how-to-contribute)
    - [Reporting Bugs](#reporting-bugs)
    - [Suggesting Enhancements](#suggesting-enhancements)
    - [Your First Code Contribution](#your-first-code-contribution)
  - [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
  - [Pull Request Process](#pull-request-process)
  - [License](#license)

## Hacktoberfest 2025

We are excited to participate in Hacktoberfest 2025! We have a number of issues that are specifically for Hacktoberfest contributors. You can find them by looking for the `hacktoberfest` label on our issues.

To get started, please read the [Hacktoberfest website](https://hacktoberfest.digitalocean.com/) for more information.

## Code of Conduct

This project and everyone participating in it is governed by the [Contributor Covenant Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code. Please report unacceptable behavior to the project maintainers.

## How to Contribute

### Reporting Bugs

If you find a bug, please open an issue on our [issue tracker](https://github.com/Gurkha-Technology-Open-Source/Global-Startup-Showcase/issues). Please include as much detail as possible, including:

*   A clear and descriptive title.
*   A detailed description of the bug.
*   Steps to reproduce the bug.
*   Screenshots or screen recordings, if possible.

### Suggesting Enhancements

If you have an idea for an enhancement, please open an issue on our [issue tracker](https://github.com/Gurkha-Technology-Open-Source/Global-Startup-Showcase/issues). Please include as much detail as possible, including:

*   A clear and descriptive title.
*   A detailed description of the enhancement.
*   The problem you're trying to solve.
*   Any proposed solutions.

### Your First Code Contribution

If you're new to open source, we recommend starting with one of our `good first issue` or `hacktoberfest` labeled issues. These are issues that are well-defined and a good starting point for new contributors.

## Getting Started

### Prerequisites

*   [Git](https://git-scm.com/)
*   [Node.js](https://nodejs.org/) v20 or higher
*   [npm](https://www.npmjs.com/) v10 or higher (comes with Node.js)
*   A local web server (Python, Node.js, or any HTTP server)
*   A code editor (VS Code, Sublime Text, etc.)

### Installation

1.  **Fork the repository** on GitHub
2.  **Clone your fork:**
    ```bash
    git clone https://github.com/YOUR-USERNAME/Global-Startup-Showcase.git
    cd Global-Startup-Showcase
    ```
3.  **Install dependencies:**
    ```bash
    npm install
    ```
4.  **Build the project:**
    ```bash
    npm run build
    ```
5.  **Start a local development server:**
    ```bash
    # Using Python
    python3 -m http.server 8000
    
    # Or using Node.js
    npx serve
    
    # Or using PHP
    php -S localhost:8000
    ```
6.  **Open your browser and navigate to `http://localhost:8000`**

### Development Workflow

1.  **Create a new branch** for your feature/fix:
    ```bash
    git checkout -b feature/your-feature-name
    ```
2.  **Make your changes** in the `src/` directory or other source files
3.  **Build the project** to see your changes:
    ```bash
    npm run build        # Build CSS and JS
    npm run build:css    # Build only CSS
    npm run build:js     # Build only JS
    npm run lint         # Check code quality
    ```
4.  **Test your changes** thoroughly in the browser
5.  **Commit your changes:**
    ```bash
    git add .
    git commit -m "feat: add amazing new feature"
    ```
    Follow [Conventional Commits](https://www.conventionalcommits.org/) format
6.  **Push to your fork:**
    ```bash
    git push origin feature/your-feature-name
    ```
7.  **Create a Pull Request** from your fork to the main repository

**Important Notes:**
- Do NOT commit files in the `dist/` folder (they're auto-generated)
- Do NOT commit `node_modules/` folder
- DO commit your changes to `src/` files
- Run `npm run lint` before committing to ensure code quality
- GitHub Actions will automatically build and deploy your changes

## Pull Request Process

1.  **Ensure your code follows the project standards:**
    - Run `npm run lint` and fix any errors
    - Test in multiple browsers if possible
    - Ensure accessibility features still work
    - Check that dark mode works correctly

2.  **Update documentation if needed:**
    - Update `README.md` if you've changed functionality
    - Update `docs/documentation.md` for technical changes
    - Add comments to complex code

3.  **Write a clear PR description:**
    - Describe what changes you made
    - Explain why you made them
    - Link to any related issues
    - Add screenshots for UI changes

4.  **Title format:**
    ```
    feat: add startup filtering by funding amount
    fix: resolve dark mode toggle bug
    docs: update installation instructions
    style: improve card hover animations
    ```

5.  **Wait for review:**
    - A maintainer will review your PR
    - Address any requested changes
    - Be patient and respectful

6.  **After approval:**
    - Your PR will be merged
    - GitHub Actions will automatically deploy changes
    - Your contribution will be credited!

### Commit Message Format

We follow [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>: <description>

[optional body]

[optional footer]
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, no logic change)
- `refactor`: Code refactoring
- `test`: Adding tests
- `chore`: Build process or tooling changes

**Examples:**
```
feat: add search by founder name
fix: correct dark mode button aria-label
docs: update contribution guidelines
style: improve mobile responsiveness
refactor: simplify filter logic
```

## License

By contributing, you agree that your contributions will be licensed under the MIT License.
