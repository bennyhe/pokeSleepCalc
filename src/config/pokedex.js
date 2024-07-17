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
  [759, 760],
  [37, 38],
  [906, 907, 908],
  [909, 910, 911],
  [912, 913, 914]
]
const pokedex = {
  1: {
    id: 1,
    // name: '妙蛙種子',
    friendship: 5,
    sleepType: 1,
    skillType: 10,
    pokeType: 2,
    berryType: 4,
    helpSpeed: 4400,
    foodPer: 25.63,
    skillPer: 1.90,
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
    // name: '妙蛙草',
    friendship: 12,
    sleepType: 1,
    skillType: 10,
    pokeType: 2,
    berryType: 4,
    helpSpeed: 3300,
    foodPer: 25.47,
    skillPer: 1.900
  },
  3: {
    id: 3,
    // name: '妙蛙花',
    friendship: 20,
    sleepType: 1,
    skillType: 10,
    pokeType: 2,
    berryType: 4,
    helpSpeed: 2800,
    foodPer: 26.53,
    skillPer: 2.111
  },
  4: {
    id: 4,
    // name: '小火龍',
    friendship: 5,
    sleepType: 2,
    skillType: 10,
    pokeType: 2,
    berryType: 10,
    helpSpeed: 3500,
    foodPer: 20.04,
    skillPer: 1.10,
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
    // name: '火恐龍',
    friendship: 12,
    sleepType: 2,
    skillType: 10,
    pokeType: 2,
    berryType: 10,
    helpSpeed: 3000,
    foodPer: 22.70,
    skillPer: 1.600
  },
  6: {
    id: 6,
    // name: '噴火龍',
    friendship: 20,
    sleepType: 2,
    skillType: 10,
    pokeType: 2,
    berryType: 10,
    helpSpeed: 2400,
    foodPer: 22.36,
    skillPer: 1.600
  },
  7: {
    id: 7,
    // name: '傑尼龜',
    friendship: 5,
    sleepType: 3,
    skillType: 10,
    pokeType: 2,
    berryType: 1,
    helpSpeed: 4500,
    foodPer: 27.01,
    skillPer: 2.00,
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
    // name: '卡咪龜',
    friendship: 12,
    sleepType: 3,
    skillType: 10,
    pokeType: 2,
    berryType: 1,
    helpSpeed: 3400,
    foodPer: 27.07,
    skillPer: 2.000
  },
  9: {
    id: 9,
    // name: '水箭龜',
    friendship: 20,
    sleepType: 3,
    skillType: 10,
    pokeType: 2,
    berryType: 1,
    helpSpeed: 2800,
    foodPer: 27.44,
    skillPer: 2.100
  },
  10: {
    id: 10,
    // name: '綠毛蟲',
    friendship: 5,
    sleepType: 1,
    skillType: 10,
    pokeType: 1,
    berryType: 9,
    helpSpeed: 4400,
    foodPer: 17.88,
    skillPer: 0.80,
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
    // name: '鐵甲蛹',
    friendship: 7,
    sleepType: 1,
    skillType: 10,
    pokeType: 1,
    berryType: 9,
    helpSpeed: 4200,
    foodPer: 20.73,
    skillPer: 1.800
  },
  12: {
    id: 12,
    // name: '巴大蝶',
    friendship: 15,
    sleepType: 1,
    skillType: 10,
    pokeType: 1,
    berryType: 9,
    helpSpeed: 2600,
    foodPer: 19.68,
    skillPer: 1.400
  },
  19: {
    id: 19,
    // name: '小拉達',
    friendship: 5,
    sleepType: 2,
    skillType: 7,
    pokeType: 1,
    berryType: 11,
    helpSpeed: 4900,
    foodPer: 23.63,
    skillPer: 2.99,
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
    // name: '拉達',
    friendship: 12,
    sleepType: 2,
    skillType: 7,
    pokeType: 1,
    berryType: 11,
    helpSpeed: 3200,
    foodPer: 23.66,
    skillPer: 3.000
  },
  23: {
    id: 23,
    // name: '阿柏蛇',
    friendship: 5,
    sleepType: 1,
    skillType: 7,
    pokeType: 1,
    berryType: 5,
    helpSpeed: 5000,
    foodPer: 23.33,
    skillPer: 3.30,
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
    // name: '阿柏怪',
    friendship: 12,
    sleepType: 1,
    skillType: 7,
    pokeType: 1,
    berryType: 5,
    helpSpeed: 3700,
    foodPer: 26.29,
    skillPer: 5.700
  },
  25: {
    id: 25,
    // name: '皮卡丘',
    friendship: 7,
    sleepType: 2,
    skillType: 1,
    pokeType: 1,
    berryType: 13,
    helpSpeed: 2700,
    foodPer: 20.65,
    skillPer: 2.100
  },
  26: {
    id: 26,
    // name: '雷丘',
    friendship: 18,
    sleepType: 2,
    skillType: 1,
    pokeType: 1,
    berryType: 13,
    helpSpeed: 2200,
    foodPer: 22.37,
    skillPer: 3.200
  },
  35: {
    id: 35,
    // name: '皮皮',
    friendship: 7,
    sleepType: 2,
    skillType: 13,
    pokeType: 1,
    berryType: 12,
    helpSpeed: 4000,
    foodPer: 16.83,
    skillPer: 3.599
  },
  36: {
    id: 36,
    // name: '皮可西',
    friendship: 20,
    sleepType: 2,
    skillType: 13,
    pokeType: 1,
    berryType: 12,
    helpSpeed: 2800,
    foodPer: 16.81,
    skillPer: 3.600
  },
  37: {
    id: 37,
    // name: '六尾',
    friendship: 5,
    sleepType: 2,
    skillType: 4,
    pokeType: 1,
    berryType: 10,
    helpSpeed: 4700,
    foodPer: 16.80,
    skillPer: 2.70,
    food: {
      type: [15, 16, 4],
      count: {
        15: {
          num: [1, 2, 4]
        },
        16: {
          num: [0, 2, 3]
        },
        4: {
          num: [0, 0, 3]
        }
      }
    }
  },
  38: {
    id: 38,
    // name: '九尾',
    friendship: 20,
    sleepType: 2,
    skillType: 4,
    pokeType: 1,
    berryType: 10,
    helpSpeed: 2600,
    foodPer: 16.40,
    skillPer: 2.500
  },
  39: {
    id: 39,
    // name: '胖丁',
    friendship: 7,
    sleepType: 2,
    skillType: 8,
    pokeType: 3,
    berryType: 12,
    helpSpeed: 3900,
    foodPer: 18.20,
    skillPer: 4.300
  },
  40: {
    id: 40,
    // name: '胖可丁',
    friendship: 16,
    sleepType: 2,
    skillType: 8,
    pokeType: 3,
    berryType: 12,
    helpSpeed: 2900,
    foodPer: 17.24,
    skillPer: 4.000
  },
  50: {
    id: 50,
    // name: '地鼠',
    friendship: 5,
    sleepType: 2,
    skillType: 1,
    pokeType: 2,
    berryType: 15,
    helpSpeed: 4300,
    foodPer: 19.16,
    skillPer: 2.10,
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
    // name: '三地鼠',
    friendship: 12,
    sleepType: 2,
    skillType: 1,
    pokeType: 2,
    berryType: 15,
    helpSpeed: 2800,
    foodPer: 18.95,
    skillPer: 2.011
  },
  52: {
    id: 52,
    // name: '喵喵',
    friendship: 5,
    sleepType: 2,
    skillType: 3,
    pokeType: 3,
    berryType: 11,
    helpSpeed: 4400,
    foodPer: 16.31,
    skillPer: 4.19,
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
    // name: '貓老大',
    friendship: 12,
    sleepType: 2,
    skillType: 3,
    pokeType: 3,
    berryType: 11,
    helpSpeed: 2800,
    foodPer: 16.91,
    skillPer: 4.400
  },
  54: {
    id: 54,
    // name: '可達鴨',
    friendship: 5,
    sleepType: 1,
    skillType: 5,
    pokeType: 3,
    berryType: 1,
    helpSpeed: 5400,
    foodPer: 13.57,
    skillPer: 12.60,
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
    // name: '哥達鴨',
    friendship: 12,
    sleepType: 3,
    skillType: 5,
    pokeType: 3,
    berryType: 1,
    helpSpeed: 3400,
    foodPer: 16.17,
    skillPer: 12.500
  },
  56: {
    id: 56,
    // name: '猴怪',
    friendship: 5,
    sleepType: 1,
    skillType: 5,
    pokeType: 1,
    berryType: 18,
    helpSpeed: 4200,
    foodPer: 19.61,
    skillPer: 2.20,
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
    // name: '火爆猴',
    friendship: 12,
    sleepType: 1,
    skillType: 5,
    pokeType: 1,
    berryType: 18,
    helpSpeed: 2800,
    foodPer: 19.94,
    skillPer: 2.399
  },
  58: {
    id: 58,
    // name: '卡蒂狗',
    friendship: 5,
    sleepType: 2,
    skillType: 9,
    pokeType: 3,
    berryType: 10,
    helpSpeed: 4300,
    foodPer: 13.75,
    skillPer: 5.00,
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
    // name: '風速狗',
    friendship: 20,
    sleepType: 2,
    skillType: 9,
    pokeType: 3,
    berryType: 10,
    helpSpeed: 2500,
    foodPer: 13.58,
    skillPer: 4.900
  },
  69: {
    id: 69,
    // name: '喇叭芽',
    friendship: 5,
    sleepType: 1,
    skillType: 7,
    pokeType: 2,
    berryType: 4,
    helpSpeed: 5200,
    foodPer: 23.25,
    skillPer: 3.90,
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
    // name: '口呆花',
    friendship: 12,
    sleepType: 1,
    skillType: 7,
    pokeType: 2,
    berryType: 4,
    helpSpeed: 3800,
    foodPer: 23.50,
    skillPer: 3.999
  },
  71: {
    id: 71,
    // name: '大食花',
    friendship: 20,
    sleepType: 1,
    skillType: 7,
    pokeType: 2,
    berryType: 4,
    helpSpeed: 2800,
    foodPer: 23.30,
    skillPer: 3.900
  },
  74: {
    id: 74,
    // name: '小拳石',
    friendship: 5,
    sleepType: 3,
    skillType: 5,
    pokeType: 2,
    berryType: 14,
    helpSpeed: 3800,
    foodPer: 28.06,
    skillPer: 5.19,
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
    // name: '隆隆石',
    friendship: 12,
    sleepType: 3,
    skillType: 5,
    pokeType: 2,
    berryType: 14,
    helpSpeed: 4000,
    foodPer: 27.20,
    skillPer: 4.788
  },
  76: {
    id: 76,
    // name: '隆隆岩',
    friendship: 22,
    sleepType: 3,
    skillType: 5,
    pokeType: 2,
    berryType: 14,
    helpSpeed: 3100,
    foodPer: 27.99,
    skillPer: 5.200
  },
  79: {
    id: 79,
    // name: '呆呆獸',
    friendship: 5,
    sleepType: 2,
    skillType: 4,
    pokeType: 3,
    berryType: 1,
    helpSpeed: 5700,
    foodPer: 15.05,
    skillPer: 6.70,
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
    // name: '呆殼獸',
    friendship: 12,
    sleepType: 2,
    skillType: 4,
    pokeType: 3,
    berryType: 1,
    helpSpeed: 3800,
    foodPer: 19.62,
    skillPer: 6.800
  },
  81: {
    id: 81,
    // name: '小磁怪',
    friendship: 5,
    sleepType: 3,
    skillType: 11,
    pokeType: 3,
    berryType: 2,
    helpSpeed: 5800,
    foodPer: 18.14,
    skillPer: 6.40,
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
    // name: '三合一磁怪',
    friendship: 12,
    sleepType: 3,
    skillType: 11,
    pokeType: 3,
    berryType: 2,
    helpSpeed: 4000,
    foodPer: 18.17,
    skillPer: 6.300
  },
  84: {
    id: 84,
    // name: '嘟嘟',
    friendship: 5,
    sleepType: 3,
    skillType: 7,
    pokeType: 1,
    berryType: 16,
    helpSpeed: 3800,
    foodPer: 18.24,
    skillPer: 2.01,
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
    // name: '嘟嘟利',
    friendship: 12,
    sleepType: 3,
    skillType: 7,
    pokeType: 1,
    berryType: 16,
    helpSpeed: 2400,
    foodPer: 18.40,
    skillPer: 2.000
  },
  92: {
    id: 92,
    // name: '鬼斯',
    friendship: 5,
    sleepType: 1,
    skillType: 5,
    pokeType: 2,
    berryType: 8,
    helpSpeed: 3800,
    foodPer: 14.41,
    skillPer: 1.48,
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
    // name: '鬼斯通',
    friendship: 12,
    sleepType: 1,
    skillType: 5,
    pokeType: 2,
    berryType: 8,
    helpSpeed: 3000,
    foodPer: 15.70,
    skillPer: 2.199
  },
  94: {
    id: 94,
    // name: '耿鬼',
    friendship: 22,
    sleepType: 1,
    skillType: 5,
    pokeType: 2,
    berryType: 8,
    helpSpeed: 2200,
    foodPer: 16.11,
    skillPer: 2.400
  },
  95: {
    id: 95,
    // name: '大岩蛇',
    friendship: 16,
    sleepType: 3,
    skillType: 10,
    pokeType: 1,
    helpSpeed: 3100,
    berryType: 14,
    foodPer: 13.17,
    skillPer: 2.30,
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
    // name: '卡拉卡拉',
    friendship: 5,
    sleepType: 3,
    skillType: 7,
    pokeType: 1,
    berryType: 15,
    helpSpeed: 4800,
    foodPer: 22.23,
    skillPer: 4.40,
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
    // name: '嘎啦嘎啦',
    friendship: 12,
    sleepType: 3,
    skillType: 7,
    pokeType: 1,
    berryType: 15,
    helpSpeed: 3500,
    foodPer: 22.44,
    skillPer: 4.500
  },
  115: {
    id: 115,
    // name: '袋獸',
    friendship: 16,
    sleepType: 2,
    skillType: 10,
    pokeType: 2,
    berryType: 11,
    helpSpeed: 2800,
    foodPer: 22.18,
    skillPer: 1.70,
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
    // name: '魔牆人偶',
    friendship: 12,
    sleepType: 2,
    skillType: 1,
    pokeType: 2,
    berryType: 6,
    helpSpeed: 2800,
    foodPer: 21.61,
    skillPer: 3.888
  },
  127: {
    id: 127,
    // name: '凱羅斯',
    friendship: 16,
    sleepType: 1,
    skillType: 1,
    pokeType: 2,
    berryType: 9,
    helpSpeed: 2400,
    foodPer: 21.65,
    skillPer: 3.08,
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
    // name: '百變怪',
    friendship: 16,
    sleepType: 2,
    skillType: 5,
    pokeType: 2,
    berryType: 11,
    helpSpeed: 3500,
    foodPer: 20.09,
    skillPer: 3.59,
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
    // name: '伊布',
    friendship: 5,
    sleepType: 2,
    skillType: 10,
    pokeType: 3,
    berryType: 11,
    helpSpeed: 3700,
    foodPer: 19.15,
    skillPer: 5.50,
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
    // name: '水伊布',
    friendship: 20,
    sleepType: 3,
    skillType: 10,
    pokeType: 3,
    berryType: 1,
    helpSpeed: 3100,
    foodPer: 21.09,
    skillPer: 6.100
  },
  135: {
    id: 135,
    // name: '雷伊布',
    friendship: 20,
    sleepType: 2,
    skillType: 9,
    pokeType: 3,
    berryType: 13,
    helpSpeed: 2200,
    foodPer: 15.14,
    skillPer: 3.900
  },
  136: {
    id: 136,
    // name: '火伊布',
    friendship: 20,
    sleepType: 2,
    skillType: 11,
    pokeType: 3,
    berryType: 10,
    helpSpeed: 2700,
    foodPer: 18.52,
    skillPer: 5.200
  },
  147: {
    id: 147,
    // name: '迷你龍',
    friendship: 5,
    sleepType: 1,
    skillType: 7,
    pokeType: 2,
    berryType: 3,
    helpSpeed: 5000,
    foodPer: 24.96,
    skillPer: 2.00,
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
    // name: '哈克龍',
    friendship: 12,
    sleepType: 1,
    skillType: 7,
    pokeType: 2,
    berryType: 3,
    helpSpeed: 3800,
    foodPer: 26.17,
    skillPer: 2.511
  },
  149: {
    id: 149,
    // name: '快龍',
    friendship: 25,
    sleepType: 1,
    skillType: 7,
    pokeType: 2,
    berryType: 3,
    helpSpeed: 2600,
    foodPer: 26.40,
    skillPer: 2.599
  },
  152: {
    id: 152,
    // name: '菊草葉',
    friendship: 5,
    sleepType: 1,
    skillType: 5,
    pokeType: 1,
    berryType: 4,
    helpSpeed: 4400,
    foodPer: 16.81,
    skillPer: 3.90,
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
    // name: '月桂葉',
    friendship: 12,
    sleepType: 1,
    skillType: 5,
    pokeType: 1,
    berryType: 4,
    helpSpeed: 3300,
    foodPer: 16.79,
    skillPer: 3.800
  },
  154: {
    id: 154,
    // name: '大竺葵',
    friendship: 20,
    sleepType: 1,
    skillType: 5,
    pokeType: 1,
    berryType: 4,
    helpSpeed: 2800,
    foodPer: 17.42,
    skillPer: 4.600
  },
  155: {
    id: 155,
    // name: '火球鼠',
    friendship: 5,
    sleepType: 2,
    skillType: 5,
    pokeType: 1,
    berryType: 10,
    helpSpeed: 3500,
    foodPer: 18.51,
    skillPer: 2.10,
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
    // name: '火岩鼠',
    friendship: 12,
    sleepType: 2,
    skillType: 5,
    pokeType: 1,
    berryType: 10,
    helpSpeed: 3000,
    foodPer: 21.13,
    skillPer: 4.100
  },
  157: {
    id: 157,
    // name: '火爆獸',
    friendship: 20,
    sleepType: 2,
    skillType: 5,
    pokeType: 1,
    berryType: 10,
    helpSpeed: 2400,
    foodPer: 20.64,
    skillPer: 3.900
  },
  158: {
    id: 158,
    // name: '小鋸鱷',
    friendship: 5,
    sleepType: 3,
    skillType: 5,
    pokeType: 1,
    berryType: 1,
    helpSpeed: 4500,
    foodPer: 25.19,
    skillPer: 5.19,
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
    // name: '藍鱷',
    friendship: 12,
    sleepType: 3,
    skillType: 5,
    pokeType: 1,
    berryType: 1,
    helpSpeed: 3400,
    foodPer: 25.27,
    skillPer: 5.200
  },
  160: {
    id: 160,
    // name: '大力鱷',
    friendship: 20,
    sleepType: 3,
    skillType: 5,
    pokeType: 1,
    berryType: 1,
    helpSpeed: 2800,
    foodPer: 25.52,
    skillPer: 5.499
  },
  172: {
    id: 172,
    // name: '皮丘',
    friendship: 5,
    sleepType: 3,
    skillType: 1,
    pokeType: 1,
    berryType: 13,
    helpSpeed: 4300,
    foodPer: 20.92,
    skillPer: 2.29,
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
    // name: '皮寶寶',
    friendship: 5,
    sleepType: 3,
    skillType: 13,
    pokeType: 1,
    berryType: 12,
    helpSpeed: 5600,
    foodPer: 16.32,
    skillPer: 3.40,
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
    // name: '寶寶丁',
    friendship: 5,
    sleepType: 3,
    skillType: 8,
    pokeType: 3,
    berryType: 12,
    helpSpeed: 5200,
    foodPer: 16.90,
    skillPer: 3.80,
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
    // name: '波克比',
    friendship: 5,
    sleepType: 3,
    skillType: 13,
    pokeType: 3,
    berryType: 12,
    helpSpeed: 4800,
    foodPer: 14.95,
    skillPer: 4.91,
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
    // name: '波克基古',
    friendship: 12,
    sleepType: 2,
    skillType: 13,
    pokeType: 3,
    berryType: 12,
    helpSpeed: 3800,
    foodPer: 16.28,
    skillPer: 5.600
  },
  179: {
    id: 179,
    // name: '咩利羊',
    friendship: 5,
    sleepType: 2,
    skillType: 2,
    pokeType: 3,
    berryType: 13,
    helpSpeed: 4600,
    foodPer: 12.72,
    skillPer: 4.70,
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
    // name: '茸茸羊',
    friendship: 12,
    sleepType: 2,
    skillType: 2,
    pokeType: 3,
    berryType: 13,
    helpSpeed: 3300,
    foodPer: 12.69,
    skillPer: 4.600
  },
  181: {
    id: 181,
    // name: '電龍',
    friendship: 20,
    sleepType: 2,
    skillType: 2,
    pokeType: 3,
    berryType: 13,
    helpSpeed: 2500,
    foodPer: 12.95,
    skillPer: 4.700
  },
  185: {
    id: 185,
    // name: '樹才怪',
    friendship: 7,
    sleepType: 3,
    skillType: 2,
    pokeType: 3,
    berryType: 14,
    helpSpeed: 4000,
    foodPer: 21.77,
    skillPer: 7.199
  },
  196: {
    id: 196,
    // name: '太陽伊布',
    friendship: 20,
    sleepType: 2,
    skillType: 2,
    berryType: 6,
    pokeType: 3,
    helpSpeed: 2400,
    foodPer: 16.36,
    skillPer: 4.400
  },
  197: {
    id: 197,
    // name: '月亮伊布',
    friendship: 20,
    sleepType: 1,
    skillType: 7,
    pokeType: 3,
    berryType: 17,
    helpSpeed: 3200,
    foodPer: 21.83,
    skillPer: 14.100
  },
  199: {
    id: 199,
    // name: '呆呆王',
    friendship: 20,
    sleepType: 2,
    skillType: 4,
    pokeType: 3,
    berryType: 1,
    helpSpeed: 3400,
    foodPer: 16.55,
    skillPer: 7.400
  },
  202: {
    id: 202,
    // name: '果然翁',
    friendship: 7,
    sleepType: 2,
    skillType: 4,
    pokeType: 3,
    berryType: 6,
    helpSpeed: 3500,
    foodPer: 20.96,
    skillPer: 6.411
  },
  208: {
    id: 208,
    // name: '大鋼蛇',
    friendship: 20,
    sleepType: 3,
    skillType: 10,
    pokeType: 1,
    berryType: 2,
    helpSpeed: 3000,
    foodPer: 15.38,
    skillPer: 3.200
  },
  214: {
    id: 214,
    // name: '赫拉克羅斯',
    friendship: 16,
    sleepType: 1,
    skillType: 10,
    pokeType: 3,
    berryType: 9,
    helpSpeed: 2400,
    foodPer: 15.85,
    skillPer: 4.70,
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
    // name: '信使鳥',
    friendship: 16,
    sleepType: 1,
    skillType: 10,
    pokeType: 2,
    berryType: 16,
    helpSpeed: 2500,
    foodPer: 18.80,
    skillPer: 1.50,
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
    // name: '戴魯比',
    friendship: 5,
    sleepType: 1,
    skillType: 1,
    pokeType: 1,
    berryType: 17,
    helpSpeed: 4900,
    foodPer: 20.03,
    skillPer: 4.40,
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
    // name: '黑魯加',
    friendship: 12,
    sleepType: 1,
    skillType: 1,
    pokeType: 1,
    berryType: 17,
    helpSpeed: 3300,
    foodPer: 20.21,
    skillPer: 4.600
  },
  243: {
    id: 243,
    // name: '雷公',
    friendship: 30,
    sleepType: 2,
    skillType: 15,
    pokeType: 3,
    berryType: 13,
    helpSpeed: 2100,
    foodPer: 19.13,
    skillPer: 1.90,
    food: {
      type: [7, 6, 1],
      count: {
        7: {
          num: [1, 2, 4]
        },
        6: {
          num: [0, 2, 3]
        },
        1: {
          num: [0, 0, 2]
        }
      }
    }
  },
  244: {
    id: 244,
    // name: '炎帝',
    friendship: 30,
    sleepType: 2,
    skillType: 15,
    pokeType: 3,
    berryType: 10,
    helpSpeed: 2400,
    foodPer: 18.62,
    skillPer: 2.30,
    food: {
      type: [10, 12, 2],
      count: {
        10: {
          num: [1, 2, 4]
        },
        12: {
          num: [0, 2, 4]
        },
        2: {
          num: [0, 0, 3]
        }
      }
    }
  },
  246: {
    id: 246,
    // name: '幼基拉斯',
    friendship: 5,
    sleepType: 3,
    skillType: 7,
    pokeType: 2,
    berryType: 14,
    helpSpeed: 4800,
    foodPer: 23.76,
    skillPer: 4.09,
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
    // name: '沙基拉斯',
    friendship: 12,
    sleepType: 3,
    skillType: 7,
    pokeType: 2,
    berryType: 14,
    helpSpeed: 3600,
    foodPer: 24.68,
    skillPer: 4.500
  },
  248: {
    id: 248,
    // name: '班基拉斯',
    friendship: 25,
    sleepType: 1,
    skillType: 7,
    pokeType: 2,
    berryType: 17,
    helpSpeed: 2700,
    foodPer: 26.59,
    skillPer: 5.199
  },
  280: {
    id: 280,
    // name: '拉魯拉絲',
    friendship: 5,
    sleepType: 2,
    skillType: 8,
    pokeType: 3,
    berryType: 6,
    helpSpeed: 4800,
    foodPer: 14.54,
    skillPer: 4.30,
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
    // name: '奇魯莉安',
    friendship: 12,
    sleepType: 2,
    skillType: 8,
    pokeType: 3,
    berryType: 6,
    helpSpeed: 3500,
    foodPer: 14.62,
    skillPer: 4.300
  },
  282: {
    id: 282,
    // name: '沙奈朵',
    friendship: 20,
    sleepType: 2,
    skillType: 8,
    pokeType: 3,
    berryType: 6,
    helpSpeed: 2400,
    foodPer: 14.39,
    skillPer: 4.200
  },
  287: {
    id: 287,
    // name: '懶人獺',
    friendship: 5,
    sleepType: 2,
    skillType: 10,
    pokeType: 1,
    berryType: 11,
    helpSpeed: 4900,
    foodPer: 21.31,
    skillPer: 1.91,
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
    // name: '過動猿',
    friendship: 12,
    sleepType: 1,
    skillType: 10,
    pokeType: 1,
    berryType: 11,
    helpSpeed: 3200,
    foodPer: 20.36,
    skillPer: 1.500
  },
  289: {
    id: 289,
    // name: '請假王',
    friendship: 22,
    sleepType: 2,
    skillType: 10,
    pokeType: 1,
    berryType: 11,
    helpSpeed: 3800,
    foodPer: 33.87,
    skillPer: 6.700
  },
  302: {
    id: 302,
    // name: '勾魂眼',
    friendship: 16,
    sleepType: 1,
    skillType: 6,
    pokeType: 3,
    berryType: 17,
    helpSpeed: 3600,
    foodPer: 18.86,
    skillPer: 6.79,
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
    // name: '溶食獸',
    friendship: 5,
    sleepType: 1,
    skillType: 6,
    pokeType: 3,
    berryType: 5,
    helpSpeed: 5900,
    foodPer: 21.37,
    skillPer: 6.30,
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
    // name: '吞食獸',
    friendship: 12,
    sleepType: 1,
    skillType: 6,
    pokeType: 3,
    berryType: 5,
    helpSpeed: 3500,
    foodPer: 20.91,
    skillPer: 7.000
  },
  333: {
    id: 333,
    // name: '青綿鳥',
    friendship: 5,
    sleepType: 3,
    skillType: 7,
    pokeType: 1,
    berryType: 16,
    helpSpeed: 4200,
    foodPer: 17.56,
    skillPer: 3.21,
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
    // name: '七夕青鳥',
    friendship: 12,
    sleepType: 1,
    skillType: 7,
    pokeType: 1,
    berryType: 3,
    helpSpeed: 3700,
    foodPer: 25.63,
    skillPer: 6.099
  },
  353: {
    id: 353,
    // name: '怨影娃娃',
    friendship: 5,
    sleepType: 1,
    skillType: 5,
    pokeType: 1,
    berryType: 8,
    helpSpeed: 3900,
    berryType: 8,
    foodPer: 17.08,
    skillPer: 2.59,
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
    // name: '詛咒娃娃',
    friendship: 16,
    sleepType: 1,
    skillType: 5,
    pokeType: 1,
    berryType: 8,
    helpSpeed: 2600,
    berryType: 8,
    foodPer: 17.91,
    skillPer: 3.300
  },
  359: {
    id: 359,
    // name: '阿勃梭魯',
    friendship: 16,
    sleepType: 1,
    skillType: 1,
    pokeType: 2,
    berryType: 17,
    helpSpeed: 3100,
    foodPer: 17.80,
    skillPer: 3.79,
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
    // name: '小果然',
    friendship: 5,
    sleepType: 3,
    skillType: 4,
    pokeType: 3,
    helpSpeed: 5800,
    berryType: 6,
    foodPer: 21.23,
    skillPer: 5.90,
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
    // name: '海豹球',
    friendship: 5,
    sleepType: 3,
    skillType: 10,
    pokeType: 1,
    helpSpeed: 5600,
    berryType: 7,
    foodPer: 22.32,
    skillPer: 2.30,
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
    // name: '海魔獅',
    friendship: 12,
    sleepType: 3,
    skillType: 10,
    pokeType: 1,
    helpSpeed: 4000,
    berryType: 7,
    foodPer: 22.06,
    skillPer: 2.100
  },
  365: {
    id: 365,
    // name: '帝牙海獅',
    friendship: 20,
    sleepType: 3,
    skillType: 10,
    pokeType: 1,
    helpSpeed: 3000,
    berryType: 7,
    foodPer: 22.34,
    skillPer: 2.200
  },
  438: {
    id: 438,
    // name: '盆才怪',
    friendship: 5,
    sleepType: 3,
    skillType: 2,
    pokeType: 3,
    helpSpeed: 6300,
    berryType: 14,
    foodPer: 18.88,
    skillPer: 6.10,
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
    // name: '魔尼尼',
    friendship: 5,
    sleepType: 3,
    skillType: 1,
    pokeType: 2,
    berryType: 6,
    helpSpeed: 4300,
    foodPer: 20.08,
    skillPer: 3.19,
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
    // name: '利歐路',
    friendship: 5,
    sleepType: 3,
    skillType: 3,
    pokeType: 3,
    helpSpeed: 4200,
    berryType: 18,
    foodPer: 12.53,
    skillPer: 3.80,
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
    // name: '路卡利歐',
    friendship: 20,
    sleepType: 3,
    skillType: 3,
    pokeType: 3,
    helpSpeed: 2600,
    berryType: 18,
    foodPer: 14.94,
    skillPer: 5.100
  },
  453: {
    id: 453,
    // name: '不良蛙',
    friendship: 5,
    sleepType: 1,
    skillType: 1,
    pokeType: 2,
    berryType: 5,
    helpSpeed: 5600,
    foodPer: 22.74,
    skillPer: 4.19,
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
    // name: '毒骷蛙',
    friendship: 12,
    sleepType: 1,
    skillType: 1,
    pokeType: 2,
    berryType: 5,
    helpSpeed: 3400,
    foodPer: 22.86,
    skillPer: 4.300
  },
  459: {
    id: 459,
    // name: '雪笠怪',
    friendship: 5,
    sleepType: 3,
    skillType: 5,
    pokeType: 2,
    berryType: 7,
    helpSpeed: 5600,
    foodPer: 25.05,
    skillPer: 4.40,
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
    // name: '暴雪王',
    friendship: 12,
    sleepType: 3,
    skillType: 5,
    pokeType: 2,
    berryType: 7,
    helpSpeed: 3000,
    foodPer: 25.00,
    skillPer: 4.399
  },
  462: {
    id: 462,
    // name: '自爆磁怪',
    friendship: 22,
    sleepType: 3,
    skillType: 11,
    pokeType: 3,
    berryType: 2,
    helpSpeed: 3100,
    foodPer: 17.88,
    skillPer: 6.200
  },
  468: {
    id: 468,
    // name: '波克基斯',
    friendship: 22,
    sleepType: 2,
    skillType: 13,
    pokeType: 3,
    berryType: 12,
    helpSpeed: 2600,
    foodPer: 15.76,
    skillPer: 5.300
  },
  470: {
    id: 470,
    // name: '葉伊布',
    friendship: 20,
    sleepType: 1,
    skillType: 4,
    pokeType: 3,
    berryType: 4,
    helpSpeed: 3000,
    foodPer: 20.71,
    skillPer: 5.899
  },
  471: {
    id: 471,
    // name: '冰伊布',
    friendship: 20,
    sleepType: 3,
    skillType: 11,
    pokeType: 3,
    berryType: 7,
    helpSpeed: 3200,
    foodPer: 21.85,
    skillPer: 6.300
  },
  475: {
    id: 475,
    // name: '艾路雷朵',
    friendship: 22,
    sleepType: 3,
    skillType: 9,
    pokeType: 3,
    berryType: 18,
    helpSpeed: 2400,
    foodPer: 14.74,
    skillPer: 5.400
  },
  700: {
    id: 700,
    // name: '仙子伊布',
    friendship: 20,
    sleepType: 2,
    skillType: 8,
    pokeType: 3,
    berryType: 12,
    helpSpeed: 2600,
    foodPer: 17.77,
    skillPer: 4.000
  },
  702: {
    id: 702,
    // name: '咚咚鼠',
    friendship: 16,
    sleepType: 2,
    skillType: 14,
    pokeType: 3,
    berryType: 13,
    helpSpeed: 2500,
    foodPer: 17.73,
    skillPer: 4.50,
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
    // name: '童偶熊',
    friendship: 5,
    sleepType: 3,
    skillType: 5,
    pokeType: 2,
    helpSpeed: 4100,
    berryType: 18,
    foodPer: 22.47,
    skillPer: 1.10,
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
    // name: '穿著熊',
    friendship: 12,
    sleepType: 3,
    skillType: 5,
    pokeType: 2,
    helpSpeed: 2800,
    berryType: 18,
    foodPer: 22.89,
    skillPer: 1.310
  },
  764: {
    id: 764,
    // name: '花療環環',
    friendship: 16,
    sleepType: 2,
    skillType: 4,
    pokeType: 2,
    helpSpeed: 2500,
    berryType: 12,
    foodPer: 13.90,
    skillPer: 2.20,
    food: {
      type: [16, 11, 13],
      count: {
        16: {
          num: [2, 5, 7]
        },
        11: {
          num: [0, 6, 9]
        },
        13: {
          num: [0, 0, 7]
        }
      }
    }
  },
  845: {
    id: 845,
    // name: '古月鳥',
    friendship: 16,
    sleepType: 3,
    skillType: 14,
    pokeType: 2,
    helpSpeed: 2700,
    berryType: 16,
    foodPer: 16.48,
    skillPer: 3.30,
    food: {
      type: [10, 4, 3],
      count: {
        10: {
          num: [2, 5, 7]
        },
        4: {
          num: [0, 4, 7]
        },
        3: {
          num: [0, 0, 8]
        }
      }
    }
  },
  906: {
    id: 906,
    // name: '新葉喵',
    friendship: 5,
    sleepType: 1,
    skillType: 11,
    pokeType: 2,
    helpSpeed: 4600,
    berryType: 4,
    foodPer: 20.79,
    skillPer: 2.30,
    food: {
      type: [4, 8, 11],
      count: {
        4: {
          num: [2, 5, 7]
        },
        8: {
          num: [0, 6, 9]
        },
        11: {
          num: [0, 0, 8]
        }
      }
    }
  },
  907: {
    id: 907,
    // name: '蒂蕾喵',
    friendship: 12,
    sleepType: 1,
    skillType: 11,
    pokeType: 2,
    helpSpeed: 3500,
    berryType: 4,
    foodPer: 20.91,
    skillPer: 2.30
  },
  908: {
    id: 908,
    // name: '魔幻假面喵',
    friendship: 20,
    sleepType: 1,
    skillType: 11,
    pokeType: 2,
    helpSpeed: 2600,
    berryType: 17,
    foodPer: 19.00,
    skillPer: 2.20
  },
  909: {
    id: 909,
    // name: '呆火鱷',
    friendship: 5,
    sleepType: 2,
    skillType: 7,
    pokeType: 2,
    helpSpeed: 4200,
    berryType: 10,
    foodPer: 25.33,
    skillPer: 5.31,
    food: {
      type: [5, 7, 6],
      count: {
        5: {
          num: [2, 5, 7]
        },
        7: {
          num: [0, 4, 6]
        },
        6: {
          num: [0, 0, 5]
        }
      }
    }
  },
  910: {
    id: 910,
    // name: '炙燙鱷',
    friendship: 12,
    sleepType: 2,
    skillType: 7,
    pokeType: 2,
    helpSpeed: 3100,
    berryType: 10,
    foodPer: 24.69,
    skillPer: 5.00
  },
  911: {
    id: 911,
    // name: '骨紋巨聲鱷',
    friendship: 20,
    sleepType: 1,
    skillType: 7,
    pokeType: 2,
    helpSpeed: 2700,
    berryType: 8,
    foodPer: 26.79,
    skillPer: 6.20
  },
  912: {
    id: 912,
    // name: '潤水鴨',
    friendship: 5,
    sleepType: 3,
    skillType: 2,
    pokeType: 2,
    helpSpeed: 4600,
    berryType: 1,
    foodPer: 26.11,
    skillPer: 2.79,
    food: {
      type: [15, 1, 10],
      count: {
        15: {
          num: [2, 5, 7]
        },
        1: {
          num: [0, 2, 4]
        },
        10: {
          num: [0, 0, 6]
        }
      }
    }
  },
  913: {
    id: 913,
    // name: '湧躍鴨',
    friendship: 12,
    sleepType: 3,
    skillType: 2,
    pokeType: 2,
    helpSpeed: 3600,
    berryType: 1,
    foodPer: 25.92,
    skillPer: 2.69
  },
  914: {
    id: 914,
    // name: '狂歡浪舞鴨',
    friendship: 20,
    sleepType: 3,
    skillType: 2,
    pokeType: 2,
    helpSpeed: 2600,
    berryType: 18,
    foodPer: 23.23,
    skillPer: 2.4
  },
  9001: {
    id: 9001,
    // name: '皮卡丘（萬聖節）',
    friendship: 7,
    sleepType: 2,
    skillType: 5,
    pokeType: 1,
    berryType: 13,
    helpSpeed: 2600,
    berryType: 13,
    foodPer: 21.82,
    skillPer: 2.800
  },
  9002: {
    id: 9002,
    // name: '皮卡丘（佳節）',
    friendship: 7,
    sleepType: 2,
    skillType: 3,
    pokeType: 3,
    berryType: 13,
    helpSpeed: 2600,
    foodPer: 13.07,
    skillPer: 4.200
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
}, {
  time: '2024/04/1',
  pokemons: [764]
}, {
  time: '2024/05/1',
  pokemons: [37, 38, 244]
}, {
  time: '2024/06/1',
  pokemons: [845]
}, {
  time: '2024/07/1',
  pokemons: [906, 907, 908, 909, 910, 911, 912, 913, 914]
}]
// console.log(pokedex)
export {
  pokedex,
  updatePoke
}