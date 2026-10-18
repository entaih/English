// Konu 5: Uluslararası iletişim ve profesyonel İngilizce
window.LESSONS = window.LESSONS || [];
window.LESSONS.push(
{
  id: "co-01", topic: "comms", level: "A2", minutes: 10,
  title: "Introducing Myself at a Conference",
  titleTr: "Bir Konferansta Kendimi Tanıtmak",
  intro: "Networking için kısa, doğal ve akılda kalıcı kendini tanıtma.",
  text: [
    { who: "Me", en: "Hi, I don't think we have met. I'm Ali.", tr: "Merhaba, sanırım tanışmadık. Ben Ali." },
    { who: "Sarah", en: "Nice to meet you, Ali. I'm Sarah. I work for a hospital group in the UK.", tr: "Tanıştığımıza memnun oldum Ali. Ben Sarah. İngiltere'de bir hastane grubunda çalışıyorum." },
    { who: "Me", en: "Nice to meet you too. I'm the founder of a medical device startup from Turkey.", tr: "Ben de memnun oldum. Türkiye'den bir tıbbi cihaz girişiminin kurucusuyum." },
    { who: "Sarah", en: "Oh, what kind of device?", tr: "Oo, ne tür bir cihaz?" },
    { who: "Me", en: "We make an audiometer that tests hearing without an expert. It is like a self-service hearing test.", tr: "Uzman olmadan işitmeyi test eden bir odyometre yapıyoruz. Self servis işitme testi gibi." },
    { who: "Sarah", en: "That sounds useful. We have long waiting lists for hearing tests.", tr: "Faydalı görünüyor. İşitme testleri için uzun bekleme listelerimiz var." },
    { who: "Me", en: "That is exactly the problem we solve. Can I give you my card?", tr: "Tam da çözdüğümüz sorun bu. Size kartımı verebilir miyim?" },
    { who: "Sarah", en: "Sure. Let's talk more after the next session.", tr: "Tabii. Bir sonraki oturumdan sonra daha fazla konuşalım." },
    { who: "Me", en: "Great, I would love that. See you later!", tr: "Harika, çok isterim. Sonra görüşürüz!" }
  ],
  vocab: [
    { en: "I don't think we have met.", tr: "Sanırım tanışmadık.", ex: "Hi, I don't think we have met. I'm Ali." },
    { en: "Nice to meet you.", tr: "Tanıştığımıza memnun oldum.", ex: "Nice to meet you too." },
    { en: "work for", tr: "...de çalışmak", ex: "I work for a hospital group." },
    { en: "What kind of...?", tr: "Ne tür...?", ex: "What kind of device?" },
    { en: "self-service", tr: "self servis", ex: "It is like a self-service hearing test." },
    { en: "That sounds useful.", tr: "Faydalı görünüyor.", ex: "That sounds useful for our clinics." },
    { en: "waiting list", tr: "bekleme listesi", ex: "We have long waiting lists." },
    { en: "exactly", tr: "tam olarak", ex: "That is exactly the problem we solve." },
    { en: "I would love that.", tr: "Çok isterim.", ex: "Let's talk later. - I would love that." }
  ],
  questions: [
    { q: "Where does Sarah work?", options: ["A hospital group in the UK", "A startup in Turkey", "A university"], a: 0 },
    { q: "How does Ali describe the device?", options: ["A phone", "A self-service hearing test", "A hearing aid"], a: 1 },
    { q: "What problem does Sarah have?", options: ["No money", "Long waiting lists", "No doctors"], a: 1 },
    { q: "What do they plan to do?", options: ["Talk more after the next session", "Sign a contract now", "Have dinner"], a: 0 }
  ],
  gaps: [
    { s: "Hi, I don't think we have ___.", a: "met", hint: "tanışmak" },
    { s: "I ___ for a hospital group in the UK.", a: "work", hint: "çalışmak" },
    { s: "That is ___ the problem we solve.", a: "exactly", hint: "tam olarak" }
  ],
  order: [
    { a: "Can I give you my card?" },
    { a: "Let's talk more after the next session." }
  ],
  translate: [
    { tr: "Tanıştığımıza memnun oldum.", en: "Nice to meet you.", keys: ["nice", "meet"] },
    { tr: "Ne tür bir cihaz?", en: "What kind of device?", keys: ["what kind", "device"] }
  ],
  roleplay: {
    persona: "Conference attendee", personaTr: "Konferans katılımcısı",
    scene: "Kahve kuyruğunda yanındaki kişi seninle konuşmaya başlıyor.",
    turns: [
      { ai: "Hi there! I'm Emma, from a clinic chain in Ireland. And you?", aiTr: "Merhaba! Ben Emma, İrlanda'da bir klinik zincirindenim. Ya siz?", hint: "Nice to meet you, Emma. I'm ... I'm the founder of a medical device startup from Turkey.", keys: ["nice to meet", "founder", "startup", "Turkey"] },
      { ai: "What kind of device do you make?", aiTr: "Ne tür bir cihaz yapıyorsunuz?", hint: "We make an audiometer that tests hearing without an expert. It is like a self-service hearing test.", keys: ["audiometer", "hearing", "expert", "self-service"] },
      { ai: "Interesting! We have very long waiting lists.", aiTr: "İlginç! Çok uzun bekleme listelerimiz var.", hint: "That is exactly the problem we solve. Can I give you my card?", keys: ["exactly", "problem", "card", "solve"] }
    ]
  }
},
{
  id: "co-02", topic: "comms", level: "B1", minutes: 12,
  title: "Writing a Professional Follow-up Email",
  titleTr: "Profesyonel Bir Takip E-postası Yazmak",
  intro: "Toplantıdan sonra kısa, net ve nazik bir e-posta yapısı.",
  text: [
    { en: "Subject: Great to meet you at MedTech Europe", tr: "Konu: MedTech Europe'ta tanıştığımıza çok sevindim" },
    { en: "Dear Sarah,", tr: "Sevgili Sarah," },
    { en: "It was great to meet you at the conference yesterday.", tr: "Dün konferansta sizinle tanışmak harikaydı." },
    { en: "Thank you for your time and for the interesting conversation about waiting lists.", tr: "Zamanınız ve bekleme listeleri hakkındaki ilginç sohbet için teşekkür ederim." },
    { en: "As promised, I am attaching a short presentation about our autonomous audiometer.", tr: "Söz verdiğim gibi, otonom odyometremiz hakkında kısa bir sunum ekliyorum." },
    { en: "I would be happy to arrange a short online demo for your team.", tr: "Ekibiniz için kısa bir çevrimiçi demo ayarlamaktan mutluluk duyarım." },
    { en: "Would next Tuesday or Wednesday afternoon work for you?", tr: "Gelecek salı veya çarşamba öğleden sonra size uyar mı?" },
    { en: "Please let me know if you have any questions.", tr: "Herhangi bir sorunuz olursa lütfen bana bildirin." },
    { en: "I look forward to hearing from you.", tr: "Sizden haber almayı dört gözle bekliyorum." },
    { en: "Best regards, Ali", tr: "Saygılarımla, Ali" }
  ],
  vocab: [
    { en: "subject", tr: "konu (e-posta)", ex: "Subject: Great to meet you." },
    { en: "It was great to meet you.", tr: "Sizinle tanışmak harikaydı.", ex: "It was great to meet you yesterday." },
    { en: "as promised", tr: "söz verdiğim gibi", ex: "As promised, I am attaching the file." },
    { en: "attach", tr: "eklemek (dosya)", ex: "I am attaching a presentation." },
    { en: "I would be happy to", tr: "...maktan mutluluk duyarım", ex: "I would be happy to arrange a demo." },
    { en: "arrange", tr: "ayarlamak, düzenlemek", ex: "Let's arrange a meeting." },
    { en: "Would ... work for you?", tr: "... size uyar mı?", ex: "Would Tuesday work for you?" },
    { en: "Please let me know", tr: "Lütfen bana bildirin", ex: "Please let me know if you have questions." },
    { en: "I look forward to hearing from you.", tr: "Sizden haber almayı dört gözle bekliyorum.", ex: "I look forward to hearing from you soon." },
    { en: "Best regards", tr: "Saygılarımla", ex: "Best regards, Ali" }
  ],
  questions: [
    { q: "Why is Ali writing?", options: ["To complain", "To follow up after the conference", "To ask for money"], a: 1 },
    { q: "What is he attaching?", options: ["A contract", "A short presentation", "A photo"], a: 1 },
    { q: "What does he offer?", options: ["An online demo", "A free device", "A dinner"], a: 0 },
    { q: "What days does he suggest?", options: ["Monday or Friday", "Tuesday or Wednesday", "Saturday"], a: 1 }
  ],
  gaps: [
    { s: "As ___, I am attaching a short presentation.", a: "promised", hint: "söz verdiğim gibi" },
    { s: "I would be happy to ___ a short online demo.", a: "arrange", hint: "ayarlamak" },
    { s: "I look forward to ___ from you.", a: "hearing", hint: "haber almak" }
  ],
  order: [
    { a: "It was great to meet you at the conference." },
    { a: "Would next Tuesday work for you?" }
  ],
  translate: [
    { tr: "Zamanınız için teşekkür ederim.", en: "Thank you for your time.", keys: ["thank", "time"] },
    { tr: "Herhangi bir sorunuz olursa lütfen bana bildirin.", en: "Please let me know if you have any questions.", keys: ["let me know", "questions"] }
  ],
  roleplay: {
    persona: "Sarah (by email)", personaTr: "Sarah (e-posta ile)",
    scene: "Sarah e-postana cevap veriyor. Sen de kısa cevaplar yazıyorsun.",
    turns: [
      { ai: "Hi Ali, thanks for your email and the presentation. A demo sounds good. When are you free?", aiTr: "Merhaba Ali, e-postanız ve sunum için teşekkürler. Demo iyi fikir. Ne zaman müsaitsiniz?", hint: "Thank you, Sarah. Would next Tuesday or Wednesday afternoon work for you?", keys: ["would", "work for you", "Tuesday", "afternoon"] },
      { ai: "Wednesday at 2 pm works. Who should join from our side?", aiTr: "Çarşamba 14:00 uygun. Bizim taraftan kim katılmalı?", hint: "Great. I would suggest your clinic manager and an audiologist. I will send a calendar invitation.", keys: ["suggest", "send", "invitation", "great"] },
      { ai: "Perfect, see you then.", aiTr: "Mükemmel, görüşmek üzere.", hint: "Perfect. Please let me know if you have any questions before the demo. Best regards, ...", keys: ["let me know", "questions", "best regards", "look forward"] }
    ]
  }
},
{
  id: "co-03", topic: "comms", level: "B1", minutes: 12,
  title: "Disagreeing Politely in a Meeting",
  titleTr: "Toplantıda Nazikçe Karşı Çıkmak",
  intro: "Farklı düşündüğünü kavga etmeden, net ve saygılı söylemek.",
  text: [
    { who: "Partner", en: "I think we should lower the price to 2,000 euros to sell faster.", tr: "Bence daha hızlı satmak için fiyatı 2.000 euroya düşürmeliyiz." },
    { who: "Me", en: "I see your point, but I'm not sure that is the best way.", tr: "Ne demek istediğinizi anlıyorum ama bunun en iyi yol olduğundan emin değilim." },
    { who: "Me", en: "If we lower the price, our margin becomes very small.", tr: "Fiyatı düşürürsek marjımız çok küçülür." },
    { who: "Partner", en: "But customers say the device is expensive.", tr: "Ama müşteriler cihazın pahalı olduğunu söylüyor." },
    { who: "Me", en: "That's true. However, I think the real problem is not the price. It is that they don't understand the value.", tr: "Bu doğru. Ancak bence asıl sorun fiyat değil. Değeri anlamamaları." },
    { who: "Me", en: "In my opinion, we should show them how much money they save every month.", tr: "Bence onlara her ay ne kadar para tasarruf ettiklerini göstermeliyiz." },
    { who: "Partner", en: "Hmm, that is a fair point. How would we do that?", tr: "Hmm, haklı bir nokta. Bunu nasıl yapardık?" },
    { who: "Me", en: "We can prepare a simple calculator: 'You do 100 tests a month, you save 1,500 euros.'", tr: "Basit bir hesaplayıcı hazırlayabiliriz: 'Ayda 100 test yapıyorsunuz, 1.500 euro tasarruf ediyorsunuz.'" },
    { who: "Partner", en: "OK, let's try that for two months before we change the price.", tr: "Tamam, fiyatı değiştirmeden önce bunu iki ay deneyelim." },
    { who: "Me", en: "Agreed. Thanks for listening.", tr: "Anlaştık. Dinlediğin için teşekkürler." }
  ],
  vocab: [
    { en: "lower the price", tr: "fiyatı düşürmek", ex: "We should lower the price." },
    { en: "I see your point, but...", tr: "Ne demek istediğini anlıyorum ama...", ex: "I see your point, but I'm not sure." },
    { en: "I'm not sure that...", tr: "...olduğundan emin değilim", ex: "I'm not sure that is the best way." },
    { en: "That's true. However, ...", tr: "Bu doğru. Ancak...", ex: "That's true. However, the real problem is value." },
    { en: "value", tr: "değer", ex: "They don't understand the value." },
    { en: "in my opinion", tr: "bence, bana göre", ex: "In my opinion, we should show the savings." },
    { en: "That is a fair point.", tr: "Haklı bir nokta.", ex: "Hmm, that is a fair point." },
    { en: "prepare", tr: "hazırlamak", ex: "We can prepare a simple calculator." },
    { en: "Agreed.", tr: "Anlaştık.", ex: "Agreed. Let's do it." }
  ],
  questions: [
    { q: "What does the partner want to do?", options: ["Lower the price", "Raise the price", "Stop selling"], a: 0 },
    { q: "Why does the speaker disagree?", options: ["The margin becomes very small", "The device is ugly", "Customers are rich"], a: 0 },
    { q: "What is the real problem, according to the speaker?", options: ["The price", "Customers don't understand the value", "The team"], a: 1 },
    { q: "What do they decide?", options: ["Lower the price now", "Try the calculator for two months", "Close the company"], a: 1 }
  ],
  gaps: [
    { s: "I see your ___, but I'm not sure.", a: "point", hint: "nokta, görüş" },
    { s: "In my ___, we should show them the savings.", a: "opinion", hint: "görüş" },
    { s: "That is a ___ point.", a: "fair", hint: "haklı, adil" }
  ],
  order: [
    { a: "I'm not sure that is the best way." },
    { a: "They don't understand the value." }
  ],
  translate: [
    { tr: "Bence asıl sorun fiyat değil.", en: "I think the real problem is not the price.", keys: ["real problem", "price"] },
    { tr: "Dinlediğin için teşekkürler.", en: "Thanks for listening.", keys: ["thanks", "listening"] }
  ],
  roleplay: {
    persona: "Business partner", personaTr: "İş ortağı",
    scene: "Ortağın ürünü ücretsiz vermeyi öneriyor; sen nazikçe karşı çıkıyorsun.",
    turns: [
      { ai: "I think we should give the device for free and only charge for the software.", aiTr: "Bence cihazı ücretsiz verip sadece yazılım için ücret almalıyız.", hint: "I see your point, but I'm not sure that is the best way. The device costs us 1,500 euros...", keys: ["see your point", "not sure", "costs"] },
      { ai: "But customers would love a free device!", aiTr: "Ama müşteriler ücretsiz cihaza bayılır!", hint: "That's true. However, in my opinion we need a bigger software fee then. Let's calculate...", keys: ["true", "however", "in my opinion", "calculate"] },
      { ai: "OK, that is a fair point. What do you suggest?", aiTr: "Tamam, haklı bir nokta. Ne öneriyorsun?", hint: "I suggest we test both models with five clinics for two months. Agreed?", keys: ["suggest", "test", "months", "agreed"] }
    ]
  }
}
);
