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