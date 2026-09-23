import Image from "next/image";
import { promiseSteps } from "@/brand.config";
import { Icon } from "../Icon";
import { SectionRidgeTop } from "../RidgeLine";

/** „Unser Beratungsversprechen“ – dunkler Abschnitt mit Grat-Oberkante (Desktop) */
export function PromiseSection() {
  return (
    <section className="relative mt-10 hidden bg-nachtblau text-white lg:block">
      <SectionRidgeTop />
      <div className="flex flex-col gap-14 px-16 pb-24 pt-[130px]">
        <div className="flex items-end gap-16">
          <div className="flex w-[min(560px,45%)] shrink-0 flex-col gap-4">
            <p className="t-eyebrow m-0 text-eisblau">
              Unser Beratungsversprechen
            </p>
            <h2 className="t-h2 text-white">
              Wir hören zu, bevor wir Schuhe zeigen.
            </h2>
            <p className="m-0 text-lg leading-relaxed text-hellblau">
              Eine gute Beratung dauert so lange, wie sie dauert. Deshalb
              empfehlen wir einen Termin – dann gehört die Zeit ganz Ihnen.
            </p>
            <a
              href="#termin"
              className="mt-2 flex h-[54px] items-center gap-2.5 self-start rounded-full bg-logogelb px-[26px] text-base font-extrabold text-nachtblau hover:brightness-95"
            >
              <Icon name="calendar" size={20} />
              Termin online wählen
            </a>
          </div>
          <div className="relative h-[300px] flex-1 overflow-hidden rounded-3xl bg-black">
            <Image
              src="/images/beratung-laufanalyse.jpg"
              alt="Laufanalyse auf dem Laufband"
              fill
              sizes="50vw"
              className="object-cover"
            />
            <div className="absolute bottom-5 left-5 h-32 w-[190px] overflow-hidden rounded-[14px] border-4 border-nachtblau">
              <Image
                src="/images/beratung-druckmessplatte.jpg"
                alt="Fußabdruck auf der Druckmessplatte"
                fill
                sizes="190px"
                className="object-cover"
              />
            </div>
          </div>
        </div>

        <ol className="m-0 grid list-none grid-cols-4 gap-8 p-0">
          {promiseSteps.map((s) => (
            <li
              key={s.step}
              className="flex flex-col gap-3 border-t-2 border-logoblau pt-[22px]"
            >
              <span className="text-sm font-extrabold uppercase tracking-[0.14em] text-logogelb">
                {s.step}
              </span>
              <h3 className="t-h3 text-white">{s.title}</h3>
              <p className="m-0 text-base leading-relaxed text-hellblau">
                {s.text}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
