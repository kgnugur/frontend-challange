import React, { FC } from 'react';
import styled from 'styled-components';
import Button from '../components/Button';
import Input from '../components/Input';
import RenderCards from '../components/RenderCards';
import Select from '../components/Select';
import { Flex } from '../styled/styledUtils';
import { Helmet } from 'react-helmet';

interface MoviesPageProps {}

const SearchFilterWraper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const MoviesPage: FC<MoviesPageProps> = (props: MoviesPageProps) => {
  return (
    <div>
      <Helmet title="Popular Movies" />
      <SearchFilterWraper>
        <Flex>
          <Input></Input>
          <Button></Button>
        </Flex>
        {/* <Select></Select> */}
      </SearchFilterWraper>

      <RenderCards
        cards={[
          { to: '/series', title: 'Popular Series', bigText: 'SERIES' },
          { to: '/movies', title: 'Popular Movies', bigText: 'MOVIES' },
        ]}
        spaceBetween
      />
    </div>
  );
};

export default MoviesPage;
