/* Seviye testi: her seviyeden 3 soru. Bir seviyede 2 ya da daha fazla doğru yapan bir üst seviyeye geçer. */
window.PLACEMENT = [
  { level: "A1", items: [
    { q: "Hello, my name ___ Deniz.", options: ["am", "is", "are"], a: 1 },
    { q: "We ___ a small team of six people.", options: ["are", "is", "has"], a: 0 },
    { q: "“Müşteri” İngilizcede hangisi?", options: ["partner", "doctor", "customer"], a: 2 }
  ]},
  { level: "A2", items: [
    { q: "Last year we ___ our first device.", options: ["sell", "selling", "sold"], a: 2 },
    { q: "The new device is ___ than the old one.", options: ["faster", "fast", "fastest"], a: 0 },
    { q: "Next month we are going ___ new partners in Europe.", options: ["find", "to find", "finding"], a: 1 }
  ]},
  { level: "B1", items: [
    { q: "We ___ already tested the device with 200 patients.", options: ["did", "are", "have"], a: 2 },
    { q: "If the investor likes the demo, we ___ sign next week.", options: ["will", "would", "did"], a: 0 },
    { q: "“Deadline” ne demek?", options: ["Kırık bir çizgi", "Bir işin bitmesi gereken son tarih", "Bir toplantı türü"], a: 1 }
  ]},
  { level: "B2", items: [
    { q: "The results ___ in a medical journal last spring.", options: ["published", "have published", "were published"], a: 2 },
    { q: "If we had more engineers, we ___ much faster.", options: ["would grow", "will grow", "grow"], a: 0 },
    { q: "Which word fits best? “We need to ___ the deal before the end of the quarter.”", options: ["shut", "close", "end up"], a: 1 }
  ]},
  { level: "C1", items: [
    { q: "___ did we expect certification to take so long.", options: ["Few", "Less", "Little"], a: 2 },
    { q: "We started early to ___ the risk of delays.", options: ["mitigate", "militate", "mediate"], a: 0 },
    { q: "“Regulation has become our main bottleneck.” Bu cümlede “bottleneck” ne anlama geliyor?", options: ["En büyük gelir kaynağı", "İlerlemeyi yavaşlatan dar boğaz", "Ucuz bir çözüm"], a: 1 }
  ]},
  { level: "C2", items: [
    { q: "The numbers look strong; ___, we can't afford to be complacent.", options: ["hence", "that said", "as such"], a: 1 },
    { q: "“We're not out of the woods yet.” ne anlatıyor?", options: ["Ofisten henüz çıkmadık.", "Yolumuzu kaybettik.", "Zorluklar henüz tamamen geçmedi."], a: 2 },
    { q: "Which reply sounds most diplomatic to an investor?", options: ["I'm not entirely convinced the valuation reflects our traction.", "Your valuation is simply wrong.", "That valuation is a joke."], a: 0 }
  ]}
];
