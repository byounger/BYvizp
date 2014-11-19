	var w = 310,
		h = 300;
	
	var svg = d3.select("#area10")
				.append("svg")
				.attr("width", w)
				.attr("height", h)
				.attr("id", "circle"),
					g33 = svg.append("g"),
					g34 = svg.append("g"),
					g35 = svg.append("g"),
					g36 = svg.append("g");
						
		d3.csv("data/DC_Neighborhoodcircle_8.csv", function(error, data) {
				data.forEach(function(d) {
				d.pctblack1990 = +d.PctBlack1990;
				d.pctwhite1990 = +d.PctWhite1990;
				d.pcthisp1990 = +d.PctHisp1990;
				d.pctasian1990 = +d.PctAsian1990;
				d.pctblack2000 = +d.PctBlack2000;
				d.pctwhite2000 = +d.PctWhite2000;
				d.pcthisp2000 = +d.PctHisp2000;
				d.pctasian2000 = +d.PctAsian2000;
				d.pctblack2010 = +d.PctBlack2010;
				d.pctwhite2010 = +d.PctWhite2010;
				d.pcthisp2010 = +d.PctHisp2010;
				d.pctasian2010 = +d.PctAsian2010;
				});
				
	
		

//add cluster aka individual circles as a grouped svg object
		
					
		var black = g33.selectAll("circle")
			.data(data)
			.enter().append("circle")
		
		black
			.style("fill", "#f28f00")
			.style("fill-opacity", ".5")
			.attr("cx", 125)
			.attr("cy", 150)
			.attr("r", (function(d) { return(d.pctblack1990)*100; }))
			.append("title")
			.text(function(d) { return "Black population:" + ((d.pctblack1990)*100) +"%"; });
		
		
		var white = g34.selectAll("circle")
			.data(data)
			.enter().append("circle")
		
		white
			.style("fill", "#d21e2d")
			.style("fill-opacity", ".5")
			.attr("cx", 150)
			.attr("cy", 125)
			.attr("r", (function(d) { return(d.pctwhite1990)*100; }))
			.append("title")
			.text(function(d) { return "White population:" + ((d.pctwhite1990)*100) +"%"; });
						
		
		var hisp = g35.selectAll("circle")
			.data(data)
			.enter().append("circle")
		
		hisp
			.style("fill", "green")
			.style("fill-opacity", ".5")
			.attr("cx", 150)
			.attr("cy", 150)
			.attr("r", (function(d) { return(d.pcthisp1990)*100; }))
			.append("title")
			.text(function(d) { return "Hispanic population:" + ((d.pcthisp1990)*100) +"%"; });
		
			
		var asian = g36.selectAll("circle")
			.data(data)
			.enter().append("circle")
		
		asian
			.style("fill", "#691ed2")
			.style("fill-opacity", ".5")
			.attr("cx", 125)
			.attr("cy", 125)
			.attr("r", (function(d) { return(d.pctasian1990)*100; }))
			.append("title")
			.text(function(d) { return "Asian population:" + ((d.pctasian1990)*100) +"%"; });
			

//Transition button 2000
var button082000 = d3.select("#button082000");
		
	button082000.on("click", function(d) {
	
	black
		.attr("r", (function(d) { return(d.pctblack1990)*100; }))
		.transition()
		.duration(300)
		.ease("quad")
			.attr("r", (function(d) { return(d.pctblack2000)*100; }))
		
	black
		.append("title")
		.text(function(d) { return "Black population:" + ((d.pctblack1990)*100) +"%"; })
		.transition()
		.duration(300)
		.ease("quad")
			.text(function(d) { return "Black population:" + ((d.pctblack2000)*100) +"%"; });		
		
	white
		.attr("r", (function(d) { return(d.pctwhite1990)*100; }))
		.transition()
		.duration(300)
		.ease("quad")
			.attr("r", (function(d) { return(d.pctwhite2000)*100; }))
			
	white
		.append("title")
		.text(function(d) { return "Black population:" + ((d.pctblack1990)*100) +"%"; })
		.transition()
		.duration(300)
		.ease("quad")
			.text(function(d) { return "White population:" + ((d.pctwhite2000)*100) +"%"; });	
		
	hisp
		.attr("r", (function(d) { return(d.pcthisp1990)*100; }))
		.transition()
		.duration(300)
		.ease("quad")
			.attr("r", (function(d) { return(d.pcthisp2000)*100; }))
	
	hisp
		.append("title")
		.text(function(d) { return "Hispanic population:" + ((d.pcthisp1990)*100) +"%"; })
		.transition()
		.duration(300)
		.ease("quad")
			.text(function(d) { return "Hispanic population:" + ((d.pcthisp2000)*100) +"%"; });
	
	asian
		.attr("r", (function(d) { return(d.pctasian1990)*100; }))
		.transition()
		.duration(300)
		.ease("quad")
			.attr("r", (function(d) { return(d.pctasian2000)*100; }))
			
	asian		
		.append("title")
		.text(function(d) { return "Asian population:" + ((d.pctasian1990)*100) +"%"; })
		.transition()
		.duration(300)
		.ease("quad")
			.text(function(d) { return "Asian population:" + ((d.pctasian2000)*100) +"%"; });
	});			
				
//Transition button 2010

	var button082010 = d3.select("#button082010");
		
	button082010.on("click", function(d) {
	
	black
		.attr("r", (function(d) { return(d.pctblack1990)*100; }))
		.transition()
		.duration(300)
		.ease("quad")
			.attr("r", (function(d) { return(d.pctblack2010)*100; }))
			
	black
		.append("title")
		.text(function(d) { return "Black population:" + ((d.pctblack1990)*100) +"%"; })		
		.transition()
		.duration(300)
		.ease("quad")
			.text(function(d) { return "Black population:" + ((d.pctblack2010)*100) +"%"; });
		
	white
		.attr("r", (function(d) { return(d.pctwhite1990)*100; }))
		.transition()
		.duration(300)
		.ease("quad")
			.attr("r", (function(d) { return(d.pctwhite2010)*100; }))
			
	white
		.append("title")
		.text(function(d) { return "White population:" + ((d.pctwhite1990)*100) +"%"; })
		.transition()
		.duration(300)
		.ease("quad")
			.text(function(d) { return "White population:" + ((d.pctwhite2010)*100) +"%"; });

			
	hisp
		.attr("r", (function(d) { return(d.pcthisp1990)*100; }))
		.transition()
		.duration(300)
		.ease("quad")
			.attr("r", (function(d) { return(d.pcthisp2010)*100; }))

	hisp
		.append("title")
		.text(function(d) { return "Hispanic population:" + ((d.pcthisp1990)*100) +"%"; })
		.transition()
		.duration(300)
		.ease("quad")
			.text(function(d) { return "Hispanic population:" + ((d.pcthisp2010)*100) +"%"; });
	
	asian
		.attr("r", (function(d) { return(d.pctasian1990)*100; }))
		.transition()
		.duration(300)
		.ease("quad")
			.attr("r", (function(d) { return(d.pctasian2010)*100; }))
	
	asian
		.append("title")
		.text(function(d) { return "Asian population:" + ((d.pctasian1990)*100) +"%"; })
		.transition()
		.duration(300)
		.ease("quad")
		.text(function(d) { return "Asian population:" + ((d.pctasian2010)*100) +"%"; });

	});


//Transition 1990 button	
	var button081990 = d3.select("#button081990");
	
	button081990.on("click", function(d) {
	
	black
		.attr("r", (function(d) { return(d.pctblack1990)*100; }))
		.append("title")
		.text(function(d) { return "Black population:" + ((d.pctblack1990)*100) +"%"; });		
	
	
	white
		.attr("r", (function(d) { return(d.pctwhite1990)*100; }))
		.append("title")
		.text(function(d) { return "White population:" + ((d.pctwhite1990)*100) +"%"; });
	
	
	hisp
		.attr("r", (function(d) { return(d.pcthisp1990)*100; }))
		.append("title")
		.text(function(d) { return "Hispanic population:" + ((d.pcthisp1990)*100) +"%"; });

	
	asian
		.attr("r", (function(d) { return(d.pctasian1990)*100; }))
		.append("title")
		.text(function(d) { return "Asian population:" + ((d.pctasian1990)*100) +"%"; });
		
	});	
});	