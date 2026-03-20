// constants/sites.ts

export interface Site {
  id: number;
  name: string;
  url: string;
  vr: boolean;
  category: 'premium' | 'live' | 'hentai' | 'fetish' | 'trans' | 'lesbian' | 'top' | null;
  rating?: number;
  description?: string;
}

export const sites: Site[] = [
  // Tube-сайты (Top) - 15 шт
  { id: 1, name: "Pornhub", url: "https://www.pornhub.com", vr: false, category: "top", rating: 4.9 },
  { id: 2, name: "xHamster", url: "https://xhamster.com", vr: false, category: "top", rating: 4.8 },
  { id: 3, name: "xVideos", url: "https://www.xvideos.com", vr: false, category: "top", rating: 4.8 },
  { id: 4, name: "XNXX", url: "https://www.xnxx.com", vr: false, category: "top", rating: 4.7 },
  { id: 5, name: "SpankBang", url: "https://spankbang.com", vr: false, category: "top", rating: 4.6 },
  { id: 6, name: "EPorner", url: "https://www.eporner.com", vr: false, category: "top", rating: 4.5 },
  { id: 7, name: "HQPorner", url: "https://www.hqporner.com", vr: false, category: "top", rating: 4.7 },
  { id: 8, name: "RedTube", url: "https://www.redtube.com", vr: false, category: "top", rating: 4.4 },
  { id: 9, name: "YouJizz", url: "https://www.youjizz.com", vr: false, category: "top", rating: 4.3 },
  { id: 10, name: "YouPorn", url: "https://www.youporn.com", vr: false, category: "top", rating: 4.5 },
  { id: 11, name: "Tube8", url: "https://www.tube8.com", vr: false, category: "top", rating: 4.3 },
  { id: 12, name: "Beeg", url: "https://beeg.com", vr: false, category: "top", rating: 4.6 },
  { id: 13, name: "PornTrex", url: "https://porntrex.com", vr: false, category: "top", rating: 4.4 },
  { id: 14, name: "DaftSex", url: "https://daftsex.com", vr: false, category: "top", rating: 4.5 },
  { id: 15, name: "TXXX", url: "https://txxx.com", vr: false, category: "top", rating: 4.4 },

  // Premium - 10 шт
  { id: 16, name: "Brazzers", url: "https://www.brazzers.com", vr: false, category: "premium", rating: 4.9 },
  { id: 17, name: "Reality Kings", url: "https://www.realitykings.com", vr: false, category: "premium", rating: 4.8 },
  { id: 18, name: "Naughty America", url: "https://www.naughtyamerica.com", vr: true, category: "premium", rating: 4.8 },
  { id: 19, name: "Bang Bros", url: "https://www.bangbros.com", vr: false, category: "premium", rating: 4.7 },
  { id: 20, name: "Digital Playground", url: "https://www.digitalplayground.com", vr: false, category: "premium", rating: 4.6 },
  { id: 21, name: "Vixen", url: "https://www.vixen.com", vr: false, category: "premium", rating: 4.9 },
  { id: 22, name: "Blacked", url: "https://www.blacked.com", vr: false, category: "premium", rating: 4.8 },
  { id: 23, name: "Tushy", url: "https://www.tushy.com", vr: false, category: "premium", rating: 4.7 },
  { id: 24, name: "Deeper", url: "https://www.deeper.com", vr: false, category: "premium", rating: 4.8 },
  { id: 25, name: "Mofos", url: "https://www.mofos.com", vr: false, category: "premium", rating: 4.5 },

  // VR - 12 шт
  { id: 26, name: "VRPorn", url: "https://vrporn.com", vr: true, category: null, rating: 4.9 },
  { id: 27, name: "SexLikeReal", url: "https://www.sexlikereal.com", vr: true, category: null, rating: 4.9 },
  { id: 28, name: "BadoinkVR", url: "https://www.badoinkvr.com", vr: true, category: null, rating: 4.7 },
  { id: 29, name: "VRBangers", url: "https://vrbangers.com", vr: true, category: null, rating: 4.8 },
  { id: 30, name: "VirtualRealPorn", url: "https://virtualrealporn.com", vr: true, category: null, rating: 4.6 },
  { id: 31, name: "WankzVR", url: "https://www.wankzvr.com", vr: true, category: null, rating: 4.7 },
  { id: 32, name: "CzechVR", url: "https://www.czechvr.com", vr: true, category: null, rating: 4.8 },
  { id: 33, name: "POVR", url: "https://povr.com", vr: true, category: null, rating: 4.5 },
  { id: 34, name: "NaughtyAmericaVR", url: "https://naughtyamericavr.com", vr: true, category: null, rating: 4.8 },
  { id: 35, name: "RealJamVR", url: "https://realjamvr.com", vr: true, category: null, rating: 4.6 },
  { id: 36, name: "VRCosplayX", url: "https://vrcosplayx.com", vr: true, category: null, rating: 4.5 },
  { id: 37, name: "DarkRoomVR", url: "https://darkroomvr.com", vr: true, category: null, rating: 4.4 },

  // Live Cams - 8 шт
  { id: 38, name: "Chaturbate", url: "https://chaturbate.com", vr: false, category: "live", rating: 4.9 },
  { id: 39, name: "Stripchat", url: "https://stripchat.com", vr: true, category: "live", rating: 4.8 },
  { id: 40, name: "BongaCams", url: "https://bongacams.com", vr: false, category: "live", rating: 4.6 },
  { id: 41, name: "LiveJasmin", url: "https://livejasmin.com", vr: false, category: "live", rating: 4.7 },
  { id: 42, name: "CamSoda", url: "https://www.camsoda.com", vr: true, category: "live", rating: 4.5 },
  { id: 43, name: "MyFreeCams", url: "https://myfreecams.com", vr: false, category: "live", rating: 4.6 },
  { id: 44, name: "Flirt4Free", url: "https://www.flirt4free.com", vr: false, category: "live", rating: 4.4 },
  { id: 45, name: "ImLive", url: "https://imlive.com", vr: false, category: "live", rating: 4.3 },

  // Hentai - 10 шт
  { id: 46, name: "Hanime.tv", url: "https://hanime.tv", vr: false, category: "hentai", rating: 4.8 },
  { id: 47, name: "Hentai Haven", url: "https://hentaihaven.xxx", vr: false, category: "hentai", rating: 4.7 },
  { id: 48, name: "Rule34Video", url: "https://rule34video.com", vr: false, category: "hentai", rating: 4.6 },
  { id: 49, name: "Hentaigasm", url: "https://hentaigasm.com", vr: false, category: "hentai", rating: 4.4 },
  { id: 50, name: "Gelbooru", url: "https://gelbooru.com", vr: false, category: "hentai", rating: 4.5 },
  { id: 51, name: "nhentai", url: "https://nhentai.net", vr: false, category: "hentai", rating: 4.7 },
  { id: 52, name: "e-hentai", url: "https://e-hentai.org", vr: false, category: "hentai", rating: 4.6 },
  { id: 53, name: "Hentai2Read", url: "https://hentai2read.com", vr: false, category: "hentai", rating: 4.3 },
  { id: 54, name: "HentaiStream", url: "https://hentaistream.xxx", vr: false, category: "hentai", rating: 4.4 },
  { id: 55, name: "AnimeidHentai", url: "https://animeidhentai.com", vr: false, category: "hentai", rating: 4.2 },

  // Fetish / BDSM - 8 шт
  { id: 56, name: "Kink.com", url: "https://www.kink.com", vr: false, category: "fetish", rating: 4.8 },
  { id: 57, name: "Clips4Sale", url: "https://www.clips4sale.com", vr: false, category: "fetish", rating: 4.5 },
  { id: 58, name: "BDSMStreak", url: "https://bdsmstreak.com", vr: false, category: "fetish", rating: 4.4 },
  { id: 59, name: "DeviantClip", url: "https://deviantclip.com", vr: false, category: "fetish", rating: 4.3 },
  { id: 60, name: "FetishNetwork", url: "https://fetishnetwork.com", vr: false, category: "fetish", rating: 4.5 },
  { id: 61, name: "Submissed", url: "https://submissed.com", vr: false, category: "fetish", rating: 4.4 },
  { id: 62, name: "SexAndSubmission", url: "https://sexandsubmission.com", vr: false, category: "fetish", rating: 4.6 },
  { id: 63, name: "BoundHub", url: "https://boundhub.com", vr: false, category: "fetish", rating: 4.3 },

  // Trans - 9 шт
  { id: 64, name: "TransAngels", url: "https://www.transangels.com", vr: false, category: "trans", rating: 4.7 },
  { id: 65, name: "Grooby Girls", url: "https://groobygirls.com", vr: false, category: "trans", rating: 4.6 },
  { id: 66, name: "TS Factor", url: "https://www.tsfactor.com", vr: false, category: "trans", rating: 4.4 },
  { id: 67, name: "DevilsTGirls", url: "https://devilstgirls.com", vr: false, category: "trans", rating: 4.5 },
  { id: 68, name: "TransSensual", url: "https://transsensual.com", vr: false, category: "trans", rating: 4.5 },
  { id: 69, name: "DreamTranny", url: "https://dreamtranny.com", vr: false, category: "trans", rating: 4.3 },
  { id: 70, name: "Transfixed", url: "https://transfixed.com", vr: false, category: "trans", rating: 4.6 },
  { id: 71, name: "TSPlayground", url: "https://tsplayground.com", vr: false, category: "trans", rating: 4.4 },
  { id: 72, name: "ShemaleZ", url: "https://shemalez.com", vr: false, category: "trans", rating: 4.2 },

  // Lesbian - 12 шт
  { id: 73, name: "GirlsWay", url: "https://www.girlsway.com", vr: false, category: "lesbian", rating: 4.9 },
  { id: 74, name: "Slayed", url: "https://slayed.com", vr: false, category: "lesbian", rating: 4.8 },
  { id: 75, name: "Lesbea", url: "https://lesbea.com", vr: false, category: "lesbian", rating: 4.5 },
  { id: 76, name: "Twistys", url: "https://www.twistys.com", vr: false, category: "lesbian", rating: 4.6 },
  { id: 77, name: "Girlfriends Films", url: "https://girlfriendsfilms.com", vr: false, category: "lesbian", rating: 4.5 },
  { id: 78, name: "LesbianX", url: "https://lesbianx.com", vr: false, category: "lesbian", rating: 4.6 },
  { id: 79, name: "Straplez", url: "https://straplez.com", vr: false, category: "lesbian", rating: 4.4 },
  { id: 80, name: "GirlCore", url: "https://girlcore.com", vr: false, category: "lesbian", rating: 4.5 },
  { id: 81, name: "AllGirlMassage", url: "https://allgirlmassage.com", vr: false, category: "lesbian", rating: 4.6 },
  { id: 82, name: "SweetheartVideo", url: "https://sweetheartvideo.com", vr: false, category: "lesbian", rating: 4.5 },
  { id: 83, name: "MommysGirl", url: "https://mommysgirl.com", vr: false, category: "lesbian", rating: 4.4 },
  { id: 84, name: "WebYoung", url: "https://webyoung.com", vr: false, category: "lesbian", rating: 4.5 },
];

export const categories = [
  "All",
  "VR",
  "Top",
  "Live Cams",
  "Premium",
  "Hentai",
  "Fetish",
  "Trans",
  "Lesbian",
] as const;

export type Category = typeof categories[number];

export const categoryColors: Record<string, string> = {
  "All": "#ff2d55",
  "VR": "#00d4ff",
  "Top": "#ffd700",
  "Live Cams": "#ff4444",
  "Premium": "#a855f7",
  "Hentai": "#ff69b4",
  "Fetish": "#8b0000",
  "Trans": "#00ced1",
  "Lesbian": "#ff1493",
};
