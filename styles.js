import { margin, padding } from '../../styles/css';
import { outerMarginHorizontal } from '../../styles/measurments';
import { brandPrimary } from '../../styles/colors';
import { bold } from '../../styles/text';

export const itemSpacing = { h: 16, v: 20 };
const image = {
  width: '100%',
  marginBottom: 8
};

/* istanbul ignore next */
export const styles = {
  productList: isHorizontal => ({
    ...padding(
      isHorizontal ? 0 : outerMarginHorizontal - itemSpacing.v / 2,
      outerMarginHorizontal - itemSpacing.h / 2
    )
  }),
  productItem: (width, isHorizontal) => ({
    flex: 0,
    width,
    ...padding(isHorizontal ? 0 : itemSpacing.v / 2, itemSpacing.h / 2),
    flexDirection: 'column'
  }),
  // The aspectRatio property was not working directly on the image for android,
  // so this wrapper was needed.
  imageWrapper: {
    width: '100%',
    marginBottom: 8
  },
  image: {
    width: '100%'
  },
  imageUnavailable: {
    justifyContent: 'center',
    alignItems: 'center',
    ...image
  },
  heart: {
    position: 'absolute',
    top: 8,
    right: 8,
    ...padding(8, 8)
  },
  brand: {
    color: '#999999',
    fontSize: 12,
    lineHeight: 16
  },
  name: {
    fontSize: 14,
    lineHeight: 20
  },
  price: {
    fontSize: 10,
    lineHeight: 16
  },
  shop: {
    color: '#6499A4',
    borderColor: brandPrimary,
    borderWidth: 1,
    textAlign: 'center',
    height: 45,
    justifyContent: 'center',
    marginTop: 10,
    ...bold
  },
  close: {
    position: 'absolute',
    top: 8,
    right: 8,
    flex: 0,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center'
  }
};
