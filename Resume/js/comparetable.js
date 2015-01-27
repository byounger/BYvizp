var dispatch = d3.dispatch("load", "neighborhoodchange1", "neighborhoodchange3");
	
d3.csv("data/dcneighborhoodclusters.csv", type, function(error, hoods) {
     if (error) throw error;	
	var hoodByneighborhood = d3.map();
	hoods.forEach(function (d) {
		hoodByneighborhood.set(d.neighborhood, d);
		});
	
	dispatch.load(hoodByneighborhood);
	dispatch.neighborhoodchange1(hoodByneighborhood.get("pick a neighborhood"));
	});
	
	//drop-down for first column data
	dispatch.on("load.menu1", function(hoodByneighborhood) {
		var select = d3.select("#n1c")
			.append("div")
			.append("select")
			.on("change", function() { dispatch.neighborhoodchange1(hoodByneighborhood.get(this.value)); });
		
		select.selectAll("option")
			.data(hoodByneighborhood.values())
		  .enter().append("option")
			.attr("text-anchor", "middle")
				.attr("font-family", "Raleway, sans-serif")
				.attr("font-size", "9px")
			.attr("value", function(d) { return d.neighborhood; })
			.text(function(d) { return d.neighborhood; });
		
		dispatch.on("neighborhoodchange1.menu1", function(neighborhood) {
			select.property("value", neighborhood.neighborhood);
		});
	});

	//drop-down for second column data
	dispatch.on("load.menu2", function(hoodByneighborhood) {
		var select = d3.select("#n3c")
			.append("div")
			.append("select")
			.on("change", function() { dispatch.neighborhoodchange3(hoodByneighborhood.get(this.value)); });
		
		select.selectAll("option")
			.data(hoodByneighborhood.values())
		  .enter().append("option")
				.attr("text-anchor", "middle")
				.attr("font-family", "Raleway, sans-serif")
				.attr("font-size", "9px")
			.attr("value", function(d) { return d.neighborhood; })
			.text(function(d) { return d.neighborhood; });
		
		dispatch.on("neighborhoodchange3.menu2", function(neighborhood) {
			select.property("value", neighborhood.neighborhood);
		});
	});	
	
	
	//Column a data////
	//dispatch for bar chart bars grouped by categories
	//Total Population bar based on total population across DC from 2000 and 2010 
	dispatch.on("load.tpa2000", function(hoodByneighborhood) {
				
		var margin = {top: 0, right: 0, bottom: 0, left: 0},
		width = 145 - margin.left - margin.right,
		height = 20 - margin.top - margin.bottom;

		 var x = d3.scale.linear()
			.domain([0, 47500]) //d3.max(hoodByneighborhood.values(), function(d) { return d.totpop2000; })])
				.range([width, 0]);
		 
		var xAxis = d3.svg.axis()
				.scale(x)
				.orient("bottom")
				.tickFormat(d3.format(".2s"));
		
		var svg = d3.select("#tpa2000").append("svg")
			  .attr("width", width + margin.left + margin.right)
			  .attr("height", height + margin.top + margin.bottom)
			.append("g")
			  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

		 svg.append("g");

		
		
		var rect = svg.append("rect")
			  .attr("x", width)
			  .attr("width", 0)
			  .attr("y", 4)
			  .attr("height", height - 4)
			  .style("fill", "#676767")
			  .style("opacity", 0.4)
			  
			  
		var title = rect.append("title")
				.attr("x", x)
				.attr("text-anchor", "middle")
				.attr("font-family", "Raleway, sans-serif")
				.attr("font-size", "10px")
				.attr("font-color", "#525252")
				.attr("fill", "white")
				.text(function (d) { return d; });
				
		
		//var text = svg.append("text")
				//.attr("y", height / 2)
				//.attr("dy", ".35em")
				//.text([d3.data(hoodByneighborhood.values(), function (d) { return d.asian2000; })*100]);
		
	dispatch.on("neighborhoodchange1.tpa2000", function(d) {
		rect.transition()
			
			.attr("x", x(d.totpop2000))
			.attr("width", x(0) - x(d.totpop2000))
			
		title.transition()
			.text( d.totpop2000 + " total population");
	});
 
});

dispatch.on("load.tpa2010", function(hoodByneighborhood) {
				
		var margin = {top: -8, right: 0, bottom: -8, left: 0},
		width = 145 - margin.left - margin.right,
		height = 18 - margin.top - margin.bottom;

		 var x = d3.scale.linear()
			.domain([0, 47500]) //d3.max(hoodByneighborhood.values(), function(d) { return d.totpop2010; })])
				.range([width, 0]);
		 
		var xAxis = d3.svg.axis()
				.scale(x)
				.orient("bottom")
				.tickFormat(d3.format(".2s"));
		
		var svg = d3.select(".tpa2010").append("svg")
			  .attr("width", width + margin.left + margin.right)
			  .attr("height", height + margin.top + margin.bottom)
			.append("g")
			  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

		 svg.append("g");

		
		
		var rect = svg.append("rect")
			  .attr("x", width)
			  .attr("width", 0)
			  .attr("y", 4)
			  .attr("height", height - 4)
			  .style("fill", "#676767")
			  .style("opacity", 0.8)
			  
		var title = rect.append("title")
				.attr("x", x)
				.attr("text-anchor", "middle")
				.attr("font-family", "Raleway, sans-serif")
				.attr("font-size", "10px")
				.attr("font-color", "#525252")
				.attr("fill", "white")
				.text(function (d) { return d; });
				
		
		//var text = svg.append("text")
				//.attr("y", height / 2)
				//.attr("dy", ".35em")
				//.text([d3.data(hoodByneighborhood.values(), function (d) { return d.asian2000; })*100]);
		
	dispatch.on("neighborhoodchange1.tpa2010", function(d) {
		rect.transition()
			
			.attr("x", x(d.totpop2010))
			.attr("width", x(0) - x(d.totpop2010))
			
		title.transition()
			.text( d.totpop2010 + " total population");
	});
 
});
	
	
	
	
	
	
	
	//////////Asian % Bars column 1
	dispatch.on("load.bar1a2000", function(hoodByneighborhood) {
				
		var margin = {top: 0, right: 0, bottom: 0, left: 0},
		width = 145 - margin.left - margin.right,
		height = 20 - margin.top - margin.bottom;

		 var x = d3.scale.linear()
			.domain([0, 1.0]) //d3.max(hoodByneighborhood.values(), function(d) { return d.asian2000; })])
				.range([width, 0]);
		 
		var xAxis = d3.svg.axis()
				.scale(x)
				.orient("bottom")
				.tickFormat(d3.format(".2s"));
		
		var svg = d3.select("#bar1a2000").append("svg")
			  .attr("width", width + margin.left + margin.right)
			  .attr("height", height + margin.top + margin.bottom)
			.append("g")
			  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

		 svg.append("g");

		
		
		var rect = svg.append("rect")
			  .attr("x", width)
			  .attr("width", 0)
			  .attr("y", 4)
			  .attr("height", height - 4)
			  .style("fill", "#ffc425")
			  .style("opacity", 0.4)
			  
			  
		var title = rect.append("title")
				.attr("x", x)
				.attr("text-anchor", "middle")
				.attr("font-family", "Raleway, sans-serif")
				.attr("font-size", "10px")
				.attr("font-color", "#525252")
				.attr("fill", "white")
				.text(function (d) { return d; });
				
		
		//var text = svg.append("text")
				//.attr("y", height / 2)
				//.attr("dy", ".35em")
				//.text([d3.data(hoodByneighborhood.values(), function (d) { return d.asian2000; })*100]);
		
	dispatch.on("neighborhoodchange1.bar1a2000", function(d) {
		rect.transition()
			
			.attr("x", x(d.asian2000))
			.attr("width", x(0) - x(d.asian2000))
			
		title.transition()
			.text( d.asian2000 * 100 + "%" + " of population");
	});
 
});

dispatch.on("load.bar1a2010", function(hoodByneighborhood) {
				
		var margin = {top: -8, right: 0, bottom: -8, left: 0},
		width = 145 - margin.left - margin.right,
		height = 18 - margin.top - margin.bottom;

		 var x = d3.scale.linear()
			.domain([0, 1.0]) //d3.max(hoodByneighborhood.values(), function(d) { return d.asian2000; })])
				.range([width, 0]);
		 
		var xAxis = d3.svg.axis()
				.scale(x)
				.orient("bottom")
				.tickFormat(d3.format(".2s"));
		
		var svg = d3.select(".bar1a2010").append("svg")
			  .attr("width", width + margin.left + margin.right)
			  .attr("height", height + margin.top + margin.bottom)
			.append("g")
			  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

		 svg.append("g");

		
		
		var rect = svg.append("rect")
			  .attr("x", width)
			  .attr("width", 0)
			  .attr("y", 4)
			  .attr("height", height - 4)
			  .style("fill", "#ffc425")
			  .style("opacity", 0.8)
			  
		var title = rect.append("title")
				.attr("x", x)
				.attr("text-anchor", "middle")
				.attr("font-family", "Raleway, sans-serif")
				.attr("font-size", "10px")
				.attr("font-color", "#525252")
				.attr("fill", "white")
				.text(function (d) { return d; });
				
		
		//var text = svg.append("text")
				//.attr("y", height / 2)
				//.attr("dy", ".35em")
				//.text([d3.data(hoodByneighborhood.values(), function (d) { return d.asian2000; })*100]);
		
	dispatch.on("neighborhoodchange1.bar1a2010", function(d) {
		rect.transition()
			
			.attr("x", x(d.asian2010))
			.attr("width", x(0) - x(d.asian2010))
			
		title.transition()
			.text( d.asian2010 * 100 + "%" + " of population");
	});
 
});

	//////////Black % Bars column 1
	dispatch.on("load.bar2a2000", function(hoodByneighborhood) {
				
		var margin = {top: 0, right: 0, bottom: 0, left: 0},
		width = 145 - margin.left - margin.right,
		height = 20 - margin.top - margin.bottom;

		 var x = d3.scale.linear()
			.domain([0, 1.0]) //d3.max(hoodByneighborhood.values(), function(d) { return d.asian2000; })])
				.range([width, 0]);
		 
		var xAxis = d3.svg.axis()
				.scale(x)
				.orient("bottom")
				.tickFormat(d3.format(".2s"));
		
		var svg = d3.select("#bar2a2000").append("svg")
			  .attr("width", width + margin.left + margin.right)
			  .attr("height", height + margin.top + margin.bottom)
			.append("g")
			  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

		 svg.append("g");

		
		
		var rect = svg.append("rect")
			  .attr("x", width)
			  .attr("width", 0)
			  .attr("y", 4)
			  .attr("height", height - 4)
			  .style("fill", "#ffc425")
			  .style("opacity", 0.4)
				
		
		var title = rect.append("title")
				.attr("x", x)
				.attr("text-anchor", "middle")
				.attr("font-family", "Raleway, sans-serif")
				.attr("font-size", "10px")
				.attr("font-color", "#525252")
				.attr("fill", "white")
				.text(function (d) { return d; });
				
		
		//var text = svg.append("text")
				//.attr("y", height / 2)
				//.attr("dy", ".35em")
				//.text([d3.data(hoodByneighborhood.values(), function (d) { return d.asian2000; })*100]);
		
	dispatch.on("neighborhoodchange1.bar2a2000", function(d) {
		rect.transition()
			
			.attr("x", x(d.black2000))
			.attr("width", x(0) - x(d.black2000))
			
		title.transition()
			.text( d.black2000 * 100 + "%" + " of population");
	});
 
});

