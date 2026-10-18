// Konu 4: Yatırım, finans ve iş geliştirme
window.LESSONS = window.LESSONS || [];
window.LESSONS.push(
{
  id: "in-01", topic: "invest", level: "B1", minutes: 12,
  title: "Pitching a Startup in Three Minutes",
  titleTr: "Bir Girişimi Üç Dakikada Sunmak",
  intro: "Kısa bir yatırımcı sunumunun yapısı: sorun, çözüm, pazar, ekip, talep.",
  text: [
    { en: "Hello everyone. My name is Ali, and I am the founder of AIHEAR.", tr: "Herkese merhaba. Benim adım Ali ve AIHEAR'ın kurucusuyum." },
    { en: "Here is the problem: one in five people has hearing loss, but most of them are never tested.", tr: "Sorun şu: her beş kişiden biri işitme kaybı yaşıyor ama çoğu hiç test edilmiyor." },
    { en: "Why? Because a hearing test needs an expert, and there are not enough experts.", tr: "Neden? Çünkü bir işitme testi uzman gerektiriyor ve yeterli uzman yok." },
    { en: "Our solution is an autonomous audiometer. It does the test by itself in ten minutes.", tr: "Çözümümüz otonom bir odyometre. Testi on dakikada kendi kendine yapıyor." },
    { en: "The market is huge. There are more than 50,000 clinics in Europe alone.", tr: "Pazar devasa. Yalnızca Avrupa'da 50.000'den fazla klinik var." },
    { en: "Our business model is simple: we sell the device and charge a monthly software fee.", tr: "İş modelimiz basit: cihazı satıyoruz ve aylık yazılım ücreti alıyoruz." },
    { en: "We already have five paying customers and a working prototype.", tr: "Zaten beş ödeme yapan müşterimiz ve çalışan bir prototipimiz var." },
    { en: "Our team has an engineer, a doctor and ten years of experience in medical devices.", tr: "Ekibimizde bir mühendis, bir doktor ve tıbbi cihazlarda on yıllık deneyim var." },
    { en: "We are raising 500,000 euros to complete certification and enter the European market.", tr: "Sertifikasyonu tamamlamak ve Avrupa pazarına girmek için 500.000 euro topluyoruz." },
    { en: "Thank you. I am happy to answer your questions.", tr: "Teşekkürler. Sorularınızı yanıtlamaktan mutluluk duyarım." }
  ],
  vocab: [
    { en: "founder", tr: "kurucu", ex: "I am the founder of AIHEAR." },
    { en: "one in five", tr: "her beş kişiden biri", ex: "One in five people has hearing loss." },
    { en: "solution", tr: "çözüm", ex: "Our solution is an autonomous audiometer." },
    { en: "huge", tr: "devasa, çok büyük", ex: "The market is huge." },
    { en: "business model", tr: "iş modeli", ex: "Our business model is simple." },
    { en: "charge a fee", tr: "ücret almak", ex: "We charge a monthly fee." },
    { en: "paying customer", tr: "ödeme yapan müşteri", ex: "We have five paying customers." },
    { en: "raise money", tr: "yatırım toplamak", ex: "We are raising 500,000 euros." },
    { en: "enter the market", tr: "pazara girmek", ex: "We want to enter the European market." }
  ],
  questions: [
    { q: "How many people have hearing loss?", options: ["One in five", "One in fifty", "One in five hundred"], a: 0 },
    { q: "What is the business model?", options: ["Only advertising", "Sell the device and charge a monthly fee", "Free device"], a: 1 },
    { q: "How many paying customers do they have?", options: ["Five", "Fifty", "None"], a: 0 },
    { q: "How much are they raising?", options: ["50,000 euros", "500,000 euros", "5 million euros"], a: 1 }
  ],
  gaps: [
    { s: "I am the ___ of AIHEAR.", a: "founder", hint: "kurucu" },
    { s: "Our business ___ is simple.", a: "model", hint: "iş modeli" },
    { s: "We are ___ 500,000 euros.", a: "raising", hint: "topluyoruz" }
  ],
  order: [
    { a: "The market is huge." },
    { a: "We already have five paying customers." }
  ],
  translate: [
    { tr: "Çözümümüz otonom bir odyometre.", en: "Our solution is an autonomous audiometer.", keys: ["solution", "audiometer"] },
    { tr: "Sorularınızı yanıtlamaktan mutluluk duyarım.", en: "I am happy to answer your questions.", keys: ["happy", "answer", "questions"] }
  ],
  roleplay: {
    persona: "Investor at a demo day", personaTr: "Demo günü yatırımcısı",
    scene: "Sunumun bitti. Yatırımcı üç soru soruyor.",
    turns: [
      { ai: "Good pitch. In one sentence: what is the problem you solve?", aiTr: "İyi sunum. Tek cümleyle: çözdüğünüz sorun ne?", hint: "One in five people has hearing loss, but most are never tested because there are not enough experts.", keys: ["hearing loss", "experts", "tested", "one in five"] },
      { ai: "How do you make money?", aiTr: "Nasıl para kazanıyorsunuz?", hint: "We sell the device and charge a monthly software fee.", keys: ["sell", "charge", "fee", "monthly"] },
      { ai: "How much are you raising, and what for?", aiTr: "Ne kadar topluyorsunuz ve ne için?", hint: "We are raising 500,000 euros to complete certification and enter the European market.", keys: ["raising", "euros", "certification", "market"] }
    ]
  }
},
{
  id: "in-02", topic: "invest", level: "B1", minutes: 12,
  title: "Explaining Revenue and Business Models",
  titleTr: "Gelir ve İş Modellerini Açıklamak",
  intro: "Gelir, maliyet, kâr marjı ve tekrarlayan gelir kavramları.",
  text: [
    { en: "Investors always ask the same question: how do you make money?", tr: "Yatırımcılar hep aynı soruyu sorar: nasıl para kazanıyorsunuz?" },
    { en: "We have two sources of revenue.", tr: "İki gelir kaynağımız var." },
    { en: "The first is the device. We sell it for 4,000 euros, and it costs us 1,500 euros to produce.", tr: "İlki cihaz. Onu 4.000 euroya satıyoruz ve üretmesi bize 1.500 euroya mal oluyor." },
    { en: "So the gross margin on the device is about 60 percent.", tr: "Yani cihazdaki brüt kâr marjı yaklaşık yüzde 60." },
    { en: "The second source is the software. Every clinic pays 99 euros a month.", tr: "İkinci kaynak yazılım. Her klinik ayda 99 euro ödüyor." },
    { en: "This is recurring revenue. It comes every month, and investors love it.", tr: "Bu tekrarlayan gelir. Her ay geliyor ve yatırımcılar bunu çok seviyor." },
    { en: "With 1,000 clinics, the software alone brings about 1.2 million euros a year.", tr: "1.000 klinikle yalnızca yazılım yılda yaklaşık 1,2 milyon euro getiriyor." },
    { en: "Our biggest costs are salaries, certification and marketing.", tr: "En büyük maliyetlerimiz maaşlar, sertifikasyon ve pazarlama." },
    { en: "We expect to be profitable in the third year.", tr: "Üçüncü yılda kârlı olmayı bekliyoruz." }
  ],
  vocab: [
    { en: "make money", tr: "para kazanmak", ex: "How do you make money?" },
    { en: "revenue", tr: "gelir, ciro", ex: "We have two sources of revenue." },
    { en: "source", tr: "kaynak", ex: "The first source is the device." },
    { en: "cost (to produce)", tr: "maliyet", ex: "It costs us 1,500 euros to produce." },
    { en: "gross margin", tr: "brüt kâr marjı", ex: "The gross margin is 60 percent." },
    { en: "recurring revenue", tr: "tekrarlayan gelir", ex: "Software gives us recurring revenue." },
    { en: "salary", tr: "maaş", ex: "Our biggest cost is salaries." },
    { en: "profitable", tr: "kârlı", ex: "We expect to be profitable in year three." }
  ],
  questions: [
    { q: "How many sources of revenue are there?", options: ["One", "Two", "Three"], a: 1 },
    { q: "What is the gross margin on the device?", options: ["About 60 percent", "About 10 percent", "About 90 percent"], a: 0 },
    { q: "What is recurring revenue?", options: ["Money that comes once", "Money that comes every month", "Money from investors"], a: 1 },
    { q: "When do they expect to be profitable?", options: ["First year", "Third year", "Tenth year"], a: 1 }
  ],
  gaps: [
    { s: "We have two sources of ___.", a: "revenue", hint: "gelir" },
    { s: "This is ___ revenue. It comes every month.", a: "recurring", hint: "tekrarlayan" },
    { s: "We expect to be ___ in the third year.", a: "profitable", hint: "kârlı" }
  ],
  order: [
    { a: "Every clinic pays 99 euros a month." },
    { a: "Our biggest costs are salaries and marketing." }
  ],
  translate: [
    { tr: "Nasıl para kazanıyorsunuz?", en: "How do you make money?", keys: ["make money"] },
    { tr: "En büyük maliyetimiz maaşlar.", en: "Our biggest cost is salaries.", keys: ["biggest", "cost", "salaries"] }
  ],
  roleplay: {
    persona: "Angel investor", personaTr: "Melek yatırımcı",
    scene: "Bir melek yatırımcı sayıları detaylı soruyor.",
    turns: [
      { ai: "Let's talk numbers. How do you make money?", aiTr: "Rakamları konuşalım. Nasıl para kazanıyorsunuz?", hint: "We have two sources of revenue: the device and a monthly software fee.", keys: ["revenue", "device", "software", "monthly"] },
      { ai: "What is your margin on the device?", aiTr: "Cihazdaki marjınız ne?", hint: "We sell it for 4,000 euros and it costs 1,500 to produce, so the gross margin is about 60 percent.", keys: ["margin", "percent", "cost", "sell"] },
      { ai: "When will you be profitable?", aiTr: "Ne zaman kârlı olacaksınız?", hint: "We expect to be profitable in the third year. Our biggest costs are salaries and certification.", keys: ["profitable", "third year", "costs"] }
    ]
  }
},
{
  id: "in-03", topic: "invest", level: "B1", minutes: 12,
  title: "Discussing Equity and Valuation",
  titleTr: "Hisse ve Değerleme Konuşmak",
  intro: "Hisse oranı, şirket değerlemesi ve seyrelme gibi temel kavramlar.",
  text: [
    { who: "Investor", en: "We like your company. We can invest 500,000 euros for 25 percent equity.", tr: "Şirketinizi beğendik. Yüzde 25 hisse karşılığında 500.000 euro yatırım yapabiliriz." },
    { who: "Me", en: "Thank you. That means a valuation of two million euros, right?", tr: "Teşekkürler. Bu iki milyon euro değerleme demek, değil mi?" },
    { who: "Investor", en: "Yes, two million post-money.", tr: "Evet, yatırım sonrası iki milyon." },
    { who: "Me", en: "We think the company is worth more. We have a working product and paying customers.", tr: "Biz şirketin daha değerli olduğunu düşünüyoruz. Çalışan bir ürünümüz ve ödeme yapan müşterilerimiz var." },
    { who: "Me", en: "We are looking for a valuation of three million.", tr: "Üç milyonluk bir değerleme arıyoruz." },
    { who: "Investor", en: "Three million is high for a company before certification.", tr: "Üç milyon, sertifikasyon öncesi bir şirket için yüksek." },
    { who: "Me", en: "I understand the risk. What about 2.5 million, with 20 percent equity?", tr: "Riski anlıyorum. Yüzde 20 hisseyle 2,5 milyona ne dersiniz?" },
    { who: "Investor", en: "We can accept that if we get a seat on the board.", tr: "Yönetim kurulunda bir koltuk alırsak bunu kabul edebiliriz." },
    { who: "Me", en: "A board seat is fine. We want an active investor, not just money.", tr: "Yönetim kurulu koltuğu uygun. Sadece para değil, aktif bir yatırımcı istiyoruz." }
  ],
  vocab: [
    { en: "invest", tr: "yatırım yapmak", ex: "We can invest 500,000 euros." },
    { en: "equity", tr: "hisse, öz sermaye payı", ex: "25 percent equity." },
    { en: "valuation", tr: "değerleme", ex: "That means a valuation of two million." },
    { en: "post-money", tr: "yatırım sonrası (değerleme)", ex: "Two million post-money." },
    { en: "be worth", tr: "değerinde olmak", ex: "The company is worth more." },
    { en: "look for", tr: "aramak", ex: "We are looking for a higher valuation." },
    { en: "accept", tr: "kabul etmek", ex: "We can accept that." },
    { en: "a seat on the board", tr: "yönetim kurulunda koltuk", ex: "They want a seat on the board." },
    { en: "active investor", tr: "aktif yatırımcı", ex: "We want an active investor." }
  ],
  questions: [
    { q: "What is the first offer?", options: ["500,000 for 25 percent", "500,000 for 10 percent", "1 million for 50 percent"], a: 0 },
    { q: "What valuation does the founder want?", options: ["Two million", "Three million", "Ten million"], a: 1 },
    { q: "What do they agree on?", options: ["2.5 million, 20 percent", "2 million, 25 percent", "3 million, 15 percent"], a: 0 },
    { q: "What does the investor want in return?", options: ["A seat on the board", "The office", "A new CEO"], a: 0 }
  ],
  gaps: [
    { s: "We can invest 500,000 euros for 25 percent ___.", a: "equity", hint: "hisse" },
    { s: "That means a ___ of two million euros.", a: "valuation", hint: "değerleme" },
    { s: "We think the company is ___ more.", a: "worth", hint: "değerinde" }
  ],
  order: [
    { a: "We are looking for a valuation of three million." },
    { a: "We want an active investor, not just money." }
  ],
  translate: [
    { tr: "Riski anlıyorum.", en: "I understand the risk.", keys: ["understand", "risk"] },
    { tr: "Bunu kabul edebiliriz.", en: "We can accept that.", keys: ["accept"] }
  ],
  roleplay: {
    persona: "Venture capital investor", personaTr: "Risk sermayesi yatırımcısı",
    scene: "Bir VC fonu teklif yapıyor; değerleme üzerine pazarlık ediyorsun.",
    turns: [
      { ai: "We can offer 400,000 euros for 25 percent of the company.", aiTr: "Şirketin yüzde 25'i için 400.000 euro teklif edebiliriz.", hint: "Thank you. That means a valuation of 1.6 million. We think the company is worth more because...", keys: ["valuation", "worth", "million", "percent"] },
      { ai: "Why do you think it is worth more?", aiTr: "Neden daha değerli olduğunu düşünüyorsunuz?", hint: "We have a working product and paying customers. We are looking for a valuation of...", keys: ["product", "customers", "looking for", "valuation"] },
      { ai: "OK. We can go higher if we get a seat on the board.", aiTr: "Tamam. Yönetim kurulunda koltuk alırsak daha yükseğe çıkabiliriz.", hint: "A board seat is fine. We want an active investor, not just money.", keys: ["board", "fine", "active", "accept"] }
    ]
  }
},
{
  id: "in-04", topic: "invest", level: "B1", minutes: 12,
  title: "Answering Hard Investor Questions",
  titleTr: "Zor Yatırımcı Sorularını Yanıtlamak",
  intro: "Rakipler, riskler ve 'neden siz?' sorularına sakin cevaplar.",
  text: [
    { who: "Investor", en: "Who are your competitors?", tr: "Rakipleriniz kimler?" },
    { who: "Me", en: "There are big companies that make classic audiometers. But their devices still need an expert.", tr: "Klasik odyometre yapan büyük şirketler var. Ama cihazları hâlâ uzman gerektiriyor." },
    { who: "Me", en: "There are also some apps, but they are not medical devices and they are not certified.", tr: "Bazı uygulamalar da var ama bunlar tıbbi cihaz değil ve sertifikalı değil." },
    { who: "Investor", en: "What stops a big company from copying you?", tr: "Büyük bir şirketin sizi kopyalamasını ne engeller?" },
    { who: "Me", en: "Our AI model is trained on thousands of real tests. That data is hard to get.", tr: "Yapay zekâ modelimiz binlerce gerçek testle eğitildi. O veriyi elde etmek zor." },
    { who: "Me", en: "And big companies move slowly. We can move much faster.", tr: "Ve büyük şirketler yavaş hareket eder. Biz çok daha hızlı hareket edebiliriz." },
    { who: "Investor", en: "What is the biggest risk for your company?", tr: "Şirketiniz için en büyük risk ne?" },
    { who: "Me", en: "Honestly, the biggest risk is certification. It can take longer than we plan.", tr: "Açıkçası en büyük risk sertifikasyon. Planladığımızdan uzun sürebilir." },
    { who: "Me", en: "That is why we started the process early, and we work with an experienced consultant.", tr: "Bu yüzden sürece erken başladık ve deneyimli bir danışmanla çalışıyoruz." },
    { who: "Investor", en: "Good answer. I like founders who know their risks.", tr: "İyi cevap. Risklerini bilen kurucuları severim." }
  ],
  vocab: [
    { en: "competitor", tr: "rakip", ex: "Who are your competitors?" },
    { en: "certified", tr: "sertifikalı", ex: "The apps are not certified." },
    { en: "copy", tr: "kopyalamak", ex: "What stops a big company from copying you?" },
    { en: "trained on", tr: "...ile eğitilmiş", ex: "Our model is trained on real tests." },
    { en: "hard to get", tr: "elde etmesi zor", ex: "That data is hard to get." },
    { en: "move fast / slowly", tr: "hızlı / yavaş hareket etmek", ex: "Big companies move slowly." },
    { en: "honestly", tr: "açıkçası, dürüst olmak gerekirse", ex: "Honestly, the biggest risk is certification." },
    { en: "take longer than", tr: "...den daha uzun sürmek", ex: "It can take longer than we plan." },
    { en: "experienced", tr: "deneyimli", ex: "We work with an experienced consultant." }
  ],
  questions: [
    { q: "Why are the apps not real competitors?", options: ["They are too cheap", "They are not certified medical devices", "They are too slow"], a: 1 },
    { q: "Why is it hard to copy the company?", options: ["They have a patent", "Their AI is trained on data that is hard to get", "They have a big office"], a: 1 },
    { q: "What is the biggest risk?", options: ["Marketing", "Certification", "Competition"], a: 1 },
    { q: "How do they manage this risk?", options: ["They ignore it", "They started early and work with a consultant", "They stopped the process"], a: 1 }
  ],
  gaps: [
    { s: "Who are your ___?", a: "competitors", hint: "rakipler" },
    { s: "Big companies move ___. We can move much faster.", a: "slowly", hint: "yavaş" },
    { s: "___, the biggest risk is certification.", a: "Honestly", hint: "açıkçası" }
  ],
  order: [
    { a: "That data is hard to get." },
    { a: "It can take longer than we plan." }
  ],
  translate: [
    { tr: "Biz çok daha hızlı hareket edebiliriz.", en: "We can move much faster.", keys: ["move", "faster"] },
    { tr: "Deneyimli bir danışmanla çalışıyoruz.", en: "We work with an experienced consultant.", keys: ["experienced", "consultant"] }
  ],
  roleplay: {
    persona: "Tough investor", personaTr: "Sert yatırımcı",
    scene: "Deneyimli bir yatırımcı en zor soruları soruyor.",
    turns: [
      { ai: "Who are your competitors, and why are you better?", aiTr: "Rakipleriniz kimler ve neden daha iyisiniz?", hint: "Big companies make classic audiometers, but they still need an expert. Some apps exist, but they are not certified.", keys: ["competitors", "expert", "certified", "apps"] },
      { ai: "A big company can copy you in six months. What then?", aiTr: "Büyük bir şirket sizi altı ayda kopyalayabilir. O zaman ne olacak?", hint: "Our AI is trained on thousands of real tests. That data is hard to get. And we move faster.", keys: ["trained", "data", "hard to get", "faster"] },
      { ai: "What keeps you awake at night? What is the biggest risk?", aiTr: "Sizi geceleri uyutmayan ne? En büyük risk ne?", hint: "Honestly, certification. It can take longer than we plan. That is why we started early and work with a consultant.", keys: ["honestly", "certification", "longer", "consultant"] }
    ]
  }
}
);
