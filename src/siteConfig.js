export const defaultSiteConfig = {
  version: 1,
  layout: {
    paperWidth: 1280,
    railWidth: 365,
    dossierMinHeight: 860,
    avatarSize: 100,
    emblemSize: 104,
    abilityIconSize: 82,
    headingScale: 100,
    bodyScale: 100,
    contentPadding: 64,
    sectionGap: 46,
    backgroundSize: 100,
    backgroundOpacity: 86,
    backgroundX: 50,
    backgroundY: 0,
    imageRadius: 100,
    imageGray: 100,
    imageSepia: 10,
  },
  colors: {
    paper: "#ede5d3",
    ink: "#241f19",
    gold: "#c5a46a",
    green: "#173a2d",
    burgundy: "#772520",
    topbar: "#151514",
  },
  assets: {
    background: "/assets/paper-plain.png",
    leaderAbilityIcon: "/assets/icon-leader-command.png",
    civilizationAbilityIcon: "/assets/icon-civ-ability.png",
    leaders: {
      chiang: {
        portrait: "/assets/portrait-chiang-fill.png",
        emblem: "/assets/emblem-roc.png",
      },
      hitler: {
        portrait: "/assets/portrait-hitler-fill.png",
        emblem: "/assets/emblem-third-reich.png",
      },
    },
  },
};

const layoutRanges = {
  paperWidth: [900, 1600],
  railWidth: [260, 520],
  dossierMinHeight: [560, 1200],
  avatarSize: [56, 180],
  emblemSize: [56, 180],
  abilityIconSize: [44, 140],
  headingScale: [70, 140],
  bodyScale: [80, 125],
  contentPadding: [20, 100],
  sectionGap: [18, 90],
  backgroundSize: [60, 220],
  backgroundOpacity: [0, 100],
  backgroundX: [0, 100],
  backgroundY: [-200, 200],
  imageRadius: [0, 100],
  imageGray: [0, 100],
  imageSepia: [0, 100],
};

const deprecatedAssetPaths = {
  "/assets/paper-map.png": defaultSiteConfig.assets.background,
  "/assets/emblem-neutral-command.png": defaultSiteConfig.assets.leaders.hitler.emblem,
  "/assets/icon-leader-ability.png": defaultSiteConfig.assets.leaderAbilityIcon,
  "/assets/portrait-chiang.png": defaultSiteConfig.assets.leaders.chiang.portrait,
  "/assets/portrait-hitler.png": defaultSiteConfig.assets.leaders.hitler.portrait,
};

function clampNumber(value, fallback, min, max) {
  const number = Number(value);
  if (!Number.isFinite(number)) {
    return fallback;
  }
  return Math.min(max, Math.max(min, number));
}

function pickString(value, fallback) {
  return typeof value === "string" && value.trim() ? value : fallback;
}

function pickAssetPath(value, fallback) {
  const selected = pickString(value, fallback);
  return deprecatedAssetPaths[selected] ?? selected;
}

export function mergeSiteConfig(config = {}) {
  const safe = {
    version: defaultSiteConfig.version,
    layout: {},
    colors: {},
    assets: {
      leaders: {},
    },
  };

  for (const [key, fallback] of Object.entries(defaultSiteConfig.layout)) {
    const [min, max] = layoutRanges[key];
    safe.layout[key] = clampNumber(config.layout?.[key], fallback, min, max);
  }

  for (const [key, fallback] of Object.entries(defaultSiteConfig.colors)) {
    safe.colors[key] = pickString(config.colors?.[key], fallback);
  }

  safe.assets.background = pickAssetPath(config.assets?.background, defaultSiteConfig.assets.background);
  safe.assets.leaderAbilityIcon = pickAssetPath(
    config.assets?.leaderAbilityIcon,
    defaultSiteConfig.assets.leaderAbilityIcon,
  );
  safe.assets.civilizationAbilityIcon = pickAssetPath(
    config.assets?.civilizationAbilityIcon,
    defaultSiteConfig.assets.civilizationAbilityIcon,
  );

  for (const [leaderId, defaults] of Object.entries(defaultSiteConfig.assets.leaders)) {
    safe.assets.leaders[leaderId] = {
      portrait: pickAssetPath(config.assets?.leaders?.[leaderId]?.portrait, defaults.portrait),
      emblem: pickAssetPath(config.assets?.leaders?.[leaderId]?.emblem, defaults.emblem),
    };
  }

  return safe;
}

export function createCssVariables(config) {
  const merged = mergeSiteConfig(config);
  return {
    "--editor-paper-width": `${merged.layout.paperWidth}px`,
    "--editor-rail-width": `${merged.layout.railWidth}px`,
    "--editor-dossier-min-height": `${merged.layout.dossierMinHeight}px`,
    "--editor-avatar-size": `${merged.layout.avatarSize}px`,
    "--editor-emblem-size": `${merged.layout.emblemSize}px`,
    "--editor-ability-icon-size": `${merged.layout.abilityIconSize}px`,
    "--editor-heading-scale": merged.layout.headingScale / 100,
    "--editor-body-scale": merged.layout.bodyScale / 100,
    "--editor-content-padding": `${merged.layout.contentPadding}px`,
    "--editor-section-gap": `${merged.layout.sectionGap}px`,
    "--editor-background-image": `url("${merged.assets.background}")`,
    "--editor-background-size": `${merged.layout.backgroundSize}% auto`,
    "--editor-background-position": `${merged.layout.backgroundX}% ${merged.layout.backgroundY}px`,
    "--editor-background-opacity": merged.layout.backgroundOpacity / 100,
    "--editor-image-radius": `${merged.layout.imageRadius}%`,
    "--editor-image-filter": `grayscale(${merged.layout.imageGray}%) sepia(${merged.layout.imageSepia}%)`,
    "--paper": merged.colors.paper,
    "--ink": merged.colors.ink,
    "--gold": merged.colors.gold,
    "--green": merged.colors.green,
    "--burgundy": merged.colors.burgundy,
    "--black": merged.colors.topbar,
  };
}

export function serializeSiteConfig(config) {
  return JSON.stringify(mergeSiteConfig(config), null, 2);
}
