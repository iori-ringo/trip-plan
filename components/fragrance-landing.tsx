"use client";

import type { CSSProperties, PointerEvent } from "react";
import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform
} from "framer-motion";
import { DropHalfBottom } from "@phosphor-icons/react";

const softEase = [0.236, 0.618, 0.382, 1] as const;
const phiDuration = {
  sm: 0.1,
  md: 0.162,
  lg: 0.262,
  xl: 0.424,
  "2xl": 0.685,
  "3xl": 1.109
} as const;

const reveal = {
  hidden: { opacity: 0, y: 26, filter: "blur(8px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)" }
};

const revealGroup = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: phiDuration.md
    }
  }
};

const conceptLines = [
  "アフリカの太陽に照らされた大地、",
  "風化した木の静けさ、湿った苔の",
  "やわらかな気配。アンバーの光と",
  "自然のぬくもりを、都会的な洗練で",
  "包み込んだ香り。"
];

const storyLines = [
  "それは、旅先でふと触れた",
  "光や空気の記憶。",
  "乾いた木肌、やわらかな熱、",
  "そして肌になじむ静かな余韻。",
  "SOLAR MOSSは、自然の温度と",
  "洗練が溶け合う、個人的で美しい",
  "ストーリーをまとわせます。"
];

type NoteIconKind = "top" | "heart" | "base";
type NavTone = "dark" | "light";

const noteCards: Array<{
  title: string;
  notes: string;
  icon: NoteIconKind;
}> = [
  {
    title: "Top Notes",
    notes: "Bergamot / Lemon / Neroli / African Marigold",
    icon: "top"
  },
  {
    title: "Heart Notes",
    notes: "Violet / Jasmine Petals / Cyclamen",
    icon: "heart"
  },
  {
    title: "Base Notes",
    notes: "Black Amber / Musk / Vetiver / Cedarwood",
    icon: "base"
  }
];

const productRows = [
  ["Product", "AURELIA NOON SOLAR MOSS"],
  ["Type", "Eau de Parfum"],
  ["Size", "50ml / 100ml"],
  ["Price", "from ¥18,400"],
  ["Features", "Moss / Amber / Cedar / Warm Light"]
];

const navigationItems = [
  ["01", "Hero", "#hero"],
  ["02", "Concept", "#concept"],
  ["03", "Notes", "#notes"],
  ["04", "Story", "#story"],
  ["05", "Detail", "#product-detail"],
  ["06", "Shop", "#final-cta"]
];

const assets = {
  hero: "/assets/fragrance/solar-moss-hero.png",
  concept: "/assets/fragrance/solar-moss-concept.png",
  story: "/assets/fragrance/solar-moss-story.png",
  product: "/assets/fragrance/solar-moss-product.png",
  final: "/assets/fragrance/solar-moss-final.png"
};

export function FragranceLanding() {
  return (
    <main className="lp-shell min-h-screen overflow-hidden text-ivoryWarm">
      <PageProgress />
      <ExperienceNav />
      <DustField />
      <CursorGlow />
      <HeroSection />
      <ConceptSection />
      <FragranceNotesSection />
      <StorySection />
      <ProductDetailSection />
      <FinalCtaSection />
    </main>
  );
}

function CursorGlow() {
  const shouldReduceMotion = useReducedMotion();
  const x = useMotionValue(-420);
  const y = useMotionValue(-420);
  const opacity = useMotionValue(0);
  const springX = useSpring(x, {
    stiffness: shouldReduceMotion ? 900 : 150,
    damping: shouldReduceMotion ? 90 : 28,
    mass: 0.24
  });
  const springY = useSpring(y, {
    stiffness: shouldReduceMotion ? 900 : 150,
    damping: shouldReduceMotion ? 90 : 28,
    mass: 0.24
  });
  const springOpacity = useSpring(opacity, {
    stiffness: 180,
    damping: 26,
    mass: 0.2
  });

  useEffect(() => {
    const cursorQuery = window.matchMedia("(pointer: coarse)");

    if (cursorQuery.matches) {
      return undefined;
    }

    function handlePointerMove(event: globalThis.PointerEvent) {
      x.set(event.clientX - 190);
      y.set(event.clientY - 190);
      opacity.set(1);
    }

    function handlePointerLeave() {
      opacity.set(0);
    }

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("blur", handlePointerLeave);
    document.documentElement.addEventListener("mouseleave", handlePointerLeave);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("blur", handlePointerLeave);
      document.documentElement.removeEventListener("mouseleave", handlePointerLeave);
    };
  }, [opacity, x, y]);

  return (
    <motion.div
      aria-hidden="true"
      className="cursor-glow"
      style={{ opacity: springOpacity, x: springX, y: springY }}
    />
  );
}

