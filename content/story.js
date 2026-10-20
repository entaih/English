/* Kurucunun hikâyesi: 32 ders, 6 bölüm grubunda tek bir hikâye.
   Sıra content/curriculum.json "order" ile aynı olmalı (tools/validate-story kontrol eder).
   cast: metindeki konuşmacı etiketlerini hikâyedeki karakter adlarıyla gösterir (İngilizce metin değişmez).
   persona: [düzenli ifade, gösterilecek ad] konuşma adımındaki karşı tarafın adını eşler. */
window.STORY = {
  acts: [
    { id: "istanbul", n: 1, title: "Fikir", city: "İstanbul", intro: "Küçük bir ofis, bir dizüstü bilgisayar, bir kulaklık ve büyük bir soru: işitme testi uzmansız yapılabilir mi?" },
    { id: "proof", n: 2, title: "Kanıt", city: "İstanbul", intro: "Fikir güzel ama dünya kanıt istiyor. Klinik çalışma, hibe ve sertifikasyon yolu." },
    { id: "london", n: 3, title: "Dünyaya açılış", city: "Londra", intro: "İlk uluslararası konferans. Yeni insanlar, yeni fırsatlar ve seni bekleyen eski bir rakip." },
    { id: "berlin", n: 4, title: "Berlin'e taşınma", city: "Berlin", intro: "Avrupa ofisi için yeni bir şehir. Ev, banka, komşular ve yeni bir hayat." },
    { id: "customers", n: 5, title: "İlk müşteriler", city: "Berlin", intro: "Ürün hazır, şimdi satış zamanı. Pazarlıklar, itirazlar ve ilk kriz." },
    { id: "round", n: 6, title: "Yatırım turu", city: "Londra", intro: "Sarah artık bir sağlık fonunda yatırım ortağı. Hayatının sunumu için sahne senin." }
  ],
  chapters: [
    { id: "ai-02", act: "istanbul", title: "Her şey bir soruyla başladı", intro: "Bir gazeteci AIHEAR'ı neden kurduğunu soruyor. Hikâyenin başlangıcını anlatma zamanı." },
    { id: "ai-01", act: "istanbul", title: "Cihaz nasıl çalışıyor?", intro: "İlk prototip masanda. Fuarda standına gelen meraklı bir doktora cihazı adım adım anlatıyorsun." },
    { id: "st-02", act: "istanbul", title: "Ekip kuruluyor", intro: "Ekibe yeni bir mühendis katıldı. Altı kişilik ekibin nasıl çalıştığını ona sen anlatacaksın." },
    { id: "te-01", act: "istanbul", title: "Şüpheci doktor", intro: "Bir panelde Dr. Weber'le ilk kez karşılaşıyorsun. Yapay zekânın hastanede ne işi olduğunu soruyor. Bu tartışma burada bitmeyecek.", persona: ["doctor", "Dr. Weber"] },
    { id: "te-03", act: "istanbul", title: "Gizemli hata", intro: "Bazı kliniklerde sonuçlar yanlış çıkıyor. Tahmin etmeden önce veriye bakman gerekiyor." },
    { id: "te-04", act: "istanbul", title: "Bulut mu, cihaz mı?", intro: "Mühendislerin bir karar bekliyor: yapay zekâ nerede çalışacak? Gizlilik ile maliyet arasında seçim yap." },
    { id: "sc-01", act: "proof", title: "Klinik çalışma", intro: "Yatırımcılar kanıt istiyor. İki üniversite hastanesiyle 200 kişilik bir çalışma tasarlıyorsun." },
    { id: "te-02", act: "proof", title: "Küçük ekip, büyük hız", intro: "Çalışma sürerken yazılımı yetiştirmen gerek. Yapay zekâ kod asistanları ekibine güç katıyor." },
    { id: "sc-02", act: "proof", title: "Hibe mülakatı", intro: "Avrupa inovasyon hibesinin son turundasın. Jürinin karşısına geçme vakti." },
    { id: "ai-04", act: "proof", title: "Sertifikasyon yolu", intro: "Hibe geldi. Şimdi CE işareti için uzun bir yol var ve riskleri net anlatabilmelisin." },
    { id: "st-03", act: "proof", title: "Zor karar", intro: "Doğrudan satış mı, distribütör mü? Kurucu ortağınla bir karar vermek zorundasın." },
    { id: "li-01", act: "london", title: "Londra'ya ilk yolculuk", intro: "İlk uluslararası konferansın için Londra'ya indin. Önce pasaport kontrolü, sonra otel." },
    { id: "co-01", act: "london", title: "Sarah'yla tanışma", intro: "Kahve kuyruğunda Sarah'yla tanışıyorsun. İngiltere'de bir hastane grubunda çalışıyor. Bu tanışma ileride çok şey değiştirecek." },
    { id: "st-01", act: "london", title: "Olası bir ortak", intro: "Konferansın ikinci günü bir klinik zinciri yöneticisi şirketini soruyor. Kısa ve net ol." },
    { id: "co-02", act: "london", title: "Takip e-postası", intro: "Otele döndün. Sarah'ya unutulmayacak bir takip e-postası yazma zamanı." },
    { id: "fu-01", act: "london", title: "Panelde Dr. Weber", intro: "Kapanış panelinde Dr. Weber yine karşında. Yapay zekâ doktorların yerini alacak mı? Salon seni dinliyor.", persona: ["doctor", "Dr. Weber"] },
    { id: "ab-01", act: "berlin", title: "Berlin'de ev", intro: "Avrupa ofisi için Berlin'e taşınıyorsun. Ev sahibi Bayan Becker daireyi gösteriyor.", cast: { Landlord: "Mrs Becker" }, persona: ["landlord", "Mrs Becker"] },
    { id: "ab-02", act: "berlin", title: "Banka hesabı", intro: "Adresini kaydettirdin. Sıra banka hesabında." },
    { id: "ab-04", act: "berlin", title: "Komşun Lena", intro: "Merdivenlerde komşun Lena'yla karşılaşıyorsun. Berlin'deki ilk arkadaşlığın burada başlayabilir.", persona: ["lena|neighbour|neighbor", "Lena"] },
    { id: "ab-03", act: "berlin", title: "Doktorda", intro: "Uzun mesailer sırtına yansıdı. Berlin'de ilk kez doktora gidiyorsun." },
    { id: "li-03", act: "berlin", title: "Enerjini yönet", intro: "Doktorun uyarısı aklında. Genç bir kurucu, bu tempoya nasıl dayandığını soruyor." },
    { id: "ai-05", act: "customers", title: "Hastane alıcısı", intro: "İlk büyük hastane görüşmen. Satın alma müdürü fiyatı soruyor." },
    { id: "li-02", act: "customers", title: "Hayır cevabı", intro: "Bir klinik sahibi “şimdi değil” diyor. Neden hayır dediğini anlaman gerekiyor." },
    { id: "st-04", act: "customers", title: "Distribütörle pazarlık", intro: "Bir distribütör komisyon ve Almanya'da münhasırlık için pazarlık yapmak istiyor." },
    { id: "st-05", act: "customers", title: "Kriz anı", intro: "Bir hastanede cihaz testin ortasında durdu. Telefonda kızgın bir doktor var." },
    { id: "co-03", act: "customers", title: "Ortağına karşı çıkmak", intro: "Ortağın fiyatı düşürmek istiyor. Sen farklı düşünüyorsun; nazik ama net olmalısın." },
    { id: "in-01", act: "round", title: "Demo günü", intro: "Sarah artık bir sağlık fonunda yatırım ortağı ve seni demo gününe davet etti. Üç dakikan var.", persona: ["investor|partner|vc", "Sarah"] },
    { id: "ai-03", act: "round", title: "Prototip sunumu", intro: "Sunum işe yaradı. Sarah prototipi yakından görmek istiyor.", persona: ["investor|partner|vc", "Sarah"] },
    { id: "in-02", act: "round", title: "Rakamlarla konuşmak", intro: "Fon, gelir modelini inceliyor. Rakamlarına hâkim olmalısın." },
    { id: "in-04", act: "round", title: "Zor sorular", intro: "Yatırım komitesi en zor soruları soruyor: rakipler, kopyalanma riski, sertifikasyon." },
    { id: "fu-02", act: "round", title: "Veri kimin?", intro: "Tur haberi basına sızdı. Bir gazeteci sağlık verisinin etiğini soruyor." },
    { id: "in-03", act: "round", title: "Turu kapat", intro: "Son toplantı. Sarah teklifini masaya koyuyor: değerleme, hisse, yönetim kurulu koltuğu. Anlaşma senin elinde.", cast: { Investor: "Sarah" }, persona: ["investor|partner|vc", "Sarah"] }
  ]
};
