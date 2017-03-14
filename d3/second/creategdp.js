const fs = require('fs');

var file = fs.readFileSync('population.csv',{encoding:'UTF8'}).toString();

var header =[];
var jsonData=[];
var row=[];
isHeader =true;
var lines =[];

var columnNames={country:'Country Name',gdp2010:'GDP Billions (US$) - 2010',
gdp2011:'GDP Billions (US$) - 2011',gdp2012:'GDP Billions (US$) - 2012',gdp2013:'GDP Billions (US$) - 2013'};

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
		var total=0;
		for(var column in columnNames)
		{
			tempData[header[columnNames[column]]]=row[columnNames[column]].split("\"")[1];
			if(column!="country")
			{				
				tempData[header[columnNames[column]]]=parseFloat(row[columnNames[column]].split("\"")[1]);
				total = total + parseFloat(row[columnNames[column]].split("\"")[1]);
			}
		}
		tempData["Total"] = total;
		jsonData.push(tempData);
		fs.writeFileSync("creategdp.json",JSON.stringify(jsonData),{encoding:'UTF8'});
	}
}