import { WISHLIST, DIMMER } from '../../actions/types';
import { INTEREST_LIST, INTEREST_LIST_NAME } from '../../constants/interestLists';

export default dispatch => ({
  addToWishlist: (productId, selectedColorId, selectedSizeId, selectedCupSizeId) => {
    dispatch({
      type: WISHLIST.ADD,
      payload: {
        productId,
        selectedColorId,
        selectedSizeId,
        selectedCupSizeId,
        source: 'Products list'
      }
    });
  },
  removeFromWishlist: (id, productId) => {
    dispatch({
      type: WISHLIST.DELETE,
      payload: { id, productId }
    });
  },
  allOutOfStock: () => {
    dispatch({
      type: WISHLIST.ALL_OUT_OF_STOCK
    });
  },
  showDimmer: () => {
    dispatch({
      type: DIMMER.SHOW
    });
  },
  hideDimmer: () => {
    dispatch({
      type: DIMMER.HIDE
    });
  },
  removeFromList: (id, listType) => {
    if (listType === INTEREST_LIST_NAME.WISHLIST) {
      dispatch({
        type: WISHLIST.DELETE,
        payload: { listId: id }
      });
    } else {
      dispatch({
        type: INTEREST_LIST.REMOVE_FROM_LIKED,
        payload: { listId: id }
      });
    }
  }
});
