import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import Heart from "./assort/free-png.ru-2.png"
const App = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/home" element={<HomePage />} />
          <Route path="/" element={<RegistrationForm />} />
        </Routes>
      </div>
    </Router>
  );
};

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({
    username: '',
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Проверка данных перед отправкой на сервер
    let isValid = true;
    const newErrors = {
      username: '',
      email: '',
      password: '',
    };

    if (formData.username.trim() === '') {
      newErrors.username = 'Введите имя пользователя';
      isValid = false;
    }

    if (!formData.email.includes('@')) {
      newErrors.email = 'Введите корректный email';
      isValid = false;
    }

    if (formData.password.length < 6) {
      newErrors.password = 'Пароль должен быть не менее 6 символов';
      isValid = false;
    }

    setErrors(newErrors);

    if (isValid) {
      console.log('Данные для отправки на сервер:', formData);
      navigate('/home'); // Перенаправление на главную страницу
    }
  };

  return (
    <div>
      <h2>Регистрация</h2>
      <h5>Введите данные, необходимые для создания учтеной записи</h5>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Имя пользователя:</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
          {errors.username && <p className="error">{errors.username}</p>}
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          {errors.email && <p className="error">{errors.email}</p>}
        </div>
        <div>
          <label>Пароль:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          {errors.password && <p className="error">{errors.password}</p>}
        </div>
        <button type="submit">Зарегистрироваться</button>
      </form>
    </div>
  );
};

const HomePage = () => {
  return (
    <div>
      <h2>Добро пожаловать на главную страницу!</h2>
      <img src={Heart} alt="" />
    </div>
  );
};

export default App;
