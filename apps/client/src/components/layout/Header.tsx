import Link from 'next/link';
import { Phone, MessageCircle, Send } from 'lucide-react';

const PHONE = '+79621717338';
const WHATSAPP_LINK = `https://wa.me/${PHONE}`;
const TELEGRAM_LINK = `https://t.me/${PHONE}`;

export default function Header() {
  return (
    <header className="border-b bg-white sticky top-0 z-10">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="text-xl sm:text-2xl font-bold">АН САБР</Link>
        <div className="flex items-center gap-3 sm:gap-4">
          <a href={`tel:${PHONE}`} className="flex items-center gap-1 text-primary">
            <Phone size={20} />
            <span className="hidden sm:inline text-sm">{PHONE}</span>
          </a>
          <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">
            <MessageCircle size={20} className="text-green-600" />
          </a>
          <a href={TELEGRAM_LINK} target="_blank" rel="noopener noreferrer">
            <Send size={20} className="text-blue-500" />
          </a>
        </div>
      </div>
    </header>
  );
}