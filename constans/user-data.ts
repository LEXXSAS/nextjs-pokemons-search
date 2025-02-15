'use client';

import { setLikedPokemons } from "@/redux/slices/userSlice";
import { useDispatch } from "react-redux";

export const useUserData = () => {
  const dispatch = useDispatch();

  const fetchUserDetails = async (email: string) => {
    let redata = null;
    if (!email) return;
    
    try {
      await fetch(`/api/user/${email}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        }
      })
      .then((res) => res.json())
      .then((data) => {
        if (data && data.message) {
          console.log(data.message)
        } else {
          redata = data;
          dispatch(setLikedPokemons(redata));
        }
      });
      return redata;
    } catch (error) {
      console.log("Error in fetchUserDetails", error);
    }
  };

  const performAction = async (useremail: string, pokemon: string, action: string) => {
    try {
      await fetch("/api/pokemon", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ useremail, pokemon, action })
      })
      .then((res) => fetchUserDetails(useremail));
    } catch (error) {
      console.log("Error in performAction", error);
    }
  };

  return { performAction, fetchUserDetails };
};
