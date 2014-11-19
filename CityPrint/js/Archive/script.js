<!DOCTYPE html>
<meta charset="utf-8">
<style>

.axis text {
  font: 10px sans-serif;
}

.axis path,
.axis line {
  fill: none;
  stroke: #000;
  shape-rendering: crispEdges;
}

.hexagon {
  fill: none;
  stroke: #000;
  stroke-width: .5px;
}

</style>
<body>
<script src="http://d3js.org/d3.v3.min.js"></script>
<script src="http://d3js.org/d3.hexbin.v0.min.js?5c6e4f0"></script>
<script>
var margin = {top: 20, right: 20, bottom: 30, left: 40},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;
	
d3.csv("data/DC_Neighborhoodcircle_subset.csv", function(error, data) {
				data.forEach(function(d) {
	d.totpop2000 = +d.TotPop2000;
    d.black2000 = +d.black2000;
	d.white2000 = +d.white2000;
    d.hisp2000 = +d.hisp2000;
	d.asian2000 = +d.asian2000;
	d.unemploy2000 = +d.unemploy2000;
    d.ownership2000 = +d.ownership2000;
    d.rent2000 = +d.rent2000;
	d.poverty2000 = +d.poverty2000;
	d.violentc2000 = +d.violentc2000;
    d.propertyc2000 = +d.propertyc2000;
    d.woeducation2000 = +d.woeducation2000;
});

var black2000 =  d3.random.normal( width / 