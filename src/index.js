import React from "react";
import ReactDOM from "react-dom";
import { IonReactRouter } from "@ionic/react-router";
import {
  IonPage,
  IonButtons,
  IonToolbar,
  IonHeader,
  IonContent,
  IonBackButton,
  IonRouterOutlet,
  IonTabs,
  IonTabBar,
  IonApp
} from "@ionic/react";
import { Switch, Route, Redirect } from "react-router-dom";
import "@ionic/core/css/core.css";
import "@ionic/core/css/ionic.bundle.css";

console.log(`
  @steps: 
  click first: goToA =>
  click goToB =>
  click goToA => click:goToA
  click Back
`);

const PrivateRoute = props => {
  const { component, ...otherProps } = props;
  const routeRender = props => {
    return React.createElement(component, {
      ...props,
      nav: {
        history: props.history,
        forward(path, state) {
          const history = props.history;
          history.push("/home" + path, state);
        },
        back() {
          props.history.goBack();
        }
      }
    });
  };
  return <Route {...otherProps} render={routeRender.bind(this)} />;
};

const H = props => {
  const { defaultHref } = props;
  return (
    <>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref={defaultHref || "/"} text="back" />
          </IonButtons>
        </IonToolbar>
      </IonHeader>
    </>
  );
};

const Home = props => {
  return (
    <IonPage>
      <IonHeader />
      <IonContent>
        <div>
          <p>@steps: </p>
          <p>click first: goToA =></p>
          <p>click goToB =></p>
          <p>click goToA =></p>
          <p>click goToB </p>
          <p>click Back</p>
        </div>
        <button onClick={() => props.nav.forward("/a")}> first: goToA</button>
      </IonContent>
    </IonPage>
  );
};

const ComponentA = props => {
  return (
    <IonPage>
      <H />
      <IonContent>
        PageA
        <button onClick={() => props.nav.forward("/b")}>goToB</button>
      </IonContent>
    </IonPage>
  );
};

const ComponentB = props => {
  return (
    <IonPage>
      <H />
      <IonContent>
        PageB
        <button onClick={() => props.nav.forward("/a")}>goToA</button>
      </IonContent>
    </IonPage>
  );
};

const routes = [
  {
    path: "/:tab(home)",
    component: Home,
    exact: true
  },
  {
    path: "/:tab(home)/a",
    component: ComponentA,
    exact: true
  },
  {
    path: "/:tab(home)/b",
    component: ComponentB,
    exact: true
  }
];

function App() {
  return (
    <IonApp>
      <IonReactRouter>
        <IonPage>
          <Switch>
            <IonTabs>
              <IonRouterOutlet>
                <Route exact path="/" render={() => <Redirect to="/home" />} />
                {routes.map((item, index) => (
                  <PrivateRoute key={index} {...item} />
                ))}
              </IonRouterOutlet>
              <IonTabBar slot="bottom" />
            </IonTabs>
          </Switch>
        </IonPage>
      </IonReactRouter>
    </IonApp>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