function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const pointerX = useMotionValue(0.72);
  const pointerY = useMotionValue(0.16);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  });
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 28,
    mass: 0.32
  });

  const sceneScale = useTransform(
    smoothProgress,
    [0, 1],
    shouldReduceMotion ? [1, 1] : [1.025, 1.008]
  );
  const textY = useTransform(
    smoothProgress,
    [0, 1],
    shouldReduceMotion ? [0, 0] : [0, -44]
  );

  const glowX = useTransform(pointerX, [0, 1], ["46%", "90%"]);
  const glowY = useTransform(pointerY, [0, 1], ["4%", "36%"]);
  const interactiveGlow = useMotionTemplate`radial-gradient(circle at ${glowX} ${glowY}, rgba(242, 177, 93, 0.35), transparent 36%)`;

  function handlePointerMove(event: PointerEvent<HTMLElement>) {
    if (shouldReduceMotion) {
      return;
    }

    const rect = event.currentTarget.getBoundingClientRect();
    pointerX.set((event.clientX - rect.left) / rect.width);
    pointerY.set((event.clientY - rect.top) / rect.height);
  }

  return (
    <section
      ref={sectionRef}
      id="hero"
      data-nav-tone="dark"
      className="relative isolate min-h-[100dvh] overflow-hidden bg-[#100905]"
      onPointerMove={handlePointerMove}
    >
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-90 mix-blend-screen"
        style={{ backgroundImage: interactiveGlow }}
      />
      <motion.div
        aria-hidden="true"
        className="hero-sun pointer-events-none absolute -right-[10%] -top-[20%] h-phi-8xl w-phi-8xl rounded-full"
        initial={{ opacity: 0, scale: 0.84 }}
        animate={
          shouldReduceMotion
            ? { opacity: 0.54, scale: 1 }
            : { opacity: [0.2, 0.64, 0.5], scale: [0.92, 1.04, 0.98] }
        }
        transition={{ duration: 6.854, ease: "easeInOut", repeat: shouldReduceMotion ? 0 : Infinity }}
      />
      <div aria-hidden="true" className="hero-beams absolute inset-0" />
      <div aria-hidden="true" className="sunlight-shafts absolute inset-0" />
      <div aria-hidden="true" className="hero-glass-glint absolute inset-0" />
      <motion.div
        className="hero-microcopy hidden lg:block"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: phiDuration["2xl"], delay: phiDuration.xl, ease: softEase }}
      >
        <span>Eau de Parfum</span>
        <span>Amber / Woody / Luminous</span>
      </motion.div>
      <div className="relative z-[1] mx-auto grid min-h-[100dvh] max-w-phi-page grid-cols-1 px-phi-md pb-phi-6xl pt-phi-2xl md:px-phi-lg md:pt-phi-3xl lg:grid-cols-[minmax(0,0.618fr)_minmax(0,1fr)] lg:pb-0">
        <motion.div
          className="max-w-phi-copy-lg self-start"
          style={{ y: textY }}
          variants={revealGroup}
          initial="hidden"
          animate="visible"
        >
          <motion.p
            className="font-display text-title3 leading-phi-half text-[#dcb56d]"
            variants={reveal}
            transition={{ duration: phiDuration["2xl"], ease: softEase }}
          >
            Sunlit botanical accord
          </motion.p>
          <motion.h1
            className="mt-phi-sm font-display text-display2 font-normal leading-phi-quarter tracking-normal text-[#e7c78b] md:text-display1 lg:whitespace-nowrap"
            variants={reveal}
            transition={{ duration: phiDuration["3xl"], ease: softEase }}
          >
            SOLAR MOSS
          </motion.h1>
          <motion.p
            className="mt-phi-lg max-w-phi-prose font-serifjp text-body leading-phi tracking-normal text-[#e8cf9f] md:text-title3"
            variants={reveal}
            transition={{ duration: phiDuration["2xl"], ease: softEase }}
          >
            太陽の余韻、アンバーのぬくもり。
            <br />
            肌に静かに残る、旅の記憶。
          </motion.p>
          <motion.div
            className="mt-phi-xl"
            variants={reveal}
            transition={{ duration: phiDuration["2xl"], ease: softEase }}
          >
            <LuxuryButton href="#concept">Discover the Accord</LuxuryButton>
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        aria-hidden="true"
        className="hero-photo-layer"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.618, delay: phiDuration.md, ease: softEase }}
      >
        <Image
          src={assets.hero}
          alt=""
          fill
          priority
          sizes="100vw"
          className="hero-photo hero-photo-backdrop"
        />
        <motion.div
          className="hero-photo-zoom"
          style={{ scale: sceneScale }}
        >
          <motion.div
            className="hero-photo-ambient"
            animate={
              shouldReduceMotion
                ? undefined
                : { scale: [1, 1.006, 1] }
            }
            transition={{ duration: 13.708, repeat: Infinity, ease: "easeInOut" }}
          >
            <Image
              src={assets.hero}
              alt=""
              fill
              priority
              sizes="100vw"
              className="hero-photo"
            />
          </motion.div>
          <motion.span
            aria-hidden="true"
            className="hero-photo-sheen"
            animate={shouldReduceMotion ? undefined : { x: ["-10%", "14%", "-10%"], opacity: [0, 0.26, 0] }}
            transition={{ duration: 12.944, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </motion.div>
      <div aria-hidden="true" className="hero-moss-depth" />
      <ScrollCue />
    </section>
  );
}

function ConceptSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  const lightX = useTransform(
    scrollYProgress,
    [0, 1],
    shouldReduceMotion ? ["46%", "46%"] : ["18%", "78%"]
  );
  const backgroundLight = useMotionTemplate`radial-gradient(circle at ${lightX} 24%, rgba(221, 178, 113, 0.32), transparent 32%)`;
  const nearY = useTransform(scrollYProgress, [0, 1], shouldReduceMotion ? [0, 0] : [32, -28]);
  const materialX = useTransform(scrollYProgress, [0, 1], shouldReduceMotion ? [0, 0] : [-16, 14]);
  const materialScale = useTransform(scrollYProgress, [0, 1], shouldReduceMotion ? [1, 1] : [1.08, 1.03]);

  return (
    <section
      ref={sectionRef}
      id="concept"
      data-nav-tone="light"
      className="relative isolate overflow-hidden bg-[#eee6d7] px-phi-md py-phi-xl text-[#1e160e] md:px-phi-lg md:py-phi-2xl lg:py-phi-3xl"
    >
      <motion.div
        aria-hidden="true"
        className="absolute inset-0 opacity-80"
        style={{ backgroundImage: backgroundLight }}
      />
      <div className="relative mx-auto grid max-w-phi-page grid-cols-1 gap-phi-xl lg:grid-cols-[minmax(0,0.618fr)_minmax(0,1fr)] lg:items-center lg:gap-phi-2xl">
        <motion.div
          variants={revealGroup}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.35 }}
          className="max-w-phi-prose"
        >
          <SectionHeading label="Concept" tone="dark" />
          <RevealedLines lines={conceptLines} className="mt-phi-lg max-w-phi-prose font-serifjp text-body leading-phi tracking-normal md:text-title3" />
        </motion.div>
        <motion.div
          className="photo-panel concept-photo-panel min-h-phi-5xl overflow-hidden lg:min-h-phi-6xl"
          initial={{ opacity: 0, y: 34, filter: "blur(8px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: phiDuration["3xl"], ease: softEase }}
          style={{ y: nearY }}
        >
          <motion.div
            className="photo-motion-fill concept-photo-motion"
            style={{ x: materialX, scale: materialScale }}
          >
            <Image
              src={assets.concept}
              alt="流木、石、枝、若芽を柔らかな光で撮影した自然素材"
              fill
              sizes="(min-width: 1024px) 58vw, 100vw"
              className="photo-panel-image concept-photo"
            />
          </motion.div>
          <motion.span
            aria-hidden="true"
            className="concept-photo-glint"
            animate={shouldReduceMotion ? undefined : { x: ["-28%", "18%", "-28%"], opacity: [0, 0.46, 0] }}
            transition={{ duration: 7.854, repeat: Infinity, ease: "easeInOut" }}
          />
          <div aria-hidden="true" className="concept-scent-orbit concept-scent-orbit-one" />
          <div aria-hidden="true" className="concept-scent-orbit concept-scent-orbit-two" />
          <motion.div
            className="concept-shadow"
            animate={shouldReduceMotion ? undefined : { opacity: [0.28, 0.42, 0.3], x: [-4, 6, -2] }}
            transition={{ duration: 6.854, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </div>
    </section>
  );
}

function FragranceNotesSection() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="notes"
      data-nav-tone="dark"
      className="relative isolate overflow-hidden bg-[linear-gradient(112deg,#0f1a12_0%,#172314_48%,#10180f_100%)] px-phi-md py-phi-xl md:px-phi-lg md:py-phi-2xl lg:py-phi-3xl"
    >
      <motion.div
        aria-hidden="true"
        className="absolute inset-0 opacity-50"
        animate={shouldReduceMotion ? undefined : { x: ["-8%", "8%", "-6%"] }}
        transition={{ duration: 11.089, repeat: Infinity, ease: "easeInOut" }}
        style={{
          background:
            "linear-gradient(105deg, transparent 14%, rgba(205, 149, 66, 0.16) 44%, transparent 70%)"
        }}
      />
      <motion.div
        aria-hidden="true"
        className="notes-trail-word"
        animate={shouldReduceMotion ? undefined : { x: ["-2%", "3%", "-1%"] }}
        transition={{ duration: 17.944, repeat: Infinity, ease: "easeInOut" }}
      >
        TOP · HEART · BASE
      </motion.div>
      <div className="relative mx-auto max-w-phi-page">
        <motion.div
          className="text-center"
          variants={revealGroup}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.45 }}
        >
          <SectionHeading label="Fragrance Notes" align="center" />
        </motion.div>
        <motion.div
          className="mt-phi-xl grid grid-cols-1 gap-phi-md md:grid-cols-3 lg:gap-phi-lg"
          variants={revealGroup}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {noteCards.map((card, index) => (
            <NoteCard key={card.title} card={card} index={index} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function StorySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  const zoom = useTransform(scrollYProgress, [0, 1], shouldReduceMotion ? [1, 1] : [1, 1.12]);
  const drift = useTransform(scrollYProgress, [0, 1], shouldReduceMotion ? [0, 0] : [26, -24]);
  const driftX = useTransform(scrollYProgress, [0, 1], shouldReduceMotion ? [0, 0] : [-14, 16]);
  const imageRotate = useTransform(scrollYProgress, [0, 1], shouldReduceMotion ? [0, 0] : [-0.8, 0.8]);

  return (
    <section
      ref={sectionRef}
      id="story"
      data-nav-tone="light"
      className="relative isolate overflow-hidden bg-[#efe8dc] px-phi-md py-phi-xl text-[#20170f] md:px-phi-lg md:py-phi-2xl lg:py-phi-3xl"
    >
      <div className="relative mx-auto grid max-w-phi-page grid-cols-1 gap-phi-xl lg:grid-cols-[minmax(0,0.618fr)_minmax(0,1fr)] lg:items-center lg:gap-phi-2xl">
        <motion.div
          variants={revealGroup}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.36 }}
          className="max-w-phi-prose"
        >
          <SectionHeading label="Story" tone="dark" />
          <RevealedLines lines={storyLines} className="mt-phi-lg max-w-phi-prose font-serifjp text-body leading-phi tracking-normal md:text-title3" />
        </motion.div>
        <motion.div
          className="story-visual photo-panel min-h-phi-6xl overflow-hidden"
          data-nav-tone="dark"
          style={{ scale: zoom }}
        >
          <motion.div className="story-photo-motion" style={{ x: driftX, y: drift, rotate: imageRotate }}>
            <Image
              src={assets.story}
              alt="アンバーのガラス反射と流木のクローズアップ"
              fill
              sizes="(min-width: 1024px) 62vw, 100vw"
              className="photo-panel-image story-photo"
            />
          </motion.div>
          <span className="caustic caustic-one" />
          <span className="caustic caustic-two" />
          <span className="caustic caustic-three" />
          <motion.span
            aria-hidden="true"
            className="story-light-ribbon"
            animate={shouldReduceMotion ? undefined : { x: ["-22%", "16%", "-22%"], opacity: [0.12, 0.4, 0.16] }}
            transition={{ duration: 9.236, repeat: Infinity, ease: "easeInOut" }}
          />
          <div className="story-amber-haze" />
        </motion.div>
      </div>
    </section>
  );
}

function ProductDetailSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  const bottleY = useTransform(scrollYProgress, [0, 1], shouldReduceMotion ? [0, 0] : [28, -30]);
  const pointerX = useMotionValue(0.5);
  const pointerY = useMotionValue(0.5);
  const productImageX = useTransform(pointerX, [0, 1], shouldReduceMotion ? [0, 0] : [-12, 12]);
  const productImageY = useTransform(pointerY, [0, 1], shouldReduceMotion ? [0, 0] : [8, -8]);
  const productLightX = useTransform(pointerX, [0, 1], ["28%", "74%"]);
  const productLightY = useTransform(pointerY, [0, 1], ["20%", "68%"]);
  const productInteractiveLight = useMotionTemplate`radial-gradient(circle at ${productLightX} ${productLightY}, rgba(226, 180, 104, 0.34), transparent 34%)`;

  function handleProductPointerMove(event: PointerEvent<HTMLElement>) {
    if (shouldReduceMotion) {
      return;
    }

    const rect = event.currentTarget.getBoundingClientRect();
    pointerX.set((event.clientX - rect.left) / rect.width);
    pointerY.set((event.clientY - rect.top) / rect.height);
  }

  function handleProductPointerLeave() {
    pointerX.set(0.5);
    pointerY.set(0.5);
  }

  return (
    <section
      id="product-detail"
      ref={sectionRef}
      data-nav-tone="light"
      className="relative isolate overflow-hidden bg-[#f2eadf] px-phi-md py-phi-xl text-[#21170f] md:px-phi-lg md:py-phi-2xl lg:py-phi-3xl"
    >
      <div className="relative mx-auto grid max-w-phi-page grid-cols-1 gap-phi-xl lg:grid-cols-[minmax(0,1fr)_minmax(0,0.618fr)] lg:items-center lg:gap-phi-2xl">
        <motion.div
          className="product-scene product-photo-scene min-h-phi-6xl"
          style={{ y: bottleY }}
          onPointerMove={handleProductPointerMove}
          onPointerLeave={handleProductPointerLeave}
          whileHover={shouldReduceMotion ? undefined : { scale: 1.012 }}
          transition={{ type: "spring", stiffness: 110, damping: 22 }}
        >
          <motion.div className="product-photo-motion" style={{ x: productImageX, y: productImageY }}>
            <div className="product-photo-breathe">
              <Image
                src={assets.product}
                alt="大小の香水瓶と植物を柔らかな自然光で撮影した商品写真"
                fill
                loading="eager"
                sizes="(min-width: 1024px) 48vw, 100vw"
                className="product-photo"
              />
            </div>
          </motion.div>
          <motion.div
            aria-hidden="true"
            className="product-interactive-light"
            style={{ backgroundImage: productInteractiveLight }}
          />
          <span aria-hidden="true" className="product-scent-ring product-scent-ring-one" />
          <span aria-hidden="true" className="product-scent-ring product-scent-ring-two" />
          <div className="product-reflection" />
        </motion.div>
        <motion.div
          variants={revealGroup}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.35 }}
          className="lg:pl-phi-md"
        >
          <SectionHeading label="Product Detail" tone="dark" />
          <div className="mt-phi-lg divide-y divide-[#7a6a56]/35">
            {productRows.map(([label, value], index) => (
              <motion.div
                key={label}
                className="product-row relative grid grid-cols-[6.854rem_1fr] gap-phi-md py-phi-sm text-subheading leading-phi-half sm:grid-cols-[11.089rem_1fr] sm:text-body"
                variants={reveal}
                transition={{ duration: phiDuration["2xl"], delay: index * (phiDuration.sm / 2), ease: softEase }}
              >
                <span className="font-semibold text-[#16100b]">{label}</span>
                <span className="text-[#392919]">{value}</span>
                <motion.span
                  aria-hidden="true"
                  className="absolute bottom-0 left-0 h-px w-full origin-left bg-[#b88a43]/55"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: phiDuration["3xl"], delay: phiDuration.md + index * phiDuration.sm, ease: softEase }}
                />
              </motion.div>
            ))}
          </div>
          <motion.div
            className="product-services"
            variants={reveal}
            transition={{ duration: phiDuration["2xl"], delay: phiDuration.md, ease: softEase }}
          >
            <DropHalfBottom size={22} weight="thin" />
            <span>Try the scent first. Free returns within 30 days.</span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function FinalCtaSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  const mossY = useTransform(scrollYProgress, [0, 1], shouldReduceMotion ? [0, 0] : [42, -46]);
  const mossScale = useTransform(scrollYProgress, [0, 1], shouldReduceMotion ? [1, 1] : [1.1, 1.02]);
  const mossRotate = useTransform(scrollYProgress, [0, 1], shouldReduceMotion ? [0, 0] : [-0.8, 0.6]);
  const lightX = useTransform(scrollYProgress, [0, 1], shouldReduceMotion ? ["58%", "58%"] : ["42%", "74%"]);
  const flowingLight = useMotionTemplate`radial-gradient(circle at ${lightX} 56%, rgba(214, 164, 81, 0.32), transparent 34%)`;

  return (
    <section
      ref={sectionRef}
      id="final-cta"
      data-nav-tone="dark"
      className="relative isolate overflow-hidden bg-[linear-gradient(115deg,#100b07_0%,#1e1209_48%,#4c2c13_100%)] px-phi-md py-phi-2xl text-center md:px-phi-lg md:py-phi-3xl"
    >
      <motion.div
        aria-hidden="true"
        className="absolute inset-0 opacity-85"
        style={{ backgroundImage: flowingLight }}
      />
      <motion.div
        aria-hidden="true"
        className="final-photo-layer"
        style={{ y: mossY }}
      >
        <motion.div className="final-photo-motion" style={{ scale: mossScale, rotate: mossRotate }}>
          <Image
            src={assets.final}
            alt=""
            fill
            sizes="100vw"
            className="final-photo"
          />
        </motion.div>
        <motion.span
          aria-hidden="true"
          className="final-photo-sweep"
          animate={shouldReduceMotion ? undefined : { x: ["-34%", "26%", "-34%"], opacity: [0, 0.5, 0] }}
          transition={{ duration: 8.854, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
      <div aria-hidden="true" className="final-caustics absolute bottom-0 right-0 h-full w-[61.8%]" />
      <motion.div
        className="relative mx-auto max-w-phi-page"
        variants={revealGroup}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.55 }}
      >
        <motion.h2
          className="font-display text-display2 font-normal leading-phi-quarter tracking-normal text-[#efe2c8] md:text-display1"
          variants={reveal}
          transition={{ duration: phiDuration["3xl"], ease: softEase }}
        >
          A lingering warmth,
          <br />
          close to the skin.
        </motion.h2>
        <motion.div
          aria-hidden="true"
          className="mx-auto mt-phi-lg h-px w-phi-2xl bg-[#c99b50]"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: phiDuration["2xl"], ease: softEase }}
        />
        <motion.div
          className="mt-phi-xl flex flex-col items-center justify-center gap-phi-md sm:flex-row sm:gap-phi-lg"
          variants={reveal}
          transition={{ duration: phiDuration["2xl"], ease: softEase }}
        >
          <LuxuryButton href="#product-detail" variant="filled">Reserve Sample</LuxuryButton>
          <LuxuryButton href="#notes">View Details</LuxuryButton>
        </motion.div>
      </motion.div>
    </section>
  );
}

function PageProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 24,
    mass: 0.28
  });

  return <motion.div aria-hidden="true" className="page-progress" style={{ scaleX }} />;
}

function ExperienceNav() {
  const navRef = useRef<HTMLElement>(null);
  const [toneByHref, setToneByHref] = useState<Record<string, NavTone>>({});

  useEffect(() => {
    let frameId = 0;

    function detectTone() {
      frameId = 0;
      const navElement = navRef.current;

      if (!navElement) {
        return;
      }

      const nextTones: Record<string, NavTone> = {};

      navElement.querySelectorAll<HTMLAnchorElement>("[data-nav-target]").forEach((anchor) => {
        const rect = anchor.getBoundingClientRect();
        const target = anchor.dataset.navTarget;

        if (!target || rect.width === 0 || rect.height === 0) {
          return;
        }

        const x = rect.left + rect.width * 0.58;
        const y = rect.top + rect.height * 0.5;
        const section = document
          .elementsFromPoint(x, y)
          .filter((element) => !navElement.contains(element))
          .map((element) => element.closest("[data-nav-tone]") as HTMLElement | null)
          .find((candidate): candidate is HTMLElement => Boolean(candidate));

        nextTones[target] = section?.dataset.navTone === "light" ? "light" : "dark";
      });

      setToneByHref((currentTones) => {
        const hasChanged = navigationItems.some(([, , href]) => currentTones[href] !== nextTones[href]);

        return hasChanged ? nextTones : currentTones;
      });
    }

    function scheduleDetection() {
      if (frameId !== 0) {
        return;
      }

      frameId = window.requestAnimationFrame(detectTone);
    }

    detectTone();
    window.addEventListener("scroll", scheduleDetection, { passive: true });
    window.addEventListener("resize", scheduleDetection);

    return () => {
      if (frameId !== 0) {
        window.cancelAnimationFrame(frameId);
      }

      window.removeEventListener("scroll", scheduleDetection);
      window.removeEventListener("resize", scheduleDetection);
    };
  }, []);

  return (
    <nav ref={navRef} className="experience-nav" aria-label="Landing page sections">
      {navigationItems.map(([index, label, href]) => (
        <a
          key={href}
          href={href}
          data-nav-target={href}
          className={`experience-nav-link experience-nav-link-${toneByHref[href] ?? "dark"}`}
        >
          <span>{index}</span>
          <span>{label}</span>
        </a>
      ))}
    </nav>
  );
}

