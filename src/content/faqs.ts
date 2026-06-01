// Single source of truth for homepage FAQs.
// Feeds BOTH the visible accordion (src/components/home/faq.tsx) and the
// FAQPage JSON-LD schema (src/app/[locale]/page.tsx), in both locales.
// Keep en and ka in sync — each entry should exist in both arrays.

export type Faq = { q: string; a: string };

const faqsEn: Faq[] = [
  {
    q: "What is Geolander?",
    a: "Geolander is a premium, tourist-focused car rental company based in Tbilisi, Georgia. We offer free Tbilisi airport delivery, a 4x4 fleet built for Caucasus mountain routes, included insurance, and 24/7 support in English and Georgian. Geolander is a single accountable company — not a marketplace of third-party suppliers.",
  },
  {
    q: "What documents do I need to rent a car?",
    a: "You need a valid driver's license (international license recommended for non-Georgian licenses), passport, and a credit or debit card. Minimum age is 21 years.",
  },
  {
    q: "Is insurance included in the rental price?",
    a: "Yes, basic insurance is included in all our rental prices. This covers third-party liability and collision damage with a deductible. Additional full coverage options are available.",
  },
  {
    q: "Can I pick up the car at Tbilisi Airport?",
    a: "Absolutely! We offer free delivery and pickup at Tbilisi International Airport (TBS). Just provide your flight details and we'll be waiting for you.",
  },
  {
    q: "What is the best car to rent for driving to Kazbegi and the Georgian mountains?",
    a: "A 4x4 SUV is the best choice for Kazbegi, Gudauri, Svaneti, and Tusheti, because mountain roads can be steep, unpaved, and weather-affected. Geolander's 4x4 fleet is selected specifically for these routes, and our team will recommend the right vehicle for your itinerary.",
  },
  {
    q: "Do I need a 4x4 to drive in Georgia?",
    a: "For cities and main highways a standard car is fine, but a 4x4 is strongly recommended for mountain regions like Svaneti, Tusheti, Kazbegi, and Khevsureti, where roads are rough or unpaved. Geolander helps you match the vehicle to your route.",
  },
  {
    q: "Is it safe to drive in Georgia as a tourist?",
    a: "Yes, driving in Georgia is manageable for tourists who stay alert on mountain roads. Georgia drives on the right, road signs use both Georgian and Latin script on major routes, and Geolander provides 24/7 roadside assistance and route guidance for added peace of mind.",
  },
  {
    q: "What fuel policy do you have?",
    a: "We operate a full-to-full fuel policy. You receive the car with a full tank and should return it full. If returned without a full tank, a refueling fee applies.",
  },
  {
    q: "Can I drive to neighboring countries?",
    a: "Cross-border travel requires prior arrangement and additional documentation. Please contact us in advance to discuss your travel plans to Armenia, Azerbaijan, or Turkey.",
  },
  {
    q: "What happens if the car breaks down?",
    a: "We provide 24/7 roadside assistance. If anything happens, call our support number and we'll arrange help immediately, including a replacement vehicle if needed.",
  },
  {
    q: "How far in advance should I book a rental car in Georgia?",
    a: "Book at least a few days ahead in low season and 2–3 weeks ahead for summer (June–September) and the New Year period, when demand for 4x4s peaks. Geolander confirms most bookings within minutes via WhatsApp.",
  },
  {
    q: "How do I book a car?",
    a: "Simply browse our fleet, select your dates, and send us a booking request via WhatsApp. We'll confirm availability and finalize your reservation within minutes.",
  },
  {
    q: "Is there a cancellation policy?",
    a: "Free cancellation up to 24 hours before your pickup time. Cancellations within 24 hours may incur a fee equal to one day's rental.",
  },
];