dispatch.on("load.bar2a2010", function(hoodByneighborhood) {
				
		var margin = {top: -8, right: 0, bottom: -8, left: 0},
		width = 145 - margin.left - margin.right,
		height = 18 - margin.top - margin.bottom;

		 var x = d3.scale.linear()
			.domain([0, 1.0]) //d3.max(hoodByneighborhood.values(), function(d) { return d.asian2000; })])
				.range([width, 0]);
		 
		var xAxis = d3.svg.axis()
				.scale(x)
				.orient("bottom")
				.tickFormat(d3.format(".2s"));
		
		var svg = d3.select(".bar2a2010").append("svg")
			  .attr("width", width + margin.left + margin.right)
			  .attr("height", height + margin.top + margin.bottom)
			.append("g")
			  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

		 svg.append("g");

		
		
		var rect = svg.append("rect")
			  .attr("x", width)
			  .attr("width", 0)
			  .attr("y", 4)
			  .attr("height", height - 4)
			  .style("fill", "#ffc425")
			  .style("opacity", 0.8)
			  
		var title = rect.append("title")
				.attr("x", x)
				.attr("text-anchor", "middle")
				.attr("font-family", "Raleway, sans-serif")
				.attr("font-size", "10px")
				.attr("font-color", "#525252")
				.attr("fill", "white")
				.text(function (d) { return d; });
				
		
		//var text = svg.append("text")
				//.attr("y", height / 2)
				//.attr("dy", ".35em")
				//.text([d3.data(hoodByneighborhood.values(), function (d) { return d.asian2000; })*100]);
		
	dispatch.on("neighborhoodchange1.bar2a2010", function(d) {
		rect.transition()
			
			.attr("x", x(d.black2010))
			.attr("width", x(0) - x(d.black2010))
			
		title.transition()
			.text( d.black2010 * 100 + "%" + " of population");
	});
 
});

	//////////Hispanic % Bars column 1
	dispatch.on("load.bar3a2000", function(hoodByneighborhood) {
				
		var margin = {top: 0, right: 0, bottom: 0, left: 0},
		width = 145 - margin.left - margin.right,
		height = 20 - margin.top - margin.bottom;

		 var x = d3.scale.linear()
			.domain([0, 1.0]) //d3.max(hoodByneighborhood.values(), function(d) { return d.asian2000; })])
				.range([width, 0]);
		 
		var xAxis = d3.svg.axis()
				.scale(x)
				.orient("bottom")
				.tickFormat(d3.format(".2s"));
		
		var svg = d3.select("#bar3a2000").append("svg")
			  .attr("width", width + margin.left + margin.right)
			  .attr("height", height + margin.top + margin.bottom)
			.append("g")
			  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

		 svg.append("g");

		
		
		var rect = svg.append("rect")
			  .attr("x", width)
			  .attr("width", 0)
			  .attr("y", 4)
			  .attr("height", height - 4)
			  .style("fill", "#ffc425")
			  .style("opacity", 0.4)
				
		
		var title = rect.append("title")
				.attr("x", x)
				.attr("text-anchor", "middle")
				.attr("font-family", "Raleway, sans-serif")
				.attr("font-size", "10px")
				.attr("font-color", "#525252")
				.attr("fill", "white")
				.text(function (d) { return d; });
				
		
		//var text = svg.append("text")
				//.attr("y", height / 2)
				//.attr("dy", ".35em")
				//.text([d3.data(hoodByneighborhood.values(), function (d) { return d.asian2000; })*100]);
		
	dispatch.on("neighborhoodchange1.bar3a2000", function(d) {
		rect.transition()
			
			.attr("x", x(d.hisp2000))
			.attr("width", x(0) - x(d.hisp2000))
			
		title.transition()
			.text( d.hisp2000 * 100 + "%" + " of population");
	});
 
});

dispatch.on("load.bar3a2010", function(hoodByneighborhood) {
				
		var margin = {top: -8, right: 0, bottom: -8, left: 0},
		width = 145 - margin.left - margin.right,
		height = 18 - margin.top - margin.bottom;

		 var x = d3.scale.linear()
			.domain([0, 1.0]) //d3.max(hoodByneighborhood.values(), function(d) { return d.asian2000; })])
				.range([width, 0]);
		 
		var xAxis = d3.svg.axis()
				.scale(x)
				.orient("bottom")
				.tickFormat(d3.format(".2s"));
		
		var svg = d3.select(".bar3a2010").append("svg")
			  .attr("width", width + margin.left + margin.right)
			  .attr("height", height + margin.top + margin.bottom)
			.append("g")
			  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

		 svg.append("g");

		
		
		var rect = svg.append("rect")
			  .attr("x", width)
			  .attr("width", 0)
			  .attr("y", 4)
			  .attr("height", height - 4)
			  .style("fill", "#ffc425")
			  .style("opacity", 0.8)
			  
		var title = rect.append("title")
				.attr("x", x)
				.attr("text-anchor", "middle")
				.attr("font-family", "Raleway, sans-serif")
				.attr("font-size", "10px")
				.attr("font-color", "#525252")
				.attr("fill", "white")
				.text(function (d) { return d; });
				
		
		//var text = svg.append("text")
				//.attr("y", height / 2)
				//.attr("dy", ".35em")
				//.text([d3.data(hoodByneighborhood.values(), function (d) { return d.asian2000; })*100]);
		
	dispatch.on("neighborhoodchange1.bar3a2010", function(d) {
		rect.transition()
			
			.attr("x", x(d.hisp2010))
			.attr("width", x(0) - x(d.hisp2010))
			
		title.transition()
			.text( d.hisp2010 * 100 + "%" + " of population");
	});
 
});


	//////////White % Bars column 1
	dispatch.on("load.bar4a2000", function(hoodByneighborhood) {
				
		var margin = {top: 0, right: 0, bottom: 0, left: 0},
		width = 145 - margin.left - margin.right,
		height = 20 - margin.top - margin.bottom;

		 var x = d3.scale.linear()
			.domain([0, 1.0]) //d3.max(hoodByneighborhood.values(), function(d) { return d.asian2000; })])
				.range([width, 0]);
		 
		var xAxis = d3.svg.axis()
				.scale(x)
				.orient("bottom")
				.tickFormat(d3.format(".2s"));
		
		var svg = d3.select("#bar4a2000").append("svg")
			  .attr("width", width + margin.left + margin.right)
			  .attr("height", height + margin.top + margin.bottom)
			.append("g")
			  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

		 svg.append("g");

		
		
		var rect = svg.append("rect")
			  .attr("x", width)
			  .attr("width", 0)
			  .attr("y", 4)
			  .attr("height", height - 4)
			  .style("fill", "#ffc425")
			  .style("opacity", 0.4)
				
		
		var title = rect.append("title")
				.attr("x", x)
				.attr("text-anchor", "middle")
				.attr("font-family", "Raleway, sans-serif")
				.attr("font-size", "10px")
				.attr("font-color", "#525252")
				.attr("fill", "white")
				.text(function (d) { return d; });
				
		
		//var text = svg.append("text")
				//.attr("y", height / 2)
				//.attr("dy", ".35em")
				//.text([d3.data(hoodByneighborhood.values(), function (d) { return d.asian2000; })*100]);
		
	dispatch.on("neighborhoodchange1.bar4a2000", function(d) {
		rect.transition()
			
			.attr("x", x(d.white2000))
			.attr("width", x(0) - x(d.white2000))
			
		title.transition()
			.text( d.white2000 * 100 + "%" + " of population");
	});
 
});

dispatch.on("load.bar4a2010", function(hoodByneighborhood) {
				
		var margin = {top: -8, right: 0, bottom: -8, left: 0},
		width = 145 - margin.left - margin.right,
		height = 18 - margin.top - margin.bottom;

		 var x = d3.scale.linear()
			.domain([0, 1.0]) //d3.max(hoodByneighborhood.values(), function(d) { return d.asian2000; })])
				.range([width, 0]);
		 
		var xAxis = d3.svg.axis()
				.scale(x)
				.orient("bottom")
				.tickFormat(d3.format(".2s"));
		
		var svg = d3.select(".bar4a2010").append("svg")
			  .attr("width", width + margin.left + margin.right)
			  .attr("height", height + margin.top + margin.bottom)
			.append("g")
			  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

		 svg.append("g");

		
		
		var rect = svg.append("rect")
			  .attr("x", width)
			  .attr("width", 0)
			  .attr("y", 4)
			  .attr("height", height - 4)
			  .style("fill", "#ffc425")
			  .style("opacity", 0.8)
			  
		var title = rect.append("title")
				.attr("x", x)
				.attr("text-anchor", "middle")
				.attr("font-family", "Raleway, sans-serif")
				.attr("font-size", "10px")
				.attr("font-color", "#525252")
				.attr("fill", "white")
				.text(function (d) { return d; });
				
		
		//var text = svg.append("text")
				//.attr("y", height / 2)
				//.attr("dy", ".35em")
				//.text([d3.data(hoodByneighborhood.values(), function (d) { return d.asian2000; })*100]);
		
	dispatch.on("neighborhoodchange1.bar4a2010", function(d) {
		rect.transition()
			
			.attr("x", x(d.white2010))
			.attr("width", x(0) - x(d.white2010))
			
		title.transition()
			.text( d.white2010 * 100 + "%" + " of population");
	});
 
});  

	//////////Without education % Bars column 1
	dispatch.on("load.bar5a2000", function(hoodByneighborhood) {
				
		var margin = {top: 0, right: 0, bottom: 0, left: 0},
		width = 145 - margin.left - margin.right,
		height = 20 - margin.top - margin.bottom;

		 var x = d3.scale.linear()
			.domain([0, 1.0]) //d3.max(hoodByneighborhood.values(), function(d) { return d.asian2000; })])
				.range([width, 0]);
		 
		var xAxis = d3.svg.axis()
				.scale(x)
				.orient("bottom")
				.tickFormat(d3.format(".2s"));
		
		var svg = d3.select("#bar5a2000").append("svg")
			  .attr("width", width + margin.left + margin.right)
			  .attr("height", height + margin.top + margin.bottom)
			.append("g")
			  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

		 svg.append("g");

		
		
		var rect = svg.append("rect")
			  .attr("x", width)
			  .attr("width", 0)
			  .attr("y", 4)
			  .attr("height", height - 4)
			  .style("fill", "#d11141")
			  .style("opacity", 0.4)
				
		
		var title = rect.append("title")
				.attr("x", x)
				.attr("text-anchor", "middle")
				.attr("font-family", "Raleway, sans-serif")
				.attr("font-size", "10px")
				.attr("font-color", "#d11141")
				.attr("fill", "white")
				.text(function (d) { return d; });
				
		
		//var text = svg.append("text")
				//.attr("y", height / 2)
				//.attr("dy", ".35em")
				//.text([d3.data(hoodByneighborhood.values(), function (d) { return d.asian2000; })*100]);
		
	dispatch.on("neighborhoodchange1.bar5a2000", function(d) {
		rect.transition()
			
			.attr("x", x(d.woeducation2000))
			.attr("width", x(0) - x(d.woeducation2000))
			
		title.transition()
			.text( d.woeducation2000 * 100 + "%" + " of population");
	});
 
});

