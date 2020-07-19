import React,{Fragment,Suspense,lazy} from 'react';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Dashboard from "./components/Dashboard";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import FindRegistry from './pages/FindRegistry';
import CreateRegistry from './pages/CreateRegistry';
import SignUp from './pages/SignUp';
import About from './pages/About';

const  Home = lazy(()=> import('./pages/Home'));


function App() {
  return (
    <Fragment>
             <Suspense fallback={<div className="spinner"><h3>Loading...</h3></div>} >
                {/* <NavBar /> */}
            <Router>
                <Switch>
                  <Route exact path='/Dashboard' component={Dashboard} />
                  <Route exact path='/Find' component={FindRegistry} />
                  <Route exact path='/' component={Home} />
                  <Route path='/createRegistry' component={CreateRegistry} />
                  <Route path='/signUp' component={SignUp} />
                  <Route path='/about' component={About} />
                  {/* <Route component={Error} /> */}
               
                </Switch>
            </Router>
                {/* <Footer /> */}
            </Suspense>
        </Fragment>
  
  );
}

export default App;
