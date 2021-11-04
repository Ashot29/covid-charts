import { useEffect } from 'react';
import './App.css';

const BASE_URL = 'https://webhooks.mongodb-stitch.com/api/client/v2.0/app/covid-19-qppza/service/REST-API/incoming_webhook';

function App() {
  useEffect(() => {
    fetch(`${BASE_URL}/metadata`)
    .then(resp => resp.json())
    .then(data => console.log(data, 'metadata'))

    fetch(`${BASE_URL}/global?country_iso3=USA&min_date=2021-11-01T00:00:00.000Z&max_date=2021-11-02T00:00:00.000Z`) // for one country every days since 22.01.21
    .then(resp => resp.json())
    .then(data => console.log((data), 'global?country_iso3=USA'))

    fetch(`${BASE_URL}/countries_summary?min_date=2021-11-01T00:00:00.000Z&max_date=2021-11-02T00:00:00.000Z`) // countrie summaries
    .then(resp => resp.json())
    .then(data => console.log(data, 'global'))
  }, []);
  
  return (
    <div>
      Ashot
    </div>
  );
}
export default App;
