// ------------------------------------------------------------------------
//  1. SECTION FOR THE CORE ASSIGNMENT BEGIN
// -------------------------------------------------------------------------
// // Define SVG area dimensions
// var svgWidth = 900;
// var svgHeight = 600;

// // Define the chart's margins as an object
// var margin = {
//   top: 20,
//   right: 50,
//   bottom: 100,
//   left: 100
// };

// // Define dimensions of the chart area
// var width = svgWidth - margin.left - margin.right;
// var height = svgHeight - margin.top - margin.bottom;

// // Select body, append SVG area to it, and set the dimensions
// var svg = d3
//   .select("body")
//   .append("svg")
//   .attr("height", svgHeight)
//   .attr("width", svgWidth);

// // Append an SVG group and shift everything over by the margins 
// var chartGroup = svg.append("g")
// .attr("transform", `translate(${margin.left}, ${margin.top})`);

// // Load data from csv file
// d3.csv("assets/data/data.csv").then(function(censusData) {
// // Print census data
// console.log(censusData)

// // Format the data
// censusData.forEach(function(data) { 
//     data.poverty = +data.poverty;
//     data.healthcare = +data.healthcare;
//     });


// // Create scaling functions
// var xLinearScale = d3.scaleLinear()
//         .domain([8.1, d3.max(censusData, d => d.poverty)])
//         .range([0, width]);

// var yLinearScale = d3.scaleLinear()
//         .domain([4.1, d3.max(censusData, d => d.healthcare)])
//         .range([height, 0]);

// // Create axis functions
// var bottomAxis = d3.axisBottom(xLinearScale);
// var leftAxis = d3.axisLeft(yLinearScale);

// // Append axes to the chart
// chartGroup.append("g")
// .attr("transform", `translate(0, ${height})`)
// .call(bottomAxis);

// chartGroup.append("g")
// .call(leftAxis);

// // Create circles 
// var circlesGroup = chartGroup.selectAll("circle")
// .data(censusData)
// .enter()
// .append("circle")
// .attr("cx", d => xLinearScale(d.poverty))
// .attr("cy", d => yLinearScale(d.healthcare))
// .attr("r", "10")
// .attr("fill", "lightblue")
// .attr("opacity", ".75")

// // Create circle labels
// chartGroup.append("g")
//       .selectAll("circle")
//       .data(censusData)
//       .enter()
//       .append("text")
//       .text(d => d.abbr)
//       .attr("x", d => xLinearScale(d.poverty))
//       .attr("y", d => yLinearScale(d.healthcare))
//       .attr("text-anchor", "middle")
//       .attr("font-size", "10px")
//       .attr("fill", "white")
//       .style("font-weight", "bold")
//       .attr("alignment-baseline", "central");

// // Create axes labels
// chartGroup.append("text")
//       .attr("transform", "rotate(-90)")
//       .attr("y", 0 - margin.left + 40)
//       .attr("x", 0 - (height / 2))
//       .attr("dy", "1em")
//       .attr("class", "axisText")
//       .text("Lacks Healthcare (%)");

// chartGroup.append("text")
//       .attr("transform", `translate(${width / 2}, ${height + margin.top + 30})`)
//       .attr("class", "axisText")
//       .text("In Poverty (%)");
//   }).catch(function(error) {
//     console.log(error);
//   });

// ------------------------------------------------------------------------
//  1. SECTION FOR THE CORE ASSIGNMENT END
// -------------------------------------------------------------------------

// BONUS SECTION 
// Define SVG area dimensions
var svgWidth = 900;
var svgHeight = 600;

// Define the chart's margins as an object
var margin = {
  top: 20,
  right: 50,
  bottom: 100,
  left: 100
};

// Define dimensions of the chart area
var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Select body, append SVG area to it, and set the dimensions
var svg = d3.select("body")
  .append("svg")
  .attr("height", svgHeight)
  .attr("width", svgWidth);

// Append an SVG group and shift everything over by the margins 
var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Initial Params
var chosenXAxis = "poverty";
var chosenYAxis = "healthcare";

// Function used for updating x-scale var upon click on axis label
function xScale(censusData, chosenXAxis) {
  // Create scales
  var xLinearScale = d3.scaleLinear()
    .domain([d3.min(censusData, d => d[chosenXAxis]*0.8),
    d3.max(censusData, d => d[chosenXAxis]*1.2)
  ])
  .range([0, width]);

  return xLinearScale;
  }

// Function used for updating y-scale var upon clicking on axis label
function yScale(censusData, chosenYAxis) {
  // Create scales
  var yLinearScale = d3.scaleLinear()
    .domain([d3.min(censusData, d=>d[chosenYAxis])*0.8, 
    d3.max(censusData, d=>d[chosenYAxis])*1.2 
  ])
    .range([height, 0]);

return yLinearScale;
}

// Function used for updating xAxis var upon click on axis label
function renderXAxes(newXScale, x_dynaAxis) {
  var bottomAxis = d3.axisBottom(newXScale);

  x_dynaAxis.transition()
    .duration(1000)
    .call(bottomAxis);

  return x_dynaAxis;
}

