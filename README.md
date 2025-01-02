# Brick-Force Website

This is a static site built using [Eleventy](https://www.11ty.dev/). The build files are located in the `docs` folder, as required for deployment on GitHub Pages.

## Features
- **Static Site Generator:** Uses Eleventy for flexible, fast static site generation.
- **Customizable Build Directory:** Outputs build files to `docs/` for compatibility with GitHub Pages.
- **Easy Development Workflow:** Includes scripts for development and building.

## Installation

Before getting started, ensure you have [Node.js](https://nodejs.org/) installed on your system.

1. Clone the repository:
   ```bash
   git clone https://github.com/Brick-Force-Aurora/Website.git
   cd Website
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

## Development

Run the development server with live reloading:
```bash
npm start
```

This will start a local server and watch for changes. The site will be accessible at `http://localhost:8080/Website/` by default.

## Building

Generate the static files for production:
```bash
npm run build
```

The build files will be output to the `docs/` directory.

## Deployment

To deploy to GitHub Pages:
1. Ensure the `docs` folder is included in your repository.
2. Push changes to the `main` branch:
   ```bash
   git add .
   git commit -m "Build and deploy"
   git push origin main
   ```
3. Go to your repository’s **Settings > Pages** on GitHub.
4. Set the source to `main` and the folder to `/docs`.

The site is available at `https://brick-force-aurora.github.io/Website/`.

## Project Structure

```plaintext
.
├── docs/               # Output folder for build files (GitHub Pages source)
├── src/                # Source files
│   ├── _includes/      # Layouts and partials
│   ├── css/            # CSS files
│   ├── js/             # JavaScript files
│   ├── index.html      # Homepage
│   └── about.html      # About page
├── .eleventy.js        # Eleventy configuration
├── package.json        # Project metadata and scripts
├── README.md           # Project documentation
└── .gitignore          # Ignored files
```

## Scripts

- `npm start`: Start the development server with live reloading.
- `npm run build`: Build the project for production.
- `npm run deploy`: Deploy the project to GitHub Pages (if configured with `gh-pages`).

## Customization

- **Eleventy Configuration:** Modify `.eleventy.js` to customize input/output directories or plugins.
- **CSS/JS:** Add or modify styles and scripts in the `src/css` and `src/js` folders.

## License

This project is licensed under the MIT License. See the LICENSE file for details.