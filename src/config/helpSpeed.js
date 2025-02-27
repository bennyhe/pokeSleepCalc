
export const allHelpType = [
  {
    title: '无技能\n性格:帮忙↓',
    skill: ['none'],
    character: 'hdown'
  },
  {
    title: '帮忙S\n性格:帮忙↓',
    skill: ['hs'],
    character: 'hdown'
  },
  {
    title: '无技能\n性格:无',
    skill: ['none'],
    character: 'none'
  },
  {
    title: '帮忙M\n性格:帮忙↓',
    skill: ['hm'],
    character: 'hdown'
  },
  {
    title: '帮忙S\n性格:无',
    skill: ['hs'],
    character: 'none'
  },
  {
    title: '帮忙M\n性格:无',
    skill: ['hm'],
    character: 'none'
  },
  {
    title: '无技能\n性格:帮忙↑',
    skill: ['none'],
    character: 'hup'
  },
  {
    title: '帮忙S,M\n性格:帮忙↓',
    skill: ['hs', 'hm'],
    character: 'hdown'
  },
  {
    title: '帮忙S\n性格:帮忙↑',
    skill: ['hs'],
    character: 'hup'
  },
  {
    title: '帮忙S,M\n性格:无',
    skill: ['hs', 'hm'],
    character: 'none'
  },
  {
    title: '帮忙M\n性格:帮忙↑',
    skill: ['hm'],
    character: 'hup'
  },
  {
    title: '帮忙S,M\n性格:帮忙↑',
    skill: ['hs', 'hm'],
    character: 'hup'
  }
]
export const skillOptionsExtra2 = [{
  label: 'berrys',
  txt: 'SUBSKILLS_NAMES.1'
}]
export const skillOptionsHelpSpeed = [{
  label: 'hs',
  txt: 'SUBSKILLS_NAMES.14',
  txtExtra: '(7%)',
  rare: 1
}, {
  label: 'hm',
  txt: 'SUBSKILLS_NAMES.8',
  txtExtra: '(14%)',
  rare: 2
}]
export const skillOptionsFoodPer = [{
  label: 'fs',
  txt: 'SUBSKILLS_NAMES.15',
  txtExtra: '(18%)',
  rare: 1
}, {
  label: 'fm',
  txt: 'SUBSKILLS_NAMES.9',
  txtExtra: '(36%)',
  rare: 2
}]
export const skillOptionsSkillPer = [{
  label: 'ss',
  txt: 'SUBSKILLS_NAMES.17',
  txtExtra: '(18%)',
  rare: 1
}, {
  label: 'sm',
  txt: 'SUBSKILLS_NAMES.12',
  txtExtra: '(36%)',
  rare: 2
}]
export const skillOptionsSkillLevel = [{
  label: 'sls',
  txt: 'SUBSKILLS_NAMES.13',
  txtExtra: '(+1)',
  rare: 2
}, {
  label: 'slm',
  txt: 'SUBSKILLS_NAMES.6',
  txtExtra: '(+2)',
  rare: 3
}]
export const skillOptionsMaxcarry = [{
  label: 'cs',
  txt: 'SUBSKILLS_NAMES.16',
  txtExtra: '(+6)',
  rare: 1
}, {
  label: 'cm',
  txt: 'SUBSKILLS_NAMES.11',
  txtExtra: '(+12)',
  rare: 2
}, {
  label: 'cl',
  txt: 'SUBSKILLS_NAMES.10',
  txtExtra: '(+18)',
  rare: 2
}]
export const skillOptionsExtra = [{
  label: 'hg1',
  txt: 'SUBSKILLS_NAMES.3',
  txtExtra: '*1(5%)'
}, {
  label: 'hg2',
  txt: 'SUBSKILLS_NAMES.3',
  txtExtra: '*2(10%)'
}, {
  label: 'hg3',
  txt: 'SUBSKILLS_NAMES.3',
  txtExtra: '*3(15%)'
}, {
  label: 'hg4',
  txt: 'SUBSKILLS_NAMES.3',
  txtExtra: '*4(20%)'
}, {
  label: 'hg5',
  txt: 'SUBSKILLS_NAMES.3',
  txtExtra: '*5(25%)'
}]
export const skillOptionsTxt = ['S', 'M', 'L']
export const characterOptions = [{
  label: 'none',
  txt: 'noHas' // (害羞、勤奮、坦率、浮躁、認真)
}, {
  label: 'fdown',
  txt: '(食↓-20%)',
  useNatures: [6, 19]
}, {
  label: 'fup',
  txt: '(食↑+20%)',
  useNatures: [10, 12]
}, {
  label: 'fupsdown',
  txt: '(食↑+20%技↓-20%)',
  useNatures: [11]
}, {
  label: 'hdownfup',
  txt: '(帮↓-10%食↑+20%)',
  useNatures: [9]
}, {
  label: 'hup',
  txt: '(帮↑+10%)',
  useNatures: [1, 4]
}, {
  label: 'hupsdown',
  txt: '(帮↑+10%技↓-20%)',
  useNatures: [3]
}, {
  label: 'hupfdown',
  txt: '(帮↑+10%食↓-20%)',
  useNatures: [2]
}, {
  label: 'hdown',
  txt: '(帮↓-10%)',
  useNatures: [5, 17]
}, {
  label: 'sup',
  txt: '(技↑+20%)',
  useNatures: [14, 16]
}, {
  label: 'supfdown',
  txt: '(技↑+20%食↓-20%)',
  useNatures: [15]
}, {
  label: 'hdownsup',
  txt: '(技↑+20%帮↓-10%)',
  useNatures: [13]
}, {
  label: 'sdown',
  txt: '(技↓-20%)',
  useNatures: [7, 20]
}]
export const levelOptions = [{
  label: 25,
  txt: 'Lv.25'
}, {
  label: 30,
  txt: 'Lv.30(2食)'
}, {
  label: 50,
  txt: 'Lv.50'
}, {
  label: 55,
  txt: 'Lv.55'
}, {
  label: 60,
  txt: 'Lv.60(3食)'
}]