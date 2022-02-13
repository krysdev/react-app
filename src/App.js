import React, {useState} from 'react';
// import stories from './list';

function App() {
  const stories = [
    {
    title: "React",
    url: "https://reactjs.org/",
    author: "Jordan Walker",
    num_comments: 3,
    points: 4,
    objectID: 0
    },
    {
    title: "Redux",
    url: "https://redux.js.org/",
    author: "Dan Abramov, Andrew Clark",
    num_comments: 2,
    points: 5,
    objectID: 1
    }
]

  return (
    <div>
      <h1>Header</h1>
      <Search />
      <hr />
      <List list={stories}/>
    </div>
  );
}

const Search = () => {
const [myString, setMyString] = useState('');

  function HandleChange(event) {
    setMyString(event.target.value)
  }

  return(
    <div>
      <label htmlFor="search">Search: </label>
      <input id="search" type="text" value={myString} onChange={HandleChange}/>
    </div>
  )
};

const List = (props) => {
  return (
    <ul>
      {props.list.map((item) => {
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
