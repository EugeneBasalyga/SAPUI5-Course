sap.ui.define(["sap/ui/core/mvc/Controller",
	"sap/m/MessageToast",
	"sap/ui/model/json/JSONModel"
	], function (Controller, MessageToast, JSONModel) {
	"use strict";
	return Controller.extend("BAS.HW2_SAPUI5_COURSE.controller.HW4ODataTable", {
		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf BAS.HW2_SAPUI5_COURSE.view.HW4ODataTable
		 */
		onInit: function () {
			var router = sap.ui.core.UIComponent.getRouterFor(this);
			router.getRoute("HW4ODataTable").attachMatched(this._onRouteMatched, this);
			var url = "https://cors-anywhere.herokuapp.com/https://services.odata.org/V2/OData/OData.svc";
			var oModel = new sap.ui.model.odata.ODataModel(url, true);
			// var oModel = new JSONModel();
			sap.ui.getCore().setModel(oModel, "products");
			
		},
		
		_onRouteMatched: function () {
			var oModel = sap.ui.getCore().getModel("products");

    		var that = this;
			oModel.read("/Products", null, null, false, 
			  function(oData, oResponse) { /* do something */ 
  				MessageToast.show("Success");
  				var oProducts = oData.results;
				var oJsonModel = new sap.ui.model.json.JSONModel(oProducts);
				var oTable = that.byId("productsTable");
				oTable.setModel(oJsonModel, "products");
			  });
		},
		/**
		 *@memberOf BAS.HW2_SAPUI5_COURSE.controller.HW4ODataTable
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
		},
		
		onItemPressed: function (oEvent) {

			var oModel = sap.ui.getCore().getModel("products");
			var oItem = oEvent.getSource();
			var oCtx = oItem.getBindingContext("products");
			var foundProduct = oCtx.getModel().getData().find(function (element) {
				return element.id === oCtx.getProperty("id");
			});
			
    		var that = this;
    		//hehehehe
			oModel.read("/Products(" + foundProduct.ID + ")/Supplier", null, null, false, 
			  function(oData, oResponse) { /* do something */ 
  				MessageToast.show("Success");
  				var oProducts = oData.results;
				var oJsonModel = new sap.ui.model.json.JSONModel(oProducts);
				var oTable = that.byId("productsTable");
				oTable.setModel(oJsonModel, "products");
				
				 var oRouter = sap.ui.core.UIComponent.getRouterFor(that);
				 var oModelSupplier = new JSONModel();
				 oModelSupplier.setData(oData);
				 sap.ui.getCore().setModel(oModelSupplier, "supplier");
				 oRouter.navTo("HW4ODataSupplierDetail", {
				 	productId: oCtx.getProperty("ID")
				 });
			  });

		}
		
	});
});