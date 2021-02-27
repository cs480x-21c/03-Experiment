library(tidyverse)

df <- read.csv("data/results.csv", header=TRUE)

df = df[df$SubjectAnswer < 100, ]

calcError <- function(x1, x2){
	error = abs(floor(x1) - x2) + 1/8
   	ifelse(error != 0, log(error, 2), 0)
}

df %>% 
	ggplot(aes(ChartType, calcError(SubjectAnswer, CorrectAnswer))) +
	stat_summary(fun.data = "mean_cl_boot", color = "red", size = 0.5) +
	coord_flip() +
	scale_y_reverse() +
	ylab("Log Error");