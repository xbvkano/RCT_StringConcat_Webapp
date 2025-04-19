// 1) Define your determinant:
export interface Determinant {
    Lhand: string;   // what comes before the special code
    Rhand: string;   // what comes after the special code
  }
  

export const backslashDet: Determinant      = { Lhand: "\\",      Rhand: "" };    // \SPECIAL
export const singleQuoteDet: Determinant    = { Lhand: "'",        Rhand: "'" };   // 'SPECIAL'
export const doubleQuoteDet: Determinant    = { Lhand: '"',        Rhand: '"' };   // "SPECIAL"
export const templateLiteralDet: Determinant = { Lhand: "`${",      Rhand: "}`" }; // `${SPECIAL}`
export const escapedPrefixDet: Determinant  = { Lhand: "\\\\",  Rhand: "" };    // \\SPECIAL
export const backtickDet: Determinant      = { Lhand: "`",        Rhand: "`" };   // `SPECIAL`
export const angleDet: Determinant          = { Lhand: "<",        Rhand: ">" };   // <SPECIAL>
export const dollarSignDet: Determinant     = { Lhand: "$",        Rhand: "" };    // $SPECIAL
export const tildeDet: Determinant          = { Lhand: "~",        Rhand: "~" };   // ~SPECIAL~
export const hashPrefixDet: Determinant     = { Lhand: "#",        Rhand: "" };    // #SPECIAL
export const tagSlashDet: Determinant       = { Lhand: "/ \\ ", Rhand: "< >" };    // / \SPECIAL< >
export const hashSuffixDet: Determinant     = { Lhand: "",         Rhand: "#" };   // SPECIAL# (if needed)




// 2) Your sentence‑bank with placeholders for exactly one special code each:
//    • {n}, {t}, {\\}, {"}, {'}, {0}
export const templates = [
    `{n}Start and end{t}`,           // prefix n, suffix t
    `Hello{n}World!`,                // glued both sides
    `Hello {t}World!`,               // space before t
    `Hello{n} World!`,               // space after n
    `Hello {n}World!`,               // space before n
    `{n}Hello {t}World!`,            // mixed prefix/suffix
    `Glue{n}Glue`,                   // glued on both sides
    `Glue{t} Glue`,                  // suffix glued, space after
    ` Glue{n}Glue`,                  // space before, glued suffix
    `Glue{n} Glue`,                  // glued prefix, space after
    `{n}{t}Double prefix`,           // two in a row at star
    `Mix {n} and {n}`,             // one replaced, one literal
    `Complex: pre{n}mid{t}post`,      // mixed inside word
    `Multi {n}{t}{\\}{'}{"}{0}`,     // all specials in sequence
    `Only {n}`,                      // single code only
    `Only {t}`,                      // single code only
    `Space before {n} `,             // trailing space
    ` Space after {t}`,              // leading space
    `Both {n} and {t} in one`,       // two distinct codes
    `Wrap:{n}text{t}`,               // glued around “text”
    `Inside parentheses ({n})`,      // within parentheses
    `In brackets [{t}]`,             // within brackets
    `In ticks <{t}>`,
    `Dash-combo{n}-{t}with dash`,    // with dash separator
    `Dot notation{n}.{t}`,           // with dot separator
    `Path C:{\\}{n}{t}\\folder`,     // mimic file path
    `URL: http://example.com{t}path`,// URL + tab
    `CSV: value1{t}value2, value3{n}value4`, // CSV style
    `JSON: {"key": "{n}value"}`,     // JSON-like
    `HTML: <div>{n}</div>`,          // HTML-like
    `Escape sequence: \\{n}\\`,      // literal backslashes + code
  ] as const;


// 3) The “apply” function
export function applyDet(
det: Determinant,
tmpls: readonly string[]
): string[] {
return tmpls.map(str =>
    str.replace(/{([^}]+)}/g, (_, code) =>
    `${det.Lhand}${code}${det.Rhand}`
    )
)
}


