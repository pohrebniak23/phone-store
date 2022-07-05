import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { BreadCrumbs } from '../../components/BreadCrumbs';
import { ProductCard } from '../../components/ProductCard';
import { useAppSelector } from '../../hooks/redux';
import { ProductItem } from '../../types/ProductItem';

import './favourites.scss';

export const Favourites: React.FC = () => {
  // const storageValue: string | null = localStorage.getItem('favourite');
  // let parsedStorage: ProductItem[] | [] = storageValue
  //   ? JSON.parse(storageValue)
  //   : [];
  const { favourites } = useAppSelector(state => state.favourites);

  const [searchParams] = useSearchParams();
  const query = searchParams.get('query') || '';

  const parsedStorage = favourites.filter((item) => {
    return item.name.toLowerCase().includes(query.toLowerCase());
  });

  return (
    <div className="favourites">
      <div className="container">
        <BreadCrumbs title="Favourites" />

        <div className="favourites__block">
          <h1 className="favourites__title title">
            Favourites
          </h1>

          {parsedStorage.length > 0 && (
            <p className="favourites__count">
              {`${parsedStorage.length} items`}
            </p>
          )}

          <div className="favourites__content">
            {parsedStorage && parsedStorage.map((item: ProductItem) => (
              <ProductCard card={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
