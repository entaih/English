// Konu 2: AIHEAR ve medikal teknoloji
window.LESSONS = window.LESSONS || [];
window.LESSONS.push(
{
  id: "ai-01", topic: "aihear", level: "A2", minutes: 10,
  title: "How Our Autonomous Audiometer Works",
  titleTr: "Otonom Odyometremiz Nasıl Çalışır",
  intro: "Cihazını basit cümlelerle, adım adım anlatmak.",
  text: [
    { en: "An audiometer is a device that measures how well a person can hear.", tr: "Odyometre, bir kişinin ne kadar iyi duyabildiğini ölçen bir cihazdır." },
    { en: "A normal hearing test needs an expert, a quiet room and about thirty minutes.", tr: "Normal bir işitme testi için bir uzman, sessiz bir oda ve yaklaşık otuz dakika gerekir." },
    { en: "Our audiometer is autonomous. This means it works by itself.", tr: "Bizim odyometremiz otonom. Bu, kendi kendine çalıştığı anlamına gelir." },
    { en: "The patient puts on the headphones and follows the instructions on the screen.", tr: "Hasta kulaklıkları takar ve ekrandaki talimatları takip eder." },
    { en: "The device plays sounds at different levels and frequencies.", tr: "Cihaz farklı seviyelerde ve frekanslarda sesler çalar." },
    { en: "When the patient hears a sound, he or she presses a button.", tr: "Hasta bir ses duyduğunda bir düğmeye basar." },
    { en: "Our artificial intelligence checks the answers and adjusts the test in real time.", tr: "Yapay zekamız cevapları kontrol eder ve testi gerçek zamanlı olarak ayarlar." },
    { en: "At the end, the device creates a report called an audiogram.", tr: "Sonunda cihaz, odyogram adı verilen bir rapor oluşturur." },
    { en: "The whole test takes less than ten minutes, and no expert is needed in the room.", tr: "Tüm test on dakikadan az sürer ve odada uzman gerekmez." }
  ],
  vocab: [
    { en: "measure", tr: "ölçmek", ex: "The device measures hearing." },
    { en: "autonomous", tr: "otonom, kendi kendine çalışan", ex: "Our audiometer is autonomous." },
    { en: "put on the headphones", tr: "kulaklıkları takmak", ex: "The patient puts on the headphones." },
    { en: "follow the instructions", tr: "talimatları takip etmek", ex: "Follow the instructions on the screen." },
    { en: "frequency", tr: "frekans", ex: "It plays sounds at different frequencies." },
    { en: "press a button", tr: "düğmeye basmak", ex: "When you hear a sound, press the button." },
    { en: "in real time", tr: "gerçek zamanlı olarak", ex: "The AI adjusts the test in real time." },
    { en: "audiogram", tr: "odyogram (işitme grafiği)", ex: "The device creates an audiogram." },
    { en: "less than", tr: "...den az", ex: "The test takes less than ten minutes." }
  ],
  questions: [
    { q: "What does an audiometer measure?", options: ["Blood pressure", "How well a person can hear", "Eye health"], a: 1 },
    { q: "What does 'autonomous' mean here?", options: ["Very expensive", "It works by itself", "It is very small"], a: 1 },
    { q: "What does the patient do when they hear a sound?", options: ["Press a button", "Say 'yes'", "Raise a hand"], a: 0 },
    { q: "How long does the test take?", options: ["Thirty minutes", "Less than ten minutes", "One hour"], a: 1 }
  ],
  gaps: [
    { s: "An audiometer ___ how well a person can hear.", a: "measures", hint: "ölçer" },
    { s: "The patient puts on the ___ and follows the instructions.", a: "headphones", hint: "kulaklık" },
    { s: "The AI adjusts the test in real ___.", a: "time", hint: "gerçek zamanlı" }
  ],
  order: [
    { a: "Our audiometer works by itself." },
    { a: "The test takes less than ten minutes." }
  ],
  translate: [
    { tr: "Odada uzman gerekmez.", en: "No expert is needed in the room.", keys: ["expert", "room"] },
    { tr: "Cihaz bir rapor oluşturur.", en: "The device creates a report.", keys: ["device", "report"] }
  ],
  roleplay: {
    persona: "Curious doctor", personaTr: "Meraklı doktor",
    scene: "Bir fuarda, standına gelen İngiliz bir kulak burun boğaz doktoru cihazı soruyor.",
    turns: [
      { ai: "What is this device? What does it do?", aiTr: "Bu cihaz ne? Ne yapıyor?", hint: "It is an autonomous audiometer. It measures how well a person can hear.", keys: ["audiometer", "measure", "hear", "autonomous"] },
      { ai: "How does the patient use it?", aiTr: "Hasta nasıl kullanıyor?", hint: "The patient puts on the headphones and follows the instructions. When they hear a sound, they press...", keys: ["headphones", "instructions", "press", "button"] },
      { ai: "And how long does it take?", aiTr: "Peki ne kadar sürüyor?", hint: "Less than ten minutes, and no expert is needed in the room.", keys: ["minutes", "less than", "expert"] }
    ]
  }
},
{
  id: "ai-02", topic: "aihear", level: "A2", minutes: 10,
  title: "Why We Started AIHEAR",
  titleTr: "AIHEAR'ı Neden Kurduk",
  intro: "Kuruluş hikayeni anlatmak: sorun, fikir ve misyon.",
  text: [
    { en: "Around the world, more than one billion people have some hearing loss.", tr: "Dünya genelinde bir milyardan fazla insanın bir miktar işitme kaybı var." },
    { en: "Many of them never get a hearing test, because there are not enough experts.", tr: "Birçoğu hiç işitme testi yaptırmaz, çünkü yeterli uzman yok." },
    { en: "In small towns, people sometimes wait months for an appointment.", tr: "Küçük kasabalarda insanlar bazen randevu için aylarca bekler." },
    { en: "We saw this problem and asked a simple question:", tr: "Bu sorunu gördük ve basit bir soru sorduk:" },
    { en: "'What if a machine could do the test without an expert?'", tr: "'Ya bir makine testi uzman olmadan yapabilseydi?'" },
    { en: "That question became AIHEAR.", tr: "O soru AIHEAR'a dönüştü." },
    { en: "Our mission is to make hearing tests accessible to everyone, everywhere.", tr: "Misyonumuz işitme testlerini herkes için her yerde erişilebilir kılmak." },
    { en: "We started in Turkey, but the problem is global, so our market is global too.", tr: "Türkiye'de başladık ama sorun küresel, bu yüzden pazarımız da küresel." }
  ],
  vocab: [
    { en: "hearing loss", tr: "işitme kaybı", ex: "Many people have hearing loss." },
    { en: "appointment", tr: "randevu", ex: "People wait months for an appointment." },
    { en: "What if...?", tr: "Ya ... olsaydı?", ex: "What if a machine could do the test?" },
    { en: "mission", tr: "misyon, amaç", ex: "Our mission is to help people hear." },
    { en: "accessible", tr: "erişilebilir", ex: "We make hearing tests accessible." },
    { en: "everyone, everywhere", tr: "herkes, her yerde", ex: "Accessible to everyone, everywhere." },
    { en: "global", tr: "küresel", ex: "The problem is global." },
    { en: "market", tr: "pazar", ex: "Our market is global." }
  ],
  questions: [
    { q: "How many people have hearing loss?", options: ["One million", "More than one billion", "Ten thousand"], a: 1 },
    { q: "Why do many people never get a test?", options: ["Tests are too easy", "There are not enough experts", "They do not want one"], a: 1 },
    { q: "What is AIHEAR's mission?", options: ["To sell headphones", "To make hearing tests accessible to everyone", "To open hospitals"], a: 1 },
    { q: "Where did the company start?", options: ["Germany", "Turkey", "USA"], a: 1 }
  ],
  gaps: [
    { s: "People sometimes wait months for an ___.", a: "appointment", hint: "randevu" },
    { s: "Our ___ is to make hearing tests accessible.", a: "mission", hint: "misyon" },
    { s: "The problem is ___, so our market is global too.", a: "global", hint: "küresel" }
  ],
  order: [
    { a: "That question became AIHEAR." },
    { a: "There are not enough experts." }
  ],
  translate: [
    { tr: "Sorun küresel.", en: "The problem is global.", keys: ["problem", "global"] },
    { tr: "Biz Türkiye'de başladık.", en: "We started in Turkey.", keys: ["started", "Turkey"] }
  ],
  roleplay: {
    persona: "Journalist", personaTr: "Gazeteci",
    scene: "Bir teknoloji gazetecisi kısa bir röportaj için şirketin hikayesini soruyor.",
    turns: [
      { ai: "Why did you start AIHEAR? What was the problem?", aiTr: "AIHEAR'ı neden kurdunuz? Sorun neydi?", hint: "More than one billion people have hearing loss, but there are not enough experts...", keys: ["hearing loss", "experts", "billion", "not enough"] },
      { ai: "So what was your idea?", aiTr: "Peki fikriniz neydi?", hint: "We asked: what if a machine could do the test without an expert?", keys: ["what if", "machine", "without"] },
      { ai: "What is your mission today?", aiTr: "Bugünkü misyonunuz ne?", hint: "Our mission is to make hearing tests accessible to everyone, everywhere.", keys: ["mission", "accessible", "everyone"] }
    ]
  }
},
{
  id: "ai-03", topic: "aihear", level: "B1", minutes: 12,
  title: "Presenting a Prototype to an Investor",
  titleTr: "Bir Yatırımcıya Prototip Sunmak",
  intro: "Prototip, geliştirme aşamaları ve sonraki adımlar için sunum dili.",
  text: [
    { en: "Thank you for your time. Let me show you our prototype.", tr: "Zamanınız için teşekkürler. Size prototipimizi göstereyim." },
    { en: "We are developing an AI-assisted audiometer that aims to make hearing tests more accessible and efficient.", tr: "İşitme testlerini daha erişilebilir ve verimli hâle getirmeyi amaçlayan yapay zekâ destekli bir odyometre geliştiriyoruz." },
    { en: "Our goal is to simplify the testing process while maintaining reliable results.", tr: "Amacımız, güvenilir sonuçları korurken test sürecini basitleştirmek." },
    { en: "This is the third version of the prototype. The first one was just a laptop and headphones.", tr: "Bu prototipin üçüncü versiyonu. İlki sadece bir dizüstü bilgisayar ve kulaklıktı." },
    { en: "We have completed the main development phase.", tr: "Ana geliştirme aşamasını tamamladık." },
    { en: "Now we are focusing on validation, regulatory requirements and product design.", tr: "Şimdi doğrulama, mevzuat gereklilikleri ve ürün tasarımına odaklanıyoruz." },
    { en: "We have tested the device with 200 patients, and the results match the standard test in 94 percent of cases.", tr: "Cihazı 200 hastayla test ettik ve sonuçlar vakaların yüzde 94'ünde standart testle eşleşiyor." },
    { en: "With your investment, we can finish certification and start selling in twelve months.", tr: "Yatırımınızla sertifikasyonu bitirip on iki ay içinde satışa başlayabiliriz." }
  ],
  vocab: [
    { en: "prototype", tr: "prototip", ex: "Let me show you our prototype." },
    { en: "aim to", tr: "amaçlamak", ex: "We aim to make tests accessible." },
    { en: "efficient", tr: "verimli", ex: "The test is fast and efficient." },
    { en: "simplify", tr: "basitleştirmek", ex: "We want to simplify the process." },
    { en: "maintain reliable results", tr: "güvenilir sonuçları korumak", ex: "We simplify the test while maintaining reliable results." },
    { en: "development phase", tr: "geliştirme aşaması", ex: "We completed the main development phase." },
    { en: "focus on", tr: "odaklanmak", ex: "Now we focus on validation." },
    { en: "regulatory requirements", tr: "mevzuat gereklilikleri", ex: "We must meet regulatory requirements." },
    { en: "match", tr: "eşleşmek, uyuşmak", ex: "Our results match the standard test." }
  ],
  questions: [
    { q: "What is the goal of the product?", options: ["To replace doctors completely", "To simplify the test while keeping reliable results", "To make headphones"], a: 1 },
    { q: "What was the first prototype?", options: ["A laptop and headphones", "A phone app", "A big machine"], a: 0 },
    { q: "How many patients were tested?", options: ["20", "200", "2000"], a: 1 },
    { q: "What can they do with the investment?", options: ["Buy a building", "Finish certification and start selling", "Hire a lawyer"], a: 1 }
  ],
  gaps: [
    { s: "Let me show you our ___.", a: "prototype", hint: "prototip" },
    { s: "We have completed the main development ___.", a: "phase", hint: "aşama" },
    { s: "Now we are focusing ___ validation.", a: "on", hint: "focus ___" }
  ],
  order: [
    { a: "Our goal is to simplify the testing process." },
    { a: "We have tested the device with 200 patients." }
  ],
  translate: [
    { tr: "Amacımız işitme testlerini daha erişilebilir hâle getirmek.", en: "Our goal is to make hearing tests more accessible.", keys: ["goal", "accessible"] },
    { tr: "Şimdi doğrulamaya odaklanıyoruz.", en: "Now we are focusing on validation.", keys: ["focus", "validation"] }
  ],
  roleplay: {
    persona: "Investor", personaTr: "Yatırımcı",
    scene: "Londra'da bir sağlık teknolojisi yatırımcısı prototipini görmek istiyor.",
    turns: [
      { ai: "Thanks for coming. What exactly are you developing?", aiTr: "Geldiğiniz için teşekkürler. Tam olarak ne geliştiriyorsunuz?", hint: "We are developing an AI-assisted audiometer that aims to make hearing tests more accessible...", keys: ["developing", "aim", "accessible", "audiometer"] },
      { ai: "What stage are you at right now?", aiTr: "Şu anda hangi aşamadasınız?", hint: "We have completed the main development phase. Now we are focusing on validation and regulatory requirements.", keys: ["completed", "phase", "focus", "regulatory", "validation"] },
      { ai: "Do you have any data from real patients?", aiTr: "Gerçek hastalardan veriniz var mı?", hint: "Yes, we tested the device with 200 patients and the results match the standard test in 94 percent of cases.", keys: ["patients", "tested", "match", "percent"] },
      { ai: "And what will you do with my money?", aiTr: "Peki paramla ne yapacaksınız?", hint: "With your investment, we can finish certification and start selling in twelve months.", keys: ["investment", "certification", "selling", "months"] }
    ]
  }
},
{
  id: "ai-04", topic: "aihear", level: "B1", minutes: 12,
  title: "Medical Device Certification",
  titleTr: "Tıbbi Cihaz Sertifikasyonu",
  intro: "CE işareti, FDA, klinik doğrulama ve risk sınıfı gibi kavramlar.",
  text: [
    { en: "A medical device cannot be sold without certification.", tr: "Tıbbi bir cihaz sertifikasyon olmadan satılamaz." },
    { en: "In Europe, we need the CE mark. In the United States, we need FDA approval.", tr: "Avrupa'da CE işaretine ihtiyacımız var. Amerika Birleşik Devletleri'nde FDA onayına ihtiyacımız var." },
    { en: "Our audiometer is a Class IIa device. This means it has a medium level of risk.", tr: "Odyometremiz Sınıf IIa bir cihaz. Bu, orta düzeyde riske sahip olduğu anlamına gelir." },
    { en: "To get the CE mark, we must prove that the device is safe and that it works as we say.", tr: "CE işaretini almak için cihazın güvenli olduğunu ve söylediğimiz gibi çalıştığını kanıtlamalıyız." },
    { en: "This is called clinical validation.", tr: "Buna klinik doğrulama denir." },
    { en: "We compare our results with the results of a trained audiologist.", tr: "Sonuçlarımızı eğitimli bir odyoloğun sonuçlarıyla karşılaştırırız." },
    { en: "We also need a quality management system and a lot of documentation.", tr: "Ayrıca bir kalite yönetim sistemine ve çok fazla dokümantasyona ihtiyacımız var." },
    { en: "The process is slow and expensive, but it protects patients. And it protects us too.", tr: "Süreç yavaş ve pahalı ama hastaları koruyor. Ve bizi de koruyor." },
    { en: "We expect to complete certification by the end of next year.", tr: "Sertifikasyonu gelecek yılın sonuna kadar tamamlamayı bekliyoruz." }
  ],
  vocab: [
    { en: "certification", tr: "sertifikasyon, belgelendirme", ex: "We need certification to sell the device." },
    { en: "approval", tr: "onay", ex: "We need FDA approval in the US." },
    { en: "risk", tr: "risk", ex: "It has a medium level of risk." },
    { en: "prove", tr: "kanıtlamak", ex: "We must prove the device is safe." },
    { en: "safe", tr: "güvenli", ex: "The device is safe for patients." },
    { en: "clinical validation", tr: "klinik doğrulama", ex: "Clinical validation takes time." },
    { en: "compare with", tr: "...ile karşılaştırmak", ex: "We compare our results with an audiologist's results." },
    { en: "documentation", tr: "dokümantasyon, belgeler", ex: "Certification needs a lot of documentation." },
    { en: "expect to", tr: "beklemek, ummak", ex: "We expect to finish next year." }
  ],
  questions: [
    { q: "What do you need to sell a medical device in Europe?", options: ["FDA approval", "The CE mark", "A patent"], a: 1 },
    { q: "What risk class is the audiometer?", options: ["Class I", "Class IIa", "Class III"], a: 1 },
    { q: "What is clinical validation?", options: ["Proving the device is safe and works", "Selling to clinics", "Training doctors"], a: 0 },
    { q: "When do they expect to finish?", options: ["Next month", "By the end of next year", "In five years"], a: 1 }
  ],
  gaps: [
    { s: "We must ___ that the device is safe.", a: "prove", hint: "kanıtlamak" },
    { s: "In the US, we need FDA ___.", a: "approval", hint: "onay" },
    { s: "We ___ our results with an audiologist's results.", a: "compare", hint: "karşılaştırmak" }
  ],
  order: [
    { a: "A medical device cannot be sold without certification." },
    { a: "The process is slow and expensive." }
  ],
  translate: [
    { tr: "Cihaz hastalar için güvenli.", en: "The device is safe for patients.", keys: ["device", "safe", "patients"] },
    { tr: "Çok fazla dokümantasyona ihtiyacımız var.", en: "We need a lot of documentation.", keys: ["need", "documentation"] }
  ],
  roleplay: {
    persona: "Investor", personaTr: "Yatırımcı (mevzuat soruları)",
    scene: "Yatırımcı sertifikasyon riskini ve zaman planını soruyor.",
    turns: [
      { ai: "Can you sell the device today?", aiTr: "Cihazı bugün satabilir misiniz?", hint: "Not yet. A medical device cannot be sold without certification. We need the CE mark.", keys: ["certification", "CE", "cannot", "not yet"] },
      { ai: "What do you need to do to get the CE mark?", aiTr: "CE işaretini almak için ne yapmanız gerekiyor?", hint: "We must prove the device is safe and works. This is called clinical validation. We compare our results with...", keys: ["prove", "safe", "validation", "compare"] },
      { ai: "When will you finish?", aiTr: "Ne zaman bitireceksiniz?", hint: "We expect to complete certification by the end of next year.", keys: ["expect", "complete", "next year", "end of"] }
    ]
  }
},
{
  id: "ai-05", topic: "aihear", level: "B1", minutes: 12,
  title: "Talking to a Hospital Buyer",
  titleTr: "Bir Hastane Satın Alma Yöneticisiyle Konuşmak",
  intro: "Fiyat, kurulum, eğitim ve servis gibi satış sorularına cevap vermek.",
  text: [
    { who: "Buyer", en: "We are interested in your audiometer. How much does it cost?", tr: "Odyometrenizle ilgileniyoruz. Fiyatı ne kadar?" },
    { who: "Me", en: "The device costs 4,000 euros, and there is a small monthly fee for the software.", tr: "Cihaz 4.000 euro ve yazılım için küçük bir aylık ücret var." },
    { who: "Buyer", en: "That is more than a classic audiometer.", tr: "Bu klasik bir odyometreden daha fazla." },
    { who: "Me", en: "Yes, but you do not need an expert for every test. You save time and money every day.", tr: "Evet ama her test için bir uzmana ihtiyacınız yok. Her gün zaman ve para tasarrufu yaparsınız." },
    { who: "Buyer", en: "How long does installation take?", tr: "Kurulum ne kadar sürer?" },
    { who: "Me", en: "About one hour. We also train your staff on the same day.", tr: "Yaklaşık bir saat. Ayrıca aynı gün personelinizi eğitiriz." },
    { who: "Buyer", en: "What happens if the device breaks?", tr: "Cihaz bozulursa ne olur?" },
    { who: "Me", en: "We offer a two-year warranty and remote support. Most problems can be fixed with a software update.", tr: "İki yıl garanti ve uzaktan destek sunuyoruz. Çoğu sorun bir yazılım güncellemesiyle çözülebilir." },
    { who: "Buyer", en: "Can we try it before we buy?", tr: "Satın almadan önce deneyebilir miyiz?" },
    { who: "Me", en: "Of course. We can set up a free trial for one month.", tr: "Tabii ki. Bir aylık ücretsiz deneme kurabiliriz." }
  ],
  vocab: [
    { en: "be interested in", tr: "...ile ilgilenmek", ex: "We are interested in your product." },
    { en: "How much does it cost?", tr: "Fiyatı ne kadar?", ex: "How much does the device cost?" },
    { en: "monthly fee", tr: "aylık ücret", ex: "There is a small monthly fee." },
    { en: "save time and money", tr: "zaman ve para tasarrufu yapmak", ex: "You save time and money every day." },
    { en: "installation", tr: "kurulum", ex: "Installation takes one hour." },
    { en: "train the staff", tr: "personeli eğitmek", ex: "We train your staff on the same day." },
    { en: "warranty", tr: "garanti", ex: "We offer a two-year warranty." },
    { en: "remote support", tr: "uzaktan destek", ex: "We offer remote support." },
    { en: "free trial", tr: "ücretsiz deneme", ex: "We can set up a free trial." }
  ],
  questions: [
    { q: "How much does the device cost?", options: ["400 euros", "4,000 euros", "40,000 euros"], a: 1 },
    { q: "Why is the price OK according to the seller?", options: ["It is beautiful", "You save time and money because you do not need an expert", "It is the cheapest"], a: 1 },
    { q: "How long is the warranty?", options: ["One year", "Two years", "Five years"], a: 1 },
    { q: "What does the seller offer at the end?", options: ["A discount", "A free trial for one month", "A free device"], a: 1 }
  ],
  gaps: [
    { s: "How much does it ___?", a: "cost", hint: "fiyat" },
    { s: "We offer a two-year ___.", a: "warranty", hint: "garanti" },
    { s: "We can set up a free ___ for one month.", a: "trial", hint: "deneme" }
  ],
  order: [
    { a: "You save time and money every day." },
    { a: "We also train your staff on the same day." }
  ],
  translate: [
    { tr: "Kurulum yaklaşık bir saat sürer.", en: "Installation takes about one hour.", keys: ["installation", "hour"] },
    { tr: "Tabii ki, deneyebilirsiniz.", en: "Of course, you can try it.", keys: ["of course", "try"] }
  ],
  roleplay: {
    persona: "Hospital buyer", personaTr: "Hastane satın alma yöneticisi",
    scene: "İspanya'da bir özel hastanenin satın alma yöneticisiyle görüşüyorsun.",
    turns: [
      { ai: "We like your product. How much does it cost?", aiTr: "Ürününüzü beğendik. Fiyatı ne kadar?", hint: "The device costs ... euros, and there is a small monthly fee for the software.", keys: ["cost", "euros", "monthly fee", "software"] },
      { ai: "Hmm, that is expensive. Why should we pay more?", aiTr: "Hmm, bu pahalı. Neden daha fazla ödeyelim?", hint: "Because you do not need an expert for every test. You save time and money every day.", keys: ["expert", "save", "time", "money"] },
      { ai: "What if it breaks?", aiTr: "Ya bozulursa?", hint: "We offer a two-year warranty and remote support.", keys: ["warranty", "support", "update"] },
      { ai: "Can we test it first?", aiTr: "Önce test edebilir miyiz?", hint: "Of course. We can set up a free trial for one month.", keys: ["free trial", "of course", "month"] }
    ]
  }
}
);
