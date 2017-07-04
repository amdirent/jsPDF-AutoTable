/*!
 * jsPDF AutoTable plugin v2.3.2
 * Copyright (c) 2014 Simon Bengtsson, https://github.com/simonbengtsson/jsPDF-AutoTable 
 * 
 * Licensed under the MIT License.
 * http://opensource.org/licenses/mit-license
 * 
 * */if (typeof window === 'object') window.jspdfAutoTableVersion = '2.3.2';/*
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("jspdf"));
	else if(typeof define === 'function' && define.amd)
		define(["jspdf"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("jspdf")) : factory(root["jsPDF"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function(__WEBPACK_EXTERNAL_MODULE_5__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 13);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var defaultsDocument = null;
var previousTableState;
var tableState = null;
exports.globalDefaults = {};
exports.documentDefaults = {};
function default_1() {
    return tableState;
}
exports["default"] = default_1;
function globalSettings() {
    return exports.globalDefaults;
}
exports.globalSettings = globalSettings;
function documentSettings() {
    return exports.documentDefaults;
}
exports.documentSettings = documentSettings;
var TableState = (function () {
    function TableState(doc) {
        this.doc = doc;
        this.scaleFactor = doc.internal.scaleFactor;
    }
    TableState.prototype.pageHeight = function () { return this.doc.internal.pageSize.height; };
    ;
    TableState.prototype.pageWidth = function () { return this.doc.internal.pageSize.width; };
    ;
    TableState.prototype.pageSize = function () { return this.doc.internal.pageSize; };
    ;
    return TableState;
}());
function setupState(doc) {
    previousTableState = tableState;
    tableState = new TableState(doc);
    if (doc !== defaultsDocument) {
        defaultsDocument = doc;
        exports.documentDefaults = {};
    }
}
exports.setupState = setupState;
function resetState() {
    tableState = previousTableState;
}
exports.resetState = resetState;
function setDefaults(defaults, doc) {
    if (doc === void 0) { doc = null; }
    if (doc) {
        exports.documentDefaults = defaults || {};
        defaultsDocument = doc;
    }
    else {
        exports.globalDefaults = defaults || {};
    }
}
exports.setDefaults = setDefaults;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var config_1 = __webpack_require__(2);
var state_1 = __webpack_require__(0);
var polyfills_1 = __webpack_require__(3);
function getStringWidth(text, styles) {
    var fontSize = styles.fontSize / state_1["default"]().scaleFactor;
    applyStyles(styles);
    text = Array.isArray(text) ? text : [text];
    var maxWidth = 0;
    text.forEach(function (line) {
        var width = state_1["default"]().doc.getStringUnitWidth(line);
        if (width > maxWidth) {
            maxWidth = width;
        }
    });
    var precision = 10000 * state_1["default"]().scaleFactor;
    maxWidth = Math.floor(maxWidth * precision) / precision;
    return maxWidth * fontSize;
}
exports.getStringWidth = getStringWidth;
/**
 * Ellipsize the text to fit in the width
 */
function ellipsize(text, width, styles, ellipsizeStr) {
    if (ellipsizeStr === void 0) { ellipsizeStr = '...'; }
    if (Array.isArray(text)) {
        var value_1 = [];
        text.forEach(function (str, i) {
            value_1[i] = ellipsize(str, width, styles, ellipsizeStr);
        });
        return value_1;
    }
    var precision = 10000 * state_1["default"]().scaleFactor;
    width = Math.ceil(width * precision) / precision;
    if (width >= getStringWidth(text, styles)) {
        return text;
    }
    while (width < getStringWidth(text + ellipsizeStr, styles)) {
        if (text.length <= 1) {
            break;
        }
        text = text.substring(0, text.length - 1);
    }
    return text.trim() + ellipsizeStr;
}
exports.ellipsize = ellipsize;
function addTableBorder() {
    var table = state_1["default"]().table;
    var styles = { lineWidth: table.settings.tableLineWidth, lineColor: table.settings.tableLineColor };
    applyStyles(styles);
    var fs = getFillStyle(styles);
    if (fs) {
        table.doc.rect(table.pageStartX, table.pageStartY, table.width, table.cursor.y - table.pageStartY, fs);
    }
}
exports.addTableBorder = addTableBorder;
function getFillStyle(styles) {
    var drawLine = styles.lineWidth > 0;
    var drawBackground = styles.fillColor || styles.fillColor === 0;
    if (drawLine && drawBackground) {
        return 'DF'; // Fill then stroke
    }
    else if (drawLine) {
        return 'S'; // Only stroke (transparent background)
    }
    else if (drawBackground) {
        return 'F'; // Only fill, no stroke
    }
    else {
        return false;
    }
}
exports.getFillStyle = getFillStyle;
function applyUserStyles() {
    applyStyles(state_1["default"]().table.userStyles);
}
exports.applyUserStyles = applyUserStyles;
function applyStyles(styles) {
    var doc = state_1["default"]().doc;
    var styleModifiers = {
        fillColor: doc.setFillColor,
        textColor: doc.setTextColor,
        fontStyle: doc.setFontStyle,
        lineColor: doc.setDrawColor,
        lineWidth: doc.setLineWidth,
        font: doc.setFont,
        fontSize: doc.setFontSize
    };
    Object.keys(styleModifiers).forEach(function (name) {
        var style = styles[name];
        var modifier = styleModifiers[name];
        if (typeof style !== 'undefined') {
            if (Array.isArray(style)) {
                modifier.apply(this, style);
            }
            else {
                modifier(style);
            }
        }
    });
}
exports.applyStyles = applyStyles;
// This is messy, only keep array and number format the next major version
function marginOrPadding(value, defaultValue) {
    var newValue = {};
    if (Array.isArray(value)) {
        if (value.length >= 4) {
            newValue = { 'top': value[0], 'right': value[1], 'bottom': value[2], 'left': value[3] };
        }
        else if (value.length === 3) {
            newValue = { 'top': value[0], 'right': value[1], 'bottom': value[2], 'left': value[1] };
        }
        else if (value.length === 2) {
            newValue = { 'top': value[0], 'right': value[1], 'bottom': value[0], 'left': value[1] };
        }
        else if (value.length === 1) {
            value = value[0];
        }
        else {
            value = defaultValue;
        }
    }
    else if (typeof value === 'object') {
        if (value['vertical']) {
            value['top'] = value['vertical'];
            value['bottom'] = value['vertical'];
        }
        else if (value['horizontal']) {
            value['right'] = value['horizontal'];
            value['left'] = value['horizontal'];
        }
        for (var _i = 0, _a = ['top', 'right', 'bottom', 'left']; _i < _a.length; _i++) {
            var side = _a[_i];
            newValue[side] = (value[side] || value[side] === 0) ? value[side] : defaultValue;
        }
    }
    if (typeof value === 'number') {
        newValue = { 'top': value, 'right': value, 'bottom': value, 'left': value };
    }
    return newValue;
}
exports.marginOrPadding = marginOrPadding;
function styles(styles) {
    styles = Array.isArray(styles) ? styles : [styles];
    return polyfills_1.assign.apply(void 0, [config_1.defaultStyles()].concat(styles));
}
exports.styles = styles;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
/**
 * Ratio between font size and font height. The number comes from jspdf's source code
 */
