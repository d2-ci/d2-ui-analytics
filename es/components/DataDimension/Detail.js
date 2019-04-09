import React from 'react';
import PropTypes from 'prop-types';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import i18n from '@dhis2/d2-i18n';
import { styles } from './styles/Details.style';
export const Detail = ({
  value: value,
  onDetailChange: onDetailChange,
  detailAlternatives: detailAlternatives
}) => React.createElement("div", {
  style: styles.detailContainer
}, React.createElement(InputLabel, {
  style: styles.titleText
}, i18n.t('Detail')), React.createElement(Select, {
  onChange: event => onDetailChange(event.target.value),
  value: value,
  disableUnderline: true,
  SelectDisplayProps: {
    style: styles.dropDown
  }
}, Object.entries(detailAlternatives).map(item => {
  return React.createElement(MenuItem, {
    key: item[0],
    value: item[0]
  }, item[1]);
})));
Detail.propTypes = {
  value: PropTypes.string.isRequired,
  onDetailChange: PropTypes.func.isRequired,
  detailAlternatives: PropTypes.object.isRequired
};
export default Detail;