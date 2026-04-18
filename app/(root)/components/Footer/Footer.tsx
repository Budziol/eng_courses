import Link from "next/link";
import Logo from "../../../../components/Logo";
import {
  Facebook,
  Instagram,
  Mail,
  MapPin,
  Phone,
  Twitter,
} from "lucide-react";
import FooterMenuCard from "./FooterMenuCard";
import { FooterLink } from "../../../../components/Links";

const Footer = () => {
  return (
    <footer className="bg-[rgb(27,34,50)] px-4 py-20">
      <div className="max-w-[1440px] mx-auto flex flex-col gap-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="space-y-4">
            <Logo />
            <p className="text-sm text-white/70">
              Rozpocznij swoją przygodę już dziś.
            </p>
            <div className="flex gap-4">
              <Link href="" className="">
                <Facebook size={20} color="rgba(255, 255 ,255 , 0.7)" />
              </Link>
              <Link href="" className="">
                <Instagram size={20} color="rgba(255, 255 ,255 , 0.7)" />
              </Link>
              <Link href="" className="">
                <Twitter size={20} color="rgba(255, 255 ,255 , 0.7)" />
              </Link>
            </div>
          </div>
          <FooterMenuCard headline="Nawigacja">
            <li className="">
              <FooterLink href="/#onas">O nas</FooterLink>
            </li>
            <li className="">
              <FooterLink href="/#kursy">Kursy</FooterLink>
            </li>
            <li className="">
              <FooterLink href="/#poziomy">Poziomy</FooterLink>
            </li>
            <li className="">
              <FooterLink href="/#faq">FAQ</FooterLink>
            </li>
          </FooterMenuCard>
          <FooterMenuCard headline="Linki">
            <li className="">
              <FooterLink href="/blog">Blog</FooterLink>
            </li>
            <li className="">
              <FooterLink href="/kontakt">Kontakt</FooterLink>
            </li>
          </FooterMenuCard>
          <FooterMenuCard headline="Kontakt">
            <li className="flex gap-3 text-sm">
              <MapPin size={20} />
              <span className="">123 Aleja Edukacji Warszawa 01-755</span>
            </li>
            <li className="flex gap-3 text-sm">
              <Mail size={20} />
              <span className="">kontakt@speakt.pl</span>
            </li>
            <li className="flex gap-3 text-sm">
              <Phone size={20} />
              <span className="">123 456 789</span>
            </li>
          </FooterMenuCard>
        </div>
        <div className="pt-8 border-t border-white/70 flex flex-col md:flex-row gap-6 justify-between text-white/70">
          <p className="text-sm">© 2026 SPEAKT. Wszelkie prawa zastrzeżone.</p>
          <div className="flex gap-6">
            <FooterLink href="/polityka">Polityka prywatności</FooterLink>
            <FooterLink href="/regulamin">Regulamin</FooterLink>
            <FooterLink href="/ciasteczka">Ciasteczka</FooterLink>
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
