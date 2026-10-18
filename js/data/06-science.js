// Konu 6: Bilimsel araştırma ve sağlık inovasyonu
window.LESSONS = window.LESSONS || [];
window.LESSONS.push(
{
  id: "sc-01", topic: "science", level: "B1", minutes: 12,
  title: "How We Designed Our Clinical Study",
  titleTr: "Klinik Çalışmamızı Nasıl Tasarladık",
  intro: "Hipotez, yöntem, katılımcılar ve sonuç: bir çalışmayı basitçe anlatmak.",
  text: [
    { en: "To get certification, we needed to prove that our device gives the same results as a trained audiologist.", tr: "Sertifikasyon almak için cihazımızın eğitimli bir odyologla aynı sonuçları verdiğini kanıtlamamız gerekiyordu." },
    { en: "So we designed a clinical study with two university hospitals.", tr: "Bu yüzden iki üniversite hastanesiyle bir klinik çalışma tasarladık." },
    { en: "Our hypothesis was simple: the autonomous test and the expert test will give the same result in at least 90 percent of patients.", tr: "Hipotezimiz basitti: otonom test ve uzman testi hastaların en az yüzde 90'ında aynı sonucu verecek." },
    { en: "We recruited 200 participants between 18 and 75 years old.", tr: "18 ile 75 yaş arasında 200 katılımcı topladık." },
    { en: "Each participant did two tests on the same day: one with our device and one with an audiologist.", tr: "Her katılımcı aynı gün iki test yaptı: biri cihazımızla, biri bir odyologla." },
    { en: "The audiologist did not see the result from our device. This is called a blind comparison.", tr: "Odyolog cihazımızın sonucunu görmedi. Buna kör karşılaştırma denir." },
    { en: "The results matched in 94 percent of cases.", tr: "Sonuçlar vakaların yüzde 94'ünde eşleşti." },
    { en: "In the other 6 percent, the difference was small and did not change the diagnosis.", tr: "Diğer yüzde 6'da fark küçüktü ve teşhisi değiştirmedi." },
    { en: "We published the results in a medical journal last spring.", tr: "Sonuçları geçen bahar bir tıp dergisinde yayımladık." }
  ],
  vocab: [
    { en: "clinical study", tr: "klinik çalışma", ex: "We designed a clinical study." },
    { en: "hypothesis", tr: "hipotez", ex: "Our hypothesis was simple." },
    { en: "recruit participants", tr: "katılımcı toplamak", ex: "We recruited 200 participants." },
    { en: "participant", tr: "katılımcı", ex: "Each participant did two tests." },
    { en: "blind comparison", tr: "kör karşılaştırma", ex: "The audiologist did not see our result; it was a blind comparison." },
    { en: "result", tr: "sonuç", ex: "The results matched in 94 percent of cases." },
    { en: "difference", tr: "fark", ex: "The difference was small." },
    { en: "diagnosis", tr: "teşhis", ex: "It did not change the diagnosis." },
    { en: "publish", tr: "yayımlamak", ex: "We published the results in a journal." }
  ],
  questions: [
    { q: "Why did they need a study?", options: ["For marketing", "To prove the device matches an expert", "For fun"], a: 1 },
    { q: "How many participants were there?", options: ["20", "200", "2,000"], a: 1 },
    { q: "What is a blind comparison?", options: ["Patients cannot see", "The audiologist does not see the device result", "The test is in the dark"], a: 1 },
    { q: "Where were the results published?", options: ["A newspaper", "A medical journal", "A blog"], a: 1 }
  ],
  gaps: [
    { s: "Our ___ was simple.", a: "hypothesis", hint: "hipotez" },
    { s: "We ___ 200 participants.", a: "recruited", hint: "topladık" },
    { s: "The difference did not change the ___.", a: "diagnosis", hint: "teşhis" }
  ],
  order: [
    { a: "The results matched in 94 percent of cases." },
    { a: "We published the results in a medical journal." }
  ],
  translate: [
    { tr: "Her katılımcı iki test yaptı.", en: "Each participant did two tests.", keys: ["participant", "two tests"] },
    { tr: "Fark küçüktü.", en: "The difference was small.", keys: ["difference", "small"] }
  ],
  roleplay: {
    persona: "University researcher", personaTr: "Üniversite araştırmacısı",
    scene: "Bir araştırmacı çalışmanızın yöntemini soruyor.",
    turns: [
      { ai: "Tell me about your clinical study. What was the hypothesis?", aiTr: "Klinik çalışmanızı anlatın. Hipotez neydi?", hint: "Our hypothesis was that the autonomous test and the expert test give the same result in at least 90 percent of patients.", keys: ["hypothesis", "same result", "percent", "expert"] },
      { ai: "How many participants, and what was the method?", aiTr: "Kaç katılımcı vardı ve yöntem neydi?", hint: "We recruited 200 participants. Each did two tests on the same day. It was a blind comparison.", keys: ["recruited", "participants", "blind", "two tests"] },
      { ai: "And what were the results?", aiTr: "Peki sonuçlar neydi?", hint: "The results matched in 94 percent of cases. We published them in a medical journal.", keys: ["matched", "percent", "published", "journal"] }
    ]
  }
},
{
  id: "sc-02", topic: "science", level: "B1", minutes: 12,
  title: "Applying for an Innovation Grant",
  titleTr: "Bir İnovasyon Hibesine Başvurmak",
  intro: "Hibe programları, başvuru süreci ve hibe ile yatırım arasındaki fark.",
  text: [
    { en: "Not all money for a startup comes from investors. Some of it comes from grants.", tr: "Bir girişim için tüm para yatırımcılardan gelmez. Bir kısmı hibelerden gelir." },
    { en: "A grant is money you do not have to pay back, and you do not give equity.", tr: "Hibe, geri ödemek zorunda olmadığınız ve hisse vermediğiniz paradır." },
    { en: "Last year we applied for a European innovation grant for health technology.", tr: "Geçen yıl sağlık teknolojisi için bir Avrupa inovasyon hibesine başvurduk." },
    { en: "The application was long. We had to describe the problem, our solution, the team and the budget.", tr: "Başvuru uzundu. Sorunu, çözümümüzü, ekibi ve bütçeyi anlatmak zorundaydık." },
    { en: "We also had to explain the impact: how many people will benefit from our device?", tr: "Ayrıca etkiyi açıklamak zorundaydık: cihazımızdan kaç kişi fayda görecek?" },
    { en: "The review took four months. Then we were invited to an interview with a jury.", tr: "Değerlendirme dört ay sürdü. Sonra bir jüriyle mülakata davet edildik." },
    { en: "We won 250,000 euros. The money is for research and clinical validation only.", tr: "250.000 euro kazandık. Para yalnızca araştırma ve klinik doğrulama için." },
    { en: "Grants take a lot of time, but they are a great way to fund early research.", tr: "Hibeler çok zaman alır ama erken araştırmayı finanse etmenin harika bir yoludur." }
  ],
  vocab: [
    { en: "grant", tr: "hibe", ex: "A grant is money you do not pay back." },
    { en: "pay back", tr: "geri ödemek", ex: "You do not have to pay back a grant." },
    { en: "apply for", tr: "...e başvurmak", ex: "We applied for a grant." },
    { en: "application", tr: "başvuru", ex: "The application was long." },
    { en: "budget", tr: "bütçe", ex: "We had to describe the budget." },
    { en: "impact", tr: "etki", ex: "We explained the impact of the device." },
    { en: "benefit from", tr: "...den fayda görmek", ex: "Many people will benefit from the device." },
    { en: "jury", tr: "jüri", ex: "We had an interview with a jury." },
    { en: "fund", tr: "finanse etmek", ex: "Grants fund early research." }
  ],
  questions: [
    { q: "What is a grant?", options: ["A loan you pay back", "Money you do not pay back and no equity", "An investment for equity"], a: 1 },
    { q: "What did they have to describe in the application?", options: ["Only the budget", "Problem, solution, team, budget and impact", "Their office"], a: 1 },
    { q: "How long did the review take?", options: ["Four weeks", "Four months", "Four years"], a: 1 },
    { q: "What is the money for?", options: ["Marketing", "Research and clinical validation", "Salaries of founders"], a: 1 }
  ],
  gaps: [
    { s: "A ___ is money you do not have to pay back.", a: "grant", hint: "hibe" },
    { s: "We ___ for a European innovation grant.", a: "applied", hint: "başvurduk" },
    { s: "How many people will ___ from our device?", a: "benefit", hint: "fayda görmek" }
  ],
  order: [
    { a: "The application was long." },
    { a: "We were invited to an interview with a jury." }
  ],
  translate: [
    { tr: "Hibeler çok zaman alır.", en: "Grants take a lot of time.", keys: ["grants", "time"] },
    { tr: "250.000 euro kazandık.", en: "We won 250,000 euros.", keys: ["won", "euros"] }
  ],
  roleplay: {
    persona: "Grant jury member", personaTr: "Hibe jürisi üyesi",
    scene: "Hibe mülakatındasın. Jüri etki ve bütçe soruyor.",
    turns: [
      { ai: "Thank you for your application. What is the impact of your project?", aiTr: "Başvurunuz için teşekkürler. Projenizin etkisi ne?", hint: "Our device makes hearing tests accessible. Millions of people can benefit from it, especially in small towns.", keys: ["impact", "accessible", "benefit", "people"] },
      { ai: "How will you use the grant money?", aiTr: "Hibe parasını nasıl kullanacaksınız?", hint: "The budget is for research and clinical validation. We will test the device with 500 patients.", keys: ["budget", "research", "validation", "patients"] },
      { ai: "Why should we fund you and not another team?", aiTr: "Neden başka bir ekibi değil de sizi finanse edelim?", hint: "We already have a working prototype and published results. We can move fast.", keys: ["prototype", "published", "results", "fast"] }
    ]
  }
}
);
