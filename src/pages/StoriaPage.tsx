import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { PageId, StoriaBlock, StoriaContent, StoriaImage, StoriaLang, StoriaSection } from '../types';
import { STORIA_IT } from '../data/storiaContent';
import { STORIA_EN } from '../data/storiaContent.en';

const CONTENT: Record<StoriaLang, StoriaContent> = { it: STORIA_IT, en: STORIA_EN };

interface StoriaPageProps {
  onNavigate: (page: PageId) => void;
}

// All text shares one reading column with uniform paragraph spacing; a chapter's
// photos are collected as cards after its text.
const TEXT_COL = 'max-w-3xl space-y-5';

// The hash is used for routing, so chapter links scroll instead of using #anchors.
const scrollToId = (id: string) => {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

const Block: React.FC<{ block: StoriaBlock }> = ({ block }) => {
  if (block.type === 'quote') {
    return (
      <blockquote className="border-l-4 border-[#467FF7] bg-[#F9FAFD] rounded-r-2xl px-5 py-4 sm:px-6 sm:py-5">
        <p className="italic text-[#1C244B] leading-relaxed">«{block.text}»</p>
        {block.author && (
          <footer className="mt-2 text-sm font-semibold text-[#467FF7]">{block.author}</footer>
        )}
      </blockquote>
    );
  }

  if (block.type === 'list') {
    return (
      <div className="space-y-3">
        {block.heading && (
          <h4 className="font-semibold text-lg text-[#1C244B]">{block.heading}</h4>
        )}
        <ul className="space-y-5">
          {block.items.map((item, i) => (
            <li key={i} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 sm:p-6">
              {item.title && (
                <h5 className="font-semibold text-lg text-[#1C244B] mb-2">{item.title}</h5>
              )}
              <p className="leading-relaxed">{item.text}</p>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return <p className="leading-relaxed">{block.text}</p>;
};

const PhotoCard: React.FC<{
  image: StoriaImage;
  zoomLabel: string;
  onOpen: (image: StoriaImage) => void;
}> = ({ image, zoomLabel, onOpen }) => (
  <figure className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
    <button
      onClick={() => onOpen(image)}
      className="block w-full h-64 overflow-hidden bg-gray-100 cursor-zoom-in"
      aria-label={`${zoomLabel}: ${image.caption}`}
    >
      <img
        src={image.src}
        alt={image.caption}
        loading="lazy"
        className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-300"
      />
    </button>
    <figcaption className="p-5 text-sm text-[#324A6D] leading-snug">{image.caption}</figcaption>
  </figure>
);

const Section: React.FC<{ section: StoriaSection }> = ({ section }) => (
  <article id={section.id} className={`scroll-mt-28 ${TEXT_COL}`}>
    <h3 className="font-sans font-bold text-xl sm:text-2xl text-[#1C244B]">{section.title}</h3>
    {section.blocks.map((block, i) => (
      <Block key={i} block={block} />
    ))}
  </article>
);

export const StoriaPage: React.FC<StoriaPageProps> = ({ onNavigate }) => {
  const [lang, setLang] = useState<StoriaLang>('it');
  const [openImage, setOpenImage] = useState<StoriaImage | null>(null);
  const { heroImage, milestones, chapters, ui } = CONTENT[lang];

  useEffect(() => {
    if (!openImage) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpenImage(null);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [openImage]);

  return (
    <div lang={lang} className="font-sans text-[#324A6D] bg-white">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <img
          src={heroImage.src}
          alt={heroImage.caption}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[#1C244B]/70" />
        {/* Language switch: only on this page, outside the site menu */}
        <div className="absolute top-4 inset-x-0 z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-end">
          <button
            onClick={() => setLang(lang === 'it' ? 'en' : 'it')}
            aria-label={ui.switchAria}
            className="px-4 py-2 rounded-full bg-white text-sm font-semibold tracking-wide text-[#1C244B] shadow-md hover:text-[#467FF7] transition-colors cursor-pointer"
          >
            {ui.switchLabel}
          </button>
        </div>
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32 text-center text-white space-y-5">
          <p className="text-sm sm:text-base font-semibold tracking-widest uppercase text-[#B4D4DC]">
            {ui.eyebrow}
          </p>
          <h1 className="font-sans font-bold text-4xl sm:text-6xl">{ui.title}</h1>
          <p className="max-w-2xl mx-auto text-base sm:text-lg text-white/90 leading-relaxed">
            {ui.intro}
          </p>
        </div>
        <p className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-3 text-right text-[11px] text-white/60">
          {heroImage.caption}
        </p>
      </section>

      {/* Timeline */}
      <section className="bg-[#F9FAFD] py-12 lg:py-16 px-4 sm:px-6 lg:px-8 border-b border-gray-100">
        <div className="max-w-6xl mx-auto space-y-8">
          <h2 className="font-sans font-bold text-2xl sm:text-3xl text-[#1C244B] text-center">
            {ui.milestonesTitle}
          </h2>
          <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-4">
            {milestones.map((m) => (
              <li
                key={m.year}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 lg:text-center"
              >
                <p className="font-bold text-2xl text-[#467FF7]">{m.year}</p>
                <p className="text-sm leading-snug mt-1">{m.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Chapter index */}
      <nav className="py-10 px-4 sm:px-6 lg:px-8" aria-label={ui.chaptersNavLabel}>
        <div className="max-w-6xl mx-auto flex flex-wrap justify-center gap-3">
          {chapters.map((chapter) => (
            <button
              key={chapter.id}
              onClick={() => scrollToId(chapter.id)}
              className="px-4 py-2 rounded-full border border-[#B4D4DC] bg-white text-sm font-medium text-[#1C244B] hover:border-[#467FF7] hover:text-[#467FF7] transition-colors cursor-pointer"
            >
              <span className="text-[#467FF7] font-semibold mr-1.5">{chapter.number}.</span>
              {chapter.title}
            </button>
          ))}
        </div>
      </nav>

      {/* Chapters */}
      {chapters.map((chapter, index) => {
        const chapterImages = chapter.sections.flatMap((section) => section.images ?? []);
        return (
          <section
            key={chapter.id}
            id={chapter.id}
            className={`scroll-mt-20 py-14 lg:py-20 px-4 sm:px-6 lg:px-8 ${
              index % 2 === 1 ? 'bg-[#F9FAFD]' : 'bg-white'
            }`}
          >
            <div className="max-w-6xl mx-auto space-y-10">
              <header className={TEXT_COL}>
                <div className="space-y-2">
                  <p className="font-semibold text-[#467FF7] tracking-widest uppercase text-sm">
                    {ui.chapterLabel} {chapter.number}
                  </p>
                  <h2 className="font-sans font-bold text-3xl sm:text-4xl text-[#1C244B]">
                    {chapter.title}
                  </h2>
                </div>
                {chapter.intro?.map((text, i) => (
                  <p key={i} className="leading-relaxed">
                    {text}
                  </p>
                ))}
              </header>

              {chapter.sections.map((section) => (
                <Section key={section.id} section={section} />
              ))}

              {chapterImages.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
                  {chapterImages.map((image) => (
                    <PhotoCard
                      key={image.src}
                      image={image}
                      zoomLabel={ui.zoom}
                      onOpen={setOpenImage}
                    />
                  ))}
                </div>
              )}
            </div>
          </section>
        );
      })}

      {/* Bottom box */}
      <section className="py-12 lg:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto bg-[#B4D4DC]/50 rounded-3xl p-6 sm:p-8 border border-[#a2c9d2]/60 text-center space-y-4">
          <h3 className="font-sans font-bold text-2xl text-[#1C244B]">{ui.outroTitle}</h3>
          <p className="text-sm sm:text-base text-[#1C244B] max-w-2xl mx-auto">{ui.outroText}</p>
          <div className="pt-2 flex flex-wrap justify-center gap-3">
            <button onClick={() => onNavigate('orari-messe')} className="btn-elementor cursor-pointer">
              {ui.massTimes}
            </button>
            <button onClick={() => onNavigate('contatti')} className="btn-elementor cursor-pointer">
              {ui.contacts}
            </button>
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {openImage && (
        <div
          className="fixed inset-0 z-[60] bg-[#1C244B]/90 flex items-center justify-center p-4"
          onClick={() => setOpenImage(null)}
          role="dialog"
          aria-modal="true"
        >
          <button
            onClick={() => setOpenImage(null)}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 cursor-pointer"
            aria-label={ui.close}
          >
            <X className="w-6 h-6" />
          </button>
          <figure className="max-w-5xl w-full space-y-3" onClick={(e) => e.stopPropagation()}>
            <img
              src={openImage.src}
              alt={openImage.caption}
              className="max-h-[80vh] w-auto mx-auto rounded-xl"
            />
            <figcaption className="text-center text-sm text-white/90">{openImage.caption}</figcaption>
          </figure>
        </div>
      )}
    </div>
  );
};
