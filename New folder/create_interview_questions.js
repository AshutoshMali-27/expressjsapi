const { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType } = require('docx');
const fs = require('fs');

const questions = [
  // SECTION 1: C# BASICS
  {
    category: "C# Basics",
    level: "Beginner",
    question: "What is the difference between value types and reference types in C#?",
    answer: "Value types store the actual value in memory (stack) and include: int, float, double, bool, struct, enum. Reference types store a reference to the object in memory (heap) and include: class, interface, delegate, string. When you pass a value type, a copy is created. When you pass a reference type, the reference is copied, so modifications affect the original object."
  },
  {
    category: "C# Basics",
    level: "Beginner",
    question: "What are the differences between class and struct in C#?",
    answer: "Class: Reference type, allocated on heap, supports inheritance, can have parameterless constructor, supports virtual/abstract members, passed by reference. Struct: Value type, allocated on stack (usually), does not support inheritance (except from interfaces), requires explicit parameterless constructor in some versions, does not support virtual/abstract members, passed by value. Use struct for small data structures with immutable behavior."
  },
  {
    category: "C# Basics",
    level: "Beginner",
    question: "What is the difference between == and Equals() in C#?",
    answer: "== is an operator that compares references for reference types and values for value types. Equals() is a method that compares values. For reference types, == checks if both references point to the same object by default, but can be overloaded. Equals() compares the actual values. Example: \"hello\" == \"hello\" returns true (interned strings), but for objects, == checks references unless overloaded."
  },
  {
    category: "C# Basics",
    level: "Beginner",
    question: "What is nullable reference type and nullable value type?",
    answer: "Nullable value type (nullable<T>): Allows value types to have a null value using T?. Example: int? x = null. Nullable reference type (C# 8.0+): Declares that a reference type can be null using string? x = null. Use .HasValue and .Value to check nullable types. Use null-coalescing operator ?? for default values. Helps prevent NullReferenceException."
  },
  {
    category: "C# Basics",
    level: "Beginner",
    question: "Explain access modifiers in C# (public, private, protected, internal, protected internal, private protected).",
    answer: "public: Accessible from anywhere. private: Accessible only within the same class. protected: Accessible within the class and derived classes. internal: Accessible only within the same assembly. protected internal: Accessible within same assembly OR derived classes. private protected: Accessible only within same class or derived classes in the same assembly. Default for class members is private."
  },
  {
    category: "C# Basics",
    level: "Beginner",
    question: "What is boxing and unboxing?",
    answer: "Boxing: Converting a value type to an object (reference type). Example: int x = 5; object obj = x; (implicit boxing). Unboxing: Converting a boxed object back to value type. Example: int y = (int)obj; (requires explicit cast). Boxing creates overhead and can cause performance issues. Use avoid unnecessary boxing/unboxing in performance-critical code. Unboxing to wrong type throws InvalidCastException."
  },
  {
    category: "C# Basics",
    level: "Intermediate",
    question: "What are delegates and how do they work?",
    answer: "Delegates are type-safe function pointers that define the signature of methods they can point to. They are reference types that hold a reference to a method with matching signature. Example: public delegate void MyDelegate(string message); MyDelegate del = Console.WriteLine; del(\"Hello\"); They enable callback functionality, event handling, and functional programming patterns. Action and Func are built-in delegates."
  },
  {
    category: "C# Basics",
    level: "Intermediate",
    question: "What is the difference between Action, Func, and Predicate?",
    answer: "Action<T>: Delegate that returns void, used for side effects. Example: Action<string> action = Console.WriteLine; Func<T, TResult>: Delegate that returns a value. Example: Func<int, int, int> add = (a, b) => a + b; Predicate<T>: Delegate that returns bool, used for filtering/conditions. Example: Predicate<int> isPositive = x => x > 0; Most modern code uses lambda expressions instead of explicit delegates."
  },
  {
    category: "C# Basics",
    level: "Intermediate",
    question: "What are properties and why use them instead of public fields?",
    answer: "Properties provide controlled access to private fields using get/set accessors. They allow encapsulation while providing a public interface. Example: public string Name { get; set; }. Benefits: validation in setter, lazy initialization, change notifications, derived class override, different access levels for get/set (get public, set private). Auto-properties simplify code: public string Name { get; set; } = \"default\"."
  },
  {
    category: "C# Basics",
    level: "Intermediate",
    question: "Explain LINQ and its benefits.",
    answer: "LINQ (Language Integrated Query) provides a unified syntax for querying data from various sources (collections, databases, XML). Two syntaxes: Method syntax: list.Where(x => x > 5).Select(x => x.Name); Query syntax: from x in list where x > 5 select x.Name; Benefits: type-safe, IntelliSense support, composition, lazy evaluation (deferred execution), readable, single syntax for multiple data sources. LINQ providers: LINQ to Objects, Entity Framework, LINQ to SQL."
  },

  // SECTION 2: C# ADVANCED
  {
    category: "C# Advanced",
    level: "Intermediate",
    question: "What is the difference between IEnumerable and IEnumerator?",
    answer: "IEnumerable: Represents a collection that can be enumerated. Contains GetEnumerator() method that returns IEnumerator. Used with foreach. IEnumerator: Represents the enumeration itself. Contains Current property and MoveNext() method. GetEnumerator() returns IEnumerator. IEnumerable<T> is generic version. Example: foreach uses GetEnumerator() internally and calls MoveNext() and Current in a loop."
  },
  {
    category: "C# Advanced",
    level: "Intermediate",
    question: "What is deferred execution in LINQ?",
    answer: "LINQ queries are not executed immediately. They are executed when you enumerate the results (call foreach, ToList(), ToArray(), First(), etc.). This is called deferred/lazy execution. Benefits: better performance (only executes needed operations), allows query composition, enables efficient database queries. Example: var query = list.Where(x => x > 5); (not executed) var result = query.ToList(); (executed here). Problem: changing source collection before enumeration affects results."
  },
  {
    category: "C# Advanced",
    level: "Intermediate",
    question: "What is the difference between yield return and return in C#?",
    answer: "yield return: Returns one element at a time, maintains state between calls, creates iterator pattern, enables deferred execution. Example: yield return item; yield break; terminates enumeration. return: Exits method immediately, returns single value. yield return is useful for lazy evaluation and memory efficiency. Example: public IEnumerable<int> GetNumbers() { yield return 1; yield return 2; } vs regular return."
  },
  {
    category: "C# Advanced",
    level: "Intermediate",
    question: "Explain async/await pattern in C#.",
    answer: "async/await enables asynchronous programming using synchronous-looking code. async keyword: marks method as asynchronous, enables await keyword, returns Task or Task<T>. await keyword: pauses execution, waits for async operation, returns result. Benefits: non-blocking, improves UI responsiveness, efficient resource usage. Example: async Task<string> GetDataAsync() { return await httpClient.GetStringAsync(url); }. Avoid async void except for event handlers. Always return Task."
  },
  {
    category: "C# Advanced",
    level: "Intermediate",
    question: "What are extension methods and how do you create them?",
    answer: "Extension methods add functionality to existing types without modifying source code or using inheritance. Must be static methods in static class, first parameter uses 'this' keyword. Example: public static class StringExtensions { public static bool IsNullOrEmpty(this string str) { return string.IsNullOrEmpty(str); } } Usage: \"hello\".IsNullOrEmpty(); LINQ methods are extension methods. Useful for fluent APIs and cross-cutting concerns."
  },
  {
    category: "C# Advanced",
    level: "Advanced",
    question: "What are generics and what problems do they solve?",
    answer: "Generics allow type-safe code that works with any data type. Syntax: public class List<T> { }. Solve: type safety at compile time, eliminate boxing/unboxing, code reusability, IntelliSense support. Constraints: where T : class (reference type), where T : struct (value type), where T : new() (parameterless constructor), where T : IInterface (interface), where T : BaseClass (inheritance). Generic variance: covariance (out) and contravariance (in)."
  },
  {
    category: "C# Advanced",
    level: "Advanced",
    question: "Explain reflection in C# and its use cases.",
    answer: "Reflection allows examining and manipulating assemblies, types, and members at runtime. Can inspect types, create instances, invoke methods, access properties dynamically. Uses: dependency injection, serialization, ORM, testing frameworks, plugin systems. Example: Type type = typeof(MyClass); FieldInfo field = type.GetField(\"name\"); object instance = Activator.CreateInstance(type); Performance cost: slower than direct access. Cache reflection results for performance."
  },
  {
    category: "C# Advanced",
    level: "Advanced",
    question: "What is expression trees in C#?",
    answer: "Expression trees represent code as data structures (trees) rather than compiled code. Enable code analysis, transformation, and dynamic execution. Example: Expression<Func<int, int>> square = x => x * x; Useful for: LINQ providers (translate to SQL), dynamic query builders, code generation. Compile expression: Func<int, int> compiled = square.Compile(); ExecuteAsync expressions dynamically with different parameters. Used extensively in EF Core and LINQ to SQL."
  },
  {
    category: "C# Advanced",
    level: "Advanced",
    question: "Explain covariance and contravariance in C#.",
    answer: "Covariance (out T): Allows assigning derived type to base type. IEnumerable<Derived> can be assigned to IEnumerable<Base>. Used in return types. Example: IEnumerable<object> objects = GetStrings(); (returns IEnumerable<string>). Contravariance (in T): Allows assigning base type to derived type. Func<Base> can be assigned to Func<Derived>. Used in parameter types. Enables safe polymorphism with generics. Important for LINQ and delegate variance."
  },

  // SECTION 3: API FUNDAMENTALS
  {
    category: "API Fundamentals",
    level: "Beginner",
    question: "What is REST API and its principles?",
    answer: "REST (Representational State Transfer) is architectural style for building web APIs using HTTP. Principles: Client-Server (separation), Stateless (each request contains all info), Cacheable, Uniform Interface, Layered System, Code on Demand. Uses HTTP methods: GET (read), POST (create), PUT (full update), PATCH (partial update), DELETE (remove). Resources represented by URIs: /api/users/123. Benefits: scalable, simple, standard, language-agnostic, leverages HTTP infrastructure."
  },
  {
    category: "API Fundamentals",
    level: "Beginner",
    question: "What is the difference between REST and SOAP?",
    answer: "REST: Lightweight, uses JSON, HTTP only, stateless, easy to implement, cacheable. Uses HTTP methods (GET, POST, PUT, DELETE). SOAP: Heavy, uses XML, can use various protocols, stateful, complex, not cacheable. Requires complex request/response structure. REST is modern standard, SOAP is legacy. REST is faster and easier. SOAP better for complex enterprise scenarios with transactions. Most APIs today are REST."
  },
  {
    category: "API Fundamentals",
    level: "Beginner",
    question: "What are HTTP status codes and their meanings?",
    answer: "2xx Success: 200 OK, 201 Created, 202 Accepted, 204 No Content. 3xx Redirection: 301 Moved Permanently, 302 Found, 304 Not Modified. 4xx Client Error: 400 Bad Request, 401 Unauthorized, 403 Forbidden, 404 Not Found, 409 Conflict, 422 Unprocessable Entity. 5xx Server Error: 500 Internal Server Error, 502 Bad Gateway, 503 Service Unavailable. Return appropriate status for operation result. Include error details in response body."
  },
  {
    category: "API Fundamentals",
    level: "Beginner",
    question: "What are HTTP methods (GET, POST, PUT, PATCH, DELETE) and when to use them?",
    answer: "GET: Retrieve data, idempotent, cacheable, safe (no side effects), no request body. POST: Create resource, not idempotent, not cacheable, can have side effects, includes request body. PUT: Full resource update/replacement, idempotent, requires complete resource. PATCH: Partial update, idempotent, updates specific fields. DELETE: Remove resource, idempotent, removes data. Idempotent: multiple identical calls produce same result. Safe: doesn't modify server state."
  },
  {
    category: "API Fundamentals",
    level: "Beginner",
    question: "What is API versioning and why is it important?",
    answer: "API versioning manages changes while maintaining backward compatibility. Strategies: URI versioning (/api/v1/users), Query string (/api/users?version=1), Header versioning (Accept-Version: 1), Content-Type versioning. Important for: backward compatibility, avoiding breaking changes, gradual migration, multiple client versions. Best practice: start with version 1, increment on breaking changes, deprecate old versions, document changes. Communicate deprecation timeline to clients."
  },

  // SECTION 4: ASP.NET CORE FUNDAMENTALS
  {
    category: "ASP.NET Core",
    level: "Beginner",
    question: "What is dependency injection and why use it?",
    answer: "DI is design pattern where objects receive dependencies rather than creating them. Benefits: loose coupling, testability, maintainability, flexibility. ASP.NET Core has built-in DI container. Register in Startup.cs: services.AddScoped<IRepository, Repository>(); Lifetimes: Transient (new instance always), Scoped (per request), Singleton (single instance lifetime). Inject via constructor: public Controller(IRepository repo) { }. Enables SOLID principles, especially Dependency Inversion Principle."
  },
  {
    category: "ASP.NET Core",
    level: "Beginner",
    question: "What is middleware in ASP.NET Core?",
    answer: "Middleware are components that process HTTP requests and responses. Configured in request pipeline (Program.cs). Examples: Authentication, Logging, Exception Handling, CORS, Authorization. Usage: app.UseMiddleware<CustomMiddleware>(); Middleware order matters. Request flows through middleware in order, response in reverse. Can short-circuit pipeline (not call next middleware). Custom middleware: implement Invoke(HttpContext context, ILogger<T> logger) with next middleware parameter."
  },
  {
    category: "ASP.NET Core",
    level: "Beginner",
    question: "What is the difference between .NET Framework and .NET Core?",
    answer: ".NET Framework: Windows-only, older, heavier, slower updates, large framework surface. .NET Core/.NET 5+: Cross-platform (Windows, Linux, macOS), lighter, faster updates, modern design, open-source. .NET Core advantages: better performance, cloud-native, containerization support, microservices-friendly. Microsoft deprecated .NET Framework in favor of .NET. New projects should use .NET 6+. Breaking changes in .NET Core from Framework."
  },
  {
    category: "ASP.NET Core",
    level: "Beginner",
    question: "What is appsettings.json and how to access configuration?",
    answer: "appsettings.json stores application configuration (database connection strings, API keys, logging levels, custom settings). Separate appsettings.Development.json for development-specific settings. Access via IConfiguration: public Controller(IConfiguration config) { string conn = config.GetConnectionString(\"DefaultConnection\"); }. Use strongly-typed options: services.Configure<AppSettings>(config.GetSection(\"AppSettings\")); Inject IOptions<AppSettings> in constructor. Environment-specific loading: ASP.NET Core loads matching appsettings file based on ASPNETCORE_ENVIRONMENT."
  },

  // SECTION 5: ASP.NET CORE WEB API
  {
    category: "ASP.NET Core Web API",
    level: "Beginner",
    question: "How do you create a basic controller in ASP.NET Core Web API?",
    answer: "[ApiController] [Route(\"api/[controller]\")] public class UsersController : ControllerBase { [HttpGet(\"{id}\")] public ActionResult<User> GetUser(int id) { return Ok(new User { Id = id }); } [HttpPost] public ActionResult<User> CreateUser(CreateUserDto dto) { var user = new User { Name = dto.Name }; return CreatedAtAction(\"GetUser\", new { id = user.Id }, user); } } Key attributes: [ApiController], [HttpGet/Post/Put/Delete], [Route]. Return ActionResult for flexibility. Use CreatedAtAction for POST to return 201 with Location header."
  },
  {
    category: "ASP.NET Core Web API",
    level: "Beginner",
    question: "What are action results in ASP.NET Core?",
    answer: "Action results represent HTTP responses. Common: Ok (200), Created (201), BadRequest (400), NotFound (404), Unauthorized (401), Forbid (403). Usage: return Ok(data); return NotFound(); return BadRequest(errors); return CreatedAtAction(...); Generic ActionResult<T> provides type safety. Can return IActionResult for dynamic responses. OkObjectResult, BadRequestObjectResult allow direct instantiation. Problem Details for standardized error responses (RFC 7807). Use appropriate status code for semantics."
  },
  {
    category: "ASP.NET Core Web API",
    level: "Intermediate",
    question: "What is model binding and validation in ASP.NET Core?",
    answer: "Model binding automatically converts HTTP request data to controller action parameters. Sources: route values, query string, form data, request body. Example: [HttpGet(\"{id}\")] GetUser(int id); Validation uses data annotations: [Required], [StringLength(100)], [Range(0, 100)], [EmailAddress]. Access validation result: if (!ModelState.IsValid) return BadRequest(ModelState);. Custom validation: implement IValidatableObject or ValidationAttribute. FluentValidation for complex rules. ASP.NET Core validates by default, returns 400 for invalid models."
  },
  {
    category: "ASP.NET Core Web API",
    level: "Intermediate",
    question: "How do you implement exception handling in ASP.NET Core Web API?",
    answer: "Options: try-catch in action, global exception middleware, exception filters. Global exception handling with middleware: app.UseExceptionHandler(error => error.Run(async context => { var ex = context.Features.Get<IExceptionHandlerFeature>()?.Error; context.Response.StatusCode = 500; await context.Response.WriteAsJsonAsync(new { error = ex?.Message }); })); Or use IExceptionFilter: [ServiceFilter(typeof(GlobalExceptionFilter))] on controller. Return Problem() for ProblemDetails response (RFC 7807). Log exceptions. Catch specific exceptions first."
  },
  {
    category: "ASP.NET Core Web API",
    level: "Intermediate",
    question: "What is CORS and how to enable it?",
    answer: "CORS (Cross-Origin Resource Sharing) allows requests from different domains. Configure in Program.cs: services.AddCors(options => options.AddPolicy(\"AllowAll\", builder => builder.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader())); app.UseCors(\"AllowAll\"); Specific policy: builder.WithOrigins(\"https://example.com\").WithMethods(\"GET\", \"POST\"); PreflightRequest for complex requests. Credentials: AllowCredentials(). Expose headers: WithExposedHeaders(\"X-Total-Count\"). Default: same-origin only. Important for API consumed by web apps."
  },
  {
    category: "ASP.NET Core Web API",
    level: "Intermediate",
    question: "How to implement authentication and authorization?",
    answer: "Authentication (who are you): verify user identity. Authorization (what can you do): verify permissions. JWT tokens common for APIs. Setup: services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer(options => { options.TokenValidationParameters = ... }); app.UseAuthentication(); app.UseAuthorization(); Decorate controller/action: [Authorize], [Authorize(Roles=\"Admin\")], [AllowAnonymous]. Create JWT: var token = handler.WriteToken(new JwtSecurityToken(...)); Include token in request: Authorization: Bearer {token}. Check User principal in action."
  },
  {
    category: "ASP.NET Core Web API",
    level: "Advanced",
    question: "How do you implement content negotiation?",
    answer: "Content negotiation returns response in client-requested format (JSON, XML, etc.). ASP.NET Core defaults to JSON. Add XML: services.AddControllers().AddXmlSerializerFormatters(); Client requests via Accept header: Accept: application/json or application/xml. Return: return Ok(data); (respects Accept header). Custom media types: return Ok(data).As(\"application/custom+json\"); Useful for APIs supporting multiple formats. XML formatter: XmlSerializer. JSON: JsonSerializer. Custom formatters implement OutputFormatter, InputFormatter."
  },
  {
    category: "ASP.NET Core Web API",
    level: "Advanced",
    question: "What is rate limiting and how to implement it?",
    answer: "Rate limiting controls request frequency to prevent abuse and ensure fair resource usage. Strategies: per-IP, per-user, per-endpoint. ASP.NET Core 7+: services.AddRateLimiter(options => options.AddFixedWindowLimiter(\"fixed\", config => { config.PermitLimit = 10; config.Window = TimeSpan.FromSeconds(1); })); app.UseRateLimiter(); [EnableRateLimitingAttribute(\"fixed\")] on endpoints. Libraries: AspNetCoreRateLimit for older versions. Return 429 Too Many Requests. Communicate limits in response headers: RateLimit-Limit, RateLimit-Remaining. Important for public APIs."
  },

  // SECTION 6: ENTITY FRAMEWORK CORE
  {
    category: "Entity Framework Core",
    level: "Beginner",
    question: "What is Entity Framework Core and its benefits?",
    answer: "EF Core is Object-Relational Mapper (ORM) for .NET. Maps database tables to C# classes, generates SQL queries. Benefits: reduces boilerplate SQL, type-safe queries, LINQ support, automatic migrations, lazy/eager loading, change tracking. DbContext: represents database session, contains DbSet for tables. Example: public class User { public int Id { get; set; } public string Name { get; set; } }. Support multiple databases: SQL Server, PostgreSQL, MySQL, SQLite. Eliminates N+1 queries with Include()."
  },
  {
    category: "Entity Framework Core",
    level: "Beginner",
    question: "What is the difference between eager loading, lazy loading, and explicit loading?",
    answer: "Eager loading: Load related data upfront using Include(). var user = dbContext.Users.Include(u => u.Orders).FirstOrDefault(); Lazy loading: Load related data on access (requires virtual or ILazyLoader). string name = user.Name; (lazy loads Orders on access). Explicit loading: Manually load related data. dbContext.Entry(user).Collection(u => u.Orders).Load(); Eager best for known relationships. Lazy convenient but can cause N+1 queries. Explicit for complex scenarios. Choose based on access patterns."
  },
  {
    category: "Entity Framework Core",
    level: "Intermediate",
    question: "What are migrations in Entity Framework Core?",
    answer: "Migrations track schema changes over time, enable version control of database. Create migration: dotnet ef migrations add AddUsers; Migration files contain Up() (apply changes) and Down() (revert changes). Update database: dotnet ef database update; or context.Database.Migrate(); Benefits: database versioning, team collaboration, deployment automation. List migrations: dotnet ef migrations list. Remove migration: dotnet ef migrations remove. Revert: dotnet ef database update PreviousMigration. Snapshot files track current model."
  },
  {
    category: "Entity Framework Core",
    level: "Intermediate",
    question: "How do you implement relationships in EF Core (one-to-many, many-to-many)?",
    answer: "One-to-Many: public class Author { public int Id { get; set; } public List<Book> Books { get; set; } } public class Book { public int Id { get; set; } public int AuthorId { get; set; } public Author Author { get; set; } }. Many-to-Many (.NET 5+): automatic join table. public class Student { public List<Course> Courses { get; set; } } public class Course { public List<Student> Students { get; set; } }. Configure in OnModelCreating(): modelBuilder.Entity<StudentCourse>().HasKey(sc => new { sc.StudentId, sc.CourseId }). Fluent API for customization."
  },
  {
    category: "Entity Framework Core",
    level: "Intermediate",
    question: "What is shadow properties and indexes in EF Core?",
    answer: "Shadow properties: Not declared in entity class but tracked by EF Core. Configure: modelBuilder.Entity<User>().Property<DateTime>(\"CreatedDate\"); Access via EF Core, not from code. Useful for auditing, multi-tenancy. Indexes: Speed up queries. Data annotation: [Index(nameof(Email))]. Fluent API: modelBuilder.Entity<User>().HasIndex(u => u.Email).IsUnique(); Composite index: HasIndex(u => new { u.FirstName, u.LastName }). Important for performance, especially with large datasets."
  },
  {
    category: "Entity Framework Core",
    level: "Advanced",
    question: "What is query compilation and how to optimize EF Core queries?",
    answer: "Query compilation converts LINQ to SQL. EF Core compiles queries each time by default. Optimize: use EF.CompileAsyncQuery for frequently executed queries. var getUser = EF.CompileAsyncQuery((AppDbContext db, int id) => db.Users.FirstOrDefault(u => u.Id == id)); result = await getUser(dbContext, 1); Other optimizations: Select only needed columns, use AsNoTracking() for read-only, batch operations, avoid N+1 queries, use split queries for large datasets, use raw SQL for complex queries. Profile with profilers, analyze generated SQL with context.Database.Log."
  },

  // SECTION 7: WEB API DESIGN PATTERNS
  {
    category: "Web API Design",
    level: "Intermediate",
    question: "What is the Repository Pattern and how to implement it?",
    answer: "Repository Pattern abstracts data access logic, enables testability and swaps implementations. Interface: public interface IRepository<T> { Task<T> GetAsync(int id); Task<List<T>> GetAllAsync(); Task AddAsync(T entity); Task UpdateAsync(T entity); Task DeleteAsync(T entity); }. Implementation uses DbContext. Dependency inject: services.AddScoped<IRepository<User>, UserRepository>(); Benefits: loose coupling, testability via mocks, centralized data access logic. Repository per entity or generic Repository<T>."
  },
  {
    category: "Web API Design",
    level: "Intermediate",
    question: "What is Unit of Work pattern?",
    answer: "Unit of Work pattern coordinates multiple repositories, manages transactions. Ensures consistency across repositories. Interface: public interface IUnitOfWork : IDisposable { IRepository<User> Users { get; } IRepository<Order> Orders { get; } Task<int> SaveChangesAsync(); }. Implementation coordinates DbContext. Benefits: single SaveChanges() call, transaction support, consistency, complex workflows. Inject IUnitOfWork in services. Common in domain-driven design. Coordinates changes across multiple aggregates."
  },
  {
    category: "Web API Design",
    level: "Intermediate",
    question: "What is the DTO (Data Transfer Object) pattern?",
    answer: "DTO separates API contract from domain model. Prevents exposing internal structure, enables selective property exposure, decouples API from database. Example: public class CreateUserDto { [Required] public string Name { get; set; } } public class UserDto { public int Id { get; set; } public string Name { get; set; } }. Map using AutoMapper: services.AddAutoMapper(typeof(Program)); UserDto dto = mapper.Map<UserDto>(user); Benefits: encapsulation, versioning, validation, security (sensitive properties hidden)."
  },
  {
    category: "Web API Design",
    level: "Intermediate",
    question: "How to implement pagination in ASP.NET Core Web API?",
    answer: "Pagination splits data into pages. Query parameters: /api/users?pageNumber=1&pageSize=10. Implementation: public class PagedResult<T> { public List<T> Items { get; set; } public int TotalCount { get; set; } public int PageNumber { get; set; } public int PageSize { get; set; } }. Query: var users = query.Skip((pageNumber - 1) * pageSize).Take(pageSize).ToList(); Response headers: X-Total-Count for total count. Improves performance, user experience. Common in REST APIs."
  },

  // SECTION 8: PERFORMANCE & SCALABILITY
  {
    category: "Performance & Scalability",
    level: "Intermediate",
    question: "What is caching and caching strategies?",
    answer: "Caching stores frequently accessed data in-memory for fast retrieval. Strategies: In-memory caching (IMemoryCache), distributed caching (Redis, SQL Server). In-memory: services.AddMemoryCache(); IMemoryCache cache in constructor; cache.Set(\"key\", data); Distributed: services.AddStackExchangeRedisCache(options => options.Configuration = \"localhost:6379\"); Strategies: Cache-aside (check cache, if miss load from DB), write-through (write to cache and DB), write-behind (cache first, async DB). TTL (Time-To-Live) for expiration. Invalidation strategies."
  },
  {
    category: "Performance & Scalability",
    level: "Intermediate",
    question: "What is the N+1 query problem and how to solve it?",
    answer: "N+1 problem: fetching parent executes 1 query, then 1 query per child (N queries total). Example: var users = dbContext.Users.ToList(); foreach (var user in users) { var orders = dbContext.Orders.Where(o => o.UserId == user.Id).ToList(); } (N+1 queries). Solutions: Eager loading with Include(): dbContext.Users.Include(u => u.Orders).ToList(); (1 query). Select projection: dbContext.Users.Select(u => new { u.Id, u.Name, Orders = u.Orders }).ToList(); Split queries for large datasets. Use Batch operations."
  },
  {
    category: "Performance & Scalability",
    level: "Intermediate",
    question: "What is connection pooling?",
    answer: "Connection pooling reuses database connections instead of creating new ones. Improves performance significantly. EF Core uses connection pooling by default. Configure pool size: services.AddDbContext<AppDbContext>(options => options.UseSqlServer(connectionString, sqlOptions => sqlOptions.MaxPoolSize(10))); Connection lifecycle: open, use, return to pool (not closed). New request reuses pooled connection. Benefits: reduced latency, resource efficiency, better scalability. Typically 5-10 connections per pool. Monitor pool exhaustion in monitoring tools."
  },
  {
    category: "Performance & Scalability",
    level: "Advanced",
    question: "What is async/await in data access and best practices?",
    answer: "Async data access prevents blocking threads, improves scalability. Use ToListAsync(), FirstOrDefaultAsync(), SaveChangesAsync() instead of synchronous versions. Example: var user = await dbContext.Users.FirstOrDefaultAsync(u => u.Id == id); Benefits: handle more concurrent requests with fewer threads, responsive API, database connection efficiency. Never use .Result or .Wait() (causes deadlocks). Async all the way: async controller, async service, async data access. Use ConfigureAwait(false) in libraries. Test async code thoroughly."
  },

  // SECTION 9: SECURITY
  {
    category: "Security",
    level: "Intermediate",
    question: "What are common security vulnerabilities and mitigation?",
    answer: "SQL Injection: Use parameterized queries (EF Core does this). Never concatenate SQL strings. XSS (Cross-Site Scripting): Validate/sanitize input, encode output. CSRF (Cross-Site Request Forgery): Use anti-forgery tokens. Broken Authentication: Hash passwords (bcrypt, Argon2), use HTTPS, implement timeout. Broken Access Control: Verify permissions server-side, use role-based authorization. Sensitive Data Exposure: Use HTTPS, encrypt sensitive data, avoid logging sensitive info. Deserialization attacks: Validate deserialized objects, use safe serializers. OWASP Top 10 covers common vulnerabilities."
  },
  {
    category: "Security",
    level: "Intermediate",
    question: "How to store passwords securely?",
    answer: "Never store plaintext passwords. Use strong hashing algorithms: bcrypt, Argon2, PBKDF2. Example using bcrypt: var hashedPassword = BCrypt.Net.BCrypt.HashPassword(password); if (BCrypt.Net.BCrypt.Verify(password, hashedPassword)) { }. ASP.NET Identity provides hashing. Benefits of hashing: irreversible, unique output per input, rainbow table resistant, salted hashes. Never use weak algorithms like MD5, SHA1. Require strong passwords: minimum length, complexity rules. Consider multi-factor authentication."
  },
  {
    category: "Security",
    level: "Intermediate",
    question: "What are HTTP security headers?",
    answer: "Security headers protect against attacks. Common: Content-Security-Policy (prevent XSS), X-Content-Type-Options: nosniff (prevent MIME sniffing), X-Frame-Options: DENY (prevent clickjacking), Strict-Transport-Security (enforce HTTPS), X-XSS-Protection (XSS protection), Authorization: Bearer {token} (authentication). Set in middleware: context.Response.Headers[\"X-Content-Type-Options\"] = \"nosniff\"; Or use HSTS: services.AddHsts(options => options.MaxAge = TimeSpan.FromDays(365)); Use security header checkers to verify."
  },

  // SECTION 10: TESTING
  {
    category: "Testing",
    level: "Intermediate",
    question: "What are unit tests and how to write them?",
    answer: "Unit tests verify individual components in isolation using mocks. Frameworks: xUnit, NUnit, MSTest. Example: [Fact] public void Add_TwoNumbers_ReturnsSum() { var service = new MathService(); var result = service.Add(2, 3); Assert.Equal(5, result); }. Use AAA pattern: Arrange (setup), Act (execute), Assert (verify). Mock dependencies: var mockRepo = new Mock<IRepository>(); mockRepo.Setup(r => r.GetUserAsync(1)).ReturnsAsync(user); Benefits: catch bugs early, enable refactoring, document behavior, fast feedback."
  },
  {
    category: "Testing",
    level: "Intermediate",
    question: "What is integration testing and how to test APIs?",
    answer: "Integration tests verify multiple components together, usually with real database. Use WebApplicationFactory for in-memory testing: public class UserControllerTests : IClassFixture<WebApplicationFactory<Program>> { private readonly HttpClient _client; public UserControllerTests(WebApplicationFactory<Program> factory) { _client = factory.CreateClient(); } [Fact] public async Task GetUser_ReturnsUser() { var response = await _client.GetAsync(\"/api/users/1\"); Assert.True(response.IsSuccessStatusCode); } }. Test endpoints, status codes, response content. Use in-memory database for tests."
  },

  // SECTION 11: ARCHITECTURAL PATTERNS
  {
    category: "Architecture",
    level: "Advanced",
    question: "What is Clean Architecture and its layers?",
    answer: "Clean Architecture organizes code into concentric layers: Entities (core business logic), Use Cases/Application (business rules), Interface Adapters (controllers, gateways), Frameworks & Drivers (external libraries, UI). Benefits: testability, maintainability, independence from frameworks, easy changes. Dependency rule: outer layers depend on inner layers, not vice versa. Example: Application Service uses Repository interface (abstraction), infrastructure provides implementation. Enables high cohesion, low coupling."
  },
  {
    category: "Architecture",
    level: "Advanced",
    question: "What is Domain-Driven Design (DDD)?",
    answer: "DDD focuses on business domain, not technology. Key concepts: Entity (identity important), Value Object (identity not important), Aggregate (consistency boundary), Repository (data access), Domain Service (domain logic). Bounded Context (autonomous domain sub-system). Example: Order is Aggregate containing Items (Entities within aggregate). OrderRepository implements persistence. Services coordinate across aggregates. Benefits: complex business logic, alignment with business, team communication. Requires understanding domain deeply. Uses Repository, Unit of Work patterns."
  },
  {
    category: "Architecture",
    level: "Advanced",
    question: "What is CQRS (Command Query Responsibility Segregation)?",
    answer: "CQRS separates read and write models. Commands modify state (with side effects). Queries read state (no side effects). Different models optimized for each. Example: CreateUserCommand (write), GetUserQuery (read). Can use separate databases (write normalized, read denormalized). Enables scaling reads independently. Introduces complexity. Often combined with event sourcing. Benefits: performance optimization, scalability, clear separation. Databases can be eventually consistent."
  },

  // SECTION 12: MICROSERVICES & DISTRIBUTED SYSTEMS
  {
    category: "Microservices",
    level: "Advanced",
    question: "What are microservices and how to design them?",
    answer: "Microservices break monolith into small, independent services. Each service: single responsibility, owns database, independent deployment, loosely coupled. Communicate via HTTP/REST, message queues, gRPC. Example: UserService, OrderService, PaymentService. Design principles: service per bounded context (DDD), small enough for team to maintain, independently deployable. Challenges: distributed tracing, data consistency, network latency, operational complexity. Benefits: scalability, team autonomy, technology flexibility, resilience. Start with monolith, break into microservices as complexity grows."
  },
  {
    category: "Microservices",
    level: "Advanced",
    question: "How to handle distributed transactions?",
    answer: "Distributed transactions across services are complex. Options: Saga pattern (orchestration or choreography), Event sourcing with eventual consistency. Saga: coordinator orchestrates across services, or services listen to events. Example: CreateOrderSaga: 1) Create order, 2) Reserve inventory, 3) Charge payment. If step fails, compensate (rollback) previous steps. Choreography: services publish events, others react. User Service publishes UserCreated, other services subscribe. Benefits: eventual consistency, loose coupling. Challenges: debugging, monitoring, compensating transactions."
  },
  {
    category: "Microservices",
    level: "Advanced",
    question: "What is message queue and when to use it?",
    answer: "Message queues enable asynchronous communication between services. Examples: RabbitMQ, Apache Kafka, Azure Service Bus. Producer sends message, consumer processes it asynchronously. Benefits: decoupling, resilience (retry failed messages), load leveling, scalability. Example: Order service publishes OrderCreated event, Notification service subscribes and sends email. Kafka for event streaming (historical events), RabbitMQ for reliable messaging. Trade-off: eventual consistency, debugging complexity. Implement idempotent consumers (same message processed multiple times)."
  },

  // SECTION 13: SCENARIO-BASED QUESTIONS
  {
    category: "Scenario-Based",
    level: "Advanced",
    question: "You need to create API that handles 1 million requests/day. How do you design it?",
    answer: "Design considerations: Database: use connection pooling, optimize queries (indexes, caching), consider read replicas, sharding for huge data. Caching: in-memory cache for frequently accessed data, Redis for distributed cache, HTTP caching with ETags. API Gateway: rate limiting, request routing, load balancing. Async processing: background jobs for time-consuming tasks. Monitoring: application insights, distributed tracing, alerting. CDN: static content caching. Database replication: read replicas. Message queues: async communication. Auto-scaling: cloud infrastructure. Test with load testing (JMeter, k6). Start simple, optimize based on bottlenecks."
  },
  {
    category: "Scenario-Based",
    level: "Advanced",
    question: "How to implement real-time notifications in Web API?",
    answer: "Technologies: WebSockets for bidirectional communication, SignalR (ASP.NET Core wrapper around WebSockets), Server-Sent Events (SSE). SignalR: services.AddSignalR(); app.MapHub<NotificationHub>(\"/notificationHub\"); Hub methods: public async Task SendNotification(string message) { await Clients.All.SendAsync(\"ReceiveNotification\", message); }. Client establishes connection, server pushes updates. Alternative: polling (client requests periodically), webhooks (push from server), message queue integration. SignalR handles fallbacks (WebSockets -> Server-Sent Events -> Long Polling). Production: use Redis backplane for multi-server deployments."
  },
  {
    category: "Scenario-Based",
    level: "Advanced",
    question: "How to handle backward compatibility when evolving API?",
    answer: "Strategies: API versioning (/api/v1, /api/v2), deprecation headers (Deprecation: true, Sunset: Wed, 21 Dec 2024 23:59:59 GMT), additive changes (add fields, don't remove), feature toggles. New endpoint for new behavior, old endpoint works as-is. Response changes: add optional fields (old clients ignore), remove fields carefully (deprecate first). Request changes: make new fields optional, support old format temporarily. Document changes in API documentation. Communication plan: deprecation notice, migration guide, support timeline. Prefer additive changes over breaking changes. Use semantic versioning."
  },
  {
    category: "Scenario-Based",
    level: "Advanced",
    question: "How to implement file upload/download efficiently in Web API?",
    answer: "Upload: streaming prevents loading entire file in memory. IFormFile for small files, stream for large files. Example: [HttpPost(\"upload\")] public async Task<IActionResult> Upload(IFormFile file) { using (var stream = file.OpenReadStream()) { await SaveToStorageAsync(stream); } }. Download: return FileContentResult or FileStreamResult. Virus scanning, file validation. Size limits: MaxRequestBodySize. Progress tracking via polling. Download: return File(stream, contentType, filename); Stream large files to prevent memory issues. Azure Blob Storage or AWS S3 for cloud. Generate presigned URLs for secure downloads."
  },
  {
    category: "Scenario-Based",
    level: "Advanced",
    question: "How to implement search and filtering in API efficiently?",
    answer: "Approach: accept query parameters, build IQueryable dynamically. Example: /api/users?name=john&age=25&pageNumber=1&pageSize=10. Implementation: build query: var query = dbContext.Users.AsQueryable(); if (!string.IsNullOrEmpty(name)) query = query.Where(u => u.Name.Contains(name)); if (age.HasValue) query = query.Where(u => u.Age == age); Deferred execution: query.Skip(...).Take(...).ToListAsync(); Optimize: add indexes on frequently searched fields, use full-text search for text (Elasticsearch), consider search engines for complex queries. Validate input to prevent injection. Support sorting: orderBy=name&orderDirection=asc."
  },
  {
    category: "Scenario-Based",
    level: "Advanced",
    question: "Design a resilient microservice with retry logic and circuit breaker.",
    answer: "Use Polly library for resilience. Retry policy: Policy.Handle<HttpRequestException>().WaitAndRetryAsync(retryCount: 3, sleepDurationProvider: attempt => TimeSpan.FromSeconds(Math.Pow(2, attempt))); (exponential backoff). Circuit breaker: Policy.Handle<HttpRequestException>().CircuitBreakerAsync(handledEventsAllowedBeforeBreaking: 5, durationOfBreak: TimeSpan.FromSeconds(30)); (fails fast after 5 failures, pauses for 30s). Combine: Policy.WrapAsync(retryPolicy, circuitBreakerPolicy); Bulkhead isolation: limiting concurrency. Timeout: timeout policy. Fallback: return default response on failure. Wrap HttpClient: httpClient.GetAsync() throws when circuit open. Monitor circuit state in metrics."
  }
];