exports.FONT_ROW_RATIO = 1.15;
var state_1 = __webpack_require__(0);
function defaultConfig() {
    return {
        // Styling
        theme: 'auto',
        styles: {},
        headStyles: {},
        bodyStyles: {},
        footStyles: {},
        alternateRowStyles: {},
        columnStyles: {},
        // Custom content
        head: null,
        body: null,
        foot: null,
        // Html content
        fromHtml: null,
        includeHiddenHtml: false,
        useCss: false,
        // Properties
        startY: false,
        margin: 40 / state_1["default"]().scaleFactor,
        avoidTableSplit: false,
        avoidRowSplit: false,
        tableWidth: 'auto',
        showHead: 'everyPage',
        showFoot: 'everyPage',
        tableLineWidth: 0,
        tableLineColor: 200,
        tableId: null,
        // Hooks
        willParseCell: function (data) { },
        didParseCell: function (data) { },
        willDrawCell: function (data) { },
        didDrawCell: function (data) { },
        didDrawPage: function (data) { },
        allSectionHooks: false
    };
}
exports.defaultConfig = defaultConfig;
// Base style for all themes
function defaultStyles() {
    return {
        font: "helvetica",
        fontStyle: 'normal',
        overflow: 'linebreak',
        fillColor: false,
        textColor: 20,
        halign: 'left',
        valign: 'top',
        fontSize: 10,
        cellPadding: 5 / state_1["default"]().scaleFactor,
        lineColor: 200,
        lineWidth: 0 / state_1["default"]().scaleFactor,
        cellWidth: 'auto',
        minCellHeight: 0
    };
}
exports.defaultStyles = defaultStyles;
/**
 * Styles for the themes (overriding the default styles)
 */
function getTheme(name) {
    var themes = {
        'striped': {
            table: { fillColor: 255, textColor: 80, fontStyle: 'normal' },
            head: { textColor: 255, fillColor: [41, 128, 185], fontStyle: 'bold' },
            body: {},
            foot: { textColor: 255, fillColor: [41, 128, 185], fontStyle: 'bold' },
            alternateRow: { fillColor: 245 }
        },
        'grid': {
            table: { fillColor: 255, textColor: 80, fontStyle: 'normal', lineWidth: 0.1 },
            head: { textColor: 255, fillColor: [26, 188, 156], fontStyle: 'bold', lineWidth: 0 },
            body: {},
            foot: { textColor: 255, fillColor: [26, 188, 156], fontStyle: 'bold', lineWidth: 0 },
            alternateRow: {}
        },
        'plain': {
            head: { fontStyle: 'bold' },
            foot: { fontStyle: 'bold' }
        }
    };
    return themes[name];
}
exports.getTheme = getTheme;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*
 * Include common small polyfills instead of requiring the user to to do it
 */
