'use client';

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { Suspense } from "react";
import styles from './pagination-component.module.scss';
import { useDispatch, useSelector } from "react-redux";
import { setCurrentPageFromStore } from "@/redux/slices/pagesSlice";

export const PaginationComponent = () => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const querypage = searchParams.get('page') || 1;

  const dispatch = useDispatch();
  
  const totalPage = useSelector((state: any) => state.pages.totalPage);

  const setCurrentPage = (page: string) => {
    router.push(`?page=${Number(page)}`);
    dispatch(setCurrentPageFromStore(page))
  }

  const generatePagination = () => {
    if (querypage) {
      return (
        <>
        <button className={'1' == querypage ? 'bg-violet-400/25 font-bold' : ''} onClick={() => setCurrentPage('1')}>1</button>
        
        <button>...</button>
        
        {Number(querypage) > 1 && <button className={String(Number(querypage) - 1) == querypage ? 'bg-violet-400/25 font-bold' : ''} onClick={() => setCurrentPage(String(Number(querypage) - 1))}>{Number(querypage) - 1}</button>}

        <button className={String(Number(querypage)) == querypage ? 'bg-violet-400/25 font-bold' : ''} onClick={() => setCurrentPage(String(Number(querypage)))}>{Number(querypage)}</button>

        {Number(querypage) <= totalPage - 1 && <button className={String(Number(querypage) + 1) == querypage ? 'bg-violet-400/25 font-bold' : ''} onClick={() => setCurrentPage(String(Number(querypage) + 1))}>{Number(querypage) + 1}</button>}

        {Number(querypage) <= totalPage - 2 && <button className={String(Number(querypage) + 1) == querypage ? 'bg-violet-400/25 font-bold' : ''} onClick={() => setCurrentPage(String(Number(querypage) + 2))}>{Number(querypage) + 2}</button>}

        <button>...</button>
        
        {totalPage > 0 && <button className={String(totalPage) == querypage ? 'bg-violet-400/25 font-bold' : ''} onClick={() => setCurrentPage(String(totalPage))}>{totalPage}</button>}
        </>
      )
    }
  }

  return (
    <div className={styles.pagination_container} >
      {pathname === '/' && generatePagination()}
    </div>
  )
}
