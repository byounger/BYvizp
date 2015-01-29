/////CLUSTER 2 DATA SET - COLUMBIA HEIGHTS////////////

var data = {
  "name": "Columbia Heights",
 "children": [
	{
	
		"name": "demographic",
		"children": [
		{"name": "Black", "size2000":0.53},
		{"name": "White", "size2000":0.13},
		{"name": "Hispanic", "size2000":0.3},
		{"name": "Asian", "size2000":0.03}
		]
		},
	{
		"name": "wellbeing",
		"children": [
		{"name": "Unemployment", "size2000":0.1},
		{"name": "Poverty", "size2000":0.26},
		{"name": "Without HS Education", "size2000":0.42}
		]
		},
	{
		"name": "crime",
		"children": [
		{"name": "Violent Crime", "size2000":0.02},
		{"name": "Property Crime", "size2000":0.26}
		]
		},
	{
		"name": "housing",
		"children": [
		{"name": "Home Ownership", "size2000":0.26},
		{"name": "Houses for Rent", "size2000":0.05}
		]
	},
 	{
	
		"name": "demographic", 
		"children": [
		{"name": "Black", "size2010":0.38},
		{"name": "White", "size2010":0.31},
		{"name": "Hispanic", "size2010":0.27},
		{"name": "Asian", "size2010":0.04}
		]
		},
	{
		"name": "wellbeing",
		"children": [
		{"name": "Unemployment", "size2010":0.08},
		{"name": "Poverty", "size2010":0.17},
		{"name": "Without HS Education", "size2010":0.21}
		]
		},
	{
		"name": "crime",
		"children": [
		{"name": "Violent Crime", "size2010":0.01},
		{"name": "Property Crime", "size2010":0.17}
		]
		},
	{
		"name": "housing",
		"children": [
		{"name": "Home Ownership", "size2010":0.32},
		{"name": "Houses for Rent", "size2010":0.04}
		]
	}
   ]
   };


  var w = 550,
		h = 370,
		x = d3.scale.linear().range([0, w]),
		y = d3.scale.linear().range([0, h]),
		root,
		node;
		
  var svg = d3.select("#treemap").append("div")
    .attr("class", "chart")
    .style("width", w + "px")
    .style("height", h + "px")
  .append("svg:svg")
    .attr("width", w)
    .attr("height", h)
  .append("svg:g")
    .attr("transform", "translate(.5,.5)");


  node = root = data;
  
  var treemap1 = d3.layout.treemap()
    .round(false)
    .size([w, h])
    .sticky(true)
	.padding(.5)
    .value(function(d) { return d.size2000; });	
	
  var treemap2 = d3.layout.treemap()
		.round(false)
		.size([w, h])
		.sticky(true)
		.padding(.5)
		.value(function(d) { return d.size2010; });	
  
  var nodes1 = treemap1.nodes(root)
      .filter(function(d) { return !d.children; });

  var cell = svg.selectAll("g")
      .data(nodes1)
    .enter().append("svg:g")
      .attr("class", "cell")
      .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; })
      .on("click", function(d) { return zoom(node == d.parent ? root : d.parent); });
  
  cell.append("svg:rect")
      .attr("width", function(d) { return d.dx - 1; })
      .attr("height", function(d) { return d.dy - 1; })
      .style("fill", function(d) { return color(d.parent.name); })
	  .style("opacity", .85);

  cell.append("svg:text")
      .attr("x", function(d) { return d.dx / 2; })
      .attr("y", function(d) { return d.dy / 2; })
      .attr("dy", ".35em")
      .attr("text-anchor", "middle")
      .text(function(d) { return d.name + ": " + ((d.value)*100) + "%"; })
	  .style("opacity", function(d) { d.w = this.getComputedTextLength(); return d.dx > d.w ? 1 : 0; });



d3.selectAll("input").on("change", function change() {

	var nodes2 = treemap2.nodes(root)
      .filter(function(d) { return !d.children; });
	
	var value1 = this.value === "2000"
		? function(d) { return (d.size2010); }
        : function(d) { return (d.size2000); };

   cell.select("rect")
        .data(treemap2.value(value1).nodes2)
		.transition()
	   	.duration(1600);
	
	var value2 =  this.value === "2010"
		? function(d) { return (d.size2000); }
        : function(d) { return (d.size2010); };
	
	cell.select("rect")
		.data(treemap1.value(value2).nodes1)
		.transition()
		.duration(1600);

  });

 d3.select(window).on("click", function() { zoom(root); });
  
function zoom(d) {
  var kx = w / d.dx, ky = h / d.dy;
  x.domain([d.x, d.x + d.dx]);
  y.domain([d.y, d.y + d.dy]);

  var t = svg.selectAll("g.cell").transition()
      .duration(d3.event.altKey ? 7500 : 750)
      .attr("transform", function(d) { return "translate(" + x(d.x) + "," + y(d.y) + ")"; });

  t.select("rect")
      .attr("width", function(d) { return kx * d.dx - 1; })
      .attr("height", function(d) { return ky * d.dy - 1; })

  t.select("text")
      .attr("x", function(d) { return kx * d.dx / 2; })
      .attr("y", function(d) { return ky * d.dy / 2; })
	   .text(function(d) { return d.name + ": " + ((d.value)*100) + "%"; })
      .style("opacity", function(d) { return kx * d.dx > d.w ? 1 : 0; });

  node = d;
  d3.event.stopPropagation();
}

// add legend   
	var legend = d3.select("#legend").append("div")
	  .attr("class", "legend")
	  .attr("x", w - 100)
	  .attr("y", 75)
	  .attr("height", 50)
	  .attr("width", 100);

	var list =  legend.append("g")
	list.selectAll('g')
	.data(nodes1, function(d) { return d.parent.name; })
      .enter()
      .append('g')
      .each(function(d, i) {
        var l = d3.select(this);
                
        l.append("ltext")
          .attr("x", w - 50)
          .attr("y", i * 25 + 8)
          .attr("height",30)
          .attr("width",100)
          .style("color", function(d) { return color(d.parent.name) + " "; })
          .text((d.parent.name));
		});

