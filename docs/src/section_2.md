# Git & Version Control

Git is a distributed version control system that records
changes in project files and enables reproducible software
development.

In scientific computing, it allows analysis code to be
tracked, compared and restored throughout a project.

## Repository structure

Git distinguishes between four principal components:

| Component | Purpose |
| --- | --- |
| Working directory | Files currently being edited |
| Staging area | Changes selected for the next commit |
| Local repository | Recorded commits and project history |
| Remote repository | Shared repository hosted on a server |

## Git workflow

Changes are prepared locally, committed and subsequently
synchronized with a remote repository.

```mermaid
%%{init: {"theme":"base","themeVariables":{"primaryColor":"#F1F5F9","primaryTextColor":"#1E293B","primaryBorderColor":"#94A3B8","lineColor":"#64748B","fontFamily":"Inter, Arial","fontSize":"14px","edgeLabelBackground":"#FFFFFF"},"flowchart":{"curve":"basis","nodeSpacing":65,"rankSpacing":65,"htmlLabels":false}}}%%
flowchart TD
    A("Working directory")
    B("Staging area")
    C("Local repository")
    D("Remote repository")

    A -->|git add| B
    B -->|git commit| C
    C -->|git push| D
    D -.->|git fetch| C

    classDef default stroke-width:1px;
    classDef remote fill:#E0E7FF,stroke:#818CF8,color:#312E81;
    class D remote;
```

!!! note "Fetch versus pull"
    `git fetch` retrieves remote commits without integrating
    them into the current branch.

    `git pull` fetches remote changes and integrates them
    into the current branch.

## Command reference

| Command | Function |
| --- | --- |
| `git clone` | Create a local copy of a repository |
| `git status` | Inspect the repository state |
| `git add` | Stage changes |
| `git commit` | Record staged changes |
| `git push` | Publish local commits |
| `git fetch` | Retrieve remote commits |
| `git pull` | Retrieve and integrate remote changes |
| `git diff` | Inspect changes |
| `git log` | Display commit history |

## Automated documentation deployment

This website separates its source files from the generated
documentation using two Git branches.

- `main`: Markdown files, configuration and scripts.
- `gh-pages`: Generated HTML, assets and PDF documentation.

```mermaid
%%{init: {"theme":"base","themeVariables":{"primaryColor":"#F1F5F9","primaryTextColor":"#1E293B","primaryBorderColor":"#94A3B8","lineColor":"#64748B","fontFamily":"Inter, Arial","fontSize":"14px","edgeLabelBackground":"#FFFFFF"},"flowchart":{"curve":"basis","nodeSpacing":45,"rankSpacing":55,"htmlLabels":false}}}%%
flowchart TD
    A("Markdown + configuration")
    B("Local preview")
    C("main branch")
    D("MkDocs build")
    E("HTML website")
    F("PDF documentation")
    G("gh-pages branch")
    H("GitHub Pages")

    A --> B
    A -->|Commit and push| C
    A -->|Deploy| D
    D --> E
    D --> F
    E --> G
    F --> G
    G --> H

    classDef default stroke-width:1px;
    classDef branch fill:#E0E7FF,stroke:#818CF8,color:#312E81;
    classDef published fill:#DCFCE7,stroke:#86A98D,color:#166534;

    class C,G branch;
    class H published;
```

## Development and deployment

### Local development

```bash
mkdocs serve
```

### Generate the complete documentation

```bash
ENABLE_PDF_EXPORT=1 mkdocs build
```

### Publish changes

```bash
git add .
git commit -m "Update documentation"
git push
ENABLE_PDF_EXPORT=1 mkdocs gh-deploy
```

!!! tip "Development workflow"
    PDF generation is disabled during normal development
    to reduce build times. It is enabled explicitly when
    generating or deploying the complete documentation.
