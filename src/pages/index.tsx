import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { fetchPriceData, setSymbol } from '../slices/priceSlice';

const Home: React.FC = () => {
  const dispatch = useDispatch();
  const symbol = useSelector((state: RootState) => state.prices.symbol);
  const data = useSelector((state: RootState) => state.prices.data);

  useEffect(() => {
    dispatch(fetchPriceData(symbol));
    const interval = setInterval(() => {
      dispatch(fetchPriceData(symbol));
    }, 5000);

    return () => clearInterval(interval);
  }, [dispatch, symbol]);

  const handleChangeSymbol = (newSymbol: string) => {
    dispatch(setSymbol(newSymbol));
  };

  return (
    <div>
      <h1>Real-time Price Data for {symbol}</h1>
      <table>
        <thead>
          <tr>
            <th>Price</th>
            <th>Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {data.map((entry, index) => (
            <tr key={index}>
              <td>{entry.price}</td>
              <td>{new Date(entry.timestamp).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={() => handleChangeSymbol('BTC')}>Change to BTC</button>
    </div>
  );
};

export default Home;
