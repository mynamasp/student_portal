# Importing modules
import sys
import pandas as pd
import mysql.connector as msqlcon
import os
import csv
import datetime

# Setting encoding type for IPC
sys.stdout.reconfigure(encoding='utf-8')

# Connecting to MySQL database
db = msqlcon.connect(host="remotemysql.com",
                     user="JtURNtxFwv",
                     password="VNmsknSD7o",
                     database="JtURNtxFwv")

mycursor = db.cursor()
studentDetails = []
# Csv file name
filename = "details.csv"

# Initializing the titles and rows list
fields = []
rows = []

# Checking if a csv file containing login credentials already exists
if os.path.isfile('details.csv'):
    with open(filename, 'r') as csvfile:
        # Creating a csv reader object
        csvreader = csv.reader(csvfile)

        # Extracting field names through first row
        fields = next(csvreader)

        # Extracting each data row one by one
        for row in csvreader:
            rows.append(row)

    # Importing user credentials to python
    a = rows[0]
    username = a[1]

    # Quering database for student details
    query = "select * from studentDetails where username = '" + username + "'"
    mycursor.execute(query)
    output = mycursor.fetchall()

    studentDetails = output[0]

    # Importing studdent details to python
    stName = studentDetails[1]
    stClass = str(studentDetails[2])
    stSection = studentDetails[3]
    stHouse = studentDetails[4]

    # Querying database for assingnments assigned to students
    query = "select * from assignments where class = '" + stClass + stSection + "' ORDER BY `assignments`.`Due_date` ASC"
    mycursor.execute(query)
    output = mycursor.fetchall()

    # Importing nect 5 upcoming tests/assignments
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

    stWorkDaysleft1 = str((work1[5] - today).days) + " Days Left"
    stWorkDaysleft2 = str((work2[5] - today).days) + " Days Left"
    stWorkDaysleft3 = str((work3[5] - today).days) + " Days Left"
    stWorkDaysleft4 = str((work4[5] - today).days) + " Days Left"
    stWorkDaysleft5 = str((work5[5] - today).days) + " Days Left"

    # Quering database for nearest upcoming test
    query = "select * from assignments where class = '" + stClass + stSection + "' and type = 'Test' ORDER BY 'Due_date'"
    mycursor.execute(query)
    output = mycursor.fetchall()
    ntTest = output[0]

    # Importing nearest test details to python
    ntTestSubject = ntTest[2]
    ntTestTopic = ntTest[1]
    ntTestMarks = str(ntTest[6])
    ntTestDate = str(ntTest[5])

    # Quering database for announcements
    query = "select * from announcements"
    mycursor.execute(query)
    output = mycursor.fetchall()

    # Importing announcement details into python
    anoun1title = output[0][0]
    anoun1body = output[0][1]
    anoun2title = output[1][0]
    anoun2body = output[1][1]
    anoun3title = output[2][0]
    anoun3body = output[2][1]
    anoun4title = output[3][0]
    anoun4body = output[3][1]
    anoun5title = output[4][0]
    anoun5body = output[4][1]

# Reading command sent via IPC from JavaScript
input_data = sys.argv[1].split(";")

# Checking if the user had already signed in
if input_data[0] == "isSignedIn":
    # Checking if the file already exists
    if os.path.isfile('details.csv'):
        print("true")
    else:
        print("false")

# Verifying user login credentials
elif input_data[0] == "logIn":
    userID = input_data[1]
    password = input_data[2]
    # Authenticating user input with the database
    QUERY = "SELECT * FROM username WHERE user = '" + userID + "' and password = '" + password + "'"

    mycursor.execute(QUERY)
    value = []
    for x in mycursor:
        value.append(x)

    # Checking if the number of rows returned is non-zero
    if len(value) > 0:
        print("true")
        d = "SELECT * FROM username WHERE user= '" + userID + "'"
        df = pd.read_sql(d, db)
        # Storing values returned from database to a local csv file
        df.to_csv('details.csv')

    else:
        print("false")

# Sending homepage details to JavaScript
elif input_data[0] == "getHomeInfo":

    javascriptOut = stName + ";" + stClass + ";" + stSection + ";" + stHouse + ";" + stWorkSubject1 + ";" + stWorkTopic1 + ";" + stWorkType1 + ";" + stWorkDaysleft1 + ";" + stWorkSubject2 + ";" + stWorkTopic2 + ";" + stWorkType2 + ";" + stWorkDaysleft2 + ";" + stWorkSubject3 + ";" + stWorkTopic3 + ";" + stWorkType3 + ";" + stWorkDaysleft3 + ";" + stWorkSubject4 + ";" + stWorkTopic4 + ";" + stWorkType4 + ";" + stWorkDaysleft4 + ";" + stWorkSubject5 + ";" + stWorkTopic5 + ";" + stWorkType5 + ";" + stWorkDaysleft5 + ";" + ntTestSubject + ";" + ntTestTopic + ";" + ntTestMarks + ";" + ntTestDate + ";" + anoun1title + ";" + anoun1body + ";" + anoun2title + ";" + anoun2body + ";" + anoun3title + ";" + anoun3body + ";" + anoun4title + ";" + anoun4body + ";" + anoun5title + ";" + anoun5body

    print(javascriptOut)

