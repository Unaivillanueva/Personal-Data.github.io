var margin = {top: 5, right: 5, bottom: 5, left: 5},
    width = 355,
    height = 250;

var x = d3.scale.ordinal()
    .rangeRoundBands([0, width], .1);

var y = d3.scale.linear()
    .range([height, 0]);

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left");


var tip = d3.tip()
  .attr('class', 'd3-tip')
  .offset([310, 0])
  .html(function(d) {
    return "<strong>Mood:</strong> <span style='color:red'>" + d.mood+ "</span>";
  })

var svg = d3.select("#v3").append("svg")
    .attr("width", '80%')
    .attr("height", '100%')
    .attr('viewBox','0 0 '+Math.max(width,height)+' '+Math.min(width,height))
    .attr('preserveAspectRatio','xMinYMin')
  .append("g")
    .attr("transform", "translate(" + Math.min(width,height) / 12 + "," + Math.min(width,height) / 15 + ")");

svg.call(tip);

d3.tsv("mood-dev.tsv", type, function(error, data) {
  x.domain(data.map(function(d) { return d.deviation; }));
  y.domain([0, d3.max(data, function(d) { return d.mood; })]);

  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis)
      .append("text")
       .attr("transform", "translate(0," + 0 + ")")
      .style("text-anchor","end")
      .attr("x",330)
      .attr("y", 30)
      .style("font-size","11px")
      .text("Deviation (min)");

  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .style("font-size","11px")
      .text("Mood");

  svg.selectAll(".bar")
      .data(data)
    .enter().append("rect")
      .attr("class", "bar")
      .attr("x", function(d) { return x(d.deviation); })
      .attr("width", x.rangeBand())
      .attr("y", function(d) { return y(d.mood); })
      .attr("height", function(d) { return height - y(d.mood); })
      .on('mouseover', tip.show)
      .on('mouseout', tip.hide)

});

function type(d) {
  d.mood = +d.mood;
  return d;
}