const faqsKa: Faq[] = [
  {
    q: "რა არის Geolander?",
    a: "Geolander არის პრემიუმ, ტურისტებზე ორიენტირებული მანქანების გაქირავების კომპანია თბილისში, საქართველო. გთავაზობთ უფასო მიწოდებას თბილისის აეროპორტში, კავკასიის მთის მარშრუტებისთვის შერჩეულ 4x4 ავტოპარკს, ჩართულ დაზღვევას და 24/7 მხარდაჭერას ინგლისურ და ქართულ ენებზე. Geolander ერთი პასუხისმგებელი კომპანიაა და არა მესამე მხარის მომწოდებლების პლატფორმა.",
  },
  {
    q: "რა საბუთები მჭირდება მანქანის დასაქირავებლად?",
    a: "დაგჭირდებათ მოქმედი მართვის მოწმობა (არა-ქართული მოწმობისთვის რეკომენდებულია საერთაშორისო მართვის მოწმობა), პასპორტი და საკრედიტო ან სადებეტო ბარათი. მინიმალური ასაკია 21 წელი.",
  },
  {
    q: "დაზღვევა ჩართულია ქირის ფასში?",
    a: "დიახ, ბაზისური დაზღვევა ჩართულია ჩვენს ყველა ფასში. ის ფარავს მესამე მხარის პასუხისმგებლობას და შეჯახების ზიანს ფრანშიზით. ასევე ხელმისაწვდომია სრული დაფარვის დამატებითი ვარიანტები.",
  },
  {
    q: "შემიძლია მანქანის აღება თბილისის აეროპორტში?",
    a: "რა თქმა უნდა! გთავაზობთ უფასო მიწოდებას და აღებას თბილისის საერთაშორისო აეროპორტში (TBS). უბრალოდ მოგვაწოდეთ ფრენის დეტალები და ჩვენ დაგხვდებით.",
  },
  {
    q: "რომელი მანქანაა საუკეთესო ყაზბეგსა და საქართველოს მთებში სამგზავროდ?",
    a: "4x4 ჯიპი საუკეთესო არჩევანია ყაზბეგის, გუდაურის, სვანეთისა და თუშეთისთვის, რადგან მთის გზები შეიძლება იყოს ციცაბო, არაასფალტირებული და ამინდზე დამოკიდებული. Geolander-ის 4x4 ავტოპარკი სწორედ ამ მარშრუტებისთვისაა შერჩეული და ჩვენი გუნდი დაგეხმარებათ თქვენი მარშრუტისთვის სწორი მანქანის შერჩევაში.",
  },
  {
    q: "მჭირდება 4x4 საქართველოში სამგზავროდ?",
    a: "ქალაქებსა და მთავარ მაგისტრალებზე ჩვეულებრივი მანქანა საკმარისია, თუმცა 4x4 მკაცრად რეკომენდებულია მთიანი რეგიონებისთვის, როგორიცაა სვანეთი, თუშეთი, ყაზბეგი და ხევსურეთი, სადაც გზები რთული ან არაასფალტირებულია. Geolander დაგეხმარებათ მარშრუტის შესაბამისი მანქანის შერჩევაში.",
  },
  {
    q: "უსაფრთხოა საქართველოში მართვა ტურისტისთვის?",
    a: "დიახ, საქართველოში მართვა მართვადია ტურისტებისთვის, რომლებიც ფხიზლად არიან მთის გზებზე. საქართველოში მოძრაობა მარჯვენა მხარეა, საგზაო ნიშნები მთავარ მარშრუტებზე ქართულ და ლათინურ დამწერლობას იყენებს, ხოლო Geolander უზრუნველყოფს 24/7 საგზაო დახმარებას და მარშრუტის რჩევებს.",
  },
  {
    q: "საწვავის რა პოლიტიკა გაქვთ?",
    a: "ჩვენ ვმუშაობთ „სავსედან-სავსემდე“ საწვავის პოლიტიკით. მანქანას იღებთ სავსე ბაკით და უნდა დააბრუნოთ სავსე. თუ დააბრუნებთ არასავსე ბაკით, დაერიცხება საწვავის შევსების საფასური.",
  },
  {
    q: "შემიძლია მეზობელ ქვეყნებში გადაადგილება?",
    a: "საზღვრის გადაკვეთა საჭიროებს წინასწარ შეთანხმებას და დამატებით საბუთებს. გთხოვთ წინასწარ დაგვიკავშირდეთ სომხეთში, აზერბაიჯანში ან თურქეთში მგზავრობის დასაგეგმად.",
  },
  {
    q: "რა მოხდება, თუ მანქანა გაფუჭდება?",
    a: "ჩვენ გთავაზობთ 24/7 საგზაო დახმარებას. რაიმეს შემთხვევაში, დაგვირეკეთ მხარდაჭერის ნომერზე და დაუყოვნებლივ მოვაგვარებთ დახმარებას, საჭიროების შემთხვევაში სანაცვლო მანქანის ჩათვლით.",
  },
  {
    q: "რამდენით ადრე უნდა დავჯავშნო მანქანა საქართველოში?",
    a: "დაჯავშნეთ მინიმუმ რამდენიმე დღით ადრე დაბალ სეზონზე და 2–3 კვირით ადრე ზაფხულში (ივნისი–სექტემბერი) და საახალწლო პერიოდში, როდესაც 4x4-ებზე მოთხოვნა პიკზეა. Geolander ადასტურებს ჯავშნების უმეტესობას წუთებში WhatsApp-ით.",
  },
  {
    q: "როგორ დავჯავშნო მანქანა?",
    a: "უბრალოდ დაათვალიერეთ ჩვენი ავტოპარკი, აირჩიეთ თარიღები და გამოგვიგზავნეთ ჯავშნის მოთხოვნა WhatsApp-ით. ჩვენ დავადასტურებთ ხელმისაწვდომობას და რამდენიმე წუთში დავასრულებთ თქვენს ჯავშანს.",
  },
  {
    q: "არსებობს გაუქმების პოლიტიკა?",
    a: "უფასო გაუქმება აღების დრომდე 24 საათით ადრე. 24 საათში გაუქმებას შესაძლოა დაერიცხოს ერთი დღის ქირის ტოლი საფასური.",
  },
];

export function getFaqs(locale: string): Faq[] {
  return locale === "ka" ? faqsKa : faqsEn;
}
