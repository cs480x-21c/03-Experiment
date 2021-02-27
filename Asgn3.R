library(ggplot2)
library(dplyr)
library(tidyr)
library(tidyverse)
csvdata = read.csv("./GitHub/03-Experiment/Asgn3.csv")
attach(csvdata)

a <- ggplot(csvdata, aes(Grid, log((abs(ActualValue-EstimatedValue)) + .125, 2)))+geom_point()
a + stat_summary(fun.data = "mean_cl_boot", colour = "red", size = 1) + ylab("Logarithmic Difference") + coord_flip()

b <- ggplot(csvdata, aes(Markers, log((abs(ActualValue-EstimatedValue)) + .125, 2)))+geom_point()
b + stat_summary(fun.data = "mean_cl_boot", colour = "red", size = 1) + ylab("Logarithmic Difference") + coord_flip()

c <- ggplot(csvdata, aes(DistanceBetweenBars, log((abs(ActualValue-EstimatedValue)) + .125, 2)))+geom_point()
c + stat_summary(fun.data = "mean_cl_boot", colour = "red", size = 1) + ylab("Logarithmic Difference") + xlab("Distance Between Bars") + coord_flip()
