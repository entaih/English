// Konu 7: Strateji, günlük yaşam ve seyahat
window.LESSONS = window.LESSONS || [];
window.LESSONS.push(
{
  id: "li-01", topic: "life", level: "A2", minutes: 10,
  title: "At the Airport and the Hotel",
  titleTr: "Havalimanında ve Otelde",
  intro: "İş seyahatinde pasaport kontrolü, taksi ve otel check-in konuşmaları.",
  text: [
    { who: "Officer", en: "Good morning. What is the purpose of your visit?", tr: "Günaydın. Ziyaretinizin amacı ne?" },
    { who: "Me", en: "I am here for a business conference. It is a medical technology event.", tr: "Bir iş konferansı için buradayım. Bir medikal teknoloji etkinliği." },
    { who: "Officer", en: "How long will you stay?", tr: "Ne kadar kalacaksınız?" },
    { who: "Me", en: "Four days. I fly back on Friday.", tr: "Dört gün. Cuma günü geri uçuyorum." },
    { who: "Officer", en: "Thank you. Enjoy your stay.", tr: "Teşekkürler. İyi konaklamalar." },
    { who: "Me", en: "Hello, I have a reservation under the name Yilmaz.", tr: "Merhaba, Yılmaz adına bir rezervasyonum var." },
    { who: "Receptionist", en: "Welcome. Could I see your passport, please?", tr: "Hoş geldiniz. Pasaportunuzu görebilir miyim lütfen?" },
    { who: "Me", en: "Here you are. Is breakfast included?", tr: "Buyurun. Kahvaltı dahil mi?" },
    { who: "Receptionist", en: "Yes, breakfast is from 7 to 10. Your room is on the fifth floor. Here is your key card.", tr: "Evet, kahvaltı 7 ile 10 arası. Odanız beşinci katta. İşte anahtar kartınız." },
    { who: "Me", en: "Thank you. Could you tell me the wifi password?", tr: "Teşekkürler. Wifi şifresini söyleyebilir misiniz?" }
  ],
  vocab: [
    { en: "purpose of your visit", tr: "ziyaretinizin amacı", ex: "What is the purpose of your visit?" },
    { en: "business conference", tr: "iş konferansı", ex: "I am here for a business conference." },
    { en: "fly back", tr: "geri uçmak, dönmek", ex: "I fly back on Friday." },
    { en: "Enjoy your stay.", tr: "İyi konaklamalar.", ex: "Thank you. Enjoy your stay." },
    { en: "reservation under the name", tr: "... adına rezervasyon", ex: "I have a reservation under the name Yilmaz." },
    { en: "Could I see...?", tr: "...görebilir miyim?", ex: "Could I see your passport?" },
    { en: "Here you are.", tr: "Buyurun.", ex: "Here you are. - Thank you." },
    { en: "included", tr: "dahil", ex: "Is breakfast included?" },
    { en: "Could you tell me...?", tr: "...söyleyebilir misiniz?", ex: "Could you tell me the wifi password?" }
  ],
  questions: [
    { q: "Why is the speaker travelling?", options: ["Holiday", "A business conference", "Visiting family"], a: 1 },
    { q: "How long will he stay?", options: ["Four days", "Four weeks", "One day"], a: 0 },
    { q: "What does the receptionist ask for?", options: ["Money", "A passport", "A phone"], a: 1 },
    { q: "When is breakfast?", options: ["From 6 to 9", "From 7 to 10", "From 8 to 11"], a: 1 }
  ],
  gaps: [
    { s: "What is the ___ of your visit?", a: "purpose", hint: "amaç" },
    { s: "I have a ___ under the name Yilmaz.", a: "reservation", hint: "rezervasyon" },
    { s: "Is breakfast ___?", a: "included", hint: "dahil" }
  ],
  order: [
    { a: "I fly back on Friday." },
    { a: "Could you tell me the wifi password?" }
  ],
  translate: [
    { tr: "Bir iş konferansı için buradayım.", en: "I am here for a business conference.", keys: ["here for", "conference"] },
    { tr: "Pasaportunuzu görebilir miyim?", en: "Could I see your passport?", keys: ["could", "passport"] }
  ],
  roleplay: {
    persona: "Hotel receptionist", personaTr: "Otel resepsiyonisti",
    scene: "Berlin'de otele geç saatte giriş yapıyorsun.",
    turns: [
      { ai: "Good evening! How can I help you?", aiTr: "İyi akşamlar! Nasıl yardımcı olabilirim?", hint: "Hello, I have a reservation under the name ...", keys: ["reservation", "under the name", "hello"] },
      { ai: "Welcome! Could I see your passport, please?", aiTr: "Hoş geldiniz! Pasaportunuzu görebilir miyim lütfen?", hint: "Here you are. Is breakfast included?", keys: ["here you are", "breakfast", "included"] },
      { ai: "Yes, from 7 to 10. Your room is 512. Anything else?", aiTr: "Evet, 7'den 10'a. Odanız 512. Başka bir şey?", hint: "Could you tell me the wifi password? And what time is check-out?", keys: ["could you", "wifi", "check-out", "thank"] }
    ]
  }
},
{
  id: "li-02", topic: "life", level: "B1", minutes: 12,
  title: "Why People Say No (and How to Change It)",
  titleTr: "İnsanlar Neden Hayır Der (ve Bu Nasıl Değişir)",
  intro: "İkna, güven ve karar psikolojisi: satışta ve yatırımda işe yarayan basit fikirler.",
  text: [
    { en: "When a customer says no, it is usually not about the product.", tr: "Bir müşteri hayır dediğinde, bu genellikle ürünle ilgili değildir." },
    { en: "People say no for three main reasons: they do not trust you, they do not understand you, or the timing is wrong.", tr: "İnsanlar üç ana nedenle hayır der: size güvenmezler, sizi anlamazlar ya da zamanlama yanlıştır." },
    { en: "Trust comes from small signals: a clear website, a quick reply to an email, a customer who recommends you.", tr: "Güven küçük sinyallerden gelir: net bir web sitesi, bir e-postaya hızlı cevap, sizi tavsiye eden bir müşteri." },
    { en: "Understanding comes from simple language. If a buyer needs an engineer to understand your pitch, you have already lost.", tr: "Anlama basit dilden gelir. Bir alıcı sunumunuzu anlamak için bir mühendise ihtiyaç duyuyorsa, zaten kaybetmişsinizdir." },
    { en: "Timing is about pain. People change when the old way becomes too painful.", tr: "Zamanlama acıyla ilgilidir. İnsanlar eski yol fazla acı verici hale geldiğinde değişir." },
    { en: "So, before a meeting, I ask myself three questions.", tr: "Bu yüzden bir toplantıdan önce kendime üç soru sorarım." },
    { en: "Why should they trust me? Will they understand me in one minute? And what is their pain today?", tr: "Bana neden güvensinler? Beni bir dakikada anlayacaklar mı? Ve bugünkü acıları ne?" },
    { en: "A 'no' today is often a 'not yet'. Stay in contact, and ask again in three months.", tr: "Bugünkü bir 'hayır' çoğu zaman 'henüz değil'dir. İletişimde kalın ve üç ay sonra tekrar sorun." }
  ],
  vocab: [
    { en: "reason", tr: "neden, sebep", ex: "People say no for three main reasons." },
    { en: "trust", tr: "güven, güvenmek", ex: "Trust comes from small signals." },
    { en: "signal", tr: "sinyal, işaret", ex: "A quick reply is a signal of trust." },
    { en: "recommend", tr: "tavsiye etmek", ex: "A customer who recommends you." },
    { en: "timing", tr: "zamanlama", ex: "The timing was wrong." },
    { en: "pain", tr: "acı, sıkıntı", ex: "What is their pain today?" },
    { en: "painful", tr: "acı verici, zahmetli", ex: "The old way becomes too painful." },
    { en: "not yet", tr: "henüz değil", ex: "A 'no' is often a 'not yet'." },
    { en: "stay in contact", tr: "iletişimde kalmak", ex: "Stay in contact and ask again later." }
  ],
  questions: [
    { q: "What are the three reasons people say no?", options: ["Price, colour, size", "Trust, understanding, timing", "Weather, mood, luck"], a: 1 },
    { q: "Where does trust come from?", options: ["Big offices", "Small signals like quick replies", "Long contracts"], a: 1 },
    { q: "When do people change?", options: ["When the old way is too painful", "On Mondays", "When they are rich"], a: 0 },
    { q: "What is a 'no' often?", options: ["The end", "A 'not yet'", "A joke"], a: 1 }
  ],
  gaps: [
    { s: "People say no for three main ___.", a: "reasons", hint: "nedenler" },
    { s: "A customer who ___ you is a strong signal.", a: "recommends", hint: "tavsiye eder" },
    { s: "Stay in ___ and ask again in three months.", a: "contact", hint: "iletişim" }
  ],
  order: [
    { a: "Trust comes from small signals." },
    { a: "A no today is often a not yet." }
  ],
  translate: [
    { tr: "Zamanlama yanlıştı.", en: "The timing was wrong.", keys: ["timing", "wrong"] },
    { tr: "Bana neden güvensinler?", en: "Why should they trust me?", keys: ["why", "trust"] }
  ],
  roleplay: {
    persona: "Hesitant clinic owner", personaTr: "Kararsız klinik sahibi",
    scene: "Klinik sahibi 'şimdi değil' diyor. Nedenini anlamaya çalışıyorsun.",
    turns: [
      { ai: "It is a nice device, but I think we are not ready. Maybe next year.", aiTr: "Güzel bir cihaz ama sanırım hazır değiliz. Belki gelecek yıl.", hint: "I understand. Can I ask what the biggest problem is today? What is painful for you?", keys: ["understand", "problem", "pain", "ask"] },
      { ai: "Honestly, our patients wait six weeks for a test. But a new device is a risk.", aiTr: "Açıkçası hastalarımız test için altı hafta bekliyor. Ama yeni bir cihaz risk.", hint: "That is a long wait. What if you try the device for free for one month, with no risk?", keys: ["what if", "free", "month", "risk"] },
      { ai: "Hmm. Let me think about it.", aiTr: "Hmm. Bir düşüneyim.", hint: "Of course. I will stay in contact and send you a short email next week. A no today can be a not yet.", keys: ["stay in contact", "email", "next week", "of course"] }
    ]
  }
},
{
  id: "li-03", topic: "life", level: "B1", minutes: 12,
  title: "Managing Energy as a Founder",
  titleTr: "Bir Kurucu Olarak Enerjiyi Yönetmek",
  intro: "Uyku, odak ve alışkanlıklar: yoğun tempoyu sürdürülebilir kılmak.",
  text: [
    { en: "In my first year as a founder, I worked fourteen hours a day and slept five.", tr: "Kurucu olarak ilk yılımda günde on dört saat çalıştım ve beş saat uyudum." },
    { en: "I thought this was normal. Then I started making bad decisions.", tr: "Bunun normal olduğunu düşündüm. Sonra kötü kararlar vermeye başladım." },
    { en: "A tired brain is a slow brain. It chooses the easy answer, not the right one.", tr: "Yorgun bir beyin yavaş bir beyindir. Doğru cevabı değil, kolay cevabı seçer." },
    { en: "Now I have three simple rules.", tr: "Şimdi üç basit kuralım var." },
    { en: "First, I sleep at least seven hours. No emails after ten at night.", tr: "Birincisi, en az yedi saat uyuyorum. Gece ondan sonra e-posta yok." },
    { en: "Second, I do my most important task in the morning, before meetings, when my mind is fresh.", tr: "İkincisi, en önemli işimi sabah, toplantılardan önce, zihnim tazeyken yapıyorum." },
    { en: "Third, I walk for thirty minutes every day. Many of my best ideas come during a walk.", tr: "Üçüncüsü, her gün otuz dakika yürüyorum. En iyi fikirlerimin çoğu yürüyüş sırasında geliyor." },
    { en: "A startup is a marathon, not a sprint. If the founder burns out, the company burns out too.", tr: "Bir girişim maraton gibidir, sprint değil. Kurucu tükenirse şirket de tükenir." }
  ],
  vocab: [
    { en: "founder", tr: "kurucu", ex: "In my first year as a founder..." },
    { en: "make a bad decision", tr: "kötü karar vermek", ex: "I started making bad decisions." },
    { en: "tired", tr: "yorgun", ex: "A tired brain is a slow brain." },
    { en: "rule", tr: "kural", ex: "Now I have three simple rules." },
    { en: "at least", tr: "en az", ex: "I sleep at least seven hours." },
    { en: "fresh", tr: "taze, dinç", ex: "My mind is fresh in the morning." },
    { en: "go for a walk", tr: "yürüyüşe çıkmak", ex: "I go for a walk every day." },
    { en: "marathon, not a sprint", tr: "maraton, sprint değil", ex: "A startup is a marathon, not a sprint." },
    { en: "burn out", tr: "tükenmek", ex: "If the founder burns out, the company burns out." }
  ],
  questions: [
    { q: "What happened in the first year?", options: ["He slept a lot", "He worked 14 hours and slept 5", "He took a holiday"], a: 1 },
    { q: "What does a tired brain do?", options: ["Chooses the easy answer", "Works faster", "Sleeps"], a: 0 },
    { q: "When does he do his most important task?", options: ["At night", "In the morning", "After lunch"], a: 1 },
    { q: "Where do his best ideas come from?", options: ["Meetings", "Walks", "Emails"], a: 1 }
  ],
  gaps: [
    { s: "A ___ brain is a slow brain.", a: "tired", hint: "yorgun" },
    { s: "I sleep at ___ seven hours.", a: "least", hint: "en az" },
    { s: "A startup is a marathon, not a ___.", a: "sprint", hint: "kısa koşu" }
  ],
  order: [
    { a: "Now I have three simple rules." },
    { a: "No emails after ten at night." }
  ],
  translate: [
    { tr: "Her gün otuz dakika yürüyorum.", en: "I walk for thirty minutes every day.", keys: ["walk", "minutes", "every day"] },
    { tr: "Kötü kararlar vermeye başladım.", en: "I started making bad decisions.", keys: ["started", "bad decisions"] }
  ],
  roleplay: {
    persona: "Young founder", personaTr: "Genç kurucu",
    scene: "Genç bir girişimci sana nasıl yoğun tempoyla baş ettiğini soruyor.",
    turns: [
      { ai: "I work all the time and I am so tired. How do you manage?", aiTr: "Sürekli çalışıyorum ve çok yorgunum. Sen nasıl yönetiyorsun?", hint: "I had the same problem. A tired brain makes bad decisions. Now I sleep at least seven hours.", keys: ["tired", "decisions", "sleep", "at least"] },
      { ai: "But I have too many tasks. When do I do them?", aiTr: "Ama çok fazla görevim var. Onları ne zaman yapayım?", hint: "Do your most important task in the morning, before meetings, when your mind is fresh.", keys: ["important", "morning", "fresh", "meetings"] },
      { ai: "Do you have any other advice?", aiTr: "Başka bir tavsiyen var mı?", hint: "Walk thirty minutes every day. A startup is a marathon, not a sprint.", keys: ["walk", "marathon", "sprint", "every day"] }
    ]
  }
}
);
