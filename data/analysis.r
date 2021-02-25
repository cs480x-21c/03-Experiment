#install.packages("ggplot2", repos = "http://cran.us.r-project.org") # if not already installed
#install.packages("ggrepel", repos = "http://cran.us.r-project.org") # if not already installed
#install.packages("tidyverse", repos = "http://cran.us.r-project.org") # if not already installed
#install.packages("Hmisc", repos = "http://cran.us.r-project.org") # if not already installed
#install.packages("boot", repos = "http://cran.us.r-project.org") # if not already installed

library(Hmisc)
library(tidyverse)
library(boot)

pdf(NULL)

data <- read.csv('./data/data_final.csv')

ggplot(data, aes(x = Type, y = cm.error)) + stat_summary(fun.data = 'mean_cl_boot', colour = 'red', size = 0.5)
ggsave('./img/plot.png')


piecharts <- filter(data, Type == 'Piechart')
boxplots <- filter(data, Type == 'Boxplot')
barcharts <- filter(data, Type == 'Barchart')

smean.cl.boot(piecharts$cm.error, conf.int = .95, B = 1000)
smean.cl.boot(boxplots$cm.error, conf.int = .95, B = 1000)
smean.cl.boot(barcharts$cm.error, conf.int = .95, B = 1000)
