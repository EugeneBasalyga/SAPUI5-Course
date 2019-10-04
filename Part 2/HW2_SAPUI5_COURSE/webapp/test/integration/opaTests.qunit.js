/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"BAS/HW2_SAPUI5_COURSE/test/integration/AllJourneys"
	], function () {
		QUnit.start();
	});
});