exports.__esModule = true;
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign
function assign(target) {
    'use strict';
    var varArgs = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        varArgs[_i - 1] = arguments[_i];
    }
    if (target == null) {
        throw new TypeError('Cannot convert undefined or null to object');
    }
    var to = Object(target);
    for (var index = 1; index < arguments.length; index++) {
        var nextSource = arguments[index];
        if (nextSource != null) {
            for (var nextKey in nextSource) {
                // Avoid bugs when hasOwnProperty is shadowed
                if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
                    to[nextKey] = nextSource[nextKey];
                }
            }
        }
    }
    return to;
}
exports.assign = assign;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var config_1 = __webpack_require__(2);
var common_1 = __webpack_require__(1);
var state_1 = __webpack_require__(0);
function drawTable(table) {
    var settings = table.settings;
    table.cursor = {
        x: table.margin('left'),
        y: settings.startY === false ? table.margin('top') : settings.startY
    };
    var minTableBottomPos = settings.startY + table.margin('bottom') + table.headHeight + table.footHeight;
    if (settings.avoidTableSplit) {
        minTableBottomPos += table.height;
    }
    if (settings.startY !== false && minTableBottomPos > state_1["default"]().pageHeight()) {
        nextPage(table.doc);
        table.cursor.y = table.margin('top');
    }
    table.pageStartX = table.cursor.x;
    table.pageStartY = table.cursor.y;
    common_1.applyUserStyles();
    if (settings.showHead === true || settings.showHead === 'firstPage' || settings.showHead === 'everyPage') {
        table.head.forEach(function (row) { return printRow(row); });
    }
    common_1.applyUserStyles();
    table.body.forEach(function (row) {
        printFullRow(row);
    });
    common_1.applyUserStyles();
    if (settings.showFoot === true || settings.showFoot === 'lastPage' || settings.showFoot === 'everyPage') {
        table.foot.forEach(function (row) { return printRow(row); });
    }
    common_1.addTableBorder();
    table.callEndPageHooks();
}
exports.drawTable = drawTable;
function printFullRow(row) {
    var remainingRowHeight = 0;
    var remainingTexts = {};
    var table = state_1["default"]().table;
    if (!canFitOnPage(row.maxCellHeight)) {
        var maxTableHeight = table.doc.internal.pageSize.height - table.margin('top') - table.margin('bottom');
        if (row.maxCellLineCount <= 1 || (table.settings.avoidRowSplit && row.maxCellHeight < maxTableHeight)) {
            addPage();
        }
        else {
            // Modify the row to fit the current page and calculate text and height of partial row
            row.spansMultiplePages = true;
            var pageHeight = table.doc.internal.pageSize.height;
            var maxCellHeight = 0;
            var maxRowSpanCellHeight = 0;
            for (var j = 0; j < table.columns.length; j++) {
                var column = table.columns[j];
                var cell = row.cells[column.dataKey];
                if (!cell) {
                    continue;
                }
                var fontHeight = cell.styles.fontSize / table.scaleFactor * config_1.FONT_ROW_RATIO;
                var vPadding = cell.padding('vertical');
                var remainingPageSpace = pageHeight - table.cursor.y - table.margin('bottom');
                var remainingLineCount = Math.floor((remainingPageSpace - vPadding) / fontHeight);
                if (Array.isArray(cell.text) && cell.text.length > remainingLineCount) {
                    var remainingLines = cell.text.splice(remainingLineCount, cell.text.length);
                    remainingTexts[column.dataKey] = remainingLines;
                    var cellHeight = cell.text.length * fontHeight + vPadding;
                    if (cellHeight > maxCellHeight) {
                        maxCellHeight = cellHeight;
                    }
                    var rCellHeight = remainingLines.length * fontHeight + vPadding;
                    if (rCellHeight > remainingRowHeight) {
                        remainingRowHeight = rCellHeight;
                    }
                }
            }
            // Reset row height since text are now removed
            row.height = maxCellHeight;
            row.maxCellHeight = maxRowSpanCellHeight;
        }
    }
    printRow(row);
    // Parts of the row is now printed. Time for adding a new page, prune 
    // the text and start over
    if (Object.keys(remainingTexts).length > 0) {
        for (var j = 0; j < table.columns.length; j++) {
            var col = table.columns[j];
            var cell = row.cells[col.dataKey];
            cell.text = remainingTexts[col.dataKey] || '';
        }
        addPage();
        row.pageCount++;
        row.height = remainingRowHeight;
        printFullRow(row);
    }
}
function printRow(row) {
    var table = state_1["default"]().table;
    table.cursor.x = table.margin('left');
    row.y = table.cursor.y;
    row.x = table.cursor.x;
    /*
    if (table.emitEvent(new ATEvent('addingRow', state().table, row)) === false) {
        table.cursor.y += row.height;
        return;
    }
    */
    // For backwards compatibility reset those after addingRow event
    table.cursor.x = table.margin('left');
    row.y = table.cursor.y;
    row.x = table.cursor.x;
    for (var _i = 0, _a = table.columns; _i < _a.length; _i++) {
        var column = _a[_i];
        var cell = row.cells[column.dataKey];
        if (!cell) {
            table.cursor.x += column.width;
            continue;
        }
        common_1.applyStyles(cell.styles);
        cell.x = table.cursor.x;
        cell.y = row.y;
        if (cell.styles.valign === 'top') {
            cell.textPos.y = table.cursor.y + cell.padding('top');
        }
        else if (cell.styles.valign === 'bottom') {
            cell.textPos.y = table.cursor.y + cell.height - cell.padding('bottom');
        }
        else {
            cell.textPos.y = table.cursor.y + cell.height / 2;
        }
        if (cell.styles.halign === 'right') {
            cell.textPos.x = cell.x + cell.width - cell.padding('right');
        }
        else if (cell.styles.halign === 'center') {
            cell.textPos.x = cell.x + cell.width / 2;
        }
        else {
            cell.textPos.x = cell.x + cell.padding('left');
        }
        if (table.callCellHooks(table.cellHooks.willDrawCell, cell, row, column) === false) {
            table.cursor.x += column.width;
            continue;
        }
        var fillStyle = common_1.getFillStyle(cell.styles);
        if (fillStyle) {
            table.doc.rect(cell.x, table.cursor.y, cell.width, cell.height, fillStyle);
        }
        state_1["default"]().doc.autoTableText(cell.text, cell.textPos.x, cell.textPos.y, {
            halign: cell.styles.halign,
            valign: cell.styles.valign
        });
        table.callCellHooks(table.cellHooks.didDrawCell, cell, row, column);
        table.cursor.x += column.width;
    }
    //table.emitEvent(new ATEvent('addedRow', state().table, row));
    table.cursor.y += row.height;
}
function canFitOnPage(rowHeight) {
    var table = state_1["default"]().table;
    var bottomContentHeight = table.margin('bottom');
    var showFoot = table.settings.showFoot;
    if (showFoot === true || showFoot === 'everyPage' || showFoot === 'lastPage') {
        bottomContentHeight += table.footHeight;
    }
    var pos = rowHeight + table.cursor.y + bottomContentHeight;
    return pos < state_1["default"]().pageHeight();
}
function addPage() {
    var table = state_1["default"]().table;
    common_1.applyUserStyles();
    if (table.settings.showFoot === true || table.settings.showFoot === 'everyPage') {
        table.foot.forEach(function (row) { return printRow(row); });
    }
    table.finalY = table.cursor.y;
    // Add user content just before adding new page ensure it will 
    // be drawn above other things on the page
    table.callEndPageHooks();
    common_1.addTableBorder();
    nextPage(table.doc);
    table.pageCount++;
    table.cursor = { x: table.margin('left'), y: table.margin('top') };
    table.pageStartX = table.cursor.x;
    table.pageStartY = table.cursor.y;
    if (table.settings.showHead === true || table.settings.showHead === 'everyPage') {
        table.head.forEach(function (row) { return printRow(row); });
    }
}
exports.addPage = addPage;
function nextPage(doc) {
    var current = doc.internal.getCurrentPageInfo().pageNumber;
    doc.setPage(current + 1);
    var newCurrent = doc.internal.getCurrentPageInfo().pageNumber;
    if (newCurrent === current) {
        doc.addPage();
    }
}


/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_5__;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var jsPDF = __webpack_require__(5);
/**
 * Improved text function with halign and valign support
 * Inspiration from: http://stackoverflow.com/questions/28327510/align-text-right-using-jspdf/28433113#28433113
 */
jsPDF.API.autoTableText = function (text, x, y, styles) {
    styles = styles || {};
    var FONT_ROW_RATIO = 1.15;
    if (typeof x !== 'number' || typeof y !== 'number') {
        console.error('The x and y parameters are required. Missing for text: ', text);
    }
    var k = this.internal.scaleFactor;
    var fontSize = this.internal.getFontSize() / k;
    var splitRegex = /\r\n|\r|\n/g;
    var splitText = null;
    var lineCount = 1;
    if (styles.valign === 'middle' || styles.valign === 'bottom' || styles.halign === 'center' || styles.halign === 'right') {
        splitText = typeof text === 'string' ? text.split(splitRegex) : text;
        lineCount = splitText.length || 1;
    }
    // Align the top
    y += fontSize * (2 - FONT_ROW_RATIO);
    if (styles.valign === 'middle')
        y -= (lineCount / 2) * fontSize * FONT_ROW_RATIO;
    else if (styles.valign === 'bottom')
        y -= lineCount * fontSize * FONT_ROW_RATIO;
    if (styles.halign === 'center' || styles.halign === 'right') {
        var alignSize = fontSize;
        if (styles.halign === 'center')
            alignSize *= 0.5;
        if (lineCount >= 1) {
            for (var iLine = 0; iLine < splitText.length; iLine++) {
                this.text(splitText[iLine], x - this.getStringUnitWidth(splitText[iLine]) * alignSize, y);
                y += fontSize;
            }
            return this;
        }
        x -= this.getStringUnitWidth(text) * alignSize;
    }
    this.text(text, x, y);
    return this;
};


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var config_1 = __webpack_require__(2);
var common_1 = __webpack_require__(1);
var state_1 = __webpack_require__(0);
/**
 * Calculate the column widths
 */