function ScrollCue() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.a
      href="#concept"
      className="scroll-cue"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: phiDuration["2xl"], delay: phiDuration["3xl"], ease: softEase }}
    >
      <span>Scroll</span>
      <motion.i
        aria-hidden="true"
        animate={shouldReduceMotion ? undefined : { scaleY: [0.35, 1, 0.35], opacity: [0.45, 0.9, 0.45] }}
        transition={{ duration: 2.618, repeat: Infinity, ease: "easeInOut" }}
      />
    </motion.a>
  );
}

function SectionHeading({
  label,
  tone = "light",
  align = "left"
}: {
  label: string;
  tone?: "light" | "dark";
  align?: "left" | "center";
}) {
  const lineClass = tone === "dark" ? "bg-[#b98d45]" : "bg-[#c79a4c]";

  return (
    <motion.div
      className={align === "center" ? "text-center" : "text-left"}
      variants={reveal}
      transition={{ duration: phiDuration["2xl"], ease: softEase }}
    >
      <h2
        className={`font-display text-title2 font-normal leading-phi-half tracking-normal md:text-display2 md:leading-phi-quarter ${
          tone === "dark" ? "text-[#20170f]" : "text-[#eee1c9]"
        }`}
      >
        {label}
      </h2>
      <motion.span
        aria-hidden="true"
        className={`mt-phi-sm block h-px w-phi-2xl origin-left ${lineClass} ${align === "center" ? "mx-auto" : ""}`}
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: phiDuration["2xl"], ease: softEase }}
      />
    </motion.div>
  );
}

function RevealedLines({
  lines,
  className
}: {
  lines: string[];
  className?: string;
}) {
  return (
    <motion.div className={className} variants={revealGroup}>
      {lines.map((line) => (
        <motion.p
          key={line}
          variants={reveal}
          transition={{ duration: phiDuration["2xl"], ease: softEase }}
        >
          {line}
        </motion.p>
      ))}
    </motion.div>
  );
}

function NoteCard({
  card,
  index
}: {
  card: (typeof noteCards)[number];
  index: number;
}) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.article
      className="note-card group relative min-h-phi-5xl overflow-hidden p-phi-lg text-center"
      variants={reveal}
      transition={{ duration: phiDuration["2xl"], delay: index * phiDuration.sm, ease: softEase }}
      whileHover={shouldReduceMotion ? undefined : { y: -4 }}
    >
      <NoteBorder delay={index * phiDuration.sm} />
      <motion.div
        className="note-icon-shell mx-auto flex h-phi-3xl w-phi-3xl items-center justify-center"
        animate={shouldReduceMotion ? undefined : { y: [0, -5, 0], rotate: index === 1 ? [0, 3, 0] : [0, -2, 0] }}
        transition={{ duration: 4.236 + index * phiDuration["2xl"], repeat: Infinity, ease: "easeInOut" }}
      >
        <RichNoteIcon kind={card.icon} />
      </motion.div>
      <h3 className="mt-phi-md text-label font-semibold uppercase leading-phi-tight tracking-normal text-[#d6ad67]">
        {card.title}
      </h3>
      <p className="mx-auto mt-phi-md max-w-phi-card text-body leading-phi text-[#efe6d8]">
        {card.notes}
      </p>
    </motion.article>
  );
}

