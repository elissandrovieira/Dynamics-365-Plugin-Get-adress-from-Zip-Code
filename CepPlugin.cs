using Microsoft.Xrm.Sdk;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace EmprezaZ.Dynamics356.Plugins.Cep
{
    public class CepPlugin : IPlugin
    {
        public void Execute(IServiceProvider serviceProvider)
        {
            IPluginExecutionContext context = (IPluginExecutionContext)serviceProvider.GetService(typeof(IPluginExecutionContext));
            IOrganizationServiceFactory serviceFactory = (IOrganizationServiceFactory)serviceProvider.GetService(typeof(IOrganizationServiceFactory));
            IOrganizationService service = serviceFactory.CreateOrganizationService(context.UserId);

            string cep = context.InputParameters["CEP"] as string;
            string url = "https://viacep.com.br/ws/" + cep + "/json/";

            WebClient client = new WebClient();
            string response = client.DownloadString(url);
            JObject jsonResponse = JObject.Parse(response);

            string rua = jsonResponse["logradouro"].ToString();
            string bairro = jsonResponse["bairro"].ToString();
            string cidade = jsonResponse["localidade"].ToString();
            string estado = jsonResponse["uf"].ToString();
            string ibgeCode = jsonResponse["ibge"].ToString();
            string ddd = jsonResponse["ddd"].ToString();

            context.OutputParameters["rua"] = rua;
            context.OutputParameters["bairro"] = bairro;
            context.OutputParameters["cidade"] = cidade;
            context.OutputParameters["estado"] = estado;
            context.OutputParameters["IbgeCode"] = ibgeCode;
            context.OutputParameters["ddd"] = ddd;
        }
    }
}
