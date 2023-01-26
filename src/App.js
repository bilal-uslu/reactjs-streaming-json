import oboe from "oboe";
import { useEffect, useReducer } from "react";

const url = 'http://localhost:5105/WeatherForecast';

const initialState = { data: [], loading: true };

function reducer(state, action) {
  switch (action.type) {
    case 'initiate':
      return { ...state, data: [] };
      case 'dataReceived':
        return { ...state, data: [...state.data, action.payload] };
      case 'loaded':
      return { ...state, loading: false };
    default:
      throw new Error();
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    dispatch({ type: 'initiate' });

    oboe(url)
      .node('!.*', function (data) {
        dispatch({ type: 'dataReceived', payload: data });
      })
      .done(function () {
        dispatch({ type: 'loaded' });
      });
  }, []);

  return (
    <div>
      <div>Loading: {`${state.loading}`}</div>
      <div>{state.data.map(item => <div key={item.id} >
        <hr />
        <div>Date : {item.date}</div>
        <div>Temprature  : {item.temperatureC}</div>
        <div>Summary  : {item.summary}</div>
      </div>)}
      </div>
    </div>
  );
}

export default App;
