const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const User = require('./models/User');
const Course = require('./models/Course');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/course-subscription';

async function seed() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB for seeding');

    // Clear existing data
    await User.deleteMany({});
    await Course.deleteMany({});
    console.log('🗑️  Cleared existing data');

    // Create dummy users
    const hashedPassword = await bcrypt.hash('password123', 10);
    const users = await User.insertMany([
      {
        name: 'John Doe',
        email: 'john@example.com',
        password: hashedPassword,
      },
      {
        name: 'Jane Smith',
        email: 'jane@example.com',
        password: hashedPassword,
      },
      {
        name: 'Admin User',
        email: 'admin@example.com',
        password: hashedPassword,
      },
    ]);
    console.log('👥 Created dummy users');

    // Create courses
    const courses = await Course.insertMany([
      {
        title: 'Introduction to Web Development',
        description: 'Learn the fundamentals of web development including HTML, CSS, and JavaScript. Perfect for beginners who want to start their journey in web development.',
        detailedContent: `This comprehensive course is designed for absolute beginners who want to learn web development from scratch. You'll start by understanding how the web works and then dive into the three core technologies that power every website: HTML, CSS, and JavaScript.

In the HTML section, you'll learn how to structure web pages using semantic HTML5 elements. You'll create forms, tables, and understand the importance of accessibility in web development. We'll cover modern HTML practices and best practices for creating well-structured documents.

The CSS module will teach you how to style your web pages beautifully. You'll learn about selectors, the box model, flexbox, and CSS Grid. We'll also cover responsive design principles to ensure your websites look great on all devices, from mobile phones to desktop computers.

Finally, the JavaScript section will introduce you to programming fundamentals. You'll learn about variables, functions, arrays, objects, and DOM manipulation. By the end of this course, you'll be able to create interactive web pages that respond to user actions.

Throughout the course, you'll work on real-world projects that you can add to your portfolio. Each project builds upon the previous one, ensuring you understand not just the syntax, but how to apply these technologies in practical scenarios.`,
        whatYouWillLearn: [
          'Build responsive websites using HTML5 and CSS3',
          'Create interactive web pages with JavaScript',
          'Understand the Document Object Model (DOM)',
          'Implement modern CSS layouts with Flexbox and Grid',
          'Write clean, maintainable code following best practices',
          'Debug and troubleshoot common web development issues',
          'Deploy your websites to the internet'
        ],
        duration: '8 weeks',
        instructor: 'Sarah Johnson',
        level: 'Beginner',
        lessons: 45,
        price: 0,
        image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=500',
      },
      {
        title: 'Advanced React Mastery',
        description: 'Master React with hooks, context API, and advanced patterns. Build real-world applications and learn best practices from industry experts.',
        detailedContent: `Take your React skills to the next level with this advanced course designed for developers who already have a solid foundation in React. This course dives deep into advanced concepts, patterns, and techniques used by senior developers in production applications.

You'll master React Hooks, including useState, useEffect, useContext, useReducer, and custom hooks. Learn when and how to use each hook effectively, and understand the performance implications of your choices. We'll explore advanced patterns like render props, higher-order components, and the composition pattern.

State management is crucial in large applications, so we'll cover Context API in depth, including when to use it and when to avoid it. You'll learn about state management patterns and how to structure your application for scalability.

Performance optimization is a key focus of this course. You'll learn about React.memo, useMemo, useCallback, code splitting, lazy loading, and how to identify and fix performance bottlenecks. We'll use React DevTools Profiler to analyze and optimize your applications.

The course includes building a complete full-stack application with authentication, real-time updates, and advanced routing. You'll learn about error boundaries, testing React components, and deploying React applications to production.`,
        whatYouWillLearn: [
          'Master React Hooks and advanced patterns',
          'Implement complex state management solutions',
          'Optimize React applications for performance',
          'Build reusable component libraries',
          'Handle authentication and authorization',
          'Implement real-time features with WebSockets',
          'Test React components with Jest and React Testing Library',
          'Deploy React applications to production'
        ],
        duration: '12 weeks',
        instructor: 'Michael Chen',
        level: 'Advanced',
        lessons: 60,
        price: 99.99,
        image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=500',
      },
      {
        title: 'Node.js Backend Development',
        description: 'Build scalable backend applications with Node.js and Express. Learn RESTful APIs, authentication, and database integration.',
        detailedContent: `This comprehensive Node.js course will teach you how to build robust, scalable backend applications. Starting with the fundamentals of Node.js and the event loop, you'll progress to building production-ready RESTful APIs and real-time applications.

The course begins with understanding Node.js architecture, the event loop, and asynchronous programming. You'll learn about streams, buffers, and how to work with the file system. We'll cover npm and package management, including how to create and publish your own packages.

Express.js is the most popular Node.js framework, and we'll cover it extensively. You'll learn about routing, middleware, error handling, and how to structure Express applications for maintainability. We'll build RESTful APIs following industry best practices and REST conventions.

Database integration is a crucial part of backend development. You'll learn to work with both SQL (PostgreSQL) and NoSQL (MongoDB) databases. We'll cover Mongoose for MongoDB and Sequelize for PostgreSQL, including migrations, models, and relationships.

Security is paramount in backend development. You'll learn about authentication with JWT, password hashing, CORS, rate limiting, input validation, and protecting against common vulnerabilities like SQL injection and XSS attacks.

The course includes building a complete backend for an e-commerce application with user authentication, product management, order processing, and payment integration. You'll also learn about testing, deployment, and monitoring your Node.js applications.`,
        whatYouWillLearn: [
          'Build RESTful APIs with Express.js',
          'Work with MongoDB and PostgreSQL databases',
          'Implement JWT authentication and authorization',
          'Handle file uploads and processing',
          'Create real-time applications with Socket.io',
          'Write unit and integration tests',
          'Deploy Node.js applications to cloud platforms',
          'Monitor and debug production applications'
        ],
        duration: '10 weeks',
        instructor: 'David Rodriguez',
        level: 'Intermediate',
        lessons: 55,
        price: 79.99,
        image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=500',
      },
      {
        title: 'Python for Data Science',
        description: 'Comprehensive course on Python programming for data analysis, machine learning, and visualization. Includes hands-on projects.',
        detailedContent: `This comprehensive data science course will take you from Python basics to advanced machine learning. Whether you're a complete beginner or looking to enhance your data science skills, this course provides a complete learning path.

We start with Python fundamentals, covering data types, control structures, functions, and object-oriented programming. You'll learn Python best practices and how to write clean, efficient code. Then we move to essential libraries: NumPy for numerical computing, Pandas for data manipulation, and Matplotlib/Seaborn for data visualization.

Data cleaning and preprocessing are crucial skills for any data scientist. You'll learn how to handle missing data, outliers, and data transformations. We'll cover exploratory data analysis (EDA) techniques to understand your data before building models.

The machine learning section covers both supervised and unsupervised learning. You'll learn about regression, classification, clustering, and dimensionality reduction. We'll use scikit-learn extensively and cover model evaluation, cross-validation, and hyperparameter tuning.

Advanced topics include deep learning with TensorFlow and Keras, natural language processing, and time series analysis. You'll work on real-world projects including predicting house prices, customer segmentation, sentiment analysis, and image classification.

Throughout the course, you'll work with real datasets from various domains including finance, healthcare, e-commerce, and social media. Each project is designed to reinforce concepts and build your portfolio.`,
        whatYouWillLearn: [
          'Master Python programming for data science',
          'Manipulate and analyze data with Pandas',
          'Create compelling data visualizations',
          'Build machine learning models with scikit-learn',
          'Implement deep learning solutions with TensorFlow',
          'Perform natural language processing tasks',
          'Work with time series data',
          'Deploy machine learning models to production'
        ],
        duration: '14 weeks',
        instructor: 'Dr. Emily Watson',
        level: 'Intermediate',
        lessons: 70,
        price: 89.99,
        image: 'https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=500',
      },
      {
        title: 'UI/UX Design Fundamentals',
        description: 'Learn the principles of user interface and user experience design. Create beautiful and functional designs that users love.',
        detailedContent: `This comprehensive UI/UX design course will teach you how to create user-centered designs that are both beautiful and functional. You'll learn the principles, processes, and tools used by professional designers in the industry.

The course begins with understanding user experience (UX) fundamentals. You'll learn about user research, personas, user journeys, and information architecture. We'll cover the design thinking process and how to approach design problems systematically.

User interface (UI) design focuses on the visual aspects of design. You'll learn about color theory, typography, spacing, and layout principles. We'll explore design systems and how to create consistent, scalable designs. You'll learn to use design tools like Figma, Adobe XD, and Sketch.

Prototyping is essential for testing and validating designs. You'll learn to create low-fidelity and high-fidelity prototypes, conduct usability testing, and iterate based on user feedback. We'll cover interaction design and micro-interactions that enhance user experience.

Responsive design ensures your interfaces work across all devices. You'll learn about mobile-first design, breakpoints, and how to design for different screen sizes. We'll also cover accessibility principles to ensure your designs are inclusive.

The course includes several real-world projects where you'll design complete applications from scratch. You'll learn to present your work effectively and build a professional design portfolio. We'll also cover collaboration with developers and stakeholders.`,
        whatYouWillLearn: [
          'Conduct user research and create user personas',
          'Design user interfaces using industry-standard tools',
          'Create interactive prototypes',
          'Apply design principles and best practices',
          'Design responsive and accessible interfaces',
          'Conduct usability testing and iterate on designs',
          'Build a professional design portfolio',
          'Collaborate effectively with developers and stakeholders'
        ],
        duration: '10 weeks',
        instructor: 'Jessica Martinez',
        level: 'Beginner',
        lessons: 50,
        price: 0,
        image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=500',
      },
      {
        title: 'Full Stack JavaScript Bootcamp',
        description: 'Complete bootcamp covering frontend and backend JavaScript development. Build full-stack applications from scratch.',
        detailedContent: `This intensive bootcamp is designed to take you from zero to a full-stack JavaScript developer. You'll learn both frontend and backend development using JavaScript, making you a versatile developer capable of building complete applications.

The frontend section covers modern JavaScript (ES6+), React, and state management. You'll learn about components, hooks, routing, and how to build single-page applications. We'll also cover CSS-in-JS, styled-components, and modern CSS frameworks.

On the backend, you'll master Node.js and Express.js. You'll learn to build RESTful APIs, work with databases (both SQL and NoSQL), implement authentication, and handle file uploads. We'll cover advanced topics like WebSockets for real-time features.

Database knowledge is crucial for full-stack developers. You'll learn MongoDB for NoSQL databases and PostgreSQL for SQL databases. You'll understand when to use each and how to design efficient database schemas.

DevOps and deployment are essential skills. You'll learn about Git and GitHub, CI/CD pipelines, Docker, and deploying applications to cloud platforms like Heroku, AWS, and Vercel. You'll also learn about monitoring and debugging production applications.

The bootcamp culminates in building a complete full-stack application: a social media platform with user authentication, posts, comments, real-time notifications, and file uploads. This project will showcase all the skills you've learned and serve as a portfolio piece.

Throughout the bootcamp, you'll work on multiple projects, each building on the previous one. You'll learn industry best practices, code organization, testing, and how to work in a team environment.`,
        whatYouWillLearn: [
          'Build modern React applications',
          'Create RESTful APIs with Node.js and Express',
          'Work with MongoDB and PostgreSQL databases',
          'Implement authentication and authorization',
          'Deploy full-stack applications to production',
          'Use Git and GitHub for version control',
          'Write tests for frontend and backend code',
          'Build real-time features with WebSockets'
        ],
        duration: '16 weeks',
        instructor: 'Alex Thompson',
        level: 'Intermediate',
        lessons: 80,
        price: 149.99,
        image: 'https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=500',
      },
    ]);
    console.log('📚 Created courses');

    console.log('\n✅ Seeding completed successfully!');
    console.log('\n📝 Dummy User Credentials:');
    console.log('   Email: john@example.com | Password: password123');
    console.log('   Email: jane@example.com | Password: password123');
    console.log('   Email: admin@example.com | Password: password123');
    console.log('\n🎟️  Promo Code for Paid Courses: BFSALE25 (50% discount)');

    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding error:', error);
    process.exit(1);
  }
}

seed();

