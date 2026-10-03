/**
 * @license
 * DeSiaVe Asset Resolver & Helpers
 */

export const ASSET_MAP: Record<string, string> = {
  // Avatars & Heroes
  avatar: '/assets/hav.jpg',
  avatar2: '/assets/av2.jpg',
  avatarDefault: '/assets/av.jpg',
  robot: '/assets/robot.png',
  
  // Game & Currency Icons
  coin: '/assets/coin.png',
  hcoin: '/assets/hcoin.png',
  hearn: '/assets/hearn.png',
  hwal: '/assets/hwal.jpg',
  hfire: '/assets/hfire.png',
  life: '/assets/life.png',
  chest: '/assets/chest.jpg',
  gift: '/assets/gift.jpg',
  gift2: '/assets/gift2.jpg',
  hgift: '/assets/hgift.jpg',
  candyL: '/assets/candyL.jpg',
  candyR: '/assets/candyR.jpg',
  
  // Logo & Badges
  logo: '/assets/logo.png',
  lg2: '/assets/lg2.png',
  hg: '/assets/hg.png',
  hlvl: '/assets/hlvl.png',
  hsart: '/assets/hsart.jpg',
  hsic: '/assets/hsic.jpg',
  
  // Preview & Navigation Graphics
  splash: '/assets/splash.jpg',
  bg: '/assets/bg.jpg',
  bottom: '/assets/bottom.jpg',
  pav: '/assets/pav.jpg',
  pl: '/assets/pl.png',
  pb: '/assets/pb.png',
  pend: '/assets/pend.png',
  
  // Tasks & Quest Banners
  pv_ot: '/assets/pv_ot.png',
  pv_cpal: '/assets/pv_cpal.png',
  pv_adg: '/assets/pv_adg.png',
  pv_cpx: '/assets/pv_cpx.png',
  pv_loot: '/assets/pv_loot.png',
  pv_pub: '/assets/pv_pub.png',
  pv_tw: '/assets/pv_tw.png',
  pv_myl: '/assets/pv_myl.png',
  
  // High-Quality Quests
  hq1: '/assets/hq1.png',
  hq2: '/assets/hq2.png',
  hq3: '/assets/hq3.png',
  hq4: '/assets/hq4.png',
  hq5: '/assets/hq5.png',
};

export function getAssetUrl(name: string, fallback = ''): string {
  if (name.startsWith('http') || name.startsWith('/')) {
    return name;
  }
  return ASSET_MAP[name] || fallback || `/assets/${name}.png`;
}
