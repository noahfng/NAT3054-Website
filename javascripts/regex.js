function initializeRegexPlayground() {

    const preset = document.getElementById("regex-preset");
    const task = document.getElementById("regex-task");
    const pattern = document.getElementById("regex-pattern");
    const input = document.getElementById("regex-input");
    const ignoreCase = document.getElementById("regex-ignore-case");
    const summary = document.getElementById("regex-summary");
    const results = document.getElementById("regex-results");

    if (!preset) return;

    const examples = {
        wordle: {
            task: "Match five-character words beginning with w, ending with h and containing exactly one t.",
            input: "watch\nwitch\nwidth\nworth\nwtath\nwater\nWATCH"
        },
        integer: {
            task: "Match signed or unsigned integers without unnecessary leading zeros.",
            input: "123\n-4568\n+569\n0123\n-004568\n0"
        },
        float: {
            task: "Match decimal numbers with an optional sign and exponent.",
            input: "8.54585\n-.54585\n008.54585e+002\n8.5e\nabc\n.0"
        },
        custom: {
            task: "Enter your own expression and test strings.",
            input: ""
        }
    };

    function testRegex() {

        results.replaceChildren();

        if (pattern.value === "") {
            summary.textContent =
                "Enter a regular expression to start testing.";
            return;
        }

        try {
            const flags = ignoreCase.checked ? "gi" : "g";
            const regex = new RegExp(pattern.value, flags);
            const lines = input.value.split(/\r?\n/);

            let matchedLines = 0;
            let totalMatches = 0;

            for (const line of lines) {

                const matches = Array.from(line.matchAll(regex));

                if (matches.length > 0) matchedLines++;

                totalMatches += matches.length;

                const row = document.createElement("div");
                row.className = "regex-result";

                const status = document.createElement("span");
                status.className = matches.length
                    ? "regex-status-match"
                    : "regex-status-none";

                status.textContent = matches.length ? "✓" : "–";

                const content = document.createElement("code");

                let position = 0;

                for (const match of matches) {

                    content.append(
                        document.createTextNode(
                            line.slice(position, match.index)
                        )
                    );

                    const highlight = document.createElement("mark");

                    highlight.textContent = match[0] || "∅";

                    content.appendChild(highlight);

                    position = match.index + match[0].length;
                }

                content.append(
                    document.createTextNode(line.slice(position))
                );

                if (!line && !matches.length) {
                    content.textContent = "(empty string)";
                }

                row.append(status, content);
                results.appendChild(row);
            }

            summary.textContent =
                `${matchedLines} of ${lines.length} lines matched`
                + ` · ${totalMatches} total matches`;

        } catch (error) {
            summary.textContent =
                "Invalid expression: " + error.message;
        }
    }

    function loadExample() {

        const example = examples[preset.value];

        task.textContent = example.task;
        input.value = example.input;
        pattern.value = "";

        testRegex();
    }

    preset.onchange = loadExample;
    pattern.oninput = testRegex;
    input.oninput = testRegex;
    ignoreCase.onchange = testRegex;

    loadExample();
}

document$.subscribe(initializeRegexPlayground);