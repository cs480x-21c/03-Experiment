#install.packages("ggplot2", repos = "http://cran.us.r-project.org") # if not already installed
#install.packages("ggrepel", repos = "http://cran.us.r-project.org") # if not already installed
#install.packages("tidyverse", repos = "http://cran.us.r-project.org") # if not already installed
#install.packages("Hmisc", repos = "http://cran.us.r-project.org") # if not already installed

library(ggplot2)
library(Hmisc)

pdf(NULL)

data <- read.csv('./data/data_final.csv')
ggplot(data, aes(x = Type, y = cm.error, label = Type)) + geom_point() + stat_summary(fun.data = 'mean_cl_boot', colour = 'red', size = 0.5)
#stat_summary(mapping = NULL, data = NULL, geom = "pointrange", position = "identity")

ggsave('./data/plot.png')