const doc = new Document({
  styles: {
    default: {
      document: {
        run: { font: "Calibri", size: 22 }
      }
    },
    paragraphStyles: [
      {
        id: "Heading1",
        name: "Heading 1",
        basedOn: "Normal",
        next: "Normal",
        quickFormat: true,
        run: { size: 32, bold: true, font: "Calibri", color: "1e3a8a" },
        paragraph: { spacing: { before: 240, after: 120 }, outlineLevel: 0 }
      },
      {
        id: "Heading2",
        name: "Heading 2",
        basedOn: "Normal",
        next: "Normal",
        quickFormat: true,
        run: { size: 28, bold: true, font: "Calibri", color: "2563eb" },
        paragraph: { spacing: { before: 180, after: 100 }, outlineLevel: 1 }
      },
      {
        id: "Heading3",
        name: "Heading 3",
        basedOn: "Normal",
        next: "Normal",
        quickFormat: true,
        run: { size: 24, bold: true, font: "Calibri", color: "3b82f6" },
        paragraph: { spacing: { before: 120, after: 80 }, outlineLevel: 2 }
      }
    ]
  },
  numbering: {
    config: [
      {
        reference: "bullets",
        levels: [
          {
            level: 0,
            format: "bullet",
            text: "•",
            alignment: AlignmentType.LEFT,
            style: {
              paragraph: {
                indent: { left: 720, hanging: 360 }
              }
            }
          }
        ]
      }
    ]
  },
  sections: [{
    properties: {
      page: {
        size: {
          width: 12240,
          height: 15840
        },
        margin: { top: 1080, right: 1080, bottom: 1080, left: 1080 }
      }
    },
    children: [
      // Title Page
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { after: 400 },
        children: [
          new TextRun({
            text: ".NET Developer Interview Questions & Answers",
            bold: true,
            size: 40,
            color: "1e3a8a"
          })
        ]
      }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { after: 400 },
        children: [
          new TextRun({
            text: "Comprehensive Guide for API, ASP.NET Core Web API, C#, and .NET Technologies",
            size: 24,
            italics: true
          })
        ]
      }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { after: 200 },
        children: [
          new TextRun({
            text: "Beginner • Intermediate • Advanced • Scenario-Based",
            size: 22,
            color: "2563eb",
            bold: true
          })
        ]
      }),

      // Table of Contents
      new Paragraph({
        heading: HeadingLevel.HEADING_1,
        children: [new TextRun("TABLE OF CONTENTS")]
      }),
      new Paragraph({
        spacing: { after: 80 },
        children: [
          new TextRun("1. C# Basics\n2. C# Advanced\n3. API Fundamentals\n4. ASP.NET Core Fundamentals\n5. ASP.NET Core Web API\n6. Entity Framework Core\n7. Web API Design Patterns\n8. Performance & Scalability\n9. Security\n10. Testing\n11. Architectural Patterns\n12. Microservices & Distributed Systems\n13. Scenario-Based Questions")
        ]
      }),

      // Questions
      ...questions.flatMap((q, index) => {
        const section = questions.filter(x => x.category === q.category).indexOf(q);
        const isFirstInCategory = section === 0;

        return [
          isFirstInCategory ? new Paragraph({
            heading: HeadingLevel.HEADING_1,
            children: [new TextRun(q.category.toUpperCase())]
          }) : null,
          new Paragraph({
            heading: HeadingLevel.HEADING_2,
            children: [new TextRun(`Q${index + 1}: ${q.question}`)]
          }),
          new Paragraph({
            spacing: { after: 0 },
            children: [
              new TextRun({
                text: "Level: ",
                bold: true
              }),
              new TextRun(q.level)
            ]
          }),
          new Paragraph({
            spacing: { after: 120 },
            children: [
              new TextRun({
                text: "Answer: ",
                bold: true
              })
            ]
          }),
          new Paragraph({
            spacing: { after: 200 },
            children: [new TextRun(q.answer)]
          })
        ].filter(Boolean);
      }),

      // Tips Section
      new Paragraph({
        heading: HeadingLevel.HEADING_1,
        children: [new TextRun("INTERVIEW TIPS")]
      }),
      new Paragraph({
        spacing: { after: 160 },
        children: [new TextRun("1. Practice coding: Write sample code for questions, run and test it")]
      }),
      new Paragraph({
        spacing: { after: 160 },
        children: [new TextRun("2. Understand concepts: Don't just memorize, understand why and when")]
      }),
      new Paragraph({
        spacing: { after: 160 },
        children: [new TextRun("3. Real-world examples: Relate concepts to actual projects you've worked on")]
      }),
      new Paragraph({
        spacing: { after: 160 },
        children: [new TextRun("4. Performance awareness: Always discuss performance implications and optimization")]
      }),
      new Paragraph({
        spacing: { after: 160 },
        children: [new TextRun("5. Security mindset: Be aware of security implications in every solution")]
      }),
      new Paragraph({
        spacing: { after: 160 },
        children: [new TextRun("6. Ask clarifying questions: In scenario-based questions, ask about requirements first")]
      }),
      new Paragraph({
        spacing: { after: 160 },
        children: [new TextRun("7. Trade-offs: Discuss trade-offs between different approaches")]
      }),
      new Paragraph({
        spacing: { after: 160 },
        children: [new TextRun("8. Keep updated: Follow .NET blogs, GitHub, and community discussions")]
      })
    ]
  }]
});

Packer.toBuffer(doc).then(buffer => {
  fs.writeFileSync("/mnt/user-data/outputs/DotNET_Interview_Questions.docx", buffer);
  console.log("Interview questions DOCX created successfully!");
});
