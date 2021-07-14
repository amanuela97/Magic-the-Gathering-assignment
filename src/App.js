import React, { useEffect, useState, useCallback } from 'react';
import Search from './components/Search';
import Table from './components/Table';


function App() {

  const [data, setData] = useState(null);
  const [chapters,setChapters] = useState(null);
  const [rules, setRules] = useState(null);

  const onSearch = async (searchword) => {
    console.log(searchword);
    
  };

  const onSelect = async (e,selectedChapter) => {
    e.preventDefault()
    console.log(selectedChapter);
    
  };

  const parseData = useCallback( (data) => { 
    //split file into an array of substrings
    const Lines = data?.split('\n');
    const chapter_regex = /^(\d+\.\s)$/;
    const rule_regex = /^\d+\.\d$/;
    const Chapters = [];
    const Rules = [];
    Lines?.forEach(element => {
        let word = element.slice(0,5).toString();

        if(chapter_regex.test(word) && !Chapters.includes(element)){
            Chapters.push(element);
        }else if(rule_regex.test(word) && !Rules.includes(element)){
            Rules.push(element);
        }
    });
    return {Chapters,Rules}
  },[]);

  useEffect(()=> {
    const fetchData = async () => {
      try {
        let data = await fetch("https://mycorsproxy-reaktor.herokuapp.com/https://media.wizards.com/2021/downloads/MagicCompRules%2020210419.txt");
        data = await data.text();
        await setData(data);
      } catch (error) {
        console.log('error', error)
      }
    };
    fetchData();
    const response = parseData(data);
    setChapters(response.Chapters);
    setRules(response.Rules);
  },[data, parseData]);

  return (
    <div className="App">
        <Table rules={rules} chapters={chapters} onSelect={onSelect}/>
        <Search onSearch={onSearch}/>
    </div>
  );
}

export default App;
