import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
} from 'firebase/firestore';
import db from '../firebase.js';

const col = collection(db, 'products');

export const productRepository = {
  async findAll() {
    const snapshot = await getDocs(col);
    return snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
  },

  async findById(id) {
    const ref = doc(db, 'products', id);
    const snapshot = await getDoc(ref);
    if (!snapshot.exists()) return null;
    return { id: snapshot.id, ...snapshot.data() };
  },

  async create(data) {
    const ref = await addDoc(col, data);
    const snapshot = await getDoc(ref);
    return { id: snapshot.id, ...snapshot.data() };
  },

  async update(id, data) {
    const ref = doc(db, 'products', id);
    const snapshot = await getDoc(ref);
    if (!snapshot.exists()) return null;
    await updateDoc(ref, data);
    const updated = await getDoc(ref);
    return { id: updated.id, ...updated.data() };
  },

  async remove(id) {
    const ref = doc(db, 'products', id);
    const snapshot = await getDoc(ref);
    if (!snapshot.exists()) return false;
    await deleteDoc(ref);
    return true;
  },
};
