import numpy as np
import pandas as pd
import matplotlib.pyplot as plt

df = pd.read_csv("trials.csv")
# arr = np.random.uniform(low=0,high=100,size=100)
errorBar = np.array(df.loc[df.vis == 'bar']['error'])
errorCircle = np.array(df.loc[df.vis == 'circle']['error'])
errorPie = np.array(df.loc[df.vis == 'pie']['error'])

def createBootStraps(data,size):
    bootStraps = np.empty(size)
    for i in range(size):
        sample = np.random.choice(data,size=len(data))
        bootStraps[i] = np.mean(sample)
    return bootStraps

bootstrappedErrorBar = createBootStraps(errorBar,100)
bootstrappedErrorCircle = createBootStraps(errorCircle,100)
bootstrappedErrorPie = createBootStraps(errorPie,100)

intervals = [np.percentile(bootstrappedErrorCircle,[2.5,97.5]),
             np.percentile(bootstrappedErrorPie,[2.5,97.5]),                                              
             np.percentile(bootstrappedErrorBar,[2.5,97.5])] 
means = [np.mean(bootstrappedErrorCircle),np.mean(bootstrappedErrorPie),np.mean(bootstrappedErrorBar)]
vis = ['circle','pie','bar']

for i in range(len(vis)):
    plt.plot(tuple(intervals[i]),(i+1,i+1),'r|-') # Plotting the 95% Bootstrap Confidence Interval
    plt.plot(means[i],i+1,marker='o',color='black') # Plotting the log2 scaled error
plt.yticks(range(1,len(vis)+1),vis)
plt.xlabel("Log2 Error")
plt.ylabel("Visualizations")
plt.show()
