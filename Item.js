/* eslint-disable no-restricted-syntax */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { ScrollView, View } from 'react-native';
import Text from '../../components/Text/index';
import Image from '../../components/Image/index';
import Button, { TOUCH_MODE } from '../../components/Button';
import routes from '../../routes';
import { styles } from './styles';
import Price from '../../components/Price/index';
import { productPropTypes } from '../../propTypes';
import * as _ from 'lodash';
import { fullProductImageUrl } from '../../utils/products';
import ImageUnavailable from '../../components/icons/ImageUnavailable';
import HeartFill from '../../components/icons/HeartFill';
import Heart from '../../components/icons/Heart';
import { connect } from 'react-redux';
import selectors from './selectors';
import actions from './actions';
import envConfig from '../../envConfig';
import NavigationService from '../../NavigationService';
import Cross from '../../components/icons/Cross';

const heartWidth = 16;
const heartHeight = 13;

// Not all colours have images, so we loop through all colours, to find
// the first image available.
export const getThumbnailUrl = (product = {}) => {
  const { colours } = product;
  if (!colours) return null;

  for (const colour of colours) {
    if (colour.thumbnailUrl) return fullProductImageUrl(colour.thumbnailUrl);

    // At the time of launch, colours[0].thumbnailUrl was just an empty string,
    // so we add a fallback to the first carousel image.
    const fallbackUrl = fullProductImageUrl(_.get(colour, ['images', 0, 'thumbnailUrl']));
    if (fallbackUrl) return fallbackUrl;
  }
  return null;
};

class ProductListItem extends PureComponent {
  static propTypes = {
    itemWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    isHorizontal: PropTypes.bool,
    product: PropTypes.shape(productPropTypes),
    wishlistedId: PropTypes.number,
    addToWishlist: PropTypes.func,
    removeFromWishlist: PropTypes.func,
    isAllOutOfStock: PropTypes.bool,
    selectedColor: PropTypes.object,
    allOutOfStock: PropTypes.func,
    isDimmerVisible: PropTypes.bool,
    showDimmer: PropTypes.func,
    hideDimmer: PropTypes.func,
    listType: PropTypes.string,
    removeFromList: PropTypes.func
  };

  state = {
    isSizeModalVisible: false
  };

  componentWillReceiveProps(nextProps) {
    if (!nextProps.isDimmerVisible && this.props.isDimmerVisible) {
      this.setState({ isSizeModalVisible: false });
    }
  }

  _handleExternalProductUri = () => {
    const { product } = this.props;
    const homepage = 'https://www.magasin.dk';
    const uri = product.externalUrl ? product.externalUrl : homepage;

    NavigationService.navigate({
      routeName: routes.webView,
      params: { uri: uri }
    });
  };

  _toggleWishlist = () => {
    if (this.props.wishlistedId) {
      this.props.removeFromWishlist(this.props.wishlistedId, this.props.product.code);
    } else if (this.props.isAllOutOfStock) {
      this.props.allOutOfStock();
    } else {
      const { product, selectedColor } = this.props;
      if (_.get(selectedColor, ['sizes', 'length']) === 1) {
        this.props.addToWishlist(
          this.props.product.code,
          _.get(selectedColor, ['code']),
          _.get(selectedColor, ['sizes', 0, 'code'])
        );
      } else {
        this.props.showDimmer();
        this.setState({ isSizeModalVisible: true });
      }
    }
  };

  _dismissSizeModal = () => {
    this.props.hideDimmer();
    this.setState({ isSizeModalVisible: false });
  };

  _addToWishlist = (productId, selectedColorId, selectedSizeId, selectedCupSizeId) => {
    this._dismissSizeModal();
    this.props.addToWishlist(productId, selectedColorId, selectedSizeId, selectedCupSizeId);
  };

  _removeFromList = () => {
    this.props.removeFromList(this.props.product.listId, this.props.listType);
  };

  render() {
    const { itemWidth, isHorizontal, product, wishlistedId, selectedColor } = this.props;
    const thumbnailUrl = getThumbnailUrl(product);
    const productId = _.get(product, 'code');
    const selectedColorId = _.get(selectedColor, 'code');

    return (
      <Button
        style={styles.productItem(itemWidth || '100%', isHorizontal)}
        touchMode={TOUCH_MODE.OPACITY}
        to={{ routeName: routes.productDetails, params: { id: product.code } }}
      >
        <View>
          {thumbnailUrl ? (
            <View style={styles.imageWrapper} aspectRatio={1}>
              <Image source={{ uri: thumbnailUrl }} style={styles.image} aspectRatio={1} />
            </View>
          ) : (
            <View style={styles.imageUnavailable} aspectRatio={1}>
              <ImageUnavailable />
            </View>
          )}
        </View>
        {product.brand && (
          <Text style={styles.brand} numberOfLines={1}>
            {product.brand.name}
          </Text>
        )}
        <Text style={styles.name} numberOfLines={1}>
          {product.name}
        </Text>
        <Price
          style={styles.price}
          sellPrice={product.sellPriceLow}
          sellPriceHigh={product.sellPriceHigh}
          regularPrice={product.origPriceLow}
          regularPriceHigh={product.origPriceHigh}
        />
        {product.listId && (
          <Button
            style={styles.shop}
            label={'Shop this item'}
            onPress={this._handleExternalProductUri}
          />
        )}
        {product.listId && (
          <Button style={styles.close} onPress={this._removeFromList}>
            <Cross style={{ width: 15, height: 15 }} />
          </Button>
        )}
      </Button>
    );
  }
}

export default connect(
  selectors,
  actions
)(ProductListItem);