function RichNoteIcon({ kind }: { kind: NoteIconKind }) {
  const goldId = `note-gold-${kind}`;
  const glowId = `note-glow-${kind}`;

  return (
    <svg
      className="rich-note-icon"
      viewBox="0 0 96 96"
      role="img"
      aria-label={`${kind} fragrance note icon`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id={goldId} x1="18" y1="14" x2="80" y2="82" gradientUnits="userSpaceOnUse">
          <stop stopColor="#fff1be" />
          <stop offset="0.28" stopColor="#d9ad5f" />
          <stop offset="0.62" stopColor="#a87632" />
          <stop offset="1" stopColor="#f5d789" />
        </linearGradient>
        <radialGradient id={glowId} cx="0" cy="0" r="1" gradientTransform="matrix(30 33 -33 30 48 44)" gradientUnits="userSpaceOnUse">
          <stop stopColor="#ffe6a4" stopOpacity="0.34" />
          <stop offset="1" stopColor="#c58b3f" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle className="note-icon-halo" cx="48" cy="48" r="38" fill={`url(#${glowId})`} />
      {kind === "top" && <TopNotesIcon goldId={goldId} />}
      {kind === "heart" && <HeartNotesIcon goldId={goldId} />}
      {kind === "base" && <BaseNotesIcon goldId={goldId} />}
    </svg>
  );
}

function TopNotesIcon({ goldId }: { goldId: string }) {
  return (
    <>
      <path className="gold-stroke fine" d="M22 56c5-14 17-26 34-31" stroke={`url(#${goldId})`} />
      <path className="gold-stroke fine muted" d="M28 63c7-11 19-19 36-24" stroke={`url(#${goldId})`} />
      <circle className="gold-stroke" cx="38" cy="54" r="15" stroke={`url(#${goldId})`} />
      <circle className="gold-stroke fine" cx="38" cy="54" r="8.5" stroke={`url(#${goldId})`} />
      {Array.from({ length: 8 }).map((_, index) => {
        const angle = (index * Math.PI) / 4;
        const x = 38 + Math.cos(angle) * 8.5;
        const y = 54 + Math.sin(angle) * 8.5;

        return (
          <path
            key={index}
            className="gold-stroke fine"
            d={`M38 54 L${x.toFixed(2)} ${y.toFixed(2)}`}
            stroke={`url(#${goldId})`}
          />
        );
      })}
      <path className="gold-stroke" d="M54 32c10-6 18-4 23 3-8 6-17 7-24-1Z" stroke={`url(#${goldId})`} />
      <path className="gold-stroke fine muted" d="M57 33c6 1 12 2 18 2" stroke={`url(#${goldId})`} />
      <circle className="gold-dot" cx="60" cy="60" r="3.2" fill={`url(#${goldId})`} />
      <circle className="gold-stroke fine" cx="64" cy="58" r="6.4" stroke={`url(#${goldId})`} />
      <path className="gold-stroke fine" d="M64 51.6v12.8M57.6 58h12.8M59.5 53.5l9 9M68.5 53.5l-9 9" stroke={`url(#${goldId})`} />
      <path className="gold-stroke fine muted" d="M25 38c4-2 8-2 12 .5M48 72c5 1 10 .5 15-2.5" stroke={`url(#${goldId})`} />
    </>
  );
}

function HeartNotesIcon({ goldId }: { goldId: string }) {
  const petals = [
    "M48 17c5 8 5 16 0 23-5-7-5-15 0-23Z",
    "M64 25c-1 10-6 16-15 18 1-9 6-15 15-18Z",
    "M74 43c-8 6-16 7-24 2 7-5 15-6 24-2Z",
    "M62 63c-10-1-16-6-18-15 9 1 15 6 18 15Z",
    "M34 63c1-10 6-16 15-18-1 9-6 15-15 18Z",
    "M22 43c8-6 16-7 24-2-7 5-15 6-24 2Z",
    "M32 25c10 1 16 6 18 15-9-1-15-6-18-15Z"
  ];

  return (
    <>
      <circle className="gold-stroke fine muted" cx="48" cy="45" r="26" stroke={`url(#${goldId})`} />
      {petals.map((d) => (
        <path key={d} className="gold-stroke" d={d} stroke={`url(#${goldId})`} />
      ))}
      <circle className="gold-dot" cx="48" cy="45" r="4" fill={`url(#${goldId})`} />
      <circle className="gold-stroke fine" cx="48" cy="45" r="8.5" stroke={`url(#${goldId})`} />
      <path className="gold-stroke fine muted" d="M30 71c8-2 16-2 24 1s14 2 21-1" stroke={`url(#${goldId})`} />
      <path className="gold-stroke fine" d="M28 76c5-3 11-4 18-2" stroke={`url(#${goldId})`} />
      <path className="gold-stroke fine" d="M58 75c5 2 10 1 15-2" stroke={`url(#${goldId})`} />
    </>
  );
}

function BaseNotesIcon({ goldId }: { goldId: string }) {
  return (
    <>
      <path className="gold-stroke" d="M42 18c13 12 20 24 20 35 0 10-8 18-18 18-11 0-19-8-19-18 0-11 7-21 17-35Z" stroke={`url(#${goldId})`} />
      <path className="gold-stroke fine muted" d="M43 28c6 7 9 14 9 21 0 6-4 10-9 10-6 0-10-4-10-10 0-7 4-14 10-21Z" stroke={`url(#${goldId})`} />
      <path className="gold-stroke fine" d="M55 31c8 2 15 7 19 15 5 10 2 20-8 27" stroke={`url(#${goldId})`} />
      <path className="gold-stroke fine muted" d="M70 47c-8 6-14 12-18 22" stroke={`url(#${goldId})`} />
      <path className="gold-stroke fine" d="M24 62c-5 5-8 11-9 18M32 69c-6 3-10 8-12 14M42 72c-3 5-4 9-4 14M52 72c3 5 4 9 4 14M62 70c6 4 10 9 12 15" stroke={`url(#${goldId})`} />
      <path className="gold-stroke fine muted" d="M21 80c8-3 16-4 24-2s17 2 29-1" stroke={`url(#${goldId})`} />
      <circle className="gold-dot" cx="62" cy="37" r="2.8" fill={`url(#${goldId})`} />
    </>
  );
}

function NoteBorder({ delay }: { delay: number }) {
  const transition = { duration: phiDuration["2xl"], delay: phiDuration.sm + delay, ease: softEase };

  return (
    <>
      <motion.span className="note-line note-line-top" initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={transition} />
      <motion.span className="note-line note-line-right" initial={{ scaleY: 0 }} whileInView={{ scaleY: 1 }} viewport={{ once: true }} transition={transition} />
      <motion.span className="note-line note-line-bottom" initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={transition} />
      <motion.span className="note-line note-line-left" initial={{ scaleY: 0 }} whileInView={{ scaleY: 1 }} viewport={{ once: true }} transition={transition} />
    </>
  );
}

function LuxuryButton({
  children,
  href,
  variant = "outline"
}: {
  children: React.ReactNode;
  href: string;
  variant?: "outline" | "filled";
}) {
  const shouldReduceMotion = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 150, damping: 18, mass: 0.25 });
  const springY = useSpring(y, { stiffness: 150, damping: 18, mass: 0.25 });

  function handlePointerMove(event: PointerEvent<HTMLAnchorElement>) {
    if (shouldReduceMotion) {
      return;
    }

    const rect = event.currentTarget.getBoundingClientRect();
    x.set((event.clientX - rect.left - rect.width / 2) * 0.05);
    y.set((event.clientY - rect.top - rect.height / 2) * 0.08);
  }

  function handlePointerLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.a
      href={href}
      className={`luxury-button ${variant === "filled" ? "luxury-button-filled" : ""}`}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      style={{ x: springX, y: springY }}
      whileTap={{ scale: 0.985 }}
    >
      <span>{children}</span>
    </motion.a>
  );
}

