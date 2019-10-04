sap.ui.define(["sap/ui/core/mvc/Controller"], function (Controller) {
	"use strict";
	return Controller.extend("BAS.HW2_SAPUI5_COURSE.controller.HW4ODataSupplierDetail", {
		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf BAS.HW2_SAPUI5_COURSE.view.HW4ODataSupplierDetail
		 */
		onInit: function () {
			
			var oModelSupplier = sap.ui.getCore().getModel("supplier");
			var oSupplier = oModelSupplier.getData();
			
			this.getView().byId("Id").setValue(oSupplier.ID);
		    this.getView().byId("Name").setValue(oSupplier.Name);
		    this.getView().byId("Concurrency").setValue(oSupplier.Concurrency);
		    this.getView().byId("country").setValue(oSupplier.Address.Country);
			this.getView().byId("city").setValue(oSupplier.Address.City);
			this.getView().byId("state").setValue(oSupplier.Address.State);
			this.getView().byId("street").setValue(oSupplier.Address.Street);
			this.getView().byId("zipCode").setValue(oSupplier.Address.ZipCode);
		},
		/**
		 *@memberOf BAS.HW2_SAPUI5_COURSE.controller.HW4ODataSupplierDetail
		 */
		action: function (oEvent) {
			var that = this;
			var actionParameters = JSON.parse(oEvent.getSource().data("wiring").replace(/'/g, "\""));
			var eventType = oEvent.getId();
			var aTargets = actionParameters[eventType].targets || [];
			aTargets.forEach(function (oTarget) {
				var oControl = that.byId(oTarget.id);
				if (oControl) {
					var oParams = {};
					for (var prop in oTarget.parameters) {
						oParams[prop] = oEvent.getParameter(oTarget.parameters[prop]);
					}
					oControl[oTarget.action](oParams);
				}
			});
			var oNavigation = actionParameters[eventType].navigation;
			if (oNavigation) {
				var oParams = {};
				(oNavigation.keys || []).forEach(function (prop) {
					oParams[prop.name] = encodeURIComponent(JSON.stringify({
						value: oEvent.getSource().getBindingContext(oNavigation.model).getProperty(prop.name),
						type: prop.type
					}));
				});
				if (Object.getOwnPropertyNames(oParams).length !== 0) {
					this.getOwnerComponent().getRouter().navTo(oNavigation.routeName, oParams);
				} else {
					this.getOwnerComponent().getRouter().navTo(oNavigation.routeName);
				}
			}
		}
	});
});