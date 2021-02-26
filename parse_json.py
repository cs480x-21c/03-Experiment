import json
import csv
import os
import pandas as pd

records = pd.DataFrame(columns=['graphs_guessed','guesses','true_ratios'])
times = ["r_1123","r_1136","r_1142","r_1156","r_1223","r_1226","r_1227","r_1233","r_1258","r_1310"]#expand this (10 responses)
for t in times:
    p = t+".json"
    path = os.path.join('json',p)
    with open(path, encoding="utf8") as f:
        records = records.append(pd.DataFrame(data=json.load(f)))

records['guesses'] = records.guesses.astype(float) #convert guesses from str to float
records = records.round(decimals=0) #round all floats
records['true_ratios'] = records.true_ratios.astype(int) #convert true_ratios to int
records['guesses'] = records.guesses.astype(int) #convert guesses to int

# records.drop(axis='columns',columns="",inplace=True)

records.to_csv(os.path.join("survey_records.csv"))
# print(len(records))
print(records.head())
print(records.info())


# We still need to do the following

# - Scale this error using Cleveland and McGill’s log-base-2 error equation. For details, see the background section (there’s a figure with the equation). This becomes your “Error” column in the output. Make sure you use whole percentages (not decimal) in the log-base-2 equation. Make sure you handle the case of when a person gets the exact percentage correct (log-base-2 of 1/8 is -3, it is better to set this to 0). 
# - Run your experiment with 10 or more participants, or-- make sure you get at least 200 trials **per visualization type** in total.  
#     - Grab friends or people in the class.   
#     - Run at least 20 trials per visualization type, per participant. This is to ensure that you cover the range of possible answers (e.g. 5%, 10%, ..., 95%)
# - Make sure to save the resulting CSV after each participant. Compile the results into a master csv file (all participants, all trials).
# - Produce a README with figures that shows the visualizations you tested and results, ordered by best performance to worst performance. Follow the modern Cleveland-McGill figure below -- though note that using names instead of icons is fine.
# - To obtain the ranking, calculate and report the average log2Error for each visualization across all trials and participants. This should be straightforward to do in a spreadsheet.
# - Use Bootstrapped 95\% confidence intervals for your error upper and lower bounds. Include these in your figures. Bootstrapped confidence intervals are easily implemented in R + ggplot2 using the `stat_summary` geom. You can also use Excel, Python, or many many other tools. Bootstrapped 95% CIs are **very** useful in modern experiment practice.
# - Include example images of each visualization as they appeared in your experiment (i.e. if you used a pie chart show the actual pie chart you used in the experiment along with the markings, not an example from Google Images).