if (typeof (EmpresaZ) === "undefined") EmpresaZ = {}
if (typeof (EmpresaZ.Util) === "undefined") EmpresaZ.Util = {}

EmpresaZ.Util = {

    Alert: function (title, description) {

        const textSettings = {
            confirmButtonLabel: "OK",
            title: title,
            text: description
        }

        const optionsSettings = {
            height: 120,
            width: 200
        }

        Xrm.Navigation.openAlertDialog(textSettings, optionsSettings)
    }
}