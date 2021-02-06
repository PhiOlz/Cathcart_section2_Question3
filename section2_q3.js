var axios = require('axios');
const HtmlTableToJson = require('html-table-to-json');
var myArgs = process.argv.slice(2);
if(myArgs.length<1||myArgs.length>1){
    console.log("Please insert only one argument")
    return
}
var config = {
  method: 'get',
  url: 'https://codequiz.azurewebsites.net/',
  headers: { 
    'Cookie': 'hasCookie=true;'
  }
};
var searchResult = false
axios(config).then(function (response) {
    const jsonTables = HtmlTableToJson.parse(response.data)
    jsonTables.results[0].forEach((tb_ele, tb_index) => {
        if(tb_ele['Fund Name']==myArgs[0]){
            console.log(tb_ele.Nav)
            searchResult = true
            return
        }
    });
    if(searchResult===false){console.log("Result Not Found. Please insert another argument.");}
    return;
})
.catch(function (error) {
  console.log(error);
});
