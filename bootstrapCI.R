# Bootstrap 95% CI for R-Squared
library(boot)
# function to obtain R-Squared from the data
rsq <- function(formula, data, indices) {
  d <- data[indices,] # allows boot to select sample
  fit <- lm(formula, data=d)
  return(summary(fit)$r.square)
}
# bootstrapping with 1000 replications
cm_error = na.omit(read.csv("../survey_records.csv", header=TRUE))

results <- boot(data=cm_error, statistic=rsq,
   R=1000, formula=mpg~wt+disp)

# view results
results
plot(results)

# get 95% confidence interval
boot.ci(results, type="bca")
