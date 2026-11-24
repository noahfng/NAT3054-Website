mermaid.initialize({
  startOnLoad: false,
  theme: "default",
  flowchart: {
    htmlLabels: false
  }
});

window.addEventListener("load", async () => {
  const diagrams = document.querySelectorAll("pre.mermaid > code");

  for (const [i, code] of Array.from(diagrams).entries()) {
    const source = code.textContent.trim();
    const container = code.parentElement;

    try {
      const { svg } = await mermaid.render(`diagram-${i}`, source);
      container.innerHTML = svg;
    } catch (error) {
      console.error("Mermaid rendering failed:", error);
    }
  }
});