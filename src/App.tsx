import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCountries } from "./stateManagement/actions/actionCreators/countriesActionCreator";
import { RootState } from "./stateManagement/reducers/rootReducer";
import CountriesTable from "./components/countriesTable";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import CountryChart from "./components/countryChart";
import "./App.css";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCountries());
  }, []);

  return (
    <BrowserRouter>
      <div className="app">
        <div className="container">
          <Switch>
            <Route component={CountriesTable} exact path="/" />
            <Route component={CountryChart} exact path="/:country" />
          </Switch>
        </div>
      </div>
    </BrowserRouter>
  );
}
export default App;
