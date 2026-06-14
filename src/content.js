export const steamUrl = "https://steamcommunity.com/sharedfiles/filedetails/?id=3738922774";

export const copy = {
  en: {
    code: "EN",
    otherCode: "中文",
    title: "More Historical Leaders",
    headerTitle: "MORE HISTORICAL LEADERS",
    subtitle: "A Civilization VI Mod",
    intro: "Adds more historical leaders and civilizations to Civilization VI.",
    leaders: "Leaders",
    leaderAbility: "Leader Ability",
    civilizationAbility: "Civilization Ability",
    uniqueUnit: "Unique Unit",
    uniqueBuilding: "Unique Building",
    workshop: "Steam Workshop",
    comments: "Comments",
    name: "Name",
    message: "Message",
    submit: "Submit",
    namePlaceholder: "Enter your name",
    messagePlaceholder: "Share your thoughts about this mod...",
  },
  zh: {
    code: "中文",
    otherCode: "EN",
    title: "更多历史领袖",
    headerTitle: "更多历史领袖",
    subtitle: "文明 VI 模组",
    intro: "为《文明 VI》加入更多历史领袖与文明。",
    leaders: "领袖",
    leaderAbility: "领袖能力",
    civilizationAbility: "文明能力",
    uniqueUnit: "特色单位",
    uniqueBuilding: "特色建筑",
    workshop: "Steam 创意工坊",
    comments: "留言",
    name: "名称",
    message: "留言",
    submit: "提交",
    namePlaceholder: "输入你的名称",
    messagePlaceholder: "写下你对这个模组的看法...",
  },
};

