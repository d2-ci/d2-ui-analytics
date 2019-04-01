"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PeriodIcon = function PeriodIcon() {
    return _react2.default.createElement(
        "svg",
        {
            width: "16px",
            height: "16px",
            viewBox: "0 0 16 16",
            version: "1.1",
            xmlns: "http://www.w3.org/2000/svg"
        },
        _react2.default.createElement(
            "g",
            {
                id: "Exp",
                stroke: "none",
                strokeWidth: "1",
                fill: "none",
                fillRule: "evenodd"
            },
            _react2.default.createElement(
                "g",
                { id: "Artboard", transform: "translate(-32.000000, -9.000000)" },
                _react2.default.createElement(
                    "g",
                    {
                        id: "icon_period_new",
                        transform: "translate(32.000000, 9.000000)"
                    },
                    _react2.default.createElement("rect", {
                        id: "frame",
                        fill: "#D8D8D8",
                        opacity: "0",
                        x: "0",
                        y: "0",
                        width: "16",
                        height: "16"
                    }),
                    _react2.default.createElement(
                        "g",
                        {
                            id: "time-clock-circle",
                            transform: "translate(2.000000, 2.000000)"
                        },
                        _react2.default.createElement("circle", {
                            id: "Oval",
                            stroke: "#000000",
                            strokeLinecap: "round",
                            strokeLinejoin: "round",
                            cx: "5.5",
                            cy: "5.5",
                            r: "5.5"
                        }),
                        _react2.default.createElement("path", {
                            d: "M6,5.29289322 L8.18198052,7.47487373 C8.37724266,7.67013588 8.37724266,7.98671837 8.18198052,8.18198052 C7.98671837,8.37724266 7.67013588,8.37724266 7.47487373,8.18198052 L5.01023174,5.71733852 L5,5.7144165 L5,3.5 C5,3.22385763 5.22385763,3 5.5,3 C5.77614237,3 6,3.22385763 6,3.5 L6,5.29289322 Z",
                            id: "Combined-Shape",
                            fill: "#000000"
                        })
                    )
                )
            )
        )
    );
};

exports.default = PeriodIcon;