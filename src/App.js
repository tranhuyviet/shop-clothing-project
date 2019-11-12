import React from "react";
import "./App.css";
import { Route, Switch, Redirect } from "react-router-dom";

import HomePage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shop/shop.component";
import SignInAndSignUpPage from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.component";
import CheckoutPage from "./pages/checkout/checkout.component";

import Header from "./components/header/header.component";

import {
  auth,
  createUserProfileDocument,
  addCollectionAndDocuments
} from "./firebase/firebase.utils";

import { connect } from "react-redux";
import { setCurrentUser } from "./redux/user/user.action";
import { selectCurrentUser } from "./redux/user/user.selectors";

import { createStructuredSelector } from "reselect";

import { selectCollectionsForPreview } from "./redux/shop/shop.selectors";

class App extends React.Component {
  unsubcribeFromAuth = null;

  componentDidMount() {
    const { setCurrentUser, collectionsArray } = this.props;

    this.unsubcribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      // this.setState({ currentUser: user });
      // console.log(user);
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);
        userRef.onSnapshot(snapShot => {
          // console.log(snapShot); this have id
          // console.log(snapShot.data()); and this have all info: displayName, email, createdAt
          setCurrentUser(
            {
              currentUser: {
                id: snapShot.id,
                ...snapShot.data()
              }
            }
            //() => console.log(this.state.currentUser)
          );
        });
      } else {
        setCurrentUser(userAuth);
        addCollectionAndDocuments(
          "collections",
          collectionsArray.map(({ title, items }) => ({ title, items }))
        );
      }
    });
  }

  componentWillUnmount() {
    this.unsubcribeFromAuth();
  }

  render() {
    return (
      <>
        <Header />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/shop" component={ShopPage} />
          <Route exact path="/checkout" component={CheckoutPage} />
          <Route
            exact
            path="/signin"
            render={() =>
              this.props.currentUser ? (
                <Redirect to="/" />
              ) : (
                <SignInAndSignUpPage />
              )
            }
          />
        </Switch>
      </>
    );
  }
}

// const mapStateToProps = ({ user }) => ({
//   currentUser: user.currentUser
// });

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  collectionsArray: selectCollectionsForPreview
});

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
