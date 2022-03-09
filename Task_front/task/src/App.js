import logo from "./logo.svg";
import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
// import FileUpload from "./components/fileUpload/fileUpload";
import Main from "./components/mainMenu/Main";
import FileUpload from "./components/fileUpload/fileUpload";
import Filedownload from "./components/filedownload/Filedownload";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>

          <Route path="/filedownload" component={Filedownload}></Route>
          <Route path="/" component={FileUpload}></Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
