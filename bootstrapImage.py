import numpy as np
import pandas as pd
import math
import statistics
import matplotlib.pyplot as plt
visData = pd.read_csv(r'report.csv')

# to array takes the column header and the data being searched for
# type1array = toArray('visType', "type1")
def toArray(column, name):
    # creating blank arrays which will hold the results
    placeholderArray = np.array([[]])
    # array counters to be used to update the first array index
    counter = 0
    for i in range(len(visData.index)):
        if visData.loc[i][column] == name:
            if counter == 0:
                placeholderArray = np.array([extractRow(i, visData)])
                counter = 1
            else:
                placeholderArray = np.append(placeholderArray, [extractRow(i, visData)], axis=0)
    return placeholderArray

# parameters: index(integer), Dataset(csv)
# given an index and data set, it will extract the row at the index location
# from the dataset
def extractRow(index, dataName):
    ident = dataName.loc[index]['TrialNumber']
    true = dataName.loc[index]['Expected']
    reported = dataName.loc[index]['ReportedPercent']
    extractedRow = np.array([ident, true, reported, error(true, reported)])
    return extractedRow

# parameters: column
# takes the column, in format 'column', of the data set and creates a list
# of distinct values in that column
def typeList(column):
    runningList = []
    for i in range(len(visData.index)):
        runningList.append(visData.loc[i][column])
    return list(set(runningList))

# parameters: two numbers(int)
# returns the corrected error
def error(trueValue, reportedValue):
    corrected = 0
    if trueValue == reportedValue:
        corrected = 0
    else:
        a = (abs(reportedValue - trueValue) + (1/8))
        corrected = math.log(a, 2)
    return corrected

# parameters: Array of arrays
# assumes each child array is the same length
# assumes that the last item in the child is the error
def listOfError(array):
    errors = []
    position = len(array[0])-1
    for i in range(len(array)):
        errors.append(array[i][position])
    return errors

def bootstrap(data, n=1000, func=np.mean):

    # Generate `n` bootstrap samples, evaluating `func`
    # at each resampling. `bootstrap` returns a function,
    # which can be called to obtain confidence intervals
    # of interest.

    simulations = list()
    sample_size = len(data)
    xbar_init = np.mean(data)
    for c in range(n):
        itersample = np.random.choice(data, size=sample_size, replace=True)
        simulations.append(func(itersample))
    simulations.sort()
    def ci(p):
        # Return 2-sided symmetric confidence interval specified
        # by p.
        u_pval = (1+p)/2.
        l_pval = (1-u_pval)
        l_indx = int(np.floor(n*l_pval))
        u_indx = int(np.floor(n*u_pval))
        return(simulations[l_indx],simulations[u_indx])
    return(ci)

# gets the 95 percent confidence interval
def confidenceinterval(data):
    boot = bootstrap(data, n=20000)
    cintervals = [boot(.95)]
    return cintervals

def lowerinterval(listoferror):
    interval = np.array(confidenceinterval(listoferror))
    output = interval.min()
    return output

def upperinterval(listoferror):
    interval = np.array(confidenceinterval(listoferror))
    output = interval.max()
    return output

def mean(list):
    output = statistics.mean(list)
    return output

# add data labels to vis
def labelAdder(name,xset,yset):
    max = 0
    min = 100
    for x,y in zip(xset,yset):
        label = "{:.02f}".format(y)


        for i in range(len(yset)):
            if yset[i] > max:
                max = yset[i]
                if yset[i] < min:
                    min = yset[i]
            elif yset[i] < min:
                min = yset[i]

        if y == max:
            plt.annotate('Top CI: ',
                         (x, y),
                         textcoords="offset points",
                         xytext=(10, 12),
                         ha='left',
                         fontsize=8)
            plt.annotate(label,
                         (x, y),
                         textcoords="offset points",
                         xytext=(10, -2),
                         ha='left',
                         fontsize=10)
        elif y == min:
            plt.annotate('Bottom CI: ',
                         (x, y),
                         textcoords="offset points",
                         xytext=(10, 12),
                         ha='left',
                         fontsize=8)
            plt.annotate(name,
                         (x, y),
                         textcoords="offset points",
                         xytext=(0, -20),
                         ha='center',
                         fontsize=12)
            plt.annotate(label,
                         (x, y),
                         textcoords="offset points",
                         xytext=(10, -2),
                         ha='left',
                         fontsize=10)
        else:
            plt.annotate('Average Error: ',
                         (x, y),
                         textcoords="offset points",
                         xytext=(10, 12),
                         ha='left',
                         fontsize=8)
            plt.annotate(label,
                         (x, y),
                         textcoords="offset points",
                         xytext=(10, -2),
                         ha='left',
                         fontsize=10)

def connectpoints(x,y,p1,p2):
    x1, x2 = x[p1], x[p2]
    y1, y2 = y[p1], y[p2]
    plt.plot([x1,x2],[y1,y2],'-k')

def fullGraph():
    viz1Array = toArray('Visualization', 'viz1')
    viz2Array = toArray('Visualization', 'viz2')
    viz3Array = toArray('Visualization', 'viz3')

    viz1Error = listOfError(viz1Array)
    viz2Error = listOfError(viz2Array)
    viz3Error = listOfError(viz3Array)

    x1 = [1,1,1]
    y1 = [lowerinterval(viz1Error),upperinterval(viz1Error),mean(viz1Error)]
    x2 = [2,2,2]
    y2 = [lowerinterval(viz2Error),upperinterval(viz2Error),mean(viz2Error)]
    x3 = [3,3,3]
    y3 = [lowerinterval(viz3Error),upperinterval(viz3Error),mean(viz3Error)]

    connectpoints(x1, y1, 0, 1)
    connectpoints(x2, y2, 0, 1)
    connectpoints(x3, y3, 0, 1)
    # plt.plot(x1,y1,x2,y2,x3,y3,'ro')
    plt.plot(x1,y1, color='black',marker='o', ms=5)
    plt.plot(x2,y2,  color='black',marker='o', ms=5)
    plt.plot(x3,y3,  color='black',marker='o', ms=5)

    labelAdder('Pie Chart',x1,y1)
    labelAdder('Tree Map',x2,y2)
    labelAdder('Line Bar',x3,y3)

    plt.axes().set_xlim([0.5,3.75])
    plt.axes().set_ylim([0.5,5])
    plt.axes().set_xticks([1,2,3])


    plt.title('Visualization vs Error')
    plt.grid()
    plt.xlabel('Visualization Number')
    plt.ylabel('Error')
    plt.show()
