import { selectWishlist, getWishlistedIdForProduct } from '../../selectors/wishlist';
import { makeSelectNoSizeAvailabel } from '../../selectors/products';
import { createSelector, createStructuredSelector } from 'reselect';
import * as _ from 'lodash';
import { selectIsDimmerVisible } from '../../selectors/dimmer';

const selectProduct = (state, props) => props.product;

// Select the first color of the product.
const selectSelectedColor = createSelector(
  selectProduct,
  p => _.get(p, ['colours', 0])
);

const selectNoSizeAvailable = makeSelectNoSizeAvailabel(selectSelectedColor);

const selectWishlistedId = createSelector(
  selectWishlist,
  selectProduct,
  getWishlistedIdForProduct
);

export default createStructuredSelector({
  wishlistedId: selectWishlistedId,
  isAllOutOfStock: selectNoSizeAvailable,
  selectedColor: selectSelectedColor,
  isDimmerVisible: selectIsDimmerVisible
});
