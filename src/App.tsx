import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCountries } from "./stateManagement/actions/actionCreators/countriesActionCreator";
import { RootState } from "./stateManagement/reducers/rootReducer";
import CountriesTable from "./components/countriesTable/index";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import CountryChart from "./components/countryChart/index";
import "./App.css";

function App() {
  const isLoading = useSelector((state: RootState) => state.countries.loading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCountries());
  }, []);

  if (isLoading)
    return (
      <div className="loading-icon-wrapper">
        <div className="loading-icon left-icon"></div>
        <div className="loading-icon right-icon"></div>
      </div>
    );

  return (
    <BrowserRouter>
      <div className="app">
        <div className="container">
          <Switch>
            <Route component={CountriesTable} exact path="/" />
            <Route component{CountryChart} exact path='/:id' />
          </Switch>
        </div>
      </div>
    </BrowserRouter>
  );
}
export default App;
