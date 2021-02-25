import csv
import os
import pandas as pd
import numpy as np

records = pd.read_csv('survey_records.csv')

records["difference"] = records['guesses'] - records['true_ratios']
records['difference'] = records.difference.abs()

records['cm_error'] = np.log2(records['difference'] + 0.125)

print(records.head())
records.to_csv(os.path.join("survey_records.csv"))