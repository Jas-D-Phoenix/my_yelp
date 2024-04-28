import { Amplify } from "aws-amplify";
import "./App.css";
import { Authenticator} from "@aws-amplify/ui-react";
import Landing from './components/heading/Heading';
import "@aws-amplify/ui-react/styles.css";
import awsExports from "./aws-exports";
import Logo from "../src/logo.png"
import { BrowserRouter, Route, Routes } from "react-router-dom";
import RestaurantList from "./components/restlist/RestList";
import CreateNewRestaurant from "./components/createNewRestaurant/CreateNewRestaurant";
Amplify.configure(awsExports);

function App() {
  const components = {
    Header() {
      return (
      <img alt="Miyelp logo" src={Logo} className="app-logo"/>
      );
    }
  }  
  return (
    <Authenticator components={components} >
      {({ signOut }) => (
          <div>
            <BrowserRouter>
            <Landing signOut={signOut} />
              <Routes>
                <Route exact path="/" element={<RestaurantList />} />
                <Route path="/account" element={<CreateNewRestaurant/>} />
              </Routes>
            </BrowserRouter>

          </div>
      )}
    </Authenticator>
  );
}
export default App;
