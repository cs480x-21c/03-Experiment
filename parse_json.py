import json
import csv
import os
import pandas as pd

records = pd.DataFrame(columns=['graphs_guessed','guesses','true_ratios'])
times = ["r_1123","r_1136","r_1142","r_1156","r_1223","r_1226","r_1227","r_1233"]#expand this
for t in times:
    p = t+".json"
    path = os.path.join('json',p)
    with open(path, encoding="utf8") as f:
        records = records.append(pd.DataFrame(data=json.load(f)))

records.to_csv(os.path.join("survey_records.csv"))
# print(len(records))
# print(records.head())
