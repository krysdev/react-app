import * as React from 'react';
import list from './list';

const App = () => (
  <div>
    <h1>Header</h1>
    <Search />
    <hr />
    <List />
  </div>
);

const Search = () => {

  return(
    <div>
      <label htmlFor="search">Search: </label>
      <input id="search" type="text" />
    </div>
  )
};

const List = () => {
  return (
    <ul>
      {list.map((item) => {
        return (
          <li key={item.objectID}>
            <span>
              <a href={item.url}>{item.title}</a>
            </span>
            <span>{item.author}</span>
            <span>{item.num_comments}</span>
            <span>{item.points}</span>
          </li>
        );
      })}
    </ul>
  );
};

export default App;