function calculateWidths(table) {
    // TODO Fix those cases
    var columnMinWidth = 10 / state_1["default"]().scaleFactor;
    if (columnMinWidth * table.columns.length > table.width) {
        console.error('Columns could not fit on page');
    }
    else if (table.minWidth > table.width) {
        console.error("Column widths to wide and can't fit page");
    }
    var copy = table.columns.slice(0);
    var diffWidth = table.width - table.wrappedWidth;
    distributeWidth(copy, diffWidth, table.wrappedWidth);
    applyColSpans(table);
    fitContent(table);
    applyRowSpans(table);
}
exports.calculateWidths = calculateWidths;
function applyRowSpans(table) {
    var rowSpanCells = {};
    var colRowSpansLeft = 1;
    var all = table.allRows();
    for (var rowIndex = 0; rowIndex < all.length; rowIndex++) {
        var row = all[rowIndex];
        for (var _i = 0, _a = table.columns; _i < _a.length; _i++) {
            var column = _a[_i];
            var data = rowSpanCells[column.dataKey];
            if (colRowSpansLeft > 1) {
                colRowSpansLeft--;
                delete row.cells[column.dataKey];
            }
            else if (data) {
                data.cell.height += row.height;
                if (data.cell.height > row.maxCellHeight) {
                    data.row.maxCellHeight = data.cell.height;
                    data.row.maxCellLineCount = Array.isArray(data.cell.text) ? data.cell.text.length : 1;
                }
                colRowSpansLeft = data.cell.colSpan;
                delete row.cells[column.dataKey];
                data.left--;
                if (data.left <= 1) {
                    delete rowSpanCells[column.dataKey];
                }
            }
            else {
                var cell = row.cells[column.dataKey];
                if (!cell) {
                    continue;
                }
                cell.height = row.height;
                if (cell.rowSpan > 1) {
                    var remaining = all.length - rowIndex;
                    var left = cell.rowSpan > remaining ? remaining : cell.rowSpan;
                    rowSpanCells[column.dataKey] = { cell: cell, left: left, row: row };
                }
            }
        }
        if (row.section === 'head') {
            table.headHeight += row.maxCellHeight;
        }
        if (row.section === 'foot') {
            table.footHeight += row.maxCellHeight;
        }
        table.height += row.height;
    }
}
function applyColSpans(table) {
    var all = table.allRows();
    for (var rowIndex = 0; rowIndex < all.length; rowIndex++) {
        var row = all[rowIndex];
        var colSpanCell = null;
        var combinedColSpanWidth = 0;
        var colSpansLeft = 0;
        for (var columnIndex = 0; columnIndex < table.columns.length; columnIndex++) {
            var column = table.columns[columnIndex];
            var cell = null;
            // Width and colspan
            colSpansLeft -= 1;
            if (colSpansLeft > 1 && table.columns[columnIndex + 1]) {
                combinedColSpanWidth += column.width;
                delete row.cells[column.dataKey];
                continue;
            }
            else if (colSpanCell) {
                cell = colSpanCell;
                delete row.cells[column.dataKey];
                colSpanCell = null;
            }
            else {
                cell = row.cells[column.dataKey];
                if (!cell)
                    continue;
                colSpansLeft = cell.colSpan;
                combinedColSpanWidth = 0;
                if (cell.colSpan > 1) {
                    colSpanCell = cell;
                    combinedColSpanWidth += column.width;
                    continue;
                }
            }
            cell.width = column.width + combinedColSpanWidth;
        }
    }
}
function fitContent(table) {
    for (var _i = 0, _a = table.allRows(); _i < _a.length; _i++) {
        var row = _a[_i];
        for (var _b = 0, _c = table.columns; _b < _c.length; _b++) {
            var column = _c[_b];
            var cell = row.cells[column.dataKey];
            if (!cell)
                continue;
            common_1.applyStyles(cell.styles);
            var textSpace = cell.width - cell.padding('horizontal');
            if (cell.styles.overflow === 'linebreak') {
                cell.text = Array.isArray(cell.text) ? cell.text.join(' ') : cell.text;
                // Add one pt to textSpace to fix rounding error
                cell.text = state_1["default"]().doc.splitTextToSize(cell.text, textSpace + 1, { fontSize: cell.styles.fontSize });
            }
            else if (cell.styles.overflow === 'ellipsize') {
                cell.text = common_1.ellipsize(cell.text, textSpace, cell.styles);
            }
            else if (cell.styles.overflow === 'hidden') {
                cell.text = common_1.ellipsize(cell.text, textSpace, cell.styles, '');
            }
            else if (typeof cell.styles.overflow === 'function') {
                cell.text = cell.styles.overflow(cell.text, textSpace);
            }
            var lineCount = Array.isArray(cell.text) ? cell.text.length : 1;
            lineCount = cell.rowSpan <= 1 ? lineCount : 1;
            var fontHeight = cell.styles.fontSize / state_1["default"]().scaleFactor * config_1.FONT_ROW_RATIO;
            cell.contentHeight = lineCount * fontHeight + cell.padding('vertical');
            if (cell.styles.minCellHeight > cell.contentHeight) {
                cell.contentHeight = cell.styles.minCellHeight;
            }
            if (cell.contentHeight > row.height) {
                row.height = cell.contentHeight;
                row.maxCellHeight = cell.contentHeight;
                row.maxCellLineCount = lineCount;
            }
        }
    }
}
function distributeWidth(autoColumns, diffWidth, wrappedAutoColumnsWidth) {
    for (var i = 0; i < autoColumns.length; i++) {
        var column = autoColumns[i];
        var ratio = column.wrappedWidth / wrappedAutoColumnsWidth;
        var suggestedChange = diffWidth * ratio;
        var suggestedWidth = column.wrappedWidth + suggestedChange;
        if (suggestedWidth >= column.minWidth) {
            column.width = suggestedWidth;
        }
        else {
            // We can't reduce the width of this column. Mark as none auto column and start over
            column.width = column.minWidth;
            wrappedAutoColumnsWidth -= column.wrappedWidth;
            autoColumns.splice(i, 1);
            distributeWidth(autoColumns, diffWidth, wrappedAutoColumnsWidth);
            break;
        }
    }
}
function widthRatio(ratio) {
    return 1 / (1 - ratio) - 1;
}


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var models_1 = __webpack_require__(14);
var config_1 = __webpack_require__(2);
var htmlParser_1 = __webpack_require__(12);
var polyfills_1 = __webpack_require__(3);
var common_1 = __webpack_require__(1);
var state_1 = __webpack_require__(0);
function validateInput(allOptions) {
    var _loop_1 = function (settings) {
        if (settings && typeof settings !== 'object') {
            console.error("The options parameter should be of type object, is: " + typeof settings);
        }
        if (typeof settings.extendWidth !== 'undefined') {
            settings.tableWidth = settings.extendWidth ? 'auto' : 'wrap';
            console.error("Use of deprecated option: extendWidth, use tableWidth instead.");
        }
        if (typeof settings.margins !== 'undefined') {
            if (typeof settings.margin === 'undefined')
                settings.margin = settings.margins;
            console.error("Use of deprecated option: margins, use margin instead.");
        }
        if (typeof settings.showHeader !== 'undefined') {
            if (settings.showHead == undefined)
                settings.showHead = settings.showHeader;
            console.error("Deprecation warning: showHeader renamed to showHead");
        }
        if (typeof settings.headerStyles !== 'undefined') {
            if (settings.headStyles == undefined)
                settings.headStyles = settings.headerStyles;
            console.error("Deprecation warning: headerStyles renamed to headStyles");
        }
        if (settings.pageBreak != undefined) {
            if (settings.avoidTableSplit == undefined)
                settings.avoidTableSplit = settings.pageBreak === 'avoid';
            console.error("Deprecation warning: pageBreak renamed to avoidTableSplit");
        }
        if (typeof settings.afterPageContent !== 'undefined' || typeof settings.beforePageContent !== 'undefined' || typeof settings.afterPageAdd !== 'undefined') {
            console.error("The afterPageContent, beforePageContent and afterPageAdd hooks are deprecated. Use addPageContent instead");
            if (typeof settings.addPageContent === 'undefined') {
                settings.addPageContent = function (data) {
                    common_1.applyUserStyles();
                    if (settings.beforePageContent)
                        settings.beforePageContent(data);
                    common_1.applyUserStyles();
                    if (settings.afterPageContent)
                        settings.afterPageContent(data);
                    common_1.applyUserStyles();
                    if (settings.afterPageAdd && data.pageCount > 1) {
                        data.afterPageAdd(data);
                    }
                    common_1.applyUserStyles();
                };
            }
        }
        var oldHooks = ["createdHeaderCell", "createdCell", "drawHeaderRow", "drawRow", "drawHeaderCell", "drawCell", "addPageContent"];
        for (var _i = 0, oldHooks_1 = oldHooks; _i < oldHooks_1.length; _i++) {
            var hookName = oldHooks_1[_i];
            if (settings[hookName]) {
                console.error("The hook \"" + hookName + "\" has been removed/renamed in version 3.0 of jspdf-autotable. Make sure you update your project according to the migration guide.");
            }
        }
        [['padding', 'cellPadding'], ['lineHeight', 'rowHeight'], 'fontSize', 'overflow'].forEach(function (o) {
            var deprecatedOption = typeof o === 'string' ? o : o[0];
            var style = typeof o === 'string' ? o : o[1];
            if (typeof settings[deprecatedOption] !== 'undefined') {
                if (typeof settings.styles[style] === 'undefined') {
                    settings.styles[style] = settings[deprecatedOption];
                }
                console.error("Use of deprecated option: " + deprecatedOption + ", use the style " + style + " instead.");
            }
        });
        checkStyles = function (styles) {
            if (styles.rowHeight) {
                console.error("Use of deprecated style rowHeight. It is renamed to minCellHeight.");
                if (!styles.minCellHeight) {
                    styles.minCellHeight = styles.rowHeight;
                }
            }
            else if (styles.columnWidth) {
                console.error("Use of deprecated style columnWidth. It is renamed to cellWidth.");
                if (!styles.cellWidth) {
                    styles.cellWidth = styles.columnWidth;
                }
            }
        };
        for (var _a = 0, _b = ['styles', 'bodyStyles', 'headStyles', 'footStyles']; _a < _b.length; _a++) {
            var styleProp = _b[_a];
            checkStyles(settings[styleProp] || {});
        }
        var columnStyles = settings['columnStyles'] || {};
        for (var _c = 0, _d = Object.keys(columnStyles); _c < _d.length; _c++) {
            var dataKey = _d[_c];
            checkStyles(columnStyles[dataKey] || {});
        }
    };
    var checkStyles;
    for (var _i = 0, allOptions_1 = allOptions; _i < allOptions_1.length; _i++) {
        var settings = allOptions_1[_i];
        _loop_1(settings);
    }
}
exports.validateInput = validateInput;
function parseArguments(args) {
    if (typeof args[0] === 'number') {
        var opts = args[1];
        opts.startY = args[0];
        return opts;
    }
    else if (Array.isArray(args[0])) {
        // Deprecated initialization
        var opts_1 = args[2] || {};
        if (!opts_1.columns && !opts_1.head && !opts_1.body) {
            opts_1.columns = [];
            var headers = args[0];
            if (!opts_1.head)
                opts_1.head = [[]];
            var dataKeys_1 = [];
            headers.forEach(function (item, i) {
                if (item && item.dataKey != undefined) {
                    item = { dataKey: item.dataKey, content: item.title };
                }
                else {
                    item = { dataKey: i, content: item };
                }
                dataKeys_1.push(item.dataKey);
                opts_1.head[0].push(item);
            });
            opts_1.body = [];
            for (var _i = 0, _a = args[1]; _i < _a.length; _i++) {
                var rawRow = _a[_i];
                var row = {};
                for (var _b = 0, dataKeys_2 = dataKeys_1; _b < dataKeys_2.length; _b++) {
                    var dataKey = dataKeys_2[_b];
                    row[dataKey] = rawRow[dataKey];
                }
                opts_1.body.push(row);
            }
        }
        return opts_1;
    }
    else {
        return args[0];
    }
}
exports.parseArguments = parseArguments;
/**
 * Create models from the user input
 */
