import Image from "next/image";
import { CrosshairRail } from "@/components/CrosshairRail";
import { SectionHeader } from "@/components/SectionHeader";
import { getServices } from "@/lib/content";
import { typeDeck, typeBodyFlush } from "@/lib/typography";

export function ServicesSection() {
  const services = getServices();

  return (
    <section
      id="services"
      aria-labelledby="capabilities-title"
      className="relative -mt-px m-0 bg-cream-1 text-text-dark"
    >
      <div className="mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-[50px]">
        <SectionHeader
          titleId="capabilities-title"
          subtitle={services.subtitle}
          title={services.title}
        />

        {services.items.map((item, index) => (
          <div key={item.number}>
            {index > 0 ? <CrosshairRail /> : null}
            <article className="grid grid-cols-1 items-center gap-8 py-8 lg:grid-cols-[minmax(0,463px)_minmax(0,322px)_minmax(0,428px)] lg:gap-[46px] lg:py-10 lg:min-h-[209px]">
              <div className="flex flex-col justify-center">
                <p className="font-sans text-base font-bold leading-6 tracking-[-0.01em]">
                  {item.number}
                </p>
                <h3 className={typeDeck}>{item.title}</h3>
                <p className="font-sans text-base font-bold leading-6 tracking-[-0.01em]">
                  {item.subtitle}
                </p>
              </div>
              <p className={typeBodyFlush}>{item.body}</p>
              <div className="relative h-[209px] w-full overflow-hidden rounded-sm">
                <Image
                  src={item.image}
                  alt={item.imageAlt}
                  fill
                  className="object-cover object-center"
                  sizes="(min-width: 1024px) 428px, 100vw"
                />
              </div>
            </article>
          </div>
        ))}
      </div>
    </section>
  );
}
