export interface TemplateConfig {
  id: string
  text: string
}

export interface SyntaxConfig {
  id: string
  text: string
}

export interface GroupConfig {
  groupId: string
  placeholder: string
  templates: TemplateConfig[]
  syntaxes: SyntaxConfig[]
}

export interface QuestionItem {
  id: string
  text: string
}

export const trainingGroups: Record<'newline'|'tab', GroupConfig> = {
  newline: {
    groupId: '01',
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
      { id: '02', text: 'ñ' },
      { id: '03', text: '~!' },
    ],
  },
  tab: {
    groupId: '02',
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
      { id: '02', text: 'ñ' },
      { id: '03', text: '~!' },
    ],
  },
}
export type TrainingGroupKey = keyof typeof trainingGroups

export function generateMixedTrainingQuestions(): QuestionItem[] {
  const out: QuestionItem[] = [];
  (Object.keys(trainingGroups) as (keyof typeof trainingGroups)[]).forEach((groupKey) => {
    const { groupId, placeholder, templates, syntaxes } = trainingGroups[groupKey]
    templates.forEach((template) => {
      const { id: TID, text: tpl } = template
      const { id: SID, text: syn } = syntaxes[Math.floor(Math.random() * syntaxes.length)]
      const qtext = tpl.replace(new RegExp(`\\{${placeholder}\\}`, 'g'), syn)
      out.push({ id: `${groupId}${TID}${SID}`, text: qtext })
    })
  })
  return out
}

export const groups: Record<'newline'|'tab', GroupConfig> = {
  newline: {
    groupId: '01',
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
      { id: '01', text: "\n" },
      { id: '02', text: "<< std::endl <<" },
      { id: '03', text: "<< endl <<" },
      { id: '04', text: "\\n" },
      { id: '05', text: "<br>" },
      { id: '06', text: "\\r\\n" },
      { id: '07', text: "ژ" },
    ],
  },
  tab: {
    groupId: '02',
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
      { id: '01', text: "\t" },
      { id: '02', text: "\\tab" },
      { id: '03', text: "\\t" },
      { id: '04', text: "&Tab" },
      { id: '05', text: "\\T" },
      { id: '06', text: "\\TAB" },
      { id: '07', text: "\\${t}" },
    ],
  },
}
export type GroupKey = keyof typeof groups

export function generateWithinSubjectQuestions(): QuestionItem[] {
  const out: QuestionItem[] = []
  ;(Object.keys(groups) as GroupKey[]).forEach((groupKey) => {
    const { groupId, placeholder, templates, syntaxes } = groups[groupKey]
    templates.forEach(({ id: TID, text: tpl }) => {
      const { id: SID, text: syn } = syntaxes[Math.floor(Math.random() * syntaxes.length)]
      const qtext = tpl.replace(new RegExp(`\\{${placeholder}\\}`, 'g'), syn)
      out.push({ id: `${groupId}${TID}${SID}`, text: qtext })
    })
  })
  return out
}

export function buildQuestionSet(
  group: GroupKey,
  questionArray: number[],
  syntaxArray: number[]
): QuestionItem[] {
  const out: QuestionItem[] = []
  const { groupId, templates, syntaxes, placeholder } = groups[group]

  for (let i = 0; i < questionArray.length; i++) {
    const questionIdx = questionArray[i] - 1
    const syntaxIdx = syntaxArray[i] - 1

    const template = templates[questionIdx]
    const syntax = syntaxes[syntaxIdx]

    const id = `${groupId}${template.id.padStart(2, '0')}${syntax.id.padStart(2, '0')}`
    const text = template.text.replace(new RegExp(`\\{${placeholder}\\}`, 'g'), syntax.text)

    out.push({ id, text })
  }

  return out
}
