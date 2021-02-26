Assignment 3 - Replicating a Classic Experiment  
===

Project Description Summary
---
Our project set to perfrom an experiment similar to Cleveland and McGill's original experiment. In this experiment, a number of participants were asked to determine how much the smaller is to the larger between two noted areas. Our experiment asked participants, essentially, the same objective. The survey would generate a random set of data points for a tree map, pie chart, or stacked bar chart. Each chart was generated with 10 random values that were labeled A - J. The program would randomly select two of these labeled points (A-J), and the user would then enter the ratio they believed the smaller was to the larger of two of the labeled points. This repeated for 30 trials. Once concluded, the data would be recorded on a server. The data was downloaded as a csv file format for use in statisitcal analysis of the error using 95% bootstrap confidence intervals

The link to the survey can be found on the link [here](https://peppered-automatic-apparel.glitch.me/). 
Here is the acutal URL if the hyperlink does not work: https://peppered-automatic-apparel.glitch.me/

Project Details (An expansion of the previous summary)
---
In the acutal code, we had 10 random values generated before a visualization was projected and drawn onto the screen. Each of these data points were associated with a letter from A - J, with the first being associated with A and so on. Using these points, a visualization was created (either tree map, stacked bar chart, or pie chart) with each section associated with a random value also being labeled by its particular letter. From those ten random data points, two were selected for a particular visualization. Alongside the visualization, text displaying the instructions to the user (to compare the smaller to the larger) and the survey question number are displayed. There is a text box that can take in information from the user and a next button that accepts the information, stores it, and then displays the next data visualization. If the user fails to enter in a value for a particular visualization, an error message appears to inform the user of such. The program is coded to run 30 visualization questions. At the end, the user's overall error and the error for each type of visualization. After testing, the visualization's stored data was downloaded as a csv file. 

The server was hosted externally using Glitch. The link to the survey is written in twice above. This allowed for the storage of information in an external server as well. The data was then able to be downloaded as a csv file for easy integration into R + ggplot code that was written.

In R, the methods within the ggplot library were used to plot the log2 error data vs the visualization types (tree map, stacked bar chart, and pie chart). 95% bootstrap confidence intervals with error bars for the upper and lower bounds are drawn in red. A coordiante flip method is used to orient the graph properly. 

There are two intersting points about the data that we just want to list out. 
- Firstly, the error is higher in our resulting data than the crowdsourced data. 
- Secondly, the most variance in the mean is seen with the stacked bar chart, indicating a greater variability in participants being able to determine the smaller of the larger area of two selected areas. 

We had two hypotheses when creating this experiment: all visualization types would have high error in properly evaluating which is smaller to the larger and the tree map would do significantly worse than the other data visualizations. The first hypothesis was correct. There is a lot of error for each data visualization supported by the high mean value of each visualization. The second hypothesis was not correct. When examining the data, there is no statistical significance between the error of the visualization types. All three visulaization types are not statistically better or worse than the others.  In conclusion, we can say that the tree map, stacked bar chart, and pie chart visualizations are not effective for conveying differences in area between sections, and each do neither better or worse than the others. 

Pictures/Images
---
[!Immersive Image](img/SampleStartSurveyScreen.png)
Above is an image of the survey front page.

[!Immersive Image](img/SampleTreeMap.png)
Above is an image of the tree map from the survey that was generated.

[!Immersive Image](img/SampleStackedBarChart.png)
Above is an image of the stacked bar chart from the survey that was generated.

[!Immersive Image](img/SamplePieChart.png)
Above is an image of the pie chart from the survey that was generated.The text box in this one is filled in with a value that a user would be entering.

[!Immersive Image](img/UnenteredValueAlert.png)
Above is an image of an alert message that appears if a user does not enter in a value for a particular visualization. In other words, hitting next without entering in a value.

[!Immersive Image](img/SampleEndSurveyScreen.png)
Above is an image of the final page of the survey, showing overall error and error for each specific data visualization to the user. Permission was obtained to show this image.

[!Immersive Image](img/BootstrapConfidenceIntervalGraph.png)
Above is an image of the graph of visualization vs log 2 error from R + ggplot.

Design Achievement
---
There are multiple design achievements that we would like to acknowledge. It is listed below:
-We were able to move and center the survey components on the screen.
-We were able to implement button functionality that worked with the text box for ease in entering data for users.
-We were able to display the final overall error and the error for each visualization type to the user once the survey was completed.
-An alert message appears if a user fails to enter in a value for the shown visualization to inform the user to enter in a value.
-Numbering of which visualization number out of 30 is being shown. It makes the test not seem endless for the user.
-In R, the confidence interval upper and lower bounds were shown on the graph as error bars when creating the 95% bootstrap confidence interval.

Technical Achievement
---
There is one technical achievement that we would like to acknowledge. It is listed below:
-We were able to record and store the survey results using glitch on an external server. The information was retireved as a csv file for statistical analysis.

References/Citations
---
1. [This source was useful for generating a background on stacked bar charts in d3](https://www.d3-graph-gallery.com/graph/barplot_stacked_basicWide.html)
2. [This source helped address the problem of svg.width being used for the stacked bar chart](https://css-tricks.com/using-svg/)
3. [This source provided a background for generating the tree map in d3](https://www.d3-graph-gallery.com/graph/treemap_json.html)
4. [This source provided a background for generating the pie chart in d3](https://www.d3-graph-gallery.com/graph/pie_annotation.html)
5. [This source also provided a background for generating the pie chart in d3](https://www.d3-graph-gallery.com/graph/pie_basic.html)
6. [This source provided a background to making bootstrap confidence intervals in R + ggplot](http://rstudio-pubs-static.s3.amazonaws.com/28101_41a7995107d94c8dbb07bbf7cd7e8291.html)
7. [This source helped with figuring out labeling with R + ggplot](http://environmentalcomputing.net/plotting-with-ggplot-adding-titles-and-axis-names/#:~:text=To%20alter%20the%20labels%20on,line%20of%20basic%20ggplot%20code.&text=Note%3A%20You%20can%20also%20use,which%20is%20equivalent%20to%20ggtitle%20.)

GitHub Assignment 3 Details (from A3 original README)
---

- Fork the GitHub Repository. You now have a copy associated with your username.
- Make changes to index.html to fulfill the project requirements. 
- Make sure your "master" branch matches your "gh-pages" branch. See the GitHub Guides referenced above if you need help.
- Edit this README.md with a link to your gh-pages site: e.g. http://YourUsernameGoesHere.github.io/Experiment/index.html
- Replace this file (README.md) with your writeup and Design/Technical achievements.
- To submit, make a [Pull Request](https://help.github.com/articles/using-pull-requests/) on the original repository.
- Name your submission using the following scheme: 
```
a3-FirstLastnameMember1-FirstLastnameMember2-FirstLastnameMember3-...
```
