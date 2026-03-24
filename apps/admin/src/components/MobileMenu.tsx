'use client';

import { useState } from 'react';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
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
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="lg:hidden">
          <Menu className="h-5 w-5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[300px] top-[20%] translate-y-0">
        <nav className="flex flex-col gap-2 mt-4">
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
      </DialogContent>
    </Dialog>
  );
}