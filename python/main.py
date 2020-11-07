import sys
import pandas as pd
import mysql.connector as msqlcon
import os
import csv
import datetime

sys.stdout.reconfigure(encoding='utf-8')


db = msqlcon.connect(host = "remotemysql.com",
        user = "JtURNtxFwv",
        password = "VNmsknSD7o",
        database = "JtURNtxFwv")

mycursor = db.cursor()
studentDetails = []
    # csv file name
filename = "details.csv"

    # initializing the titles and rows list
fields = []
rows = []

if os.path.isfile('details.csv'):
    with open(filename, 'r') as csvfile:
        # creating a csv reader object
        csvreader = csv.reader(csvfile)

        # extracting field names through first row
        fields = next(csvreader)

        # extracting each data row one by one
        for row in csvreader:
            rows.append(row)

        #  printing first 5 rows
    a = rows[0]
    username = a[1]


    query = "select * from studentDetails where username = '"+username+"'"
    mycursor.execute(query)
    output = mycursor.fetchall()

    studentDetails = output[0]



    stName = studentDetails[1]
    stClass = str(studentDetails[2])
    stSection = studentDetails[3]
    stHouse = studentDetails[4]

    query = "select * from assignments where class = '"+stClass+stSection+"' ORDER BY `assignments`.`Due_date` ASC"
    mycursor.execute(query)
    output = mycursor.fetchall()

    work1 = output[0]
    work2 = output[1]
    work3 = output[2]
    work4 = output[3]
    work5 = output[4]

    stWorkCode1 = str(work1[0])
    stWorkCode2 = str(work2[0])
    stWorkCode3 = str(work3[0])
    stWorkCode4 = str(work4[0])
    stWorkCode5 = str(work5[0])

    stWorkSubject1 = work1[2]
    stWorkSubject2 = work2[2]
    stWorkSubject3 = work3[2]
    stWorkSubject4 = work4[2]
    stWorkSubject5 = work5[2]

    stWorkTopic1 = work1[1]
    stWorkTopic2 = work2[1]
    stWorkTopic3 = work3[1]
    stWorkTopic4 = work4[1]
    stWorkTopic5 = work5[1]

    stWorkType1 = work1[3]
    stWorkType2 = work2[3]
    stWorkType3 = work3[3]
    stWorkType4 = work4[3]
    stWorkType5 = work5[3]

    today = datetime.date.today()

    stWorkDaysleft1 = str((work1[5] - today).days)+ " Days Left"
    stWorkDaysleft2 = str((work2[5] - today).days)+ " Days Left"
    stWorkDaysleft3 = str((work3[5] - today).days)+ " Days Left"
    stWorkDaysleft4 = str((work4[5] - today).days)+ " Days Left"
    stWorkDaysleft5 = str((work5[5] - today).days)+ " Days Left"

    query = "select * from assignments where class = '"+stClass+stSection+"' and type = 'Test' ORDER BY `assignments`.`Due_date` ASC"
    mycursor.execute(query)
    output = mycursor.fetchall()
    ntTest = output[0]


    ntTestSubject = ntTest[2]
    ntTestTopic = ntTest[1]
    ntTestMarks = str(ntTest[6])
    ntTestDate = str(ntTest[5])

input_data = sys.argv[1].split(";")



if input_data[0] == "isSignedIn":
    if os.path.isfile('details.csv'):
        print("true")
    else:
        print("false")

elif input_data[0] == "logIn":
    userID = input_data[1]
    password = input_data[2]
    QUERY = "SELECT * FROM username WHERE user = '"+userID+"' and password = '"+password+"'"
    
    mycursor.execute(QUERY)
    value=[]
    for x in mycursor:
        value.append(x)

    if len(value) > 0:
        print("true")
        d = "SELECT * FROM username WHERE user= '"+userID+"'"
        df = pd.read_sql(d, db)
        df.to_csv('details.csv')

    else:
        print("false")

elif input_data[0] == "getHomeInfo":

    javascriptOut =stName+";"+stClass+";"+stSection+";"+stHouse+";"+stWorkSubject1+";"+stWorkTopic1+";"+stWorkType1+";"+stWorkDaysleft1+";"+stWorkSubject2+";"+stWorkTopic2+";"+stWorkType2+";"+stWorkDaysleft2+";"+stWorkSubject3+";"+stWorkTopic3+";"+stWorkType3+";"+stWorkDaysleft3+";"+stWorkSubject4+";"+stWorkTopic4+";"+stWorkType4+";"+stWorkDaysleft4+";"+stWorkSubject5+";"+stWorkTopic5+";"+stWorkType5+";"+stWorkDaysleft5+";"+ntTestSubject+";"+ntTestTopic+";"+ntTestMarks+";"+ntTestDate

    print(javascriptOut)

