/////////////////////////////Cluster1 Neighborhood////////////////////////////////////////////////////////////////////
var margin = {top: 40, right: 10, bottom: 10, left: 10},
    width = 310 - margin.left - margin.right,
    height = 250 - margin.top - margin.bottom;

var x = d3.scale.linear().range([0, width]),
    y = d3.scale.linear().range([0, height]);
	
var chart2000 = d3.select(".chart2000")
		.attr("width", width);
	
var dispatch = d3.dispatch("click", "load");

d3.json("data/test.json", function(json) {
	
	var barChartData = [];
	function addLeaves(node) {
		if (typeof node.children !== "undefined") {
			node.children.forEach(addLeaves);
		} else {
			barChartData.push(node);
		}
	}
	
	addLeaves(json);
	dispatch.click(treemapdiv.nodes);
	dispatch.load(barChartData.get());
	
	dispatch.on("click.node", function(barChartData) {
	var select = d3.select("treemap1").select("treemapdiv")
					.append("treemap1.nodes")
					.append("select")
						.on("click", function() { dispatch.load(barChartData.get(this.value));
						});
	dispatch.on("load.bar", function(barChartData) {
	
	var bar = chart2000.selectAll("g")
      .data(barChartData)
		.enter().append("g")
		  .attr("transform", function(d, i) { return "translate(0," + i * height + ")"; });

	  bar.append("rect")
		  .attr("width", function(d) { return x((d.size2000)*100); })
		  .attr("height", height - 1);

	  bar.append("text")
		  .attr("x", function(d) { return x((d.size2000)*100) - 3; })
		  .attr("y", height / 2)
		  .attr("dy", ".35em")
		  .text(function(d) { return d.value; });

});