/*global QUnit*/

sap.ui.define([
	"BAS/HW2_SAPUI5_COURSE/controller/MainForm.controller"
], function (Controller) {
	"use strict";

	QUnit.module("MainForm Controller");

	QUnit.test("I should test the MainForm controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});