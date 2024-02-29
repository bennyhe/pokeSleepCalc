const mapSplitVer = '2.3.8'
const gameMap = [
  {
    name: '萌绿之岛',
    id: 'green',
    pic: 'map1',
    berry: ['?', '?', '?'],
    scoreList: [{ catchNum: 3, startscore: 0, endscore: 965230 },
      { catchNum: 4, startscore: 965232, endscore: 2073694 },
      { catchNum: 5, startscore: 2073695, endscore: 4626378 },
      { catchNum: 6, startscore: 4626380, endscore: 8331415 },
      { catchNum: 7, startscore: 8331417, endscore: 19563552 },
      { catchNum: 8, startscore: 19563553 }],
    levelList: [
      {
        'name': '普通1',
        'energy': 0,
        'sleepStyles': [
          '19-id-1',
          '172-id-1',
          '10-id-1',
          '50-id-1',
          '175-id-1',
          '74-id-1',
          '23-id-1',
          '104-id-1',
          '56-id-1',
          '69-id-1',
          '174-id-1',
          '179-id-1',
          '84-id-1',
          '92-id-1',
          '333-id-1',
          '360-id-1',
          '438-id-1',
          '453-id-1',
          '81-id-1',
          '363-id-1'
        ]
      },
      {
        'name': '普通2',
        'energy': 3118,
        'sleepStyles': [
          '52-id-1',
          '1-id-1',
          '7-id-1',
          '4-id-1',
          '79-id-1',
          '158-id-1',
          '155-id-1',
          '58-id-1',
          '54-id-1',
          '152-id-1',
          '316-id-1',
          '287-id-1',
          '228-id-1',
          '173-id-1'
        ]
      },
      {
        'name': '普通3',
        'energy': 7171,
        'sleepStyles': [
          '25-id-1',
          '185-id-1',
          '447-id-1'
        ]
      },
      {
        'name': '普通4',
        'energy': 11693,
        'sleepStyles': [
          '133-id-1',
          '39-id-1',
          '202-id-1',
          '246-id-1',
          '35-id-1'
        ]
      },
      {
        'name': '普通5',
        'energy': 17149,
        'sleepStyles': [
          '19-id-2',
          '172-id-2',
          '10-id-2',
          '50-id-2',
          '175-id-2',
          '74-id-2',
          '23-id-2',
          '104-id-2',
          '56-id-2',
          '69-id-2',
          '174-id-2',
          '179-id-2',
          '84-id-2',
          '92-id-2',
          '333-id-2',
          '360-id-2',
          '438-id-2',
          '453-id-2',
          '81-id-2',
          '363-id-2'
        ]
      },
      {
        'name': '超级1',
        'energy': 23385,
        'sleepStyles': [
          '19-id-4',
          '52-id-2',
          '172-id-4',
          '1-id-2',
          '10-id-4',
          '11-id-1',
          '7-id-2',
          '4-id-2',
          '79-id-2',
          '158-id-2',
          '175-id-4',
          '74-id-4',
          '23-id-4',
          '104-id-4',
          '155-id-2',
          '58-id-2',
          '56-id-4',
          '69-id-4',
          '174-id-4',
          '179-id-4',
          '54-id-2',
          '84-id-4',
          '152-id-2',
          '316-id-2',
          '333-id-4',
          '360-id-4',
          '438-id-4',
          '453-id-4',
          '287-id-2',
          '363-id-4',
          '228-id-2',
          '173-id-2',
          '353-id-1'
        ]
      },
      {
        'name': '超级2',
        'energy': 31492,
        'sleepStyles': [
          '25-id-2',
          '52-id-4',
          '1-id-4',
          '7-id-4',
          '4-id-4',
          '158-id-4',
          '155-id-4',
          '58-id-4',
          '70-id-1',
          '185-id-2',
          '54-id-4',
          '105-id-1',
          '152-id-4',
          '180-id-1',
          '316-id-4',
          '317-id-1',
          '454-id-1',
          '82-id-1',
          '447-id-2',
          '228-id-4'
        ]
      },
      {
        'name': '超级3',
        'energy': 41314,
        'sleepStyles': [
          '25-id-4',
          '133-id-2',
          '39-id-2',
          '75-id-1',
          '202-id-2',
          '246-id-2',
          '288-id-1',
          '447-id-4',
          '35-id-2'
        ]
      },
      {
        'name': '超级4',
        'energy': 53006,
        'sleepStyles': [
          '133-id-4',
          '2-id-1',
          '39-id-4',
          '8-id-1',
          '5-id-1',
          '24-id-1',
          '20-id-1',
          '93-id-1',
          '57-id-1',
          '176-id-1',
          '246-id-4'
        ]
      },
      {
        'name': '超级5',
        'energy': 65634,
        'sleepStyles': [
          '11-id-2',
          '51-id-1',
          '85-id-1',
          '132-id-1',
          '353-id-2'
        ]
      },
      {
        'name': '高级1',
        'energy': 79197,
        'sleepStyles': [
          '11-id-4',
          '79-id-4',
          '70-id-2',
          '185-id-4',
          '80-id-1',
          '105-id-2',
          '180-id-2',
          '202-id-4',
          '317-id-2',
          '454-id-2',
          '53-id-1',
          '81-id-3',
          '82-id-2',
          '287-id-4',
          '363-id-3',
          '173-id-4',
          '35-id-4'
        ]
      },
      {
        'name': '高级2',
        'energy': 93540,
        'sleepStyles': [
          '52-id-3',
          '75-id-2',
          '70-id-4',
          '105-id-4',
          '180-id-4',
          '317-id-4',
          '454-id-4',
          '115-id-1',
          '127-id-1',
          '214-id-1',
          '359-id-1',
          '288-id-2'
        ]
      },
      {
        'name': '高级3',
        'energy': 109130,
        'sleepStyles': [
          '2-id-2',
          '8-id-2',
          '5-id-2',
          '75-id-4',
          '24-id-2',
          '20-id-2',
          '93-id-2',
          '57-id-2',
          '176-id-2',
          '288-id-4',
          '225-id-1'
        ]
      },
      {
        'name': '高级4',
        'energy': 125032,
        'sleepStyles': [
          '2-id-4',
          '8-id-4',
          '5-id-4',
          '51-id-2',
          '24-id-4',
          '20-id-4',
          '57-id-4',
          '85-id-2',
          '132-id-2',
          '176-id-4'
        ]
      },
      {
        'name': '高级5',
        'energy': 156121,
        'sleepStyles': [
          '12-id-1',
          '80-id-2',
          '53-id-2',
          '85-id-4',
          '132-id-5',
          '132-id-4',
          '354-id-1'
        ]
      },
      {
        'name': '大师1',
        'energy': 187832,
        'sleepStyles': [
          '11-id-3',
          '80-id-4',
          '53-id-4',
          '115-id-2',
          '127-id-2',
          '214-id-2',
          '359-id-2'
        ]
      },
      {
        'name': '大师2',
        'energy': 220177,
        'sleepStyles': [
          '40-id-1',
          '71-id-1',
          '82-id-3',
          '115-id-4',
          '127-id-4',
          '214-id-4',
          '359-id-4',
          '225-id-2'
        ]
      },
      {
        'name': '大师3',
        'energy': 253169,
        'sleepStyles': [
          '700-id-1',
          '36-id-1',
          '225-id-4'
        ]
      },
      {
        'name': '大师4',
        'energy': 286821,
        'sleepStyles': [
          '12-id-2',
          '26-id-1',
          '354-id-2'
        ]
      },
      {
        'name': '大师5',
        'energy': 321146,
        'sleepStyles': [
          '12-id-4',
          '3-id-1',
          '9-id-1',
          '6-id-1',
          '132-id-3',
          '135-id-1',
          '470-id-1',
          '354-id-4'
        ]
      },
      {
        'name': '大师6',
        'energy': 356158,
        'sleepStyles': [
          '40-id-2',
          '53-id-3',
          '71-id-2',
          '468-id-1'
        ]
      },
      {
        'name': '大师7',
        'energy': 391870,
        'sleepStyles': [
          '40-id-4',
          '71-id-4',
          '700-id-2',
          '289-id-1',
          '462-id-1',
          '36-id-2'
        ]
      },
      {
        'name': '大师8',
        'energy': 428296,
        'sleepStyles': [
          '26-id-2',
          '700-id-4',
          '36-id-4'
        ]
      },
      {
        'name': '大师9',
        'energy': 465451,
        'sleepStyles': [
          '3-id-2',
          '9-id-2',
          '6-id-2',
          '26-id-4',
          '135-id-2'
        ]
      },
      {
        'name': '大师10',
        'energy': 532707,
        'sleepStyles': [
          '12-id-3',
          '3-id-4',
          '9-id-4',
          '6-id-4',
          '135-id-4',
          '468-id-2'
        ]
      },
      {
        'name': '大师11',
        'energy': 601308,
        'sleepStyles': [
          '468-id-4',
          '289-id-2',
          '462-id-2'
        ]
      },
      {
        'name': '大师12',
        'energy': 742056,
        'sleepStyles': [
          '289-id-4'
        ]
      },
      {
        'name': '大师13',
        'energy': 885619,
        'sleepStyles': [
          '700-id-3'
        ]
      },
      {
        'name': '大师14',
        'energy': 1029700,
        'sleepStyles': [
          '26-id-3'
        ]
      },
      {
        'name': '大师15',
        'energy': 1199506,
        'sleepStyles': [
          '135-id-3'
        ]
      },
      {
        'name': '大师16',
        'energy': 1486800,
        'sleepStyles': [
          '468-id-3'
        ]
      },
      {
        'name': '大师17以上',
        'energy': 1795052,
        'sleepStyles': [
          '462-id-3'
        ]
      }
    ]
  },
  {
    name: '天青沙滩',
    id: 'beach',
    pic: 'map2',
    berry: [1, 16, 12],
    scoreList: [{ catchNum: 3, startscore: 0, endscore: 1574329 },
      { catchNum: 4, startscore: 1574330, endscore: 3511233 },
      { catchNum: 5, startscore: 3511234, endscore: 7162380 },
      { catchNum: 6, startscore: 7162381, endscore: 13488262 },
      { catchNum: 7, startscore: 13488264, endscore: 30491709 },
      { catchNum: 8, startscore: 30491710 }],
    levelList: [
      {
        'name': '普通1',
        'energy': 0,
        'sleepStyles': [
          '25-id-1',
          '133-id-1',
          '19-id-1',
          '10-id-1',
          '39-id-1',
          '7-id-1',
          '79-id-1',
          '158-id-1',
          '50-id-1',
          '23-id-1',
          '58-id-1',
          '56-id-1',
          '69-id-1',
          '174-id-1',
          '185-id-1',
          '54-id-1',
          '152-id-1',
          '316-id-1',
          '438-id-1',
          '453-id-1',
          '363-id-1',
          '439-id-1',
          '173-id-1',
          '35-id-1'
        ]
      },
      {
        'name': '普通2',
        'energy': 4822,
        'sleepStyles': [
          '19-id-2',
          '10-id-2',
          '50-id-2',
          '23-id-2',
          '56-id-2',
          '69-id-2',
          '174-id-2',
          '438-id-2',
          '453-id-2',
          '363-id-2'
        ]
      },
      {
        'name': '普通3',
        'energy': 11090,
        'sleepStyles': [
          '7-id-2',
          '79-id-2',
          '158-id-2',
          '58-id-2',
          '54-id-2',
          '152-id-2',
          '316-id-2',
          '439-id-2',
          '173-id-2'
        ]
      },
      {
        'name': '普通4',
        'energy': 18082,
        'sleepStyles': [
          '25-id-2',
          '70-id-1',
          '185-id-2',
          '454-id-1'
        ]
      },
      {
        'name': '普通5',
        'energy': 26520,
        'sleepStyles': [
          '133-id-2',
          '39-id-2',
          '122-id-1',
          '35-id-2'
        ]
      },
      {
        'name': '超级1',
        'energy': 36164,
        'sleepStyles': [
          '25-id-4',
          '133-id-4',
          '19-id-4',
          '10-id-4',
          '39-id-4',
          '7-id-4',
          '8-id-1',
          '158-id-4',
          '159-id-1',
          '23-id-4',
          '24-id-1',
          '58-id-4',
          '20-id-1',
          '56-id-4',
          '69-id-4',
          '174-id-4',
          '54-id-4',
          '152-id-4',
          '316-id-4',
          '438-id-4',
          '453-id-4',
          '57-id-1',
          '363-id-4'
        ]
      },
      {
        'name': '超级2',
        'energy': 48700,
        'sleepStyles': [
          '55-id-1',
          '132-id-1'
        ]
      },
      {
        'name': '超级3',
        'energy': 63889,
        'sleepStyles': [
          '19-id-3',
          '10-id-3',
          '50-id-3',
          '23-id-3',
          '56-id-3',
          '69-id-3',
          '70-id-2',
          '174-id-3',
          '80-id-1',
          '438-id-3',
          '453-id-3',
          '454-id-2',
          '363-id-3'
        ]
      },
      {
        'name': '超级4',
        'energy': 81971,
        'sleepStyles': [
          '7-id-3',
          '79-id-3',
          '158-id-3',
          '58-id-3',
          '70-id-4',
          '54-id-3',
          '152-id-3',
          '316-id-3',
          '454-id-4',
          '115-id-1',
          '127-id-1',
          '214-id-1',
          '439-id-3',
          '122-id-2',
          '173-id-3'
        ]
      },
      {
        'name': '超级5',
        'energy': 101499,
        'sleepStyles': [
          '25-id-3',
          '8-id-2',
          '159-id-2',
          '24-id-2',
          '20-id-2',
          '185-id-3',
          '57-id-2'
        ]
      },
      {
        'name': '高级1',
        'energy': 122474,
        'sleepStyles': [
          '133-id-3',
          '39-id-3',
          '8-id-4',
          '79-id-4',
          '159-id-4',
          '24-id-4',
          '20-id-4',
          '185-id-4',
          '55-id-2',
          '57-id-4',
          '132-id-2',
          '439-id-4',
          '173-id-4',
          '35-id-3',
          '35-id-4'
        ]
      },
      {
        'name': '高级2',
        'energy': 144654,
        'sleepStyles': [
          '80-id-2',
          '55-id-4',
          '132-id-7',
          '132-id-4'
        ]
      },
      {
        'name': '高级3',
        'energy': 168763,
        'sleepStyles': [
          '80-id-4',
          '115-id-2',
          '127-id-2',
          '214-id-2'
        ]
      },
      {
        'name': '高级4',
        'energy': 195283,
        'sleepStyles': [
          '40-id-1',
          '70-id-3',
          '454-id-3',
          '127-id-4',
          '214-id-4'
        ]
      },
      {
        'name': '高级5',
        'energy': 224455,
        'sleepStyles': [
          '122-id-3',
          '36-id-1'
        ]
      },
      {
        'name': '大师1',
        'energy': 256544,
        'sleepStyles': [
          '8-id-3',
          '159-id-3',
          '24-id-3',
          '20-id-3',
          '57-id-3',
          '115-id-4',
          '122-id-4'
        ]
      },
      {
        'name': '大师2',
        'energy': 291842,
        'sleepStyles': [
          '9-id-1',
          '55-id-3',
          '132-id-3',
          '134-id-1',
          '160-id-1',
          '199-id-1'
        ]
      },
      {
        'name': '大师3',
        'energy': 330670,
        'sleepStyles': [
          '40-id-2',
          '80-id-3'
        ]
      },
      {
        'name': '大师4',
        'energy': 373381,
        'sleepStyles': [
          '40-id-4',
          '115-id-3',
          '127-id-3',
          '214-id-3',
          '36-id-2'
        ]
      },
      {
        'name': '大师5',
        'energy': 420363,
        'sleepStyles': []
      },
      {
        'name': '大师6',
        'energy': 472043,
        'sleepStyles': [
          '9-id-2',
          '134-id-2',
          '160-id-2',
          '199-id-2',
          '36-id-4'
        ]
      },
      {
        'name': '大师7',
        'energy': 528891,
        'sleepStyles': [
          '9-id-4',
          '134-id-4',
          '160-id-4',
          '199-id-4'
        ]
      },
      {
        'name': '大师8',
        'energy': 591424,
        'sleepStyles': []
      },
      {
        'name': '大师9',
        'energy': 660210,
        'sleepStyles': [
          '40-id-3'
        ]
      },
      {
        'name': '大师10',
        'energy': 735875,
        'sleepStyles': [
          '36-id-3'
        ]
      },
      {
        'name': '大师11',
        'energy': 819107,
        'sleepStyles': []
      },
      {
        'name': '大师12',
        'energy': 910662,
        'sleepStyles': [
          '9-id-3',
          '134-id-3',
          '160-id-3',
          '199-id-3'
        ]
      },
      {
        'name': '大师13',
        'energy': 1018462,
        'sleepStyles': []
      },
      {
        'name': '大师14',
        'energy': 1184155,
        'sleepStyles': []
      },
      {
        'name': '大师15',
        'energy': 1379432,
        'sleepStyles': []
      },
      {
        'name': '大师16',
        'energy': 1709820,
        'sleepStyles': []
      },
      {
        'name': '大师17以上',
        'energy': 2064310,
        'sleepStyles': []
      }
    ]
  },
  {
    name: '灰褐洞窟',
    id: 'hole',
    pic: 'map3',
    berry: [10, 15, 14],
    scoreList: [{ catchNum: 3, startscore: 0, endscore: 1829446 },
      { catchNum: 4, startscore: 1829448, endscore: 4626378 },
      { catchNum: 5, startscore: 4626380, endscore: 9935822 },
      { catchNum: 6, startscore: 9935824, endscore: 19563552 },
      { catchNum: 7, startscore: 19563553, endscore: 43706480 },
      { catchNum: 8, startscore: 43706520 }],
    levelList: [
      {
        'name': '普通1',
        'energy': 0,
        'sleepStyles': [
          '133-id-1',
          '19-id-1',
          '19-id-2',
          '39-id-1',
          '4-id-1',
          '50-id-1',
          '50-id-2',
          '175-id-1',
          '175-id-2',
          '74-id-1',
          '74-id-2',
          '23-id-1',
          '23-id-2',
          '104-id-1',
          '104-id-2',
          '155-id-1',
          '58-id-1',
          '174-id-1',
          '174-id-2',
          '92-id-1',
          '92-id-2',
          '202-id-1',
          '316-id-1',
          '360-id-1',
          '360-id-2',
          '453-id-1',
          '453-id-2',
          '246-id-1',
          '447-id-1',
          '228-id-1',
          '173-id-1',
          '35-id-1'
        ]
      },
      {
        'name': '普通2',
        'energy': 6885,
        'sleepStyles': [
          '4-id-2',
          '155-id-2',
          '58-id-2',
          '316-id-2',
          '228-id-2',
          '173-id-2',
          '353-id-1'
        ]
      },
      {
        'name': '普通3',
        'energy': 15835,
        'sleepStyles': [
          '105-id-1',
          '317-id-1',
          '454-id-1',
          '447-id-2'
        ]
      },
      {
        'name': '普通4',
        'energy': 25817,
        'sleepStyles': [
          '133-id-2',
          '39-id-2',
          '75-id-1',
          '202-id-2',
          '246-id-2',
          '35-id-2'
        ]
      },
      {
        'name': '普通5',
        'energy': 37865,
        'sleepStyles': [
          '5-id-1',
          '24-id-1',
          '20-id-1',
          '93-id-1'
        ]
      },
      {
        'name': '超级1',
        'energy': 51635,
        'sleepStyles': [
          '133-id-4',
          '19-id-4',
          '39-id-4',
          '4-id-4',
          '51-id-1',
          '175-id-4',
          '74-id-4',
          '23-id-4',
          '104-id-4',
          '155-id-4',
          '58-id-4',
          '174-id-4',
          '316-id-4',
          '360-id-4',
          '453-id-4',
          '132-id-1',
          '246-id-4',
          '247-id-1',
          '447-id-4',
          '228-id-4',
          '353-id-2'
        ]
      },
      {
        'name': '超级2',
        'energy': 69534,
        'sleepStyles': [
          '19-id-3',
          '50-id-3',
          '175-id-3',
          '74-id-3',
          '23-id-3',
          '104-id-3',
          '174-id-3',
          '92-id-3',
          '105-id-2',
          '317-id-2',
          '360-id-3',
          '453-id-3',
          '454-id-2',
          '302-id-1',
          '95-id-1'
        ]
      },
      {
        'name': '超级3',
        'energy': 91221,
        'sleepStyles': [
          '4-id-3',
          '75-id-2',
          '155-id-3',
          '58-id-3',
          '105-id-4',
          '316-id-3',
          '454-id-4',
          '228-id-3',
          '173-id-3'
        ]
      },
      {
        'name': '超级4',
        'energy': 117038,
        'sleepStyles': [
          '5-id-2',
          '24-id-2',
          '20-id-2',
          '93-id-2',
          '447-id-3'
        ]
      },
      {
        'name': '超级5',
        'energy': 144921,
        'sleepStyles': [
          '133-id-3',
          '39-id-3',
          '5-id-4',
          '51-id-2',
          '20-id-4',
          '202-id-3',
          '132-id-2',
          '246-id-3',
          '247-id-2',
          '35-id-3'
        ]
      },
      {
        'name': '高级1',
        'energy': 174869,
        'sleepStyles': [
          '75-id-4',
          '24-id-4',
          '202-id-4',
          '317-id-4',
          '132-id-6',
          '132-id-4',
          '247-id-4',
          '302-id-2',
          '173-id-4',
          '35-id-4',
          '354-id-1',
          '95-id-2'
        ]
      },
      {
        'name': '高级2',
        'energy': 206538,
        'sleepStyles': [
          '302-id-4',
          '353-id-3'
        ]
      },
      {
        'name': '高级3',
        'energy': 240961,
        'sleepStyles': [
          '40-id-1',
          '105-id-3',
          '317-id-3',
          '454-id-3'
        ]
      },
      {
        'name': '高级4',
        'energy': 278826,
        'sleepStyles': [
          '75-id-3',
          '36-id-1'
        ]
      },
      {
        'name': '高级5',
        'energy': 320478,
        'sleepStyles': [
          '5-id-3',
          '24-id-3',
          '20-id-3',
          '93-id-3',
          '76-id-1',
          '94-id-1',
          '354-id-2'
        ]
      },
      {
        'name': '大师1',
        'energy': 366295,
        'sleepStyles': [
          '51-id-3',
          '6-id-1',
          '136-id-1',
          '196-id-1',
          '197-id-1',
          '247-id-3',
          '354-id-4'
        ]
      },
      {
        'name': '大师2',
        'energy': 416694,
        'sleepStyles': [
          '40-id-2',
          '302-id-3',
          '95-id-3',
          '208-id-1'
        ]
      },
      {
        'name': '大师3',
        'energy': 472133,
        'sleepStyles': [
          '40-id-4',
          '36-id-2'
        ]
      },
      {
        'name': '大师4',
        'energy': 533116,
        'sleepStyles': [
          '76-id-2',
          '94-id-2'
        ]
      },
      {
        'name': '大师5',
        'energy': 600197,
        'sleepStyles': [
          '6-id-2',
          '76-id-4',
          '94-id-4',
          '196-id-2',
          '197-id-2'
        ]
      },
      {
        'name': '大师6',
        'energy': 673986,
        'sleepStyles': [
          '6-id-4',
          '196-id-4',
          '197-id-4',
          '248-id-1',
          '36-id-4',
          '354-id-3',
          '208-id-2'
        ]
      },
      {
        'name': '大师7',
        'energy': 755154,
        'sleepStyles': []
      },
      {
        'name': '大师8',
        'energy': 844439,
        'sleepStyles': [
          '40-id-3'
        ]
      },
      {
        'name': '大师9',
        'energy': 942653,
        'sleepStyles': [
          '36-id-3'
        ]
      },
      {
        'name': '大师10',
        'energy': 1050688,
        'sleepStyles': [
          '76-id-3',
          '94-id-3',
          '248-id-2'
        ]
      },
      {
        'name': '大师11',
        'energy': 1169527,
        'sleepStyles': [
          '6-id-3',
          '196-id-3',
          '197-id-3',
          '248-id-4'
        ]
      },
      {
        'name': '大师12',
        'energy': 1300250,
        'sleepStyles': [
          '208-id-3'
        ]
      },
      {
        'name': '大师13',
        'energy': 1444045,
        'sleepStyles': []
      },
      {
        'name': '大师14',
        'energy': 1602220,
        'sleepStyles': []
      },
      {
        'name': '大师15',
        'energy': 1776213,
        'sleepStyles': []
      },
      {
        'name': '大师16',
        'energy': 1967605,
        'sleepStyles': [
          '248-id-3'
        ]
      },
      {
        'name': '大师17以上',
        'energy': 2333568,
        'sleepStyles': []
      }
    ]
  },
  {
    name: '白花雪原',
    id: 'snow',
    pic: 'map4',
    berry: [11, 7, 17],
    scoreList: [{ catchNum: 3, startscore: 0, endscore: 2821335 },
      { catchNum: 4, startscore: 2821916, endscore: 7162380 },
      { catchNum: 5, startscore: 7162464, endscore: 15469173 },
      { catchNum: 6, startscore: 15469235, endscore: 28772748 },
      { catchNum: 7, startscore: 28772766, endscore: 65691968 },
      { catchNum: 8, startscore: 65701088 }],
    levelList: [
      {
        'name': '普通1',
        'energy': 0,
        'sleepStyles': [
          '133-id-1',
          '19-id-1',
          '19-id-2',
          '39-id-1',
          '79-id-1',
          '79-id-2',
          '175-id-1',
          '175-id-2',
          '74-id-1',
          '74-id-2',
          '104-id-1',
          '104-id-2',
          '56-id-1',
          '56-id-2',
          '69-id-1',
          '69-id-2',
          '179-id-1',
          '179-id-2',
          '54-id-1',
          '54-id-2',
          '92-id-1',
          '92-id-2',
          '202-id-1',
          '316-id-1',
          '316-id-2',
          '333-id-1',
          '333-id-2',
          '360-id-1',
          '360-id-2',
          '453-id-1',
          '453-id-2',
          '287-id-1',
          '287-id-2',
          '447-id-1',
          '363-id-1',
          '363-id-2',
          '173-id-1',
          '173-id-2',
          '35-id-1',
          '459-id-1',
          '459-id-2'
        ]
      },
      {
        'name': '普通2',
        'energy': 10486,
        'sleepStyles': [
          '105-id-1',
          '180-id-1',
          '317-id-1',
          '454-id-1',
          '447-id-2',
          '364-id-1'
        ]
      },
      {
        'name': '普通3',
        'energy': 24118,
        'sleepStyles': [
          '133-id-2',
          '39-id-2',
          '202-id-2',
          '288-id-1',
          '35-id-2'
        ]
      },
      {
        'name': '普通4',
        'energy': 39323,
        'sleepStyles': [
          '20-id-1',
          '93-id-1',
          '57-id-1',
          '176-id-1'
        ]
      },
      {
        'name': '普通5',
        'energy': 57673,
        'sleepStyles': [
          '132-id-1'
        ]
      },
      {
        'name': '超级1',
        'energy': 78645,
        'sleepStyles': [
          '133-id-4',
          '19-id-3',
          '19-id-4',
          '39-id-4',
          '175-id-3',
          '175-id-4',
          '74-id-3',
          '74-id-4',
          '104-id-3',
          '104-id-4',
          '56-id-3',
          '56-id-4',
          '69-id-3',
          '69-id-4',
          '179-id-3',
          '179-id-4',
          '54-id-4',
          '80-id-1',
          '92-id-3',
          '105-id-2',
          '180-id-2',
          '316-id-4',
          '317-id-2',
          '333-id-3',
          '333-id-4',
          '360-id-3',
          '360-id-4',
          '453-id-3',
          '453-id-4',
          '454-id-2',
          '447-id-4',
          '363-id-3',
          '363-id-4',
          '364-id-2'
        ]
      },
      {
        'name': '超级2',
        'energy': 105909,
        'sleepStyles': [
          '79-id-3',
          '54-id-3',
          '105-id-4',
          '180-id-4',
          '316-id-3',
          '454-id-4',
          '359-id-1',
          '287-id-3',
          '288-id-2',
          '334-id-1',
          '173-id-3',
          '459-id-3'
        ]
      },
      {
        'name': '超级3',
        'energy': 138940,
        'sleepStyles': [
          '20-id-2',
          '93-id-2',
          '57-id-2',
          '176-id-2',
          '447-id-3',
          '225-id-1'
        ]
      },
      {
        'name': '超级4',
        'energy': 178262,
        'sleepStyles': [
          '133-id-3',
          '39-id-3',
          '20-id-4',
          '202-id-3',
          '132-id-2',
          '176-id-4',
          '35-id-3'
        ]
      },
      {
        'name': '超级5',
        'energy': 220730,
        'sleepStyles': [
          '80-id-2',
          // '132-id-8',
          '132-id-4'
        ]
      },
      {
        'name': '高级1',
        'energy': 266344,
        'sleepStyles': [
          '79-id-4',
          '80-id-4',
          '202-id-4',
          '317-id-4',
          '57-id-4',
          '359-id-2',
          '287-id-4',
          '288-id-4',
          '334-id-2',
          '364-id-4',
          '173-id-4',
          '35-id-4',
          '459-id-4'
        ]
      },
      {
        'name': '高级2',
        'energy': 314580,
        'sleepStyles': [
          '105-id-3',
          '180-id-3',
          '317-id-3',
          '454-id-3',
          '181-id-1',
          '359-id-4',
          '334-id-4',
          '448-id-1',
          '364-id-3',
          '365-id-1',
          '225-id-2',
          '460-id-1'
        ]
      },
      {
        'name': '高级3',
        'energy': 367010,
        'sleepStyles': [
          '288-id-3',
          '36-id-1',
          '225-id-4'
        ]
      },
      {
        'name': '高级4',
        'energy': 424683,
        'sleepStyles': [
          '20-id-3',
          '93-id-3',
          '57-id-3',
          '176-id-3'
        ]
      },
      {
        'name': '高级5',
        'energy': 488123,
        'sleepStyles': [
          '471-id-1'
        ]
      },
      {
        'name': '大师1',
        'energy': 557907,
        'sleepStyles': [
          '80-id-3',
          '181-id-2',
          '448-id-2',
          '365-id-2',
          '460-id-2'
        ]
      },
      {
        'name': '大师2',
        'energy': 634669,
        'sleepStyles': [
          '181-id-4',
          '359-id-3',
          '289-id-1',
          '334-id-3',
          '448-id-4',
          '365-id-4',
          '36-id-2'
        ]
      },
      {
        'name': '大师3',
        'energy': 719107,
        'sleepStyles': [
          '225-id-3'
        ]
      },
      {
        'name': '大师4',
        'energy': 811989,
        'sleepStyles': [
          '471-id-2'
        ]
      },
      {
        'name': '大师5',
        'energy': 914159,
        'sleepStyles': [
          '471-id-4'
        ]
      },
      {
        'name': '大师6',
        'energy': 1026546,
        'sleepStyles': [
          '289-id-2',
          '36-id-4'
        ]
      },
      {
        'name': '大师7',
        'energy': 1150172,
        'sleepStyles': [
          '181-id-3',
          '289-id-4',
          '448-id-3',
          '365-id-3',
          '460-id-3'
        ]
      },
      {
        'name': '大师8',
        'energy': 1286161,
        'sleepStyles': [
          '36-id-3'
        ]
      },
      {
        'name': '大师9',
        'energy': 1435749,
        'sleepStyles': []
      },
      {
        'name': '大师10',
        'energy': 1600296,
        'sleepStyles': [
          '471-id-3'
        ]
      },
      {
        'name': '大师11',
        'energy': 1781298,
        'sleepStyles': []
      },
      {
        'name': '大师12',
        'energy': 1980400,
        'sleepStyles': [
          '289-id-3'
        ]
      },
      {
        'name': '大师13',
        'energy': 2199412,
        'sleepStyles': []
      },
      {
        'name': '大师14',
        'energy': 2440325,
        'sleepStyles': []
      },
      {
        'name': '大师15',
        'energy': 2705329,
        'sleepStyles': []
      },
      {
        'name': '大师16',
        'energy': 2996833,
        'sleepStyles': []
      },
      {
        'name': '大师17以上',
        'energy': 3317487,
        'sleepStyles': []
      }
    ]
  },
  {
    name: '宝蓝湖畔',
    id: 'lake',
    pic: 'map5',
    berry: [4, 18, 6],
    scoreList: [{ catchNum: 3, startscore: 0, endscore: 3121400 },
      { catchNum: 4, startscore: 3156000, endscore: 7716262 },
      { catchNum: 5, startscore: 7734330, endscore: 16647494 },
      { catchNum: 6, startscore: 16691772, endscore: 30483200 },
      { catchNum: 7, startscore: 30514962, endscore: 68615304 },
      { catchNum: 8, startscore: 68689152 }],
    levelList: [
      {
        'name': '普通1',
        'energy': 0,
        'sleepStyles': [
          '25-id-1',
          '25-id-2',
          '133-id-1',
          '52-id-1',
          '52-id-2',
          '172-id-1',
          '172-id-2',
          '1-id-1',
          '1-id-2',
          '39-id-1',
          '7-id-1',
          '7-id-2',
          '79-id-1',
          '79-id-2',
          '175-id-1',
          '175-id-2',
          '23-id-1',
          '23-id-2',
          '56-id-1',
          '56-id-2',
          '69-id-1',
          '69-id-2',
          '70-id-1',
          '174-id-1',
          '174-id-2',
          '185-id-1',
          '185-id-2',
          '54-id-1',
          '54-id-2',
          '84-id-1',
          '84-id-2',
          '152-id-1',
          '152-id-2',
          '202-id-1',
          '333-id-1',
          '333-id-2',
          '360-id-1',
          '360-id-2',
          '447-id-1',
          '447-id-2',
          '173-id-1',
          '173-id-2',
          '35-id-1',
          '147-id-1',
          '280-id-1',
          '759-id-1'
        ]
      },
      {
        'name': '普通2',
        'energy': 12938,
        'sleepStyles': [
          '133-id-2',
          '39-id-2',
          '202-id-2',
          '35-id-2',
          '280-id-2'
        ]
      },
      {
        'name': '普通3',
        'energy': 29756,
        'sleepStyles': [
          '2-id-1',
          '8-id-1',
          '153-id-1',
          '57-id-1',
          '176-id-1',
          '147-id-2'
        ]
      },
      {
        'name': '普通4',
        'energy': 48515,
        'sleepStyles': [
          '85-id-1',
          '132-id-1'
        ]
      },
      {
        'name': '普通5',
        'energy': 71156,
        'sleepStyles': [
          '172-id-3',
          '175-id-3',
          '23-id-3',
          '56-id-3',
          '69-id-3',
          '70-id-2',
          '174-id-3',
          '80-id-1',
          '84-id-3',
          '333-id-3',
          '360-id-3',
          '53-id-1',
          '281-id-1',
          '759-id-2'
        ]
      },
      {
        'name': '超级1',
        'energy': 97031,
        'sleepStyles': [
          '25-id-4',
          '133-id-4',
          '52-id-3',
          '52-id-4',
          '172-id-4',
          '1-id-3',
          '1-id-4',
          '39-id-4',
          '7-id-3',
          '7-id-4',
          '79-id-3',
          '175-id-4',
          '23-id-4',
          '56-id-4',
          '69-id-4',
          '70-id-4',
          '174-id-4',
          '54-id-3',
          '54-id-4',
          '84-id-4',
          '152-id-3',
          '152-id-4',
          '333-id-4',
          '360-id-4',
          '334-id-1',
          '447-id-4',
          '173-id-3',
          '148-id-1',
          '280-id-4'
        ]
      },
      {
        'name': '超级2',
        'energy': 130668,
        'sleepStyles': [
          '25-id-3',
          '2-id-2',
          '8-id-2',
          '185-id-3',
          '153-id-2',
          '57-id-2',
          '176-id-2',
          '447-id-3'
        ]
      },
      {
        'name': '超级3',
        'energy': 171420,
        'sleepStyles': [
          '133-id-3',
          '39-id-3',
          '8-id-4',
          '153-id-4',
          '202-id-3',
          '85-id-2',
          '132-id-2',
          '176-id-4',
          '35-id-3',
          '280-id-3'
        ]
      },
      {
        'name': '超级4',
        'energy': 219936,
        'sleepStyles': [
          '80-id-2',
          '53-id-2',
          '85-id-4',
          '132-id-10',
          '132-id-4',
          '147-id-3',
          '281-id-2'
        ]
      },
      {
        'name': '超级5',
        'energy': 272333,
        'sleepStyles': [
          '334-id-2',
          '148-id-2',
          '760-id-1'
        ]
      },
      {
        'name': '高级1',
        'energy': 328610,
        'sleepStyles': [
          '2-id-4',
          '79-id-4',
          '70-id-3',
          '185-id-4',
          '80-id-4',
          '202-id-4',
          '53-id-4',
          '57-id-4',
          '71-id-1',
          '334-id-4',
          '173-id-4',
          '35-id-4',
          '147-id-4',
          '281-id-4',
          '759-id-3',
          '759-id-4'
        ]
      },
      {
        'name': '高级2',
        'energy': 388122,
        'sleepStyles': [
          '36-id-1'
        ]
      },
      {
        'name': '高级3',
        'energy': 452809,
        'sleepStyles': [
          '2-id-3',
          '8-id-3',
          '153-id-3',
          '57-id-3',
          '176-id-3'
        ]
      },
      {
        'name': '高级4',
        'energy': 522025,
        'sleepStyles': [
          '3-id-1',
          '9-id-1',
          '85-id-3',
          '132-id-3',
          '154-id-1',
          '196-id-1',
          '470-id-1',
          '760-id-2'
        ]
      },
      {
        'name': '高级5',
        'energy': 596086,
        'sleepStyles': [
          '80-id-3',
          '53-id-3',
          '71-id-2',
          '281-id-3'
        ]
      },
      {
        'name': '大师1',
        'energy': 675330,
        'sleepStyles': [
          '71-id-4',
          '334-id-3',
          '36-id-2',
          '148-id-3',
          '148-id-4',
          '282-id-1'
        ]
      },
      {
        'name': '大师2',
        'energy': 760123,
        'sleepStyles': []
      },
      {
        'name': '大师3',
        'energy': 850851,
        'sleepStyles': [
          '3-id-2',
          '9-id-2',
          '154-id-2',
          '196-id-2',
          '470-id-2',
          '475-id-1'
        ]
      },
      {
        'name': '大师4',
        'energy': 958702,
        'sleepStyles': [
          '3-id-4',
          '9-id-4',
          '154-id-4',
          '196-id-4',
          '470-id-4'
        ]
      },
      {
        'name': '大师5',
        'energy': 1075709,
        'sleepStyles': [
          '282-id-2',
          '760-id-3'
        ]
      },
      {
        'name': '大师6',
        'energy': 1202596,
        'sleepStyles': [
          '71-id-3',
          '36-id-4',
          '149-id-1',
          '282-id-4',
          '760-id-4'
        ]
      },
      {
        'name': '大师7',
        'energy': 1340143,
        'sleepStyles': [
          '36-id-3',
          '475-id-2'
        ]
      },
      {
        'name': '大师8',
        'energy': 1489190,
        'sleepStyles': [
          '475-id-4'
        ]
      },
      {
        'name': '大师9',
        'energy': 1650645,
        'sleepStyles': [
          '3-id-3',
          '9-id-3',
          '154-id-3',
          '196-id-3',
          '470-id-3'
        ]
      },
      {
        'name': '大师10',
        'energy': 1825483,
        'sleepStyles': [
          '149-id-2'
        ]
      },
      {
        'name': '大师11',
        'energy': 2014758,
        'sleepStyles': [
          '149-id-4',
          '282-id-3'
        ]
      },
      {
        'name': '大师12',
        'energy': 2219603,
        'sleepStyles': []
      },
      {
        'name': '大师13',
        'energy': 2441243,
        'sleepStyles': [
          '475-id-3'
        ]
      },
      {
        'name': '大师14',
        'energy': 2680993,
        'sleepStyles': []
      },
      {
        'name': '大师15',
        'energy': 2925574,
        'sleepStyles': []
      },
      {
        'name': '大师16',
        'energy': 3188730,
        'sleepStyles': [
          '149-id-3'
        ]
      },
      {
        'name': '大师17以上',
        'energy': 3454577,
        'sleepStyles': []
      }
    ]
  }
]
export {
  mapSplitVer,
  gameMap
}