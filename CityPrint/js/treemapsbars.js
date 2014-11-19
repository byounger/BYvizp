
	
/////////////////////////////Cluster1 Neighborhood////////////////////////////////////////////////////////////////////
var margin = {top: 40, right: 10, bottom: 10, left: 10},
    width = 310 - margin.left - margin.right,
    height = 250 - margin.top - margin.bottom;

var x = d3.scale.linear().range([0, width]),
    y = d3.scale.linear().range([0, height]);
	
var treemap1 = d3.layout.treemap("cluster1")
	.size([width, height])
    .mode("squarify")
	.sticky(true)
	.padding(.35)
	.value(function(d) { return (d.size2000); });

var treemap2 = d3.layout.treemap("cluster1")
	.size([width, height])
    .mode("squarify")
	.sticky(true)
	.padding(.35)
	.value(function(d) { return (d.size2010); });
	
var treemapdiv = d3.select("#treemap").append("treemapdiv")
    .style("position", "relative")
    .style("width", (width + margin.left + margin.right) + "px")
    .style("height", (height + margin.top + margin.bottom) + "px")
    .style("left", margin.left + "px")
    .style("top", margin.top + "px");

var barWidth = 103,
	barHeight = 20;
	
var x = d3.scale.linear().range([0, width]),
	y = d3.scale.linear().range([0, height]);

		var chart2000 = d3.select(".chart2000")
				.attr("width", width);	
					
		var chart2010 = d3.select(".chart2010")
				.attr("width", width);

	
d3.json("data/test.json", function(error, root) {
  var node = treemapdiv.datum(root).selectAll(".node")
      .data(treemap1.nodes)
		.enter().append("treemapdiv")
      .attr("class", "node")
      .call(position)
      .style("background", function(d) { return d.children ? color(d.name) : null; })
      .style("opacity", .9)
	  .text(function(d) { return d.children ? null : d.name; });

d3.selectAll("treemapdiv.node").on("click", function click() {	  
	node
			.on("click", function(d) {
				console.log(d); });
			
			node.forEach(function type(d) {
		  d.value = +d.size2000; // coerce to number
		  return d;
		})
	
		var bar1 = chart2000.selectAll("g")
			  .data(treemap1.nodes)
				.enter().append("g")
				  .attr("transform", function(d, i) { return "translate(0," + i * barHeight + ")"; });

			  bar1.append("rect")
				  .attr("width", function(d) { return x((d.value)*100); })
				  .attr("height", barHeight - 1);

			  bar1.append("text")
				  .attr("x", function(d) { return x((d.value)*100) - 3; })
				  .attr("y", barHeight / 2)
				  .attr("dy", ".35em")
				  .text(function(d) { return ((d.value)*100); });
	
	node
			.on("click", function(d) {
				console.log(d); });
			
			node.forEach(function type(d) {
		  d.value = +d.size2010; // coerce to number
		  return d;
		})
			var bar2 = chart2010.selectAll("g")
			  .data(treemap1.nodes)
				.enter().append("g")
				  .attr("transform", function(d, i) { return "translate(0," + i * barHeight + ")"; });

			  bar2.append("rect")
				  .attr("width", function(d) { return x((d.value)*100); })
				  .attr("height", barHeight - 1);

			  bar2.append("text")
				  .attr("x", function(d) { return x((d.value)*100) - 3; })
				  .attr("y", barHeight / 2)
				  .attr("dy", ".35em")
				  .text(function(d) { return ((d.value)*100); });
	})
	
d3.selectAll("input").on("change", function change() {
		var value1 = this.value === "2010"
			? function() { return (1); }
			: function(d) { return (d.size2000); };

    node
        .data(treemap2.value(value1).nodes)
      .transition()
	    .duration(1500)
        .call(position);
		
	var value2 =  this.value === "2000"
		? function(d) { return (d.size2000); }
		: function(d) { return (d.size2010); };
		
	node
		.data(treemap1.value(value2).nodes)
	  .transition()
		.duration(1500)
		.call(position);
  
 
});
})
function position() {
  this.style("left", function(d) { return d.x + "px"; })
      .style("top", function(d) { return d.y + "px"; })
      .style("width", function(d) { return Math.max(0, d.dx - 1) + "px"; })
      .style("height", function(d) { return Math.max(0, d.dy - 1) + "px"; });
}