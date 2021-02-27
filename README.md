Assignment 3 - Replicating a Classic Experiment  

# Overview

###### Survey link: http://over-the-horizon.herokuapp.com/test

For our experiment, we compared line charts to horizon charts. We hypothesized that the difference between datasets on line charts would become harder to discern as the number of datasets increased, whereas the difficulty of discerning the difference between datasets in horizon charts would change less quickly as the number of datasets increased. 

We randomly generated 120 datasets to create 30 horizon charts and 30 line charts. 
Each set of 30 charts consisted of 10 charts with 2 sets of data, 10 charts with 4 sets of data, 
and 10 charts with 6 sets of data. 
Each dataset consisted of 20 values between 
0 and 100. We used 20 values rather than 10 
values per dataset so that the horizon charts 
appeared more realistic. In our [survey](http://over-the-horizon.herokuapp.com/test), 
we presented the 60 charts in random order. For each chart, one x value was marked and two datasets were identified. At the marked x value, we asked the viewer which dataset was higher, and what percentage the smaller value was of the larger one. Below are examples and explanations of the line chart and horizon chart. 

## Line chart

Each line chart had 2-6 datasets, a y-axis from 0-100, an x-axis from 0-20 with one other x value marked, and a legend identifying the two datasets of interest. We used color because lines of dots and dashes for 6 datasets were difficult to discern. Having taken the survey to test it, we would use better line patterns and no color if we were doing this again. Further notes on design and future changes are in the technical and design achievements sections. 

![line chart example](img/line%20chart.png)

## Horizon chart

As a refresher, horizon charts condense the information in a set of charts so that more 
charts can be shown on one screen. This is done by cutting off the original chart at a certain y value - 50 say - and dropping the part of the graph above the cutoff down to layer on top of the lower band. Color is used to show the layers: lighter colors mean lower layers, darker colors mean higher ones. Usually there are 2 to 3 layers. On the horizon charts in this survey, there are 2 layers. The x-axis is 0-20, and the y axis is always 0-50, with y values ranging from 1-100. One value on the x axis is marked; two datasets of interest are marked. Further notes on design and future changes are in the technical and design achievements sections. 

![horizon chart example](img/horizon%20chart.png)

## Survey Screenshots

Below are a screenshot of the survey introductory explanation and a screenshot of an example question in the survey. 

![survey intro](img/intro%20survey.png) ![survey question](img/survey%20question.png)

# Results - best to worst


Data Analysis
Calculate error: difference between true percentage and reported percentage + also the greater than less than bit - log2error
Scale error using Cleveland and McGill’s log-base-2 error equation
Log2( | judged percent - true percent | + ⅛ | )
Bootstrapped 95% CIs
comment on number of participants/trials

# Technical Achievements

@beck: Express / node.js Server, postgres db

- We also compared using completely random data for each dataset with using slightly ordered data. Completely random datasets were really really hard to read (see screenshot below). They are also uncommon as real-world datasets, and thus might be perceived as meaningless by the viewer. For these reasons, we created slightly ordered data that follows a sine wave, plus or minus some random amount of variation. This made the data much easier to read for viewers. If we were doing this again, we would use smoother data so that the user tasks were more similar to real-life tasks.

Completely random data on left, slightly ordered data on right: 

![random line](img/random%20line.png) ![ordered line](img/ordered%20line.png)

# Design Achievements

- Line charts: We used a color selection from colorbrewer to make sure the colors were color-blind safe and qualitatively different. If we were doing this again we would do black and white with discernable line patterns. But if we had to do it in color, we would pick some darker colors and make sure that the colors paired against each other are always easily differentiable from each other (for example, comparing an orange to a blue rather than a green to a blue). We made a legend for the marked datasets; doing this again we could compare marking the points on the graph versus having a legend so that the viewer doesn’t have to look back and forth. 

- Horizon charts: We used studies on the factors that make horizon charts more or less effective to design our horizon charts. For example, in a 2009 study by Heer et al., researchers found that horizon charts with 2 bands are most readable (with 3 layers perception was fair; 4 or more bands were difficult to read). For this reason our horizon charts use two color bands. If we were doing this again, we would make x and y axes for each chart rather than only one (valiant efforts were made but our d3 capabilities were stymied by the challenge at this time). 

- Survey

  - We used css_____ and such to make the survey look nice. If we were doing this again, we would make the survey more visually appealing (more centered, less whitespace) to make it easier for viewers 
  to look at repeatedly. 
  - We would add some kind of progress indicator so that viewers know how far through the survey they are, and don’t get discouraged. We would also decrease the number of charts per survey or increase the incentive for viewers to move through the survey. We wrote a survey introduction and explanation of horizon charts. If we were doing this again, we would provide a video or demonstration of the horizon charts and allow users to practice reading them to make sure they understand them. 

## File descriptions


## References

Heer, Jeffrey; Kong, Nicholas; & Agrawala, Maneesh. “Sizing the Horizon: The Effects of Chart Size and Layering on the Graphical Perception of Time Series Visualizations.” 2009. ACM Conference on Human Factors in Computing Systems (CHI). 


# left over from OG - delete
- Figure out how to calculate "Error", the difference between the true percentage and the reported percentage.
- Scale this error using Cleveland and McGill’s log-base-2 error equation. For details, see the background section (there’s a figure with the equation). This becomes your “Error” column in the output. Make sure you use whole percentages (not decimal) in the log-base-2 equation. Make sure you handle the case of when a person gets the exact percentage correct (log-base-2 of 1/8 is -3, it is better to set this to 0). 
- Produce a README with figures that shows the visualizations you tested and results, ordered by best performance to worst performance. Follow the modern Cleveland-McGill figure below -- though note that using names instead of icons is fine.
- To obtain the ranking, calculate and report the average log2Error for each visualization across all trials and participants. This should be straightforward to do in a spreadsheet.
- Use Bootstrapped 95\% confidence intervals for your error upper and lower bounds. Include these in your figures. Bootstrapped confidence intervals are easily implemented in R + ggplot2 using the `stat_summary` geom. You can also use Excel, Python, or many many other tools. Bootstrapped 95% CIs are **very** useful in modern experiment practice.
- Make sure your "master" branch matches your "gh-pages" branch. See the GitHub Guides referenced above if you need help.
- To submit, make a [Pull Request](https://help.github.com/articles/using-pull-requests/) on the original repository.
- Name your submission using the following scheme: 
```
a3-FirstLastnameMember1-FirstLastnameMember2-FirstLastnameMember3-...
```
