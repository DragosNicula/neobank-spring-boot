# NeoBank

A personal banking system built with Spring Boot, designed as a learning project while transitioning from a JavaScript/Vue.js background into Java backend development.

> 🚧 **Work in progress.** This project is being built incrementally, feature by feature, with commits reflecting real development progress. See [Roadmap](#roadmap) below for current status.

## About

NeoBank simulates the core operations of a digital bank: user registration, account management (including joint accounts), and transactions (deposits, withdrawals, transfers). It's built to demonstrate solid backend architecture — clean separation between layers, correct use of JPA relationships, and transactional integrity for financial operations.

## Tech Stack

**Backend**
- Java 17
- Spring Boot 4.1
- Spring Data JPA / Hibernate
- Spring Security *(planned)*
- H2 Database (development)
- Gradle
- Lombok

**Frontend** *(planned)*
- React.js

## Key Features

- **User registration** with automatic default account creation (RON), wrapped in a single atomic transaction
- **Joint accounts** — a many-to-many relationship between users and accounts, allowing multiple users to share one account
- **Password validation** via regex (minimum length, uppercase, digit, special character)
- **Transaction processing** — deposits, withdrawals, and transfers, with balance validation and `@Transactional` rollback safety
- **Custom exception handling** for business rule violations (duplicate usernames, insufficient funds, invalid amounts)
- **Auto-generated IBANs**, currency-specific (RON/EUR/USD)

## Architecture

The project follows a standard layered architecture:

```
Controller  → handles HTTP requests/responses only
Service     → business logic, validation, orchestration
Repository  → data access (Spring Data JPA)
Model       → JPA entities
Exception   → custom business exceptions
```

A dedicated `RegistrationService` orchestrates the user + account creation flow, keeping `UserService` and `AccountService` independent and focused on their own domains.

## Data Model

- **User** ←1:1→ **Address** (shared primary key via `@MapsId`)
- **User** ←M:N→ **Account** (join table, supports joint accounts)
- **Account** ←1:N→ **Transaction** *(in progress)*
- **Transaction** has a `TransactionType` enum (`DEPOSIT`, `WITHDRAWAL`, `TRANSFER`)

## Roadmap

- [x] Project setup & entity modeling
- [x] JPA entities with relationships (OneToOne, ManyToMany)
- [x] Repository layer
- [x] Service layer (User, Account, Transaction, Registration)
- [x] `@Transactional` for financial operations
- [ ] Controller layer (REST endpoints) — *in progress*
- [ ] Manual API testing (Postman)
- [ ] Spring Security + JWT authentication
- [ ] Exception handling via `@ControllerAdvice`
- [ ] DTOs and input validation
- [ ] Vue.js frontend
- [ ] Unit tests (JUnit/Mockito)
- [ ] Docker

## Running the Project

```bash
cd backend
./gradlew bootRun
```

The application will start on `http://localhost:8080`. H2 console (when enabled) is available at `/h2-console`.

## Author

Built by [Dragos Nicula](https://github.com/DragosNicula) as part of a career transition from JavaScript/React.js to Java/Spring Boot backend development.
