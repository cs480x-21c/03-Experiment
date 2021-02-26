# The Visualization/Experiment

The experiment uses the following graphs:
  - Bar chart
  - Pie chart
  - Stacked bar chart

Our experiment is hosted live and can be found at: https://ekavtaradze.github.io/03-Experiment/
**Note: Our visualization and error reports require a csv file to be downloaded from the experiment site upon submission. These reports were submitted to us via email.**

# Our hypothesis:

We predict that the ranking of effectiveness in human perception of data will be the most effective in the bar chart, followed by the stacked bar chart and pie chart respectively. Users will be able to more accurately compare two given data structures in the bar chart because it has been shown that the magnitude channels on ordered attributes ranks positioning on a common scale (bar chart) to be the most effective followed by the position on unaligned scale (stack bar chart) and the angle (pie chart) to be the least effective.

# Working on the d3 Visualizations and the Experiment Design

The graphs utilized in this experiment were generated with reference to examples listed on the d3 graph gallery. The experiment itself includes 60 pages with 20 examples of each graph. The order of the graphs are randomly generated. Additionally, the data in which we display in our charts are also generated randomly using a randomly generated number script. The experiment itself is taken and a reference to the Cleveland and McGill Graphical Perception experiement. Similar to the Cleveland and McGill Experiment the participants are asked to compare the two marked graphical elements and to provide their closest guess in the text box before moving forward. 

We received datasets from 12 participants totalling 240 trials per chart to analyze by the end of the experimentation phase. 

## Bar Charts

<img src="img/BarChartEx.png" width="500">

The above image is an example of a possible bar chart that is displayed in our experiment given during our trials. The two selected graphical elements participants were asked to compare were generated randomly for every generated bar chart. 

## Stacked Bar Charts

<img src="img/StackedEx.png" width="500">

The above image is an example of a possible stacked bar chart that is displayed in our experiment given during our trials. The two selected graphical elements participants were asked to compare were again generated randomly and decided upon randomly for every visualization of a stacked bar chart. 

## Pie Chart

<img src="img/PieChartEx.png" width="500">

The above image is an example of a possible pie chart that is displayed in our experiment given during our trials. The two selected graphical elements or 'slices' presented to the participants were again generated randomly for every pie chart generation. In order to place the dots and mark which slices to compare, the built in d3 centroid() function was used to calculate the location at the middle of the slice we would like the participant to reference when comparing. 

# Results/Error Analysis

<img src="img/Results.png" width="500">

Looking at the log2Error and analyzing the results, we can see that our hypothesis above holds true. The true percent is the actual percentage of the smaller to the larger graphical element in each chart, while the reported percent is what participants reported in the trials. Utilizing the Cleveland and McGill method, `abs(ReportedPercent – TruePercent)`, as their score for error and having this be on a logarithmic scale to propagate error, we can see in the graphical analysis above that participants most likely were able to perceive data more accurately when presented using a bar chart. The pie chart clearly resulted in a more inaccurate reading of data whereas the stacked bar chart came in as the second most effective graphical display. It is important to note that the error calculated for the stacked bar chart, however, was evidently closer to the error in accuracy when reading a pie chart. 

# Design/Technical Achievements
Some stuff here....

Resources used:

- csv download https://stackoverflow.com/questions/14964035/how-to-export-javascript-array-info-to-csv-on-client-side
- https://www.d3-graph-gallery.com/index.html
