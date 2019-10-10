sap.ui.define(["sap/ui/core/mvc/Controller",
	"sap/m/MessageToast",
	"sap/ui/model/json/JSONModel"
	], function (Controller, MessageToast, JSONModel) {
	"use strict";
	return Controller.extend("BAS.client.controller.Main", {
		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf BAS.client.controller.Main
		 */
		onInit: function () {

			var oModel = new JSONModel();
			this.getView().setModel(oModel, "textBooks");
			
			var that = this;
			fetch("http://localhost:3000/textBooks/", {
				headers: {
					"Content-Type": "application/json"
				}
			}).then(function (response) {
				return response.json();
			}).then(function (books) {
				MessageToast.show("Success");
				var oModel = that.getView().getModel("textBooks");
				oModel.setData(books.value);
				var oTable = that.byId("textBookTable");
				oTable.setModel(oModel, "textBooks");
			});
		},
		
		OnSubmitPress: function (oEvent) {
			
    		oEvent.preventDefault();
   
   
		    var oEntry = {
		        author: String(this.getView().byId("inputAuthor").getValue()),
				title: String(this.getView().byId("inputTitle").getValue()),
				creationDate: String(this.getView().byId("inputCreationDate").getValue()),
		        pages: String(this.getView().byId("inputPages").getValue()),
		    };

			var oModel = this.getView().getModel("textBooks");
			oModel.setData(oEntry);
			
		  var that = this;
	      fetch("http://localhost:3000/textBooks/", {
	        method: 'POST',
	        body: JSON.stringify(oEntry), 
	        headers:{
	          'Content-Type': 'application/json'
	        }
	      })
		  .then(res => res.json())
		  .then(function (response) {
			//hehe
			MessageToast.show(JSON.stringify(response));
			that.onInit();
		  })
	      .catch(error => console.error('Error:', error));
			
			
		}
		
	});
});