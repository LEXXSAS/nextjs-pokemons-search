'use client';

import React, { useEffect } from "react";
import Link from "next/link";
import { signIn, signOut, useSession } from 'next-auth/react';
import { useUserData } from "@/constans/user-data";
import useOutside from "@/utils/use-outside";
import { useDispatch, useSelector } from "react-redux";
import { setUserDetails, setUserEmail } from "@/redux/slices/userSlice";
import { LogIn } from "lucide-react";
import { addPokemonsFromLocal, setTypeValue } from "@/redux/slices/pokemonSlice";

export default function Header() {
  const {ref, isShow, setIsShow} = useOutside(false);
  const [sub, setSub] = React.useState('');
  const [userImage, setUserImage] = React.useState('');
  const [name, setName] = React.useState<string | null | undefined>('');
  const { data, status } = useSession();
  const [isLoading, setIsLoading] = React.useState(false);

  const dispatch = useDispatch();

  const { fetchUserDetails } = useUserData();

  const defaultPokemons = useSelector((state: any) => state.pokemons.defaultPokemons);

  const getUserDataFromDb = async(data: string) => {
    const resuserdata = await fetchUserDetails(data);
    resuserdata && dispatch(setUserDetails(resuserdata));
  }

  useEffect(() => {
    setSub('');
    if (status === 'loading') {
      console.log(status);
    }
    else if (status === 'authenticated') {
      if (data?.user) {
        localStorage.setItem('user', JSON.stringify(data.user.name || ''));
        dispatch(setUserEmail(data.user.email || ''));
        setSub(data.user.email || '');
        setName(data.user.name || '');
        setUserImage(data.user.image || '');
        data.user.email && getUserDataFromDb(data.user.email)
        setIsLoading(false);
      }
    }
    else if (status === 'unauthenticated') {
      localStorage.removeItem('user');
      dispatch(setUserEmail(''));
      setIsLoading(false);
    }
  }, [data, status]);

  const user = {
    sub: sub,
    name: name,
    picture: userImage,
  }

  const mainMenuActive = () => {
    setIsShow(!isShow);
  }

  const setDefaultSelect = () => {
    localStorage.removeItem("searchvalue");
    dispatch(setTypeValue({value: 'Выбор типа', label: 'Выбор типа'}))
    dispatch(addPokemonsFromLocal(defaultPokemons));
  }

  return (
    <header>
      <nav className="container mx-auto">
        <div className="logo-wrapper">
          <Link href={`/?page=1`} onClick={() => setDefaultSelect()}>
            <p className="font-bold text-xl">Logo</p>
          </Link>
        </div>
        <div className="right-menu">
          <ul>
            <li>
            {!user?.sub && !isLoading && (
              <button
                onClick={() => signIn('google')}
                className="btn-login py-2 px-6 text-sm flex items-center gap-2 font-bold rounded-lg bg-[#c1f4d0]/25
                 text-[#000000] hover:bg-[#c1f4d0]/50 transition-all duration-300 ease-in-out"
              >
                <LogIn size={20} />
                Login
            </button>
            )}
            {user?.sub && !isLoading && (
              <div ref={ref}>
                <div onClick={() => mainMenuActive()} className="user-info-container bg-green-400/15 flex items-center justify-center gap-2 rounded-lg cursor-pointer">
                <span className="pl-2 text-[#000000]/60 text-sm font-bold">
                    {user?.name || "User"}
                  </span>
                  <img
                    src={"https://i.pravatar.cc/40"}
                    alt="avatar"
                    className="p-1 rounded-lg"
                    width={40}
                    height={40}
                  />
                </div>
                <div className="main-menu-container">
                <nav className={isShow ? "main-menu active" : "main-menu"}>
                  <ul className="main-menu-list">
                    <li><button className="menu-item" onClick={() => signOut()}>Logout</button></li>
                    <li><a className="menu-item" href="#">Other</a></li>
                  </ul>
                </nav>
                </div>
              </div>
            )}
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}
