import React from 'react';

interface LegalPageProps {
  title: string;
  html: string;
}

export const LegalPage: React.FC<LegalPageProps> = ({ title, html }) => {
  return (
    <div className="font-sans text-[#324A6D] bg-white py-12 lg:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-12">
        <h1 className="font-sans font-bold text-3xl sm:text-5xl text-[#1C244B]">
          {title}
        </h1>

        <div
          className="text-sm sm:text-base leading-relaxed break-words
            [&_h2]:font-bold [&_h2]:text-xl sm:[&_h2]:text-2xl [&_h2]:text-[#1C244B] [&_h2]:mt-10 [&_h2]:mb-4
            [&_h3]:font-semibold [&_h3]:text-lg [&_h3]:text-[#1C244B] [&_h3]:mt-8 [&_h3]:mb-3
            [&_h4]:font-semibold [&_h4]:text-[#1C244B] [&_h4]:mt-6 [&_h4]:mb-2
            [&_p]:mb-4 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-4 [&_li]:mb-1
            [&_a]:text-[#2358CD] [&_a]:underline hover:[&_a]:text-[#184CBF]
            [&_strong]:text-[#1C244B]"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>
    </div>
  );
};
