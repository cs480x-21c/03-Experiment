import numpy as np
import pandas as pd

df = pd.read_csv('./data/data.csv')


# This is needed for any data generated before 2PM 2/25 due to a bug
df.loc[df['Type'] == 'Barchart', 'Actual Min'] = 1 - df.loc[df['Type'] == 'Barchart', 'Actual Min'] 
df.loc[df['Type'] == 'Barchart', 'Actual Max'] = 1 - df.loc[df['Type'] == 'Barchart', 'Actual Max'] 
minTemp = df.loc[df['Type'] == 'Barchart', 'Actual Min'] 
df.loc[df['Type'] == 'Barchart', 'Actual Min'] = df.loc[df['Type'] == 'Barchart', 'Actual Max']
df.loc[df['Type'] == 'Barchart', 'Actual Max'] = minTemp


df['Actual Dif'] = df['Actual Min']/df['Actual Max']
df['Error'] = np.abs(df['Response']-df['Actual Dif'])
df['cm-error'] = np.log2(df['Error'] * 100 + 1/8)

df.to_csv('./data/data_final.csv', index=False)
