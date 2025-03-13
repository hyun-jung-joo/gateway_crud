sap.ui.define(
    ["sap/ui/core/mvc/Controller", "sap/ui/model/json/JSONModel"],
    (Controller, JSONModel) => {
        "use strict";

        return Controller.extend("sync.c22.gateway.crud.controller.Main", {
            onInit() {
                var oData = {
                    carrier: {
                        Carrid: "",
                        Carrname: "",
                        Currcode: "",
                        Url: "",
                    },
                };
                var oModel = new JSONModel(oData);
                this.getView().setModel(oModel, "update"); // update 라는 모델
            },

            // 수정 버튼
            onUpdate(oEvent) {
                // 선택한 Item 정보를 가져와서 그 item에 연결된 모델 데이터 정보를 가져온다.
                var oSelectedItem = oEvent.getSource();
                var oContext = oSelectedItem.getBindingContext(); // 모델 정보 접근

                // Dialog에서 데이터를 출력하기 위해 변수를 선언하고,
                // 필요한 경로의 데이터는 내가 선택한 item에서 가져와 기록
                var oData = {
                    carrier: {
                        Carrid: oContext.getProperty("Carrid"),
                        Carrname: oContext.getProperty("Carrname"),
                        Currcode: oContext.getProperty("Currcode"),
                        Url: oContext.getProperty("Url"),
                    },
                    path: oContext.getPath(),
                };

                var oModel = this.getView().getModel("update");
                oModel.setData(oData);

                // Fragment 읽어서 Dialog 화면 출력
                this.openDialog();
            },

            async openDialog() {
                this.oDialog ??= await this.loadFragment({
                    name: "sync.c22.gateway.crud.view.Edit",
                });
                this.oDialog.open();
            },

            // 수정에서 저장
            onSave() {
                var oView = this.getView();
                var oModel = oView.getModel(); // OData Model
                var oUpdateModel = oView.getModel("update"); // JSON Model
                var oData = oUpdateModel.getData();
                var oUpdateData = {
                    Carrid: oData.carrier.Carrid,
                    Carrname: oData.carrier.Carrname,
                    Currcode: oData.carrier.Currcode,
                    Url: oData.carrier.Url,
                };

                oModel.update(oData.path, oUpdateData, {
                    success() {
                        alert("변경 성공");
                    },
                    error() {
                        alert("변경 실패");
                    },
                });
                this.onClose();
            },
            onClose() {
                var oDialog = this.getView().byId("idEditDialog");
                oDialog.close();
            },
        });
    }
);
