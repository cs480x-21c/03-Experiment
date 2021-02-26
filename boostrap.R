# library(tidyverse)
library(ggplot2)
library(dplyr)
library(tidyr)
library(acepack)
library(Hmisc)
# install.packages('acepack')
# install.packages("Hmisc",dependecies=T)

df <- read.csv('mastererrorcalculations.csv')

# ggplot(mpg, aes(displ, hwy, size = hwy))

# ggplot(aes(vis, log(abs(guess-truepercent), 2) ) ) + geom.point()

d <- ggplot(df, aes(Vis, ErrorScore)) + 
    scale_size(0.5) +
    stat_summary(fun = mean, fun.min = min, fun.max = max,
                   colour = "red") +
    coord_flip()

print(d)


sf <- read.csv('mastererrorcalculationsNONNORM.csv')

# ggplot(mpg, aes(displ, hwy, size = hwy))

# ggplot(aes(vis, log(abs(guess-truepercent), 2) ) ) + geom.point()

s <- ggplot(sf, aes(Vis, ErrorScore)) + 
  scale_size(0.5) +
  stat_summary(fun = mean, fun.min = min, fun.max = max,
               colour = "red") +
  coord_flip()

print(s)


  