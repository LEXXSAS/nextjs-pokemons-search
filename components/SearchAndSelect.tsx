'use client';

import { usePathname } from 'next/navigation';
import { SearchPokemon } from './SearchPokemon'
import { SelectComponent } from './SelectComponent'

export default function SearchAndSelect() {
  const pathname = usePathname();

  return (
    <div className="search-and-select-wrapper">
      {
      pathname === '/' && 
        <>
        <div className="select-container"><SelectComponent /></div>
        <div className="search-container"><SearchPokemon /></div>
        </>
      }
    </div>
  )
}
