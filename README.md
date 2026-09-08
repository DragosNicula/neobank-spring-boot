NeoBank

A personal banking system built with Spring Boot and a React/TypeScript frontend, built as a portfolio project while transitioning from a JavaScript/Vue.js background into Java full-stack development.

About

NeoBank simulates the core operations of a digital bank: user registration, account management (including joint accounts), transactions (deposits, withdrawals, transfers), and transaction history. It's built to demonstrate solid backend architecture — clean separation between layers, correct use of JPA relationships, and transactional integrity for financial operations — paired with a fully functional, styled frontend consuming the secured API.

Tech Stack

Backend

Java 17
Spring Boot 4.1
Spring Data JPA / Hibernate
Spring Security + JWT authentication
H2 Database
Gradle
Lombok

Frontend

React + TypeScript
React Router
Tailwind CSS
Axios
Key Features
User registration with automatic default account creation (RON), wrapped in a single atomic transaction, plus password validation via regex (minimum length, uppercase, digit, special character)
JWT authentication — hashed passwords (BCrypt), a login endpoint issuing tokens, and a custom OncePerRequestFilter validating tokens and securing protected endpoints
Joint accounts — a many-to-many relationship between users and accounts, allowing multiple users to share one account
Auto-generated IBANs, currency-specific (RON/EUR/USD)
Transaction processing — deposits, withdrawals, and transfers identified by IBAN, with balance validation, currency automatically derived from the source account, and @Transactional rollback safety
Transaction history — a custom JPQL query returning all transactions (as source or destination) for the authenticated user's accounts, sorted chronologically
DTOs everywhere — request/response DTOs decouple the API from JPA entities and avoid exposing sensitive fields
Centralized exception handling via @RestControllerAdvice, mapping business-rule violations (duplicate usernames, insufficient funds, invalid IBANs) to clean, structured HTTP error responses
Full frontend — routing, a reusable component library (inputs, buttons, cards, toggle), a React Context–based auth flow (login/logout reactively updating the navbar), protected routes, and a user profile page with account overview and transaction history
Architecture

The backend follows a standard layered architecture:

Controller  → handles HTTP requests/responses only
Service     → business logic, validation, orchestration
Repository  → data access (Spring Data JPA)
Model       → JPA entities
DTO         → request/response shapes exposed to the client
Exception   → custom business exceptions + global handler

Dedicated orchestration services (RegistrationService, AssignService) coordinate multi-entity operations — for example, registering a user and creating their default account — while keeping UserService and AccountService independent and focused on their own domains.

The frontend mirrors this separation: pages/ for routed screens, components/ for reusable UI pieces, services/ for API calls, types/ for TypeScript interfaces, and context/ for shared authentication state.

Data Model
User ←1:1→ Address (shared primary key via @MapsId)
User ←M:N→ Account (join table, supports joint accounts)
Transaction references accounts by IBAN (sourceAccount, destinationAccount), with a TransactionType enum (DEPOSIT, WITHDRAWAL, TRANSFER)
Roadmap
 Project setup & entity modeling
 JPA entities with relationships (OneToOne, ManyToMany)
 Repository, Service, and Controller layers
 @Transactional for financial operations
 Manual API testing (Postman)
 Spring Security + JWT authentication
 DTOs and input validation
 Exception handling via @ControllerAdvice
 React + TypeScript frontend
 Transaction history
 Full UI styling with Tailwind CSS
 End-to-end verification pass
 Deployment (live demo link)
 Unit tests (JUnit/Mockito)
 Docker
Running the Project

Backend

bash
cd backend
./gradlew bootRun

The API runs on http://localhost:8080. H2 console is available at /h2-console.

Frontend

bash
cd frontend
npm install
npm run dev

The app runs on http://localhost:5173.

For a quick test without registering, use the demo account: admin / Test123@

Author

Built by Dragos Nicula as part of a career transition from JavaScript/Vue.js/React.js to Java/Spring Boot full-stack development.
