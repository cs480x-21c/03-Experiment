# Assignment 3 - Replicating a Classic Experiment  
===


CS480X Assignment 3  
Clay Oshiro-Leavitt  
Hunter Caouette  
Nicholas Alescio  

Project Page: https://clay-ol.github.io/03-Experiment/


# Hypotheses:
---

### Donut Chart:
Our testable hypothesis is that the donut chart will have the most accurate results - the two frames of reference provided by both the inner and outer radiai should help allow for accurate decerning between the sizes of elements.

### Pie Chart:
Our testable hypothesis is that the pie chart will perform poorer than the donut chart. Pie charts have long been considered 'poor' charts for data visualization and representing relative sizes between elements. 

### Tree Chart:
Our testable hypothesis is that the tree chart will perform poorer than the two radially designed charts. As elements in the tree chart are not necessarily oriented in the same way, we believe that this will prevent users from easily reading the chart and forming accurate comparisons.

### Bubble/Scatter Plot:
Our testable hypothesis is that the Bubble Plot will perform the worst of all of the plots. Due to the spacial positioning and lack of clear references between data points, we believe that this will make it difficult to accurately perceive the ratios of size between data points.


#### ERROR MEANS  
1   donut 2.774251  
2     pie 2.671841  
3 scatter 3.030364  
4    tree 2.964546  


1 (Best Performance): Pie Chart
---

![pie chart](img/a3-pie.png)

The Pie Chart visualization in our experiment produced the lowest average error of 2.67.



2: Donut Chart
---

![donut chart](img/a3-donut.png)

The Donut Chart visualization in our experiment produced an average error of 2.77.



3: Tree Map
---

![tree map](img/a3-treemap.png)

The Tree Map visualization in our experiment produced an average error of 2.96.



4 (Worst Performance): Bubble Chart
---

![bubble chart](img/a3-bubbles.png)

The Bubble Chart visualization in our experiment produced the highest average error of 3.03.

Design Points
---

- CSS Styling  
Rather than having a barebones HTML page, we opted to style our webapp with various CSS components. We added a border to our visualization to give it some pizazz as well as used freely available Google Fonts to give the application a more modern look.
- Progress Tracker  
Perhaps one of the most frustrating things a user can experience is not knowing their progress in an application. We added a simple progress tracker that illustrates the participant's progress through the experiment in the form of a fraction. Therefore, the user can always know their progress.

Tech Points
---

- Simple Mail Transfer Protocol Library  
For this technical achievement, we implemented an automated results logging method using the JS SMTP library. This enables us to simply write and send an email within a Javascript method. Once the end of our experiment was reached by the user, the last button press triggers the data to be written into the body of an email which is then sent to the three of us. This removes the requirement of having the participant manually send the data to us.
- 4 charts  
For this technical achievement, we decided to test 4 different visuals rather than just 3. For this 4th visualization, we opted to implement a tree chart. As we had not encountered such an example in class, this required more research and design considerations compared to our other visualization implementations.
- Multiple language Tech Stack  
For this project, we made use of multiple languages to perform various aspects of the project. We wrote our frontend and data collection portion in Javascript, leveraging D3.js to provide the visuals. Due to our experience with Python and Pandas, we then wrote our data processing and formatting in Python. Lastly, we did our final numerical analysis with R and ggplot2. When using multiple languages, it is important to consider how they interact with each other - how should we pass data between these different portions of our stack? For this, we decided to create JSON objects that could be parsed in Python. From our Python script, we exported a dataframe as a CSV that could easily be read into our R script.