function parseInput(doc, allOptions) {
    validateInput(allOptions);
    var table = new models_1.Table(doc);
    var settings = parseSettings(table, allOptions, config_1.defaultConfig());
    table.id = settings.tableId;
    state_1["default"]().table = table;
    if (settings.theme === 'auto') {
        settings.theme = settings.useCss ? 'plain' : 'striped';
    }
    var theme = config_1.getTheme(settings.theme);
    var cellStyles = {
        head: [theme.table, theme.foot, table.styles.styles, table.styles.headStyles],
        body: [theme.table, theme.body, table.styles.styles, table.styles.bodyStyles],
        foot: [theme.table, theme.foot, table.styles.styles, table.styles.footStyles]
    };
    var htmlContent = {};
    if (table.settings.fromHtml) {
        htmlContent = htmlParser_1.parseHtml(settings.fromHtml, settings.includeHiddenHtml, settings.useCss);
        if (!htmlContent)
            htmlContent = {};
    }
    var columnMap = {};
    var spanColumns = {};
    for (var _i = 0, _a = ['head', 'body', 'foot']; _i < _a.length; _i++) {
        var sectionName = _a[_i];
        var section = table.settings[sectionName] || htmlContent[sectionName] || [];
        var rowColumns = [];
        for (var rowIndex = 0; rowIndex < section.length; rowIndex++) {
            var rawRow = section[rowIndex];
            var row = new models_1.Row(rawRow, rowIndex, sectionName);
            var rowStyles = sectionName === 'body' && rowIndex % 2 === 0 ? polyfills_1.assign({}, theme.alternateRow, table.styles.alternateRowStyles) : {};
            var keys = Object.keys(rawRow);
            var columnIndex = 0;
            for (var i = 0; i < keys.length; i++) {
                var rawCell = rawRow[keys[i]];
                var dataKey = rawCell.dataKey || rawCell.key || (Array.isArray(rawRow) ? columnIndex : keys[i]);
                var colStyles = sectionName === 'body' ? table.styles.columnStyles[dataKey] || {} : {};
                var column = columnMap[dataKey];
                if (!column) {
                    if (spanColumns[columnIndex]) {
                        column = spanColumns[columnIndex];
                        column.dataKey = dataKey;
                    }
                    else {
                        column = new models_1.Column(dataKey);
                    }
                }
                rowColumns.push(column);
                var style = common_1.styles(cellStyles[sectionName].concat([rowStyles, colStyles]));
                var cell = new models_1.Cell(rawCell, style, sectionName);
                if (Array.isArray(rawRow)) {
                    for (var j = 0; j < cell.colSpan - 1; j++) {
                        columnIndex++;
                        var column_1 = new models_1.Column(columnIndex);
                        spanColumns[columnIndex] = column_1;
                        rowColumns.push(column_1);
                    }
                }
                if (table.callCellHooks(table.cellHooks.willParseCell, cell, row, column) !== false) {
                    row.cells[dataKey] = cell;
                    cell.contentWidth = cell.padding('horizontal') + common_1.getStringWidth(cell.text, cell.styles);
                    if (typeof cell.styles.cellWidth === 'number') {
                        cell.minWidth = cell.styles.cellWidth;
                        cell.wrappedWidth = cell.styles.cellWidth;
                    }
                    else if (cell.styles.cellWidth === 'wrap') {
                        cell.minWidth = cell.contentWidth;
                        cell.wrappedWidth = cell.contentWidth;
                    }
                    else {
                        cell.minWidth = 10 / state_1["default"]().scaleFactor;
                        cell.wrappedWidth = cell.contentWidth;
                    }
                    if (cell.wrappedWidth > column.wrappedWidth) {
                        column.wrappedWidth = cell.wrappedWidth;
                    }
                    if (cell.minWidth > column.minWidth) {
                        column.minWidth = cell.minWidth;
                    }
                }
                columnIndex++;
            }
            //if (keys.length > 0 && table.emitEvent(new HookData('parsingRow', table, row)) !== false) {
            table[sectionName].push(row);
            for (var i = 0; i < rowColumns.length; i++) {
                var column = rowColumns[i];
                if (!columnMap[column.dataKey]) {
                    table.columns.splice(i, 0, column);
                    columnMap[column.dataKey] = column;
                }
            }
            //}
        }
    }
    for (var _b = 0, _c = table.columns; _b < _c.length; _b++) {
        var column = _c[_b];
        table.minWidth += column.minWidth;
        table.wrappedWidth += column.wrappedWidth;
    }
    if (typeof table.settings.tableWidth === 'number') {
        table.width = table.settings.tableWidth;
    }
    else if (table.settings.tableWidth === 'wrap') {
        table.width = table.wrappedWidth;
    }
    else {
        table.width = state_1["default"]().pageWidth() - table.margin('left') - table.margin('right');
    }
    table.settings.margin = common_1.marginOrPadding(table.settings.margin, config_1.defaultConfig().margin);
    return table;
}
exports.parseInput = parseInput;
function parseSettings(table, allOptions, defaults) {
    var _loop_2 = function (styleProp) {
        var styles_1 = allOptions.map(function (opts) { return (opts[styleProp] || {}); });
        table.styles[styleProp] = polyfills_1.assign.apply(void 0, [{}].concat(styles_1));
    };
    // Merge styles one level deeper
    for (var _i = 0, _a = Object.keys(table.styles); _i < _a.length; _i++) {
        var styleProp = _a[_i];
        _loop_2(styleProp);
    }
    // Append hooks
    for (var _b = 0, allOptions_2 = allOptions; _b < allOptions_2.length; _b++) {
        var opts = allOptions_2[_b];
        for (var _c = 0, _d = Object.keys(table.cellHooks); _c < _d.length; _c++) {
            var hookName = _d[_c];
            if (opts && opts[hookName]) {
                table.cellHooks[hookName].push(opts[hookName]);
                delete opts[hookName];
            }
        }
    }
    // Merge all other options one level
    table.settings = polyfills_1.assign.apply(void 0, [defaults].concat(allOptions));
    return table.settings;
}


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/


