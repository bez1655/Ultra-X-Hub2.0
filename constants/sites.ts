// constants/sites.ts

export interface Site {
  name: string;
  url: string;
  vr: boolean;
  category: 'premium' | 'live' | 'hentai' | 'fetish' | 'trans' | 'lesbian' | null;
}

export const sites: Site[] = [
  // Основные популярные tube-сайты (0)
  { name: "Pornhub", url: "https://www.pornhub.com", vr: false, category: null },
  { name: "xHamster", url: "https://xhamster.com", vr: false, category: null },
  { name: "xVideos", url: "https://www.xvideos.com", vr: false, category: null },
  { name: "XNXX", url: "https://www.xnxx.com", vr: false, category: null },
  { name: "SpankBang", url: "https://spankbang.com", vr: false, category: null },
  { name: "EPorner", url: "https://www.eporner.com", vr: false, category: null },
  { name: "HQPorner", url: "https://www.hqporner.com", vr: false, category: null },
  { name: "RedTube", url: "https://www.redtube.com", vr: false, category: null },
  { name: "YouJizz", url: "https://www.youjizz.com", vr: false, category: null },
  { name: "YouPorn", url: "https://www.youporn.com", vr: false, category: null },
  { name: "Tube8", url: "https://www.tube8.com", vr: false, category: null },
  { name: "Beeg", url: "https://beeg.com", vr: false, category: null },
  { name: "PornTrex", url: "https://porntrex.com", vr: false, category: null },
  { name: "DaftSex", url: "https://daftsex.com", vr: false, category: null },
  { name: "TXXX", url: "https://txxx.com", vr: false, category: null },

  // Премиум-студии / платные подписки
  { name: "Brazzers", url: "https://www.brazzers.com", vr: false, category: "premium" },
  { name: "Reality Kings", url: "https://www.realitykings.com", vr: false, category: "premium" },
  { name: "Naughty America", url: "https://www.naughtyamerica.com", vr: false, category: "premium" },

  // VR-ориентированные сайты
  { name: "VRPorn", url: "https://vrporn.com", vr: true, category: null },
  { name: "SexLikeReal", url: "https://www.sexlireal.com", vr: true, category: null },
  { name: "BadoinkVR", url: "https://www.badoinkvr.com", vr: true, category: null },
  { name: "VRBangers", url: "https://vrbangers.com", vr: true, category: null },
  { name: "VirtualRealPorn", url: "https://virtualrealporn.com", vr: true, category: null },
  { name: "WankzVR", url: "https://www.wankzvr.com", vr: true, category: null },
  { name: "CzechVR", url: "https://www.czechvr.com", vr: true, category: null },
  { name: "POVR", url: "https://povr.com", vr: true, category: null },
  { name: "NaughtyAmericaVR", url: "https://naughtyamericavr.com", vr: true, category: null },

  // Live Cams
  { name: "Chaturbate", url: "https://chaturbate.com", vr: false, category: "live" },
  { name: "Stripchat", url: "https://stripchat.com", vr: false, category: "live" },
  { name: "BongaCams", url: "https://bongacams.com", vr: false, category: "live" },

  // Hentai / аниме-порно
  { name: "Hanime.tv", url: "https://hanime.tv", vr: false, category: "hentai" },
  { name: "Hentai Haven", url: "https://hentaihaven.xxx", vr: false, category: "hentai" },
  { name: "Rule34Video", url: "https://rule34video.com", vr: false, category: "hentai" },
  { name: "Hentaigasm", url: "https://hentaigasm.com", vr: false, category: "hentai" },
  { name: "Gelbooru", url: "https://gelbooru.com", vr: false, category: "hentai" },

  // Fetish / BDSM
  { name: "Kink.com", url: "https://www.kink.com", vr: false, category: "fetish" },
  { name: "Clips4Sale", url: "https://www.clips4sale.com", vr: false, category: "fetish" },
  { name: "BDSMStreak", url: "https://bdsmstreak.com", vr: false, category: "fetish" },

  // Trans / shemale
  { name: "TransAngels", url: "https://www.transangels.com", vr: false, category: "trans" },
  { name: "Grooby Girls", url: "https://groobygirls.com", vr: false, category: "trans" },
  { name: "TS Factor", url: "https://www.tsfactor.com", vr: false, category: "trans" },
  { name: "DevilsTGirls", url: "https://devilstgirls.com", vr: false, category: "trans" },
  { name: "TransSensual", url: "https://transsensual.com", vr: false, category: "trans" },
  { name: "DreamTranny", url: "https://dreamtranny.com", vr: false, category: "trans" },
  { name: "Transfixed", url: "https://transfixed.com", vr: false, category: "trans" },

  // Lesbian / лесбийские сайты и категории (30+)
  { name: "GirlsWay", url: "https://www.girlsway.com", vr: false, category: "lesbian" },
  { name: "Slayed", url: "https://slayed.com", vr: false, category: "lesbian" },
  { name: "Lesbea", url: "https://lesbea.com", vr: false, category: "lesbian" },
  { name: "Twistys", url: "https://www.twistys.com", vr: false, category: "lesbian" },
  { name: "Girlfriends Films", url: "https://girlfriendsfilms.com", vr: false, category: "lesbian" },
  { name: "LesbianX", url: "https://lesbianx.com", vr: false, category: "lesbian" },
  { name: "Straplez", url: "https://straplez.com", vr: false, category: "lesbian" },
  { name: "GirlCore", url: "https://girlcore.com", vr: false, category: "lesbian" },
  { name: "AllGirlMassage", url: "https://allgirlmassage.com", vr: false, category: "lesbian" },
  { name: "SweetheartVideo", url: "https://sweetheartvideo.com", vr: false, category: "lesbian" },
  { name: "MommysGirl", url: "https://mommysgirl.com", vr: false, category: "lesbian" },
  { name: "WebYoung", url: "https://webyoung.com", vr: false, category: "lesbian" },
  { name: "Dyked", url: "https://dyked.com", vr: false, category: "lesbian" },
  { name: "WeLiveTogether", url: "https://welivetogether.com", vr: false, category: "lesbian" },
  { name: "Joymii", url: "https://www.joymii.com", vr: false, category: "lesbian" },

  // Lesbian tube-категории на крупных платформах
  { name: "Pornhub Lesbian", url: "https://www.pornhub.com/video?c=27", vr: false, category: "lesbian" },
  { name: "xHamster Lesbian", url: "https://xhamster.com/categories/lesbian", vr: false, category: "lesbian" },
  { name: "XVideos Lesbian", url: "https://www.xvideos.com/tags/lesbian", vr: false, category: "lesbian" },
  { name: "XNXX Lesbian", url: "https://www.xnxx.com/search/lesbian", vr: false, category: "lesbian" },
  { name: "YouPorn Lesbian", url: "https://www.youporn.com/porntags/lesbian/", vr: false, category: "lesbian" },
  { name: "RedTube Lesbian", url: "https://www.redtube.com/redtube/lesbian", vr: false, category: "lesbian" },
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