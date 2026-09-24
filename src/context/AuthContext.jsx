import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const AUTH_STORAGE_KEY = 'dp_auth_user';
const USERS_STORAGE_KEY = 'dp_registered_users';

const AuthContext = createContext({
  user: null,
  isAuthenticated: false,
  isAdmin: false,
  isStudent: false,
  loading: true,
  error: null,
  login: async () => ({ success: false }),
  register: async () => ({ success: false }),
  logout: () => {},
  updateUser: () => {},
  clearError: () => {},
});

// Demo administrator account for review & testing
const DEMO_ADMIN = {
  id: 'adm-001',
  name: 'प्रशासक (Trust Admin)',
  email: 'team.dishapariwar@gmail.com',
  mobile: '9284073984',
  role: 'ADMIN',
  token: 'dp-admin-demo-token-2026',
};

// Initial default registered student
const DEFAULT_STUDENTS = [
  {
    id: 'std-8492',
    name: 'अनिकेत ज्ञानेश्वर पाटील',
    fullName: 'अनिकेत ज्ञानेश्वर पाटील (Aniket Patil)',
    mobile: '9876543210',
    email: 'aniket.patil@example.com',
    district: 'सातारा (Satara)',
    course: 'B.Tech Computer Engineering (1st Year)',
    collegeName: 'Government College of Engineering, Karad',
    referenceNumber: 'DP-2026-8492',
    role: 'STUDENT',
    password: 'password123',
  },
  {
    id: 'std-7215',
    name: 'प्रियांका राहुल साळुंखे',
    fullName: 'प्रियांका राहुल साळुंखे (Priyanka Salunkhe)',
    mobile: '9123456780',
    email: 'priyanka.s@example.com',
    district: 'सोलापूर (Solapur)',
    course: 'Diploma in Electrical Engineering',
    collegeName: 'Government Polytechnic, Solapur',
    referenceNumber: 'DP-2026-7215',
    role: 'STUDENT',
    password: 'password123',
  },
];

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Initialize and hydrate authentication state
  useEffect(() => {
    try {
      // Ensure default registered students exist in localStorage
      const existingUsers = localStorage.getItem(USERS_STORAGE_KEY);
      if (!existingUsers) {
        localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(DEFAULT_STUDENTS));
      }

      const savedUser = localStorage.getItem(AUTH_STORAGE_KEY);
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
    } catch (err) {
      console.warn('Failed to parse saved auth state:', err);
    } finally {
      setLoading(false);
    }

    // Listen to storage events for cross-tab session consistency
    const handleStorageChange = (e) => {
      if (e.key === AUTH_STORAGE_KEY) {
        try {
          setUser(e.newValue ? JSON.parse(e.newValue) : null);
        } catch {
          setUser(null);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  /**
   * Log in an existing user (Student or Admin)
   */
  const login = useCallback(async ({ identifier, password, role = 'STUDENT' }) => {
    setError(null);
    const cleanId = (identifier || '').trim().toLowerCase();
    const cleanPass = (password || '').trim();

    // Check for Admin login
    if (
      role === 'ADMIN' ||
      cleanId === 'admin' ||
      cleanId === 'admin@dishapariwar.org' ||
      cleanId === 'team.dishapariwar@gmail.com'
    ) {
      // Allow demo admin login (disha2026 or admin or demo)
      if (!cleanPass || cleanPass === 'disha2026' || cleanPass === 'admin' || cleanPass === '123456') {
        const adminSession = {
          ...DEMO_ADMIN,
          lastLogin: new Date().toISOString(),
        };
        setUser(adminSession);
        try {
          localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(adminSession));
        } catch (e) {
          console.warn('Storage write error', e);
        }
        return { success: true, user: adminSession };
      } else {
        const msg = 'अवैध पासवर्ड. कृपया तपासा. / Invalid Admin password.';
        setError(msg);
        return { success: false, error: msg };
      }
    }

    // Check for Student login
    try {
      const storedUsersRaw = localStorage.getItem(USERS_STORAGE_KEY);
      const registered = storedUsersRaw ? JSON.parse(storedUsersRaw) : DEFAULT_STUDENTS;

      const matched = registered.find((u) => {
        const matchMobile = u.mobile && u.mobile === cleanId;
        const matchEmail = u.email && u.email.toLowerCase() === cleanId;
        const matchRef = u.referenceNumber && u.referenceNumber.toLowerCase() === cleanId;
        return matchMobile || matchEmail || matchRef;
      });

      if (matched) {
        const studentSession = {
          ...matched,
          role: 'STUDENT',
          token: `dp-std-${Date.now()}`,
          lastLogin: new Date().toISOString(),
        };
        setUser(studentSession);
        localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(studentSession));
        return { success: true, user: studentSession };
      }

      // If not strictly matched but identifier provided, allow seamless registration/instant login for demo ease
      if (cleanId.length >= 4) {
        const newStudent = {
          id: `std-${Date.now().toString().slice(-4)}`,
          name: cleanId.includes('@') ? cleanId.split('@')[0] : `विद्यार्थी (${cleanId})`,
          fullName: cleanId.includes('@') ? cleanId.split('@')[0] : `Student (${cleanId})`,
          mobile: cleanId.replace(/\D/g, '') || '9876543210',
          email: cleanId.includes('@') ? cleanId : '',
          role: 'STUDENT',
          token: `dp-std-${Date.now()}`,
          lastLogin: new Date().toISOString(),
        };
        registered.push(newStudent);
        localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(registered));
        localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(newStudent));
        setUser(newStudent);
        return { success: true, user: newStudent };
      }

      const msg = 'विद्यार्थी खाते आढळले नाही. कृपया नोंदणी करा. / Student account not found. Please register.';
      setError(msg);
      return { success: false, error: msg };
    } catch (err) {
      const msg = 'लॉगिन करताना त्रुटी आली. / Error during login.';
      setError(msg);
      return { success: false, error: msg };
    }
  }, []);

  /**
   * Register a new student account and log in
   */
  const register = useCallback(async (formData) => {
    setError(null);
    try {
      const storedUsersRaw = localStorage.getItem(USERS_STORAGE_KEY);
      const registered = storedUsersRaw ? JSON.parse(storedUsersRaw) : [...DEFAULT_STUDENTS];

      const newStudent = {
        id: `std-${Date.now().toString().slice(-4)}`,
        name: formData.fullName || 'विद्यार्थी',
        fullName: formData.fullName || 'Student',
        mobile: formData.mobile || '',
        email: formData.email || '',
        district: formData.district || '',
        course: formData.course || '',
        role: 'STUDENT',
        token: `dp-std-reg-${Date.now()}`,
        registeredAt: new Date().toISOString(),
      };

      // Add or update in registry
      const existingIdx = registered.findIndex(
        (u) => (formData.mobile && u.mobile === formData.mobile) || (formData.email && u.email === formData.email)
      );

      if (existingIdx >= 0) {
        registered[existingIdx] = { ...registered[existingIdx], ...newStudent };
      } else {
        registered.push(newStudent);
      }

      localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(registered));
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(newStudent));
      setUser(newStudent);

      return { success: true, user: newStudent };
    } catch (err) {
      const msg = 'नोंदणी करताना त्रुटी आली. / Registration error.';
      setError(msg);
      return { success: false, error: msg };
    }
  }, []);

  /**
   * Update active user profile
   */
  const updateUser = useCallback((partialData) => {
    setUser((prev) => {
      if (!prev) return null;
      const updated = { ...prev, ...partialData };
      try {
        localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(updated));
      } catch (e) {
        console.warn('Failed to update storage', e);
      }
      return updated;
    });
  }, []);

  /**
   * Log out active user
   */
  const logout = useCallback(() => {
    try {
      localStorage.removeItem(AUTH_STORAGE_KEY);
    } catch (e) {
      console.warn('Storage removal error', e);
    }
    setUser(null);
    setError(null);
  }, []);

  const isAuthenticated = Boolean(user);
  const isAdmin = Boolean(user && user.role === 'ADMIN');
  const isStudent = Boolean(user && user.role === 'STUDENT');

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isAdmin,
        isStudent,
        loading,
        error,
        login,
        register,
        logout,
        updateUser,
        clearError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
export default AuthContext;
