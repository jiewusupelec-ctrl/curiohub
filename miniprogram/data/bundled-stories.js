/*
 * Copyright (C) 2026 Lenovo
 * All Rights Reserved.
 * Lenovo Confidential Restricted.
 */

const TOPICS = ["科学", "航天", "太空", "AI", "科技", "金融", "地理", "发明", "生物", "大自然", "简单政治"];

const LENGTH_LABELS = {
  short: "短篇快讯",
  medium: "中篇故事",
  long: "深度长篇"
};

const PLAY_ICON_URI = "data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20viewBox%3D%220%200%2024%2024%22%3E%3Cpath%20fill%3D%22%23132743%22%20d%3D%22M8.5%204.5v15l11.5-7.5z%22/%3E%3C/svg%3E";
const PAUSE_ICON_URI = "data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20viewBox%3D%220%200%2024%2024%22%3E%3Crect%20x%3D%225%22%20y%3D%224%22%20width%3D%225%22%20height%3D%2216%22%20rx%3D%222%22%20fill%3D%22%23132743%22/%3E%3Crect%20x%3D%2214%22%20y%3D%224%22%20width%3D%225%22%20height%3D%2216%22%20rx%3D%222%22%20fill%3D%22%23132743%22/%3E%3C/svg%3E";

const ART_TOPICS = {
  "科学": {
    "className": "topic-science",
    "label": "科学 · 发现",
    "dataUri": "data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20viewBox%3D%220%200%20330%20190%22%3E%3Cstyle%3E.art-bg%7Bfill%3Argba%28255%2C255%2C255%2C0.72%29%3B%7D.art-white%7Bfill%3A%23fff9e8%3B%7D.art-cream%7Bfill%3A%23ffe3aa%3B%7D.art-dark%7Bfill%3A%23173252%3B%7D.art-blue%7Bfill%3A%2365d5e4%3B%7D.art-yellow%7Bfill%3A%23ffd15f%3B%7D.art-pink%7Bfill%3A%23ff9c91%3B%7D.art-green%7Bfill%3A%238bd59f%3B%7D.art-purple%7Bfill%3A%23bca8ff%3B%7D.art-line%7Bfill%3Anone%3Bstroke%3A%23245276%3Bstroke-width%3A3%3Bstroke-linecap%3Around%3Bstroke-linejoin%3Around%3B%7D.art-line-dark%7Bfill%3Anone%3Bstroke%3A%23173252%3Bstroke-width%3A3%3Bstroke-linecap%3Around%3Bstroke-linejoin%3Around%3B%7D.sound-ring%7Bfill%3Anone%3Bstroke%3Argba%2836%2C125%2C177%2C0.38%29%3Bstroke-width%3A2%3B%7D%3C/style%3E%20%3Ccircle%20class%3D%22art-bg%22%20cx%3D%22230%22%20cy%3D%2294%22%20r%3D%2286%22/%3E%3Ccircle%20class%3D%22sound-ring%22%20cx%3D%22206%22%20cy%3D%22105%22%20r%3D%2244%22/%3E%20%3Cg%20class%3D%22hero-main%22%3E%20%3Cpath%20class%3D%22art-line%22%20d%3D%22M85%2039l-18%206%207%2024m34-30%2016%208-7%2021%22/%3E%3Cpath%20class%3D%22art-line%22%20d%3D%22M79%2047c9-12%2030-13%2039-1%22/%3E%20%3Cpath%20class%3D%22art-blue%22%20d%3D%22M73%2069h32l-5%2073c-1%2012-20%2012-22%200z%22/%3E%3Cpath%20class%3D%22art-white%22%20d%3D%22M76%20113h27l-2%2028c-2%2011-19%2011-21%200z%22/%3E%20%3Cpath%20class%3D%22art-pink%22%20d%3D%22M122%2072h35l-14%2069c-2%2011-20%2011-22%200z%22/%3E%3Cpath%20class%3D%22art-cream%22%20d%3D%22M120%20105h31l-8%2036c-2%2010-17%2010-19%200z%22/%3E%20%3Ccircle%20class%3D%22art-yellow%22%20cx%3D%2282%22%20cy%3D%2245%22%20r%3D%226%22/%3E%3Ccircle%20class%3D%22art-pink%22%20cx%3D%22121%22%20cy%3D%2234%22%20r%3D%225%22/%3E%3Ccircle%20class%3D%22art-blue%22%20cx%3D%22151%22%20cy%3D%2244%22%20r%3D%224%22/%3E%20%3Ccircle%20class%3D%22art-yellow%22%20cx%3D%22235%22%20cy%3D%2291%22%20r%3D%2225%22/%3E%3Ccircle%20class%3D%22art-dark%22%20cx%3D%22235%22%20cy%3D%2291%22%20r%3D%2217%22/%3E%20%3Cpath%20class%3D%22art-line%22%20d%3D%22M247%20104l22%2022%22/%3E%3Cpath%20class%3D%22art-line%22%20d%3D%22M235%2061v-19m-30%2049h-19m49%200h19m-27%2027%200%2018m-21-52%2018%2018m0-36-18%2018m42%200-18%2018m0-36%2018%2018%22/%3E%20%3Cpath%20class%3D%22art-line%22%20d%3D%22M269%2047l3%208%208%203-8%203-3%208-3-8-8-3%208-3z%22/%3E%20%3C/g%3E%3Cpath%20class%3D%22art-line%22%20d%3D%22M46%20103v18m-9-9h18%22/%3E%3Cpath%20class%3D%22art-line%22%20d%3D%22M294%20126v14m-7-7h14%22/%3E%20%3C/svg%3E"
  },
  "航天": {
    "className": "topic-aerospace",
    "label": "航天 · 出发",
    "dataUri": "data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20viewBox%3D%220%200%20330%20190%22%3E%3Cstyle%3E.art-bg%7Bfill%3Argba%28255%2C255%2C255%2C0.72%29%3B%7D.art-white%7Bfill%3A%23fff9e8%3B%7D.art-cream%7Bfill%3A%23ffe3aa%3B%7D.art-dark%7Bfill%3A%23173252%3B%7D.art-blue%7Bfill%3A%2365d5e4%3B%7D.art-yellow%7Bfill%3A%23ffd15f%3B%7D.art-pink%7Bfill%3A%23ff9c91%3B%7D.art-green%7Bfill%3A%238bd59f%3B%7D.art-purple%7Bfill%3A%23bca8ff%3B%7D.art-line%7Bfill%3Anone%3Bstroke%3A%23245276%3Bstroke-width%3A3%3Bstroke-linecap%3Around%3Bstroke-linejoin%3Around%3B%7D.art-line-dark%7Bfill%3Anone%3Bstroke%3A%23173252%3Bstroke-width%3A3%3Bstroke-linecap%3Around%3Bstroke-linejoin%3Around%3B%7D.sound-ring%7Bfill%3Anone%3Bstroke%3Argba%2836%2C125%2C177%2C0.38%29%3Bstroke-width%3A2%3B%7D%3C/style%3E%20%3Ccircle%20class%3D%22art-bg%22%20cx%3D%22225%22%20cy%3D%2298%22%20r%3D%2288%22/%3E%3Ccircle%20class%3D%22sound-ring%22%20cx%3D%22210%22%20cy%3D%22103%22%20r%3D%2246%22/%3E%20%3Cpath%20class%3D%22art-line%22%20d%3D%22M56%2044v16m-8-8h16%22/%3E%3Cpath%20class%3D%22art-line%22%20d%3D%22M288%2051v12m-6-6h12%22/%3E%20%3Cg%20class%3D%22hero-main%22%3E%20%3Cpath%20class%3D%22art-cream%22%20d%3D%22M93%20153c-19%205-35%2016-39%2026%2013-2%2028-7%2041-18z%22/%3E%3Cpath%20class%3D%22art-yellow%22%20d%3D%22M110%20143c-2%2017%204%2029%2013%2039%207-13%209-28%204-43z%22/%3E%20%3Cpath%20class%3D%22art-pink%22%20d%3D%22M133%20142c4%2014%2014%2023%2028%2027-1-15-8-28-22-36z%22/%3E%20%3Cpath%20class%3D%22art-white%22%20d%3D%22M125%2045c27%2017%2039%2047%2029%2083l-23%2031-33-20-1-38c6-26%2013-43%2028-56z%22/%3E%20%3Cpath%20class%3D%22art-blue%22%20d%3D%22M125%2045c-5%2018-3%2032%207%2045%2018-9%2025-23%2028-38-10-7-22-10-35-7z%22/%3E%20%3Cpath%20class%3D%22art-pink%22%20d%3D%22M97%20101%2069%20112c4%2012%2015%2020%2030%2023l16-19z%22/%3E%3Cpath%20class%3D%22art-pink%22%20d%3D%22m145%20130%2012%2028c13-4%2021-15%2023-30l-18-14z%22/%3E%20%3Ccircle%20class%3D%22art-dark%22%20cx%3D%22125%22%20cy%3D%2278%22%20r%3D%2214%22/%3E%3Ccircle%20class%3D%22art-blue%22%20cx%3D%22125%22%20cy%3D%2278%22%20r%3D%228%22/%3E%3Ccircle%20class%3D%22art-white%22%20cx%3D%22122%22%20cy%3D%2275%22%20r%3D%223%22/%3E%20%3Cpath%20class%3D%22art-line-dark%22%20d%3D%22M119%20105q8%207%2016%200%22/%3E%20%3C/g%3E%3Cpath%20class%3D%22art-cream%22%20d%3D%22M212%20145c20-9%2039-6%2053%207-16%209-36%2010-53%201z%22/%3E%3Cpath%20class%3D%22art-white%22%20d%3D%22M247%20158c13-7%2029-4%2036%206-12%206-25%205-36%200z%22/%3E%20%3C/svg%3E"
  },
  "太空": {
    "className": "topic-space",
    "label": "太空 · 远方",
    "dataUri": "data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20viewBox%3D%220%200%20330%20190%22%3E%3Cstyle%3E.art-bg%7Bfill%3Argba%28255%2C255%2C255%2C0.72%29%3B%7D.art-white%7Bfill%3A%23fff9e8%3B%7D.art-cream%7Bfill%3A%23ffe3aa%3B%7D.art-dark%7Bfill%3A%23173252%3B%7D.art-blue%7Bfill%3A%2365d5e4%3B%7D.art-yellow%7Bfill%3A%23ffd15f%3B%7D.art-pink%7Bfill%3A%23ff9c91%3B%7D.art-green%7Bfill%3A%238bd59f%3B%7D.art-purple%7Bfill%3A%23bca8ff%3B%7D.art-line%7Bfill%3Anone%3Bstroke%3A%23245276%3Bstroke-width%3A3%3Bstroke-linecap%3Around%3Bstroke-linejoin%3Around%3B%7D.art-line-dark%7Bfill%3Anone%3Bstroke%3A%23173252%3Bstroke-width%3A3%3Bstroke-linecap%3Around%3Bstroke-linejoin%3Around%3B%7D.sound-ring%7Bfill%3Anone%3Bstroke%3Argba%2836%2C125%2C177%2C0.38%29%3Bstroke-width%3A2%3B%7D%3C/style%3E%20%3Ccircle%20class%3D%22art-bg%22%20cx%3D%22222%22%20cy%3D%2294%22%20r%3D%2288%22/%3E%3Ccircle%20class%3D%22sound-ring%22%20cx%3D%22210%22%20cy%3D%22100%22%20r%3D%2247%22/%3E%20%3Cpath%20class%3D%22art-line%22%20d%3D%22M55%2051v17m-9-8h18%22/%3E%3Cpath%20class%3D%22art-line%22%20d%3D%22M287%2040v14m-7-7h14%22/%3E%3Cpath%20class%3D%22art-line%22%20d%3D%22M279%20133v11m-6-5h12%22/%3E%20%3Cg%20class%3D%22hero-main%22%3E%20%3Cellipse%20class%3D%22art-yellow%22%20cx%3D%22211%22%20cy%3D%2284%22%20rx%3D%2245%22%20ry%3D%2212%22%20transform%3D%22rotate%28-12%20211%2084%29%22/%3E%3Ccircle%20class%3D%22art-pink%22%20cx%3D%22211%22%20cy%3D%2284%22%20r%3D%2229%22/%3E%3Cellipse%20class%3D%22art-cream%22%20cx%3D%22211%22%20cy%3D%2284%22%20rx%3D%2243%22%20ry%3D%229%22%20transform%3D%22rotate%28-12%20211%2084%29%22/%3E%3Ccircle%20class%3D%22art-pink%22%20cx%3D%22211%22%20cy%3D%2284%22%20r%3D%2222%22/%3E%20%3Cpath%20class%3D%22art-line-dark%22%20d%3D%22M202%2086q9%208%2018%200%22/%3E%3Ccircle%20class%3D%22art-dark%22%20cx%3D%22204%22%20cy%3D%2278%22%20r%3D%222.5%22/%3E%3Ccircle%20class%3D%22art-dark%22%20cx%3D%22218%22%20cy%3D%2276%22%20r%3D%222.5%22/%3E%20%3Cpath%20class%3D%22art-cream%22%20d%3D%22M91%2052c20%203%2029%2020%2022%2037-7%2016-26%2021-41%2012%2011-2%2018-10%2019-21%201-11-4-21-14-27z%22/%3E%20%3Cpath%20class%3D%22art-blue%22%20d%3D%22m88%20141%2035-19%209%2011-35%2018z%22/%3E%3Cpath%20class%3D%22art-white%22%20d%3D%22m119%20122%2016-30%2013%207-12%2031z%22/%3E%3Ccircle%20class%3D%22art-yellow%22%20cx%3D%22143%22%20cy%3D%2292%22%20r%3D%2211%22/%3E%3Cpath%20class%3D%22art-line%22%20d%3D%22M91%20153h76m-44-8%2017-50%22/%3E%20%3C/g%3E%20%3C/svg%3E"
  },
  "AI": {
    "className": "topic-ai",
    "label": "AI · 想一想",
    "dataUri": "data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20viewBox%3D%220%200%20330%20190%22%3E%3Cstyle%3E.art-bg%7Bfill%3Argba%28255%2C255%2C255%2C0.72%29%3B%7D.art-white%7Bfill%3A%23fff9e8%3B%7D.art-cream%7Bfill%3A%23ffe3aa%3B%7D.art-dark%7Bfill%3A%23173252%3B%7D.art-blue%7Bfill%3A%2365d5e4%3B%7D.art-yellow%7Bfill%3A%23ffd15f%3B%7D.art-pink%7Bfill%3A%23ff9c91%3B%7D.art-green%7Bfill%3A%238bd59f%3B%7D.art-purple%7Bfill%3A%23bca8ff%3B%7D.art-line%7Bfill%3Anone%3Bstroke%3A%23245276%3Bstroke-width%3A3%3Bstroke-linecap%3Around%3Bstroke-linejoin%3Around%3B%7D.art-line-dark%7Bfill%3Anone%3Bstroke%3A%23173252%3Bstroke-width%3A3%3Bstroke-linecap%3Around%3Bstroke-linejoin%3Around%3B%7D.sound-ring%7Bfill%3Anone%3Bstroke%3Argba%2836%2C125%2C177%2C0.38%29%3Bstroke-width%3A2%3B%7D%3C/style%3E%20%3Ccircle%20class%3D%22art-bg%22%20cx%3D%22222%22%20cy%3D%2296%22%20r%3D%2287%22/%3E%3Ccircle%20class%3D%22sound-ring%22%20cx%3D%22208%22%20cy%3D%22105%22%20r%3D%2245%22/%3E%20%3Cpath%20class%3D%22art-line%22%20d%3D%22M65%2050v16m-8-8h16%22/%3E%3Cpath%20class%3D%22art-line%22%20d%3D%22M278%2042v15m-7-7h14%22/%3E%3Ccircle%20class%3D%22art-yellow%22%20cx%3D%22275%22%20cy%3D%2278%22%20r%3D%226%22/%3E%20%3Cg%20class%3D%22hero-main%22%3E%20%3Cpath%20class%3D%22art-line%22%20d%3D%22M158%2069V48m0%200c0-10%2015-10%2015%200%22/%3E%3Ccircle%20class%3D%22art-yellow%22%20cx%3D%22158%22%20cy%3D%2240%22%20r%3D%227%22/%3E%20%3Crect%20class%3D%22art-white%22%20x%3D%22117%22%20y%3D%2267%22%20width%3D%2282%22%20height%3D%2261%22%20rx%3D%2220%22/%3E%3Crect%20class%3D%22art-blue%22%20x%3D%22129%22%20y%3D%2278%22%20width%3D%2258%22%20height%3D%2235%22%20rx%3D%2213%22/%3E%20%3Ccircle%20class%3D%22art-dark%22%20cx%3D%22148%22%20cy%3D%2294%22%20r%3D%226%22/%3E%3Ccircle%20class%3D%22art-dark%22%20cx%3D%22169%22%20cy%3D%2294%22%20r%3D%226%22/%3E%3Cpath%20class%3D%22art-line-dark%22%20d%3D%22M148%20104q11%208%2022%200%22/%3E%20%3Cpath%20class%3D%22art-pink%22%20d%3D%22M117%2083%2099%2092l18%2010zm82%200%2018%209-18%2010z%22/%3E%3Crect%20class%3D%22art-cream%22%20x%3D%22137%22%20y%3D%22127%22%20width%3D%2217%22%20height%3D%2222%22%20rx%3D%228%22/%3E%3Crect%20class%3D%22art-cream%22%20x%3D%22163%22%20y%3D%22127%22%20width%3D%2217%22%20height%3D%2222%22%20rx%3D%228%22/%3E%20%3Cpath%20class%3D%22art-line%22%20d%3D%22M108%20147h84%22/%3E%3Cpath%20class%3D%22art-line%22%20d%3D%22M221%2070q21-20%2037-3%22/%3E%3Cpath%20class%3D%22art-line%22%20d%3D%22M232%2053l11%2014%2013-14%22/%3E%20%3C/g%3E%20%3C/svg%3E"
  },
  "科技": {
    "className": "topic-tech",
    "label": "科技 · 发明",
    "dataUri": "data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20viewBox%3D%220%200%20330%20190%22%3E%3Cstyle%3E.art-bg%7Bfill%3Argba%28255%2C255%2C255%2C0.72%29%3B%7D.art-white%7Bfill%3A%23fff9e8%3B%7D.art-cream%7Bfill%3A%23ffe3aa%3B%7D.art-dark%7Bfill%3A%23173252%3B%7D.art-blue%7Bfill%3A%2365d5e4%3B%7D.art-yellow%7Bfill%3A%23ffd15f%3B%7D.art-pink%7Bfill%3A%23ff9c91%3B%7D.art-green%7Bfill%3A%238bd59f%3B%7D.art-purple%7Bfill%3A%23bca8ff%3B%7D.art-line%7Bfill%3Anone%3Bstroke%3A%23245276%3Bstroke-width%3A3%3Bstroke-linecap%3Around%3Bstroke-linejoin%3Around%3B%7D.art-line-dark%7Bfill%3Anone%3Bstroke%3A%23173252%3Bstroke-width%3A3%3Bstroke-linecap%3Around%3Bstroke-linejoin%3Around%3B%7D.sound-ring%7Bfill%3Anone%3Bstroke%3Argba%2836%2C125%2C177%2C0.38%29%3Bstroke-width%3A2%3B%7D%3C/style%3E%20%3Ccircle%20class%3D%22art-bg%22%20cx%3D%22224%22%20cy%3D%2295%22%20r%3D%2288%22/%3E%3Ccircle%20class%3D%22sound-ring%22%20cx%3D%22207%22%20cy%3D%22106%22%20r%3D%2247%22/%3E%20%3Cpath%20class%3D%22art-line%22%20d%3D%22M55%2056v16m-8-8h16%22/%3E%3Cpath%20class%3D%22art-line%22%20d%3D%22M285%2052l6%2012%2012%206-12%206-6%2013-6-13-12-6%2012-6z%22/%3E%20%3Cg%20class%3D%22hero-main%22%3E%20%3Crect%20class%3D%22art-yellow%22%20x%3D%22101%22%20y%3D%2261%22%20width%3D%2273%22%20height%3D%2273%22%20rx%3D%2213%22/%3E%3Crect%20class%3D%22art-blue%22%20x%3D%22114%22%20y%3D%2274%22%20width%3D%2247%22%20height%3D%2247%22%20rx%3D%228%22/%3E%3Ccircle%20class%3D%22art-dark%22%20cx%3D%22138%22%20cy%3D%2298%22%20r%3D%2210%22/%3E%3Cpath%20class%3D%22art-line%22%20d%3D%22M138%2085v26m-13-13h26%22/%3E%20%3Cpath%20class%3D%22art-line%22%20d%3D%22M110%2052v10m18-10v10m19-10v10m18-10v10m-65%2082v10m18-10v10m19-10v10m18-10v10M91%2073h10m-10%2020h10m-10%2020h10m73-40h10m-10%2020h10m-10%2020h10%22/%3E%20%3Cpath%20class%3D%22art-pink%22%20d%3D%22M187%20121h61l14%2018h-91z%22/%3E%3Cpath%20class%3D%22art-white%22%20d%3D%22M199%20104h35l14%2017h-50z%22/%3E%3Ccircle%20class%3D%22art-dark%22%20cx%3D%22204%22%20cy%3D%22140%22%20r%3D%227%22/%3E%3Ccircle%20class%3D%22art-dark%22%20cx%3D%22247%22%20cy%3D%22140%22%20r%3D%227%22/%3E%20%3Cpath%20d%3D%22m276%2091%2011%2010-11%2010%2011%2010-11%2010%22%20fill%3D%22none%22%20stroke%3D%22%23ffd15f%22%20stroke-width%3D%226%22/%3E%20%3C/g%3E%20%3C/svg%3E"
  },
  "金融": {
    "className": "topic-finance",
    "label": "金融 · 小计划",
    "dataUri": "data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20viewBox%3D%220%200%20330%20190%22%3E%3Cstyle%3E.art-bg%7Bfill%3Argba%28255%2C255%2C255%2C0.72%29%3B%7D.art-white%7Bfill%3A%23fff9e8%3B%7D.art-cream%7Bfill%3A%23ffe3aa%3B%7D.art-dark%7Bfill%3A%23173252%3B%7D.art-blue%7Bfill%3A%2365d5e4%3B%7D.art-yellow%7Bfill%3A%23ffd15f%3B%7D.art-pink%7Bfill%3A%23ff9c91%3B%7D.art-green%7Bfill%3A%238bd59f%3B%7D.art-purple%7Bfill%3A%23bca8ff%3B%7D.art-line%7Bfill%3Anone%3Bstroke%3A%23245276%3Bstroke-width%3A3%3Bstroke-linecap%3Around%3Bstroke-linejoin%3Around%3B%7D.art-line-dark%7Bfill%3Anone%3Bstroke%3A%23173252%3Bstroke-width%3A3%3Bstroke-linecap%3Around%3Bstroke-linejoin%3Around%3B%7D.sound-ring%7Bfill%3Anone%3Bstroke%3Argba%2836%2C125%2C177%2C0.38%29%3Bstroke-width%3A2%3B%7D%3C/style%3E%20%3Ccircle%20class%3D%22art-bg%22%20cx%3D%22222%22%20cy%3D%2295%22%20r%3D%2288%22/%3E%3Ccircle%20class%3D%22sound-ring%22%20cx%3D%22207%22%20cy%3D%22108%22%20r%3D%2246%22/%3E%20%3Cpath%20class%3D%22art-line%22%20d%3D%22M64%2047v16m-8-8h16%22/%3E%3Cpath%20class%3D%22art-line%22%20d%3D%22M282%2045v15m-7-7h14%22/%3E%20%3Cg%20class%3D%22hero-main%22%3E%20%3Cpath%20class%3D%22art-green%22%20d%3D%22M137%2054c-2-18%2017-25%2022-8%2011-15%2028-3%2019%2011-11%2011-28%2010-41-3z%22/%3E%20%3Cellipse%20class%3D%22art-pink%22%20cx%3D%22135%22%20cy%3D%22111%22%20rx%3D%2254%22%20ry%3D%2238%22/%3E%3Ccircle%20class%3D%22art-pink%22%20cx%3D%22181%22%20cy%3D%2299%22%20r%3D%2221%22/%3E%3Cellipse%20class%3D%22art-dark%22%20cx%3D%22188%22%20cy%3D%2296%22%20rx%3D%223%22%20ry%3D%225%22/%3E%3Ccircle%20class%3D%22art-dark%22%20cx%3D%22176%22%20cy%3D%2291%22%20r%3D%223%22/%3E%3Cpath%20class%3D%22art-line-dark%22%20d%3D%22M174%20105q8%207%2015%200%22/%3E%3Cpath%20class%3D%22art-line-dark%22%20d%3D%22M104%20143v12m49-12v12m-34-68h20%22/%3E%3Cellipse%20class%3D%22art-cream%22%20cx%3D%22120%22%20cy%3D%2289%22%20rx%3D%2210%22%20ry%3D%224%22/%3E%20%3Crect%20class%3D%22art-yellow%22%20x%3D%22205%22%20y%3D%22121%22%20width%3D%2266%22%20height%3D%2233%22%20rx%3D%227%22/%3E%3Cpath%20class%3D%22art-line-dark%22%20d%3D%22M205%20130h66%22/%3E%3Ccircle%20class%3D%22art-cream%22%20cx%3D%22238%22%20cy%3D%22137%22%20r%3D%228%22/%3E%3Ccircle%20class%3D%22art-yellow%22%20cx%3D%22245%22%20cy%3D%22105%22%20r%3D%2213%22/%3E%3Ccircle%20class%3D%22art-cream%22%20cx%3D%22265%22%20cy%3D%22112%22%20r%3D%2211%22/%3E%20%3C/g%3E%20%3C/svg%3E"
  },
  "地理": {
    "className": "topic-geography",
    "label": "地理 · 去旅行",
    "dataUri": "data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20viewBox%3D%220%200%20330%20190%22%3E%3Cstyle%3E.art-bg%7Bfill%3Argba%28255%2C255%2C255%2C0.72%29%3B%7D.art-white%7Bfill%3A%23fff9e8%3B%7D.art-cream%7Bfill%3A%23ffe3aa%3B%7D.art-dark%7Bfill%3A%23173252%3B%7D.art-blue%7Bfill%3A%2365d5e4%3B%7D.art-yellow%7Bfill%3A%23ffd15f%3B%7D.art-pink%7Bfill%3A%23ff9c91%3B%7D.art-green%7Bfill%3A%238bd59f%3B%7D.art-purple%7Bfill%3A%23bca8ff%3B%7D.art-line%7Bfill%3Anone%3Bstroke%3A%23245276%3Bstroke-width%3A3%3Bstroke-linecap%3Around%3Bstroke-linejoin%3Around%3B%7D.art-line-dark%7Bfill%3Anone%3Bstroke%3A%23173252%3Bstroke-width%3A3%3Bstroke-linecap%3Around%3Bstroke-linejoin%3Around%3B%7D.sound-ring%7Bfill%3Anone%3Bstroke%3Argba%2836%2C125%2C177%2C0.38%29%3Bstroke-width%3A2%3B%7D%3C/style%3E%20%3Ccircle%20class%3D%22art-bg%22%20cx%3D%22221%22%20cy%3D%2296%22%20r%3D%2288%22/%3E%3Ccircle%20class%3D%22sound-ring%22%20cx%3D%22207%22%20cy%3D%22105%22%20r%3D%2247%22/%3E%20%3Cpath%20class%3D%22art-line%22%20d%3D%22M59%2045v16m-8-8h16%22/%3E%3Cpath%20class%3D%22art-white%22%20d%3D%22M270%2057q13-14%2027%200%2015-4%2020%2010h-55q-3-10%208-10z%22/%3E%20%3Cg%20class%3D%22hero-main%22%3E%20%3Ccircle%20class%3D%22art-blue%22%20cx%3D%22145%22%20cy%3D%22100%22%20r%3D%2245%22/%3E%3Cpath%20class%3D%22art-green%22%20d%3D%22M106%2088q15-19%2029-4%2013%2014%2027%203%2012-10%2025%203l3%2018q-21%2017-39%2014-22-4-45%206z%22/%3E%3Cpath%20class%3D%22art-white%22%20d%3D%22m115%2093%2017-20%2015%2020%2012-13%2020%2024h-64z%22/%3E%20%3Ccircle%20class%3D%22art-cream%22%20cx%3D%22244%22%20cy%3D%22114%22%20r%3D%2227%22/%3E%3Cpath%20class%3D%22art-pink%22%20d%3D%22m244%2091%206%2017%2017%206-17%206-6%2018-6-18-17-6%2017-6z%22/%3E%3Cpath%20class%3D%22art-line%22%20d%3D%22M244%2087v-9m0%2063v9m-31-32h-9m71%200h9%22/%3E%20%3Cpath%20class%3D%22art-line%22%20d%3D%22M120%20157h110%22/%3E%20%3C/g%3E%20%3C/svg%3E"
  },
  "发明": {
    "className": "topic-invention",
    "label": "发明 · 好点子",
    "dataUri": "data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20viewBox%3D%220%200%20330%20190%22%3E%3Cstyle%3E.art-bg%7Bfill%3Argba%28255%2C255%2C255%2C0.72%29%3B%7D.art-white%7Bfill%3A%23fff9e8%3B%7D.art-cream%7Bfill%3A%23ffe3aa%3B%7D.art-dark%7Bfill%3A%23173252%3B%7D.art-blue%7Bfill%3A%2365d5e4%3B%7D.art-yellow%7Bfill%3A%23ffd15f%3B%7D.art-pink%7Bfill%3A%23ff9c91%3B%7D.art-green%7Bfill%3A%238bd59f%3B%7D.art-purple%7Bfill%3A%23bca8ff%3B%7D.art-line%7Bfill%3Anone%3Bstroke%3A%23245276%3Bstroke-width%3A3%3Bstroke-linecap%3Around%3Bstroke-linejoin%3Around%3B%7D.art-line-dark%7Bfill%3Anone%3Bstroke%3A%23173252%3Bstroke-width%3A3%3Bstroke-linecap%3Around%3Bstroke-linejoin%3Around%3B%7D.sound-ring%7Bfill%3Anone%3Bstroke%3Argba%2836%2C125%2C177%2C0.38%29%3Bstroke-width%3A2%3B%7D%3C/style%3E%20%3Ccircle%20class%3D%22art-bg%22%20cx%3D%22220%22%20cy%3D%2296%22%20r%3D%2288%22/%3E%3Ccircle%20class%3D%22sound-ring%22%20cx%3D%22207%22%20cy%3D%22106%22%20r%3D%2246%22/%3E%20%3Cpath%20class%3D%22art-line%22%20d%3D%22M59%2048v16m-8-8h16%22/%3E%3Cpath%20class%3D%22art-line%22%20d%3D%22M288%2050l4%209%209%204-9%204-4%209-4-9-9-4%209-4z%22/%3E%20%3Cg%20class%3D%22hero-main%22%3E%20%3Cpath%20class%3D%22art-yellow%22%20d%3D%22M135%2053c-31%200-48%2034-32%2059%207%2011%2018%2016%2019%2028h28c1-12%2013-17%2019-28%2016-25-1-59-34-59z%22/%3E%3Cpath%20class%3D%22art-line-dark%22%20d%3D%22M124%20142h26m-22%208h18%22/%3E%20%3Ccircle%20class%3D%22art-dark%22%20cx%3D%22125%22%20cy%3D%2288%22%20r%3D%224%22/%3E%3Ccircle%20class%3D%22art-dark%22%20cx%3D%22145%22%20cy%3D%2288%22%20r%3D%224%22/%3E%3Cpath%20class%3D%22art-line-dark%22%20d%3D%22M126%20102q9%209%2018%200%22/%3E%20%3Cpath%20class%3D%22art-line-dark%22%20d%3D%22M110%2080q-11-11-17-20m54%2018q12-12%2018-25%22/%3E%20%3Ccircle%20class%3D%22art-blue%22%20cx%3D%22226%22%20cy%3D%22126%22%20r%3D%2224%22/%3E%3Ccircle%20class%3D%22art-dark%22%20cx%3D%22226%22%20cy%3D%22126%22%20r%3D%229%22/%3E%3Cpath%20class%3D%22art-line%22%20d%3D%22M226%2091v12m0%2046v12m-35-35h12m46%200h12%22/%3E%20%3Cpath%20class%3D%22art-pink%22%20d%3D%22m281%2072%208%2025-14-8-8%2014-1-26z%22/%3E%3Cpath%20class%3D%22art-line%22%20d%3D%22M268%2063l-19%2029%22/%3E%20%3C/g%3E%20%3C/svg%3E"
  },
  "生物": {
    "className": "topic-biology",
    "label": "生物 · 生命圈",
    "dataUri": "data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20viewBox%3D%220%200%20330%20190%22%3E%3Cstyle%3E.art-bg%7Bfill%3Argba%28255%2C255%2C255%2C0.72%29%3B%7D.art-white%7Bfill%3A%23fff9e8%3B%7D.art-cream%7Bfill%3A%23ffe3aa%3B%7D.art-dark%7Bfill%3A%23173252%3B%7D.art-blue%7Bfill%3A%2365d5e4%3B%7D.art-yellow%7Bfill%3A%23ffd15f%3B%7D.art-pink%7Bfill%3A%23ff9c91%3B%7D.art-green%7Bfill%3A%238bd59f%3B%7D.art-purple%7Bfill%3A%23bca8ff%3B%7D.art-line%7Bfill%3Anone%3Bstroke%3A%23245276%3Bstroke-width%3A3%3Bstroke-linecap%3Around%3Bstroke-linejoin%3Around%3B%7D.art-line-dark%7Bfill%3Anone%3Bstroke%3A%23173252%3Bstroke-width%3A3%3Bstroke-linecap%3Around%3Bstroke-linejoin%3Around%3B%7D.sound-ring%7Bfill%3Anone%3Bstroke%3Argba%2836%2C125%2C177%2C0.38%29%3Bstroke-width%3A2%3B%7D%3C/style%3E%20%3Ccircle%20class%3D%22art-bg%22%20cx%3D%22223%22%20cy%3D%2296%22%20r%3D%2288%22/%3E%3Ccircle%20class%3D%22sound-ring%22%20cx%3D%22207%22%20cy%3D%22107%22%20r%3D%2246%22/%3E%20%3Cpath%20class%3D%22art-line%22%20d%3D%22M58%2052v16m-8-8h16%22/%3E%3Ccircle%20class%3D%22art-yellow%22%20cx%3D%22283%22%20cy%3D%2257%22%20r%3D%226%22/%3E%20%3Cg%20class%3D%22hero-main%22%3E%20%3Cpath%20class%3D%22art-blue%22%20d%3D%22M77%20113c18-30%2066-31%2091-6%2013-2%2028%204%2032%2015-13%204-24%203-34-2-20%2028-69%2024-89-7z%22/%3E%3Cpath%20class%3D%22art-line-dark%22%20d%3D%22M94%20119q9%207%2018%200m44-5q11%200%2017%206%22/%3E%3Ccircle%20class%3D%22art-dark%22%20cx%3D%2299%22%20cy%3D%22110%22%20r%3D%223%22/%3E%3Cpath%20class%3D%22art-white%22%20d%3D%22M78%20113%2058%2096l6%2027z%22/%3E%20%3Cpath%20class%3D%22art-line%22%20d%3D%22M211%2061c-26%2014-26%2030%200%2044s26%2030%200%2044m0-88c26%2014%2026%2030%200%2044s-26%2030%200%2044M197%2075h28m-28%2030h28m-28%2029h28%22/%3E%20%3Cpath%20class%3D%22art-green%22%20d%3D%22M258%20140c1-21%2015-35%2034-38-2%2020-12%2035-34%2038z%22/%3E%3Cpath%20class%3D%22art-line%22%20d%3D%22M259%20139%20286%20107%22/%3E%20%3C/g%3E%20%3C/svg%3E"
  },
  "大自然": {
    "className": "topic-nature",
    "label": "大自然 · 去看看",
    "dataUri": "data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20viewBox%3D%220%200%20330%20190%22%3E%3Cstyle%3E.art-bg%7Bfill%3Argba%28255%2C255%2C255%2C0.72%29%3B%7D.art-white%7Bfill%3A%23fff9e8%3B%7D.art-cream%7Bfill%3A%23ffe3aa%3B%7D.art-dark%7Bfill%3A%23173252%3B%7D.art-blue%7Bfill%3A%2365d5e4%3B%7D.art-yellow%7Bfill%3A%23ffd15f%3B%7D.art-pink%7Bfill%3A%23ff9c91%3B%7D.art-green%7Bfill%3A%238bd59f%3B%7D.art-purple%7Bfill%3A%23bca8ff%3B%7D.art-line%7Bfill%3Anone%3Bstroke%3A%23245276%3Bstroke-width%3A3%3Bstroke-linecap%3Around%3Bstroke-linejoin%3Around%3B%7D.art-line-dark%7Bfill%3Anone%3Bstroke%3A%23173252%3Bstroke-width%3A3%3Bstroke-linecap%3Around%3Bstroke-linejoin%3Around%3B%7D.sound-ring%7Bfill%3Anone%3Bstroke%3Argba%2836%2C125%2C177%2C0.38%29%3Bstroke-width%3A2%3B%7D%3C/style%3E%20%3Ccircle%20class%3D%22art-bg%22%20cx%3D%22220%22%20cy%3D%2297%22%20r%3D%2288%22/%3E%3Ccircle%20class%3D%22sound-ring%22%20cx%3D%22207%22%20cy%3D%22107%22%20r%3D%2246%22/%3E%20%3Cg%20class%3D%22hero-main%22%3E%20%3Ccircle%20class%3D%22art-yellow%22%20cx%3D%22101%22%20cy%3D%2262%22%20r%3D%2222%22/%3E%3Cpath%20d%3D%22M60%2096a53%2053%200%200%201%20106%200%22%20fill%3D%22none%22%20stroke%3D%22%23ff9c91%22%20stroke-width%3D%227%22/%3E%3Cpath%20d%3D%22M69%2096a44%2044%200%200%201%2088%200%22%20fill%3D%22none%22%20stroke%3D%22%23ffd15f%22%20stroke-width%3D%227%22/%3E%3Cpath%20d%3D%22M79%2096a34%2034%200%200%201%2068%200%22%20fill%3D%22none%22%20stroke%3D%22%238bd59f%22%20stroke-width%3D%227%22/%3E%20%3Cpath%20class%3D%22art-green%22%20d%3D%22M67%20153V111l23-33%2018%2033%2020-48%2028%2048v42z%22/%3E%3Cpath%20class%3D%22art-dark%22%20d%3D%22M88%20152v-29h14v29m31%200v-35h15v35z%22/%3E%20%3Cpath%20class%3D%22art-blue%22%20d%3D%22M211%2076q8%2013%200%2025m18-25q8%2013%200%2025m18-25q8%2013%200%2025%22/%3E%3Cpath%20class%3D%22art-line%22%20d%3D%22M208%2072v-12m20%2012V57m20%2015V60%22/%3E%20%3Cpath%20class%3D%22art-pink%22%20d%3D%22M277%20127q-13-18-25%200%2012%200%2025%200%2012-18%2025%200-13%2013-25%200z%22/%3E%3Ccircle%20class%3D%22art-yellow%22%20cx%3D%22277%22%20cy%3D%22127%22%20r%3D%224%22/%3E%3Cpath%20class%3D%22art-line%22%20d%3D%22M277%20131v17%22/%3E%20%3C/g%3E%3Cpath%20class%3D%22art-line%22%20d%3D%22M287%2096v14m-7-7h14%22/%3E%20%3C/svg%3E"
  },
  "简单政治": {
    "className": "topic-civics",
    "label": "社区 · 一起做",
    "dataUri": "data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20viewBox%3D%220%200%20330%20190%22%3E%3Cstyle%3E.art-bg%7Bfill%3Argba%28255%2C255%2C255%2C0.72%29%3B%7D.art-white%7Bfill%3A%23fff9e8%3B%7D.art-cream%7Bfill%3A%23ffe3aa%3B%7D.art-dark%7Bfill%3A%23173252%3B%7D.art-blue%7Bfill%3A%2365d5e4%3B%7D.art-yellow%7Bfill%3A%23ffd15f%3B%7D.art-pink%7Bfill%3A%23ff9c91%3B%7D.art-green%7Bfill%3A%238bd59f%3B%7D.art-purple%7Bfill%3A%23bca8ff%3B%7D.art-line%7Bfill%3Anone%3Bstroke%3A%23245276%3Bstroke-width%3A3%3Bstroke-linecap%3Around%3Bstroke-linejoin%3Around%3B%7D.art-line-dark%7Bfill%3Anone%3Bstroke%3A%23173252%3Bstroke-width%3A3%3Bstroke-linecap%3Around%3Bstroke-linejoin%3Around%3B%7D.sound-ring%7Bfill%3Anone%3Bstroke%3Argba%2836%2C125%2C177%2C0.38%29%3Bstroke-width%3A2%3B%7D%3C/style%3E%20%3Ccircle%20class%3D%22art-bg%22%20cx%3D%22223%22%20cy%3D%2296%22%20r%3D%2288%22/%3E%3Ccircle%20class%3D%22sound-ring%22%20cx%3D%22207%22%20cy%3D%22107%22%20r%3D%2246%22/%3E%20%3Cpath%20class%3D%22art-line%22%20d%3D%22M58%2051v16m-8-8h16%22/%3E%3Cpath%20class%3D%22art-white%22%20d%3D%22M275%2057q14-13%2027%200%2014-4%2018%2010h-54q-3-10%209-10z%22/%3E%20%3Cg%20class%3D%22hero-main%22%3E%20%3Cpath%20class%3D%22art-cream%22%20d%3D%22m104%2083%2042-29%2042%2029z%22/%3E%3Cpath%20class%3D%22art-white%22%20d%3D%22M112%2083h68v56h-68z%22/%3E%3Cpath%20class%3D%22art-blue%22%20d%3D%22M121%2094h12v30h-12zm23%200h12v30h-12zm23%200h12v30h-12z%22/%3E%3Cpath%20class%3D%22art-pink%22%20d%3D%22M105%20139h84v11h-84z%22/%3E%3Ccircle%20class%3D%22art-yellow%22%20cx%3D%22146%22%20cy%3D%2266%22%20r%3D%227%22/%3E%20%3Cpath%20class%3D%22art-line%22%20d%3D%22M72%20149q23-25%2045%200m-45%200h45m83%200q23-25%2046%200m-46%200h46%22/%3E%20%3Cpath%20class%3D%22art-blue%22%20d%3D%22M246%2066q24%204%2031%2024-22%203-35-12z%22/%3E%3Cpath%20class%3D%22art-white%22%20d%3D%22M244%2069q-9-15-22-4%2011%209%2025%209z%22/%3E%3Ccircle%20class%3D%22art-dark%22%20cx%3D%22247%22%20cy%3D%2272%22%20r%3D%222%22/%3E%20%3Cpath%20class%3D%22art-line%22%20d%3D%22M236%2092q15%2015%2031%201%22/%3E%20%3C/g%3E%20%3C/svg%3E"
  }
};

