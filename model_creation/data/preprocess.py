import re
import codecs
import os
import string
from collections import Counter

os.environ["PYTHONIOENCODING"] = "utf-8"


def readData(filePath):
    file = codecs.open(filePath, 'r', encoding='utf-8', errors='ignore')
    contents = file.read()
    file.close()
    return contents

def writeOutputData(filePath, content):
    file = codecs.open(filePath, 'w', encoding='utf-8', errors='ignore')
    file.write(content)
    file.close()

def removeBreaks(data):
    return re.sub('\s+',' ', data.replace('\r\n',' ').replace('\n',' ').replace('\t',' ').strip())

def preprocess(data):
    return re.sub(r'[^A-Za-z0-9äÄöÖüÜß ]', ' ', data)

def removeNumbers(data):
    return re.sub(r'[ \d+]', ' ', data)

def removeSingleCharacters(data):
    return re.sub(r"\b[a-zA-Z]\b", "", data)
    
def remove_umlaut(string):
    u = 'ü'.encode()
    U = 'Ü'.encode()
    a = 'ä'.encode()
    A = 'Ä'.encode()
    o = 'ö'.encode()
    O = 'Ö'.encode()
    ss = 'ß'.encode()

    string = string.encode()
    string = string.replace(u, b'ue')
    string = string.replace(U, b'Ue')
    string = string.replace(a, b'ae')
    string = string.replace(A, b'Ae')
    string = string.replace(o, b'oe')
    string = string.replace(O, b'Oe')
    string = string.replace(ss, b'ss')

    string = string.decode('utf-8')
    return string

def escape(data):
    return data.replace(',','').replace('"','""')



def clean(data):
    return escape(remove_umlaut(preprocess(removeBreaks(removeNumbers(removeSingleCharacters(data)))))).lower()

trainData = readData("./sherlock.txt")
testData = readData("./sherlock.txt")

cleanedTrainData = clean(trainData)
cleanedTestData = clean(testData)

writeOutputData('ptb.train.txt', cleanedTrainData)
writeOutputData('ptb.valid.txt', cleanedTestData)
