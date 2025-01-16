# KhatraEvents - Project Requirements Specification

## Project Overview
KhatraEvents is a web-based event management and ticket selling platform for Nepal. The term "khatra" means amazing/mind-blowing in Nepali slang, reflecting the platform's focus on exceptional events.

## System Architecture
- **Frontend**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS + Shadcn UI
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: Custom email/password (Phase 1), Social logins (Phase 2)
- **Email Service**: To be determined
- **Hosting**: To be determined

## Development Phases

### Phase 1 (Current Focus)

#### User Features
1. **Authentication**
   - Custom email/password registration and login
   - Password reset functionality
   - User profile management

2. **Event Discovery**
   - Browse events by category
   - Search functionality with filters
   - Event details view
   - Featured events on landing page
   - Past events archive

3. **Ticket Purchasing**
   - Multiple ticket tiers (VIP, Regular, etc.)
   - Unique ticket ID generation
   - QR code-based payment system
   - Payment verification process
   - Email ticket delivery

4. **User Dashboard**
   - View purchased tickets
   - Ticket purchase history
   - Event bookmarks
   - Profile settings

#### Admin Features
1. **Event Management**
   - Create and edit events
   - Upload event banner images
   - Upload payment QR codes
   - Set ticket tiers and pricing
   - Event status management

2. **Ticket Management**
   - View ticket sales
   - Verify payments
   - Process refunds
   - Generate ticket reports

3. **Content Management**
   - Manage event categories
   - Feature/unfeature events
   - Edit event details
   - Manage event status

4. **User Management**
   - View user list
   - User activity monitoring
   - Basic analytics

### Phase 2 (Future Development)

1. **Organizer Features**
   - Organizer dashboard
   - Direct event creation
   - Sales analytics
   - Ticket management
   - Payment integration

2. **Enhanced Authentication**
   - Social login integration
   - Two-factor authentication
   - Role-based access control

3. **Advanced Features**
   - Direct payment gateway integration
   - Mobile app development
   - Advanced analytics
   - API access for partners

## Technical Requirements

### Database Schema Requirements
1. **Users**
   - Basic info (name, email, phone)
   - Authentication details
   - Role management

2. **Events**
   - Event details
   - Category association
   - Ticket tier information
   - Status tracking
   - Media storage

3. **Tickets**
   - Unique identification
   - Payment status
   - Verification status
   - User association
   - Event association

4. **Reviews & Ratings**
   - User reviews
   - Event ratings
   - Review moderation

### API Requirements
1. **Authentication Endpoints**
   - Registration
   - Login
   - Password reset
   - Session management

2. **Event Endpoints**
   - CRUD operations
   - Search and filtering
   - Category management
   - Status updates

3. **Ticket Endpoints**
   - Purchase processing
   - Verification
   - Status updates
   - Payment confirmation

4. **User Endpoints**
   - Profile management
   - Purchase history
   - Review management

### Security Requirements
1. **Authentication**
   - Secure password hashing
   - Session management
   - Rate limiting
   - CSRF protection

2. **Data Protection**
   - Input validation
   - XSS prevention
   - SQL injection prevention
   - Data encryption

3. **Access Control**
   - Role-based permissions
   - Route protection
   - API authentication

### Performance Requirements
1. **Loading Times**
   - Page load under 3 seconds
   - Optimized image loading
   - Efficient database queries
   - Caching implementation

2. **Scalability**
   - Handle concurrent users
   - Optimize database queries
   - implement caching
   - Asset optimization

### Integration Requirements
1. **Email Service**
   - Ticket delivery
   - Payment confirmations
   - Event updates
   - Password reset

2. **File Storage**
   - Event images
   - QR codes
   - Ticket PDFs
   - User uploads

## Development Guidelines
1. **Code Quality**
   - TypeScript for type safety
   - ESLint for code linting
   - Prettier for code formatting
   - Jest for testing

2. **Git Workflow**
   - Feature branch workflow
   - Pull request reviews
   - Semantic versioning
   - Conventional commits

3. **Documentation**
   - API documentation
   - Code comments
   - Setup instructions
   - Deployment guides

## Monitoring and Analytics
1. **Error Tracking**
   - Error logging
   - Performance monitoring
   - User behavior tracking

2. **Analytics**
   - User engagement
   - Ticket sales
   - Event performance
   - Search analytics

## Deployment Requirements
1. **Environment Setup**
   - Development
   - Staging
   - Production

