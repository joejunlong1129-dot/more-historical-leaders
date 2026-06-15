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
        "Chiang Kai-shek leads the Republic of China through disciplined modernization. Build governed cities, harbors, and academies to turn disciplined institutions into science, culture, and military strength.",
      leaderAbility: {
        name: "Island Commandos",
        description:
          "Coastal cities receive defensive, trade, and military production bonuses. They gain +5 City Ranged Strike Strength, +2 Gold from outgoing Trade Routes, and +20% Production toward land and naval combat units. Units gain +5 Combat Strength when defending in own territory. Harbor buildings provide +1 Production and +1 Culture; Coast tiles adjacent to Harbor districts provide +2 Culture.",
      },
      civilizationAbility: {
        name: "National Government",
        description:
          "May construct the Whampoa Military Academy. Cities with an established Governor gain +15% Production toward districts and buildings. Completing a district grants Science and Culture equal to 50% of its Production cost.",
      },
      uniqueUnit: {
        name: "German-trained Division",
        description:
          "Unique Modern era melee unit that replaces Infantry. Unlocks earlier at Rifling, costs 10% less Production, has 5 lower Combat Strength, and does not require Oil maintenance. +5 Combat Strength on Coast or land adjacent to Coast.",
      },
      uniqueBuilding: {
        name: "Whampoa Military Academy",
        description:
          "Unique building. Requires an Armory. Provides +5 Production, +5 Culture, +5 Science, and +3 Great General points. Land combat units trained here receive one free promotion. One per civilization.",
      },
    },
    zh: {
      name: "蒋介石",
      civilization: "中华民国",
      quote:
        "蒋介石领导中华民国推进有纪律的现代化。建设总督城市、港口与军校，以制度化建设转化为科技、文化和军事力量。",
      leaderAbility: {
        name: "海岛奇兵",
        description:
          "沿海城市获得防御、贸易和军事生产加成。沿海城市+5城市远程攻击力，出发的贸易路线+2金币，训练陆地和海军战斗单位时+20%生产力。单位在己方领土防御时+5战斗力。港口建筑提供+1生产力和+1文化值；与港口相邻的海岸单元格+2文化值。",
      },
      civilizationAbility: {
        name: "国民政府",
        description:
          "可以建造黄埔军校。拥有总督的城市建造区域和建筑时+15%生产力。完成区域时，获得相当于该区域生产力成本50%的科技值和文化值。",
      },
      uniqueUnit: {
        name: "德械师",
        description:
          "特色现代近战单位，取代步兵。在膛线科技解锁，生产成本降低10%，战斗力比步兵低5，不需要石油维护。在海岸或与海岸相邻的陆地单元格作战时+5战斗力。",
      },
      uniqueBuilding: {
        name: "黄埔军校",
        description:
          "特色建筑。需要兵工厂。提供+5生产力、+5文化值、+5科技值和+3大将军点数。此城训练的陆地战斗单位获得一次免费晋升。每个文明只能建造一座。",
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
        "A militarized Germany built for rapid conquest. Expand military industry, strike quickly, and manage diplomatic isolation and cold-front weaknesses.",
      leaderAbility: {
        name: "Revanchist Mobilization",
        description:
          "+20% Production toward military units and 20% less Gold to upgrade them. Capturing an enemy city grants Gold equal to 30% of your current treasury. All cities gain +20 Loyalty. From the Industrial Era, heavy cavalry, light cavalry, fighters, and bombers gain +1 Movement and +5 Combat Strength against damaged units. Land units suffer -5 Combat Strength when attacking on tundra or snow. Diplomatic Favor gains from alliances, suzerainty, emergencies, and Great People are reduced by 50%.",
      },
      civilizationAbility: {
        name: "Military Preparation",
        description:
          "+25% Production toward Encampments and their buildings. Cities with an Encampment gain +10% Production toward melee, anti-cavalry, and ranged units. While at war, the Capital gains +100% Production toward military units.",
      },
      uniqueUnit: {
        name: "Tiger Heavy Tank",
        description:
          "Replaces the Tank. +5 Combat Strength, with an additional +5 against heavy cavalry, light cavalry, and city defenses. Higher Production, maintenance, and Oil costs.",
      },
      uniqueBuilding: {
        name: "Armaments Office",
        description:
          "Replaces the Armory. Cheaper to build. Provides +4 Production, +1 Great General point, and +15% Production toward melee, anti-cavalry, and heavy cavalry units in this city. -3 Amenities.",
      },
    },
    zh: {
      name: "阿道夫·希特勒",
      civilization: "德意志第三帝国",
      quote: "军事化德国擅长快速征服。扩张军工、迅速进攻，并处理外交孤立与寒地作战弱点。",
      leaderAbility: {
        name: "复仇主义动员",
        description:
          "训练军事单位时+20%生产力，升级费用减少20%金币。占领敌方城市时，获得相当于当前国库30%的金币。所有城市忠诚度+20。进入工业时代后，重骑兵、轻骑兵、战斗机和轰炸机+1移动力，攻击受损单位时+5战斗力。陆地单位在冻土或雪地上攻击时-5战斗力。来自同盟、宗主国、紧急事件和伟人的外交支持收益降低50%。",
      },
      civilizationAbility: {
        name: "军国准备",
        description:
          "建造军营及其建筑时+25%生产力。拥有军营的城市训练近战、抗骑兵和远程单位时+10%生产力。处于战争状态时，首都训练军事单位时+100%生产力。",
      },
      uniqueUnit: {
        name: "虎式重坦",
        description:
          "替代坦克。+5战斗力，对重骑兵、轻骑兵和城市防御额外+5战斗力。生产、维护和石油成本更高。",
      },
      uniqueBuilding: {
        name: "军备局",
        description:
          "替代兵工厂。建造成本更低。提供+4生产力、+1大将军点数，并使所在城市训练近战、抗骑兵和重骑兵单位时+15%生产力。所在城市-3宜居度。",
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
        "Joseph Stalin, direct Soviet industry through strict plans and fortified cities. Unlock Industrial Zones at Engineering, build them quickly, and use powered production to sustain expansion. If war reaches your territory, mobilize cities and armies for defense.",
      leaderAbility: {
        name: "Five-Year Plan",
        description:
          "Industrial Zones are unlocked at Engineering. +30% Production toward Industrial Zones and buildings in Industrial Zones. Industrial Zones receive additional standard adjacency bonuses: +1 Production from each adjacent specialty district, Mine, or Quarry, and +2 Production from each adjacent Strategic Resource. Cities with 10 or more Population gain +10% Science. Workshops, Factories, and Power Plants provide +1, +2, and +3 Production respectively. Powered cities gain +15% Production toward districts, buildings, and wonders.",
      },
      civilizationAbility: {
        name: "Great Patriotic War",
        description:
          "All cities grow 10% faster. Domestic Trade Routes provide the origin city +1 Production for each specialty district in the destination city, and +1 Science and +1 Culture for every 2 specialty districts there. While at war, units gain +5 Combat Strength in friendly territory, cities gain +10 ranged strike strength, and cities gain +20% Production toward military units.",
      },
      uniqueUnit: {
        name: "T-34",
        description:
          "Soviet Union unique Modern Era heavy cavalry unit that replaces the Tank. Cheaper to train and maintain. Requires Oil to train, but has no Oil maintenance. Lower Combat Strength than the Tank and ignores enemy Zone of Control.",
      },
      uniqueBuilding: {
        name: "Collective Farm",
        description:
          "Soviet Union unique City Center building. Replaces the Granary and is cheaper to build. +3 Food and +3 Housing. Trade Routes from this city provide +2 Production to this city.",
      },
    },
    zh: {
      name: "约瑟夫·斯大林",
      civilization: "苏维埃联盟",
      quote:
        "约瑟夫·斯大林，以严密计划推动苏维埃工业。工业区于工程学解锁，快速建设工业区，并以充足电力支撑扩张。战争进入本土时，动员城市与军队进行防御。",
      leaderAbility: {
        name: "五年计划",
        description:
          "工业区于工程学解锁。建造工业区及其中建筑时+30%生产力。工业区获得额外标准相邻加成：每相邻一个特色区域、矿山或采石场+1生产力；每相邻一处战略资源+2生产力。人口达到10或以上的城市+10%科技值。工作坊、工厂和发电厂分别提供+1、+2、+3生产力。拥有充足电力供应的城市建造区域、建筑和奇观时+15%生产力。",
      },
      civilizationAbility: {
        name: "伟大的卫国战争",
        description:
          "所有城市人口增长速度提高10%。国内贸易路线根据目的地城市的特色区域数量，为起点城市提供：每个特色区域+1生产力；每2个特色区域+1科技值和+1文化值。处于战争时，单位在友方领土内+5战斗力，城市远程攻击战斗力+10，训练军事单位时+20%生产力。",
      },
      uniqueUnit: {
        name: "T-34",
        description:
          "苏维埃联盟特色现代时期重骑兵单位，替代坦克。训练和维护成本更低。训练时需要石油，但无石油维护。战斗力低于坦克，并无视敌方控制区。",
      },
      uniqueBuilding: {
        name: "集体农庄",
        description:
          "苏维埃联盟特色市中心建筑，替代粮仓，建造成本更低。+3食物，+3住房。从该城市出发的贸易路线为该城市提供+2生产力。",
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
