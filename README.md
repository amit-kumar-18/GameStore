# 🎮 GameStore

A full-stack web application to manage video games and genres, built using **ASP.NET Core 8 Web API**, **Entity Framework Core**, and **Angular 17** with SQLite database.

---

## 🌟 Features

### 🖼️ Frontend (Angular)

- Responsive Angular UI
- Form to add/update games
- Genre dropdown populated from API
- Image support via file upload
- Integrated proxy for seamless dev experience

### Backend (ASP.NET Core API)

- Full CRUD support for `Games`
- SQLite via Entity Framework Core
- Global error handling middleware
- Auto-migration at startup
- Entity validation and DTO mapping

---

## 📁 Tech Stack

| Layer     | Tech Used                      |
| --------- | ------------------------------ |
| Frontend  | Angular 19                     |
| Backend   | ASP.NET Core 8                 |
| ORM       | Entity Framework Core 8        |
| Database  | SQLite                         |
| Styling   | Angular Material & TailwindCSS |
| Dev Tools | Bash script for prod build     |

---

## 🚀 Getting Started

### 📦 Prerequisites

- [.NET 8 SDK](https://dotnet.microsoft.com/en-us/download/dotnet/8.0)
- [Node.js](https://nodejs.org/)
- Angular CLI:
  ```bash
  npm install -g @angular/cli
  ```

### 🧪 Development Mode

To run both the frontend and backend simultaneously:

1.  **Clone the repository:**

    Bash

    ```
    git clone https://github.com/amit-kumar-18/GameStore.git
    cd GameStore
    ```

2.  **Install Angular dependencies:**

    Bash

    ```
    cd ClientApp
    npm install
    ```

3.  **Run the Angular development server:**
    Bash

    ```
    ng serve
    ```

4.  **In a separate terminal, run the ASP.NET Core API:**
    Bash

    ```
    cd ..
    dotnet run
    ```

    - The Angular app runs at: `http://localhost:4200`

    - The API runs at: `http://localhost:5094`

    - A proxy is configured in `proxy.conf.json` for: `/games`, `/genre`, and `/images`.

### 📦 Production Build

A custom shell script automates the production build and publishing process.

▶️ **Run the script:**

Bash

```
./prod-build.sh
```

🔧 **What it does:**

- Runs `ng build --configuration production`

- Cleans and copies the build to `wwwroot/`

- Publishes the ASP.NET Core project to `./publish/`

▶️ **Run the production build:**

Bash

```
cd publish
dotnet GameStore.Api.dll
```

🟢 The production UI will be available at: `http://localhost:5000`.

---

## 🔄 API Endpoints

| Method   | Route         | Description       |
| -------- | ------------- | ----------------- |
| `GET`    | `/games`      | Get all games     |
| `GET`    | `/games/{id}` | Get game by ID    |
| `POST`   | `/games`      | Create a new game |
| `PUT`    | `/games/{id}` | Update a game     |
| `DELETE` | `/games/{id}` | Delete a game     |
| `GET`    | `/genre`      | Get all genres    |

---

## ⚖️ License

This project is open-source under the MIT License. Use it freely in your personal or commercial projects.

## 🙋‍♂️ Author

Made with ❤️ by Amit Kumar
