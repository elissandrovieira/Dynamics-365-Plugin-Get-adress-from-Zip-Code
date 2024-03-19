if (typeof (EmpresaZ) === "undefined") EmpresaZ = {} 
if (typeof (EmpresaZ.Conta) === "undefined") EmpresaZ.Conta = {} 


EmpresaZ.Conta = {
    OnChangeCEP: function (context) {
        const formContext = context.getFormContext() 
        const cep = formContext.getAttribute("alf_cep") 
        const rua = formContext.getAttribute("alf_rua") 
        const cidade = formContext.getAttribute("alf_cidade") 
        const uf = formContext.getAttribute("alf_uf") 
        const formatCep = cep.getValue().replace("-", "") 
        const validCepNumbers = /^(([0-9]{8}))$/ 

        if (validCepNumbers.test(formatCep) == true) {

            var globalContext = Xrm.Utility.getGlobalContext();
            var serverURL = globalContext.getClientUrl();

            var actionName = "alf_ConsultaCep"

            var parameters = {};
            parameters.CEP = format ;

            var req = new XMLHttpRequest();
            req.open("POST", Xrm.Utility.getGlobalContext().getClientUrl() + "/api/data/v9.2/alf_ConsultaCEP", true);
            req.setRequestHeader("OData-MaxVersion", "4.0");
            req.setRequestHeader("OData-Version", "4.0");
            req.setRequestHeader("Content-Type", "application/json; charset=utf-8");
            req.setRequestHeader("Accept", "application/json");
            req.onreadystatechange = function () {
                if (this.readyState === 4) {
                    req.onreadystatechange = null;
                    if (this.status === 200 || this.status === 204) {
                        var result = JSON.parse(this.response);
                        var rua = result["rua"];  
                        var bairro = result["bairro"];  
                        var cidade = result["cidade"];  
                        var estado = result["estado"];  
                        var ibgecode = result["IbgeCode"];  
                        var ddd = result["ddd"];  
                    } else {
                        console.log(this.responseText);
                    }
                }
            };
            req.send(JSON.stringify(parameters));

        } else if (validCepNumbers.test(formatCep) == false) {

            EmpresaZ.Util.Alert("CEP invalido!", "Insira um CEP valido.")
            cep.setValue(null)

        }
    },
} 



