
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
  txt: '树果S'
}]
export const skillOptions = [{
  label: 'hs',
  txt: '帮忙速度S(7%)'
}, {
  label: 'hm',
  txt: '帮忙速度M(14%)'
}, {
  label: 'fs',
  txt: '食材几率S(18%)'
}, {
  label: 'fm',
  txt: '食材几率M(36%)'
}]
export const skillOptionsExtra = [{
  label: 'hg1',
  txt: '帮手奖励1个(5%)'
}, {
  label: 'hg2',
  txt: '帮手奖励2个(10%)'
}, {
  label: 'hg3',
  txt: '帮手奖励3个(15%)'
}, {
  label: 'hg4',
  txt: '帮手奖励4个(20%)'
}, {
  label: 'hg5',
  txt: '帮手奖励5个(25%)'
}]
export const characterOptions = [{
  label: 'none',
  txt: '无加成' // (害羞、勤奮、坦率、浮躁、認真)
}, {
  label: 'fdown',
  txt: '慎重、爽朗、淘氣(食↓+20%)'
}, {
  label: 'fup',
  txt: '慢吞吞、馬虎、冷靜(食↑+20%)'
}, {
  label: 'hdownfup',
  txt: '內斂(帮↓-10%食↑+20%)'
}, {
  label: 'hup',
  txt: '怕寂寞、頑皮、勇敢(帮↑+10%)'
}, {
  label: 'hupfdown',
  txt: '固執(帮↑+10%食↓-20%)'
}, {
  label: 'hdown',
  txt: '溫和、胆小、大膽(帮↓-10%)'
}]
export const levelOptions = [{
  label: '25',
  txt: '25级'
}, {
  label: '30',
  txt: '30级(2食)'
}, {
  label: '50',
  txt: '50级(上限)'
}, {
  label: '60',
  txt: '60级(3食)'
}]