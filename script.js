// BookHub Library Management System
class LibraryManager {
    constructor() {
        this.books = this.loadBooks();
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.updateStats();
        this.displayDeploymentInfo();
        this.displayAllBooks();
    }

    loadBooks() {
        const defaultBooks = [
            { id: 1, title: "The Great Gatsby", author: "F. Scott Fitzgerald", genre: "Classic", isbn: "9780743273565", available: true },
            { id: 2, title: "To Kill a Mockingbird", author: "Harper Lee", genre: "Fiction", isbn: "9780061120084", available: true },
            { id: 3, title: "1984", author: "George Orwell", genre: "Dystopian", isbn: "9780451524935", available: false },
            { id: 4, title: "Pride and Prejudice", author: "Jane Austen", genre: "Romance", isbn: "9780141439518", available: true }
        ];
        
        const savedBooks = localStorage.getItem('bookhub_books');
        return savedBooks ? JSON.parse(savedBooks) : defaultBooks;
    }

    saveBooks() {
        localStorage.setItem('bookhub_books', JSON.stringify(this.books));
    }

    setupEventListeners() {
        // Search functionality
        document.getElementById('search-btn').addEventListener('click', () => this.searchBooks());
        document.getElementById('search-input').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.searchBooks();
        });

        // Management buttons
        document.getElementById('add-book-btn').addEventListener('click', () => this.showBookForm());
        document.getElementById('view-all-btn').addEventListener('click', () => this.displayAllBooks());
        document.getElementById('cancel-btn').addEventListener('click', () => this.hideBookForm());

        // Form submission
        document.getElementById('new-book-form').addEventListener('submit', (e) => {
            e.preventDefault();
            this.addNewBook();
        });

        // CTA button
        document.querySelector('.cta-button').addEventListener('click', () => {
            document.getElementById('search').scrollIntoView({ behavior: 'smooth' });
        });

        // Smooth scrolling for navigation
        document.querySelectorAll('nav a').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                document.querySelector(targetId).scrollIntoView({ behavior: 'smooth' });
            });
        });
    }

    searchBooks() {
        const query = document.getElementById('search-input').value.toLowerCase();
        const results = this.books.filter(book => 
            book.title.toLowerCase().includes(query) ||
            book.author.toLowerCase().includes(query) ||
            book.genre.toLowerCase().includes(query)
        );
        
        this.displayBooks(results, 'search-results');
    }

    displayAllBooks() {
        this.displayBooks(this.books, 'all-books');
    }

    displayBooks(books, containerId) {
        const container = document.getElementById(containerId);
        if (books.length === 0) {
            container.innerHTML = '<p class="no-books">No books found</p>';
            return;
        }

        container.innerHTML = books.map(book => `
            <div class="book-card">
                <div class="book-title">${book.title}</div>
                <div class="book-author">by ${book.author}</div>
                <div class="book-genre">${book.genre}</div>
                <div class="book-status ${book.available ? 'available' : 'borrowed'}">
                    ${book.available ? '📚 Available' : '⏳ Borrowed'}
                </div>
                ${containerId === 'all-books' ? `
                    <button onclick="library.toggleBookStatus(${book.id})" class="status-btn">
                        ${book.available ? 'Mark as Borrowed' : 'Mark as Available'}
                    </button>
                ` : ''}
            </div>
        `).join('');
    }

    showBookForm() {
        document.getElementById('book-form').style.display = 'block';
        document.getElementById('all-books').style.display = 'none';
    }

    hideBookForm() {
        document.getElementById('book-form').style.display = 'none';
        document.getElementById('all-books').style.display = 'grid';
        document.getElementById('new-book-form').reset();
    }

    addNewBook() {
        const title = document.getElementById('book-title').value;
        const author = document.getElementById('book-author').value;
        const genre = document.getElementById('book-genre').value || 'General';
        const isbn = document.getElementById('book-isbn').value || 'N/A';

        const newBook = {
            id: Date.now(),
            title,
            author,
            genre,
            isbn,
            available: true
        };

        this.books.push(newBook);
        this.saveBooks();
        this.updateStats();
        this.hideBookForm();
        this.displayAllBooks();
        
        // Show success message
        this.showNotification('Book added successfully!', 'success');
    }

    toggleBookStatus(bookId) {
        const book = this.books.find(b => b.id === bookId);
        if (book) {
            book.available = !book.available;
            this.saveBooks();
            this.updateStats();
            this.displayAllBooks();
            
            this.showNotification(
                `Book ${book.available ? 'returned' : 'borrowed'} successfully!`, 
                'success'
            );
        }
    }

    updateStats() {
        const totalBooks = this.books.length;
        const availableBooks = this.books.filter(book => book.available).length;
        const borrowedBooks = totalBooks - availableBooks;

        document.getElementById('total-books').textContent = totalBooks;
        document.getElementById('available-books').textContent = availableBooks;
        document.getElementById('borrowed-books').textContent = borrowedBooks;
    }

    displayDeploymentInfo() {
        // Show deployment date
        const deployDate = new Date().toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        document.getElementById('deploy-date').textContent = deployDate;

        // Update version to reflect new features
        document.getElementById('version').textContent = '1.1.0';
    }

    showNotification(message, type) {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#27ae60' : '#e74c3c'};
            color: white;
            padding: 1rem 2rem;
            border-radius: 5px;
            z-index: 1000;
            animation: slideIn 0.3s ease;
        `;

        document.body.appendChild(notification);

        // Remove after 3 seconds
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }
}

// Add CSS animation for notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    .book-status.available { color: #27ae60; font-weight: bold; }
    .book-status.borrowed { color: #e74c3c; font-weight: bold; }
    
    .status-btn {
        background: #3498db;
        color: white;
        border: none;
        padding: 0.5rem 1rem;
        border-radius: 5px;
        cursor: pointer;
        margin-top: 1rem;
        width: 100%;
    }
    
    .no-books {
        text-align: center;
        color: #7f8c8d;
        font-style: italic;
        grid-column: 1 / -1;
    }
`;
document.head.appendChild(style);

// Initialize the application
const library = new LibraryManager();

console.log('BookHub Library Management System Loaded Successfully');
console.log('CI/CD Pipeline: Operational');
console.log('Version: 1.1.0 - Enhanced with Library Management Features');
