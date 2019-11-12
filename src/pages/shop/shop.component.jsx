import React from "react";

import CollectionsOverview from "../../components/collections-overview/collections-overview.component";
import CollectionPage from "../collection/collection.component";

import { Route } from "react-router-dom";

import {
  firestore,
  convertCollectionsSnapshotToMap
} from "../../firebase/firebase.utils";

import { connect } from "react-redux";
import { updateCollections } from "../../redux/shop/shop.actions";

class ShopPage extends React.Component {
  unsubcribleFromSnapshot = null;

  componentDidMount() {
    const { updateCollections } = this.props;
    const collectionRef = firestore.collection("collections");
    collectionRef.onSnapshot(async snapshot => {
      // console.log(snapshot);
      const collectionMap = convertCollectionsSnapshotToMap(snapshot);
      //console.log("cac cac", collectionMap);
      updateCollections(collectionMap);
    });
  }

  render() {
    const { match } = this.props;
    return (
      <div className="shop-page">
        <Route exact path={`${match.path}`} component={CollectionsOverview} />
        <Route
          path={`${match.path}/:collectionId`}
          component={CollectionPage}
        />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateCollections: collectionsMap =>
      dispatch(updateCollections(collectionsMap))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(ShopPage);
