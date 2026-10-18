// Konu 3: Yapay zekâ, yazılım ve teknoloji
window.LESSONS = window.LESSONS || [];
window.LESSONS.push(
{
  id: "te-01", topic: "tech", level: "A2", minutes: 10,
  title: "How AI Can Improve Healthcare",
  titleTr: "Yapay Zekâ Sağlık Hizmetlerini Nasıl İyileştirebilir",
  intro: "Yapay zekânın sağlıktaki rolünü basit örneklerle anlatmak.",
  text: [
    { en: "Artificial intelligence, or AI, is changing healthcare.", tr: "Yapay zekâ, yani AI, sağlık hizmetlerini değiştiriyor." },
    { en: "AI can look at thousands of images and find a problem faster than a human.", tr: "Yapay zekâ binlerce görüntüye bakabilir ve bir sorunu insandan daha hızlı bulabilir." },
    { en: "For example, AI can help doctors find cancer in an X-ray.", tr: "Örneğin, yapay zekâ doktorların röntgende kanseri bulmasına yardımcı olabilir." },
    { en: "AI does not get tired. It can work twenty-four hours a day.", tr: "Yapay zekâ yorulmaz. Günde yirmi dört saat çalışabilir." },
    { en: "But AI is not perfect. It can make mistakes, and it needs good data.", tr: "Ama yapay zekâ mükemmel değil. Hata yapabilir ve iyi veriye ihtiyacı var." },
    { en: "That is why a doctor should always check the result.", tr: "Bu yüzden bir doktor her zaman sonucu kontrol etmeli." },
    { en: "In our company, we use AI to make hearing tests faster and more accurate.", tr: "Şirketimizde işitme testlerini daha hızlı ve daha doğru yapmak için yapay zekâ kullanıyoruz." },
    { en: "The AI learns from every test, so the system gets better over time.", tr: "Yapay zekâ her testten öğrenir, böylece sistem zamanla daha iyi hale gelir." }
  ],
  vocab: [
    { en: "artificial intelligence", tr: "yapay zekâ", ex: "Artificial intelligence is changing healthcare." },
    { en: "healthcare", tr: "sağlık hizmetleri", ex: "AI is changing healthcare." },
    { en: "image", tr: "görüntü", ex: "AI can look at thousands of images." },
    { en: "get tired", tr: "yorulmak", ex: "AI does not get tired." },
    { en: "make a mistake", tr: "hata yapmak", ex: "AI can make mistakes." },
    { en: "data", tr: "veri", ex: "AI needs good data." },
    { en: "accurate", tr: "doğru, isabetli", ex: "The test is faster and more accurate." },
    { en: "over time", tr: "zamanla", ex: "The system gets better over time." }
  ],
  questions: [
    { q: "What can AI do with images?", options: ["Delete them", "Find problems faster than a human", "Print them"], a: 1 },
    { q: "Why is AI not perfect?", options: ["It is too slow", "It can make mistakes and needs good data", "It is too expensive"], a: 1 },
    { q: "Who should check the result?", options: ["A doctor", "A patient", "Nobody"], a: 0 },
    { q: "Why does the system get better?", options: ["It learns from every test", "It is new", "It costs more"], a: 0 }
  ],
  gaps: [
    { s: "AI does not get ___.", a: "tired", hint: "yorgun" },
    { s: "AI needs good ___.", a: "data", hint: "veri" },
    { s: "The system gets better over ___.", a: "time", hint: "zamanla" }
  ],
  order: [
    { a: "AI can make mistakes." },
    { a: "A doctor should always check the result." }
  ],
  translate: [
    { tr: "Yapay zekâ sağlık hizmetlerini değiştiriyor.", en: "AI is changing healthcare.", keys: ["AI", "healthcare"] },
    { tr: "Sistem her testten öğrenir.", en: "The system learns from every test.", keys: ["learns", "test"] }
  ],
  roleplay: {
    persona: "Skeptical doctor", personaTr: "Şüpheci doktor",
    scene: "Yaşlı bir doktor yapay zekânın hastanede neden gerekli olduğunu soruyor.",
    turns: [
      { ai: "Why do we need AI in a hospital? We have doctors.", aiTr: "Hastanede neden yapay zekâya ihtiyacımız var? Doktorlarımız var.", hint: "AI can look at thousands of images and find problems faster. It does not get tired.", keys: ["faster", "tired", "images", "thousands"] },
      { ai: "But AI makes mistakes, doesn't it?", aiTr: "Ama yapay zekâ hata yapıyor, değil mi?", hint: "Yes, AI is not perfect. That is why a doctor should always check the result.", keys: ["mistake", "perfect", "check", "doctor"] },
      { ai: "How do you use AI in your device?", aiTr: "Cihazınızda yapay zekâyı nasıl kullanıyorsunuz?", hint: "We use AI to make hearing tests faster and more accurate. It learns from every test.", keys: ["accurate", "faster", "learn", "test"] }
    ]
  }
},
{
  id: "te-02", topic: "tech", level: "B1", minutes: 12,
  title: "Building Software with AI Coding Assistants",
  titleTr: "Yapay Zekâ Kod Asistanlarıyla Yazılım Geliştirmek",
  intro: "Ekibin yapay zekâ araçlarıyla nasıl daha hızlı kod yazdığını anlatmak.",
  text: [
    { en: "Two years ago, our team wrote every line of code by hand.", tr: "İki yıl önce ekibimiz her satır kodu elle yazıyordu." },
    { en: "Today we use AI coding assistants for a big part of our work.", tr: "Bugün işimizin büyük bir kısmı için yapay zekâ kod asistanları kullanıyoruz." },
    { en: "An AI assistant can write code, explain code and find bugs.", tr: "Bir yapay zekâ asistanı kod yazabilir, kodu açıklayabilir ve hataları bulabilir." },
    { en: "We describe what we want in plain English, and the assistant writes a first version.", tr: "Ne istediğimizi sade İngilizceyle anlatırız ve asistan ilk versiyonu yazar." },
    { en: "Then our engineers review the code and test it.", tr: "Sonra mühendislerimiz kodu inceler ve test eder." },
    { en: "This saves a lot of time. A task that took a week now takes a day or two.", tr: "Bu çok zaman kazandırır. Bir hafta süren bir iş şimdi bir ya da iki gün sürüyor." },
    { en: "However, AI can write code that looks correct but has hidden problems.", tr: "Ancak yapay zekâ doğru görünen ama gizli sorunları olan kod yazabilir." },
    { en: "So we never deploy code without a human review and automatic tests.", tr: "Bu yüzden insan incelemesi ve otomatik testler olmadan asla kodu canlıya almayız." },
    { en: "For a small startup, these tools are like having three extra engineers.", tr: "Küçük bir girişim için bu araçlar üç ekstra mühendise sahip olmak gibi." }
  ],
  vocab: [
    { en: "by hand", tr: "elle, manuel olarak", ex: "We wrote every line of code by hand." },
    { en: "coding assistant", tr: "kod asistanı", ex: "We use AI coding assistants." },
    { en: "describe", tr: "tarif etmek, anlatmak", ex: "We describe what we want in plain English." },
    { en: "plain English", tr: "sade İngilizce", ex: "Write it in plain English." },
    { en: "review the code", tr: "kodu incelemek", ex: "Our engineers review the code." },
    { en: "however", tr: "ancak, bununla birlikte", ex: "However, AI can make hidden mistakes." },
    { en: "hidden", tr: "gizli", ex: "The code has hidden problems." },
    { en: "deploy", tr: "canlıya almak, yayınlamak", ex: "We never deploy code without tests." },
    { en: "extra", tr: "ekstra, fazladan", ex: "It is like having three extra engineers." }
  ],
  questions: [
    { q: "How did the team write code two years ago?", options: ["With AI", "By hand", "They did not write code"], a: 1 },
    { q: "What does the assistant do first?", options: ["Tests the product", "Writes a first version of the code", "Sells the product"], a: 1 },
    { q: "What is the danger of AI code?", options: ["It is too slow", "It can look correct but have hidden problems", "It is too expensive"], a: 1 },
    { q: "What do they always do before deploying?", options: ["Human review and automatic tests", "Nothing", "Ask the customer"], a: 0 }
  ],
  gaps: [
    { s: "We describe what we want in ___ English.", a: "plain", hint: "sade" },
    { s: "Our engineers ___ the code and test it.", a: "review", hint: "incelemek" },
    { s: "We never ___ code without tests.", a: "deploy", hint: "canlıya almak" }
  ],
  order: [
    { a: "An AI assistant can write code and find bugs." },
    { a: "This saves a lot of time." }
  ],
  translate: [
    { tr: "Bu çok zaman kazandırır.", en: "This saves a lot of time.", keys: ["saves", "time"] },
    { tr: "Mühendislerimiz kodu inceler.", en: "Our engineers review the code.", keys: ["engineers", "review", "code"] }
  ],
  roleplay: {
    persona: "Tech investor", personaTr: "Teknoloji yatırımcısı",
    scene: "Bir yatırımcı küçük ekibinizin nasıl bu kadar hızlı ürün çıkardığını soruyor.",
    turns: [
      { ai: "Your team is very small. How do you build software so fast?", aiTr: "Ekibiniz çok küçük. Yazılımı nasıl bu kadar hızlı geliştiriyorsunuz?", hint: "We use AI coding assistants. We describe what we want, and the assistant writes a first version.", keys: ["assistant", "describe", "first version", "AI"] },
      { ai: "Is AI code safe? Can you trust it?", aiTr: "Yapay zekâ kodu güvenli mi? Güvenebilir misiniz?", hint: "Not always. AI code can have hidden problems. So our engineers review the code and we run tests.", keys: ["review", "hidden", "tests", "engineers"] },
      { ai: "How much time does it save?", aiTr: "Ne kadar zaman kazandırıyor?", hint: "A lot. A task that took a week now takes a day or two. It is like having three extra engineers.", keys: ["week", "day", "extra", "saves"] }
    ]
  }
},
{
  id: "te-03", topic: "tech", level: "B1", minutes: 12,
  title: "Solving a Difficult Technical Problem",
  titleTr: "Zor Bir Teknik Sorunu Çözmek",
  intro: "Bir hatayı adım adım bulma ve çözme hikayesi.",
  text: [
    { en: "Last week we had a strange problem with our device.", tr: "Geçen hafta cihazımızla ilgili garip bir sorun yaşadık." },
    { en: "In some clinics, the test results were wrong at high frequencies.", tr: "Bazı kliniklerde test sonuçları yüksek frekanslarda yanlıştı." },
    { en: "In other clinics, everything worked perfectly.", tr: "Diğer kliniklerde her şey mükemmel çalışıyordu." },
    { en: "First, we collected data from all the devices.", tr: "Önce tüm cihazlardan veri topladık." },
    { en: "Then we compared the clinics with problems and the clinics without problems.", tr: "Sonra sorunu olan klinikleri ve sorunu olmayan klinikleri karşılaştırdık." },
    { en: "We found that the problem happened only in rooms with old air conditioners.", tr: "Sorunun sadece eski klimaları olan odalarda olduğunu bulduk." },
    { en: "The noise from the air conditioner was too loud at exactly those frequencies.", tr: "Klimanın gürültüsü tam olarak o frekanslarda çok yüksekti." },
    { en: "The solution was simple: we added a noise check before the test starts.", tr: "Çözüm basitti: test başlamadan önce bir gürültü kontrolü ekledik." },
    { en: "If the room is too noisy, the device warns the user.", tr: "Oda çok gürültülüyse cihaz kullanıcıyı uyarır." },
    { en: "The lesson: look at the data before you guess.", tr: "Ders: tahmin etmeden önce veriye bak." }
  ],
  vocab: [
    { en: "strange", tr: "garip, tuhaf", ex: "We had a strange problem." },
    { en: "wrong", tr: "yanlış", ex: "The results were wrong." },
    { en: "collect data", tr: "veri toplamak", ex: "First, we collected data." },
    { en: "find out", tr: "öğrenmek, bulmak", ex: "We found out the cause of the problem." },
    { en: "noise", tr: "gürültü", ex: "The noise was too loud." },
    { en: "solution", tr: "çözüm", ex: "The solution was simple." },
    { en: "warn", tr: "uyarmak", ex: "The device warns the user." },
    { en: "guess", tr: "tahmin etmek", ex: "Look at the data before you guess." }
  ],
  questions: [
    { q: "What was the problem?", options: ["The device was slow", "Results were wrong at high frequencies in some clinics", "The screen was broken"], a: 1 },
    { q: "What did they do first?", options: ["Changed the device", "Collected data from all devices", "Called the customers"], a: 1 },
    { q: "What caused the problem?", options: ["Old air conditioners", "Bad headphones", "A software bug"], a: 0 },
    { q: "What was the solution?", options: ["A new device", "A noise check before the test", "A new office"], a: 1 }
  ],
  gaps: [
    { s: "First, we ___ data from all the devices.", a: "collected", hint: "topladık" },
    { s: "The ___ was simple.", a: "solution", hint: "çözüm" },
    { s: "If the room is too noisy, the device ___ the user.", a: "warns", hint: "uyarır" }
  ],
  order: [
    { a: "Look at the data before you guess." },
    { a: "In other clinics, everything worked perfectly." }
  ],
  translate: [
    { tr: "Çözüm basitti.", en: "The solution was simple.", keys: ["solution", "simple"] },
    { tr: "Önce veri topladık.", en: "First, we collected data.", keys: ["first", "collected", "data"] }
  ],
  roleplay: {
    persona: "Clinic manager", personaTr: "Klinik müdürü",
    scene: "Bir klinik müdürü geçen haftaki sorunun ne olduğunu ve nasıl çözüldüğünü soruyor.",
    turns: [
      { ai: "We heard some clinics had wrong results. What happened?", aiTr: "Bazı kliniklerde yanlış sonuçlar olduğunu duyduk. Ne oldu?", hint: "Yes, in some rooms the results were wrong at high frequencies. We collected data from all devices.", keys: ["wrong", "collected", "data", "frequencies"] },
      { ai: "And what was the cause?", aiTr: "Peki sebebi neydi?", hint: "The noise from old air conditioners was too loud at those frequencies.", keys: ["noise", "air conditioner", "loud"] },
      { ai: "How did you solve it?", aiTr: "Nasıl çözdünüz?", hint: "We added a noise check. If the room is too noisy, the device warns the user.", keys: ["noise check", "warns", "solution", "added"] }
    ]
  }
},
{
  id: "te-04", topic: "tech", level: "B1", minutes: 12,
  title: "Choosing Between Two Engineering Solutions",
  titleTr: "İki Mühendislik Çözümü Arasında Seçim Yapmak",
  intro: "Bulut mu, cihaz üzerinde mi? Teknik bir tartışmayı yönetmek.",
  text: [
    { who: "Engineer", en: "We need to decide where the AI runs: on the device or in the cloud.", tr: "Yapay zekânın nerede çalışacağına karar vermemiz gerekiyor: cihazda mı, bulutta mı." },
    { who: "Me", en: "What are the advantages of the cloud?", tr: "Bulutun avantajları neler?" },
    { who: "Engineer", en: "The cloud is more powerful, and we can update the model easily.", tr: "Bulut daha güçlü ve modeli kolayca güncelleyebiliriz." },
    { who: "Engineer", en: "But it needs an internet connection, and some hospitals do not allow patient data to leave the building.", tr: "Ama internet bağlantısı gerekiyor ve bazı hastaneler hasta verisinin binadan çıkmasına izin vermiyor." },
    { who: "Me", en: "And on the device?", tr: "Peki cihazda?" },
    { who: "Engineer", en: "On the device, the data stays private and the test works offline. But the hardware is more expensive.", tr: "Cihazda veri gizli kalır ve test çevrimdışı çalışır. Ama donanım daha pahalı." },
    { who: "Me", en: "Privacy is very important for our customers. I think we should run the AI on the device.", tr: "Gizlilik müşterilerimiz için çok önemli. Bence yapay zekâyı cihazda çalıştırmalıyız." },
    { who: "Me", en: "We can send updates once a month when the device is connected.", tr: "Cihaz bağlıyken ayda bir güncelleme gönderebiliriz." },
    { who: "Engineer", en: "That makes sense. It is a trade-off, but privacy wins.", tr: "Mantıklı. Bu bir ödünleşim ama gizlilik kazanıyor." }
  ],
  vocab: [
    { en: "run (software)", tr: "çalışmak, çalıştırmak", ex: "The AI runs on the device." },
    { en: "the cloud", tr: "bulut (sunucu)", ex: "The AI can run in the cloud." },
    { en: "advantage", tr: "avantaj", ex: "What are the advantages?" },
    { en: "powerful", tr: "güçlü", ex: "The cloud is more powerful." },
    { en: "internet connection", tr: "internet bağlantısı", ex: "It needs an internet connection." },
    { en: "allow", tr: "izin vermek", ex: "Some hospitals do not allow this." },
    { en: "privacy", tr: "gizlilik", ex: "Privacy is very important." },
    { en: "offline", tr: "çevrimdışı", ex: "The test works offline." },
    { en: "trade-off", tr: "ödünleşim (bir şeyi kazanmak için bir şeyden vazgeçme)", ex: "It is a trade-off, but privacy wins." },
    { en: "That makes sense.", tr: "Mantıklı.", ex: "That makes sense, let's do it." }
  ],
  questions: [
    { q: "What is the advantage of the cloud?", options: ["It is cheaper", "It is more powerful and easy to update", "It is private"], a: 1 },
    { q: "Why do some hospitals not like the cloud?", options: ["It is slow", "Patient data must not leave the building", "It is ugly"], a: 1 },
    { q: "What is the disadvantage of running AI on the device?", options: ["More expensive hardware", "No privacy", "No results"], a: 0 },
    { q: "What do they decide?", options: ["Cloud", "On the device", "Both"], a: 1 }
  ],
  gaps: [
    { s: "The cloud needs an internet ___.", a: "connection", hint: "bağlantı" },
    { s: "___ is very important for our customers.", a: "Privacy", hint: "gizlilik" },
    { s: "It is a ___-off, but privacy wins.", a: "trade", hint: "ödünleşim" }
  ],
  order: [
    { a: "The test works offline." },
    { a: "I think we should run the AI on the device." }
  ],
  translate: [
    { tr: "Avantajları neler?", en: "What are the advantages?", keys: ["advantages"] },
    { tr: "Mantıklı.", en: "That makes sense.", keys: ["makes sense"] }
  ],
  roleplay: {
    persona: "Hospital IT manager", personaTr: "Hastane bilgi işlem müdürü",
    scene: "Bir hastanenin bilgi işlem müdürü hasta verisinin nereye gittiğini soruyor.",
    turns: [
      { ai: "Does your device send patient data to the internet?", aiTr: "Cihazınız hasta verisini internete gönderiyor mu?", hint: "No. The AI runs on the device, so the data stays private. The test works offline.", keys: ["device", "private", "offline", "data"] },
      { ai: "Why did you not use the cloud? It is more powerful.", aiTr: "Neden bulutu kullanmadınız? Daha güçlü.", hint: "True, but privacy is very important for hospitals. It is a trade-off, and privacy wins.", keys: ["privacy", "trade-off", "important", "hospitals"] },
      { ai: "How do you update the software then?", aiTr: "Peki yazılımı nasıl güncelliyorsunuz?", hint: "We send updates once a month when the device is connected.", keys: ["updates", "month", "connected"] }
    ]
  }
}
);
