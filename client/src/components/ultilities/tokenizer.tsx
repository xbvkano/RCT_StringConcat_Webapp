// templateTokenizer.ts
import { templates, trainingTemplate } from './questionsTemplates'

/**
 * Given any template string, strips out {n}/{t} and single-char {x} groups,
 * then splits into meaningful tokens: braces, quoted chunks, or words.
 */
export function tokenizeTemplate(str: string): string[] {
  // 1) replace codes with spaces
  let cleaned = str.replace(/\{[nt]\}/g, ' ')
  // 2) remove any single-character brace groups: {x}
  cleaned = cleaned.replace(/\{.\}/g, '')
  // 3) extract tokens: { or } or quoted-with-optional-colon or other non-brace words
  const regex = /\{|\}|"[^"]*":?|[^{}\s]+/g
  return cleaned.match(regex) ?? []
}

/**
 * Convenience: grab the template at `templates[index]` (or
 * '' if out of range) and tokenize it.
 */
export function getTokensByIndex(index: number, training: boolean): string[] {
  const tpl = training ?  trainingTemplate[index] ??  '' : templates[index] ?? '' 
  return tokenizeTemplate(tpl)
}

/**
 * Build the expected tokens from the **raw** template:
 *  "{n}" → "NEWLINE"
 *  "{t}" → "TAB"
 *  "{0}" → "nullCharacter"
 *  any other "{x}" → literal x
 *  each space → "SPACE"
 *  contiguous other chars → word tokens
 */
export function getExpectedTokens(template: string): string[] {
  const tokens: string[] = []
  let buf = ''

  for (let i = 0; i < template.length; i++) {
    const ch = template[i]
    if (ch === '{') {
      if (buf) {
        tokens.push(buf)
        buf = ''
      }
      const end = template.indexOf('}', i)
      if (end !== -1) {
        const code = template.slice(i + 1, end)
        if (code === 'n') tokens.push('NEWLINE')
        else if (code === 't') tokens.push('TAB')
        else if (code === '0') tokens.push('nullCharacter')
        else if (code.length === 1) tokens.push(code)
        else tokens.push(code)
        i = end
      } else {
        buf += ch
      }
    } else if (ch === ' ') {
      if (buf) {
        tokens.push(buf)
        buf = ''
      }
      tokens.push('SPACE')
    } else {
      buf += ch
    }
  }

  if (buf) tokens.push(buf)
  return tokens
}

/**
 * Turn the actual input string into tokens:
 * '\n' → "NEWLINE", '\t' → "TAB", ' ' → "SPACE",
 * '\0' → "nullCharacter", contiguous others → words.
 */
export function tokenizeInputString(str: string): string[] {
  const tokens: string[] = []
  let buf = ''

  for (let i = 0; i < str.length; i++) {
    const ch = str[i]

    // first handle control chars & space
    if (ch === '\n' || ch === '\t' || ch === ' ' || ch === '\0') {
      if (buf) {
        tokens.push(buf)
        buf = ''
      }
      switch (ch) {
        case '\n':
          tokens.push('NEWLINE')
          break
        case '\t':
          tokens.push('TAB')
          break
        case ' ':
          tokens.push('SPACE')
          break
        case '\0':
          tokens.push('nullCharacter')
          break
      }
    }
    // now literal special characters: backslash, single-quote, double-quote
    else if (ch === '\\' || ch === '"' || ch === "'") {
      if (buf) {
        tokens.push(buf)
        buf = ''
      }
      tokens.push(ch)
    }
    // any other character
    else {
      buf += ch
    }
  }

  if (buf) tokens.push(buf)
  return tokens
}
