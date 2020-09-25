import csv
import sys
import mysql.connector as dba
import pandas as pd

input_data = sys.argv[1]
a=input_data.split(',')
login = False
if a[0] == "isSignedIn":
    #check if valid csv file exist
    print("true")
    while login == False:
        data = []
        with open("login.csv") as b:
            reader = csv.reader(b)
            for row in reader:
                data.append(row)

        user= a[1]
        pwd= a[2]

        col1=[x[1] for x in data]
        col2=[x[2] for x in data]

        if user in col1:

            for k in range(0,len(col1)):
                if col1[k] == user and col2[k] == pwd:
                    print('true')
                    login = True

elif a[0] == "logIn":

    QUERY = 'SELECT * FROM username'
    db = dba.connect(host="database-1.cbokszrbjxyr.ap-south-1.rds.amazonaws.com", user='admin', passwd='tecnis15665',
                     database="students")

    df = pd.read_sql(QUERY, db)

    # print df.head()

    # Export to CSV
    df.to_csv('login.csv', index=False)
    print('Done')

    while login == False:
        data = []
        with open("login.csv") as b:
            reader = csv.reader(b)
            for row in reader:
                data.append(row)

        user= a[1]
        pwd= a[2]

        col1=[x[1] for x in data]
        col2=[x[2] for x in data]

        if user in col1:

            for k in range(0,len(col1)):
                if col1[k] == user and col2[k] == pwd:
                    print('true')
                    login = True