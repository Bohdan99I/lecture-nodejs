# NodeJS starter

## Installation

Run commands

```
cd client
npm install
npm run build
cd ..
npm install
npm start
```

Open [http://localhost:3050](http://localhost:3050)

## Особливості проекту

## Структура проекту

### `/client`

Невеликий React-додаток зі сторінками:

- Реєстрації
- Логіна
- Додавання бійців
- Вибору бійців

**Основна мета**: Демонстрація взаємодії клієнта з сервером.  
**Перегляд запитів**: Вкладка `Network` в Chrome Dev Tools.

### `/config`

Конфігурація БД. База даних реалізована у файлі `database.json`.

### `/middlewares`

Проміжні функції, що виконуються перед контролерами (з папки `routes`).

### `/repositories`

Класи для роботи з БД (патерн **Repository**).  
[Детальніше про патерн Repository](https://docs.microsoft.com/en-us/dotnet/architecture/microservices/microservice-ddd-cqrs-patterns/repository-pattern)

### `/routes`

Контролери (точки входу для запитів).

### `/services`

Класи з бізнес-логікою.  
**Важливо**:

- Контролери мають залишатися "чистими"
- Вся бізнес-логіка реалізується у сервісах

### `/models`

Моделі сутностей (формат зберігання в БД).

### `index.js`

Точка входу та конфігурація сервера.

---
