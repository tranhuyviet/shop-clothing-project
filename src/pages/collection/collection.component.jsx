import React from "react";
import "./collection.styles.scss";

import { connect } from "react-redux";
import { selectCollection } from "../../redux/shop/shop.selectors";
// import { selectCollections } from "../../redux/shop/shop.selectors";
// import { createStructuredSelector } from "reselect";

import CollectionItem from "../../components/collection-item/collection-item.component";

const CollectionPage = ({ collection }) => {
  //console.log(collections);
  // const collection = collections.find(
  //   item => item.id === COLLECTION_ID_MAP[match.params.collectionId]
  // );
  // const collection = collections[match.params.collectionId];
  const { title, items } = collection;

  return (
    <div className="collection-page">
      <h2 className="title">{title}</h2>
      <div className="items">
        {items.map(item => (
          <CollectionItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

// const mapStateToProps = createStructuredSelector({
//   collections: selectCollections
// });

const mapStateToProps = (state, ownProps) => ({
  collection: selectCollection(ownProps.match.params.collectionId)(state)
});

export default connect(mapStateToProps)(CollectionPage);
