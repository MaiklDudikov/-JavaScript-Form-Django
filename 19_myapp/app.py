import sqlite3


# Подключаемся к базе данных или создаем ее
connection = sqlite3.connect('database.db')
# Создаем курсор
cursor = connection.cursor()