elif input_data[0] == "loaddata1":
    name = open("temp.dat", "w")  # Opens file temp.dat and gets ready to write to it
    assignment = stWorkCode1  # Asks user for text in code
    name.write(assignment)  # Writes contents in file to temp.dat
    name.close()  # Closes file
    print("true")


elif input_data[0] == "loaddata2":
    name = open("temp.dat", "w")
    assignment = stWorkCode2
    name.write(assignment)
    name.close()
    print("true")

elif input_data[0] == "loaddata3":
    name = open("temp.dat", "w")
    assignment = stWorkCode3
    name.write(assignment)
    name.close()
    print("true")

elif input_data[0] == "loaddata4":
    name = open("temp.dat", "w")
    assignment = stWorkCode4
    name.write(assignment)
    name.close()
    print("true")

elif input_data[0] == "loaddata5":
    name = open("temp.dat", "w")
    assignment = stWorkCode5
    name.write(assignment)
    name.close()
    print("true")

# Importing test data from database and sending it to frontend
elif input_data[0] == "loadTestData":

    open1 = open("temp.dat", "r")  # Opens file to read it
    testcode = str(open1.read())  # Reads whatever is in the text file
    query = "SELECT * FROM `" + testcode + "`"

    mycursor.execute(query)
    output = mycursor.fetchall()
    testData = ()

    for j in range(0, len(output)):
        testData += output[j]

    a = 2
    skip = 1
    b = 1
    c = 6

    #Querying database for questions & answers for tests with the test code extracted from temp.dat
    query = "SELECT * FROM assignments WHERE code = " + str(testcode)
    mycursor.execute(query)
    output = mycursor.fetchall()
    output = output[0]
    testSubject = output[2]
    testMarks = str(output[-3])
    testDuration = str(output[-2])
    noOfQues = str(output[-1])
    javascriptOut = testSubject + ";" + "The Exam is of three hours duration;There are of total of 25 questions for 75 Marks;There are three sections to be attempted;No negative Marking;" + testMarks + ";" + noOfQues + ";" + testDuration + ";"

    while b < len(testData):
        javascriptOut += testData[b] + ";"
        print(b)
        b += 7
    while a < len(testData):
        javascriptOut += str(testData[a]) + ";"
        if skip >= 4:
            a += 4
            skip = 1
            continue
        a += 1
        skip += 1

    out = javascriptOut.split(";")
    del (out[-1])
    print(str(out))

    # Writing temp data of test data to test.dat
    name = open("test.dat", "w", encoding="utf-8")
    file = str(javascriptOut.split(";"))
    name.write(file)
    name.close()

# Loading answers from ans.dat file
elif input_data[0] == "testAnswers":
    name = open("ans.dat", "w")  # Opens file ans.dat and gets ready to write to it
    ans = str(input_data[1:-1])  # Asks user for text in code
    name.write(ans)  # Writes contents in file to ans.dat
    name.close()

    print("true")

# Loads the test answers and calculates marks and sends it back to frontend
elif input_data[0] == "loadResultData":
    open1 = open("temp.dat", "r")  # opens file to read it
    testcode = str(open1.read())  # reads whatever is in the text file

    # Queries database for test answers
    query = "SELECT * FROM `" + testcode + "`"

    mycursor.execute(query)
    output = mycursor.fetchall()
    testData = ()

    for j in range(0, len(output)):
        testData += output[j]

    # Opens file containing the users answers
    open1 = open("ans.dat", "r")  # opens file to read it
    anstemp = eval(open1.read())  # reads whatever is in the text file

    query = "SELECT ans FROM `" + testcode + "`"
    mycursor.execute(query)

    output = mycursor.fetchall()

    query = "SELECT * FROM assignments WHERE code = " + str(testcode)
    mycursor.execute(query)

    output2 = mycursor.fetchall()

    output2 = output2[0]

    testSubject = output2[2]
    testMarks = str(output2[-3])
    noOfQues = str(output2[-1])

    # Computing the mark
    ans = []
    ansLength = int(noOfQues)
    ans = anstemp[0:ansLength]

    correctAnstemp1 = []
    correctAnstemp2 = []
    correctAns = []

    numOfCorrectAns = 0

    for h in range(0, len(output)):
        correctAnstemp1.append(output[h][0])
        h += 1

    for e in range(1, len(output) + 1):
        correctAnstemp2.append(e)

    for d in range(0, len(correctAnstemp2)):
        correctAns.append(str(correctAnstemp2[d]) + correctAnstemp1[d])

    for c in ans:
        if c in correctAns:
            numOfCorrectAns += 1

    prologue = [testSubject, noOfQues, numOfCorrectAns, noOfQues]

    open1 = open("test.dat", "r", encoding="utf-8")  # opens file to read it
    testQues = eval(open1.read())

    del (testQues[1:5])
    del (testQues[3])
    del (testQues[-1])
    testQues.insert(2, str(numOfCorrectAns))

    print(testQues + ans + correctAns)


# Signs out the user and deletes the file cotaining the user credentials
elif input_data[0] == "signOut":
    os.remove('details.csv')
    print("true")

else:
    print("python out: " + input_data[0])
