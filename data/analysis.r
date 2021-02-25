#install.packages("ggplot2", repos = "http://cran.us.r-project.org") # if not already installed
#install.packages("ggrepel", repos = "http://cran.us.r-project.org") # if not already installed
#install.packages("tidyverse", repos = "http://cran.us.r-project.org") # if not already installed
#install.packages("Hmisc", repos = "http://cran.us.r-project.org") # if not already installed

library(ggplot2)
library(Hmisc)
library(tidyverse)

pdf(NULL)

data <- read.csv('./data/data_final.csv')

ggplot(data, aes(x = Type, y = cm.error)) + stat_summary(fun.data = 'mean_cl_boot', colour = 'red', size = 0.5)
ggsave('./img/plot.png')


piecharts <- filter(data, Type == 'Piechart')
boxplots <- filter(data, Type == 'Boxplot')
barcharts <- filter(data, Type == 'Barchart')

t.test(piecharts$cm.error, ci = 0.95)
t.test(boxplots$cm.error, ci = 0.95)
t.test(barcharts$cm.error, ci = 0.95)
