import type { Metadata } from "next";
import { brand } from "@/brand.config";
import { PageHero } from "@/components/PageHero";

export const metadata: Metadata = { title: "Datenschutz" };

export default function DatenschutzPage() {
  return (
    <>
      <PageHero
        crumbs={[{ href: "/", label: "Start" }, { label: "Datenschutzerklärung" }]}
        title="Datenschutzerklärung"
      />
      <div className="page-x py-10 lg:py-16">
        <div className="mx-auto max-w-3xl rounded-3xl border border-karte-rand bg-white p-6 text-[15px] leading-relaxed lg:p-10">
          <div className="space-y-6 text-text">
            <section>
              <h2 className="text-lg font-extrabold text-nachtblau">Verantwortlicher</h2>
              <p className="mt-2">
                {brand.legalName}<br />
                {brand.address.street}, {brand.address.zip} {brand.address.city}, Österreich<br />
                E-Mail: <a className="underline" href={`mailto:${brand.contact.email}`}>{brand.contact.email}</a><br />
                Telefon: {brand.contact.phoneDisplay}
              </p>
            </section>

            <section>
              <h2 className="text-lg font-extrabold text-nachtblau">Aufruf der Website und Hosting</h2>
              <p className="mt-2">
                Beim Aufruf der Website verarbeitet unser Hostinganbieter technisch erforderliche
                Verbindungsdaten, insbesondere IP-Adresse, Zeitpunkt des Aufrufs, aufgerufene URL,
                Browser- und Geräteinformationen sowie Statuscodes. Dies dient der sicheren
                Bereitstellung der Website, der Fehleranalyse und der Abwehr von Angriffen.
                Rechtsgrundlage ist unser berechtigtes Interesse nach Art. 6 Abs. 1 lit. f DSGVO.
                Serverprotokolle werden nur so lange aufbewahrt, wie dies für diese Zwecke
                erforderlich ist; bei sicherheitsrelevanten Vorfällen gegebenenfalls länger.
                Die Website wird über unseren Hostinganbieter bereitgestellt. Die verwendeten
                Schriftdateien liegen auf unserem Server.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-extrabold text-nachtblau">Lokaler Speicher und Cookies</h2>
              <p className="mt-2">
                Ihre Auswahl für externe Medien speichern wir unter „sss-cookie-consent“ im
                lokalen Speicher Ihres Browsers. Sie enthält die Auswahl, eine zufällige Kennung
                und den Zeitpunkt; sie wird nach 180 Tagen erneut abgefragt. Ihre im Shop
                gewählte Schuhgröße speichern wir unter „sss-groesse“ ebenfalls nur auf Ihrem
                Gerät, damit der Filter beim nächsten Besuch erhalten bleibt. Diese Angaben
                werden von uns nicht als Einwilligungsprotokoll an einen Server übertragen.
                Rechtsgrundlage für die dazu erforderliche Verarbeitung ist Art. 6 Abs. 1
                lit. f DSGVO. Sie können diese Daten in Ihrem Browser löschen und Ihre
                Auswahl jederzeit über „Cookie-Einstellungen“ im Footer ändern.
              </p>
              <p className="mt-2">
                Für die Verwaltung des geschützten Administrationsbereichs wird ein technisch
                erforderliches Sitzungscookie verwendet. Eine Statistik- oder Werbeanalyse
                ist auf dieser Website derzeit nicht eingebunden. Beim Weiterleiten zur
                Bezahlseite kann Stripe eigene Cookies und ähnliche Techniken einsetzen;
                dafür gelten die Angaben von Stripe.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-extrabold text-nachtblau">Kontakt und Terminanfragen</h2>
              <p className="mt-2">
                Die Terminanfrage öffnet auf Ihrem Gerät WhatsApp oder Ihr E-Mail-Programm
                mit einer vorausgefüllten Nachricht. Vor dem Absenden speichern wir die
                Eingaben nicht auf unserem Server. Wenn Sie uns schreiben oder anrufen,
                verarbeiten wir Ihre Kontaktdaten und den Inhalt Ihrer Anfrage zur
                Beantwortung und Terminvereinbarung (Art. 6 Abs. 1 lit. b DSGVO bei
                vorvertraglichen Anfragen, sonst Art. 6 Abs. 1 lit. f DSGVO).
                Wir löschen Anfragen, sobald sie für die Bearbeitung nicht mehr benötigt
                werden, sofern keine gesetzlichen Aufbewahrungspflichten bestehen.
                Bei Nutzung von WhatsApp verarbeitet auch der Anbieter Ihre Daten nach
                dessen eigenen Datenschutzbestimmungen. Sie können stattdessen E-Mail
                oder Telefon wählen.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-extrabold text-nachtblau">Google-Bewertungen und Karte</h2>
              <p className="mt-2">
                Bewertungen und Öffnungszeiten können über die Google Places API auf unserem
                Server abgerufen und auf der Website angezeigt werden. Bei diesem Abruf
                übermitteln wir keine IP-Adresse Ihres Browsers an Google. Die eingebettete
                Google-Karte auf der Kontaktseite wird erst nach Ihrer Zustimmung zur
                Kategorie „Externe Medien“ oder nach einem Klick auf „Google-Karte laden“
                geladen (Art. 6 Abs. 1 lit. a DSGVO). Dabei kann Google insbesondere Ihre
                IP-Adresse und Browserdaten erhalten und eigene Cookies setzen. Ihre
                Einwilligung können Sie jederzeit über „Cookie-Einstellungen“ widerrufen.
                Wenn Sie einen externen Google-Maps-Link anklicken, verlassen Sie unsere
                Website. Weitere Informationen finden Sie in der{" "}
                <a className="underline" href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">Datenschutzerklärung von Google</a>.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-extrabold text-nachtblau">Bestellungen und Zahlung</h2>
              <p className="mt-2">
                Für den Kauf werden Produkt, Preis und Bestellnummer an Stripe für eine
                Bezahlseite übermittelt. Name, E-Mail-Adresse, Versandanschrift und
                Zahlungsdaten geben Sie dort ein. Stripe verarbeitet diese Angaben zur
                Zahlungsabwicklung; wir erhalten die für Bestellung, Versand und
                Kundenservice erforderlichen Bestell- und Zahlungsinformationen.
                Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO. Soweit erforderlich,
                erhalten Versanddienstleister die Versanddaten; steuerlich relevante
                Unterlagen können an unsere Steuerberatung weitergegeben werden.
                Rechnungs- und Geschäftsunterlagen bewahren wir entsprechend den
                gesetzlichen Pflichten grundsätzlich sieben Jahre auf (Art. 6 Abs. 1
                lit. c DSGVO). Weitere Angaben zur Verarbeitung bei Stripe finden Sie in
                der <a className="underline" href="https://stripe.com/at/privacy" target="_blank" rel="noopener noreferrer">Datenschutzrichtlinie von Stripe</a>.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-extrabold text-nachtblau">Empfänger und Drittstaaten</h2>
              <p className="mt-2">
                Je nach Nutzung erhalten unser Hostinganbieter, Zahlungs- und
                Versanddienstleister sowie die oben genannten Anbieter Daten, soweit dies
                für ihre jeweilige Leistung erforderlich ist. Bei Google, WhatsApp und Stripe
                kann eine Verarbeitung außerhalb des Europäischen Wirtschaftsraums,
                insbesondere in den USA, stattfinden. Die Anbieter informieren über
                ihre jeweiligen Übermittlungsgrundlagen und Schutzmaßnahmen in ihren
                Datenschutzhinweisen.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-extrabold text-nachtblau">Ihre Rechte</h2>
              <p className="mt-2">
                Sie haben nach Maßgabe der DSGVO Rechte auf Auskunft, Berichtigung,
                Löschung, Einschränkung der Verarbeitung, Datenübertragbarkeit und
                Widerspruch gegen eine Verarbeitung auf Grundlage berechtigter
                Interessen. Einwilligungen können Sie jederzeit mit Wirkung für die
                Zukunft widerrufen. Wenden Sie sich dazu an die oben genannte
                E-Mail-Adresse. Sie können außerdem Beschwerde bei der{" "}
                <a className="underline" href="https://dsb.gv.at/" target="_blank" rel="noopener noreferrer">österreichischen Datenschutzbehörde</a> einlegen.
              </p>
              <p className="mt-2">
                Für eine Bestellung benötigen wir die zur Abwicklung genannten Angaben;
                ohne sie ist ein Kauf nicht möglich. Eine automatisierte Entscheidung
                einschließlich Profiling durch uns findet nicht statt.
              </p>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}