// Function used for updating yAxis var upon click on axis label
function renderYAxes(newYScale, y_dynaAxis) {
  var leftAxis = d3.axisLeft(newYScale);

  y_dynaAxis.transition()
    .duration(1000)
    .call(leftAxis);

  return y_dynaAxis;
}

// Function used for updating circles group with a transition to new circles
function renderCircles(circlesGroup, newXScale, chosenXAxis, newYScale, chosenYAxis) {

  circlesGroup.transition()
    .duration(1000)
    .attr("cx", d => newXScale(d[chosenXAxis]))
    .attr("cy", d => newYScale(d[chosenYAxis]));

  return circlesGroup;
}
// Function used for updating the text in the circles with a transition to new text
function renderText(circleTextGroup, newXScale, chosenXAxis, newYScale, chosenYAxis) {
  circleTextGroup.transition()
      .duration(1000)
      .attr("x", d => newXScale(d[chosenXAxis]))
      .attr("y", d => newYScale(d[chosenYAxis]));
  
  return circleTextGroup;
}

// Function used for updating circles group with new tooltip
function updateToolTip(chosenXAxis, circlesGroup, chosenYAxis) {

// Conditional for x axis 
  var xLabel;

  if (chosenXAxis === "poverty") {
    xLabel = "Poverty: ";
  }
  else if (chosenXAxis === "age") {
    xLabel = "Age: ";
  }
  else {
    xLabel = "Income: $";
  }

// Conditional for y axis
var yLabel;

  if (chosenYAxis === "healthcare") {
    yLabel = "Healthcare: ";
  }
  else if (chosenYAxis === "smokes") {
    yLabel = "Smokes:";
  }
  else {
    yLabel = "Obesity: ";
  }

// Create tool tip labels
toolTip = d3.tip()
    .attr("class", "tooltip")
    .offset([80, -60])
    .html(function(d) {
        if (chosenXAxis === "age") {
            // Show yAxis labels and format as percentages
            // Display age
            return (`${d.state}<hr>${xlabel} ${d[chosenXAxis]}<br>${ylabel}${d[chosenYAxis]}%`);
          } else if (chosenXAxis !== "poverty" && chosenXAxis !== "age") {
            // Display income in dollars for xAxis
            return (`${d.state}<hr>${xlabel}$${d[chosenXAxis]}<br>${ylabel}${d[chosenYAxis]}%`);
          } else {
            // Display poverty as percentage for xAxis
            return (`${d.state}<hr>${xlabel}${d[chosenXAxis]}%<br>${ylabel}${d[chosenYAxis]}%`);
          }      
    });

// Create event listener 
circlesGroup.call(toolTip);
circlesGroup.on("mouseover", toolTip.show)
.on("mouseout", toolTip.hide);
return circlesGroup;
}

