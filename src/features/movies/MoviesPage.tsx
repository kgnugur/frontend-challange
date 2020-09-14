import React, { ChangeEvent, FC, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import Input from '../../components/Input';
import RenderCards from '../../components/RenderCards';
import Select from '../../components/Select';
import { Form } from '../../models';
import { SearchFilterWraper } from '../../styled/SearchFilterWraper';
import { getCardsReadyFilteredSortedArray, sortArr } from '../../utils';
import { fetchMovies } from './moviesSlice';

const initForm: Form = {
  filter: '',
  sort: '',
};

const MoviesPage: FC = () => {
  const [form, setForm] = useState<Form>(initForm);

  const dispatch = useDispatch();
  const moviesState = useSelector((state: RootState) => state.movies);

  useEffect(() => {
    if (moviesState.movies.length === 1 && !moviesState.movies[0].title) {
      dispatch(fetchMovies());
    }
  }, [moviesState, dispatch]);

  const handleChange = ({ target }: ChangeEvent<any>) => {
    setForm({ ...form, [target.name]: target.value });
  };

  return (
    <div>
      <Helmet title="Popular Movies" />
      <SearchFilterWraper>
        <div className="search-wraper">
          <Input
            name="filter"
            value={form.filter}
            onChange={handleChange}
            placeholder="Search..."
          />
        </div>
        <Select
          name="sort"
          value={form.sort}
          onChange={handleChange}
          options={sortArr}
        />
      </SearchFilterWraper>

      <RenderCards
        cards={getCardsReadyFilteredSortedArray(moviesState.movies, form)}
        spaceBetween
      />
    </div>
  );
};

export default MoviesPage;
