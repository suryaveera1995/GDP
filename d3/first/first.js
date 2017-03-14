const fs = require('fs');

var file = fs.readFileSync('population.csv',{encoding:'UTF8'}).toString();

var header =[];
var jsonData=[];
var row=[];
var isHeader =true;
var lines =[];

var columnNames={country:'Country Name',power2013:'Purchasing Power in Billions ( Current International Dollar) - 2013',gdp2103:'GDP Billions (US$) - 2013',population2103:'Population (Millions) - 2013'};

lines = file.trim().split("\n");

for(var i=0;i<lines.length;i++)
{
	row=lines[i].split(',');
	if(isHeader)
	{
		for(var j=0;j<row.length;j++)
		header[j]=row[j].split('\"')[1];

		isHeader=false;

		for(var column in columnNames)
		columnNames[column]=header.indexOf(columnNames[column]);
	}
	else if(!(row[columnNames.country].split("\"")[1] =="European Union"))
	{
		var tempData={};
		for(var column in columnNames)
		tempData[header[columnNames[column]]]=row[columnNames[column]].split("\"")[1];

		jsonData.push(tempData);
		fs.writeFileSync("first.json",JSON.stringify(jsonData),{encoding:'UTF8'});
	}
}