dispatch.on("load.bar5a2010", function(hoodByneighborhood) {
				
		var margin = {top: -8, right: 0, bottom: -8, left: 0},
		width = 145 - margin.left - margin.right,
		height = 18 - margin.top - margin.bottom;

		 var x = d3.scale.linear()
			.domain([0, 1.0]) //d3.max(hoodByneighborhood.values(), function(d) { return d.asian2000; })])
				.range([width, 0]);
		 
		var xAxis = d3.svg.axis()
				.scale(x)
				.orient("bottom")
				.tickFormat(d3.format(".2s"));
		
		var svg = d3.select(".bar5a2010").append("svg")
			  .attr("width", width + margin.left + margin.right)
			  .attr("height", height + margin.top + margin.bottom)
			.append("g")
			  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

		 svg.append("g");

		
		
		var rect = svg.append("rect")
			  .attr("x", width)
			  .attr("width", 0)
			  .attr("y", 4)
			  .attr("height", height - 4)
			  .style("fill", "#d11141")
			  .style("opacity", 0.8)
			  
		var title = rect.append("title")
				.attr("x", x)
				.attr("text-anchor", "middle")
				.attr("font-family", "Raleway, sans-serif")
				.attr("font-size", "10px")
				.attr("font-color", "#525252")
				.attr("fill", "white")
				.text(function (d) { return d; });
				
		
		//var text = svg.append("text")
				//.attr("y", height / 2)
				//.attr("dy", ".35em")
				//.text([d3.data(hoodByneighborhood.values(), function (d) { return d.asian2000; })*100]);
		
	dispatch.on("neighborhoodchange1.bar5a2010", function(d) {
		rect.transition()
			
			.attr("x", x(d.woeducation2010))
			.attr("width", x(0) - x(d.woeducation2010))
			
		title.transition()
			.text( d.woeducation2010 * 100 + "%" + " of population");
	});
 
}); 

	//////////Poverty % Bars column 1
	dispatch.on("load.bar6a2000", function(hoodByneighborhood) {
				
		var margin = {top: 0, right: 0, bottom: 0, left: 0},
		width = 145 - margin.left - margin.right,
		height = 20 - margin.top - margin.bottom;

		 var x = d3.scale.linear()
			.domain([0, 1.0]) //d3.max(hoodByneighborhood.values(), function(d) { return d.asian2000; })])
				.range([width, 0]);
		 
		var xAxis = d3.svg.axis()
				.scale(x)
				.orient("bottom")
				.tickFormat(d3.format(".2s"));
		
		var svg = d3.select("#bar6a2000").append("svg")
			  .attr("width", width + margin.left + margin.right)
			  .attr("height", height + margin.top + margin.bottom)
			.append("g")
			  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

		 svg.append("g");

		
		
		var rect = svg.append("rect")
			  .attr("x", width)
			  .attr("width", 0)
			  .attr("y", 4)
			  .attr("height", height - 4)
			  .style("fill", "#d11141")
			  .style("opacity", 0.4)
				
		
		var title = rect.append("title")
				.attr("x", x)
				.attr("text-anchor", "middle")
				.attr("font-family", "Raleway, sans-serif")
				.attr("font-size", "10px")
				.attr("font-color", "#d11141")
				.attr("fill", "white")
				.text(function (d) { return d; });
				
		
		//var text = svg.append("text")
				//.attr("y", height / 2)
				//.attr("dy", ".35em")
				//.text([d3.data(hoodByneighborhood.values(), function (d) { return d.asian2000; })*100]);
		
	dispatch.on("neighborhoodchange1.bar6a2000", function(d) {
		rect.transition()
			
			.attr("x", x(d.poverty2000))
			.attr("width", x(0) - x(d.poverty2000))
			
		title.transition()
			.text( d.poverty2000 * 100 + "%" + " of population");
	});
 
});

dispatch.on("load.bar6a2010", function(hoodByneighborhood) {
				
		var margin = {top: -8, right: 0, bottom: -8, left: 0},
		width = 145 - margin.left - margin.right,
		height = 18 - margin.top - margin.bottom;

		 var x = d3.scale.linear()
			.domain([0, 1.0]) //d3.max(hoodByneighborhood.values(), function(d) { return d.asian2000; })])
				.range([width, 0]);
		 
		var xAxis = d3.svg.axis()
				.scale(x)
				.orient("bottom")
				.tickFormat(d3.format(".2s"));
		
		var svg = d3.select(".bar6a2010").append("svg")
			  .attr("width", width + margin.left + margin.right)
			  .attr("height", height + margin.top + margin.bottom)
			.append("g")
			  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

		 svg.append("g");

		
		
		var rect = svg.append("rect")
			  .attr("x", width)
			  .attr("width", 0)
			  .attr("y", 4)
			  .attr("height", height - 4)
			  .style("fill", "#d11141")
			  .style("opacity", 0.8)
			  
		var title = rect.append("title")
				.attr("x", x)
				.attr("text-anchor", "middle")
				.attr("font-family", "Raleway, sans-serif")
				.attr("font-size", "10px")
				.attr("font-color", "#525252")
				.attr("fill", "white")
				.text(function (d) { return d; });
				
		
		//var text = svg.append("text")
				//.attr("y", height / 2)
				//.attr("dy", ".35em")
				//.text([d3.data(hoodByneighborhood.values(), function (d) { return d.asian2000; })*100]);
		
	dispatch.on("neighborhoodchange1.bar6a2010", function(d) {
		rect.transition()
			
			.attr("x", x(d.poverty2010))
			.attr("width", x(0) - x(d.poverty2010))
			
		title.transition()
			.text( d.poverty2010 * 100 + "%" + " of population");
	});
 
}); 

	//////////Unemployment % Bars column 1
	dispatch.on("load.bar7a2000", function(hoodByneighborhood) {
				
		var margin = {top: 0, right: 0, bottom: 0, left: 0},
		width = 145 - margin.left - margin.right,
		height = 20 - margin.top - margin.bottom;

		 var x = d3.scale.linear()
			.domain([0, 1.0]) //d3.max(hoodByneighborhood.values(), function(d) { return d.asian2000; })])
				.range([width, 0]);
		 
		var xAxis = d3.svg.axis()
				.scale(x)
				.orient("bottom")
				.tickFormat(d3.format(".2s"));
		
		var svg = d3.select("#bar7a2000").append("svg")
			  .attr("width", width + margin.left + margin.right)
			  .attr("height", height + margin.top + margin.bottom)
			.append("g")
			  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

		 svg.append("g");

		
		
		var rect = svg.append("rect")
			  .attr("x", width)
			  .attr("width", 0)
			  .attr("y", 4)
			  .attr("height", height - 4)
			  .style("fill", "#d11141")
			  .style("opacity", 0.4)
				
		
		var title = rect.append("title")
				.attr("x", x)
				.attr("text-anchor", "middle")
				.attr("font-family", "Raleway, sans-serif")
				.attr("font-size", "10px")
				.attr("font-color", "#d11141")
				.attr("fill", "white")
				.text(function (d) { return d; });
				
		
		//var text = svg.append("text")
				//.attr("y", height / 2)
				//.attr("dy", ".35em")
				//.text([d3.data(hoodByneighborhood.values(), function (d) { return d.asian2000; })*100]);
		
	dispatch.on("neighborhoodchange1.bar7a2000", function(d) {
		rect.transition()
			
			.attr("x", x(d.unemploy2000))
			.attr("width", x(0) - x(d.unemploy2000))
			
		title.transition()
			.text( d.unemploy2000 * 100 + "%" + " of population");
	});
 
});

dispatch.on("load.bar7a2010", function(hoodByneighborhood) {
				
		var margin = {top: -8, right: 0, bottom: -8, left: 0},
		width = 145 - margin.left - margin.right,
		height = 18 - margin.top - margin.bottom;

		 var x = d3.scale.linear()
			.domain([0, 1.0]) //d3.max(hoodByneighborhood.values(), function(d) { return d.asian2000; })])
				.range([width, 0]);
		 
		var xAxis = d3.svg.axis()
				.scale(x)
				.orient("bottom")
				.tickFormat(d3.format(".2s"));
		
		var svg = d3.select(".bar7a2010").append("svg")
			  .attr("width", width + margin.left + margin.right)
			  .attr("height", height + margin.top + margin.bottom)
			.append("g")
			  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

		 svg.append("g");

		
		
		var rect = svg.append("rect")
			  .attr("x", width)
			  .attr("width", 0)
			  .attr("y", 4)
			  .attr("height", height - 4)
			  .style("fill", "#d11141")
			  .style("opacity", 0.8)
			  
		var title = rect.append("title")
				.attr("x", x)
				.attr("text-anchor", "middle")
				.attr("font-family", "Raleway, sans-serif")
				.attr("font-size", "10px")
				.attr("font-color", "#525252")
				.attr("fill", "white")
				.text(function (d) { return d; });
				
		
		//var text = svg.append("text")
				//.attr("y", height / 2)
				//.attr("dy", ".35em")
				//.text([d3.data(hoodByneighborhood.values(), function (d) { return d.asian2000; })*100]);
		
	dispatch.on("neighborhoodchange1.bar7a2010", function(d) {
		rect.transition()
			
			.attr("x", x(d.unemploy2010))
			.attr("width", x(0) - x(d.unemploy2010))
			
		title.transition()
			.text( d.unemploy2010 * 100 + "%" + " of population");
	});
 
}); 
  
  
 	////////// Property Crime % Bars column 1
	dispatch.on("load.bar8a2000", function(hoodByneighborhood) {
				
		var margin = {top: 0, right: 0, bottom: 0, left: 0},
		width = 145 - margin.left - margin.right,
		height = 20 - margin.top - margin.bottom;

		 var x = d3.scale.linear()
			.domain([0, 1.0]) //d3.max(hoodByneighborhood.values(), function(d) { return d.asian2000; })])
				.range([width, 0]);
		 
		var xAxis = d3.svg.axis()
				.scale(x)
				.orient("bottom")
				.tickFormat(d3.format(".2s"));
		
		var svg = d3.select("#bar8a2000").append("svg")
			  .attr("width", width + margin.left + margin.right)
			  .attr("height", height + margin.top + margin.bottom)
			.append("g")
			  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

		 svg.append("g");

		
		
		var rect = svg.append("rect")
			  .attr("x", width)
			  .attr("width", 0)
			  .attr("y", 4)
			  .attr("height", height - 4)
			  .style("fill", "#00b159")
			  .style("opacity", 0.4)
				
		
		var title = rect.append("title")
				.attr("x", x)
				.attr("text-anchor", "middle")
				.attr("font-family", "Raleway, sans-serif")
				.attr("font-size", "10px")
				.attr("font-color", "#d11141")
				.attr("fill", "white")
				.text(function (d) { return d; });
				
		
		//var text = svg.append("text")
				//.attr("y", height / 2)
				//.attr("dy", ".35em")
				//.text([d3.data(hoodByneighborhood.values(), function (d) { return d.asian2000; })*100]);
		
	dispatch.on("neighborhoodchange1.bar8a2000", function(d) {
		rect.transition()
			
			.attr("x", x(d.propertyc2000))
			.attr("width", x(0) - x(d.propertyc2000))
			
		title.transition()
			.text( d.propertyc2000 * 100 + "%" + " of population");
	});
 
});

