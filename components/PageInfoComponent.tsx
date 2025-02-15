'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import React from 'react'
import { useSelector } from 'react-redux';

export default function PageInfoComponent() {
  const pathname = usePathname();

  const searchParams = useSearchParams();
  const querypage = searchParams.get('page') || 1;

  const pokemons = useSelector((state: any) => state.pokemons.pokemons);
  const page = useSelector((state: any) => state.pages.page);
  const currentpage = useSelector((state: any) => state.pages.currentpage);
  const totalPage = useSelector((state: any) => state.pages.totalPage);
  const totalPageDefault = useSelector((state: any) => state.pages.totalPageDefault);
  const nodata = useSelector((state: any) => state.pokemons.nodata);

  if (pathname !== '/') {
    return null;
  }

  return (
    <div className="pageinfo">
    {pokemons && pokemons?.length > 0 ? 
    <>
    <p id="currentpageinfo">Текущая страница: {Number(querypage)}</p>
    </>
    : <p id="currentpageinfo">Текущая страница: {Number(querypage)}</p>
    }
    {!nodata ? 
    <>
    <p id="allpagesinfo">из {totalPage}</p>
    </>
    : <p id="allpagesinfo">из {totalPageDefault}</p>
    }
  </div>
  )
}
