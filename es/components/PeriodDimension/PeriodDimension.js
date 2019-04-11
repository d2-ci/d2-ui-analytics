function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import { PeriodSelector } from '@dhis2/d2-ui-period-selector-dialog';
import i18n from '@dhis2/d2-i18n';
import { FIXED_DIMENSIONS } from '../../modules/fixedDimensions';
const peId = FIXED_DIMENSIONS.pe.id;
const PERIOD = 'PERIOD';
export class PeriodDimension extends Component {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "selectPeriods", periods => {
      const itemsToAdd = periods.reduce((array, item) => {
        array.push(_objectSpread({}, item, {
          dimensionItemType: PERIOD
        }));
        return array;
      }, []);
      this.props.onSelect({
        dimensionType: peId,
        value: [...this.props.selectedPeriods, ...itemsToAdd]
      });
    });

    _defineProperty(this, "deselectPeriods", periods => {
      const idsToRemove = periods.map(period => period.id);
      this.props.onDeselect({
        dimensionType: peId,
        value: idsToRemove
      });
    });

    _defineProperty(this, "reorderPeriods", periods => {
      const ids = periods.map(period => period.id);
      this.props.onReorder({
        dimensionType: peId,
        value: ids
      });
    });

    _defineProperty(this, "render", () => {
      const {
        selectedPeriods: selectedPeriods
      } = this.props;
      return React.createElement(Fragment, null, React.createElement(DialogTitle, null, i18n.t('Period')), React.createElement(DialogContent, null, React.createElement(PeriodSelector, {
        onSelect: this.selectPeriods,
        onDeselect: this.deselectPeriods,
        onReorder: this.reorderPeriods,
        selectedItems: selectedPeriods
      })));
    });
  }

}
PeriodDimension.propTypes = {
  d2: PropTypes.object,
  selectedPeriods: PropTypes.array,
  onSelect: PropTypes.func.isRequired,
  onDeselect: PropTypes.func.isRequired,
  onReorder: PropTypes.func.isRequired
};
PeriodDimension.defaultProps = {
  selectedPeriods: []
};
export default PeriodDimension;