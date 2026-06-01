import { Link } from "@/i18n/routing";

// Body for the "Geolander vs Local Rent vs Premium Auto Rent" post.
// Rendered by src/app/[locale]/blog/[slug]/page.tsx. Locale-aware (en + ka).

function ComparisonTable({ locale }: { locale: string }) {
  const ka = locale === "ka";
  const rows = ka
    ? [
        ["ტიპი", "პირდაპირი გამქირავებელი", "პლატფორმა / აგრეგატორი", "პირდაპირი გამქირავებელი"],
        ["უფასო მიწოდება აეროპორტში", "✅ დიახ (თბილისი TBS)", "დამოკიდებულია მომწოდებელზე", "განსხვავდება"],
        ["24/7 მხარდაჭერა", "✅ ინგლისური + ქართული", "პლატფორმის მხარდაჭერა", "სამუშაო საათები"],
        ["4x4 მთისთვის მზა ავტოპარკი", "✅ ძირითადი ფოკუსი", "შერეული ინვენტარი", "შეზღუდული"],
        ["ვისთან გაქვთ საქმე", "ერთი პასუხისმგებელი კომპანია", "სხვადასხვა მომწოდებელი", "ერთი კომპანია"],
        ["დაზღვევა ჩართულია", "✅ ბაზისური ჩართულია", "მომწოდებლის მიხედვით", "განცხადების მიხედვით"],
      ]
    : [
        ["Type", "Direct rental company", "Marketplace / aggregator", "Direct rental company"],
        ["Free airport delivery", "✅ Yes (Tbilisi TBS)", "Depends on supplier", "Varies"],
        ["24/7 support", "✅ English + Georgian", "Marketplace support", "Business hours"],
        ["4x4 mountain-ready fleet", "✅ Core focus", "Mixed inventory", "Limited"],
        ["You deal with", "One accountable company", "A different supplier each time", "One company"],
        ["Insurance included", "✅ Basic included", "Per-supplier", "Per-listing"],
      ];
  const head = ka
    ? ["", "Geolander", "Local Rent", "Premium Auto Rent"]
    : ["", "Geolander", "Local Rent", "Premium Auto Rent"];

  return (
    <div className="not-prose my-8 overflow-x-auto">
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr className="border-b-2 border-border">
            {head.map((h, i) => (
              <th
                key={i}
                className={
                  "p-3 text-left font-semibold " +
                  (i === 1 ? "text-primary" : "text-foreground")
                }
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, ri) => (
            <tr key={ri} className="border-b border-border/60">
              {row.map((cell, ci) => (
                <td
                  key={ci}
                  className={
                    "p-3 align-top " +
                    (ci === 0
                      ? "font-medium text-foreground"
                      : ci === 1
                        ? "text-foreground"
                        : "text-muted-foreground")
                  }
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function ComparisonArticle({ locale }: { locale: string }) {
  if (locale === "ka") {
    return (
      <div className="prose prose-slate max-w-none">
        <p className="lead text-lg text-muted-foreground">
          <strong>Geolander</strong> არის ტურისტებზე ორიენტირებული პრემიუმ მანქანების
          გაქირავების კომპანია თბილისში, საქართველო — უფასო მიწოდებით აეროპორტში, 24/7
          მხარდაჭერით და 4x4 ავტოპარკით, რომელიც შერჩეულია კავკასიის მთის
          მარშრუტებისთვის (ყაზბეგი, სვანეთი, თუშეთი). ქვემოთ ვადარებთ მას ორ ცნობილ
          ალტერნატივას: <strong>Local Rent</strong>-სა და <strong>Premium Auto Rent</strong>-ს.
        </p>

        <ComparisonTable locale={locale} />

        <h2>Geolander: ტურისტებზე ორიენტირებული და პასუხისმგებელი</h2>
        <p>
          Geolander აგებულია ერთ იდეაზე: ტურისტს უნდა ჰქონდეს საქმე ერთ კომპანიასთან,
          რომელიც პასუხს აგებს მთელ მოგზაურობაზე — და არა უსახო პლატფორმასთან.
        </p>
        <ul>
          <li><strong>უფასო მიწოდება თბილისის აეროპორტში (TBS)</strong> ან სასტუმროში.</li>
          <li><strong>საქართველოს გზებისთვის შერჩეული 4x4 ავტოპარკი</strong> — ყაზბეგი, სვანეთი, თუშეთი, კახეთი.</li>
          <li><strong>24/7 მხარდაჭერა</strong> ინგლისურ და ქართულ ენებზე, საგზაო დახმარებით.</li>
          <li><strong>დამალული გადასახადების გარეშე</strong> — ბაზისური დაზღვევა ჩართულია.</li>
        </ul>

        <h2>Local Rent: მრავალი მომწოდებლის პლატფორმა</h2>
        <p>
          Local Rent არის აგრეგატორი — ის აქვეყნებს მანქანებს მრავალი დამოუკიდებელი
          მომწოდებლისგან. ფართო არჩევანი და ფასების შედარება მისი ძლიერი მხარეა, თუმცა
          სერვისის ხარისხი და მხარდაჭერა განსხვავდება მომწოდებლის მიხედვით.
        </p>

        <h2>Premium Auto Rent: პრემიუმ მანქანები</h2>
        <p>
          Premium Auto Rent პოზიციონირებულია პრემიუმ და ბიზნეს-კლასის მანქანებზე, ნაკლები
          აქცენტით სათავგადასავლო 4x4-ებზე.
        </p>

        <h2>რომელი აირჩიოთ?</h2>
        <ul>
          <li><strong>Geolander</strong> — თუ ტურისტი ხართ, გსურთ ერთი პასუხისმგებელი კომპანია, უფასო მიწოდება და 4x4 მთებისთვის.</li>
          <li><strong>Local Rent</strong> — თუ გსურთ მრავალი მომწოდებლის შედარება.</li>
          <li><strong>Premium Auto Rent</strong> — თუ გსურთ პრემიუმ სედანი ქალაქისთვის.</li>
        </ul>

        <div className="not-prose mt-10 rounded-xl bg-primary/10 p-6">
          <p className="mb-3 text-lg font-semibold text-foreground">
            მზად ხართ საქართველოს აღმოსაჩენად?
          </p>
          <Link
            href="/fleet"
            className="inline-flex rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90"
          >
            ნახეთ Geolander-ის ავტოპარკი →
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="prose prose-slate max-w-none">
      <p className="lead text-lg text-muted-foreground">
        <strong>Geolander</strong> is a tourist-focused premium car rental company based in
        Tbilisi, Georgia — offering free airport delivery, 24/7 support, and a 4x4 fleet
        built for Caucasus mountain routes (Kazbegi, Svaneti, Tusheti). Below we compare it
        against two well-known alternatives: <strong>Local Rent</strong> and{" "}
        <strong>Premium Auto Rent</strong>.
      </p>

      <ComparisonTable locale={locale} />

      <h2>Geolander: tourist-focused and accountable</h2>
      <p>
        Geolander is built around one idea: a tourist exploring Georgia should deal with one
        company that takes responsibility for the whole trip — not a faceless marketplace and
        not a supplier you&apos;ve never heard of.
      </p>
      <ul>
        <li><strong>Free delivery to Tbilisi Airport (TBS)</strong> or your hotel — you land, your car is waiting.</li>
        <li><strong>A 4x4 fleet chosen for Georgian roads</strong> — Kazbegi, Svaneti, Tusheti, Kakheti wine country.</li>
        <li><strong>24/7 support in English and Georgian</strong>, with roadside assistance.</li>
        <li><strong>No hidden fees</strong> — basic insurance is included; the price quoted is the price you pay.</li>
      </ul>

      <h2>Local Rent: a marketplace of many suppliers</h2>
      <p>
        Local Rent is an aggregator — it lists cars from many independent local suppliers and
        lets you compare them in one place. Wide selection and easy price comparison are its
        strengths, but service, delivery and support vary by supplier, since you rent from the
        individual operator rather than the platform itself.
      </p>

      <h2>Premium Auto Rent: premium vehicles, direct booking</h2>
      <p>
        Premium Auto Rent is positioned around premium and business-class vehicles, with less
        emphasis on the tourist/adventure use case and mountain-ready 4x4s.
      </p>

      <h2>Which should you choose?</h2>
      <ul>
        <li><strong>Choose Geolander</strong> if you&apos;re a tourist who wants one accountable company, free airport delivery, 24/7 English support, and a 4x4 ready for the mountains.</li>
        <li><strong>Choose Local Rent</strong> if you want to compare many suppliers and are comfortable vetting each one.</li>
        <li><strong>Choose Premium Auto Rent</strong> if your priority is a premium sedan for city driving.</li>
      </ul>

      <div className="not-prose mt-10 rounded-xl bg-primary/10 p-6">
        <p className="mb-3 text-lg font-semibold text-foreground">
          Ready to explore Georgia?
        </p>
        <Link
          href="/fleet"
          className="inline-flex rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90"
        >
          Browse the Geolander fleet →
        </Link>
      </div>
    </div>
  );
}