elif input_data[0] == "loaddata1":
    name = open("temp.dat", "w") #opens file temp.dat and gets ready to write to it
    assignment =  stWorkCode1#asks user for text in code
    name.write(assignment) #writes contents in file to temp.dat
    name.close() #closes file
    print("true")
   

elif input_data[0] == "loaddata2":
    name = open("temp.dat", "w") 
    assignment =  stWorkCode2
    name.write(assignment) 
    name.close() 
    print("true")

elif input_data[0] == "loaddata3":
    name = open("temp.dat", "w")
    assignment =  stWorkCode3
    name.write(assignment) 
    name.close() 
    print("true")

elif input_data[0] == "loaddata4":
    name = open("temp.dat", "w") 
    assignment =  stWorkCode4
    name.write(assignment) 
    name.close()
    print("true")

elif input_data[0] == "loaddata5":
    name = open("temp.dat", "w")
    assignment =  stWorkCode5
    name.write(assignment)
    name.close()
    print("true")

elif input_data[0] == "loadTestData":
    
    open1 = open("temp.dat", "r")  # opens file to read it
    testcode = str(open1.read())  # reads whatever is in the text file
    query = "SELECT * FROM `"+testcode+"`"
   

    mycursor.execute(query)
    output = mycursor.fetchall()
    testData=()
    for j in range(0,len(output)):
        testData+=output[j]
    

    a=2
    skip = 1
    b=1
    c=6

    query = "SELECT * FROM assignments WHERE code = "+ str(testcode)
    mycursor.execute(query)
    output = mycursor.fetchall()
    output = output[0]
    testSubject = output[2]
    testMarks = str(output[-3])
    testDuration = str(output[-2])
    noOfQues = str(output[-1])
    javascriptOut = testSubject+";"+"The Exam is of three hours duration;There are of total of 25 questions for 75 Marks;There are three sections to be attempted;No negative Marking;"+testMarks+";"+noOfQues+";"+testDuration+";"

    while b<len(testData):
        javascriptOut+=testData[b]+";"
        print(b)
        b+=7
    while a<len(testData):
        javascriptOut += str(testData[a]) + ";"
        if skip >=4:
            a+=4
            skip=1
            continue
        a+=1
        skip += 1

    out = javascriptOut.split(";")
    del(out[-1])
    print(str(out))
    name = open("test.dat", "w", encoding="utf-8")
    file =  str(javascriptOut.split(";"))
    name.write(file)
    name.close()

elif input_data[0] == "testAnswers":
    name = open("ans.dat", "w") #opens file usernames.txt and gets ready to write to it
    ans = str(input_data[1:-1]) #asks user for text in code
    name.write(ans) #writes contents in file to usernames.txt
    name.close()

    print("true")

elif input_data[0] == "loadResultData":
    open1 = open("temp.dat", "r")  # opens file to read it
    testcode = str(open1.read())  # reads whatever is in the text file

    query = "SELECT * FROM `"+testcode+"`"


    mycursor.execute(query)
    output = mycursor.fetchall()
    testData=()
    for j in range(0,len(output)):
        testData+=output[j]
   

    open1 = open("ans.dat", "r")  # opens file to read it
    anstemp = eval(open1.read())  # reads whatever is in the text file


    query = "SELECT ans FROM `"+testcode+"`"
    mycursor.execute(query)

    output = mycursor.fetchall()

    query = "SELECT * FROM assignments WHERE code = "+ str(testcode)
    mycursor.execute(query)

    output2 = mycursor.fetchall()

    output2 = output2[0]

    testSubject = output2[2]
    testMarks = str(output2[-3])
    noOfQues = str(output2[-1])

    ans = []
    ansLength = int(noOfQues)
    ans = anstemp[0:ansLength]

    correctAnstemp1= []
    correctAnstemp2= []
    correctAns = []


    numOfCorrectAns = 0



    for h in range(0,len(output)):
        correctAnstemp1.append(output[h][0])
        h+=1
        
    for e in range(1,len(output)+1):
        correctAnstemp2.append(e)

    for d in range(0,len(correctAnstemp2)):
        correctAns.append(str(correctAnstemp2[d])+correctAnstemp1[d])


    for c in ans:
        if c in correctAns:
            numOfCorrectAns+=1

    prologue = [testSubject,noOfQues,numOfCorrectAns,noOfQues]

    open1 = open("test.dat", "r") #opens file to read it
    testQues =  eval(open1.read())


    del(testQues[1:5])
    del(testQues[3])
    del(testQues[-1])
    testQues.insert(2,str(numOfCorrectAns))


    print(testQues+ans+correctAns)



elif input_data[0] == "signOut":
    os.remove('details.csv')
    print("true")

else:
    print("python out: "+input_data[0])