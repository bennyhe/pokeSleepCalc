const gameMap = [
  {
    name: '萌绿之岛',
    id: 'green',
    pic: 'map1',
    scoreList: [{ catchNum: 3, startscore: 0, endscore: 963844 },
      { catchNum: 4, startscore: 967824, endscore: 2073360 },
      { catchNum: 5, startscore: 2076360, endscore: 4625346 },
      { catchNum: 6, startscore: 4626768, endscore: 8331004 },
      { catchNum: 7, startscore: 8332110, endscore: 19563356 },
      { catchNum: 8, startscore: 19563768 }],
    levelList: [{
      name: '普通1',
      energy: 0
    }, {
      name: '普通2',
      energy: 3118
    }, {
      name: '普通3',
      energy: 7171
    }, {
      name: '普通4',
      energy: 11693
    }, {
      name: '普通5',
      energy: 17149
    }, {
      name: '超级1',
      energy: 23385
    }, {
      name: '超级2',
      energy: 31492
    }, {
      name: '超级3',
      energy: 41314
    }, {
      name: '超级4',
      energy: 53006
    }, {
      name: '超级5',
      energy: 65634
    }, {
      name: '高级1',
      energy: 79197
    }, {
      name: '高级2',
      energy: 93540
    }, {
      name: '高级3',
      energy: 109130
    }, {
      name: '高级4',
      energy: 125032
    }, {
      name: '高级5',
      energy: 156121
    }, {
      name: '大师1',
      energy: 187832
    }, {
      name: '大师2',
      energy: 220177
    }, {
      name: '大师3',
      energy: 253169
    }, {
      name: '大师4',
      energy: 286821
    }, {
      name: '大师5',
      energy: 321146
    }, {
      name: '大师6以上',
      energy: 356158
    }]
  },
  {
    name: '天青沙滩',
    id: 'beach',
    pic: 'map2',
    scoreList: [{ catchNum: 3, startscore: 0, endscore: 1574240 },
      { catchNum: 4, startscore: 1580337, endscore: 3511048 },
      { catchNum: 5, startscore: 3512920, endscore: 7156032 },
      { catchNum: 6, startscore: 7167360, endscore: 13488132 },
      { catchNum: 7, startscore: 13491088, endscore: 30473422 },
      { catchNum: 8, startscore: 30502920 }],
    levelList: [{
      name: '普通1',
      energy: 0
    }, {
      name: '普通2',
      energy: 4822
    }, {
      name: '普通3',
      energy: 11090
    }, {
      name: '普通4',
      energy: 18082
    }, {
      name: '普通5',
      energy: 26520
    }, {
      name: '超级1',
      energy: 36164
    }, {
      name: '超级2',
      energy: 48700
    }, {
      name: '超级3',
      energy: 63889
    }, {
      name: '超级4',
      energy: 81971
    }, {
      name: '超级5',
      energy: 101499
    }, {
      name: '高级1',
      energy: 122474
    }, {
      name: '高级2',
      energy: 144654
    }, {
      name: '高级3',
      energy: 168763
    }, {
      name: '高级4',
      energy: 195283
    }, {
      name: '高级5',
      energy: 224455
    }, {
      name: '大师1',
      energy: 256544
    }, {
      name: '大师2',
      energy: 291842
    }, {
      name: '大师3',
      energy: 330670
    }, {
      name: '大师4',
      energy: 373381
    }, {
      name: '大师5',
      energy: 420363
    }, {
      name: '大师6以上',
      energy: 472043
    }]
  },
  {
    name: '灰褐洞窟',
    id: 'hole',
    pic: 'map3',
    scoreList: [{ catchNum: 3, startscore: 0, endscore: 1790097 },
      { catchNum: 4, startscore: 1838628, endscore: 4623489 },
      { catchNum: 5, startscore: 4627194, endscore: 9925344 },
      { catchNum: 6, startscore: 9936924, endscore: 19563328 },
      { catchNum: 7, startscore: 19563600, endscore: 43695336 },
      { catchNum: 8, startscore: 43762600 }],
    levelList: [{
      name: '普通1',
      energy: 0
    }, {
      name: '普通2',
      energy: 6885
    }, {
      name: '普通3',
      energy: 15835
    }, {
      name: '普通4',
      energy: 25817
    }, {
      name: '普通5',
      energy: 37865
    }, {
      name: '超级1',
      energy: 51635
    }, {
      name: '超级2',
      energy: 69534
    }, {
      name: '超级3',
      energy: 91221
    }, {
      name: '超级4',
      energy: 117038
    }, {
      name: '超级5',
      energy: 144921
    }, {
      name: '高级1',
      energy: 174869
    }, {
      name: '高级2',
      energy: 206538
    }, {
      name: '高级3',
      energy: 240961
    }, {
      name: '高级4',
      energy: 278826
    }, {
      name: '高级5',
      energy: 320478
    }, {
      name: '大师1',
      energy: 366295
    }, {
      name: '大师2',
      energy: 416694
    }, {
      name: '大师3',
      energy: 472133
    }, {
      name: '大师4',
      energy: 533116
    }, {
      name: '大师5',
      energy: 600197
    }, {
      name: '大师6以上',
      energy: 673986
    }]
  },
  {
    name: '百花雪原',
    id: 'snow',
    pic: 'map4',
    scoreList: [{ catchNum: 3, startscore: 0, endscore: 2808025 },
      { catchNum: 4, startscore: 2834850, endscore: -7147410 },
      { catchNum: 5, startscore: 7169800, endscore: 15415155 },
      { catchNum: 6, startscore: 15471600, endscore: 28537400 },
      { catchNum: 7, startscore: 28775360, endscore: -65166800 },
      { catchNum: 8, startscore: 65712275 }],
    levelList: [{
      name: '普通1',
      energy: 0
    }, {
      name: '普通2',
      energy: 10486
    }, {
      name: '普通3',
      energy: 24118
    }, {
      name: '普通4',
      energy: 39323
    }, {
      name: '普通5',
      energy: 57673
    }, {
      name: '超级1',
      energy: 78645
    }, {
      name: '超级2',
      energy: 105909
    }, {
      name: '超级3',
      energy: 138940
    }, {
      name: '超级4',
      energy: 178262
    }, {
      name: '超级5',
      energy: 220730
    }, {
      name: '高级1',
      energy: 266344
    }, {
      name: '高级2',
      energy: 314580
    }, {
      name: '高级3',
      energy: 367010
    }, {
      name: '高级4',
      energy: 424683
    }, {
      name: '高级5',
      energy: 488123
    }, {
      name: '大师1',
      energy: 557907
    }, {
      name: '大师2',
      energy: 634669
    }, {
      name: '大师3',
      energy: 719107
    }, {
      name: '大师4',
      energy: 811989
    }, {
      name: '大师5',
      energy: 914159
    }, {
      name: '大师6以上',
      energy: 1026546
    }]
  }
]
export default gameMap