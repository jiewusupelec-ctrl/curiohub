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
    "id": "daily-20261114-97cc5c45fc",
    "topic": "科学",
    "title": "为什么湿衣服颜色看起来总是比干衣服更深？藏在布料纤维与光线反射里的光学游戏",
    "source": "Everyday Physics 趣味光学",
    "url": "https://physicsworld.com/why-wet-clothes-look-darker",
    "date": "2026-11-14",
    "publishedDate": "2026-11-14",
    "lengthCategory": "short",
    "durationSec": 54,
    "script": "洗完手不小心把水滴在浅蓝色T恤或灰色裤子上，被水打湿的那一小块布料，颜色立刻会变成深蓝色或深灰色；等水干了，颜色又变浅回来了。水明明是透明无色的，为什么会让衣服变深呢？光学家解释说：衣服干着的时候，布料纤维之间全是微小的空气缝隙，照在衣服上的阳光在纤维表面发生无数次散射，很大一部分光直接反射回我们的眼睛，所以看起来明亮偏浅；当水填满纤维缝隙后，水的折射率和布料纤维很接近，光线不再立刻反射回来，而是顺着水层发生“全内反射”钻进布料深处，被染料吸收了更多光。反射进眼睛的光变少了，湿衣服自然看起来颜色更深啦！",
    "audio": {
      "female": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/female/daily-20261114-97cc5c45fc.mp3",
      "male": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/male/daily-20261114-97cc5c45fc.mp3"
    }
  },
  {
    "id": "daily-20261114-ccd3864424",
    "topic": "科学",
    "title": "科学家发现了一种令人惊讶的简单方法，可以将咖啡废物转化为燃料",
    "source": "ScienceDaily Earth & Climate",
    "url": "https://www.sciencedaily.com/releases/2026/11/261112025544.htm",
    "date": "2026-11-14",
    "publishedDate": "2026-11-14",
    "lengthCategory": "short",
    "durationSec": 70,
    "script": "如果把日常习以为常的现象放到放大镜下，你会发现一个好玩的科学问题。最近，ScienceDaily Earth & Climate报道了一条关于“科学家发现了一种令人惊讶的简单方法，可以将咖啡废物转化为燃料”的新进展。具体是怎么回事呢？原来，科学家们开发出了一种有效的方法，可以将用过的咖啡渣转化为生物柴油的潜在来源，同时保留剩余材料用于其他可再生燃料和有价值的化学品。这一发现可以将数百万吨废弃的咖啡废物变成一种令人惊讶的有用的可持续能源资源。看到这样的发现，研究团队并没有只停留在表面现象上，而是进一步追问背后的原理：这个现象需要满足什么样的条件？如果换一个环境，结果还会一样吗？你看，无论是大实验还是小观察，只要多问一句“为什么会这样”，平平无奇的生活角落也会变成你的科学实验室。今天听到的小原理，晚上吃饭时可以考考爸爸妈妈哦！",
    "audio": {
      "female": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/female/daily-20261114-ccd3864424.mp3",
      "male": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/male/daily-20261114-ccd3864424.mp3"
    }
  },
  {
    "id": "daily-20261113-6241768f81",
    "topic": "科学",
    "title": "UARX Space 凭借 OSSIE-D 的首飞标志着西班牙航天工业的里…",
    "source": "Spaceflight News · SpaceNews",
    "url": "https://spacenews.com/uarx-space-marks-a-milestone-for-spains-space-industry-with-the-maiden-flight-of-ossie-d-featuring-a-complete-power-subsystem-supplied-by-dhv-technology/",
    "date": "2026-11-13",
    "publishedDate": "2026-11-13",
    "lengthCategory": "short",
    "durationSec": 44,
    "script": "如果把日常习以为常的现象放到放大镜下，你会发现一个好玩的科学问题。根据Spaceflight News · SpaceNews的最新分享，UARX Space 凭借 OSSIE-D 的首飞标志着西班牙航天工业的里…。西班牙尼格兰| 2026 年 11 月 12 日 – UARX Space 部署了 OSSIE-D，这是一种轨道传输飞行器 (OTV)，设计和制造了西班牙航天工业的一个重要里程碑。为什么这件事值得我们留意呢？因为它展示了科学领域里一个正在发生的具体变化，让我们看到科学家和研究者是如何一步步用真实数据解开谜题的。",
    "audio": {
      "female": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/female/daily-20261113-6241768f81.mp3",
      "male": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/male/daily-20261113-6241768f81.mp3"
    }
  },
  {
    "id": "daily-20261113-5ec46dd0d1",
    "topic": "科学",
    "title": "ULA 的 Vulcan 将携带首个 Amazon Leo 有效载荷返回飞行",
    "source": "Spaceflight News · NASASpaceflight",
    "url": "https://www.nasaspaceflight.com/2026/11/amazon-leo-lv-01/",
    "date": "2026-11-13",
    "publishedDate": "2026-11-13",
    "lengthCategory": "short",
    "durationSec": 55,
    "script": "如果把日常习以为常的现象放到放大镜下，你会发现一个好玩的科学问题。最近，Spaceflight News · NASASpaceflight报道了一条关于“ULA 的 Vulcan 将携带首个 Amazon Leo 有效载荷返回飞行”的新进展。具体是怎么回事呢？原来，联合发射联盟当前的旗舰运载火箭“火神”计划在……之后返回飞行。看到这样的发现，研究团队并没有只停留在表面现象上，而是进一步追问背后的原理：这个现象需要满足什么样的条件？如果换一个环境，结果还会一样吗？你看，无论是大实验还是小观察，只要多问一句“为什么会这样”，平平无奇的生活角落也会变成你的科学实验室。今天听到的小原理，晚上吃饭时可以考考爸爸妈妈哦！",
    "audio": {
      "female": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/female/daily-20261113-5ec46dd0d1.mp3",
      "male": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/male/daily-20261113-5ec46dd0d1.mp3"
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
    "id": "curio-20261103-aero-02",
    "topic": "航天",
    "title": "中国空间站每天绕地球飞16圈，航天员怎么知道该睡觉了？",
    "source": "中国载人航天工程办公室",
    "url": "https://www.cmse.gov.cn/",
    "date": "2026-11-03",
    "publishedDate": "2026-11-03",
    "lengthCategory": "short",
    "durationSec": 58,
    "script": "在地球上，太阳升起我们起床，太阳落山我们睡觉，一天正好二十四小时。可是在距离地面约四百公里的中国“天宫”空间站里，飞船每九十分钟就会绕地球飞完一整圈！这意味着，航天员在一天二十四小时里，会看到十六次日出和十六次日落，窗外每隔四十五分钟就切换一次白天和黑夜。如果看窗外的太阳作息，生物钟肯定彻底乱套了。那航天员怎么办呢？原来，空间站舱内严格统一使用北京时间！科研人员专门为天宫设计了智能情景照明系统：到了早上起床时间，舱内灯光会模拟清晨温和偏蓝的阳光，唤醒大脑；到了晚上准备休息时，灯光会自动调暗并变成柔和的暖色，减少蓝光刺激，帮航天员安稳入睡。",
    "audio": {
      "female": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/female/curio-20261103-aero-02.mp3",
      "male": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/male/curio-20261103-aero-02.mp3"
    }
  },
  {
    "id": "curio-20261103-aero-03",
    "topic": "航天",
    "title": "嫦娥六号是怎么在看不见的月球背面“盲抓”月壤并带回地球的？",
    "source": "国家航天局探月与航天工程中心",
    "url": "https://www.clep.org.cn/",
    "date": "2026-11-03",
    "publishedDate": "2026-11-03",
    "lengthCategory": "medium",
    "durationSec": 98,
    "script": "由于月球的自转周期和绕地球公转周期完全相同，月球永远只有正面对着地球，而月球背面则永远背对我们。如果探测器落到月球背面，地球上的天线根本收不到它的直接无线电信号，因为整颗月球挡在了中间！那中国的嫦娥六号是怎么实现人类历史上第一次从月球背面挖土、并把一千九百三十五克珍贵月壤带回地球的呢？第一步，工程师先发射了一颗名叫“鹊桥二号”的中继通信卫星，让它飞到月球背后的特殊环月轨道上，像一面高高举起的信号反光镜，同时看得到月球背面和地球。第二步，嫦娥六号降落在月球背面南极-艾特肯盆地时，时间非常紧迫。它既用机械臂末端的铲子在表面“铲土”，又用钻头往地下钻取岩芯。为了节省每一分钟，探测器搭载了自主智能采样系统，不用等地面每一条指令，就能自己拍照识别哪里的石头多、哪里适合下铲。更神奇的是封装和起飞：装满月壤的容器被密封后，上升器直接把着陆器当成临时发射架，在月球背面点火升空，在环月轨道上完成高速交会对接，像空中接力棒一样把样品舱交给返回器。这些来自月球背面的土壤，正在帮助科学家解开月球正面和背面为什么长得截然不同的四十亿年谜题。",
    "audio": {
      "female": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/female/curio-20261103-aero-03.mp3",
      "male": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/male/curio-20261103-aero-03.mp3"
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
    "id": "curio-20261103-spc-03",
    "topic": "太空",
    "title": "月球上的脚印为什么能保存上百万年？揭开月球没有风和雨的秘密",
    "source": "NASA Lunar Reconnaissance Orbiter",
    "url": "https://lunar.gsfc.nasa.gov/",
    "date": "2026-11-03",
    "publishedDate": "2026-11-03",
    "lengthCategory": "medium",
    "durationSec": 88,
    "script": "如果你在海边的沙滩上踩一串脚印，只要几分钟，海浪和海风就会把脚印抹得干干净净。可是在一九六九年到一九七二年之间，阿波罗计划的宇航员在月球表面踩下的鞋印、还有月球车留下的车轮印，直到今天，月球勘测轨道飞行器从高空拍下来，依然清晰得像昨天刚踩上去的一样！科学家计算后表示，这些脚印在月球上至少可以保持一百万年甚至上千万年。为什么月球的记忆力这么长久呢？因为月球表面几乎是真空状态，没有大气层。没有空气，就不会刮风；没有液态水，就不会下雨或流淌溪水；月球内部也早就冷却了，没有火山喷发和板块移动来翻新地面。那么，一百万年后是什么东西会把脚印慢慢擦掉呢？答案是来自太空的“微陨石雨”！因为没有大气层保护，每天都有无数比沙粒还小的宇宙尘埃，以每秒几十公里的超高速直接砸在月球表面。这些微小的撞击日积月累，就像用最慢的砂纸轻轻打磨地面一样，平均每一百万年才会把月球表面最上面的一两毫米月壤翻动一遍。所以在月球上，每一个脚印都是跨越百万年的时间胶囊。",
    "audio": {
      "female": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/female/curio-20261103-spc-03.mp3",
      "male": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/male/curio-20261103-spc-03.mp3"
    }
  },
  {
    "id": "curio-20261103-spc-04",
    "topic": "太空",
    "title": "土星美丽的光环其实不是一整块圆盘，而是无数冰块组成的太空溜冰场",
    "source": "European Space Agency / Cassini",
    "url": "https://www.esa.int/",
    "date": "2026-11-03",
    "publishedDate": "2026-11-03",
    "lengthCategory": "medium",
    "durationSec": 90,
    "script": "用天文望远镜看土星，最迷人的就是它腰间那圈闪闪发光的巨大光环，看起来就像一顶宽边的草帽。在几百年前伽利略第一次用望远镜看到它时，还以为土星长了两只大耳朵。如果驾驶飞船飞近土星光环，能不能在光环上面降落或者散步呢？千万别试，因为土星环根本不是一块实心的圆盘！“卡西尼号”探测器在土星身边观测了十三年，发回了超高清特写照片。原来，土星环是由数不清的纯净水冰块、雪球和裹着冰的岩石碎片组成的，数量多达数万亿颗！这些冰块有的小得像灰尘和冰雹，有的大得像一辆公共汽车甚至一座小山。它们排着整齐的队伍，以每小时好几万公里的速度围绕土星飞奔，就像一座浩瀚的太空环形溜冰场。更令人惊讶的是土星环的“身材比例”：它的直径足足有二十八万公里，能并排放下二十二个地球；可是它的平均厚度却只有十米到三十米，大约只相当于一栋三层教学楼那么高！如果把土星环按比例缩小成一张A4纸那么大，它会比一根头发丝还要薄一万倍。就是这样一层薄薄的宇宙冰晶，反射着遥远的阳光，成了太阳系最壮观的珠宝。",
    "audio": {
      "female": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/female/curio-20261103-spc-04.mp3",
      "male": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/male/curio-20261103-spc-04.mp3"
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
    "id": "daily-20261114-e232e29fb2",
    "topic": "AI",
    "title": "教AI认识甲骨文：三千年前刻在乌龟壳上的汉字是怎么被计算机破译的？",
    "source": "数字人文与人工智能科普",
    "url": "https://www.kepuchina.cn/ai-oracle-bones",
    "date": "2026-11-14",
    "publishedDate": "2026-11-14",
    "lengthCategory": "medium",
    "durationSec": 83,
    "script": "在三千多年前的商朝，古人把占卜和记事的文字刻在乌龟壳和兽骨上，这就是中国最早的成熟汉字——甲骨文。考古学家至今一共挖出了十几万片甲骨碎片，上面有四千五百多个不同的单字，可是其中还有将近三千个字，连最厉害的古文字学家都不认识！更让人头疼的是，许多甲骨在地下埋了三千年，早就碎成了几万块小骨片，要想把原本属于同一块龟壳的碎片拼回一起，就像在拼一幅有几万片、还缺了一大半的立体拼图。现在，人工智能成了考古学家的超级助手！研究人员用三维激光扫描仪拍下每一片甲骨的边缘弧度、裂纹走向和字迹深浅，交给深度学习模型去比对。AI只需要几秒钟，就能在几万片碎骨头里找出断裂口严丝合缝的两片，已经成功帮科学家拼合了好几十组失散千年的甲骨！同时，多模态AI还会把甲骨文的笔画结构跟后来的金文、小篆放在一起对比，推演字形演变的规律，帮学者寻找未解古字的读音和含义线索。古老文明与前沿AI，就这样跨越三千年握了手。",
    "audio": {
      "female": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/female/daily-20261114-e232e29fb2.mp3",
      "male": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/male/daily-20261114-e232e29fb2.mp3"
    }
  },
  {
    "id": "daily-20261114-b7b7dda9b0",
    "topic": "AI",
    "title": "新的人工智能“副驾驶”让工程师在算法创建结构设计时指导结构设计",
    "source": "TechXplore AI",
    "url": "https://techxplore.com/news/2026-11-ai-copilot-algorithms.html",
    "date": "2026-11-14",
    "publishedDate": "2026-11-14",
    "lengthCategory": "medium",
    "durationSec": 100,
    "script": "人工智能不仅能聊天和画画，科学家正教它学习解决真正的科学难题。今天我们要深入聊聊来自TechXplore AI的一篇特别报道：新的人工智能“副驾驶”让工程师在算法创建结构设计时指导结构设计。故事要从研究人员观察到的具体线索说起：使用算法来设计结构催生了针对超轻型飞机、高带宽天线和 F1 赛车优化的新零件。但最好的算法设计技术仍然需要大量的计算和时间：用户只有在完成后才能看到最终的设计，之后他们通常必须重新开始设计过程以进行更改。这个过程也让人们更难相信最终的设计在结构上是合理的。把这条线索放到整个AI的大地图里来看，你会发现科学研究从来不是一蹴而就的。在得出结论之前，科研人员往往要先设计对照实验或者长期观测方案，把可能干扰结果的因素一个个排除掉，还要把测量数据公开出来，请世界各地的同行一起检验。对于我们十岁左右的小听众来说，理解这条新发现最好的办法，就是先抓住它最核心的那个变化：它到底解决了什么旧难题，或者推翻了哪一个过去的猜想？人工智能是人类造出的强大助手，但它依然需要人类的好奇心、判断力和责任感来引导。学会提出好问题、核实真证据，才是未来最重要的本领。",
    "audio": {
      "female": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/female/daily-20261114-b7b7dda9b0.mp3",
      "male": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/male/daily-20261114-b7b7dda9b0.mp3"
    }
  },
  {
    "id": "curio-20261103-ai-01",
    "topic": "AI",
    "title": "AI是怎么听懂鲸鱼说话的？给抹香鲸做“海洋外语词典”",
    "source": "Project CETI / National Geographic",
    "url": "https://www.projectceti.org/",
    "date": "2026-11-03",
    "publishedDate": "2026-11-03",
    "lengthCategory": "short",
    "durationSec": 54,
    "script": "在深邃的海洋里，抹香鲸之间并不唱悠长的歌，而是发出一连串像摩尔斯电码一样的“咔哒、咔哒”声。人类听了这些咔哒声几十年，却一直听不懂它们到底在聊什么。现在，海洋生物学家与人工智能团队发起了“鲸类翻译计划”，在水下安放了数十个高灵敏度水听器，录下了成千上万次抹香鲸家族的对话。AI模型对这些声音的节奏、速度、细微停顿和附加音节进行分析后，惊讶地发现抹香鲸的咔哒声竟然有一套包含上百种组合的“鲸鱼拼音表”！它们不仅会根据聊天对象调整语速，还会在妈妈带小鲸鱼下潜猎食时发出特定的协调口令。也许再过几年，AI真能帮我们听懂抹香鲸的问候！",
    "audio": {
      "female": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/female/curio-20261103-ai-01.mp3",
      "male": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/male/curio-20261103-ai-01.mp3"
    }
  },
  {
    "id": "curio-20261103-ai-02",
    "topic": "AI",
    "title": "为什么人工智能画画时，有时候会把人的手指画成六根？",
    "source": "Science News Explores",
    "url": "https://www.snexplores.org/",
    "date": "2026-11-03",
    "publishedDate": "2026-11-03",
    "lengthCategory": "short",
    "durationSec": 59,
    "script": "如果你仔细观察早期AI生成的图片，常会发现一个搞笑的破绽：画里人物的脸蛋和衣服都很逼真，可一数手指头，竟然长出了六根甚至七根！为什么聪明的AI连“一只手有五根手指”都数不清呢？因为AI画画的时候，脑子里并没有一副立体的骨骼模型。它并不是先想好“手掌连着五根骨头”，再去画皮肤；而是通过学习几亿张照片里像素点挨着像素点的统计规律来拼图。在照片里，人的手有时握拳、有时拿杯子、有时交叉在一起，从不同角度看过去，露出来的手指数量千变万化。早期AI只记住了“手指旁边通常还挨着另一根手指”的局部规律，却忘了数总数，于是就多画了一根。这也说明AI擅长找图像规律，却不等于真正理解了现实世界！",
    "audio": {
      "female": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/female/curio-20261103-ai-02.mp3",
      "male": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/male/curio-20261103-ai-02.mp3"
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
    "id": "daily-20261114-91ae39dd31",
    "topic": "科技",
    "title": "钻石中的微小缺陷可能引发量子计算革命",
    "source": "ScienceDaily AI & Math",
    "url": "https://www.sciencedaily.com/releases/2026/11/261111005855.htm",
    "date": "2026-11-14",
    "publishedDate": "2026-11-14",
    "lengthCategory": "short",
    "durationSec": 48,
    "script": "一项好的工程与科技，能把实验室里的物理原理变成守护生活的超级工具。根据ScienceDaily AI & Math的最新分享，钻石中的微小缺陷可能引发量子计算革命。科学家们发现了一种更快的方法来识别金刚石基材料，这些材料可以在室温下为量子计算机和传感器提供动力。这一突破已经揭示了有前途的新量子构建模块，可以帮助释放远远超出当今超级计算机的计算能力。为什么这件事值得我们留意呢？因为它展示了科技领域里一个正在发生的具体变化，让我们看到科学家和研究者是如何一步步用真实数据解开谜题的。",
    "audio": {
      "female": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/female/daily-20261114-91ae39dd31.mp3",
      "male": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/male/daily-20261114-91ae39dd31.mp3"
    }
  },
  {
    "id": "daily-20261114-9d1ff60e4d",
    "topic": "科技",
    "title": "水力发电研究揭示了阿巴拉契亚的能源潜力",
    "source": "TechXplore Engineering",
    "url": "https://techxplore.com/news/2026-11-hydropower-reveals-energy-potential-appalachia.html",
    "date": "2026-11-14",
    "publishedDate": "2026-11-14",
    "lengthCategory": "short",
    "durationSec": 44,
    "script": "今天的科技故事，带大家拆开现代工程里的一个巧妙设计。根据TechXplore Engineering的最新分享，水力发电研究揭示了阿巴拉契亚的能源潜力。根据最近的一项研究，在北卡罗来纳州西部的偏远地区，小型水力发电系统可以产生 22.6 兆瓦的电力，足以为该地区的 5,000 户家庭供电，该地区崎岖、森林茂密的地形限制了可靠的能源获取。为什么这件事值得我们留意呢？因为它展示了科技领域里一个正在发生的具体变化，让我们看到科学家和研究者是如何一步步用真实数据解开谜题的。",
    "audio": {
      "female": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/female/daily-20261114-9d1ff60e4d.mp3",
      "male": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/male/daily-20261114-9d1ff60e4d.mp3"
    }
  },
  {
    "id": "daily-20261113-1001a1845b",
    "topic": "科技",
    "title": "科学史上的今天（1927年）：荷兰隧道开通，将曼哈顿与哈德逊河下的泽西市连…",
    "source": "维基百科 · 科学史上的今天",
    "url": "https://en.wikipedia.org/wiki/Holland_Tunnel",
    "date": "2026-11-13",
    "publishedDate": "2026-11-13",
    "lengthCategory": "short",
    "durationSec": 49,
    "script": "一项好的工程与科技，能把实验室里的物理原理变成守护生活的超级工具。根据维基百科 · 科学史上的今天的最新分享，科学史上的今天（1927年）：荷兰隧道开通，将曼哈顿与哈德逊河下的泽西市连…。荷兰隧道是哈德逊河下的一条车辆隧道，东连接纽约市哈德逊广场和曼哈顿下城，西连接新泽西州泽西市。该隧道由纽约和新泽西港务局运营，承载78号州际公路。为什么这件事值得我们留意呢？因为它展示了科技领域里一个正在发生的具体变化，让我们看到科学家和研究者是如何一步步用真实数据解开谜题的。",
    "audio": {
      "female": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/female/daily-20261113-1001a1845b.mp3",
      "male": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/male/daily-20261113-1001a1845b.mp3"
    }
  },
  {
    "id": "curio-20261103-tech-01",
    "topic": "科技",
    "title": "海底光缆：你刷到的跨国网页，其实是钻过几千米深海的激光束！",
    "source": "TeleGeography / 中国科普博览",
    "url": "https://www.submarinecablemap.com/",
    "date": "2026-11-03",
    "publishedDate": "2026-11-03",
    "lengthCategory": "short",
    "durationSec": 52,
    "script": "很多同学以为，现在手机和电脑都连着Wi-Fi，全世界的互联网信号肯定都是靠天上的卫星飞来飞去的吧？其实恰恰相反！全世界超过百分之九十五的跨洋互联网数据，走的不是天上，而是趴在几千米深的海底！在太平洋和大西洋底部的海床上，铺设着五百多条总长超过一百四十万公里的“海底光缆”。整根海底光缆的粗细只有花园浇水管那么粗，最核心的玻璃光纤比头发丝还要细，外层则包裹着铜管、塑料、防鲨鱼啃咬的钢丝铠甲和沥青层。每秒钟有数以亿计的激光脉冲在玻璃丝里以接近光速飞奔，把世界各地的图书馆、网站和视频连接在一起。",
    "audio": {
      "female": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/female/curio-20261103-tech-01.mp3",
      "male": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/male/curio-20261103-tech-01.mp3"
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
    "id": "daily-20261114-08ed129a32",
    "topic": "金融",
    "title": "研究将水泥颗粒形状与施工成本联系起来",
    "source": "TechXplore Engineering",
    "url": "https://techxplore.com/news/2026-11-links-cement-particle.html",
    "date": "2026-11-14",
    "publishedDate": "2026-11-14",
    "lengthCategory": "short",
    "durationSec": 55,
    "script": "用经济学家的眼光看生活，你会发现数字和价格背后有一套好玩的逻辑。根据TechXplore Engineering的最新分享，研究将水泥颗粒形状与施工成本联系起来。伊利诺伊大学厄巴纳-香槟分校的工程师开发了一种低成本测试，可以帮助建筑行业节省资金。这项新技术使用价值 500 美元的基于显微镜的框架来测量水泥颗粒尺寸和形状（这对水泥和混凝土质量都至关重要），其成本只是目前使用的激光衍射设备的一小部分，后者的成本约为 50,000 美元或更多。为什么这件事值得我们留意呢？因为它展示了金融领域里一个正在发生的具体变化，让我们看到科学家和研究者是如何一步步用真实数据解开谜题的。",
    "audio": {
      "female": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/female/daily-20261114-08ed129a32.mp3",
      "male": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/male/daily-20261114-08ed129a32.mp3"
    }
  },
  {
    "id": "daily-20261110-28ce724ae8",
    "topic": "金融",
    "title": "最新的样本，最古老的岩石？",
    "source": "Spaceflight News · NASA",
    "url": "https://science.nasa.gov/blog/newest-sample-oldest-rock/",
    "date": "2026-11-10",
    "publishedDate": "2026-11-10",
    "lengthCategory": "short",
    "durationSec": 67,
    "script": "用经济学家的眼光看生活，你会发现数字和价格背后有一套好玩的逻辑。最近，Spaceflight News · NASA报道了一条关于“最新的样本，最古老的岩石？”的新进展。具体是怎么回事呢？原来，作者：Tasha Coelho，亚利桑那州立大学 Mastcam-Z 学生合作者，2026 年 11 月 1 日 Perseverance 最近的磨损“Pumbe”与早期的磨损“Badger Peak”极为相似。正如之前报道的那样，该岩石的硬度太高，无法取芯。然而，团队强烈认为这是值得的。看到这样的发现，研究团队并没有只停留在表面现象上，而是进一步追问背后的原理：这个现象需要满足什么样的条件？如果换一个环境，结果还会一样吗？懂得金融和经济知识，不是为了数钱，而是为了明白每一份劳动、每一份信任和每一次选择背后的价值，做自己时间和零花钱的聪明小主人。",
    "audio": {
      "female": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/female/daily-20261110-28ce724ae8.mp3",
      "male": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/male/daily-20261110-28ce724ae8.mp3"
    }
  },
  {
    "id": "curio-20261103-fin-01",
    "topic": "金融",
    "title": "太平洋雅浦岛上的“大石轮货币”：搬不走的钱怎么买东西？",
    "source": "Smithsonian Magazine",
    "url": "https://www.smithsonianmag.com/",
    "date": "2026-11-03",
    "publishedDate": "2026-11-03",
    "lengthCategory": "short",
    "durationSec": 54,
    "script": "我们口袋里的硬币只有几克重，可是在太平洋西部的雅浦岛上，古代岛民使用的货币竟然是直径可达三米、重达四吨的巨大石灰岩圆盘，中间有个圆洞，叫做“斐石”！这么重的大石头，买一袋椰子或一艘独木舟时，难道要全村人抬着大石头去付账吗？完全不用！雅浦岛民想出了一个极聪明的办法：大石轮就原地摆在路边或广场上，根本不用挪动。当A把石轮付给B时，只要全村人一起见证并记住“从今天起，路边第三块大石轮归B所有了”，交易就完成了！经济学家发现，这其实就是现代银行转账和数字账本最早的雏形——钱的本质不是搬运金属或石头，而是大家共同认可的信用记录。",
    "audio": {
      "female": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/female/curio-20261103-fin-01.mp3",
      "male": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/male/curio-20261103-fin-01.mp3"
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
    "id": "daily-20261114-655c7e4144",
    "topic": "地理",
    "title": "横跨欧亚大陆的伊斯坦布尔海峡：为什么上层海水往南流，下层海水却同时往北流？",
    "source": "海洋地理学奇观",
    "url": "https://earthobservatory.nasa.gov/bosphorus-currents",
    "date": "2026-11-14",
    "publishedDate": "2026-11-14",
    "lengthCategory": "medium",
    "durationSec": 88,
    "script": "在土耳其名城伊斯坦布尔中间，有一条长约三十公里、最窄处只有七百米宽的博斯普鲁斯海峡。它的一头连着黑海，另一头连着马尔马拉海和地中海，左边是欧洲，右边是亚洲。在几百年前，当地渔民就发现了一个怪事：如果把渔网沉到海峡水下三十米深的地方，明明海面上的船只正顺着水流往南漂向地中海，水底下的渔网却被一股强大的暗流拉着往北跑，方向正好相反！同一条海峡里，怎么会上下两层海水背道而驰呢？后来海洋学家通过测量海水盐度解开了谜题。原来，北边的黑海有好几条大河源源不断地注入淡水，而且气温较低、蒸发少，所以黑海的海水比较“淡”，密度小、重量轻，海平面还比南边的海高出大约三十厘米；而南边的地中海阳光炽热、蒸发强烈，海水特别咸，密度大、重量沉！于是，当两边海水在狭窄的博斯普鲁斯海峡相遇时，上层较轻的黑海低盐海水顺着表面往南流；而下层较重的地中海高盐海水则贴着海底，像一条看不见的海底大河一样源源不断地往北流进黑海，形成了大自然神奇的“双层逆向洋流”。",
    "audio": {
      "female": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/female/daily-20261114-655c7e4144.mp3",
      "male": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/male/daily-20261114-655c7e4144.mp3"
    }
  },
  {
    "id": "daily-20261114-89565e5bf1",
    "topic": "地理",
    "title": "一张新的藏宝图揭示了地球上失落的史前生命可能隐藏的地方",
    "source": "ScienceDaily Plants & Animals",
    "url": "https://www.sciencedaily.com/releases/2026/11/261112025529.htm",
    "date": "2026-11-14",
    "publishedDate": "2026-11-14",
    "lengthCategory": "medium",
    "durationSec": 73,
    "script": "地图上的每一条海岸线、每一座雪山，都有一段跨越百万年的地理传奇。最近，ScienceDaily Plants & Animals报道了一条关于“一张新的藏宝图揭示了地球上失落的史前生命可能隐藏的地方”的新进展。具体是怎么回事呢？原来，对 5.4 亿年前的海洋化石的全面分析揭示了我们对地球古代生命的理解存在惊人的差距。科学家发现，发现以前未知物种的一些最大机会存在于相对较新的地质时期，而不是遥远的过去。通过绘制世界各地未经勘探的化石丰富地区的地图，研究人员创建了一个强大的工具来指导未来的挖掘。看到这样的发现，研究团队并没有只停留在表面现象上，而是进一步追问背后的原理：这个现象需要满足什么样的条件？如果换一个环境，结果还会一样吗？跨越山海的地理故事告诉我们，哪怕相隔万里，不同大陆的气候与生态也紧紧相连。爱护我们身边的环境，就是在守护整颗蓝色星球。",
    "audio": {
      "female": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/female/daily-20261114-89565e5bf1.mp3",
      "male": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/male/daily-20261114-89565e5bf1.mp3"
    }
  },
  {
    "id": "daily-20261110-69d28f4480",
    "topic": "地理",
    "title": "好奇心博客，Sols 5056-5062：充电回来！",
    "source": "Spaceflight News · NASA",
    "url": "https://science.nasa.gov/blog/curiosity-blog-sols-5056-5062-charging-back-up/",
    "date": "2026-11-10",
    "publishedDate": "2026-11-10",
    "lengthCategory": "short",
    "durationSec": 57,
    "script": "旋转地球仪，高山、深海、沙漠和季风正在地球表面上演跨越千里的联动。根据Spaceflight News · NASA的最新分享，好奇心博客，Sols 5056-5062：充电回来！。作者：Remington Free，NASA-JPL 操作系统工程师 地球规划日期：2026 年 10 月 30 日星期五 今天的计划涵盖了 3 个 sol，即 5060、5061 和 5062，因为我们在返回正常钻探活动之前会进行一些充电。如果您一直密切关注该博客，您可能知道，我们处于中间位置。为什么这件事值得我们留意呢？因为它展示了地理领域里一个正在发生的具体变化，让我们看到科学家和研究者是如何一步步用真实数据解开谜题的。",
    "audio": {
      "female": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/female/daily-20261110-69d28f4480.mp3",
      "male": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/male/daily-20261110-69d28f4480.mp3"
    }
  },
  {
    "id": "daily-20261110-270106a671",
    "topic": "地理",
    "title": "秋天的早晨带来山谷的雾气",
    "source": "Spaceflight News · NASA",
    "url": "https://science.nasa.gov/earth/earth-observatory/autumn-mornings-bring-valley-fog/",
    "date": "2026-11-10",
    "publishedDate": "2026-11-10",
    "lengthCategory": "short",
    "durationSec": 52,
    "script": "旋转地球仪，高山、深海、沙漠和季风正在地球表面上演跨越千里的联动。最近，Spaceflight News · NASA报道了一条关于“秋天的早晨带来山谷的雾气”的新进展。具体是怎么回事呢？原来，低云沿着阿巴拉契亚高原和坎伯兰河的分支山谷流动，然后在下午消失。看到这样的发现，研究团队并没有只停留在表面现象上，而是进一步追问背后的原理：这个现象需要满足什么样的条件？如果换一个环境，结果还会一样吗？跨越山海的地理故事告诉我们，哪怕相隔万里，不同大陆的气候与生态也紧紧相连。爱护我们身边的环境，就是在守护整颗蓝色星球。",
    "audio": {
      "female": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/female/daily-20261110-270106a671.mp3",
      "male": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/male/daily-20261110-270106a671.mp3"
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
    "id": "curio-20261103-inv-03",
    "topic": "发明",
    "title": "翠鸟尖尖的嘴巴，如何帮新干线与高铁解决了进出隧道的“音爆巨响”？",
    "source": "AskNature Biomimicry Institute",
    "url": "https://asknature.org/",
    "date": "2026-11-03",
    "publishedDate": "2026-11-03",
    "lengthCategory": "medium",
    "durationSec": 106,
    "script": "观察今天的高速列车，你会发现车头全都长着长长的、扁圆流线型的“大鼻子”。这不仅是为了好看，背后还藏着一段向小鸟拜师学艺的仿生发明故事！当早期高速列车速度提升到每小时两百七十公里以上时，工程师遇到了一个非常棘手的问题：每当列车冲进狭窄的隧道，车头就像活塞塞进针筒一样，把隧道里的空气猛烈往前推挤，形成一股强大的压缩压力波。这股压力波以音速冲到隧道出口时，会骤然膨胀，发出像打雷甚至炸弹爆炸一样的“隧道音爆”，连几百米外的居民窗户都会被震得嗡嗡响！恰好，负责改进车头的总工程师仲津英治是一位业余观鸟爱好者。有一天他在河边观察翠鸟捕鱼，脑海里突然闪过一道灵光！翠鸟从空气中俯冲扎进水里捉小鱼时，空气和水的密度相差八百倍，跟列车从开阔空气冲进狭窄隧道非常相似。可是翠鸟入水时，水面几乎溅不起一点水花，也听不到噗通声！工程师仔细测量了翠鸟长喙的几何形状：它的嘴巴前尖后宽，横截面接近椭圆形，上下棱线平滑过渡，能让水流顺畅地向四周分流，而不是堵在前面。团队把翠鸟喙的曲线搬进风洞实验室，设计出了长达十五米的仿生流线型车头。结果列车冲进隧道时的空气阻力降低了百分之三十，刺耳的隧道音爆彻底消失了，连耗电量都省下了百分之十五！",
    "audio": {
      "female": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/female/curio-20261103-inv-03.mp3",
      "male": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/male/curio-20261103-inv-03.mp3"
    }
  },
  {
    "id": "curio-20261103-inv-04",
    "topic": "发明",
    "title": "做错实验造出“粘不牢的胶水”，却意外发明了全世界都在用的便利贴！",
    "source": "Smithsonian Invention Stories",
    "url": "https://invention.si.edu/",
    "date": "2026-11-03",
    "publishedDate": "2026-11-03",
    "lengthCategory": "medium",
    "durationSec": 100,
    "script": "在你的课本和书桌上，一定贴过五颜六色的方形便利贴。它可以轻轻粘在纸上不掉下来，撕走的时候又不会把书页撕破，还能反复贴好几次。可你知道吗？便利贴背后的那种特殊胶水，最初其实是一次“彻底失败”的化学实验！一九六八年，化学家斯宾塞·西尔弗在实验室里本来想研制一种超级强力胶水，用来粘合飞机零件。结果他在调配丙烯酸酯共聚物配方时出了偏差，造出来的胶水非但不牢固，反而变成了一颗颗在显微镜下像小篮球一样的微球结构。这种微球胶水粘性极弱，贴在任何表面都只能点状接触，手指一揭就掉了。在造飞机的工程师眼里，这种“粘不牢的胶水”简直毫无用处。但西尔弗觉得它很有意思：虽然粘不牢，可撕下来的时候一点残留胶印都没有，而且微球不会破，撕下来还能再粘！他到处给同事展示，却整整五年没人知道能拿它干什么。直到五年后，他的同事阿瑟·弗莱在合唱团唱歌时，夹在歌本里的小纸条书签总是哗啦啦掉在地上。弗莱突然想起了那种“失败的弱胶水”：如果把弱胶水涂在小纸条背面，不就成了一贴就稳、一撕就走、还不伤书页的完美书签吗？两个人的想法一拍即合，风靡全世界的便利贴就这样从“失败品”变成了办公和学习神器！",
    "audio": {
      "female": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/female/curio-20261103-inv-04.mp3",
      "male": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/male/curio-20261103-inv-04.mp3"
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
    "id": "daily-20261114-47395265f7",
    "topic": "生物",
    "title": "阿拉斯加对其珍贵的鲑鱼数量下降表示遗憾",
    "source": "Phys.org Biology",
    "url": "https://phys.org/news/2026-11-alaska-laments-decline-prized-salmon.html",
    "date": "2026-11-14",
    "publishedDate": "2026-11-14",
    "lengthCategory": "short",
    "durationSec": 40,
    "script": "今天我们走进奇妙的生物圈，去认识一位身怀绝技的生命朋友。根据Phys.org Biology的最新分享，阿拉斯加对其珍贵的鲑鱼数量下降表示遗憾。在他的阿拉斯加社区，渔民鲍勃·坎多普洛斯（Bob Candopoulos）长期以来一直欢迎游客光临他的生意，他的生意上有一个带有帝王鲑的标志。为什么这件事值得我们留意呢？因为它展示了生物领域里一个正在发生的具体变化，让我们看到科学家和研究者是如何一步步用真实数据解开谜题的。",
    "audio": {
      "female": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/female/daily-20261114-47395265f7.mp3",
      "male": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/male/daily-20261114-47395265f7.mp3"
    }
  },
  {
    "id": "daily-20261107-3b65ab7bb3",
    "topic": "生物",
    "title": "科学历史的今天（1934年）：第一个被科学描述的簇冠松鸦标本是在墨西哥采集的",
    "source": "维基百科 · 科学史上的今天",
    "url": "https://en.wikipedia.org/wiki/Tufted_jay",
    "date": "2026-11-07",
    "publishedDate": "2026-11-07",
    "lengthCategory": "short",
    "durationSec": 45,
    "script": "今天我们走进奇妙的生物圈，去认识一位身怀绝技的生命朋友。根据维基百科 · 科学史上的今天的最新分享，科学历史的今天（1934年）：第一个被科学描述的簇冠松鸦标本是在墨西哥采集的。簇毛鸦，又名彩鸦、迪基鸦，是鸦科鸦属的一种鸟类。它是墨西哥锡那罗亚州、杜兰戈州和纳亚里特州西马德雷山脉一小部分地区的特有种。为什么这件事值得我们留意呢？因为它展示了生物领域里一个正在发生的具体变化，让我们看到科学家和研究者是如何一步步用真实数据解开谜题的。",
    "audio": {
      "female": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/female/daily-20261107-3b65ab7bb3.mp3",
      "male": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/male/daily-20261107-3b65ab7bb3.mp3"
    }
  },
  {
    "id": "curio-20261103-bio-01",
    "topic": "生物",
    "title": "章鱼竟然有三个心脏、九个大脑，而且血液还是蓝色的！",
    "source": "Monterey Bay Aquarium / 海洋生物学",
    "url": "https://www.montereybayaquarium.org/",
    "date": "2026-11-03",
    "publishedDate": "2026-11-03",
    "lengthCategory": "short",
    "durationSec": 53,
    "script": "海洋里的章鱼能拧开玻璃瓶盖、会走迷宫，被称为无脊椎动物里的“智力冠军”。如果你看看它的身体构造，更会觉得它像来自外星球的生物！首先，章鱼全身一共有三颗心脏：两颗腮心专门把血液泵到腮部吸收氧气，一颗主心脏再把富含氧气的血液泵往全身。其次，它的血液不是红色的，而是湛蓝色的！因为人类血液用含铁的血红蛋白运送氧气，而章鱼用的是含铜的“血蓝蛋白”，在寒冷缺氧的深海里效率更高。更奇妙的是，章鱼除了脑袋中央有一个主脑，八条腕足里还各自藏着一个独立的神经索“小大脑”，所以它的八条触手能一边自己摸索找螃蟹，一边完美配合！",
    "audio": {
      "female": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/female/curio-20261103-bio-01.mp3",
      "male": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/male/curio-20261103-bio-01.mp3"
    }
  },
  {
    "id": "curio-20261103-bio-02",
    "topic": "生物",
    "title": "为什么恐龙灭绝的时候，怕冷的鳄鱼却能熬过小行星撞击的漫长寒冬？",
    "source": "Solidot / 古生物学新发现",
    "url": "https://www.solidot.org/",
    "date": "2026-11-03",
    "publishedDate": "2026-11-03",
    "lengthCategory": "short",
    "durationSec": 47,
    "script": "六千六百万年前，一颗直径十公里的小行星撞击地球，扬起的漫天尘埃遮蔽了阳光，非鸟类恐龙在饥寒交迫中灭绝了，可同时代的鳄鱼却奇迹般地活到了今天！最近古生物学家对全球化石与古气候数据进行分析，揭开了鳄鱼幸存的两大法宝。第一，鳄鱼当时栖息在赤道和低纬度的温暖水域“热带避难所”，水温下降比陆地慢得多；第二，鳄鱼是变温动物，新陈代谢极慢，不像大型恒温恐龙那样每天必须吃几百斤食物来维持体温，鳄鱼哪怕一年不吃一顿饭，靠消耗尾巴里的脂肪也能静静熬过漫长的黑暗！",
    "audio": {
      "female": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/female/curio-20261103-bio-02.mp3",
      "male": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/male/curio-20261103-bio-02.mp3"
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
    "id": "daily-20261114-1f03cf5291",
    "topic": "大自然",
    "title": "洪都拉斯宣布里奥普拉塔诺生物圈保护区进入“环境紧急状态”",
    "source": "Mongabay Wildlife",
    "url": "https://news.mongabay.com/short-article/2026/11/honduras-declares-environmental-emergency-in-rio-platano-biosphere-reserve/",
    "date": "2026-11-14",
    "publishedDate": "2026-11-14",
    "lengthCategory": "short",
    "durationSec": 53,
    "script": "大自然是最神奇的设计师，风、雨、雷电和万物生灵每时每刻都在默契配合。根据Mongabay Wildlife的最新分享，洪都拉斯宣布里奥普拉塔诺生物圈保护区进入“环境紧急状态”。森林砍伐、有组织犯罪和牧场扩张导致洪都拉斯政府宣布该国最大的保护区里奥普拉塔诺生物圈保护区进入“环境紧急状态”。11 月 10 日以总统令形式发布的为期 36 个月的紧急状态将投入 15 亿洪都拉斯伦皮拉（超过 5500 万美元）。为什么这件事值得我们留意呢？因为它展示了大自然领域里一个正在发生的具体变化，让我们看到科学家和研究者是如何一步步用真实数据解开谜题的。",
    "audio": {
      "female": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/female/daily-20261114-1f03cf5291.mp3",
      "male": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/male/daily-20261114-1f03cf5291.mp3"
    }
  },
  {
    "id": "daily-20261113-217d1e075d",
    "topic": "大自然",
    "title": "工业界在推动欧洲太空主权方面发挥什么作用？",
    "source": "Spaceflight News · SpaceNews",
    "url": "https://spacenews.com/what-role-does-industry-play-in-europes-space-sovereignty-push/",
    "date": "2026-11-13",
    "publishedDate": "2026-11-13",
    "lengthCategory": "medium",
    "durationSec": 84,
    "script": "大自然是最神奇的设计师，风、雨、雷电和万物生灵每时每刻都在默契配合。今天我们要深入聊聊来自Spaceflight News · SpaceNews的一篇特别报道：工业界在推动欧洲太空主权方面发挥什么作用？。故事要从研究人员观察到的具体线索说起：在本集中，SpaceNews 的 Jason Rainbow 采访了 Kongsberg NanoAvionics 空间系统和监视业务部门的首席执行官兼高级副总裁 Atle Woello。把这条线索放到整个大自然的大地图里来看，你会发现科学研究从来不是一蹴而就的。在得出结论之前，科研人员往往要先设计对照实验或者长期观测方案，把可能干扰结果的因素一个个排除掉，还要把测量数据公开出来，请世界各地的同行一起检验。对于我们十岁左右的小听众来说，理解这条新发现最好的办法，就是先抓住它最核心的那个变化：它到底解决了什么旧难题，或者推翻了哪一个过去的猜想？大自然里的每一滴雨、每一只鸟、每一棵树都处在微妙的平衡之中。当我们学会像生态学家一样思考，就会更加懂得如何与自然温柔相处。",
    "audio": {
      "female": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/female/daily-20261113-217d1e075d.mp3",
      "male": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/male/daily-20261113-217d1e075d.mp3"
    }
  },
  {
    "id": "daily-20261113-14c088e766",
    "topic": "大自然",
    "title": "美国宇航局肯尼迪的天空之心",
    "source": "Spaceflight News · NASA",
    "url": "https://www.nasa.gov/image-article/heart-in-the-sky-at-nasa-kennedy/",
    "date": "2026-11-13",
    "publishedDate": "2026-11-13",
    "lengthCategory": "short",
    "durationSec": 67,
    "script": "今天的大自然广播，带大家去看看地球生态圈里的一场奇妙变化。最近，Spaceflight News · NASA报道了一条关于“美国宇航局肯尼迪的天空之心”的新进展。具体是怎么回事呢？原来，2026 年 11 月 8 日（周日）在佛罗里达州 NASA 肯尼迪航天中心举行的 MAX POWER 博览会和航空展期间，美国空军雷鸟飞行表演队在 NASA 车辆装配大楼附近进行飞行演习时产生了心形烟迹。NASA 的 MAX POWER 是一个庆祝飞行的过去、现在和未来的航空航天节。看到这样的发现，研究团队并没有只停留在表面现象上，而是进一步追问背后的原理：这个现象需要满足什么样的条件？如果换一个环境，结果还会一样吗？大自然里的每一滴雨、每一只鸟、每一棵树都处在微妙的平衡之中。当我们学会像生态学家一样思考，就会更加懂得如何与自然温柔相处。",
    "audio": {
      "female": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/female/daily-20261113-14c088e766.mp3",
      "male": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/male/daily-20261113-14c088e766.mp3"
    }
  },
  {
    "id": "daily-20261113-17b6995f9c",
    "topic": "大自然",
    "title": "全球红树林的复苏",
    "source": "Spaceflight News · NASA",
    "url": "https://science.nasa.gov/earth/earth-observatory/a-global-rebound-for-mangroves/",
    "date": "2026-11-13",
    "publishedDate": "2026-11-13",
    "lengthCategory": "short",
    "durationSec": 51,
    "script": "只要停下脚步仔细倾听和观察，森林、海洋和天空就会给你讲一段动人的自然故事。最近，Spaceflight News · NASA报道了一条关于“全球红树林的复苏”的新进展。具体是怎么回事呢？原来，经过几十年的衰退之后，这种具有重要生态意义的森林正在卷土重来。看到这样的发现，研究团队并没有只停留在表面现象上，而是进一步追问背后的原理：这个现象需要满足什么样的条件？如果换一个环境，结果还会一样吗？大自然里的每一滴雨、每一只鸟、每一棵树都处在微妙的平衡之中。当我们学会像生态学家一样思考，就会更加懂得如何与自然温柔相处。",
    "audio": {
      "female": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/female/daily-20261113-17b6995f9c.mp3",
      "male": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/male/daily-20261113-17b6995f9c.mp3"
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
  },
  {
    "id": "daily-20261105-3ca8426259",
    "topic": "简单政治",
    "title": "中西部城市之光",
    "source": "Spaceflight News · NASA",
    "url": "https://www.nasa.gov/image-article/midwestern-city-lights/",
    "date": "2026-11-05",
    "publishedDate": "2026-11-05",
    "lengthCategory": "medium",
    "durationSec": 102,
    "script": "从一条斑马线到跨国合作公约，好的公共决定能让每一个普通人都受到照顾。根据Spaceflight News · NASA的最新分享，中西部城市之光。2026 年 10 月 18 日日出前几个小时，从美国中西部到东海岸的城市灯光在大地上闪闪发光。照片中可见的主要城市地区包括伊利诺伊州芝加哥、伊利诺伊州芝加哥、伊利诺伊州芝加哥、伊利诺伊州芝加哥、伊利诺伊州芝加哥、伊利诺伊州芝加哥、伊利诺伊州芝加哥、伊利诺伊州芝加哥、伊利诺伊州芝加哥、伊利诺伊州芝加哥、伊利诺伊州芝加哥、伊利诺伊州芝加哥、伊利诺伊州芝加哥、伊利诺伊州芝加哥、伊利诺伊州芝加哥、伊利诺伊州芝加哥、伊利诺伊州芝加哥、伊利诺伊州芝加哥、伊利诺伊州芝加哥、伊利诺伊州芝加哥、伊利诺伊州芝加哥、伊利诺伊州芝加哥、伊利诺伊州芝加哥、伊利诺伊州芝加哥、伊利诺伊州芝加哥、伊利诺伊州芝加哥、伊利诺伊州芝加哥、伊利诺伊州芝加哥、伊利诺伊州芝加哥、伊利诺伊州芝加哥、伊利诺伊州芝加哥、伊利诺伊州芝加哥和伊利诺伊州芝加哥等。为什么这件事值得我们留意呢？因为它展示了简单政治领域里一个正在发生的具体变化，让我们看到科学家和研究者是如何一步步用真实数据解开谜题的。",
    "audio": {
      "female": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/female/daily-20261105-3ca8426259.mp3",
      "male": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/male/daily-20261105-3ca8426259.mp3"
    }
  },
  {
    "id": "daily-20261105-1d342b2461",
    "topic": "简单政治",
    "title": "哈勃从恒星中了解银河历史",
    "source": "Spaceflight News · NASA",
    "url": "https://science.nasa.gov/missions/hubble/hubble-learns-galactic-history-from-stars/",
    "date": "2026-11-05",
    "publishedDate": "2026-11-05",
    "lengthCategory": "medium",
    "durationSec": 79,
    "script": "从一条斑马线到跨国合作公约，好的公共决定能让每一个普通人都受到照顾。今天我们要深入聊聊来自Spaceflight News · NASA的一篇特别报道：哈勃从恒星中了解银河历史。故事要从研究人员观察到的具体线索说起：这张哈勃图像展示了名为 Messier 30 (M30) 的闪闪发光的恒星集合，也称为 NGC 7099。把这条线索放到整个简单政治的大地图里来看，你会发现科学研究从来不是一蹴而就的。在得出结论之前，科研人员往往要先设计对照实验或者长期观测方案，把可能干扰结果的因素一个个排除掉，还要把测量数据公开出来，请世界各地的同行一起检验。对于我们十岁左右的小听众来说，理解这条新发现最好的办法，就是先抓住它最核心的那个变化：它到底解决了什么旧难题，或者推翻了哪一个过去的猜想？好的规则既有尺度又有温度，既讲公平又照顾弱者。从班级里的一次分工到城市里的一条坡道，每个人都能为更友善的世界出一份力。",
    "audio": {
      "female": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/female/daily-20261105-1d342b2461.mp3",
      "male": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/male/daily-20261105-1d342b2461.mp3"
    }
  },
  {
    "id": "curio-20261103-civ-01",
    "topic": "简单政治",
    "title": "人行道边那个带小凸点的斜坡，为什么叫“路缘坡道效应”？帮轮椅的设计也帮了所有人",
    "source": "Stanford Social Innovation Review",
    "url": "https://ssir.org/",
    "date": "2026-11-03",
    "publishedDate": "2026-11-03",
    "lengthCategory": "short",
    "durationSec": 51,
    "script": "走在城市斑马线两端时，你会发现人行道台阶边总有一个缓缓向下倾斜的小斜坡，上面还铺着带圆点凸起的黄色盲道砖，这叫做“路缘坡道”。在五十多年前，城市人行道边缘全都是高高的直角台阶，坐轮椅的残障人士过一条马路就像翻山一样困难。后来通过公民倡议与无障碍立法，城市开始普遍把路沿改造成平缓斜坡。神奇的事情发生了：坡道修好后，推婴儿车的爸爸妈妈、拉行李箱的旅客、拉买菜小推车的爷爷奶奶，全都走得轻松又安全！社会学家把这种“原本为少数困难群体设计的公共规则，结果让全社会每个人都受益”的现象，称为“路缘坡道效应”。",
    "audio": {
      "female": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/female/curio-20261103-civ-01.mp3",
      "male": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/male/curio-20261103-civ-01.mp3"
    }
  },
  {
    "id": "curio-20261103-civ-02",
    "topic": "简单政治",
    "title": "冰岛小镇把斑马线画成“立体悬浮方块”，不用装减速带也能让汽车主动慢下来！",
    "source": "都市交通设计 / 公共治理案例",
    "url": "https://www.bloomberg.com/citylab",
    "date": "2026-11-03",
    "publishedDate": "2026-11-03",
    "lengthCategory": "short",
    "durationSec": 49,
    "script": "在学校和居民区门口，怎样让开得太快的汽车主动减速礼让行人呢？如果修高高的减速带，救护车和公交车开过去会剧烈颠簸，半夜还会有噪音。冰岛西峡湾区的一个小镇伊萨菲厄泽想出了一个充满创意的公共治理点子：市政厅请街头画家用深浅不同的灰色、白色和黑色油漆，利用透视错觉，把平平的斑马线画成了一排好像漂浮在半空中的“3D立体水泥墩”！远处的汽车司机开过来一看，视觉上以为路中间浮着一排立体障碍物，脚就会本能地松开油门慢下来；等走近了才发现地面其实是平的。一个巧思就让街道变得更安全！",
    "audio": {
      "female": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/female/curio-20261103-civ-02.mp3",
      "male": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/male/curio-20261103-civ-02.mp3"
    }
  },
  {
    "id": "curio-20261103-civ-03",
    "topic": "简单政治",
    "title": "“儿童友好城市”的一米高度视角：为什么公园和社区规划要请十岁小朋友当顾问？",
    "source": "UNICEF 联合国儿童基金会",
    "url": "https://www.unicef.org/zh",
    "date": "2026-11-03",
    "publishedDate": "2026-11-03",
    "lengthCategory": "medium",
    "durationSec": 94,
    "script": "你有没有发现，城市里的洗手池、公交车扶手、甚至公园里的信息牌，往往都是按照一米七的大人身高设计的？如果一个十岁的小朋友走在街道上，他看到的视野高度大约只有一米二到一米四左右。在这个高度看出去，路边停着的一排汽车就可能完全挡住视线，过马路时很难提前看清转弯的车辆。为了改变这种状况，联合国儿童基金会和世界各地许多城市（包括中国的深圳、上海、成都、杭州等几十座城市）正在共同推进“儿童友好城市”建设，提出了一个重要理念——“从一米高度看城市”！在这些城市的社区改造中，规划师不再只是大人们关起门来画图纸，而是专门成立了“社区儿童议事会”，邀请八到十四岁的小学生戴上安全帽，拿上卷尺和记录板，当起真正的社区规划小顾问。小朋友们指出了许多大人根本没注意到的细节：比如图书馆借书台太高够不着、放学路上的路灯被树枝挡住太暗、公园草坪缺少能安全奔跑的软地面、医院走廊的指示牌字太深奥看不懂。当社区采纳了小顾问们的建议，把人行过街安全岛加宽、增设高低双层洗手池和彩色慢行步道后，整条街道不仅对孩子更友好，对老人和所有居民也变得更加温暖舒适了。",
    "audio": {
      "female": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/female/curio-20261103-civ-03.mp3",
      "male": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/male/curio-20261103-civ-03.mp3"
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
