from pathlib import Path
from mkdocs_to_pdf.themes import material

get_stylesheet = material.get_stylesheet
inject_link = material.inject_link


def get_script_sources():
    return material.get_script_sources() + [
        str(Path(__file__).resolve().parent
            / "docs/javascripts/mermaid.js")
    ]