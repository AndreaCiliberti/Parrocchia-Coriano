import React from 'react';
import { PageId } from '../types';
import { COMMUNITY_GROUPS } from '../data/siteData';

interface ComunitaParrocchialePageProps {
  onNavigate: (page: PageId) => void;
}

export const ComunitaParrocchialePage: React.FC<ComunitaParrocchialePageProps> = () => {
  return (
    <div className="font-sans text-[#324A6D] bg-white py-12 lg:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-16">
        {/* Header */}
        <h1 className="font-sans font-bold text-3xl sm:text-5xl text-[#1C244B]">
          Gruppi della parrocchia
        </h1>

        {/* Groups Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {COMMUNITY_GROUPS.map((group) => (
            <div
              key={group.id}
              className="bg-[#F9FAFD] rounded-3xl border border-gray-100 shadow-sm overflow-hidden flex flex-col justify-between"
            >
              <div>
                <div className="h-64 overflow-hidden bg-gray-100">
                  <img
                    loading="lazy"
                    src={group.image}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6 sm:p-8 space-y-4">
                  <h2 className="font-sans font-bold text-2xl text-[#1C244B]">
                    {group.name}
                  </h2>
                  <p className="text-sm sm:text-base text-[#324A6D] leading-relaxed">
                    {group.description}
                  </p>

                  {group.contactExtra && (
                    <div className="bg-white p-4 rounded-2xl border border-gray-200 text-sm space-y-1 font-medium text-[#1C244B]">
                      {group.contactExtra.phone && (
                        <p>Telefono: <a href={`tel:${group.contactExtra.phone}`} className="text-[#2358CD]">{group.contactExtra.phone}</a></p>
                      )}
                      {group.contactExtra.mail && (
                        <p>Email: <a href={`mailto:${group.contactExtra.mail}`} className="text-[#2358CD]">{group.contactExtra.mail}</a></p>
                      )}
                    </div>
                  )}
                </div>
              </div>

              <div className="p-6 sm:p-8 pt-0">
                <div className="text-xs sm:text-sm text-[#2358CD] font-semibold flex items-center">
                  <span className="mr-1.5">📍</span>
                  <span>Per saperne di più, chiedi del referente in segreteria.</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
