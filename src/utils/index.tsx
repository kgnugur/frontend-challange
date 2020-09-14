import React from 'react';
import { ReactNode } from 'react';
import { Entries, Form, Sort } from '../models';

const sortYearDesc = (entries: Entries[]) =>
  entries.slice().sort((a, b) => b.releaseYear - a.releaseYear);

const sortYearAsc = (entries: Entries[]) =>
  entries.slice().sort((a, b) => a.releaseYear - b.releaseYear);

const sortTitleDesc = (entries: Entries[]) =>
  entries.slice().sort((a, b) => a.title.localeCompare(b.title));

const sortTitleAsc = (entries: Entries[]) =>
  entries.slice().sort((a, b) => b.title.localeCompare(a.title));

export const handleRelatedSort = (entries: Entries[], sortType: Sort) => {
  console.log(entries, sortType);
  // return entries;
  switch (sortType) {
    case 'yearDesc':
      return sortYearDesc(entries);
    case 'yearAsc':
      return sortYearAsc(entries);
    case 'titleDesc':
      return sortTitleDesc(entries);
    case 'titleAsc':
      return sortTitleAsc(entries);
    default:
      return entries;
  }
};

export const filterEntries = (entries: Entries[], str: string) =>
  str.length > 2
    ? entries.filter(({ title }) =>
        title.toLowerCase().includes(str.toLowerCase())
      )
    : entries;

export const entriesToCardsArr = (entries?: Entries[]) =>
  entries?.map(({ title, images }) => ({
    title,
    image: images['Poster Art'].url,
  }));

export const sortArr: { value: Sort; label: string }[] = [
  { value: '', label: 'None' },
  { value: 'yearDesc', label: 'Sort by year in descending order' },
  { value: 'yearAsc', label: 'Sort by year in ascending order' },
  { value: 'titleDesc', label: 'Sort by title in descending order (A-Z)' },
  { value: 'titleAsc', label: 'Sort by title in ascending order (Z-A)' },
];

export const getCardsReadyFilteredSortedArray = (
  entries: Entries[],
  form: Form
) =>
  entriesToCardsArr(
    handleRelatedSort(filterEntries(entries, form.filter), form.sort)
  );

export const renderContentConditionally = (
  loading: boolean,
  error: string | null,
  content: ReactNode
) => {
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Oops, something went wrong....</div>;
  return content;
};
