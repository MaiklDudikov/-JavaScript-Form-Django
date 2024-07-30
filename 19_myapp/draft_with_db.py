import sqlite3

# Открытие соединения и выполнение операций в контексте менеджера
with sqlite3.connect('example.db') as conn:
    # Создаем курсор для выполнения SQL-запросов
    cursor = conn.cursor()

    # Пример создания таблицы
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY,
            name TEXT,
            age INTEGER
        )
    ''')

    # Пример вставки данных
    cursor.execute('''
        INSERT INTO users (name, age) VALUES (?, ?)
    ''', ('Alice', 25))

    # Пример выборки данных
    cursor.execute('SELECT * FROM users')
    rows = cursor.fetchall()
    for row in rows:
        print(row)

# Когда выполнение блока with завершено:
# - соединение автоматически закрывается
# - изменения автоматически фиксируются, если не возникло исключений
# - в случае исключения происходит откат (rollback) транзакции
