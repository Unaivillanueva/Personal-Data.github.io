var w = 500,
	h = 500;

var colorscale = d3.scale.category10();

//Legend titles
var LegendOptions = ['Breakfast','Lunch','Dinner'];

//Data
var d = [
		  [
			{axis:"Alone",value:0.59},
			{axis:"+3 People",value:0.1},
			{axis:"3 People",value:0.1},
			{axis:"2 People",value:0.2},
			{axis:"1 Person",value:0.5},			
		  ],[
			{axis:"Alone",value:0.8},
			{axis:"+3 People",value:0.6},
			{axis:"3 People",value:0.2},
			{axis:"2 People",value:0.64},
			{axis:"1 Person",value:0.74},
		  ],[
			{axis:"Alone",value:0.6},
			{axis:"+3 People",value:0.8},
			{axis:"3 People",value:0.7},
			{axis:"2 People",value:0.69},
			{axis:"1 Person",value:0.7},
		  ]
		];

//Options for the Radar chart, other than default
var mycfg = {
  w: w,
  h: h,
  maxValue: 1,
  levels: 6,
  ExtraWidthX: 300
}

//Call function to draw the Radar chart
//Will expect that data is in %'s
RadarChart.draw("#v2", d, mycfg);

////////////////////////////////////////////
/////////// Initiate legend ////////////////
////////////////////////////////////////////

var svg = d3.select("#v2")
	.selectAll('svg')
	.append('svg')
	.attr("width", '100%')
    .attr("height", '100%')
    
    .attr('viewBox','0 0 '+Math.min(w,h)+' '+Math.min(w,h))
    .attr('preserveAspectRatio','xMinYMin')
	.attr("transform", "translate(" + Math.min(w,h) / 2 + "," + Math.min(w,h) / 2 + ")");

//Create the title for the legend
var text = svg.append("text")
	.attr("class", "title")
	.attr('transform', 'translate(90,0)') 
	.attr("x", w - 280)
	.attr("y", 10)
	.attr("font-size", "10px")
	.attr("fill", "#404040")
	.text("Average mood (from 0 to 100% happiness) - company");
		
//Initiate Legend	
var legend = svg.append("g")
	.attr("class", "legend")
	.attr("height", 100)
	.attr("width", 200)
	.attr('transform', 'translate(90,20)') 
	;
	//Create colour squares
	legend.selectAll('rect')
	  .data(LegendOptions)
	  .enter()
	  .append("rect")
	  .attr("x", w - 110)
	  .attr("y", function(d, i){ return i * 20;})
	  .attr("width", 9)
	  .attr("height", 9)
	  .style("fill", function(d, i){ return colorscale(i);})
	  ;
	//Create text next to squares
	legend.selectAll('text')
	  .data(LegendOptions)
	  .enter()
	  .append("text")
	  .attr("x", w - 95)
	  .attr("y", function(d, i){ return i * 20 + 9;})
	  .attr("font-size", "10px")
	  .attr("fill", "#737373")
	  .text(function(d) { return d; })
	  ;	