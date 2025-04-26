// src/ultilities/questionsTemplates.ts

/**
 * Single template with its own 2-digit ID.
 */
export interface TemplateConfig {
  /** Two-digit ID, e.g. '01', '02'… */
  id: string
  /** Raw template string, still containing `{placeholder}` */
  text: string
}

/**
 * Single syntax with its own 2-digit ID.
 */
export interface SyntaxConfig {
  /** Two-digit ID, e.g. '01', '02'… */
  id: string
  /** The actual syntax string, e.g. '\n', ':)=$' */
  text: string
}

/**
 * Defines a group of templates and their possible syntax substitutions.
 */
export interface GroupConfig {
  /** Single-letter placeholder without braces, e.g. 'n' or 't' */
  placeholder: string
  /** All templates, each with a 2-digit ID */
  templates: TemplateConfig[]
  /** All syntaxes, each with a 2-digit ID */
  syntaxes: SyntaxConfig[]
}

/**
 * A fully-resolved question item, carrying a 4-digit ID
 * (TTSS = templateID + syntaxID) and the substituted text.
 */
export interface QuestionItem {
  id: string
  text: string
}

/** ————————————————————————————
 * Training groups
 *—————————————————————————————————— */
export const trainingGroups: Record<'newline'|'tab', GroupConfig> = {
  newline: {
    placeholder: 'n',
    templates: [
      { id: '01', text: `Bob{n}Bob{n}{n}Bob` },
      { id: '02', text: `{n}NEWLINE NEW {n} LINE` },
      { id: '03', text: `Ho{n}W many lines` },
      { id: '04', text: `How many {n} lines {n}` },
      { id: '05', text: `One {n} Three {n}{n}` },
    ],
    syntaxes: [
      { id: '01', text: ':)=$' },
      { id: '02', text: 'ñ'    },
      { id: '03', text: '~!'   },
    ],
  },
  tab: {
    placeholder: 't',
    templates: [
      { id: '01', text: `{t}{t}{t}Username:{t}admin` },
      { id: '02', text: `Password:{t}••••••{t}` },
      { id: '03', text: `➡️{t}Next Step` },
      { id: '04', text: `function{t}myFunc(){t}return true;` },
      { id: '05', text: `Index{t}Name{t}Age{t}Role` },
    ],
    syntaxes: [
      { id: '01', text: ':)=$' },
      { id: '02', text: 'ñ'    },
      { id: '03', text: '~!'   },
    ],
  },
}
export type TrainingGroupKey = keyof typeof trainingGroups

/**
 * Generate a within-subjects list of training questions,
 * each with its own 4-digit ID = templateID + syntaxID.
 */
export function generateMixedTrainingQuestions(): QuestionItem[] {
  const out: QuestionItem[] = [];
  (Object.keys(trainingGroups) as TrainingGroupKey[]).forEach((groupKey: TrainingGroupKey) => {
    const { placeholder, templates, syntaxes } = trainingGroups[groupKey]
    templates.forEach(({ id: TID, text: tpl }) => {
      // for training we pick a random syntax each time
      const { id: SID, text: syn } =
        syntaxes[Math.floor(Math.random() * syntaxes.length)]
      const qtext = tpl.replace(new RegExp(`\\{${placeholder}\\}`, 'g'), syn)
      out.push({ id: `${TID}${SID}`, text: qtext })
    })
  })
  return out
}

/** ————————————————————————————
 * Experiment groups
 *—————————————————————————————————— */
export const groups: Record<'newline'|'tab', GroupConfig> = {
  newline: {
    placeholder: 'n',
    templates: [
      { id: '01', text: `Bob{n}Bob{n}{n}Bob` },
      { id: '02', text: `{n}NEWLINE NEW {n} LINE` },
      { id: '03', text: `Ho{n}W many lines` },
      { id: '04', text: `How many {n} lines {n}` },
      { id: '05', text: `One {n} Three {n}{n}` },
      { id: '06', text: `{n}{n}{n}How Many?` },
      { id: '07', text: `{n}How Many {n}{n}` },
      { id: '08', text: `I'll{n}_BE{n}_BACK` },
      { id: '09', text: `I{n}'LL_B{n}E{n}_BACK` },
      { id: '10', text: `LAme` },
    ],
    syntaxes: [
      { id: '01', text: "\n"               },
      { id: '02', text: "<< std::endl <<"  },
      { id: '03', text: "<< endl <<"        },
      { id: '04', text: "\\n"              },
      { id: '05', text: "<br>"             },
      { id: '06', text: "\\r\\n"           },
      { id: '07', text: "ژ"                },
    ],
  },
  tab: {
    placeholder: 't',
    templates: [
      { id: '01', text: `{t}{t}{t}Username:{t}admin` },
      { id: '02', text: `Password:{t}••••••{t}` },
      { id: '03', text: `➡️{t}Next Step` },
      { id: '04', text: `function{t}myFunc(){t}return true;` },
      { id: '05', text: `Index{t}Name{t}Age{t}Role` },
      { id: '06', text: `1.{t}Alice{t}25{t}Engineer` },
      { id: '07', text: `Shopping List:{t}- Milk{t}- Eggs{t}- Bread` },
      { id: '08', text: `Press{t}{t}[TAB]{t}to continue...` },
      { id: '09', text: `╔═══╦═══╦═══╗{t}Table` },
      { id: '10', text: `Level{t}XP{t}Status{t}🔓` },
    ],
    syntaxes: [
      { id: '01', text: "\t"     },
      { id: '02', text: "\\tab"  },
      { id: '03', text: "\\t"    },
      { id: '04', text: "&Tab"   },
      { id: '05', text: "\\T"    },
      { id: '06', text: "\\TAB"  },
      { id: '07', text: "\\${t}" },
    ],
  },
}
export type GroupKey = keyof typeof groups

/**
 * Generate a within-subjects list of experiment questions,
 * each with its own 4-digit ID = templateID + syntaxID.
 */
export function generateWithinSubjectQuestions(): QuestionItem[] {
  const out: QuestionItem[] = [];
  (Object.keys(groups) as GroupKey[]).forEach((groupKey: GroupKey) => {
    const { placeholder, templates, syntaxes } = groups[groupKey]
    templates.forEach(({ id: TID, text: tpl }) => {
      // pick a fresh random syntax for _this_ question
      const { id: SID, text: syn } =
        syntaxes[Math.floor(Math.random() * syntaxes.length)]
      const qtext = tpl.replace(new RegExp(`\\{${placeholder}\\}`, 'g'), syn)
      out.push({ id: `${TID}${SID}`, text: qtext })
    })
  })
  return out
}


export function buildQuestionSet(
  group: GroupKey,
  questionArray: number[],
  syntaxArray: number[]
): QuestionItem[] {
  const out: QuestionItem[] = [];

  const { templates, syntaxes, placeholder } = groups[group];

  console.log("Test: " + "\n" + group + "\n" + questionArray + "\n" + syntaxArray + "\n" + templates + "\n" + syntaxes + "\n" +placeholder)

  for (let i = 0; i < questionArray.length; i++) {
    const questionIdx = questionArray[i] - 1;
    const syntaxIdx = syntaxArray[i] - 1;

    const template = templates[questionIdx];
    const syntax = syntaxes[syntaxIdx];

    const id = template.id.padStart(2, '0') + syntax.id.padStart(2, '0');
    const text = template.text.replace(
      new RegExp(`\\{${placeholder}\\}`, 'g'),
      syntax.text
    );

    out.push({ id, text });
  }

  return out;
}