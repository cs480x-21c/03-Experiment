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

# Results 

We calculated percent correctly identified (if A is higher at the marked x value,
 percent of viewers that correctly identified A is higher) and average log base 2 error for each chart type.
 
Chart types, ordered from best to worst by percent correctly identified with bootstrapped 95% confidence intervals:
 
 2-dataset horizon chart, 2-dataset line chart, 4-dataset line chart, 
 6-dataset line chart, 4-dataset horizon chart, 6-dataset horizon chart
[0.9014285714285715, 0.8928571428571429, 0.8880952380952379, 0.9833333333333334, 0.6866666666666668, 0.5]
![identification graph]() 

Chart types, ordered from best to worst by average log base 2 error with bootstrapped 95% confidence intervals:

 2-dataset horizon chart, 2-dataset line chart, 4-dataset line chart, 
 6-dataset line chart, 4-dataset horizon chart, 6-dataset horizon chart 
[5.850308807458906, 5.883511636599286, 6.071480293462024, 5.64199470150577, 6.143865040538033, 6.617486980527845]
![estimation graph]() 

Based on our results, it is easier on both line charts and horizon charts to identify maximums
and estimate percentages with fewer datasets. 
With respect to picking the higher value, horizon charts with 2 datasets were better than 
line charts with 2, but fell off sharply with 4 and 6. 
Similarly, horizon charts were better than line charts for estimating percents
with 2 datasets, but worse than line charts for 4 and 6 datasets. 
We think the sharp dropoff for horizon charts may be because viewers were unfamiliar 
with horizon charts and didn't have labeled
x and y axes for each horizon chart, and so struggled to read them with more datasets. 

# Technical Achievements

- We decided to host our experiment on a server considering that gh-pages only supports static content. We used the Heroku cloud application platform with a Postgres database for storing participant responses. The server is built with the Express framework for Node.js. This was learned specifically for this project, as none of the team members had experience in back-end web development. We followed the [Heroku tutorial for Node.js](https://devcenter.heroku.com/articles/getting-started-with-nodejs) and made modifications to suit the project.

- We also compared using completely random data for each dataset with using slightly ordered data. Completely random datasets were really really hard to read (see screenshot below). They are also uncommon as real-world datasets, and thus might be perceived as meaningless by the viewer. For these reasons, we created slightly ordered data that follows a sine wave, plus or minus some random amount of variation. This made the data much easier to read for viewers. If we were doing this again, we would use smoother data so that the user tasks were more similar to real-life tasks.

The pictures below show completely random data on left, slightly ordered data on right: 

![random line](img/random%20line.png) ![ordered line](img/ordered%20line.png)

# Design Achievements

- **Line Charts:** We used a color selection from colorbrewer to make sure the colors were color-blind safe and qualitatively different. If we were doing this again we would do black and white with discernable line patterns. But if we had to do it in color, we would pick some darker colors and make sure that the colors paired against each other are always easily differentiable from each other (for example, comparing an orange to a blue rather than a green to a blue). We made a legend for the marked datasets; doing this again we could compare marking the points on the graph versus having a legend so that the viewer doesn’t have to look back and forth. 

- **Horizon Charts:** We used studies on the factors that make horizon charts more or less effective to design our horizon charts. For example, in a 2009 study by Heer et al., researchers found that horizon charts with 2 bands are most readable (with 3 layers perception was fair; 4 or more bands were difficult to read). For this reason our horizon charts use two color bands. If we were doing this again, we would make x and y axes for each chart rather than only one (valiant efforts were made but our d3 capabilities were stymied by the challenge at this time). 

- **Survey:**
  - Participant responses are recorded upon proceeding to the next chart, since there is little to no incentive to complete this survey. The order that the charts are presented is recorded for further analysis in regards to participant learning and fatigue - participants may become better at reading the charts over time, but they may also become tired of the repetitive questions. In the future, timing how long it takes for participants to perform each task could be a valuable addition.
  - We used Bootstrap CSS to style the survey. If we were doing this again, we would make the survey more visually appealing (more centered, colored background to offset the main content) to make it easier for viewers to look at repeatedly. 
  - We wrote a survey introduction and explanation of horizon charts. If we were doing this again, we would provide a video or demonstration of the horizon charts and allow users to practice reading them to make sure they understand them. 
  - As additional future improvements to the survey, we would add some kind of progress indicator so that viewers know how far through the survey they are, and don’t get discouraged. 
  We would also decrease the number of charts per survey or increase the incentive for viewers to move through the survey. 
  

## File descriptions

The files for this project include the following: 
- img folder: contains images for the README
- public folder: contains:
  - csv folder with the datasets;
  - img folder with the image for the survey intro;
  - javascripts folder with the scripts to create a line chart, horizon chart, 
  and run the survey; and
  - stylesheets folder with the additional styling for our survey. 
- views folder: contains:
  - pages folder with pages for the survey home and database;
  - partials folder with the header and webpage footer
- .gitignore: specifies intentionally untracked files
- Procfile: specifies commands executed on startup of app, by Heroku
- README: describes project
- app.json: describes application
- bootstrap.rmd: R code for analysing results
- index.js: server code, connects with database
- package-lock.json: automatically generated file, specifies exact versions of installed packages
- package.json: metadata regarding app, declares dependencies
- test.js: server code

## References

Heer, Jeffrey; Kong, Nicholas; & Agrawala, Maneesh. “Sizing the Horizon: The Effects of Chart Size and Layering on the Graphical Perception of Time Series Visualizations.” 2009. ACM Conference on Human Factors in Computing Systems (CHI). 