const BUNDLED_STORIES = [
  {
    "id": "daily-20261118-f4f11cce1d",
    "topic": "科学",
    "title": "灵晟继续登顶 Top500 榜单",
    "source": "Solidot 奇客科学",
    "url": "https://www.solidot.org/story?sid=85913",
    "date": "2026-11-18",
    "publishedDate": "2026-11-18",
    "lengthCategory": "short",
    "durationSec": 64,
    "script": "今天我们来聊一个既有趣又可以跟家人一起讨论的科学新发现。根据Solidot 奇客科学的最新分享，灵晟继续登顶 Top500 榜单。Top500 公布了 2026 年 11 月的最新超算榜单，深圳国家超算中心的灵晟第二次登顶。Top10 榜单完全没变：灵晟以 2.198 Exaflop/s 的 HPL 测试性能稳居第一，它是 Top500 榜单中首个仅靠 CPU 实现持续双精度浮点性能逾 2 Exaflops 的超算系统，灵晟使用了有 304 个核心的 LX2 CPU，总共 1379 万个核心，运行频率 1.55 GHz，操作系统是麒麟，功耗为 42.2 兆瓦。为什么这件事值得我们留意呢？因为它展示了科学领域里一个正在发生的具体变化，让我们看到科学家和研究者是如何一步步用真实数据解开谜题的。",
    "audio": {
      "female": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/female/daily-20261118-f4f11cce1d.mp3",
      "male": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/male/daily-20261118-f4f11cce1d.mp3"
    }
  },
  {
    "id": "daily-20261118-d8c274388b",
    "topic": "科学",
    "title": "富岳运行系统遭非法访问",
    "source": "Solidot 奇客科学",
    "url": "https://www.solidot.org/story?sid=85911",
    "date": "2026-11-18",
    "publishedDate": "2026-11-18",
    "lengthCategory": "medium",
    "durationSec": 104,
    "script": "如果把日常习以为常的现象放到放大镜下，你会发现一个好玩的科学问题。今天我们要深入聊聊来自Solidot 奇客科学的一篇特别报道：富岳运行系统遭非法访问。故事要从研究人员观察到的具体线索说起：日本理化学研究所超算富岳的运行系统遭到外部非法访问，用户信息可能已经外泄。除大学等研究机构外，产业界也可使用“富岳”。因遭到非法访问，理研已暂停富岳运行，据悉恢复时间未定。遭到非法访问的是用户申请使用“富岳”时需连接的系统。受害范围取决于用户登记了多少个人信息。目前正在调查非法访问发生的时间以及被发现的经过。把这条线索放到整个科学的大地图里来看，你会发现科学研究从来不是一蹴而就的。在得出结论之前，科研人员往往要先设计对照实验或者长期观测方案，把可能干扰结果的因素一个个排除掉，还要把测量数据公开出来，请世界各地的同行一起检验。对于我们十岁左右的小听众来说，理解这条新发现最好的办法，就是先抓住它最核心的那个变化：它到底解决了什么旧难题，或者推翻了哪一个过去的猜想？科学最迷人的地方，就是不把任何现象当成理所当然。下次在厨房、操场或雨后的路边看到奇怪的现象，不妨先提出一个猜想，再像科学家一样找证据验证它。",
    "audio": {
      "female": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/female/daily-20261118-d8c274388b.mp3",
      "male": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/male/daily-20261118-d8c274388b.mp3"
    }
  },
  {
    "id": "daily-20261117-4cb0de891c",
    "topic": "科学",
    "title": "物理学家通过控制单个原子的磁心来打破预期",
    "source": "ScienceDaily AI & Math",
    "url": "https://www.sciencedaily.com/releases/2026/11/261114202232.htm",
    "date": "2026-11-17",
    "publishedDate": "2026-11-17",
    "lengthCategory": "short",
    "durationSec": 65,
    "script": "今天我们来聊一个既有趣又可以跟家人一起讨论的科学新发现。最近，ScienceDaily AI & Math报道了一条关于“物理学家通过控制单个原子的磁心来打破预期”的新进展。具体是怎么回事呢？原来，科学家出人意料地发现了如何利用无线电波控制单个原子核内的磁自旋，推翻了之前关于原子行为的假设。尽管研究人员仍在试图了解其工作原理，但这一突破可能为更可靠的量子存储器铺平道路。看到这样的发现，研究团队并没有只停留在表面现象上，而是进一步追问背后的原理：这个现象需要满足什么样的条件？如果换一个环境，结果还会一样吗？科学最迷人的地方，就是不把任何现象当成理所当然。下次在厨房、操场或雨后的路边看到奇怪的现象，不妨先提出一个猜想，再像科学家一样找证据验证它。",
    "audio": {
      "female": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/female/daily-20261117-4cb0de891c.mp3",
      "male": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/male/daily-20261117-4cb0de891c.mp3"
    }
  },
  {
    "id": "daily-20261117-11f1db7123",
    "topic": "科学",
    "title": "帕塔索原住民抗议巴西巴伊亚州一名女副酋长被捕",
    "source": "Mongabay Wildlife",
    "url": "https://news.mongabay.com/short-article/2026/11/pataxo-indigenous-people-protest-the-arrest-of-a-female-vice-chief-in-brazils-bahia/",
    "date": "2026-11-17",
    "publishedDate": "2026-11-17",
    "lengthCategory": "medium",
    "durationSec": 72,
    "script": "今天我们来聊一个既有趣又可以跟家人一起讨论的科学新发现。最近，Mongabay Wildlife报道了一条关于“帕塔索原住民抗议巴西巴伊亚州一名女副酋长被捕”的新进展。具体是怎么回事呢？原来，11 月 12 日，帕塔索原住民占领了巴西巴伊亚州最南部尤纳波利斯市民警局的入口。这是一场和平抗议，抗议两名帕塔索原住民领导人在巴拉维尔哈原住民领地被捕。埃里尔莎·布拉兹·多斯桑托斯（Erilsa Braz dos Santos），又名乌鲁巴·帕塔索（Uruba Pataxó），副局长。看到这样的发现，研究团队并没有只停留在表面现象上，而是进一步追问背后的原理：这个现象需要满足什么样的条件？如果换一个环境，结果还会一样吗？科学最迷人的地方，就是不把任何现象当成理所当然。下次在厨房、操场或雨后的路边看到奇怪的现象，不妨先提出一个猜想，再像科学家一样找证据验证它。",
    "audio": {
      "female": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/female/daily-20261117-11f1db7123.mp3",
      "male": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/male/daily-20261117-11f1db7123.mp3"
    }
  },
  {
    "id": "daily-20261116-e5868d198c",
    "topic": "科学",
    "title": "这些实验增进了我们对火山海啸的了解",
    "source": "Phys.org Earth",
    "url": "https://phys.org/news/2026-11-volcanic-tsunamis.html",
    "date": "2026-11-16",
    "publishedDate": "2026-11-16",
    "lengthCategory": "medium",
    "durationSec": 72,
    "script": "今天我们来聊一个既有趣又可以跟家人一起讨论的科学新发现。最近，Phys.org Earth报道了一条关于“这些实验增进了我们对火山海啸的了解”的新进展。具体是怎么回事呢？原来，人们对火山爆发引发的海啸知之甚少，因为控制落石和火山灰与海水相互作用产生波浪的动力学非常复杂。因此，很难预测火山流是否会引发海啸，如果会引发海啸，其规模有多大。研究人员利用实验室实验来研究这一过程，但人们对这些模型模拟现实的程度知之甚少。看到这样的发现，研究团队并没有只停留在表面现象上，而是进一步追问背后的原理：这个现象需要满足什么样的条件？如果换一个环境，结果还会一样吗？你看，无论是大实验还是小观察，只要多问一句“为什么会这样”，平平无奇的生活角落也会变成你的科学实验室。今天听到的小原理，晚上吃饭时可以考考爸爸妈妈哦！",
    "audio": {
      "female": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/female/daily-20261116-e5868d198c.mp3",
      "male": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/male/daily-20261116-e5868d198c.mp3"
    }
  },
  {
    "id": "daily-20261116-3b08b117bc",
    "topic": "科学",
    "title": "研究发现，维生素 C 有助于阻止胃中与癌症相关的化学物质",
    "source": "ScienceDaily All",
    "url": "https://www.sciencedaily.com/releases/2026/11/261114202236.htm",
    "date": "2026-11-16",
    "publishedDate": "2026-11-16",
    "lengthCategory": "short",
    "durationSec": 49,
    "script": "今天我们来聊一个既有趣又可以跟家人一起讨论的科学新发现。根据ScienceDaily All的最新分享，研究发现，维生素 C 有助于阻止胃中与癌症相关的化学物质。科学家发现，维生素 C 可能有助于防止食用含有硝酸盐和亚硝酸盐的食物后胃中形成潜在的致癌化学物质。一项新的数学模型表明，饭后服用维生素 C 可以减少这些有害反应，为降低癌症风险提供了一种可能的新策略。为什么这件事值得我们留意呢？因为它展示了科学领域里一个正在发生的具体变化，让我们看到科学家和研究者是如何一步步用真实数据解开谜题的。",
    "audio": {
      "female": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/female/daily-20261116-3b08b117bc.mp3",
      "male": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/male/daily-20261116-3b08b117bc.mp3"
    }
  },
  {
    "id": "daily-20261115-19a58c5b16",
    "topic": "科学",
    "title": "旅行者 1 号距离地球的距离达到一光日",
    "source": "Solidot 奇客科学",
    "url": "https://www.solidot.org/story?sid=85883",
    "date": "2026-11-15",
    "publishedDate": "2026-11-15",
    "lengthCategory": "medium",
    "durationSec": 89,
    "script": "如果把日常习以为常的现象放到放大镜下，你会发现一个好玩的科学问题。最近，Solidot 奇客科学报道了一条关于“旅行者 1 号距离地球的距离达到一光日”的新进展。具体是怎么回事呢？原来，北京时间 11 月 18 日 18 时 16 分 07 秒，旅行者 1 号与地球的距离将达到约 259 亿公里，相当于光在真空中传播 24 小时的距离，也就是“一光日”。如果将一光年划分为 365 个刻度，每格代表一个光日，那么 1977 年 9 月 5 日启程的旅行者 1 号，经过近半个世纪的飞行，终于抵达了第一格。今年 10 月，旅行者 1 号曾经历一场短暂的通信中断。NASA JPL 称，18 日和 19 日，NASA 深空网络连续两次未能收到探测器预期发出的信号。看到这样的发现，研究团队并没有只停留在表面现象上，而是进一步追问背后的原理：这个现象需要满足什么样的条件？如果换一个环境，结果还会一样吗？你看，无论是大实验还是小观察，只要多问一句“为什么会这样”，平平无奇的生活角落也会变成你的科学实验室。今天听到的小原理，晚上吃饭时可以考考爸爸妈妈哦！",
    "audio": {
      "female": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/female/daily-20261115-19a58c5b16.mp3",
      "male": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/male/daily-20261115-19a58c5b16.mp3"
    }
  },
  {
    "id": "daily-20261115-0ad4832045",
    "topic": "科学",
    "title": "香港迪士尼乐园 1.7 万张电子门票被盗",
    "source": "Solidot 奇客科学",
    "url": "https://www.solidot.org/story?sid=85891",
    "date": "2026-11-15",
    "publishedDate": "2026-11-15",
    "lengthCategory": "short",
    "durationSec": 45,
    "script": "如果把日常习以为常的现象放到放大镜下，你会发现一个好玩的科学问题。根据Solidot 奇客科学的最新分享，香港迪士尼乐园 1.7 万张电子门票被盗。香港迪士尼乐园约 1.7 万张电子门票在票务系统中被盗，园方已报警并暂停网上售票及酒店预订服务。官网声明，旅客需要购票，欢迎到合作旅行社及平台或正门入口售票处。为什么这件事值得我们留意呢？因为它展示了科学领域里一个正在发生的具体变化，让我们看到科学家和研究者是如何一步步用真实数据解开谜题的。",
    "audio": {
      "female": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/female/daily-20261115-0ad4832045.mp3",
      "male": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/male/daily-20261115-0ad4832045.mp3"
    }
  },
  {
    "id": "daily-20261118-59f28fd2c5",
    "topic": "航天",
    "title": "会留下多少二氧化碳？新研究估计了欧盟排放交易体系下的长期残余排放量",
    "source": "Phys.org Earth",
    "url": "https://phys.org/news/2026-11-stay-term-residual-emissions-eu.html",
    "date": "2026-11-18",
    "publishedDate": "2026-11-18",
    "lengthCategory": "medium",
    "durationSec": 76,
    "script": "来自航天发射场与空间站的新消息，带我们看看人类是如何一步步走向太空的。最近，Phys.org Earth报道了一条关于“会留下多少二氧化碳？新研究估计了欧盟排放交易体系下的长期残余排放量”的新进展。具体是怎么回事呢？原来，当前欧盟排放交易体系 (EU-ETS1) 涵盖的二氧化碳排放量到 2040 年可能会大幅减少。碳市场观察委托 Oeko-Institut 进行的一项新研究考察了 2040 年和 2050 年可能保持的排放水平。到 2040 年，EU-ETS1 涵盖的设施（包括垃圾焚烧）仍可能排放 159 至 2.31 亿吨二氧化碳。看到这样的发现，研究团队并没有只停留在表面现象上，而是进一步追问背后的原理：这个现象需要满足什么样的条件？如果换一个环境，结果还会一样吗？每一次航天任务的突破，都是把不可能变成可能的过程。也许十几年后，正在听广播的你也能参与设计飞向深空的下一代探测器！",
    "audio": {
      "female": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/female/daily-20261118-59f28fd2c5.mp3",
      "male": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/male/daily-20261118-59f28fd2c5.mp3"
    }
  },
  {
    "id": "daily-20261117-5aff358b7a",
    "topic": "航天",
    "title": "发射预览：阿丽亚娜 6 号将发射亚马逊卫星，猎鹰 9 号将发射政府任务",
    "source": "Spaceflight News · NASASpaceflight",
    "url": "https://www.nasaspaceflight.com/2026/11/launch-preview-111626/",
    "date": "2026-11-17",
    "publishedDate": "2026-11-17",
    "lengthCategory": "short",
    "durationSec": 55,
    "script": "每一次火箭点火和探测器飞行背后，都藏着航天工程师的巧妙构思。最近，Spaceflight News · NASASpaceflight报道了一条关于“发射预览：阿丽亚娜 6 号将发射亚马逊卫星，猎鹰 9 号将发射政府任务”的新进展。具体是怎么回事呢？原来，经过一周繁忙的发布活动，全球发布清单即将公布……com.。看到这样的发现，研究团队并没有只停留在表面现象上，而是进一步追问背后的原理：这个现象需要满足什么样的条件？如果换一个环境，结果还会一样吗？在太空探索中，没有任何一个细节是小事。从一颗螺丝钉到几万行导航代码，正是无数工程师的严谨配合，才让人类能够飞向月球与更远的星辰。",
    "audio": {
      "female": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/female/daily-20261117-5aff358b7a.mp3",
      "male": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/male/daily-20261117-5aff358b7a.mp3"
    }
  },
  {
    "id": "daily-20261116-49eaf882bd",
    "topic": "航天",
    "title": "SpaceX 成功回收火箭上面级",
    "source": "Solidot 奇客科学",
    "url": "https://www.solidot.org/story?sid=85893",
    "date": "2026-11-16",
    "publishedDate": "2026-11-16",
    "lengthCategory": "short",
    "durationSec": 52,
    "script": "每一次火箭点火和探测器飞行背后，都藏着航天工程师的巧妙构思。根据Solidot 奇客科学的最新分享，SpaceX 成功回收火箭上面级。SpaceX 再次创造了历史，首次成功回收 Starship 火箭的上面级，此前它已经成功回收了 Starship 的推进器。此次代号为 Flight 15/Starlink Group 31-2 的任务原计划同时回收火箭上面级和推进器，但推进器 Booster 22 在发射后不久启动了终止程序，在海面上受控爆炸。为什么这件事值得我们留意呢？因为它展示了航天领域里一个正在发生的具体变化，让我们看到科学家和研究者是如何一步步用真实数据解开谜题的。",
    "audio": {
      "female": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/female/daily-20261116-49eaf882bd.mp3",
      "male": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/male/daily-20261116-49eaf882bd.mp3"
    }
  },
  {
    "id": "daily-20261115-94798e78f1",
    "topic": "航天",
    "title": "天问四号将尝试登陆木卫四",
    "source": "Solidot 奇客科学",
    "url": "https://www.solidot.org/story?sid=85887",
    "date": "2026-11-15",
    "publishedDate": "2026-11-15",
    "lengthCategory": "medium",
    "durationSec": 72,
    "script": "每一次火箭点火和探测器飞行背后，都藏着航天工程师的巧妙构思。最近，Solidot 奇客科学报道了一条关于“天问四号将尝试登陆木卫四”的新进展。具体是怎么回事呢？原来，11 月 13 日，探月与航天工程中心发布通知，天问四号有效载荷研制方案开展征集。天问四号任务将执行环绕木星、环绕木卫四、着陆木卫四三大任务。木卫四或 Callisto 是太阳系第三大卫星，也是木星第二大卫星，仅次于木卫三。木卫四的直径为水星直径的 99%，但是质量只有它的三分之一。看到这样的发现，研究团队并没有只停留在表面现象上，而是进一步追问背后的原理：这个现象需要满足什么样的条件？如果换一个环境，结果还会一样吗？每一次航天任务的突破，都是把不可能变成可能的过程。也许十几年后，正在听广播的你也能参与设计飞向深空的下一代探测器！",
    "audio": {
      "female": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/female/daily-20261115-94798e78f1.mp3",
      "male": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/male/daily-20261115-94798e78f1.mp3"
    }
  },
  {
    "id": "daily-20261114-59087c8e17",
    "topic": "航天",
    "title": "科学史上的今天（1969年）：阿波罗12号从肯尼迪航天中心发射升空，后来成…",
    "source": "维基百科 · 科学史上的今天",
    "url": "https://en.wikipedia.org/wiki/Apollo_12",
    "date": "2026-11-14",
    "publishedDate": "2026-11-14",
    "lengthCategory": "short",
    "durationSec": 53,
    "script": "抬头望向星空，人类派出的航天器正在轨道和深空里执行新的任务。根据维基百科 · 科学史上的今天的最新分享，科学史上的今天（1969年）：阿波罗12号从肯尼迪航天中心发射升空，后来成…。阿波罗12号是美国阿波罗计划中的第六次载人飞行，也是第二次登陆月球。它于 1969 年 11 月 14 日由美国宇航局从佛罗里达州肯尼迪航天中心发射升空，并于 1969 年 11 月 19 日登陆月球上被称为风暴洋的部分。为什么这件事值得我们留意呢？因为它展示了航天领域里一个正在发生的具体变化，让我们看到科学家和研究者是如何一步步用真实数据解开谜题的。",
    "audio": {
      "female": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/female/daily-20261114-59087c8e17.mp3",
      "male": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/male/daily-20261114-59087c8e17.mp3"
    }
  },
  {
    "id": "daily-20261114-57e5c13ef1",
    "topic": "航天",
    "title": "星舰IFT-15已在轨道上——返回地球时会被“捕获”吗？",
    "source": "Spaceflight News · SpacePolicyOnline.com",
    "url": "https://spacepolicyonline.com/news/starship-ift-15-is-in-orbit-will-it-be-caught-when-it-returns-to-earth/",
    "date": "2026-11-14",
    "publishedDate": "2026-11-14",
    "lengthCategory": "short",
    "durationSec": 46,
    "script": "来自航天发射场与空间站的新消息，带我们看看人类是如何一步步走向太空的。根据Spaceflight News · SpacePolicyOnline.com的最新分享，星舰IFT-15已在轨道上——返回地球时会被“捕获”吗？。SpaceX 今晚早些时候从德克萨斯州 Starbase 发射了第 15 次星舰综合飞行测试（IFT-15）。计划将第一级助推器带回发射塔进行“捕获”。为什么这件事值得我们留意呢？因为它展示了航天领域里一个正在发生的具体变化，让我们看到科学家和研究者是如何一步步用真实数据解开谜题的。",
    "audio": {
      "female": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/female/daily-20261114-57e5c13ef1.mp3",
      "male": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/male/daily-20261114-57e5c13ef1.mp3"
    }
  },
  {
    "id": "daily-20261114-7eafd996c8",
    "topic": "航天",
    "title": "现场报道：星舰 15 号航班尝试在双发射台捕获中回收整个飞行器",
    "source": "Spaceflight News · Spaceflight Now",
    "url": "https://spaceflightnow.com/2026/11/13/live-coverage-starship-flight-15-attempts-to-recover-full-vehicle-in-double-launch-pad-catch/",
    "date": "2026-11-14",
    "publishedDate": "2026-11-14",
    "lengthCategory": "short",
    "durationSec": 66,
    "script": "抬头望向星空，人类派出的航天器正在轨道和深空里执行新的任务。最近，Spaceflight News · Spaceflight Now报道了一条关于“现场报道：星舰 15 号航班尝试在双发射台捕获中回收整个飞行器”的新进展。具体是怎么回事呢？原来，综合星舰飞行器计划在下午 4:45 开放的 75 分钟发射窗口内从德克萨斯州的 Starbase 升空。11 月 13 日星期五（美国中部标准时间）（美国东部时间下午 5:45 / 世界标准时间 2245）。看到这样的发现，研究团队并没有只停留在表面现象上，而是进一步追问背后的原理：这个现象需要满足什么样的条件？如果换一个环境，结果还会一样吗？每一次航天任务的突破，都是把不可能变成可能的过程。也许十几年后，正在听广播的你也能参与设计飞向深空的下一代探测器！",
    "audio": {
      "female": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/female/daily-20261114-7eafd996c8.mp3",
      "male": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/male/daily-20261114-7eafd996c8.mp3"
    }
  },
  {
    "id": "curio-20261103-aero-01",
    "topic": "航天",
    "title": "为什么火箭发射台下面要喷出几百吨大水？不是为了降温那么简单！",
    "source": "NASA Kennedy Space Center",
    "url": "https://www.nasa.gov/kennedy/",
    "date": "2026-11-03",
    "publishedDate": "2026-11-03",
    "lengthCategory": "short",
    "durationSec": 55,
    "script": "看火箭发射直播时，在倒计时最后几秒，发射台底部总会涌出瀑布一样的大水，瞬间激起巨大的白色水雾。很多人以为这只是为了防止火焰把发射台烧坏，其实它更重要的任务是“消音”！重型火箭发动机点火时，喷出的超音速气流会产生高达一百八十多贝的巨大声波。这么强的声波如果撞在水泥地面再反弹回来，剧烈的震动足以把火箭顶部的精密卫星和火箭外壳直接震碎！发射台在短短几十秒内喷出上千吨水，水幕和密集的水珠能把凶猛的声波能量吸收掉，转化为水蒸气的热量，让噪音降低好几倍。所以发射时看到的漫天白雾，大部分不是浓烟，而是保护火箭安全的巨大水蒸气云！",
    "audio": {
      "female": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/female/curio-20261103-aero-01.mp3",
      "male": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/male/curio-20261103-aero-01.mp3"
    }
  },
  {
    "id": "daily-20261118-49c56cb191",
    "topic": "太空",
    "title": "美国宇航局数据完成了首次恒星合并",
    "source": "Spaceflight News · NASA",
    "url": "https://science.nasa.gov/missions/webb/nasa-data-clinches-first-of-its-kind-stellar-merger/",
    "date": "2026-11-18",
    "publishedDate": "2026-11-18",
    "lengthCategory": "medium",
    "durationSec": 71,
    "script": "今天我们的太空望远镜对准了宇宙深处，去看看那里的星辰与行星。最近，Spaceflight News · NASA报道了一条关于“美国宇航局数据完成了首次恒星合并”的新进展。具体是怎么回事呢？原来，研究人员最近发现了同类中的第一个：一颗质量比太阳稍小的恒星螺旋进入并与我们邻近的仙女座星系外围的一颗蓬松的超巨星合并。他们给这位新单曲、有潜力“返老还童”的明星起了个绰号“包”。他们由美国宇航局资助的发现随后得到了美国宇航局詹姆斯·韦伯快速观察的支持。看到这样的发现，研究团队并没有只停留在表面现象上，而是进一步追问背后的原理：这个现象需要满足什么样的条件？如果换一个环境，结果还会一样吗？宇宙浩瀚无垠，人类目前读懂的还只是万里星空中的小小一页。保持对夜空的好奇，每次抬头看星星时，你也在和天文学家一起眺望宇宙的历史。",
    "audio": {
      "female": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/female/daily-20261118-49c56cb191.mp3",
      "male": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/male/daily-20261118-49c56cb191.mp3"
    }
  },
  {
    "id": "daily-20261117-52b415c3a5",
    "topic": "太空",
    "title": "一幅拼贴画，展示了 NASA 好奇号火星车打出的 49 个钻孔",
    "source": "NASA Earth Observatory",
    "url": "https://science.nasa.gov/photojournal/a-collage-showing-49-drill-holes-made-by-nasas-curiosity-mars-rover/",
    "date": "2026-11-17",
    "publishedDate": "2026-11-17",
    "lengthCategory": "short",
    "durationSec": 51,
    "script": "今天我们的太空望远镜对准了宇宙深处，去看看那里的星辰与行星。根据NASA Earth Observatory的最新分享，一幅拼贴画，展示了 NASA 好奇号火星车打出的 49 个钻孔。描述 这幅拼贴画展示了美国宇航局好奇号火星探测器截至 2026 年 11 月捕获的 49 个钻孔。每个孔代表从火星表面岩石收集的样本；好奇号的钻头位于其机械臂的末端，将粉碎的岩石样本放入其腹部的仪器中，分析其成分。为什么这件事值得我们留意呢？因为它展示了太空领域里一个正在发生的具体变化，让我们看到科学家和研究者是如何一步步用真实数据解开谜题的。",
    "audio": {
      "female": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/female/daily-20261117-52b415c3a5.mp3",
      "male": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/male/daily-20261117-52b415c3a5.mp3"
    }
  },
  {
    "id": "daily-20261116-e3d27973e9",
    "topic": "太空",
    "title": "如何在黎明前的天空中发现十一月的行星巡游",
    "source": "BBC Science & Environment",
    "url": "https://www.bbc.co.uk/weather/articles/cke8rr37lrryo?at_medium=RSS&at_campaign=rss",
    "date": "2026-11-16",
    "publishedDate": "2026-11-16",
    "lengthCategory": "short",
    "durationSec": 36,
    "script": "今天我们的太空望远镜对准了宇宙深处，去看看那里的星辰与行星。根据BBC Science & Environment的最新分享，如何在黎明前的天空中发现十一月的行星巡游。水星、金星、火星和木星的行星将在整个十一月黎明前的天空中对齐。为什么这件事值得我们留意呢？因为它展示了太空领域里一个正在发生的具体变化，让我们看到科学家和研究者是如何一步步用真实数据解开谜题的。",
    "audio": {
      "female": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/female/daily-20261116-e3d27973e9.mp3",
      "male": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/male/daily-20261116-e3d27973e9.mp3"
    }
  },
  {
    "id": "daily-20261114-a02ce43f3c",
    "topic": "太空",
    "title": "科学史上的今天（1680年）：德国天文学家戈特弗里德·基希发现了1680年…",
    "source": "维基百科 · 科学史上的今天",
    "url": "https://en.wikipedia.org/wiki/Gottfried_Kirch",
    "date": "2026-11-14",
    "publishedDate": "2026-11-14",
    "lengthCategory": "medium",
    "durationSec": 83,
    "script": "用空间望远镜看向浩瀚宇宙，远方的星球远比科幻故事还要奇妙。今天我们要深入聊聊来自维基百科 · 科学史上的今天的一篇特别报道：科学史上的今天（1680年）：德国天文学家戈特弗里德·基希发现了1680年…。故事要从研究人员观察到的具体线索说起：戈特弗里德·基希 (Gottfried Kirch) 是一位德国天文学家，也是柏林第一位“皇家天文学家”，也是新生的柏林天文台的台长。把这条线索放到整个太空的大地图里来看，你会发现科学研究从来不是一蹴而就的。在得出结论之前，科研人员往往要先设计对照实验或者长期观测方案，把可能干扰结果的因素一个个排除掉，还要把测量数据公开出来，请世界各地的同行一起检验。对于我们十岁左右的小听众来说，理解这条新发现最好的办法，就是先抓住它最核心的那个变化：它到底解决了什么旧难题，或者推翻了哪一个过去的猜想？从太阳系的行星风暴到遥远星系的脉冲信号，每一束穿越太空来到地球的光，都在告诉我们地球家园是多么独特而珍贵。",
    "audio": {
      "female": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/female/daily-20261114-a02ce43f3c.mp3",
      "male": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/male/daily-20261114-a02ce43f3c.mp3"
    }
  },
  {
    "id": "daily-20261114-1cbd2bca9b",
    "topic": "太空",
    "title": "大质量恒星的爆发",
    "source": "Spaceflight News · NASA",
    "url": "https://www.nasa.gov/image-article/outbursts-from-a-massive-star/",
    "date": "2026-11-14",
    "publishedDate": "2026-11-14",
    "lengthCategory": "short",
    "durationSec": 50,
    "script": "今天我们的太空望远镜对准了宇宙深处，去看看那里的星辰与行星。根据Spaceflight News · NASA的最新分享，大质量恒星的爆发。利用 NASA 的钱德拉 X 射线天文台，天文学家发现了触发银河系中一颗巨大不稳定恒星反复爆发的原因，如这张 2026 年 11 月 9 日发布的图像所示。这颗名为 AT 2016blu 的不稳定恒星位于螺旋星系 NGC 4559 中，距离地球约 3000 万光年。为什么这件事值得我们留意呢？因为它展示了太空领域里一个正在发生的具体变化，让我们看到科学家和研究者是如何一步步用真实数据解开谜题的。",
    "audio": {
      "female": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/female/daily-20261114-1cbd2bca9b.mp3",
      "male": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/male/daily-20261114-1cbd2bca9b.mp3"
    }
  },
  {
    "id": "daily-20261113-03c2d7073a",
    "topic": "太空",
    "title": "APOD：2026 年 11 月 13 日 – NGC 206 和仙女座星云",
    "source": "Spaceflight News · NASA",
    "url": "https://science.nasa.gov/image-article/apod-2026-november-13-ngc-206-and-the-star-clouds-of-andromeda/",
    "date": "2026-11-13",
    "publishedDate": "2026-11-13",
    "lengthCategory": "medium",
    "durationSec": 97,
    "script": "今天我们的太空望远镜对准了宇宙深处，去看看那里的星辰与行星。今天我们要深入聊聊来自Spaceflight News · NASA的一篇特别报道：APOD：2026 年 11 月 13 日 – NGC 206 和仙女座星云。故事要从研究人员观察到的具体线索说起：APOD 科学 APOD APOD：2026 年 11 月 13 日 – NGC… 今天的 APOD 存档提交索引 搜索日历 RSS 教育 关于 讨论 APOD 天文学 每日图片 探索宇宙。每天都会展示我们迷人的宇宙的不同图像或照片，以及由专业天文学家撰写的简短说明。把这条线索放到整个太空的大地图里来看，你会发现科学研究从来不是一蹴而就的。在得出结论之前，科研人员往往要先设计对照实验或者长期观测方案，把可能干扰结果的因素一个个排除掉，还要把测量数据公开出来，请世界各地的同行一起检验。对于我们十岁左右的小听众来说，理解这条新发现最好的办法，就是先抓住它最核心的那个变化：它到底解决了什么旧难题，或者推翻了哪一个过去的猜想？宇宙浩瀚无垠，人类目前读懂的还只是万里星空中的小小一页。保持对夜空的好奇，每次抬头看星星时，你也在和天文学家一起眺望宇宙的历史。",
    "audio": {
      "female": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/female/daily-20261113-03c2d7073a.mp3",
      "male": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/male/daily-20261113-03c2d7073a.mp3"
    }
  },
  {
    "id": "curio-20261103-spc-01",
    "topic": "太空",
    "title": "木星上的“大红斑”风暴，为什么刮了三百多年还没停？",
    "source": "NASA Juno Mission",
    "url": "https://science.nasa.gov/mission/juno/",
    "date": "2026-11-03",
    "publishedDate": "2026-11-03",
    "lengthCategory": "short",
    "durationSec": 52,
    "script": "在地球上，再厉害的台风登陆陆地之后，过不了几天就会因为摩擦和缺少水汽而慢慢消散。可是太阳系最大的行星——木星上，有一个椭圆形的“大红斑”风暴，从天文学家用望远镜发现它算起，已经连续狂刮了至少三百五十年！这个大红斑到底有多大呢？它的宽度超过一万六千公里，把整个地球塞进去都绰绰有余，边缘风速高达每小时六百多公里。它为什么停不下来？因为木星是一颗气态巨行星，根本没有高山、陆地来摩擦减速；而且木星自转极快，不到十个小时就转一圈，强大的南北急流把大红斑夹在中间，像滚珠轴承一样源源不断地推动它旋转。",
    "audio": {
      "female": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/female/curio-20261103-spc-01.mp3",
      "male": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/male/curio-20261103-spc-01.mp3"
    }
  },
  {
    "id": "curio-20261103-spc-02",
    "topic": "太空",
    "title": "流浪行星：不围绕任何太阳旋转、在银河系黑夜里独自旅行的星球",
    "source": "James Webb Space Telescope",
    "url": "https://webb.nasa.gov/",
    "date": "2026-11-03",
    "publishedDate": "2026-11-03",
    "lengthCategory": "short",
    "durationSec": 49,
    "script": "我们从小就知道，地球和太阳系其他七大行星都乖乖地围绕太阳转圈。但天文学家利用韦布空间望远镜和微引力透镜技术观测银河系时，却发现了一群神秘的“流浪行星”。它们不围绕任何恒星公转，没有白天和黑夜的交替，而是孤零零地在漆黑的星际空间里穿行。它们是怎么来的呢？有些是在年轻恒星系诞生初期，几颗大行星互相引力拉扯，结果较小的一颗像弹弓一样被甩出了家园；还有些是气体云直接坍缩形成的小星球。虽然没有阳光照耀，但有些巨大的流浪行星内部依然有地热，冰层下甚至可能藏着温暖的暗黑海洋！",
    "audio": {
      "female": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/female/curio-20261103-spc-02.mp3",
      "male": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/male/curio-20261103-spc-02.mp3"
    }
  },
  {
    "id": "daily-20261118-12121f5f5b",
    "topic": "AI",
    "title": "加州理工数学教授不再根据作业打分，因为作业很容易用 AI 完成",
    "source": "Solidot 奇客科学",
    "url": "https://www.solidot.org/story?sid=85914",
    "date": "2026-11-18",
    "publishedDate": "2026-11-18",
    "lengthCategory": "medium",
    "durationSec": 83,
    "script": "人工智能不仅能聊天和画画，科学家正教它学习解决真正的科学难题。最近，Solidot 奇客科学报道了一条关于“加州理工数学教授不再根据作业打分，因为作业很容易用 AI 完成”的新进展。具体是怎么回事呢？原来，加州理工教授 Yi Ni 教的是学校每一位学生都必须修的数学必修课，他仍然采用传统的授课方法，没有用笔记本电脑和投影仪，而是在黑板上写满粉笔字。在加州理工任教 17 年的 Ni 教授表示不再根据作业题目做的是否正确打分，因为学生可以使用 AI 完成作业。他现在只根据作业是否完成打分。他说，如今教育的一大问题是所有大学数学作业都可以用 AI 完成。看到这样的发现，研究团队并没有只停留在表面现象上，而是进一步追问背后的原理：这个现象需要满足什么样的条件？如果换一个环境，结果还会一样吗？人工智能是人类造出的强大助手，但它依然需要人类的好奇心、判断力和责任感来引导。学会提出好问题、核实真证据，才是未来最重要的本领。",
    "audio": {
      "female": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/female/daily-20261118-12121f5f5b.mp3",
      "male": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/male/daily-20261118-12121f5f5b.mp3"
    }
  },
  {
    "id": "daily-20261118-aff601c73a",
    "topic": "AI",
    "title": "FBI 警告黑客利用 Artex 能在三小时内入侵网络",
    "source": "Solidot 奇客科学",
    "url": "https://www.solidot.org/story?sid=85910",
    "date": "2026-11-18",
    "publishedDate": "2026-11-18",
    "lengthCategory": "short",
    "durationSec": 51,
    "script": "人工智能不仅能聊天和画画，科学家正教它学习解决真正的科学难题。根据Solidot 奇客科学的最新分享，FBI 警告黑客利用 Artex 能在三小时内入侵网络。FBI 发出警告，黑客正在利用名为 Artex 的 AI 驱动渗透测试工具，在部分情况下不到三个小时即可成功入侵网络。该工具已被发现与针对韩国金融机构、至少 2250 家 ConnectWise 客户以及 Barracuda 公司的攻击事件有关。为什么这件事值得我们留意呢？因为它展示了AI领域里一个正在发生的具体变化，让我们看到科学家和研究者是如何一步步用真实数据解开谜题的。",
    "audio": {
      "female": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/female/daily-20261118-aff601c73a.mp3",
      "male": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/male/daily-20261118-aff601c73a.mp3"
    }
  },
  {
    "id": "daily-20261117-69d0b38e86",
    "topic": "AI",
    "title": "具有高维量子神经元的量子神经网络",
    "source": "TechXplore AI",
    "url": "https://techxplore.com/news/2026-11-quantum-neural-networks-high-dimensional.html",
    "date": "2026-11-17",
    "publishedDate": "2026-11-17",
    "lengthCategory": "medium",
    "durationSec": 87,
    "script": "人工智能不仅能聊天和画画，科学家正教它学习解决真正的科学难题。今天我们要深入聊聊来自TechXplore AI的一篇特别报道：具有高维量子神经元的量子神经网络。故事要从研究人员观察到的具体线索说起：我们如何扩大量子神经网络的规模。一种方法是添加更多量子位作为神经元。但发表在《国家科学评论》上的一项题为“在 Qudit 处理器上配备反向传播的量子神经网络”的研究展示了另一种方法。把这条线索放到整个AI的大地图里来看，你会发现科学研究从来不是一蹴而就的。在得出结论之前，科研人员往往要先设计对照实验或者长期观测方案，把可能干扰结果的因素一个个排除掉，还要把测量数据公开出来，请世界各地的同行一起检验。对于我们十岁左右的小听众来说，理解这条新发现最好的办法，就是先抓住它最核心的那个变化：它到底解决了什么旧难题，或者推翻了哪一个过去的猜想？当AI帮科学家处理海量数据时，人类就能腾出更多精力去思考更有创造力的问题。善用工具、独立思考，你也能和AI一起探索未知世界。",
    "audio": {
      "female": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/female/daily-20261117-69d0b38e86.mp3",
      "male": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/male/daily-20261117-69d0b38e86.mp3"
    }
  },
  {
    "id": "daily-20261117-c230b1683e",
    "topic": "AI",
    "title": "部分因为 AI Overviews Reddit 年访问量下滑 13%",
    "source": "Solidot 奇客科学",
    "url": "https://www.solidot.org/story?sid=85899",
    "date": "2026-11-17",
    "publishedDate": "2026-11-17",
    "lengthCategory": "medium",
    "durationSec": 84,
    "script": "今天我们来看看人工智能实验室里刚刚发生的一件新鲜事。最近，Solidot 奇客科学报道了一条关于“部分因为 AI Overviews Reddit 年访问量下滑 13%”的新进展。具体是怎么回事呢？原来，根据分析公司 Similarweb 的数据，2025 年 10 月至 2026 年 10 月期间，Reddit 的全球访问量下滑了 13%。来自 Google 搜索的流量减少，促使 Reddit 准备强制要求所有访客必须登录。2024 年 Reddit 与 Google 达成协议授权其使用平台内容用于 AI 训练，当时受益于 Google 的 Reddit 搜索流量处于激增阶段。根据 Similarweb 的数据，2023 年 5 月至 2024 年 5 月期间 Reddit 的流量增长了 39%。看到这样的发现，研究团队并没有只停留在表面现象上，而是进一步追问背后的原理：这个现象需要满足什么样的条件？如果换一个环境，结果还会一样吗？人工智能是人类造出的强大助手，但它依然需要人类的好奇心、判断力和责任感来引导。学会提出好问题、核实真证据，才是未来最重要的本领。",
    "audio": {
      "female": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/female/daily-20261117-c230b1683e.mp3",
      "male": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/male/daily-20261117-c230b1683e.mp3"
    }
  },
  {
    "id": "daily-20261116-fdc1534d33",
    "topic": "AI",
    "title": "当人工智能模型被告知他们正在被监视时，他们可能会做出不同的回答",
    "source": "TechXplore AI",
    "url": "https://techxplore.com/news/2026-11-ai-differently-told.html",
    "date": "2026-11-16",
    "publishedDate": "2026-11-16",
    "lengthCategory": "short",
    "durationSec": 49,
    "script": "人工智能不仅能聊天和画画，科学家正教它学习解决真正的科学难题。根据TechXplore AI的最新分享，当人工智能模型被告知他们正在被监视时，他们可能会做出不同的回答。大语言模型 (LLM) 是支撑 ChatGPT、Gemini 和其他类似平台功能的人工智能系统，现已在全球范围内广泛使用。虽然这些模型提供的响应在许多情况下都很有用，但它们也可能在特定条件下发生变化。为什么这件事值得我们留意呢？因为它展示了AI领域里一个正在发生的具体变化，让我们看到科学家和研究者是如何一步步用真实数据解开谜题的。",
    "audio": {
      "female": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/female/daily-20261116-fdc1534d33.mp3",
      "male": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/male/daily-20261116-fdc1534d33.mp3"
    }
  },
  {
    "id": "daily-20261116-8ddde146c3",
    "topic": "AI",
    "title": "唇读人工智能通过首先识别大多数特定单词来填补句子中的空白",
    "source": "TechXplore AI",
    "url": "https://techxplore.com/news/2026-11-lip-ai-gaps-sentences-words.html",
    "date": "2026-11-16",
    "publishedDate": "2026-11-16",
    "lengthCategory": "short",
    "durationSec": 51,
    "script": "当计算机拥有了向海量数据学习的本领，它会怎样帮人类观察世界呢？根据TechXplore AI的最新分享，唇读人工智能通过首先识别大多数特定单词来填补句子中的空白。仅通过嘴唇运动来理解语音是很困难的，尤其是在嘈杂的环境中。韩国科学技术院 (KAIST) 的一个研究团队开发了一种人工智能技术，该技术首先识别它可以高度自信地识别的单词，然后利用周围的上下文来解决句子中模棱两可的部分。为什么这件事值得我们留意呢？因为它展示了AI领域里一个正在发生的具体变化，让我们看到科学家和研究者是如何一步步用真实数据解开谜题的。",
    "audio": {
      "female": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/female/daily-20261116-8ddde146c3.mp3",
      "male": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/male/daily-20261116-8ddde146c3.mp3"
    }
  },
  {
    "id": "daily-20261115-57574c2352",
    "topic": "AI",
    "title": "微软云服务全球宕机",
    "source": "Solidot 奇客科学",
    "url": "https://www.solidot.org/story?sid=85875",
    "date": "2026-11-15",
    "publishedDate": "2026-11-15",
    "lengthCategory": "medium",
    "durationSec": 73,
    "script": "人工智能不仅能聊天和画画，科学家正教它学习解决真正的科学难题。最近，Solidot 奇客科学报道了一条关于“微软云服务全球宕机”的新进展。具体是怎么回事呢？原来，微软云服务全球宕机，受影响服务包括了 Outlook、Teams 和 OneDrive 等办公工具以及 AI 工具 Copilot。微软通过其社交媒体账号表示正全力解决该问题。根据 Downdetector 的报告，截至周四 18:00 GMT，全球报告的 Outlook 故障数量接近 14 万。目前无迹象表明此次大范围宕机是由网络攻击引起的。看到这样的发现，研究团队并没有只停留在表面现象上，而是进一步追问背后的原理：这个现象需要满足什么样的条件？如果换一个环境，结果还会一样吗？当AI帮科学家处理海量数据时，人类就能腾出更多精力去思考更有创造力的问题。善用工具、独立思考，你也能和AI一起探索未知世界。",
    "audio": {
      "female": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/female/daily-20261115-57574c2352.mp3",
      "male": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/male/daily-20261115-57574c2352.mp3"
    }
  },
  {
    "id": "daily-20261115-cb1288c4fe",
    "topic": "AI",
    "title": "盲人眼镜里的AI导航员：怎样用声音把眼前的马路和绘本讲给视障朋友听？",
    "source": "IEEE Spectrum 无障碍科技",
    "url": "https://spectrum.ieee.org/ai-accessibility-glasses",
    "date": "2026-11-15",
    "publishedDate": "2026-11-15",
    "lengthCategory": "short",
    "durationSec": 53,
    "script": "走在热闹的街道上，红绿灯变了、前面停着一辆自行车、或者菜单上写着今日特价，我们用眼睛看一眼就知道了。但对于视障朋友来说，这些日常小事却需要很多帮助。现在，工程师把微型摄像头和轻量化人工智能模型装进了一副普通重量的眼镜框里。当佩戴者走在路上或拿起一本书时，眼镜上的摄像头拍下画面，内置的视觉语言模型在零点几秒内就能通过骨传导耳机轻声告诉他：“前方三米右侧有台阶”或者直接把书页上的文字朗读出来。因为采用骨传导技术，声音通过颧骨传进内耳，不会堵住耳朵，视障朋友依然能清晰听见周围汽车和行人的声音，安全又温暖。",
    "audio": {
      "female": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/female/daily-20261115-cb1288c4fe.mp3",
      "male": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/male/daily-20261115-cb1288c4fe.mp3"
    }
  },
  {
    "id": "daily-20261118-ce0abca3bd",
    "topic": "科技",
    "title": "科学家利用维生素 B12 创造出一种非凡的新型可充电电池",
    "source": "ScienceDaily Matter & Energy",
    "url": "https://www.sciencedaily.com/releases/2026/11/261117033909.htm",
    "date": "2026-11-18",
    "publishedDate": "2026-11-18",
    "lengthCategory": "medium",
    "durationSec": 93,
    "script": "在我们的城市、海洋与天空背后，许多看不见的硬核科技正在安静运转。今天我们要深入聊聊来自ScienceDaily Matter & Energy的一篇特别报道：科学家利用维生素 B12 创造出一种非凡的新型可充电电池。故事要从研究人员观察到的具体线索说起：科学家们发现了维生素 B12 的一个令人惊讶的新用途，即开发一种可充电电池，利用这种必需营养素来帮助发电和储存电力。该原型机可承受高达 250 次充电周期，为更安全、更便宜、更环保的锂离子电池替代品打开了大门。把这条线索放到整个科技的大地图里来看，你会发现科学研究从来不是一蹴而就的。在得出结论之前，科研人员往往要先设计对照实验或者长期观测方案，把可能干扰结果的因素一个个排除掉，还要把测量数据公开出来，请世界各地的同行一起检验。对于我们十岁左右的小听众来说，理解这条新发现最好的办法，就是先抓住它最核心的那个变化：它到底解决了什么旧难题，或者推翻了哪一个过去的猜想？每一项大国工程和日常科技背后，都凝结着物理、材料和数学的智慧。留心观察身边的桥梁、列车和屏幕，你会发现科学就在脚下。",
    "audio": {
      "female": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/female/daily-20261118-ce0abca3bd.mp3",
      "male": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/male/daily-20261118-ce0abca3bd.mp3"
    }
  },
  {
    "id": "daily-20261118-7caf86df74",
    "topic": "科技",
    "title": "折纸和太阳能电池阵列",
    "source": "Spaceflight News · SpaceNews",
    "url": "https://spacenews.com/origami-and-solar-arrays/",
    "date": "2026-11-18",
    "publishedDate": "2026-11-18",
    "lengthCategory": "short",
    "durationSec": 40,
    "script": "今天的科技故事，带大家拆开现代工程里的一个巧妙设计。根据Spaceflight News · SpaceNews的最新分享，折纸和太阳能电池阵列。在这一集中的 SpaceMinds 中，SpaceNews 的 Mike Gruss 在欧洲航天科技博览会上与 Dcubed 首席执行官 Thomas Sinn 进行了交谈。他们讨论了公司新一轮 3000 万美元的融资，。为什么这件事值得我们留意呢？因为它展示了科技领域里一个正在发生的具体变化，让我们看到科学家和研究者是如何一步步用真实数据解开谜题的。",
    "audio": {
      "female": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/female/daily-20261118-7caf86df74.mp3",
      "male": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/male/daily-20261118-7caf86df74.mp3"
    }
  },
  {
    "id": "daily-20261117-2e0c5cae5b",
    "topic": "科技",
    "title": "利用微生物将生物质转化为可再生燃料和化学品",
    "source": "Phys.org Biology",
    "url": "https://phys.org/news/2026-11-biomass-renewable-fuels-chemicals-microorganisms.html",
    "date": "2026-11-17",
    "publishedDate": "2026-11-17",
    "lengthCategory": "short",
    "durationSec": 63,
    "script": "在我们的城市、海洋与天空背后，许多看不见的硬核科技正在安静运转。最近，Phys.org Biology报道了一条关于“利用微生物将生物质转化为可再生燃料和化学品”的新进展。具体是怎么回事呢？原来，德克萨斯农工大学的研究人员开发了一种将生物质转化为可再生燃料和化学品的工艺。Artie McFerrin 化学工程系教授 Mark Holtzapple 博士的目标是通过使用微生物分解植物材料来提高这些产品的生产效率和成本。看到这样的发现，研究团队并没有只停留在表面现象上，而是进一步追问背后的原理：这个现象需要满足什么样的条件？如果换一个环境，结果还会一样吗？真正优秀的科技，不一定要看起来炫酷复杂，而是能稳稳当当地解决问题，让人们的生活更安全、更环保、更方便。",
    "audio": {
      "female": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/female/daily-20261117-2e0c5cae5b.mp3",
      "male": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/male/daily-20261117-2e0c5cae5b.mp3"
    }
  },
  {
    "id": "daily-20261117-afd4e721f2",
    "topic": "科技",
    "title": "为什么太阳能研究人员正在努力设计白银减排手册",
    "source": "TechXplore Engineering",
    "url": "https://techxplore.com/news/2026-11-solar-silver-reduction-playbook.html",
    "date": "2026-11-17",
    "publishedDate": "2026-11-17",
    "lengthCategory": "short",
    "durationSec": 52,
    "script": "在我们的城市、海洋与天空背后，许多看不见的硬核科技正在安静运转。最近，TechXplore Engineering报道了一条关于“为什么太阳能研究人员正在努力设计白银减排手册”的新进展。具体是怎么回事呢？原来，太阳能可能已成为世界上最便宜的可再生电力来源之一，但日益昂贵的贵金属正在给该行业带来挑战。看到这样的发现，研究团队并没有只停留在表面现象上，而是进一步追问背后的原理：这个现象需要满足什么样的条件？如果换一个环境，结果还会一样吗？真正优秀的科技，不一定要看起来炫酷复杂，而是能稳稳当当地解决问题，让人们的生活更安全、更环保、更方便。",
    "audio": {
      "female": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/female/daily-20261117-afd4e721f2.mp3",
      "male": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/male/daily-20261117-afd4e721f2.mp3"
    }
  },
  {
    "id": "daily-20261116-5d04dde750",
    "topic": "科技",
    "title": "物理学家使用激光来解锁晶体隐藏的电力",
    "source": "ScienceDaily AI & Math",
    "url": "https://www.sciencedaily.com/releases/2026/11/261112230500.htm",
    "date": "2026-11-16",
    "publishedDate": "2026-11-16",
    "lengthCategory": "short",
    "durationSec": 64,
    "script": "在我们的城市、海洋与天空背后，许多看不见的硬核科技正在安静运转。最近，ScienceDaily AI & Math报道了一条关于“物理学家使用激光来解锁晶体隐藏的电力”的新进展。具体是怎么回事呢？原来，科学家们发现了如何使用激光闪光来组织晶体内的微小电子区域，解决了数十年来有关材料行为的谜团。激光诱导对准仅持续万亿分之一秒，但这一突破可能为处理和存储信息的新方法打开大门。看到这样的发现，研究团队并没有只停留在表面现象上，而是进一步追问背后的原理：这个现象需要满足什么样的条件？如果换一个环境，结果还会一样吗？每一项大国工程和日常科技背后，都凝结着物理、材料和数学的智慧。留心观察身边的桥梁、列车和屏幕，你会发现科学就在脚下。",
    "audio": {
      "female": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/female/daily-20261116-5d04dde750.mp3",
      "male": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/male/daily-20261116-5d04dde750.mp3"
    }
  },
  {
    "id": "daily-20261116-e15cdaf632",
    "topic": "科技",
    "title": "在这台量子计算机内，内存像吉他弦一样振动",
    "source": "ScienceDaily AI & Math",
    "url": "https://www.sciencedaily.com/releases/2026/11/261109205416.htm",
    "date": "2026-11-16",
    "publishedDate": "2026-11-16",
    "lengthCategory": "short",
    "durationSec": 47,
    "script": "一项好的工程与科技，能把实验室里的物理原理变成守护生活的超级工具。根据ScienceDaily AI & Math的最新分享，在这台量子计算机内，内存像吉他弦一样振动。研究人员创造了一种量子计算机，可以在微观振动中存储信息，这有可能使量子计算机更小、更强大、更能保存信息。这一突破成功地展示了先进的量子计算，并有助于克服实际量子计算的主要障碍。为什么这件事值得我们留意呢？因为它展示了科技领域里一个正在发生的具体变化，让我们看到科学家和研究者是如何一步步用真实数据解开谜题的。",
    "audio": {
      "female": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/female/daily-20261116-e15cdaf632.mp3",
      "male": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/male/daily-20261116-e15cdaf632.mp3"
    }
  },
  {
    "id": "daily-20261115-22aacbb4f4",
    "topic": "科技",
    "title": "非洲加速发展太阳能",
    "source": "Solidot 奇客科学",
    "url": "https://www.solidot.org/story?sid=85882",
    "date": "2026-11-15",
    "publishedDate": "2026-11-15",
    "lengthCategory": "medium",
    "durationSec": 76,
    "script": "一项好的工程与科技，能把实验室里的物理原理变成守护生活的超级工具。最近，Solidot 奇客科学报道了一条关于“非洲加速发展太阳能”的新进展。具体是怎么回事呢？原来，在津巴布韦首都哈拉雷（Harare）的一个工业区，如果想要寻找一个新的发电项目，你需要抬起头。Limpopo Way Power 太阳能发电站没有传统的独立厂区，而是将一排排太阳能电池板铺在两座仓库的屋顶上，它通过协议向工厂供电。在非洲和亚洲的很多地区，太阳能革命随处可见。能源智库 Ember 的报告预测，2026 年非洲太阳能新增装机量有望达到 17 GW，同比增长 45%。看到这样的发现，研究团队并没有只停留在表面现象上，而是进一步追问背后的原理：这个现象需要满足什么样的条件？如果换一个环境，结果还会一样吗？真正优秀的科技，不一定要看起来炫酷复杂，而是能稳稳当当地解决问题，让人们的生活更安全、更环保、更方便。",
    "audio": {
      "female": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/female/daily-20261115-22aacbb4f4.mp3",
      "male": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/male/daily-20261115-22aacbb4f4.mp3"
    }
  },
  {
    "id": "daily-20261115-dc80cb7f24",
    "topic": "科技",
    "title": "用喝剩的咖啡渣提炼清洁燃料、用钻石里的微小瑕疵造量子传感器！材料实验室的新魔法",
    "source": "ScienceDaily 材料与能源",
    "url": "https://www.sciencedaily.com/coffee-waste-quantum-diamond",
    "date": "2026-11-15",
    "publishedDate": "2026-11-15",
    "lengthCategory": "short",
    "durationSec": 46,
    "script": "在材料科学家的眼里，没有什么是真正的“废品”或“瑕疵”。最近两项新突破就展示了这种变废为宝的科技魔法！第一项研究里，化学工程师发现全世界每天倒掉的数百万吨咖啡渣富含油脂和有机碳，通过低温催化转化技术，可以把废弃咖啡渣高效变成生物柴油和储能超级电容器的碳材料；第二项研究里，物理学家专门在人造钻石晶体里寻找一种“氮-空位中心”的原子级小瑕疵——正是这个微小的缺陷，对磁场和温度变化极其敏感，能做成在常温下工作的超精密量子传感器，用来探测单个细胞的微弱磁场！",
    "audio": {
      "female": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/female/daily-20261115-dc80cb7f24.mp3",
      "male": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/male/daily-20261115-dc80cb7f24.mp3"
    }
  },
  {
    "id": "daily-20261118-370bb2e933",
    "topic": "金融",
    "title": "把零花钱分成“三个透明玻璃罐”：全世界小朋友都在学的聪明预算管理法",
    "source": "儿童财商实验室",
    "url": "https://www.federalreserveeducation.org/three-jars",
    "date": "2026-11-18",
    "publishedDate": "2026-11-18",
    "lengthCategory": "short",
    "durationSec": 46,
    "script": "过年收到了压岁钱，或者平时攒下了零花钱，怎样管理才既能买到心爱的礼物，又不会不知不觉花光呢？儿童经济学家推荐了一个简单好用的“三只透明玻璃罐法则”：准备三个贴上标签的罐子，分别叫“日常小愿望罐”、“长期大目标罐”和“分享爱心罐”。每次拿到十块钱零花钱，可以把五块钱放进长期大目标罐，攒起来买心仪已久的显微镜或天文望远镜；四块钱放进日常罐，买贴纸或笔记本；最后一块钱放进分享罐，用来给家人准备生日贺卡或参与公益捐助。看得见的计划，会让每一分钱都变得更有意义！",
    "audio": {
      "female": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/female/daily-20261118-370bb2e933.mp3",
      "male": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/male/daily-20261118-370bb2e933.mp3"
    }
  },
  {
    "id": "daily-20261117-c718faf160",
    "topic": "金融",
    "title": "科学史上的今天（1989年）：华特迪士尼影业在影院上映了《小美人鱼》，开启…",
    "source": "维基百科 · 科学史上的今天",
    "url": "https://en.wikipedia.org/wiki/Walt_Disney_Pictures",
    "date": "2026-11-17",
    "publishedDate": "2026-11-17",
    "lengthCategory": "medium",
    "durationSec": 115,
    "script": "买东西、存零花钱、管理资源，日常生活里的每个选择其实都藏着经济学智慧。今天我们要深入聊聊来自维基百科 · 科学史上的今天的一篇特别报道：科学史上的今天（1989年）：华特迪士尼影业在影院上映了《小美人鱼》，开启…。故事要从研究人员观察到的具体线索说起：华特迪士尼影业是一家美国电影制作公司，是华特迪士尼工作室的一个部门，而华特迪士尼工作室是华特迪士尼公司旗下迪士尼娱乐部门的一个部门。该工作室成立于 1923 年 10 月 16 日，是华特迪士尼影城旗下真人故事片的旗舰制作商，总部位于加利福尼亚州伯班克的华特迪士尼影城。Animated films produced by Walt Disney Animation Studios and Pixar Animation Studios are also released under the studio banner. Walt Disney Studios Motion Pictures distributes and markets the films produced by Walt Disney Pictures.。把这条线索放到整个金融的大地图里来看，你会发现科学研究从来不是一蹴而就的。在得出结论之前，科研人员往往要先设计对照实验或者长期观测方案，把可能干扰结果的因素一个个排除掉，还要把测量数据公开出来，请世界各地的同行一起检验。对于我们十岁左右的小听众来说，理解这条新发现最好的办法，就是先抓住它最核心的那个变化：它到底解决了什么旧难题，或者推翻了哪一个过去的猜想？无论是古代的纸币还是现代的消费选择，守信用、看长远、不盲目跟风，都是跨越几百年依然管用的生活智慧。",
    "audio": {
      "female": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/female/daily-20261117-c718faf160.mp3",
      "male": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/male/daily-20261117-c718faf160.mp3"
    }
  },
  {
    "id": "daily-20261117-f170088113",
    "topic": "金融",
    "title": "古代丝绸之路上的骆驼商队，隔着几千公里不带现金怎么付钱？飞钱与汇票的发明",
    "source": "中国金融博物馆 / 丝路历史",
    "url": "http://www.cnm.com.cn/feiqian-history",
    "date": "2026-11-17",
    "publishedDate": "2026-11-17",
    "lengthCategory": "medium",
    "durationSec": 120,
    "script": "在一千两百多年前的唐朝，长安城的市场上热闹非凡，来自中亚、波斯和江南的商人每天都在买卖丝绸、茶叶、瓷器和香料。当时的商人们遇到了一个头疼的大难题：唐朝通用的货币是铜钱，一串“一贯钱”有一千枚铜钱，足足有六斤多重！假如一位江西茶商把一整船茶叶运到长安城卖掉，赚了一万贯铜钱，总重量高达六万斤！如果他要把这笔钱运回江西老家，不仅要雇几十辆马车和船只，路上翻山越水还可能遇到山洪或强盗，运费甚至比茶叶利润还要高。怎样才能不搬运一粒铜钱，就把巨款安全送回千里之外的老家呢？唐朝人发明了一种极其聪明的金融工具——“飞钱”，意思是“会飞的钱”！具体怎么操作呢？江西各地的官府或大商号在首都长安设有办事处，叫做“进奏院”。茶商在长安卖完茶叶后，直接把沉甸甸的铜钱交给江西驻长安的办事处；办事处收下钱，开给他一张特制的凭证纸条，把纸条从中间一撕为二，茶商拿右半张，办事处把左半张通过快马驿站寄回江西老家。茶商自己只需把薄薄的半张纸条贴身藏在衣服里，轻松骑马回江西。到家后，把两半纸条放在一起核对字迹、印章和撕口，只要严丝合缝，当地库房立刻把一万贯铜钱如数付给他！与此同时，长安办事处收下的那笔铜钱，正好可以直接留在京城缴纳地方税款或者采购北方货物，两边都不需要来回拉铜钱了。唐朝的“飞钱”，就是全世界最早的异地汇票，用一张对账凭证代替了千万斤金属的奔波。",
    "audio": {
      "female": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/female/daily-20261117-f170088113.mp3",
      "male": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/male/daily-20261117-f170088113.mp3"
    }
  },
  {
    "id": "daily-20261116-548258716d",
    "topic": "金融",
    "title": "95 岁的洪水受害者一直住在 Wetherspoons，直到她的房屋被毁后…",
    "source": "BBC Science & Environment",
    "url": "https://www.bbc.co.uk/news/articles/cqe8r8ngjepjo?at_medium=RSS&at_campaign=rss",
    "date": "2026-11-16",
    "publishedDate": "2026-11-16",
    "lengthCategory": "short",
    "durationSec": 57,
    "script": "买东西、存零花钱、管理资源，日常生活里的每个选择其实都藏着经济学智慧。最近，BBC Science & Environment报道了一条关于“95 岁的洪水受害者一直住在 Wetherspoons，直到她的房屋被毁后…”的新进展。具体是怎么回事呢？原来，吉恩·鲍威尔一直问她什么时候可以回到她的公寓，蒙诺河决堤时，她的公寓被洪水淹没了。看到这样的发现，研究团队并没有只停留在表面现象上，而是进一步追问背后的原理：这个现象需要满足什么样的条件？如果换一个环境，结果还会一样吗？懂得金融和经济知识，不是为了数钱，而是为了明白每一份劳动、每一份信任和每一次选择背后的价值，做自己时间和零花钱的聪明小主人。",
    "audio": {
      "female": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/female/daily-20261116-548258716d.mp3",
      "male": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/male/daily-20261116-548258716d.mp3"
    }
  },
  {
    "id": "daily-20261116-0c963e0377",
    "topic": "金融",
    "title": "为什么电影院门口的爆米花卖得比超市贵好几倍？看懂商家有趣的“差别定价”",
    "source": "Planet Money / 儿童生活经济学",
    "url": "https://www.economist.com/kids-pricing-popcorn",
    "date": "2026-11-16",
    "publishedDate": "2026-11-16",
    "lengthCategory": "short",
    "durationSec": 48,
    "script": "去电影院看动画电影时，你有没有好奇过：明明只是一桶用玉米粒爆出来的爆米花，成本只要几块钱，为什么在电影院柜台却卖二三十元呢？经济学家研究后发现，这其实是电影院巧妙的“分工定价法”！电影院把电影票的价格定得相对便宜，是为了吸引尽可能多的观众走进电影院，而且电影票收入的一大半要分给拍电影的制作公司。进场之后，特别想边看边吃香脆爆米花的观众，愿意为这份快乐多付钱；而只想安静看电影的观众，则只花便宜的门票钱就能入场。靠爆米花补贴影厅租金，反而让每个人的电影票变得更便宜了！",
    "audio": {
      "female": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/female/daily-20261116-0c963e0377.mp3",
      "male": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/male/daily-20261116-0c963e0377.mp3"
    }
  },
  {
    "id": "daily-20261115-6b4509b2ff",
    "topic": "金融",
    "title": "台积电内部员工数据泄露",
    "source": "Solidot 奇客科学",
    "url": "https://www.solidot.org/story?sid=85881",
    "date": "2026-11-15",
    "publishedDate": "2026-11-15",
    "lengthCategory": "long",
    "durationSec": 126,
    "script": "用经济学家的眼光看生活，你会发现数字和价格背后有一套好玩的逻辑。今天我们要深入聊聊来自Solidot 奇客科学的一篇特别报道：台积电内部员工数据泄露。故事要从研究人员观察到的具体线索说起：台积电在递交到 SEC 的一份声明中称，部分现任及前任员工的个人数据在未经授权的情况下出现在了一个外网上。相关信息与存储在某云服务提供商系统服务中的数据相吻合。台积电表示，目前尚未发现其自身系统遭到入侵的证据，且这些数据与其业务运营或客户信息无关。公司正通知受影响的员工，与该云服务商、相关调查机构以及一家外部网络安全公司合作，以查明事件真相。据报道，黑客在 DarkForums、BreachForums 等地下论坛上拍卖 6.9GB 容量的台积电员工数据，起标价为 3 BTC。黑客提供的样本显示数据涵盖员工姓名、生日、职称、住址、身分证字号、手机号码、银行帐户等资讯，甚至还有紧急连络人电话。把这条线索放到整个金融的大地图里来看，你会发现科学研究从来不是一蹴而就的。在得出结论之前，科研人员往往要先设计对照实验或者长期观测方案，把可能干扰结果的因素一个个排除掉，还要把测量数据公开出来，请世界各地的同行一起检验。对于我们十岁左右的小听众来说，理解这条新发现最好的办法，就是先抓住它最核心的那个变化：它到底解决了什么旧难题，或者推翻了哪一个过去的猜想？无论是古代的纸币还是现代的消费选择，守信用、看长远、不盲目跟风，都是跨越几百年依然管用的生活智慧。",
    "audio": {
      "female": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/female/daily-20261115-6b4509b2ff.mp3",
      "male": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/male/daily-20261115-6b4509b2ff.mp3"
    }
  },
  {
    "id": "daily-20261115-524e4952a4",
    "topic": "金融",
    "title": "美国扣押了从币安盗走的逾 12 亿美元加密货币",
    "source": "Solidot 奇客科学",
    "url": "https://www.solidot.org/story?sid=85876",
    "date": "2026-11-15",
    "publishedDate": "2026-11-15",
    "lengthCategory": "short",
    "durationSec": 41,
    "script": "用经济学家的眼光看生活，你会发现数字和价格背后有一套好玩的逻辑。根据Solidot 奇客科学的最新分享，美国扣押了从币安盗走的逾 12 亿美元加密货币。FBI 周四宣布扣押了价值逾 12 亿美元的加密货币。这些加密货币是黑客组织 TraderTraitor 此前从全球最大加密货币交易所币安盗走的。为什么这件事值得我们留意呢？因为它展示了金融领域里一个正在发生的具体变化，让我们看到科学家和研究者是如何一步步用真实数据解开谜题的。",
    "audio": {
      "female": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/female/daily-20261115-524e4952a4.mp3",
      "male": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/male/daily-20261115-524e4952a4.mp3"
    }
  },
  {
    "id": "daily-20261114-b98d223643",
    "topic": "金融",
    "title": "纸币边缘为什么不印满图案，而且硬币侧面要刻满一道道小竖纹？防伪与历史巧思",
    "source": "趣味经济学 / 货币历史",
    "url": "https://www.usmint.gov/learn/kids/coin-reeding",
    "date": "2026-11-14",
    "publishedDate": "2026-11-14",
    "lengthCategory": "medium",
    "durationSec": 80,
    "script": "如果你从口袋里拿出一枚一元或五角的硬币，用手指摸一摸硬币最外圈的侧面边缘，会摸到一圈整整齐齐、密密麻麻的小竖纹，行话叫做“滚边齿”。为什么造币厂要费劲在薄薄的硬币边上刻几百道小齿呢？这可不是为了好看，而是三百多年前大物理学家牛顿当英国皇家造币厂厂长时推广的一项防伪绝招！原来在几百年前，硬币是用真正的纯金和纯银打造的。有些不老实的人拿到金币或银币后，会偷偷用小锉刀把硬币光滑的边缘刮下一小圈金粉或银屑，再把变轻了一点点的硬币花出去，这叫做“剪边盗银”。牛顿接手造币厂后，全面采用机器压印技术，并在每一枚硬币的边缘轧上一圈均匀的细齿。这样一来，只要有人敢刮掉一点点边缘，齿纹就会立刻消失，大家一眼就能看出来！虽然今天的硬币早就改用镍合金与钢芯制造，不再用真金白银了，但这圈小竖纹依然保留了下来，既能防止伪造，又能帮助视障朋友通过触摸边缘齿纹的疏密，轻松分辨出不同面额的硬币！",
    "audio": {
      "female": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/female/daily-20261114-b98d223643.mp3",
      "male": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/male/daily-20261114-b98d223643.mp3"
    }
  },
  {
    "id": "daily-20261118-bb697c9704",
    "topic": "地理",
    "title": "塞拉雪季开始了",
    "source": "NASA Earth Observatory",
    "url": "https://science.nasa.gov/earth/earth-observatory/sierra-snow-season-spins-up/",
    "date": "2026-11-18",
    "publishedDate": "2026-11-18",
    "lengthCategory": "medium",
    "durationSec": 75,
    "script": "今天我们跟着地理学家的脚步，去探索地球上一个奇特的角落。今天我们要深入聊聊来自NASA Earth Observatory的一篇特别报道：塞拉雪季开始了。故事要从研究人员观察到的具体线索说起：2026 年 11 月中旬，一场大范围的早季暴风雪将加利福尼亚的山脉覆盖为白色。把这条线索放到整个地理的大地图里来看，你会发现科学研究从来不是一蹴而就的。在得出结论之前，科研人员往往要先设计对照实验或者长期观测方案，把可能干扰结果的因素一个个排除掉，还要把测量数据公开出来，请世界各地的同行一起检验。对于我们十岁左右的小听众来说，理解这条新发现最好的办法，就是先抓住它最核心的那个变化：它到底解决了什么旧难题，或者推翻了哪一个过去的猜想？地球不是一块块孤立拼图的堆砌，沙漠的风、大洋的流、高山的雪都在互相影响。读懂了地理，你手里的地图就会变成一部立体的地球百科全书。",
    "audio": {
      "female": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/female/daily-20261118-bb697c9704.mp3",
      "male": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/male/daily-20261118-bb697c9704.mp3"
    }
  },
  {
    "id": "daily-20261118-dda1d187ca",
    "topic": "地理",
    "title": "印度尼西亚可能需要 350 年才能恢复 2026 年山火烧毁的土地",
    "source": "Phys.org Earth",
    "url": "https://phys.org/news/2026-11-indonesia-years-recover-wildfires.html",
    "date": "2026-11-18",
    "publishedDate": "2026-11-18",
    "lengthCategory": "short",
    "durationSec": 58,
    "script": "地图上的每一条海岸线、每一座雪山，都有一段跨越百万年的地理传奇。最近，Phys.org Earth报道了一条关于“印度尼西亚可能需要 350 年才能恢复 2026 年山火烧毁的土地”的新进展。具体是怎么回事呢？原来，2026 年的大部分时间里，从巴布亚岛的稀树草原到苏门答腊岛和婆罗洲的泥炭地，印度尼西亚各地都发生了火灾。看到这样的发现，研究团队并没有只停留在表面现象上，而是进一步追问背后的原理：这个现象需要满足什么样的条件？如果换一个环境，结果还会一样吗？地球不是一块块孤立拼图的堆砌，沙漠的风、大洋的流、高山的雪都在互相影响。读懂了地理，你手里的地图就会变成一部立体的地球百科全书。",
    "audio": {
      "female": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/female/daily-20261118-dda1d187ca.mp3",
      "male": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/male/daily-20261118-dda1d187ca.mp3"
    }
  },
  {
    "id": "daily-20261117-01f2281746",
    "topic": "地理",
    "title": "隐藏的生态系统：科学家发现一块深海岩石内生活着 245 种动物",
    "source": "ScienceDaily Earth & Climate",
    "url": "https://www.sciencedaily.com/releases/2026/11/261114202133.htm",
    "date": "2026-11-17",
    "publishedDate": "2026-11-17",
    "lengthCategory": "short",
    "durationSec": 53,
    "script": "今天我们跟着地理学家的脚步，去探索地球上一个奇特的角落。根据ScienceDaily Earth & Climate的最新分享，隐藏的生态系统：科学家发现一块深海岩石内生活着 245 种动物。在太平洋深处，科学家们在富含金属的岩石内发现了隐藏的微小生态系统，这些生态系统需要数百万年的时间才能形成。研究人员检查了 244 个结核，发现超过 4,100 只动物生活在其裂缝和空腔中，其中包括与周围海底泥浆不同的独特群落。为什么这件事值得我们留意呢？因为它展示了地理领域里一个正在发生的具体变化，让我们看到科学家和研究者是如何一步步用真实数据解开谜题的。",
    "audio": {
      "female": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/female/daily-20261117-01f2281746.mp3",
      "male": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/male/daily-20261117-01f2281746.mp3"
    }
  },
  {
    "id": "daily-20261117-149de7498b",
    "topic": "地理",
    "title": "Sentinel-6B 绕地球轨道运行",
    "source": "NASA Earth Observatory",
    "url": "https://science.nasa.gov/photojournal/sentinel-6b-in-orbit-around-earth/",
    "date": "2026-11-17",
    "publishedDate": "2026-11-17",
    "lengthCategory": "medium",
    "durationSec": 77,
    "script": "今天我们跟着地理学家的脚步，去探索地球上一个奇特的角落。今天我们要深入聊聊来自NASA Earth Observatory的一篇特别报道：Sentinel-6B 绕地球轨道运行。故事要从研究人员观察到的具体线索说起：描述 这幅艺术概念图展示了 Sentinel-6B 卫星，该卫星将成为其他研究海面高度任务的参考卫星。把这条线索放到整个地理的大地图里来看，你会发现科学研究从来不是一蹴而就的。在得出结论之前，科研人员往往要先设计对照实验或者长期观测方案，把可能干扰结果的因素一个个排除掉，还要把测量数据公开出来，请世界各地的同行一起检验。对于我们十岁左右的小听众来说，理解这条新发现最好的办法，就是先抓住它最核心的那个变化：它到底解决了什么旧难题，或者推翻了哪一个过去的猜想？跨越山海的地理故事告诉我们，哪怕相隔万里，不同大陆的气候与生态也紧紧相连。爱护我们身边的环境，就是在守护整颗蓝色星球。",
    "audio": {
      "female": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/female/daily-20261117-149de7498b.mp3",
      "male": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/male/daily-20261117-149de7498b.mp3"
    }
  },
  {
    "id": "daily-20261116-e9166ef1d7",
    "topic": "地理",
    "title": "科学家在濒临灭绝的企鹅中发现了一个奇怪的悖论",
    "source": "ScienceDaily Plants & Animals",
    "url": "https://www.sciencedaily.com/releases/2026/11/261112230458.htm",
    "date": "2026-11-16",
    "publishedDate": "2026-11-16",
    "lengthCategory": "short",
    "durationSec": 49,
    "script": "今天我们跟着地理学家的脚步，去探索地球上一个奇特的角落。根据ScienceDaily Plants & Animals的最新分享，科学家在濒临灭绝的企鹅中发现了一个奇怪的悖论。一项开创性的无人机调查显示，新西兰濒临灭绝的直立冠企鹅的命运出现了惊人的分化。虽然一种种群几十年来一直保持稳定，但另一种种群却下降了 40% 以上，这显然是由于捕食者、恶化的风暴和海洋条件变化的综合作用。为什么这件事值得我们留意呢？因为它展示了地理领域里一个正在发生的具体变化，让我们看到科学家和研究者是如何一步步用真实数据解开谜题的。",
    "audio": {
      "female": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/female/daily-20261116-e9166ef1d7.mp3",
      "male": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/male/daily-20261116-e9166ef1d7.mp3"
    }
  },
  {
    "id": "daily-20261116-32da69861a",
    "topic": "地理",
    "title": "一些迄今为止发现的最古老的岩石揭示了地球的早期历史",
    "source": "Phys.org Earth",
    "url": "https://phys.org/news/2026-11-oldest-earth-early-history.html",
    "date": "2026-11-16",
    "publishedDate": "2026-11-16",
    "lengthCategory": "medium",
    "durationSec": 71,
    "script": "地图上的每一条海岸线、每一座雪山，都有一段跨越百万年的地理传奇。最近，Phys.org Earth报道了一条关于“一些迄今为止发现的最古老的岩石揭示了地球的早期历史”的新进展。具体是怎么回事呢？原来，据估计，地球已有大约 45 亿年的历史。然而，可以追溯到地球早期的岩石极其罕见。因此，人们对在中国北方发现一些地球上已知最古老的岩石（距今 39.5 亿年前）感到兴奋。引起所有关注的原因之一是它们揭示了有关地壳如何形成和演化的新线索。看到这样的发现，研究团队并没有只停留在表面现象上，而是进一步追问背后的原理：这个现象需要满足什么样的条件？如果换一个环境，结果还会一样吗？地球不是一块块孤立拼图的堆砌，沙漠的风、大洋的流、高山的雪都在互相影响。读懂了地理，你手里的地图就会变成一部立体的地球百科全书。",
    "audio": {
      "female": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/female/daily-20261116-32da69861a.mp3",
      "male": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/male/daily-20261116-32da69861a.mp3"
    }
  },
  {
    "id": "daily-20261115-15cd68ef03",
    "topic": "地理",
    "title": "地球冰冻圈不再处于安全运行空间内",
    "source": "Solidot 奇客科学",
    "url": "https://www.solidot.org/story?sid=85880",
    "date": "2026-11-15",
    "publishedDate": "2026-11-15",
    "lengthCategory": "short",
    "durationSec": 55,
    "script": "地图上的每一条海岸线、每一座雪山，都有一段跨越百万年的地理传奇。根据Solidot 奇客科学的最新分享，地球冰冻圈不再处于安全运行空间内。地球上的冰冻部分——包括冰盖、冰川、海冰、积雪和永久冻土——在调节地球气候、水资源供应和碳循环等诸多生态系统服务中发挥着至关重要的作用。但根据中外研究人员的一项新分析，冰冻圈的基本功能已不再处于安全运行空间（SOS）之内；其被推越界限的程度将给地球人口带来长期挑战。为什么这件事值得我们留意呢？因为它展示了地理领域里一个正在发生的具体变化，让我们看到科学家和研究者是如何一步步用真实数据解开谜题的。",
    "audio": {
      "female": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/female/daily-20261115-15cd68ef03.mp3",
      "male": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/male/daily-20261115-15cd68ef03.mp3"
    }
  },
  {
    "id": "daily-20261115-886e55de07",
    "topic": "地理",
    "title": "地下五万岁的大树林？美国犹他州这片看起来有四万棵树的白杨林，其实全都是“同一棵树”！",
    "source": "美国林务局 / 植物地理学",
    "url": "https://www.fs.usda.gov/pando-aspen-clone",
    "date": "2026-11-15",
    "publishedDate": "2026-11-15",
    "lengthCategory": "short",
    "durationSec": 51,
    "script": "在美国犹他州的菲什莱克国家森林里，有一片名叫“潘多”（Pando）的颤杨树林，占地面积足足有六十个足球场那么大，地面上站立着四万七千多棵高大的白杨树干。起初大家以为这只是一片普通的树林，可植物学家对每一棵树的基因进行检测后，结果令人目瞪口呆：这四万七千多棵树，竟然拥有完全一模一样的DNA！原来，在这片树林的泥土下面，藏着同一个巨大的地下根系网。地面上所有的树干都是从这同一个根系上冒出来的分身，整片树林在科学上其实是“一棵树”，总重量高达六千吨，已经在地球上生活了至少上万年，是地球上已知最重的单一生物体！",
    "audio": {
      "female": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/female/daily-20261115-886e55de07.mp3",
      "male": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/male/daily-20261115-886e55de07.mp3"
    }
  },
  {
    "id": "daily-20261118-344d190c61",
    "topic": "发明",
    "title": "韩国高考将检查眼镜和衬衫纽扣以防止作弊",
    "source": "TechXplore AI",
    "url": "https://techxplore.com/news/2026-11-glasses-shirt-buttons-south-korea.html",
    "date": "2026-11-18",
    "publishedDate": "2026-11-18",
    "lengthCategory": "medium",
    "durationSec": 81,
    "script": "今天我们要认识一项聪明又好玩的发明，看看它背后的灵感是从哪儿来的。今天我们要深入聊聊来自TechXplore AI的一篇特别报道：韩国高考将检查眼镜和衬衫纽扣以防止作弊。故事要从研究人员观察到的具体线索说起：监考人员将检查每位考生的眼镜，并用贴纸封住他们的衬衫纽扣，当局将在周四的韩国高考中增派 8,400 名监督员。把这条线索放到整个发明的大地图里来看，你会发现科学研究从来不是一蹴而就的。在得出结论之前，科研人员往往要先设计对照实验或者长期观测方案，把可能干扰结果的因素一个个排除掉，还要把测量数据公开出来，请世界各地的同行一起检验。对于我们十岁左右的小听众来说，理解这条新发现最好的办法，就是先抓住它最核心的那个变化：它到底解决了什么旧难题，或者推翻了哪一个过去的猜想？如果你在生活或学习中觉得某样东西用起来不够顺手，别急着抱怨，试着画张草图改一改——说不定下一个改变生活的发明就诞生在你的书桌上！",
    "audio": {
      "female": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/female/daily-20261118-344d190c61.mp3",
      "male": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/male/daily-20261118-344d190c61.mp3"
    }
  },
  {
    "id": "daily-20261116-48082d7653",
    "topic": "发明",
    "title": "微软称下一代 Xbox 游戏机能玩 PC 游戏",
    "source": "Solidot 奇客科学",
    "url": "https://www.solidot.org/story?sid=85902",
    "date": "2026-11-16",
    "publishedDate": "2026-11-16",
    "lengthCategory": "long",
    "durationSec": 130,
    "script": "许多改变世界的伟大发明，最初都来自一次不经意的观察，或者对大自然本领的模仿。今天我们要深入聊聊来自Solidot 奇客科学的一篇特别报道：微软称下一代 Xbox 游戏机能玩 PC 游戏。故事要从研究人员观察到的具体线索说起：微软证实，代号为 Project Helix 的下一代 Xbox 游戏机既能玩主机游戏也能玩 PC 游戏。但暂时还不清楚游戏机是否能运行 Steam、Epic 等竞争对手的 PC 游戏启动器。目前所知的信息是 Project Helix 使用了基于 AMD Zen6 CPU + RDNA5 GPU 的定制 APU，与 PC 使用的 APU 区别并不大（游戏机配备的 RDNA5 CU 数量更多），因此玩 PC 游戏没多少问题，问题在于它如何控制玩家玩任意 PC 游戏。负责 Project Helix 业务的副总裁 Jason Ronald 表示， “我们的设计目标非常明确：Helix 是一款游戏主机，同时也能玩 PC 游戏。它并非是一台能玩主机游戏的 PC。我们的目标是让玩家能简单、直观且即时地进入游戏。把这条线索放到整个发明的大地图里来看，你会发现科学研究从来不是一蹴而就的。在得出结论之前，科研人员往往要先设计对照实验或者长期观测方案，把可能干扰结果的因素一个个排除掉，还要把测量数据公开出来，请世界各地的同行一起检验。对于我们十岁左右的小听众来说，理解这条新发现最好的办法，就是先抓住它最核心的那个变化：它到底解决了什么旧难题，或者推翻了哪一个过去的猜想？如果你在生活或学习中觉得某样东西用起来不够顺手，别急着抱怨，试着画张草图改一改——说不定下一个改变生活的发明就诞生在你的书桌上！",
    "audio": {
      "female": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/female/daily-20261116-48082d7653.mp3",
      "male": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/male/daily-20261116-48082d7653.mp3"
    }
  },
  {
    "id": "daily-20261115-8b9edc1c87",
    "topic": "发明",
    "title": "铅笔芯里其实一丁点“铅”都没有！石墨加黏土是如何写出从2H到6B的深浅线条的？",
    "source": "材料科学博物馆",
    "url": "https://www.sciencehistory.org/pencil-graphite-history",
    "date": "2026-11-15",
    "publishedDate": "2026-11-15",
    "lengthCategory": "medium",
    "durationSec": 93,
    "script": "每天写作业和画画用的铅笔，名字里虽然带一个“铅”字，但如果有人担心咬到笔头会铅中毒，化学老师一定会笑着告诉你：放心吧，现代铅笔芯里连一丁点金属铅都没有！铅笔芯真正的主角，是由碳元素组成的矿物——“石墨”。早在十六世纪，英国人在博罗代尔山谷发现了一座纯度极高的黑石墨矿，用它划在纸上能留下清晰的黑印，当时人们还不懂化学成分，误以为它是一种黑色的铅矿，才给它取名叫“铅笔”。不过，纯石墨有一个弱点：它太软又太脆了，写几个字就会咔嚓折断，还会蹭得满手乌黑。直到一七九五年，法国化学家兼工程师尼古拉·雅克·孔戴想出了一个天才配方：他把石墨磨成极细的粉末，再按不同比例掺入细腻的高岭土（也就是做瓷器的黏土），加水揉成泥条，放进上千摄氏度的窑炉里烧结！奇妙的变化发生了：黏土加得越多，烧出来的笔芯就越坚硬、字迹越浅，工程师用英文Hard的首字母“H”来表示，比如2H、4H；石墨加得越多，笔芯就越软、画出来的线条越黑，用Black的首字母“B”来表示，比如素描用的2B、6B；而软硬适中的“HB”，就成了陪伴我们每天写字的忠实伙伴。",
    "audio": {
      "female": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/female/daily-20261115-8b9edc1c87.mp3",
      "male": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/male/daily-20261115-8b9edc1c87.mp3"
    }
  },
  {
    "id": "daily-20261114-77436d5bd3",
    "topic": "发明",
    "title": "饮料易拉罐明明可以做成方形省地方，为什么全世界工程师都坚持把它做成圆柱形？",
    "source": "Everyday Engineering / 机械工程科普",
    "url": "https://www.popularmechanics.com/aluminum-can-engineering",
    "date": "2026-11-14",
    "publishedDate": "2026-11-14",
    "lengthCategory": "medium",
    "durationSec": 91,
    "script": "去超市看装在纸箱里的汽水和果汁易拉罐，你会发现一个有趣的几何问题：圆圆的罐子排在一起，中间总会留下一块块三角形的空隙，白白浪费了大约百分之二十的装箱空间。如果把易拉罐做成牛奶盒那样的正方体或长方体，排在一起严丝合缝，不是更省地方吗？为什么全世界的铝制易拉罐偏偏全都是圆柱形的呢？机械工程师给出了三个绝妙的工程理由：第一是抗压能力！汽水里溶解了大量二氧化碳气体，罐子内部的气压高达大气压的两到三倍。如果做成方形，高压气体会拼命往外顶，把平平的四个侧面吹得鼓起来，四个直角焊缝极其容易爆裂；而圆柱形能把内部压力均匀地分散到整圈弧形罐壁上，哪怕铝皮薄得只有零点一毫米，跟一根头发丝差不多薄，也能稳稳扛住压力！第二是制造速度与省材料：工厂用一整片圆铝片，通过冲床一次拉伸就能冲压出没有竖向焊缝的圆罐身，一分钟能造出两千多个罐子，而且同样体积下圆柱比方盒更省铝材；第三，圆柱形没有尖锐的棱角，拿在手里最贴合手掌弧度。你看，一个小小的易拉罐，竟然是几何学、力学与材料学权衡出的最棒答卷！",
    "audio": {
      "female": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/female/daily-20261114-77436d5bd3.mp3",
      "male": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/male/daily-20261114-77436d5bd3.mp3"
    }
  },
  {
    "id": "daily-20261114-96900f78b2",
    "topic": "发明",
    "title": "给玻璃装上看不见的“蜘蛛丝”：为什么鸟儿再也不会误撞透明落地窗了？",
    "source": "AskNature 仿生发明",
    "url": "https://asknature.org/spider-web-uv-glass",
    "date": "2026-11-14",
    "publishedDate": "2026-11-14",
    "lengthCategory": "short",
    "durationSec": 59,
    "script": "城市里许多明亮的图书馆和科技馆都有大面积的透明玻璃幕墙。可对飞翔的小鸟来说，透明玻璃映出蓝天和树影，小鸟以为那里可以飞过去，结果常常一头撞上玻璃受伤。如果在玻璃上贴满深色贴纸，屋里又会变暗。德国工程师向森林里的圆网蜘蛛请教了一个好办法！原来，蜘蛛为了防止飞鸟撞破自己辛辛苦苦织好的蛛网，会在蛛网上织入一种能强烈反射紫外线的特殊丝线。鸟类的眼睛能看见紫外线，老远就能绕开蛛网，而人类的眼睛却看不见紫外线！工程师模仿蜘蛛丝，在建筑玻璃内部镀上一层人眼看完全透明、但在鸟儿眼里像亮起醒目网格一样的紫外线反射涂层，既保住了明亮的窗户，又守护了成千上万只飞鸟。",
    "audio": {
      "female": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/female/daily-20261114-96900f78b2.mp3",
      "male": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/male/daily-20261114-96900f78b2.mp3"
    }
  },
  {
    "id": "daily-20261111-157b4e8ee6",
    "topic": "发明",
    "title": "穆格纪念 ESPA 设计里程碑 25 周年：创新太空出行",
    "source": "Spaceflight News · SpaceNews",
    "url": "https://spacenews.com/moog-marks-25-years-since-espa-design-milestone-innovating-space-rideshare/",
    "date": "2026-11-11",
    "publishedDate": "2026-11-11",
    "lengthCategory": "short",
    "durationSec": 46,
    "script": "许多改变世界的伟大发明，最初都来自一次不经意的观察，或者对大自然本领的模仿。根据Spaceflight News · SpaceNews的最新分享，穆格纪念 ESPA 设计里程碑 25 周年：创新太空出行。纽约州东奥罗拉 — 穆格公司（纽约证券交易所股票代码：MOG.A 和 MOG.B）纪念演进型辅助有效负载适配器 (ESPA) 环于 2001 年完成关键设计审查以来 25 周年。为什么这件事值得我们留意呢？因为它展示了发明领域里一个正在发生的具体变化，让我们看到科学家和研究者是如何一步步用真实数据解开谜题的。",
    "audio": {
      "female": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/female/daily-20261111-157b4e8ee6.mp3",
      "male": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/male/daily-20261111-157b4e8ee6.mp3"
    }
  },
  {
    "id": "curio-20261103-inv-01",
    "topic": "发明",
    "title": "粘在裤腿上的讨厌苍耳刺，怎么启发工程师发明了“魔术贴”？",
    "source": "Swiss Federal Institute of Intellectual Property",
    "url": "https://www.ige.ch/",
    "date": "2026-11-03",
    "publishedDate": "2026-11-03",
    "lengthCategory": "short",
    "durationSec": 50,
    "script": "穿运动鞋和背书包时，“刺啦”一声就能撕开、一按就能粘牢的尼龙搭扣，也就是魔术贴，大家都用过吧？这项发明源自一九四一年瑞士工程师乔治·德·梅斯特拉尔的一次秋日散步。那天他带着猎狗从阿尔卑斯山草丛回家，发现狗毛和自己的羊毛裤腿上粘满了牛蒡草的苍耳果实，怎么甩都甩不掉。他把苍耳拿到显微镜下一看：原来苍耳表面长着成百上千个极具弹性的微型小钩子，正好钩住了布料纤维的毛圈！他花了八年时间试验尼龙丝，一面织满小钩子，另一面织满小绒圈，终于发明了风靡全球、连宇航员在太空舱固定工具都在用的魔术贴。",
    "audio": {
      "female": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/female/curio-20261103-inv-01.mp3",
      "male": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/male/curio-20261103-inv-01.mp3"
    }
  },
  {
    "id": "curio-20261103-inv-02",
    "topic": "发明",
    "title": "微波炉竟然是因为一块在雷达旁边融化的巧克力棒而被发明出来的！",
    "source": "MIT Lemelson Center",
    "url": "https://lemelson.mit.edu/",
    "date": "2026-11-03",
    "publishedDate": "2026-11-03",
    "lengthCategory": "short",
    "durationSec": 52,
    "script": "热牛奶、转饭菜只需一分钟的微波炉，最初并不是厨师想出来的，而是一位研究雷达的工程师无意间发现的！一九四五年，美国工程师珀西·斯宾塞正在实验室测试雷达的核心零件——磁控管。当他走到正在工作的磁控管旁边时，突然觉得裤子口袋里黏糊糊的。他伸手一摸，口袋里的一块花生巧克力棒竟然化成了巧克力浆！斯宾塞没有只顾着擦裤子，而是好奇地拿来一把生玉米粒放在磁控管前，结果玉米粒噼里啪啦全爆成了爆米花！原来，微波能让食物内部的水分子每秒钟来回振动二十四亿五千万次，通过摩擦从内部生热。伟大的厨房发明就这样诞生了。",
    "audio": {
      "female": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/female/curio-20261103-inv-02.mp3",
      "male": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/male/curio-20261103-inv-02.mp3"
    }
  },
  {
    "id": "daily-20261118-de356e0ef4",
    "topic": "生物",
    "title": "两栖动物起源的小型化开辟了新的生态领域",
    "source": "Phys.org Biology",
    "url": "https://phys.org/news/2026-11-miniaturization-amphibians-ecological-territory.html",
    "date": "2026-11-18",
    "publishedDate": "2026-11-18",
    "lengthCategory": "medium",
    "durationSec": 104,
    "script": "今天我们走进奇妙的生物圈，去认识一位身怀绝技的生命朋友。今天我们要深入聊聊来自Phys.org Biology的一篇特别报道：两栖动物起源的小型化开辟了新的生态领域。故事要从研究人员观察到的具体线索说起：青蛙、蝾螈和蚓螈这三类现存两栖动物总共有 9,000 多种。平均而言，它们是所有四肢脊椎动物中最小的，有些甚至非常小：短头蟾蜍从鼻子到排气口的长度不到 7 毫米（0.28 英寸）。它们的远古亲戚是非常不同的动物。大多数肢椎动物（现代两栖动物（lissamphibians）的起源）是已灭绝的类群，是水生或半水生掠食者，体长为 1 至 5 米（3.3 至 16.4 英尺）。把这条线索放到整个生物的大地图里来看，你会发现科学研究从来不是一蹴而就的。在得出结论之前，科研人员往往要先设计对照实验或者长期观测方案，把可能干扰结果的因素一个个排除掉，还要把测量数据公开出来，请世界各地的同行一起检验。对于我们十岁左右的小听众来说，理解这条新发现最好的办法，就是先抓住它最核心的那个变化：它到底解决了什么旧难题，或者推翻了哪一个过去的猜想？每一种生物都是历经千万年自然选择留下的生命奇迹。尊重生命、保护生物多样性，不仅是在保护动物和植物，也是在留住大自然最宝贵的智慧库。",
    "audio": {
      "female": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/female/daily-20261118-de356e0ef4.mp3",
      "male": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/male/daily-20261118-de356e0ef4.mp3"
    }
  },
  {
    "id": "daily-20261118-f1c3e71b3f",
    "topic": "生物",
    "title": "那只哈巴狗几岁了？科学家开发出首个针对针鼹的 X 射线老化指南",
    "source": "Phys.org Biology",
    "url": "https://phys.org/news/2026-11-puggle-scientists-ray-aging-echidnas.html",
    "date": "2026-11-18",
    "publishedDate": "2026-11-18",
    "lengthCategory": "short",
    "durationSec": 49,
    "script": "在地球数十亿年的生命演化中，动物、植物和微生物练就了令人惊叹的生存绝活。根据Phys.org Biology的最新分享，那只哈巴狗几岁了？科学家开发出首个针对针鼹的 X 射线老化指南。默多克大学的研究人员和塔龙加动物园的兽医合作，制作了第一份详细的短喙针鼹的射线照相衰老指南，提供了一种实用的新方法来估计这些标志性澳大利亚哺乳动物从小哈巴狗到成年早期的年龄。为什么这件事值得我们留意呢？因为它展示了生物领域里一个正在发生的具体变化，让我们看到科学家和研究者是如何一步步用真实数据解开谜题的。",
    "audio": {
      "female": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/female/daily-20261118-f1c3e71b3f.mp3",
      "male": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/male/daily-20261118-f1c3e71b3f.mp3"
    }
  },
  {
    "id": "daily-20261117-11ab52a35d",
    "topic": "生物",
    "title": "广告中的“人工智能生成”标签实际上告诉我们什么？",
    "source": "TechXplore AI",
    "url": "https://techxplore.com/news/2026-11-aigenerated-advertising.html",
    "date": "2026-11-17",
    "publishedDate": "2026-11-17",
    "lengthCategory": "medium",
    "durationSec": 79,
    "script": "在地球数十亿年的生命演化中，动物、植物和微生物练就了令人惊叹的生存绝活。今天我们要深入聊聊来自TechXplore AI的一篇特别报道：广告中的“人工智能生成”标签实际上告诉我们什么？。故事要从研究人员观察到的具体线索说起：广告的本质是说服力。它的存在是为了销售产品和生活方式、想法和故事。把这条线索放到整个生物的大地图里来看，你会发现科学研究从来不是一蹴而就的。在得出结论之前，科研人员往往要先设计对照实验或者长期观测方案，把可能干扰结果的因素一个个排除掉，还要把测量数据公开出来，请世界各地的同行一起检验。对于我们十岁左右的小听众来说，理解这条新发现最好的办法，就是先抓住它最核心的那个变化：它到底解决了什么旧难题，或者推翻了哪一个过去的猜想？每一种生物都是历经千万年自然选择留下的生命奇迹。尊重生命、保护生物多样性，不仅是在保护动物和植物，也是在留住大自然最宝贵的智慧库。",
    "audio": {
      "female": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/female/daily-20261117-11ab52a35d.mp3",
      "male": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/male/daily-20261117-11ab52a35d.mp3"
    }
  },
  {
    "id": "daily-20261117-96fc817857",
    "topic": "生物",
    "title": "一种古老的病毒可能有助于解释人类大脑的不同之处",
    "source": "ScienceDaily Plants & Animals",
    "url": "https://www.sciencedaily.com/releases/2026/11/261114202230.htm",
    "date": "2026-11-17",
    "publishedDate": "2026-11-17",
    "lengthCategory": "medium",
    "durationSec": 75,
    "script": "在地球数十亿年的生命演化中，动物、植物和微生物练就了令人惊叹的生存绝活。最近，ScienceDaily Plants & Animals报道了一条关于“一种古老的病毒可能有助于解释人类大脑的不同之处”的新进展。具体是怎么回事呢？原来，数百万年前感染黑猩猩的一种病毒可能帮助塑造了人类和我们最近的亲戚之间最重要的差异之一：我们的大脑如何发育。隆德大学的科学家发现，嵌入黑猩猩基因组中的古代病毒 DNA 会关闭一种名为 LINC00662 的基因，该基因在人类中仍然活跃，似乎在早期大脑发育中发挥着重要作用。看到这样的发现，研究团队并没有只停留在表面现象上，而是进一步追问背后的原理：这个现象需要满足什么样的条件？如果换一个环境，结果还会一样吗？每一种生物都是历经千万年自然选择留下的生命奇迹。尊重生命、保护生物多样性，不仅是在保护动物和植物，也是在留住大自然最宝贵的智慧库。",
    "audio": {
      "female": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/female/daily-20261117-96fc817857.mp3",
      "male": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/male/daily-20261117-96fc817857.mp3"
    }
  },
  {
    "id": "daily-20261116-e23abe21d5",
    "topic": "生物",
    "title": "泰国南部发现巨型史前啮齿动物化石",
    "source": "Phys.org Biology",
    "url": "https://phys.org/news/2026-11-giant-prehistoric-rodent-fossils-southern.html",
    "date": "2026-11-16",
    "publishedDate": "2026-11-16",
    "lengthCategory": "medium",
    "durationSec": 74,
    "script": "在地球数十亿年的生命演化中，动物、植物和微生物练就了令人惊叹的生存绝活。最近，Phys.org Biology报道了一条关于“泰国南部发现巨型史前啮齿动物化石”的新进展。具体是怎么回事呢？原来，包括麦吉尔大学研究人员在内的一个国际古生物学家小组在泰国南部的一个矿坑中发现了“非常大”的啮齿动物化石。研究人员表示，发表在《科学报告》上的这一发现为啮齿动物巨人症的早期表现（动物进化变得更大的过程）提供了新的视角，表明大型啮齿动物的进化历史比以前认识的要古老得多，而且在地理上分布更广泛。看到这样的发现，研究团队并没有只停留在表面现象上，而是进一步追问背后的原理：这个现象需要满足什么样的条件？如果换一个环境，结果还会一样吗？从深海到森林，生命总能找到令人惊叹的出路。去公园或郊外时，带着安静和礼貌去观察小生物，你会发现一个热闹非凡的微观世界。",
    "audio": {
      "female": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/female/daily-20261116-e23abe21d5.mp3",
      "male": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/male/daily-20261116-e23abe21d5.mp3"
    }
  },
  {
    "id": "daily-20261116-eb7e17bdcc",
    "topic": "生物",
    "title": "恐龙可能在一亿年前就以海藻为食",
    "source": "ScienceDaily Plants & Animals",
    "url": "https://www.sciencedaily.com/releases/2026/11/261112230502.htm",
    "date": "2026-11-16",
    "publishedDate": "2026-11-16",
    "lengthCategory": "short",
    "durationSec": 45,
    "script": "今天我们走进奇妙的生物圈，去认识一位身怀绝技的生命朋友。根据ScienceDaily Plants & Animals的最新分享，恐龙可能在一亿年前就以海藻为食。根据隐藏在恐龙牙齿化石中的令人惊讶的新证据，恐龙可能在一亿多年前就以海藻和其他海洋食物为食。研究人员发现的化学特征表明沿海恐龙和其他史前动物部分依赖于海洋中的营养物质。为什么这件事值得我们留意呢？因为它展示了生物领域里一个正在发生的具体变化，让我们看到科学家和研究者是如何一步步用真实数据解开谜题的。",
    "audio": {
      "female": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/female/daily-20261116-eb7e17bdcc.mp3",
      "male": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/male/daily-20261116-eb7e17bdcc.mp3"
    }
  },
  {
    "id": "daily-20261115-478807198f",
    "topic": "生物",
    "title": "海獭睡觉时为什么要手拉着手，还在肚子上揣一块心爱的小石头？",
    "source": "Monterey Bay Aquarium 海洋生物",
    "url": "https://www.montereybayaquarium.org/sea-otters",
    "date": "2026-11-15",
    "publishedDate": "2026-11-15",
    "lengthCategory": "medium",
    "durationSec": 76,
    "script": "在太平洋北部的海藻森林海面上，常常能看到毛茸茸的海獭仰面朝天漂在水上午睡。最让人忍俊不禁的是：两只或者好几只海獭睡觉的时候，会把毛茸茸的小前爪紧紧牵在一起，或者用海带把自己缠在海藻丛里！海獭为什么要手拉着手睡觉呢？难道是因为害怕做噩梦吗？其实这是它们聪明的海上生存法宝：海面上随时会有风浪和洋流，如果不手拉手或者系上海带“安全带”，一觉醒来，小海獭和妈妈就可能被海流冲散到几公里外去啦！更有趣的是，每只海獭的左腋窝下面，都有一个松弛的皮毛小口袋。它去海底捡到一块顺手的扁平小石头后，就会像宝贝一样塞进腋窝口袋里随身带着。等捉到壳硬得咬不动的蛤蜊、海胆或鲍鱼时，海獭就会仰泳浮在水面上，把小石头平放在自己的肚皮上当“小铁砧”，双手抱着贝壳往石头上哐哐猛砸，敲开硬壳享用美餐。它也是海洋哺乳动物里极少数会熟练保存和使用石器工具的小工匠！",
    "audio": {
      "female": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/female/daily-20261115-478807198f.mp3",
      "male": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/male/daily-20261115-478807198f.mp3"
    }
  },
  {
    "id": "daily-20261114-f4265d7281",
    "topic": "生物",
    "title": "乌鸦做决定的速度竟然比人类还快两倍？鸟类大脑高密度神经元的聪明秘密",
    "source": "ScienceDaily 动物认知科学",
    "url": "https://www.sciencedaily.com/crows-decision-speed",
    "date": "2026-11-14",
    "publishedDate": "2026-11-14",
    "lengthCategory": "short",
    "durationSec": 47,
    "script": "以前如果说谁脑袋小、不聪明，常会开玩笑说“长着一颗小鸟脑袋”。可神经科学家最新的研究彻底为鸟类平反了：像乌鸦和渡鸦这样的鸦科鸟类，做复杂决定的反应速度竟然比人类还要快两倍！为什么乌鸦的脑袋只有核桃那么大，却会使用工具、认出人脸、甚至懂得规划未来呢？原来，为了减轻飞行重量，鸟类大脑虽然体积小，里面的神经元却排列得极其紧密！一克乌鸦大脑皮层区域里包含的神经元数量，比同重量的哺乳动物大脑多出好几倍，神经元之间距离更短，信号传递就像坐上了高速直达电梯！",
    "audio": {
      "female": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/female/daily-20261114-f4265d7281.mp3",
      "male": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/male/daily-20261114-f4265d7281.mp3"
    }
  },
  {
    "id": "daily-20261118-3104d57ba2",
    "topic": "大自然",
    "title": "不丹因保持 70% 的森林覆盖率而获得 130 万美元的 Earthsho…",
    "source": "Mongabay Wildlife",
    "url": "https://news.mongabay.com/short-article/2026/11/bhutan-wins-1-3m-earthshot-prize-for-maintaining-70-forest-cover/",
    "date": "2026-11-18",
    "publishedDate": "2026-11-18",
    "lengthCategory": "short",
    "durationSec": 53,
    "script": "今天的大自然广播，带大家去看看地球生态圈里的一场奇妙变化。根据Mongabay Wildlife的最新分享，不丹因保持 70% 的森林覆盖率而获得 130 万美元的 Earthsho…。不丹因其在保护喜马拉雅森林方面所做的工作而被授予 2026 年 Earthshot 奖获得者之一，并获得 100 万英镑（约合 130 万美元），以扩大其国家景观恢复工作。不丹是一个拥有 80 万人口的喜马拉雅王国，因书写自然而获得“保护和恢复自然”类别的认可。为什么这件事值得我们留意呢？因为它展示了大自然领域里一个正在发生的具体变化，让我们看到科学家和研究者是如何一步步用真实数据解开谜题的。",
    "audio": {
      "female": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/female/daily-20261118-3104d57ba2.mp3",
      "male": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/male/daily-20261118-3104d57ba2.mp3"
    }
  },
  {
    "id": "daily-20261118-4dde468c10",
    "topic": "大自然",
    "title": "新型飞行无人机利用触摸功能像鸟一样栖息",
    "source": "Science News Explores",
    "url": "https://www.snexplores.org/article/flying-drone-perch-like-bird",
    "date": "2026-11-18",
    "publishedDate": "2026-11-18",
    "lengthCategory": "short",
    "durationSec": 52,
    "script": "大自然是最神奇的设计师，风、雨、雷电和万物生灵每时每刻都在默契配合。最近，Science News Explores报道了一条关于“新型飞行无人机利用触摸功能像鸟一样栖息”的新进展。具体是怎么回事呢？原来，无人机的仿人手指通过触摸来进行抓握。这避免了依赖视觉栖息所带来的一些障碍。看到这样的发现，研究团队并没有只停留在表面现象上，而是进一步追问背后的原理：这个现象需要满足什么样的条件？如果换一个环境，结果还会一样吗？不用等到去遥远的保护区，窗外的云朵、雨后的泥土和迁徙的候鸟，每天都在上演大自然的纪录片，等着细心的你去发现。",
    "audio": {
      "female": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/female/daily-20261118-4dde468c10.mp3",
      "male": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/male/daily-20261118-4dde468c10.mp3"
    }
  },
  {
    "id": "daily-20261117-28afc7114b",
    "topic": "大自然",
    "title": "雷鸟队正在编队",
    "source": "NASA Image of the Day",
    "url": "https://www.nasa.gov/image-detail/11072026-ksc-max-power-airdotshow-2orig/",
    "date": "2026-11-17",
    "publishedDate": "2026-11-17",
    "lengthCategory": "short",
    "durationSec": 40,
    "script": "只要停下脚步仔细倾听和观察，森林、海洋和天空就会给你讲一段动人的自然故事。根据NASA Image of the Day的最新分享，雷鸟队正在编队。2026 年 11 月 7 日星期六，美国空军雷鸟战斗机在佛罗里达州 NASA 肯尼迪航天中心举行的 MAX POWER 博览会和航空展上从上空飞过。为什么这件事值得我们留意呢？因为它展示了大自然领域里一个正在发生的具体变化，让我们看到科学家和研究者是如何一步步用真实数据解开谜题的。",
    "audio": {
      "female": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/female/daily-20261117-28afc7114b.mp3",
      "male": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/male/daily-20261117-28afc7114b.mp3"
    }
  },
  {
    "id": "daily-20261117-3f4121f983",
    "topic": "大自然",
    "title": "稻田的力量：日本希望利用稻田来缓解洪水",
    "source": "Mongabay Wildlife",
    "url": "https://news.mongabay.com/2026/11/the-power-of-the-paddy-japan-looks-to-rice-fields-to-help-mitigate-flooding/",
    "date": "2026-11-17",
    "publishedDate": "2026-11-17",
    "lengthCategory": "medium",
    "durationSec": 92,
    "script": "只要停下脚步仔细倾听和观察，森林、海洋和天空就会给你讲一段动人的自然故事。今天我们要深入聊聊来自Mongabay Wildlife的一篇特别报道：稻田的力量：日本希望利用稻田来缓解洪水。故事要从研究人员观察到的具体线索说起：日本大崎——日本东北部的一个农业社区大崎近年来一直在与洪水作斗争。2015年、2019年和2022年，大雨冲破河堤，该地区被淹没。作为回应，大崎农民和当地政府在社区周围的稻田中安装了 5,000 多个小型土坝，。把这条线索放到整个大自然的大地图里来看，你会发现科学研究从来不是一蹴而就的。在得出结论之前，科研人员往往要先设计对照实验或者长期观测方案，把可能干扰结果的因素一个个排除掉，还要把测量数据公开出来，请世界各地的同行一起检验。对于我们十岁左右的小听众来说，理解这条新发现最好的办法，就是先抓住它最核心的那个变化：它到底解决了什么旧难题，或者推翻了哪一个过去的猜想？大自然里的每一滴雨、每一只鸟、每一棵树都处在微妙的平衡之中。当我们学会像生态学家一样思考，就会更加懂得如何与自然温柔相处。",
    "audio": {
      "female": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/female/daily-20261117-3f4121f983.mp3",
      "male": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/male/daily-20261117-3f4121f983.mp3"
    }
  },
  {
    "id": "daily-20261116-50743857d1",
    "topic": "大自然",
    "title": "台湾本土农民复兴气候适应型小米",
    "source": "Phys.org Biology",
    "url": "https://phys.org/news/2026-11-taiwan-indigenous-farmer-revives-climate.html",
    "date": "2026-11-16",
    "publishedDate": "2026-11-16",
    "lengthCategory": "short",
    "durationSec": 41,
    "script": "大自然是最神奇的设计师，风、雨、雷电和万物生灵每时每刻都在默契配合。根据Phys.org Biology的最新分享，台湾本土农民复兴气候适应型小米。台湾东南部，土著农民巴努·伊斯马哈桑 (Banu Ismahasan) 走过一片金色的高秆田，用手收割一种能抵御极端天气的古老作物的谷粒。为什么这件事值得我们留意呢？因为它展示了大自然领域里一个正在发生的具体变化，让我们看到科学家和研究者是如何一步步用真实数据解开谜题的。",
    "audio": {
      "female": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/female/daily-20261116-50743857d1.mp3",
      "male": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/male/daily-20261116-50743857d1.mp3"
    }
  },
  {
    "id": "daily-20261116-30ab4bad9f",
    "topic": "大自然",
    "title": "更大规模、更频繁的野火威胁着美国各地的供水",
    "source": "Mongabay Wildlife",
    "url": "https://news.mongabay.com/short-article/2026/11/bigger-and-more-frequent-wildfires-threaten-water-supplies-across-the-us/",
    "date": "2026-11-16",
    "publishedDate": "2026-11-16",
    "lengthCategory": "short",
    "durationSec": 47,
    "script": "大自然是最神奇的设计师，风、雨、雷电和万物生灵每时每刻都在默契配合。根据Mongabay Wildlife的最新分享，更大规模、更频繁的野火威胁着美国各地的供水。今年美国发生的野火数量创历史新高，烧毁面积超过 14,062 平方英里，留下烧焦的树木和烧焦的植被。但不太明显的是它们对为全国城乡社区提供饮用水的溪流和河流的影响。为什么这件事值得我们留意呢？因为它展示了大自然领域里一个正在发生的具体变化，让我们看到科学家和研究者是如何一步步用真实数据解开谜题的。",
    "audio": {
      "female": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/female/daily-20261116-30ab4bad9f.mp3",
      "male": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/male/daily-20261116-30ab4bad9f.mp3"
    }
  },
  {
    "id": "daily-20261115-fa01eeeccb",
    "topic": "大自然",
    "title": "全球红树林正在迎来复苏：长在海浪里的“海岸卫士”是如何用高跷根挡住台风巨浪的？",
    "source": "NASA Earth Observatory",
    "url": "https://earthobservatory.nasa.gov/mangroves-rebound",
    "date": "2026-11-15",
    "publishedDate": "2026-11-15",
    "lengthCategory": "medium",
    "durationSec": 84,
    "script": "大多数陆地树木如果泡在又咸又苦的海水里，不出几天根系就会脱水枯死。可是在热带和亚热带的海湾滩涂上，却有一群专门长在海水里的神奇森林——“红树林”！别看名字叫红树林，它们的树叶其实绿油油的，只是树干和树皮里富含单宁酸，一旦刮破遇到空气就会氧化变成棕红色，所以才叫红树。NASA地球观测卫星的最新遥感图像传来了一个好消息：经过全球多国的生态保护和人工种植，许多海岸线的红树林正在迎来蓬勃复苏！红树林为什么被称为“海岸卫士”呢？首先，它们从树干上长出无数弓形的“支柱根”，像踩着高跷一样深深扎进海滩淤泥里，再长出向上冒出泥面的“呼吸根”在退潮时呼吸氧气。当台风掀起几米高的狂风巨浪扑向海岸时，密密麻麻的红树林根系和树冠就像一道天然的绿色防波堤，能消减掉百分之七十以上的海浪冲击力，保护岸边的村庄和农田；同时，水下盘根错节的根系还是小鱼、小虾、招潮蟹和弹涂鱼最安全的育儿园，吸存二氧化碳的能力更是同面积陆地森林的数倍！",
    "audio": {
      "female": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/female/daily-20261115-fa01eeeccb.mp3",
      "male": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/male/daily-20261115-fa01eeeccb.mp3"
    }
  },
  {
    "id": "daily-20261114-664080b2d7",
    "topic": "大自然",
    "title": "津巴布韦的护农妙招：为什么小小的“辣椒味乒乓球”能让野生大象乖乖绕开庄稼地？",
    "source": "Mongabay 野生动物保护",
    "url": "https://news.mongabay.com/spicy-ping-pong-elephants",
    "date": "2026-11-14",
    "publishedDate": "2026-11-14",
    "lengthCategory": "short",
    "durationSec": 50,
    "script": "在非洲津巴布韦的村庄旁，体型庞大的非洲象有时会在夜里走进农田吃玉米，一晚上就能把农民辛苦种了一年的庄稼踩坏吃光。怎样才能既不伤害大象，又让大象主动离开农田呢？野生动物保护学家利用了大象的一个特点：大象的长鼻子嗅觉极其灵敏，嗅觉受体基因数量是人类的五倍，所以它们最怕闻到刺鼻的辣椒味！保护人员用特制压缩气枪发射装满浓缩辣椒油的环保小圆球，或者在田边挂一圈涂满辣椒膏的绳子和嗡嗡响的蜜蜂箱。大象长鼻子一闻到辣椒味或听到蜜蜂叫，打个喷嚏就会立刻掉头回森林，实现了人与野象的和平共处。",
    "audio": {
      "female": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/female/daily-20261114-664080b2d7.mp3",
      "male": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/male/daily-20261114-664080b2d7.mp3"
    }
  },
  {
    "id": "daily-20261118-aebeec7664",
    "topic": "简单政治",
    "title": "学校禁止手机有助于提高学生成绩",
    "source": "Solidot 奇客科学",
    "url": "https://www.solidot.org/story?sid=85915",
    "date": "2026-11-18",
    "publishedDate": "2026-11-18",
    "lengthCategory": "short",
    "durationSec": 45,
    "script": "从一条斑马线到跨国合作公约，好的公共决定能让每一个普通人都受到照顾。根据Solidot 奇客科学的最新分享，学校禁止手机有助于提高学生成绩。美国学生的成绩从十多年前开始下滑，这一时间趋势与智能手机的流行基本一致，引发了对智能手机在学生成绩下滑中所扮演角色的疑问。很多美国州和学校开始执行手机禁令。为什么这件事值得我们留意呢？因为它展示了简单政治领域里一个正在发生的具体变化，让我们看到科学家和研究者是如何一步步用真实数据解开谜题的。",
    "audio": {
      "female": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/female/daily-20261118-aebeec7664.mp3",
      "male": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/male/daily-20261118-aebeec7664.mp3"
    }
  },
  {
    "id": "daily-20261118-1a2db6ffed",
    "topic": "简单政治",
    "title": "特斯拉以 3 万美元向客户出售 Cybercab 然后每月收 299 美元",
    "source": "Solidot 奇客科学",
    "url": "https://www.solidot.org/story?sid=85926",
    "date": "2026-11-18",
    "publishedDate": "2026-11-18",
    "lengthCategory": "long",
    "durationSec": 132,
    "script": "今天我们来聊聊社区与公共生活里的一个好办法，看看大家是如何商量着把事情办好的。今天我们要深入聊聊来自Solidot 奇客科学的一篇特别报道：特斯拉以 3 万美元向客户出售 Cybercab 然后每月收 299 美元。故事要从研究人员观察到的具体线索说起：特斯拉宣布以 3 万美元向特选客户出售无人驾驶汽车 Cybercab，然后每月必须支付 299 美元否则汽车不会启动。Cybercab 类似 Waymo 旗下的无人驾驶出租车，没有方向盘也没有刹车踏板，但不同的是 Waymo 的汽车提供的网约车服务，而特斯拉计划将其提供给少许客户。分析师认为这类似花 3 万美元买下一个特许经营权。特斯拉称，如果 Cybercab 车主未能按时足额缴纳费用，汽车会停止工作。如果车主试图在不支持该服务的区域（目前仅限于佛罗里达州和德克萨斯州部分城市）使用汽车，它同样无法工作。如果车主有任何被认定为未经授权或不当的行为，特斯拉有权暂停或取消其订阅，届时汽车将停止工作。把这条线索放到整个简单政治的大地图里来看，你会发现科学研究从来不是一蹴而就的。在得出结论之前，科研人员往往要先设计对照实验或者长期观测方案，把可能干扰结果的因素一个个排除掉，还要把测量数据公开出来，请世界各地的同行一起检验。对于我们十岁左右的小听众来说，理解这条新发现最好的办法，就是先抓住它最核心的那个变化：它到底解决了什么旧难题，或者推翻了哪一个过去的猜想？好的规则既有尺度又有温度，既讲公平又照顾弱者。从班级里的一次分工到城市里的一条坡道，每个人都能为更友善的世界出一份力。",
    "audio": {
      "female": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/female/daily-20261118-1a2db6ffed.mp3",
      "male": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/male/daily-20261118-1a2db6ffed.mp3"
    }
  },
  {
    "id": "daily-20261117-a9455a6e08",
    "topic": "简单政治",
    "title": "科学史上的今天（2009年）：东安格利亚大学气候研究小组的管理员发现他们的…",
    "source": "维基百科 · 科学史上的今天",
    "url": "https://en.wikipedia.org/wiki/University_of_East_Anglia",
    "date": "2026-11-17",
    "publishedDate": "2026-11-17",
    "lengthCategory": "medium",
    "durationSec": 78,
    "script": "几百万人住在一起的城市和地球村，怎样才能既公平又温暖地运转？这离不开公共规则的智慧。最近，维基百科 · 科学史上的今天报道了一条关于“科学史上的今天（2009年）：东安格利亚大学气候研究小组的管理员发现他们的…”的新进展。具体是怎么回事呢？原来，东安格利亚大学（UEA）是英国诺里奇的一所公立研究型大学。该大学成立于 1963 年，位于市中心以西，校园占地 360 英亩（150 公顷），拥有四个院系和 26 个学院。它是 BBSRC 资助的五个研究园区之一，拥有 40 家企业、四个独立研究机构和一家教学医院。看到这样的发现，研究团队并没有只停留在表面现象上，而是进一步追问背后的原理：这个现象需要满足什么样的条件？如果换一个环境，结果还会一样吗？公共生活不是只有大人才能关心的话题。学会倾听别人的需要、遵守共同的规则、用有条理的建议让学校和社区变得更好，就是最棒的公民素养。",
    "audio": {
      "female": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/female/daily-20261117-a9455a6e08.mp3",
      "male": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/male/daily-20261117-a9455a6e08.mp3"
    }
  },
  {
    "id": "daily-20261117-50acec3472",
    "topic": "简单政治",
    "title": "环保组织挑战墨西哥取消对世界上最小的江豚的保护",
    "source": "Mongabay Wildlife",
    "url": "https://news.mongabay.com/short-article/2026/11/environmental-groups-challenge-mexicos-rollback-of-protections-for-worlds-smallest-porpoise/",
    "date": "2026-11-17",
    "publishedDate": "2026-11-17",
    "lengthCategory": "short",
    "durationSec": 69,
    "script": "今天我们来聊聊社区与公共生活里的一个好办法，看看大家是如何商量着把事情办好的。最近，Mongabay Wildlife报道了一条关于“环保组织挑战墨西哥取消对世界上最小的江豚的保护”的新进展。具体是怎么回事呢？原来，墨西哥城——环保组织正在与加州湾放松的捕鱼法规作斗争，那里的最后一只小头鼠海豚，即世界上最小的鼠海豚，濒临灭绝。2026 年 10 月，法规的修改大幅减少了小头鼠海豚栖息地的禁止捕鱼区域。对此，多家环保组织提出要求。看到这样的发现，研究团队并没有只停留在表面现象上，而是进一步追问背后的原理：这个现象需要满足什么样的条件？如果换一个环境，结果还会一样吗？公共生活不是只有大人才能关心的话题。学会倾听别人的需要、遵守共同的规则、用有条理的建议让学校和社区变得更好，就是最棒的公民素养。",
    "audio": {
      "female": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/female/daily-20261117-50acec3472.mp3",
      "male": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/male/daily-20261117-50acec3472.mp3"
    }
  },
  {
    "id": "daily-20261116-4511c1d0c4",
    "topic": "简单政治",
    "title": "法律学者表示，解决环境问题的新道德方法将避免“问题转移”",
    "source": "Phys.org Biology",
    "url": "https://phys.org/news/2026-11-ethical-approach-environmental-issues-problem.html",
    "date": "2026-11-16",
    "publishedDate": "2026-11-16",
    "lengthCategory": "short",
    "durationSec": 55,
    "script": "几百万人住在一起的城市和地球村，怎样才能既公平又温暖地运转？这离不开公共规则的智慧。根据Phys.org Biology的最新分享，法律学者表示，解决环境问题的新道德方法将避免“问题转移”。近几十年来，当政府试图解决环境问题时，他们往往只是简单地将问题转移到其他地方，或者给其他人带来新的问题。堪萨斯大学法学教授等学者发表了一项研究，指出这种环境问题的转变，并提出“奇怪的循环伦理”作为重新思考关键法律问题的方法。为什么这件事值得我们留意呢？因为它展示了简单政治领域里一个正在发生的具体变化，让我们看到科学家和研究者是如何一步步用真实数据解开谜题的。",
    "audio": {
      "female": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/female/daily-20261116-4511c1d0c4.mp3",
      "male": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/male/daily-20261116-4511c1d0c4.mp3"
    }
  },
  {
    "id": "daily-20261115-3a2a31d759",
    "topic": "简单政治",
    "title": "没有服务员也没有收银台的“漂流图书亭”：社区里的信任规则是怎么运转的？",
    "source": "UNESCO 社区阅读倡议",
    "url": "https://www.unesco.org/little-free-library",
    "date": "2026-11-15",
    "publishedDate": "2026-11-15",
    "lengthCategory": "medium",
    "durationSec": 78,
    "script": "在许多城市的街角公园、社区广场和小学门口，你会看到一个个像彩色小鸟屋一样的木头书箱，里面整整齐齐摆着二三十本童话书、科普绘本和故事杂志。木箱既没有上锁，旁边也没有图书管理员看守，只写着一行简单的规则：“拿走一本书阅读，或放进一本你想分享的好书”。最初有人担心：如果不锁门也没人看管，里面的书会不会几天就被拿光了？社会学家在跟踪调查了全球数万个社区共享书箱后，发现了一个暖心的事实：绝大多数书箱不仅没有变空，里面的书反而越来越多、越来越丰富！因为当一个小朋友从书箱里借走一本喜欢的恐龙绘本时，他会感受到来自陌生邻居的善意；读完之后，他不仅会把书放回来，往往还会从自己书架上挑出两本已经读完的太空故事书放进去，还贴上一张手写的推荐卡片。这种“人人参与、彼此信任”的微小型公共空间，让孩子们从小体会到：当我们像爱护自己的家一样爱护公共物品时，整座社区就会变成大家共同的大书房。",
    "audio": {
      "female": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/female/daily-20261115-3a2a31d759.mp3",
      "male": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/male/daily-20261115-3a2a31d759.mp3"
    }
  },
  {
    "id": "daily-20261114-594d50e24b",
    "topic": "简单政治",
    "title": "为什么救护车车头上的英文单词常常是“反着印”的？马路上的公共安全巧思",
    "source": "城市公共安全设计",
    "url": "https://www.si.edu/ambulance-mirror-writing",
    "date": "2026-11-14",
    "publishedDate": "2026-11-14",
    "lengthCategory": "short",
    "durationSec": 46,
    "script": "如果你在街上留意观察急救中心开出来的救护车，有时会发现车头引擎盖上的英文字母或标志竟然是左右反过来印的，像照镜子一样！难道是印刷厂的工人不小心印反了吗？当然不是！这是专门为前方开车的司机设计的“后视镜正像字”。当救护车拉响警报在马路上疾驰时，走在它前面的小汽车司机是通过车内的后视镜往后看的。因为平面镜成像会左右颠倒，车头上反着印的字，在前方司机的后视镜里反射出来，恰好就变成了正立清晰的文字，让司机一眼认出救护车，立刻向两侧让出生命通道！",
    "audio": {
      "female": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/female/daily-20261114-594d50e24b.mp3",
      "male": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/male/daily-20261114-594d50e24b.mp3"
    }
  },
  {
    "id": "daily-20261114-23df0b4532",
    "topic": "简单政治",
    "title": "给野生大象和棕熊修一座跨过高速公路的“森林天桥”：城市建设如何与动物共享家园",
    "source": "National Geographic / 生态廊道工程",
    "url": "https://www.nationalgeographic.com/wildlife-crossings",
    "date": "2026-11-14",
    "publishedDate": "2026-11-14",
    "lengthCategory": "medium",
    "durationSec": 82,
    "script": "人类在山林和草原之间修起宽阔的高速公路与铁路后，开车出行虽然快了，却把原本连成一片的森林切成了两半。需要过马路找水源和同伴的野鹿、黑熊、穿山甲甚至亚洲象，面对呼啸而过的汽车既害怕又危险。怎样才能让公路畅通，又不挡住野生动物回家的路呢？在加拿大班夫国家公园、中国云南西双版纳和青藏铁路可可西里段，工程师与生态学家一起做了一件温暖的公共工程——为野生动物专门修建“生态廊道”！有些生态廊道是架在高速公路上方的宽阔天桥，桥面上不铺冷冰冰的水泥，而是铺上厚厚的森林泥土，种满当地的青草、灌木和松树，两边还立起隔音挡光墙，挡住汽车刺眼的车灯；还有些是修在高架桥下面的宽敞涵洞通道，比如青藏铁路专门为藏羚羊迁徙留出了三十三处桥下生命通道。红外相机拍下了动人的一幕：小熊跟着熊妈妈、小鹿跟着鹿群，熟门熟路地排着队走过绿树成荫的森林天桥，桥下汽车飞驰，桥上生灵漫步，人类与大自然达成了一份温柔的契约。",
    "audio": {
      "female": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/female/daily-20261114-23df0b4532.mp3",
      "male": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/male/daily-20261114-23df0b4532.mp3"
    }
  }
];

module.exports = {
  TOPICS,
  LENGTH_LABELS,
  PLAY_ICON_URI,
  PAUSE_ICON_URI,
  ART_TOPICS,
  BUNDLED_STORIES
};
