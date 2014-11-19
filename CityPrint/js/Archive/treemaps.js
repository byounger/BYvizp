
	
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
	
d3.json("data/test.json", function(error, root) {
  var node = treemapdiv.datum(root).selectAll(".node")
      .data(treemap1.nodes)
		.enter().append("treemapdiv")
      .attr("class", "node")
      .call(position)
      .style("background", function(d) { return d.children ? color(d.name) : null; })
      .text(function(d) { return d.children ? null : d.name; });
 
	
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
  })
});	

function position() {
  this.style("left", function(d) { return d.x + "px"; })
      .style("top", function(d) { return d.y + "px"; })
      .style("width", function(d) { return Math.max(0, d.dx - 1) + "px"; })
      .style("height", function(d) { return Math.max(0, d.dy - 1) + "px"; });
}