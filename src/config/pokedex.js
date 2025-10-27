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
  [194, 195],
  [104, 105],
  [439, 122],
  [133, 134, 135, 136, 196, 197, 470, 471, 700, 9004],
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
  [912, 913, 914],
  [304, 305, 306],
  [403, 404, 405],
  [736, 737, 738],
  [425, 426],
  [215, 461],
  [921, 922, 923],
  [7006, 7007],
  [627, 628],
  [7054, 980],
  [517, 518],
  [440, 113, 242],
  [198, 430],
  [252, 253, 254],
  [255, 256, 257],
  [258, 259, 260],
  [848, 849, 8001],
  [177, 178],
  [710, 711, '710-2', '711-2', '710-3', '711-3', '710-4', '711-4']
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
    maxcarry: 11,
    helpSpeed: 4400,
    foodPer: 25.70,
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
    maxcarry: 14,
    helpSpeed: 3300,
    foodPer: 25.50,
    skillPer: 1.90
  },
  3: {
    id: 3,
    // name: '妙蛙花',
    friendship: 20,
    sleepType: 1,
    skillType: 10,
    pokeType: 2,
    berryType: 4,
    maxcarry: 17,
    helpSpeed: 2800,
    foodPer: 26.60,
    skillPer: 2.10
  },
  4: {
    id: 4,
    // name: '小火龍',
    friendship: 5,
    sleepType: 2,
    skillType: 10,
    pokeType: 2,
    berryType: 10,
    maxcarry: 12,
    helpSpeed: 3500,
    foodPer: 20.10,
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
    maxcarry: 15,
    helpSpeed: 3000,
    foodPer: 22.70,
    skillPer: 1.60
  },
  6: {
    id: 6,
    // name: '噴火龍',
    friendship: 20,
    sleepType: 2,
    skillType: 10,
    pokeType: 2,
    berryType: 10,
    maxcarry: 19,
    helpSpeed: 2400,
    foodPer: 22.40,
    skillPer: 1.60
  },
  7: {
    id: 7,
    // name: '傑尼龜',
    friendship: 5,
    sleepType: 3,
    skillType: 10,
    pokeType: 2,
    berryType: 1,
    maxcarry: 10,
    helpSpeed: 4500,
    foodPer: 27.10,
    skillPer: 2,
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
    maxcarry: 14,
    helpSpeed: 3400,
    foodPer: 27.10,
    skillPer: 2
  },
  9: {
    id: 9,
    // name: '水箭龜',
    friendship: 20,
    sleepType: 3,
    skillType: 10,
    pokeType: 2,
    berryType: 1,
    maxcarry: 17,
    helpSpeed: 2800,
    foodPer: 27.50,
    skillPer: 2.10
  },
  10: {
    id: 10,
    // name: '綠毛蟲',
    friendship: 5,
    sleepType: 1,
    skillType: 10,
    pokeType: 1,
    berryType: 9,
    maxcarry: 11,
    helpSpeed: 4400,
    foodPer: 17.90,
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
    maxcarry: 13,
    helpSpeed: 4200,
    foodPer: 20.80,
    skillPer: 1.80
  },
  12: {
    id: 12,
    // name: '巴大蝶',
    friendship: 15,
    sleepType: 1,
    skillType: 10,
    pokeType: 1,
    berryType: 9,
    maxcarry: 21,
    helpSpeed: 2500,
    foodPer: 19.70,
    skillPer: 1.40
  },
  19: {
    id: 19,
    // name: '小拉達',
    friendship: 5,
    sleepType: 2,
    skillType: 7,
    pokeType: 1,
    berryType: 11,
    maxcarry: 10,
    helpSpeed: 4900,
    foodPer: 23.70,
    skillPer: 3,
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
    maxcarry: 16,
    helpSpeed: 2950,
    foodPer: 23.70,
    skillPer: 3
  },
  23: {
    id: 23,
    // name: '阿柏蛇',
    friendship: 5,
    sleepType: 1,
    skillType: 7,
    pokeType: 1,
    berryType: 5,
    maxcarry: 10,
    helpSpeed: 5000,
    foodPer: 23.50,
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
    maxcarry: 14,
    helpSpeed: 3400,
    foodPer: 26.40,
    skillPer: 5.70
  },
  25: {
    id: 25,
    // name: '皮卡丘',
    friendship: 7,
    sleepType: 2,
    skillType: 1,
    pokeType: 1,
    berryType: 13,
    maxcarry: 17,
    helpSpeed: 2700,
    foodPer: 20.70,
    skillPer: 2.10
  },
  26: {
    id: 26,
    // name: '雷丘',
    friendship: 18,
    sleepType: 2,
    skillType: 1,
    pokeType: 1,
    berryType: 13,
    maxcarry: 21,
    helpSpeed: 2200,
    foodPer: 22.40,
    skillPer: 3.20
  },
  35: {
    id: 35,
    // name: '皮皮',
    friendship: 7,
    sleepType: 2,
    skillType: 13,
    pokeType: 1,
    berryType: 12,
    maxcarry: 16,
    helpSpeed: 4000,
    foodPer: 16.80,
    skillPer: 3.60
  },
  36: {
    id: 36,
    // name: '皮可西',
    friendship: 20,
    sleepType: 2,
    skillType: 13,
    pokeType: 1,
    berryType: 12,
    maxcarry: 24,
    helpSpeed: 2800,
    foodPer: 16.80,
    skillPer: 3.60
  },
  37: {
    id: 37,
    // name: '六尾',
    friendship: 5,
    sleepType: 2,
    skillType: 4,
    pokeType: 1,
    berryType: 10,
    maxcarry: 13,
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
    maxcarry: 23,
    helpSpeed: 2600,
    foodPer: 16.40,
    skillPer: 2.50
  },
  39: {
    id: 39,
    // name: '胖丁',
    friendship: 7,
    sleepType: 2,
    skillType: 8,
    pokeType: 3,
    berryType: 12,
    maxcarry: 9,
    helpSpeed: 3900,
    foodPer: 18.20,
    skillPer: 4.30
  },
  40: {
    id: 40,
    // name: '胖可丁',
    friendship: 16,
    sleepType: 2,
    skillType: 8,
    pokeType: 3,
    berryType: 12,
    maxcarry: 13,
    helpSpeed: 2900,
    foodPer: 17.40,
    skillPer: 4
  },
  50: {
    id: 50,
    // name: '地鼠',
    friendship: 5,
    sleepType: 2,
    skillType: 1,
    pokeType: 2,
    berryType: 15,
    maxcarry: 10,
    helpSpeed: 4300,
    foodPer: 19.20,
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
    maxcarry: 16,
    helpSpeed: 2650,
    foodPer: 19,
    skillPer: 2
  },
  52: {
    id: 52,
    // name: '喵喵',
    friendship: 5,
    sleepType: 2,
    skillType: 3,
    pokeType: 3,
    berryType: 11,
    maxcarry: 9,
    helpSpeed: 4400,
    foodPer: 16.30,
    skillPer: 4.20,
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
    maxcarry: 12,
    helpSpeed: 2800,
    foodPer: 16.90,
    skillPer: 4.40
  },
  54: {
    id: 54,
    // name: '可達鴨',
    friendship: 5,
    sleepType: 1,
    skillType: 5,
    pokeType: 3,
    berryType: 1,
    maxcarry: 8,
    helpSpeed: 5400,
    foodPer: 13.60,
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
    maxcarry: 14,
    helpSpeed: 3400,
    foodPer: 16.20,
    skillPer: 12.50
  },
  56: {
    id: 56,
    // name: '猴怪',
    friendship: 5,
    sleepType: 1,
    skillType: 5,
    pokeType: 1,
    berryType: 18,
    maxcarry: 12,
    helpSpeed: 4200,
    foodPer: 19.70,
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
    maxcarry: 17,
    helpSpeed: 2800,
    foodPer: 20,
    skillPer: 2.40
  },
  58: {
    id: 58,
    // name: '卡蒂狗',
    friendship: 5,
    sleepType: 2,
    skillType: 9,
    pokeType: 3,
    berryType: 10,
    maxcarry: 8,
    helpSpeed: 4300,
    foodPer: 13.80,
    skillPer: 5,
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
    maxcarry: 16,
    helpSpeed: 2500,
    foodPer: 13.60,
    skillPer: 4.90
  },
  69: {
    id: 69,
    // name: '喇叭芽',
    friendship: 5,
    sleepType: 1,
    skillType: 7,
    pokeType: 2,
    berryType: 4,
    maxcarry: 8,
    helpSpeed: 5200,
    foodPer: 23.30,
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
    maxcarry: 12,
    helpSpeed: 3800,
    foodPer: 23.50,
    skillPer: 4
  },
  71: {
    id: 71,
    // name: '大食花',
    friendship: 20,
    sleepType: 1,
    skillType: 7,
    pokeType: 2,
    berryType: 4,
    maxcarry: 17,
    helpSpeed: 2800,
    foodPer: 23.30,
    skillPer: 3.90
  },
  74: {
    id: 74,
    // name: '小拳石',
    friendship: 5,
    sleepType: 3,
    skillType: 5,
    pokeType: 2,
    berryType: 14,
    maxcarry: 9,
    helpSpeed: 5700,
    foodPer: 28.10,
    skillPer: 5.20,
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
    maxcarry: 12,
    helpSpeed: 4000,
    foodPer: 27.20,
    skillPer: 4.80
  },
  76: {
    id: 76,
    // name: '隆隆岩',
    friendship: 22,
    sleepType: 3,
    skillType: 5,
    pokeType: 2,
    berryType: 14,
    maxcarry: 16,
    helpSpeed: 3100,
    foodPer: 28,
    skillPer: 5.20
  },
  79: {
    id: 79,
    // name: '呆呆獸',
    friendship: 5,
    sleepType: 2,
    skillType: 4,
    pokeType: 3,
    berryType: 1,
    maxcarry: 9,
    helpSpeed: 5700,
    foodPer: 15.10,
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
    maxcarry: 16,
    helpSpeed: 3800,
    foodPer: 19.70,
    skillPer: 6.80
  },
  81: {
    id: 81,
    // name: '小磁怪',
    friendship: 5,
    sleepType: 3,
    skillType: 11,
    pokeType: 3,
    berryType: 2,
    maxcarry: 8,
    helpSpeed: 5800,
    foodPer: 18.20,
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
    maxcarry: 11,
    helpSpeed: 4000,
    foodPer: 18.20,
    skillPer: 6.30
  },
  83: {
    id: 83,
    // name: '大蔥鴨',
    friendship: 16,
    sleepType: 3,
    skillType: 1,
    pokeType: 2,
    berryType: 16,
    maxcarry: 18,
    helpSpeed: 3000,
    foodPer: 16,
    skillPer: 4.30,
    food: {
      type: [1, 7, 11],
      count: {
        1: {
          num: [2, 5, 7]
        },
        7: {
          num: [0, 8, 13]
        },
        11: {
          num: [0, 0, 12]
        }
      }
    }
  },
  84: {
    id: 84,
    // name: '嘟嘟',
    friendship: 5,
    sleepType: 3,
    skillType: 7,
    pokeType: 1,
    berryType: 16,
    maxcarry: 13,
    helpSpeed: 3800,
    foodPer: 18.40,
    skillPer: 2,
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
    maxcarry: 21,
    helpSpeed: 2300,
    foodPer: 18.40,
    skillPer: 2
  },
  92: {
    id: 92,
    // name: '鬼斯',
    friendship: 5,
    sleepType: 1,
    skillType: 5,
    pokeType: 2,
    berryType: 8,
    maxcarry: 10,
    helpSpeed: 3800,
    foodPer: 14.40,
    skillPer: 1.50,
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
    maxcarry: 14,
    helpSpeed: 3000,
    foodPer: 15.70,
    skillPer: 2.20
  },
  94: {
    id: 94,
    // name: '耿鬼',
    friendship: 22,
    sleepType: 1,
    skillType: 5,
    pokeType: 2,
    berryType: 8,
    maxcarry: 18,
    helpSpeed: 2200,
    foodPer: 16.10,
    skillPer: 2.40
  },
  95: {
    id: 95,
    // name: '大岩蛇',
    friendship: 16,
    sleepType: 3,
    skillType: 10,
    pokeType: 1,
    maxcarry: 22,
    helpSpeed: 3100,
    berryType: 14,
    foodPer: 13.20,
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
    maxcarry: 10,
    helpSpeed: 4800,
    foodPer: 22.30,
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
    maxcarry: 15,
    helpSpeed: 3300,
    foodPer: 22.50,
    skillPer: 4.50
  },
  113: {
    id: 113,
    // name: '吉利蛋',
    friendship: 16,
    sleepType: 2,
    skillType: 8,
    pokeType: 2,
    berryType: 11,
    maxcarry: 15,
    helpSpeed: 3300,
    foodPer: 23.60,
    skillPer: 2.30
  },
  115: {
    id: 115,
    // name: '袋獸',
    friendship: 16,
    sleepType: 2,
    skillType: 10,
    pokeType: 2,
    berryType: 11,
    maxcarry: 21,
    helpSpeed: 2650,
    foodPer: 22.20,
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
    skillType: 20,
    pokeType: 2,
    berryType: 6,
    maxcarry: 17,
    helpSpeed: 2800,
    foodPer: 21.60,
    skillPer: 3.90
  },
  127: {
    id: 127,
    // name: '凱羅斯',
    friendship: 16,
    sleepType: 1,
    skillType: 1,
    pokeType: 2,
    berryType: 9,
    maxcarry: 24,
    helpSpeed: 2400,
    foodPer: 21.60,
    skillPer: 3.10,
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
    skillType: 19,
    pokeType: 2,
    berryType: 11,
    maxcarry: 17,
    helpSpeed: 3500,
    foodPer: 20.10,
    skillPer: 3.60,
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
    maxcarry: 12,
    helpSpeed: 3700,
    foodPer: 19.20,
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
    maxcarry: 13,
    helpSpeed: 3100,
    foodPer: 21.20,
    skillPer: 6.10
  },
  135: {
    id: 135,
    // name: '雷伊布',
    friendship: 20,
    sleepType: 2,
    skillType: 9,
    pokeType: 3,
    berryType: 13,
    maxcarry: 17,
    helpSpeed: 2200,
    foodPer: 15.10,
    skillPer: 3.90
  },
  136: {
    id: 136,
    // name: '火伊布',
    friendship: 20,
    sleepType: 2,
    skillType: 11,
    pokeType: 3,
    berryType: 10,
    maxcarry: 14,
    helpSpeed: 2700,
    foodPer: 18.50,
    skillPer: 5.20
  },
  147: {
    id: 147,
    // name: '迷你龍',
    friendship: 5,
    sleepType: 1,
    skillType: 7,
    pokeType: 2,
    berryType: 3,
    maxcarry: 9,
    helpSpeed: 5000,
    foodPer: 25,
    skillPer: 2,
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
    maxcarry: 12,
    helpSpeed: 3800,
    foodPer: 26.20,
    skillPer: 2.50
  },
  149: {
    id: 149,
    // name: '快龍',
    friendship: 25,
    sleepType: 1,
    skillType: 7,
    pokeType: 2,
    berryType: 3,
    maxcarry: 20,
    helpSpeed: 2600,
    foodPer: 26.40,
    skillPer: 2.60
  },
  152: {
    id: 152,
    // name: '菊草葉',
    friendship: 5,
    sleepType: 1,
    skillType: 5,
    pokeType: 1,
    berryType: 4,
    maxcarry: 12,
    helpSpeed: 4400,
    foodPer: 16.90,
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
    maxcarry: 17,
    helpSpeed: 3300,
    foodPer: 16.80,
    skillPer: 3.80
  },
  154: {
    id: 154,
    // name: '大竺葵',
    friendship: 20,
    sleepType: 1,
    skillType: 5,
    pokeType: 1,
    berryType: 4,
    maxcarry: 20,
    helpSpeed: 2800,
    foodPer: 17.50,
    skillPer: 4.60
  },
  155: {
    id: 155,
    // name: '火球鼠',
    friendship: 5,
    sleepType: 2,
    skillType: 5,
    pokeType: 1,
    berryType: 10,
    maxcarry: 14,
    helpSpeed: 3500,
    foodPer: 18.60,
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
    maxcarry: 18,
    helpSpeed: 3000,
    foodPer: 21.10,
    skillPer: 4.10
  },
  157: {
    id: 157,
    // name: '火爆獸',
    friendship: 20,
    sleepType: 2,
    skillType: 5,
    pokeType: 1,
    berryType: 10,
    maxcarry: 23,
    helpSpeed: 2400,
    foodPer: 20.80,
    skillPer: 3.90
  },
  158: {
    id: 158,
    // name: '小鋸鱷',
    friendship: 5,
    sleepType: 3,
    skillType: 5,
    pokeType: 1,
    berryType: 1,
    maxcarry: 11,
    helpSpeed: 4500,
    foodPer: 25.30,
    skillPer: 5.20,
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
    maxcarry: 15,
    helpSpeed: 3400,
    foodPer: 25.30,
    skillPer: 5.20
  },
  160: {
    id: 160,
    // name: '大力鱷',
    friendship: 20,
    sleepType: 3,
    skillType: 5,
    pokeType: 1,
    berryType: 1,
    maxcarry: 19,
    helpSpeed: 2800,
    foodPer: 25.70,
    skillPer: 5.50
  },
  172: {
    id: 172,
    // name: '皮丘',
    friendship: 5,
    sleepType: 3,
    skillType: 1,
    pokeType: 1,
    berryType: 13,
    maxcarry: 10,
    helpSpeed: 4300,
    foodPer: 21,
    skillPer: 2.30,
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
    maxcarry: 10,
    helpSpeed: 5600,
    foodPer: 16.40,
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
    maxcarry: 8,
    helpSpeed: 5200,
    foodPer: 17,
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
    maxcarry: 8,
    helpSpeed: 4800,
    foodPer: 15.10,
    skillPer: 4.90,
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
    maxcarry: 10,
    helpSpeed: 3800,
    foodPer: 16.30,
    skillPer: 5.60
  },
  177: {
    id: 177,
    // name: '天然雀',
    friendship: 5,
    sleepType: 2,
    skillType: 10,
    pokeType: 1,
    berryType: 6,
    maxcarry: 11,
    helpSpeed: 4500,
    foodPer: 18.50,
    skillPer: 1.60,
    food: {
      type: [3, 13, 5],
      count: {
        3: {
          num: [1, 2, 4]
        },
        13: {
          num: [0, 2, 3]
        },
        5: {
          num: [0, 0, 5]
        }
      }
    }
  },
  178: {
    id: 178,
    // name: '天然鳥',
    friendship: 12,
    sleepType: 2,
    skillType: 10,
    pokeType: 1,
    berryType: 6,
    maxcarry: 19,
    helpSpeed: 2500,
    foodPer: 19.10,
    skillPer: 2.50
  },
  179: {
    id: 179,
    // name: '咩利羊',
    friendship: 5,
    sleepType: 2,
    skillType: 2,
    pokeType: 3,
    berryType: 13,
    maxcarry: 9,
    helpSpeed: 4600,
    foodPer: 12.80,
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
    maxcarry: 11,
    helpSpeed: 3300,
    foodPer: 12.70,
    skillPer: 4.60
  },
  181: {
    id: 181,
    // name: '電龍',
    friendship: 20,
    sleepType: 2,
    skillType: 2,
    pokeType: 3,
    berryType: 13,
    maxcarry: 15,
    helpSpeed: 2500,
    foodPer: 13,
    skillPer: 4.70
  },
  185: {
    id: 185,
    // name: '樹才怪',
    friendship: 7,
    sleepType: 3,
    skillType: 2,
    pokeType: 3,
    berryType: 14,
    maxcarry: 16,
    helpSpeed: 4000,
    foodPer: 21.70,
    skillPer: 7.20
  },
  194: {
    id: 194,
    // name: '烏波',
    friendship: 5,
    sleepType: 3,
    skillType: 7,
    pokeType: 2,
    berryType: 1,
    maxcarry: 10,
    helpSpeed: 5900,
    foodPer: 20.10,
    skillPer: 3.80,
    food: {
      type: [2, 4, 7],
      count: {
        2: {
          num: [2, 5, 7]
        },
        4: {
          num: [0, 6, 10]
        },
        7: {
          num: [0, 0, 12]
        }
      }
    }
  },
  195: {
    id: 195,
    // name: '沼王',
    friendship: 12,
    sleepType: 3,
    skillType: 7,
    pokeType: 2,
    berryType: 1,
    maxcarry: 16,
    helpSpeed: 3400,
    foodPer: 19,
    skillPer: 3.20
  },
  196: {
    id: 196,
    // name: '太陽伊布',
    friendship: 20,
    sleepType: 2,
    skillType: 2,
    berryType: 6,
    pokeType: 3,
    maxcarry: 16,
    helpSpeed: 2400,
    foodPer: 16.40,
    skillPer: 4.40
  },
  197: {
    id: 197,
    // name: '月亮伊布',
    friendship: 20,
    sleepType: 1,
    skillType: 18,
    pokeType: 3,
    berryType: 17,
    maxcarry: 14,
    helpSpeed: 3200,
    foodPer: 21.90,
    skillPer: 10.10
  },
  198: {
    id: 198,
    // name: '黑暗鴉',
    friendship: 16,
    sleepType: 1,
    skillType: 24,
    pokeType: 3,
    maxcarry: 13,
    helpSpeed: 3600,
    berryType: 17,
    foodPer: 14.10,
    skillPer: 6.20,
    food: {
      type: [17, 15, 6],
      count: {
        17: {
          num: [1, 2, 4]
        },
        15: {
          num: [0, 3, 6]
        },
        6: {
          num: [0, 0, 4]
        }
      }
    }
  },
  199: {
    id: 199,
    // name: '呆呆王',
    friendship: 20,
    sleepType: 2,
    skillType: 4,
    pokeType: 3,
    berryType: 1,
    maxcarry: 17,
    helpSpeed: 3400,
    foodPer: 16.60,
    skillPer: 7.40
  },
  202: {
    id: 202,
    // name: '果然翁',
    friendship: 7,
    sleepType: 2,
    skillType: 4,
    pokeType: 3,
    berryType: 6,
    maxcarry: 16,
    helpSpeed: 3500,
    foodPer: 21.10,
    skillPer: 7
  },
  208: {
    id: 208,
    // name: '大鋼蛇',
    friendship: 20,
    sleepType: 3,
    skillType: 10,
    pokeType: 1,
    berryType: 2,
    maxcarry: 25,
    helpSpeed: 3000,
    foodPer: 15.40,
    skillPer: 3.20
  },
  214: {
    id: 214,
    // name: '赫拉克羅斯',
    friendship: 16,
    sleepType: 1,
    skillType: 10,
    pokeType: 3,
    berryType: 9,
    maxcarry: 20,
    helpSpeed: 2300,
    foodPer: 15.80,
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
  215: {
    id: 215,
    // name: '狃拉',
    friendship: 16,
    sleepType: 1,
    skillType: 14,
    pokeType: 1,
    berryType: 17,
    maxcarry: 17,
    helpSpeed: 3200,
    foodPer: 25.50,
    skillPer: 1.90,
    food: {
      type: [7, 3, 15],
      count: {
        7: {
          num: [1, 2, 4]
        },
        3: {
          num: [0, 2, 3]
        },
        15: {
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
    maxcarry: 20,
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
    skillType: 2,
    pokeType: 1,
    berryType: 17,
    maxcarry: 10,
    helpSpeed: 4900,
    foodPer: 20.10,
    skillPer: 3.70,
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
    skillType: 2,
    pokeType: 1,
    berryType: 17,
    maxcarry: 16,
    helpSpeed: 3300,
    foodPer: 20.30,
    skillPer: 4
  },
  242: {
    id: 242,
    // name: '幸福蛋',
    friendship: 20,
    sleepType: 2,
    skillType: 8,
    pokeType: 2,
    berryType: 11,
    maxcarry: 21,
    helpSpeed: 3100,
    foodPer: 23.80,
    skillPer: 2.30
  },
  243: {
    id: 243,
    // name: '雷公',
    friendship: 30,
    sleepType: 2,
    skillType: 15,
    pokeType: 3,
    berryType: 13,
    maxcarry: 22,
    helpSpeed: 2100,
    foodPer: 19.20,
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
    maxcarry: 19,
    helpSpeed: 2400,
    foodPer: 18.70,
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
  245: {
    id: 245,
    // name: '水君',
    friendship: 30,
    sleepType: 3,
    skillType: 15,
    pokeType: 3,
    berryType: 1,
    maxcarry: 17,
    helpSpeed: 2700,
    foodPer: 27.70,
    skillPer: 2.60,
    food: {
      type: [5, 10, 16],
      count: {
        5: {
          num: [1, 2, 4]
        },
        10: {
          num: [0, 2, 3]
        },
        16: {
          num: [0, 0, 2]
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
    maxcarry: 9,
    helpSpeed: 4800,
    foodPer: 23.80,
    skillPer: 4.10,
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
    maxcarry: 13,
    helpSpeed: 3600,
    foodPer: 24.70,
    skillPer: 4.50
  },
  248: {
    id: 248,
    // name: '班基拉斯',
    friendship: 25,
    sleepType: 1,
    skillType: 7,
    pokeType: 2,
    berryType: 17,
    maxcarry: 19,
    helpSpeed: 2700,
    foodPer: 26.60,
    skillPer: 5.20
  },
  252: {
    id: 252,
    // name: '木守宮',
    friendship: 5,
    sleepType: 1,
    skillType: 21,
    pokeType: 3,
    berryType: 4,
    maxcarry: 8,
    helpSpeed: 4500,
    foodPer: 17.20,
    skillPer: 3.50,
    food: {
      type: [3, 17, 1],
      count: {
        3: {
          num: [1, 2, 4]
        },
        17: {
          num: [0, 2, 3]
        },
        1: {
          num: [0, 0, 2]
        }
      }
    }
  },
  253: {
    id: 253,
    // name: '森林蜥蜴',
    friendship: 12,
    sleepType: 1,
    skillType: 21,
    pokeType: 3,
    berryType: 4,
    maxcarry: 11,
    helpSpeed: 3300,
    foodPer: 15,
    skillPer: 3.50
  },
  254: {
    id: 254,
    // name: '蜥蜴王',
    friendship: 20,
    sleepType: 1,
    skillType: 21,
    pokeType: 3,
    berryType: 4,
    maxcarry: 17,
    helpSpeed: 2300,
    foodPer: 10.70,
    skillPer: 3
  },
  255: {
    id: 255,
    // name: '火稚雞',
    friendship: 5,
    sleepType: 2,
    skillType: 7,
    pokeType: 1,
    berryType: 10,
    maxcarry: 12,
    helpSpeed: 4300,
    foodPer: 16,
    skillPer: 4.4,
    food: {
      type: [2, 15, 10],
      count: {
        2: {
          num: [1, 2, 4]
        },
        15: {
          num: [0, 4, 6]
        },
        10: {
          num: [0, 0, 5]
        }
      }
    }
  },
  256: {
    id: 256,
    // name: '力壯雞',
    friendship: 12,
    sleepType: 3,
    skillType: 7,
    pokeType: 1,
    berryType: 18,
    maxcarry: 16,
    helpSpeed: 3400,
    foodPer: 17,
    skillPer: 5.20
  },
  257: {
    id: 257,
    // name: '火焰雞',
    friendship: 20,
    sleepType: 3,
    skillType: 7,
    pokeType: 1,
    berryType: 18,
    maxcarry: 22,
    helpSpeed: 2600,
    foodPer: 15.30,
    skillPer: 4.90
  },
  258: {
    id: 258,
    // name: '水躍魚',
    friendship: 5,
    sleepType: 3,
    skillType: 14,
    pokeType: 1,
    berryType: 1,
    maxcarry: 11,
    helpSpeed: 4700,
    foodPer: 19.20,
    skillPer: 2.4,
    food: {
      type: [16, 8, 2],
      count: {
        16: {
          num: [1, 2, 4]
        },
        8: {
          num: [0, 3, 5]
        },
        2: {
          num: [0, 0, 3]
        }
      }
    }
  },
  259: {
    id: 259,
    // name: '沼躍魚',
    friendship: 12,
    sleepType: 3,
    skillType: 14,
    pokeType: 1,
    berryType: 15,
    maxcarry: 16,
    helpSpeed: 3500,
    foodPer: 16.80,
    skillPer: 2.80
  },
  260: {
    id: 260,
    // name: '巨沼怪',
    friendship: 20,
    sleepType: 3,
    skillType: 14,
    pokeType: 1,
    berryType: 15,
    maxcarry: 20,
    helpSpeed: 2800,
    foodPer: 14.60,
    skillPer: 3.40
  },
  280: {
    id: 280,
    // name: '拉魯拉絲',
    friendship: 5,
    sleepType: 2,
    skillType: 8,
    pokeType: 3,
    berryType: 6,
    maxcarry: 9,
    helpSpeed: 4800,
    foodPer: 14.50,
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
    maxcarry: 13,
    helpSpeed: 3500,
    foodPer: 14.60,
    skillPer: 4.30
  },
  282: {
    id: 282,
    // name: '沙奈朵',
    friendship: 20,
    sleepType: 2,
    skillType: 8,
    pokeType: 3,
    berryType: 6,
    maxcarry: 18,
    helpSpeed: 2400,
    foodPer: 14.40,
    skillPer: 4.20
  },
  287: {
    id: 287,
    // name: '懶人獺',
    friendship: 5,
    sleepType: 2,
    skillType: 10,
    pokeType: 1,
    berryType: 11,
    maxcarry: 7,
    helpSpeed: 4900,
    foodPer: 21.60,
    skillPer: 1.90,
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
    maxcarry: 9,
    helpSpeed: 3200,
    foodPer: 20.40,
    skillPer: 1.50
  },
  289: {
    id: 289,
    // name: '請假王',
    friendship: 22,
    sleepType: 2,
    skillType: 10,
    pokeType: 1,
    berryType: 11,
    maxcarry: 16,
    helpSpeed: 3600,
    foodPer: 33.90,
    skillPer: 6.70
  },
  302: {
    id: 302,
    // name: '勾魂眼',
    friendship: 16,
    sleepType: 1,
    skillType: 6,
    pokeType: 3,
    berryType: 17,
    maxcarry: 16,
    helpSpeed: 3600,
    foodPer: 18.80,
    skillPer: 6.80,
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
  303: {
    id: 303,
    // name: '大嘴娃',
    friendship: 16,
    sleepType: 3,
    skillType: 25,
    pokeType: 2,
    berryType: 2,
    maxcarry: 17,
    helpSpeed: 3200,
    foodPer: 20.40,
    skillPer: 3.80,
    food: {
      type: [10, 16, 12],
      count: {
        10: {
          num: [2, 5, 7]
        },
        16: {
          num: [0, 4, 6]
        },
        12: {
          num: [0, 0, 8]
        }
      }
    }
  },
  304: {
    id: 304,
    // name: '可可多拉',
    friendship: 5,
    sleepType: 3,
    skillType: 7,
    pokeType: 2,
    berryType: 2,
    maxcarry: 10,
    helpSpeed: 5700,
    foodPer: 27.30,
    skillPer: 4.60,
    food: {
      type: [7, 17, 15],
      count: {
        7: {
          num: [2, 5, 7]
        },
        17: {
          num: [0, 3, 5]
        },
        15: {
          num: [0, 0, 7]
        }
      }
    }
  },
  305: {
    id: 305,
    // name: '可多拉',
    friendship: 12,
    sleepType: 3,
    skillType: 7,
    pokeType: 2,
    berryType: 2,
    maxcarry: 13,
    helpSpeed: 4200,
    foodPer: 27.70,
    skillPer: 4.80
  },
  306: {
    id: 306,
    // name: '波士可多拉',
    friendship: 20,
    sleepType: 3,
    skillType: 7,
    pokeType: 2,
    berryType: 2,
    maxcarry: 18,
    helpSpeed: 3000,
    foodPer: 28.50,
    skillPer: 5.20
  },
  311: {
    id: 311,
    // name: '正電拍拍',
    friendship: 10,
    sleepType: 2,
    skillType: 26,
    pokeType: 3,
    berryType: 13,
    maxcarry: 16,
    helpSpeed: 2400,
    foodPer: 10.30,
    skillPer: 4.90,
    food: {
      type: [17, 1, 8],
      count: {
        17: {
          num: [1, 2, 4]
        },
        1: {
          num: [0, 2, 3]
        },
        8: {
          num: [0, 0, 6]
        }
      }
    }
  },
  312: {
    id: 312,
    // name: '負電拍拍',
    friendship: 10,
    sleepType: 2,
    skillType: 27,
    pokeType: 3,
    berryType: 13,
    maxcarry: 16,
    helpSpeed: 2400,
    foodPer: 17.40,
    skillPer: 4.90,
    food: {
      type: [9, 3, 8],
      count: {
        9: {
          num: [1, 2, 4]
        },
        3: {
          num: [0, 2, 3]
        },
        8: {
          num: [0, 0, 4]
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
    maxcarry: 8,
    helpSpeed: 5900,
    foodPer: 21.40,
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
    maxcarry: 19,
    helpSpeed: 3500,
    foodPer: 21,
    skillPer: 7
  },
  333: {
    id: 333,
    // name: '青綿鳥',
    friendship: 5,
    sleepType: 3,
    skillType: 7,
    pokeType: 1,
    berryType: 16,
    maxcarry: 12,
    helpSpeed: 4200,
    foodPer: 17.70,
    skillPer: 3.20,
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
    maxcarry: 14,
    helpSpeed: 3500,
    foodPer: 25.80,
    skillPer: 6.10
  },
  353: {
    id: 353,
    // name: '怨影娃娃',
    friendship: 5,
    sleepType: 1,
    skillType: 5,
    pokeType: 1,
    berryType: 8,
    maxcarry: 11,
    helpSpeed: 3900,
    berryType: 8,
    foodPer: 17.10,
    skillPer: 2.60,
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
    maxcarry: 19,
    helpSpeed: 2600,
    berryType: 8,
    foodPer: 17.90,
    skillPer: 3.30
  },
  359: {
    id: 359,
    // name: '阿勃梭魯',
    friendship: 16,
    sleepType: 1,
    skillType: 1,
    pokeType: 2,
    berryType: 17,
    maxcarry: 21,
    helpSpeed: 2950,
    foodPer: 17.80,
    skillPer: 3.80,
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
    maxcarry: 7,
    helpSpeed: 5800,
    berryType: 6,
    foodPer: 21.30,
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
    maxcarry: 9,
    helpSpeed: 5600,
    berryType: 7,
    foodPer: 22.40,
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
    maxcarry: 13,
    helpSpeed: 4000,
    berryType: 7,
    foodPer: 22.10,
    skillPer: 2.10
  },
  365: {
    id: 365,
    // name: '帝牙海獅',
    friendship: 20,
    sleepType: 3,
    skillType: 10,
    pokeType: 1,
    maxcarry: 18,
    helpSpeed: 3000,
    berryType: 7,
    foodPer: 22.30,
    skillPer: 2.20
  },
  403: {
    id: 403,
    // name: '小貓怪',
    friendship: 5,
    sleepType: 2,
    skillType: 11,
    pokeType: 2,
    berryType: 13,
    maxcarry: 11,
    helpSpeed: 4400,
    foodPer: 18.10,
    skillPer: 1.80,
    food: {
      type: [12, 10, 17],
      count: {
        12: {
          num: [2, 5, 7]
        },
        10: {
          num: [0, 4, 7]
        },
        17: {
          num: [0, 0, 5]
        }
      }
    }
  },
  404: {
    id: 404,
    // name: '勒克貓',
    friendship: 12,
    sleepType: 2,
    skillType: 11,
    pokeType: 2,
    berryType: 13,
    maxcarry: 16,
    helpSpeed: 3200,
    foodPer: 18.20,
    skillPer: 1.80
  },
  405: {
    id: 405,
    // name: '倫琴貓',
    friendship: 20,
    sleepType: 2,
    skillType: 11,
    pokeType: 2,
    berryType: 13,
    maxcarry: 21,
    helpSpeed: 2400,
    foodPer: 20,
    skillPer: 2.30
  },
  425: {
    id: 425,
    // name: '飄飄球',
    friendship: 5,
    sleepType: 1,
    skillType: 16,
    pokeType: 3,
    maxcarry: 9,
    helpSpeed: 4800,
    berryType: 8,
    foodPer: 13.70,
    skillPer: 6.90,
    food: {
      type: [16, 10, 4],
      count: {
        16: {
          num: [1, 2, 4]
        },
        10: {
          num: [0, 3, 4]
        },
        4: {
          num: [0, 0, 4]
        }
      }
    }
  },
  426: {
    id: 426,
    // name: '隨風球',
    friendship: 12,
    sleepType: 1,
    skillType: 16,
    pokeType: 3,
    maxcarry: 17,
    helpSpeed: 2500,
    berryType: 8,
    foodPer: 12.80,
    skillPer: 6.10
  },
  430: {
    id: 430,
    // name: '烏鴉頭頭',
    friendship: 20,
    sleepType: 1,
    skillType: 24,
    pokeType: 3,
    maxcarry: 18,
    helpSpeed: 3200,
    berryType: 17,
    foodPer: 14.30,
    skillPer: 6.70
  },
  438: {
    id: 438,
    // name: '盆才怪',
    friendship: 5,
    sleepType: 3,
    skillType: 2,
    pokeType: 3,
    maxcarry: 8,
    helpSpeed: 6300,
    berryType: 14,
    foodPer: 18.90,
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
    skillType: 20,
    pokeType: 2,
    berryType: 6,
    maxcarry: 10,
    helpSpeed: 4300,
    foodPer: 20.10,
    skillPer: 3.20,
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
  440: {
    id: 440,
    // name: '小福蛋',
    friendship: 5,
    sleepType: 3,
    skillType: 8,
    pokeType: 2,
    berryType: 11,
    maxcarry: 7,
    helpSpeed: 5400,
    foodPer: 21,
    skillPer: 1.30,
    food: {
      type: [3, 4, 9],
      count: {
        3: {
          num: [2, 5, 7]
        },
        4: {
          num: [0, 4, 7]
        },
        9: {
          num: [0, 0, 8]
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
    maxcarry: 9,
    helpSpeed: 4200,
    berryType: 18,
    foodPer: 12.60,
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
    maxcarry: 14,
    helpSpeed: 2600,
    berryType: 18,
    foodPer: 15,
    skillPer: 5.10
  },
  453: {
    id: 453,
    // name: '不良蛙',
    friendship: 5,
    sleepType: 1,
    skillType: 1,
    pokeType: 2,
    berryType: 5,
    maxcarry: 10,
    helpSpeed: 5600,
    foodPer: 22.80,
    skillPer: 4.20,
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
    maxcarry: 14,
    helpSpeed: 3400,
    foodPer: 22.90,
    skillPer: 4.30
  },
  459: {
    id: 459,
    // name: '雪笠怪',
    friendship: 5,
    sleepType: 3,
    skillType: 5,
    pokeType: 2,
    berryType: 7,
    maxcarry: 10,
    helpSpeed: 5600,
    foodPer: 25.10,
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
    maxcarry: 21,
    helpSpeed: 3000,
    foodPer: 25,
    skillPer: 4.40
  },
  461: {
    id: 461,
    // name: '瑪狃拉',
    friendship: 20,
    sleepType: 1,
    skillType: 14,
    pokeType: 1,
    berryType: 17,
    maxcarry: 21,
    helpSpeed: 2700,
    foodPer: 25.10,
    skillPer: 1.80
  },
  462: {
    id: 462,
    // name: '自爆磁怪',
    friendship: 22,
    sleepType: 3,
    skillType: 11,
    pokeType: 3,
    berryType: 2,
    maxcarry: 13,
    helpSpeed: 3100,
    foodPer: 17.90,
    skillPer: 6.20
  },
  468: {
    id: 468,
    // name: '波克基斯',
    friendship: 22,
    sleepType: 2,
    skillType: 13,
    pokeType: 3,
    berryType: 12,
    maxcarry: 16,
    helpSpeed: 2600,
    foodPer: 15.80,
    skillPer: 5.30
  },
  470: {
    id: 470,
    // name: '葉伊布',
    friendship: 20,
    sleepType: 1,
    skillType: 4,
    pokeType: 3,
    berryType: 4,
    maxcarry: 13,
    helpSpeed: 3000,
    foodPer: 20.50,
    skillPer: 5.90
  },
  471: {
    id: 471,
    // name: '冰伊布',
    friendship: 20,
    sleepType: 3,
    skillType: 11,
    pokeType: 3,
    berryType: 7,
    maxcarry: 12,
    helpSpeed: 3200,
    foodPer: 21.90,
    skillPer: 6.30
  },
  475: {
    id: 475,
    // name: '艾路雷朵',
    friendship: 22,
    sleepType: 3,
    skillType: 9,
    pokeType: 3,
    berryType: 18,
    maxcarry: 19,
    helpSpeed: 2400,
    foodPer: 14.70,
    skillPer: 5.40
  },
  488: {
    id: 488,
    // name: '克雷色利亞',
    friendship: 30,
    sleepType: 2,
    skillType: 22,
    pokeType: 3,
    berryType: 6,
    maxcarry: 22,
    helpSpeed: 2300,
    foodPer: 23.90,
    skillPer: 4.10,
    food: {
      type: [11, 13, 12],
      count: {
        11: {
          num: [1, 2, 4]
        },
        13: {
          num: [0, 2, 3]
        },
        12: {
          num: [0, 0, 4]
        }
      }
    }
  },
  491: {
    id: 491,
    // name: '達克萊伊',
    friendship: 25,
    sleepType: 1,
    skillType: 23,
    pokeType: 4,
    berryType: 17,
    maxcarry: 28,
    helpSpeed: 2900,
    foodPer: 19.20,
    skillPer: 2.30,
    food: {
      type: [7],
      count: {
        7: {
          num: [2, 0, 0]
        }
      }
    }
  },
  517: {
    id: 517,
    // name: '食夢夢',
    friendship: 5,
    sleepType: 2,
    skillType: 6,
    pokeType: 1,
    berryType: 6,
    maxcarry: 12,
    helpSpeed: 5700,
    foodPer: 19.70,
    skillPer: 4.30,
    food: {
      type: [8, 9, 17],
      count: {
        8: {
          num: [1, 2, 4]
        },
        9: {
          num: [0, 2, 3]
        },
        17: {
          num: [0, 0, 2]
        }
      }
    }
  },
  518: {
    id: 518,
    // name: '夢夢蝕',
    friendship: 20,
    sleepType: 2,
    skillType: 6,
    pokeType: 1,
    berryType: 6,
    maxcarry: 24,
    helpSpeed: 2800,
    foodPer: 18.80,
    skillPer: 4.10
  },
  627: {
    id: 627,
    // name: '毛頭小鷹',
    friendship: 5,
    sleepType: 3,
    skillType: 21,
    pokeType: 3,
    berryType: 16,
    maxcarry: 10,
    helpSpeed: 3800,
    foodPer: 12.50,
    skillPer: 3.10,
    food: {
      type: [7, 16, 17],
      count: {
        7: {
          num: [1, 2, 4]
        },
        16: {
          num: [0, 2, 3]
        },
        17: {
          num: [0, 0, 2]
        }
      }
    }
  },
  628: {
    id: 628,
    // name: '勇士雄鷹',
    friendship: 12,
    sleepType: 3,
    skillType: 21,
    pokeType: 3,
    berryType: 16,
    maxcarry: 18,
    helpSpeed: 2400,
    foodPer: 12.10,
    skillPer: 3.20
  },
  700: {
    id: 700,
    // name: '仙子伊布',
    friendship: 20,
    sleepType: 2,
    skillType: 8,
    pokeType: 3,
    berryType: 12,
    maxcarry: 15,
    helpSpeed: 2600,
    foodPer: 17.80,
    skillPer: 4
  },
  702: {
    id: 702,
    // name: '咚咚鼠',
    friendship: 16,
    sleepType: 2,
    skillType: 14,
    pokeType: 3,
    berryType: 13,
    maxcarry: 19,
    helpSpeed: 2500,
    foodPer: 17.70,
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
  710: {
    id: 710,
    // name: '南瓜精 (中顆種)',
    friendship: 5,
    sleepType: 1,
    skillType: 1,
    pokeType: 2,
    berryType: 8,
    maxcarry: 11,
    helpSpeed: 5400,
    foodPer: 12,
    skillPer: 4.90,
    food: {
      type: [18, 15, 4],
      count: {
        18: {
          num: [2, 5, 7]
        },
        15: {
          num: [0, 11, 18]
        },
        4: {
          num: [0, 0, 15]
        }
      }
    }
  },
  '710-2': {
    id: '710-2',
    // name: '南瓜精 (中顆種)',
    friendship: 5,
    sleepType: 1,
    skillType: 1,
    pokeType: 2,
    berryType: 8,
    maxcarry: 7,
    helpSpeed: 5300,
    foodPer: 12,
    skillPer: 4.90
  },
  '710-3': {
    id: '710-3',
    // name: '南瓜精 (中顆種)',
    friendship: 5,
    sleepType: 1,
    skillType: 1,
    pokeType: 2,
    berryType: 8,
    maxcarry: 15,
    helpSpeed: 5500,
    foodPer: 12,
    skillPer: 4.90
  },
  '710-4': {
    id: '710-4',
    // name: '南瓜精 (中顆種)',
    friendship: 5,
    sleepType: 1,
    skillType: 1,
    pokeType: 2,
    berryType: 8,
    maxcarry: 21,
    helpSpeed: 5600,
    foodPer: 12,
    skillPer: 4.90
  },
  711: {
    id: 711,
    // name: '南瓜怪人  (中顆種)',
    friendship: 20,
    sleepType: 1,
    skillType: 1,
    pokeType: 2,
    berryType: 8,
    maxcarry: 14,
    helpSpeed: 3200,
    foodPer: 13,
    skillPer: 4.90
  },
  '711-2': {
    id: '711-2',
    // name: '南瓜怪人  (小顆種)',
    friendship: 20,
    sleepType: 1,
    skillType: 1,
    pokeType: 2,
    berryType: 8,
    maxcarry: 10,
    helpSpeed: 3100,
    foodPer: 13,
    skillPer: 4.90
  },
  '711-3': {
    id: '711-3',
    // name: '南瓜怪人  (中顆種)',
    friendship: 20,
    sleepType: 1,
    skillType: 1,
    pokeType: 2,
    berryType: 8,
    maxcarry: 19,
    helpSpeed: 3300,
    foodPer: 13,
    skillPer: 4.90
  },
  '711-4': {
    id: '711-4',
    // name: '南瓜怪人  (中顆種)',
    friendship: 20,
    sleepType: 1,
    skillType: 1,
    pokeType: 2,
    berryType: 8,
    maxcarry: 25,
    helpSpeed: 3400,
    foodPer: 13,
    skillPer: 4.90
  },
  736: {
    id: 736,
    // name: '強顎雞母蟲',
    friendship: 5,
    sleepType: 1,
    skillType: 1,
    pokeType: 2,
    berryType: 9,
    maxcarry: 11,
    helpSpeed: 4600,
    foodPer: 15.50,
    skillPer: 2.90,
    food: {
      type: [17, 2, 9],
      count: {
        17: {
          num: [2, 5, 7]
        },
        2: {
          num: [0, 4, 7]
        },
        9: {
          num: [0, 0, 11]
        }
      }
    }
  },
  737: {
    id: 737,
    // name: '蟲電寶',
    friendship: 12,
    sleepType: 1,
    skillType: 1,
    pokeType: 2,
    berryType: 9,
    maxcarry: 15,
    helpSpeed: 3300,
    foodPer: 15.40,
    skillPer: 2.80
  },
  738: {
    id: 738,
    // name: '鍬農炮蟲',
    friendship: 22,
    sleepType: 1,
    skillType: 1,
    pokeType: 2,
    berryType: 9,
    maxcarry: 19,
    helpSpeed: 2800,
    foodPer: 19.40,
    skillPer: 5.10
  },
  759: {
    id: 759,
    // name: '童偶熊',
    friendship: 5,
    sleepType: 3,
    skillType: 5,
    pokeType: 2,
    maxcarry: 13,
    helpSpeed: 4100,
    berryType: 18,
    foodPer: 22.50,
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
    maxcarry: 20,
    helpSpeed: 2800,
    berryType: 18,
    foodPer: 22.90,
    skillPer: 1.30
  },
  764: {
    id: 764,
    // name: '花療環環',
    friendship: 16,
    sleepType: 2,
    skillType: 4,
    pokeType: 2,
    maxcarry: 20,
    helpSpeed: 2500,
    berryType: 12,
    foodPer: 16.70,
    skillPer: 3,
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
  778: {
    id: 778,
    // name: '謎擬Ｑ',
    friendship: 16,
    sleepType: 1,
    skillType: 17,
    pokeType: 3,
    berryType: 8,
    maxcarry: 19,
    helpSpeed: 2500,
    berryType: 8,
    foodPer: 15.30,
    skillPer: 3.30,
    food: {
      type: [5, 17, 2],
      count: {
        5: {
          num: [1, 2, 4]
        },
        17: {
          num: [0, 1, 2]
        },
        2: {
          num: [0, 0, 2]
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
    maxcarry: 19,
    helpSpeed: 2700,
    berryType: 16,
    foodPer: 16.50,
    skillPer: 3.90,
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
  848: {
    id: 848,
    // name: '毒電嬰',
    friendship: 5,
    sleepType: 3,
    skillType: 10,
    pokeType: 3,
    maxcarry: 6,
    helpSpeed: 5600,
    berryType: 5,
    foodPer: 20.90,
    skillPer: 4.80,
    food: {
      type: [8, 5, 1],
      count: {
        8: {
          num: [1, 2, 4]
        },
        5: {
          num: [0, 2, 4]
        },
        1: {
          num: [0, 0, 2]
        }
      }
    }
  },
  849: {
    id: 849,
    // name: '顫弦蠑螈（高調的樣子）',
    friendship: 20,
    sleepType: 1,
    skillType: 26,
    pokeType: 3,
    maxcarry: 18,
    helpSpeed: 3100,
    berryType: 5,
    foodPer: 23.90,
    skillPer: 6.40
  },
  906: {
    id: 906,
    // name: '新葉喵',
    friendship: 5,
    sleepType: 1,
    skillType: 11,
    pokeType: 2,
    maxcarry: 10,
    helpSpeed: 4600,
    berryType: 4,
    foodPer: 20.80,
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
    maxcarry: 14,
    helpSpeed: 3500,
    berryType: 4,
    foodPer: 20.90,
    skillPer: 2.30
  },
  908: {
    id: 908,
    // name: '魔幻假面喵',
    friendship: 20,
    sleepType: 1,
    skillType: 11,
    pokeType: 2,
    maxcarry: 18,
    helpSpeed: 2600,
    berryType: 17,
    foodPer: 19,
    skillPer: 2.20
  },
  909: {
    id: 909,
    // name: '呆火鱷',
    friendship: 5,
    sleepType: 2,
    skillType: 7,
    pokeType: 2,
    maxcarry: 11,
    helpSpeed: 4200,
    berryType: 10,
    foodPer: 25.40,
    skillPer: 5.30,
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
    maxcarry: 16,
    helpSpeed: 3100,
    berryType: 10,
    foodPer: 24.70,
    skillPer: 5
  },
  911: {
    id: 911,
    // name: '骨紋巨聲鱷',
    friendship: 20,
    sleepType: 1,
    skillType: 7,
    pokeType: 2,
    maxcarry: 19,
    helpSpeed: 2700,
    berryType: 8,
    foodPer: 26.80,
    skillPer: 6.20
  },
  912: {
    id: 912,
    // name: '潤水鴨',
    friendship: 5,
    sleepType: 3,
    skillType: 2,
    pokeType: 2,
    maxcarry: 10,
    helpSpeed: 4800,
    berryType: 1,
    foodPer: 26.10,
    skillPer: 2.80,
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
    maxcarry: 14,
    helpSpeed: 3600,
    berryType: 1,
    foodPer: 25.90,
    skillPer: 2.70
  },
  914: {
    id: 914,
    // name: '狂歡浪舞鴨',
    friendship: 20,
    sleepType: 3,
    skillType: 2,
    pokeType: 2,
    maxcarry: 19,
    helpSpeed: 2600,
    berryType: 18,
    foodPer: 23.20,
    skillPer: 2.40
  },
  921: {
    id: 921,
    // name: '布撥',
    friendship: 5,
    sleepType: 2,
    skillType: 8,
    pokeType: 3,
    maxcarry: 9,
    helpSpeed: 4600,
    berryType: 13,
    foodPer: 11.10,
    skillPer: 3.60,
    food: {
      type: [13, 8, 3],
      count: {
        13: {
          num: [1, 2, 3]
        },
        8: {
          num: [0, 3, 6]
        },
        3: {
          num: [0, 0, 5]
        }
      }
    }
  },
  922: {
    id: 922,
    // name: '布土撥',
    friendship: 12,
    sleepType: 2,
    skillType: 8,
    pokeType: 3,
    maxcarry: 12,
    helpSpeed: 3300,
    berryType: 13,
    foodPer: 10.90,
    skillPer: 3.60
  },
  923: {
    id: 923,
    // name: '巴布土撥',
    friendship: 22,
    sleepType: 2,
    skillType: 8,
    pokeType: 3,
    maxcarry: 18,
    helpSpeed: 2400,
    berryType: 13,
    foodPer: 14.10,
    skillPer: 3.90
  },
  980: {
    id: 980,
    // name: '土王',
    friendship: 12,
    sleepType: 1,
    skillType: 7,
    pokeType: 2,
    maxcarry: 20,
    helpSpeed: 3500,
    berryType: 5,
    foodPer: 20.80,
    skillPer: 5.50
  },
  7006: {
    id: 7006,
    // name: '六尾（阿羅拉的樣子）',
    friendship: 5,
    sleepType: 3,
    skillType: 9,
    pokeType: 1,
    maxcarry: 10,
    helpSpeed: 5600,
    berryType: 7,
    foodPer: 23,
    skillPer: 2.80,
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
  7007: {
    id: 7007,
    // name: '九尾（阿羅拉的樣子）',
    friendship: 20,
    sleepType: 3,
    skillType: 9,
    pokeType: 1,
    maxcarry: 20,
    helpSpeed: 2900,
    berryType: 7,
    foodPer: 23.20,
    skillPer: 2.80
  },
  7054: {
    id: 7054,
    // name: '烏波（帕底亞的樣子）',
    friendship: 5,
    sleepType: 1,
    skillType: 7,
    pokeType: 2,
    maxcarry: 9,
    helpSpeed: 6400,
    berryType: 5,
    foodPer: 20.90,
    skillPer: 5.60,
    food: {
      type: [13, 17, 4],
      count: {
        13: {
          num: [2, 5, 7]
        },
        17: {
          num: [0, 4, 7]
        },
        4: {
          num: [0, 0, 9]
        }
      }
    }
  },
  8001: {
    id: 8001,
    // name: '顫弦蠑螈（低調的樣子）',
    friendship: 20,
    sleepType: 1,
    skillType: 27,
    pokeType: 3,
    maxcarry: 18,
    helpSpeed: 3100,
    berryType: 5,
    foodPer: 23.90,
    skillPer: 6.40
  },
  9001: {
    id: 9001,
    // name: '皮卡丘（萬聖節）',
    friendship: 7,
    sleepType: 2,
    skillType: 5,
    pokeType: 1,
    berryType: 13,
    maxcarry: 18,
    helpSpeed: 2500,
    berryType: 13,
    foodPer: 21.80,
    skillPer: 2.80
  },
  9002: {
    id: 9002,
    // name: '皮卡丘（佳節）',
    friendship: 7,
    sleepType: 2,
    skillType: 3,
    pokeType: 3,
    berryType: 13,
    maxcarry: 20,
    helpSpeed: 2500,
    foodPer: 13.10,
    skillPer: 4.20
  },
  9004: {
    id: 9004,
    // name: '伊布（佳節）',
    friendship: 5,
    sleepType: 2,
    skillType: 3,
    pokeType: 1,
    berryType: 11,
    maxcarry: 20,
    helpSpeed: 3100,
    foodPer: 15.60,
    skillPer: 3.20
  },
  9005: {
    id: 9005,
    // name: '伊布（萬聖節）',
    friendship: 5,
    sleepType: 2,
    skillType: 10,
    pokeType: 3,
    berryType: 11,
    maxcarry: 18,
    helpSpeed: 3200,
    foodPer: 12.0,
    skillPer: 4.60,
    food: {
      type: [18, 13, 8],
      count: {
        18: {
          num: [1, 2, 4]
        },
        13: {
          num: [0, 4, 6]
        },
        8: {
          num: [0, 0, 9]
        }
      }
    }
  }
}
const initPokedex = () => {
  for (const key in pokedex) {
    if (Object.prototype.hasOwnProperty.call(pokedex, key)) {
      pokedex[key].evoLineKey = 0
    }
  }
  evoLine.forEach(evoItem => {
    evoItem.forEach((pm, pmKey) => {
      if ((+pm !== 9001) && (+pm !== 9002) && (+pm !== 9004)) {
        pokedex[pm].evoLineKey = 1
      }
      if (pmKey > 0) {
        pokedex[pm].food = pokedex[evoItem[0]].food
      }
    })
  })
}
initPokedex()
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
}, {
  time: '2024/08/1',
  pokemons: [194, 195]
}, {
  time: '2024/09/1',
  pokemons: [245]
}, {
  time: '2024/10/1',
  pokemons: [304, 305, 306, 403, 404, 405, 736, 737, 738, 425, 426, 778]
}, {
  time: '2024/12/1',
  pokemons: [215, 461, 921, 922, 923, 7006, 7007, 9004]
}, {
  time: '2025/01/1',
  pokemons: [627, 628]
}, {
  time: '2025/02/1',
  pokemons: [7054, 980]
}, {
  time: '2025/03/1',
  pokemons: [517, 518, 488]
}, {
  time: '2025/04/1',
  pokemons: [491]
}, {
  time: '2025/05/1',
  pokemons: [440, 113, 242, 198, 430]
}, {
  time: '2025/06/1',
  pokemons: [303, 83]
}, {
  time: '2025/07/1',
  pokemons: [252, 253, 254, 255, 256, 257, 258, 259, 260, 311, 312]
}, {
  time: '2025/08/1',
  pokemons: [848, 849, 8001]
}, {
  time: '2025/09/1',
  pokemons: [177, 178]
}, {
  time: '2025/10/1',
  pokemons: [710, 711, 9005]
}]
// console.log(pokedex)
export {
  pokedex,
  updatePoke
}