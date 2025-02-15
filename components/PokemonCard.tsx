import { typeColor } from '@/utils/colors';
import Link from 'next/link';
import React from 'react'
import PokemonCardButtons from './PokemonCardButtons';

export default function PokemonCard({item}: any) {
  return (
    <div
    className="card-newpage bg-slate-300 w-[100px]"
    key={item.name}
  > 
    <PokemonCardButtons key={item?.name} pokemonname={item?.name} />
    <Link
      href={`/pokemon/${item.name}`}
    >
      <img
        width={90}
        height={90}
        src={item.image}
        className="item-image"
      />
    </Link>
    <div
      className="card-types"
      style={{
        backgroundColor: typeColor[item.details.types[0]?.type?.name]
      }}>
      <p>
        {item.details.types[0].type.name}
      </p>
    </div>
  </div>
  )
}
