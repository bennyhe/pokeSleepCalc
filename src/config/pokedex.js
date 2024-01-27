const evoLine = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  [50, 51],
  [69, 70, 71],
  [74, 75, 76],
  [79, 80, 199],
  [92, 93, 94],
  [439, 122],
  [246, 247, 248],
  [453, 454],
  [459, 460],
  [95, 208],
  [173, 35, 36],
  [353, 354],
  [147, 148, 149],
  [280, 281, 282, 475],
  [759, 760]
]
const pokedex = {
  1: {
    name: '妙蛙種子',
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
    name: '妙蛙草',
    pokeType: 2,
    berryType: 4,
    helpSpeed: 3300,
    foodPer: 25.44
  },
  3: {
    name: '妙蛙花',
    pokeType: 2,
    berryType: 4,
    helpSpeed: 2800,
    foodPer: 26.55
  },
  4: {
    name: '小火龍',
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
    name: '火恐龍',
    pokeType: 2,
    berryType: 10,
    helpSpeed: 3000,
    foodPer: 22.67
  },
  6: {
    name: '噴火龍',
    pokeType: 2,
    berryType: 10,
    helpSpeed: 2400,
    foodPer: 22.34
  },
  7: {
    name: '傑尼龜',
    pokeType: 2,
    berryType: 1,
    helpSpeed: 4500,
    foodPer: 27.02,
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
    name: '卡咪龜',
    pokeType: 2,
    berryType: 1,
    helpSpeed: 3400,
    foodPer: 27.04
  },
  9: {
    name: '水箭龜',
    pokeType: 2,
    berryType: 1,
    helpSpeed: 2800,
    foodPer: 27.42
  },
  10: {
    name: '綠毛蟲',
    pokeType: 1,
    berryType: 9
  },
  11: {
    name: '鐵甲蛹',
    pokeType: 1,
    berryType: 9
  },
  12: {
    name: '巴大蝶',
    pokeType: 1,
    berryType: 9
  },
  19: {
    name: '小拉達',
    pokeType: 1,
    berryType: 11
  },
  20: {
    name: '拉達',
    pokeType: 1,
    berryType: 11
  },
  23: {
    name: '阿柏蛇',
    pokeType: 1,
    berryType: 5
  },
  24: {
    name: '阿柏怪',
    pokeType: 1,
    berryType: 5
  },
  25: {
    name: '皮卡丘',
    pokeType: 1,
    berryType: 13
  },
  26: {
    name: '雷丘',
    pokeType: 1,
    berryType: 13
  },
  35: {
    name: '皮皮',
    pokeType: 1,
    berryType: 12,
    helpSpeed: 4000,
    berryType: 12
  },
  36: {
    name: '皮可西',
    pokeType: 1,
    berryType: 12,
    helpSpeed: 2800,
    berryType: 12
  },
  39: {
    name: '胖丁',
    pokeType: 3,
    berryType: 12
  },
  40: {
    name: '胖可丁',
    pokeType: 3,
    berryType: 12
  },
  50: {
    name: '地鼠',
    pokeType: 2,
    berryType: 15,
    helpSpeed: 4300,
    foodPer: 19.16,
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
    name: '三地鼠',
    pokeType: 2,
    berryType: 15,
    helpSpeed: 2800,
    foodPer: 18.95
  },
  52: {
    name: '喵喵',
    pokeType: 3,
    berryType: 11
  },
  53: {
    name: '貓老大',
    pokeType: 3,
    berryType: 11
  },
  54: {
    name: '可達鴨',
    pokeType: 3,
    berryType: 1
  },
  55: {
    name: '哥達鴨',
    pokeType: 3,
    berryType: 1
  },
  56: {
    name: '猴怪',
    pokeType: 1,
    berryType: 18
  },
  57: {
    name: '火爆猴',
    pokeType: 1,
    berryType: 18
  },
  58: {
    name: '卡蒂狗',
    pokeType: 3,
    berryType: 10
  },
  59: {
    name: '風速狗',
    pokeType: 3,
    berryType: 10
  },
  69: {
    name: '喇叭芽',
    pokeType: 2,
    berryType: 4,
    helpSpeed: 5200,
    foodPer: 23.19,
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
    name: '口呆花',
    pokeType: 2,
    berryType: 4,
    helpSpeed: 3800,
    foodPer: 23.47
  },
  71: {
    name: '大食花',
    pokeType: 2,
    berryType: 4,
    helpSpeed: 2800,
    foodPer: 23.28
  },
  74: {
    name: '小拳石',
    pokeType: 2,
    berryType: 14,
    helpSpeed: 3800,
    foodPer: 28.05,
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
    name: '隆隆石',
    pokeType: 2,
    berryType: 14,
    helpSpeed: 4000,
    foodPer: 27.11
  },
  76: {
    name: '隆隆岩',
    pokeType: 2,
    berryType: 14,
    helpSpeed: 3100,
    foodPer: 27.98
  },
  79: {
    name: '呆呆獸',
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
    name: '呆殼獸',
    pokeType: 3,
    berryType: 1,
    helpSpeed: 3800,
    foodPer: 15.06
  },
  81: {
    name: '小磁怪',
    pokeType: 3,
    berryType: 2
  },
  82: {
    name: '三合一磁怪',
    pokeType: 3,
    berryType: 2
  },
  84: {
    name: '嘟嘟',
    pokeType: 1,
    berryType: 16
  },
  85: {
    name: '嘟嘟利',
    pokeType: 1,
    berryType: 16
  },
  92: {
    name: '鬼斯',
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
    name: '鬼斯通',
    pokeType: 2,
    berryType: 8,
    helpSpeed: 3000,
    foodPer: 15.69
  },
  94: {
    name: '耿鬼',
    pokeType: 2,
    berryType: 8,
    helpSpeed: 2200,
    foodPer: 16.1
  },
  95: {
    name: '大岩蛇',
    pokeType: 1,
    helpSpeed: 3100,
    berryType: 14
  },
  104: {
    name: '卡拉卡拉',
    pokeType: 1,
    berryType: 15
  },
  105: {
    name: '嘎啦嘎啦',
    pokeType: 1,
    berryType: 15
  },
  115: {
    name: '袋獸',
    pokeType: 2,
    berryType: 11,
    helpSpeed: 2800,
    foodPer: 22.15,
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
    name: '魔牆人偶',
    pokeType: 2,
    berryType: 6,
    helpSpeed: 2800,
    foodPer: 21.58
  },
  127: {
    name: '凱羅斯',
    pokeType: 2,
    berryType: 9,
    helpSpeed: 2400,
    foodPer: 20.55,
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
    name: '百變怪',
    pokeType: 2,
    berryType: 11,
    helpSpeed: 3500,
    foodPer: 20.06,
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
    name: '伊布',
    pokeType: 3,
    berryType: 11
  },
  134: {
    name: '水伊布',
    pokeType: 3,
    berryType: 1
  },
  135: {
    name: '雷伊布',
    pokeType: 3
  },
  136: {
    name: '火伊布',
    pokeType: 3,
    berryType: 10
  },
  147: {
    name: '迷你龍',
    pokeType: 2,
    berryType: 3,
    helpSpeed: 5000,
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
    name: '哈克龍',
    pokeType: 2,
    berryType: 3,
    helpSpeed: 3800
  },
  149: {
    name: '快龍',
    pokeType: 2,
    berryType: 3,
    helpSpeed: 2600
  },
  152: {
    name: '菊草葉',
    pokeType: 1,
    berryType: 4
  },
  153: {
    name: '月桂葉',
    pokeType: 1,
    berryType: 4
  },
  154: {
    name: '大竺葵',
    pokeType: 1,
    berryType: 4
  },
  155: {
    name: '火球鼠',
    pokeType: 1,
    berryType: 10
  },
  156: {
    name: '火岩鼠',
    pokeType: 1,
    berryType: 10
  },
  157: {
    name: '火爆獸',
    pokeType: 1,
    berryType: 10
  },
  158: {
    name: '小鋸鱷',
    pokeType: 1,
    berryType: 1
  },
  159: {
    name: '藍鱷',
    pokeType: 1,
    berryType: 1
  },
  160: {
    name: '大力鱷',
    pokeType: 1,
    berryType: 1
  },
  172: {
    name: '皮丘',
    pokeType: 1,
    berryType: 13
  },
  173: {
    name: '皮寶寶',
    pokeType: 1,
    berryType: 12,
    helpSpeed: 5600,
    berryType: 12
  },
  174: {
    name: '寶寶丁',
    pokeType: 3,
    berryType: 12
  },
  175: {
    name: '波克比',
    pokeType: 3,
    berryType: 12
  },
  176: {
    name: '波克基古',
    pokeType: 3,
    berryType: 12
  },
  179: {
    name: '咩利羊',
    pokeType: 3,
    berryType: 13
  },
  180: {
    name: '茸茸羊',
    pokeType: 3,
    berryType: 13
  },
  181: {
    name: '電龍',
    pokeType: 3,
    berryType: 13
  },
  185: {
    name: '樹才怪',
    pokeType: 3,
    berryType: 14
  },
  196: {
    name: '太陽伊布',
    berryType: 6,
    pokeType: 3
  },
  197: {
    name: '月亮伊布',
    pokeType: 3,
    berryType: 17
  },
  199: {
    name: '呆呆王',
    pokeType: 3,
    berryType: 1,
    helpSpeed: 3400,
    foodPer: 15.04
  },
  202: {
    name: '果然翁',
    pokeType: 3,
    berryType: 6
  },
  208: {
    name: '大鋼蛇',
    pokeType: 1,
    berryType: 2,
    helpSpeed: 3000
  },
  214: {
    name: '赫拉克羅斯',
    pokeType: 3,
    berryType: 9
  },
  225: {
    name: '信使鳥',
    pokeType: 2,
    berryType: 16,
    helpSpeed: 2500,
    foodPer: 18.80,
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
    name: '戴魯比',
    pokeType: 1,
    berryType: 17
  },
  229: {
    name: '黑魯加',
    pokeType: 1,
    berryType: 17
  },
  246: {
    name: '幼基拉斯',
    pokeType: 2,
    berryType: 14,
    helpSpeed: 4800,
    foodPer: 23.73,
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
    name: '沙基拉斯',
    pokeType: 2,
    berryType: 14,
    helpSpeed: 3600,
    foodPer: 24.7
  },
  248: {
    name: '班基拉斯',
    pokeType: 2,
    berryType: 17,
    helpSpeed: 2700,
    foodPer: 26.57
  },
  280: {
    name: '拉魯拉絲',
    pokeType: 3,
    berryType: 6
  },
  281: {
    name: '奇魯莉安',
    pokeType: 3,
    berryType: 6
  },
  282: {
    name: '沙奈朵',
    pokeType: 3,
    berryType: 6
  },
  287: {
    name: '懶人獺',
    pokeType: 1,
    berryType: 11
  },
  288: {
    name: '過動猿',
    pokeType: 1,
    berryType: 11
  },
  289: {
    name: '請假王',
    pokeType: 1,
    berryType: 11
  },
  302: {
    name: '勾魂眼',
    pokeType: 3,
    berryType: 17
  },
  316: {
    name: '溶食獸',
    pokeType: 3,
    berryType: 5
  },
  317: {
    name: '吞食獸',
    pokeType: 3,
    berryType: 5
  },
  333: {
    name: '青綿鳥',
    pokeType: 1,
    berryType: 16
  },
  334: {
    name: '七夕青鳥',
    pokeType: 1,
    berryType: 3
  },
  353: {
    name: '怨影娃娃',
    pokeType: 1,
    berryType: 8,
    helpSpeed: 3900,
    berryType: 8
  },
  354: {
    name: '詛咒娃娃',
    pokeType: 1,
    berryType: 8,
    helpSpeed: 2600,
    berryType: 8
  },
  359: {
    name: '阿勃梭魯',
    pokeType: 2,
    berryType: 17,
    helpSpeed: 3100,
    foodPer: 17.76,
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
    name: '小果然',
    pokeType: 3,
    berryType: 6
  },
  363: {
    name: '海豹球',
    pokeType: 1,
    berryType: 7
  },
  364: {
    name: '海魔獅',
    pokeType: 1,
    berryType: 7
  },
  365: {
    name: '帝牙海獅',
    pokeType: 1,
    berryType: 7
  },
  438: {
    name: '盆才怪',
    pokeType: 3,
    berryType: 14
  },
  439: {
    name: '魔尼尼',
    pokeType: 2,
    berryType: 6,
    helpSpeed: 4300,
    foodPer: 20.05,
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
    name: '利歐路',
    pokeType: 3,
    berryType: 18
  },
  448: {
    name: '路卡利歐',
    pokeType: 3,
    berryType: 18
  },
  453: {
    name: '不良蛙',
    pokeType: 2,
    berryType: 5,
    helpSpeed: 5600,
    foodPer: 22.73,
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
    name: '毒骷蛙',
    pokeType: 2,
    berryType: 5,
    helpSpeed: 3400,
    foodPer: 22.86
  },
  459: {
    name: '雪笠怪',
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
    name: '暴雪王',
    pokeType: 2,
    berryType: 7,
    helpSpeed: 3000,
    foodPer: 25
  },
  462: {
    name: '自爆磁怪',
    pokeType: 3,
    berryType: 2
  },
  468: {
    name: '波克基斯',
    pokeType: 3,
    berryType: 12
  },
  470: {
    name: '葉伊布',
    pokeType: 3,
    berryType: 4
  },
  471: {
    name: '冰伊布',
    pokeType: 3,
    berryType: 7
  },
  475: {
    name: '艾路雷朵',
    pokeType: 3,
    berryType: 18
  },
  700: {
    name: '仙子伊布',
    pokeType: 3,
    berryType: 12
  },
  759: {
    name: '童偶熊',
    pokeType: 2,
    helpSpeed: 4100,
    berryType: 18,
    // foodPer: 22.47,
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
    name: '穿著熊',
    pokeType: 2,
    helpSpeed: 2800,
    berryType: 18
    // foodPer: 22.93
  },
  9001: {
    name: '皮卡丘（萬聖節）',
    pokeType: 1,
    berryType: 13,
    helpSpeed: 2600,
    berryType: 13
  },
  9002: {
    name: '皮卡丘（佳節）',
    pokeType: 3,
    berryType: 13
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
}]
console.log(pokedex)
export {
  pokedex,
  updatePoke
}