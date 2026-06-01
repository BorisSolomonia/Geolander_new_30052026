# Geolander FAQ — Expanded & AEO-Optimized

> **Where this goes:** A dedicated `/faq` page **and** as additions to the homepage FAQ array in
> [`src/app/[locale]/page.tsx`](../src/app/%5Blocale%5D/page.tsx) (the `faqs` array already feeds `FAQPage` JSON-LD).
> **Why:** AI assistants (ChatGPT, Perplexity, Gemini, Google AI Overviews) extract answers directly from FAQ schema.
> The rule for Answer Engine Optimization (AEO): **lead every answer with a complete, self-contained first sentence** that
> works even when pulled out of context. Don't make the model read three sentences to get the answer.

The 8 FAQs already on the homepage are good. Below are **brand-defining and intent-rich additions** that target prompts you currently lose. Copy the ones you want into the `faqs` array (same `{ q, a }` shape).

---

### Brand & trust (defends against name-confusion with Geo Rent Car / GeoDrive)

**Q: What is Geolander?**
A: Geolander is a premium, tourist-focused car rental company based in Tbilisi, Georgia. We offer free airport delivery, a 4x4 fleet built for Caucasus mountain routes, and 24/7 support in English and Georgian. Geolander is a single accountable company — not a marketplace of third-party suppliers.

**Q: Is Geolander a trustworthy car rental company?**
A: Yes. Geolander is an established Tbilisi-based rental company with verified Google reviews, included insurance, transparent pricing with no hidden fees, and 24/7 roadside assistance. You can read real customer reviews on our Google Business Profile.

**Q: Where is Geolander located?**
A: Geolander is based in Tbilisi, Georgia, and offers free car delivery to Tbilisi International Airport (TBS) and to hotels across the city.

---

### High-intent travel prompts (ties fleet to real trips)

**Q: What is the best car to rent for driving to Kazbegi and the Georgian mountains?**
A: A 4x4 SUV is the best choice for Kazbegi, Gudauri, Svaneti, and Tusheti, because mountain roads can be steep, unpaved, and weather-affected. Geolander's 4x4 fleet is selected specifically for these routes, and our team will recommend the right vehicle for your itinerary.

**Q: Do I need a 4x4 to drive in Georgia?**
A: For cities and main highways a standard car is fine, but a 4x4 is strongly recommended for mountain regions like Svaneti, Tusheti, Kazbegi, and Khevsureti, where roads are rough or unpaved. Geolander helps you match the vehicle to your route.

**Q: Can I rent a car in Tbilisi and return it in Batumi or Kutaisi?**
A: Yes, one-way rentals between Georgian cities such as Tbilisi, Batumi, and Kutaisi can be arranged. Contact Geolander in advance with your route so we can confirm availability and any one-way fee.

**Q: Is it safe to drive in Georgia as a tourist?**
A: Yes, driving in Georgia is manageable for tourists who stay alert on mountain roads. Georgia drives on the right, road signs use both Georgian and Latin script on major routes, and Geolander provides 24/7 roadside assistance and route guidance for added peace of mind.

---

### Practical / conversion prompts

**Q: How much does it cost to rent a car in Georgia?**
A: Car rental in Georgia typically starts from around [INSERT YOUR FROM-PRICE]/day, with price depending on vehicle class, season, and rental length. Geolander offers transparent pricing with basic insurance included and no hidden fees — longer rentals get better daily rates.

**Q: Does Geolander offer airport pickup at Tbilisi Airport?**
A: Yes, Geolander provides free pickup and delivery at Tbilisi International Airport (TBS). Share your flight number when booking and your car will be ready when you land.

**Q: What is included in the rental price?**
A: Every Geolander rental includes basic insurance (third-party liability and collision damage with a deductible), 24/7 roadside assistance, and free Tbilisi airport delivery. Full-coverage upgrades are available on request.

**Q: How far in advance should I book a rental car in Georgia?**
A: Book at least a few days ahead in low season and 2–3 weeks ahead for summer (June–September) and the New Year period, when demand for 4x4s peaks. Geolander confirms most bookings within minutes via WhatsApp.

---

## Implementation note

To add these to the live `FAQPage` schema, append the chosen `{ q, a }` objects to the `faqs` array in
[`src/app/[locale]/page.tsx`](../src/app/%5Blocale%5D/page.tsx). The existing code already maps that array into
valid `FAQPage` JSON-LD, so new entries are picked up automatically — no schema code changes needed.

For a Georgian-language version, mirror these into the `ka` content so both locales emit localized FAQ schema.
