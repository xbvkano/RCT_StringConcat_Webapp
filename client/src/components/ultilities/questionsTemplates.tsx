// src/ultilities/questionsTemplates.ts

/**
 * Defines a group of templates and their possible syntax substitutions.
 */
export interface GroupConfig {
  /** Single-letter placeholder without braces, e.g. 'n' or 't' */
  placeholder: string
  /** Raw templates containing `{placeholder}` markers */
  templates: readonly string[]
  /** Possible syntax strings that can replace the placeholder */
  syntaxes: readonly string[]
}


/** ————————————————————————————
 * Training groups: they only ever see these
 * during the “Training” phase. Each uses
 * the single bogus syntax ":)=$".
 *—————————————————————————————————— */
export const trainingGroups: Record<string, GroupConfig> = {
  newline: {
    placeholder: 'n',
    templates: [
      `Bob{n}Bob{n}{n}Bob`,
      `{n}NEWLINE NEW {n} LINE`,
      `Ho{n}W many lines`,
      `How many {n} lines {n}`,
      `One {n} Three {n}{n}`,
    ] as const,
    syntaxes: [':)=$', "ñ", "~!"] as const,
  },
  tab: {
    placeholder: 't',
    templates: [
      `{t}{t}{t}Username:{t}admin`,
      `Password:{t}••••••{t}`,
      `➡️{t}Next Step`,
      `function{t}myFunc(){t}return true;`,
      `Index{t}Name{t}Age{t}Role`,
    ] as const,
    syntaxes: [':)=$', "ñ", "~!"] as const,
  },
}

/** Keys for the training groups */
export type TrainingGroupKey = keyof typeof trainingGroups

/**
 * Replace all `{<placeholder>}` markers in a training group
 * with the given syntax.
 */
export function applyTrainingSyntax(
  group: TrainingGroupKey,
  syntax: string
): string[] {
  const { placeholder, templates } = trainingGroups[group]
  const rx = new RegExp(`\\{${placeholder}\\}`, 'g')
  return templates.map(t => t.replace(rx, syntax))
}

/**
 * Pick the one bogus training syntax (always ":)=$")
 * and apply it to all templates in the group.
 */
export function applyRandomTrainingSyntax(
  group: TrainingGroupKey
): string[] {
  const { placeholder, templates, syntaxes } = trainingGroups[group];
  const rx = new RegExp(`\\{${placeholder}\\}`, 'g');
  return templates.map(tpl => {
    // pick a fresh random syntax here:
    const choice = syntaxes[Math.floor(Math.random() * syntaxes.length)];
    return tpl.replace(rx, choice);
  });
}

/**
 * Flatten all training groups into one list,
 * in group order.
 */
export function generateMixedTrainingQuestions(): string[] {
  return (Object.keys(trainingGroups) as TrainingGroupKey[])
    .flatMap(g => applyRandomTrainingSyntax(g))
}


/** ————————————————————————————
 * Experiment groups: your real RCT items
 *—————————————————————————————————— */
export const groups: Record<string, GroupConfig> = {
  newline: {
    placeholder: 'n',
    templates: [
      `Bob{n}Bob{n}{n}Bob`,
      `{n}NEWLINE NEW {n} LINE`,
      `Ho{n}W many lines`,
      `How many {n} lines {n}`,
      `One {n} Three {n}{n}`,
      `{n}{n}{n}How Many?`,
      `{n}How Many {n}{n}`,
      `I'll{n}_BE{n}_BACK`,
      `I{n}'LL_B{n}E{n}_BACK`,
      `LAme`,
    ] as const,
    syntaxes: [
      "\n",
      "<< std::endl <<",
      "<< endl <<",
      "\\n",
      "<br>",
      "\\r\\n",
      "ژ",
    ] as const,
  },
  tab: {
    placeholder: 't',
    templates: [
      `{t}{t}{t}Username:{t}admin`,
      `Password:{t}••••••{t}`,
      `➡️{t}Next Step`,
      `function{t}myFunc(){t}return true;`,
      `Index{t}Name{t}Age{t}Role`,
      `1.{t}Alice{t}25{t}Engineer`,
      `Shopping List:{t}- Milk{t}- Eggs{t}- Bread`,
      `Press{t}{t}[TAB]{t}to continue...`,
      `╔═══╦═══╦═══╗{t}Table`,
      `Level{t}XP{t}Status{t}🔓`,
    ] as const,
    syntaxes: [
      "\t",
      "\\tab",
      "\\t",
      "&Tab",
      "\\T",
      "\\TAB",
      "\\${t}",
    ] as const,
  },

  // …add more experiment groups here…
}

/** Keys for the experiment groups */
export type GroupKey = keyof typeof groups

/**
 * Replace all `{<placeholder>}` markers in an experiment group
 * with the given syntax.
 */
export function applySyntax(
  group: GroupKey,
  syntax: string
): string[] {
  const { placeholder, templates } = groups[group]
  const rx = new RegExp(`\\{${placeholder}\\}`, 'g')
  return templates.map(t => t.replace(rx, syntax))
}

/**
 * Pick a random syntax from that group’s list
 * and apply it to all templates.
 */
export function applyRandomSyntax(
  group: GroupKey
): string[] {
  const { syntaxes } = groups[group]
  const choice = syntaxes[Math.floor(Math.random() * syntaxes.length)]
  return applySyntax(group, choice)
}

/**
 * Shuffle an array in place (Fisher–Yates).
 */
function shuffle<T>(arr: T[]): T[] {
  const a = arr.slice()
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

/**
 * Generate a within-subjects list of `count` experiment questions,
 * each drawn from a random group + random syntax.
 */
export function generateWithinSubjectQuestions(): string[] {
  const out: string[] = [];
  (Object.keys(groups) as GroupKey[]).forEach((groupKey: GroupKey) => {
    const { placeholder, templates, syntaxes } = groups[groupKey]
    const rx = new RegExp(`\\{${placeholder}\\}`, 'g')
    templates.forEach((tpl) => {
      // pick a fresh random syntax for _this_ question
      const syntax =
        syntaxes[Math.floor(Math.random() * syntaxes.length)]
      out.push(tpl.replace(rx, syntax))
    })
  })
  return out
}

