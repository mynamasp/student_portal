import sys
import pandas as pd
import mysql.connector as dba
import os
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
    db = dba.connect(host = "remotemysql.com",
        user = "JtURNtxFwv",
        password = "VNmsknSD7o",
        database = "JtURNtxFwv")
    mycursor = db.cursor()
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
    print("Prasanna;12;A;Red;Chemistry;Surface Chemistry;Assignment;4 Days Left;Chemistry;P-Block Element;Assignment;4 Days Left;Physics;Alternating Current;Assignment;2 Days left;Maths;Linear Programing;Assignment;1 Day Left;Biology;Evolution;Assignment;1 Day left;Chemistry;P-Block Element;40 Marks;11-30-2020")

elif input_data[0] == "loadTestData":
    print("Chemistry;The Exam is of three hours duration;There are of total of 25 questions for 75 Marks;There are three sections to be attempted;No negative Marking;75;20;180;adffF;Fsdfsdf;SDF;DSfSDF;sdfSDFdwsf;dsfSDFsdaf;DFDFdfDF;FddfSDFdsa;DSAFsfDF;dfSDAFddfSF;dfSDAFddfSF;dfSDAFddfSF;dfSDAFddfSF;dfSDAFddfSF;dfSDAFddfSF;dfSDAFddfSF;dfSDAFddfSF;dfSDAFddfSF;dfSDAFddfSF;dfSDAFddfSF;dfSDAFddfSF;dfSDAFddfSF;dfSDAFddfSF;dfSDAFddfSF;grseger;answer;answer;answer;answer;answer;answer;answer;answer;answer;answer;answer;answer;answer;answer;answer;answer;answer;answer;answer;answer;answer;answer;answer;answer;answer;answer;answer;answer;answer;answer;answer;answer;answer;answer;answer;answer;answer;answer;answer;answer;answer;answer;answer;answer;answer;answer;answer;answer;answer;answer;answer;answer;answer;answer;answer;answer;answer;answer;answer;answer;answer;answer;answer;answer;answer;answer;answer;answer;answer;answer;answer;answer;answer;answer;answer;")

elif input_data[0] == "testAnswers":
    print("true")
elif input_data[0] == "loadResultData":
    print("Chemistry;20;56;80;adffF;Fsdfsdf;SDF;DSfSDF;sdfSDFdwsf;dsfSDFsdaf;DFDFdfDF;FddfSDFdsa;DSAFsfDF;dfSDAFddfSF;dfSDAFddfSF;dfSDAFddfSF;dfSDAFddfSF;dfSDAFddfSF;dfSDAFddfSF;dfSDAFddfSF;dfSDAFddfSF;dfSDAFddfSF;dfSDAFddfSF;dfSDAFddfSF;dfSDAFddfSF;dfSDAFddfSF;dfSDAFddfSF;dfSDAFddfSF;grseger;answer;answer;answer;answer;answer;answer;answer;answer;answer;answer;answer;answer;answer;answer;answer;answer;answer;answer;answer;answer;answer;answer;answer;answer;answer;answer;answer;answer;answer;answer;answer;answer;answer;answer;answer;answer;answer;answer;answer;answer;answer;answer;answer;answer;answer;answer;answer;answer;answer;answer;answer;answer;answer;answer;answer;answer;answer;answer;answer;answer;answer;answer;answer;answer;answer;answer;answer;answer;answer;answer;answer;answer;answer;answer;answer23;1A;null;3B")
else:
    print("python out: "+input_data[0])