dispatch.on("load.bar8a2010", function(hoodByneighborhood) {
				
		var margin = {top: -8, right: 0, bottom: -8, left: 0},
		width = 145 - margin.left - margin.right,
		height = 18 - margin.top - margin.bottom;

		 var x = d3.scale.linear()
			.domain([0, 1.0]) //d3.max(hoodByneighborhood.values(), function(d) { return d.asian2000; })])
				.range([width, 0]);
		 
		var xAxis = d3.svg.axis()
				.scale(x)
				.orient("bottom")
				.tickFormat(d3.format(".2s"));
		
		var svg = d3.select(".bar8a2010").append("svg")
			  .attr("width", width + margin.left + margin.right)
			  .attr("height", height + margin.top + margin.bottom)
			.append("g")
			  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

		 svg.append("g");

		
		
		var rect = svg.append("rect")
			  .attr("x", width)
			  .attr("width", 0)
			  .attr("y", 4)
			  .attr("height", height - 4)
			  .style("fill", "#00b159")
			  .style("opacity", 0.8)
			  
		var title = rect.append("title")
				.attr("x", x)
				.attr("text-anchor", "middle")
				.attr("font-family", "Raleway, sans-serif")
				.attr("font-size", "10px")
				.attr("font-color", "#525252")
				.attr("fill", "white")
				.text(function (d) { return d; });
				
		
		//var text = svg.append("text")
				//.attr("y", height / 2)
				//.attr("dy", ".35em")
				//.text([d3.data(hoodByneighborhood.values(), function (d) { return d.asian2000; })*100]);
		
	dispatch.on("neighborhoodchange1.bar8a2010", function(d) {
		rect.transition()
			
			.attr("x", x(d.propertyc2010))
			.attr("width", x(0) - x(d.propertyc2010))
			
		title.transition()
			.text( d.propertyc2010 * 100 + "%" + " of population");
	});
 
});  

 
 	////////// Violent Crime % Bars column 1
	dispatch.on("load.bar9a2000", function(hoodByneighborhood) {
				
		var margin = {top: 0, right: 0, bottom: 0, left: 0},
		width = 145 - margin.left - margin.right,
		height = 20 - margin.top - margin.bottom;

		 var x = d3.scale.linear()
			.domain([0, 1.0]) //d3.max(hoodByneighborhood.values(), function(d) { return d.asian2000; })])
				.range([width, 0]);
		 
		var xAxis = d3.svg.axis()
				.scale(x)
				.orient("bottom")
				.tickFormat(d3.format(".2s"));
		
		var svg = d3.select("#bar9a2000").append("svg")
			  .attr("width", width + margin.left + margin.right)
			  .attr("height", height + margin.top + margin.bottom)
			.append("g")
			  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

		 svg.append("g");

		
		
		var rect = svg.append("rect")
			  .attr("x", width)
			  .attr("width", 0)
			  .attr("y", 4)
			  .attr("height", height - 4)
			  .style("fill", "#00b159")
			  .style("opacity", 0.4)
				
		
		var title = rect.append("title")
				.attr("x", x)
				.attr("text-anchor", "middle")
				.attr("font-family", "Raleway, sans-serif")
				.attr("font-size", "10px")
				.attr("font-color", "#d11141")
				.attr("fill", "white")
				.text(function (d) { return d; });
				
		
		//var text = svg.append("text")
				//.attr("y", height / 2)
				//.attr("dy", ".35em")
				//.text([d3.data(hoodByneighborhood.values(), function (d) { return d.asian2000; })*100]);
		
	dispatch.on("neighborhoodchange1.bar9a2000", function(d) {
		rect.transition()
			
			.attr("x", x(d.violentc2000))
			.attr("width", x(0) - x(d.violentc2000))
			
		title.transition()
			.text( d.violentc2000 * 100 + "%" + " of population");
	});
 
});

dispatch.on("load.bar9a2010", function(hoodByneighborhood) {
				
		var margin = {top: -8, right: 0, bottom: -8, left: 0},
		width = 145 - margin.left - margin.right,
		height = 18 - margin.top - margin.bottom;

		 var x = d3.scale.linear()
			.domain([0, 1.0]) //d3.max(hoodByneighborhood.values(), function(d) { return d.asian2000; })])
				.range([width, 0]);
		 
		var xAxis = d3.svg.axis()
				.scale(x)
				.orient("bottom")
				.tickFormat(d3.format(".2s"));
		
		var svg = d3.select(".bar9a2010").append("svg")
			  .attr("width", width + margin.left + margin.right)
			  .attr("height", height + margin.top + margin.bottom)
			.append("g")
			  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

		 svg.append("g");

		
		
		var rect = svg.append("rect")
			  .attr("x", width)
			  .attr("width", 0)
			  .attr("y", 4)
			  .attr("height", height - 4)
			  .style("fill", "#00b159")
			  .style("opacity", 0.8)
			  
		var title = rect.append("title")
				.attr("x", x)
				.attr("text-anchor", "middle")
				.attr("font-family", "Raleway, sans-serif")
				.attr("font-size", "10px")
				.attr("font-color", "#525252")
				.attr("fill", "white")
				.text(function (d) { return d; });
				
		
		//var text = svg.append("text")
				//.attr("y", height / 2)
				//.attr("dy", ".35em")
				//.text([d3.data(hoodByneighborhood.values(), function (d) { return d.asian2000; })*100]);
		
	dispatch.on("neighborhoodchange1.bar9a2010", function(d) {
		rect.transition()
			
			.attr("x", x(d.violentc2010))
			.attr("width", x(0) - x(d.violentc2010))
			
		title.transition()
			.text( d.violentc2010 * 100 + "%" + " of population");
	});
 
});  


////////// Home ownership % Bars column 1
	dispatch.on("load.bar10a2000", function(hoodByneighborhood) {
				
		var margin = {top: 0, right: 0, bottom: 0, left: 0},
		width = 145 - margin.left - margin.right,
		height = 20 - margin.top - margin.bottom;

		 var x = d3.scale.linear()
			.domain([0, 1.0]) //d3.max(hoodByneighborhood.values(), function(d) { return d.asian2000; })])
				.range([width, 0]);
		 
		var xAxis = d3.svg.axis()
				.scale(x)
				.orient("bottom")
				.tickFormat(d3.format(".2s"));
		
		var svg = d3.select("#bar10a2000").append("svg")
			  .attr("width", width + margin.left + margin.right)
			  .attr("height", height + margin.top + margin.bottom)
			.append("g")
			  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

		 svg.append("g");

		
		
		var rect = svg.append("rect")
			  .attr("x", width)
			  .attr("width", 0)
			  .attr("y", 4)
			  .attr("height", height - 4)
			  .style("fill", "#00aedb")
			  .style("opacity", 0.4)
				
		
		var title = rect.append("title")
				.attr("x", x)
				.attr("text-anchor", "middle")
				.attr("font-family", "Raleway, sans-serif")
				.attr("font-size", "10px")
				.attr("font-color", "#d11141")
				.attr("fill", "white")
				.text(function (d) { return d; });
				
		
		//var text = svg.append("text")
				//.attr("y", height / 2)
				//.attr("dy", ".35em")
				//.text([d3.data(hoodByneighborhood.values(), function (d) { return d.asian2000; })*100]);
		
	dispatch.on("neighborhoodchange1.bar10a2000", function(d) {
		rect.transition()
			
			.attr("x", x(d.ownership2000))
			.attr("width", x(0) - x(d.ownership2000))
			
		title.transition()
			.text( d.ownership2000 * 100 + "%" + " of housing");
	});
 
});

dispatch.on("load.bar10a2010", function(hoodByneighborhood) {
				
		var margin = {top: -8, right: 0, bottom: -8, left: 0},
		width = 145 - margin.left - margin.right,
		height = 18 - margin.top - margin.bottom;

		 var x = d3.scale.linear()
			.domain([0, 1.0]) //d3.max(hoodByneighborhood.values(), function(d) { return d.asian2000; })])
				.range([width, 0]);
		 
		var xAxis = d3.svg.axis()
				.scale(x)
				.orient("bottom")
				.tickFormat(d3.format(".2s"));
		
		var svg = d3.select(".bar10a2010").append("svg")
			  .attr("width", width + margin.left + margin.right)
			  .attr("height", height + margin.top + margin.bottom)
			.append("g")
			  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

		 svg.append("g");

		
		
		var rect = svg.append("rect")
			  .attr("x", width)
			  .attr("width", 0)
			  .attr("y", 4)
			  .attr("height", height - 4)
			  .style("fill", "#00aedb")
			  .style("opacity", 0.8)
			  
		var title = rect.append("title")
				.attr("x", x)
				.attr("text-anchor", "middle")
				.attr("font-family", "Raleway, sans-serif")
				.attr("font-size", "10px")
				.attr("font-color", "#525252")
				.attr("fill", "white")
				.text(function (d) { return d; });
				
		
		//var text = svg.append("text")
				//.attr("y", height / 2)
				//.attr("dy", ".35em")
				//.text([d3.data(hoodByneighborhood.values(), function (d) { return d.asian2000; })*100]);
		
	dispatch.on("neighborhoodchange1.bar10a2010", function(d) {
		rect.transition()
			
			.attr("x", x(d.ownership2010))
			.attr("width", x(0) - x(d.ownership2010))
			
		title.transition()
			.text( d.ownership2010 * 100 + "%" + " of housing");
	});
 
}); 


////////// Renting % Bars column 1
	dispatch.on("load.bar11a2000", function(hoodByneighborhood) {
				
		var margin = {top: 0, right: 0, bottom: 0, left: 0},
		width = 145 - margin.left - margin.right,
		height = 20 - margin.top - margin.bottom;

		 var x = d3.scale.linear()
			.domain([0, 1.0]) //d3.max(hoodByneighborhood.values(), function(d) { return d.rent2000; })])
				.range([width, 0]);
		 
		var xAxis = d3.svg.axis()
				.scale(x)
				.orient("bottom")
				.tickFormat(d3.format(".2s"));
		
		var svg = d3.select("#bar11a2000").append("svg")
			  .attr("width", width + margin.left + margin.right)
			  .attr("height", height + margin.top + margin.bottom)
			.append("g")
			  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

		 svg.append("g");

		
		
		var rect = svg.append("rect")
			  .attr("x", width)
			  .attr("width", 0)
			  .attr("y", 4)
			  .attr("height", height - 4)
			  .style("fill", "#00aedb")
			  .style("opacity", 0.4)
				
		
		var title = rect.append("title")
				.attr("x", x)
				.attr("text-anchor", "middle")
				.attr("font-family", "Raleway, sans-serif")
				.attr("font-size", "10px")
				.attr("font-color", "#d11141")
				.attr("fill", "white")
				.text(function (d) { return d; });
				
		
		//var text = svg.append("text")
				//.attr("y", height / 2)
				//.attr("dy", ".35em")
				//.text([d3.data(hoodByneighborhood.values(), function (d) { return d.asian2000; })*100]);
		
	dispatch.on("neighborhoodchange1.bar11a2000", function(d) {
		rect.transition()
			
			.attr("x", x(d.rent2000))
			.attr("width", x(0) - x(d.rent2000))
			
		title.transition()
			.text( d.rent2000 * 100 + "%" + " of housing");
	});
 
});

