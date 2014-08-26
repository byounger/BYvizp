var margin = {top: 30, right: 20, bottom: 30, left: 50}'
	width = 600 - margin.left - margin.right,
	height = 270 - margin.top - margin.bottom;

var parseDate = d3.time.format("%Y%m%d").parse;

var x = d3.time.scale().range([0, width]);
var y = d3.scale.linear().range([height, 0]);

var xAxis = d3.svg.axis().scale(x)
	.orient("top").ticks(5);

var yAxis = d3.svg.axis().scale(y)
	.orient("left").ticks(5);

var valueline = d3.svg.line()
	.x(function(d) { return x(d.Year); })
	.y(function(d) { return y(d.PctBlack); });
	
var valueline2 = d3.svg.line()
	.interpolate("basis")
	.x(function(d) { return x(d.Year); })
	.y(function(d) { return y(d.PctWhite); });

var valueline3 = d3.svg.line()
	.interpolate("basis")
	.x (function(d) { return x(d.Year); })
	.y (function(d) { return y(d.PctHisp); });

var valueline4 = d3.svg.line()
	.interpolate("basis")
	.x (function(d) { return x(d.Year); })
	.y (function(d) { return y(d.PctAsian); });	
	
var svg = d3.select("body")
		.append("svg")
			.attr("width", width + margin.left + margin.right)
			.attr("height", height + margin.top + margin.bottom)
		.append("g")
			.attr("transform",
				"translate(" + margin.left + "," + margin.top + ")";
				
	d3.csv("data/DC_NeighborhoodCluster_1.csv", function(error, data) {
				data.forEach(function(d) {
					d.Year = parseDate(d.Year);
					d.PctBlack = +d.PctBlack;
					d.PctWhite = +d.PctWhite;
					d.PctHisp = +d.PctHisp;
					d.PctAsian = +d.PctAsian;
				});
x.domain(d3.extent(data, function(d) { return d.Year; }));
y.domain([0, d3.max(data, function(d) { return d.PctBlack, d.PctWhite, d.PctHisp, d.PctAsian; })]);

var dataNest = d3.nest()
	.key(function(d) { return d.symbol;})
	.entries(data);

dataNest.forEach (function(d) {

	svg.append("path")
		.attr("class", "line")
		.attr("d", valueline(d.values));
});

var dataNest = d3.nest()
	.key(function(d) { return d.symbol;})
	.entries(data);

dataNest.forEach (function(d) {

	svg.append("path")
		.attr("class", "line")
		.attr("d", valueline2(d.values));
});

var dataNest = d3.nest()
	.key(function(d) { return d.symbol;})
	.entries(data);

dataNest.forEach (function(d) {

	svg.append("path")
		.attr("class", "line")
		.attr("d", valueline3(d.values));
});

var dataNest = d3.nest()
	.key(function(d) { return d.symbol;})
	.entries(data);

dataNest.forEach (function(d) {

	svg.append("path")
		.attr("class", "line")
		.attr("d", valueline4(d.values));
});

svg.append("g")
	.attr("class", "x axis")
	.attr("transform", "translate(0," + height + ")")
	.call(xAxis);

svg.append("g")
	.attr("class", "y axis")
	.call(yAxis);
});


