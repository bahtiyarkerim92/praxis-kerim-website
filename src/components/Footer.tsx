"use client";


import Image from "next/image";
import { useI18n } from '../i18n';
export default function Footer() {
	const { t } = useI18n();
	return (
		<footer className="w-full bg-black text-white py-12 mt-20 border-t border-gray-800">
			<div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10">
				{/* Logo */}
				<div className="flex flex-col items-center md:items-start bg-black bg-opacity-80 rounded-2xl p-6">
					<Image
						src="/images/logo.png" // TODO: Dein Logo einfügen
						alt="Praxis Dr. Kerim – Hausarzt Offenbach"
						width={140}
						height={140}
						className="mb-4"
					/>
					 <p className="text-gray-400 text-sm text-center md:text-left">
						 {t('footer.slogan1')}<br />{t('footer.slogan2')}
					 </p>
				</div>

						{/* Öffnungszeiten */}
						<div className="flex flex-col items-center md:items-start bg-black bg-opacity-80 rounded-2xl p-6">
							 <h3 className="text-lg font-bold mb-3 text-[#EEC16B]">{t('footer.openingHours')}</h3>
							<ul className="space-y-2 text-gray-300 text-sm">
								 <li className="hover:text-[#EEC16B] transition-colors">{t('footer.opening.monThu')}</li>
								 <li className="hover:text-[#EEC16B] transition-colors">{t('footer.opening.fri')} <span className='whitespace-nowrap'>({t('footer.opening.friNote')})</span></li>
							</ul>
						</div>

				{/* Kontakt */}
				<div className="flex flex-col items-center md:items-start bg-black bg-opacity-80 rounded-2xl p-6">
					 <h3 className="text-lg font-bold mb-3 text-[#EEC16B]">{t('footer.contact')}</h3>
					<ul className="space-y-2 text-gray-300 text-sm">
						<li>
							 <a href="tel:+4969870015360" className="hover:text-[#EEC16B] transition-colors">
								 {t('footer.phone1')}
							 </a>
						</li>
						<li>
							 <a href="tel:+4969842081" className="hover:text-[#EEC16B] transition-colors">
								 {t('footer.phone2')}
							 </a>
						</li>
						<li>
							 <a href="fax:+4969844972" className="hover:text-[#EEC16B] transition-colors">
								 {t('footer.fax')}
							 </a>
						</li>
						<li>
							 <a href="mailto:info@praxiskerim.de" className="hover:text-[#EEC16B] transition-colors">
								 {t('footer.email')}
							 </a>
						</li>
					</ul>
				</div>

						{/* Adresse */}
						<div className="flex flex-col items-center md:items-start">
							 <h3 className="text-lg font-bold mb-3 text-[#EEC16B]">{t('footer.addressTitle')}</h3>
							<a
								href="https://maps.app.goo.gl/jpgJxAfiU59x1GHGA"
								target="_blank"
								rel="noopener noreferrer"
								className="text-gray-300 text-sm hover:text-[#EEC16B] transition-colors text-center md:text-left cursor-pointer"
							>
								 {t('footer.address1')}<br />
								 {t('footer.address2')}
							</a>
						</div>
			</div>

			{/* Bottom Bar */}
			<div className="mt-10 border-t border-gray-800 pt-6 text-center text-gray-500 text-sm">
				 © {new Date().getFullYear()} {t('footer.copyright')}
			</div>
		</footer>
	);
}
