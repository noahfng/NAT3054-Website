# Regular Expressions

Regular expressions (regex) provide a compact way to search,
filter and validate textual data. In scientific computing,
they are particularly useful for processing log files,
extracting numerical values and selecting relevant data.

## Basic metacharacters

| Metacharacter | Meaning |
| --- | --- |
| `.` | Any single character |
| `*` | Zero or more occurrences |
| `+` | One or more occurrences |
| `?` | Zero or one occurrence |
| `^` | Beginning of a line |
| `$` | End of a line |
| `[abc]` | Character inclusion |
| `[^abc]` | Character exclusion |
| `{n}` | Exactly n repetitions |
| `\|` | Alternation |

## Combining conditions

Multiple regular expressions can be combined using logical
operations.

Let $A$ and $B$ denote the sets of strings matching two
regular expressions.

A logical AND corresponds to the intersection

$$
A \land B \quad \longleftrightarrow \quad A \cap B.
$$

In the shell, this can be implemented using pipes:

```bash
grep -E 'regex1' file.txt | grep -E 'regex2'
```

A logical OR corresponds to the union

$$
A \lor B \quad \longleftrightarrow \quad A \cup B.
$$

This can be implemented using alternation:

```bash
grep -E 'regex1|regex2' file.txt
```

## Numerical input validation

Scientific data often contain floating-point numbers
written in scientific notation. The following regular expression validates decimal
numbers with an optional exponent:

```bash
grep -E '^[+-]?[0-9]*\.[0-9]+(e[+-]?[0-9]+)?$' floats.txt
```

Examples of accepted input:

- `8.54585`
- `-0.54585`
- `.54585`
- `8.54585e-2`
- `008.54585e+002`

This allows numerical input to be checked before further
processing or analysis.

## Basic vs. Extended Regular Expressions

The `grep` command supports two regular expression syntaxes:
Basic Regular Expressions (BRE) and Extended Regular
Expressions (ERE).

By default, `grep` uses BRE, whereas `grep -E` uses ERE.
They differ mainly in the interpretation of certain
metacharacters.

### Repetition

Match strings consisting of exactly three digits.

=== "BRE"

    <div class="pdf-only" markdown="1">

    **Basic Regular Expressions (BRE)**

    </div>

    ```bash
    grep '^[0-9]\{3\}$' file.txt
    ```

    In BRE, the curly brackets must be escaped using
    backslashes to indicate repetition.

=== "ERE"

    <div class="pdf-only" markdown="1">

    **Extended Regular Expressions (ERE)**

    </div>

    ```bash
    grep -E '^[0-9]{3}$' file.txt
    ```

    In ERE, curly brackets are interpreted directly
    as repetition operators.

**Syntax breakdown:**

| Expression | Meaning |
| --- | --- |
| `^` | Beginning of the line |
| `[0-9]` | Any digit between 0 and 9 |
| `{3}` | Exactly three occurrences |
| `$` | End of the line |


**Syntax breakdown:**

| Expression | Meaning |
| --- | --- |
| `^` | Beginning of the line |
| `[0-9]` | Any digit between 0 and 9 |
| `{3}` | Exactly three occurrences |
| `$` | End of the line |

### Grouping and alternation

Match strings consisting of either `abc` or `def`.

=== "BRE"

    <div class="pdf-only" markdown="1">

    **Basic Regular Expressions (BRE)**

    </div>

    ```bash
    grep '^\(abc\|def\)$' file.txt
    ```

    Grouping and alternation are expressed using
    escaped parentheses and an escaped vertical bar.

=== "ERE"

    <div class="pdf-only" markdown="1">

    **Extended Regular Expressions (ERE)**

    </div>

    ```bash
    grep -E '^(abc|def)$' file.txt
    ```

    Parentheses and the vertical bar are interpreted
    directly as grouping and alternation operators.

**Syntax breakdown:**

| Expression | Meaning |
| --- | --- |
| `^` | Beginning of the line |
| `( ... )` | Groups multiple expressions |
| `abc` | First possible match |
| `\|` | Logical OR (alternation) |
| `def` | Second possible match |
| `$` | End of the line |

!!! note "Compatibility"
    Alternation in BRE using `\|` is an extension to
    the POSIX standard. Its availability depends on
    the grep implementation.




## Interactive regex playground

Construct your own regular expressions and test them
against the examples below.

<div id="regex-playground" class="web-only">

    <label for="regex-preset">Challenge</label>

    <select id="regex-preset">
        <option value="wordle">Wordle challenge</option>
        <option value="integer">Integer validation</option>
        <option value="float">Floating-point numbers</option>
        <option value="custom">Custom expression</option>
    </select>

    <div id="regex-task"></div>

    <label for="regex-pattern">Regular expression</label>

    <input id="regex-pattern"
           type="text"
           placeholder="Enter your regular expression..."
           spellcheck="false"
           autocomplete="off">

    <label class="regex-switch-row">
        <span>Ignore case</span>
        <input id="regex-ignore-case"
               type="checkbox"
               class="regex-switch">
    </label>

    <label for="regex-input">Test strings</label>

    <textarea id="regex-input"
              rows="7"
              spellcheck="false"></textarea>

    <div id="regex-summary" aria-live="polite"></div>
    <div id="regex-results"></div>

</div>

<div class="pdf-only" markdown="1">

The interactive regex playground is available in the
[online documentation](https://noahfng.github.io/NAT3054-Website/src/section_1/#interactive-regex-playground).

</div>

!!! note "Regular expression engine"
    This playground uses JavaScript regular expressions.
    Its syntax and behaviour may differ from POSIX BRE
    and ERE as implemented by grep.