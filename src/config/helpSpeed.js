
export const allHelpType = [
  {
    title: '无技能\n性格:帮忙↓',
    skill: ['none'],
    character: 'down'
  },
  {
    title: '帮忙S\n性格:帮忙↓',
    skill: ['s'],
    character: 'down'
  },
  {
    title: '无技能\n性格:无',
    skill: ['none'],
    character: 'none'
  },
  {
    title: '帮忙M\n性格:帮忙↓',
    skill: ['m'],
    character: 'down'
  },
  {
    title: '帮忙S\n性格:无',
    skill: ['s'],
    character: 'none'
  },
  {
    title: '帮忙M\n性格:无',
    skill: ['m'],
    character: 'none'
  },
  {
    title: '无技能\n性格:帮忙↑',
    skill: ['none'],
    character: 'up'
  },
  {
    title: '帮忙S,M\n性格:帮忙↓',
    skill: ['s', 'm'],
    character: 'down'
  },
  {
    title: '帮忙S\n性格:帮忙↑',
    skill: ['s'],
    character: 'up'
  },
  {
    title: '帮忙S,M\n性格:无',
    skill: ['s', 'm'],
    character: 'none'
  },
  {
    title: '帮忙M\n性格:帮忙↑',
    skill: ['m'],
    character: 'up'
  },
  {
    title: '帮忙S,M\n性格:帮忙↑',
    skill: ['s', 'm'],
    character: 'up'
  }
]
export const skillOptions = [{
  label: 's',
  txt: '帮忙速度S(7%)'
}, {
  label: 'm',
  txt: '帮忙速度M(14%)'
}]
export const characterOptions = [{
  label: 'none',
  txt: '无加成'
}, {
  label: 'up',
  txt: '帮忙速度↑(+10%)'
}, {
  label: 'down',
  txt: '帮忙速度↓(-10%)'
}]