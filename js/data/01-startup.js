// Konu 1: Girişimcilik ve şirket yönetimi
window.LESSONS = window.LESSONS || [];
window.LESSONS.push(
{
  id: "st-01", topic: "startup", level: "A2", minutes: 10,
  title: "Explaining My Startup to a Potential Partner",
  titleTr: "Girişimimi Olası Bir Ortağa Anlatmak",
  intro: "Bir kahve sohbetinde şirketini kısa ve net anlatıyorsun.",
  text: [
    { who: "Partner", en: "So, tell me about your company. What do you do?", tr: "Peki, bana şirketinden bahset. Ne yapıyorsunuz?" },
    { who: "Me", en: "We are a medical technology startup from Turkey.", tr: "Biz Türkiye'den bir medikal teknoloji girişimiyiz." },
    { who: "Me", en: "We build a device that tests hearing automatically.", tr: "İşitmeyi otomatik olarak test eden bir cihaz üretiyoruz." },
    { who: "Partner", en: "Interesting. Who are your customers?", tr: "İlginç. Müşterileriniz kimler?" },
    { who: "Me", en: "Our customers are hospitals, clinics and hearing aid shops.", tr: "Müşterilerimiz hastaneler, klinikler ve işitme cihazı mağazaları." },
    { who: "Me", en: "They need a fast and reliable test, but they do not have enough experts.", tr: "Hızlı ve güvenilir bir teste ihtiyaçları var ama yeterli uzmanları yok." },
    { who: "Partner", en: "How big is your team?", tr: "Ekibiniz ne kadar büyük?" },
    { who: "Me", en: "We are a small team of six people. Three engineers, one doctor and two business people.", tr: "Altı kişilik küçük bir ekibiz. Üç mühendis, bir doktor ve iki iş insanı." },
    { who: "Partner", en: "What is your next step?", tr: "Bir sonraki adımınız ne?" },
    { who: "Me", en: "Our next step is to find partners in Europe. That is why I am here.", tr: "Bir sonraki adımımız Avrupa'da ortaklar bulmak. Bu yüzden buradayım." }
  ],
  vocab: [
    { en: "startup", tr: "girişim, yeni kurulmuş şirket", ex: "We are a medical technology startup." },
    { en: "build a device", tr: "bir cihaz üretmek / geliştirmek", ex: "We build a device that tests hearing." },
    { en: "customer", tr: "müşteri", ex: "Our customers are hospitals and clinics." },
    { en: "reliable", tr: "güvenilir", ex: "They need a fast and reliable test." },
    { en: "expert", tr: "uzman", ex: "They do not have enough experts." },
    { en: "team of six", tr: "altı kişilik ekip", ex: "We are a small team of six people." },
    { en: "next step", tr: "sonraki adım", ex: "Our next step is to find partners." },
    { en: "that is why", tr: "bu yüzden", ex: "That is why I am here." }
  ],
  questions: [
    { q: "What does the company build?", options: ["A hearing aid", "A device that tests hearing", "A hospital app"], a: 1 },
    { q: "Who are the customers?", options: ["Only hospitals", "Schools and parents", "Hospitals, clinics and hearing aid shops"], a: 2 },
    { q: "How many people are in the team?", options: ["Three", "Six", "Ten"], a: 1 },
    { q: "Why is the speaker at the meeting?", options: ["To find partners in Europe", "To sell a hospital", "To hire a doctor"], a: 0 }
  ],
  gaps: [
    { s: "We build a ___ that tests hearing automatically.", a: "device", hint: "cihaz" },
    { s: "They need a fast and ___ test.", a: "reliable", hint: "güvenilir" },
    { s: "Our next ___ is to find partners in Europe.", a: "step", hint: "adım" }
  ],
  order: [
    { a: "We are a small team of six people." },
    { a: "Our customers are hospitals and clinics." }
  ],
  translate: [
    { tr: "Biz Türkiye'den bir medikal teknoloji girişimiyiz.", en: "We are a medical technology startup from Turkey.", keys: ["startup", "Turkey"] },
    { tr: "Bu yüzden buradayım.", en: "That is why I am here.", keys: ["why", "here"] }
  ],
  roleplay: {
    persona: "Potential partner", personaTr: "Olası iş ortağı",
    scene: "Bir konferansta kahve molasında Almanya'dan bir klinik zinciri yöneticisiyle tanışıyorsun.",
    turns: [
      { ai: "Nice to meet you. What does your company do?", aiTr: "Tanıştığımıza memnun oldum. Şirketiniz ne yapıyor?", hint: "We build a device that... / We are a ... startup.", keys: ["device", "startup", "hearing"] },
      { ai: "Who uses it? Who are your customers?", aiTr: "Kim kullanıyor? Müşterileriniz kimler?", hint: "Our customers are hospitals, clinics and...", keys: ["customer", "hospital", "clinic"] },
      { ai: "And why are you here in Europe?", aiTr: "Peki neden Avrupa'dasınız?", hint: "Our next step is to find partners. That is why...", keys: ["partner", "next step", "that is why"] }
    ]
  }
},
{
  id: "st-02", topic: "startup", level: "A2", minutes: 10,
  title: "How I Manage a Small Team",
  titleTr: "Küçük Bir Ekibi Nasıl Yönetiyorum",
  intro: "Haftalık toplantı, görev dağılımı ve basit yönetim ifadeleri.",
  text: [
    { en: "I manage a small team, so communication is very important.", tr: "Küçük bir ekibi yönetiyorum, bu yüzden iletişim çok önemli." },
    { en: "Every Monday morning we have a short team meeting.", tr: "Her pazartesi sabahı kısa bir ekip toplantısı yaparız." },
    { en: "In the meeting, everyone shares three things: what they did, what they will do, and what is blocking them.", tr: "Toplantıda herkes üç şeyi paylaşır: ne yaptığı, ne yapacağı ve onu neyin engellediği." },
    { en: "I try to give clear tasks with a deadline.", tr: "Son tarihi olan net görevler vermeye çalışırım." },
    { en: "For example: 'Please finish the test report by Friday.'", tr: "Örneğin: 'Lütfen test raporunu cuma gününe kadar bitir.'" },
    { en: "When someone has a problem, we solve it together. I do not look for someone to blame.", tr: "Birinin bir sorunu olduğunda birlikte çözeriz. Suçlayacak birini aramam." },
    { en: "I also give feedback often, both positive and negative.", tr: "Ayrıca hem olumlu hem olumsuz, sık sık geri bildirim veririm." },
    { en: "A good leader listens more than he talks.", tr: "İyi bir lider konuştuğundan daha çok dinler." },
    { en: "Finally, I trust my team. They are experts in their work.", tr: "Son olarak, ekibime güveniyorum. Onlar kendi işlerinde uzman." }
  ],
  vocab: [
    { en: "manage a team", tr: "bir ekibi yönetmek", ex: "I manage a small team of six people." },
    { en: "team meeting", tr: "ekip toplantısı", ex: "We have a short team meeting on Mondays." },
    { en: "share", tr: "paylaşmak", ex: "Everyone shares what they did." },
    { en: "task", tr: "görev", ex: "I give clear tasks with a deadline." },
    { en: "deadline", tr: "son teslim tarihi", ex: "The deadline is Friday." },
    { en: "blame", tr: "suçlamak", ex: "I do not look for someone to blame." },
    { en: "give feedback", tr: "geri bildirim vermek", ex: "I give feedback often." },
    { en: "trust", tr: "güvenmek", ex: "I trust my team." }
  ],
  questions: [
    { q: "When is the team meeting?", options: ["Every Friday", "Every Monday morning", "Every day"], a: 1 },
    { q: "What does everyone share in the meeting?", options: ["Their salary", "Three things about their work", "Their holiday plans"], a: 1 },
    { q: "What does the speaker do when there is a problem?", options: ["Finds someone to blame", "Solves it with the team", "Ignores it"], a: 1 },
    { q: "What does a good leader do?", options: ["Talks a lot", "Listens more than talks", "Works alone"], a: 1 }
  ],
  gaps: [
    { s: "I try to give clear tasks with a ___.", a: "deadline", hint: "son tarih" },
    { s: "I do not look for someone to ___.", a: "blame", hint: "suçlamak" },
    { s: "I give ___ often, both positive and negative.", a: "feedback", hint: "geri bildirim" }
  ],
  order: [
    { a: "Every Monday we have a short team meeting." },
    { a: "A good leader listens more than he talks." }
  ],
  translate: [
    { tr: "Ekibime güveniyorum.", en: "I trust my team.", keys: ["trust", "team"] },
    { tr: "Lütfen raporu cuma gününe kadar bitir.", en: "Please finish the report by Friday.", keys: ["finish", "report", "Friday"] }
  ],
  roleplay: {
    persona: "New engineer", personaTr: "Yeni işe başlayan mühendis",
    scene: "Ekibe yeni katılan bir yazılım mühendisi, nasıl çalıştığınızı soruyor.",
    turns: [
      { ai: "Hi! It is my first week. How does the team work?", aiTr: "Merhaba! Bu benim ilk haftam. Ekip nasıl çalışıyor?", hint: "Every Monday we have a team meeting. Everyone shares...", keys: ["meeting", "share", "Monday"] },
      { ai: "What should I do if I have a problem with my task?", aiTr: "Görevimle ilgili bir sorunum olursa ne yapmalıyım?", hint: "Tell me early. We solve it together. I do not blame...", keys: ["together", "solve", "blame", "tell"] },
      { ai: "Great. What is my first task?", aiTr: "Harika. İlk görevim ne?", hint: "Please ... by Friday. The deadline is...", keys: ["deadline", "please", "Friday", "by"] }
    ]
  }
},
{
  id: "st-03", topic: "startup", level: "B1", minutes: 12,
  title: "Making a Difficult Business Decision",
  titleTr: "Zor Bir İş Kararı Vermek",
  intro: "İki seçenek arasında karar verirken kullanılan ifadeler.",
  text: [
    { en: "Last month we had to make a difficult decision.", tr: "Geçen ay zor bir karar vermek zorunda kaldık." },
    { en: "We had two options. Option A was to sell our device directly to hospitals.", tr: "İki seçeneğimiz vardı. A seçeneği cihazımızı doğrudan hastanelere satmaktı." },
    { en: "Option B was to work with a distributor who already knows the market.", tr: "B seçeneği pazarı zaten bilen bir distribütörle çalışmaktı." },
    { en: "Selling directly means higher profit, but it takes a lot of time.", tr: "Doğrudan satmak daha yüksek kâr demek ama çok zaman alıyor." },
    { en: "A distributor takes a percentage, but they can reach many customers quickly.", tr: "Bir distribütör yüzde alır ama birçok müşteriye hızla ulaşabilir." },
    { en: "We discussed the pros and cons for two weeks.", tr: "İki hafta boyunca artıları ve eksileri tartıştık." },
    { en: "In the end, we decided to go with the distributor.", tr: "Sonunda distribütörle ilerlemeye karar verdik." },
    { en: "The main reason was speed. As a startup, time is our most important resource.", tr: "Ana sebep hızdı. Bir girişim olarak zaman en önemli kaynağımız." },
    { en: "It was not an easy choice, but I think it was the right one.", tr: "Kolay bir seçim değildi ama bence doğru olandı." }
  ],
  vocab: [
    { en: "make a decision", tr: "karar vermek", ex: "We had to make a difficult decision." },
    { en: "option", tr: "seçenek", ex: "We had two options." },
    { en: "directly", tr: "doğrudan", ex: "We sell directly to hospitals." },
    { en: "distributor", tr: "distribütör, dağıtıcı", ex: "A distributor knows the market." },
    { en: "profit", tr: "kâr", ex: "Selling directly means higher profit." },
    { en: "pros and cons", tr: "artılar ve eksiler", ex: "We discussed the pros and cons." },
    { en: "in the end", tr: "sonunda", ex: "In the end, we chose option B." },
    { en: "resource", tr: "kaynak", ex: "Time is our most important resource." }
  ],
  questions: [
    { q: "What was option A?", options: ["Work with a distributor", "Sell directly to hospitals", "Close the company"], a: 1 },
    { q: "What is the advantage of a distributor?", options: ["Higher profit", "They reach customers quickly", "They are free"], a: 1 },
    { q: "How long did they discuss?", options: ["Two days", "Two weeks", "Two months"], a: 1 },
    { q: "What was the main reason for the decision?", options: ["Speed", "Money", "Friendship"], a: 0 }
  ],
  gaps: [
    { s: "We had to make a difficult ___.", a: "decision", hint: "karar" },
    { s: "We discussed the pros and ___ for two weeks.", a: "cons", hint: "eksiler" },
    { s: "Time is our most important ___.", a: "resource", hint: "kaynak" }
  ],
  order: [
    { a: "In the end, we decided to go with the distributor." },
    { a: "It was not an easy choice." }
  ],
  translate: [
    { tr: "İki seçeneğimiz vardı.", en: "We had two options.", keys: ["two", "options"] },
    { tr: "Bence doğru karardı.", en: "I think it was the right decision.", keys: ["right", "decision"] }
  ],
  roleplay: {
    persona: "Co-founder", personaTr: "Kurucu ortak",
    scene: "Kurucu ortağın, distribütör mü yoksa doğrudan satış mı sorusunu tartışmak istiyor.",
    turns: [
      { ai: "I think we should sell directly to hospitals. What do you think?", aiTr: "Bence doğrudan hastanelere satmalıyız. Sen ne düşünüyorsun?", hint: "Selling directly means higher profit, but it takes...", keys: ["profit", "time", "directly", "but"] },
      { ai: "OK, but a distributor takes a percentage. Is that a problem?", aiTr: "Tamam ama distribütör yüzde alıyor. Bu bir sorun mu?", hint: "Yes, but they can reach many customers quickly...", keys: ["quickly", "customers", "reach", "speed"] },
      { ai: "So what is your final decision?", aiTr: "Peki son kararın ne?", hint: "In the end, I think we should go with... The main reason is...", keys: ["in the end", "decision", "reason", "go with"] }
    ]
  }
},
{
  id: "st-04", topic: "startup", level: "B1", minutes: 12,
  title: "Negotiating with a Business Partner",
  titleTr: "Bir İş Ortağıyla Müzakere Etmek",
  intro: "Fiyat, süre ve şartlar üzerinde pazarlık yaparken nazik ama net olmak.",
  text: [
    { who: "Partner", en: "We can offer you 15 percent commission on every device we sell.", tr: "Sattığımız her cihaz için size yüzde 15 komisyon teklif edebiliriz." },
    { who: "Me", en: "Thank you for the offer. Fifteen percent is a bit low for us.", tr: "Teklif için teşekkürler. Yüzde 15 bizim için biraz düşük." },
    { who: "Me", en: "Our production cost is high, so we need at least 25 percent.", tr: "Üretim maliyetimiz yüksek, bu yüzden en az yüzde 25'e ihtiyacımız var." },
    { who: "Partner", en: "Twenty-five is too much. We also have marketing costs.", tr: "Yirmi beş çok fazla. Bizim de pazarlama maliyetlerimiz var." },
    { who: "Me", en: "I understand. What if we start with 20 percent for the first year?", tr: "Anlıyorum. İlk yıl için yüzde 20 ile başlasak nasıl olur?" },
    { who: "Me", en: "Then we can review the agreement after twelve months.", tr: "Sonra on iki ay sonra anlaşmayı gözden geçirebiliriz." },
    { who: "Partner", en: "That sounds fair. But we want exclusive rights in Germany.", tr: "Bu adil görünüyor. Ama Almanya'da münhasır haklar istiyoruz." },
    { who: "Me", en: "Exclusive rights are possible if you reach a minimum sales target.", tr: "Minimum satış hedefine ulaşırsanız münhasır haklar mümkün." },
    { who: "Partner", en: "OK. Let's put it in writing and sign next week.", tr: "Tamam. Yazıya dökelim ve gelecek hafta imzalayalım." },
    { who: "Me", en: "Perfect. I think we have reached an agreement.", tr: "Mükemmel. Sanırım bir anlaşmaya vardık." }
  ],
  vocab: [
    { en: "offer", tr: "teklif, teklif etmek", ex: "Thank you for the offer." },
    { en: "commission", tr: "komisyon", ex: "We offer 15 percent commission." },
    { en: "a bit low", tr: "biraz düşük", ex: "Fifteen percent is a bit low for us." },
    { en: "at least", tr: "en az", ex: "We need at least 25 percent." },
    { en: "What if we...?", tr: "...sak nasıl olur?", ex: "What if we start with 20 percent?" },
    { en: "review the agreement", tr: "anlaşmayı gözden geçirmek", ex: "We can review the agreement after a year." },
    { en: "exclusive rights", tr: "münhasır (tek satıcılık) hakları", ex: "They want exclusive rights in Germany." },
    { en: "reach an agreement", tr: "anlaşmaya varmak", ex: "I think we have reached an agreement." }
  ],
  questions: [
    { q: "What was the first offer?", options: ["15 percent", "20 percent", "25 percent"], a: 0 },
    { q: "Why does the speaker need more?", options: ["Marketing costs", "High production cost", "Taxes"], a: 1 },
    { q: "What do they agree for the first year?", options: ["15 percent", "20 percent", "30 percent"], a: 1 },
    { q: "What is the condition for exclusive rights?", options: ["A minimum sales target", "A higher price", "A new office"], a: 0 }
  ],
  gaps: [
    { s: "Fifteen percent is a bit ___ for us.", a: "low", hint: "düşük" },
    { s: "We need at ___ 25 percent.", a: "least", hint: "en az" },
    { s: "I think we have reached an ___.", a: "agreement", hint: "anlaşma" }
  ],
  order: [
    { a: "What if we start with 20 percent?" },
    { a: "We can review the agreement after twelve months." }
  ],
  translate: [
    { tr: "Teklif için teşekkürler.", en: "Thank you for the offer.", keys: ["thank", "offer"] },
    { tr: "Bu adil görünüyor.", en: "That sounds fair.", keys: ["sounds", "fair"] }
  ],
  roleplay: {
    persona: "Distributor", personaTr: "Distribütör",
    scene: "Hollandalı bir distribütör komisyon oranı ve münhasırlık konusunda pazarlık yapıyor.",
    turns: [
      { ai: "We can offer you 10 percent commission. Is that OK?", aiTr: "Size yüzde 10 komisyon teklif edebiliriz. Uygun mu?", hint: "Thank you for the offer, but 10 percent is a bit low. We need at least...", keys: ["offer", "low", "at least", "percent"] },
      { ai: "Hmm, that is a lot. We also have costs.", aiTr: "Hmm, bu çok fazla. Bizim de maliyetlerimiz var.", hint: "I understand. What if we start with ... and review the agreement after...", keys: ["what if", "review", "understand", "start with"] },
      { ai: "OK, that sounds fair. We also want exclusive rights.", aiTr: "Tamam, adil görünüyor. Münhasır haklar da istiyoruz.", hint: "Exclusive rights are possible if you reach a minimum sales target.", keys: ["exclusive", "possible", "target", "if"] }
    ]
  }
},
{
  id: "st-05", topic: "startup", level: "B1", minutes: 12,
  title: "Solving a Problem with a Customer",
  titleTr: "Bir Müşteriyle Sorun Çözmek",
  intro: "Bir hastane şikayet ediyor. Özür dilemek, çözüm sunmak ve güveni korumak.",
  text: [
    { en: "Yesterday a hospital in Izmir called us with a complaint.", tr: "Dün İzmir'de bir hastane bir şikayetle bizi aradı." },
    { en: "Their device stopped working in the middle of a test.", tr: "Cihazları bir testin ortasında çalışmayı durdurdu." },
    { en: "The doctor was angry because she had many patients waiting.", tr: "Doktor kızgındı çünkü bekleyen çok hastası vardı." },
    { en: "First, I apologised and thanked her for calling us quickly.", tr: "Önce özür diledim ve bizi hızlıca aradığı için teşekkür ettim." },
    { en: "Then I asked a few questions to understand the problem.", tr: "Sonra sorunu anlamak için birkaç soru sordum." },
    { en: "It was a software bug, not a hardware problem.", tr: "Bu bir yazılım hatasıydı, donanım sorunu değil." },
    { en: "Our engineer sent an update within two hours, and the device started working again.", tr: "Mühendisimiz iki saat içinde bir güncelleme gönderdi ve cihaz tekrar çalışmaya başladı." },
    { en: "I called the doctor back to make sure everything was fine.", tr: "Her şeyin yolunda olduğundan emin olmak için doktoru geri aradım." },
    { en: "A complaint is not the end of a relationship. If you handle it well, it can make the relationship stronger.", tr: "Bir şikayet ilişkinin sonu değildir. İyi yönetirseniz ilişkiyi daha güçlü hale getirebilir." }
  ],
  vocab: [
    { en: "complaint", tr: "şikayet", ex: "A hospital called us with a complaint." },
    { en: "stop working", tr: "çalışmayı durdurmak, bozulmak", ex: "The device stopped working." },
    { en: "apologise", tr: "özür dilemek", ex: "First, I apologised." },
    { en: "bug", tr: "yazılım hatası", ex: "It was a software bug." },
    { en: "hardware", tr: "donanım", ex: "It was not a hardware problem." },
    { en: "update", tr: "güncelleme", ex: "Our engineer sent an update." },
    { en: "within two hours", tr: "iki saat içinde", ex: "We fixed it within two hours." },
    { en: "make sure", tr: "emin olmak", ex: "I called to make sure everything was fine." },
    { en: "handle", tr: "ele almak, yönetmek", ex: "If you handle a complaint well, the relationship gets stronger." }
  ],
  questions: [
    { q: "What was the problem?", options: ["The device was too expensive", "The device stopped working during a test", "The doctor lost the device"], a: 1 },
    { q: "What did the speaker do first?", options: ["Sent an invoice", "Apologised", "Blamed the doctor"], a: 1 },
    { q: "What kind of problem was it?", options: ["A hardware problem", "A software bug", "A battery problem"], a: 1 },
    { q: "How fast was the update sent?", options: ["Within two hours", "Within two days", "Within two weeks"], a: 0 }
  ],
  gaps: [
    { s: "A hospital called us with a ___.", a: "complaint", hint: "şikayet" },
    { s: "First, I ___ and thanked her.", a: "apologised", hint: "özür diledim" },
    { s: "Our engineer sent an ___ within two hours.", a: "update", hint: "güncelleme" }
  ],
  order: [
    { a: "It was a software bug, not a hardware problem." },
    { a: "I called the doctor back to make sure everything was fine." }
  ],
  translate: [
    { tr: "Sorun için özür dilerim.", en: "I apologise for the problem.", keys: ["apologise", "problem"] },
    { tr: "Cihaz tekrar çalışıyor.", en: "The device is working again.", keys: ["device", "working", "again"] }
  ],
  roleplay: {
    persona: "Angry doctor", personaTr: "Kızgın doktor",
    scene: "Bir klinikteki doktor cihazın test sırasında durduğunu söylüyor.",
    turns: [
      { ai: "Your device stopped in the middle of a test! I have ten patients waiting!", aiTr: "Cihazınız testin ortasında durdu! Bekleyen on hastam var!", hint: "I am very sorry. Thank you for calling us quickly. Can I ask a few questions?", keys: ["sorry", "apologise", "thank", "questions"] },
      { ai: "The screen is black and it does not restart.", aiTr: "Ekran siyah ve yeniden başlamıyor.", hint: "I understand. It sounds like a software bug. Our engineer will send an update within...", keys: ["software", "update", "engineer", "within"] },
      { ai: "How long will it take? I cannot wait all day.", aiTr: "Ne kadar sürer? Bütün gün bekleyemem.", hint: "Within two hours. I will call you back to make sure everything is fine.", keys: ["hours", "call you back", "make sure"] }
    ]
  }
}
);
