# Assignment 3 - Replicating a Classic Experiment 

Danya Baron, Roman Wicky, Molly Wirtz

https://romanwicky.github.io/03-Experiment/index.html


# Background

In this assignment we implemented a controlled experiment using bar chart visualizations, angles, and volume visualizations. This experiment is based on
the paper by Cleveland and McGill, where they tested pie and stack chart variants. We replicated this experiment, but instead of just using stack charts,
we also used angles and volume. 

## Goal 

1) Test three different visualizations, and run experiment with 10 participants.
2) Implement data generation and error calculation functions by Cleveland and McGill's paper.
3) Basic analysis and reporting of results

## Hypotheses 
<b>Bar Chart:</b>
The human perceptive system can better understand vertically stacked bar-charts than horizontally stacked bar charts.

<b>Tilt / Angle:</b>
The human perceptive system can accurately guess vertical, horizontal, and diagonal lines, but struggle to accurately guess other angles. 

<b>3D Volume:</b>
The human perceptual system judges differences in volume very poorly in comparison to barcharts and angles.

# Experiment

We used D3.js, JavaScript, and HTML/CSS functionality for this experiment. We randomly generated 20 trials each of bar charts (10 vertical, 10 horizontal), volume SVG's, and angles in the experiment. The screenshots included below show our home page, each of our visualizations, and our exit page. 

As you can see, the barchart visualizations have six bars, each of randomly generated height, with two of the bars 'selected' by a dot. We made the decision to place these dots below the axis instead of within the bars, as not to give any point of reference to the user. For the barchart, we wanted to use a difference reference frame, instead of testing "What percentage of the left is in the right", we wanted to test how many times the smaller barchart can fit in the larger. This changes the range from (.1-10) instead of 1-99%.

The angle chart displays a single line, of which the users must guess the angle. Here, the four right angles of the quadrants are labeled as to not confuse the user. We do not generate 0, 45, 90, 135, 180, 225, 270, 315, and 360 degree angles, so that we could test how well the human brain can percieve angles that are not horizontal, vertical, or diagonal. We had the users guess from 0-360 degree rotation.

The volume chart displays two three-dimensional cubes where the left-most is always a 1x1x1 cube, and the right-most cube ranges in sizes from 2x2x2 to 7x7x7. We wanted to test how well the human brain can guess volumetric differences, so we asked the user to guess how many times the 1x1x1 cube can fit in a much larger cube.



## Homepage 

![ScreenShot](https://github.com/romanwicky/03-Experiment/blob/roman-work/img/homepage.png)

## Bar Chart

![ScreenShot](https://github.com/romanwicky/03-Experiment/blob/roman-work/img/barchart1.png)
![ScreenShot](https://github.com/romanwicky/03-Experiment/blob/main/img/barchart2.png)

## Angle

![ScreenShot](https://github.com/romanwicky/03-Experiment/blob/main/img/angle-ss.png)

## Volume

![ScreenShot](https://github.com/romanwicky/03-Experiment/blob/roman-work/img/volume1.png)

## Finish Page

![ScreenShot](https://github.com/romanwicky/03-Experiment/blob/roman-work/img/finished%20page.png)


# Analysis

We used JavaScript to read the CSV file, and organize the data and calculate the percent error.

We used Log-base-2 like the Cleveland and McGill paper to calculate the error percent.
We also did not use the Log-Base-2 because our answers have different ranges.


Conclusions:
The human brain is better at guesssing vertical barcharts, than horizontal. The human brain also really struggles to guess angles that are not vertical, horizontal, or diagonal. Finally, the human brain is terrible at guessing volumetric differences, shown in the huge error scale for that test.

# 95% Confidence Interval

Log-base error:
![ScreenShot](https://github.com/romanwicky/03-Experiment/blob/main/img/log-result.png)


Non-log base error:
![ScreenShot](https://github.com/romanwicky/03-Experiment/blob/main/img/non-log%20error.png)


# Technical Achievements

- Used smtp.gmail.com to send the CSV raw data from each participant to an Email, in which we could then take that file and convert into a CSV with the csvreader.js script.

- We precalculated the error scores for each vis to speed up the calculation of the stat_summary in ggplot 2 with R. 

- Experimented with d3.js, including using a volume visualization which had not yet taught in class.

- Used PapaParse library, which allows for seamless CSV parsing.

- Used basic form validation so that users could not click through the experiment without entering any data. 

- Used SessionStorage to store global variables in between html files. GitHub pages cannot work with servers, so that was our workaround.




# Design Achievements

- Button interaction. When hovered, all buttons become raised and change color to promote user interactivity within the website.

- Progress Bar. We created a progress bar at the left side of the page, to indicate when a user was finished with a certain visualization type. When the user is finished with the bar chart, for example, that circle turns to a color within our color scheme. All circles turn green when the user finishes the whole experiment.

- Basic color scheme. We used a basic color scheme to keep things simple and easy for the user to read. The header is a dark blue, while all buttons and the circles on the progress bar start as a light blue, and change to green on hover or task completion, respectively. Our created scheme is pictured below. 

![ScreenShot](https://github.com/romanwicky/03-Experiment/blob/main/img/scheme.png)

- Font combination. We primarily used the 'Roboto' font, imported from the Google fonts API, accompanied by the 'Lato' font for buttons and headers. According to "Choosing Fonts for Your Data Visualization" [1], these fonts are good for data visualizations as they are highly readable and aesthetically pleasing. 



# Resources
[1] https://medium.com/nightingale/choosing-a-font-for-your-data-visualization-2ed37afea637<br/>
[2] http://bl.ocks.org/mosley812/43194ec6f540c05e48273d0cd8877d2c<br/>
[3] https://d19jftygre6gh0.cloudfront.net/Niekes/613d43d39372f99ae2dcea14f0f90617<br/>
[4] https://github.com/Niekes/d3-3d/blob/master/src/primitiveShapes/cube.js<br/>


```