dispatch.on("load.bar11a2010", function(hoodByneighborhood) {
				
		var margin = {top: -8, right: 0, bottom: -8, left: 0},
		width = 145 - margin.left - margin.right,
		height = 18 - margin.top - margin.bottom;

		 var x = d3.scale.linear()
			.domain([0, 1.0]) //d3.max(hoodByneighborhood.values(), function(d) { return d.rent2000; })])
				.range([width, 0]);
		 
		var xAxis = d3.svg.axis()
				.scale(x)
				.orient("bottom")
				.tickFormat(d3.format(".2s"));
		
		var svg = d3.select(".bar11a2010").append("svg")
			  .attr("width", width + margin.left + margin.right)
			  .attr("height", height + margin.top + margin.bottom)
			.append("g")
			  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

		 svg.append("g");

		
		
		var rect = svg.append("rect")
			  .attr("x", width)
			  .attr("width", 0)
			  .attr("y", 4)
			  .attr("height", height - 4)
			  .style("fill", "#00aedb")
			  .style("opacity", 0.8)
			  
		var title = rect.append("title")
				.attr("x", x)
				.attr("text-anchor", "middle")
				.attr("font-family", "Raleway, sans-serif")
				.attr("font-size", "10px")
				.attr("font-color", "#525252")
				.attr("fill", "white")
				.text(function (d) { return d; });
				
		
		//var text = svg.append("text")
				//.attr("y", height / 2)
				//.attr("dy", ".35em")
				//.text([d3.data(hoodByneighborhood.values(), function (d) { return d.asian2000; })*100]);
		
	dispatch.on("neighborhoodchange1.bar11a2010", function(d) {
		rect.transition()
			
			.attr("x", x(d.rent2010))
			.attr("width", x(0) - x(d.rent2010))
			
		title.transition()
			.text( d.rent2010 * 100 + "%" + " of housing");
	});
 
}); 


	//Column b data////
	//dispatch for bar chart bars grouped by categories
	//Total Population bar based on total population across DC per year
	dispatch.on("load.tpb2000", function(hoodByneighborhood) {
				
		var margin = {top: 0, right: 0, bottom: 0, left: 0},
		width = 145 - margin.left - margin.right,
		height = 20 - margin.top - margin.bottom;

		 var z = d3.scale.linear()
			.domain([0, 47500]) //d3.max(hoodByneighborhood.values(), function(d) { return d.totpop2000; })])
				.range([width, 0]);
		 
		var zAxis = d3.svg.axis()
				.scale(z)
				.orient("bottom")
				.tickFormat(d3.format(".2s"));
		
		var svg = d3.select("#tpb2000").append("svg")
			  .attr("width", width + margin.left + margin.right)
			  .attr("height", height + margin.top + margin.bottom)
			.append("g")
			  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

		 svg.append("g");

		
		
		var rect = svg.append("rect")
			  .attr("z", width)
			  .attr("width", 0)
			  .attr("y", 4)
			  .attr("height", height - 4)
			  .style("fill", "#676767")
			  .style("opacity", 0.4)
			  
			  
		var title = rect.append("title")
				.attr("z", z)
				.attr("text-anchor", "middle")
				.attr("font-family", "Raleway, sans-serif")
				.attr("font-size", "10px")
				.attr("font-color", "#525252")
				.attr("fill", "white")
				.text(function (d) { return d; });
				
		
		//var text = svg.append("text")
				//.attr("y", height / 2)
				//.attr("dy", ".35em")
				//.text([d3.data(hoodByneighborhood.values(), function (d) { return d.asian2000; })*100]);
		
	dispatch.on("neighborhoodchange3.tpb2000", function(d) {
		rect.transition()
			
			.attr("z", z(d.totpop2000))
			.attr("width", z(0) - z(d.totpop2000))
			
		title.transition()
			.text( d.totpop2000 + " total population");
	});
 
});

dispatch.on("load.tpb2010", function(hoodByneighborhood) {
				
		var margin = {top: -8, right: 0, bottom: -8, left: 0},
		width = 145 - margin.left - margin.right,
		height = 18 - margin.top - margin.bottom;

		 var z = d3.scale.linear()
			.domain([0, 47500]) //d3.max(hoodByneighborhood.values(), function(d) { return d.totpop2000; })])
				.range([width, 0]);
		 
		var zAxis = d3.svg.axis()
				.scale(z)
				.orient("bottom")
				.tickFormat(d3.format(".2s"));
		
		var svg = d3.select(".tpb2010").append("svg")
			  .attr("width", width + margin.left + margin.right)
			  .attr("height", height + margin.top + margin.bottom)
			.append("g")
			  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

		 svg.append("g");

		
		
		var rect = svg.append("rect")
			  .attr("z", width)
			  .attr("width", 0)
			  .attr("y", 4)
			  .attr("height", height - 4)
			  .style("fill", "#676767")
			  .style("opacity", 0.8)
			  
		var title = rect.append("title")
				.attr("z", z)
				.attr("text-anchor", "middle")
				.attr("font-family", "Raleway, sans-serif")
				.attr("font-size", "10px")
				.attr("font-color", "#525252")
				.attr("fill", "white")
				.text(function (d) { return d; });
				
		
		//var text = svg.append("text")
				//.attr("y", height / 2)
				//.attr("dy", ".35em")
				//.text([d3.data(hoodByneighborhood.values(), function (d) { return d.asian2000; })*100]);
		
	dispatch.on("neighborhoodchange3.tpb2010", function(d) {
		rect.transition()
			
			.attr("z", z(d.totpop2010))
			.attr("width", z(0) - z(d.totpop2010))
			
		title.transition()
			.text( d.totpop2010 + " total population");
	});
 
});









//Column b data////
	//dispatch for bar chart bars grouped by categories
	//////////Asian % Bars column 1
	dispatch.on("load.bar1b2000", function(hoodByneighborhood) {
				
		var margin = {top: 0, right: 0, bottom: 0, left: 0},
		width = 145 - margin.left - margin.right,
		height = 20 - margin.top - margin.bottom;

		 var z = d3.scale.linear()
			.domain([0, 1.0]) //d3.max(hoodByneighborhood.values(), function(d) { return d.asian2000; })])
			.range([width, 0]);
		 
		 
		var zAxis = d3.svg.axis()
				.scale(z)
				.orient("bottom")
				.tickFormat(d3.format(".2s"));
		
		var svg = d3.select("#bar1b2000").append("svg")
			  .attr("width", width + margin.right + margin.left)
			  .attr("height", height + margin.top + margin.bottom)
			.append("g")
			  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

		 svg.append("g");

		
		
		var rect = svg.append("rect")
			  .attr("z", width)
			  .attr("width", 0)
			  .attr("y", 4)
			  .attr("height", height - 4)
			  .style("fill", "#ffc425")
			  .style("opacity", 0.4)
			  
			  
		var title = rect.append("title")
				.attr("z", z)
				.attr("text-anchor", "middle")
				.attr("font-family", "Raleway, sans-serif")
				.attr("font-size", "10px")
				.attr("font-color", "#525252")
				.attr("fill", "white")
				.text(function (d) { return d; });
				
		
		//var text = svg.append("text")
				//.attr("y", height / 2)
				//.attr("dy", ".35em")
				//.text([d3.data(hoodByneighborhood.values(), function (d) { return d.asian2000; })*100]);
		
	dispatch.on("neighborhoodchange3.bar1b2000", function(d) {
		rect.transition()
			
			.attr("z", z(d.asian2000))
			.attr("width", z(0) - z(d.asian2000))
			
		title.transition()
			.text( d.asian2000 * 100 + "%" + " of population");
	});
 
});

dispatch.on("load.bar1b2010", function(hoodByneighborhood) {
				
		var margin = {top: -8, right: 0, bottom: -8, left: 0},
		width = 145 - margin.left - margin.right,
		height = 18 - margin.top - margin.bottom;

		 var z = d3.scale.linear()
			.domain([0, 1.0]) //d3.max(hoodByneighborhood.values(), function(d) { return d.asian2000; })])
				.range([width, 0]);
		 
		var zAxis = d3.svg.axis()
				.scale(z)
				.orient("bottom")
				.tickFormat(d3.format(".2s"));
		
		var svg = d3.select(".bar1b2010").append("svg")
			  .attr("width", width + margin.right + margin.left)
			  .attr("height", height + margin.top + margin.bottom)
			.append("g")
			  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

		 svg.append("g");

		
		
		var rect = svg.append("rect")
			  .attr("z", width)
			  .attr("width", 0)
			  .attr("y", 4)
			  .attr("height", height - 4)
			  .style("fill", "#ffc425")
			  .style("opacity", 0.8)
			  
		var title = rect.append("title")
				.attr("z", z)
				.attr("text-anchor", "middle")
				.attr("font-family", "Raleway, sans-serif")
				.attr("font-size", "10px")
				.attr("font-color", "#525252")
				.attr("fill", "white")
				.text(function (d) { return d; });
				
		
		//var text = svg.append("text")
				//.attr("y", height / 2)
				//.attr("dy", ".35em")
				//.text([d3.data(hoodByneighborhood.values(), function (d) { return d.asian2000; })*100]);
		
	dispatch.on("neighborhoodchange3.bar1b2010", function(d) {
		rect.transition()
			
			.attr("z", z(d.asian2010))
			.attr("width", z(0) - z(d.asian2010))
			
		title.transition()
			.text( d.asian2010 * 100 + "%" + " of population");
	});
 
});

	//////////Black % Bars column 1
	dispatch.on("load.bar2b2000", function(hoodByneighborhood) {
				
		var margin = {top: 0, right: 0, bottom: 0, left: 0},
		width = 145 - margin.left - margin.right,
		height = 20 - margin.top - margin.bottom;

		 var z = d3.scale.linear()
			.domain([0, 1.0]) //d3.max(hoodByneighborhood.values(), function(d) { return d.asian2000; })])
				.range([width, 0]);
		 
		var zAxis = d3.svg.axis()
				.scale(z)
				.orient("bottom")
				.tickFormat(d3.format(".2s"));
		
		var svg = d3.select("#bar2b2000").append("svg")
			  .attr("width", width + margin.left + margin.right)
			  .attr("height", height + margin.top + margin.bottom)
			.append("g")
			  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

		 svg.append("g");

		
		
		var rect = svg.append("rect")
			  .attr("z", width)
			  .attr("width", 0)
			  .attr("y", 4)
			  .attr("height", height - 4)
			  .style("fill", "#ffc425")
			  .style("opacity", 0.4)
				
		
		var title = rect.append("title")
				.attr("z", z)
				.attr("text-anchor", "middle")
				.attr("font-family", "Raleway, sans-serif")
				.attr("font-size", "10px")
				.attr("font-color", "#525252")
				.attr("fill", "white")
				.text(function (d) { return d; });
				
		
		//var text = svg.append("text")
				//.attr("y", height / 2)
				//.attr("dy", ".35em")
				//.text([d3.data(hoodByneighborhood.values(), function (d) { return d.asian2000; })*100]);
		
	dispatch.on("neighborhoodchange3.bar2b2000", function(d) {
		rect.transition()
			
			.attr("z", z(d.black2000))
			.attr("width", z(0) - z(d.black2000))
			
		title.transition()
			.text( d.black2000 * 100 + "%" + " of population");
	});
 
});

