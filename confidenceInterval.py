import numpy as np
import pandas as pd

# arr = np.random.uniform(low=0,high=100,size=100)
arr = [1,2,3,4,5]
print(list(arr))

def createBootStraps(data,size):
    bootStraps = np.empty(size)
    for i in range(size):
        sample = np.random.choice(data,size=len(data))
        bootStraps[i] = np.mean(sample)
    return bootStraps

result = createBootStraps(arr,1000)
# print(result)
print(np.mean(result))
