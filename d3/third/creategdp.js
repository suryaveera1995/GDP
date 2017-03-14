const fs = require('fs');

var file = fs.readFileSync('population.csv',{encoding:'UTF8'}).toString();

var header =[];
var jsonData=[];
var row=[];
isHeader =true;
var lines =[];

var continents={
	Asia: 'China,India,Indonesia,Russia,Saudi Arabia,Republic of Korea,Turkey,Japan',
	Europe: 'France,United Kingdom,Germany,Italy',
	America: 'Canada,Mexico,USA,Argentina,Brazil',
	Africa: 'South Africa',
	Australia:'Australia'};

	var continentWiseGdp={
		Asia:0,
		Europe:0,
		America:0,
		Africa:0,
		Australia:0
	};

	var columnIndex={country:'Country Name',gdp2013:'GDP Billions (US$) - 2013'};

	lines = file.trim().split("\n");

	for(var i=0;i<lines.length;i++)
	{
		row=lines[i].split(',');
		if(isHeader)
		{
			for(var j=0;j<row.length;j++)
			header[j]=row[j].split('\"')[1];

			isHeader=false;

			for(var columnKey in columnIndex)
			columnIndex[columnKey]=header.indexOf(columnIndex[columnKey]);
		}
		else if(!(row[columnIndex.country].split("\"")[1]=="European Union"))
		{

			var countryname=row[columnIndex.country].split("\"")[1];			
			for(var continent in continents)
			{
				if(continents[continent].includes(countryname))
				{
					var gdpColumnIndex=columnIndex.gdp2013;
					var gdpString=row[gdpColumnIndex].split("\"")[1];
					continentWiseGdp[continent]+=parseFloat(gdpString);
				}
			}
		}
	}
	for(var continent in continentWiseGdp)
	{
		var tempContinentWiseNameGdp={};
		tempContinentWiseNameGdp['Continent Name'] =continent;
		tempContinentWiseNameGdp['GDP Billions (US$) - 2013']=continentWiseGdp[continent];
		jsonData.push(tempContinentWiseNameGdp);
	}
	fs.writeFileSync("gdp.json",JSON.stringify(jsonData),{encoding:'UTF8'});
