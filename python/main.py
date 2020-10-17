import sys
import pandas as pd
import mysql.connector as dba
import csv
import os
input_data = sys.argv[1].split(",")

if input_data[0] == "isSignedIn":
    if os.path.isfile('details.csv'):
        print("true")
    else:
        print("false")

elif input_data[0] == "logIn":
    userID = input_data[1]
    password = input_data[2]
    QUERY = "SELECT * FROM username WHERE user = '"+userID+"' and pwd = '"+password+"'"
    db = dba.connect(host="database-1.cbokszrbjxyr.ap-south-1.rds.amazonaws.com", user='admin', passwd='tecnis15665',
                     database="students")
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
    print("homeinfo")


else:
    print("python out: "+input_data[0])