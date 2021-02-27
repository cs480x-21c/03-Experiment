library(tidyverse)
library(readxl)
library(Hmisc)
library(forcats)

data <- read_excel("fullData.xlsx")

data %>%
  mutate(vis = fct_reorder(vis,desc(logError))) %>%
    ggplot(aes(logError,vis)) + 
     #geom_point() +
    stat_summary(fun.data = "mean_cl_boot", colour = "red", size =1.5)
                 
#ggplot(dd, aes(x = Weight, y = MPG, color= Manufacturer, size=Weight)) + geom_point(alpha = 0.5)

#source("intro.r", echo = TRUE)
