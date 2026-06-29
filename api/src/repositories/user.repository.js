import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  deleteDoc,
  query,
  where,
} from 'firebase/firestore';
import db from '../firebase.js';

const usersCol = collection(db, 'users');
const tokensCol = collection(db, 'refreshTokens');

export const userRepository = {
  async findByEmail(email) {
    const q = query(usersCol, where('email', '==', email));
    const snapshot = await getDocs(q);
    if (snapshot.empty) return null;
    const d = snapshot.docs[0];
    return { id: d.id, ...d.data() };
  },

  async create(data) {
    const ref = await addDoc(usersCol, data);
    const snapshot = await getDoc(ref);
    return { id: snapshot.id, ...snapshot.data() };
  },

  async saveRefreshToken(userId, token) {
    await addDoc(tokensCol, { userId, token, createdAt: Date.now() });
  },

  async findRefreshToken(token) {
    const q = query(tokensCol, where('token', '==', token));
    const snapshot = await getDocs(q);
    if (snapshot.empty) return null;
    const d = snapshot.docs[0];
    return { id: d.id, ...d.data() };
  },

  async deleteRefreshToken(token) {
    const q = query(tokensCol, where('token', '==', token));
    const snapshot = await getDocs(q);
    if (!snapshot.empty) await deleteDoc(snapshot.docs[0].ref);
  },
};
