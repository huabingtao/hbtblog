# Hbt'blog - VuePress Project Guidance

## Project Overview
This project is a personal blog built using **VuePress v1**. It leverages the `@vuepress/theme-blog` and includes significant theme customizations located in the `.vuepress/theme/` directory. The blog is configured to deploy to GitHub Pages.

### Core Technologies
- **VuePress v1**: Static site generator.
- **Vue.js**: Used for theme components.
- **Stylus**: Used for styling in the custom theme.
- **Vssue**: GitHub issue-based comment system.
- **GitHub Actions**: Automated CI/CD for site deployment.

### Project Structure
- `.github/workflows/`: Contains `main.yml` for CI/CD deployment to GitHub Pages.
- `.vuepress/theme/`: Custom theme components, layouts, and styles.
- `docs/`: Root directory for the blog content and configuration.
  - `.vuepress/config.js`: Main configuration file for VuePress.
  - `_posts/`: Markdown files for blog entries.
- `public/`: The target directory for the built static site (configured in `config.js`).
- `deploy.sh`: Shell script for manual deployment to GitHub Pages.

## Building and Running

### Development
To start the development server with hot-reload:
```bash
npm run docs:dev
```
The server usually runs on `http://localhost:2021` (as configured in `config.js`).

### Production Build
To generate the static site:
```bash
npm run docs:build
```
The built files will be located in the `public/` directory at the root of the project.

### Deployment
Deployment is automatically handled by GitHub Actions on every push to the `master` branch. For manual deployment:
```bash
npm run deploy
```
*Note: Ensure you have the necessary SSH keys/permissions configured for manual pushes to the `gh-pages` branch.*

## Development Conventions

### Creating New Posts
- Place new blog posts in `docs/_posts/`.
- Each post must include Markdown frontmatter. Example:
  ```markdown
  ---
  title: Your Post Title
  date: YYYY-MM-DD
  tags:
    - Tag1
    - Tag2
  author: Author Name
  ---
  ```

### Customizing the Theme
- Layouts are in `.vuepress/theme/layouts/`.
- Reusable components are in `.vuepress/theme/components/`.
- Global components are in `.vuepress/theme/global-components/`.
- Styles are located in `.vuepress/theme/styles/` and follow the Stylus format.

### Configuration
- Major site settings (title, description, plugins, nav) are managed in `docs/.vuepress/config.js`.
- The `base` URL is set to `/hbtblog/` for GitHub Pages compatibility.

## Deployment Notes
- The build process requires `NODE_OPTIONS: --openssl-legacy-provider` when using modern Node.js versions due to VuePress v1's dependencies.
- The `gh-pages` branch is used for hosting the static content.
