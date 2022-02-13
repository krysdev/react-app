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

function HandleSearch(event){
  console.log(event.target.value);
}

  return (
    <div>
      <h1>Header</h1>
      <Search onSearch={HandleSearch}/>
      <hr />
      <List list={stories}/>
    </div>
  );
}

const Search = (props) => {
const [searchTerm, setSearchTerm] = useState('');

function HandleChange(event) {
  setSearchTerm(event.target.value)
  props.onSearch(event)
}

return(
    <div>
      <label htmlFor="search">Search: </label>
      <input id="search" type="text" value={searchTerm} onChange={HandleChange}/>
      <p>TEXT: <strong>{searchTerm}</strong></p>
    </div>
  )
};

const List = (props) => {
  return (
    <ul>
      {props.list.map((item) => {
        return <Item passedItem={item} key={item.objectID}/>
      })}
    </ul>
  );
};

function Item(props){
  return (
    <li>
      <span>
        <a href={props.passedItem.url}>{props.passedItem.title}</a>
      </span>
      <span>{props.passedItem.author}</span>
      <span>{props.passedItem.num_comments}</span>
      <span>{props.passedItem.points}</span>
    </li>
  );
}

export default App;
