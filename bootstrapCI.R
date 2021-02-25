
library(ggplot2)
library(Hmisc)

records = read.csv('survey_records.csv', header=TRUE)

aggregate( x = records$cm_error, by = list(records$graphs_guessed), FUN=mean)


ggplot( records, aes(x = cm_error, y = graphs_guessed)) +
  stat_summary(fun.data = "mean_cl_boot")

