// Set the dimensions of the canvas / graph
var margin = {top: 30, right: 0, bottom: 30, left: 0},
    width = 650 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;
var padding = 20;
// Parse the date / time
	var parseDate = d3.time.format("%d-%b-%y").parse;


// Get the data
d3.csv("Deviation.csv", function(error, data) {
    data.forEach(function(d) {
        d.date = parseDate(d.date);
        d.breakfast = +d.breakfast;
    });

	// Set the ranges
	var x = d3.time.scale().range([0, width]);
	var y = d3.scale.linear().range([height, 0]);

	// Define the axes
	var xAxis = d3.svg.axis().scale(x)
	    .orient("bottom").ticks(10);

	var yAxis = d3.svg.axis().scale(y)
	    .orient("left").ticks(10);

	// Define the line
	var valueline = d3.svg.line()
		.interpolate('cardinal')
	    .x(function(d) { return x(d.date); })
	    .y(function(d) { return y(d.breakfast); });
	    
	// Adds the svg canvas
	var svg = d3.select("#v1")
	    .append("svg")
	        .attr("width", width + margin.left + margin.right)
	        .attr("height", height + margin.top + margin.bottom)
	    .append("g")
	        .attr("transform", 
	              "translate(" + margin.left + "," + margin.top + ")");


    // Scale the range of the data
    x.domain(d3.extent(data, function(d) { return d.date; }));
    y.domain([-220, 220]);

    // Add the valueline path.
    svg.append("path")
        .attr("class", "line")
        .attr("d", valueline(data))
        .style("stroke",'#3bcc6e');

    // Add the X Axis
    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + y(0) + ")")
        .call(xAxis)
        .selectAll("text")
        .attr("y", 0)
        .attr("x", 9)
        .attr("dy", ".35em")
        .attr("transform", "rotate(45)")
        .style("text-anchor", "start");

    // Add the Y Axis
    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text("Deviation in minutes");
  

/////////////Swith to LUNCH data//////////////////////////////////////////////
    // ** Update data section (Called from the onclick)
    d3.select("#button_lunch")
			.on("click", function updateData() {

    // Get the data again
    d3.csv("Deviation.csv", function(error, data) {
       	data.forEach(function(d) {
	    	d.date = parseDate(d.date);
	    	d.lunch = +d.lunch;
	    });
    console.log(data)

    // Define the line
	var valueline = d3.svg.line()
		.interpolate('cardinal')
	    .x(function(d) { return x(d.date); })
	    .y(function(d) { return y(d.lunch); });

	
    // Select the section we want to apply our changes to
    var svg = d3.select("#v1").transition();

    // Make the changes
        svg.select(".line")   // change the line
        	
            .duration(750)
            .attr("d", valueline(data))
            .style('stroke','#ff6600');

    //Change buttons
    d3.select('#button_dinner').style({'color': '#0099ff','border-color':'#0099ff'});
    d3.select('#button_brk').style({'color': '#3bcc6e','border-color':'#3bcc6e'});
    d3.select('#button_lunch').style({'color': '#ffb380', 'border-color':'#ffb380'});
      
    });
	});

///////Swith to DINNER data///////////////////////////////////////////////////
    // ** Update data section (Called from the onclick)
    d3.select("#button_dinner")
			.on("click", function updateData() {

    // Get the data again
    d3.csv("Deviation.csv", function(error, data) {
       	data.forEach(function(d) {
	    	d.date = parseDate(d.date);
	    	d.dinner = +d.dinner;
	    });
	console.log(data)

	 // Define the line
	var valueline = d3.svg.line()
		.interpolate('cardinal')
	    .x(function(d) { return x(d.date); })
	    .y(function(d) { return y(d.dinner); });

    // Select the section we want to apply our changes to
    var svg = d3.select("#v1").transition();

    // Make the changes
        svg.select(".line")   // change the line
            .duration(750)
            .attr("d", valueline(data))
            .style('stroke','#0099ff');

    //Change buttons
    d3.select('#button_lunch').style({'color': '#ff6600','border-color':'#ff6600'});
    d3.select('#button_brk').style({'color': '#3bcc6e','border-color':'#3bcc6e'});
    d3.select('#button_dinner').style({'color': '#80ccff', 'border-color':'#80ccff'});
      
    });
	});

///////Swith to BREAKFAST data///////////////////////////////////////////////
    // ** Update data section (Called from the onclick)
    d3.select("#button_brk")
			.on("click", function updateData() {

    // Get the data again
    d3.csv("Deviation.csv", function(error, data) {
       	data.forEach(function(d) {
	    	d.date = parseDate(d.date);
	    	d.breakfast = +d.breakfast;
	    });
    console.log(data)

    // Define the line
	var valueline = d3.svg.line()
		.interpolate('cardinal')
	    .x(function(d) { return x(d.date); })
	    .y(function(d) { return y(d.breakfast); });

    // Select the section we want to apply our changes to
    var svg = d3.select("#v1").transition();

    // Make the changes
        svg.select(".line")   // change the line
            .duration(750)
            .attr("d", valueline(data))
            .style('stroke','#3bcc6e');
    
    //Change buttons
    d3.select('#button_dinner').style({'color': '#0099ff','border-color':'#0099ff'});
    d3.select('#button_lunch').style({'color': '#ff6600','border-color':'#ff6600'});
    d3.select('#button_brk').style({'color': '#aeeac3', 'border-color':'#aeeac3'});

    });
	});
});
