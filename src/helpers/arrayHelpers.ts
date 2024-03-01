type SortByNameObject = {
  name: string;
};

export const sortByName = (a: SortByNameObject, b: SortByNameObject) => {
  return a.name.localeCompare(b.name);
};

type FilterByNameObject = {
  name: string;
};

export const filterByName = (a: FilterByNameObject, search: string) => {
  if (search === '') {
    return a;
  } else {
    if (a.name.toLowerCase().includes(search.toLowerCase())) {
      return a;
    }
  }
};

type SortByDateObject = {
  date: string;
};

export const sortByDate = (a: SortByDateObject, b: SortByDateObject) =>
  new Date(b.date).valueOf() - new Date(a.date).valueOf();
