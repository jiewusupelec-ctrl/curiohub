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
    "id": "daily-20261128-01ec354ffe",
    "topic": "科学",
    "title": "Kimi 向科学家提供最高 2 万美元 API 免费额度",
    "source": "Solidot 奇客科学",
    "url": "https://www.solidot.org/story?sid=86015",
    "date": "2026-11-28",
    "publishedDate": "2026-11-28",
    "lengthCategory": "short",
    "durationSec": 47,
    "script": "在奇妙的科学世界里，往往藏着让人意想不到的真相。根据Solidot 奇客科学的最新分享，Kimi 向科学家提供最高 2 万美元 API 免费额度。Kimi 大模型开发商月之暗面宣布了 Kimi for Science 项目，欢迎自然科学、工程学及相关交叉学科领域的研究人员加入。月之暗面表示，“科学始终源于人类的好奇心、严谨的探索精神，以及对未知世界的不懈追求。为什么这件事值得我们留意呢？因为它展示了科学领域里一个正在发生的具体变化，让我们看到科学家和研究者是如何一步步用真实数据解开谜题的。",
    "audio": {
      "female": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/female/daily-20261128-01ec354ffe.mp3",
      "male": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/male/daily-20261128-01ec354ffe.mp3"
    }
  },
  {
    "id": "daily-20261128-c3062005ac",
    "topic": "科学",
    "title": "旅行者 1 号发回无法解读的信息",
    "source": "Solidot 奇客科学",
    "url": "https://www.solidot.org/story?sid=86009",
    "date": "2026-11-28",
    "publishedDate": "2026-11-28",
    "lengthCategory": "medium",
    "durationSec": 88,
    "script": "如果把日常习以为常的现象放到放大镜下，你会发现一个好玩的科学问题。最近，Solidot 奇客科学报道了一条关于“旅行者 1 号发回无法解读的信息”的新进展。具体是怎么回事呢？原来，北京时间 11 月 18 日 18 时 16 分 07 秒，旅行者 1 号与地球的距离达到约 259 亿公里，相当于光在真空中传播 24 小时的距离，也就是一光日。但与此同时旅行者 1 号出现了技术故障，给这一里程碑时刻蒙上了一层阴影。11 月 14 日旅行者 1 号发回的信号缺乏帧同步信息，意味着 NASA 无法解读接收到的科学数据或工程数据。遥测数据的缺乏让任务控制人员无法监测其运行状态，也无法获取其在星际空间收集到的测量结果。看到这样的发现，研究团队并没有只停留在表面现象上，而是进一步追问背后的原理：这个现象需要满足什么样的条件？如果换一个环境，结果还会一样吗？你看，无论是大实验还是小观察，只要多问一句“为什么会这样”，平平无奇的生活角落也会变成你的科学实验室。今天听到的小原理，晚上吃饭时可以考考爸爸妈妈哦！",
    "audio": {
      "female": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/female/daily-20261128-c3062005ac.mp3",
      "male": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/male/daily-20261128-c3062005ac.mp3"
    }
  },
  {
    "id": "daily-20261127-48a655642b",
    "topic": "科学",
    "title": "地球连续六天气温比工业化前水平高 2C",
    "source": "Solidot 奇客科学",
    "url": "https://www.solidot.org/story?sid=86001",
    "date": "2026-11-27",
    "publishedDate": "2026-11-27",
    "lengthCategory": "short",
    "durationSec": 48,
    "script": "今天我们来聊一个既有趣又可以跟家人一起讨论的科学新发现。根据Solidot 奇客科学的最新分享，地球连续六天气温比工业化前水平高 2C。根据欧盟哥白尼气候变化服务中心(C3S)的数据，全球气温已连续六天比工业化前水平高 2C。本周一全球日地表气温比工业化前水平高 2.24C 创历史新高，预计未来至少几天内气温仍将维持这一高位。为什么这件事值得我们留意呢？因为它展示了科学领域里一个正在发生的具体变化，让我们看到科学家和研究者是如何一步步用真实数据解开谜题的。",
    "audio": {
      "female": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/female/daily-20261127-48a655642b.mp3",
      "male": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/male/daily-20261127-48a655642b.mp3"
    }
  },
  {
    "id": "daily-20261127-688c220e8b",
    "topic": "科学",
    "title": "艾滋病疫苗终于触手可及",
    "source": "Solidot 奇客科学",
    "url": "https://www.solidot.org/story?sid=86000",
    "date": "2026-11-27",
    "publishedDate": "2026-11-27",
    "lengthCategory": "medium",
    "durationSec": 119,
    "script": "今天我们来聊一个既有趣又可以跟家人一起讨论的科学新发现。今天我们要深入聊聊来自Solidot 奇客科学的一篇特别报道：艾滋病疫苗终于触手可及。故事要从研究人员观察到的具体线索说起：本世纪初，南非 KwaZulu-Natal 省的一名年轻女性感染了 HIV。她本可能成为统计数字的一部分，但通过参与 HIV 研究她却给数百万人带来了希望。她被发现能对 HIV 病毒产生极其强烈的免疫反应。她需要在药物的帮助下才能控制病毒，但她体内的抗体被认为至今发现的最强效 HIV 抗体之一。在科学文献里她被称为 CAP256。科学家现在认为，通过模拟她感染 HIV 过程中的部分关键元素，能训练其他人的免疫系统产生同样强效的抗体去阻断多种不同的 HIV 毒株，最终研发出一种能彻底阻断 HIV 感染疫苗。把这条线索放到整个科学的大地图里来看，你会发现科学研究从来不是一蹴而就的。在得出结论之前，科研人员往往要先设计对照实验或者长期观测方案，把可能干扰结果的因素一个个排除掉，还要把测量数据公开出来，请世界各地的同行一起检验。对于我们十岁左右的小听众来说，理解这条新发现最好的办法，就是先抓住它最核心的那个变化：它到底解决了什么旧难题，或者推翻了哪一个过去的猜想？科学最迷人的地方，就是不把任何现象当成理所当然。下次在厨房、操场或雨后的路边看到奇怪的现象，不妨先提出一个猜想，再像科学家一样找证据验证它。",
    "audio": {
      "female": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/female/daily-20261127-688c220e8b.mp3",
      "male": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/male/daily-20261127-688c220e8b.mp3"
    }
  },
  {
    "id": "daily-20261126-20d103939f",
    "topic": "科学",
    "title": "EA Sports FC 利用 AI 数字重现已故解说员 John Mot…",
    "source": "Solidot 奇客科学",
    "url": "https://www.solidot.org/story?sid=85993",
    "date": "2026-11-26",
    "publishedDate": "2026-11-26",
    "lengthCategory": "short",
    "durationSec": 45,
    "script": "在奇妙的科学世界里，往往藏着让人意想不到的真相。根据Solidot 奇客科学的最新分享，EA Sports FC 利用 AI 数字重现已故解说员 John Mot…。EA 透露其足球游戏《EA Sports FC 27》利用 AI 数字重现了已故解说员 John Motson 的声音。Motson 于 2023 年去世，他曾长期担任 BBC Sport 首席解说员，也曾为 EA 足球游戏解说。为什么这件事值得我们留意呢？因为它展示了科学领域里一个正在发生的具体变化，让我们看到科学家和研究者是如何一步步用真实数据解开谜题的。",
    "audio": {
      "female": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/female/daily-20261126-20d103939f.mp3",
      "male": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/male/daily-20261126-20d103939f.mp3"
    }
  },
  {
    "id": "daily-20261126-c4adfb6d10",
    "topic": "科学",
    "title": "Claude 和 ChatGPT 在蛋白质结构预测和设计上挑战 Alpha…",
    "source": "Solidot 奇客科学",
    "url": "https://www.solidot.org/story?sid=85992",
    "date": "2026-11-26",
    "publishedDate": "2026-11-26",
    "lengthCategory": "medium",
    "durationSec": 81,
    "script": "今天我们来聊一个既有趣又可以跟家人一起讨论的科学新发现。最近，Solidot 奇客科学报道了一条关于“Claude 和 ChatGPT 在蛋白质结构预测和设计上挑战 Alpha…”的新进展。具体是怎么回事呢？原来，AI 生物科技公司 Phylo 研究员 Xinming Tu 本月初使用 OpenAI、Anthropic 和 Google 的大模型测试了它们预测鲜为人知细菌蛋白质序列的能力。他让分析程序运行了整晚，第二天对结果非常吃惊。Anthropic 最新版本的Claude 表现不仅优于其它大模型，而且超过了针对蛋白质序列训练过的专门工具。他与哈佛医学院的 Leo Chen 分享的这一发现在计算生物学界引发了热议。看到这样的发现，研究团队并没有只停留在表面现象上，而是进一步追问背后的原理：这个现象需要满足什么样的条件？如果换一个环境，结果还会一样吗？你看，无论是大实验还是小观察，只要多问一句“为什么会这样”，平平无奇的生活角落也会变成你的科学实验室。今天听到的小原理，晚上吃饭时可以考考爸爸妈妈哦！",
    "audio": {
      "female": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/female/daily-20261126-c4adfb6d10.mp3",
      "male": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/male/daily-20261126-c4adfb6d10.mp3"
    }
  },
  {
    "id": "daily-20261125-71363bc73f",
    "topic": "科学",
    "title": "基因工程烟草能用于高效合成抗癌药",
    "source": "Solidot 奇客科学",
    "url": "https://www.solidot.org/story?sid=85981",
    "date": "2026-11-25",
    "publishedDate": "2026-11-25",
    "lengthCategory": "short",
    "durationSec": 45,
    "script": "如果把日常习以为常的现象放到放大镜下，你会发现一个好玩的科学问题。根据Solidot 奇客科学的最新分享，基因工程烟草能用于高效合成抗癌药。紫杉醇（paclitaxel）是临床上应用最广泛的化疗药物之一，被大量用于治疗乳腺癌、卵巢癌和肺癌等多种恶性肿瘤。然而这种救命药最初提取自太平洋红豆杉的树皮，天然含量极低。为什么这件事值得我们留意呢？因为它展示了科学领域里一个正在发生的具体变化，让我们看到科学家和研究者是如何一步步用真实数据解开谜题的。",
    "audio": {
      "female": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/female/daily-20261125-71363bc73f.mp3",
      "male": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/male/daily-20261125-71363bc73f.mp3"
    }
  },
  {
    "id": "daily-20261125-64da9ece60",
    "topic": "科学",
    "title": "神舟二十四号计划 25 日 8 时发射",
    "source": "Solidot 奇客科学",
    "url": "https://www.solidot.org/story?sid=85977",
    "date": "2026-11-25",
    "publishedDate": "2026-11-25",
    "lengthCategory": "medium",
    "durationSec": 89,
    "script": "如果把日常习以为常的现象放到放大镜下，你会发现一个好玩的科学问题。最近，Solidot 奇客科学报道了一条关于“神舟二十四号计划 25 日 8 时发射”的新进展。具体是怎么回事呢？原来，中国载人航天工程办公室星期二（11月24日）宣布，神舟二十四号计划于星期三（11月25日）早上8时18分发射。航天员乘组由汤洪波（指令长）、武毅以及巴基斯坦航天员穆罕默德·齐尚·阿里（载荷专家）组成。其中巴基斯坦航天员穆罕默德·齐尚·阿里（Muhammad Zeeshan Ali）将成为首位到访中国天宫空间站的外籍航天员，执行短期任务后将随神舟二十三号乘组返回地球。航天员汤洪波执行过神舟十二号、神舟十七号载人飞行任务。看到这样的发现，研究团队并没有只停留在表面现象上，而是进一步追问背后的原理：这个现象需要满足什么样的条件？如果换一个环境，结果还会一样吗？科学最迷人的地方，就是不把任何现象当成理所当然。下次在厨房、操场或雨后的路边看到奇怪的现象，不妨先提出一个猜想，再像科学家一样找证据验证它。",
    "audio": {
      "female": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/female/daily-20261125-64da9ece60.mp3",
      "male": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/male/daily-20261125-64da9ece60.mp3"
    }
  },
  {
    "id": "daily-20261127-14c68956e4",
    "topic": "航天",
    "title": "FCC 批准 SpaceX 发射 100 万颗轨道数据中心卫星",
    "source": "Solidot 奇客科学",
    "url": "https://www.solidot.org/story?sid=85998",
    "date": "2026-11-27",
    "publishedDate": "2026-11-27",
    "lengthCategory": "medium",
    "durationSec": 76,
    "script": "来自航天发射场与空间站的新消息，带我们看看人类是如何一步步走向太空的。最近，Solidot 奇客科学报道了一条关于“FCC 批准 SpaceX 发射 100 万颗轨道数据中心卫星”的新进展。具体是怎么回事呢？原来，FCC 批准了 SpaceX 发射 100 万颗轨道数据中心卫星 Starmind 的申请。SpaceX 发射申请遭到了亚马逊、Viasat、美国天文学会等的反对。亚马逊认为该计划不切实际，SpaceX 建成 Starmind 星座将需要数百年的时间。FCC 主席 Brendan Carr 则反驳说亚马逊的宽带卫星星座 Kuiper 的进度也并不顺利。看到这样的发现，研究团队并没有只停留在表面现象上，而是进一步追问背后的原理：这个现象需要满足什么样的条件？如果换一个环境，结果还会一样吗？在太空探索中，没有任何一个细节是小事。从一颗螺丝钉到几万行导航代码，正是无数工程师的严谨配合，才让人类能够飞向月球与更远的星辰。",
    "audio": {
      "female": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/female/daily-20261127-14c68956e4.mp3",
      "male": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/male/daily-20261127-14c68956e4.mp3"
    }
  },
  {
    "id": "daily-20261126-397544c32c",
    "topic": "航天",
    "title": "撒哈拉之眼",
    "source": "NASA Image of the Day",
    "url": "https://www.nasa.gov/image-detail/iss075e0274930/",
    "date": "2026-11-26",
    "publishedDate": "2026-11-26",
    "lengthCategory": "short",
    "durationSec": 57,
    "script": "抬头望向星空，人类派出的航天器正在轨道和深空里执行新的任务。最近，NASA Image of the Day报道了一条关于“撒哈拉之眼”的新进展。具体是怎么回事呢？原来，理查特结构，也被称为“撒哈拉之眼”，是从国际空间站在非洲上空拍摄的照片，它是一个被侵蚀的地质圆顶，约有 1 亿年前的历史，是由毛里塔尼亚国家的火成岩活动和隆起形成的。看到这样的发现，研究团队并没有只停留在表面现象上，而是进一步追问背后的原理：这个现象需要满足什么样的条件？如果换一个环境，结果还会一样吗？每一次航天任务的突破，都是把不可能变成可能的过程。也许十几年后，正在听广播的你也能参与设计飞向深空的下一代探测器！",
    "audio": {
      "female": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/female/daily-20261126-397544c32c.mp3",
      "male": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/male/daily-20261126-397544c32c.mp3"
    }
  },
  {
    "id": "daily-20261125-cd3b3bc672",
    "topic": "航天",
    "title": "NASA 计划 2028 年发射验证核电推进技术的探测器",
    "source": "Solidot 奇客科学",
    "url": "https://www.solidot.org/story?sid=85991",
    "date": "2026-11-25",
    "publishedDate": "2026-11-25",
    "lengthCategory": "medium",
    "durationSec": 80,
    "script": "每一次火箭点火和探测器飞行背后，都藏着航天工程师的巧妙构思。最近，Solidot 奇客科学报道了一条关于“NASA 计划 2028 年发射验证核电推进技术的探测器”的新进展。具体是怎么回事呢？原来，NASA 计划 2028 年发射验证深空核电推进技术的探测器 Space Reactor‑1 Freedom（SR-1）。SR-1 将利用核能和太阳能将 SkyFall 舱送往火星，SkyFall 内有三架新一代直升机，这些直升机将研究火星的地质和气候历史，探索新地形，搜寻地下冰层的迹象。SR-1 将配备一台布雷顿闭式循环裂变反应堆，使用高纯度但低浓缩的铀作为燃料，能产生 20 千瓦以上的电力。看到这样的发现，研究团队并没有只停留在表面现象上，而是进一步追问背后的原理：这个现象需要满足什么样的条件？如果换一个环境，结果还会一样吗？每一次航天任务的突破，都是把不可能变成可能的过程。也许十几年后，正在听广播的你也能参与设计飞向深空的下一代探测器！",
    "audio": {
      "female": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/female/daily-20261125-cd3b3bc672.mp3",
      "male": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/male/daily-20261125-cd3b3bc672.mp3"
    }
  },
  {
    "id": "daily-20261123-fc3f35dac0",
    "topic": "航天",
    "title": "中国详细介绍了2030年之前载人登月的路线",
    "source": "Spaceflight News · NASASpaceflight",
    "url": "https://www.nasaspaceflight.com/2026/11/china-roundup-2026-11/",
    "date": "2026-11-23",
    "publishedDate": "2026-11-23",
    "lengthCategory": "short",
    "durationSec": 52,
    "script": "来自航天发射场与空间站的新消息，带我们看看人类是如何一步步走向太空的。最近，Spaceflight News · NASASpaceflight报道了一条关于“中国详细介绍了2030年之前载人登月的路线”的新进展。具体是怎么回事呢？原来，中国已经制定了迄今为止最详细的宇航员登月路线图……com。看到这样的发现，研究团队并没有只停留在表面现象上，而是进一步追问背后的原理：这个现象需要满足什么样的条件？如果换一个环境，结果还会一样吗？每一次航天任务的突破，都是把不可能变成可能的过程。也许十几年后，正在听广播的你也能参与设计飞向深空的下一代探测器！",
    "audio": {
      "female": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/female/daily-20261123-fc3f35dac0.mp3",
      "male": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/male/daily-20261123-fc3f35dac0.mp3"
    }
  },
  {
    "id": "daily-20261122-fa6a07c6e9",
    "topic": "航天",
    "title": "夜空中的人造卫星轨迹",
    "source": "Solidot 奇客科学",
    "url": "https://www.solidot.org/story?sid=85953",
    "date": "2026-11-22",
    "publishedDate": "2026-11-22",
    "lengthCategory": "short",
    "durationSec": 42,
    "script": "抬头望向星空，人类派出的航天器正在轨道和深空里执行新的任务。根据Solidot 奇客科学的最新分享，夜空中的人造卫星轨迹。新西兰天文摄影师 Brendan Larsen 在今年 9 月的一个晚上，历时逾两个小时拍摄了 578 张夜空照片。随后通过后期拼接呈现出如今地球轨道上卫星的密集程度。为什么这件事值得我们留意呢？因为它展示了航天领域里一个正在发生的具体变化，让我们看到科学家和研究者是如何一步步用真实数据解开谜题的。",
    "audio": {
      "female": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/female/daily-20261122-fa6a07c6e9.mp3",
      "male": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/male/daily-20261122-fa6a07c6e9.mp3"
    }
  },
  {
    "id": "daily-20261121-0f63a437fa",
    "topic": "航天",
    "title": "丹麦 GomSpace 获得 800 万欧元的蓝色起源月球任务合同",
    "source": "Spaceflight News · European Spaceflight",
    "url": "https://europeanspaceflight.com/denmarks-gomspace-secures-e8m-contract-for-blue-origin-moon-mission/",
    "date": "2026-11-21",
    "publishedDate": "2026-11-21",
    "lengthCategory": "medium",
    "durationSec": 95,
    "script": "每一次火箭点火和探测器飞行背后，都藏着航天工程师的巧妙构思。今天我们要深入聊聊来自Spaceflight News · European Spaceflight的一篇特别报道：丹麦 GomSpace 获得 800 万欧元的蓝色起源月球任务合同。故事要从研究人员观察到的具体线索说起：丹麦卫星制造商 GomSpace 获得了一份价值 800 万欧元的合同，继续为蓝色起源的月球资源勘探任务开发两艘航天器。在 11 月 19 日宣布启动该项目第二阶段开发的公告中，GomSpace 并未将 Blue Origin 视为客户，仅将其称为“北美领先的公司”。把这条线索放到整个航天的大地图里来看，你会发现科学研究从来不是一蹴而就的。在得出结论之前，科研人员往往要先设计对照实验或者长期观测方案，把可能干扰结果的因素一个个排除掉，还要把测量数据公开出来，请世界各地的同行一起检验。对于我们十岁左右的小听众来说，理解这条新发现最好的办法，就是先抓住它最核心的那个变化：它到底解决了什么旧难题，或者推翻了哪一个过去的猜想？在太空探索中，没有任何一个细节是小事。从一颗螺丝钉到几万行导航代码，正是无数工程师的严谨配合，才让人类能够飞向月球与更远的星辰。",
    "audio": {
      "female": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/female/daily-20261121-0f63a437fa.mp3",
      "male": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/male/daily-20261121-0f63a437fa.mp3"
    }
  },
  {
    "id": "daily-20261120-63dbb453e5",
    "topic": "航天",
    "title": "现场报道：SpaceX 将为美国太空部队发射机密有效载荷",
    "source": "Spaceflight News · Spaceflight Now",
    "url": "https://spaceflightnow.com/2026/11/19/live-coverage-spacex-to-launch-classified-payload-for-the-u-s-space-force-2/",
    "date": "2026-11-20",
    "publishedDate": "2026-11-20",
    "lengthCategory": "short",
    "durationSec": 40,
    "script": "抬头望向星空，人类派出的航天器正在轨道和深空里执行新的任务。根据Spaceflight News · Spaceflight Now的最新分享，现场报道：SpaceX 将为美国太空部队发射机密有效载荷。此次任务是美国太空军执行的一系列“R”任务中的最新一项。定于晚上 8:32 从东 4 号发射台起飞。为什么这件事值得我们留意呢？因为它展示了航天领域里一个正在发生的具体变化，让我们看到科学家和研究者是如何一步步用真实数据解开谜题的。",
    "audio": {
      "female": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/female/daily-20261120-63dbb453e5.mp3",
      "male": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/male/daily-20261120-63dbb453e5.mp3"
    }
  },
  {
    "id": "daily-20261119-2d55bf0a3e",
    "topic": "航天",
    "title": "航海者一号达到新的里程碑：距地球一光日",
    "source": "Spaceflight News · SpacePolicyOnline.com",
    "url": "https://spacepolicyonline.com/news/voyager-1-reaches-new-milestone-one-light-day-from-earth/",
    "date": "2026-11-19",
    "publishedDate": "2026-11-19",
    "lengthCategory": "short",
    "durationSec": 64,
    "script": "每一次火箭点火和探测器飞行背后，都藏着航天工程师的巧妙构思。最近，Spaceflight News · SpacePolicyOnline.com报道了一条关于“航海者一号达到新的里程碑：距地球一光日”的新进展。具体是怎么回事呢？原来，今天早上，美国国家航空航天局 (NASA) 航海者一号 (Voyager 1) 航天器实现了另一个里程碑。它于 1977 年发射升空，于 2012 年 8 月成为第一个进入星际空间的人类物体，迄今为止。看到这样的发现，研究团队并没有只停留在表面现象上，而是进一步追问背后的原理：这个现象需要满足什么样的条件？如果换一个环境，结果还会一样吗？在太空探索中，没有任何一个细节是小事。从一颗螺丝钉到几万行导航代码，正是无数工程师的严谨配合，才让人类能够飞向月球与更远的星辰。",
    "audio": {
      "female": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/female/daily-20261119-2d55bf0a3e.mp3",
      "male": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/male/daily-20261119-2d55bf0a3e.mp3"
    }
  },
  {
    "id": "daily-20261126-dc6fbeafb8",
    "topic": "太空",
    "title": "天文学家可能发现了一个诞生于第一批恒星之前的黑洞",
    "source": "ScienceDaily Matter & Energy",
    "url": "https://www.sciencedaily.com/releases/2026/11/261122060346.htm",
    "date": "2026-11-26",
    "publishedDate": "2026-11-26",
    "lengthCategory": "medium",
    "durationSec": 92,
    "script": "在距离地球几亿公里甚至几光年外的宇宙深处，天文学家又捕捉到了新的线索。今天我们要深入聊聊来自ScienceDaily Matter & Energy的一篇特别报道：天文学家可能发现了一个诞生于第一批恒星之前的黑洞。故事要从研究人员观察到的具体线索说起：一个名为菲比的神秘物体，在短暂放大一颗遥远恒星时被发现，它可能是大爆炸后形成的原始黑洞。据估计，它的质量仅为月球的三倍，它可能是一个 130 亿年前的宇宙遗迹，为解开暗物质之谜提供了新的线索。把这条线索放到整个太空的大地图里来看，你会发现科学研究从来不是一蹴而就的。在得出结论之前，科研人员往往要先设计对照实验或者长期观测方案，把可能干扰结果的因素一个个排除掉，还要把测量数据公开出来，请世界各地的同行一起检验。对于我们十岁左右的小听众来说，理解这条新发现最好的办法，就是先抓住它最核心的那个变化：它到底解决了什么旧难题，或者推翻了哪一个过去的猜想？宇宙浩瀚无垠，人类目前读懂的还只是万里星空中的小小一页。保持对夜空的好奇，每次抬头看星星时，你也在和天文学家一起眺望宇宙的历史。",
    "audio": {
      "female": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/female/daily-20261126-dc6fbeafb8.mp3",
      "male": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/male/daily-20261126-dc6fbeafb8.mp3"
    }
  },
  {
    "id": "daily-20261124-10ae625b7c",
    "topic": "太空",
    "title": "天文学家首次观察到恒星吞噬伴星并爆炸的过程",
    "source": "Solidot 奇客科学",
    "url": "https://www.solidot.org/story?sid=85966",
    "date": "2026-11-24",
    "publishedDate": "2026-11-24",
    "lengthCategory": "medium",
    "durationSec": 83,
    "script": "用空间望远镜看向浩瀚宇宙，远方的星球远比科幻故事还要奇妙。最近，Solidot 奇客科学报道了一条关于“天文学家首次观察到恒星吞噬伴星并爆炸的过程”的新进展。具体是怎么回事呢？原来，天文学家利用韦伯望远镜首次直接观察到仙女座的一颗巨大恒星吞噬伴星并爆炸的过程。当恒星演化至生命晚期，体积会急剧膨胀，可能吞噬附近轨道上的任何天体，在一个双星系统中，这被称为“共有包层阶段”。第一颗恒星外层会将自己的核心与第二颗恒星共同包裹，第二颗恒星不断损失轨道能量和角动量，释放的能量可加热并抛射包层。系统要么留下紧密双星，要么两颗恒星彻底并合。看到这样的发现，研究团队并没有只停留在表面现象上，而是进一步追问背后的原理：这个现象需要满足什么样的条件？如果换一个环境，结果还会一样吗？宇宙浩瀚无垠，人类目前读懂的还只是万里星空中的小小一页。保持对夜空的好奇，每次抬头看星星时，你也在和天文学家一起眺望宇宙的历史。",
    "audio": {
      "female": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/female/daily-20261124-10ae625b7c.mp3",
      "male": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/male/daily-20261124-10ae625b7c.mp3"
    }
  },
  {
    "id": "daily-20261123-d1e96f4988",
    "topic": "太空",
    "title": "一个神秘的间隙暗示从未爆炸的恒星诞生了黑洞",
    "source": "ScienceDaily Matter & Energy",
    "url": "https://www.sciencedaily.com/releases/2026/11/261121221126.htm",
    "date": "2026-11-23",
    "publishedDate": "2026-11-23",
    "lengthCategory": "medium",
    "durationSec": 87,
    "script": "在距离地球几亿公里甚至几光年外的宇宙深处，天文学家又捕捉到了新的线索。今天我们要深入聊聊来自ScienceDaily Matter & Energy的一篇特别报道：一个神秘的间隙暗示从未爆炸的恒星诞生了黑洞。故事要从研究人员观察到的具体线索说起：大质量恒星可能会悄悄塌缩成黑洞，而不会产生科学家通常预期的壮观的超新星爆炸。257 次黑洞合并的令人惊讶的模式表明，这些神秘的恒星消失可以解释整个宇宙中大量黑洞的起源。把这条线索放到整个太空的大地图里来看，你会发现科学研究从来不是一蹴而就的。在得出结论之前，科研人员往往要先设计对照实验或者长期观测方案，把可能干扰结果的因素一个个排除掉，还要把测量数据公开出来，请世界各地的同行一起检验。对于我们十岁左右的小听众来说，理解这条新发现最好的办法，就是先抓住它最核心的那个变化：它到底解决了什么旧难题，或者推翻了哪一个过去的猜想？从太阳系的行星风暴到遥远星系的脉冲信号，每一束穿越太空来到地球的光，都在告诉我们地球家园是多么独特而珍贵。",
    "audio": {
      "female": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/female/daily-20261123-d1e96f4988.mp3",
      "male": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/male/daily-20261123-d1e96f4988.mp3"
    }
  },
  {
    "id": "daily-20261122-901fc926ae",
    "topic": "太空",
    "title": "地球捕获了一颗迷你月球",
    "source": "Solidot 奇客科学",
    "url": "https://www.solidot.org/story?sid=85957",
    "date": "2026-11-22",
    "publishedDate": "2026-11-22",
    "lengthCategory": "long",
    "durationSec": 130,
    "script": "今天我们的太空望远镜对准了宇宙深处，去看看那里的星辰与行星。今天我们要深入聊聊来自Solidot 奇客科学的一篇特别报道：地球捕获了一颗迷你月球。故事要从研究人员观察到的具体线索说起：地球引力在今年四月捕获了一颗迷你小行星。这颗直径约 2 米的迷你月球将在地球轨道上一直停留到 12 月初，之后它将摆脱地球引力继续沿着绕太阳的轨道运行。由于其极其微小且暗淡，天文学家花了数周时间才确认它并非报废的人造卫星或卫星碎片。负责跟踪太阳系内小行星、彗星等天体的国际天文学联合会小行星中心在 10 月下旬将其命名为 2026 QQ8。地球其实并不缺乏迷你月球，天文学家曾多次用该名称描述被地球引力捕获的小行星：在地球轨道上停留约一年的 2006 RH120，绕地球运行约三年 2020 CD3。小行星中心主任 Matthew Payne 表示， 平均而言，在任何给定时刻，地球附近很可能存在类似的天体，它们通常会停留几周或几个月。把这条线索放到整个太空的大地图里来看，你会发现科学研究从来不是一蹴而就的。在得出结论之前，科研人员往往要先设计对照实验或者长期观测方案，把可能干扰结果的因素一个个排除掉，还要把测量数据公开出来，请世界各地的同行一起检验。对于我们十岁左右的小听众来说，理解这条新发现最好的办法，就是先抓住它最核心的那个变化：它到底解决了什么旧难题，或者推翻了哪一个过去的猜想？从太阳系的行星风暴到遥远星系的脉冲信号，每一束穿越太空来到地球的光，都在告诉我们地球家园是多么独特而珍贵。",
    "audio": {
      "female": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/female/daily-20261122-901fc926ae.mp3",
      "male": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/male/daily-20261122-901fc926ae.mp3"
    }
  },
  {
    "id": "daily-20261121-3e6c400ff3",
    "topic": "太空",
    "title": "地球 28 光年外发现一个三星系统",
    "source": "Solidot 奇客科学",
    "url": "https://www.solidot.org/story?sid=85955",
    "date": "2026-11-21",
    "publishedDate": "2026-11-21",
    "lengthCategory": "short",
    "durationSec": 41,
    "script": "今天我们的太空望远镜对准了宇宙深处，去看看那里的星辰与行星。根据Solidot 奇客科学的最新分享，地球 28 光年外发现一个三星系统。天文学家在距离地球 28 光年处发现了一个三星系统，挑战了对恒星演化的现有观念。该系统被命名为 Welopōʻa，包括两颗白矮星和一颗红矮星。为什么这件事值得我们留意呢？因为它展示了太空领域里一个正在发生的具体变化，让我们看到科学家和研究者是如何一步步用真实数据解开谜题的。",
    "audio": {
      "female": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/female/daily-20261121-3e6c400ff3.mp3",
      "male": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/male/daily-20261121-3e6c400ff3.mp3"
    }
  },
  {
    "id": "daily-20261120-90aae4b26a",
    "topic": "太空",
    "title": "美国宇航局好奇号火星探测器收集样本",
    "source": "NASA Image of the Day",
    "url": "https://www.nasa.gov/image-detail/pia26804/",
    "date": "2026-11-20",
    "publishedDate": "2026-11-20",
    "lengthCategory": "short",
    "durationSec": 36,
    "script": "用空间望远镜看向浩瀚宇宙，远方的星球远比科幻故事还要奇妙。根据NASA Image of the Day的最新分享，美国宇航局好奇号火星探测器收集样本。这幅拼贴画展示了 NASA 好奇号火星探测器截至 2026 年 11 月捕获的 49 个钻孔。为什么这件事值得我们留意呢？因为它展示了太空领域里一个正在发生的具体变化，让我们看到科学家和研究者是如何一步步用真实数据解开谜题的。",
    "audio": {
      "female": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/female/daily-20261120-90aae4b26a.mp3",
      "male": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/male/daily-20261120-90aae4b26a.mp3"
    }
  },
  {
    "id": "daily-20261119-adb130866a",
    "topic": "太空",
    "title": "建造月球基地的秘密可能隐藏在应急毯中",
    "source": "ScienceDaily Matter & Energy",
    "url": "https://www.sciencedaily.com/releases/2026/11/261115085549.htm",
    "date": "2026-11-19",
    "publishedDate": "2026-11-19",
    "lengthCategory": "short",
    "durationSec": 67,
    "script": "今天我们的太空望远镜对准了宇宙深处，去看看那里的星辰与行星。最近，ScienceDaily Matter & Energy报道了一条关于“建造月球基地的秘密可能隐藏在应急毯中”的新进展。具体是怎么回事呢？原来，科学家们将应急毯中使用的薄塑料变成了非常坚固的隔热材料，可以帮助宇航员在月球的极端温度下生存。这种材料由数百层堆叠而成，能够承受挤压压力而不会失去热保护能力，这可能为更坚固、更持久的月球栖息地铺平道路。看到这样的发现，研究团队并没有只停留在表面现象上，而是进一步追问背后的原理：这个现象需要满足什么样的条件？如果换一个环境，结果还会一样吗？宇宙浩瀚无垠，人类目前读懂的还只是万里星空中的小小一页。保持对夜空的好奇，每次抬头看星星时，你也在和天文学家一起眺望宇宙的历史。",
    "audio": {
      "female": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/female/daily-20261119-adb130866a.mp3",
      "male": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/male/daily-20261119-adb130866a.mp3"
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
    "id": "daily-20261127-84ae1b817b",
    "topic": "AI",
    "title": "图库平台充斥着生成式 AI 图像",
    "source": "Solidot 奇客科学",
    "url": "https://www.solidot.org/story?sid=85999",
    "date": "2026-11-27",
    "publishedDate": "2026-11-27",
    "lengthCategory": "short",
    "durationSec": 44,
    "script": "今天我们来看看人工智能实验室里刚刚发生的一件新鲜事。根据Solidot 奇客科学的最新分享，图库平台充斥着生成式 AI 图像。根据发表在《The Quarterly Journal of Economics》期刊上的一项研究，今天的大型图库平台充斥着生成式 AI 图像。研究针对了一个在 2022 年 12 月允许创作者销售 GenAI 生成图像的大型图库。为什么这件事值得我们留意呢？因为它展示了AI领域里一个正在发生的具体变化，让我们看到科学家和研究者是如何一步步用真实数据解开谜题的。",
    "audio": {
      "female": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/female/daily-20261127-84ae1b817b.mp3",
      "male": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/male/daily-20261127-84ae1b817b.mp3"
    }
  },
  {
    "id": "daily-20261127-dd15da10d6",
    "topic": "AI",
    "title": "Take-Two 无法阻止用户利用 AI 将 GTA 6 移植到 PC 上",
    "source": "Solidot 奇客科学",
    "url": "https://www.solidot.org/story?sid=86014",
    "date": "2026-11-27",
    "publishedDate": "2026-11-27",
    "lengthCategory": "medium",
    "durationSec": 116,
    "script": "当计算机拥有了向海量数据学习的本领，它会怎样帮人类观察世界呢？今天我们要深入聊聊来自Solidot 奇客科学的一篇特别报道：Take-Two 无法阻止用户利用 AI 将 GTA 6 移植到 PC 上。故事要从研究人员观察到的具体线索说起：GTA 6 开发商 Rockstar 的母公司 Take-Two 与微软和索尼签署了独占协议，这款备受瞩目的大作目前只有主机版本，PC 版本发布时间未知。但在 AI 工具的帮助下 PC 玩家正以惊人的速度将 GTA 6 移植到 PC 上。Take-Two 已采取行动，试图遏制这一行为：他们通过 DMCA 通知从 GitHub 上删除了逾 3000 个相关库。但这并没有放缓 PC 版本的移植速度。移植者们已经能利用 AMD 中端显卡 9070XT 和 FSR 超分辨率技术在 Linux 上实现稳定运行 30+ FPS。把这条线索放到整个AI的大地图里来看，你会发现科学研究从来不是一蹴而就的。在得出结论之前，科研人员往往要先设计对照实验或者长期观测方案，把可能干扰结果的因素一个个排除掉，还要把测量数据公开出来，请世界各地的同行一起检验。对于我们十岁左右的小听众来说，理解这条新发现最好的办法，就是先抓住它最核心的那个变化：它到底解决了什么旧难题，或者推翻了哪一个过去的猜想？人工智能是人类造出的强大助手，但它依然需要人类的好奇心、判断力和责任感来引导。学会提出好问题、核实真证据，才是未来最重要的本领。",
    "audio": {
      "female": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/female/daily-20261127-dd15da10d6.mp3",
      "male": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/male/daily-20261127-dd15da10d6.mp3"
    }
  },
  {
    "id": "daily-20261126-918cfc704c",
    "topic": "AI",
    "title": "人类酋长否认希望人类向人工智能“投降”自由意志",
    "source": "TechXplore AI",
    "url": "https://techxplore.com/news/2026-11-anthropic-chief-denies-humans-surrender.html",
    "date": "2026-11-26",
    "publishedDate": "2026-11-26",
    "lengthCategory": "medium",
    "durationSec": 86,
    "script": "人工智能不仅能聊天和画画，科学家正教它学习解决真正的科学难题。今天我们要深入聊聊来自TechXplore AI的一篇特别报道：人类酋长否认希望人类向人工智能“投降”自由意志。故事要从研究人员观察到的具体线索说起：Anthropic 首席执行官达里奥·阿莫迪 (Dario Amodei) 周三否认希望人类放弃人工智能的自由意志，称在竞争对手科技领导者的反对下将这个想法归咎于他是“荒谬的”。把这条线索放到整个AI的大地图里来看，你会发现科学研究从来不是一蹴而就的。在得出结论之前，科研人员往往要先设计对照实验或者长期观测方案，把可能干扰结果的因素一个个排除掉，还要把测量数据公开出来，请世界各地的同行一起检验。对于我们十岁左右的小听众来说，理解这条新发现最好的办法，就是先抓住它最核心的那个变化：它到底解决了什么旧难题，或者推翻了哪一个过去的猜想？人工智能是人类造出的强大助手，但它依然需要人类的好奇心、判断力和责任感来引导。学会提出好问题、核实真证据，才是未来最重要的本领。",
    "audio": {
      "female": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/female/daily-20261126-918cfc704c.mp3",
      "male": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/male/daily-20261126-918cfc704c.mp3"
    }
  },
  {
    "id": "daily-20261126-20ed4c2ea0",
    "topic": "AI",
    "title": "机器人在新加坡城市人工智能试验场漫游",
    "source": "TechXplore AI",
    "url": "https://techxplore.com/news/2026-11-robots-roam-singapore-urban-ai.html",
    "date": "2026-11-26",
    "publishedDate": "2026-11-26",
    "lengthCategory": "short",
    "durationSec": 38,
    "script": "当计算机拥有了向海量数据学习的本领，它会怎样帮人类观察世界呢？根据TechXplore AI的最新分享，机器人在新加坡城市人工智能试验场漫游。当咖啡洒在新加坡未来飞地的办公大楼里时，人工智能摄像头和传感器会检测到它并立即发送清洁机器人。为什么这件事值得我们留意呢？因为它展示了AI领域里一个正在发生的具体变化，让我们看到科学家和研究者是如何一步步用真实数据解开谜题的。",
    "audio": {
      "female": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/female/daily-20261126-20ed4c2ea0.mp3",
      "male": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/male/daily-20261126-20ed4c2ea0.mp3"
    }
  },
  {
    "id": "daily-20261125-fe02521d12",
    "topic": "AI",
    "title": "日本政府开发智能体打击盗版动漫",
    "source": "Solidot 奇客科学",
    "url": "https://www.solidot.org/story?sid=85988",
    "date": "2026-11-25",
    "publishedDate": "2026-11-25",
    "lengthCategory": "medium",
    "durationSec": 84,
    "script": "当计算机拥有了向海量数据学习的本领，它会怎样帮人类观察世界呢？最近，Solidot 奇客科学报道了一条关于“日本政府开发智能体打击盗版动漫”的新进展。具体是怎么回事呢？原来，日本文化厅正在测试一款 AI 智能体去自动识别和标记可能包含非法或盗版内容的动漫网站。测试结果显示其准确率极高。2025 财年针对国内的一项调查显示，AI 标记的 1168 条可疑 X 推文有 84% 是非法内容；AI 检测的 1564 个动画网站中 89% 含有盗版动画；1935 个漫画网站中盗版漫画比例高达 94%。2026 财年日本政府将监测范围扩大至海外。看到这样的发现，研究团队并没有只停留在表面现象上，而是进一步追问背后的原理：这个现象需要满足什么样的条件？如果换一个环境，结果还会一样吗？人工智能是人类造出的强大助手，但它依然需要人类的好奇心、判断力和责任感来引导。学会提出好问题、核实真证据，才是未来最重要的本领。",
    "audio": {
      "female": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/female/daily-20261125-fe02521d12.mp3",
      "male": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/male/daily-20261125-fe02521d12.mp3"
    }
  },
  {
    "id": "daily-20261124-0a0db5a406",
    "topic": "AI",
    "title": "国际空间站上的漂浮圆球机器人CIMON：宇航员在太空做实验时的AI小帮手",
    "source": "ESA 欧洲航天局科普",
    "url": "https://www.esa.int/Science_Exploration/Human_and_Robotic_Exploration/CIMON",
    "date": "2026-11-24",
    "publishedDate": "2026-11-24",
    "lengthCategory": "medium",
    "durationSec": 75,
    "script": "在国际空间站里，宇航员做科学实验时常常双手都占着：左手拿着移液管，右手扶着漂浮的样本袋。如果这时候想翻看实验说明书的下一页，或者拍一张实验记录照片，腾不出手来该怎么办呢？欧洲航天局和德国宇航中心为空间站送去了一位圆滚滚的AI机器人助手，名字叫“西蒙”（CIMON）。西蒙长得像一颗直径三十二厘米的白色排球，重量只有五公斤，正前方的屏幕上画着一张会眨眼、会微笑的卡通脸。因为太空舱里没有重力，西蒙不需要轮子也不需要腿，它肚子里装了十二个微型静音小风扇！通过向不同方向轻轻吹气，它就能在空间站走廊里自由自在地悬浮、转弯、前进，还能像小宠物一样乖乖停在宇航员面前。当宇航员喊一声它的名字，西蒙头部的定向麦克风就能听清语音指令，在屏幕上自动调出实验步骤图，或者用高清摄像头帮宇航员拍下实验视频，成了太空实验室里最受欢迎的智能搭档。",
    "audio": {
      "female": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/female/daily-20261124-0a0db5a406.mp3",
      "male": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/male/daily-20261124-0a0db5a406.mp3"
    }
  },
  {
    "id": "daily-20261124-1029f2057a",
    "topic": "AI",
    "title": "Google 申请专利为用户量身定制 AI 电视频道",
    "source": "Solidot 奇客科学",
    "url": "https://www.solidot.org/story?sid=85973",
    "date": "2026-11-24",
    "publishedDate": "2026-11-24",
    "lengthCategory": "medium",
    "durationSec": 90,
    "script": "人工智能不仅能聊天和画画，科学家正教它学习解决真正的科学难题。最近，Solidot 奇客科学报道了一条关于“Google 申请专利为用户量身定制 AI 电视频道”的新进展。具体是怎么回事呢？原来，Google 提交了一项专利申请，利用它所掌握的关于你的信息，创造一个由 AI 生成的电视频道。该频道将充满为你量身定制的节目：由你本人担任主角，同时还会穿插个性化定制的广告。该专利是 AI 视频技术未来发展方向的最新信号：企业和广告商通过收集大量与你相关的数据，自动生成源源不断、高度精准且完全个性化的内容。该专利被称为 creating a channel of video experiences tailored to a user，通过输入提示词要求大模型为用户生成定制视频，其中用户将扮演主角。看到这样的发现，研究团队并没有只停留在表面现象上，而是进一步追问背后的原理：这个现象需要满足什么样的条件？如果换一个环境，结果还会一样吗？当AI帮科学家处理海量数据时，人类就能腾出更多精力去思考更有创造力的问题。善用工具、独立思考，你也能和AI一起探索未知世界。",
    "audio": {
      "female": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/female/daily-20261124-1029f2057a.mp3",
      "male": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/male/daily-20261124-1029f2057a.mp3"
    }
  },
  {
    "id": "daily-20261123-5db93cc56e",
    "topic": "AI",
    "title": "人工智能代理团队能否重现人类决策的连锁反应？",
    "source": "TechXplore AI",
    "url": "https://techxplore.com/news/2026-11-teams-ai-agents-recreate-chain.html",
    "date": "2026-11-23",
    "publishedDate": "2026-11-23",
    "lengthCategory": "medium",
    "durationSec": 91,
    "script": "人工智能不仅能聊天和画画，科学家正教它学习解决真正的科学难题。今天我们要深入聊聊来自TechXplore AI的一篇特别报道：人工智能代理团队能否重现人类决策的连锁反应？。故事要从研究人员观察到的具体线索说起：2020 年 COVID-19 大流行之初，人们囤积卫生纸。根据 Woolworths 连锁超市 2020 年年度报告，仅澳大利亚人就在一周内从该连锁超市购买了 3970 万个面包卷。这并不是唯一一次对短缺的恐惧升级。把这条线索放到整个AI的大地图里来看，你会发现科学研究从来不是一蹴而就的。在得出结论之前，科研人员往往要先设计对照实验或者长期观测方案，把可能干扰结果的因素一个个排除掉，还要把测量数据公开出来，请世界各地的同行一起检验。对于我们十岁左右的小听众来说，理解这条新发现最好的办法，就是先抓住它最核心的那个变化：它到底解决了什么旧难题，或者推翻了哪一个过去的猜想？人工智能是人类造出的强大助手，但它依然需要人类的好奇心、判断力和责任感来引导。学会提出好问题、核实真证据，才是未来最重要的本领。",
    "audio": {
      "female": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/female/daily-20261123-5db93cc56e.mp3",
      "male": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/male/daily-20261123-5db93cc56e.mp3"
    }
  },
  {
    "id": "daily-20261126-3ab0165421",
    "topic": "科技",
    "title": "IBM量子计算机在短短15分钟内解决了传统计算机无法解决的问题",
    "source": "ScienceDaily AI & Math",
    "url": "https://www.sciencedaily.com/releases/2026/11/261123231244.htm",
    "date": "2026-11-26",
    "publishedDate": "2026-11-26",
    "lengthCategory": "short",
    "durationSec": 69,
    "script": "一项好的工程与科技，能把实验室里的物理原理变成守护生活的超级工具。最近，ScienceDaily AI & Math报道了一条关于“IBM量子计算机在短短15分钟内解决了传统计算机无法解决的问题”的新进展。具体是怎么回事呢？原来，IBM 和芝加哥大学的研究人员证明，量子计算机可以在短短 15 分钟内完成极其复杂的计算，超出了领先的经典计算方法的实际能力。一种新颖的错误检测技术还使科学家能够对结果的准确性建立信心，克服量子计算的主要障碍。看到这样的发现，研究团队并没有只停留在表面现象上，而是进一步追问背后的原理：这个现象需要满足什么样的条件？如果换一个环境，结果还会一样吗？每一项大国工程和日常科技背后，都凝结着物理、材料和数学的智慧。留心观察身边的桥梁、列车和屏幕，你会发现科学就在脚下。",
    "audio": {
      "female": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/female/daily-20261126-3ab0165421.mp3",
      "male": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/male/daily-20261126-3ab0165421.mp3"
    }
  },
  {
    "id": "daily-20261123-fb014a1e7e",
    "topic": "科技",
    "title": "星际太阳帆在75%光速时遇到奇怪问题",
    "source": "ScienceDaily Matter & Energy",
    "url": "https://www.sciencedaily.com/releases/2026/11/261120071305.htm",
    "date": "2026-11-23",
    "publishedDate": "2026-11-23",
    "lengthCategory": "short",
    "durationSec": 67,
    "script": "今天的科技故事，带大家拆开现代工程里的一个巧妙设计。最近，ScienceDaily Matter & Energy报道了一条关于“星际太阳帆在75%光速时遇到奇怪问题”的新进展。具体是怎么回事呢？原来，科学家们发现了星际旅行的一个令人惊讶的障碍：在极端速度下，推动未来太阳帆的光实际上可能开始减慢它们的速度。一旦航天器达到光速的 75%，一些散射光就会开始产生阻力，这可能会使人类到达遥远恒星的计划变得复杂。看到这样的发现，研究团队并没有只停留在表面现象上，而是进一步追问背后的原理：这个现象需要满足什么样的条件？如果换一个环境，结果还会一样吗？每一项大国工程和日常科技背后，都凝结着物理、材料和数学的智慧。留心观察身边的桥梁、列车和屏幕，你会发现科学就在脚下。",
    "audio": {
      "female": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/female/daily-20261123-fb014a1e7e.mp3",
      "male": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/male/daily-20261123-fb014a1e7e.mp3"
    }
  },
  {
    "id": "daily-20261123-3f6729e1f5",
    "topic": "科技",
    "title": "激光聚焦世界之巅",
    "source": "NASA Earth Observatory",
    "url": "https://science.nasa.gov/earth/earth-observatory/laser-focus-at-the-top-of-the-world/",
    "date": "2026-11-23",
    "publishedDate": "2026-11-23",
    "lengthCategory": "short",
    "durationSec": 52,
    "script": "一项好的工程与科技，能把实验室里的物理原理变成守护生活的超级工具。最近，NASA Earth Observatory报道了一条关于“激光聚焦世界之巅”的新进展。具体是怎么回事呢？原来，美国宇航局开发的下一代大地测量仪器是帮助测量卫星轨道和地球形状的网络的一部分，已在挪威斯瓦尔巴群岛首次亮相。看到这样的发现，研究团队并没有只停留在表面现象上，而是进一步追问背后的原理：这个现象需要满足什么样的条件？如果换一个环境，结果还会一样吗？真正优秀的科技，不一定要看起来炫酷复杂，而是能稳稳当当地解决问题，让人们的生活更安全、更环保、更方便。",
    "audio": {
      "female": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/female/daily-20261123-3f6729e1f5.mp3",
      "male": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/male/daily-20261123-3f6729e1f5.mp3"
    }
  },
  {
    "id": "daily-20261120-25b27a09eb",
    "topic": "科技",
    "title": "只有一个原子厚的材料揭示了一个奇怪的量子秘密",
    "source": "ScienceDaily Matter & Energy",
    "url": "https://www.sciencedaily.com/releases/2026/11/261115085554.htm",
    "date": "2026-11-20",
    "publishedDate": "2026-11-20",
    "lengthCategory": "short",
    "durationSec": 68,
    "script": "在我们的城市、海洋与天空背后，许多看不见的硬核科技正在安静运转。最近，ScienceDaily Matter & Energy报道了一条关于“只有一个原子厚的材料揭示了一个奇怪的量子秘密”的新进展。具体是怎么回事呢？原来，大阪大学的研究人员发现，在单原子厚度的材料和金属之间的边界处形成了一种显着的量子态。他们观察到电子的行为就好像它们异常重一样，包括超薄层与其下方的铜之间相互作用产生的以前未见过的状态。这一史无前例的观察揭示了一种有前途的控制奇异量子行为的新方法。看到这样的发现，研究团队并没有只停留在表面现象上，而是进一步追问背后的原理：这个现象需要满足什么样的条件？如果换一个环境，结果还会一样吗？真正优秀的科技，不一定要看起来炫酷复杂，而是能稳稳当当地解决问题，让人们的生活更安全、更环保、更方便。",
    "audio": {
      "female": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/female/daily-20261120-25b27a09eb.mp3",
      "male": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/male/daily-20261120-25b27a09eb.mp3"
    }
  },
  {
    "id": "daily-20261120-f750f2f329",
    "topic": "科技",
    "title": "巴基斯坦太阳能革命如此成功，国家电网却落后了",
    "source": "BBC Science & Environment",
    "url": "https://www.bbc.co.uk/news/articles/ckvg2n2q3103o?at_medium=RSS&at_campaign=rss",
    "date": "2026-11-20",
    "publishedDate": "2026-11-20",
    "lengthCategory": "medium",
    "durationSec": 77,
    "script": "在我们的城市、海洋与天空背后，许多看不见的硬核科技正在安静运转。今天我们要深入聊聊来自BBC Science & Environment的一篇特别报道：巴基斯坦太阳能革命如此成功，国家电网却落后了。故事要从研究人员观察到的具体线索说起：人们安装自己的太阳能电池板帮助巴基斯坦太阳能发电比例从 1% 提高到 28%。把这条线索放到整个科技的大地图里来看，你会发现科学研究从来不是一蹴而就的。在得出结论之前，科研人员往往要先设计对照实验或者长期观测方案，把可能干扰结果的因素一个个排除掉，还要把测量数据公开出来，请世界各地的同行一起检验。对于我们十岁左右的小听众来说，理解这条新发现最好的办法，就是先抓住它最核心的那个变化：它到底解决了什么旧难题，或者推翻了哪一个过去的猜想？真正优秀的科技，不一定要看起来炫酷复杂，而是能稳稳当当地解决问题，让人们的生活更安全、更环保、更方便。",
    "audio": {
      "female": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/female/daily-20261120-f750f2f329.mp3",
      "male": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/male/daily-20261120-f750f2f329.mp3"
    }
  },
  {
    "id": "daily-20261119-d2727c0a8b",
    "topic": "科技",
    "title": "量子计算机变得太强大而无法检查。科学家有办法",
    "source": "ScienceDaily AI & Math",
    "url": "https://www.sciencedaily.com/releases/2026/11/261115085557.htm",
    "date": "2026-11-19",
    "publishedDate": "2026-11-19",
    "lengthCategory": "medium",
    "durationSec": 94,
    "script": "在我们的城市、海洋与天空背后，许多看不见的硬核科技正在安静运转。今天我们要深入聊聊来自ScienceDaily AI & Math的一篇特别报道：量子计算机变得太强大而无法检查。科学家有办法。故事要从研究人员观察到的具体线索说起：科学家们开发了一种新方法来确定量子模拟是否可信，解决了随着量子计算机变得过于强大而传统机器无法检查的日益严重的问题。该技术在 51 量子位系统上进行了演示，可测量不确定性并提供可验证的误差范围，有助于释放量子计算的全部潜力。把这条线索放到整个科技的大地图里来看，你会发现科学研究从来不是一蹴而就的。在得出结论之前，科研人员往往要先设计对照实验或者长期观测方案，把可能干扰结果的因素一个个排除掉，还要把测量数据公开出来，请世界各地的同行一起检验。对于我们十岁左右的小听众来说，理解这条新发现最好的办法，就是先抓住它最核心的那个变化：它到底解决了什么旧难题，或者推翻了哪一个过去的猜想？每一项大国工程和日常科技背后，都凝结着物理、材料和数学的智慧。留心观察身边的桥梁、列车和屏幕，你会发现科学就在脚下。",
    "audio": {
      "female": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/female/daily-20261119-d2727c0a8b.mp3",
      "male": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/male/daily-20261119-d2727c0a8b.mp3"
    }
  },
  {
    "id": "daily-20261119-d6d7c98100",
    "topic": "科技",
    "title": "新发现揭示了可能阻碍室温超导体发展的因素",
    "source": "ScienceDaily Matter & Energy",
    "url": "https://www.sciencedaily.com/releases/2026/11/261116023358.htm",
    "date": "2026-11-19",
    "publishedDate": "2026-11-19",
    "lengthCategory": "short",
    "durationSec": 48,
    "script": "在我们的城市、海洋与天空背后，许多看不见的硬核科技正在安静运转。根据ScienceDaily Matter & Energy的最新分享，新发现揭示了可能阻碍室温超导体发展的因素。超导研究的一项重大突破表明，电流无阻力流动的基本成分之一可以在室温下存在。科学家发现，电子可以在比之前理解的温度高得多的温度下形成稳定的电子对，这表明可能有另一个障碍阻碍了室温超导性。为什么这件事值得我们留意呢？因为它展示了科技领域里一个正在发生的具体变化，让我们看到科学家和研究者是如何一步步用真实数据解开谜题的。",
    "audio": {
      "female": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/female/daily-20261119-d6d7c98100.mp3",
      "male": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/male/daily-20261119-d6d7c98100.mp3"
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
    "id": "daily-20261127-2852e52abb",
    "topic": "金融",
    "title": "欧盟委员会称浏览器竞争是 DMA 优先事项",
    "source": "Solidot 奇客科学",
    "url": "https://www.solidot.org/story?sid=86012",
    "date": "2026-11-27",
    "publishedDate": "2026-11-27",
    "lengthCategory": "short",
    "durationSec": 55,
    "script": "用经济学家的眼光看生活，你会发现数字和价格背后有一套好玩的逻辑。根据Solidot 奇客科学的最新分享，欧盟委员会称浏览器竞争是 DMA 优先事项。欧盟委员会回应了 Open Web Advocacy 的公开信，认可浏览器是互联网的入口，是内容出版商触达读者的主要方式，而浏览器竞争是 DMA（Digital Markets Act）的优先事项。欧盟委员会表示，目前正就相关事宜进行磋商，确保竞争对手的浏览器能在 iPhone 和 iPad 上与 Safari 展开有效竞争。为什么这件事值得我们留意呢？因为它展示了金融领域里一个正在发生的具体变化，让我们看到科学家和研究者是如何一步步用真实数据解开谜题的。",
    "audio": {
      "female": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/female/daily-20261127-2852e52abb.mp3",
      "male": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/male/daily-20261127-2852e52abb.mp3"
    }
  },
  {
    "id": "daily-20261123-a47ec283e1",
    "topic": "金融",
    "title": "当上升流失败时，巴拿马的鱼油贸易在几个月内崩溃",
    "source": "Phys.org Earth",
    "url": "https://phys.org/news/2026-11-upwelling-panama-fish-oil-collapsed.html",
    "date": "2026-11-23",
    "publishedDate": "2026-11-23",
    "lengthCategory": "short",
    "durationSec": 66,
    "script": "买东西、存零花钱、管理资源，日常生活里的每个选择其实都藏着经济学智慧。最近，Phys.org Earth报道了一条关于“当上升流失败时，巴拿马的鱼油贸易在几个月内崩溃”的新进展。具体是怎么回事呢？原来，巴拿马史密森热带研究所 (STRI) 的科学家报告了首次有记录的巴拿马湾季节性上升流失效一年后，一项后续研究现在利用渔业公司很少分享的记录，记录了这种失效如何通过系统从风到浮游生物到鱼类再到出口。看到这样的发现，研究团队并没有只停留在表面现象上，而是进一步追问背后的原理：这个现象需要满足什么样的条件？如果换一个环境，结果还会一样吗？懂得金融和经济知识，不是为了数钱，而是为了明白每一份劳动、每一份信任和每一次选择背后的价值，做自己时间和零花钱的聪明小主人。",
    "audio": {
      "female": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/female/daily-20261123-a47ec283e1.mp3",
      "male": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/male/daily-20261123-a47ec283e1.mp3"
    }
  },
  {
    "id": "daily-20261123-17d3f552bb",
    "topic": "金融",
    "title": "成功“绿色预算”的关键已揭晓",
    "source": "Phys.org Earth",
    "url": "https://phys.org/news/2026-11-key-successful-green-uncovered.html",
    "date": "2026-11-23",
    "publishedDate": "2026-11-23",
    "lengthCategory": "short",
    "durationSec": 45,
    "script": "用经济学家的眼光看生活，你会发现数字和价格背后有一套好玩的逻辑。根据Phys.org Earth的最新分享，成功“绿色预算”的关键已揭晓。一个研究小组已经确定了“绿色预算”（应对气候变化的核心财政政策）取得成功所需的基本条件。该团队由成均馆大学 (SKKU) 管理研究生院的 Rosa Minhyo Cho 教授（博士生 Minjung Kim 为第一作者）领导。为什么这件事值得我们留意呢？因为它展示了金融领域里一个正在发生的具体变化，让我们看到科学家和研究者是如何一步步用真实数据解开谜题的。",
    "audio": {
      "female": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/female/daily-20261123-17d3f552bb.mp3",
      "male": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/male/daily-20261123-17d3f552bb.mp3"
    }
  },
  {
    "id": "daily-20261122-7ed9eb58c1",
    "topic": "金融",
    "title": "Waymo 无人驾驶出租车因旧金山洪水而陷入困境",
    "source": "Solidot 奇客科学",
    "url": "https://www.solidot.org/story?sid=85958",
    "date": "2026-11-22",
    "publishedDate": "2026-11-22",
    "lengthCategory": "short",
    "durationSec": 62,
    "script": "买东西、存零花钱、管理资源，日常生活里的每个选择其实都藏着经济学智慧。根据Solidot 奇客科学的最新分享，Waymo 无人驾驶出租车因旧金山洪水而陷入困境。无人驾驶汽车暂时还无法应付洪水淹没道路的情况：今年早些时候 Waymo 的无人驾驶出租车因亚特兰大的洪水而受困；本周旧金山遭遇强降雨，多处街道被淹，这也导致了多辆 Waymo 汽车受困。Golden Gate Park Panhandle 旁的 Oak 街有两条车道被淹，积水从井盖涌出，Waymo 汽车停在了井盖前，堵住了一条可通行的车道，迫使后面的汽车从水更深的车道绕路。为什么这件事值得我们留意呢？因为它展示了金融领域里一个正在发生的具体变化，让我们看到科学家和研究者是如何一步步用真实数据解开谜题的。",
    "audio": {
      "female": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/female/daily-20261122-7ed9eb58c1.mp3",
      "male": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/male/daily-20261122-7ed9eb58c1.mp3"
    }
  },
  {
    "id": "daily-20261122-b05e0b3ce5",
    "topic": "金融",
    "title": "丰田尼桑本田同意标准化零部件以降低成本",
    "source": "Solidot 奇客科学",
    "url": "https://www.solidot.org/story?sid=85956",
    "date": "2026-11-22",
    "publishedDate": "2026-11-22",
    "lengthCategory": "short",
    "durationSec": 49,
    "script": "钱和交易是怎么让全世界的人们互相合作的？今天我们来看一个有趣的金融故事。根据Solidot 奇客科学的最新分享，丰田尼桑本田同意标准化零部件以降低成本。日本三大汽车制造商丰田、尼桑和本田同意推进零部件标准化以降低制造成本。短期内标准化工作将从三个方面入手：统一钢材的质量标准、规范塑料和树脂的相关技术要求，统一线束的颜色编码方案。为什么这件事值得我们留意呢？因为它展示了金融领域里一个正在发生的具体变化，让我们看到科学家和研究者是如何一步步用真实数据解开谜题的。",
    "audio": {
      "female": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/female/daily-20261122-b05e0b3ce5.mp3",
      "male": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/male/daily-20261122-b05e0b3ce5.mp3"
    }
  },
  {
    "id": "daily-20261121-2aa33f0a58",
    "topic": "金融",
    "title": "GTA 6 首日销售额达到创纪录的 37.9 亿美元",
    "source": "Solidot 奇客科学",
    "url": "https://www.solidot.org/story?sid=85951",
    "date": "2026-11-21",
    "publishedDate": "2026-11-21",
    "lengthCategory": "medium",
    "durationSec": 76,
    "script": "钱和交易是怎么让全世界的人们互相合作的？今天我们来看一个有趣的金融故事。最近，Solidot 奇客科学报道了一条关于“GTA 6 首日销售额达到创纪录的 37.9 亿美元”的新进展。具体是怎么回事呢？原来，GTA 6 开发商 Rockstar Games 母公司 Take-Two Interactive 披露，游戏的预购加上首日销售额达到创纪录的了 37.9 亿美元。这是娱乐产品历史上金额最高的首日收入，超过了《复仇者联盟 4：终局之战》的全球总票房 29 亿美元。Take-Two 未公布游戏具体的销售数量。GTA 6 的开发成本据估计可能超过 15 亿美元，为史上最昂贵的游戏。看到这样的发现，研究团队并没有只停留在表面现象上，而是进一步追问背后的原理：这个现象需要满足什么样的条件？如果换一个环境，结果还会一样吗？无论是古代的纸币还是现代的消费选择，守信用、看长远、不盲目跟风，都是跨越几百年依然管用的生活智慧。",
    "audio": {
      "female": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/female/daily-20261121-2aa33f0a58.mp3",
      "male": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/male/daily-20261121-2aa33f0a58.mp3"
    }
  },
  {
    "id": "daily-20261120-fddde9ec8f",
    "topic": "金融",
    "title": "为非洲提供更多气候资金？欧洲表示使用已经承诺的资金",
    "source": "BBC Science & Environment",
    "url": "https://www.bbc.co.uk/news/articles/c6074k5jjrzko?at_medium=RSS&at_campaign=rss",
    "date": "2026-11-20",
    "publishedDate": "2026-11-20",
    "lengthCategory": "short",
    "durationSec": 55,
    "script": "买东西、存零花钱、管理资源，日常生活里的每个选择其实都藏着经济学智慧。最近，BBC Science & Environment报道了一条关于“为非洲提供更多气候资金？欧洲表示使用已经承诺的资金”的新进展。具体是怎么回事呢？原来，非洲国家在土耳其举行的联合国气候峰会上要求发达国家提供更多资金，帮助他们应对气候变化。看到这样的发现，研究团队并没有只停留在表面现象上，而是进一步追问背后的原理：这个现象需要满足什么样的条件？如果换一个环境，结果还会一样吗？无论是古代的纸币还是现代的消费选择，守信用、看长远、不盲目跟风，都是跨越几百年依然管用的生活智慧。",
    "audio": {
      "female": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/female/daily-20261120-fddde9ec8f.mp3",
      "male": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/male/daily-20261120-fddde9ec8f.mp3"
    }
  },
  {
    "id": "daily-20261120-d24dce5338",
    "topic": "金融",
    "title": "Visa、Mastercard 和 JPMorgan 证实客户数据泄露",
    "source": "Solidot 奇客科学",
    "url": "https://www.solidot.org/story?sid=85939",
    "date": "2026-11-20",
    "publishedDate": "2026-11-20",
    "lengthCategory": "short",
    "durationSec": 50,
    "script": "买东西、存零花钱、管理资源，日常生活里的每个选择其实都藏着经济学智慧。根据Solidot 奇客科学的最新分享，Visa、Mastercard 和 JPMorgan 证实客户数据泄露。Visa、Mastercard 和摩根大通（JPMorgan）披露客户数据泄露，但数据是通过第三方服务提供商泄漏的，它们自身的核心系统或支付网络都未受影响。泄漏的数据包括姓名、电邮地址，部分还包含电话号码和邮编。为什么这件事值得我们留意呢？因为它展示了金融领域里一个正在发生的具体变化，让我们看到科学家和研究者是如何一步步用真实数据解开谜题的。",
    "audio": {
      "female": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/female/daily-20261120-d24dce5338.mp3",
      "male": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/male/daily-20261120-d24dce5338.mp3"
    }
  },
  {
    "id": "daily-20261126-91374f1def",
    "topic": "地理",
    "title": "科学家在红海下方一英里多处发现神秘湖泊",
    "source": "ScienceDaily Plants & Animals",
    "url": "https://www.sciencedaily.com/releases/2026/11/261125045259.htm",
    "date": "2026-11-26",
    "publishedDate": "2026-11-26",
    "lengthCategory": "short",
    "durationSec": 68,
    "script": "旋转地球仪，高山、深海、沙漠和季风正在地球表面上演跨越千里的联动。最近，ScienceDaily Plants & Animals报道了一条关于“科学家在红海下方一英里多处发现神秘湖泊”的新进展。具体是怎么回事呢？原来，在红海表面一英里多的地方，科学家们发现了罕见的水下湖泊，这些湖泊可以揭示有关地球古代海洋的秘密以及外星生命的可能性。这些极咸、无氧的环境被称为盐水池，令人惊讶地充满了微生物，挑战了我们对生物体可以生存的理解。看到这样的发现，研究团队并没有只停留在表面现象上，而是进一步追问背后的原理：这个现象需要满足什么样的条件？如果换一个环境，结果还会一样吗？地球不是一块块孤立拼图的堆砌，沙漠的风、大洋的流、高山的雪都在互相影响。读懂了地理，你手里的地图就会变成一部立体的地球百科全书。",
    "audio": {
      "female": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/female/daily-20261126-91374f1def.mp3",
      "male": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/male/daily-20261126-91374f1def.mp3"
    }
  },
  {
    "id": "daily-20261126-cfea6ef40c",
    "topic": "地理",
    "title": "在决议岛寻求庇护",
    "source": "NASA Earth Observatory",
    "url": "https://science.nasa.gov/earth/earth-observatory/seeking-refuge-on-resolution-island/",
    "date": "2026-11-26",
    "publishedDate": "2026-11-26",
    "lengthCategory": "short",
    "durationSec": 51,
    "script": "今天我们跟着地理学家的脚步，去探索地球上一个奇特的角落。最近，NASA Earth Observatory报道了一条关于“在决议岛寻求庇护”的新进展。具体是怎么回事呢？原来，新西兰人长期以来一直希望该岛成为本地鸟类的无捕食者区域，但游泳的白鼬也表现出了自己的决心。看到这样的发现，研究团队并没有只停留在表面现象上，而是进一步追问背后的原理：这个现象需要满足什么样的条件？如果换一个环境，结果还会一样吗？跨越山海的地理故事告诉我们，哪怕相隔万里，不同大陆的气候与生态也紧紧相连。爱护我们身边的环境，就是在守护整颗蓝色星球。",
    "audio": {
      "female": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/female/daily-20261126-cfea6ef40c.mp3",
      "male": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/male/daily-20261126-cfea6ef40c.mp3"
    }
  },
  {
    "id": "daily-20261124-23e31b5322",
    "topic": "地理",
    "title": "越来越多的年轻远足者因过于依赖 Google Maps 迷路或遇险",
    "source": "Solidot 奇客科学",
    "url": "https://www.solidot.org/story?sid=85970",
    "date": "2026-11-24",
    "publishedDate": "2026-11-24",
    "lengthCategory": "short",
    "durationSec": 54,
    "script": "地图上的每一条海岸线、每一座雪山，都有一段跨越百万年的地理传奇。根据Solidot 奇客科学的最新分享，越来越多的年轻远足者因过于依赖 Google Maps 迷路或遇险。救援人员表示，越来越多的年轻远足者因过于依赖 Google Maps 导航而迷路或遇险。救援组织 Wasdale Mountain Rescue Team 在一次救援行动后指出，Google Maps 并非为山区设计的，与纸质地图不同，地图应用无法显示陡峭的突出岩石、山间小径以及能呈现地形三维形态的等高线。为什么这件事值得我们留意呢？因为它展示了地理领域里一个正在发生的具体变化，让我们看到科学家和研究者是如何一步步用真实数据解开谜题的。",
    "audio": {
      "female": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/female/daily-20261124-23e31b5322.mp3",
      "male": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/male/daily-20261124-23e31b5322.mp3"
    }
  },
  {
    "id": "daily-20261123-d3a6954b34",
    "topic": "地理",
    "title": "科学史上的今天（2007年）：探索者号成为第一艘在南大洋沉没的游轮",
    "source": "维基百科 · 科学史上的今天",
    "url": "https://en.wikipedia.org/wiki/MV_Explorer_(1969)",
    "date": "2026-11-23",
    "publishedDate": "2026-11-23",
    "lengthCategory": "medium",
    "durationSec": 92,
    "script": "旋转地球仪，高山、深海、沙漠和季风正在地球表面上演跨越千里的联动。今天我们要深入聊聊来自维基百科 · 科学史上的今天的一篇特别报道：科学史上的今天（2007年）：探索者号成为第一艘在南大洋沉没的游轮。故事要从研究人员观察到的具体线索说起：MS Explorer 或 MV Explorer 是一艘在利比里亚注册的游轮，用于南极洲巡航。2007 年 11 月 23 日，她与南极浮冰撞击后，成为第一艘在那里沉没的游轮。所有乘客和船员均获救。把这条线索放到整个地理的大地图里来看，你会发现科学研究从来不是一蹴而就的。在得出结论之前，科研人员往往要先设计对照实验或者长期观测方案，把可能干扰结果的因素一个个排除掉，还要把测量数据公开出来，请世界各地的同行一起检验。对于我们十岁左右的小听众来说，理解这条新发现最好的办法，就是先抓住它最核心的那个变化：它到底解决了什么旧难题，或者推翻了哪一个过去的猜想？跨越山海的地理故事告诉我们，哪怕相隔万里，不同大陆的气候与生态也紧紧相连。爱护我们身边的环境，就是在守护整颗蓝色星球。",
    "audio": {
      "female": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/female/daily-20261123-d3a6954b34.mp3",
      "male": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/male/daily-20261123-d3a6954b34.mp3"
    }
  },
  {
    "id": "daily-20261123-a8f50cc898",
    "topic": "地理",
    "title": "原住民抗议者登上巴西亚马逊河上的大豆和石油驳船",
    "source": "Mongabay Wildlife",
    "url": "https://news.mongabay.com/short-article/2026/11/indigenous-protesters-board-soy-and-oil-barges-on-brazilian-amazon-river/",
    "date": "2026-11-23",
    "publishedDate": "2026-11-23",
    "lengthCategory": "short",
    "durationSec": 65,
    "script": "地图上的每一条海岸线、每一座雪山，都有一段跨越百万年的地理传奇。最近，Mongabay Wildlife报道了一条关于“原住民抗议者登上巴西亚马逊河上的大豆和石油驳船”的新进展。具体是怎么回事呢？原来，数百名原住民抗议者乘坐几艘小船和独木舟在亚马逊东部的巴西塔帕若斯河上拦截并登上载有大豆和燃料的驳船。11 月 14 日至 15 日的示威活动要求在工业扩张和法律承认该地区原住民领土的同时保护河流。看到这样的发现，研究团队并没有只停留在表面现象上，而是进一步追问背后的原理：这个现象需要满足什么样的条件？如果换一个环境，结果还会一样吗？跨越山海的地理故事告诉我们，哪怕相隔万里，不同大陆的气候与生态也紧紧相连。爱护我们身边的环境，就是在守护整颗蓝色星球。",
    "audio": {
      "female": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/female/daily-20261123-a8f50cc898.mp3",
      "male": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/male/daily-20261123-a8f50cc898.mp3"
    }
  },
  {
    "id": "daily-20261121-3539869953",
    "topic": "地理",
    "title": "非洲最古老的陆地之一内，一条古老的失败裂谷正在重新苏醒",
    "source": "Phys.org Earth",
    "url": "https://phys.org/news/2026-11-ancient-rift-reawakening-africa-oldest.html",
    "date": "2026-11-21",
    "publishedDate": "2026-11-21",
    "lengthCategory": "short",
    "durationSec": 70,
    "script": "地图上的每一条海岸线、每一座雪山，都有一段跨越百万年的地理传奇。最近，Phys.org Earth报道了一条关于“非洲最古老的陆地之一内，一条古老的失败裂谷正在重新苏醒”的新进展。具体是怎么回事呢？原来，2017 年 4 月，南部非洲发生了一场里氏 6.5 级地震，地点是博茨瓦纳东部卡拉哈里克拉通中部。克拉通是古代大陆的核心，它是由具有 37 亿年历史的地壳块构成的。地质学家长期以来一直认为这些地区太冷、太厚、太坚硬，无法撕裂。看到这样的发现，研究团队并没有只停留在表面现象上，而是进一步追问背后的原理：这个现象需要满足什么样的条件？如果换一个环境，结果还会一样吗？地球不是一块块孤立拼图的堆砌，沙漠的风、大洋的流、高山的雪都在互相影响。读懂了地理，你手里的地图就会变成一部立体的地球百科全书。",
    "audio": {
      "female": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/female/daily-20261121-3539869953.mp3",
      "male": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/male/daily-20261121-3539869953.mp3"
    }
  },
  {
    "id": "daily-20261121-e9c9aa2f21",
    "topic": "地理",
    "title": "佩尔库湖",
    "source": "NASA Image of the Day",
    "url": "https://www.nasa.gov/image-detail/iss075e0267074/",
    "date": "2026-11-21",
    "publishedDate": "2026-11-21",
    "lengthCategory": "short",
    "durationSec": 36,
    "script": "今天我们跟着地理学家的脚步，去探索地球上一个奇特的角落。根据NASA Image of the Day的最新分享，佩尔库湖。佩尔库湖（靠近中心）位于白雪皑皑的喜马拉雅山脉的中国一侧，毗邻尼泊尔，这是从国际空间站在亚洲上空轨道拍摄的照片。为什么这件事值得我们留意呢？因为它展示了地理领域里一个正在发生的具体变化，让我们看到科学家和研究者是如何一步步用真实数据解开谜题的。",
    "audio": {
      "female": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/female/daily-20261121-e9c9aa2f21.mp3",
      "male": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/male/daily-20261121-e9c9aa2f21.mp3"
    }
  },
  {
    "id": "daily-20261120-0c57e789aa",
    "topic": "地理",
    "title": "厄尔尼诺现象降雨描绘了阿塔卡马",
    "source": "NASA Earth Observatory",
    "url": "https://science.nasa.gov/earth/earth-observatory/el-nino-rains-paint-the-atacama/",
    "date": "2026-11-20",
    "publishedDate": "2026-11-20",
    "lengthCategory": "short",
    "durationSec": 52,
    "script": "今天我们跟着地理学家的脚步，去探索地球上一个奇特的角落。最近，NASA Earth Observatory报道了一条关于“厄尔尼诺现象降雨描绘了阿塔卡马”的新进展。具体是怎么回事呢？原来，冬季降水唤醒了智利北部休眠的种子，使沙漠布满了可能是卫星时代该地区最广泛的花朵。看到这样的发现，研究团队并没有只停留在表面现象上，而是进一步追问背后的原理：这个现象需要满足什么样的条件？如果换一个环境，结果还会一样吗？跨越山海的地理故事告诉我们，哪怕相隔万里，不同大陆的气候与生态也紧紧相连。爱护我们身边的环境，就是在守护整颗蓝色星球。",
    "audio": {
      "female": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/female/daily-20261120-0c57e789aa.mp3",
      "male": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/male/daily-20261120-0c57e789aa.mp3"
    }
  },
  {
    "id": "daily-20261126-a9c09dec82",
    "topic": "发明",
    "title": "普通补充剂在治疗严重牙龈疾病方面可与抗生素相媲美",
    "source": "ScienceDaily All",
    "url": "https://www.sciencedaily.com/releases/2026/11/261126033031.htm",
    "date": "2026-11-26",
    "publishedDate": "2026-11-26",
    "lengthCategory": "short",
    "durationSec": 67,
    "script": "许多改变世界的伟大发明，最初都来自一次不经意的观察，或者对大自然本领的模仿。最近，ScienceDaily All报道了一条关于“普通补充剂在治疗严重牙龈疾病方面可与抗生素相媲美”的新进展。具体是怎么回事呢？原来，当与严重牙龈疾病的标准治疗一起使用时，Omega-3 和低剂量阿司匹林的组合产生的效果与抗生素相当，并且在补充结束后很长时间内其益处仍持续存在。这一令人惊讶的发现可以为一些患者提供另一种选择，同时减少对抗生素的依赖。看到这样的发现，研究团队并没有只停留在表面现象上，而是进一步追问背后的原理：这个现象需要满足什么样的条件？如果换一个环境，结果还会一样吗？大发明家并不是永远不犯错的超人，他们只是比别人更善于观察细节，甚至能从一次实验失误或一只小动物身上找到灵感。",
    "audio": {
      "female": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/female/daily-20261126-a9c09dec82.mp3",
      "male": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/male/daily-20261126-a9c09dec82.mp3"
    }
  },
  {
    "id": "daily-20261123-0ac3b8d6d8",
    "topic": "发明",
    "title": "巴西慈善领袖表示：“我们必须彻底改造这个系统”",
    "source": "Mongabay Wildlife",
    "url": "https://news.mongabay.com/2026/11/we-had-to-reinvent-the-system-completely-brazilian-philanthropy-leader-says/",
    "date": "2026-11-23",
    "publishedDate": "2026-11-23",
    "lengthCategory": "short",
    "durationSec": 49,
    "script": "许多改变世界的伟大发明，最初都来自一次不经意的观察，或者对大自然本领的模仿。根据Mongabay Wildlife的最新分享，巴西慈善领袖表示：“我们必须彻底改造这个系统”。2025 年 11 月，原住民和非洲人后裔、前线捍卫者和民间社会运动在巴西贝伦以前所未有的人数动员起来，在第 30 届联合国气候变化大会 (COP30) 上倡导他们的要求。关键需求之一是直接获得气候融资。为什么这件事值得我们留意呢？因为它展示了发明领域里一个正在发生的具体变化，让我们看到科学家和研究者是如何一步步用真实数据解开谜题的。",
    "audio": {
      "female": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/female/daily-20261123-0ac3b8d6d8.mp3",
      "male": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/male/daily-20261123-0ac3b8d6d8.mp3"
    }
  },
  {
    "id": "daily-20261121-c6fd4e1582",
    "topic": "发明",
    "title": "测量草莓皮强度的设备将为育种者提供帮助",
    "source": "Phys.org Biology",
    "url": "https://phys.org/news/2026-11-device-strawberry-skin-strength-aid.html",
    "date": "2026-11-21",
    "publishedDate": "2026-11-21",
    "lengthCategory": "short",
    "durationSec": 45,
    "script": "今天我们要认识一项聪明又好玩的发明，看看它背后的灵感是从哪儿来的。根据Phys.org Biology的最新分享，测量草莓皮强度的设备将为育种者提供帮助。得益于昆士兰大学工程系学生开发的工具，有弹性的草莓品种将更容易识别。该原型测量草莓皮的强度，这是昆士兰州第一产业部澳大利亚草莓育种计划的一个关键育种考虑因素。为什么这件事值得我们留意呢？因为它展示了发明领域里一个正在发生的具体变化，让我们看到科学家和研究者是如何一步步用真实数据解开谜题的。",
    "audio": {
      "female": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/female/daily-20261121-c6fd4e1582.mp3",
      "male": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/male/daily-20261121-c6fd4e1582.mp3"
    }
  },
  {
    "id": "daily-20261121-13c3774efe",
    "topic": "发明",
    "title": "科学历史的今天（1877年）：托马斯·爱迪生宣布发明留声机，这是一种能够录…",
    "source": "维基百科 · 科学史上的今天",
    "url": "https://en.wikipedia.org/wiki/Thomas_Edison",
    "date": "2026-11-21",
    "publishedDate": "2026-11-21",
    "lengthCategory": "short",
    "durationSec": 52,
    "script": "当工程师遇到卡脖子的难题时，一个巧妙的小点子往往能打开全新的大门。根据维基百科 · 科学史上的今天的最新分享，科学历史的今天（1877年）：托马斯·爱迪生宣布发明留声机，这是一种能够录…。托马斯·阿尔瓦·爱迪生是一位美国发明家和商人，以其在白炽灯泡、留声机、电力分配和早期电影方面的研究而闻名。爱迪生通用电气公司与竞争对手汤姆森-休斯顿电气公司合并，成立了通用电气。为什么这件事值得我们留意呢？因为它展示了发明领域里一个正在发生的具体变化，让我们看到科学家和研究者是如何一步步用真实数据解开谜题的。",
    "audio": {
      "female": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/female/daily-20261121-13c3774efe.mp3",
      "male": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/male/daily-20261121-13c3774efe.mp3"
    }
  },
  {
    "id": "daily-20261120-d52fe17139",
    "topic": "发明",
    "title": "全球专利申请量创新高",
    "source": "Solidot 奇客科学",
    "url": "https://www.solidot.org/story?sid=85933",
    "date": "2026-11-20",
    "publishedDate": "2026-11-20",
    "lengthCategory": "short",
    "durationSec": 45,
    "script": "今天我们要认识一项聪明又好玩的发明，看看它背后的灵感是从哪儿来的。根据Solidot 奇客科学的最新分享，全球专利申请量创新高。世界知识产权组织公布的年度《世界知识产权指标》（WIPI）报告显示，2025 年全球专利申请量 394 万件，同比增长 6%，创近十年来最快增速。这可能与利用 AI 加快专利申请相关。为什么这件事值得我们留意呢？因为它展示了发明领域里一个正在发生的具体变化，让我们看到科学家和研究者是如何一步步用真实数据解开谜题的。",
    "audio": {
      "female": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/female/daily-20261120-d52fe17139.mp3",
      "male": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/male/daily-20261120-d52fe17139.mp3"
    }
  },
  {
    "id": "daily-20261120-807000b746",
    "topic": "发明",
    "title": "Vint Cerf 谈 TCP/IP 为何从未申请专利",
    "source": "Solidot 奇客科学",
    "url": "https://www.solidot.org/story?sid=85944",
    "date": "2026-11-20",
    "publishedDate": "2026-11-20",
    "lengthCategory": "medium",
    "durationSec": 117,
    "script": "今天我们要认识一项聪明又好玩的发明，看看它背后的灵感是从哪儿来的。今天我们要深入聊聊来自Solidot 奇客科学的一篇特别报道：Vint Cerf 谈 TCP/IP 为何从未申请专利。故事要从研究人员观察到的具体线索说起：现年 83 岁的 Vint Cerf 因在 1970 年代与 Bob Kahn 合作设计了 TCP/IP 协议而被誉为互联网之父，他在今年早些时候卸任 Google 首席互联网布道官一职，但并没停止工作，他正参与创办名为 Tolero 的公司，为星际 互联网构建软件。他接受采访时开玩笑的说，光速太慢了。Vint Cerf 谈论了当年设计 TCP/IP 协议时为什么没有为其申请专利。他说，1970 年代初在开发 TCP/IP 项目时，曾反复思考几个问题：是否应该为它申请专利。是否应该设置其它限制。是否应该将其作为一项需要获得许可才能使用的技术。把这条线索放到整个发明的大地图里来看，你会发现科学研究从来不是一蹴而就的。在得出结论之前，科研人员往往要先设计对照实验或者长期观测方案，把可能干扰结果的因素一个个排除掉，还要把测量数据公开出来，请世界各地的同行一起检验。对于我们十岁左右的小听众来说，理解这条新发现最好的办法，就是先抓住它最核心的那个变化：它到底解决了什么旧难题，或者推翻了哪一个过去的猜想？大发明家并不是永远不犯错的超人，他们只是比别人更善于观察细节，甚至能从一次实验失误或一只小动物身上找到灵感。",
    "audio": {
      "female": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/female/daily-20261120-807000b746.mp3",
      "male": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/male/daily-20261120-807000b746.mp3"
    }
  },
  {
    "id": "daily-20261119-9ddcace2dd",
    "topic": "发明",
    "title": "美国和欧洲聚乙烯包装和替代品的新生命周期评估",
    "source": "Phys.org Earth",
    "url": "https://phys.org/news/2026-11-life-polyethylene-packaging-alternatives-europe.html",
    "date": "2026-11-19",
    "publishedDate": "2026-11-19",
    "lengthCategory": "short",
    "durationSec": 42,
    "script": "当工程师遇到卡脖子的难题时，一个巧妙的小点子往往能打开全新的大门。根据Phys.org Earth的最新分享，美国和欧洲聚乙烯包装和替代品的新生命周期评估。一项新的研究评估了五种主要的 PE 包装应用，并围绕三个密切相关的当前问题进行了分析。PE 与纸张、玻璃和金属替代品相比如何。为什么这件事值得我们留意呢？因为它展示了发明领域里一个正在发生的具体变化，让我们看到科学家和研究者是如何一步步用真实数据解开谜题的。",
    "audio": {
      "female": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/female/daily-20261119-9ddcace2dd.mp3",
      "male": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/male/daily-20261119-9ddcace2dd.mp3"
    }
  },
  {
    "id": "daily-20261119-c0d3f41ebd",
    "topic": "发明",
    "title": "欧盟委员会如何向逾 4 万工作人员部署 Matrix",
    "source": "Solidot 奇客科学",
    "url": "https://www.solidot.org/story?sid=85936",
    "date": "2026-11-19",
    "publishedDate": "2026-11-19",
    "lengthCategory": "short",
    "durationSec": 47,
    "script": "许多改变世界的伟大发明，最初都来自一次不经意的观察，或者对大自然本领的模仿。根据Solidot 奇客科学的最新分享，欧盟委员会如何向逾 4 万工作人员部署 Matrix。Matrix 点对点通信协议正被越来越多的政府机构使用，其中之一是欧盟委员会。欧盟委员会在 2025 年 12 月完成了概念验证，证明 Matrix 协议及其客户端 Element 能完全满足其需求。为什么这件事值得我们留意呢？因为它展示了发明领域里一个正在发生的具体变化，让我们看到科学家和研究者是如何一步步用真实数据解开谜题的。",
    "audio": {
      "female": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/female/daily-20261119-c0d3f41ebd.mp3",
      "male": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/male/daily-20261119-c0d3f41ebd.mp3"
    }
  },
  {
    "id": "daily-20261127-c08efae596",
    "topic": "生物",
    "title": "基因编辑猪肾在人体内正常工作一年",
    "source": "Solidot 奇客科学",
    "url": "https://www.solidot.org/story?sid=86003",
    "date": "2026-11-27",
    "publishedDate": "2026-11-27",
    "lengthCategory": "medium",
    "durationSec": 115,
    "script": "今天我们走进奇妙的生物圈，去认识一位身怀绝技的生命朋友。今天我们要深入聊聊来自Solidot 奇客科学的一篇特别报道：基因编辑猪肾在人体内正常工作一年。故事要从研究人员观察到的具体线索说起：基因编辑猪肾在人体内正常工作一年。58 岁的美国新罕布什尔州居民 Molly Falco 迎来了接受猪肾移植一周年的重要时刻。去年 11 月 22 日，她在麻省总医院接受了基因编辑猪肾移植手术。过去一年里，猪肾持续承担清除体内毒素、产生尿液及调节体液平衡等功能，让长期饱受肾病困扰的她逐渐恢复正常生活。如今她重新开起了汽车，能够为家人做饭，甚至计划恢复滑雪。美国约 9 万人正在等待肾脏移植，而 2025 年实际完成的肾移植手术不足 2.6 万例。把这条线索放到整个生物的大地图里来看，你会发现科学研究从来不是一蹴而就的。在得出结论之前，科研人员往往要先设计对照实验或者长期观测方案，把可能干扰结果的因素一个个排除掉，还要把测量数据公开出来，请世界各地的同行一起检验。对于我们十岁左右的小听众来说，理解这条新发现最好的办法，就是先抓住它最核心的那个变化：它到底解决了什么旧难题，或者推翻了哪一个过去的猜想？每一种生物都是历经千万年自然选择留下的生命奇迹。尊重生命、保护生物多样性，不仅是在保护动物和植物，也是在留住大自然最宝贵的智慧库。",
    "audio": {
      "female": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/female/daily-20261127-c08efae596.mp3",
      "male": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/male/daily-20261127-c08efae596.mp3"
    }
  },
  {
    "id": "daily-20261127-a25c35016f",
    "topic": "生物",
    "title": "中国发现新古人类支系",
    "source": "Solidot 奇客科学",
    "url": "https://www.solidot.org/story?sid=86002",
    "date": "2026-11-27",
    "publishedDate": "2026-11-27",
    "lengthCategory": "medium",
    "durationSec": 90,
    "script": "生命世界远比我们想象的更聪明，每一种生物身体里都藏着精妙的科学密码。最近，Solidot 奇客科学报道了一条关于“中国发现新古人类支系”的新进展。具体是怎么回事呢？原来，中科院研究人员针对在南宁隆安穿山洞和柳州鹿寨龙船洞两处地点获得的 4 颗人类牙齿化石（分别距今至少 10.1 万年和 10.5 万年—4.3 万年）开展了古蛋白质组学和形态学综合分析。研究人员将穿山洞和龙船洞发现的牙齿，与其他人属标本进行比较。结果显示，两个组合呈现出截然不同的表型特征。研究人员对龙船洞以及穿山洞样本进行了古蛋白质提取，发现龙船洞样本可能代表华南地区一支具有丹尼索瓦亲缘关系的谱系，而穿山洞牙齿可能属于华南地区一支不同于丹尼索瓦人的独立谱系。看到这样的发现，研究团队并没有只停留在表面现象上，而是进一步追问背后的原理：这个现象需要满足什么样的条件？如果换一个环境，结果还会一样吗？从深海到森林，生命总能找到令人惊叹的出路。去公园或郊外时，带着安静和礼貌去观察小生物，你会发现一个热闹非凡的微观世界。",
    "audio": {
      "female": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/female/daily-20261127-a25c35016f.mp3",
      "male": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/male/daily-20261127-a25c35016f.mp3"
    }
  },
  {
    "id": "daily-20261126-9226f07978",
    "topic": "生物",
    "title": "思想是由什么构成的？为什么人类意识可能超出人工智能的范围",
    "source": "ScienceDaily AI & Math",
    "url": "https://www.sciencedaily.com/releases/2026/11/261124055712.htm",
    "date": "2026-11-26",
    "publishedDate": "2026-11-26",
    "lengthCategory": "medium",
    "durationSec": 72,
    "script": "今天我们走进奇妙的生物圈，去认识一位身怀绝技的生命朋友。最近，ScienceDaily AI & Math报道了一条关于“思想是由什么构成的？为什么人类意识可能超出人工智能的范围”的新进展。具体是怎么回事呢？原来，一项新理论表明，大脑可以通过化学方式编码和检索记忆，而不是仅仅依赖电信号。研究人员提出，脑细胞与其周围分子之间的相互作用可以帮助解释记忆、情感和思想之间的密切联系。他们的发现挑战了越来越强大的计算机最终能够发展出类人意识的假设。看到这样的发现，研究团队并没有只停留在表面现象上，而是进一步追问背后的原理：这个现象需要满足什么样的条件？如果换一个环境，结果还会一样吗？每一种生物都是历经千万年自然选择留下的生命奇迹。尊重生命、保护生物多样性，不仅是在保护动物和植物，也是在留住大自然最宝贵的智慧库。",
    "audio": {
      "female": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/female/daily-20261126-9226f07978.mp3",
      "male": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/male/daily-20261126-9226f07978.mp3"
    }
  },
  {
    "id": "daily-20261126-aaca7c3665",
    "topic": "生物",
    "title": "对于鲨鱼和鳐鱼来说，感官威慑并不是“一刀切”的解决方案",
    "source": "Phys.org Biology",
    "url": "https://phys.org/news/2026-11-sensory-deterrents-size-solution-sharks.html",
    "date": "2026-11-26",
    "publishedDate": "2026-11-26",
    "lengthCategory": "short",
    "durationSec": 40,
    "script": "生命世界远比我们想象的更聪明，每一种生物身体里都藏着精妙的科学密码。根据Phys.org Biology的最新分享，对于鲨鱼和鳐鱼来说，感官威慑并不是“一刀切”的解决方案。一项关于鳐鱼和鲨鱼特定物种如何应对感官威慑的研究证实了为什么没有一种万能的解决方案来防止渔业兼捕。为什么这件事值得我们留意呢？因为它展示了生物领域里一个正在发生的具体变化，让我们看到科学家和研究者是如何一步步用真实数据解开谜题的。",
    "audio": {
      "female": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/female/daily-20261126-aaca7c3665.mp3",
      "male": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/male/daily-20261126-aaca7c3665.mp3"
    }
  },
  {
    "id": "daily-20261124-88c68fb4d3",
    "topic": "生物",
    "title": "COP31 气候谈判未达成任何共识",
    "source": "Solidot 奇客科学",
    "url": "https://www.solidot.org/story?sid=85963",
    "date": "2026-11-24",
    "publishedDate": "2026-11-24",
    "lengthCategory": "medium",
    "durationSec": 83,
    "script": "在地球数十亿年的生命演化中，动物、植物和微生物练就了令人惊叹的生存绝活。最近，Solidot 奇客科学报道了一条关于“COP31 气候谈判未达成任何共识”的新进展。具体是怎么回事呢？原来，经过两周密集谈判和两天加时磋商，第三十一届联合国气候变化大会（COP31）周日在土耳其安塔利亚落下帷幕。由于各方围绕化石燃料问题分歧严重，谈判陷入僵局，最终未能就气候协议达成共识。围绕化石燃料问题，各方谈判持续陷入僵局，因而无法就最终文本达成一致。欧盟谈判代表表示，如果最终协议不提及摆脱化石燃料他们就无法接受该协议，欧盟代表团随后退场。看到这样的发现，研究团队并没有只停留在表面现象上，而是进一步追问背后的原理：这个现象需要满足什么样的条件？如果换一个环境，结果还会一样吗？每一种生物都是历经千万年自然选择留下的生命奇迹。尊重生命、保护生物多样性，不仅是在保护动物和植物，也是在留住大自然最宝贵的智慧库。",
    "audio": {
      "female": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/female/daily-20261124-88c68fb4d3.mp3",
      "male": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/male/daily-20261124-88c68fb4d3.mp3"
    }
  },
  {
    "id": "daily-20261124-bec09af73a",
    "topic": "生物",
    "title": "空气污染是痴呆症的一个诱因",
    "source": "Solidot 奇客科学",
    "url": "https://www.solidot.org/story?sid=85980",
    "date": "2026-11-24",
    "publishedDate": "2026-11-24",
    "lengthCategory": "long",
    "durationSec": 126,
    "script": "在地球数十亿年的生命演化中，动物、植物和微生物练就了令人惊叹的生存绝活。今天我们要深入聊聊来自Solidot 奇客科学的一篇特别报道：空气污染是痴呆症的一个诱因。故事要从研究人员观察到的具体线索说起：根据发表在《Journal of Neuroinflammation》期刊上的一项研究，微小的空气污染颗粒可能会通过改变大脑免疫细胞的行为对大脑造成损害。研究结果表明空气污染是痴呆症的一个诱因。研究人员分析了英国生物样本库（UK Biobank）约 50 万名成年人的数据；该研究数据集对参与者的健康状况进行了长达 14 年的追踪。结果发现，相比生活在污染程度最低的三分之一地区的人群，居住在污染程度最高的三分之一地区的人群，患阿尔茨海默病或相关痴呆症的风险高 25%。在排除了年龄、吸烟、糖尿病等因素的影响后，这一结论依然成立。无论个人患阿尔茨海默病的遗传风险高低，空气污染都会增加其患病风险。把这条线索放到整个生物的大地图里来看，你会发现科学研究从来不是一蹴而就的。在得出结论之前，科研人员往往要先设计对照实验或者长期观测方案，把可能干扰结果的因素一个个排除掉，还要把测量数据公开出来，请世界各地的同行一起检验。对于我们十岁左右的小听众来说，理解这条新发现最好的办法，就是先抓住它最核心的那个变化：它到底解决了什么旧难题，或者推翻了哪一个过去的猜想？每一种生物都是历经千万年自然选择留下的生命奇迹。尊重生命、保护生物多样性，不仅是在保护动物和植物，也是在留住大自然最宝贵的智慧库。",
    "audio": {
      "female": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/female/daily-20261124-bec09af73a.mp3",
      "male": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/male/daily-20261124-bec09af73a.mp3"
    }
  },
  {
    "id": "daily-20261123-6f1ac1be76",
    "topic": "生物",
    "title": "一只194岁的乌龟的DNA中隐藏着非凡的抗衰老秘密",
    "source": "ScienceDaily Plants & Animals",
    "url": "https://www.sciencedaily.com/releases/2026/11/261121221130.htm",
    "date": "2026-11-23",
    "publishedDate": "2026-11-23",
    "lengthCategory": "medium",
    "durationSec": 73,
    "script": "在地球数十亿年的生命演化中，动物、植物和微生物练就了令人惊叹的生存绝活。最近，ScienceDaily Plants & Animals报道了一条关于“一只194岁的乌龟的DNA中隐藏着非凡的抗衰老秘密”的新进展。具体是怎么回事呢？原来，巨龟乔纳森已经有 194 岁高龄，是世界上现存最古老的陆地动物，科学家们可能终于揭开了它非凡寿命背后的秘密。研究人员发现了 287 种独特的遗传变异，这些变异与帮助修复受损 DNA、控制炎症、调节胰岛素和抑制癌症的过程相关。看到这样的发现，研究团队并没有只停留在表面现象上，而是进一步追问背后的原理：这个现象需要满足什么样的条件？如果换一个环境，结果还会一样吗？每一种生物都是历经千万年自然选择留下的生命奇迹。尊重生命、保护生物多样性，不仅是在保护动物和植物，也是在留住大自然最宝贵的智慧库。",
    "audio": {
      "female": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/female/daily-20261123-6f1ac1be76.mp3",
      "male": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/male/daily-20261123-6f1ac1be76.mp3"
    }
  },
  {
    "id": "daily-20261123-ca50e27920",
    "topic": "生物",
    "title": "COP31未能达成重大气候协议，谈判暴露了深刻分歧",
    "source": "BBC Science & Environment",
    "url": "https://www.bbc.co.uk/news/articles/cqwy06zrd26lo?at_medium=RSS&at_campaign=rss",
    "date": "2026-11-23",
    "publishedDate": "2026-11-23",
    "lengthCategory": "short",
    "durationSec": 37,
    "script": "在地球数十亿年的生命演化中，动物、植物和微生物练就了令人惊叹的生存绝活。根据BBC Science & Environment的最新分享，COP31未能达成重大气候协议，谈判暴露了深刻分歧。在有关化石燃料的争论之后，达成应对气候变化协议的希望破灭了。为什么这件事值得我们留意呢？因为它展示了生物领域里一个正在发生的具体变化，让我们看到科学家和研究者是如何一步步用真实数据解开谜题的。",
    "audio": {
      "female": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/female/daily-20261123-ca50e27920.mp3",
      "male": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/male/daily-20261123-ca50e27920.mp3"
    }
  },
  {
    "id": "daily-20261126-5ee00321b7",
    "topic": "大自然",
    "title": "龙舌兰酒的宿醉：这种饮料的成功如何导致了墨西哥的森林砍伐",
    "source": "Mongabay Wildlife",
    "url": "https://news.mongabay.com/2026/11/tequilas-hangover-how-the-drinks-success-drove-deforestation-in-mexico/",
    "date": "2026-11-26",
    "publishedDate": "2026-11-26",
    "lengthCategory": "medium",
    "durationSec": 91,
    "script": "今天的大自然广播，带大家去看看地球生态圈里的一场奇妙变化。今天我们要深入聊聊来自Mongabay Wildlife的一篇特别报道：龙舌兰酒的宿醉：这种饮料的成功如何导致了墨西哥的森林砍伐。故事要从研究人员观察到的具体线索说起：几十年来，曼努埃尔·加西亚·卡斯特罗种植玉米、南瓜和豆类来养活家人和牲畜。2019年，他追随当地富裕农民的脚步，将自己位于墨西哥西部哈利斯科州高地的一部分土地用于种植蓝色龙舌兰，用于酿造龙舌兰酒。把这条线索放到整个大自然的大地图里来看，你会发现科学研究从来不是一蹴而就的。在得出结论之前，科研人员往往要先设计对照实验或者长期观测方案，把可能干扰结果的因素一个个排除掉，还要把测量数据公开出来，请世界各地的同行一起检验。对于我们十岁左右的小听众来说，理解这条新发现最好的办法，就是先抓住它最核心的那个变化：它到底解决了什么旧难题，或者推翻了哪一个过去的猜想？大自然里的每一滴雨、每一只鸟、每一棵树都处在微妙的平衡之中。当我们学会像生态学家一样思考，就会更加懂得如何与自然温柔相处。",
    "audio": {
      "female": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/female/daily-20261126-5ee00321b7.mp3",
      "male": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/male/daily-20261126-5ee00321b7.mp3"
    }
  },
  {
    "id": "daily-20261126-f340aa54b5",
    "topic": "大自然",
    "title": "5G 干扰可能会改变影响较大的天气预报",
    "source": "Phys.org Earth",
    "url": "https://phys.org/news/2026-11-5g-high-impact-weather.html",
    "date": "2026-11-26",
    "publishedDate": "2026-11-26",
    "lengthCategory": "short",
    "durationSec": 45,
    "script": "只要停下脚步仔细倾听和观察，森林、海洋和天空就会给你讲一段动人的自然故事。根据Phys.org Earth的最新分享，5G 干扰可能会改变影响较大的天气预报。未来 5G 网络的泄漏是否会干扰卫星气象测量并可能改变预测。这是来自美国新泽西州和马里兰州的一组研究人员的担忧，其中主要作者是来自新泽西州罗格斯大学的 Behzad Golparvar。为什么这件事值得我们留意呢？因为它展示了大自然领域里一个正在发生的具体变化，让我们看到科学家和研究者是如何一步步用真实数据解开谜题的。",
    "audio": {
      "female": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/female/daily-20261126-f340aa54b5.mp3",
      "male": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/male/daily-20261126-f340aa54b5.mp3"
    }
  },
  {
    "id": "daily-20261124-fa08ffb315",
    "topic": "大自然",
    "title": "Firefox 161 释出",
    "source": "Solidot 奇客科学",
    "url": "https://www.solidot.org/story?sid=85979",
    "date": "2026-11-24",
    "publishedDate": "2026-11-24",
    "lengthCategory": "medium",
    "durationSec": 77,
    "script": "只要停下脚步仔细倾听和观察，森林、海洋和天空就会给你讲一段动人的自然故事。根据Solidot 奇客科学的最新分享，Firefox 161 释出。Mozilla 释出了 Firefox 161。主要新特性包括：对常用功能如复制当前标签页网址等设置快捷键，方法是在地址栏输入 about:keyboard；主题区域新增经典主题，可选择早期版本的 Proton 主题或 Firefox OLED 主题；支持 JPEG XL 图像格式，允许下载前预览完整图像；Windows 版本支持播放 HDR 视频；内置 VPN 功能支持对特定网站设置开启或关闭，允许用户在全局启用 VPN 时将特定网站排除在外；开发者功能包括支持 random() CSS 函数，支持嵌套任意替换函数，支持 CSS Typed Object Model 等等。为什么这件事值得我们留意呢？因为它展示了大自然领域里一个正在发生的具体变化，让我们看到科学家和研究者是如何一步步用真实数据解开谜题的。",
    "audio": {
      "female": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/female/daily-20261124-fa08ffb315.mp3",
      "male": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/male/daily-20261124-fa08ffb315.mp3"
    }
  },
  {
    "id": "daily-20261124-d28c3eb78d",
    "topic": "大自然",
    "title": "Windows Server 移除对 32 位应用的支持",
    "source": "Solidot 奇客科学",
    "url": "https://www.solidot.org/story?sid=85978",
    "date": "2026-11-24",
    "publishedDate": "2026-11-24",
    "lengthCategory": "medium",
    "durationSec": 83,
    "script": "今天的大自然广播，带大家去看看地球生态圈里的一场奇妙变化。最近，Solidot 奇客科学报道了一条关于“Windows Server 移除对 32 位应用的支持”的新进展。具体是怎么回事呢？原来，微软宣布下个版本的 Windows Server—— Windows Server 2028——将移除允许 32 位 Windows 应用运行在 64 位操作系统上的兼容层。这意味着新操作系统不再默认包含 WoW64 兼容层——WoW64 让 32 位应用能在 64 位 Windows 环境中运行。Windows Server 最后一个 32 位版本发布于 2008 年，此后的所有版本均为纯 64 位系统。WoW64 子系统此前一直存在于 64 位 Windows 中，旨在确保 32 位应用能在 64 位系统上继续运行。看到这样的发现，研究团队并没有只停留在表面现象上，而是进一步追问背后的原理：这个现象需要满足什么样的条件？如果换一个环境，结果还会一样吗？大自然里的每一滴雨、每一只鸟、每一棵树都处在微妙的平衡之中。当我们学会像生态学家一样思考，就会更加懂得如何与自然温柔相处。",
    "audio": {
      "female": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/female/daily-20261124-d28c3eb78d.mp3",
      "male": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/male/daily-20261124-d28c3eb78d.mp3"
    }
  },
  {
    "id": "daily-20261123-82c4c0f6e8",
    "topic": "大自然",
    "title": "单根羽毛可能揭示东部黑轨是留在德克萨斯州还是向北迁移",
    "source": "Phys.org Biology",
    "url": "https://phys.org/news/2026-11-feathers-reveal-eastern-black-rails.html",
    "date": "2026-11-23",
    "publishedDate": "2026-11-23",
    "lengthCategory": "medium",
    "durationSec": 71,
    "script": "只要停下脚步仔细倾听和观察，森林、海洋和天空就会给你讲一段动人的自然故事。最近，Phys.org Biology报道了一条关于“单根羽毛可能揭示东部黑轨是留在德克萨斯州还是向北迁移”的新进展。具体是怎么回事呢？原来，夜间拖着绳子穿过湿地，就像在军乐队中一样迈着高大的步伐，这会让您思考自己的人生选择。绳子上系着几个塑料瓶，每个塑料瓶里装着两三个吵闹的猫玩具。一片漆黑，我只能听到猫玩具的叮当作响，蚊子在耳边嗡嗡作响，湿地的草在风中弹跳。看到这样的发现，研究团队并没有只停留在表面现象上，而是进一步追问背后的原理：这个现象需要满足什么样的条件？如果换一个环境，结果还会一样吗？大自然里的每一滴雨、每一只鸟、每一棵树都处在微妙的平衡之中。当我们学会像生态学家一样思考，就会更加懂得如何与自然温柔相处。",
    "audio": {
      "female": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/female/daily-20261123-82c4c0f6e8.mp3",
      "male": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/male/daily-20261123-82c4c0f6e8.mp3"
    }
  },
  {
    "id": "daily-20261123-b61998a18f",
    "topic": "大自然",
    "title": "好奇号发现了漂浮的暮云",
    "source": "NASA Earth Observatory",
    "url": "https://science.nasa.gov/photojournal/curiosity-spots-drifting-twilight-clouds/",
    "date": "2026-11-23",
    "publishedDate": "2026-11-23",
    "lengthCategory": "short",
    "durationSec": 64,
    "script": "今天的大自然广播，带大家去看看地球生态圈里的一场奇妙变化。最近，NASA Earth Observatory报道了一条关于“好奇号发现了漂浮的暮云”的新进展。具体是怎么回事呢？原来，描述 NASA 的“好奇号”火星探测器于 2026 年 10 月 31 日，即任务执行的第 5,061 个火星日（sol）捕捉到了这些漂流云。火星车使用其导航相机捕捉日落后的云，称为暮光云，这种云每次落在盖尔陨石坑上空时只出现很短的时间，它已经探索了超过]]>。看到这样的发现，研究团队并没有只停留在表面现象上，而是进一步追问背后的原理：这个现象需要满足什么样的条件？如果换一个环境，结果还会一样吗？不用等到去遥远的保护区，窗外的云朵、雨后的泥土和迁徙的候鸟，每天都在上演大自然的纪录片，等着细心的你去发现。",
    "audio": {
      "female": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/female/daily-20261123-b61998a18f.mp3",
      "male": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/male/daily-20261123-b61998a18f.mp3"
    }
  },
  {
    "id": "daily-20261121-d03ae3ab66",
    "topic": "大自然",
    "title": "微软测试对被盗或丢失设备远程锁定",
    "source": "Solidot 奇客科学",
    "url": "https://www.solidot.org/story?sid=85942",
    "date": "2026-11-21",
    "publishedDate": "2026-11-21",
    "lengthCategory": "short",
    "durationSec": 52,
    "script": "今天的大自然广播，带大家去看看地球生态圈里的一场奇妙变化。根据Solidot 奇客科学的最新分享，微软测试对被盗或丢失设备远程锁定。微软在测试一项新功能，允许企业 IT 管理员在不清除数据的情况下远程锁定丢失或被盗的 Windows 设备。被称为远程锁定（Remote Lock）的新功能已提供给运行 Build 26320.10003 或 Build 26340.10013 的 Windows 11 Insider Preview 设备。为什么这件事值得我们留意呢？因为它展示了大自然领域里一个正在发生的具体变化，让我们看到科学家和研究者是如何一步步用真实数据解开谜题的。",
    "audio": {
      "female": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/female/daily-20261121-d03ae3ab66.mp3",
      "male": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/male/daily-20261121-d03ae3ab66.mp3"
    }
  },
  {
    "id": "daily-20261121-f780418513",
    "topic": "大自然",
    "title": "与大自然达成协议的英国岛屿",
    "source": "Mongabay Wildlife",
    "url": "https://news.mongabay.com/video/2026/11/the-british-island-that-made-a-deal-with-nature/",
    "date": "2026-11-21",
    "publishedDate": "2026-11-21",
    "lengthCategory": "short",
    "durationSec": 64,
    "script": "大自然是最神奇的设计师，风、雨、雷电和万物生灵每时每刻都在默契配合。最近，Mongabay Wildlife报道了一条关于“与大自然达成协议的英国岛屿”的新进展。具体是怎么回事呢？原来，崎岖的伦迪岛位于布里斯托尔海峡，坐落在威尔士和英格兰之间，是英国最具开创性的保护故事之一。从成千上万只海鸟的回归到海浪下繁衍生息的海洋生物，数十年的保护帮助这座小岛发生了翻天覆地的变化。看到这样的发现，研究团队并没有只停留在表面现象上，而是进一步追问背后的原理：这个现象需要满足什么样的条件？如果换一个环境，结果还会一样吗？大自然里的每一滴雨、每一只鸟、每一棵树都处在微妙的平衡之中。当我们学会像生态学家一样思考，就会更加懂得如何与自然温柔相处。",
    "audio": {
      "female": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/female/daily-20261121-f780418513.mp3",
      "male": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/male/daily-20261121-f780418513.mp3"
    }
  },
  {
    "id": "daily-20261127-96c1b34048",
    "topic": "简单政治",
    "title": "文明的历史是小麦的历史",
    "source": "Solidot 奇客科学",
    "url": "https://www.solidot.org/story?sid=86013",
    "date": "2026-11-27",
    "publishedDate": "2026-11-27",
    "lengthCategory": "medium",
    "durationSec": 77,
    "script": "几百万人住在一起的城市和地球村，怎样才能既公平又温暖地运转？这离不开公共规则的智慧。最近，Solidot 奇客科学报道了一条关于“文明的历史是小麦的历史”的新进展。具体是怎么回事呢？原来，根据苏美尔神话，世界之初即无耕种也无畜牧和纺织，原神们生活窘迫，为此他们创造了谷之女神 Ashnan 和羊之神 Lahar，将他们派去帮助人类。Ashnan 和 Lahar 合作为神祇们提供了面包、酒、奶和兽皮。但众神们又争执起了谁的贡献更大。智慧之神 Enki 裁定谷之女神 Ashnan 贡献更大，理由是无谷物就没有面包和酒。看到这样的发现，研究团队并没有只停留在表面现象上，而是进一步追问背后的原理：这个现象需要满足什么样的条件？如果换一个环境，结果还会一样吗？好的规则既有尺度又有温度，既讲公平又照顾弱者。从班级里的一次分工到城市里的一条坡道，每个人都能为更友善的世界出一份力。",
    "audio": {
      "female": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/female/daily-20261127-96c1b34048.mp3",
      "male": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/male/daily-20261127-96c1b34048.mp3"
    }
  },
  {
    "id": "daily-20261124-91521d5372",
    "topic": "简单政治",
    "title": "英伟达重新任命黄仁勋为 CEO",
    "source": "Solidot 奇客科学",
    "url": "https://www.solidot.org/story?sid=85969",
    "date": "2026-11-24",
    "publishedDate": "2026-11-24",
    "lengthCategory": "short",
    "durationSec": 50,
    "script": "今天我们来聊聊社区与公共生活里的一个好办法，看看大家是如何商量着把事情办好的。根据Solidot 奇客科学的最新分享，英伟达重新任命黄仁勋为 CEO。仅仅过了 10 天，英伟达宣布重新任命黄仁勋为总裁兼 CEO，重返董事会。董事会主席 Harvey C. Jones 在声明中称，董事会认为黄仁勋是领导英伟达的合适人选，他的复职符合股东、员工、合作伙伴和客户的最大利益。为什么这件事值得我们留意呢？因为它展示了简单政治领域里一个正在发生的具体变化，让我们看到科学家和研究者是如何一步步用真实数据解开谜题的。",
    "audio": {
      "female": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/female/daily-20261124-91521d5372.mp3",
      "male": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/male/daily-20261124-91521d5372.mp3"
    }
  },
  {
    "id": "daily-20261124-e75a87b1c5",
    "topic": "简单政治",
    "title": "GrapheneOS 指责 Google 恐吓其合作伙伴",
    "source": "Solidot 奇客科学",
    "url": "https://www.solidot.org/story?sid=85968",
    "date": "2026-11-24",
    "publishedDate": "2026-11-24",
    "lengthCategory": "long",
    "durationSec": 128,
    "script": "几百万人住在一起的城市和地球村，怎样才能既公平又温暖地运转？这离不开公共规则的智慧。今天我们要深入聊聊来自Solidot 奇客科学的一篇特别报道：GrapheneOS 指责 Google 恐吓其合作伙伴。故事要从研究人员观察到的具体线索说起：Android 安全加固发行版项目 GrapheneOS 指责 Google 恐吓其合作伙伴。摩托罗拉最近与 GrapheneOS 合作推出了首款支持 GrapheneOS 的高端智能手机 Signature 27。GrapheneOS 通过其社交媒体账号指责 Google 向 Android 手机厂商施压，手机厂商因与其合作而受到质询，甚至还遭到了撤销 Google 应用授权的威胁。GrapheneOS 认为 Google 正针对其采取阻挠行动，且打压态势可能会进一步升级。GrapheneOS 认为，Google 的部分行为已触犯美国刑法，其违反反垄断的行为可能导致相关个人面临入狱。该项目希望与美国司法部进行沟通，指出此前针对 Google 的反垄断诉讼未触及该公司最严重的违规行为。把这条线索放到整个简单政治的大地图里来看，你会发现科学研究从来不是一蹴而就的。在得出结论之前，科研人员往往要先设计对照实验或者长期观测方案，把可能干扰结果的因素一个个排除掉，还要把测量数据公开出来，请世界各地的同行一起检验。对于我们十岁左右的小听众来说，理解这条新发现最好的办法，就是先抓住它最核心的那个变化：它到底解决了什么旧难题，或者推翻了哪一个过去的猜想？公共生活不是只有大人才能关心的话题。学会倾听别人的需要、遵守共同的规则、用有条理的建议让学校和社区变得更好，就是最棒的公民素养。",
    "audio": {
      "female": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/female/daily-20261124-e75a87b1c5.mp3",
      "male": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/male/daily-20261124-e75a87b1c5.mp3"
    }
  },
  {
    "id": "daily-20261123-cfeb5a58b6",
    "topic": "简单政治",
    "title": "美国租赁美属萨摩亚海底采矿，拍卖被法院视为非法",
    "source": "Mongabay Wildlife",
    "url": "https://news.mongabay.com/2026/11/us-leases-american-samoan-seabed-for-mining-in-auction-deemed-illegal-by-court/",
    "date": "2026-11-23",
    "publishedDate": "2026-11-23",
    "lengthCategory": "short",
    "durationSec": 50,
    "script": "几百万人住在一起的城市和地球村，怎样才能既公平又温暖地运转？这离不开公共规则的智慧。根据Mongabay Wildlife的最新分享，美国租赁美属萨摩亚海底采矿，拍卖被法院视为非法。尽管公众反对，而且联邦法院裁定拍卖非法，美国政府还是拍卖了 1,270 万公顷（3,150 万英亩）的美属萨摩亚海底。此次拍卖标志着一个国家首次完成海底矿产租赁拍卖，授予勘探权。为什么这件事值得我们留意呢？因为它展示了简单政治领域里一个正在发生的具体变化，让我们看到科学家和研究者是如何一步步用真实数据解开谜题的。",
    "audio": {
      "female": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/female/daily-20261123-cfeb5a58b6.mp3",
      "male": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/male/daily-20261123-cfeb5a58b6.mp3"
    }
  },
  {
    "id": "daily-20261123-05ba0b8182",
    "topic": "简单政治",
    "title": "家庭基金会可以帮助海洋保护",
    "source": "Mongabay Wildlife",
    "url": "https://news.mongabay.com/2026/11/where-family-foundations-can-help-marine-conservation/",
    "date": "2026-11-23",
    "publishedDate": "2026-11-23",
    "lengthCategory": "short",
    "durationSec": 67,
    "script": "从一条斑马线到跨国合作公约，好的公共决定能让每一个普通人都受到照顾。最近，Mongabay Wildlife报道了一条关于“家庭基金会可以帮助海洋保护”的新进展。具体是怎么回事呢？原来，COP17 在亚美尼亚结束，人们对缺乏到 2030 年减少生物多样性丧失的具体措施感到失望。慈善事业只是其中的一小部分，但基金会可以承担公共机构通常无法承担的风险。我认为对于海洋领域的小型基金会来说有一些特别好的机会。看到这样的发现，研究团队并没有只停留在表面现象上，而是进一步追问背后的原理：这个现象需要满足什么样的条件？如果换一个环境，结果还会一样吗？公共生活不是只有大人才能关心的话题。学会倾听别人的需要、遵守共同的规则、用有条理的建议让学校和社区变得更好，就是最棒的公民素养。",
    "audio": {
      "female": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/female/daily-20261123-05ba0b8182.mp3",
      "male": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/male/daily-20261123-05ba0b8182.mp3"
    }
  },
  {
    "id": "daily-20261121-3056a00ebe",
    "topic": "简单政治",
    "title": "科学史上的今天（1964年）：连接纽约市斯塔滕岛和布鲁克林的维拉扎诺海峡大…",
    "source": "维基百科 · 科学史上的今天",
    "url": "https://en.wikipedia.org/wiki/Verrazzano%E2%80%93Narrows_Bridge",
    "date": "2026-11-21",
    "publishedDate": "2026-11-21",
    "lengthCategory": "medium",
    "durationSec": 87,
    "script": "今天我们来聊聊社区与公共生活里的一个好办法，看看大家是如何商量着把事情办好的。最近，维基百科 · 科学史上的今天报道了一条关于“科学史上的今天（1964年）：连接纽约市斯塔滕岛和布鲁克林的维拉扎诺海峡大…”的新进展。具体是怎么回事呢？原来，维拉扎诺海峡大桥是一座连接美国纽约州史坦顿岛和布鲁克林区的悬索桥，横跨狭窄的水域，连接相对封闭的纽约港与纽约下湾和大西洋。这是海峡唯一的固定渡口。这座双层桥承载 278 号州际公路 13 条车道：上层 7 条车道，下层 6 条车道。该跨度以乔瓦尼·达·维拉扎诺 (Giovanni da Verrazzano) 命名，他于 1524 年成为第一位进入纽约港和哈德逊河的欧洲探险家。看到这样的发现，研究团队并没有只停留在表面现象上，而是进一步追问背后的原理：这个现象需要满足什么样的条件？如果换一个环境，结果还会一样吗？公共生活不是只有大人才能关心的话题。学会倾听别人的需要、遵守共同的规则、用有条理的建议让学校和社区变得更好，就是最棒的公民素养。",
    "audio": {
      "female": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/female/daily-20261121-3056a00ebe.mp3",
      "male": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/male/daily-20261121-3056a00ebe.mp3"
    }
  },
  {
    "id": "daily-20261121-da0a6b4339",
    "topic": "简单政治",
    "title": "户外3D跟踪技术使用无人机的飞行路径作为“移动标尺”",
    "source": "TechXplore AI",
    "url": "https://techxplore.com/news/2026-11-outdoor-3d-tracking-technology-drone.html",
    "date": "2026-11-21",
    "publishedDate": "2026-11-21",
    "lengthCategory": "medium",
    "durationSec": 95,
    "script": "几百万人住在一起的城市和地球村，怎样才能既公平又温暖地运转？这离不开公共规则的智慧。今天我们要深入聊聊来自TechXplore AI的一篇特别报道：户外3D跟踪技术使用无人机的飞行路径作为“移动标尺”。故事要从研究人员观察到的具体线索说起：电影《阿凡达》中角色栩栩如生的动作背后的秘密是动作捕捉，这是一种通过在演员的身体上贴上标记并在工作室内用多个摄像机进行拍摄来记录三维运动的技术。然而，将如此精确的测量引入运动场等广阔的户外空间从来都不是一件容易的事。把这条线索放到整个简单政治的大地图里来看，你会发现科学研究从来不是一蹴而就的。在得出结论之前，科研人员往往要先设计对照实验或者长期观测方案，把可能干扰结果的因素一个个排除掉，还要把测量数据公开出来，请世界各地的同行一起检验。对于我们十岁左右的小听众来说，理解这条新发现最好的办法，就是先抓住它最核心的那个变化：它到底解决了什么旧难题，或者推翻了哪一个过去的猜想？公共生活不是只有大人才能关心的话题。学会倾听别人的需要、遵守共同的规则、用有条理的建议让学校和社区变得更好，就是最棒的公民素养。",
    "audio": {
      "female": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/female/daily-20261121-da0a6b4339.mp3",
      "male": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/male/daily-20261121-da0a6b4339.mp3"
    }
  },
  {
    "id": "daily-20261120-7835732e94",
    "topic": "简单政治",
    "title": "穿靴子的灵蜥：香港如何成为澳大利亚本土爬行动物贩运的关键中心",
    "source": "Mongabay Wildlife",
    "url": "https://news.mongabay.com/2026/11/skinks-in-boots-how-hong-kong-emerges-as-key-hub-in-australias-native-reptile-trafficking/",
    "date": "2026-11-20",
    "publishedDate": "2026-11-20",
    "lengthCategory": "short",
    "durationSec": 52,
    "script": "几百万人住在一起的城市和地球村，怎样才能既公平又温暖地运转？这离不开公共规则的智慧。根据Mongabay Wildlife的最新分享，穿靴子的灵蜥：香港如何成为澳大利亚本土爬行动物贩运的关键中心。香港——去年圣诞节后两天，香港国际机场海关截获了一批来自澳大利亚的货物，发现 13 只活蜥蜴被绑在羊皮冬鞋（俗称 ugg 靴子）内。香港海关在新闻稿中称，这批空运货物被错误申报含有零食。为什么这件事值得我们留意呢？因为它展示了简单政治领域里一个正在发生的具体变化，让我们看到科学家和研究者是如何一步步用真实数据解开谜题的。",
    "audio": {
      "female": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/female/daily-20261120-7835732e94.mp3",
      "male": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/male/daily-20261120-7835732e94.mp3"
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
