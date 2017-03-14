var svg = d3.select("body").append("svg")
.attr("width",950)
.attr("height",650)
margin = {top: 20, right: 20, bottom: 100, left: 40},
width = +svg.attr("width") - margin.left - margin.right,
height = +svg.attr("height") - margin.top - margin.bottom,
g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var x = d3.scaleBand()
.rangeRound([0, width])
.padding(0.5)
.align(0.4);

var y = d3.scaleLinear()
.rangeRound([height, 0]);

var z = d3.scaleOrdinal()
.range(["#0000", "#7b6888", "#6b486b", "#a05d56"]);

var stack = d3.stack();

var arr=["GDP Billions (US$) - 2010","GDP Billions (US$) - 2011","GDP Billions (US$) - 2012","GDP Billions (US$) - 2013"];

d3.json("creategdp.json",function(error, data) 
{
  if (error) throw error;
  data.sort(function(a, b) { return b.Total - a.Total; });
  x.domain(data.map(function(d) { return d["Country Name"];}));
  y.domain([0, d3.max(data, function(d) { return d.Total;})]).nice();
  z.domain(arr);

  g.selectAll(".serie")
  .data(stack.keys(arr)(data))
  .enter().append("g")
  .attr("class", "serie")
  .attr("fill", function(d){return z(d.key);})
  .selectAll("rect")
  .data(function(d) {return d;})
  .enter().append("rect")
  .attr("x", function(d) {return x(d.data["Country Name"]); })
  .attr("y", function(d) 
  {
    console.log(d[1]);
    return y(d[1]);
  }
  )


  .attr("height", function(d) { return y(d[0]) - y(d[1]);})
  .attr("width", x.bandwidth());

  g.append("g")
  .attr("class", "axis axis--x")
  .attr("transform", "translate(0," + height + ")")
  .call(d3.axisBottom(x))
  .selectAll('text')
  .attr("transform","rotate(-60)")
  .attr("dx","-.8em")
  .attr("dy","-.25em")
  .style("text-anchor","end")
  .style("font-size","11px");


  g.append("g")
  .attr("class", "axis axis--y")
  .call(d3.axisLeft(y).ticks(10, "s"))
  .append("text")
  .attr("x", 2)
  .attr("y", y(y.ticks(10).pop()))
  .attr("dy", "0.35em")
  .attr("text-anchor", "start")
  .attr("fill", "#000")
  .text("Population");

  var legend = g.selectAll(".legend")
  .data(arr.reverse())
  .enter().append("g")
  .attr("class", "legend")
  .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; })
  .style("font", "20px sans-serif");

  legend.append("rect")
  .attr("x", width - 18)
  .attr("width", 18)
  .attr("height", 18)
  .attr("fill", z);

  legend.append("text")
  .attr("x", width - 24)
  .attr("y", 9)
  .attr("dy", ".35em")
  .attr("text-anchor", "end")
  .text(function(d) { return d; });
});

// function type(d,i,columns)
// {
//      console.log(d);
//      console.log(i);
//      console.log(columns);
//   for (i = 0,t=0; i <d.length; i++)
//   { 

//     // console.log(d.length);
//     // console.log(i);
//     var count=0;
//     for(var keya in d[i])
//     { 
//       if(count!=0)
//       {
//         d[i][keya] = +d[i][keya];
//         t =  t + d[i][keya];
//       }
//       count++;
//     }
//     // console.log(t);
//   }
//   d.total = t;
//   return d;

// }
/*function type(d, i, columns) 
{
  for (i = 1, t = 0; i < columns.length; ++i) 
  {
    t += d[columns[i]] = +d[columns[i]];
  }
      console.log(t);

  d.total = t;
  return d;
}
*/