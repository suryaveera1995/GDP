const fs = require('fs');

var data = fs.readFileSync('population.csv',{encoding:'UTF8'}).toString();

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

	var continentWisePopulation={
		Asia:0,
		Europe:0,
		America:0,
		Africa:0,
		Australia:0
	};

	var columnIndex={country:'Country Name',population2013:'Population (Millions) - 2013'};

	lines = data.trim().split("\n");

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
					var populationColumnIndex=columnIndex.population2013;
					var populationString=row[populationColumnIndex].split("\"")[1];
					continentWisePopulation[continent]+=parseFloat(populationString);
				}
			}
		}
	}
	for(var continent in continentWisePopulation)
	{
		var tempContinentWiseNamePopulation={};
		tempContinentWiseNamePopulation['Continent Name'] =continent;
		tempContinentWiseNamePopulation['Population-2013']=continentWisePopulation[continent];
		jsonData.push(tempContinentWiseNamePopulation);
	}
	fs.writeFileSync("population.json",JSON.stringify(jsonData),{encoding:'UTF8'});
