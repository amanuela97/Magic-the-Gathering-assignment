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
    //extract rules with searched keyword
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
    //extract rules to selected chapters
    const chapter = selectedChapter.slice(0,3).toString();
    const selectedRules = [];
    const regex = /\d\d\d(.*?)/g;
    const number_Regex = /\d/;
    const letter_Regex = /[a-z]/;
    const dot_Regex = /\./;
    let subNum = 9;
    rules?.forEach( rule => {
      let Final_Rule = rule;
      let ruleNum = rule.slice(0,3).toString();    
      if(ruleNum === chapter){
        let ruleNumbers = [];
        let newRule = rule.split(' ').slice(1).join(' ');
        let result = Array.from(newRule.matchAll(regex));
        if(result.length > 0) {
          for(let k = 0; k < result.length; k++){
            let replacedWord = newRule.substr(result[k].index, subNum).split(' ');
            let num = '';
            for (let i = 0; i < replacedWord[0].length; i++) {
              if(number_Regex.test(replacedWord[0][i]) || letter_Regex.test(replacedWord[0][i]) || dot_Regex.test(replacedWord[0][i])){
                num += replacedWord[0][i]; 
              } 
            }
            ruleNumbers.push(num);
          }
          ruleNumbers.forEach((ruleN) => {
            Final_Rule = Final_Rule.replace(ruleN, ruleN.link('#top'))
          })
          selectedRules.push(<span dangerouslySetInnerHTML={{ __html: Final_Rule }} />);
        } else {
          selectedRules.push(rule);
        }
      }
    });
    setSelected({
      chapter: selectedChapter,
      rules: selectedRules,
    })
  };

  const parseData = useCallback( (data) => { 
    //parse txt file and extract rules and chapters
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
