const evoLine = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  [10, 11, 12],
  [19, 20],
  [23, 24],
  [172, 9001, 9002, 25, 26],
  [173, 35, 36],
  [174, 39, 40],
  [50, 51],
  [52, 53],
  [54, 55],
  [56, 57],
  [58, 59],
  [69, 70, 71],
  [74, 75, 76],
  [79, 80, 199],
  [81, 82, 462],
  [84, 85],
  [92, 93, 94],
  [95, 208],
  [104, 105],
  [439, 122],
  [133, 134, 135, 136, 196, 197, 470, 471, 700],
  [147, 148, 149],
  [152, 153, 154],
  [155, 156, 157],
  [158, 159, 160],
  [175, 176, 468],
  [179, 180, 181],
  [438, 185],
  [360, 202],
  [228, 229],
  [246, 247, 248],
  [280, 281, 282, 475],
  [287, 288, 289],
  [316, 317],
  [333, 334],
  [353, 354],
  [363, 364, 365],
  [447, 448],
  [453, 454],
  [459, 460],
  [759, 760]
]
const pokedex = {
  1: {
    id: 1,
    name: '妙蛙種子',
    sleepType: 1,
    skillType: 10,
    pokeType: 2,
    berryType: 4,
    helpSpeed: 4400,
    foodPer: 25.63,
    food: {
      type: [9, 12, 4],
      count: {
        9: {
          num: [2, 5, 7]
        },
        12: {
          num: [0, 4, 7]
        },
        4: {
          num: [0, 0, 6]
        }
      }
    }
  },
  2: {
    id: 2,
    name: '妙蛙草',
    sleepType: 1,
    skillType: 10,
    pokeType: 2,
    berryType: 4,
    helpSpeed: 3300,
    foodPer: 25.48
  },
  3: {
    id: 3,
    name: '妙蛙花',
    sleepType: 1,
    skillType: 10,
    pokeType: 2,
    berryType: 4,
    helpSpeed: 2800,
    foodPer: 26.52
  },
  4: {
    id: 4,
    name: '小火龍',
    sleepType: 2,
    skillType: 10,
    pokeType: 2,
    berryType: 10,
    helpSpeed: 3500,
    foodPer: 20.04,
    food: {
      type: [7, 11, 6],
      count: {
        7: {
          num: [2, 5, 7]
        },
        11: {
          num: [0, 4, 7]
        },
        6: {
          num: [0, 0, 6]
        }
      }
    }
  },
  5: {
    id: 5,
    name: '火恐龍',
    sleepType: 2,
    skillType: 10,
    pokeType: 2,
    berryType: 10,
    helpSpeed: 3000,
    foodPer: 22.7
  },
  6: {
    id: 6,
    name: '噴火龍',
    sleepType: 2,
    skillType: 10,
    pokeType: 2,
    berryType: 10,
    helpSpeed: 2400,
    foodPer: 22.36
  },
  7: {
    id: 7,
    name: '傑尼龜',
    sleepType: 3,
    skillType: 10,
    pokeType: 2,
    berryType: 1,
    helpSpeed: 4500,
    foodPer: 27.01,
    food: {
      type: [8, 13, 7],
      count: {
        8: {
          num: [2, 5, 7]
        },
        13: {
          num: [0, 3, 5]
        },
        7: {
          num: [0, 0, 7]
        }
      }
    }
  },
  8: {
    id: 8,
    name: '卡咪龜',
    sleepType: 3,
    skillType: 10,
    pokeType: 2,
    berryType: 1,
    helpSpeed: 3400,
    foodPer: 27.07
  },
  9: {
    id: 9,
    name: '水箭龜',
    sleepType: 3,
    skillType: 10,
    pokeType: 2,
    berryType: 1,
    helpSpeed: 2800,
    foodPer: 27.44
  },
  10: {
    id: 10,
    name: '綠毛蟲',
    sleepType: 1,
    skillType: 10,
    pokeType: 1,
    berryType: 9,
    helpSpeed: 4400,
    foodPer: 17.88,
    food: {
      type: [9, 12, 15],
      count: {
        9: {
          num: [1, 2, 4]
        },
        12: {
          num: [0, 2, 3]
        },
        15: {
          num: [0, 0, 4]
        }
      }
    }
  },
  11: {
    id: 11,
    name: '鐵甲蛹',
    sleepType: 1,
    skillType: 10,
    pokeType: 1,
    berryType: 9,
    helpSpeed: 4200,
    foodPer: 20.73
  },
  12: {
    id: 12,
    name: '巴大蝶',
    sleepType: 1,
    skillType: 10,
    pokeType: 1,
    berryType: 9,
    helpSpeed: 2600,
    foodPer: 19.69
  },
  19: {
    id: 19,
    name: '小拉達',
    sleepType: 2,
    skillType: 7,
    pokeType: 1,
    berryType: 11,
    helpSpeed: 4900,
    foodPer: 23.63,
    food: {
      type: [5, 15, 7],
      count: {
        5: {
          num: [1, 2, 4]
        },
        15: {
          num: [0, 2, 3]
        },
        7: {
          num: [0, 0, 3]
        }
      }
    }
  },
  20: {
    id: 20,
    name: '拉達',
    sleepType: 2,
    skillType: 7,
    pokeType: 1,
    berryType: 11,
    helpSpeed: 3200,
    foodPer: 23.67
  },
  23: {
    id: 23,
    name: '阿柏蛇',
    sleepType: 1,
    skillType: 7,
    pokeType: 1,
    berryType: 5,
    helpSpeed: 5000,
    foodPer: 23.34,
    food: {
      type: [7, 3, 6],
      count: {
        7: {
          num: [1, 2, 4]
        },
        3: {
          num: [0, 2, 3]
        },
        6: {
          num: [0, 0, 3]
        }
      }
    }
  },
  24: {
    id: 24,
    name: '阿柏怪',
    sleepType: 1,
    skillType: 7,
    pokeType: 1,
    berryType: 5,
    helpSpeed: 3700,
    foodPer: 26.29
  },
  25: {
    id: 25,
    name: '皮卡丘',
    sleepType: 2,
    skillType: 1,
    pokeType: 1,
    berryType: 13,
    helpSpeed: 2700,
    foodPer: 20.65
  },
  26: {
    id: 26,
    name: '雷丘',
    sleepType: 2,
    skillType: 1,
    pokeType: 1,
    berryType: 13,
    helpSpeed: 2200,
    foodPer: 22.37
  },
  35: {
    id: 35,
    name: '皮皮',
    sleepType: 2,
    skillType: 13,
    pokeType: 1,
    berryType: 12,
    helpSpeed: 4000,
    berryType: 12,
    foodPer: 16.83
  },
  36: {
    id: 36,
    name: '皮可西',
    sleepType: 2,
    skillType: 13,
    pokeType: 1,
    berryType: 12,
    helpSpeed: 2800,
    berryType: 12,
    foodPer: 16.83
  },
  39: {
    id: 39,
    name: '胖丁',
    sleepType: 2,
    skillType: 8,
    pokeType: 3,
    berryType: 12,
    helpSpeed: 3900,
    foodPer: 18.19
  },
  40: {
    id: 40,
    name: '胖可丁',
    sleepType: 2,
    skillType: 8,
    pokeType: 3,
    berryType: 12,
    helpSpeed: 2900,
    foodPer: 17.2
  },
  50: {
    id: 50,
    name: '地鼠',
    sleepType: 2,
    skillType: 1,
    pokeType: 2,
    berryType: 15,
    helpSpeed: 4300,
    foodPer: 19.15,
    food: {
      type: [12, 1, 15],
      count: {
        12: {
          num: [2, 5, 7]
        },
        1: {
          num: [0, 3, 4]
        },
        15: {
          num: [0, 0, 8]
        }
      }
    }
  },
  51: {
    id: 51,
    name: '三地鼠',
    sleepType: 2,
    skillType: 1,
    pokeType: 2,
    berryType: 15,
    helpSpeed: 2800,
    foodPer: 18.95
  },
  52: {
    id: 52,
    name: '喵喵',
    sleepType: 2,
    skillType: 3,
    pokeType: 3,
    berryType: 11,
    helpSpeed: 4400,
    foodPer: 16.31,
    food: {
      type: [8, 7],
      count: {
        8: {
          num: [1, 2, 4]
        },
        7: {
          num: [0, 2, 3]
        }
      }
    }
  },
  53: {
    id: 53,
    name: '貓老大',
    sleepType: 2,
    skillType: 3,
    pokeType: 3,
    berryType: 11,
    helpSpeed: 3000,
    foodPer: 16.85
  },
  54: {
    id: 54,
    name: '可達鴨',
    sleepType: 1,
    skillType: 5,
    pokeType: 3,
    berryType: 1,
    helpSpeed: 5400,
    foodPer: 13.58,
    food: {
      type: [13, 5, 7],
      count: {
        13: {
          num: [1, 2, 4]
        },
        5: {
          num: [0, 4, 6]
        },
        7: {
          num: [0, 0, 5]
        }
      }
    }
  },
  55: {
    id: 55,
    name: '哥達鴨',
    sleepType: 3,
    skillType: 5,
    pokeType: 3,
    berryType: 1,
    helpSpeed: 3400,
    foodPer: 13.49
  },
  56: {
    id: 56,
    name: '猴怪',
    sleepType: 1,
    skillType: 5,
    pokeType: 1,
    berryType: 18,
    helpSpeed: 4200,
    foodPer: 19.62,
    food: {
      type: [7, 2, 9],
      count: {
        7: {
          num: [1, 2, 4]
        },
        2: {
          num: [0, 1, 2]
        },
        9: {
          num: [0, 0, 4]
        }
      }
    }
  },
  57: {
    id: 57,
    name: '火爆猴',
    sleepType: 1,
    skillType: 5,
    pokeType: 1,
    berryType: 18,
    helpSpeed: 2800,
    foodPer: 19.96
  },
  58: {
    id: 58,
    name: '卡蒂狗',
    sleepType: 2,
    skillType: 9,
    pokeType: 3,
    berryType: 10,
    helpSpeed: 4300,
    foodPer: 13.74,
    food: {
      type: [6, 7, 8],
      count: {
        6: {
          num: [1, 2, 4]
        },
        7: {
          num: [0, 3, 5]
        },
        8: {
          num: [0, 0, 5]
        }
      }
    }
  },
  59: {
    id: 59,
    name: '風速狗',
    sleepType: 2,
    skillType: 9,
    pokeType: 3,
    berryType: 10,
    helpSpeed: 2500,
    foodPer: 13.63
  },
  69: {
    id: 69,
    name: '喇叭芽',
    sleepType: 1,
    skillType: 7,
    pokeType: 2,
    berryType: 4,
    helpSpeed: 5200,
    foodPer: 23.24,
    food: {
      type: [12, 4, 1],
      count: {
        12: {
          num: [2, 5, 7]
        },
        4: {
          num: [0, 4, 6]
        },
        1: {
          num: [0, 0, 4]
        }
      }
    }
  },
  70: {
    id: 70,
    name: '口呆花',
    sleepType: 1,
    skillType: 7,
    pokeType: 2,
    berryType: 4,
    helpSpeed: 3800,
    foodPer: 23.49
  },
  71: {
    id: 71,
    name: '大食花',
    sleepType: 1,
    skillType: 7,
    pokeType: 2,
    berryType: 4,
    helpSpeed: 2800,
    foodPer: 23.29
  },
  74: {
    id: 74,
    name: '小拳石',
    sleepType: 3,
    skillType: 5,
    pokeType: 2,
    berryType: 14,
    helpSpeed: 3800,
    foodPer: 28.06,
    food: {
      type: [15, 4, 2],
      count: {
        15: {
          num: [2, 5, 7]
        },
        4: {
          num: [0, 4, 6]
        },
        2: {
          num: [0, 0, 4]
        }
      }
    }
  },
  75: {
    id: 75,
    name: '隆隆石',
    sleepType: 3,
    skillType: 5,
    pokeType: 2,
    berryType: 14,
    helpSpeed: 4000,
    foodPer: 27.2
  },
  76: {
    id: 76,
    name: '隆隆岩',
    sleepType: 3,
    skillType: 5,
    pokeType: 2,
    berryType: 14,
    helpSpeed: 3100,
    foodPer: 27.98
  },
  79: {
    id: 79,
    name: '呆呆獸',
    sleepType: 2,
    skillType: 4,
    pokeType: 3,
    berryType: 1,
    helpSpeed: 5700,
    foodPer: 15.04,
    food: {
      type: [13, 14, 12],
      count: {
        13: {
          num: [1, 2, 4]
        },
        14: {
          num: [0, 1, 2]
        },
        12: {
          num: [0, 0, 5]
        }
      }
    }
  },
  80: {
    id: 80,
    name: '呆殼獸',
    sleepType: 2,
    skillType: 4,
    pokeType: 3,
    berryType: 1,
    helpSpeed: 3800,
    foodPer: 15.05
  },
  81: {
    id: 81,
    name: '小磁怪',
    sleepType: 3,
    skillType: 11,
    pokeType: 3,
    berryType: 2,
    helpSpeed: 5800,
    foodPer: 18.14,
    food: {
      type: [10, 6],
      count: {
        10: {
          num: [1, 2, 4]
        },
        6: {
          num: [0, 2, 3]
        }
      }
    }
  },
  82: {
    id: 82,
    name: '三合一磁怪',
    sleepType: 3,
    skillType: 11,
    pokeType: 3,
    berryType: 2,
    helpSpeed: 4000,
    foodPer: 18.2
  },
  84: {
    id: 84,
    name: '嘟嘟',
    sleepType: 3,
    skillType: 7,
    pokeType: 1,
    berryType: 16,
    helpSpeed: 3800,
    foodPer: 18.26,
    food: {
      type: [15, 13, 7],
      count: {
        15: {
          num: [1, 2, 4]
        },
        13: {
          num: [0, 1, 2]
        },
        7: {
          num: [0, 0, 3]
        }
      }
    }
  },
  85: {
    id: 85,
    name: '嘟嘟利',
    sleepType: 3,
    skillType: 7,
    pokeType: 1,
    berryType: 16,
    helpSpeed: 2400,
    foodPer: 18.36
  },
  92: {
    id: 92,
    name: '鬼斯',
    sleepType: 1,
    skillType: 5,
    pokeType: 2,
    berryType: 8,
    helpSpeed: 3800,
    foodPer: 14.4,
    food: {
      type: [6, 2, 10],
      count: {
        6: {
          num: [2, 5, 7]
        },
        2: {
          num: [0, 4, 6]
        },
        10: {
          num: [0, 0, 8]
        }
      }
    }
  },
  93: {
    id: 93,
    name: '鬼斯通',
    sleepType: 1,
    skillType: 5,
    pokeType: 2,
    berryType: 8,
    helpSpeed: 3000,
    foodPer: 15.69
  },
  94: {
    id: 94,
    name: '耿鬼',
    sleepType: 1,
    skillType: 5,
    pokeType: 2,
    berryType: 8,
    helpSpeed: 2200,
    foodPer: 16.10
  },
  95: {
    id: 95,
    name: '大岩蛇',
    sleepType: 3,
    skillType: 10,
    pokeType: 1,
    helpSpeed: 3100,
    berryType: 14,
    foodPer: 13.17,
    food: {
      type: [12, 7, 4],
      count: {
        12: {
          num: [1, 2, 4]
        },
        7: {
          num: [0, 2, 4]
        },
        4: {
          num: [0, 0, 3]
        }
      }
    }
  },
  104: {
    id: 104,
    name: '卡拉卡拉',
    sleepType: 3,
    skillType: 7,
    pokeType: 1,
    berryType: 15,
    helpSpeed: 4800,
    foodPer: 22.24,
    food: {
      type: [11, 13],
      count: {
        11: {
          num: [1, 2, 4]
        },
        13: {
          num: [0, 2, 3]
        }
      }
    }
  },
  105: {
    id: 105,
    name: '嘎啦嘎啦',
    sleepType: 3,
    skillType: 7,
    pokeType: 1,
    berryType: 15,
    helpSpeed: 3500,
    foodPer: 22.44
  },
  115: {
    id: 115,
    name: '袋獸',
    sleepType: 2,
    skillType: 10,
    pokeType: 2,
    berryType: 11,
    helpSpeed: 2800,
    foodPer: 22.18,
    food: {
      type: [11, 4, 15],
      count: {
        11: {
          num: [2, 5, 7]
        },
        4: {
          num: [0, 4, 6]
        },
        15: {
          num: [0, 0, 8]
        }
      }
    }
  },
  122: {
    id: 122,
    name: '魔牆人偶',
    sleepType: 2,
    skillType: 1,
    pokeType: 2,
    berryType: 6,
    helpSpeed: 2800,
    foodPer: 21.61
  },
  127: {
    id: 127,
    name: '凱羅斯',
    sleepType: 1,
    skillType: 1,
    pokeType: 2,
    berryType: 9,
    helpSpeed: 2400,
    foodPer: 20.61,
    food: {
      type: [9, 5, 7],
      count: {
        9: {
          num: [2, 5, 7]
        },
        5: {
          num: [0, 5, 8]
        },
        7: {
          num: [0, 0, 7]
        }
      }
    }
  },
  132: {
    id: 132,
    name: '百變怪',
    sleepType: 2,
    skillType: 5,
    pokeType: 2,
    berryType: 11,
    helpSpeed: 3500,
    foodPer: 20.08,
    food: {
      type: [10, 1, 14],
      count: {
        10: {
          num: [2, 5, 7]
        },
        1: {
          num: [0, 3, 5]
        },
        14: {
          num: [0, 0, 3]
        }
      }
    }
  },
  133: {
    id: 133,
    name: '伊布',
    sleepType: 2,
    skillType: 10,
    pokeType: 3,
    berryType: 11,
    helpSpeed: 3700,
    foodPer: 19.2,
    food: {
      type: [8, 13, 7],
      count: {
        8: {
          num: [1, 2, 4]
        },
        13: {
          num: [0, 1, 2]
        },
        7: {
          num: [0, 0, 3]
        }
      }
    }
  },
  134: {
    id: 134,
    name: '水伊布',
    sleepType: 3,
    skillType: 10,
    pokeType: 3,
    berryType: 1,
    helpSpeed: 3100,
    foodPer: 21.11
  },
  135: {
    id: 135,
    name: '雷伊布',
    sleepType: 2,
    skillType: 9,
    pokeType: 3,
    berryType: 13,
    helpSpeed: 2200,
    foodPer: 15.11
  },
  136: {
    id: 136,
    name: '火伊布',
    sleepType: 2,
    skillType: 11,
    pokeType: 3,
    berryType: 10,
    helpSpeed: 2700,
    foodPer: 18.56
  },
  147: {
    id: 147,
    name: '迷你龍',
    sleepType: 1,
    skillType: 7,
    pokeType: 2,
    berryType: 3,
    helpSpeed: 5000,
    foodPer: 24.96,
    food: {
      type: [6, 16, 10],
      count: {
        6: {
          num: [2, 5, 7]
        },
        16: {
          num: [0, 4, 7]
        },
        10: {
          num: [0, 0, 8]
        }
      }
    }
  },
  148: {
    id: 148,
    name: '哈克龍',
    sleepType: 1,
    skillType: 7,
    pokeType: 2,
    berryType: 3,
    helpSpeed: 3800,
    foodPer: 26.18
  },
  149: {
    id: 149,
    name: '快龍',
    sleepType: 1,
    skillType: 7,
    pokeType: 2,
    berryType: 3,
    helpSpeed: 2600,
    foodPer: 26.39
  },
  152: {
    id: 152,
    name: '菊草葉',
    sleepType: 1,
    skillType: 5,
    pokeType: 1,
    berryType: 4,
    helpSpeed: 4400,
    foodPer: 16.81,
    food: {
      type: [13, 9, 1],
      count: {
        13: {
          num: [1, 2, 4]
        },
        9: {
          num: [0, 3, 5]
        },
        1: {
          num: [0, 0, 3]
        }
      }
    }
  },
  153: {
    id: 153,
    name: '月桂葉',
    sleepType: 1,
    skillType: 5,
    pokeType: 1,
    berryType: 4,
    helpSpeed: 3300,
    foodPer: 16.79
  },
  154: {
    id: 154,
    name: '大竺葵',
    sleepType: 1,
    skillType: 5,
    pokeType: 1,
    berryType: 4,
    helpSpeed: 2800,
    foodPer: 17.43
  },
  155: {
    id: 155,
    name: '火球鼠',
    sleepType: 2,
    skillType: 5,
    pokeType: 1,
    berryType: 10,
    helpSpeed: 3500,
    foodPer: 18.52,
    food: {
      type: [11, 6, 10],
      count: {
        11: {
          num: [1, 2, 4]
        },
        6: {
          num: [0, 2, 3]
        },
        10: {
          num: [0, 0, 3]
        }
      }
    }
  },
  156: {
    id: 156,
    name: '火岩鼠',
    sleepType: 2,
    skillType: 5,
    pokeType: 1,
    berryType: 10,
    helpSpeed: 3000,
    foodPer: 21.12
  },
  157: {
    id: 157,
    name: '火爆獸',
    sleepType: 2,
    skillType: 5,
    pokeType: 1,
    berryType: 10,
    helpSpeed: 2400,
    foodPer: 20.62
  },
  158: {
    id: 158,
    name: '小鋸鱷',
    sleepType: 3,
    skillType: 5,
    pokeType: 1,
    berryType: 1,
    helpSpeed: 4500,
    foodPer: 25.19,
    food: {
      type: [7, 10],
      count: {
        7: {
          num: [1, 2, 4]
        },
        10: {
          num: [0, 2, 3]
        }
      }
    }
  },
  159: {
    id: 159,
    name: '藍鱷',
    sleepType: 3,
    skillType: 5,
    pokeType: 1,
    berryType: 1,
    helpSpeed: 3400,
    foodPer: 25.27
  },
  160: {
    id: 160,
    name: '大力鱷',
    sleepType: 3,
    skillType: 5,
    pokeType: 1,
    berryType: 1,
    helpSpeed: 2800,
    foodPer: 25.5
  },
  172: {
    id: 172,
    name: '皮丘',
    sleepType: 3,
    skillType: 1,
    pokeType: 1,
    berryType: 13,
    helpSpeed: 4300,
    foodPer: 20.92,
    food: {
      type: [5, 11, 3],
      count: {
        5: {
          num: [1, 2, 4]
        },
        11: {
          num: [0, 2, 3]
        },
        3: {
          num: [0, 0, 3]
        }
      }
    }
  },
  173: {
    id: 173,
    name: '皮寶寶',
    sleepType: 3,
    skillType: 13,
    pokeType: 1,
    berryType: 12,
    helpSpeed: 5600,
    berryType: 12,
    foodPer: 16.33,
    food: {
      type: [5, 9, 15],
      count: {
        5: {
          num: [1, 2, 4]
        },
        9: {
          num: [0, 2, 3]
        },
        15: {
          num: [0, 0, 3]
        }
      }
    }
  },
  174: {
    id: 174,
    name: '寶寶丁',
    sleepType: 3,
    skillType: 8,
    pokeType: 3,
    berryType: 12,
    helpSpeed: 5200,
    foodPer: 16.91,
    food: {
      type: [9, 10, 13],
      count: {
        9: {
          num: [1, 2, 4]
        },
        10: {
          num: [0, 2, 3]
        },
        13: {
          num: [0, 0, 2]
        }
      }
    }
  },
  175: {
    id: 175,
    name: '波克比',
    sleepType: 3,
    skillType: 13,
    pokeType: 3,
    berryType: 12,
    helpSpeed: 4800,
    foodPer: 15.04,
    food: {
      type: [3, 11, 13],
      count: {
        3: {
          num: [1, 2, 4]
        },
        11: {
          num: [0, 2, 4]
        },
        13: {
          num: [0, 0, 3]
        }
      }
    }
  },
  176: {
    id: 176,
    name: '波克基古',
    sleepType: 2,
    skillType: 13,
    pokeType: 3,
    berryType: 12,
    helpSpeed: 3800,
    foodPer: 16.33
  },
  179: {
    id: 179,
    name: '咩利羊',
    sleepType: 2,
    skillType: 2,
    pokeType: 3,
    berryType: 13,
    helpSpeed: 4600,
    foodPer: 12.73,
    food: {
      type: [6, 3],
      count: {
        6: {
          num: [1, 2, 4]
        },
        3: {
          num: [0, 3, 4]
        }
      }
    }
  },
  180: {
    id: 180,
    name: '茸茸羊',
    sleepType: 2,
    skillType: 2,
    pokeType: 3,
    berryType: 13,
    helpSpeed: 3300,
    foodPer: 12.65
  },
  181: {
    id: 181,
    name: '電龍',
    sleepType: 2,
    skillType: 2,
    pokeType: 3,
    berryType: 13,
    helpSpeed: 2500,
    foodPer: 12.93
  },
  185: {
    id: 185,
    name: '樹才怪',
    sleepType: 3,
    skillType: 2,
    pokeType: 3,
    berryType: 14,
    helpSpeed: 4000,
    foodPer: 19.54
  },
  196: {
    id: 196,
    name: '太陽伊布',
    sleepType: 2,
    skillType: 2,
    berryType: 6,
    pokeType: 3,
    helpSpeed: 2400,
    foodPer: 16.24
  },
  197: {
    id: 197,
    name: '月亮伊布',
    sleepType: 1,
    skillType: 7,
    pokeType: 3,
    berryType: 17,
    helpSpeed: 3200,
    foodPer: 21.82
  },
  199: {
    id: 199,
    name: '呆呆王',
    sleepType: 2,
    skillType: 4,
    pokeType: 3,
    berryType: 1,
    helpSpeed: 3400,
    foodPer: 15.04
  },
  202: {
    id: 202,
    name: '果然翁',
    sleepType: 2,
    skillType: 4,
    pokeType: 3,
    berryType: 6,
    helpSpeed: 3500,
    foodPer: 21.04
  },
  208: {
    id: 208,
    name: '大鋼蛇',
    sleepType: 3,
    skillType: 10,
    pokeType: 1,
    berryType: 2,
    helpSpeed: 3000,
    foodPer: 15.41
  },
  214: {
    id: 214,
    name: '赫拉克羅斯',
    sleepType: 1,
    skillType: 10,
    pokeType: 3,
    berryType: 9,
    helpSpeed: 2500,
    foodPer: 15.8,
    food: {
      type: [9, 2, 7],
      count: {
        9: {
          num: [1, 2, 4]
        },
        2: {
          num: [0, 1, 2]
        },
        7: {
          num: [0, 0, 4]
        }
      }
    }
  },
  225: {
    id: 225,
    name: '信使鳥',
    sleepType: 1,
    skillType: 10,
    pokeType: 2,
    berryType: 16,
    helpSpeed: 2500,
    foodPer: 18.79,
    food: {
      type: [3, 5, 13],
      count: {
        3: {
          num: [2, 5, 7]
        },
        5: {
          num: [0, 6, 9]
        },
        13: {
          num: [0, 0, 5]
        }
      }
    }
  },
  228: {
    id: 228,
    name: '戴魯比',
    sleepType: 1,
    skillType: 1,
    pokeType: 1,
    berryType: 17,
    helpSpeed: 4900,
    foodPer: 20.04,
    food: {
      type: [6, 11, 1],
      count: {
        6: {
          num: [1, 2, 4]
        },
        11: {
          num: [0, 3, 4]
        },
        1: {
          num: [0, 0, 3]
        }
      }
    }
  },
  229: {
    id: 229,
    name: '黑魯加',
    sleepType: 1,
    skillType: 1,
    pokeType: 1,
    berryType: 17,
    helpSpeed: 3300,
    foodPer: 20.21
  },
  243: {
    id: 243,
    name: '雷公',
    sleepType: 2,
    skillType: 15,
    pokeType: 3,
    berryType: 13,
    helpSpeed: 2100
    // foodPer: 20.21
  },
  246: {
    id: 246,
    name: '幼基拉斯',
    sleepType: 3,
    skillType: 7,
    pokeType: 2,
    berryType: 14,
    helpSpeed: 4800,
    foodPer: 23.76,
    food: {
      type: [11, 15, 7],
      count: {
        11: {
          num: [2, 5, 7]
        },
        15: {
          num: [0, 5, 8]
        },
        7: {
          num: [0, 0, 8]
        }
      }
    }
  },
  247: {
    id: 247,
    name: '沙基拉斯',
    sleepType: 3,
    skillType: 7,
    pokeType: 2,
    berryType: 14,
    helpSpeed: 3600,
    foodPer: 24.67
  },
  248: {
    id: 248,
    name: '班基拉斯',
    sleepType: 1,
    skillType: 7,
    pokeType: 2,
    berryType: 17,
    helpSpeed: 2700,
    foodPer: 26.58
  },
  280: {
    id: 280,
    name: '拉魯拉絲',
    sleepType: 2,
    skillType: 8,
    pokeType: 3,
    berryType: 6,
    helpSpeed: 4800,
    foodPer: 14.57,
    food: {
      type: [5, 16, 1],
      count: {
        5: {
          num: [1, 2, 4]
        },
        16: {
          num: [0, 1, 2]
        },
        1: {
          num: [0, 0, 2]
        }
      }
    }
  },
  281: {
    id: 281,
    name: '奇魯莉安',
    sleepType: 2,
    skillType: 8,
    pokeType: 3,
    berryType: 6,
    helpSpeed: 3500,
    foodPer: 14.6
  },
  282: {
    id: 282,
    name: '沙奈朵',
    sleepType: 2,
    skillType: 8,
    pokeType: 3,
    berryType: 6,
    helpSpeed: 2400,
    foodPer: 14.37
  },
  287: {
    id: 287,
    name: '懶人獺',
    sleepType: 2,
    skillType: 10,
    pokeType: 1,
    berryType: 11,
    helpSpeed: 4900,
    foodPer: 21.32,
    food: {
      type: [12, 9, 5],
      count: {
        12: {
          num: [1, 2, 4]
        },
        9: {
          num: [0, 2, 4]
        },
        5: {
          num: [0, 0, 4]
        }
      }
    }
  },
  288: {
    id: 288,
    name: '過動猿',
    sleepType: 1,
    skillType: 10,
    pokeType: 1,
    berryType: 11,
    helpSpeed: 3200,
    foodPer: 20.36
  },
  289: {
    id: 289,
    name: '請假王',
    sleepType: 2,
    skillType: 10,
    pokeType: 1,
    berryType: 11,
    helpSpeed: 3800,
    foodPer: 33.81
  },
  302: {
    id: 302,
    name: '勾魂眼',
    sleepType: 1,
    skillType: 6,
    pokeType: 3,
    berryType: 17,
    helpSpeed: 3600,
    foodPer: 17.03,
    food: {
      type: [10, 2, 13],
      count: {
        10: {
          num: [1, 2, 4]
        },
        2: {
          num: [0, 2, 3]
        },
        13: {
          num: [0, 0, 3]
        }
      }
    }
  },
  316: {
    id: 316,
    name: '溶食獸',
    sleepType: 1,
    skillType: 6,
    pokeType: 3,
    berryType: 5,
    helpSpeed: 5900,
    foodPer: 21.37,
    food: {
      type: [15, 2, 9],
      count: {
        15: {
          num: [1, 2, 4]
        },
        2: {
          num: [0, 1, 2]
        },
        9: {
          num: [0, 0, 4]
        }
      }
    }
  },
  317: {
    id: 317,
    name: '吞食獸',
    sleepType: 1,
    skillType: 6,
    pokeType: 3,
    berryType: 5,
    helpSpeed: 3500,
    foodPer: 21.05
  },
  333: {
    id: 333,
    name: '青綿鳥',
    sleepType: 3,
    skillType: 7,
    pokeType: 1,
    berryType: 16,
    helpSpeed: 4200,
    foodPer: 17.56,
    food: {
      type: [3, 15, 5],
      count: {
        3: {
          num: [1, 2, 4]
        },
        15: {
          num: [0, 3, 4]
        },
        5: {
          num: [0, 0, 5]
        }
      }
    }
  },
  334: {
    id: 334,
    name: '七夕青鳥',
    sleepType: 1,
    skillType: 7,
    pokeType: 1,
    berryType: 3,
    helpSpeed: 3700,
    foodPer: 25.63
  },
  353: {
    id: 353,
    name: '怨影娃娃',
    sleepType: 1,
    skillType: 5,
    pokeType: 1,
    berryType: 8,
    helpSpeed: 3900,
    berryType: 8,
    foodPer: 17.08,
    food: {
      type: [10, 11, 2],
      count: {
        10: {
          num: [1, 2, 4]
        },
        11: {
          num: [0, 2, 4]
        },
        2: {
          num: [0, 0, 3]
        }
      }
    }
  },
  354: {
    id: 354,
    name: '詛咒娃娃',
    sleepType: 1,
    skillType: 5,
    pokeType: 1,
    berryType: 8,
    helpSpeed: 2600,
    berryType: 8,
    foodPer: 17.91
  },
  359: {
    id: 359,
    name: '阿勃梭魯',
    sleepType: 1,
    skillType: 1,
    pokeType: 2,
    berryType: 17,
    helpSpeed: 3100,
    foodPer: 17.8,
    food: {
      type: [13, 5, 2],
      count: {
        13: {
          num: [2, 5, 7]
        },
        5: {
          num: [0, 8, 12]
        },
        2: {
          num: [0, 0, 7]
        }
      }
    }
  },
  360: {
    id: 360,
    name: '小果然',
    sleepType: 3,
    skillType: 4,
    pokeType: 3,
    helpSpeed: 5800,
    berryType: 6,
    foodPer: 21.23,
    food: {
      type: [5, 2, 10],
      count: {
        5: {
          num: [1, 2, 4]
        },
        2: {
          num: [0, 1, 2]
        },
        10: {
          num: [0, 0, 3]
        }
      }
    }
  },
  363: {
    id: 363,
    name: '海豹球',
    sleepType: 3,
    skillType: 10,
    pokeType: 1,
    helpSpeed: 5600,
    berryType: 7,
    foodPer: 22.33,
    food: {
      type: [10, 7, 11],
      count: {
        10: {
          num: [1, 2, 4]
        },
        7: {
          num: [0, 3, 4]
        },
        11: {
          num: [0, 0, 4]
        }
      }
    }
  },
  364: {
    id: 364,
    name: '海魔獅',
    sleepType: 3,
    skillType: 10,
    pokeType: 1,
    helpSpeed: 4000,
    berryType: 7,
    foodPer: 22.04
  },
  365: {
    id: 365,
    name: '帝牙海獅',
    sleepType: 3,
    skillType: 10,
    pokeType: 1,
    helpSpeed: 3000,
    berryType: 7,
    foodPer: 22.34
  },
  438: {
    id: 438,
    name: '盆才怪',
    sleepType: 3,
    skillType: 2,
    pokeType: 3,
    helpSpeed: 6300,
    berryType: 14,
    foodPer: 18.85,
    food: {
      type: [12, 15, 2],
      count: {
        12: {
          num: [1, 2, 4]
        },
        15: {
          num: [0, 2, 4]
        },
        2: {
          num: [0, 0, 2]
        }
      }
    }
  },
  439: {
    id: 439,
    name: '魔尼尼',
    sleepType: 3,
    skillType: 1,
    pokeType: 2,
    berryType: 6,
    helpSpeed: 4300,
    foodPer: 20.07,
    food: {
      type: [12, 4, 1],
      count: {
        12: {
          num: [2, 5, 7]
        },
        4: {
          num: [0, 4, 6]
        },
        1: {
          num: [0, 0, 4]
        }
      }
    }
  },
  447: {
    id: 447,
    name: '利歐路',
    sleepType: 3,
    skillType: 3,
    pokeType: 3,
    helpSpeed: 4200,
    berryType: 18,
    foodPer: 12.53,
    food: {
      type: [10, 4, 3],
      count: {
        10: {
          num: [1, 2, 4]
        },
        4: {
          num: [0, 2, 4]
        },
        3: {
          num: [0, 0, 4]
        }
      }
    }
  },
  448: {
    id: 448,
    name: '路卡利歐',
    sleepType: 3,
    skillType: 3,
    pokeType: 3,
    helpSpeed: 2700,
    berryType: 18,
    foodPer: 14.92
  },
  453: {
    id: 453,
    name: '不良蛙',
    sleepType: 1,
    skillType: 1,
    pokeType: 2,
    berryType: 5,
    helpSpeed: 5600,
    foodPer: 22.74,
    food: {
      type: [10, 7],
      count: {
        10: {
          num: [2, 5, 7]
        },
        7: {
          num: [0, 5, 8]
        }
      }
    }
  },
  454: {
    id: 454,
    name: '毒骷蛙',
    sleepType: 1,
    skillType: 1,
    pokeType: 2,
    berryType: 5,
    helpSpeed: 3400,
    foodPer: 22.85
  },
  459: {
    id: 459,
    name: '雪笠怪',
    sleepType: 3,
    skillType: 5,
    pokeType: 2,
    berryType: 7,
    helpSpeed: 5600,
    foodPer: 25.04,
    food: {
      type: [12, 3, 2],
      count: {
        12: {
          num: [2, 5, 7]
        },
        3: {
          num: [0, 4, 7]
        },
        2: {
          num: [0, 0, 5]
        }
      }
    }
  },
  460: {
    id: 460,
    name: '暴雪王',
    sleepType: 3,
    skillType: 5,
    pokeType: 2,
    berryType: 7,
    helpSpeed: 3000,
    foodPer: 25
  },
  462: {
    id: 462,
    name: '自爆磁怪',
    sleepType: 3,
    skillType: 11,
    pokeType: 3,
    berryType: 2,
    helpSpeed: 3100,
    foodPer: 17.9
  },
  468: {
    id: 468,
    name: '波克基斯',
    sleepType: 2,
    skillType: 13,
    pokeType: 3,
    berryType: 12,
    helpSpeed: 2600,
    foodPer: 15.78
  },
  470: {
    id: 470,
    name: '葉伊布',
    sleepType: 1,
    skillType: 4,
    pokeType: 3,
    berryType: 4,
    helpSpeed: 3000,
    foodPer: 20.44
  },
  471: {
    id: 471,
    name: '冰伊布',
    sleepType: 3,
    skillType: 11,
    pokeType: 3,
    berryType: 7,
    helpSpeed: 3200,
    foodPer: 21.94
  },
  475: {
    id: 475,
    name: '艾路雷朵',
    sleepType: 3,
    skillType: 9,
    pokeType: 3,
    berryType: 18,
    helpSpeed: 2400,
    foodPer: 14.76
  },
  700: {
    id: 700,
    name: '仙子伊布',
    sleepType: 2,
    skillType: 8,
    pokeType: 3,
    berryType: 12,
    helpSpeed: 2600,
    foodPer: 17.79
  },
  702: {
    id: 702,
    name: '咚咚鼠',
    sleepType: 2,
    skillType: 14,
    pokeType: 3,
    berryType: 13,
    helpSpeed: 2500,
    foodPer: 17.71,
    food: {
      type: [5, 13, 16],
      count: {
        5: {
          num: [1, 2, 4]
        },
        13: {
          num: [0, 1, 2]
        },
        16: {
          num: [0, 0, 2]
        }
      }
    }
  },
  759: {
    id: 759,
    name: '童偶熊',
    sleepType: 3,
    skillType: 5,
    pokeType: 2,
    helpSpeed: 4100,
    berryType: 18,
    foodPer: 22.46,
    food: {
      type: [16, 7, 3],
      count: {
        16: {
          num: [2, 5, 7]
        },
        7: {
          num: [0, 6, 10]
        },
        3: {
          num: [0, 0, 9]
        }
      }
    }
  },
  760: {
    id: 760,
    name: '穿著熊',
    sleepType: 3,
    skillType: 5,
    pokeType: 2,
    helpSpeed: 2800,
    berryType: 18,
    foodPer: 22.88
  },
  9001: {
    id: 9001,
    name: '皮卡丘（萬聖節）',
    sleepType: 2,
    skillType: 5,
    pokeType: 1,
    berryType: 13,
    helpSpeed: 2600,
    berryType: 13,
    foodPer: 21.82
  },
  9002: {
    id: 9002,
    name: '皮卡丘（佳節）',
    sleepType: 2,
    skillType: 3,
    pokeType: 3,
    berryType: 13,
    helpSpeed: 2600,
    foodPer: 13.08
  }
}
evoLine.forEach(evoItem => {
  evoItem.forEach((pm, pmKey) => {
    if (pmKey > 0) {
      pokedex[pm].food = pokedex[evoItem[0]].food
    }
  })
})
const updatePoke = [{
  time: '2023/8/1',
  pokemons: [439, 122]
}, {
  time: '2023/9/1',
  pokemons: [173, 35, 36]
}, {
  time: '2023/10/1',
  pokemons: [353, 354, 9001]
}, {
  time: '2023/11/1',
  pokemons: [95, 208]
}, {
  time: '2023/12/1',
  pokemons: [225, 459, 460, 9002]
}, {
  time: '2024/01/1',
  pokemons: [147, 148, 149, 280, 281, 282, 475, 759, 760]
}, {
  time: '2024/03/1',
  pokemons: [702, 243]
}]
// console.log(pokedex)
export {
  pokedex,
  updatePoke
}