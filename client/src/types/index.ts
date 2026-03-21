export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  avatar?: string;
  memberSince: Date;
  isActive: boolean;
}

export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface RegisterData {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  confirmPassword: string;
  agreeToTerms: boolean;
}

export interface ResetPasswordData {
  email: string;
  token: string;
  newPassword: string;
  confirmPassword: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  user?: User;
  token?: string;
}

// LIVRES
export type BookCategory = 
  | 'fiction'
  | 'non-fiction'
  | 'science'
  | 'history'
  | 'biography'
  | 'children'
  | 'poetry'
  | 'mystery'
  | 'romance'
  | 'technology';

export type BookStatus = 'available' | 'borrowed' | 'reserved' | 'damaged';

export interface Book {
  id: string;
  title: string;
  author: string;
  description: string;
  isbn: string;
  cover: string;
  category: BookCategory;
  publishedYear: number;
  publisher: string;
  pages: number;
  language: string;
  rating: number; 
  reviews: number;
  status: BookStatus;
  totalCopies: number;
  availableCopies: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface BookFilter {
  search?: string;
  category?: BookCategory;
  status?: BookStatus;
  minRating?: number;
  sortBy?: 'title' | 'author' | 'rating' | 'newest';
  sortOrder?: 'asc' | 'desc';
}

export interface BookReview {
  id: string;
  bookId: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  createdAt: Date;
  helpful: number;
}

// EMPRUNTS
export type BorrowStatus = 'active' | 'returned' | 'overdue' | 'reserved';

export interface Borrow {
  id: string;
  userId: string;
  bookId: string;
  book?: Book;
  borrowDate: Date;
  dueDate: Date;
  returnDate?: Date;
  status: BorrowStatus;
  isOverdue: boolean;
  daysOverdue?: number;
  renewalCount: number;
  maxRenewals: number;
}

export interface BorrowHistory {
  id: string;
  userId: string;
  bookId: string;
  book?: Book;
  borrowDate: Date;
  returnDate: Date;
  daysKept: number;
  renewalCount: number;
}

// STATISTIQUES
export interface LibraryStats {
  totalBooks: number;
  totalUsers: number;
  totalBorrows: number;
  activeBorrows: number;
  overdueBorrows: number;
  totalReviews: number;
  averageRating: number;
}

export interface UserStats {
  userId: string;
  totalBorrows: number;
  activeBorrows: number;
  overdueBorrows: number;
  totalReturned: number;
  averageBorrowDays: number;
  favoriteCategory: BookCategory;
  readingStreak: number;
}

export interface CategoryStats {
  category: BookCategory;
  totalBooks: number;
  borrowCount: number;
  averageRating: number;
  mostPopular: Book;
}

// NOTIFICATIONS
export type NotificationType = 
  | 'borrow-confirmed'
  | 'return-reminder'
  | 'overdue-warning'
  | 'book-available'
  | 'new-review'
  | 'system';

export interface Notification {
  id: string;
  userId: string;
  type: NotificationType;
  title: string;
  message: string;
  isRead: boolean;
  createdAt: Date;
  actionUrl?: string;
}

// PAGINATION
export interface PaginationParams {
  page: number;
  limit: number;
  offset: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

// API RESPONSES
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
  };
  timestamp: Date;
}

export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, unknown>;
}

// VALIDATION
export interface ValidationError {
  field: string;
  message: string;
}

export interface FormErrors {
  [key: string]: string;
}
