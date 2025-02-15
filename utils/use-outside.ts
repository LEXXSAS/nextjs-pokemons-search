"use client";

import React, { useEffect } from "react";

export default function useOutside(initialVisible: boolean) {
  const [isShow, setIsShow] = React.useState<boolean>(initialVisible);
  const ref = React.useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: { target: any; }) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setIsShow(false);
    }
  }

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  });

  return { ref, isShow, setIsShow };
}
