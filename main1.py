import sys
import pandas as pd
import mysql.connector as dba
import csv
import os
input_data = sys.argv[1].split(",")

if input_data[0] == "isSignedIn":
    try:
        if os.path.isfile('details.csv'):
            print("true")
    except:
        print("false")

elif input_data[0] == "login":
    userID = input_data[1]
    password = input_data[2]
    QUERY = 'SELECT * FROM username WHERE user = userID'
    db = dba.connect(host="database-1.cbokszrbjxyr.ap-south-1.rds.amazonaws.com", user='admin', passwd='tecnis15665',
                     database="students")
    mycursor = db.cursor()
    mycursor.execute(QUERY)
    value=mycursor.rowcount

    if value > 0:
        valid = userID



    if userID == valid:
        print("true")
        d = 'SELECT * FROM details WHERE user=userID'

        df = pd.read_sql(d, db)
        df.to_csv('details.csv')



    else:
            print("false")