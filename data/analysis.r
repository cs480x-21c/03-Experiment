#install.packages("tidyverse", repos = "http://cran.us.r-project.org") # if not already installed
#install.packages("Hmisc", repos = "http://cran.us.r-project.org") # if not already installed

library(Hmisc)
library(tidyverse)

pdf(NULL)

data <- read.csv('./data/data_final.csv')

ggplot(data, aes(x = Type, y = cm.error)) + stat_summary(fun.data = 'mean_cl_boot', colour = 'red', size = 0.5) + coord_flip()
ggsave(filename = './img/plot.png', width = 7, height = 5)


piecharts <- filter(data, Type == 'Piechart')
boxplots <- filter(data, Type == 'Boxplot')
barcharts <- filter(data, Type == 'Barchart')

smean.cl.boot(piecharts$cm.error, conf.int = .95, B = 1000)
smean.cl.boot(boxplots$cm.error, conf.int = .95, B = 1000)
smean.cl.boot(barcharts$cm.error, conf.int = .95, B = 1000)
