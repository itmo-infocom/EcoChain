from mysql.connector import (connection)

class DBConnection:

	def __init__(self):
		self.connection = None
		self.cursor = None
		self.user 	= 'guest'
		self.password = 'a s d f'
		self.host 	=	'127.0.0.1'
		self.database = 'DApp' 
		self.connect()
		# make a database connection when the class is instantiated
		# this way only one connection will be made and all the interaction with the database will be handled by single connection
		# we dont have to connect database everytime a query is to be executed
		

	def connect(self):
		self.connection = connection.MySQLConnection(user=self.user, password=self.password,host=self.host,database=self.database)
		self.cursor = self.connection.cursor()

	def checkAccount(self,accountNo):
		# this method checks if user is in the database or not
		# And also checks if user has valid amount of balance in his / her wallet or not
		
		query = ("Select user_balance from Users where user_account='"+accountNo+"'")
		self.cursor.execute(query)
		test = self.cursor.fetchone()
		return str(test[0])

# conObj = DBConnection()

# conObj.authenticate("0x2910543af39aba0cd09dbb2d50200b3e800a63d2")