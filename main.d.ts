export interface SessionProps {
  session: {
    id? : string | null | undefined;
    name?: string | null | undefined;
    email?: string | null | undefined;
    image?: string | null | undefined;
} | null
}

export interface PockemonList {
  count: number
  next: string
  previous: any
  results: PockemonResults[]
}

export interface PockemonResults {
  name: string
  url: string
}

export interface PockemonSingleAllDetails {
abilities: PockemonAbilities [],
base_experience: number,
cries: PockemonCries,
forms: PockemonForms,
game_indices: PockemonGameIndices [],
height: number,
held_items: [],
id: number,
is_default: boolean,
location_area_encounters: string,
moves: PockemonMoves [],
name: string,
order: number,
past_abilities: [],
past_types: [],
species: PockemonSpecies [],
sprites: SpritesProps,
stats: PockemonStats [],
types: PockemonTypes [],
weight: number
}

export interface PockemonTypes {
  some: any;
  slot: number,
  type: {
    name: string,
    url: string
  }
}

export interface PockemonAbilities {
  some: any;
  ability: {
    name: string,
    url: string
  },
  is_hidden: boolean,
  slot: number
}

export interface PockemonStats {
  base_stat: number,
  effort: number,
  stat: {
    name: string,
    url: string
  }
}

export interface PockemonMoves {
  move: {
    name: string,
    url: string
  },
  version_group_details: []
}

export interface PockemonSpecies {
  name: string,
  url: string
}

export interface PockemonCries {
  latest: string,
  legacy: string
}

export interface PockemonForms {
  name: string,
  url: string
}

export interface PockemonGameIndices {
  game_index: number,
  version: {
    name: string,
    url: string
  }
}

export interface SpritesProps {
  back_default: string
  back_female: any
  back_shiny: string
  back_shiny_female: any
  front_default: string
  front_female: any
  front_shiny: string
  front_shiny_female: any
  other: OtherInOtherSprites
  versions: VersionsSprites
}
export interface OtherInOtherSprites {
  dream_world: DreamWorld
  home: Home
  "official-artwork": OfficialArtwork
  showdown: Showdown
}

export interface DreamWorld {
  front_default: string
  front_female: any
}

export interface Home {
  front_default: string
  front_female: any
  front_shiny: string
  front_shiny_female: any
}

export interface OfficialArtwork {
  front_default: string
  front_shiny: string
}

export interface Showdown {
  back_default: string
  back_female: any
  back_shiny: string
  back_shiny_female: any
  front_default: string
  front_female: any
  front_shiny: string
  front_shiny_female: any
}

export interface VersionsSprites {
  "generation-i": GenerationI
  "generation-ii": GenerationIi
  "generation-iii": GenerationIii
  "generation-iv": GenerationIv
  "generation-v": GenerationV
  "generation-vi": GenerationVi
  "generation-vii": GenerationVii
  "generation-viii": GenerationViii
}

export interface GenerationI {}
export interface GenerationIi {}
export interface GenerationIii {}
export interface GenerationIv {}
export interface GenerationV {}
export interface GenerationVi {}
export interface GenerationVii {}
export interface GenerationViii {}

export interface usePokemonDataProps {
  loading?: boolean;
  fetchPokemon?: (page: number) => void,
  pokemonList?: PockemonResults[],
  pokemonListDetails?: PockemonSingleAllDetails[],
  fetchPokemonByName?: (name: string) => Promise<PockemonSingleAllDetails>
  activePokemon?: PockemonSingleAllDetails | null
  loadMore?: () => void
  handleSearchChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  searchQuery?: string
  handleFilterChange?: (key: any, value: any) => void
  filters?: {
    type: string,
    ability: string,
    weight: string,
    height: string,
    sortOrder: string
  }
  clearFilters?: () => void;
  searchPokemon?: (query: string) => Promise<void>;
  fetchAllPokemon?: () => Promise<void>;
  allPokemon?: PockemonResults[];
  fetchPokemonDetails?: () => void;
  setPokemonListDetails?: (value: PockemonSingleAllDetails[]) => void
}

export interface IAllPokemonsAndPage {
  pokemonDetails: PockemonSingleAllDetails[] | null, page: number
}

export type IPokemonDetails = {
  abilities: PockemonAbilities[];
  base_experience: number;
  cries: PockemonCries;
  forms: PockemonForms;
  game_indices: PockemonGameIndices[];
  height: number;
  held_items: [];
  id: number;
  is_default: boolean;
  location_area_encounters: string;
  moves: PockemonMoves[];
  name: string;
  order: number;
  past_abilities: [];
  past_types: [];
  species: PockemonSpecies[];
  sprites: SpritesProps;
  stats: PockemonStats[];
  types: PockemonTypes[];
  weight: number;
}[] | null | undefined
