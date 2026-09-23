const rows = [
  [36, "3,5", "5,5", "22,5"],
  [37, "4", "6", "23"],
  [38, "5", "7", "24"],
  [39, "6", "8", "24,5"],
  [40, "6,5", "8,5", "25"],
  [41, "7,5", "9", "26"],
  [42, "8", "9,5", "26,5"],
  [43, "9", "10", "27,5"],
  [44, "9,5", "10,5", "28"],
  [45, "10,5", "11,5", "29"],
  [46, "11", "12", "29,5"],
  [47, "12", "13", "30,5"],
];

/** Richtwerte – je nach Hersteller abweichend, deshalb der Hinweis auf die Beratung */
export function SizeTable() {
  return (
    <section id="groessentabelle" className="page-x scroll-mt-6 pb-20">
      <div className="rounded-3xl border border-karte-rand bg-white p-6 lg:p-8">
        <h2 className="t-h3 text-nachtblau">Größentabelle</h2>
        <p className="mb-5 mt-2 text-[15px] text-text-muted">
          Richtwerte – jede Marke fällt etwas anders aus. Im Zweifel messen wir
          Ihren Fuß im Geschäft auf der Druckmessplatte.
        </p>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[420px] border-collapse text-left text-[15px]">
            <thead>
              <tr className="border-b-2 border-nachtblau text-nachtblau">
                <th scope="col" className="py-2.5 pr-4 font-extrabold">
                  EU
                </th>
                <th scope="col" className="py-2.5 pr-4 font-extrabold">
                  UK
                </th>
                <th scope="col" className="py-2.5 pr-4 font-extrabold">
                  US (Herren)
                </th>
                <th scope="col" className="py-2.5 font-extrabold">
                  Fußlänge (cm)
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map(([eu, uk, us, cm]) => (
                <tr key={eu} className="border-b border-linie">
                  <th
                    scope="row"
                    className="py-2.5 pr-4 font-extrabold text-nachtblau"
                  >
                    {eu}
                  </th>
                  <td className="py-2.5 pr-4">{uk}</td>
                  <td className="py-2.5 pr-4">{us}</td>
                  <td className="py-2.5">{cm}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
