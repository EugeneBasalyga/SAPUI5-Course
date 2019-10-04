sap.ui.define(["sap/ui/core/mvc/Controller"], function (Controller) {
	"use strict";
	return Controller.extend("BAS.HW2_SAPUI5_COURSE.controller.BookDetail", {
		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf BAS.HW2_SAPUI5_COURSE.view.BookDetail
		 */
		onInit: function () {
			
			var router = sap.ui.core.UIComponent.getRouterFor(this);
			router.getRoute("BookDetail").attachMatched(this._onRouteMatched, this);
			
		},
		
		_onRouteMatched: function () {
			var oModelBook = sap.ui.getCore().getModel("book");
			var oBook = oModelBook.getData();
			
			this.getView().byId("inputId").setValue(oBook.id);
		    this.getView().byId("inputAuthor").setValue(oBook.author);
		    this.getView().byId("inputTitle").setValue(oBook.title);
		    this.getView().byId("inputPages").setValue(oBook.pages);
		},
		
		/**
		 *@memberOf BAS.HW2_SAPUI5_COURSE.controller.BookDetail
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