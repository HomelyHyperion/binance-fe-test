import React, { useState, useEffect } from 'react';
import { useAsync } from 'react-async';
import { Widget, Heading, Options, Filter, Results } from './components';
import { loadProducts } from './services';
import searchSvg from './search.svg'

const options = {star: 'STAR', margin: 'MARGIN', bnb: 'BNB', btc: 'BTC', alts: 'ALTS', fiat: 'USDⓈ'};
const alts = ['ALTS', 'ETH', 'TRX', 'XRP'];
const fiat = ['USDⓈ', 'USDT', 'BUSD', 'TUSD', 'USDC', 'PAX', 'BKRW', 'EUR', 'IDRT', 'NGN', 'RUB', 'TRY', 'ZAR'];
const radioOptions = {change: 'CHANGE', volume: 'VOLUME'};
const margins = ['ADABTC', 'ATOMBTC'];
const sorting = {pairUp: 'PAIR_UP', pairDown: 'PAIR_DOWN', priceUp: 'PRICE_UP', priceDown: 'PRICE_DOWN', changeUp: 'CHANGE_UP', changeDown: 'CHANGE_DOWN', volumeUp: 'VOLUME_UP', volumeDown: 'VOLUME_DOWN'};

var ws = null;

function App() {  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOption, setSelectedOption] = useState(options.btc);
  const [selectedRadioOption, setSelectedRadioOption] = useState(radioOptions.change);
  const [favorites, setFavorites] = useState([]);
  const [sortOrder, setSortOrder] = useState(sorting.pairUp);
  const [results, setResults] = useState([]);
  const [wsData, setWsData] = useState([]);
  const {data, error, isLoading} = useAsync({ promiseFn: loadProducts });
    
  useEffect(() => {
    if (data) { 
      let results = data.data.filter(x => x.pm === selectedOption);

      // Handle option selection
      if(selectedOption === options.star) {
        results = data.data.filter(x => favorites.includes(x.s));
      } else if(selectedOption === options.margin) {
        results = data.data.filter(x => margins.includes(x.s));
      } else if(alts.filter(x => x !== 'ALTS').includes(selectedOption) || fiat.filter(x => x !== 'USDⓈ').includes(selectedOption)) {
        results = data.data.filter(x => x.q === selectedOption);
      }
      
      // Handle sorting
      if(sortOrder === sorting.pairUp) {
        results = results.sort((a, b) => a.s.localeCompare(b.s));
      } else if(sortOrder === sorting.pairDown) {
        results = results.sort((a, b) => a.s.localeCompare(b.s)).reverse();
      } else if(sortOrder === sorting.priceUp) {
        results = results.sort((a, b) => a.c - b.c);
      } else if(sortOrder === sorting.priceDown) {
        results = results.sort((a, b) => b.c - a.c);
      } else if(sortOrder === sorting.changeUp) {
        results = results.sort((a, b) => (a.c-a.o)/a.o - (b.c-b.o)/b.o);
      } else if(sortOrder === sorting.changeDown) {
        results = results.sort((a, b) => (b.c-b.o)/b.o - (a.c-a.o)/a.o);
      } else if(sortOrder === sorting.volumeUp) {
        results = results.sort((a, b) => a.qv - b.qv);
      } else if(sortOrder === sorting.volumeDown) {
        results = results.sort((a, b) => b.qv - a.qv);
      }

      // Handle search
      results = results.filter(x => x.b.includes(searchTerm.toUpperCase()));

      // Update live data 
      results = results.map(x => {
        let newData = wsData.find((y) => (y.s === x.s) && y);
        if(newData) {
          newData = {
            c: Number(newData.c), 
            h: Number(newData.h), 
            l: Number(newData.l), 
            o: Number(newData.o)
          }
        }
        return {...x, ...newData}
      });

      setResults(results);
    }

    // Handle Web Socket
    if(!ws) {
      ws = new WebSocket('wss://stream.binance.com/stream?streams=!miniTicker@arr');
    }

    ws.onopen = function () {
      console.log('Web Socket Connection Opened');
    };

    ws.onerror = function (error) {
      console.log('WebSocket Error ' + error);
    };

    ws.onmessage = function (e) {
      setWsData(JSON.parse(e.data).data);
      console.log(wsData);
    };

    ws.onclose = () => {
      console.log('Web Socket Connection Closed');
      
      // Reconnect after 5 seconds
      setTimeout(() => {
        ws = null;
        setWsData([]);  
      }, 5000)
    };

  }, [data, selectedOption, searchTerm, favorites, sortOrder, wsData]);

  if (isLoading) return 'Loading...';
  if (error) return `Something went wrong: ${error.message}`;

  return (
    <div className="App">
      <Widget>
        <Heading>Market</Heading>
        <Options>
          <button onClick={() => setSelectedOption(options.star)} className={`star ${selectedOption === options.star ? 'selected' : ''}`}>★</button>
          <button onClick={() => setSelectedOption(options.margin)} className={selectedOption === options.margin ? 'selected' : ''}>Margin</button>
          <button onClick={() => setSelectedOption(options.bnb)} className={selectedOption === options.bnb ? 'selected' : ''}>BNB</button>
          <button onClick={() => setSelectedOption(options.btc)} className={selectedOption === options.btc ? 'selected' : ''}>BTC</button>
          <select onClick={(e) => setSelectedOption(e.target.value)} className={selectedOption === options.alts ? 'selected' : ''} onChange={(e) => setSelectedOption(e.target.value)}>
            {alts.map(x => <option key={x}>{x}</option>)}
          </select>
          <select onClick={(e) => setSelectedOption(e.target.value)} className={selectedOption === options.fiat ? 'selected' : ''} onChange={(e) => setSelectedOption(e.target.value)}>
            {fiat.map(x => <option key={x}>{x}</option>)}
          </select>
        </Options>
        <Filter>
          <img src={searchSvg} alt="" className="searchSvg" />
          <input type="text" placeholder="Search" onChange={(e) => setSearchTerm(e.target.value)} />
          <input type="radio" name="filter" id="change" defaultChecked onChange={() => setSelectedRadioOption(radioOptions.change)} />
          <label htmlFor="change">Change</label>
          <input type="radio" name="filter" id="volume" onChange={() => setSelectedRadioOption(radioOptions.volume)} />
          <label htmlFor="volume">Volume</label>
        </Filter>
        <Results>
          <table>
            <thead>
              <tr>
                <th><span onClick={() => sortOrder === sorting.pairUp ? setSortOrder(sorting.pairDown) : setSortOrder(sorting.pairUp)}>Pair <span className={`caret ${sortOrder === sorting.pairUp ? 'asc' : ''} ${sortOrder === sorting.pairDown ? 'desc' : ''}`}></span></span></th>
                <th><span onClick={() => sortOrder === sorting.priceUp ? setSortOrder(sorting.priceDown) : setSortOrder(sorting.priceUp)}>Last Price <span className={`caret ${sortOrder === sorting.priceUp ? 'asc' : ''} ${sortOrder === sorting.priceDown ? 'desc' : ''}`}></span></span></th>
                <th>
                  {selectedRadioOption === radioOptions.change ? 
                    <span onClick={() => sortOrder === sorting.changeUp ? setSortOrder(sorting.changeDown) : setSortOrder(sorting.changeUp)}>Change <span className={`caret ${sortOrder === sorting.changeUp ? 'asc' : ''} ${sortOrder === sorting.changeDown ? 'desc' : ''}`}></span></span> : 
                    <span onClick={() => sortOrder === sorting.volumeUp ? setSortOrder(sorting.volumeDown) : setSortOrder(sorting.volumeUp)}>Volume <span className={`caret ${sortOrder === sorting.volumeUp ? 'asc' : ''} ${sortOrder === sorting.volumeDown ? 'desc' : ''}`}></span></span>
                  }
                </th>
              </tr>
            </thead>
            <tbody>
              {results.map(x => 
                <tr key={x.s}>
                  <td><button className={`star ${favorites.includes(x.s) ? 'selected' : ''}`} onClick={() => favorites.includes(x.s) ? setFavorites(favorites.filter(f => x.s !== f)) : setFavorites([...favorites, x.s])}>★</button> {x.b}/{x.q} {margins.includes(x.s) ? <span className="margin">5x</span> : undefined}</td>
                  <td>{x.c.toString().includes('e') ? x.c.toFixed(8): x.c > 999 ? Number(x.c).toLocaleString() : x.c }</td>
                  {selectedRadioOption === radioOptions.change ?
                    <td className={(x.c-x.o) >= 0 ? 'up' : 'down'}>{(x.c-x.o) >= 0 ? '+' : ''}{((x.c-x.o)/x.o*100).toFixed(2)}%</td> :
                    <td>{Number(x.qv.toFixed(0)).toLocaleString()}</td>
                  }
                </tr>
              )}
            </tbody>
          </table>
        </Results>
      </Widget>
      <br />
      <button onClick={() => ws.close()}>Close WebSocket</button>
    </div>
  );
}

export default App;
