export const skillEffects = {
  1: { // 能量填充S(X)
    id: 1,
    maxLevel: 7,
    effects: [
      {
        level: 1,
        value: 400
      },
      {
        level: 2,
        value: 569
      },
      {
        level: 3,
        value: 785
      },
      {
        level: 4,
        value: 1083
      },
      {
        level: 5,
        value: 1496
      },
      {
        level: 6,
        value: 2066
      },
      {
        level: 7,
        value: 3212
      }
    ]
  },
  2: { // 能量填充M
    id: 2,
    maxLevel: 7,
    effects: [
      {
        level: 1,
        value: 880
      },
      {
        level: 2,
        value: 1251
      },
      {
        level: 3,
        value: 1726
      },
      {
        level: 4,
        value: 2383
      },
      {
        level: 5,
        value: 3290
      },
      {
        level: 6,
        value: 4546
      },
      {
        level: 7,
        value: 6858
      }
    ]
  },
  5: { // 能量填充S(X~Y)
    id: 5,
    maxLevel: 7,
    effects: [
      {
        level: 1,
        value: [200, 800]
      },
      {
        level: 2,
        value: [285, 1138]
      },
      {
        level: 3,
        value: [393, 1570]
      },
      {
        level: 4,
        value: [542, 2166]
      },
      {
        level: 5,
        value: [748, 2992]
      },
      {
        level: 6,
        value: [1033, 4132]
      },
      {
        level: 7,
        value: [1501, 6004]
      }
    ]
  },
  3: { // 夢之碎片獲取S(X)
    id: 3,
    maxLevel: 7,
    effects: [
      {
        level: 1,
        value: 240
      },
      {
        level: 2,
        value: 340
      },
      {
        level: 3,
        value: 480
      },
      {
        level: 4,
        value: 670
      },
      {
        level: 5,
        value: 920
      },
      {
        level: 6,
        value: 1260
      },
      {
        level: 7,
        value: 1800
      },
      {
        level: 7,
        value: 2500
      }
    ]
  },
  6: { // 夢之碎片獲取S(X~Y)
    id: 6,
    maxLevel: 7,
    effects: [
      {
        level: 1,
        value: [120, 480]
      },
      {
        level: 2,
        value: [170, 680]
      },
      {
        level: 3,
        value: [240, 960]
      },
      {
        level: 4,
        value: [335, 1340]
      },
      {
        level: 5,
        value: [460, 1840]
      },
      {
        level: 6,
        value: [630, 2520]
      },
      {
        level: 7,
        value: [900, 3600]
      },
      {
        level: 8,
        value: [1150, 4600]
      }
    ]
  },
  17: { // 畫皮（樹果遽增）
    id: 17,
    maxLevel: 6,
    effects: [
      {
        level: 1,
        value: 8,
        teamValue: 1
      },
      {
        level: 2,
        value: 10,
        teamValue: 2
      },
      {
        level: 3,
        value: 15,
        teamValue: 2
      },
      {
        level: 4,
        value: 17,
        teamValue: 3
      },
      {
        level: 5,
        value: 19,
        teamValue: 4
      },
      {
        level: 6,
        value: 21,
        teamValue: 5
      }
    ]
  },
  21: { // 樹果遽增
    id: 21,
    maxLevel: 6,
    effects: [
      {
        level: 1,
        value: 11,
        teamValue: 1
      },
      {
        level: 2,
        value: 14,
        teamValue: 2
      },
      {
        level: 3,
        value: 21,
        teamValue: 2
      },
      {
        level: 4,
        value: 24,
        teamValue: 3
      },
      {
        level: 5,
        value: 27,
        teamValue: 4
      },
      {
        level: 6,
        value: 30,
        teamValue: 5
      }
    ]
  },
  23: { // 夢魘（能量填充M）
    id: 23,
    maxLevel: 7,
    effects: [
      {
        level: 1,
        value: 2640
      },
      {
        level: 2,
        value: 3753
      },
      {
        level: 3,
        value: 5178
      },
      {
        level: 4,
        value: 7149
      },
      {
        level: 5,
        value: 9870
      },
      {
        level: 6,
        value: 13638
      },
      {
        level: 7,
        value: 18515
      }
    ]
  },
  28: { // 食材精選S
    id: 28,
    maxLevel: 7,
    // skillType 28 的食材类型从宝可梦的 food.type 动态读取，此处仅配置掉落概率
    foodPercent: 1 / 3,
    effects: [
      {
        level: 1,
        value: 5
      },
      {
        level: 2,
        value: 6
      },
      {
        level: 3,
        value: 8
      },
      {
        level: 4,
        value: 11
      },
      {
        level: 5,
        value: 13
      },
      {
        level: 6,
        value: 16
      },
      {
        level: 7,
        value: 18
      }
    ]
  },
  24: { // 超幸運（食材精選S）
    id: 24,
    maxLevel: 7,
    foodTypes: [
      { foodtype: 2, percent: 21.5 / 100 },
      { foodtype: 7, percent: 21.5 / 100 },
      { foodtype: 15, percent: 21.5 / 100 },
      { foodtype: 17, percent: 21.5 / 100 }
    ],
    effects: [
      {
        level: 1,
        value: 5
      },
      {
        level: 2,
        value: 6
      },
      {
        level: 3,
        value: 8
      },
      {
        level: 4,
        value: 11
      },
      {
        level: 5,
        value: 13
      },
      {
        level: 6,
        value: 16
      },
      {
        level: 7,
        value: 18
      }
    ]
  },
  25: { // 怪力鉗（食材精選S）
    id: 25,
    maxLevel: 7,
    foodTypes: [
      { foodtype: 4, percent: 20.83 / 100, morePercent: 4.17 / 100 },
      { foodtype: 10, percent: 20.83 / 100, morePercent: 4.17 / 100 },
      { foodtype: 12, percent: 20.83 / 100, morePercent: 4.17 / 100 },
      { foodtype: 16, percent: 20.83 / 100, morePercent: 4.17 / 100 }
    ],
    effects: [
      {
        level: 1,
        value: 5
      },
      {
        level: 2,
        value: 6
      },
      {
        level: 3,
        value: 8
      },
      {
        level: 4,
        value: 11
      },
      {
        level: 5,
        value: 13
      },
      {
        level: 6,
        value: 16
      },
      {
        level: 7,
        value: 18
      }
    ]
  },
  35: { // 流星群（樹果遽增）
    id: 35,
    maxLevel: 6,
    effects: [
      {
        level: 1,
        value: 12
      },
      {
        level: 2,
        value: 21
      },
      {
        level: 3,
        value: 29
      },
      {
        level: 4,
        value: 38
      },
      {
        level: 5,
        value: 43
      },
      {
        level: 6,
        value: 48
      }
    ]
  },
  36: { // 波導彈（夢之碎片獲取S）
    id: 36,
    maxLevel: 7,
    effects: [
      {
        level: 1,
        value: 240,
        subEnergy: 200
      },
      {
        level: 2,
        value: 340,
        subEnergy: 285
      },
      {
        level: 3,
        value: 480,
        subEnergy: 393
      },
      {
        level: 4,
        value: 670,
        subEnergy: 542
      },
      {
        level: 5,
        value: 920,
        subEnergy: 748
      },
      {
        level: 6,
        value: 1260,
        subEnergy: 1033
      },
      {
        level: 7,
        value: 1800,
        subEnergy: 1501
      },
      {
        level: 7,
        value: 2500,
        subEnergy: 2042
      }
    ]
  },
  22: { // 新月祈禱（活力全體療癒S，附带樹果遽增）
    id: 22,
    maxLevel: 6,
    effects: [
      {
        level: 1,
        value: 5,
        teamValue: 1
      },
      {
        level: 2,
        value: 9,
        teamValue: 1
      },
      {
        level: 3,
        value: 13,
        teamValue: 1
      },
      {
        level: 4,
        value: 17,
        teamValue: 1
      },
      {
        level: 5,
        value: 21,
        teamValue: 1
      },
      {
        level: 6,
        value: 25,
        teamValue: 1
      }
    ]
  },
  15: { // 幫手加速（属性）
    id: 15,
    maxLevel: 6,
    effects: [
      {
        level: 1,
        value: 2
      },
      {
        level: 2,
        value: 3
      },
      {
        level: 3,
        value: 3
      },
      {
        level: 4,
        value: 4
      },
      {
        level: 5,
        value: 4
      },
      {
        level: 6,
        value: 5
      }
    ]
  },
  37: { // 精神擊破（樹果領域）
    id: 37,
    maxLevel: 6,
    effects: [
      {
        level: 1,
        value: 1408
      },
      {
        level: 2,
        value: 2002
      },
      {
        level: 3,
        value: 2762
      },
      {
        level: 4,
        value: 3813
      },
      {
        level: 5,
        value: 5264
      },
      {
        level: 6,
        value: 7274
      }
    ]
  }
}