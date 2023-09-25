const { THENEWS_API_TOKEN, THENEWS_BASE_URL } = process.env;
const axios = require("axios");

const page = 1;
const limit = 10;

const options = {
  baseURL: "https://api.thenewsapi.com/v1",
  params: {
    api_token: "xpaA0vIU9Xi3JWPwavBJQTA5sjhXjqKsZ0LM09Jq",
    locale: "us",
    language: "en",
  },
};

const getNews = async (page) => {
  try {
    const response = await axios.get(`/news/top?page=${page}`, options);
    return response.data.data;
  } catch (error) {
    console.log(error.message);
  }
};

const fetchAllNews = async () => {
  const promises = [];
  const finalNews = [];
  for (let i = page; i <= limit; i++) {
    promises.push(getNews(i));
  }
  console.log(promises);
  const allNews = await Promise.all(promises);

  allNews.forEach((news) => {
    finalNews.push(...news);
  });

  console.log(finalNews);
  return finalNews;
};

fetchAllNews();

[
  {
    uuid: '28e2de38-6a13-4740-8ee9-7cd048781f95',
    title: 'NASA spacecraft sends soil samples from deep space asteroid into Utah desert',
    description: 'Soil samples taken from the surface of an asteroid parachuted down to Earth from deep space Sunday, landing in the Utah desert to cap off a seven-year journey.',
    keywords: 'News, asteroids, nasa, space',
    snippet: 'A NASA spacecraft captured soil samples from an asteroid that may come close to hitting Earth in the next 200 years and parachuted the capsule into a Utah deser...',
    url: 'https://nypost.com/2023/09/24/nasas-first-asteroid-samples-land-on-earth/',
    image_url: 'https://nypost.com/wp-content/uploads/sites/2/2023/09/NYPICHPDPICT000043938108.jpg?quality=75&strip=all&w=1024',
    language: 'en',
    published_at: '2023-09-24T19:13:01.000000Z',
    source: 'nypost.com',
    categories: [ 'general' ],
    relevance_score: null,
    locale: 'us'
  },
  {
    uuid: 'f3ec065a-8a4a-4cae-9a9b-28ea4f731d15',
    title: 'Top McCarthy ally drafted motion to oust him as GOP renegades dig in: ‘Get this over with’',
    description: "One of Speaker Kevin McCarthy's (R-Calif.) top Republican allies stunningly revealed he's drafted a motion to oust the House leader.",
    keywords: 'News, congress, government shutdown, government spending, kevin mccarthy, Matt Gaetz',
    snippet: 'One of Speaker Kevin McCarthy’s (R-Calif.) top Republican allies stunningly revealed he’s drafted a motion to oust the House leader.\n' +
      '\n' +
      'Rep. Garret Graves (R-...',
    url: 'https://nypost.com/2023/09/24/top-mccarthy-ally-garret-graves-drafts-motion-to-oust-him/',
    image_url: 'https://nypost.com/wp-content/uploads/sites/2/2023/09/NYPICHPDPICT000043939334.jpg?quality=75&strip=all&w=1024',
    language: 'en',
    published_at: '2023-09-24T19:09:28.000000Z',
    source: 'nypost.com',
    categories: [ 'general' ],
    relevance_score: null,
    locale: 'us'
  },
  {
    uuid: 'a47aedf1-341d-4287-8576-a2c1f70a6af1',
    title: 'Sheffield United 0-8 Newcastle United (Sep 24, 2023) Game Analysis',
    description: 'Expert recap and game analysis of the Newcastle United vs. Sheffield United English Premier League game from September 24, 2023 on ESPN.',
    keywords: '',
    snippet: 'Newcastle United ruthlessly put Sheffield United to the sword with a dazzling 8-0 victory at Bramall Lane on Sunday, with eight different players scoring to lea...',
    url: 'https://www.espn.com/soccer/report/_/gameId/671084',
    image_url: 'https://a.espncdn.com/combiner/i?img=/i/espn/misc_logos/500/soccer.png',
    language: 'en',
    published_at: '2023-09-24T18:51:42.000000Z',
    source: 'espn.com',
    categories: [ 'sports', 'general' ],
    relevance_score: null,
    locale: 'us'
  },
  {
    uuid: 'cf0e96eb-0665-4251-b311-ef68fc4b42ed',
    title: 'Sting operation: Cops, carjack suspect attacked by swarm of wasps during bust',
    description: "Seattle cops and a carjacking suspect were attacked by a swarm of wasps when the insects' hive was unwittingly disturbed during a bust, according to newly relea...",
    keywords: 'News, arrests, bees, carjackings, seattle',
    snippet: 'This is not your typical sting operation.\n' +
      '\n' +
      'Seattle cops and a carjacking suspect were attacked by a swarm of wasps when the insects’ hive was unwittingly dist...',
    url: 'https://nypost.com/2023/09/24/cops-carjack-suspect-attacked-by-swarm-of-wasps-during-bust/',
    image_url: 'https://nypost.com/wp-content/uploads/sites/2/2023/09/NYPICHPDPICT000043935762.jpg?quality=75&strip=all&w=1024',
    language: 'en',
    published_at: '2023-09-24T18:48:32.000000Z',
    source: 'nypost.com',
    categories: [ 'general' ],
    relevance_score: null,
    locale: 'us'
  },
  {
    uuid: 'd4c23fa2-4ef0-4442-89f9-1fab34694c5c',
    title: 'NASA collected a sample from an asteroid for the first time — here’s why it matters',
    description: 'NASA retrieved a sample from an asteroid for the first time, providing scientists with material to understand the early origins of the solar system.',
    keywords: '',
    snippet: 'NASA completed its first-ever sample return mission from an asteroid today, with a science capsule containing material from an asteroid landing after having tra...',
    url: 'https://www.theverge.com/2023/9/24/23887975/nasa-asteroid-sample-osiris-rex-bennu-explained',
    image_url: 'https://cdn.vox-cdn.com/thumbor/IaSYIUT1QZUIbqEcsffAM0mFkUU=/0x0:6609x4406/1200x628/filters:focal(3305x2203:3306x2204)/cdn.vox-cdn.com/uploads/chorus_asset/file/24948807/1259137511.jpg',
    language: 'en',
    published_at: '2023-09-24T18:46:46.000000Z',
    source: 'theverge.com',
    categories: [ 'tech' ],
    relevance_score: null,
    locale: 'us'
  },
  {
    uuid: 'c26e3f14-05ee-45bf-8fd1-53a15939176f',
    title: 'Kim Kardashian, Odell Beckham Jr. Ask Usher for Super Bowl Tickets',
    description: 'Kim Kardashian and Odell Beckham Jr., who have recently started dating, separately helped Usher announce his Super Bowl halftime performance',
    keywords: '',
    snippet: 'Everyone and their mothers are going to want tickets to see Usher perform at the Super Bowl LVIII halftime show — including Kim Kardashian and her new love in...',
    url: 'https://www.usmagazine.com/entertainment/news/kim-kardashian-odell-beckham-jr-ask-usher-for-super-bowl-tickets/',
    image_url: 'https://www.usmagazine.com/wp-content/uploads/2023/09/kim-kardashian-and-odell-beckham-jr-ask-usher-for-super-bowl-tickets-in-matching-announcement-clips.jpg?crop=0px%2C8px%2C2000px%2C1051px&resize=1200%2C630&quality=86&strip=all',
    language: 'en',
    published_at: '2023-09-24T18:41:11.000000Z',
    source: 'usmagazine.com',
    categories: [ 'entertainment', 'general' ],
    relevance_score: null,
    locale: 'us'
  },
  {
    uuid: '21e3cea6-2983-4c97-a907-c4ad77eba480',
    title: 'Trump leads Biden by 10 points in newly released national poll of the 2024 presidential race, a departure from recent surveys showing a closer contest',
    description: "In explaining how Trump's lead could potentially be an outlier, WaPo pointed to",
    keywords: '',
    snippet: 'A new Washington Post-ABC News poll shows Trump leading Biden by a 10-point margin (52%-42%).\n' +
      '\n' +
      'But WaPo suggested the survey may be an outlier after examining s...',
    url: 'https://www.businessinsider.com/trump-leads-biden-2024-poll-potential-outlier-washington-post-abc-2023-9',
    image_url: 'https://i.insider.com/651073a8e2c0220019ef331b?width=1200&format=jpeg',
    language: 'en',
    published_at: '2023-09-24T18:40:43.000000Z',
    source: 'businessinsider.com',
    categories: [ 'business', 'tech' ],
    relevance_score: null,
    locale: 'us'
  },
  {
    uuid: 'a89dddde-563a-4dfa-905b-2126f83baf42',
    title: 'U.S. and other Western powers are inciting Iranian unrest, president says',
    description: 'Ebrahim Raisi blamed protests over mandatory head scarfs for women on outside forces.',
    keywords: '',
    snippet: 'Speaking via a translator on “Fareed Zakaria GPS,” Raisi said: “The people of Iran are enlightened, are people of faith, are spiritual people, and they de...',
    url: 'https://www.politico.com/news/2023/09/24/iran-women-ebrahim-raisi-00117823',
    image_url: 'https://static.politico.com/70/b3/a359269b41ffa94d812bfa625e93/un-general-assembly-iran-01289.jpg',
    language: 'en',
    published_at: '2023-09-24T18:38:43.000000Z',
    source: 'politico.com',
    categories: [ 'politics', 'general' ],
    relevance_score: null,
    locale: 'us'
  },
  {
    uuid: '754b21b8-1bca-4643-acf1-995336cd49f0',
    title: 'GoFundMe nets nearly $10K for security for BLM activist Zyahna Bryant amid Dove boycott',
    description: 'The GoFundMe was created by Erica Chapman, a Charlottesville, Virginia woman who claims she is Bryant’s cousin. She writes that Bryant has faced increasing th...',
    keywords: 'News, black lives matter, boycotts, charlottesville, university of virginia',
    snippet: 'An online fundraiser has been launched to pay for security for Black Lives Matter activist Zyahna Bryant – whose partnership with Dove to promote “fat liber...',
    url: 'https://nypost.com/2023/09/24/gofundme-nets-nearly-10k-for-security-for-blm-activist-zyahna-bryant/',
    image_url: 'https://nypost.com/wp-content/uploads/sites/2/2023/09/NYPICHPDPICT000043938168.jpg?quality=75&strip=all&w=1024',
    language: 'en',
    published_at: '2023-09-24T18:35:06.000000Z',
    source: 'nypost.com',
    categories: [ 'general' ],
    relevance_score: null,
    locale: 'us'
  },
  {
    uuid: '04830d6f-6983-45fc-bf96-8e3894c3b967',
    title: "Dolphins' Tua Tagovailoa, Tyreek Hill hook up on on 54-yard TD",
    description: 'Hill is the first Dolphins player since 2005 to have a receiving TD in each of the first three games of a season.',
    keywords: '',
    snippet: "MIAMI -- The Miami Dolphins' league-leading offense didn't need long to get on the board Sunday against the Denver Broncos.\n" +
      '\n' +
      'Quarterback Tua Tagovailoa took adv...',
    url: 'https://www.espn.com/nfl/story/_/id/38479377/dolphins-tua-tagovailoa-tyreek-hill-hook-54-yard-td',
    image_url: 'https://a4.espncdn.com/combiner/i?img=%2Fphoto%2F2023%2F0924%2Fr1229099_1296x729_16%2D9.jpg',
    language: 'en',
    published_at: '2023-09-24T18:26:19.000000Z',
    source: 'espn.com',
    categories: [ 'sports', 'general' ],
    relevance_score: null,
    locale: 'us'
  },
  {
    uuid: '8963bb28-620c-4f7c-b0b4-f0cbbe081783',
    title: 'Kerry Washington says her world was turned ‘upside down’ upon learning paternity revelation',
    description: 'Kerry Washington is sharing a piece of her family history.',
    keywords: 'celebrities, domestic alerts, domestic-entertainment, international alerts, international-entertainment, kerry washington',
    snippet: 'CNN —\n' +
      '\n' +
      'Kerry Washington is sharing a piece of her family history.\n' +
      '\n' +
      'In an interview with People published Sunday, Washington revealed she learned in 2018 that ...',
    url: 'https://www.cnn.com/2023/09/24/entertainment/kerry-washington-paternity/index.html',
    image_url: 'https://media.cnn.com/api/v1/images/stellar/prod/230924132705-kerry-washington-0607-restricted.jpg?c=16x9&q=w_800,c_fill',
    language: 'en',
    published_at: '2023-09-24T18:18:38.000000Z',
    source: 'cnn.com',
    categories: [ 'general' ],
    relevance_score: null,
    locale: 'us'
  },
  {
    uuid: 'ab1db6e6-b93f-4c9b-bada-672e7babfb49',
    title: 'Son, Maddison form dangerous duo as Spurs frustrate Arsenal',
    description: "After frustrating Arsenal in a 2-2 draw, Spurs' attack looks promising with Maddison and Son's partnership providing the spark.",
    keywords: '',
    snippet: 'LONDON -- Heung-Min Son wreaked havoc together with Harry Kane on Premier League defences for years, but in James Maddison he appears to found a new partner-in-...',
    url: 'https://www.espn.com/soccer/story/_/id/38476998/heung-min-son-james-maddison-form-dangerous-duo-tottenham-hotspur-frustrate-arsenal',
    image_url: 'https://a3.espncdn.com/combiner/i?img=%2Fphoto%2F2023%2F0924%2Fr1229084_1296x729_16%2D9.jpg',
    language: 'en',
    published_at: '2023-09-24T18:11:33.000000Z',
    source: 'espn.com',
    categories: [ 'sports', 'general' ],
    relevance_score: null,
    locale: 'us'
  },
  {
    uuid: '758643f4-e212-414d-aa5a-58afbb26e8fa',
    title: 'California Dem Eric Swalwell calls McCarthy ‘a spectator speaker’',
    description: '"He may have the title, but Donald Trump and Marjorie Taylor Greene and Matt Gaetz, they all share the job,” Eric Swalwell said.',
    keywords: '',
    snippet: 'The House has yet to pass legislation to fund the government amid Republican infighting with hardliners who have promised to object to any stopgap measure. McCa...',
    url: 'https://www.politico.com/news/2023/09/24/swalwell-mccarthy-spectator-speaker-00117841',
    image_url: 'https://static.politico.com/87/a5/47e8f84645ea854e46876d9df3cb/house-judiciary-committee-markup-on-gun-control-legislation-17872.jpg',
    language: 'en',
    published_at: '2023-09-24T18:10:03.000000Z',
    source: 'politico.com',
    categories: [ 'politics', 'general' ],
    relevance_score: null,
    locale: 'us'
  },
  {
    uuid: 'dab46845-2611-4ee9-92ab-f0c497c83a3a',
    title: '‘Ex-Husbands’ Co-Stars Griffin Dunne & James Norton Talk Interim Agreements & Hopes For Fair Strike Resolution Soon – San Sebastian',
    description: '‘Ex-Husbands’ Co-Stars Griffin Dunne, James Norton Talk Interim Agreements & Hopes For Fair Resolution Soon – San Sebastian',
    keywords: '',
    snippet: 'Noah Pritzker’s bittersweet father and sons tale Ex-Husbands (aka Men Of Divorce) world premieres in Competition at the San Sebastian Film Festival on Sunday ...',
    url: 'https://deadline.com/2023/09/ex-husbands-co-stars-griffin-dunne-james-norton-interim-agreements-san-sebastian-1235554763/',
    image_url: 'https://deadline.com/wp-content/uploads/2023/09/GettyImages-1698832580.jpg?w=1024',
    language: 'en',
    published_at: '2023-09-24T18:07:54.000000Z',
    source: 'deadline.com',
    categories: [ 'entertainment' ],
    relevance_score: null,
    locale: 'us'
  },
  {
    uuid: 'bd9c6cdb-2ab8-4c90-9ce4-af99481c11ed',
    title: 'Former NHL player Nicolas Kerdiles dies after a motorcycle crash in Nashville',
    description: 'Police say former NHL player Nicolas Kerdiles has died after a motorcycle crash in Nashville',
    keywords: 'Youth sports, Sports, NHL hockey, U.S. news, General news, Article, 103447611',
    snippet: 'Anaheim Ducks left wing Nicolas Kerdiles stands on the ice during the second period of an NHL hockey game against the Boston Bruins, Feb. 22, 2017, in Anaheim, ...',
    url: 'https://abcnews.go.com/Sports/wireStory/former-nhl-player-nicolas-kerdiles-dies-after-motorcycle-103447611',
    image_url: 'https://i.abcnewsfe.com/a/68f63d06-45c1-4a54-ba6f-5d44b4c3d024/wirestory_7d7d2f43adb17c8479eab392fda71649_16x9.jpg?w=992',
    language: 'en',
    published_at: '2023-09-24T18:06:21.000000Z',
    source: 'abcnews.go.com',
    categories: [ 'general' ],
    relevance_score: null,
    locale: 'us'
  },
  {
    uuid: 'b3e7114f-132d-426f-9d4d-5656a0306b7e',
    title: 'Bills vs. Commanders (Sep 24, 2023) Live Score',
    description: 'Live coverage of the Buffalo Bills vs. Washington Commanders NFL game on ESPN, including live score, highlights and updated stats.',
    keywords: '',
    snippet: "Dolphins' Tua Tagovailoa, Tyreek Hill hook up on 54-yard TD\n" +
      '\n' +
      'Hill is the first Dolphins player since 2005 to have a receiving TD in each of the first three game...',
    url: 'https://www.espn.com/nfl/game/_/gameId/401547431',
    image_url: 'http://s.espncdn.com/stitcher/sports/football/nfl/events/401547431.png?templateId=espn.com.share.1',
    language: 'en',
    published_at: '2023-09-24T18:04:57.000000Z',
    source: 'espn.com',
    categories: [ 'sports', 'general' ],
    relevance_score: null,
    locale: 'us'
  },
  {
    uuid: '05fe2c40-fec6-43e0-a54f-9a11651cf1d2',
    title: 'Google News',
    description: 'Comprehensive up-to-date news coverage, aggregated from sources all over the world by Google News.',
    keywords: '',
    snippet: '',
    url: 'https://news.google.com/rss/articles/CCAiC1dZNlVNRk5RdWgwmAEB?oc=5&hl=en-US&gl=US&ceid=US:en',
    image_url: 'https://lh3.googleusercontent.com/J6_coFbogxhRI9iM864NL_liGXvsQp2AupsKei7z0cNNfDvGUmWUy20nuUhkREQyrpY4bEeIBuc=s0-w300-rw',
    language: 'en',
    published_at: '2023-09-24T18:00:25.000000Z',
    source: 'news.google.com',
    categories: [ 'general' ],
    relevance_score: null,
    locale: 'us'
  },
  {
    uuid: '4216bee3-b596-4ee4-a09b-ff978aa056e4',
    title: 'AOC partly blames US sanctions against Venezuelan dictator for migrant crisis',
    description: "New York Rep. Alexandria Ocasio-Cortez on Sunday partly blamed US sanctions targeting Venezuela's dictator regime for the migrant crisis ravaging the Big Apple ...",
    keywords: 'News, Alexandria Ocasio-Cortez, elon musk, migrants, new york city, tesla',
    snippet: 'New York Rep. Alexandria Ocasio-Cortez on Sunday partly blamed US sanctions targeting Venezuela’s dictator regime for the migrant crisis ravaging the Big Appl...',
    url: 'https://nypost.com/2023/09/24/aoc-partly-blames-us-sanctions-against-venezuelan-dicator-for-migrant-crisis/',
    image_url: 'https://nypost.com/wp-content/uploads/sites/2/2023/09/NYPICHPDPICT000043936520.jpg?quality=75&strip=all&w=1024',
    language: 'en',
    published_at: '2023-09-24T17:58:06.000000Z',
    source: 'nypost.com',
    categories: [ 'general' ],
    relevance_score: null,
    locale: 'us'
  },
  {
    uuid: 'd57cd78a-e06d-43d3-a6e9-4b3ba9c8ee62',
    title: 'Pink Floyd co-founder Roger Waters banned from speaking at UPenn after accusations of anti-Semitism',
    description: 'The 80-year-old singer-songwriter was set to appear on the UPenn campus for a panel discussion for the Palestine Writes Literature Festival on Saturday, but pos...',
    keywords: 'News, anti-semitism, israel, palestine, roger waters, university of pennsylvania',
    snippet: 'Pink Floyd co-founder Richard Waters was banned from speaking on the University of Pennsylvania campus amid allegations of anti-Semitism for his wearing a Nazi-...',
    url: 'https://nypost.com/2023/09/24/pink-floyd-co-founder-roger-waters-banned-from-speaking-at-upenn/',
    image_url: 'https://nypost.com/wp-content/uploads/sites/2/2023/09/NYPICHPDPICT000043933473.jpg?quality=75&strip=all&w=1024',
    language: 'en',
    published_at: '2023-09-24T17:54:54.000000Z',
    source: 'nypost.com',
    categories: [ 'general' ],
    relevance_score: null,
    locale: 'us'
  },
  {
    uuid: '40db767f-c085-44e4-ae25-7698972bbb3f',
    title: 'Today’s news in 10 minutes',
    description: 'September 25, 2023',
    keywords: '',
    snippet: 'Story highlights This page includes the show Transcript\n' +
      '\n' +
      'September 25, 2023\n' +
      '\n' +
      'Today on CNN10, Australia faces another fire season. We’ll meet volunteer firefig...',
    url: 'https://www.cnn.com/2023/09/24/cnn10/ten-content-mon/index.html',
    image_url: 'https://media.cnn.com/api/v1/images/stellar/prod/230924135021-cnn-10-sept-25-wildfire.jpg?c=16x9&q=w_800,c_fill',
    language: 'en',
    published_at: '2023-09-24T17:54:15.000000Z',
    source: 'cnn.com',
    categories: [ 'general' ],
    relevance_score: null,
    locale: 'us'
  },
  {
    uuid: '74f48f4c-dade-429e-a68a-699a32d177f3',
    title: 'Powerball jackpot: Lottery amount for winner grows to $785 million, fourth largest prize in history',
    description: 'Lottery players have another chance to win big on Monday after the Powerball jackpot grew to a record-breaking $785 million.',
    keywords: 'amusements and gaming, brand safety-nsf gambling, brand safety-nsf sensitive, iab-lotteries and scratchcards, iab-shopping, leisure and lifestyle, lotteries',
    snippet: 'CNN —\n' +
      '\n' +
      'Lottery players have another chance to win big on Monday after the Powerball jackpot grew to a record-breaking $785 million.\n' +
      '\n' +
      'The prize became the four...',
    url: 'https://www.cnn.com/2023/09/24/us/powerball-jackpot-lottery-amount-millions/index.html',
    image_url: 'https://media.cnn.com/api/v1/images/stellar/prod/230924133038-powerball-jackpot-lottery-amount-millions.jpg?c=16x9&q=w_800,c_fill',
    language: 'en',
    published_at: '2023-09-24T17:52:17.000000Z',
    source: 'cnn.com',
    categories: [ 'general' ],
    relevance_score: null,
    locale: 'us'
  },
  {
    uuid: 'ebbfd9cd-d8ba-434a-8d60-e6375104cdc4',
    title: 'Suspect arrested after shooting at the Oklahoma State Fair injures 1, police say',
    description: 'Oklahoma City police say one person was injured when shots were fired during an argument between two groups of people at the Oklahoma State Fair, sending a crow...',
    keywords: 'Fairs and festivals, Shootings, U.S. news, General news, Article, 103447619',
    snippet: 'Oklahoma City police say one person was injured when shots were fired during an argument between two groups of people at the Oklahoma State Fair, sending a crow...',
    url: 'https://abcnews.go.com/US/wireStory/suspect-arrested-after-shooting-oklahoma-state-fair-injures-103447619',
    image_url: 'https://s.abcnews.com/images/US/abc_news_default_2000x2000_update_16x9_992.jpg',
    language: 'en',
    published_at: '2023-09-24T17:49:44.000000Z',
    source: 'abcnews.go.com',
    categories: [ 'general', 'politics' ],
    relevance_score: null,
    locale: 'us'
  },
  {
    uuid: 'a0156c8f-1dd0-45dc-820c-cd0b117c18d9',
    title: '‘Dancing With The Stars’ Picketed Again At TV City As Writers Show Support For WGA Negotiating Committee',
    description: 'As the WGA and the AMPTP begin meeting again to try and hash out a deal, members of the guild are back out on the picket line. Deadline understands that a group...',
    keywords: '',
    snippet: 'As the WGA and the AMPTP begin meeting again to try and hash out a deal, members of the guild are back out on the picket line.\n' +
      '\n' +
      'Deadline understands that a grou...',
    url: 'https://deadline.com/2023/09/writers-strike-dancing-with-the-stars-picket-tv-city-1235554764/',
    image_url: 'https://deadline.com/wp-content/uploads/2023/09/DWTS-IMG_0875-copy.jpg?w=1024',
    language: 'en',
    published_at: '2023-09-24T17:47:14.000000Z',
    source: 'deadline.com',
    categories: [ 'entertainment' ],
    relevance_score: null,
    locale: 'us'
  },
  {
    uuid: '292249d9-5364-490c-96de-3ca5ab45a41a',
    title: 'Even Fox’s Maria Bartiromo Thinks Matt Gaetz Is Going a Little Overboard',
    description: '“To blow up all of the wins that you all have had now...” she told him.',
    keywords: 'Maria Bartiromo, Matt Gaetz',
    snippet: 'Even Fox News had to ask Rep. Matt Gaetz (R-FL) on Sunday: Why do you want to shut down the government?\n' +
      '\n' +
      'Gaetz appeared on Sunday Morning Futures with Maria Bar...',
    url: 'https://www.thedailybeast.com/even-foxs-maria-bartiromo-thinks-matt-gaetz-is-sabotaging-shutdown-negotiations',
    image_url: 'https://img.thedailybeast.com/image/upload/c_crop,d_placeholder_euli9k,h_1616,w_2873,x_0,y_0/dpr_2.0/c_limit,w_740/fl_lossy,q_auto/v1695573550/Screenshot_2023-09-24_at_12.38.56_PM_drfpv3',
    language: 'en',
    published_at: '2023-09-24T17:45:08.000000Z',
    source: 'thedailybeast.com',
    categories: [ 'general', 'politics' ],
    relevance_score: null,
    locale: 'us'
  },
  {
    uuid: 'e407fced-58e9-44a1-a666-489292dfd819',
    title: "Usher Announced as Super Bowl '24 Performer With Kim Kardashian's Help",
    description: 'Kim Kardashian helped announce Usher as the headlining performer of the 2024 Super Bowl Halftime Show. Watch their promo.',
    keywords: '',
    snippet: 'Watch : Usher Spills on Pre-Performance Routine\n' +
      '\n' +
      'Can you say, Yeah!\n' +
      '\n' +
      'Usher will be the headlining performer of the 2024 Super Bowl Halftime show. Event sponsor ...',
    url: 'https://www.eonline.com/news/1386298/usher-revealed-as-super-bowl-2024-halftime-show-performer-and-kim-kardashian-helps-announce-the-news?cmpid=rss-syndicate-genericrss-us-top_stories',
    image_url: 'https://akns-images.eonline.com/eol_images/Entire_Site/2023824/rs_1200x1200-230924103727-1200-usher-2022-cjh-092423.jpg?fit=around%7C1080:1080&output-quality=90&crop=1080:1080;center,top',
    language: 'en',
    published_at: '2023-09-24T17:41:28.000000Z',
    source: 'eonline.com',
    categories: [ 'entertainment', 'general' ],
    relevance_score: null,
    locale: 'us'
  },
  {
    uuid: 'a4a660c8-eeb8-422a-b0dd-da2cae91f359',
    title: 'Tensions escalate in Kosovo over deadly attack on police',
    description: 'Belgrade and Pristina have accused each other of escalation after a police officer in the breakaway region was killed in a shooting',
    keywords: '',
    snippet: 'A Kosovo police patrol has been attacked in the northern part of the breakaway region, its prime minister Albin Kurti says\n' +
      '\n' +
      'Kosovo’s Prime Minister Albin Kurt...',
    url: 'https://www.rt.com/news/583487-kosovo-deadly-attack-police-tensions/',
    image_url: 'https://mf.b37mrtl.ru/files/2023.09/article/6510729e85f54019f6754013.jpg',
    language: 'en',
    published_at: '2023-09-24T17:39:03.000000Z',
    source: 'rt.com',
    categories: [ 'general', 'politics' ],
    relevance_score: null,
    locale: 'us'
  },
  {
    uuid: '7f7cac34-2cd1-4316-9dac-89abd0cfc6a2',
    title: 'US government stopped me from interviewing Putin – Tucker Carlson',
    description: 'TV personality Tucker Carlson is claiming in an interview that the US government stifled his attempts to interview the president of Russia',
    keywords: '',
    snippet: 'The former Fox News host has questioned why ‘you’re not allowed to hear’ the Russian president’s voice\n' +
      '\n' +
      'Former Fox News host Tucker Carlson has alleged ...',
    url: 'https://www.rt.com/news/583486-tucker-carlson-putin-interview/',
    image_url: 'https://mf.b37mrtl.ru/files/2023.09/article/6510720385f54030475aafdf.jpg',
    language: 'en',
    published_at: '2023-09-24T17:38:48.000000Z',
    source: 'rt.com',
    categories: [ 'general', 'politics' ],
    relevance_score: null,
    locale: 'us'
  },
  {
    uuid: '1ce33f21-363a-4728-a6af-62d10df3e7db',
    title: 'Bipartisan House caucus leaders working to force vote as government shutdown looms',
    description: 'With government funding slated to run out September 30, the leaders of the bipartisan House Problem Solvers Caucus told CNN on Sunday that “all options are on...',
    keywords: 'appropriations, budget deficits, business, economy and trade, domestic alerts, domestic-business, domestic-us politics, economy and economic indicators, federal budget, federal budget deficit, government and public administration, government budgets, government organizations - us, iab-business and finance, iab-economy, iab-political issues & policy, iab-politics, international alerts, international-business, international-us politics, kevin mccarthy, legislation, matt gaetz, political figures - us, political organizations, political platforms and issues, politics, public debt, public finance, us congress, us federal government shutdowns, us house of representatives, us political parties, us republican party',
    snippet: 'CNN —\n' +
      '\n' +
      'With government funding slated to run out September 30, the leaders of the bipartisan House Problem Solvers Caucus told CNN on Sunday that “all optio...',
    url: 'https://www.cnn.com/2023/09/24/politics/government-shutdown-discharge-petition/index.html',
    image_url: 'https://media.cnn.com/api/v1/images/stellar/prod/230924130550-josh-gottheimer-brian-fitzpatrick-split.jpg?c=16x9&q=w_800,c_fill',
    language: 'en',
    published_at: '2023-09-24T17:37:30.000000Z',
    source: 'cnn.com',
    categories: [ 'general' ],
    relevance_score: null,
    locale: 'us'
  },
  {
    uuid: '9252cec8-ba51-475b-8658-47c9a8af1b2a',
    title: 'Companies turn to crisis PR firms when money, reputation is at risk',
    description: 'Innocent until proven guilty might hold up in the court of law, but the court of public opinion tends to play by hazier rules.',
    keywords: 'anheuser-busch inbev, brand safety-nsf alcohol, brand safety-nsf online illegal, brand safety-nsf products and consumers negative, brand safety-nsf sensitive, business, economy and trade, companies, company activities and management, domestic alerts, domestic-business, iab-advertising industry, iab-business, iab-business and finance, iab-computing, iab-industries, iab-internet, iab-marketing and advertising, iab-social networking, iab-technology & computing, international alerts, international-business, public relations, sex and gender, social media, society, transgender persons',
    snippet: 'CNN —\n' +
      '\n' +
      'Innocent until proven guilty might hold up in the court of law, but the court of public opinion tends to play by hazier rules.\n' +
      '\n' +
      'From celebrity scandals...',
    url: 'https://www.cnn.com/2023/09/24/business/crisis-public-relations-companies/index.html',
    image_url: 'https://media.cnn.com/api/v1/images/stellar/prod/230803032253-bud-light-sales.jpg?c=16x9&q=w_800,c_fill',
    language: 'en',
    published_at: '2023-09-24T17:37:19.000000Z',
    source: 'cnn.com',
    categories: [ 'general' ],
    relevance_score: null,
    locale: 'us'
  },
  {
    uuid: 'fb47a94c-3416-4f7c-94bd-bbc23def23d6',
    title: 'Jimmy Carter attends Plains Peanut Festival',
    description: 'The former president has been in hospice care since February.',
    keywords: '',
    snippet: 'PLAINS, Ga. — Former President Jimmy Carter and his wife, Rosalynn, on Saturday made a surprise appearance at the Plains Peanut Festival in their Georgia home...',
    url: 'https://www.politico.com/news/2023/09/24/jimmy-carter-attends-plains-peanut-festival-00117840',
    image_url: 'https://static.politico.com/24/a1/d06534e74aa0aa7a46e51a21d480/jimmy-carter-peanut-festival-83917.jpg',
    language: 'en',
    published_at: '2023-09-24T17:36:15.000000Z',
    source: 'politico.com',
    categories: [ 'politics', 'general' ],
    relevance_score: null,
    locale: 'us'
  }
]