export const leaders = [
  {
    id: "chiang",
    accent: "green",
    portrait: "/assets/portrait-chiang.png",
    emblem: "/assets/emblem-roc.png",
    en: {
      name: "Chiang Kai-shek",
      civilization: "Republic of China",
      quote:
        "The Republic of China looks to your government to hold the coast, modernize the army, and build disciplined institutions.",
      leaderAbility: {
        name: "Island Commandos",
        description:
          "Coastal cities gain +5 City Ranged Strike Strength. Trade Routes originating in Coastal cities provide +2 Gold. Coastal cities gain +20% Production toward land and naval combat units. Units gain +5 Combat Strength when defending in own territory. Each Harbor building provides +1 Production and +1 Culture. Coast tiles adjacent to a Harbor district provide +2 Culture.",
      },
      civilizationAbility: {
        name: "National Government",
        description:
          "May construct the Whampoa Military Academy. Cities with an established Governor gain +15% Production toward districts and buildings. Whenever a city completes a district, gain Science and Culture equal to 10% of that district's Production cost.",
      },
      uniqueUnit: {
        name: "German-trained Division",
        description:
          "A Modern era melee unit replacing Infantry. Unlocks earlier at Rifling, costs 10% less Production, has lower Combat Strength, and does not require Oil maintenance. Gains +5 Combat Strength on Coast or land adjacent to Coast.",
      },
      uniqueBuilding: {
        name: "Whampoa Military Academy",
        description:
          "A one-per-civilization Encampment building. Provides Production, Culture, Science, and Great General points. Land combat units trained in this city receive one free promotion.",
      },
    },
    zh: {
      name: "蒋介石",
      civilization: "中华民国",
      quote: "中华民国需要国民政府守住海岸、整训军队，并建立有纪律的现代制度。",
      leaderAbility: {
        name: "海岛奇兵",
        description:
          "沿海城市+5城市远程攻击力。起点为沿海城市的贸易路线+2金币。沿海城市训练陆地和海军战斗单位时+20%生产力。单位在己方领土防御时+5战斗力。每座港口建筑提供+1生产力和+1文化值。与港口区域相邻的海岸单元格+2文化值。",
      },
      civilizationAbility: {
        name: "国民政府",
        description:
          "可以建造黄埔军校。拥有总督的城市建造区域和建筑时+15%生产力。每当城市建成一个区域时，获得相当于该区域生产力成本10%的科技值和文化值。",
      },
      uniqueUnit: {
        name: "德械师",
        description:
          "蒋介石特色现代近战单位，取代步兵。在膛线科技解锁，生产成本降低10%，不需要石油维护。在海岸或与海岸相邻的陆地单元格战斗时+5战斗力。",
      },
      uniqueBuilding: {
        name: "黄埔军校",
        description:
          "中华民国特色建筑。提供生产力、文化值、科技值和大将军点数。此城训练的陆地战斗单位获得一次免费晋升。每个文明只能建造一座。",
      },
    },
  },
  {
    id: "hitler",
    accent: "burgundy",
    portrait: "/assets/portrait-hitler.png",
    emblem: "/assets/emblem-third-reich.png",
    en: {
      name: "Adolf Hitler",
      civilization: "Third Reich",
      quote:
        "A high-risk conquest leader built around military preparation, rearmament, and industrial-era rapid warfare.",
      leaderAbility: {
        name: "Revanchist Mobilization",
        description:
          "+20% Production toward military units. Unit upgrades cost 20% less Gold. Capturing an enemy city grants Gold equal to 30% of your current treasury. All cities gain +20 Loyalty. After reaching the Industrial Era, heavy cavalry, light cavalry, fighter, and bomber units gain +1 Movement and +5 Combat Strength when attacking damaged units. Land attackers suffer -5 Combat Strength on tundra or snow. Diplomatic Favor gains from alliances, suzerainty, emergencies, and Great People are reduced by 50%.",
      },
      civilizationAbility: {
        name: "Military Preparation",
        description:
          "+25% Production toward Encampment districts and Encampment buildings. Cities with an Encampment gain +10% Production toward melee, anti-cavalry, and ranged units. While at war, gain +100% Production toward military units in the capital.",
      },
      uniqueUnit: {
        name: "Tiger Heavy Tank",
        description:
          "Replaces the Tank. Gains additional Combat Strength, including bonuses against cavalry and city defenses, but costs more to produce and maintain and uses more Oil.",
      },
      uniqueBuilding: {
        name: "Armaments Office",
        description:
          "Replaces the Armory. Cheaper to build, provides Production and Great General points, boosts unit training in the city, and reduces Amenities.",
      },
    },
    zh: {
      name: "阿道夫·希特勒",
      civilization: "德意志第三帝国",
      quote: "高风险征服型领袖，围绕军备准备、再武装与工业时代快速战争展开。",
      leaderAbility: {
        name: "复仇主义动员",
        description:
          "训练军事单位时+20%生产力。军事单位升级费用减少20%金币。占领敌方城市时，获得相当于当前国库30%的金币。所有城市忠诚度+20。进入工业时代后，重骑兵、轻骑兵、战斗机和轰炸机单位+1移动力，攻击受损单位时+5战斗力。在冻土或雪地上攻击时-5战斗力。来自同盟、宗主国、紧急事件和伟人的外交支持收益降低50%。",
      },
      civilizationAbility: {
        name: "军国准备",
        description:
          "军营区域和军营建筑+25%生产力。拥有军营的城市训练近战、抗骑兵和远程单位时+10%生产力。处于战争状态时，首都训练军事单位时+100%生产力。",
      },
      uniqueUnit: {
        name: "虎式重坦",
        description:
          "替代坦克。获得额外战斗力，并对骑兵和城市防御有额外加成。生产和维护成本更高，消耗更多石油。",
      },
      uniqueBuilding: {
        name: "军备局",
        description:
          "替代兵工厂。建造成本更低，提供生产力和大将军点数，提高所在城市的单位训练效率，但降低宜居度。",
      },
    },
  },
  {
    id: "stalin",
    accent: "red",
    portrait: "/assets/portrait-stalin.png",
    emblem: "/assets/flag-soviet.svg",
    en: {
      name: "Joseph Stalin",
      civilization: "Soviet Union",
      quote:
        "A production and defensive war leader built around industrial planning, powered cities, and mass armored formations.",
      leaderAbility: {
        name: "Five-Year Plan",
        description:
          "+30% Production toward Industrial Zone districts and buildings in Industrial Zones. Industrial Zones gain the following additional standard adjacency bonuses: +1 Production from each adjacent specialty district, +1 Production from each adjacent Mine, +1 Production from each adjacent Quarry, and +2 Production from each adjacent Strategic Resource. Cities with 10 or more Population gain +10% Science. Workshops provide +1 Production, Factories +2 Production, and Power Plants +3 Production. Powered cities gain +15% Production toward districts, buildings, and wonders.",
      },
      civilizationAbility: {
        name: "Great Patriotic War",
        description:
          "All cities grow 10% faster. Domestic Trade Routes from a city provide the origin city +1 Production for each specialty district in the destination city, and +1 Science and +1 Culture for every 2 specialty districts in the destination city. While at war, units gain +5 Combat Strength in home territory, cities gain +10 ranged strike strength, and cities gain +20% Production toward military units.",
      },
      uniqueUnit: {
        name: "T-34",
        description:
          "Soviet Union unique Modern Era heavy cavalry unit. Replaces the Tank. Cheaper to produce and maintain. Requires Oil to train, but has no Oil maintenance. Lower Combat Strength than the Tank and ignores enemy zone of control.",
      },
      uniqueBuilding: {
        name: "Collective Farm",
        description:
          "Soviet Union unique City Center building. Replaces the Granary and is cheaper to build. Provides +3 Food and +3 Housing. Each trade route from this city provides this city +2 Production.",
      },
    },
    zh: {
      name: "约瑟夫·斯大林",
      civilization: "苏维埃联盟",
      quote: "围绕工业计划、电力城市与装甲部队量产展开的生产和防御战争型领袖。",
      leaderAbility: {
        name: "五年计划",
        description:
          "建造工业区及其中建筑时，+30%生产力。工业区获得以下额外标准相邻加成：每相邻一个特色区域、矿山或采石场+1生产力；每相邻一处战略资源+2生产力。城市人口达到10或以上时，该城市+10%科技值。工作坊额外+1生产力，工厂+2生产力，发电厂+3生产力。拥有充足电力供应的城市，建造区域、建筑和奇观时+15%生产力。",
      },
      civilizationAbility: {
        name: "伟大的卫国战争",
        description:
          "所有城市人口增长速度提高10%。从该城市出发的国内贸易路线，根据目的地城市拥有的特色区域数量，为起点城市提供：每个特色区域+1生产力；每两个特色区域+1科技值和+1文化值。处于战争时，单位在本国领土内+5战斗力，城市远程攻击战斗力+10，训练军事单位时+20%生产力。",
      },
      uniqueUnit: {
        name: "T-34",
        description:
          "苏维埃联盟特色现代时期重骑兵单位，替代坦克。生产成本和维护费更低。生产时需要石油，但每回合无需消耗石油维护。战斗力低于普通坦克，并无视敌方控制区。",
      },
      uniqueBuilding: {
        name: "集体农庄",
        description:
          "苏维埃联盟特色市中心建筑，替代粮仓，建造成本更低。提供+3食物和+3住房。每条从该城市出发的贸易路线，为该城市提供+2生产力。",
      },
    },
  },
];

export const fallbackComments = [
  {
    id: "seed-1",
    name: "HistoryFan88",
    message: "Great addition to the game. The dossier style fits the mod nicely.",
    created_at: "2026-06-08T00:00:00.000Z",
  },
  {
    id: "seed-2",
    name: "WarlordX",
    message: "The abilities read clearly without turning the page into a wall of text.",
    created_at: "2026-06-07T00:00:00.000Z",
  },
  {
    id: "seed-3",
    name: "CivStrategist",
    message: "Clean historical presentation. Looking forward to more leaders.",
    created_at: "2026-06-06T00:00:00.000Z",
  },
];
