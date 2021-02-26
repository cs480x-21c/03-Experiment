library(tidyverse)
library(readxl)


dd <- read_excel("fullData.xlsx")

head(dd)

d <- ggplot(dd, aes(x=logMod, y=vis)) + geom_point()
d + stat_summary(fun.data = "logMod", colour = "red", size = 2)
                 
#ggplot(dd, aes(x = Weight, y = MPG, color= Manufacturer, size=Weight)) + geom_point(alpha = 0.5)

#source("intro.r", echo = TRUE)
