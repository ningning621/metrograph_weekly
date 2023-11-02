import { useState } from 'react';
import './App.css';
import { useEffect } from 'react';
import Papa from 'papaparse';

function App() {

  const dataUrl = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQ2HDjtQlx1xJdiuNW8KOuAoodzjUcuTPNtkswCs5pSM4LAZwuVByXmeUgeEb_7t-mkzteol1pJk07T/pub?gid=0&single=true&output=csv";
  let [dataIsLoaded, setLoaded] = useState(false);
  let [ratingData, setData] = useState([]);

  useEffect(() => {
    fetch(dataUrl)
      .then(response => response.text())
      .then(data => {
        let rawData = (Papa.parse(data, { header: true }))["data"];
        console.log(rawData)
        setData(rawData)
        setLoaded(true)
      })
      .catch(e => {
        console.log(e)
      })
  }, []);


  return (
    <div className="outer-container">
      <div className='color-bg'>
        <header>
          <h1 className='title'>metrograph weekly</h1>
        </header>
        <table className='table'>
          <tr>
            <th className={`title-table-row header`}>title</th>
            <th className={`rating-table-row header`}>rating</th>
          </tr>
          {ratingData.length > 0 && ratingData.map(d => (
            <tr>
              <th className='title-table-row info-row'>{d.title}</th>
              <th className='rating-table-row info-row'>{d.rating}</th>
            </tr>
          ))}
        </table>
      </div>
    </div>
  );
}

export default App;
