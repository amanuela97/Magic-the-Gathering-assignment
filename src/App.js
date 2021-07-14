import React, { useEffect, useState, useCallback } from 'react';
import Display from './components/Display';
import Search from './components/Search';
import Table from './components/Table';


function App() {

  const [data, setData] = useState(null);
  const [chapters,setChapters] = useState(null);
  const [rules, setRules] = useState(null);
  const [selected, setSelected] = useState(
    {
      chapter: null,
      rules: null
    }
  );

  const onSearch = async (searchword) => {
    const searchedRules = [];
    rules?.forEach( rule => {
      if(rule.includes(searchword)){
        searchedRules.push(rule);
      }
    });
    setSelected({
      chapter: null,
      rules: searchedRules,
    })
  };

  const onSelect = async (selectedChapter) => {
    const chapter = selectedChapter.slice(0,3).toString();
    const selectedRules = [];
    rules?.forEach( rule => {
      let word = rule.slice(0,3).toString();
      if(word === chapter){
        selectedRules.push(rule);
      }
    });
    setSelected({
      chapter: selectedChapter,
      rules: selectedRules,
    })
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
      <Table chapters={chapters} onSelect={onSelect}/>
      <div className="SearchAndDisplay">
        <Search onSearch={onSearch}/>
        <Display selected={selected}/>  
      </div>
    </div>
  );
}

export default App;