dispatch.on("load.bar2b2010", function(hoodByneighborhood) {
				
		var margin = {top: -8, right: 0, bottom: -8, left: 0},
		width = 145 - margin.left - margin.right,
		height = 18 - margin.top - margin.bottom;

		 var z = d3.scale.linear()
			.domain([0, 1.0]) //d3.max(hoodByneighborhood.values(), function(d) { return d.asian2000; })])
				.range([width, 0]);
		 
		var zAxis = d3.svg.axis()
				.scale(z)
				.orient("bottom")
				.tickFormat(d3.format(".2s"));
		
		var svg = d3.select(".bar2b2010").append("svg")
			  .attr("width", width + margin.left + margin.right)
			  .attr("height", height + margin.top + margin.bottom)
			.append("g")
			  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

		 svg.append("g");

		
		
		var rect = svg.append("rect")
			  .attr("z", width)
			  .attr("width", 0)
			  .attr("y", 4)
			  .attr("height", height - 4)
			  .style("fill", "#ffc425")
			  .style("opacity", 0.8)
			  
		var title = rect.append("title")
				.attr("z", z)
				.attr("text-anchor", "middle")
				.attr("font-family", "Raleway, sans-serif")
				.attr("font-size", "10px")
				.attr("font-color", "#525252")
				.attr("fill", "white")
				.text(function (d) { return d; });
				
		
		//var text = svg.append("text")
				//.attr("y", height / 2)
				//.attr("dy", ".35em")
				//.text([d3.data(hoodByneighborhood.values(), function (d) { return d.asian2000; })*100]);
		
	dispatch.on("neighborhoodchange3.bar2b2010", function(d) {
		rect.transition()
			
			.attr("z", z(d.black2010))
			.attr("width", z(0) - z(d.black2010))
			
		title.transition()
			.text( d.black2010 * 100 + "%" + " of population");
	});
 
});

	//////////Hispanic % Bars column 1
	dispatch.on("load.bar3b2000", function(hoodByneighborhood) {
				
		var margin = {top: 0, right: 0, bottom: 0, left: 0},
		width = 145 - margin.left - margin.right,
		height = 20 - margin.top - margin.bottom;

		 var z = d3.scale.linear()
			.domain([0, 1.0]) //d3.max(hoodByneighborhood.values(), function(d) { return d.asian2000; })])
				.range([width, 0]);
		 
		var zAxis = d3.svg.axis()
				.scale(z)
				.orient("bottom")
				.tickFormat(d3.format(".2s"));
		
		var svg = d3.select("#bar3b2000").append("svg")
			  .attr("width", width + margin.left + margin.right)
			  .attr("height", height + margin.top + margin.bottom)
			.append("g")
			  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

		 svg.append("g");

		
		
		var rect = svg.append("rect")
			  .attr("z", width)
			  .attr("width", 0)
			  .attr("y", 4)
			  .attr("height", height - 4)
			  .style("fill", "#ffc425")
			  .style("opacity", 0.4)
				
		
		var title = rect.append("title")
				.attr("z", z)
				.attr("text-anchor", "middle")
				.attr("font-family", "Raleway, sans-serif")
				.attr("font-size", "10px")
				.attr("font-color", "#525252")
				.attr("fill", "white")
				.text(function (d) { return d; });
				
		
		//var text = svg.append("text")
				//.attr("y", height / 2)
				//.attr("dy", ".35em")
				//.text([d3.data(hoodByneighborhood.values(), function (d) { return d.asian2000; })*100]);
		
	dispatch.on("neighborhoodchange3.bar3b2000", function(d) {
		rect.transition()
			
			.attr("z", z(d.hisp2000))
			.attr("width", z(0) - z(d.hisp2000))
			
		title.transition()
			.text( d.hisp2000 * 100 + "%" + " of population");
	});
 
});

dispatch.on("load.bar3b2010", function(hoodByneighborhood) {
				
		var margin = {top: -8, right: 0, bottom: -8, left: 0},
		width = 145 - margin.left - margin.right,
		height = 18 - margin.top - margin.bottom;

		 var z = d3.scale.linear()
			.domain([0, 1.0]) //d3.max(hoodByneighborhood.values(), function(d) { return d.asian2000; })])
				.range([width, 0]);
		 
		var zAxis = d3.svg.axis()
				.scale(z)
				.orient("bottom")
				.tickFormat(d3.format(".2s"));
		
		var svg = d3.select(".bar3b2010").append("svg")
			  .attr("width", width + margin.left + margin.right)
			  .attr("height", height + margin.top + margin.bottom)
			.append("g")
			  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

		 svg.append("g");

		
		
		var rect = svg.append("rect")
			  .attr("z", width)
			  .attr("width", 0)
			  .attr("y", 4)
			  .attr("height", height - 4)
			  .style("fill", "#ffc425")
			  .style("opacity", 0.8)
			  
		var title = rect.append("title")
				.attr("z", z)
				.attr("text-anchor", "middle")
				.attr("font-family", "Raleway, sans-serif")
				.attr("font-size", "10px")
				.attr("font-color", "#525252")
				.attr("fill", "white")
				.text(function (d) { return d; });
				
		
		//var text = svg.append("text")
				//.attr("y", height / 2)
				//.attr("dy", ".35em")
				//.text([d3.data(hoodByneighborhood.values(), function (d) { return d.asian2000; })*100]);
		
	dispatch.on("neighborhoodchange3.bar3b2010", function(d) {
		rect.transition()
			
			.attr("z", z(d.hisp2010))
			.attr("width", z(0) - z(d.hisp2010))
			
		title.transition()
			.text( d.hisp2010 * 100 + "%" + " of population");
	});
 
});


	//////////White % Bars column 2
	dispatch.on("load.bar4b2000", function(hoodByneighborhood) {
				
		var margin = {top: 0, right: 0, bottom: 0, left: 0},
		width = 145 - margin.left - margin.right,
		height = 20 - margin.top - margin.bottom;

		 var z = d3.scale.linear()
			.domain([0, 1.0]) //d3.max(hoodByneighborhood.values(), function(d) { return d.asian2000; })])
				.range([width, 0]);
		 
		var zAxis = d3.svg.axis()
				.scale(z)
				.orient("bottom")
				.tickFormat(d3.format(".2s"));
		
		var svg = d3.select("#bar4b2000").append("svg")
			  .attr("width", width + margin.left + margin.right)
			  .attr("height", height + margin.top + margin.bottom)
			.append("g")
			  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

		 svg.append("g");

		
		
		var rect = svg.append("rect")
			  .attr("z", width)
			  .attr("width", 0)
			  .attr("y", 4)
			  .attr("height", height - 4)
			  .style("fill", "#ffc425")
			  .style("opacity", 0.4)
				
		
		var title = rect.append("title")
				.attr("z", z)
				.attr("text-anchor", "middle")
				.attr("font-family", "Raleway, sans-serif")
				.attr("font-size", "10px")
				.attr("font-color", "#525252")
				.attr("fill", "white")
				.text(function (d) { return d; });
				
		
		//var text = svg.append("text")
				//.attr("y", height / 2)
				//.attr("dy", ".35em")
				//.text([d3.data(hoodByneighborhood.values(), function (d) { return d.asian2000; })*100]);
		
	dispatch.on("neighborhoodchange3.bar4b2000", function(d) {
		rect.transition()
			
			.attr("z", z(d.white2000))
			.attr("width", z(0) - z(d.white2000))
			
		title.transition()
			.text( d.white2000 * 100 + "%" + " of population");
	});
 
});

dispatch.on("load.bar4b2010", function(hoodByneighborhood) {
				
		var margin = {top: -8, right: 0, bottom: -8, left: 0},
		width = 145 - margin.left - margin.right,
		height = 18 - margin.top - margin.bottom;

		 var z = d3.scale.linear()
			.domain([0, 1.0]) //d3.max(hoodByneighborhood.values(), function(d) { return d.asian2000; })])
				.range([width, 0]);
		 
		var zAxis = d3.svg.axis()
				.scale(z)
				.orient("bottom")
				.tickFormat(d3.format(".2s"));
		
		var svg = d3.select(".bar4b2010").append("svg")
			  .attr("width", width + margin.left + margin.right)
			  .attr("height", height + margin.top + margin.bottom)
			.append("g")
			  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

		 svg.append("g");

		
		
		var rect = svg.append("rect")
			  .attr("z", width)
			  .attr("width", 0)
			  .attr("y", 4)
			  .attr("height", height - 4)
			  .style("fill", "#ffc425")
			  .style("opacity", 0.8)
			  
		var title = rect.append("title")
				.attr("z", z)
				.attr("text-anchor", "middle")
				.attr("font-family", "Raleway, sans-serif")
				.attr("font-size", "10px")
				.attr("font-color", "#525252")
				.attr("fill", "white")
				.text(function (d) { return d; });
				
		
		//var text = svg.append("text")
				//.attr("y", height / 2)
				//.attr("dy", ".35em")
				//.text([d3.data(hoodByneighborhood.values(), function (d) { return d.asian2000; })*100]);
		
	dispatch.on("neighborhoodchange3.bar4b2010", function(d) {
		rect.transition()
			
			.attr("z", z(d.white2010))
			.attr("width", z(0) - z(d.white2010))
			
		title.transition()
			.text( d.white2010 * 100 + "%" + " of population");
	});
 
});  

	//////////Without education % Bars column 1
	dispatch.on("load.bar5b2000", function(hoodByneighborhood) {
				
		var margin = {top: 0, right: 0, bottom: 0, left: 0},
		width = 145 - margin.left - margin.right,
		height = 20 - margin.top - margin.bottom;

		 var z = d3.scale.linear()
			.domain([0, 1.0]) //d3.max(hoodByneighborhood.values(), function(d) { return d.asian2000; })])
				.range([width, 0]);
		 
		var zAxis = d3.svg.axis()
				.scale(z)
				.orient("bottom")
				.tickFormat(d3.format(".2s"));
		
		var svg = d3.select("#bar5b2000").append("svg")
			  .attr("width", width + margin.left + margin.right)
			  .attr("height", height + margin.top + margin.bottom)
			.append("g")
			  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

		 svg.append("g");

		
		
		var rect = svg.append("rect")
			  .attr("z", width)
			  .attr("width", 0)
			  .attr("y", 4)
			  .attr("height", height - 4)
			  .style("fill", "#d11141")
			  .style("opacity", 0.4)
				
		
		var title = rect.append("title")
				.attr("z", z)
				.attr("text-anchor", "middle")
				.attr("font-family", "Raleway, sans-serif")
				.attr("font-size", "10px")
				.attr("font-color", "#d11141")
				.attr("fill", "white")
				.text(function (d) { return d; });
				
		
		//var text = svg.append("text")
				//.attr("y", height / 2)
				//.attr("dy", ".35em")
				//.text([d3.data(hoodByneighborhood.values(), function (d) { return d.asian2000; })*100]);
		
	dispatch.on("neighborhoodchange3.bar5b2000", function(d) {
		rect.transition()
			
			.attr("z", z(d.woeducation2000))
			.attr("width", z(0) - z(d.woeducation2000))
			
		title.transition()
			.text( d.woeducation2000 * 100 + "%" + " of population");
	});
 
});

dispatch.on("load.bar5b2010", function(hoodByneighborhood) {
				
		var margin = {top: -8, right: 0, bottom: -8, left: 0},
		width = 145 - margin.left - margin.right,
		height = 18 - margin.top - margin.bottom;

		 var z = d3.scale.linear()
			.domain([0, 1.0]) //d3.max(hoodByneighborhood.values(), function(d) { return d.asian2000; })])
				.range([width, 0]);
		 
		var zAxis = d3.svg.axis()
				.scale(z)
				.orient("bottom")
				.tickFormat(d3.format(".2s"));
		
		var svg = d3.select(".bar5b2010").append("svg")
			  .attr("width", width + margin.left + margin.right)
			  .attr("height", height + margin.top + margin.bottom)
			.append("g")
			  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

		 svg.append("g");

		
		
		var rect = svg.append("rect")
			  .attr("z", width)
			  .attr("width", 0)
			  .attr("y", 4)
			  .attr("height", height - 4)
			  .style("fill", "#d11141")
			  .style("opacity", 0.8)
			  
		var title = rect.append("title")
				.attr("z", z)
				.attr("text-anchor", "middle")
				.attr("font-family", "Raleway, sans-serif")
				.attr("font-size", "10px")
				.attr("font-color", "#525252")
				.attr("fill", "white")
				.text(function (d) { return d; });
				
		
		//var text = svg.append("text")
				//.attr("y", height / 2)
				//.attr("dy", ".35em")
				//.text([d3.data(hoodByneighborhood.values(), function (d) { return d.asian2000; })*100]);
		
	dispatch.on("neighborhoodchange3.bar5b2010", function(d) {
		rect.transition()
			
			.attr("z", z(d.woeducation2010))
			.attr("width", z(0) - z(d.woeducation2010))
			
		title.transition()
			.text( d.woeducation2010 * 100 + "%" + " of population");
	});
 
}); 

	//////////Poverty % Bars column 1
	dispatch.on("load.bar6b2000", function(hoodByneighborhood) {
				
		var margin = {top: 0, right: 0, bottom: 0, left: 0},
		width = 145 - margin.left - margin.right,
		height = 20 - margin.top - margin.bottom;

		 var z = d3.scale.linear()
			.domain([0, 1.0]) //d3.max(hoodByneighborhood.values(), function(d) { return d.asian2000; })])
			.range([width, 0]);
		 
		var zAxis = d3.svg.axis()
				.scale(z)
				.orient("bottom")
				.tickFormat(d3.format(".2s"));
		
		var svg = d3.select("#bar6b2000").append("svg")
			  .attr("width", width + margin.left + margin.right)
			  .attr("height", height + margin.top + margin.bottom)
			.append("g")
			  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

		 svg.append("g");

		
		
		var rect = svg.append("rect")
			  .attr("z", width)
			  .attr("width", 0)
			  .attr("y", 4)
			  .attr("height", height - 4)
			  .style("fill", "#d11141")
			  .style("opacity", 0.4)
				
		
		var title = rect.append("title")
				.attr("z", z)
				.attr("text-anchor", "middle")
				.attr("font-family", "Raleway, sans-serif")
				.attr("font-size", "10px")
				.attr("font-color", "#d11141")
				.attr("fill", "white")
				.text(function (d) { return d; });
				
		
		//var text = svg.append("text")
				//.attr("y", height / 2)
				//.attr("dy", ".35em")
				//.text([d3.data(hoodByneighborhood.values(), function (d) { return d.asian2000; })*100]);
		
	dispatch.on("neighborhoodchange3.bar6b2000", function(d) {
		rect.transition()
			
			.attr("z", z(d.poverty2000))
			.attr("width", z(0) - z(d.poverty2000))
			
		title.transition()
			.text( d.poverty2000 * 100 + "%" + " of population");
	});
 
});