/* eslint-disable no-unused-vars */
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;

function toObject(val) {
	if (val === null || val === undefined) {
		throw new TypeError('Object.assign cannot be called with null or undefined');
	}

	return Object(val);
}

function shouldUseNative() {
	try {
		if (!Object.assign) {
			return false;
		}

		// Detect buggy property enumeration order in older V8 versions.

		// https://bugs.chromium.org/p/v8/issues/detail?id=4118
		var test1 = new String('abc');  // eslint-disable-line no-new-wrappers
		test1[5] = 'de';
		if (Object.getOwnPropertyNames(test1)[0] === '5') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test2 = {};
		for (var i = 0; i < 10; i++) {
			test2['_' + String.fromCharCode(i)] = i;
		}
		var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
			return test2[n];
		});
		if (order2.join('') !== '0123456789') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test3 = {};
		'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
			test3[letter] = letter;
		});
		if (Object.keys(Object.assign({}, test3)).join('') !==
				'abcdefghijklmnopqrst') {
			return false;
		}

		return true;
	} catch (err) {
		// We don't expect any of the above to throw, but better to be safe.
		return false;
	}
}

module.exports = shouldUseNative() ? Object.assign : function (target, source) {
	var from;
	var to = toObject(target);
	var symbols;

	for (var s = 1; s < arguments.length; s++) {
		from = Object(arguments[s]);

		for (var key in from) {
			if (hasOwnProperty.call(from, key)) {
				to[key] = from[key];
			}
		}

		if (getOwnPropertySymbols) {
			symbols = getOwnPropertySymbols(from);
			for (var i = 0; i < symbols.length; i++) {
				if (propIsEnumerable.call(from, symbols[i])) {
					to[symbols[i]] = from[symbols[i]];
				}
			}
		}
	}

	return to;
};


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var painter_1 = __webpack_require__(4);
var state_1 = __webpack_require__(0);
var HookData = (function () {
    function HookData() {
        var table = state_1["default"]().table;
        this.table = table;
        this.pageCount = table.pageCount;
        this.settings = table.settings;
        this.cursor = table.cursor;
        this.doc = table.doc;
        this.addPage = painter_1.addPage;
    }
    return HookData;
}());
exports.HookData = HookData;
var CellHookData = (function (_super) {
    __extends(CellHookData, _super);
    function CellHookData(cell, row, column) {
        var _this = _super.call(this) || this;
        _this.cell = cell;
        _this.row = row;
        _this.column = column;
        _this.section = row.section;
        return _this;
    }
    return CellHookData;
}(HookData));
exports.CellHookData = CellHookData;


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
// Limitations
// - No support for border spacing
// - No support for transparency
var common_1 = __webpack_require__(1);
function parseCss(element, scaleFactor, ignored) {
    if (ignored === void 0) { ignored = []; }
    var result = {};
    var style = window.getComputedStyle(element);
    function assign(name, value, accepted) {
        if (accepted === void 0) { accepted = []; }
        if ((accepted.length === 0 || accepted.indexOf(value) !== -1) && ignored.indexOf(name) === -1) {
            if (value === 0 || value) {
                result[name] = value;
            }
        }
    }
    var pxScaleFactor = 96 / 72;
    assign('fillColor', parseColor(element, 'backgroundColor'));
    assign('lineColor', parseColor(element, 'borderColor'));
    assign('fontStyle', parseFontStyle(style));
    assign('textColor', parseColor(element, 'color'));
    assign('halign', style.textAlign, ['left', 'right', 'center']);
    assign('valign', style.verticalAlign, ['middle', 'bottom', 'top']);
    assign('fontSize', parseInt(style.fontSize) / pxScaleFactor);
    assign('cellPadding', parsePadding(style.padding, style.fontSize, style.lineHeight, scaleFactor));
    assign('lineWidth', parseInt(style.borderWidth) / pxScaleFactor / scaleFactor);
    assign('font', (style.fontFamily || '').toLowerCase());
    return result;
}
exports.parseCss = parseCss;
function parseFontStyle(style) {
    var res = '';
    if (style.fontWeight === 'bold' || style.fontWeight === 'bolder' || parseInt(style.fontWeight) >= 700) {
        res += 'bold';
    }
    if (style.fontStyle === 'italic' || style.fontStyle === 'oblique') {
        res += 'italic';
    }
    return res;
}
function parseColor(element, colorProp) {
    var cssColor = realColor(element, colorProp);
    if (!cssColor)
        return null;
    var rgba = cssColor.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d*\.?\d*))?\)$/);
    if (!rgba || !Array.isArray(rgba)) {
        return null;
    }
    var color = [parseInt(rgba[1]), parseInt(rgba[2]), parseInt(rgba[3])];
    var alpha = parseInt(rgba[4]);
    if (alpha === 0 || isNaN(color[0]) || isNaN(color[1]) || isNaN(color[2])) {
        return null;
    }
    return color;
}
function realColor(elem, colorProp) {
    if (!elem)
        return null;
    var bg = window.getComputedStyle(elem)[colorProp];
    if (bg === 'rgba(0, 0, 0, 0)' || bg === 'transparent' || bg === 'initial' || bg === 'inherit') {
        return realColor(elem.parentElement, colorProp);
    }
    else {
        return bg;
    }
}
function parsePadding(val, fontSize, lineHeight, scaleFactor) {
    if (!val)
        return null;
    var pxScaleFactor = (96 / (72 / scaleFactor));
    var linePadding = (parseInt(lineHeight) - parseInt(fontSize)) / scaleFactor / 2;
    var padding = val.split(' ').map(function (n) {
        return parseInt(n) / pxScaleFactor;
    });
    padding = common_1.marginOrPadding(padding, 0);
    if (linePadding > padding.top) {
        padding.top = linePadding;
    }
    if (linePadding > padding.bottom) {
        padding.bottom = linePadding;
    }
    return padding;
}


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var cssParser_1 = __webpack_require__(11);
var state_1 = __webpack_require__(0);
var polyfills_1 = __webpack_require__(3);
function parseHtml(input, includeHiddenHtml, useCss) {
    if (includeHiddenHtml === void 0) { includeHiddenHtml = false; }
    if (useCss === void 0) { useCss = false; }
    var tableElement;
    if (typeof input === 'string') {
        tableElement = window.document.querySelector(input);
    }
    else {
        tableElement = input;
    }
    if (!tableElement) {
        console.error("Html table could not be found with input: ", input);
        return;
    }
    var head = parseTableSection(window, tableElement.tHead, includeHiddenHtml, useCss);
    var body = [];
    for (var i = 0; i < tableElement.tBodies.length; i++) {
        body = body.concat(parseTableSection(window, tableElement.tBodies[i], includeHiddenHtml, useCss));
    }
    var foot = parseTableSection(window, tableElement.tFoot, includeHiddenHtml, useCss);
    return { head: head, body: body, foot: foot };
}
exports.parseHtml = parseHtml;
function parseTableSection(window, sectionElement, includeHidden, useCss) {
    var results = [];
    if (!sectionElement) {
        return results;
    }
    for (var i = 0; i < sectionElement.rows.length; i++) {
        var row = sectionElement.rows[i];
        var resultRow = [];
        var rowStyles = useCss ? cssParser_1.parseCss(row, state_1["default"]().scaleFactor, ['cellPadding', 'lineWidth', 'lineColor']) : {};
        for (var i_1 = 0; i_1 < row.cells.length; i_1++) {
            var cell = row.cells[i_1];
            var style = window.getComputedStyle(cell);
            if (includeHidden || style.display !== 'none') {
                var cellStyles = useCss ? cssParser_1.parseCss(cell, state_1["default"]().scaleFactor) : {};
                resultRow.push({
                    rowSpan: cell.rowSpan,
                    colSpan: cell.colSpan,
                    styles: useCss ? polyfills_1.assign(rowStyles, cellStyles) : null,
                    content: cell
                });
            }
        }
        if (resultRow.length > 0 && (includeHidden || rowStyles.display !== 'none')) {
            results.push(resultRow);
        }
    }
    return results;
}


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var jsPDF = __webpack_require__(5);
var painter_1 = __webpack_require__(4);
var calculator_1 = __webpack_require__(7);
var inputParser_1 = __webpack_require__(8);
var state_1 = __webpack_require__(0);
__webpack_require__(6);
var common_1 = __webpack_require__(1);
/**
 * Create a table
 */
