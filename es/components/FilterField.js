import React from 'react';
import PropTypes from 'prop-types';
import i18n from '@dhis2/d2-i18n';
import Filter from './Filter/Filter';
import { styles } from './styles/FilterField.style';
export const FilterField = ({
  text,
  onFilterTextChange,
  onClearFilter
}) => React.createElement("div", {
  style: styles.container
}, React.createElement(Filter, {
  style: styles.textField,
  placeholder: i18n.t('Search'),
  text: text,
  onChange: onFilterTextChange,
  onClear: onClearFilter,
  disableUnderline: true
}));
FilterField.propTypes = {
  text: PropTypes.string.isRequired,
  onFilterTextChange: PropTypes.func.isRequired,
  onClearFilter: PropTypes.func.isRequired
};
export default FilterField;