import { describe, expect, test } from "vitest";
import { defaultSiteConfig, mergeSiteConfig } from "./siteConfig.js";

describe("site visual config", () => {
  test("merges partial layout and asset overrides with defaults", () => {
    const merged = mergeSiteConfig({
      layout: {
        avatarSize: 132,
        paperWidth: 1180,
      },
      assets: {
        background: "data:image/png;base64,custom-background",
        leaders: {
          chiang: {
            portrait: "data:image/png;base64,custom-portrait",
          },
        },
      },
    });

    expect(merged.layout.avatarSize).toBe(132);
    expect(merged.layout.paperWidth).toBe(1180);
    expect(merged.layout.railWidth).toBe(defaultSiteConfig.layout.railWidth);
    expect(merged.assets.background).toBe("data:image/png;base64,custom-background");
    expect(merged.assets.leaders.chiang.portrait).toBe("data:image/png;base64,custom-portrait");
    expect(merged.assets.leaders.hitler.portrait).toBe(defaultSiteConfig.assets.leaders.hitler.portrait);
    expect(merged.assets.leaders.stalin.portrait).toBe(defaultSiteConfig.assets.leaders.stalin.portrait);
    expect(merged.assets.leaders.stalin.emblem).toBe("/assets/emblem-soviet.png");
  });

  test("ignores unsupported config keys", () => {
    const merged = mergeSiteConfig({
      layout: {
        avatarSize: 140,
        unsafe: "ignored",
      },
      arbitrary: true,
    });

    expect(merged.layout.avatarSize).toBe(140);
    expect(merged.layout.unsafe).toBeUndefined();
    expect(merged.arbitrary).toBeUndefined();
  });

  test("replaces deprecated default artwork paths", () => {
    const merged = mergeSiteConfig({
      assets: {
        background: "/assets/paper-map.png",
        leaderAbilityIcon: "/assets/icon-leader-ability.png",
        leaders: {
          chiang: {
            portrait: "/assets/portrait-chiang.png",
          },
          hitler: {
            portrait: "/assets/portrait-hitler.png",
            emblem: "/assets/emblem-neutral-command.png",
          },
        },
      },
    });

    expect(merged.assets.background).toBe("/assets/paper-plain.png");
    expect(merged.assets.leaderAbilityIcon).toBe("/assets/icon-leader-command.png");
    expect(merged.assets.leaders.chiang.portrait).toBe("/assets/portrait-chiang-fill.png");
    expect(merged.assets.leaders.hitler.portrait).toBe("/assets/portrait-hitler-fill.png");
    expect(merged.assets.leaders.hitler.emblem).toBe("/assets/emblem-third-reich.png");
  });
});