dispatch.on("load.bar6b2010", function(hoodByneighborhood) {
				
		var margin = {top: -8, right: 0, bottom: -8, left: 0},
		width = 145 - margin.left - margin.right,
		height = 18 - margin.top - margin.bottom;

		 var z = d3.scale.linear()
			.domain([0, 1.0]) //d3.max(hoodByneighborhood.values(), function(d) { return d.asian2000; })])
				.range([width, 0]);
		 
		var zAxis = d3.svg.axis()
				.scale(z)
				.orient("bottom")
				.tickFormat(d3.format(".2s"));
		
		var svg = d3.select(".bar6b2010").append("svg")
			  .attr("width", width + margin.left + margin.right)
			  .attr("height", height + margin.top + margin.bottom)
			.append("g")
			  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

		 svg.append("g");

		
		
		var rect = svg.append("rect")
			  .attr("z", width)
			  .attr("width", 0)
			  .attr("y", 4)
			  .attr("height", height - 4)
			  .style("fill", "#d11141")
			  .style("opacity", 0.8)
			  
		var title = rect.append("title")
				.attr("z", z)
				.attr("text-anchor", "middle")
				.attr("font-family", "Raleway, sans-serif")
				.attr("font-size", "10px")
				.attr("font-color", "#525252")
				.attr("fill", "white")
				.text(function (d) { return d; });
				
		
		//var text = svg.append("text")
				//.attr("y", height / 2)
				//.attr("dy", ".35em")
				//.text([d3.data(hoodByneighborhood.values(), function (d) { return d.asian2000; })*100]);
		
	dispatch.on("neighborhoodchange3.bar6b2010", function(d) {
		rect.transition()
			
			.attr("z", z(d.poverty2010))
			.attr("width", z(0) - z(d.poverty2010))
			
		title.transition()
			.text( d.poverty2010 * 100 + "%" + " of population");
	});
 
}); 

	//////////Unemployment % Bars column 1
	dispatch.on("load.bar7b2000", function(hoodByneighborhood) {
				
		var margin = {top: 0, right: 0, bottom: 0, left: 0},
		width = 145 - margin.left - margin.right,
		height = 20 - margin.top - margin.bottom;

		 var z = d3.scale.linear()
			.domain([0, 1.0]) //d3.max(hoodByneighborhood.values(), function(d) { return d.asian2000; })])
				.range([width, 0]);
		 
		var zAxis = d3.svg.axis()
				.scale(z)
				.orient("bottom")
				.tickFormat(d3.format(".2s"));
		
		var svg = d3.select("#bar7b2000").append("svg")
			  .attr("width", width + margin.left + margin.right)
			  .attr("height", height + margin.top + margin.bottom)
			.append("g")
			  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

		 svg.append("g");

		
		
		var rect = svg.append("rect")
			  .attr("z", width)
			  .attr("width", 0)
			  .attr("y", 4)
			  .attr("height", height - 4)
			  .style("fill", "#d11141")
			  .style("opacity", 0.4)
				
		
		var title = rect.append("title")
				.attr("z", z)
				.attr("text-anchor", "middle")
				.attr("font-family", "Raleway, sans-serif")
				.attr("font-size", "10px")
				.attr("font-color", "#d11141")
				.attr("fill", "white")
				.text(function (d) { return d; });
				
		
		//var text = svg.append("text")
				//.attr("y", height / 2)
				//.attr("dy", ".35em")
				//.text([d3.data(hoodByneighborhood.values(), function (d) { return d.asian2000; })*100]);
		
	dispatch.on("neighborhoodchange3.bar7b2000", function(d) {
		rect.transition()
			
			.attr("z", z(d.unemploy2000))
			.attr("width", z(0) - z(d.unemploy2000))
			
		title.transition()
			.text( d.unemploy2000 * 100 + "%" + " of population");
	});
 
});

dispatch.on("load.bar7b2010", function(hoodByneighborhood) {
				
		var margin = {top: -8, right: 0, bottom: -8, left: 0},
		width = 145 - margin.left - margin.right,
		height = 18 - margin.top - margin.bottom;

		 var z = d3.scale.linear()
			.domain([0, 1.0]) //d3.max(hoodByneighborhood.values(), function(d) { return d.asian2000; })])
				.range([width, 0]);
		 
		var zAxis = d3.svg.axis()
				.scale(z)
				.orient("bottom")
				.tickFormat(d3.format(".2s"));
		
		var svg = d3.select(".bar7b2010").append("svg")
			  .attr("width", width + margin.left + margin.right)
			  .attr("height", height + margin.top + margin.bottom)
			.append("g")
			  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

		 svg.append("g");

		
		
		var rect = svg.append("rect")
			  .attr("z", width)
			  .attr("width", 0)
			  .attr("y", 4)
			  .attr("height", height - 4)
			  .style("fill", "#d11141")
			  .style("opacity", 0.8)
			  
		var title = rect.append("title")
				.attr("z", z)
				.attr("text-anchor", "middle")
				.attr("font-family", "Raleway, sans-serif")
				.attr("font-size", "10px")
				.attr("font-color", "#525252")
				.attr("fill", "white")
				.text(function (d) { return d; });
				
		
		//var text = svg.append("text")
				//.attr("y", height / 2)
				//.attr("dy", ".35em")
				//.text([d3.data(hoodByneighborhood.values(), function (d) { return d.asian2000; })*100]);
		
	dispatch.on("neighborhoodchange3.bar7b2010", function(d) {
		rect.transition()
			
			.attr("z", z(d.unemploy2010))
			.attr("width", z(0) - z(d.unemploy2010))
			
		title.transition()
			.text( d.unemploy2010 * 100 + "%" + " of population");
	});
 
}); 
  
  
 	////////// Property Crime % Bars column 1
	dispatch.on("load.bar8b2000", function(hoodByneighborhood) {
				
		var margin = {top: 0, right: 0, bottom: 0, left: 0},
		width = 145 - margin.left - margin.right,
		height = 20 - margin.top - margin.bottom;

		 var z = d3.scale.linear()
			.domain([0, 1.0]) //d3.max(hoodByneighborhood.values(), function(d) { return d.asian2000; })])
				.range([width, 0]);
		 
		var zAxis = d3.svg.axis()
				.scale(z)
				.orient("bottom")
				.tickFormat(d3.format(".2s"));
		
		var svg = d3.select("#bar8b2000").append("svg")
			  .attr("width", width + margin.left + margin.right)
			  .attr("height", height + margin.top + margin.bottom)
			.append("g")
			  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

		 svg.append("g");

		
		
		var rect = svg.append("rect")
			  .attr("z", width)
			  .attr("width", 0)
			  .attr("y", 4)
			  .attr("height", height - 4)
			  .style("fill", "#00b159")
			  .style("opacity", 0.4)
				
		
		var title = rect.append("title")
				.attr("z", z)
				.attr("text-anchor", "middle")
				.attr("font-family", "Raleway, sans-serif")
				.attr("font-size", "10px")
				.attr("font-color", "#d11141")
				.attr("fill", "white")
				.text(function (d) { return d; });
				
		
		//var text = svg.append("text")
				//.attr("y", height / 2)
				//.attr("dy", ".35em")
				//.text([d3.data(hoodByneighborhood.values(), function (d) { return d.asian2000; })*100]);
		
	dispatch.on("neighborhoodchange3.bar8b2000", function(d) {
		rect.transition()
			
			.attr("z", z(d.propertyc2000))
			.attr("width", z(0) - z(d.propertyc2000))
			
		title.transition()
			.text( d.propertyc2000 * 100 + "%" + " of population");
	});
 
});

dispatch.on("load.bar8b2010", function(hoodByneighborhood) {
				
		var margin = {top: -8, right: 0, bottom: -8, left: 0},
		width = 145 - margin.left - margin.right,
		height = 18 - margin.top - margin.bottom;

		 var z = d3.scale.linear()
			.domain([0, 1.0]) //d3.max(hoodByneighborhood.values(), function(d) { return d.asian2000; })])
				.range([width, 0]);
		 
		var zAxis = d3.svg.axis()
				.scale(z)
				.orient("bottom")
				.tickFormat(d3.format(".2s"));
		
		var svg = d3.select(".bar8b2010").append("svg")
			  .attr("width", width + margin.left + margin.right)
			  .attr("height", height + margin.top + margin.bottom)
			.append("g")
			  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

		 svg.append("g");

		
		
		var rect = svg.append("rect")
			  .attr("z", width)
			  .attr("width", 0)
			  .attr("y", 4)
			  .attr("height", height - 4)
			  .style("fill", "#00b159")
			  .style("opacity", 0.8)
			  
		var title = rect.append("title")
				.attr("z", z)
				.attr("text-anchor", "middle")
				.attr("font-family", "Raleway, sans-serif")
				.attr("font-size", "10px")
				.attr("font-color", "#525252")
				.attr("fill", "white")
				.text(function (d) { return d; });
				
		
		//var text = svg.append("text")
				//.attr("y", height / 2)
				//.attr("dy", ".35em")
				//.text([d3.data(hoodByneighborhood.values(), function (d) { return d.asian2000; })*100]);
		
	dispatch.on("neighborhoodchange3.bar8b2010", function(d) {
		rect.transition()
			
			.attr("z", z(d.propertyc2010))
			.attr("width", z(0) - z(d.propertyc2010))
			
		title.transition()
			.text( d.propertyc2010 * 100 + "%" + " of population");
	});
 
});  

 
 	////////// Violent Crime % Bars column 1
	dispatch.on("load.bar9b2000", function(hoodByneighborhood) {
				
		var margin = {top: 0, right: 0, bottom: 0, left: 0},
		width = 145 - margin.left - margin.right,
		height = 20 - margin.top - margin.bottom;

		 var z = d3.scale.linear()
			.domain([0, 1.0]) //d3.max(hoodByneighborhood.values(), function(d) { return d.asian2000; })])
				.range([width, 0]);
		 
		var zAxis = d3.svg.axis()
				.scale(z)
				.orient("bottom")
				.tickFormat(d3.format(".2s"));
		
		var svg = d3.select("#bar9b2000").append("svg")
			  .attr("width", width + margin.left + margin.right)
			  .attr("height", height + margin.top + margin.bottom)
			.append("g")
			  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

		 svg.append("g");

		
		
		var rect = svg.append("rect")
			  .attr("z", width)
			  .attr("width", 0)
			  .attr("y", 4)
			  .attr("height", height - 4)
			  .style("fill", "#00b159")
			  .style("opacity", 0.4)
				
		
		var title = rect.append("title")
				.attr("z", z)
				.attr("text-anchor", "middle")
				.attr("font-family", "Raleway, sans-serif")
				.attr("font-size", "10px")
				.attr("font-color", "#d11141")
				.attr("fill", "white")
				.text(function (d) { return d; });
				
		
		//var text = svg.append("text")
				//.attr("y", height / 2)
				//.attr("dy", ".35em")
				//.text([d3.data(hoodByneighborhood.values(), function (d) { return d.asian2000; })*100]);
		
	dispatch.on("neighborhoodchange3.bar9b2000", function(d) {
		rect.transition()
			
			.attr("z", z(d.violentc2000))
			.attr("width", z(0) - z(d.violentc2000))
			
		title.transition()
			.text( d.violentc2000 * 100 + "%" + " of population");
	});
 
});

