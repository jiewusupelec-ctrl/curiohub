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
    "id": "daily-20261121-5c67ca67fe",
    "topic": "科学",
    "title": "韩国利用紧急短信等方法抓住了 111 起高考作弊",
    "source": "Solidot 奇客科学",
    "url": "https://www.solidot.org/story?sid=85943",
    "date": "2026-11-21",
    "publishedDate": "2026-11-21",
    "lengthCategory": "short",
    "durationSec": 46,
    "script": "如果把日常习以为常的现象放到放大镜下，你会发现一个好玩的科学问题。根据Solidot 奇客科学的最新分享，韩国利用紧急短信等方法抓住了 111 起高考作弊。韩国高考从本周四开始，有约 50 万名考生参加。为打击高科技作弊，韩国采取了一种极端的方法：在全国范围内发送紧急短信，之后在没有预先通知的情况下不定时追加发送。为什么这件事值得我们留意呢？因为它展示了科学领域里一个正在发生的具体变化，让我们看到科学家和研究者是如何一步步用真实数据解开谜题的。",
    "audio": {
      "female": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/female/daily-20261121-5c67ca67fe.mp3",
      "male": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/male/daily-20261121-5c67ca67fe.mp3"
    }
  },
  {
    "id": "daily-20261121-19c1585e4a",
    "topic": "科学",
    "title": "大脑的言语感知中枢也能生成口语词汇",
    "source": "Solidot 奇客科学",
    "url": "https://www.solidot.org/story?sid=85941",
    "date": "2026-11-21",
    "publishedDate": "2026-11-21",
    "lengthCategory": "medium",
    "durationSec": 79,
    "script": "今天我们来聊一个既有趣又可以跟家人一起讨论的科学新发现。最近，Solidot 奇客科学报道了一条关于“大脑的言语感知中枢也能生成口语词汇”的新进展。具体是怎么回事呢？原来，大脑名为韦尼克的区域（Wernicke’s area，该脑区长期以来被认为仅参与言语感知）也会生成口语词汇。韦尼克区是大脑听觉皮层的一部分，以往主要以其在言语感知中的关键作用而闻名。然而，韦尼克区受损者不仅难以理解言语，在组词造句方面也面临障碍。研究人员现在发现，韦尼克区不仅能感知词语，还能在言语产生前被激活以生成词语。看到这样的发现，研究团队并没有只停留在表面现象上，而是进一步追问背后的原理：这个现象需要满足什么样的条件？如果换一个环境，结果还会一样吗？科学最迷人的地方，就是不把任何现象当成理所当然。下次在厨房、操场或雨后的路边看到奇怪的现象，不妨先提出一个猜想，再像科学家一样找证据验证它。",
    "audio": {
      "female": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/female/daily-20261121-19c1585e4a.mp3",
      "male": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/male/daily-20261121-19c1585e4a.mp3"
    }
  },
  {
    "id": "daily-20261120-5ac4b7e6dd",
    "topic": "科学",
    "title": "基于自然的解决方案如何导致非正式住区失败",
    "source": "Phys.org Earth",
    "url": "https://phys.org/news/2026-11-nature-based-solutions-settlements.html",
    "date": "2026-11-20",
    "publishedDate": "2026-11-20",
    "lengthCategory": "short",
    "durationSec": 58,
    "script": "如果把日常习以为常的现象放到放大镜下，你会发现一个好玩的科学问题。最近，Phys.org Earth报道了一条关于“基于自然的解决方案如何导致非正式住区失败”的新进展。具体是怎么回事呢？原来，UCT 的新研究表明，基于自然的气候适应解决方案必须超越参与，转变为承认生活经验和与自然关系的权力共享伙伴关系。看到这样的发现，研究团队并没有只停留在表面现象上，而是进一步追问背后的原理：这个现象需要满足什么样的条件？如果换一个环境，结果还会一样吗？你看，无论是大实验还是小观察，只要多问一句“为什么会这样”，平平无奇的生活角落也会变成你的科学实验室。今天听到的小原理，晚上吃饭时可以考考爸爸妈妈哦！",
    "audio": {
      "female": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/female/daily-20261120-5ac4b7e6dd.mp3",
      "male": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/male/daily-20261120-5ac4b7e6dd.mp3"
    }
  },
  {
    "id": "daily-20261120-bace1b256e",
    "topic": "科学",
    "title": "在沼泽淤泥中生存：微小的“通气管”香蒲生长操纵土壤化学",
    "source": "Phys.org Biology",
    "url": "https://phys.org/news/2026-11-staying-alive-marsh-muck-tiny.html",
    "date": "2026-11-20",
    "publishedDate": "2026-11-20",
    "lengthCategory": "short",
    "durationSec": 40,
    "script": "如果把日常习以为常的现象放到放大镜下，你会发现一个好玩的科学问题。根据Phys.org Biology的最新分享，在沼泽淤泥中生存：微小的“通气管”香蒲生长操纵土壤化学。香蒲是湿地中常见的景象，它们在咸水和淡水沼泽中都繁衍生息。但在浸水的土壤中生存是一个挑战。为什么这件事值得我们留意呢？因为它展示了科学领域里一个正在发生的具体变化，让我们看到科学家和研究者是如何一步步用真实数据解开谜题的。",
    "audio": {
      "female": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/female/daily-20261120-bace1b256e.mp3",
      "male": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/male/daily-20261120-bace1b256e.mp3"
    }
  },
  {
    "id": "daily-20261119-f23b070fa6",
    "topic": "科学",
    "title": "科学家对孩子们进行了长达八年的追踪。他们对屏幕时间的发现令人惊讶",
    "source": "ScienceDaily AI & Math",
    "url": "https://www.sciencedaily.com/releases/2026/11/261116014725.htm",
    "date": "2026-11-19",
    "publishedDate": "2026-11-19",
    "lengthCategory": "short",
    "durationSec": 70,
    "script": "今天我们来聊一个既有趣又可以跟家人一起讨论的科学新发现。最近，ScienceDaily AI & Math报道了一条关于“科学家对孩子们进行了长达八年的追踪。他们对屏幕时间的发现令人惊讶”的新进展。具体是怎么回事呢？原来，芬兰的一项令人惊讶的研究发现，花更多时间使用屏幕的孩子在青少年时期往往具有更好的认知处理能力，这挑战了“屏幕时间总是有害的”这一假设。研究人员认为，孩子们在屏幕上做什么可能比他们花多少时间使用屏幕更重要。看到这样的发现，研究团队并没有只停留在表面现象上，而是进一步追问背后的原理：这个现象需要满足什么样的条件？如果换一个环境，结果还会一样吗？科学最迷人的地方，就是不把任何现象当成理所当然。下次在厨房、操场或雨后的路边看到奇怪的现象，不妨先提出一个猜想，再像科学家一样找证据验证它。",
    "audio": {
      "female": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/female/daily-20261119-f23b070fa6.mp3",
      "male": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/male/daily-20261119-f23b070fa6.mp3"
    }
  },
  {
    "id": "daily-20261119-e8d6c936ed",
    "topic": "科学",
    "title": "一种罕见疾病揭示了免疫系统中隐藏的缺陷",
    "source": "ScienceDaily All",
    "url": "https://www.sciencedaily.com/releases/2026/11/261117035052.htm",
    "date": "2026-11-19",
    "publishedDate": "2026-11-19",
    "lengthCategory": "short",
    "durationSec": 65,
    "script": "今天我们来聊一个既有趣又可以跟家人一起讨论的科学新发现。最近，ScienceDaily All报道了一条关于“一种罕见疾病揭示了免疫系统中隐藏的缺陷”的新进展。具体是怎么回事呢？原来，科学家发现，一种罕见的、可能危及生命的炎症性疾病是由免疫细胞功能失常引起的，颠覆了三十年来的科学认识。这一突破指出了一种使用现有药物的有希望的新疗法，一名严重受影响的婴儿已经表现出显着的改善。看到这样的发现，研究团队并没有只停留在表面现象上，而是进一步追问背后的原理：这个现象需要满足什么样的条件？如果换一个环境，结果还会一样吗？你看，无论是大实验还是小观察，只要多问一句“为什么会这样”，平平无奇的生活角落也会变成你的科学实验室。今天听到的小原理，晚上吃饭时可以考考爸爸妈妈哦！",
    "audio": {
      "female": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/female/daily-20261119-e8d6c936ed.mp3",
      "male": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/male/daily-20261119-e8d6c936ed.mp3"
    }
  },
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
    "id": "daily-20261121-f88f017e1e",
    "topic": "AI",
    "title": "Anthropic 的数论学家声称证明黎曼猜想",
    "source": "Solidot 奇客科学",
    "url": "https://www.solidot.org/story?sid=85949",
    "date": "2026-11-21",
    "publishedDate": "2026-11-21",
    "lengthCategory": "medium",
    "durationSec": 108,
    "script": "人工智能不仅能聊天和画画，科学家正教它学习解决真正的科学难题。今天我们要深入聊聊来自Solidot 奇客科学的一篇特别报道：Anthropic 的数论学家声称证明黎曼猜想。故事要从研究人员观察到的具体线索说起：美国数学家 Levent Alpöge 以数论和算术统计方面的工作著称，他目前在 AI 公司 Anthropic 工作。他发表声明，声称与公司 AI 工具 Claude 合作获得了数论经典难题黎曼猜想的一般性证明。他们发现了黎曼猜想的一个证明，而这个证明方法可以进一步证明广义黎曼猜想和扩展黎曼猜想。他称论证过程极其冗长，形式化工作已经完成，但产生的文档难以阅读，他表示正致力于对其进行简化，使其更通俗易懂。把这条线索放到整个AI的大地图里来看，你会发现科学研究从来不是一蹴而就的。在得出结论之前，科研人员往往要先设计对照实验或者长期观测方案，把可能干扰结果的因素一个个排除掉，还要把测量数据公开出来，请世界各地的同行一起检验。对于我们十岁左右的小听众来说，理解这条新发现最好的办法，就是先抓住它最核心的那个变化：它到底解决了什么旧难题，或者推翻了哪一个过去的猜想？人工智能是人类造出的强大助手，但它依然需要人类的好奇心、判断力和责任感来引导。学会提出好问题、核实真证据，才是未来最重要的本领。",
    "audio": {
      "female": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/female/daily-20261121-f88f017e1e.mp3",
      "male": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/male/daily-20261121-f88f017e1e.mp3"
    }
  },
  {
    "id": "daily-20261121-b8d42cb957",
    "topic": "AI",
    "title": "阿里巴巴警告未来两年算力紧缺",
    "source": "Solidot 奇客科学",
    "url": "https://www.solidot.org/story?sid=85947",
    "date": "2026-11-21",
    "publishedDate": "2026-11-21",
    "lengthCategory": "medium",
    "durationSec": 90,
    "script": "今天我们来看看人工智能实验室里刚刚发生的一件新鲜事。最近，Solidot 奇客科学报道了一条关于“阿里巴巴警告未来两年算力紧缺”的新进展。具体是怎么回事呢？原来，阿里巴巴集团首席执行官吴泳铭在星期四召开的二季度业绩电话会上说，全球各区域的算力政策出现了非常大的变化，将对阿里云的数据中心建设产生影响。根据目前的初步评估，阿里此前制定的到 2032 年全球数据中心规模超过 20 吉瓦的目标有可能下调，资本开支可能有一定程度降低。不过公司管理层相信，美国商务部的算力管制新规对 AI 产品进度的影响短暂，公司目前已经运用自行研发的晶片训练下一代大模型。阿里巴巴预测，2027 年及 2028 年将是中国算力市场最紧缺的两年。看到这样的发现，研究团队并没有只停留在表面现象上，而是进一步追问背后的原理：这个现象需要满足什么样的条件？如果换一个环境，结果还会一样吗？当AI帮科学家处理海量数据时，人类就能腾出更多精力去思考更有创造力的问题。善用工具、独立思考，你也能和AI一起探索未知世界。",
    "audio": {
      "female": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/female/daily-20261121-b8d42cb957.mp3",
      "male": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/male/daily-20261121-b8d42cb957.mp3"
    }
  },
  {
    "id": "daily-20261120-e6006837ec",
    "topic": "AI",
    "title": "专家点评：为何这么多AI工具最终进入AI坟墓？",
    "source": "TechXplore AI",
    "url": "https://techxplore.com/news/2026-11-expert-comment-ai-tools-graveyard.html",
    "date": "2026-11-20",
    "publishedDate": "2026-11-20",
    "lengthCategory": "medium",
    "durationSec": 91,
    "script": "人工智能不仅能聊天和画画，科学家正教它学习解决真正的科学难题。今天我们要深入聊聊来自TechXplore AI的一篇特别报道：专家点评：为何这么多AI工具最终进入AI坟墓？。故事要从研究人员观察到的具体线索说起：随着政府和科技公司竞相开发人工智能，一个更基本的问题出现了：谁来塑造这项技术，谁从中受益。无论技术多么出色，人工智能工具总是很难被接受，除非人们相信它是与他们一起构建并为他们构建的。把这条线索放到整个AI的大地图里来看，你会发现科学研究从来不是一蹴而就的。在得出结论之前，科研人员往往要先设计对照实验或者长期观测方案，把可能干扰结果的因素一个个排除掉，还要把测量数据公开出来，请世界各地的同行一起检验。对于我们十岁左右的小听众来说，理解这条新发现最好的办法，就是先抓住它最核心的那个变化：它到底解决了什么旧难题，或者推翻了哪一个过去的猜想？人工智能是人类造出的强大助手，但它依然需要人类的好奇心、判断力和责任感来引导。学会提出好问题、核实真证据，才是未来最重要的本领。",
    "audio": {
      "female": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/female/daily-20261120-e6006837ec.mp3",
      "male": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/male/daily-20261120-e6006837ec.mp3"
    }
  },
  {
    "id": "daily-20261120-0655b5cb5b",
    "topic": "AI",
    "title": "IEA 警告称到 2030 年数据中心碳排放量将增加七成",
    "source": "Solidot 奇客科学",
    "url": "https://www.solidot.org/story?sid=85937",
    "date": "2026-11-20",
    "publishedDate": "2026-11-20",
    "lengthCategory": "medium",
    "durationSec": 87,
    "script": "今天我们来看看人工智能实验室里刚刚发生的一件新鲜事。最近，Solidot 奇客科学报道了一条关于“IEA 警告称到 2030 年数据中心碳排放量将增加七成”的新进展。具体是怎么回事呢？原来，国际能源署（IEA）发表报告警告，到 2030 年数据中心碳排放量将增加七成。报告称，到 2030 年数据中心的用电量将达到目前的水平的两倍，未来四年 AI 数据中心每年将额外消耗 350 TWh 的电力，这一数字超过了英国全年的总耗电量。IEA 预计到这个十年末，中国 AI 数据中心所需电力中约半数将来自燃煤电厂。其余电力将来自可再生能源，核能发电占比相对较小，天然气发电占比极低。看到这样的发现，研究团队并没有只停留在表面现象上，而是进一步追问背后的原理：这个现象需要满足什么样的条件？如果换一个环境，结果还会一样吗？人工智能是人类造出的强大助手，但它依然需要人类的好奇心、判断力和责任感来引导。学会提出好问题、核实真证据，才是未来最重要的本领。",
    "audio": {
      "female": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/female/daily-20261120-0655b5cb5b.mp3",
      "male": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/male/daily-20261120-0655b5cb5b.mp3"
    }
  },
  {
    "id": "daily-20261119-6bf6a5f035",
    "topic": "AI",
    "title": "帮助人工智能文本检测器跟上不断变化的条件",
    "source": "TechXplore AI",
    "url": "https://techxplore.com/news/2026-11-ai-text-detectors-conditions.html",
    "date": "2026-11-19",
    "publishedDate": "2026-11-19",
    "lengthCategory": "medium",
    "durationSec": 88,
    "script": "人工智能不仅能聊天和画画，科学家正教它学习解决真正的科学难题。今天我们要深入聊聊来自TechXplore AI的一篇特别报道：帮助人工智能文本检测器跟上不断变化的条件。故事要从研究人员观察到的具体线索说起：如果老师认为学生的学期论文可能是由大型语言模型 (LLM) 撰写的，则可以使用检测 AI 生成文本的工具来帮助证实他们的怀疑。但老师在完全信任探测器之前可能需要三思而后行。把这条线索放到整个AI的大地图里来看，你会发现科学研究从来不是一蹴而就的。在得出结论之前，科研人员往往要先设计对照实验或者长期观测方案，把可能干扰结果的因素一个个排除掉，还要把测量数据公开出来，请世界各地的同行一起检验。对于我们十岁左右的小听众来说，理解这条新发现最好的办法，就是先抓住它最核心的那个变化：它到底解决了什么旧难题，或者推翻了哪一个过去的猜想？人工智能是人类造出的强大助手，但它依然需要人类的好奇心、判断力和责任感来引导。学会提出好问题、核实真证据，才是未来最重要的本领。",
    "audio": {
      "female": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/female/daily-20261119-6bf6a5f035.mp3",
      "male": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/male/daily-20261119-6bf6a5f035.mp3"
    }
  },
  {
    "id": "daily-20261119-b7ed276b63",
    "topic": "AI",
    "title": "即将成为亿万富翁的七位 Anthropic 创始人",
    "source": "BBC Science & Environment",
    "url": "https://www.bbc.co.uk/news/articles/cmd7159vlr85o?at_medium=RSS&at_campaign=rss",
    "date": "2026-11-19",
    "publishedDate": "2026-11-19",
    "lengthCategory": "short",
    "durationSec": 53,
    "script": "今天我们来看看人工智能实验室里刚刚发生的一件新鲜事。最近，BBC Science & Environment报道了一条关于“即将成为亿万富翁的七位 Anthropic 创始人”的新进展。具体是怎么回事呢？原来，克劳德背后的人工智能公司即将在美国股市出售其股票——使其创始人变得非常富有。看到这样的发现，研究团队并没有只停留在表面现象上，而是进一步追问背后的原理：这个现象需要满足什么样的条件？如果换一个环境，结果还会一样吗？人工智能是人类造出的强大助手，但它依然需要人类的好奇心、判断力和责任感来引导。学会提出好问题、核实真证据，才是未来最重要的本领。",
    "audio": {
      "female": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/female/daily-20261119-b7ed276b63.mp3",
      "male": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/male/daily-20261119-b7ed276b63.mp3"
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
    "id": "daily-20261119-1b9ca0bf70",
    "topic": "金融",
    "title": "航海者号帝国大厦荣获金奖",
    "source": "NASA Image of the Day",
    "url": "https://www.nasa.gov/image-detail/nasas-voyager-1-spacecraft-light-day/",
    "date": "2026-11-19",
    "publishedDate": "2026-11-19",
    "lengthCategory": "short",
    "durationSec": 43,
    "script": "用经济学家的眼光看生活，你会发现数字和价格背后有一套好玩的逻辑。根据NASA Image of the Day的最新分享，航海者号帝国大厦荣获金奖。2026 年 11 月 17 日星期二，纽约市，帝国大厦被金色灯光照亮，以庆祝 NASA 航海者 1 号宇宙飞船即将飞过距地球一光日的距离，这是其他人造物体无法达到的距离。为什么这件事值得我们留意呢？因为它展示了金融领域里一个正在发生的具体变化，让我们看到科学家和研究者是如何一步步用真实数据解开谜题的。",
    "audio": {
      "female": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/female/daily-20261119-1b9ca0bf70.mp3",
      "male": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/male/daily-20261119-1b9ca0bf70.mp3"
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
    "id": "daily-20261120-b509fcc00e",
    "topic": "地理",
    "title": "南极洲冰崖崩塌的速度比预期的要快，但情况却出现了转折",
    "source": "ScienceDaily Earth & Climate",
    "url": "https://www.sciencedaily.com/releases/2026/11/261117033925.htm",
    "date": "2026-11-20",
    "publishedDate": "2026-11-20",
    "lengthCategory": "medium",
    "durationSec": 101,
    "script": "旋转地球仪，高山、深海、沙漠和季风正在地球表面上演跨越千里的联动。今天我们要深入聊聊来自ScienceDaily Earth & Climate的一篇特别报道：南极洲冰崖崩塌的速度比预期的要快，但情况却出现了转折。故事要从研究人员观察到的具体线索说起：一项令人惊讶的新研究表明，南极洲高耸的冰崖可能不像科学家曾经担心的那样容易遭受灾难性崩塌。在追踪了 15,000 多座冰崖后，研究人员发现，即使是最高的悬崖，也能以惊人的速度崩塌，通常会稳定下来，而不是引发不可阻挡的连锁反应。水下山脊、周围的水和破碎的冰似乎提供了防止进一步塌陷的天然防御。把这条线索放到整个地理的大地图里来看，你会发现科学研究从来不是一蹴而就的。在得出结论之前，科研人员往往要先设计对照实验或者长期观测方案，把可能干扰结果的因素一个个排除掉，还要把测量数据公开出来，请世界各地的同行一起检验。对于我们十岁左右的小听众来说，理解这条新发现最好的办法，就是先抓住它最核心的那个变化：它到底解决了什么旧难题，或者推翻了哪一个过去的猜想？跨越山海的地理故事告诉我们，哪怕相隔万里，不同大陆的气候与生态也紧紧相连。爱护我们身边的环境，就是在守护整颗蓝色星球。",
    "audio": {
      "female": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/female/daily-20261120-b509fcc00e.mp3",
      "male": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/male/daily-20261120-b509fcc00e.mp3"
    }
  },
  {
    "id": "daily-20261119-dd372e073c",
    "topic": "地理",
    "title": "超过十亿年的地球历史消失了。科学家可能终于知道原因了",
    "source": "ScienceDaily Earth & Climate",
    "url": "https://www.sciencedaily.com/releases/2026/11/261116023403.htm",
    "date": "2026-11-19",
    "publishedDate": "2026-11-19",
    "lengthCategory": "short",
    "durationSec": 67,
    "script": "地图上的每一条海岸线、每一座雪山，都有一段跨越百万年的地理传奇。最近，ScienceDaily Earth & Climate报道了一条关于“超过十亿年的地球历史消失了。科学家可能终于知道原因了”的新进展。具体是怎么回事呢？原来，科学家们可能终于解释了为什么世界各地的岩石中缺失了长达十亿多年的地球地质历史。新的研究表明，地球深处的强大水流缓慢地抬升和降低了整个大陆，从而使侵蚀作用消除了大片地质历史，然后才将其埋葬和保存下来。看到这样的发现，研究团队并没有只停留在表面现象上，而是进一步追问背后的原理：这个现象需要满足什么样的条件？如果换一个环境，结果还会一样吗？跨越山海的地理故事告诉我们，哪怕相隔万里，不同大陆的气候与生态也紧紧相连。爱护我们身边的环境，就是在守护整颗蓝色星球。",
    "audio": {
      "female": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/female/daily-20261119-dd372e073c.mp3",
      "male": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/male/daily-20261119-dd372e073c.mp3"
    }
  },
  {
    "id": "daily-20261119-947da179bb",
    "topic": "地理",
    "title": "将烟花从云端抛向云端",
    "source": "NASA Earth Observatory",
    "url": "https://science.nasa.gov/earth/earth-observatory/tossing-fireworks-from-cloud-to-cloud/",
    "date": "2026-11-19",
    "publishedDate": "2026-11-19",
    "lengthCategory": "medium",
    "durationSec": 77,
    "script": "旋转地球仪，高山、深海、沙漠和季风正在地球表面上演跨越千里的联动。今天我们要深入聊聊来自NASA Earth Observatory的一篇特别报道：将烟花从云端抛向云端。故事要从研究人员观察到的具体线索说起：对于许多宇航员来说，从国际空间站回望地球时，壮观的闪电景象非常引人注目。把这条线索放到整个地理的大地图里来看，你会发现科学研究从来不是一蹴而就的。在得出结论之前，科研人员往往要先设计对照实验或者长期观测方案，把可能干扰结果的因素一个个排除掉，还要把测量数据公开出来，请世界各地的同行一起检验。对于我们十岁左右的小听众来说，理解这条新发现最好的办法，就是先抓住它最核心的那个变化：它到底解决了什么旧难题，或者推翻了哪一个过去的猜想？跨越山海的地理故事告诉我们，哪怕相隔万里，不同大陆的气候与生态也紧紧相连。爱护我们身边的环境，就是在守护整颗蓝色星球。",
    "audio": {
      "female": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/female/daily-20261119-947da179bb.mp3",
      "male": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/male/daily-20261119-947da179bb.mp3"
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
    "id": "daily-20261121-f025afeb57",
    "topic": "生物",
    "title": "已有 50 年历史的进化论可能一直都是错误的",
    "source": "ScienceDaily Plants & Animals",
    "url": "https://www.sciencedaily.com/releases/2026/11/261119194538.htm",
    "date": "2026-11-21",
    "publishedDate": "2026-11-21",
    "lengthCategory": "medium",
    "durationSec": 74,
    "script": "生命世界远比我们想象的更聪明，每一种生物身体里都藏着精妙的科学密码。最近，ScienceDaily Plants & Animals报道了一条关于“已有 50 年历史的进化论可能一直都是错误的”的新进展。具体是怎么回事呢？原来，几十年前的理论认为进化可以保护其最重要的基因免受突变，但这一理论受到了重大打击。对细菌和酵母突变的广泛新分析发现，没有证据表明必需基因的突变频率低于其他基因。研究人员表示，早期的研究可能被有害突变所误导，这些突变在科学家发现之前就通过自然选择消失了。看到这样的发现，研究团队并没有只停留在表面现象上，而是进一步追问背后的原理：这个现象需要满足什么样的条件？如果换一个环境，结果还会一样吗？每一种生物都是历经千万年自然选择留下的生命奇迹。尊重生命、保护生物多样性，不仅是在保护动物和植物，也是在留住大自然最宝贵的智慧库。",
    "audio": {
      "female": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/female/daily-20261121-f025afeb57.mp3",
      "male": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/male/daily-20261121-f025afeb57.mp3"
    }
  },
  {
    "id": "daily-20261121-776e6026b4",
    "topic": "生物",
    "title": "认识一下 Swiftiephylus，一群以泰勒·斯威夫特命名的昆虫",
    "source": "Science News Explores",
    "url": "https://www.snexplores.org/article/new-taylor-swift-insects",
    "date": "2026-11-21",
    "publishedDate": "2026-11-21",
    "lengthCategory": "short",
    "durationSec": 37,
    "script": "今天我们走进奇妙的生物圈，去认识一位身怀绝技的生命朋友。根据Science News Explores的最新分享，认识一下 Swiftiephylus，一群以泰勒·斯威夫特命名的昆虫。为了纪念世界著名流行歌星泰勒·斯威夫特，四种新描述的澳大利亚植物昆虫被命名。为什么这件事值得我们留意呢？因为它展示了生物领域里一个正在发生的具体变化，让我们看到科学家和研究者是如何一步步用真实数据解开谜题的。",
    "audio": {
      "female": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/female/daily-20261121-776e6026b4.mp3",
      "male": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/male/daily-20261121-776e6026b4.mp3"
    }
  },
  {
    "id": "daily-20261120-8613064aae",
    "topic": "生物",
    "title": "云南发现蒙多草新品种",
    "source": "Phys.org Biology",
    "url": "https://phys.org/news/2026-11-mondo-grass-species-yunnan.html",
    "date": "2026-11-20",
    "publishedDate": "2026-11-20",
    "lengthCategory": "short",
    "durationSec": 59,
    "script": "在地球数十亿年的生命演化中，动物、植物和微生物练就了令人惊叹的生存绝活。最近，Phys.org Biology报道了一条关于“云南发现蒙多草新品种”的新进展。具体是怎么回事呢？原来，植物学家在中国东南部的云南文山国家级自然保护区描述了一种新的麦冬物种。他们将其命名为麦冬 (Ophiopogon longiscapus)，因为它具有异常长的花茎或花葶。看到这样的发现，研究团队并没有只停留在表面现象上，而是进一步追问背后的原理：这个现象需要满足什么样的条件？如果换一个环境，结果还会一样吗？从深海到森林，生命总能找到令人惊叹的出路。去公园或郊外时，带着安静和礼貌去观察小生物，你会发现一个热闹非凡的微观世界。",
    "audio": {
      "female": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/female/daily-20261120-8613064aae.mp3",
      "male": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/male/daily-20261120-8613064aae.mp3"
    }
  },
  {
    "id": "daily-20261120-93aa0cf86e",
    "topic": "生物",
    "title": "深海猪的皮下生活着一些奇怪的东西",
    "source": "ScienceDaily Plants & Animals",
    "url": "https://www.sciencedaily.com/releases/2026/11/261118065512.htm",
    "date": "2026-11-20",
    "publishedDate": "2026-11-20",
    "lengthCategory": "medium",
    "durationSec": 73,
    "script": "在地球数十亿年的生命演化中，动物、植物和微生物练就了令人惊叹的生存绝活。最近，ScienceDaily Plants & Animals报道了一条关于“深海猪的皮下生活着一些奇怪的东西”的新进展。具体是怎么回事呢？原来，科学家们在被称为海猪的深海生物的皮肤下发现了一种奇怪的细菌，揭示了一种意想不到的生物伙伴关系。这种微生物的基因组异常微小，但其超过四分之一的 DNA 用于制造表面蛋白，其中一些蛋白异常大。研究人员怀疑它的生存很大程度上依赖于宿主，但海猪得到的回报仍然是个谜。看到这样的发现，研究团队并没有只停留在表面现象上，而是进一步追问背后的原理：这个现象需要满足什么样的条件？如果换一个环境，结果还会一样吗？每一种生物都是历经千万年自然选择留下的生命奇迹。尊重生命、保护生物多样性，不仅是在保护动物和植物，也是在留住大自然最宝贵的智慧库。",
    "audio": {
      "female": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/female/daily-20261120-93aa0cf86e.mp3",
      "male": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/male/daily-20261120-93aa0cf86e.mp3"
    }
  },
  {
    "id": "daily-20261119-d8ca96db67",
    "topic": "生物",
    "title": "研究发现，加拿大的政策变化对动物抗生素的销售影响不大",
    "source": "Phys.org Biology",
    "url": "https://phys.org/news/2026-11-policy-canada-effect-sales-antibiotics.html",
    "date": "2026-11-19",
    "publishedDate": "2026-11-19",
    "lengthCategory": "short",
    "durationSec": 39,
    "script": "生命世界远比我们想象的更聪明，每一种生物身体里都藏着精妙的科学密码。根据Phys.org Biology的最新分享，研究发现，加拿大的政策变化对动物抗生素的销售影响不大。自 2018 年以来，加拿大用于食用动物的抗生素销量下降了 11%，但这并不是因为联邦政策变化。为什么这件事值得我们留意呢？因为它展示了生物领域里一个正在发生的具体变化，让我们看到科学家和研究者是如何一步步用真实数据解开谜题的。",
    "audio": {
      "female": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/female/daily-20261119-d8ca96db67.mp3",
      "male": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/male/daily-20261119-d8ca96db67.mp3"
    }
  },
  {
    "id": "daily-20261119-9d36b955ca",
    "topic": "生物",
    "title": "研究人员追踪肠道微生物如何将膳食植物甾醇转化为循环硫酸化代谢物",
    "source": "Phys.org Biology",
    "url": "https://phys.org/news/2026-11-gut-microbes-dietary-sterols-circulating.html",
    "date": "2026-11-19",
    "publishedDate": "2026-11-19",
    "lengthCategory": "medium",
    "durationSec": 93,
    "script": "在地球数十亿年的生命演化中，动物、植物和微生物练就了令人惊叹的生存绝活。今天我们要深入聊聊来自Phys.org Biology的一篇特别报道：研究人员追踪肠道微生物如何将膳食植物甾醇转化为循环硫酸化代谢物。故事要从研究人员观察到的具体线索说起：植物甾醇是植物油、坚果和种子中发现的植物源化合物。研究人员研究了它们减少胆固醇吸收的能力，但只有约 5% 进入循环，大部分被排出体外。肠道细菌如何影响其代谢和组织分布仍不清楚。把这条线索放到整个生物的大地图里来看，你会发现科学研究从来不是一蹴而就的。在得出结论之前，科研人员往往要先设计对照实验或者长期观测方案，把可能干扰结果的因素一个个排除掉，还要把测量数据公开出来，请世界各地的同行一起检验。对于我们十岁左右的小听众来说，理解这条新发现最好的办法，就是先抓住它最核心的那个变化：它到底解决了什么旧难题，或者推翻了哪一个过去的猜想？从深海到森林，生命总能找到令人惊叹的出路。去公园或郊外时，带着安静和礼貌去观察小生物，你会发现一个热闹非凡的微观世界。",
    "audio": {
      "female": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/female/daily-20261119-9d36b955ca.mp3",
      "male": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/male/daily-20261119-9d36b955ca.mp3"
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
    "id": "daily-20261120-cced664dad",
    "topic": "大自然",
    "title": "科学家测试了 212 种植物性食品。每一颗都含有真菌毒素",
    "source": "ScienceDaily Plants & Animals",
    "url": "https://www.sciencedaily.com/releases/2026/11/261118073749.htm",
    "date": "2026-11-20",
    "publishedDate": "2026-11-20",
    "lengthCategory": "medium",
    "durationSec": 75,
    "script": "今天的大自然广播，带大家去看看地球生态圈里的一场奇妙变化。最近，ScienceDaily Plants & Animals报道了一条关于“科学家测试了 212 种植物性食品。每一颗都含有真菌毒素”的新进展。具体是怎么回事呢？原来，一项新的研究发现了流行的植物性食品和饮料中隐藏的令人惊讶的担忧。研究人员测试了在英国销售的 212 种纯素和素食产品，包括肉类替代品、燕麦奶、杏仁奶和豆奶，发现每一种都含有至少一种潜在有害的真菌毒素。这些天然存在的化合物被称为霉菌毒素，会在农业和储存过程中污染谷物、豆类和种子。看到这样的发现，研究团队并没有只停留在表面现象上，而是进一步追问背后的原理：这个现象需要满足什么样的条件？如果换一个环境，结果还会一样吗？不用等到去遥远的保护区，窗外的云朵、雨后的泥土和迁徙的候鸟，每天都在上演大自然的纪录片，等着细心的你去发现。",
    "audio": {
      "female": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/female/daily-20261120-cced664dad.mp3",
      "male": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/male/daily-20261120-cced664dad.mp3"
    }
  },
  {
    "id": "daily-20261120-9115d4a0e3",
    "topic": "大自然",
    "title": "厄尔尼诺现象对东南亚灵长类动物的长期影响",
    "source": "Mongabay Wildlife",
    "url": "https://news.mongabay.com/2026/11/the-long-reach-of-el-nino-impacts-on-southeast-asias-primates/",
    "date": "2026-11-20",
    "publishedDate": "2026-11-20",
    "lengthCategory": "short",
    "durationSec": 53,
    "script": "只要停下脚步仔细倾听和观察，森林、海洋和天空就会给你讲一段动人的自然故事。根据Mongabay Wildlife的最新分享，厄尔尼诺现象对东南亚灵长类动物的长期影响。随着印度尼西亚厄尔尼诺现象引发的火灾引发了一场拯救濒危猩猩和其他野生动物的竞赛，《Oryx》杂志最近发表的一篇评论论文引发了人们对东南亚此类气候事件对灵长类动物的短期和长期影响的担忧。“灵长类动物可能会在火灾中幸存，但这并不一定告诉我们是否。为什么这件事值得我们留意呢？因为它展示了大自然领域里一个正在发生的具体变化，让我们看到科学家和研究者是如何一步步用真实数据解开谜题的。",
    "audio": {
      "female": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/female/daily-20261120-9115d4a0e3.mp3",
      "male": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/male/daily-20261120-9115d4a0e3.mp3"
    }
  },
  {
    "id": "daily-20261119-4be9bd60e3",
    "topic": "大自然",
    "title": "史前生态系统可能为预防未来野火提供线索",
    "source": "Phys.org Earth",
    "url": "https://phys.org/news/2026-11-prehistoric-ecosystems-clues-future-wildfires.html",
    "date": "2026-11-19",
    "publishedDate": "2026-11-19",
    "lengthCategory": "medium",
    "durationSec": 81,
    "script": "今天的大自然广播，带大家去看看地球生态圈里的一场奇妙变化。今天我们要深入聊聊来自Phys.org Earth的一篇特别报道：史前生态系统可能为预防未来野火提供线索。故事要从研究人员观察到的具体线索说起：带回大型食草动物有助于保护欧洲乡村景观并降低野火风险吗。这是萨拉戈萨大学最近发表在《生态系统服务》杂志上的一项国际研究探讨的关键问题之一。把这条线索放到整个大自然的大地图里来看，你会发现科学研究从来不是一蹴而就的。在得出结论之前，科研人员往往要先设计对照实验或者长期观测方案，把可能干扰结果的因素一个个排除掉，还要把测量数据公开出来，请世界各地的同行一起检验。对于我们十岁左右的小听众来说，理解这条新发现最好的办法，就是先抓住它最核心的那个变化：它到底解决了什么旧难题，或者推翻了哪一个过去的猜想？不用等到去遥远的保护区，窗外的云朵、雨后的泥土和迁徙的候鸟，每天都在上演大自然的纪录片，等着细心的你去发现。",
    "audio": {
      "female": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/female/daily-20261119-4be9bd60e3.mp3",
      "male": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/male/daily-20261119-4be9bd60e3.mp3"
    }
  },
  {
    "id": "daily-20261119-363e00042c",
    "topic": "大自然",
    "title": "暴雨导致南佛罗里达州大范围洪水泛滥",
    "source": "BBC Science & Environment",
    "url": "https://www.bbc.co.uk/news/videos/crgj3205jv98o?at_medium=RSS&at_campaign=rss",
    "date": "2026-11-19",
    "publishedDate": "2026-11-19",
    "lengthCategory": "short",
    "durationSec": 36,
    "script": "只要停下脚步仔细倾听和观察，森林、海洋和天空就会给你讲一段动人的自然故事。根据BBC Science & Environment的最新分享，暴雨导致南佛罗里达州大范围洪水泛滥。由于学校、道路、医院和机场受到影响，整个社区仍然被水淹没。为什么这件事值得我们留意呢？因为它展示了大自然领域里一个正在发生的具体变化，让我们看到科学家和研究者是如何一步步用真实数据解开谜题的。",
    "audio": {
      "female": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/female/daily-20261119-363e00042c.mp3",
      "male": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/male/daily-20261119-363e00042c.mp3"
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
  },
  {
    "id": "daily-20261120-dec40ab23d",
    "topic": "简单政治",
    "title": "新研究解释了人们在公园一天会走多远",
    "source": "Phys.org Earth",
    "url": "https://phys.org/news/2026-11-people-day.html",
    "date": "2026-11-20",
    "publishedDate": "2026-11-20",
    "lengthCategory": "medium",
    "durationSec": 76,
    "script": "几百万人住在一起的城市和地球村，怎样才能既公平又温暖地运转？这离不开公共规则的智慧。最近，Phys.org Earth报道了一条关于“新研究解释了人们在公园一天会走多远”的新进展。具体是怎么回事呢？原来，距离家 2 英里（3.2 公里）的公园似乎足够近，适合周六郊游。然而，在底特律大都市，到这个距离，公园参观量已经下降到模拟峰值的一半左右。在明尼阿波利斯大都市，同样的下降过程需要近五英里（8公里）。而在交通网络广泛的纽约大都市区，客流量下降了一半，约为 2.3 英里（3.7 公里）。看到这样的发现，研究团队并没有只停留在表面现象上，而是进一步追问背后的原理：这个现象需要满足什么样的条件？如果换一个环境，结果还会一样吗？公共生活不是只有大人才能关心的话题。学会倾听别人的需要、遵守共同的规则、用有条理的建议让学校和社区变得更好，就是最棒的公民素养。",
    "audio": {
      "female": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/female/daily-20261120-dec40ab23d.mp3",
      "male": "https://jiewusupelec-ctrl.github.io/curiohub/audio/clips/male/daily-20261120-dec40ab23d.mp3"
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
