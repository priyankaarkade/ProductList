import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { FlatList } from 'react-native';
import { styles } from './styles';
import Item from './Item';

class ProductFlatList extends PureComponent {
  static propTypes = {
    horizontal: PropTypes.bool,
    style: PropTypes.object,
    itemWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    onEndReached: PropTypes.func,
    listType: PropTypes.string
  };

  _renderItem = result => {
    const { itemWidth, listType } = this.props;
    return <Item itemWidth={itemWidth} product={result.item} listType={listType} />;
  };

  _keyExtractor = item => item.code;

  // The onEndReached function was getting called to frequently.
  // Solution taken from here:
  //   https://github.com/facebook/react-native/issues/14015#issuecomment-310675650
  _onEndReached = () => {
    if (!this.onEndReachedCalledDuringMomentum && this.props.onEndReached) {
      this.props.onEndReached();
      this.onEndReachedCalledDuringMomentum = true;
    }
  };

  _onMomentumScrollBegin = () => {
    this.onEndReachedCalledDuringMomentum = false;
  };

  render() {
    const { horizontal, style, itemWidth, onEndReached, ...props } = this.props;

    return (
      <FlatList
        style={style}
        keyExtractor={this._keyExtractor}
        renderItem={this._renderItem}
        horizontal={horizontal}
        onEndReachedThreshold={0.5}
        onMomentumScrollBegin={this._onMomentumScrollBegin}
        onEndReached={this._onEndReached}
        contentContainerStyle={styles.productList(horizontal)}
        {...props}
      />
    );
  }
}

export default ProductFlatList;
