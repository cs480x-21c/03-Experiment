import pandas as pd
import copy

def getColsMarksNumSets(chartNum):
    numSets = (chartNum // 10) + 1
    numSets *= 2
    cols = []
    mark = []
    if (chartNum < 10) :
        cols = [2 * chartNum, 2 * chartNum + 1]
        mark = copy.copy(cols)

    elif (chartNum < 20) :
        i = chartNum - 10
        cols = [20 + 4 * i, 21 + 4 * i, 22 + 4 * i, 23 + 4 * i]
        mark = [20 + 4 * i + chartNum % 3, 23 + 4 * i]

    else :
        i = chartNum - 20
        cols = [60 + 6 * i, 61 + 6 * i, 62 + 6 * i, 63 + 6 * i, 64 + 6 * i, 65 + 6 * i]
        mark = [60 + 6 * i + chartNum % 5, 65 + 6 * i]

    return [cols,mark, numSets, chartNum % 8 + 2]

def getAnswers(filename):
    df = pd.read_csv(filename)
    data = []
    for i in range(30):
        ab = ""
        colsMarks = getColsMarksNumSets(i)
        marks = colsMarks[1]
        xTick = colsMarks[3]
        val1 = df.iloc[xTick-1][marks[0]]
        val2 = df.iloc[xTick-1][marks[1]]
        if val1 > val2 :
            ab = "A"
        else:
            ab = "B"
        percent = min(val1, val2) / max(val1, val2)
        # print(marks, xTick, val1, val2, ab, percent)
        data.append([i, ab,percent])

    answers = pd.DataFrame(data, columns=['ChartNum', 'higherDataset', 'percent'])
    answers.to_csv('answers.csv')

    df1 = pd.read_csv('answers.csv')
    print(df1)

    return ""

getAnswers("public/csv/trialValuesSine.csv")