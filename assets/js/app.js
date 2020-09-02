// Define SVG area dimensions
var svgWidth = 900;
var svgHeight = 600;

// Define the chart's margins as an object
var margin = {
  top: 20,
  right: 20,
  bottom: 100,
  left: 100
};

// Define dimensions of the chart area
var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Select body, append SVG area to it, and set the dimensions
var svg = d3
  .select("body")
  .append("svg")
  .attr("height", svgHeight)
  .attr("width", svgWidth);

// Append an SVG group and shift everything over by the margins 
var chartGroup = svg.append("g")
.attr("transform", `translate(${margin.left}, ${margin.top})`);

// Load data from csv file
d3.csv("assets/data/data.csv").then(function(censusData) {
// Print census data
console.log(censusData)

// Format the data
censusData.forEach(function(data) { 
    data.poverty = +data.poverty;
    data.healthcare = +data.healthcare;
    });


// Create scaling functions
var xLinearScale = d3.scaleLinear()
        .domain([0, d3.max(censusData, d => d.poverty)])
        .range([0, width]);

var yLinearScale = d3.scaleLinear()
        .domain([0, d3.max(censusData, d => d.healthcare)])
        .range([height, 0]);

// Create axis functions
var bottomAxis = d3.axisBottom(xLinearScale);
var leftAxis = d3.axisLeft(yLinearScale);

// Append axes to the chart
chartGroup.append("g")
.attr("transform", `translate(0, ${height})`)
.call(bottomAxis);

chartGroup.append("g")
.call(leftAxis);

// Create circles 
var circlesGroup = chartGroup.selectAll("circle")
.data(censusData)
.enter()
.append("circle")
.attr("cx", d => xLinearScale(d.poverty))
.attr("cy", d => yLinearScale(d.healthcare))
.attr("r", "10")
.attr("fill", "lightblue")
.attr("opacity", ".5")
.text(d => d.abbr)

// Create axes labels
chartGroup.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left + 40)
      .attr("x", 0 - (height / 2))
      .attr("dy", "1em")
      .attr("class", "axisText")
      .text("Lacks Healthcare (%)");

chartGroup.append("text")
      .attr("transform", `translate(${width / 2}, ${height + margin.top + 30})`)
      .attr("class", "axisText")
      .text("In Poverty (%)");
  }).catch(function(error) {
    console.log(error);
  });

