from flask import Flask, render_template, request, redirect, flash, session, url_for
import sqlite3

app = Flask(__name__)
app.secret_key = 'your_secret_key'  # Замените на ваш секретный ключ


# Функция для соединения с базой данных
def get_db_connection():
    conn = sqlite3.connect('database.db')
    conn.row_factory = sqlite3.Row  # Позволяет использовать названия столбцов
    return conn


# Создание таблицы пользователей
def create_user_table():
    conn = get_db_connection()
    conn.execute('''
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL
        )
    ''')
    conn.commit()
    conn.close()


# Главная страница
@app.route('/')
def index():
    return 'Добро пожаловать в приложение Flask! <a href="/register">Register</a> | <a href="/login">Login</a>'


# Регистрация
@app.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']

        # Хеширование пароля
        # hashed_password = generate_password_hash(password, method='sha256')

        try:
            conn = get_db_connection()
            conn.execute('INSERT INTO users (username, password) VALUES (?, ?)',
                         (username, password))  # hashed_password
            conn.commit()
            conn.close()
            flash('Регистрация прошла успешно! Пожалуйста, войдите.', 'success')
            return redirect('/login')
        except sqlite3.IntegrityError:
            flash('Имя пользователя уже занято. Пожалуйста, выберите другой', 'danger')
            return render_template('register.html')

    return render_template('register.html')


# Вход
@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']

        conn = get_db_connection()
        user = conn.execute('SELECT * FROM users WHERE username = ?', (username,)).fetchone()
        conn.close()

        # and check_password_hash
        if user(user['password'], password):
            session['user_id'] = user['id']
            session['username'] = user['username']
            flash('Авторизация успешна!', 'success')
            return redirect('/profile')
        else:
            flash('Неверные учетные данные. Пожалуйста, попробуйте еще раз.', 'danger')

    return render_template('login.html')


@app.route('/profile')
def profile():
    if 'user_id' in session:
        username = session.get('username')
        return render_template('profile.html', username=username)
    else:
        flash('Вы не авторизованы!', 'danger')
        return redirect('/login')


# Выход
@app.route('/logout')
def logout():
    session.clear()
    flash('Вы вышли из системы.', 'success')
    return redirect('/')


if __name__ == '__main__':
    create_user_table()
    app.run(debug=True)