dispatch.on("load.bar9b2010", function(hoodByneighborhood) {
				
		var margin = {top: -8, right: 0, bottom: -8, left: 0},
		width = 145 - margin.left - margin.right,
		height = 18 - margin.top - margin.bottom;

		 var z = d3.scale.linear()
			.domain([0, 1.0]) //d3.max(hoodByneighborhood.values(), function(d) { return d.asian2000; })])
				.range([width, 0]);
		 
		var zAxis = d3.svg.axis()
				.scale(z)
				.orient("bottom")
				.tickFormat(d3.format(".2s"));
		
		var svg = d3.select(".bar9b2010").append("svg")
			  .attr("width", width + margin.left + margin.right)
			  .attr("height", height + margin.top + margin.bottom)
			.append("g")
			  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

		 svg.append("g");

		
		
		var rect = svg.append("rect")
			  .attr("z", width)
			  .attr("width", 0)
			  .attr("y", 4)
			  .attr("height", height - 4)
			  .style("fill", "#00b159")
			  .style("opacity", 0.8)
			  
		var title = rect.append("title")
				.attr("z", z)
				.attr("text-anchor", "middle")
				.attr("font-family", "Raleway, sans-serif")
				.attr("font-size", "10px")
				.attr("font-color", "#525252")
				.attr("fill", "white")
				.text(function (d) { return d; });
				
		
		//var text = svg.append("text")
				//.attr("y", height / 2)
				//.attr("dy", ".35em")
				//.text([d3.data(hoodByneighborhood.values(), function (d) { return d.asian2000; })*100]);
		
	dispatch.on("neighborhoodchange3.bar9b2010", function(d) {
		rect.transition()
			
			.attr("z", z(d.violentc2010))
			.attr("width", z(0) - z(d.violentc2010))
			
		title.transition()
			.text( d.violentc2010 * 100 + "%" + " of population");
	});
 
});  


////////// Home ownership % Bars column 1
	dispatch.on("load.bar10b2000", function(hoodByneighborhood) {
				
		var margin = {top: 0, right: 0, bottom: 0, left: 0},
		width = 145 - margin.left - margin.right,
		height = 20 - margin.top - margin.bottom;

		 var z = d3.scale.linear()
			.domain([0, 1.0]) //d3.max(hoodByneighborhood.values(), function(d) { return d.asian2000; })])
				.range([width, 0]);
		 
		var zAxis = d3.svg.axis()
				.scale(z)
				.orient("bottom")
				.tickFormat(d3.format(".2s"));
		
		var svg = d3.select("#bar10b2000").append("svg")
			  .attr("width", width + margin.left + margin.right)
			  .attr("height", height + margin.top + margin.bottom)
			.append("g")
			  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

		 svg.append("g");

		
		
		var rect = svg.append("rect")
			  .attr("z", width)
			  .attr("width", 0)
			  .attr("y", 4)
			  .attr("height", height - 4)
			  .style("fill", "#00aedb")
			  .style("opacity", 0.4)
				
		
		var title = rect.append("title")
				.attr("z", z)
				.attr("text-anchor", "middle")
				.attr("font-family", "Raleway, sans-serif")
				.attr("font-size", "10px")
				.attr("font-color", "#d11141")
				.attr("fill", "white")
				.text(function (d) { return d; });
				
		
		//var text = svg.append("text")
				//.attr("y", height / 2)
				//.attr("dy", ".35em")
				//.text([d3.data(hoodByneighborhood.values(), function (d) { return d.asian2000; })*100]);
		
	dispatch.on("neighborhoodchange3.bar10b2000", function(d) {
		rect.transition()
			
			.attr("z", z(d.ownership2000))
			.attr("width", z(0) - z(d.ownership2000))
			
		title.transition()
			.text( d.ownership2000 * 100 + "%" + " of housing");
	});
 
});

dispatch.on("load.bar10b2010", function(hoodByneighborhood) {
				
		var margin = {top: -8, right: 0, bottom: -8, left: 0},
		width = 145 - margin.left - margin.right,
		height = 18 - margin.top - margin.bottom;

		 var z = d3.scale.linear()
			.domain([0, 1.0]) //d3.max(hoodByneighborhood.values(), function(d) { return d.asian2000; })])
				.range([width, 0]);
		 
		var zAxis = d3.svg.axis()
				.scale(z)
				.orient("bottom")
				.tickFormat(d3.format(".2s"));
		
		var svg = d3.select(".bar10b2010").append("svg")
			  .attr("width", width + margin.left + margin.right)
			  .attr("height", height + margin.top + margin.bottom)
			.append("g")
			  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

		 svg.append("g");

		
		
		var rect = svg.append("rect")
			  .attr("z", width)
			  .attr("width", 0)
			  .attr("y", 4)
			  .attr("height", height - 4)
			  .style("fill", "#00aedb")
			  .style("opacity", 0.8)
			  
		var title = rect.append("title")
				.attr("z", z)
				.attr("text-anchor", "middle")
				.attr("font-family", "Raleway, sans-serif")
				.attr("font-size", "10px")
				.attr("font-color", "#525252")
				.attr("fill", "white")
				.text(function (d) { return d; });
				
		
		//var text = svg.append("text")
				//.attr("y", height / 2)
				//.attr("dy", ".35em")
				//.text([d3.data(hoodByneighborhood.values(), function (d) { return d.asian2000; })*100]);
		
	dispatch.on("neighborhoodchange3.bar10b2010", function(d) {
		rect.transition()
			
			.attr("z", z(d.ownership2010))
			.attr("width", z(0) - z(d.ownership2010))
			
		title.transition()
			.text( d.ownership2010 * 100 + "%" + " of housing");
	});
 
}); 


////////// Home ownership % Bars column 1
	dispatch.on("load.bar11b2000", function(hoodByneighborhood) {
				
		var margin = {top: 0, right: 0, bottom: 0, left: 0},
		width = 145 - margin.left - margin.right,
		height = 20 - margin.top - margin.bottom;

		 var z = d3.scale.linear()
			.domain([0, 1.0]) //d3.max(hoodByneighborhood.values(), function(d) { return d.asian2000; })])
				.range([width, 0]);
		 
		var zAxis = d3.svg.axis()
				.scale(z)
				.orient("bottom")
				.tickFormat(d3.format(".2s"));
		
		var svg = d3.select("#bar11b2000").append("svg")
			  .attr("width", width + margin.left + margin.right)
			  .attr("height", height + margin.top + margin.bottom)
			.append("g")
			  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

		 svg.append("g");

		
		
		var rect = svg.append("rect")
			  .attr("z", width)
			  .attr("width", 0)
			  .attr("y", 4)
			  .attr("height", height - 4)
			  .style("fill", "#00aedb")
			  .style("opacity", 0.4)
				
		
		var title = rect.append("title")
				.attr("z", z)
				.attr("text-anchor", "middle")
				.attr("font-family", "Raleway, sans-serif")
				.attr("font-size", "10px")
				.attr("font-color", "#d11141")
				.attr("fill", "white")
				.text(function (d) { return d; });
				
		
		//var text = svg.append("text")
				//.attr("y", height / 2)
				//.attr("dy", ".35em")
				//.text([d3.data(hoodByneighborhood.values(), function (d) { return d.asian2000; })*100]);
		
	dispatch.on("neighborhoodchange3.bar11b2000", function(d) {
		rect.transition()
			
			.attr("z", z(d.rent2000))
			.attr("width", z(0) - z(d.rent2000))
			
		title.transition()
			.text( d.rent2000 * 100 + "%" + " of housing");
	});
 
});

dispatch.on("load.bar11b2010", function(hoodByneighborhood) {
				
		var margin = {top: -8, right: 0, bottom: -8, left: 0},
		width = 145 - margin.left - margin.right,
		height = 18 - margin.top - margin.bottom;

		 var z = d3.scale.linear()
			.domain([0, 1.0]) //d3.max(hoodByneighborhood.values(), function(d) { return d.asian2000; })])
				.range([width, 0]);
		 
		var zAxis = d3.svg.axis()
				.scale(z)
				.orient("bottom")
				.tickFormat(d3.format(".2s"));
		
		var svg = d3.select(".bar11b2010").append("svg")
			  .attr("width", width + margin.left + margin.right)
			  .attr("height", height + margin.top + margin.bottom)
			.append("g")
			  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

		 svg.append("g");

		
		
		var rect = svg.append("rect")
			  .attr("z", width)
			  .attr("width", 0)
			  .attr("y", 4)
			  .attr("height", height - 4)
			  .style("fill", "#00aedb")
			  .style("opacity", 0.8)
			  
		var title = rect.append("title")
				.attr("z", z)
				.attr("text-anchor", "middle")
				.attr("font-family", "Raleway, sans-serif")
				.attr("font-size", "10px")
				.attr("font-color", "#525252")
				.attr("fill", "white")
				.text(function (d) { return d; });
				
		
		//var text = svg.append("text")
				//.attr("y", height / 2)
				//.attr("dy", ".35em")
				//.text([d3.data(hoodByneighborhood.values(), function (d) { return d.asian2000; })*100]);
		
	dispatch.on("neighborhoodchange3.bar11b2010", function(d) {
		rect.transition()
			
			.attr("z", z(d.rent2010))
			.attr("width", z(0) - z(d.rent2010))
			
		title.transition()
			.text( d.rent2010 * 100 + "%" + " of housing");
	});
 
}); 



 function type(d) {
		
		d.totpop2000 = +d.TotPop2000;
		d.totpop2010 = +d.TotPop2010;
		d.black2000 = +d.black2000;
		d.black2010 = +d.black2010;
		d.white2000 = +d.white2000;
		d.white2010 = +d.white2010;
		d.hisp2000 = +d.hisp2000;
		d.hisp2010 = +d.hisp2010;
		d.asian2000 = +d.asian2000;
		d.asian2010 = +d.asian2010;
		d.unemploy2000 = +d.unemploy2000;
		d.unemploy2010 = +d.unemploy2010;
		d.ownership2000 = +d.ownership2000;
		d.ownership2010 = +d.ownership2010;
		d.rent2000 = +d.rent2000;
		d.rent2010 = +d.rent200711;
		d.poverty2000 = +d.poverty2000;
		d.poverty2010 = +d.poverty2010;
		d.violentc2000 = +d.violentc2000;
		d.violentc2010 = +d.violentc2010;
		d.propertyc2000 = +d.propertyc2000;
		d.propertyc2010 = +d.propertyc2010;
		d.woeducation2000 = +d.woeducation2000;
		d.woeducation2010 = +d.woeducation200711; 
		return d;		
	}  
		