// Retrieve data from the CSV file and execute everything below
d3.csv("assets/data/data.csv").then(function(censusData) {

// Parse data
  censusData.forEach(function(data) { 
      data.poverty = +data.poverty;
      data.healthcare = +data.healthcare;
      data.age = +data.age;
      data.income = +data.income;
      data.smokes = +data.smokes;
      data.obesity = +data.obesity;
// Console log census data
      console.log(data);
  });

// xLinearScale function 
var xLinearScale = xScale(censusData, chosenXAxis);

// yLinearScale function 
var yLinearScale = yScale(censusData, chosenYAxis);

// Create initial axis functions
var bottomAxis = d3.axisBottom(xLinearScale);
var leftAxis = d3.axisLeft(yLinearScale);

// Append x axis
var x_dynaAxis = chartGroup.append("g")
    .classed("x-axis", true)
    .attr("transform", `translate(0, ${height})`)
    .call(bottomAxis);

// Append y axis
var y_dynaAxis = chartGroup.append("g")
    .classed("y-axis", true)
    .call(leftAxis);

// Append initial circles
var circlesGroup = chartGroup.selectAll("circle")
    .data(censusData)
    .enter()
    .append("circle")
    .attr("cx", d => xLinearScale(d[chosenXAxis]))
    .attr("cy", d => yLinearScale(d[chosenYAxis]))
    .attr("r", "12")
    .attr("fill", "lightblue")
    .attr("opacity", "1");

// Create circle labels
var circlesText = chartGroup.append("g")
      .selectAll("circle")
      .data(censusData)
      .enter()
      .append("text")
      .text(d => d.abbr)
      .attr("x", d => xLinearScale(d[chosenXAxis]))
      .attr("y", d => yLinearScale(d[chosenYAxis]))
      .attr("text-anchor", "middle")
      .attr("font-size", "10px")
      .attr("fill", "white")
      .style("font-weight", "bold")
      .attr("alignment-baseline", "central");

// Create group for x-axis labels
var xlabelsGroup = chartGroup.append("g")
    .attr("transform", `translate(${width / 2}, ${height})`);

// Append x-axis labels 
var povertyLabel = xlabelsGroup.append("text")
.attr("x", 0)
.attr("y", 40)
.attr("value", "poverty") // Value to grab for event listener.
.classed("active", true) 
.text("In Poverty (%)");

var ageLabel = xlabelsGroup.append("text")
.attr("x", 0)
.attr("y", 60)
.attr("value", "age") // Value to grab for event listener.
.classed("inactive", true)
.text("Age (Median)");

var incomeLabel = xlabelsGroup.append("text")
.attr("x", 0)
.attr("y", 80)
.attr("value", "income") // Value to grab for event listener.
.classed("inactive", true)
.text("Household Income (Median)");

// Append group for y-axis labels
var ylabelsGroup = chartGroup.append("g")

const healthcareLabel = ylabelsGroup.append("text")
.attr("transform", "rotate(-90)")
.attr("x", -(height / 2))
.attr("y", -40)
.attr("value", "healthcare") // Value to grab for event listener
.text("Lacks Healthcare (%)")
.classed("active", true);

const smokesLabel = ylabelsGroup.append("text")
.attr("transform", "rotate(-90)")
.attr("x", -(height / 2))
.attr("y", -60)
.attr("value", "smokes") // Value to grab for event listener
.text("Smokes (%)")
.classed("inactive", true);

const obeseLabel = ylabelsGroup.append("text")
.attr("transform", "rotate(-90)")
.attr("x", -(height / 2))
.attr("y", -80)
.attr("value", "obesity") // Value to grab for event listener
.text("Obese (%)")
.classed("inactive", true);

// updateToolTip function above csv import
var circlesGroup = updateToolTip(chosenXAxis, chosenYAxis, circlesGroup);

// X axis labels event listener
  xlabelsGroup.selectAll("text")
    .on("click", function() {
// get value of selection
      var value = d3.select(this).attr("value");
      if (value !== chosenXAxis) {

// Replaces chosenXAxis with value
        chosenXAxis = value;

// Functions here found above csv import
// Updates x scale for new data
        xLinearScale = xScale(censusData, chosenXAxis);

// Updates x axis with transition
        x_dynaAxis = renderXAxes(xLinearScale, x_dynaAxis);

// Updates circles with new x values
        circlesGroup = circlesGroup(circlesX, xLinearScale, chosenXAxis);

// Updates circles text with new x values
        circlesText = renderXTexts(circlesText, xLinearScale, chosenXAxis);

// Updates tooltips with new info
        circlesGroup = updateToolTip(chosenXAxis, chosenYAxis, circlesGroup);

// Changes classes 
if (chosenXaxis === "poverty") {
  povertyLabel
      .classed("active", true)
      .classed("inactive", false);
  ageLabel
      .classed("active", false)
      .classed("inactive", true);
  incomeLabel
      .classed("active", false)
      .classed("inactive", true);
}
else if (chosenXaxis === "age"){
povertyLabel
    .classed("active", false)
    .classed("inactive", true);
ageLabel
    .classed("active", true)
    .classed("inactive", false);
incomeLabel
    .classed("active", false)
    .classed("inactive", true);
}
else{
povertyLabel
      .classed("active", false)
      .classed("inactive", true);
  ageLabel
      .classed("active", false)
      .classed("inactive", true);
  incomeLabel
      .classed("active", true)
      .classed("inactive", false);  
    }

  }});
// Y axis labels event listener
ylabelsGroup.selectAll("text")
.on("click", function() {
// Get value of selection
const value = d3.select(this).attr("value");
if (value !== chosenYaxis) {

// Replaces chosenXAxis with value
    chosenYaxis = value;

// Functions here found above csv import
// Updates x scale for new data
    yLinearScale = yScale(healthData, chosenYaxis);

// Updates y axis with transition
    y_dynaAxis = renderYAxes(yLinearScale, y_dynaAxis);

// Updates circles with new y values
    circlesGroup = renderYCircles(circlesGroup, yLinearScale, chosenYaxis);

// Updates texts with new y values
    circlesText = renderYTexts(circlesText, yLinearScale, chosenYaxis);

// Updates tooltips with new info
circlesGroup = updateToolTip(chosenXAxis, chosenYAxis, circlesGroup);

// Changes classes to change bold text
    if (chosenYaxis === "healthcare") {
      healthcareLabel
            .classed("active", true)
            .classed("inactive", false);
      smokesLabel
            .classed("active", false)
            .classed("inactive", true);
      obeseLabel
            .classed("active", false)
            .classed("inactive", true);
    }
    else if (chosenYaxis === "smokes"){
      healthcareLabel
          .classed("active", false)
          .classed("inactive", true);
      smokesLabel
          .classed("active", true)
          .classed("inactive", false);
      obeseLabel
          .classed("active", false)
          .classed("inactive", true);
    }
    else{
      healthcareLabel
            .classed("active", false)
            .classed("inactive", true);
      smokesLabel
            .classed("active", false)
            .classed("inactive", true);
      obeseLabel
            .classed("active", true)
            .classed("inactive", false);  
    }
  }})

}).catch(function(error) {
  console.log(error);
});