jsPDF.API.autoTable = function () {
    state_1.setupState(this);
    var tableSettings = inputParser_1.parseArguments(arguments) || {};
    // 1. Parse and unify user input
    var table = inputParser_1.parseInput(this, [state_1.globalSettings(), state_1.documentSettings(), tableSettings]);
    // 2. Calculate preliminary table, column, row and cell dimensions
    calculator_1.calculateWidths(table);
    // 3. Output table to pdf
    painter_1.drawTable(table);
    table.finalY = table.cursor.y;
    this.previousAutoTable = table;
    this.autoTable.previous = table; // Deprecated
    common_1.applyUserStyles();
    state_1.resetState();
    return this;
};
// Enables sugar doc.previousAutoTable.finalY || 40;
jsPDF.API.previousAutoTable = false;
jsPDF.API.autoTable.previous = false; // Deprecated
jsPDF.API.autoTableSetDefaults = function (defaults) {
    state_1.setDefaults(defaults, this);
    return this;
};
jsPDF.autoTableSetDefaults = function (defaults, doc) {
    state_1.setDefaults(defaults, doc);
    return this;
};
/**
 * @Deprecated. Use fromHtml option instead
 */
jsPDF.API.autoTableHtmlToJson = function (tableElem, includeHiddenElements) {
    console.error("Use of deprecated function: autoTableHtmlToJson. Use fromHtml option instead.");
    includeHiddenElements = includeHiddenElements || false;
    if (!tableElem || !(tableElem instanceof HTMLTableElement)) {
        console.error("A HTMLTableElement has to be sent to autoTableHtmlToJson");
        return null;
    }
    var columns = {}, rows = [];
    var header = tableElem.rows[0];
    for (var i = 0; i < header.cells.length; i++) {
        var cell = header.cells[i];
        var style = window.getComputedStyle(cell);
        if (includeHiddenElements || style.display !== 'none') {
            columns[i] = cell;
        }
    }
    var _loop_1 = function (i) {
        var tableRow = tableElem.rows[i];
        var style = window.getComputedStyle(tableRow);
        if (includeHiddenElements || style.display !== 'none') {
            var rowData_1 = [];
            Object.keys(columns).forEach(function (key) {
                var cell = tableRow.cells[key];
                rowData_1.push(cell);
            });
            rows.push(rowData_1);
        }
    };
    for (var i = 1; i < tableElem.rows.length; i++) {
        _loop_1(i);
    }
    var values = Object.keys(columns).map(function (key) { return columns[key]; });
    return { columns: values, rows: rows, data: rows };
};
/**
 * @deprecated
 */