2. **CI/CD Pipeline**
   - Automated testing
   - Build optimization
   - Deployment automation

## Browser Support
- Chrome (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Edge (latest 2 versions)
- Mobile browsers

## Responsive Design
- Mobile-first approach
- Tablet support
- Desktop optimization
- Cross-device testing

---


# KhatraEvents System Flow

```
flowchart TD
    subgraph User["User Flow"]
        A[User Visits Website] --> B{Registered?}
        B -->|No| C[Sign Up]
        B -->|Yes| D[Login]
        C --> D
        D --> E[Browse Events]
        E --> F[Select Event]
        F --> G[Choose Ticket Tier]
        G --> H[Get Payment QR]
        H --> I[Make Payment]
        I --> J[Upload Payment Proof]
        J --> K[Await Verification]
        K -->|Approved| L[Receive Ticket via Email]
        K -->|Rejected| M[Payment Issue Notification]
    end

    subgraph Admin["Admin Flow"]
        AA[Admin Login] --> BB[Dashboard]
        BB --> CC[Event Management]
        BB --> DD[Ticket Management]
        BB --> EE[User Management]
        
        CC --> CC1[Create Event]
        CC --> CC2[Upload Event Details]
        CC --> CC3[Set Ticket Tiers]
        CC --> CC4[Upload Payment QR]
        
        DD --> DD1[View Ticket Orders]
        DD --> DD2[Verify Payments]
        DD --> DD3[Issue Tickets]
        
        EE --> EE1[Manage Users]
        EE --> EE2[View Analytics]
    end

    subgraph System["System Processes"]
        SA[Event Creation] --> SB[Database Storage]
        SB --> SC[Event Publishing]
        
        SD[Payment Verification] --> SE[Ticket Generation]
        SE --> SF[Email Notification]
        
        SG[User Activity] --> SH[Analytics Processing]
        SH --> SI[Reports Generation]
    end

    subgraph External["External Services"]
        EA[Email Service]
        EB[File Storage]
        EC[Analytics Service]
    end

    %%Connections between subgraphs 
    L --> EA
    CC2 --> EB
    SH --> EC
    DD2 --> SD
    CC1 --> SA
```
---

# Ticket Purchase Sequence

```
sequenceDiagram
    actor User
    participant Frontend
    participant Backend
    participant Database
    participant EmailService
    
    User->>Frontend: Select Event
    Frontend->>Backend: Get Event Details
    Backend->>Database: Query Event
    Database-->>Backend: Event Data
    Backend-->>Frontend: Event Details
    
    User->>Frontend: Select Ticket Tier
    Frontend->>Backend: Check Availability
    Backend->>Database: Check Inventory
    Database-->>Backend: Inventory Status
    Backend-->>Frontend: Availability Status
    
    User->>Frontend: Request Purchase
    Frontend->>Backend: Initialize Purchase
    Backend->>Database: Create Pending Order
    Database-->>Backend: Order Created
    Backend-->>Frontend: Show Payment QR
    
    User->>Frontend: Upload Payment Proof
    Frontend->>Backend: Submit Payment Proof
    Backend->>Database: Update Order Status
    
    Note over Backend: Admin Verification Process
    
    Backend->>Database: Update Ticket Status
    Backend->>EmailService: Send Ticket
    EmailService->>User: Deliver Ticket
    
    Backend-->>Frontend: Confirmation
    Frontend-->>User: Success Message
```
---

# Data Flow Architecture

```
flowchart TB
    subgraph Client["Client Layer"]
        direction TB
        C1[Web Browser]
        C2[Mobile Browser]
    end

    subgraph Application["Application Layer"]
        direction TB
        A1[Next.js Server]
        A2[API Routes]
        A3[Server Actions]
        A4[Middleware]
    end

    subgraph Services["Service Layer"]
        direction TB
        S1[Auth Service]
        S2[Event Service]
        S3[Ticket Service]
        S4[User Service]
        S5[Email Service]
    end

    subgraph Data["Data Layer"]
        direction TB
        D1[(PostgreSQL)]
        D2[File Storage]
        D3[Cache]
    end

    Client <-->|HTTP/HTTPS| Application
    Application <--> Services
    Services <--> Data

    %% Detailed connections
    A1 <--> A2
    A1 <--> A3
    A2 <--> A4
    
    S1 <--> D1
    S2 <--> D1
    S3 <--> D1
    S4 <--> D1
    
    S2 <--> D2
    S3 <--> D2
```
---
