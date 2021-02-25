
library(ggplot2)
library(Hmisc)

records = read.csv('survey_records.csv', header=TRUE)

ggplot( records, aes(x = cm_error, y = graphs_guessed)) +
  stat_summary(fun.data = "mean_cl_boot")