function PerfumeBottle({ variant }: { variant: "hero" | "detail" | "mini" }) {
  return (
    <div className={`perfume-bottle perfume-bottle-${variant}`}>
      <div className="bottle-cap">
        <span className="cap-highlight" />
      </div>
      <div className="bottle-neck" />
      <div className="bottle-glass">
        <span className="glass-edge glass-edge-left" />
        <span className="glass-edge glass-edge-right" />
        <span className="glass-shine" />
        <span className="liquid-glow" />
        <span className="amber-liquid" />
        <div className="bottle-label">
          <span className="label-brand">AURELIA</span>
          <span className="label-name">SOLAR MOSS</span>
          <span className="label-type">EAU DE PARFUM</span>
        </div>
        <span className="bottle-base" />
      </div>
    </div>
  );
}

function Driftwood() {
  return (
    <div className="driftwood">
      <span className="wood-ridge wood-ridge-one" />
      <span className="wood-ridge wood-ridge-two" />
      <span className="wood-ridge wood-ridge-three" />
      <span className="wood-knot wood-knot-one" />
      <span className="wood-knot wood-knot-two" />
      <span className="wood-splinter wood-splinter-one" />
      <span className="wood-splinter wood-splinter-two" />
    </div>
  );
}

function MossBed({ density }: { density: "dense" | "soft" }) {
  const mossTufts = useMemo(
    () =>
      Array.from({ length: density === "dense" ? 72 : 46 }, (_, index) => ({
        left: `${(index * 17) % 104}%`,
        bottom: `${(index * 11) % 27}px`,
        height: `${12 + ((index * 13) % (density === "dense" ? 34 : 26))}px`,
        width: `${4 + ((index * 7) % 8)}px`,
        opacity: 0.38 + ((index * 9) % 42) / 100,
        delay: `${(index % 12) * 0.22}s`
      })),
    [density]
  );

  return (
    <div className={`moss-bed moss-bed-${density}`}>
      {mossTufts.map((tuft, index) => (
        <span
          key={`${density}-${index}`}
          className="moss-tuft"
          style={
            {
              left: tuft.left,
              bottom: tuft.bottom,
              height: tuft.height,
              width: tuft.width,
              opacity: tuft.opacity,
              "--tuft-delay": tuft.delay
            } as CSSProperties
          }
        />
      ))}
    </div>
  );
}

function PlantSprig() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      className="plant-sprig"
      animate={shouldReduceMotion ? undefined : { rotate: [-1, 1.4, -0.6] }}
      transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
    >
      {Array.from({ length: 8 }, (_, index) => (
        <span key={index} className={`plant-leaf plant-leaf-${index + 1}`} />
      ))}
      <span className="plant-stem" />
      <span className="plant-bud plant-bud-one" />
      <span className="plant-bud plant-bud-two" />
    </motion.div>
  );
}

function DustField() {
  const particles = useMemo(
    () =>
      Array.from({ length: 44 }, (_, index) => ({
        left: `${(index * 23) % 100}%`,
        top: `${(index * 37) % 100}%`,
        size: `${1 + ((index * 5) % 3)}px`,
        delay: `${(index % 13) * 0.55}s`,
        duration: `${12 + ((index * 7) % 10)}s`,
        opacity: 0.14 + ((index * 3) % 10) / 100
      })),
    []
  );

  return (
    <div aria-hidden="true" className="dust-field fixed inset-0 pointer-events-none">
      {particles.map((particle, index) => (
        <span
          key={index}
          className="dust-particle"
          style={
            {
              left: particle.left,
              top: particle.top,
              width: particle.size,
              height: particle.size,
              opacity: particle.opacity,
              "--dust-delay": particle.delay,
              "--dust-duration": particle.duration
            } as CSSProperties
          }
        />
      ))}
    </div>
  );
}
