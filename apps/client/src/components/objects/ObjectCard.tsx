import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardFooter } from '../ui/card';
import { Button } from '../ui/button';
import { SearchResult } from '@repo/types';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import { Bed, Square, Calendar } from 'lucide-react';

interface ObjectCardProps {
  item: SearchResult;
  filterAction?: string;
  filterObjectType?: string;
  filterParams?: Record<string, any>;
}

export default function ObjectCard({ item, filterAction, filterObjectType, filterParams }: ObjectCardProps) {
  const formattedDate = item.created_at
    ? format(new Date(item.created_at), 'dd.MM.yyyy', { locale: ru })
    : null;
  const imageUrl = item.image || (item as any).images?.[0]?.izobrazhenie;

  const query = new URLSearchParams();
  if (filterAction) query.set('action', filterAction);
  if (filterObjectType) query.set('objectType', filterObjectType);
  if (filterParams) {
    Object.entries(filterParams).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        query.set(key, String(value));
      }
    });
  }
  const href = `/objects/${item.type}/${item.id}${query.toString() ? '?' + query.toString() : ''}`;

  return (
    <Card className="overflow-hidden group hover:shadow-xl transition-shadow duration-300">
      <div className="aspect-video relative bg-gray-100">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={item.title}
            fill
            unoptimized
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400 text-sm sm:text-base">
            Нет фото
          </div>
        )}
      </div>
      <CardContent className="p-4 sm:p-5">
        <h3 className="font-semibold text-base sm:text-lg mb-1 line-clamp-1">{item.title}</h3>
        <p className="text-xs sm:text-sm text-gray-500 mb-2 sm:mb-3 line-clamp-2">
          {item.address}
          {item.apartment_number && `, кв. ${item.apartment_number}`}
        </p>
        <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm text-gray-600 mb-2 sm:mb-3">
          {item.area && (
            <span className="flex items-center gap-1">
              <Square className="h-3 w-3 sm:h-4 sm:w-4" />
              {item.area} м²
            </span>
          )}
          {item.rooms && (
            <span className="flex items-center gap-1">
              <Bed className="h-3 w-3 sm:h-4 sm:w-4" />
              {item.rooms} ком.
            </span>
          )}
        </div>
        <p className="text-xl sm:text-2xl font-bold text-blue-600">
          {item.price ? `${item.price.toLocaleString()} ₽` : 'Цена не указана'}
        </p>
        {formattedDate && (
          <p className="text-xs text-gray-400 mt-2 flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            Добавлено: {formattedDate}
          </p>
        )}
      </CardContent>
      <CardFooter className="p-4 sm:p-5 pt-0">
        <Link href={href} passHref className="w-full">
          <Button variant="outline" className="w-full border-blue-200 hover:bg-blue-50 text-sm sm:text-base">
            Подробнее
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}