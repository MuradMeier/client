'use client';

import { useState } from 'react';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';

export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const { isHeadRealtor, logout } = useAuth();

  const closeMenu = () => setOpen(false);

  const links = [
    { href: '/dashboard', label: 'Дашборд', visible: isHeadRealtor },
    { href: '/objects', label: 'Объекты', visible: true },
    { href: '/requests', label: 'Заявки', visible: true },
    { href: '/clients', label: 'Клиенты', visible: true },
    { href: '/meetings', label: 'Встречи', visible: true },
    { href: '/trash', label: 'Корзина', visible: isHeadRealtor },
    { href: '/users', label: 'Пользователи', visible: isHeadRealtor },
    { href: '/settings/regions', label: 'Регионы', visible: isHeadRealtor },
  ];

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="lg:hidden">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-64">
        <nav className="flex flex-col gap-2 mt-8">
          {links.map(({ href, label, visible }) => visible && (
            <Link
              key={href}
              href={href}
              onClick={closeMenu}
              className="px-4 py-2 hover:bg-accent rounded-md"
            >
              {label}
            </Link>
          ))}
          <Button variant="ghost" onClick={logout} className="justify-start">
            Выход
          </Button>
        </nav>
      </SheetContent>
    </Sheet>
  );
}