jsPDF.API.autoTableEndPosY = function () {
    console.error("Use of deprecated function: autoTableEndPosY. Use doc.autoTable.previous.finalY instead.");
    var prev = this.previousAutoTable;
    if (prev.cursor && typeof prev.cursor.y === 'number') {
        return prev.cursor.y;
    }
    else {
        return 0;
    }
};
/**
 * @deprecated
 */
jsPDF.API.autoTableAddPageContent = function (hook) {
    console.error("Use of deprecated function: autoTableAddPageContent. Use jsPDF.autoTableSetDefaults({addPageContent: function() {}}) instead.");
    if (!jsPDF.API.autoTable.globalDefaults) {
        jsPDF.API.autoTable.globalDefaults = {};
    }
    jsPDF.API.autoTable.globalDefaults.addPageContent = hook;
    return this;
};
/**
 * @deprecated
 */
jsPDF.API.autoTableAddPage = function () {
    console.error("Use of deprecated function: autoTableAddPage. Use event.addPage() in eventHandler instead.");
    painter_1.addPage();
    return this;
};


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var config_1 = __webpack_require__(2);
var HookData_1 = __webpack_require__(10);
var common_1 = __webpack_require__(1);
exports.table = {};
var assign = __webpack_require__(9);
var CellHooks = (function () {
    function CellHooks() {
        this.willParseCell = [];
        this.didParseCell = [];
        this.willDrawCell = [];
        this.didDrawCell = [];
        this.didDrawPage = [];
    }
    return CellHooks;
}());
var Table = (function () {
    function Table(doc) {
        this.columns = [];
        this.head = [];
        this.body = [];
        this.foot = [];
        this.height = 0;
        this.width = 0;
        this.preferredWidth = 0;
        this.wrappedWidth = 0;
        this.minWidth = 0;
        this.headHeight = 0;
        this.footHeight = 0;
        this.pageCount = 1;
        this.styles = {
            styles: {},
            headStyles: {},
            bodyStyles: {},
            footStyles: {},
            alternateRowStyles: {},
            columnStyles: {}
        };
        this.cellHooks = new CellHooks();
        this.doc = doc;
        this.scaleFactor = doc.internal.scaleFactor;
        this.userStyles = {
            textColor: 30,
            fontSize: doc.internal.getFontSize(),
            fontStyle: doc.internal.getFont().fontStyle
        };
    }
    Table.prototype.allRows = function () {
        return this.head.concat(this.body).concat(this.foot);
    };
    Table.prototype.callCellHooks = function (handlers, cell, row, column) {
        for (var _i = 0, handlers_1 = handlers; _i < handlers_1.length; _i++) {
            var handler = handlers_1[_i];
            if (handler(new HookData_1.CellHookData(cell, row, column)) === false) {
                return false;
            }
        }
        return true;
    };
    Table.prototype.callEndPageHooks = function () {
        for (var _i = 0, _a = this.cellHooks.didDrawPage; _i < _a.length; _i++) {
            var handler = _a[_i];
            handler(new HookData_1.HookData());
        }
    };
    Table.prototype.margin = function (side) {
        return common_1.marginOrPadding(this.settings.margin, config_1.defaultConfig().margin)[side];
    };
    return Table;
}());
exports.Table = Table;
var Row = (function () {
    function Row(raw, index, section) {
        this.cells = {};
        this.height = 0;
        this.maxCellLineCount = 1;
        this.maxCellHeight = 0;
        this.pageCount = 1;
        this.spansMultiplePages = false;
        this.raw = raw;
        this.index = index;
        this.section = section;
    }
    return Row;
}());
exports.Row = Row;
var Cell = (function () {
    function Cell(raw, themeStyles, section) {
        this.contentWidth = 0;
        this.wrappedWidth = 0;
        this.minWidth = 0;
        this.textPos = {};
        this.height = 0;
        this.width = 0;
        this.raw = raw;
        this.rowSpan = raw && raw.rowSpan || 1;
        this.colSpan = raw && raw.colSpan || 1;
        this.styles = assign(themeStyles, raw && raw.styles || {});
        this.section = section;
        var text = '';
        var content = raw && typeof raw.content !== 'undefined' ? raw.content : raw;
        content = content != undefined && content.dataKey != undefined ? content.title : content;
        if (content && typeof window === 'object' && window.HTMLElement && content instanceof window.HTMLElement) {
            text = (content.innerText || '').trim();
        }
        else {
            // Stringify 0 and false, but not undefined or null
            text = content != undefined ? '' + content : '';
        }
        var splitRegex = /\r\n|\r|\n/g;
        this.text = text.split(splitRegex);
    }
    Cell.prototype.padding = function (name) {
        var padding = common_1.marginOrPadding(this.styles.cellPadding, common_1.styles([]).cellPadding);
        if (name === 'vertical') {
            return padding.top + padding.bottom;
        }
        else if (name === 'horizontal') {
            return padding.left + padding.right;
        }
        else {
            return padding[name];
        }
    };
    return Cell;
}());
exports.Cell = Cell;
var Column = (function () {
    function Column(dataKey) {
        this.preferredWidth = 0;
        this.minWidth = 0;
        this.wrappedWidth = 0;
        this.width = 0;
        this.dataKey = dataKey;
    }
    return Column;
}());
exports.Column = Column;


/***/ })
/******/ ]);
});