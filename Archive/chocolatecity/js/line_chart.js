var margin = {top: 30, right: 20, bottom: 30, left: 50},
    width = 600 - margin.left - margin.right,
    height = 270 - margin.top - margin.bottom;

// Parse the date / time
var parseDate = d3.time.format("%d-%b-%y").parse; 

// Set the ranges
var x = d3.time.scale().range([0, width]);
var y = d3.scale.linear().range([height, 0]);

// Define the axes
var xAxis = d3.svg.axis().scale(x)
    .orient("bottom").ticks(6);

var yAxis = d3.svg.axis().scale(y)
    .orient("left").ticks(3);

var valueline1 = d3.svg.line()
	.interpolate("basis")
	.x(function(d) { return x(d.year); })
	.y(function(d) { return y(d.pctblack); });
	
var valueline2 = d3.svg.line()
	.interpolate("basis")
	.x(function(d) { return x(d.year); })
	.y(function(d) { return y(d.pctwhite); });

var valueline3 = d3.svg.line()
	.interpolate("basis")
	.x (function(d) { return x(d.year); })
	.y (function(d) { return y(d.pcthisp); });

var valueline4 = d3.svg.line()
	.interpolate("basis")
	.x (function(d) { return x(d.year); })
	.y (function(d) { return y(d.pctasian); });	
	
var svg = d3.select("body")
		 .append("svg")
        	.attr("width", width + margin.left + margin.right)
        	.attr("height", height + margin.top + margin.bottom)
          .append("g")
        		.attr("transform", 
              	"translate(" + margin.left + "," + margin.top + ")");

				
	d3.csv("data/DC_NeighborhoodCluster_1.csv", function(error, data) {
				data.forEach(function(d) {
					d.year = parseDate(d.Year);
					d.pctblack = +d.PctBlack;
					d.pctwhite = +d.PctWhite;
					d.pcthisp = +d.PctHisp;
					d.pctasian = +d.PctAsian;
				});
x.domain(d3.extent(data, function(d) { return d.year; }));
y.domain([0, d3.max(data, function(d) { return Math.max(d.pctblack, d.pctwhite, d.pcthisp, d.pctasian); })]);

svg.append("path")
	.attr("class", "line") 
	.attr("d", valueline1(data));


svg.append("path")
	.attr("class", "line") 
	.attr("d", valueline2(data));


svg.append("path")
	.attr("class", "line") 
	.attr("d", valueline3(data));


svg.append("path")
	.attr("class", "line") 
	.attr("d", valueline4(data));

svg.append("g")
	.attr("class", "x axis")
	.attr("transform", "translate(0," + height + ")")
	.call(xAxis);

svg.append("g")
	.attr("class", "y axis")
	.call(yAxis);
});