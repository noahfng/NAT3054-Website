# Programming Tools in HEP

Documentation website developed as part of NAT3054:
Advanced Programming Tools in High-Energy Physics at TUM.

## Features

- Markdown documentation
- Material for MkDocs
- Mathematical expressions using MathJax
- Diagrams using Mermaid
- Automated PDF generation
- Deployment through GitHub Pages

## Website

https://noahfng.github.io/NAT3054-Website/

## Local development

```bash
mkdocs serve
```

## Build with PDF export

```bash
ENABLE_PDF_EXPORT=1 mkdocs build
```

## Deployment

```bash
ENABLE_PDF_EXPORT=1 mkdocs gh-deploy
```